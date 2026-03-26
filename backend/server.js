require("dotenv").config();
const express = require("express");
const cors = require("cors");

const createTables = require('./config/dbInit');
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes);
app.use('/api/orders', orderRoutes);

// ✅ IMPORTANT FIX
const startServer = async () => {
  try {
    await createTables(); // pehle tables banenge

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server start failed:", err);
  }
};

startServer();