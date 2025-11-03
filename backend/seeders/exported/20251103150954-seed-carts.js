'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carts', [
  {
    "id": 1,
    "customer_id": 2,
    "created_at": "2025-11-03T06:22:56.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 2,
    "customer_id": 3,
    "created_at": "2025-11-03T06:22:56.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 3,
    "customer_id": 4,
    "created_at": "2025-11-03T06:22:56.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 4,
    "customer_id": 5,
    "created_at": "2025-11-03T06:22:56.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 5,
    "customer_id": 1,
    "created_at": "2025-11-03T12:46:22.000Z",
    "updated_at": "2025-11-03T12:46:22.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
