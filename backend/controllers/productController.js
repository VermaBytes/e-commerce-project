const db = require("../config/db");

// 🟢 GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 GET LAPTOP PRODUCTS
exports.getLaptopProducts = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM products WHERE category=$1",
      ["laptops"]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("LAPTOP ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // 🔥 Check image
    if (!req.file) {
      return res.status(400).json({ message: "Image is required ❌" });
    }

    const image = req.file.filename;

    await db.query(
      `INSERT INTO products (name, description, price, category, image)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, description, price, category, image]
    );

    res.json({
      message: "Product Added Successfully ✅",
    });

  } catch (err) {
    console.error("ADD ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM products WHERE id=$1", [id]);

    res.json({
      message: "Product Deleted Successfully ✅",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 GET SINGLE PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.query(
      "SELECT * FROM products WHERE id=$1",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, category } = req.body;

    await db.query(
      `UPDATE products 
       SET name=$1, description=$2, price=$3, category=$4
       WHERE id=$5`,
      [name, description, price, category, id]
    );

    res.json({
      message: "Product Updated Successfully ✅",
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 GET PRODUCTS BY CATEGORY
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const result = await db.query(
      "SELECT * FROM products WHERE category=$1",
      [category]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("CATEGORY ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 GET PRODUCT DETAILS
exports.getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.query(
      "SELECT * FROM products WHERE id=$1",
      [id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json(err);
  }
};