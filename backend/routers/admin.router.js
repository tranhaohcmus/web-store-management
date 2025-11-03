const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const adminProductController = require("../controllers/adminProduct.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const { uploadProductImage } = require("../middlewares/uploads");

// All routes require admin authorization
router.use(authenticate);
router.use(authorize(["admin"]));

/**
 * @route   GET /api/v1/admin/dashboard
 * @desc    Get dashboard statistics
 * @access  Private/Admin
 */
router.get("/dashboard", adminController.getDashboardStats);

/**
 * @route   GET /api/v1/admin/orders
 * @desc    Get all orders (admin view)
 * @access  Private/Admin
 */
router.get("/orders", adminController.getAllOrders);

/**
 * @route   PATCH /api/v1/admin/orders/:id/status
 * @desc    Update order status
 * @access  Private/Admin
 */
router.patch("/orders/:id/status", adminController.updateOrderStatus);

/**
 * @route   GET /api/v1/admin/orders/:id
 * @desc    Get order by ID (admin view)
 * @access  Private/Admin
 */
router.get("/orders/:id", adminController.getOrderById);

/**
 * @route   GET /api/v1/admin/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get("/users", adminController.getAllUsers);

/**
 * @route   PATCH /api/v1/admin/users/:id/role
 * @desc    Update user role
 * @access  Private/Admin
 */
router.patch("/users/:id/role", adminController.updateUserRole);

/**
 * @route   GET /api/v1/admin/stock-reservations
 * @desc    Get all stock reservations
 * @access  Private/Admin
 */
router.get("/stock-reservations", adminController.getStockReservations);

/**
 * @route   POST /api/v1/admin/stock-reservations/release-expired
 * @desc    Manually release expired stock reservations
 * @access  Private/Admin
 */
router.post(
  "/stock-reservations/release-expired",
  adminController.releaseExpiredReservations
);

// ============ PRODUCT MANAGEMENT ROUTES ============

/**
 * @route   GET /api/v1/admin/product-types
 * @desc    Get all product types with attributes
 * @access  Private/Admin
 */
router.get("/product-types", adminProductController.getProductTypes);

/**
 * @route   GET /api/v1/admin/products
 * @desc    Get all products (admin view with filters)
 * @access  Private/Admin
 */
router.get("/products", adminProductController.getAllProducts);

/**
 * @route   POST /api/v1/admin/products
 * @desc    Create new product
 * @access  Private/Admin
 */
router.post(
  "/products",
  uploadProductImage,
  adminProductController.createProduct
);

/**
 * @route   GET /api/v1/admin/products/:id
 * @desc    Get product by ID (admin view)
 * @access  Private/Admin
 */
router.get("/products/:id", adminProductController.getProductById);

/**
 * @route   PUT /api/v1/admin/products/:id
 * @desc    Update product
 * @access  Private/Admin
 */
router.put(
  "/products/:id",
  uploadProductImage,
  adminProductController.updateProduct
);

/**
 * @route   DELETE /api/v1/admin/products/:id
 * @desc    Delete product (soft delete)
 * @access  Private/Admin
 */
router.delete("/products/:id", adminProductController.deleteProduct);

/**
 * @route   POST /api/v1/admin/products/:id/variants
 * @desc    Add variant to product
 * @access  Private/Admin
 */
router.post(
  "/products/:id/variants",
  uploadProductImage,
  adminProductController.addVariant
);

/**
 * @route   PUT /api/v1/admin/products/:productId/variants/:variantId
 * @desc    Update product variant
 * @access  Private/Admin
 */
router.put(
  "/products/:productId/variants/:variantId",
  uploadProductImage,
  adminProductController.updateVariant
);

/**
 * @route   DELETE /api/v1/admin/products/:productId/variants/:variantId
 * @desc    Delete product variant
 * @access  Private/Admin
 */
router.delete(
  "/products/:productId/variants/:variantId",
  adminProductController.deleteVariant
);

module.exports = router;
