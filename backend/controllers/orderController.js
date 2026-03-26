const db = require('../config/db');

// 🟢 PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const { name, address, phone, items, total, user_id } = req.body;

    console.log("ORDER BODY:", req.body);

    // 🔥 Insert Order
    const orderResult = await db.query(
      `INSERT INTO orders (name, address, phone, total, user_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, address, phone, total, user_id]
    );

    const orderId = orderResult.rows[0].id;

    // 🔥 Insert Order Items (loop because PostgreSQL me VALUES ? nahi hota)
    for (let item of items) {

  // 🔥 product DB se fetch karo
  const productRes = await db.query(
    "SELECT name, image, description FROM products WHERE id=$1",
    [item.id]
  );

  const product = productRes.rows[0];

  await db.query(
    `INSERT INTO order_items 
    (order_id, product_id, name, price, quantity, image, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      orderId,
      item.id,
      product.name,
      item.price,
      item.quantity,
      product.image,        // ✅ correct image
      product.description   // ✅ description bhi save
    ]
  );
}

    res.json({ message: "Order placed successfully ✅" });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json(err);
  }
};

// 🟢 GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM orders ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🟢 GET ORDER DETAILS
exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    const result = await db.query(
      "SELECT * FROM order_items WHERE order_id=$1",
      [orderId]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json(err);
  }
};

// 🟢 UPDATE STATUS (FIXED)
exports.updateStatus = async (req, res) => {
  try {
    const orderId = req.params.id;

    await db.query(
      "UPDATE orders SET status='Accepted' WHERE id=$1",
      [orderId]
    );

    res.json({ message: "Order Accepted ✅" });

  } catch (err) {
    res.status(500).json(err);
  }
};

// 🟢 UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      "UPDATE orders SET status=$1 WHERE id=$2",
      [status, id]
    );

    res.json({ message: "Status updated ✅" });

  } catch (err) {
    res.status(500).json(err);
  }
};

// 🟢 GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await db.query(
      "SELECT * FROM orders WHERE user_id=$1 ORDER BY id DESC",
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json(err);
  }
};