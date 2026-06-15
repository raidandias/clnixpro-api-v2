/*
  Warnings:

  - You are about to drop the column `itemCatalogId` on the `ItemInstrument` table. All the data in the column will be lost.
  - Added the required column `itemCatalogProductId` to the `ItemInstrument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemCatalogServiceId` to the `ItemInstrument` table without a default value. This is not possible if the table is not empty.

*/

-- DropTable
DELETE FROM "ItemInstrument";

-- DropForeignKey
ALTER TABLE "ItemInstrument" DROP CONSTRAINT "ItemInstrument_itemCatalogId_fkey";

-- AlterTable
ALTER TABLE "ItemInstrument" DROP COLUMN "itemCatalogId",
ADD COLUMN     "itemCatalogProductId" UUID NOT NULL,
ADD COLUMN     "itemCatalogServiceId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemInstrument" ADD CONSTRAINT "ItemInstrument_itemCatalogProductId_fkey" FOREIGN KEY ("itemCatalogProductId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstrument" ADD CONSTRAINT "ItemInstrument_itemCatalogServiceId_fkey" FOREIGN KEY ("itemCatalogServiceId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
