const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Admin routes
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  productController.createProduct
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  productController.deleteProduct
);

module.exports = router;
