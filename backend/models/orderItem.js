"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // OrderItem belongs to Order
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });

      // OrderItem belongs to ProductVariant
      OrderItem.belongsTo(models.ProductVariant, {
        foreignKey: "variant_id",
        as: "variant",
      });
    }
  }

  OrderItem.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductVariants",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      unit_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        comment: "Giá tại thời điểm đặt",
        validate: {
          min: 0,
        },
      },
      subtotal: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      variant_snapshot: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "JSON: thông tin variant",
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "OrderItems",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["order_id"],
        },
      ],
    }
  );

  return OrderItem;
};
