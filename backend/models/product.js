"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Product belongs to ProductType
      Product.belongsTo(models.ProductType, {
        foreignKey: "product_type_id",
        as: "productType",
      });

      // Product belongs to Brand
      Product.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        as: "brand",
      });

      // Product belongs to Category
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      // Product has many ProductVariants
      Product.hasMany(models.ProductVariant, {
        foreignKey: "product_id",
        as: "variants",
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      product_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductTypes",
          key: "id",
        },
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      default_image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        defaultValue: "draft",
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["status"],
        },
        {
          fields: ["brand_id"],
        },
        {
          fields: ["category_id"],
        },
      ],
    }
  );

  return Product;
};
