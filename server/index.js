import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// ==========================
// CRUD Authors
// ==========================

// Get all authors with search & pagination
app.get("/authors", async (req, res) => {
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
app.get("/authors/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const author = await prisma.authors.findUnique({
    where: { id },
    include: { books: true },
  });
  if (!author) return res.status(404).json({ error: "Автор не знайдений" });
  res.json(author);
});

// Create author
app.post("/authors", async (req, res) => {
  const { name, birth_year, bio } = req.body;
  const author = await prisma.authors.create({ data: { name, birth_year, bio } });
  res.json(author);
});

// Update author
app.put("/authors/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, birth_year, bio } = req.body;
  const author = await prisma.authors.update({
    where: { id },
    data: { name, birth_year, bio },
  });
  res.json(author);
});

// Delete author
app.delete("/authors/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.authors.delete({ where: { id } });
  res.json({ message: "Автор видалений" });
});

// ==========================
// CRUD Categories
// ==========================
app.get("/categories", async (req, res) => {
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

app.get("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const category = await prisma.categories.findUnique({
    where: { id },
    include: { books: true },
  });
  if (!category) return res.status(404).json({ error: "Категорія не знайдена" });
  res.json(category);
});

app.post("/categories", async (req, res) => {
  const { name } = req.body;
  const category = await prisma.categories.create({ data: { name } });
  res.json(category);
});

app.put("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const category = await prisma.categories.update({ where: { id }, data: { name } });
  res.json(category);
});

app.delete("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.categories.delete({ where: { id } });
  res.json({ message: "Категорія видалена" });
});

// ==========================
// CRUD Books + фільтри, пошук, пагінація
// ==========================
app.get("/books", async (req, res) => {
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

app.get("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await prisma.books.findUnique({
    where: { id },
    include: { authors: true, categories: true },
  });
  if (!book) return res.status(404).json({ error: "Книга не знайдена" });
  res.json(book);
});

app.post("/books", async (req, res) => {
  const { title, authorId, categoryId, published_year, description } = req.body;
  const book = await prisma.books.create({
    data: { title, author_id: authorId, category_id: categoryId, published_year, description },
  });
  res.json(book);
});

app.put("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, authorId, categoryId, published_year, description } = req.body;
  const book = await prisma.books.update({
    where: { id },
    data: { title, author_id: authorId, category_id: categoryId, published_year, description },
  });
  res.json(book);
});

app.delete("/books/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.books.delete({ where: { id } });
  res.json({ message: "Книга видалена" });
});

// ==========================
// Запуск сервера
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

