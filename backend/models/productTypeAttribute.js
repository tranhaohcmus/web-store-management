"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductTypeAttribute extends Model {
    static associate(models) {
      // ProductTypeAttribute belongs to ProductType
      ProductTypeAttribute.belongsTo(models.ProductType, {
        foreignKey: "product_type_id",
        as: "productType",
      });

      // ProductTypeAttribute belongs to Attribute
      ProductTypeAttribute.belongsTo(models.Attribute, {
        foreignKey: "attribute_id",
        as: "attribute",
      });
    }
  }

  ProductTypeAttribute.init(
    {
      product_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductTypes",
          key: "id",
        },
      },
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Attributes",
          key: "id",
        },
      },
      is_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "ProductTypeAttribute",
      tableName: "ProductTypeAttributes",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["product_type_id", "attribute_id"],
          name: "uk_product_type_attribute",
        },
      ],
    }
  );

  return ProductTypeAttribute;
};
