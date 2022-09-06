/*
  Warnings:

  - Made the column `expiredAt` on table `vouchers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "vouchers" ALTER COLUMN "expiredAt" SET NOT NULL;
