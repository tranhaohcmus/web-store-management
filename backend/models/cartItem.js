"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // CartItem belongs to Cart
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart",
      });

      // CartItem belongs to ProductVariant
      CartItem.belongsTo(models.ProductVariant, {
        foreignKey: "variant_id",
        as: "variant",
      });
    }
  }

  CartItem.init(
    {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
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
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "CartItems",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["cart_id", "variant_id"],
          name: "uk_cart_variant",
        },
      ],
    }
  );

  return CartItem;
};
