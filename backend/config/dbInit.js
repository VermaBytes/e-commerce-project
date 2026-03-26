const db = require('./db');

const createTables = async () => {
  try {

    // USERS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(15),
        otp INTEGER NULL,
        otp_expiry BIGINT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users Table Ready');


    // PRODUCTS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,

        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100),

        image VARCHAR(255),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Products Table Ready');


    // ORDERS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,

        name VARCHAR(100),
        address TEXT,
        phone VARCHAR(15),

        total DECIMAL(10,2),

        status VARCHAR(50) DEFAULT 'Pending',

        user_id INTEGER,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Orders Table Ready');


    // ORDER ITEMS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,

        order_id INTEGER,
        product_id INTEGER,

        name VARCHAR(255),
        price DECIMAL(10,2),
        quantity INTEGER,

        image VARCHAR(255)
      )
    `);
    console.log('✅ Order Items Table Ready');


  } catch (err) {
    console.error('❌ Table Creation Error:', err);
  }
};

module.exports = createTables;