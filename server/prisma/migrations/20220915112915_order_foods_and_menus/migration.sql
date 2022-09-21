-- CreateTable
CREATE TABLE "_MenuToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FoodToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToOrder_AB_unique" ON "_MenuToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToOrder_B_index" ON "_MenuToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToOrder_AB_unique" ON "_FoodToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToOrder_B_index" ON "_FoodToOrder"("B");

-- AddForeignKey
ALTER TABLE "_MenuToOrder" ADD CONSTRAINT "_MenuToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToOrder" ADD CONSTRAINT "_MenuToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToOrder" ADD CONSTRAINT "_FoodToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToOrder" ADD CONSTRAINT "_FoodToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
