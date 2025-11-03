const {
  User,
  Order,
  OrderItem,
  Product,
  ProductVariant,
  StockReservation,
} = require("../models");
const { Op } = require("sequelize");
const db = require("../models");
const { releaseExpiredReservations } = require("../utils/stockHelpers");
const {
  successResponse,
  errorResponse,
  getPaginationMeta,
} = require("../utils/responseHelpers");

/**
 * @route   GET /api/v1/admin/dashboard
 * @desc    Get dashboard statistics
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Get date ranges
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Total users
    const totalUsers = await User.count();
    const newUsersToday = await User.count({
      where: {
        created_at: { [Op.gte]: startOfToday },
      },
    });

    // Total orders
    const totalOrders = await Order.count();
    const ordersToday = await Order.count({
      where: {
        created_at: { [Op.gte]: startOfToday },
      },
    });

    // Revenue statistics
    const totalRevenue = await Order.sum("total_amount", {
      where: { status: { [Op.in]: ["completed", "shipping", "processing"] } },
    });

    const monthlyRevenue = await Order.sum("total_amount", {
      where: {
        status: { [Op.in]: ["completed", "shipping", "processing"] },
        created_at: { [Op.gte]: startOfMonth },
      },
    });

    const yearlyRevenue = await Order.sum("total_amount", {
      where: {
        status: { [Op.in]: ["completed", "shipping", "processing"] },
        created_at: { [Op.gte]: startOfYear },
      },
    });

    // Order status breakdown
    const ordersByStatus = await Order.findAll({
      attributes: [
        "status",
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
      ],
      group: ["status"],
    });

    // Top selling products
    const topProducts = await OrderItem.findAll({
      attributes: [
        "variant_id",
        [db.sequelize.fn("SUM", db.sequelize.col("quantity")), "total_sold"],
        [
          db.sequelize.fn("SUM", db.sequelize.literal("quantity * unit_price")),
          "total_revenue",
        ],
      ],
      include: [
        {
          model: ProductVariant,
          as: "variant",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "default_image_url"],
            },
          ],
        },
      ],
      group: ["variant_id"],
      order: [[db.sequelize.literal("total_sold"), "DESC"]],
      limit: 10,
    });

    // Recent orders
    const recentOrders = await Order.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "email", "first_name", "last_name"],
        },
      ],
    });

    // Low stock alerts
    const lowStockProducts = await ProductVariant.findAll({
      where: {
        physical_stock: { [Op.lt]: 10 },
      },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name"],
        },
      ],
      order: [["physical_stock", "ASC"]],
      limit: 10,
    });

    // Total products count
    const totalProducts = await Product.count();

    return successResponse(res, "Dashboard statistics retrieved successfully", {
      totalRevenue: totalRevenue || 0,
      totalOrders: totalOrders,
      totalProducts: totalProducts,
      totalCustomers: totalUsers,
      monthlyRevenue: monthlyRevenue || 0,
      yearlyRevenue: yearlyRevenue || 0,
      newUsersToday: newUsersToday,
      ordersToday: ordersToday,
      ordersByStatus: ordersByStatus,
      topProducts: topProducts,
      recentOrders: recentOrders,
      lowStockProducts: lowStockProducts,
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return errorResponse(
      res,
      "Error retrieving dashboard statistics",
      null,
      500
    );
  }
};

/**
 * @route   GET /api/v1/admin/orders
 * @desc    Get all orders (admin view)
 * @access  Private/Admin
 */
exports.getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      customer_id,
      start_date,
      end_date,
      sort = "created_at",
      order = "desc",
    } = req.query;

    const where = {};
    if (status) where.status = status;
    if (customer_id) where.customer_id = customer_id;
    if (start_date || end_date) {
      where.created_at = {};
      if (start_date) where.created_at[Op.gte] = new Date(start_date);
      if (end_date) where.created_at[Op.lte] = new Date(end_date);
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "email", "first_name", "last_name", "phone"],
        },
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
 * @route   GET /api/v1/admin/orders/:id
 * @desc    Get order by ID (Admin version - can see any order)
 * @access  Private/Admin
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "email", "first_name", "last_name", "phone"],
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              include: [
                {
                  model: Product,
                  as: "product",
                  attributes: ["id", "name", "default_image_url"],
                },
              ],
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
 * @route   PATCH /api/v1/admin/orders/:id/status
 * @desc    Update order status
 * @access  Private/Admin
 */
