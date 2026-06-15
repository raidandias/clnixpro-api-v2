/*
  Warnings:

  - Added the required column `accountId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- Adicionar a coluna accountId à tabela Product com um valor padrão temporário
ALTER TABLE "Product" ADD COLUMN "accountId" UUID DEFAULT '00000000-0000-0000-0000-000000000000';

-- Atualizar os registros existentes na tabela Product com o accountId do Item relacionado
UPDATE "Product" AS p
SET "accountId" = i."accountId"
FROM "Item" AS i
WHERE p."itemId" = i."id"
AND p."accountId" = '00000000-0000-0000-0000-000000000000';

-- Remover o valor padrão da coluna accountId
ALTER TABLE "Product" ALTER COLUMN "accountId" DROP DEFAULT;

-- Alterar a coluna accountId para não permitir NULL
ALTER TABLE "Product" ALTER COLUMN "accountId" SET NOT NULL;

ALTER TABLE "Product" ADD CONSTRAINT "Product_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
