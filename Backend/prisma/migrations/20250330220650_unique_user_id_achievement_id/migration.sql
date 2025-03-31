/*
  Warnings:

  - A unique constraint covering the columns `[userId,achievementId]` on the table `userAchievements` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userAchievements_userId_achievementId_key" ON "userAchievements"("userId", "achievementId");
