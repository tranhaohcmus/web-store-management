"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Addresses",
      [
        // Addresses for customer1@example.com (user_id: 2)
        {
          id: 1,
          user_id: 2,
          recipient_name: "Nguyễn Văn A",
          recipient_phone: "0912345678",
          street: "123 Nguyễn Huệ",
          ward: "Phường Bến Nghé",
          district: "Quận 1",
          city: "Hồ Chí Minh",
          address_type: "shipping",
          is_default: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          user_id: 2,
          recipient_name: "Nguyễn Văn A",
          recipient_phone: "0912345678",
          street: "456 Lê Lợi",
          ward: "Phường Bến Thành",
          district: "Quận 1",
          city: "Hồ Chí Minh",
          address_type: "shipping",
          is_default: false,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Addresses for customer2@example.com (user_id: 3)
        {
          id: 3,
          user_id: 3,
          recipient_name: "Trần Thị B",
          recipient_phone: "0923456789",
          street: "789 Võ Văn Tần",
          ward: "Phường 6",
          district: "Quận 3",
          city: "Hồ Chí Minh",
          address_type: "shipping",
          is_default: true,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Addresses for customer3@example.com (user_id: 4)
        {
          id: 4,
          user_id: 4,
          recipient_name: "Lê Văn C",
          recipient_phone: "0934567890",
          street: "321 Trần Hưng Đạo",
          ward: "Phường Cầu Kho",
          district: "Quận 1",
          city: "Hồ Chí Minh",
          address_type: "shipping",
          is_default: true,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Addresses for customer4@example.com (user_id: 5)
        {
          id: 5,
          user_id: 5,
          recipient_name: "Phạm Thị D",
          recipient_phone: "0945678901",
          street: "567 Pasteur",
          ward: "Phường 8",
          district: "Quận 3",
          city: "Hồ Chí Minh",
          address_type: "shipping",
          is_default: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
