/*
  Warnings:

  - You are about to drop the `ItemExamHealth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemExamHealth" DROP CONSTRAINT "ItemExamHealth_healthExameId_fkey";

-- DropForeignKey
ALTER TABLE "ItemExamHealth" DROP CONSTRAINT "ItemExamHealth_itemCatalogId_fkey";

-- DropForeignKey
ALTER TABLE "ItemExamHealth" DROP CONSTRAINT "ItemExamHealth_itemId_fkey";

-- DropTable
DROP TABLE "ItemExamHealth";

-- CreateTable
CREATE TABLE "ItemHealthExam" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "itemCatalogId" UUID NOT NULL,
    "healthExameId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemHealthExam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemHealthExam" ADD CONSTRAINT "ItemHealthExam_healthExameId_fkey" FOREIGN KEY ("healthExameId") REFERENCES "HealthExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHealthExam" ADD CONSTRAINT "ItemHealthExam_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHealthExam" ADD CONSTRAINT "ItemHealthExam_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
