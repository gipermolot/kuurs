import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = search
      ? { name: { contains: search, mode: "insensitive" } }
      : {};

    const categories = await prisma.categories.findMany({
      where,
      skip,
      take,
      include: { books: true },
    });
    const total = await prisma.categories.count({ where });

    res.json({ page: parseInt(page), limit: take, total, data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const category = await prisma.categories.findUnique({
    where: { id },
    include: { books: true },
  });
  if (!category) return res.status(404).json({ error: "Категорія не знайдена" });
  res.json(category);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const category = await prisma.categories.create({ data: { name } });
  res.json(category);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const category = await prisma.categories.update({ where: { id }, data: { name } });
  res.json(category);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.categories.delete({ where: { id } });
  res.json({ message: "Категорія видалена" });
});

export default router;
