'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VariantAttributeValues', [
  {
    "id": 1,
    "variant_id": 1,
    "attribute_id": 1,
    "attribute_value_id": 1,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 2,
    "variant_id": 1,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 3,
    "variant_id": 1,
    "attribute_id": 3,
    "attribute_value_id": 10,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 4,
    "variant_id": 2,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 5,
    "variant_id": 2,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 6,
    "variant_id": 2,
    "attribute_id": 3,
    "attribute_value_id": 10,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 7,
    "variant_id": 3,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 8,
    "variant_id": 3,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 9,
    "variant_id": 3,
    "attribute_id": 3,
    "attribute_value_id": 10,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 10,
    "variant_id": 4,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 11,
    "variant_id": 4,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 12,
    "variant_id": 4,
    "attribute_id": 3,
    "attribute_value_id": 10,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 13,
    "variant_id": 5,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 14,
    "variant_id": 5,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 15,
    "variant_id": 5,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 16,
    "variant_id": 6,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 17,
    "variant_id": 6,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 18,
    "variant_id": 6,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 19,
    "variant_id": 7,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 20,
    "variant_id": 7,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 21,
    "variant_id": 7,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 22,
    "variant_id": 8,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 23,
    "variant_id": 8,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 24,
    "variant_id": 8,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 25,
    "variant_id": 9,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 26,
    "variant_id": 9,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 27,
    "variant_id": 9,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 28,
    "variant_id": 10,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 29,
    "variant_id": 10,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 30,
    "variant_id": 10,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 31,
    "variant_id": 11,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 32,
    "variant_id": 11,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 33,
    "variant_id": 11,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 34,
    "variant_id": 12,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 35,
    "variant_id": 12,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 36,
    "variant_id": 12,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 37,
    "variant_id": 13,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 38,
    "variant_id": 13,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 39,
    "variant_id": 13,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 40,
    "variant_id": 14,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 41,
    "variant_id": 14,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 42,
    "variant_id": 14,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 43,
    "variant_id": 15,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 44,
    "variant_id": 15,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 45,
    "variant_id": 15,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 46,
    "variant_id": 16,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 47,
    "variant_id": 16,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 48,
    "variant_id": 16,
    "attribute_id": 3,
    "attribute_value_id": 13,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 49,
    "variant_id": 17,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 50,
    "variant_id": 17,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 51,
    "variant_id": 17,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 52,
    "variant_id": 18,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 53,
    "variant_id": 18,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 54,
    "variant_id": 18,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 55,
    "variant_id": 19,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 56,
    "variant_id": 19,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 57,
    "variant_id": 19,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 58,
    "variant_id": 20,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 59,
    "variant_id": 20,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 60,
    "variant_id": 20,
    "attribute_id": 3,
    "attribute_value_id": 10,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 61,
    "variant_id": 21,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 62,
    "variant_id": 21,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 63,
    "variant_id": 21,
    "attribute_id": 3,
    "attribute_value_id": 10,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 64,
    "variant_id": 22,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 65,
    "variant_id": 22,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 66,
    "variant_id": 22,
    "attribute_id": 3,
    "attribute_value_id": 10,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 67,
    "variant_id": 23,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 68,
    "variant_id": 23,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 69,
    "variant_id": 23,
    "attribute_id": 3,
    "attribute_value_id": 11,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 70,
    "variant_id": 24,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 71,
    "variant_id": 24,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 72,
    "variant_id": 24,
    "attribute_id": 3,
    "attribute_value_id": 11,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 73,
    "variant_id": 25,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 74,
    "variant_id": 25,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 75,
    "variant_id": 25,
    "attribute_id": 3,
    "attribute_value_id": 11,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 76,
    "variant_id": 26,
    "attribute_id": 1,
    "attribute_value_id": 2,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 77,
    "variant_id": 26,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 78,
    "variant_id": 26,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 79,
    "variant_id": 27,
    "attribute_id": 1,
    "attribute_value_id": 3,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 80,
    "variant_id": 27,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 81,
    "variant_id": 27,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 82,
    "variant_id": 28,
    "attribute_id": 1,
    "attribute_value_id": 4,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 83,
    "variant_id": 28,
    "attribute_id": 2,
    "attribute_value_id": 7,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 84,
    "variant_id": 28,
    "attribute_id": 3,
    "attribute_value_id": 14,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 85,
    "variant_id": 221,
    "attribute_id": 1,
    "attribute_value_id": 6,
    "created_at": "2025-11-03T11:16:24.000Z",
    "updated_at": "2025-11-03T11:16:24.000Z"
  },
  {
    "id": 86,
    "variant_id": 221,
    "attribute_id": 2,
    "attribute_value_id": 9,
    "created_at": "2025-11-03T11:16:24.000Z",
    "updated_at": "2025-11-03T11:16:24.000Z"
  },
  {
    "id": 87,
    "variant_id": 221,
    "attribute_id": 3,
    "attribute_value_id": 12,
    "created_at": "2025-11-03T11:16:24.000Z",
    "updated_at": "2025-11-03T11:16:24.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VariantAttributeValues', null, {});
  }
};
