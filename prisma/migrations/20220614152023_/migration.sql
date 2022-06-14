/*
  Warnings:

  - You are about to drop the column `compTimeId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_compTimeId_fkey";

-- DropIndex
DROP INDEX "Employee_compTimeId_key";

-- AlterTable
ALTER TABLE "CompTime" ADD COLUMN     "employeeId" INTEGER;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "compTimeId";

-- AddForeignKey
ALTER TABLE "CompTime" ADD CONSTRAINT "CompTime_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
