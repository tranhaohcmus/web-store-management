"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Link attributes to Product Types
    await queryInterface.bulkInsert(
      "ProductTypeAttributes",
      [
        // Soccer Cleats (product_type_id: 1) has: Size, Sole Type, Color
        {
          id: 1,
          product_type_id: 1,
          attribute_id: 1, // Size
          is_required: true,
          display_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          product_type_id: 1,
          attribute_id: 2, // Sole Type
          is_required: true,
          display_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          product_type_id: 1,
          attribute_id: 3, // Color
          is_required: true,
          display_order: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Jersey (product_type_id: 2) has: Shirt Size, Color
        {
          id: 4,
          product_type_id: 2,
          attribute_id: 4, // Shirt Size
          is_required: true,
          display_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          product_type_id: 2,
          attribute_id: 3, // Color
          is_required: true,
          display_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductTypeAttributes", null, {});
  },
};
