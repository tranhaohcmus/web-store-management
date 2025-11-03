"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order belongs to User (customer)
      Order.belongsTo(models.User, {
        foreignKey: "customer_id",
        as: "customer",
      });

      // Order has many OrderItems
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "items",
      });
    }
  }

  Order.init(
    {
      order_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "ORD-20250128-001",
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      subtotal: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      shipping_fee: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "processing",
          "shipping",
          "completed",
          "cancelled"
        ),
        defaultValue: "pending",
      },
      // Shipping Address
      shipping_recipient_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      shipping_recipient_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      shipping_street: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      shipping_ward: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      shipping_district: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      shipping_city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // Billing Address
      billing_recipient_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      billing_recipient_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      billing_street: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      billing_ward: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      billing_district: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      billing_city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      // Payment
      payment_method: {
        type: DataTypes.ENUM("cod", "bank_transfer", "credit_card"),
        defaultValue: "cod",
      },
      payment_status: {
        type: DataTypes.ENUM("unpaid", "paid", "refunded"),
        defaultValue: "unpaid",
      },
      customer_note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      admin_note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["order_number"],
        },
        {
          fields: ["customer_id"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["payment_status"],
        },
        {
          fields: ["order_date"],
        },
      ],
    }
  );

  return Order;
};
