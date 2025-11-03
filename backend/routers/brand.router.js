const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

/**
 * @route   GET /api/v1/brands
 * @desc    Get all brands
 * @access  Public
 */
router.get("/", brandController.getAllBrands);

/**
 * @route   GET /api/v1/brands/:id
 * @desc    Get brand by ID
 * @access  Public
 */
router.get("/:id", brandController.getBrandById);

/**
 * @route   POST /api/v1/brands
 * @desc    Create new brand
 * @access  Private/Admin
 */
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  brandController.createBrand
);

/**
 * @route   PUT /api/v1/brands/:id
 * @desc    Update brand
 * @access  Private/Admin
 */
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  brandController.updateBrand
);

/**
 * @route   DELETE /api/v1/brands/:id
 * @desc    Delete brand
 * @access  Private/Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  brandController.deleteBrand
);

module.exports = router;
