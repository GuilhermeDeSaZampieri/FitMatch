import { cadastrar } from "../repository/authRepository";
import bcrypt from "bcryptjs";

export async function createUser(
    data: {
        name: string,
        email: string,
        cpf: string,
        password: string,
    
        avatar?: string, 
        xp?: number,
        level?: number,
        deleteAt?: string | null,
}){
    const encryptedPassword = await bcrypt.hash(data.password, 10); // criptografa
    data.password = encryptedPassword;

    return await cadastrar(data);
}