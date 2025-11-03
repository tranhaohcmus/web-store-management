const {
  Order,
  OrderItem,
  ProductVariant,
  Product,
  User,
  Address,
} = require("../models");
const { Cart, CartItem, StockReservation } = require("../models");
const { Op } = require("sequelize");
const db = require("../models");
const {
  generateOrderNumber,
  calculateShippingFee,
  buildVariantSnapshot,
} = require("../utils/orderHelpers");
const {
  convertReservations,
  releaseReservation,
  checkStockAvailability,
} = require("../utils/stockHelpers");
const {
  successResponse,
  errorResponse,
  getPaginationMeta,
} = require("../utils/responseHelpers");

/**
 * @route   GET /api/v1/orders
 * @desc    Get all orders for current user
 * @access  Private
 */
exports.getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sort = "created_at",
      order = "desc",
    } = req.query;

    const where = { customer_id: req.user.id };
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              include: [{ model: Product, as: "product" }],
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset,
      order: [[sort, order.toUpperCase()]],
    });

    const meta = getPaginationMeta(page, limit, count);
    return successResponse(res, "Orders retrieved successfully", rows, meta);
  } catch (error) {
    console.error("Error getting orders:", error);
    return errorResponse(res, "Error retrieving orders", null, 500);
  }
};

/**
 * @route   GET /api/v1/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        customer_id: req.user.id, // Only allow user to see their own orders
      },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              include: [{ model: Product, as: "product" }],
            },
          ],
        },
      ],
    });

    if (!order) {
      return errorResponse(res, "Order not found", null, 404);
    }

    return successResponse(res, "Order retrieved successfully", order);
  } catch (error) {
    console.error("Error getting order:", error);
    return errorResponse(res, "Error retrieving order", null, 500);
  }
};

/**
 * @route   POST /api/v1/orders
 * @desc    Create order (checkout)
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { shipping_address_id, billing_address_id, note } = req.body;

    // 1. Get cart with items
    const cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              include: [{ model: Product, as: "product" }],
            },
          ],
        },
      ],
      transaction,
    });

    if (!cart || cart.items.length === 0) {
      await transaction.rollback();
      return errorResponse(res, "Cart is empty", null, 400);
    }

    // 2. Validate addresses
    const shippingAddress = await Address.findOne({
      where: { id: shipping_address_id, user_id: req.user.id },
      transaction,
    });

    if (!shippingAddress) {
      await transaction.rollback();
      return errorResponse(res, "Invalid shipping address", null, 400);
    }

    let billingAddress = shippingAddress;
    if (billing_address_id && billing_address_id !== shipping_address_id) {
      billingAddress = await Address.findOne({
        where: { id: billing_address_id, user_id: req.user.id },
        transaction,
      });
      if (!billingAddress) {
        await transaction.rollback();
        return errorResponse(res, "Invalid billing address", null, 400);
      }
    }

    // 3. Check stock availability for all items
    for (const item of cart.items) {
      await checkStockAvailability(item.variant_id, item.quantity);
    }

    // 4. Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.variant.promotion_price || item.variant.price;
      return sum + price * item.quantity;
    }, 0);

    const shippingFee = calculateShippingFee(subtotal);
    const total = subtotal + shippingFee;

    // 5. Create order
    const order = await Order.create(
      {
        customer_id: req.user.id,
        order_number: await generateOrderNumber(),
        status: "pending",
        subtotal,
        shipping_fee: shippingFee,
        total_amount: total,
        shipping_recipient_name: shippingAddress.recipient_name,
        shipping_recipient_phone: shippingAddress.recipient_phone,
        shipping_street: shippingAddress.street,
        shipping_ward: shippingAddress.ward,
        shipping_district: shippingAddress.district,
        shipping_city: shippingAddress.city,
        billing_recipient_name: billingAddress.recipient_name,
        billing_recipient_phone: billingAddress.recipient_phone,
        billing_street: billingAddress.street,
        billing_ward: billingAddress.ward,
        billing_district: billingAddress.district,
        billing_city: billingAddress.city,
        payment_method: req.body.payment_method || "cod",
        customer_note: note,
        order_date: new Date(),
      },
      { transaction }
    );

    // 6. Create order items with variant snapshots
    const orderItemsData = cart.items.map((item) => {
      const unitPrice = item.variant.promotion_price || item.variant.price;
      return {
        order_id: order.id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal: unitPrice * item.quantity,
        variant_snapshot: buildVariantSnapshot(item.variant),
      };
    });

    await OrderItem.bulkCreate(orderItemsData, { transaction });

    // 7. Convert stock reservations to order
    await convertReservations(cart.id, transaction);

    // 8. Clear cart
    await CartItem.destroy({ where: { cart_id: cart.id }, transaction });

    await transaction.commit();

    // 9. Fetch complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              include: [{ model: Product, as: "product" }],
            },
          ],
        },
      ],
    });

    return successResponse(
      res,
      "Order created successfully",
      completeOrder,
      null,
      201
    );
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating order:", error);
    return errorResponse(
      res,
      error.message || "Error creating order",
      null,
      500
    );
  }
};

/**
 * @route   POST /api/v1/orders/:id/cancel
 * @desc    Cancel an order
 * @access  Private
 */
