"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "last_login", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "is_email_verified", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });

    await queryInterface.addColumn("Users", "email_verification_token", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "reset_password_token", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Users", "reset_password_expires", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "last_login");
    await queryInterface.removeColumn("Users", "is_email_verified");
    await queryInterface.removeColumn("Users", "email_verification_token");
    await queryInterface.removeColumn("Users", "reset_password_token");
    await queryInterface.removeColumn("Users", "reset_password_expires");
  },
};
