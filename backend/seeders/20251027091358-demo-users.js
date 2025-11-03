"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash password: 123456
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          email: "admin@example.com",
          hashed_password: hashedPassword,
          first_name: "Admin",
          last_name: "System",
          phone: "0901234567",
          avatar_url:
            "https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff&size=200",
          role: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          email: "customer1@example.com",
          hashed_password: hashedPassword,
          first_name: "Văn A",
          last_name: "Nguyễn",
          phone: "0912345678",
          avatar_url:
            "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=4CAF50&color=fff&size=200",
          role: "customer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          email: "customer2@example.com",
          hashed_password: hashedPassword,
          first_name: "Thị B",
          last_name: "Trần",
          phone: "0923456789",
          avatar_url:
            "https://ui-avatars.com/api/?name=Tran+Thi+B&background=FF5722&color=fff&size=200",
          role: "customer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          email: "customer3@example.com",
          hashed_password: hashedPassword,
          first_name: "Văn C",
          last_name: "Lê",
          phone: "0934567890",
          avatar_url:
            "https://ui-avatars.com/api/?name=Le+Van+C&background=9C27B0&color=fff&size=200",
          role: "customer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          email: "customer4@example.com",
          hashed_password: hashedPassword,
          first_name: "Thị D",
          last_name: "Phạm",
          phone: "0945678901",
          avatar_url:
            "https://ui-avatars.com/api/?name=Pham+Thi+D&background=FF9800&color=fff&size=200",
          role: "customer",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
