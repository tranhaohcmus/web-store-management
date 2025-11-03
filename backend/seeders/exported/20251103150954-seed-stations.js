'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stations', [
  {
    "id": 17,
    "name": "Ben xe 1",
    "address": "123 Main St",
    "province": "Province 1",
    "createdAt": "2023-10-15T14:50:08.000Z",
    "updatedAt": "2023-10-15T14:50:08.000Z"
  },
  {
    "id": 18,
    "name": "Ben xe 2",
    "address": "456 Elm St",
    "province": "Province 2",
    "createdAt": "2023-10-15T14:50:08.000Z",
    "updatedAt": "2023-10-15T14:50:08.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stations', null, {});
  }
};
