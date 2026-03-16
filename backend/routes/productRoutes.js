const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");


router.get("/laptops", productController.getLaptopProducts);

router.get("/details/:id",productController.getProductDetails);

router.get("/all",productController.getAllProducts);

router.post('/add', upload.single('image'), productController.addProduct);

router.delete("/delete/:id", productController.deleteProduct);

router.get("/:id", productController.getProduct);

router.put('/update/:id', productController.updateProduct);

module.exports = router;