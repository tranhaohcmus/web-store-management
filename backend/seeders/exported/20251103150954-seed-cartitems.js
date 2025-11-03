'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CartItems', [
  {
    "id": 3,
    "cart_id": 2,
    "variant_id": 5,
    "quantity": 1,
    "created_at": "2025-11-03T06:22:56.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 4,
    "cart_id": 4,
    "variant_id": 2,
    "quantity": 1,
    "created_at": "2025-11-03T06:22:56.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CartItems', null, {});
  }
};
