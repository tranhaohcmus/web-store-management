'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AttributeValues', [
  {
    "id": 1,
    "attribute_id": 1,
    "value": "39",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 2,
    "attribute_id": 1,
    "value": "40",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 3,
    "attribute_id": 1,
    "value": "41",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 4,
    "attribute_id": 1,
    "value": "42",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 5,
    "attribute_id": 1,
    "value": "43",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 6,
    "attribute_id": 1,
    "value": "44",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 7,
    "attribute_id": 2,
    "value": "FG",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 8,
    "attribute_id": 2,
    "value": "TF",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 9,
    "attribute_id": 2,
    "value": "IC",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 10,
    "attribute_id": 3,
    "value": "Xanh dương",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 11,
    "attribute_id": 3,
    "value": "Đỏ",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 12,
    "attribute_id": 3,
    "value": "Vàng",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 13,
    "attribute_id": 3,
    "value": "Đen",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 14,
    "attribute_id": 3,
    "value": "Trắng",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 15,
    "attribute_id": 4,
    "value": "S",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 16,
    "attribute_id": 4,
    "value": "M",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 17,
    "attribute_id": 4,
    "value": "L",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 18,
    "attribute_id": 4,
    "value": "XL",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 19,
    "attribute_id": 4,
    "value": "XXL",
    "display_name": null,
    "display_order": 0,
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AttributeValues', null, {});
  }
};
