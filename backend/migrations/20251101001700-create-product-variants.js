"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductVariants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      sku: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: "NIKE-MERC-41-AG-PUR",
      },
      price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      promotion_price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      physical_stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "Tồn kho vật lý",
      },
      reserved_stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "Đang trong giỏ hàng",
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
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

    await queryInterface.addIndex("ProductVariants", ["sku"], { unique: true });
    await queryInterface.addIndex("ProductVariants", ["product_id"]);
    await queryInterface.addIndex("ProductVariants", ["status"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductVariants");
  },
};
