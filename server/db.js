// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('✅ Підключено до PostgreSQL!');
});

pool.on('error', (err) => {
  console.error('❌ Помилка PostgreSQL:', err);
});

export default pool;
