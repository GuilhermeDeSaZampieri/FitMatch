import prisma from "../prisma/prismaClient";
import userData from "../types/userData";

export async function cadastrar(data: userData) {
    return await  prisma.users.create(
        {
            data:{
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                password: data.password,
    
                avatar: data.avatar ?? "", 
                xp: data.xp ?? 0, 
                level: data.level ?? 1, 
    }});
}
