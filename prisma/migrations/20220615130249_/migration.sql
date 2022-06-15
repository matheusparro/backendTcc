-- DropForeignKey
ALTER TABLE "CompTime" DROP CONSTRAINT "CompTime_employeeId_fkey";

-- AlterTable
ALTER TABLE "CompTime" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CompTime" ADD CONSTRAINT "CompTime_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
