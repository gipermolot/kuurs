/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_category_id_fkey";

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
