'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
  {
    "id": 1,
    "user_id": 2,
    "recipient_name": "Nguyễn Văn A",
    "recipient_phone": "0912345678",
    "street": "123 Nguyễn Huệ",
    "ward": "Phường Bến Nghé",
    "district": "Quận 1",
    "city": "Hồ Chí Minh",
    "address_type": "shipping",
    "is_default": 1,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T14:44:44.000Z"
  },
  {
    "id": 2,
    "user_id": 2,
    "recipient_name": "Nguyễn Văn A",
    "recipient_phone": "0912345678",
    "street": "456 Lê Lợi",
    "ward": "Phường Bến Thành",
    "district": "Quận 1",
    "city": "Hồ Chí Minh",
    "address_type": "shipping",
    "is_default": 0,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T14:44:44.000Z"
  },
  {
    "id": 3,
    "user_id": 3,
    "recipient_name": "Trần Thị B",
    "recipient_phone": "0923456789",
    "street": "789 Võ Văn Tần",
    "ward": "Phường 6",
    "district": "Quận 3",
    "city": "Hồ Chí Minh",
    "address_type": "shipping",
    "is_default": 1,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 4,
    "user_id": 4,
    "recipient_name": "Lê Văn C",
    "recipient_phone": "0934567890",
    "street": "321 Trần Hưng Đạo",
    "ward": "Phường Cầu Kho",
    "district": "Quận 1",
    "city": "Hồ Chí Minh",
    "address_type": "shipping",
    "is_default": 1,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  },
  {
    "id": 5,
    "user_id": 5,
    "recipient_name": "Phạm Thị D",
    "recipient_phone": "0945678901",
    "street": "567 Pasteur",
    "ward": "Phường 8",
    "district": "Quận 3",
    "city": "Hồ Chí Minh",
    "address_type": "shipping",
    "is_default": 1,
    "created_at": "2025-11-03T06:22:55.000Z",
    "updated_at": "2025-11-03T06:22:55.000Z"
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
