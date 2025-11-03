'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductTypes', [
  {
    "id": 1,
    "name": "Giày Đá Bóng",
    "code": "soccer_cleat",
    "description": "Giày chuyên dụng cho bóng đá",
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 2,
    "name": "Áo Đấu",
    "code": "jersey",
    "description": "Áo thi đấu thể thao",
    "created_at": "2025-11-03T06:22:54.000Z",
    "updated_at": "2025-11-03T06:22:54.000Z"
  },
  {
    "id": 3,
    "name": "Quần Short",
    "code": "shorts",
    "description": "Quần short thể thao",
    "created_at": "2025-11-03T07:14:47.000Z",
    "updated_at": "2025-11-03T07:14:47.000Z"
  },
  {
    "id": 4,
    "name": "Tất Bóng Đá",
    "code": "socks",
    "description": "Tất chuyên dụng cho bóng đá",
    "created_at": "2025-11-03T07:14:47.000Z",
    "updated_at": "2025-11-03T07:14:47.000Z"
  },
  {
    "id": 5,
    "name": "Phụ Kiện",
    "code": "accessories",
    "description": "Phụ kiện bóng đá",
    "created_at": "2025-11-03T07:14:47.000Z",
    "updated_at": "2025-11-03T07:14:47.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductTypes', null, {});
  }
};
