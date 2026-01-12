import express from 'express';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// === GET всі автори ===
app.get('/authors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM authors ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === POST додати автора ===
app.post('/authors', async (req, res) => {
  try {
    const { name, birth_year, bio } = req.body;

    const result = await pool.query(
      'INSERT INTO authors (name, birth_year, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, birth_year, bio]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === DELETE автора ===
app.delete('/authors/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query('DELETE FROM authors WHERE id = $1', [id]);

    res.json({ message: 'Автор видалений' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
