const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth/authenticate");

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/orders
 * @desc    Get all orders for current user
 * @access  Private
 */
router.get("/", orderController.getAllOrders);

/**
 * @route   GET /api/v1/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get("/:id", orderController.getOrderById);

/**
 * @route   POST /api/v1/orders
 * @desc    Create order (checkout)
 * @access  Private
 */
router.post("/", orderController.createOrder);

/**
 * @route   POST /api/v1/orders/:id/cancel
 * @desc    Cancel an order
 * @access  Private
 */
router.post("/:id/cancel", orderController.cancelOrder);

/**
 * @route   POST /api/v1/orders/:id/reorder
 * @desc    Reorder items from a previous order
 * @access  Private
 */
router.post("/:id/reorder", orderController.reorder);

module.exports = router;
