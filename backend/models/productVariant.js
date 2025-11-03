"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      // ProductVariant belongs to Product
      ProductVariant.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });

      // ProductVariant belongs to many AttributeValues through VariantAttributeValue
      ProductVariant.belongsToMany(models.AttributeValue, {
        through: models.VariantAttributeValue,
        foreignKey: "variant_id",
        otherKey: "attribute_value_id",
        as: "attributeValues",
      });

      // ProductVariant has many VariantAttributeValues (for getting details)
      ProductVariant.hasMany(models.VariantAttributeValue, {
        foreignKey: "variant_id",
        as: "variantAttributes",
      });

      // ProductVariant has many CartItems
      ProductVariant.hasMany(models.CartItem, {
        foreignKey: "variant_id",
        as: "cartItems",
      });

      // ProductVariant has many StockReservations
      ProductVariant.hasMany(models.StockReservation, {
        foreignKey: "variant_id",
        as: "stockReservations",
      });

      // ProductVariant has many OrderItems
      ProductVariant.hasMany(models.OrderItem, {
        foreignKey: "variant_id",
        as: "orderItems",
      });
    }
  }

  ProductVariant.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "NIKE-MERC-41-AG-PUR",
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      promotion_price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      physical_stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "Tồn kho vật lý",
        validate: {
          min: 0,
        },
      },
      reserved_stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "Đang trong giỏ hàng",
        validate: {
          min: 0,
        },
      },
      available_stock: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.physical_stock - this.reserved_stock;
        },
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "ProductVariant",
      tableName: "ProductVariants",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["sku"],
        },
        {
          fields: ["product_id"],
        },
        {
          fields: ["status"],
        },
      ],
    }
  );

  return ProductVariant;
};