exports.updateOrderStatus = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipping",
      "completed",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      await transaction.rollback();
      return errorResponse(res, "Invalid order status", null, 400);
    }

    const order = await Order.findByPk(id, {
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

    const oldStatus = order.status;

    // Validate status transition
    const validTransitions = {
      pending: ["processing", "cancelled"],
      processing: ["shipping", "cancelled"],
      shipping: ["completed", "cancelled"],
      completed: [],
      cancelled: [],
    };

    if (!validTransitions[oldStatus].includes(status)) {
      await transaction.rollback();
      return errorResponse(
        res,
        `Cannot change order status from ${oldStatus} to ${status}`,
        null,
        400
      );
    }

    // If cancelling, release stock back
    if (status === "cancelled") {
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
    }

    await order.update({ status }, { transaction });
    await transaction.commit();

    return successResponse(res, "Order status updated successfully", order);
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating order status:", error);
    return errorResponse(res, "Error updating order status", null, 500);
  }
};

/**
 * @route   GET /api/v1/admin/users
 * @desc    Get all users
 * @access  Private/Admin
 */
exports.getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      role,
      search,
      sort = "created_at",
      order = "desc",
    } = req.query;

    const where = {};
    if (role) where.role = role;
    if (search) {
      where[Op.or] = [
        { email: { [Op.like]: `%${search}%` } },
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ["hashed_password"] },
      limit: parseInt(limit),
      offset,
      order: [[sort, order.toUpperCase()]],
    });

    const meta = getPaginationMeta(page, limit, count);
    return successResponse(res, "Users retrieved successfully", rows, meta);
  } catch (error) {
    console.error("Error getting users:", error);
    return errorResponse(res, "Error retrieving users", null, 500);
  }
};

/**
 * @route   PATCH /api/v1/admin/users/:id/role
 * @desc    Update user role
 * @access  Private/Admin
 */
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["client", "admin"];
    if (!validRoles.includes(role)) {
      return errorResponse(res, "Invalid role", null, 400);
    }

    const user = await User.findByPk(id, {
      attributes: { exclude: ["hashed_password"] },
    });

    if (!user) {
      return errorResponse(res, "User not found", null, 404);
    }

    // Prevent admin from changing their own role
    if (user.id === req.user.id) {
      return errorResponse(res, "Cannot change your own role", null, 400);
    }

    await user.update({ role });

    return successResponse(res, "User role updated successfully", user);
  } catch (error) {
    console.error("Error updating user role:", error);
    return errorResponse(res, "Error updating user role", null, 500);
  }
};

/**
 * @route   GET /api/v1/admin/stock-reservations
 * @desc    Get all stock reservations
 * @access  Private/Admin
 */
exports.getStockReservations = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, expired = "false" } = req.query;

    const where = {};
    if (status) where.status = status;
    if (expired === "true") {
      where.expires_at = { [Op.lt]: new Date() };
      where.status = "active";
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await StockReservation.findAndCountAll({
      where,
      include: [
        {
          model: ProductVariant,
          as: "variant",
          include: [{ model: Product, as: "product" }],
        },
      ],
      limit: parseInt(limit),
      offset,
      order: [["created_at", "DESC"]],
    });

    const meta = getPaginationMeta(page, limit, count);
    return successResponse(
      res,
      "Stock reservations retrieved successfully",
      rows,
      meta
    );
  } catch (error) {
    console.error("Error getting stock reservations:", error);
    return errorResponse(res, "Error retrieving stock reservations", null, 500);
  }
};

/**
 * @route   POST /api/v1/admin/stock-reservations/release-expired
 * @desc    Manually release expired stock reservations
 * @access  Private/Admin
 */
exports.releaseExpiredReservations = async (req, res) => {
  try {
    const releasedCount = await releaseExpiredReservations();

    return successResponse(
      res,
      `Successfully released ${releasedCount} expired reservations`,
      { released_count: releasedCount }
    );
  } catch (error) {
    console.error("Error releasing expired reservations:", error);
    return errorResponse(
      res,
      "Error releasing expired reservations",
      null,
      500
    );
  }
};
