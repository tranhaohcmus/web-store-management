"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockReservation extends Model {
    static associate(models) {
      // StockReservation belongs to ProductVariant
      StockReservation.belongsTo(models.ProductVariant, {
        foreignKey: "variant_id",
        as: "variant",
      });

      // StockReservation belongs to Cart
      StockReservation.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart",
      });
    }
  }

  StockReservation.init(
    {
      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductVariants",
          key: "id",
        },
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Số lượng đặt trước",
      },
      reserved_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Hết hạn sau 24h",
      },
      status: {
        type: DataTypes.ENUM("active", "released", "converted"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "StockReservation",
      tableName: "StockReservations",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ["expires_at"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["variant_id"],
        },
      ],
    }
  );

  return StockReservation;
};
