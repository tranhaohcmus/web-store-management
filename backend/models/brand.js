"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // Brand has many Products
      Brand.hasMany(models.Product, {
        foreignKey: "brand_id",
        as: "products",
      });
    }
  }

  Brand.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      logo_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Brand",
      tableName: "Brands",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );

  return Brand;
};
