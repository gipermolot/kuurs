import express from 'express';
import prisma from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all authors
router.get('/', async (req, res) => {
  const authors = await prisma.authors.findMany();
  res.json(authors);
});

// Get author by ID
router.get('/:id', async (req, res) => {
  const author = await prisma.authors.findUnique({ where: { id: Number(req.params.id) } });
  res.json(author);
});

// Create author
router.post('/', auth, async (req, res) => {
  const { name, birth_year, bio } = req.body;
  const newAuthor = await prisma.authors.create({ data: { name, birth_year, bio } });
  res.json(newAuthor);
});

// Update author
router.put('/:id', auth, async (req, res) => {
  const { name, birth_year, bio } = req.body;
  const updated = await prisma.authors.update({
    where: { id: Number(req.params.id) },
    data: { name, birth_year, bio }
  });
  res.json(updated);
});

// Delete author
router.delete('/:id', auth, async (req, res) => {
  const deleted = await prisma.authors.delete({ where: { id: Number(req.params.id) } });
  res.json(deleted);
});

export default router;
