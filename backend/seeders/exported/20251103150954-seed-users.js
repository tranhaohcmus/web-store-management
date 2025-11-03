'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
  {
    "id": 1,
    "email": "admin@example.com",
    "hashed_password": "$2b$10$zPHT6YHZK0pghQi2eiaFxeTP2WtzIfheIAQrE1FH9MouERffLnUci",
    "first_name": "Admin",
    "last_name": "System",
    "phone": "0901234567",
    "avatar_url": "https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff&size=200",
    "role": "admin",
    "created_at": "2025-11-03T06:22:52.000Z",
    "updated_at": "2025-11-03T06:22:52.000Z",
    "last_login": null,
    "is_email_verified": 0,
    "email_verification_token": null,
    "reset_password_token": null,
    "reset_password_expires": null
  },
  {
    "id": 2,
    "email": "customer1@example.com",
    "hashed_password": "$2b$10$zPHT6YHZK0pghQi2eiaFxeTP2WtzIfheIAQrE1FH9MouERffLnUci",
    "first_name": "Văn A",
    "last_name": "Nguyễn",
    "phone": "0912345678",
    "avatar_url": "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=4CAF50&color=fff&size=200",
    "role": "customer",
    "created_at": "2025-11-03T06:22:52.000Z",
    "updated_at": "2025-11-03T06:22:52.000Z",
    "last_login": null,
    "is_email_verified": 0,
    "email_verification_token": null,
    "reset_password_token": null,
    "reset_password_expires": null
  },
  {
    "id": 3,
    "email": "customer2@example.com",
    "hashed_password": "$2b$10$zPHT6YHZK0pghQi2eiaFxeTP2WtzIfheIAQrE1FH9MouERffLnUci",
    "first_name": "Thị B",
    "last_name": "Trần",
    "phone": "0923456789",
    "avatar_url": "https://ui-avatars.com/api/?name=Tran+Thi+B&background=FF5722&color=fff&size=200",
    "role": "customer",
    "created_at": "2025-11-03T06:22:52.000Z",
    "updated_at": "2025-11-03T06:22:52.000Z",
    "last_login": null,
    "is_email_verified": 0,
    "email_verification_token": null,
    "reset_password_token": null,
    "reset_password_expires": null
  },
  {
    "id": 4,
    "email": "customer3@example.com",
    "hashed_password": "$2b$10$zPHT6YHZK0pghQi2eiaFxeTP2WtzIfheIAQrE1FH9MouERffLnUci",
    "first_name": "Văn C",
    "last_name": "Lê",
    "phone": "0934567890",
    "avatar_url": "https://ui-avatars.com/api/?name=Le+Van+C&background=9C27B0&color=fff&size=200",
    "role": "customer",
    "created_at": "2025-11-03T06:22:52.000Z",
    "updated_at": "2025-11-03T06:22:52.000Z",
    "last_login": null,
    "is_email_verified": 0,
    "email_verification_token": null,
    "reset_password_token": null,
    "reset_password_expires": null
  },
  {
    "id": 5,
    "email": "customer4@example.com",
    "hashed_password": "$2b$10$zPHT6YHZK0pghQi2eiaFxeTP2WtzIfheIAQrE1FH9MouERffLnUci",
    "first_name": "Thị D",
    "last_name": "Phạm",
    "phone": "0945678901",
    "avatar_url": "https://ui-avatars.com/api/?name=Pham+Thi+D&background=FF9800&color=fff&size=200",
    "role": "customer",
    "created_at": "2025-11-03T06:22:52.000Z",
    "updated_at": "2025-11-03T06:22:52.000Z",
    "last_login": null,
    "is_email_verified": 0,
    "email_verification_token": null,
    "reset_password_token": null,
    "reset_password_expires": null
  }
], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
