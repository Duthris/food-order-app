/*
  Warnings:

  - A unique constraint covering the columns `[voucherId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "voucherId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "orders_voucherId_key" ON "orders"("voucherId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "vouchers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
