/**
 * Generate unique order number
 * Format: ORD-YYYYMMDD-XXX
 */
const generateOrderNumber = async () => {
  const { Order } = require("../models");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const datePrefix = `ORD-${year}${month}${day}`;

  // Find the last order number created today
  const lastOrder = await Order.findOne({
    where: {
      order_number: {
        [require("sequelize").Op.like]: `${datePrefix}%`,
      },
    },
    order: [["created_at", "DESC"]],
  });

  let sequence = 1;
  if (lastOrder) {
    const lastSequence = parseInt(lastOrder.order_number.split("-").pop());
    sequence = lastSequence + 1;
  }

  const sequenceStr = String(sequence).padStart(3, "0");
  return `${datePrefix}-${sequenceStr}`;
};

/**
 * Calculate subtotal from cart items
 */
const calculateSubtotal = (items) => {
  return items.reduce((total, item) => {
    const price = item.variant.promotion_price || item.variant.price;
    return total + price * item.quantity;
  }, 0);
};

/**
 * Calculate shipping fee (simple logic, can be enhanced)
 */
const calculateShippingFee = (subtotal) => {
  if (subtotal >= 1000000) return 0; // Free shipping for orders >= 1M VND
  return 50000; // Flat 50k VND
};

/**
 * Build variant snapshot for order
 */
const buildVariantSnapshot = async (variant) => {
  const snapshot = {
    sku: variant.sku,
    product_name: variant.product.name,
    image_url: variant.image_url,
  };

  // Add attribute values
  if (variant.variantAttributes) {
    for (const va of variant.variantAttributes) {
      snapshot[va.attribute.code] =
        va.attributeValue.display_name || va.attributeValue.value;
    }
  }

  return snapshot;
};

module.exports = {
  generateOrderNumber,
  calculateSubtotal,
  calculateShippingFee,
  buildVariantSnapshot,
};
