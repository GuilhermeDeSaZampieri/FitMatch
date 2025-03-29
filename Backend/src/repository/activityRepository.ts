import prisma from "../prisma/prismaClient";
import activityData from "../types/activityData";
import activityPartipants from "../types/activityParticipants"; 

export async function createActivityRepository(data: any) {

    return await  prisma.activities.create({data});
}

export async function subscribeActivityRepository(data: activityPartipants) {

    return await prisma.activityParticipants.create({
        data: {
            userId: data.userId,
            activityId: data.activityId,
        }
    });
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
    const previous = page - 1;
    const next = page +1;
    const totalPages = Math.ceil(totalActivies / pageSize)
    return{
        page,
        pageSize,
        totalActivies,
        totalPages,
        previous,
        next,
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

export async function updateActivityRepository(data: activityData, id:string) {
    
    return await  prisma.activities.update({
            where:{
                id: id,
            },
            data
        })
}




