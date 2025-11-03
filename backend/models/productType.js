"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    static associate(models) {
      // ProductType has many Products
      ProductType.hasMany(models.Product, {
        foreignKey: "product_type_id",
        as: "products",
      });

      // ProductType belongs to many Attributes through ProductTypeAttribute
      ProductType.belongsToMany(models.Attribute, {
        through: models.ProductTypeAttribute,
        foreignKey: "product_type_id",
        otherKey: "attribute_id",
        as: "attributes",
      });

      // ProductType has many ProductTypeAttributes (for getting is_required, display_order)
      ProductType.hasMany(models.ProductTypeAttribute, {
        foreignKey: "product_type_id",
        as: "productTypeAttributes",
      });
    }
  }

  ProductType.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "Giày Đá Bóng, Áo Đấu",
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "soccer_cleat, jersey",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ProductType",
      tableName: "ProductTypes",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["code"],
        },
      ],
    }
  );

  return ProductType;
};
