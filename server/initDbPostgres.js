import express from 'express';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

async function initTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        birth_year INT,
        bio TEXT
      );

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author_id INT REFERENCES authors(id) ON DELETE SET NULL,
        category_id INT REFERENCES categories(id) ON DELETE SET NULL,
        published_year INT,
        description TEXT
      );

      INSERT INTO authors (name, birth_year, bio)
      VALUES ('Іван Франко', 1856, 'Український письменник та поет')
      ON CONFLICT DO NOTHING;

      INSERT INTO categories (name)
      VALUES ('Проза'), ('Поезія')
      ON CONFLICT DO NOTHING;
    `);

    console.log('✅ Таблиці створено і дані додано');
  } catch (err) {
    console.error('❌ Init error:', err);
  }
}

initTables();

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM authors');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
