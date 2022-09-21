/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_name_key" ON "addresses"("name");
