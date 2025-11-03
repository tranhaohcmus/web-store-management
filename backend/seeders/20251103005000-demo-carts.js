"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Carts for customers
    await queryInterface.bulkInsert(
      "Carts",
      [
        {
          id: 1,
          customer_id: 2, // customer1
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          customer_id: 3, // customer2
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          customer_id: 4, // customer3
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          customer_id: 5, // customer4
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    // Cart Items
    await queryInterface.bulkInsert(
      "CartItems",
      [
        // Customer 1's cart
        {
          id: 1,
          cart_id: 1,
          variant_id: 1, // Nike Mercurial Size 41
          quantity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          cart_id: 1,
          variant_id: 3, // Adidas Predator Size 41
          quantity: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Customer 2's cart
        {
          id: 3,
          cart_id: 2,
          variant_id: 5, // Puma Future Size 41
          quantity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Customer 3's cart is empty

        // Customer 4's cart
        {
          id: 4,
          cart_id: 4,
          variant_id: 2, // Nike Mercurial Size 42
          quantity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CartItems", null, {});
    await queryInterface.bulkDelete("Carts", null, {});
  },
};
