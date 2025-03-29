/*
  Warnings:

  - A unique constraint covering the columns `[typeId,userId]` on the table `preferences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "preferences_typeId_userId_key" ON "preferences"("typeId", "userId");
