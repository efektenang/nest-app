-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
