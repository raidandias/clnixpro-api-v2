/*
  Warnings:

  - You are about to drop the column `itemCatalogId` on the `ItemExam` table. All the data in the column will be lost.
  - Added the required column `itemCatalogExamId` to the `ItemExam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemCatalogServiceId` to the `ItemExam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemExam" DROP CONSTRAINT "ItemExam_itemCatalogId_fkey";

-- AlterTable
ALTER TABLE "ItemExam" DROP COLUMN "itemCatalogId",
ADD COLUMN     "itemCatalogExamId" UUID NOT NULL,
ADD COLUMN     "itemCatalogServiceId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemExam" ADD CONSTRAINT "ItemExam_itemCatalogExamId_fkey" FOREIGN KEY ("itemCatalogExamId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExam" ADD CONSTRAINT "ItemExam_itemCatalogServiceId_fkey" FOREIGN KEY ("itemCatalogServiceId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
