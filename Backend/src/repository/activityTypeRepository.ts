import prisma from "../prisma/prismaClient";

export async function createTypeRepository(data: any[]) {
    return await prisma.activityTypes.createMany({data});
}

export async function getTypesActivityRepository() {
    return await prisma.activityTypes.findMany();
}


