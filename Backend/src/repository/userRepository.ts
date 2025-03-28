import prisma from "../prisma/prismaClient";
import userData from "../types/userData";

export async function createUserRepository(data: userData) {
    
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

export async function updateUserRepository(data: userData, id:string) {
    
    return await  prisma.users.update({
            where:{
                id: id,
            },
            data
        })
}


export async function softDeleteUser(id:string) {
    
    return await  prisma.users.update({
            where:{
                id: id,
            },
            data: {
                deleteAt: new Date()
            }
        })
}





export async function getUserByid(id:string) {
    return await prisma.users.findUnique({
        where:{
            id,
        },
        
    })
}

export async function getByEmail(email: string){
    return await prisma.users.findUnique({
        where: {
            email,
        }
    });
}

export async function getByCpf(cpf: string){
    return await prisma.users.findUnique({
        where: {
            cpf,
        }
    });
}
