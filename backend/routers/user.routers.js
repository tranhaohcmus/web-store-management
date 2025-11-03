const express = require("express");
const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth/authenticate");

const router = express.Router();

// All user routes require authentication
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.post("/change-password", authenticate, changePassword);

module.exports = router;
