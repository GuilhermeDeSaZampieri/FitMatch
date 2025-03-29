/*
  Warnings:

  - A unique constraint covering the columns `[activityId,userId]` on the table `activityParticipants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "activityParticipants_activityId_userId_key" ON "activityParticipants"("activityId", "userId");
