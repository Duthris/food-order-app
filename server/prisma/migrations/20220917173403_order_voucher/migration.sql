/*
  Warnings:

  - You are about to drop the column `voucherId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_voucherId_fkey";

-- DropIndex
DROP INDEX "orders_voucherId_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "voucherId";
