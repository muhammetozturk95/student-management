const { Pool } = require('pg');

const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'students',
//   password: 'Muhammet258612',
//   port: 5432,
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'students',
  password: process.env.DB_PASSWORD || 'Muhammet258612',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
