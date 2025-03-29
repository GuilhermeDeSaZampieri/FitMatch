/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `activityTypes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `activityTypes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "activityTypes_name_key" ON "activityTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "activityTypes_description_key" ON "activityTypes"("description");
