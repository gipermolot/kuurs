import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = search
      ? { name: { contains: search, mode: "insensitive" } }
      : {};

    const authors = await prisma.authors.findMany({
      where,
      skip,
      take,
      include: { books: true },
    });
    const total = await prisma.authors.count({ where });

    res.json({ page: parseInt(page), limit: take, total, data: authors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// Get author by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const author = await prisma.authors.findUnique({
    where: { id },
    include: { books: true },
  });
  if (!author) return res.status(404).json({ error: "Автор не знайдений" });
  res.json(author);
});

// Create author
router.post("/", async (req, res) => {
  const { name, birth_year, bio } = req.body;
  const author = await prisma.authors.create({ data: { name, birth_year, bio } });
  res.json(author);
});

// Update author
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, birth_year, bio } = req.body;
  const author = await prisma.authors.update({
    where: { id },
    data: { name, birth_year, bio },
  });
  res.json(author);
});

// Delete author
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.authors.delete({ where: { id } });
  res.json({ message: "Автор видалений" });
});

export default router;