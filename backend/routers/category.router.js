const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

/**
 * @route   GET /api/v1/categories
 * @desc    Get all categories (tree structure)
 * @access  Public
 */
router.get("/", categoryController.getAllCategories);

/**
 * @route   GET /api/v1/categories/slug/:slug
 * @desc    Get category by slug
 * @access  Public
 */
router.get("/slug/:slug", categoryController.getCategoryBySlug);

/**
 * @route   GET /api/v1/categories/:id
 * @desc    Get category by ID
 * @access  Public
 */
router.get("/:id", categoryController.getCategoryById);

/**
 * @route   POST /api/v1/categories
 * @desc    Create new category
 * @access  Private/Admin
 */
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  categoryController.createCategory
);

/**
 * @route   PUT /api/v1/categories/:id
 * @desc    Update category
 * @access  Private/Admin
 */
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  categoryController.updateCategory
);

/**
 * @route   DELETE /api/v1/categories/:id
 * @desc    Delete category
 * @access  Private/Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  categoryController.deleteCategory
);

module.exports = router;