exports.cancelOrder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        customer_id: req.user.id,
      },
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
      transaction,
    });

    if (!order) {
      await transaction.rollback();
      return errorResponse(res, "Order not found", null, 404);
    }

    // Only allow cancellation for pending or processing orders
    if (!["pending", "processing"].includes(order.status)) {
      await transaction.rollback();
      return errorResponse(
        res,
        `Cannot cancel order with status: ${order.status}`,
        null,
        400
      );
    }

    // Update order status
    await order.update({ status: "cancelled" }, { transaction });

    // Release stock back to inventory
    for (const item of order.items) {
      const variant = await ProductVariant.findByPk(item.variant_id, {
        transaction,
      });
      if (variant) {
        await variant.increment("stock_quantity", {
          by: item.quantity,
          transaction,
        });
      }
    }

    await transaction.commit();

    return successResponse(res, "Order cancelled successfully", order);
  } catch (error) {
    await transaction.rollback();
    console.error("Error cancelling order:", error);
    return errorResponse(res, "Error cancelling order", null, 500);
  }
};

/**
 * @route   POST /api/v1/orders/:id/reorder
 * @desc    Reorder items from a previous order
 * @access  Private
 */
exports.reorder = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        customer_id: req.user.id,
      },
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
      transaction,
    });

    if (!order) {
      await transaction.rollback();
      return errorResponse(res, "Order not found", null, 404);
    }

    // Get or create cart
    let cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      transaction,
    });

    if (!cart) {
      cart = await Cart.create({ customer_id: req.user.id }, { transaction });
    }

    // Add order items to cart
    const addedItems = [];
    const unavailableItems = [];

    for (const item of order.items) {
      try {
        // Check stock availability
        await checkStockAvailability(item.variant_id, item.quantity);

        // Check if item already in cart
        let cartItem = await CartItem.findOne({
          where: { cart_id: cart.id, variant_id: item.variant_id },
          transaction,
        });

        if (cartItem) {
          const newQuantity = cartItem.quantity + item.quantity;
          await checkStockAvailability(item.variant_id, newQuantity);
          await cartItem.update({ quantity: newQuantity }, { transaction });
        } else {
          cartItem = await CartItem.create(
            {
              cart_id: cart.id,
              variant_id: item.variant_id,
              quantity: item.quantity,
            },
            { transaction }
          );
        }

        addedItems.push(cartItem);
      } catch (error) {
        unavailableItems.push({
          variant_id: item.variant_id,
          reason: error.message,
        });
      }
    }

    await transaction.commit();

    return successResponse(res, "Items added to cart", {
      added_items: addedItems,
      unavailable_items: unavailableItems,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error reordering:", error);
    return errorResponse(res, "Error reordering", null, 500);
  }
};
