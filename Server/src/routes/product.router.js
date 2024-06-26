const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
router.post("/create-order", productController.createOrder);
router.put("/data/:productId", productController.updateProduct);
router.delete("/data/:id", productController.deleteProduct);
router.get("/data/:category_id", productController.getProductById);
router.get("/increaseViews/:productId", productController.increaseView);
router.post("/data", productController.createProduct);
router.get("/dataLimit", productController.getLimitedProducts);
router.get("/data", productController.getAllProducts);
router.get("/", productController.getAllProducts);
module.exports = router;
