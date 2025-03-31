import { getUserByid } from "../repository/userRepository"
import { xpAnLevelUp } from "../repository/xpAndAchievementsRepository";

export async function xpAnLevelUpService(userId:string, xp: number) {
    const user = await getUserByid(userId);

    if (!user) throw new Error("Usuário não encontrado");

    let newXP = user.xp + xp;
    let newLevel = user.level;

    const xpNeeded = newLevel * 2;

    if (newXP >= xpNeeded) {
        newLevel += 1;
        newXP -= xpNeeded;
        //await unlockAchievement(userId, "level-up");
    }
    await xpAnLevelUp(userId, newXP, newLevel);
}
