"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductTypeAttributes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ProductTypes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attribute_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Attributes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      display_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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

    await queryInterface.addConstraint("ProductTypeAttributes", {
      fields: ["product_type_id", "attribute_id"],
      type: "unique",
      name: "uk_product_type_attribute",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductTypeAttributes");
  },
};
