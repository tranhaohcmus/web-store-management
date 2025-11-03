"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    static associate(models) {
      // Attribute has many AttributeValues
      Attribute.hasMany(models.AttributeValue, {
        foreignKey: "attribute_id",
        as: "values",
      });

      // Attribute belongs to many ProductTypes through ProductTypeAttribute
      Attribute.belongsToMany(models.ProductType, {
        through: models.ProductTypeAttribute,
        foreignKey: "attribute_id",
        otherKey: "product_type_id",
        as: "productTypes",
      });
    }
  }

  Attribute.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "Size, Color, Stud Type...",
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "size, color, stud_type",
      },
      type: {
        type: DataTypes.ENUM("select", "multiselect", "text"),
        defaultValue: "select",
      },
    },
    {
      sequelize,
      modelName: "Attribute",
      tableName: "Attributes",
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

  return Attribute;
};
