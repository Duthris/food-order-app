/*
  Warnings:

  - You are about to drop the column `total` on the `baskets` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_userId_fkey";

-- AlterTable
ALTER TABLE "baskets" DROP COLUMN "total",
ADD COLUMN     "amount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentId",
ADD COLUMN     "amount" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "payments";
