-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "status" INTEGER,
ALTER COLUMN "appointmentTime" DROP NOT NULL;
