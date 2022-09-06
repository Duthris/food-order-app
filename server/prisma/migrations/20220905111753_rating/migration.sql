/*
  Warnings:

  - You are about to drop the column `foodId` on the `ratings` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_foodId_fkey";

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "foodId",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
