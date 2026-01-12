/*
  Warnings:

  - Made the column `author_id` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category_id` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_category_id_fkey";

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "author_id" SET NOT NULL,
ALTER COLUMN "category_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
