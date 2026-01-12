import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Тестові дані один раз (можна коментувати після першого запуску)
async function seed() {
  const author = await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Іван Франко",
      birth_year: 1856,
      bio: "Український письменник та поет",
    },
  });

  const categories = ["Проза", "Поезія"];
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

seed();

app.get('/', async (req, res) => {
  const authors = await prisma.author.findMany();
  res.json(authors);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
