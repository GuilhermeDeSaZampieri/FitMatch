import prisma from "../prisma/prismaClient";
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


export async function concludeActivityRepository(id: string) {

    return await prisma.activities.update({
        where:{
            id: id
        },
        data: {
            completedAt: new Date(),
        }
       
    });
}

export async function approveActivityParticipantRepository(id: string, userId: string, approve: boolean) {

    return await prisma.activityParticipants.update({
        where:{
            activityId_userId:{
                activityId: id,
                userId: userId,
            }
        },
        data: {
            approved: approve,
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



export async function updateActivityRepository(data: any, id:string) {
    
    const update = await prisma.activities.update({
            where:{
                id: id,
            },
            data,
            include:{
                activityAddresses:{
                    select:{
                        latitude: true,
                        longitude: true
                    }
                }, 
                creator:{
                    select:{
                        id: true,
                        name: true,
                        avatar: true
                    }
                }
            },
            omit:{
                deletedAt: true
            }
                  
        });

    return update
}

export async function existingParticipant(id:string, userId: string) {
    return await prisma.activityParticipants.findUnique({
        where:{
            activityId_userId:{
                activityId: id,
                userId: userId,
            }
        }
    });
}

export async function CheckinActivityRepository(id:string, code: string) {
    return await prisma.activities.update({
        where:{
            id: id,
            confirmationCode: code
        },
        data:{

        }
    });
}


export async function deleteActivityRepository(id:string) {
    await prisma.activityParticipants.deleteMany({
        where: {activityId: id,},
    });

    await prisma.activityAddresses.deleteMany({
        where: { activityId: id },
    });
    
    return await prisma.activities.delete({
        where:{
            id: id,
        },
    });
}




