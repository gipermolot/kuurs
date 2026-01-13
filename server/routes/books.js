import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { author, category, search, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      AND: [
        author ? { authors: { name: author } } : {},
        category ? { categories: { name: category } } : {},
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    const books = await prisma.books.findMany({
      where,
      skip,
      take,
      include: { authors: true, categories: true },
    });

    const total = await prisma.books.count({ where });

    res.json({ page: parseInt(page), limit: take, total, data: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await prisma.books.findUnique({
    where: { id },
    include: { authors: true, categories: true },
  });
  if (!book) return res.status(404).json({ error: "Книга не знайдена" });
  res.json(book);
});

router.post("/", async (req, res) => {
  const { title, authorId, categoryId, published_year, description } = req.body;
  const book = await prisma.books.create({
    data: { title, author_id: authorId, category_id: categoryId, published_year, description },
  });
  res.json(book);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, authorId, categoryId, published_year, description } = req.body;
  const book = await prisma.books.update({
    where: { id },
    data: { title, author_id: authorId, category_id: categoryId, published_year, description },
  });
  res.json(book);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.books.delete({ where: { id } });
  res.json({ message: "Книга видалена" });
});

export default router;
