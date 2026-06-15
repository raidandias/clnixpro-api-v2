/*
  Warnings:

  - The `status` column on the `UserResetPassword` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserResetPassword" DROP COLUMN "status",
ADD COLUMN     "status" "UserResetPasswordStatus" NOT NULL DEFAULT 'SEND';
