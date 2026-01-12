// initDbPostgres.js
import pool from './db.js';

async function init() {
  try {
    // Створюємо таблиці
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
    `);

    console.log('✅ Таблиці створено');

    // Додаємо тестові дані
    await pool.query(`
      INSERT INTO authors (name, birth_year, bio)
      VALUES ('Іван Франко', 1856, 'Український письменник та поет')
      ON CONFLICT DO NOTHING;

      INSERT INTO categories (name)
      VALUES ('Проза'), ('Поезія')
      ON CONFLICT DO NOTHING;
    `);

    console.log('✅ Тестові дані додано');
  } catch (err) {
    console.error('❌ Помилка ініціалізації бази:', err);
  } finally {
    await pool.end();
    console.log('🔌 З\'єднання з PostgreSQL закрито');
  }
}

init();
