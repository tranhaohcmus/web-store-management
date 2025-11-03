"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      recipient_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Tên người nhận",
      },
      recipient_phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "SĐT người nhận",
      },
      street: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: "Số nhà, tên đường",
      },
      ward: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Phường/Xã",
      },
      district: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Quận/Huyện",
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "Tỉnh/Thành phố",
      },
      address_type: {
        type: Sequelize.ENUM("shipping", "billing", "both"),
        defaultValue: "shipping",
      },
      is_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: "Địa chỉ mặc định",
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

    await queryInterface.addIndex("Addresses", ["user_id"]);
    await queryInterface.addIndex("Addresses", ["is_default"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
