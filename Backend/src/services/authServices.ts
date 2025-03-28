import { createUserRepository, getByCpf, getByEmail } from "../repository/userRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET!; 


export async function createUserService(
    data: {
        name: string,
        email: string,
        cpf: string,
        password: string,
    
        avatar: string, 
        xp: number,
        level: number,
        deleteAt: string | null,
}){

    const encryptedPassword = await bcrypt.hash(data.password, 10); 
    data.password = encryptedPassword;

    if( await getByCpf(data.cpf)){
        throw new Error("Cpf já existente");
    }
    if( await getByEmail(data.email)){
        throw new Error("E-mail já existente");
    }

    const userSaved = await createUserRepository(data);
    return  userSaved.id 
}


export async function login(email: string, password: string){
    const user = await getByEmail(email);

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }   
     
    if(user.deleteAt){
        throw new Error("Esta conta foi desativada e não pode ser ultilizada");
    }

    const IsPasswordCorrect =  await bcrypt.compare(password, user.password);
    
    if (!IsPasswordCorrect) {
        throw new Error("Senha incorreta");
    }

   
    const token = jwt.sign(
        user,
        jwtSecret,
        { expiresIn: "1d"},
    );

    

    return {
        token: token,
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level,
         
    };
}