/*
  Warnings:

  - You are about to drop the `HealthExam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemHealthExam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accountId` to the `ItemInstrument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ItemCategory" ADD VALUE 'EXAM';

-- DropForeignKey
ALTER TABLE "HealthExam" DROP CONSTRAINT "HealthExam_accountId_fkey";

-- DropForeignKey
ALTER TABLE "ItemHealthExam" DROP CONSTRAINT "ItemHealthExam_healthExameId_fkey";

-- DropForeignKey
ALTER TABLE "ItemHealthExam" DROP CONSTRAINT "ItemHealthExam_itemCatalogId_fkey";

-- DropForeignKey
ALTER TABLE "ItemHealthExam" DROP CONSTRAINT "ItemHealthExam_itemId_fkey";

-- AlterTable
ALTER TABLE "ItemCatalog" ADD COLUMN     "indications" TEXT,
ADD COLUMN     "protocol" VARCHAR(255),
ADD COLUMN     "typeExam" VARCHAR(255);

-- AlterTable
ALTER TABLE "ItemInstrument" ADD COLUMN     "accountId" UUID NOT NULL;

-- DropTable
DROP TABLE "HealthExam";

-- DropTable
DROP TABLE "ItemHealthExam";

-- CreateTable
CREATE TABLE "ItemExam" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "itemCatalogId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemExam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemInstrument" ADD CONSTRAINT "ItemInstrument_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExam" ADD CONSTRAINT "ItemExam_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExam" ADD CONSTRAINT "ItemExam_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExam" ADD CONSTRAINT "ItemExam_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
