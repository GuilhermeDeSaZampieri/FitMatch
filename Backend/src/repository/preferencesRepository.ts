
import prisma from "../prisma/prismaClient";
import preferencesActivity from "../types/preferencesData";


export async function preferenceRepository(data: preferencesActivity) {
    
    return Promise.all(data.typeId.map(async (id) => {
        await prisma.preferences.upsert({
            where:{
                typeId_userId:{
                    userId: data.userId, 
                    typeId: id   
                }
            },
            create:{
                typeId: id,
                userId: data.userId
            },
            update:{
                typeId: id
            }
        });
    }));
}

export async function getUserPreferencesRepository() {
    const preferences = await prisma.preferences.findMany({
        omit:{
            id: true,
            userId: true,
        },
        include:{   
            activityTypes:{
                select:{
                    name: true,
                    description: true
                }
            },
    }});

    return preferences.map((preference)=>({
        typeId: preference.typeId,
        typeName: preference.activityTypes.name,
        typeDescription:  preference.activityTypes.description
    }));
}
