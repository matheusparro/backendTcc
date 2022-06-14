/*
  Warnings:

  - A unique constraint covering the columns `[compTimeId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "compTimeId" INTEGER;

-- CreateTable
CREATE TABLE "CompTime" (
    "id" SERIAL NOT NULL,
    "hoursWorked" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_compTimeId_key" ON "Employee"("compTimeId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_compTimeId_fkey" FOREIGN KEY ("compTimeId") REFERENCES "CompTime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
