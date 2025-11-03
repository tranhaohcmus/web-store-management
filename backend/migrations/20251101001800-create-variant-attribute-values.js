"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VariantAttributeValues", {
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
      attribute_value_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AttributeValues",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    await queryInterface.addConstraint("VariantAttributeValues", {
      fields: ["variant_id", "attribute_id"],
      type: "unique",
      name: "uk_variant_attribute",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VariantAttributeValues");
  },
};
