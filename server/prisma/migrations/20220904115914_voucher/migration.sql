/*
  Warnings:

  - Added the required column `name` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'preparing';

-- AlterTable
ALTER TABLE "vouchers" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
