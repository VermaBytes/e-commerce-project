const Product = require("../models/productModal");
const db = require("../config/db");

exports.getLaptopProducts = (req, res) => {
  Product.getLaptops((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.getProductDetails = (req, res) => {
  const id = req.params.id;

  Product.getProductById(id, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
};

exports.getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  const { name, description, price, category } = req.body;

  const image = req.file.filename;

  const sql = `
INSERT INTO products (name,description,price,category,image)
VALUES (?,?,?,?,?)
`;

  db.query(sql, [name, description, price, category, image], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Product Added Successfully",
    });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Product Deleted",
    });
  });
};

exports.getProduct = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {
    res.json(result[0]);
  });
};


// UPDATE PRODUCT

exports.updateProduct = (req, res) => {

const id = req.params.id;

const { name, description, price, category } = req.body;

const sql = `
UPDATE products 
SET name=?, description=?, price=?, category=? 
WHERE id=?`;

db.query(sql,
[name, description, price, category, id],
(err, result) => {

if(err){
return res.status(500).json(err);
}

res.json({
message:"Product Updated Successfully"
});

});

};