/*
  Warnings:

  - A unique constraint covering the columns `[restaurantUserId]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "restaurants_restaurantUserId_key" ON "restaurants"("restaurantUserId");
