"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: "ORD-20250128-001",
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      subtotal: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      shipping_fee: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      shipping_recipient_phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      shipping_street: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      shipping_ward: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      shipping_district: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      shipping_city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      // Billing Address
      billing_recipient_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      billing_recipient_phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      billing_street: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      billing_ward: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      billing_district: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      billing_city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      // Payment
      payment_method: {
        type: Sequelize.ENUM("cod", "bank_transfer", "credit_card"),
        defaultValue: "cod",
      },
      payment_status: {
        type: Sequelize.ENUM("unpaid", "paid", "refunded"),
        defaultValue: "unpaid",
      },
      customer_note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      admin_note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("Orders", ["order_number"], { unique: true });
    await queryInterface.addIndex("Orders", ["customer_id"]);
    await queryInterface.addIndex("Orders", ["status"]);
    await queryInterface.addIndex("Orders", ["payment_status"]);
    await queryInterface.addIndex("Orders", ["order_date"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
