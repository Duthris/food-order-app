-- CreateTable
CREATE TABLE "_BasketToMenu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToMenu_AB_unique" ON "_BasketToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToMenu_B_index" ON "_BasketToMenu"("B");

-- AddForeignKey
ALTER TABLE "_BasketToMenu" ADD CONSTRAINT "_BasketToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "baskets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToMenu" ADD CONSTRAINT "_BasketToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
