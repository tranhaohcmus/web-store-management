"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AttributeValue extends Model {
    static associate(models) {
      // AttributeValue belongs to Attribute
      AttributeValue.belongsTo(models.Attribute, {
        foreignKey: "attribute_id",
        as: "attribute",
      });

      // AttributeValue belongs to many ProductVariants through VariantAttributeValue
      AttributeValue.belongsToMany(models.ProductVariant, {
        through: models.VariantAttributeValue,
        foreignKey: "attribute_value_id",
        otherKey: "variant_id",
        as: "variants",
      });
    }
  }

  AttributeValue.init(
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Attributes",
          key: "id",
        },
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "40, 41, Purple, AG, FG...",
      },
      display_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "AttributeValue",
      tableName: "AttributeValues",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["attribute_id"],
        },
        {
          unique: true,
          fields: ["attribute_id", "value"],
          name: "uk_attribute_value",
        },
      ],
    }
  );

  return AttributeValue;
};
