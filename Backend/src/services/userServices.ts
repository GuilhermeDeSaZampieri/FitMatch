import { getByEmail, getUserByid, updateUser, softDeleteUser } from "../repository/userRepository";
import bcrypt from "bcryptjs";
export async function getUsersByid(id: string){
    const userFind  = await getUserByid(id);
    
    if(!userFind){
        throw new Error("Usuário não encontrado");
    }

    if(userFind.deleteAt){
        throw new Error("Esta conta foi desativada e não pode ser ultilizada");
    }

    return userFind;
}

export async function update(data: any, id: string){
    
    const encryptedPassword = await bcrypt.hash(data.password, 10); 
    data.password = encryptedPassword;

    await verifyIfUserEmailExists(data.email);

    const userFind  = await updateUser(data, id);

    if(!userFind){
        throw new Error("Usuário não encontrado");
    }

    if(userFind.deleteAt){
        throw new Error("Esta conta foi desativada e não pode ser ultilizada");
    }

    return userFind;
}

export async function deleteUser(id: string){
    
    const userFind = await softDeleteUser(id);

    if(!userFind){
        throw new Error("Usuário não encontrado");
    }

    if(userFind.deleteAt){
        throw new Error("Esta conta foi desativada e não pode ser ultilizada");
    }
}

async function verifyIfUserEmailExists(email: string){
    const user = await getByEmail(email);

    if(user){
        throw new Error("O e-mail já pertence a outro usuário");
        
    }
}



