/*
  Warnings:

  - You are about to drop the column `orderId` on the `foods` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "foods" DROP CONSTRAINT "foods_orderId_fkey";

-- AlterTable
ALTER TABLE "foods" DROP COLUMN "orderId";
