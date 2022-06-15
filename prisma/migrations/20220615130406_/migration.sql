/*
  Warnings:

  - A unique constraint covering the columns `[employeeId]` on the table `CompTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompTime_employeeId_key" ON "CompTime"("employeeId");
