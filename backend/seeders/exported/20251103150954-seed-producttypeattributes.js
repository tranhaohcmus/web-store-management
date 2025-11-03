'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductTypeAttributes', [
  {
    "id": 9,
    "product_type_id": 1,
    "attribute_id": 1,
    "is_required": 1,
    "display_order": 1,
    "created_at": "2025-11-03T10:02:19.000Z",
    "updated_at": "2025-11-03T10:02:19.000Z"
  },
  {
    "id": 10,
    "product_type_id": 1,
    "attribute_id": 3,
    "is_required": 0,
    "display_order": 2,
    "created_at": "2025-11-03T10:02:19.000Z",
    "updated_at": "2025-11-03T10:02:19.000Z"
  },
  {
    "id": 11,
    "product_type_id": 1,
    "attribute_id": 2,
    "is_required": 1,
    "display_order": 3,
    "created_at": "2025-11-03T10:02:19.000Z",
    "updated_at": "2025-11-03T10:02:19.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductTypeAttributes', null, {});
  }
};
