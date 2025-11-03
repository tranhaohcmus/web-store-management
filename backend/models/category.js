"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Category belongs to parent Category (self-referencing)
      Category.belongsTo(models.Category, {
        foreignKey: "parent_id",
        as: "parent",
      });

      // Category has many child Categories
      Category.hasMany(models.Category, {
        foreignKey: "parent_id",
        as: "children",
      });

      // Category has many Products
      Category.hasMany(models.Product, {
        foreignKey: "category_id",
        as: "products",
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categories",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["slug"],
        },
        {
          fields: ["parent_id"],
        },
      ],
    }
  );

  return Category;
};
