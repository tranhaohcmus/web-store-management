"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VariantAttributeValue extends Model {
    static associate(models) {
      // VariantAttributeValue belongs to ProductVariant
      VariantAttributeValue.belongsTo(models.ProductVariant, {
        foreignKey: "variant_id",
        as: "variant",
      });

      // VariantAttributeValue belongs to Attribute
      VariantAttributeValue.belongsTo(models.Attribute, {
        foreignKey: "attribute_id",
        as: "attribute",
      });

      // VariantAttributeValue belongs to AttributeValue
      VariantAttributeValue.belongsTo(models.AttributeValue, {
        foreignKey: "attribute_value_id",
        as: "attributeValue",
      });
    }
  }

  VariantAttributeValue.init(
    {
      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductVariants",
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
      attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "AttributeValues",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "VariantAttributeValue",
      tableName: "VariantAttributeValues",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["variant_id", "attribute_id"],
          name: "uk_variant_attribute",
        },
      ],
    }
  );

  return VariantAttributeValue;
};
