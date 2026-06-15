/*
  Warnings:

  - You are about to drop the column `examId` on the `ItemExamHealth` table. All the data in the column will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LogSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicalCare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicalCareFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `healthExameId` to the `ItemExamHealth` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HealthMedicalCareStatus" AS ENUM ('WAITING', 'CONFIRMED', 'CANCELED', 'IN_PROGRESS');

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_accountId_fkey";

-- DropForeignKey
ALTER TABLE "ItemExamHealth" DROP CONSTRAINT "ItemExamHealth_examId_fkey";

-- DropForeignKey
ALTER TABLE "LogSchedule" DROP CONSTRAINT "LogSchedule_accountId_fkey";

-- DropForeignKey
ALTER TABLE "LogSchedule" DROP CONSTRAINT "LogSchedule_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "LogSchedule" DROP CONSTRAINT "LogSchedule_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalCare" DROP CONSTRAINT "MedicalCare_accountId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalCare" DROP CONSTRAINT "MedicalCare_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalCare" DROP CONSTRAINT "MedicalCare_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalCare" DROP CONSTRAINT "MedicalCare_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalCareFile" DROP CONSTRAINT "MedicalCareFile_accountId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalCareFile" DROP CONSTRAINT "MedicalCareFile_fileId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalCareFile" DROP CONSTRAINT "MedicalCareFile_medicalCareId_fkey";

-- DropForeignKey
ALTER TABLE "PatientCard" DROP CONSTRAINT "PatientCard_accountId_fkey";

-- DropForeignKey
ALTER TABLE "PatientCard" DROP CONSTRAINT "PatientCard_benefitId_fkey";

-- DropForeignKey
ALTER TABLE "PatientCard" DROP CONSTRAINT "PatientCard_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_itemCatalogId_fkey";

-- AlterTable
ALTER TABLE "ItemExamHealth" DROP COLUMN "examId",
ADD COLUMN     "healthExameId" UUID NOT NULL;

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "LogSchedule";

-- DropTable
DROP TABLE "MedicalCare";

-- DropTable
DROP TABLE "MedicalCareFile";

-- DropTable
DROP TABLE "PatientCard";

-- DropTable
DROP TABLE "Stock";

-- DropEnum
DROP TYPE "MedicalCareStatus";

-- CreateTable
CREATE TABLE "ItemStock" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "itemCatalogId" UUID NOT NULL,
    "currentAmount" INTEGER NOT NULL DEFAULT 0,
    "outputAmount" INTEGER NOT NULL DEFAULT 0,
    "location" VARCHAR(255) NOT NULL,
    "entryAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "outputAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthExam" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "examType" VARCHAR(255) NOT NULL,
    "protocol" VARCHAR(255) NOT NULL,
    "indications" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HealthExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthPatientCard" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "benefitId" UUID,
    "accountId" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HealthPatientCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleLogs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "scheduleId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ScheduleLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthMedicalCare" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "scheduleId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "prescription" TEXT,
    "status" "HealthMedicalCareStatus" NOT NULL DEFAULT 'WAITING',
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HealthMedicalCare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthMedicalCareFile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "healthMedicalCareId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HealthMedicalCareFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthPatientCard_cardNumber_key" ON "HealthPatientCard"("cardNumber");

-- AddForeignKey
ALTER TABLE "ItemStock" ADD CONSTRAINT "ItemStock_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExamHealth" ADD CONSTRAINT "ItemExamHealth_healthExameId_fkey" FOREIGN KEY ("healthExameId") REFERENCES "HealthExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthExam" ADD CONSTRAINT "HealthExam_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPatientCard" ADD CONSTRAINT "HealthPatientCard_benefitId_fkey" FOREIGN KEY ("benefitId") REFERENCES "Benefit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPatientCard" ADD CONSTRAINT "HealthPatientCard_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPatientCard" ADD CONSTRAINT "HealthPatientCard_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleLogs" ADD CONSTRAINT "ScheduleLogs_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleLogs" ADD CONSTRAINT "ScheduleLogs_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleLogs" ADD CONSTRAINT "ScheduleLogs_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMedicalCare" ADD CONSTRAINT "HealthMedicalCare_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMedicalCare" ADD CONSTRAINT "HealthMedicalCare_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMedicalCare" ADD CONSTRAINT "HealthMedicalCare_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMedicalCare" ADD CONSTRAINT "HealthMedicalCare_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMedicalCareFile" ADD CONSTRAINT "HealthMedicalCareFile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMedicalCareFile" ADD CONSTRAINT "HealthMedicalCareFile_healthMedicalCareId_fkey" FOREIGN KEY ("healthMedicalCareId") REFERENCES "HealthMedicalCare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthMedicalCareFile" ADD CONSTRAINT "HealthMedicalCareFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
