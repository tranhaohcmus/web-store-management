"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AttributeValues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      value: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "40, 41, Purple, AG, FG...",
      },
      display_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
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

    await queryInterface.addIndex("AttributeValues", ["attribute_id"]);
    await queryInterface.addConstraint("AttributeValues", {
      fields: ["attribute_id", "value"],
      type: "unique",
      name: "uk_attribute_value",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AttributeValues");
  },
};
