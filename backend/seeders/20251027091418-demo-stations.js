"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Stations",
      [
        {
          name: "Ben xe 1",
          province: "Province 1",
          address: "123 Main St",
          createdAt: "2023-10-15 14:50:08",
          updatedAt: "2023-10-15 14:50:08",
        },
        {
          name: "Ben xe 2",
          province: "Province 2",
          address: "456 Elm St",
          createdAt: "2023-10-15 14:50:08",
          updatedAt: "2023-10-15 14:50:08",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Stations", null, {});
  },
};
