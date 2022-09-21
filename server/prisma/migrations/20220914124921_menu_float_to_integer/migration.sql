/*
  Warnings:

  - You are about to alter the column `menuPrice` on the `menus` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "menuPrice" SET DEFAULT 0,
ALTER COLUMN "menuPrice" SET DATA TYPE INTEGER;
