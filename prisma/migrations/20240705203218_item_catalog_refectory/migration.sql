/*
  Warnings:

  - You are about to drop the column `budgetId` on the `InvoicePayable` table. All the data in the column will be lost.
  - You are about to drop the column `budgetId` on the `InvoiceReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `costPrice` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `flagBenefit` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `observationForPatient` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `observationForProfessional` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - The `category` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `serviceId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `entryDate` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `outputDate` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetPaymentCurrency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetProfessional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetProfessionalSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessionalService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceExam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceHealthInsurance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceInstrument` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemCatalogId` to the `BenefitItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `InvoiceReceivable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemCatalogId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemCatalogId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryItem" AS ENUM ('SERVICE', 'PRODUCT', 'PROCEDURE');

-- CreateEnum
CREATE TYPE "BodyMembers" AS ENUM ('ARMS', 'SHOULDERS', 'FOREARMS', 'HANDS', 'STEM', 'ABDOMEN', 'HIP', 'THIGHS', 'LEGS', 'FEET');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('WAITING', 'CONFIRMED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_healthInsuranceId_fkey";

-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_patientId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetPayment" DROP CONSTRAINT "BudgetPayment_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetPayment" DROP CONSTRAINT "BudgetPayment_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetPayment" DROP CONSTRAINT "BudgetPayment_budgetItemId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetPaymentCurrency" DROP CONSTRAINT "BudgetPaymentCurrency_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetPaymentCurrency" DROP CONSTRAINT "BudgetPaymentCurrency_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetPaymentCurrency" DROP CONSTRAINT "BudgetPaymentCurrency_budgetPaymentId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessional" DROP CONSTRAINT "BudgetProfessional_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessional" DROP CONSTRAINT "BudgetProfessional_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessional" DROP CONSTRAINT "BudgetProfessional_budgetItemId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessional" DROP CONSTRAINT "BudgetProfessional_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessionalSchedule" DROP CONSTRAINT "BudgetProfessionalSchedule_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessionalSchedule" DROP CONSTRAINT "BudgetProfessionalSchedule_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessionalSchedule" DROP CONSTRAINT "BudgetProfessionalSchedule_budgetProfessionalId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetProfessionalSchedule" DROP CONSTRAINT "BudgetProfessionalSchedule_sheduleId_fkey";

-- DropForeignKey
ALTER TABLE "InvoicePayable" DROP CONSTRAINT "InvoicePayable_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceReceivable" DROP CONSTRAINT "InvoiceReceivable_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalService" DROP CONSTRAINT "ProfessionalService_accountId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalService" DROP CONSTRAINT "ProfessionalService_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalService" DROP CONSTRAINT "ProfessionalService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceExam" DROP CONSTRAINT "ServiceExam_examId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceExam" DROP CONSTRAINT "ServiceExam_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceHealthInsurance" DROP CONSTRAINT "ServiceHealthInsurance_accountId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceHealthInsurance" DROP CONSTRAINT "ServiceHealthInsurance_healthInsuranceId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceHealthInsurance" DROP CONSTRAINT "ServiceHealthInsurance_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceInstrument" DROP CONSTRAINT "ServiceInstrument_productId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceInstrument" DROP CONSTRAINT "ServiceInstrument_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_productId_fkey";

-- AlterTable
ALTER TABLE "BenefitItem" ADD COLUMN     "itemCatalogId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "InvoicePayable" DROP COLUMN "budgetId",
ADD COLUMN     "orderId" UUID;

-- AlterTable
ALTER TABLE "InvoiceReceivable" DROP COLUMN "budgetId",
ADD COLUMN     "orderId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "costPrice",
DROP COLUMN "flagBenefit",
DROP COLUMN "observationForPatient",
DROP COLUMN "observationForProfessional",
DROP COLUMN "price",
DROP COLUMN "category",
ADD COLUMN     "category" "CategoryItem" NOT NULL DEFAULT 'SERVICE';

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "serviceId",
ADD COLUMN     "itemCatalogId" UUID NOT NULL,
ADD COLUMN     "itemId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "entryDate",
DROP COLUMN "outputDate",
DROP COLUMN "productId",
ADD COLUMN     "entryAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "itemCatalogId" UUID NOT NULL,
ADD COLUMN     "outputAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Budget";

-- DropTable
DROP TABLE "BudgetItem";

-- DropTable
DROP TABLE "BudgetPayment";

-- DropTable
DROP TABLE "BudgetPaymentCurrency";

-- DropTable
DROP TABLE "BudgetProfessional";

-- DropTable
DROP TABLE "BudgetProfessionalSchedule";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProfessionalService";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "ServiceExam";

-- DropTable
DROP TABLE "ServiceHealthInsurance";

-- DropTable
DROP TABLE "ServiceInstrument";

-- DropEnum
DROP TYPE "BodyMenbers";

-- DropEnum
DROP TYPE "BudgetStatus";

-- DropEnum
DROP TYPE "Category";

-- CreateTable
CREATE TABLE "ItemCatalog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "itemId" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" DECIMAL NOT NULL DEFAULT 0.00,
    "costPrice" DECIMAL NOT NULL DEFAULT 0.00,
    "flagBenefit" BOOLEAN DEFAULT false,
    "manufacturer" VARCHAR(255),
    "duration" INTEGER,
    "bodyMembers" "BodyMembers" NOT NULL DEFAULT 'ARMS',
    "observationForProfessional" TEXT NOT NULL,
    "observationForPatient" TEXT NOT NULL,
    "expiryAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemHealthInsurance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "itemCatalogId" UUID NOT NULL,
    "healthInsuranceId" UUID NOT NULL,
    "paymentValue" DECIMAL NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemHealthInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInstrument" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "itemId" UUID NOT NULL,
    "itemCatalogId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemInstrument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemExamHealth" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "itemCatalogId" UUID NOT NULL,
    "examId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemExamHealth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "professionalId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "itemCatalogId" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "formOfPayment" "FormOfPayment" NOT NULL DEFAULT 'FIXED',
    "valuePayment" DECIMAL NOT NULL DEFAULT 0.00,
    "paymentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProfessionalItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "healthInsuranceId" UUID,
    "status" "OrderStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "itemCatalogId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProfessional" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "orderItemId" UUID,
    "professionalId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OrderProfessional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProfessionalSchedule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "orderProfessionalId" UUID NOT NULL,
    "sheduleId" UUID,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OrderProfessionalSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPayment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "orderItemId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "valuePayment" DECIMAL NOT NULL DEFAULT 0.00,
    "valueDiscount" DECIMAL NOT NULL DEFAULT 0.00,
    "valueTotal" DECIMAL NOT NULL DEFAULT 0.00,
    "paymentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OrderPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPaymentCurrency" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "orderPaymentId" UUID NOT NULL,
    "typeCurrencyExchange" "TypeCurrencyExchange" NOT NULL DEFAULT 'BRL',
    "valueReceived" DECIMAL NOT NULL DEFAULT 0.00,
    "value" DECIMAL NOT NULL DEFAULT 0.00,
    "formOfPaymentCurrency" "FormOfPaymentCurrency" NOT NULL DEFAULT 'CASH',
    "paymentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OrderPaymentCurrency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemCatalog" ADD CONSTRAINT "ItemCatalog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCatalog" ADD CONSTRAINT "ItemCatalog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHealthInsurance" ADD CONSTRAINT "ItemHealthInsurance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHealthInsurance" ADD CONSTRAINT "ItemHealthInsurance_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHealthInsurance" ADD CONSTRAINT "ItemHealthInsurance_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemHealthInsurance" ADD CONSTRAINT "ItemHealthInsurance_healthInsuranceId_fkey" FOREIGN KEY ("healthInsuranceId") REFERENCES "HealthInsurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstrument" ADD CONSTRAINT "ItemInstrument_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstrument" ADD CONSTRAINT "ItemInstrument_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExamHealth" ADD CONSTRAINT "ItemExamHealth_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExamHealth" ADD CONSTRAINT "ItemExamHealth_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemExamHealth" ADD CONSTRAINT "ItemExamHealth_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalItem" ADD CONSTRAINT "ProfessionalItem_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalItem" ADD CONSTRAINT "ProfessionalItem_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalItem" ADD CONSTRAINT "ProfessionalItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalItem" ADD CONSTRAINT "ProfessionalItem_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_healthInsuranceId_fkey" FOREIGN KEY ("healthInsuranceId") REFERENCES "HealthInsurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessional" ADD CONSTRAINT "OrderProfessional_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessional" ADD CONSTRAINT "OrderProfessional_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessional" ADD CONSTRAINT "OrderProfessional_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessional" ADD CONSTRAINT "OrderProfessional_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessionalSchedule" ADD CONSTRAINT "OrderProfessionalSchedule_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessionalSchedule" ADD CONSTRAINT "OrderProfessionalSchedule_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessionalSchedule" ADD CONSTRAINT "OrderProfessionalSchedule_orderProfessionalId_fkey" FOREIGN KEY ("orderProfessionalId") REFERENCES "OrderProfessional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProfessionalSchedule" ADD CONSTRAINT "OrderProfessionalSchedule_sheduleId_fkey" FOREIGN KEY ("sheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPayment" ADD CONSTRAINT "OrderPayment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPayment" ADD CONSTRAINT "OrderPayment_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPayment" ADD CONSTRAINT "OrderPayment_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPaymentCurrency" ADD CONSTRAINT "OrderPaymentCurrency_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPaymentCurrency" ADD CONSTRAINT "OrderPaymentCurrency_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPaymentCurrency" ADD CONSTRAINT "OrderPaymentCurrency_orderPaymentId_fkey" FOREIGN KEY ("orderPaymentId") REFERENCES "OrderPayment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BenefitItem" ADD CONSTRAINT "BenefitItem_itemCatalogId_fkey" FOREIGN KEY ("itemCatalogId") REFERENCES "ItemCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceReceivable" ADD CONSTRAINT "InvoiceReceivable_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicePayable" ADD CONSTRAINT "InvoicePayable_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
