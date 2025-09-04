// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',        // Your DB host
  user: 'root',             // Your DB user
  password: '',             // Your DB password
  database: 'your_db_name', // Your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
