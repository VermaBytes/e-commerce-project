const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Test connection
db.connect()
  .then(client => {
    console.log("Connected to PostgreSQL database");
    client.release(); // important
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });
  console.log("Connected DB:", process.env.DB_NAME);
module.exports = db;