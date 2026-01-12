import express from 'express';
import prisma from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  const books = await prisma.books.findMany({
    include: { authors: true, categories: true }
  });
  res.json(books);
});

// Get book by ID
router.get('/:id', async (req, res) => {
  const book = await prisma.books.findUnique({
    where: { id: Number(req.params.id) },
    include: { authors: true, categories: true }
  });
  res.json(book);
});

// Create book
router.post('/', auth, async (req, res) => {
  const { title, author_id, category_id, published_year, description } = req.body;
  const newBook = await prisma.books.create({
    data: { title, author_id, category_id, published_year, description }
  });
  res.json(newBook);
});

// Update book
router.put('/:id', auth, async (req, res) => {
  const { title, author_id, category_id, published_year, description } = req.body;
  const updated = await prisma.books.update({
    where: { id: Number(req.params.id) },
    data: { title, author_id, category_id, published_year, description }
  });
  res.json(updated);
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  const deleted = await prisma.books.delete({ where: { id: Number(req.params.id) } });
  res.json(deleted);
});

export default router;
