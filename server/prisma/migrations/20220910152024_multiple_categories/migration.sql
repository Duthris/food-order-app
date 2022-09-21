-- CreateTable
CREATE TABLE "_CategoryToRestaurant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRestaurant_AB_unique" ON "_CategoryToRestaurant"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRestaurant_B_index" ON "_CategoryToRestaurant"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToRestaurant" ADD CONSTRAINT "_CategoryToRestaurant_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRestaurant" ADD CONSTRAINT "_CategoryToRestaurant_B_fkey" FOREIGN KEY ("B") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
