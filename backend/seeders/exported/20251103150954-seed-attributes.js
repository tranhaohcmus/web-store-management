'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Attributes', [
  {
    "id": 1,
    "name": "Kích cỡ",
    "code": "size",
    "type": "select",
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 2,
    "name": "Loại đế",
    "code": "sole_type",
    "type": "select",
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 3,
    "name": "Màu sắc",
    "code": "color",
    "type": "select",
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 4,
    "name": "Size áo",
    "code": "shirt_size",
    "type": "select",
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attributes', null, {});
  }
};
