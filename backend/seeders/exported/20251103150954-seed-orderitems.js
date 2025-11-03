'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderItems', [
  {
    "id": 1,
    "order_id": 1,
    "variant_id": 1,
    "quantity": 1,
    "unit_price": "5200000.00",
    "subtotal": "5200000.00",
    "variant_snapshot": {
      "sku": "NIKE-MERC9-41-FG-BLU",
      "image_url": "https://static.nike.com/a/images/mercurial-blue.jpg",
      "attributes": "Size 41, FG, Xanh dương",
      "product_name": "Nike Mercurial Superfly 9 Elite"
    },
    "created_at": "2024-10-15T00:00:00.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 2,
    "order_id": 2,
    "variant_id": 3,
    "quantity": 2,
    "unit_price": "4500000.00",
    "subtotal": "9000000.00",
    "variant_snapshot": {
      "sku": "ADS-PRED-41-FG-RED",
      "image_url": "https://assets.adidas.com/predator-red.jpg",
      "attributes": "Size 41, FG, Đỏ",
      "product_name": "Adidas Predator Edge"
    },
    "created_at": "2024-10-25T00:00:00.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 3,
    "order_id": 3,
    "variant_id": 5,
    "quantity": 1,
    "unit_price": "3900000.00",
    "subtotal": "3900000.00",
    "variant_snapshot": {
      "sku": "PUMA-FUTZ-41-FG-YEL",
      "image_url": "https://images.puma.com/future-yellow.jpg",
      "attributes": "Size 41, FG, Vàng",
      "product_name": "Puma Future Z 1.3"
    },
    "created_at": "2024-11-01T00:00:00.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 4,
    "order_id": 4,
    "variant_id": 2,
    "quantity": 1,
    "unit_price": "5200000.00",
    "subtotal": "5200000.00",
    "variant_snapshot": {
      "sku": "NIKE-MERC9-42-FG-BLU",
      "image_url": "https://static.nike.com/a/images/mercurial-blue.jpg",
      "attributes": "Size 42, FG, Xanh dương",
      "product_name": "Nike Mercurial Superfly 9 Elite"
    },
    "created_at": "2024-11-02T00:00:00.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 5,
    "order_id": 4,
    "variant_id": 4,
    "quantity": 1,
    "unit_price": "4500000.00",
    "subtotal": "4500000.00",
    "variant_snapshot": {
      "sku": "ADS-PRED-42-FG-RED",
      "image_url": "https://assets.adidas.com/predator-red.jpg",
      "attributes": "Size 42, FG, Đỏ",
      "product_name": "Adidas Predator Edge"
    },
    "created_at": "2024-11-02T00:00:00.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 6,
    "order_id": 5,
    "variant_id": 6,
    "quantity": 2,
    "unit_price": "3900000.00",
    "subtotal": "7800000.00",
    "variant_snapshot": {
      "sku": "PUMA-FUTZ-42-FG-YEL",
      "image_url": "https://images.puma.com/future-yellow.jpg",
      "attributes": "Size 42, FG, Vàng",
      "product_name": "Puma Future Z 1.3"
    },
    "created_at": "2024-11-03T00:00:00.000Z",
    "updated_at": "2025-11-03T06:22:56.000Z"
  },
  {
    "id": 21,
    "order_id": 20,
    "variant_id": 1,
    "quantity": 1,
    "unit_price": "5200000.00",
    "subtotal": "5200000.00",
    "variant_snapshot": {},
    "created_at": "2025-11-03T07:10:48.000Z",
    "updated_at": "2025-11-03T07:10:48.000Z"
  },
  {
    "id": 22,
    "order_id": 20,
    "variant_id": 3,
    "quantity": 2,
    "unit_price": "5200000.00",
    "subtotal": "10400000.00",
    "variant_snapshot": {},
    "created_at": "2025-11-03T07:10:48.000Z",
    "updated_at": "2025-11-03T07:10:48.000Z"
  },
  {
    "id": 23,
    "order_id": 20,
    "variant_id": 23,
    "quantity": 11,
    "unit_price": "4100000.00",
    "subtotal": "45100000.00",
    "variant_snapshot": {},
    "created_at": "2025-11-03T07:10:48.000Z",
    "updated_at": "2025-11-03T07:10:48.000Z"
  },
  {
    "id": 24,
    "order_id": 21,
    "variant_id": 66,
    "quantity": 1,
    "unit_price": "2200000.00",
    "subtotal": "2200000.00",
    "variant_snapshot": {},
    "created_at": "2025-11-03T14:42:41.000Z",
    "updated_at": "2025-11-03T14:42:41.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};
