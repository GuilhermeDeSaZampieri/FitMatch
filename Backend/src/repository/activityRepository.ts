import prisma from "../prisma/prismaClient";
import activityData from "../types/activityData";

export async function createActivity(data: activityData) {

    return await  prisma.activities.create({
        data:{
            title: data.title,
            description: data.description,
            typeId: data.typeId,
            ActivityAddresses: data.address,
            image: data.image,
            scheduledDate: data.scheduledDate, 
            private: data.private,
            confirmationCode: data.confirmationCode,

            userId: data.userId,
            createdAt: data.createdAt,
            
    }});
}

export async function createType(data:any) {
    return await prisma.activityTypes.create({data});
    
}