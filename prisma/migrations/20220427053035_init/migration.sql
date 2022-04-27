/*
  Warnings:

  - You are about to drop the column `bio` on the `Highlight` table. All the data in the column will be lost.
  - Added the required column `text` to the `Highlight` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Highlight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page" INTEGER,
    "text" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    CONSTRAINT "Highlight_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Highlight" ("bookId", "id") SELECT "bookId", "id" FROM "Highlight";
DROP TABLE "Highlight";
ALTER TABLE "new_Highlight" RENAME TO "Highlight";
CREATE UNIQUE INDEX "Highlight_bookId_key" ON "Highlight"("bookId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
