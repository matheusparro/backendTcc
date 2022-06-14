/*
  Warnings:

  - Made the column `employeeId` on table `CompTime` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CompTime" DROP CONSTRAINT "CompTime_employeeId_fkey";

-- AlterTable
ALTER TABLE "CompTime" ALTER COLUMN "employeeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CompTime" ADD CONSTRAINT "CompTime_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
