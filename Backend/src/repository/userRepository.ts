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


export async function getAllActivityCreateByUserRepository(id:string) {
    return await prisma.activities.findMany({
        where:{
            creatorId: id
        }
    })
}

export async function getActivityCreateByUserRepository(
    page: number,
    pageSize: number,
    id: string) {

    const activies =  await prisma.activities.findMany({
        skip: (page-1)* pageSize,
        take: pageSize,
        omit:{
            creatorId: true,
        },
        where:{
            creatorId: id,
        },
        include:{   
            activityAddresses:{
                select:{
                    latitude: true,
                    longitude: true,
                }
            },
            creator:{
                select:{
                    id: true,
                    name: true,
                    avatar: true,
                }
            }
        },
        
    });

    const totalActivies = await prisma.activities.count({
        where:{
            creatorId: id,
        },
    })
    const totalPages = Math.ceil(totalActivies / pageSize)
    return{
        page,
        pageSize,
        totalActivies,
        totalPages,
        activies
    }

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


