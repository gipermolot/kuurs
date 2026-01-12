import express from 'express';
import prisma from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// CRUD аналогічно authors
router.get('/', async (req, res) => {
  const categories = await prisma.categories.findMany();
  res.json(categories);
});

router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  const newCategory = await prisma.categories.create({ data: { name } });
  res.json(newCategory);
});

router.put('/:id', auth, async (req, res) => {
  const { name } = req.body;
  const updated = await prisma.categories.update({
    where: { id: Number(req.params.id) },
    data: { name }
  });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  const deleted = await prisma.categories.delete({ where: { id: Number(req.params.id) } });
  res.json(deleted);
});

export default router;
