import prisma from "../prisma/prismaClient";

export async function createActivityAddressesRepository(data: any){
    return await prisma.activityAddresses.create({data});
}