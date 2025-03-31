import prisma from "../prisma/prismaClient";


export async function xpAnLevelUp(userId:string, newXp: number, newlevel: number) {
    return await prisma.users.update({
        where:{
            id: userId
        },
        data:{
            xp: newXp, 
            level: newlevel,
        }
    })
}

export async function userAchievementsVerify(userId:string) {
    return await prisma.userAchievements.findFirst({
        where: {   
            userId: userId
        }
    });
}


    




