/*
  Warnings:

  - Added the required column `name` to the `AppointmentConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentConfiguration" ADD COLUMN     "name" TEXT NOT NULL;
