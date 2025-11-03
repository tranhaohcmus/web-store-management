const { StockReservation, ProductVariant } = require("../models");
const { Op } = require("sequelize");

/**
 * Create stock reservation for cart item
 */
const createReservation = async (variantId, cartId, quantity, transaction) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Expires in 24 hours

  const reservation = await StockReservation.create(
    {
      variant_id: variantId,
      cart_id: cartId,
      quantity,
      expires_at: expiresAt,
      status: "active",
    },
    { transaction }
  );

  // Update reserved_stock in variant
  await ProductVariant.increment(
    { reserved_stock: quantity },
    {
      where: { id: variantId },
      transaction,
    }
  );

  return reservation;
};

/**
 * Update existing reservation
 */
const updateReservation = async (reservation, newQuantity, transaction) => {
  const quantityDiff = newQuantity - reservation.quantity;

  await reservation.update({ quantity: newQuantity }, { transaction });

  // Update reserved_stock
  await ProductVariant.increment(
    { reserved_stock: quantityDiff },
    {
      where: { id: reservation.variant_id },
      transaction,
    }
  );

  return reservation;
};

/**
 * Release reservation
 */
const releaseReservation = async (reservation, transaction) => {
  await reservation.update({ status: "released" }, { transaction });

  // Decrease reserved_stock
  await ProductVariant.decrement(
    { reserved_stock: reservation.quantity },
    {
      where: { id: reservation.variant_id },
      transaction,
    }
  );
};

/**
 * Convert reservations to order (when checkout)
 */
const convertReservations = async (cartId, transaction) => {
  const reservations = await StockReservation.findAll({
    where: {
      cart_id: cartId,
      status: "active",
    },
    transaction,
  });

  for (const reservation of reservations) {
    // Mark as converted
    await reservation.update({ status: "converted" }, { transaction });

    // Decrease physical_stock and reserved_stock
    await ProductVariant.decrement(
      {
        physical_stock: reservation.quantity,
        reserved_stock: reservation.quantity,
      },
      {
        where: { id: reservation.variant_id },
        transaction,
      }
    );
  }

  return reservations;
};

/**
 * Release expired reservations (for cron job)
 */
const releaseExpiredReservations = async () => {
  const expiredReservations = await StockReservation.findAll({
    where: {
      expires_at: {
        [Op.lt]: new Date(),
      },
      status: "active",
    },
  });

  for (const reservation of expiredReservations) {
    await releaseReservation(reservation);
  }

  return {
    released_count: expiredReservations.length,
    total_quantity_released: expiredReservations.reduce(
      (sum, r) => sum + r.quantity,
      0
    ),
  };
};

/**
 * Check if variant has enough available stock
 */
const checkStockAvailability = async (variantId, quantity) => {
  const variant = await ProductVariant.findByPk(variantId);
  if (!variant) {
    throw new Error("Variant not found");
  }

  const availableStock = variant.physical_stock - variant.reserved_stock;
  if (availableStock < quantity) {
    throw new Error(
      `Insufficient stock. Available: ${availableStock}, Requested: ${quantity}`
    );
  }

  return true;
};

module.exports = {
  createReservation,
  updateReservation,
  releaseReservation,
  convertReservations,
  releaseExpiredReservations,
  checkStockAvailability,
};
