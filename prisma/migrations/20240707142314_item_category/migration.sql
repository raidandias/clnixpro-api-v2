/*
  Warnings:

  - The `category` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('SERVICE', 'PRODUCT', 'PROCEDURE');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "category",
ADD COLUMN     "category" "ItemCategory" NOT NULL DEFAULT 'SERVICE';

-- DropEnum
DROP TYPE "CategoryItem";
