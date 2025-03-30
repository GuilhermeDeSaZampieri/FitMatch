import prisma from "../prisma/prismaClient";
import activityAddress from "../types/activityAddress";

export async function createActivityAddressesRepository(data: any){
    return await prisma.activityAddresses.create({data});
}

export async function updateActivityAdress(data: activityAddress) {
        return await prisma.activityAddresses.update({
            where:{
                activityId: data.activityId
            },
            data
        });
}

export async function existingAddress(id:string) {
    return await prisma.activityAddresses.findUnique({
        where:{
            activityId: id
        }
    })
}
