/*
  Warnings:

  - The `flagCoperate` column on the `HealthInsurance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `accountId` to the `ItemStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthInsurance" DROP COLUMN "flagCoperate",
ADD COLUMN     "flagCoperate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ItemStock" ADD COLUMN     "accountId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemStock" ADD CONSTRAINT "ItemStock_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
