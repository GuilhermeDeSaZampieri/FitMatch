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

    const activies = await prisma.activities.findMany({
        skip: (page-1)* pageSize,
        take: pageSize,
        omit:{
            creatorId: true,
        },
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

    const totalActivies = await prisma.activities.count({
        where:{
            typeId: typeId,
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


export async function getActivityAllRepository(
    typeId: string,
    orderBy: string,
    order: "asc" | "desc" = "asc") {

    return await prisma.activities.findMany({
        omit:{
            creatorId: true,
        },
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



