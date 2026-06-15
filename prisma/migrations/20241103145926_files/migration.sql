/*
  Warnings:

  - You are about to drop the column `fileId` on the `HealthMedicalCareFile` table. All the data in the column will be lost.
  - Added the required column `type` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pathFile` to the `HealthMedicalCareFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HealthMedicalCareFile" DROP CONSTRAINT "HealthMedicalCareFile_fileId_fkey";

-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HealthMedicalCareFile" DROP COLUMN "fileId",
ADD COLUMN     "pathFile" VARCHAR(255) NOT NULL;
