"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User has many Addresses
      User.hasMany(models.Address, {
        foreignKey: "user_id",
        as: "addresses",
      });

      // User has one Cart
      User.hasOne(models.Cart, {
        foreignKey: "customer_id",
        as: "cart",
      });

      // User has many Orders
      User.hasMany(models.Order, {
        foreignKey: "customer_id",
        as: "orders",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      hashed_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      avatar_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("customer", "admin"),
        defaultValue: "customer",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );
  return User;
};
