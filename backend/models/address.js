"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      // Address belongs to User
      Address.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  Address.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      recipient_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Tên người nhận",
      },
      recipient_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "SĐT người nhận",
      },
      street: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "Số nhà, tên đường",
      },
      ward: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Phường/Xã",
      },
      district: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Quận/Huyện",
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Tỉnh/Thành phố",
      },
      address_type: {
        type: DataTypes.ENUM("shipping", "billing", "both"),
        defaultValue: "shipping",
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Địa chỉ mặc định",
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "Addresses",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["user_id"],
        },
        {
          fields: ["is_default"],
        },
      ],
    }
  );

  return Address;
};
