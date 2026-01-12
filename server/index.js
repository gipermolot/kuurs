// index.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // для body JSON

// ==================== AUTHORS ====================

// Отримати всіх авторів
app.get('/authors', async (req, res) => {
  try {
    const authors = await prisma.authors.findMany();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Отримати одного автора
app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.authors.findUnique({ where: { id: Number(id) } });
    if (!author) return res.status(404).json({ error: 'Автор не знайдений' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Створити автора
app.post('/authors', async (req, res) => {
  const { name, birth_year, bio } = req.body;
  try {
    const newAuthor = await prisma.authors.create({
      data: { name, birth_year, bio }
    });
    res.json(newAuthor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Оновити автора
app.put('/authors/:id', async (req, res) => {
  const { id } = req.params;
  const { name, birth_year, bio } = req.body;
  try {
    const updated = await prisma.authors.update({
      where: { id: Number(id) },
      data: { name, birth_year, bio }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Видалити автора
app.delete('/authors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.authors.delete({ where: { id: Number(id) } });
    res.json({ message: 'Автор видалений' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== CATEGORIES ====================

// Отримати всі категорії
app.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRUD для категорій аналогічно авторам
app.get('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.categories.findUnique({ where: { id: Number(id) } });
    if (!category) return res.status(404).json({ error: 'Категорія не знайдена' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/categories', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.categories.create({ data: { name } });
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updated = await prisma.categories.update({
      where: { id: Number(id) },
      data: { name }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categories.delete({ where: { id: Number(id) } });
    res.json({ message: 'Категорія видалена' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== BOOKS ====================

// Отримати всі книги
app.get('/books', async (req, res) => {
  try {
    const books = await prisma.books.findMany({
      include: { authors: true, categories: true }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Отримати книгу за id
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.books.findUnique({
      where: { id: Number(id) },
      include: { authors: true, categories: true }
    });
    if (!book) return res.status(404).json({ error: 'Книга не знайдена' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Створити книгу
app.post('/books', async (req, res) => {
  const { title, author_id, category_id, published_year, description } = req.body;
  try {
    const newBook = await prisma.books.create({
      data: { title, author_id, category_id, published_year, description }
    });
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Оновити книгу
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author_id, category_id, published_year, description } = req.body;
  try {
    const updated = await prisma.books.update({
      where: { id: Number(id) },
      data: { title, author_id, category_id, published_year, description }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Видалити книгу
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.books.delete({ where: { id: Number(id) } });
    res.json({ message: 'Книга видалена' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SERVER ====================
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
