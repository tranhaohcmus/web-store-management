const {
  Cart,
  CartItem,
  ProductVariant,
  Product,
  StockReservation,
} = require("../models");
const {
  createReservation,
  updateReservation,
  releaseReservation,
  checkStockAvailability,
} = require("../utils/stockHelpers");
const { successResponse, errorResponse } = require("../utils/responseHelpers");
const db = require("../models");

// Get cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              attributes: [
                "id",
                "sku",
                "price",
                "promotion_price",
                "available_stock",
                "image_url",
                "status",
              ],
              include: [
                {
                  model: Product,
                  as: "product",
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!cart) {
      cart = await Cart.create({ customer_id: req.user.id });
      cart.items = [];
    }

    // Calculate summary
    const summary = {
      item_count: cart.items.length,
      total_quantity: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.items.reduce((sum, item) => {
        const price = item.variant.promotion_price || item.variant.price;
        return sum + price * item.quantity;
      }, 0),
    };

    const cartData = cart.toJSON();
    cartData.summary = summary;

    return successResponse(res, "Cart retrieved successfully", cartData);
  } catch (error) {
    console.error("Error getting cart:", error);
    return errorResponse(res, "Error retrieving cart", null, 500);
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { variant_id, quantity = 1 } = req.body;

    // Check stock availability
    await checkStockAvailability(variant_id, quantity);

    // Get or create cart
    let cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      transaction,
    });
    if (!cart) {
      cart = await Cart.create({ customer_id: req.user.id }, { transaction });
    }

    // Check if item already exists in cart
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, variant_id },
      transaction,
    });

    if (cartItem) {
      // Update existing item
      const newQuantity = cartItem.quantity + quantity;
      await checkStockAvailability(variant_id, newQuantity);

      await cartItem.update({ quantity: newQuantity }, { transaction });

      // Update reservation
      const reservation = await StockReservation.findOne({
        where: { cart_id: cart.id, variant_id, status: "active" },
        transaction,
      });
      if (reservation) {
        await updateReservation(reservation, newQuantity, transaction);
      } else {
        await createReservation(variant_id, cart.id, newQuantity, transaction);
      }
    } else {
      // Create new cart item
      cartItem = await CartItem.create(
        {
          cart_id: cart.id,
          variant_id,
          quantity,
        },
        { transaction }
      );

      // Create stock reservation
      await createReservation(variant_id, cart.id, quantity, transaction);
    }

    await transaction.commit();

    // Get updated cart summary
    const updatedCart = await Cart.findOne({
      where: { id: cart.id },
      include: [{ model: CartItem, as: "items" }],
    });

    const summary = {
      item_count: updatedCart.items.length,
      total_quantity: updatedCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
    };

    return successResponse(
      res,
      "Item added to cart successfully",
      {
        cart_item: cartItem,
        cart_summary: summary,
      },
      null,
      201
    );
  } catch (error) {
    await transaction.rollback();
    console.error("Error adding to cart:", error);
    return errorResponse(
      res,
      error.message || "Error adding to cart",
      null,
      400
    );
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { quantity } = req.body;

    // Get cart
    const cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      transaction,
    });
    if (!cart) {
      return errorResponse(res, "Cart not found", null, 404);
    }

    // Get cart item
    const cartItem = await CartItem.findOne({
      where: { id: req.params.id, cart_id: cart.id },
      transaction,
    });

    if (!cartItem) {
      return errorResponse(res, "Cart item not found", null, 404);
    }

    // Check stock
    await checkStockAvailability(cartItem.variant_id, quantity);

    // Update cart item
    await cartItem.update({ quantity }, { transaction });

    // Update reservation
    const reservation = await StockReservation.findOne({
      where: {
        cart_id: cart.id,
        variant_id: cartItem.variant_id,
        status: "active",
      },
      transaction,
    });

    if (reservation) {
      await updateReservation(reservation, quantity, transaction);
    }

    await transaction.commit();

    return successResponse(res, "Cart item updated successfully", cartItem);
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating cart item:", error);
    return errorResponse(
      res,
      error.message || "Error updating cart item",
      null,
      400
    );
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      transaction,
    });
    if (!cart) {
      return errorResponse(res, "Cart not found", null, 404);
    }

    const cartItem = await CartItem.findOne({
      where: { id: req.params.id, cart_id: cart.id },
      transaction,
    });

    if (!cartItem) {
      return errorResponse(res, "Cart item not found", null, 404);
    }

    // Release reservation
    const reservation = await StockReservation.findOne({
      where: {
        cart_id: cart.id,
        variant_id: cartItem.variant_id,
        status: "active",
      },
      transaction,
    });

    if (reservation) {
      await releaseReservation(reservation, transaction);
    }

    // Delete cart item
    await cartItem.destroy({ transaction });

    await transaction.commit();

    return successResponse(res, "Item removed from cart successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error removing from cart:", error);
    return errorResponse(res, "Error removing from cart", null, 500);
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      transaction,
    });
    if (!cart) {
      return errorResponse(res, "Cart not found", null, 404);
    }

    // Release all reservations
    const reservations = await StockReservation.findAll({
      where: { cart_id: cart.id, status: "active" },
      transaction,
    });

    for (const reservation of reservations) {
      await releaseReservation(reservation, transaction);
    }

    // Delete all cart items
    await CartItem.destroy({ where: { cart_id: cart.id }, transaction });

    await transaction.commit();

    return successResponse(res, "Cart cleared successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error clearing cart:", error);
    return errorResponse(res, "Error clearing cart", null, 500);
  }
};
