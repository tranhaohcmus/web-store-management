const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { authenticate } = require("../middlewares/auth/authenticate");

// All cart routes require authentication
router.use(authenticate);

router.get("/", cartController.getCart);
router.post("/items", cartController.addToCart);
router.put("/items/:id", cartController.updateCartItem);
router.delete("/items/:id", cartController.removeFromCart);
router.delete("/", cartController.clearCart);

module.exports = router;
