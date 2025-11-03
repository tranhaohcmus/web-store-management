"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Cart belongs to User (customer)
      Cart.belongsTo(models.User, {
        foreignKey: "customer_id",
        as: "customer",
      });

      // Cart has many CartItems
      Cart.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        as: "items",
      });

      // Cart has many StockReservations
      Cart.hasMany(models.StockReservation, {
        foreignKey: "cart_id",
        as: "stockReservations",
      });
    }
  }

  Cart.init(
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "Carts",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["customer_id"],
          name: "uk_customer_cart",
        },
      ],
    }
  );

  return Cart;
};
