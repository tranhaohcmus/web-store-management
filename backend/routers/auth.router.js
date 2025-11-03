const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../middlewares/validations/authValidation");

const router = express.Router();

// Public routes
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/refresh-token", refreshToken);

// Private routes (require authentication)
router.post("/logout", authenticate, logout);

module.exports = router;
