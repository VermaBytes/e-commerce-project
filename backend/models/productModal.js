const db = require("../config/db");

exports.getLaptops = (callback) => {

const sql = "SELECT * FROM products WHERE category='laptops'";

db.query(sql, callback);

};

exports.getProductById = (id,callback)=>{

const sql = "SELECT * FROM products WHERE id=?";

db.query(sql,[id],callback);

};