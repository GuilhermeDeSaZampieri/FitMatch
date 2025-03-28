import prisma from "../prisma/prismaClient";
import activityData from "../types/activityData";


export async function createActivityRepository(data: any) {

    return await  prisma.activities.create({data});
}


export async function getActivityRepository(
    page: number,
    pageSize: number,
    typeId: string,
    orderBy: string,
    order: "asc" | "desc" = "asc") {
    return await prisma.activities.findMany({
        skip: (page-1)* pageSize,
        take: pageSize,
        where:{
            typeId: typeId,
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
        orderBy:{ 
           [orderBy]: order,
        },
        
    });
}


