"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StockReservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      variant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ProductVariants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Số lượng đặt trước",
      },
      reserved_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "Hết hạn sau 24h",
      },
      status: {
        type: Sequelize.ENUM("active", "released", "converted"),
        defaultValue: "active",
      },
    });

    await queryInterface.addIndex("StockReservations", ["expires_at"]);
    await queryInterface.addIndex("StockReservations", ["status"]);
    await queryInterface.addIndex("StockReservations", ["variant_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("StockReservations");
  },
};
