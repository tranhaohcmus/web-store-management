"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Link variant attributes to specific product variants
    await queryInterface.bulkInsert(
      "VariantAttributeValues",
      [
        // Nike Mercurial Superfly 9 Elite - Variant 1 (Size 39, FG, Blue)
        {
          id: 1,
          variant_id: 1,
          attribute_id: 1,
          attribute_value_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          variant_id: 1,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          variant_id: 1,
          attribute_id: 3,
          attribute_value_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Mercurial Superfly 9 Elite - Variant 2 (Size 40, FG, Blue)
        {
          id: 4,
          variant_id: 2,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          variant_id: 2,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          variant_id: 2,
          attribute_id: 3,
          attribute_value_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Mercurial Superfly 9 Elite - Variant 3 (Size 41, FG, Blue)
        {
          id: 7,
          variant_id: 3,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          variant_id: 3,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          variant_id: 3,
          attribute_id: 3,
          attribute_value_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Mercurial Superfly 9 Elite - Variant 4 (Size 42, FG, Blue)
        {
          id: 10,
          variant_id: 4,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          variant_id: 4,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          variant_id: 4,
          attribute_id: 3,
          attribute_value_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Phantom GX Elite - Variant 5 (Size 40, FG, Black)
        {
          id: 13,
          variant_id: 5,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 14,
          variant_id: 5,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 15,
          variant_id: 5,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Phantom GX Elite - Variant 6 (Size 41, FG, Black)
        {
          id: 16,
          variant_id: 6,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 17,
          variant_id: 6,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 18,
          variant_id: 6,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Phantom GX Elite - Variant 7 (Size 42, FG, Black)
        {
          id: 19,
          variant_id: 7,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 20,
          variant_id: 7,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 21,
          variant_id: 7,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Tiempo Legend 10 Elite - Variant 8 (Size 40, FG, Black)
        {
          id: 22,
          variant_id: 8,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 23,
          variant_id: 8,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 24,
          variant_id: 8,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Tiempo Legend 10 Elite - Variant 9 (Size 41, FG, Black)
        {
          id: 25,
          variant_id: 9,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 26,
          variant_id: 9,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 27,
          variant_id: 9,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Tiempo Legend 10 Elite - Variant 10 (Size 42, FG, Black)
        {
          id: 28,
          variant_id: 10,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 29,
          variant_id: 10,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 30,
          variant_id: 10,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Predator Elite - Variant 11 (Size 40, FG, White)
        {
          id: 31,
          variant_id: 11,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 32,
          variant_id: 11,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 33,
          variant_id: 11,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Predator Elite - Variant 12 (Size 41, FG, White)
        {
          id: 34,
          variant_id: 12,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 35,
          variant_id: 12,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 36,
          variant_id: 12,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Predator Elite - Variant 13 (Size 42, FG, White)
        {
          id: 37,
          variant_id: 13,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 38,
          variant_id: 13,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 39,
          variant_id: 13,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas X Crazyfast Elite - Variant 14 (Size 40, FG, Black)
        {
          id: 40,
          variant_id: 14,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 41,
          variant_id: 14,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 42,
          variant_id: 14,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas X Crazyfast Elite - Variant 15 (Size 41, FG, Black)
        {
          id: 43,
          variant_id: 15,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 44,
          variant_id: 15,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 45,
          variant_id: 15,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas X Crazyfast Elite - Variant 16 (Size 42, FG, Black)
        {
          id: 46,
          variant_id: 16,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 47,
          variant_id: 16,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 48,
          variant_id: 16,
          attribute_id: 3,
          attribute_value_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Copa Pure Elite - Variant 17 (Size 40, FG, White)
        {
          id: 49,
          variant_id: 17,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 50,
          variant_id: 17,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 51,
          variant_id: 17,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Copa Pure Elite - Variant 18 (Size 41, FG, White)
        {
          id: 52,
          variant_id: 18,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 53,
          variant_id: 18,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 54,
          variant_id: 18,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Copa Pure Elite - Variant 19 (Size 42, FG, White)
        {
          id: 55,
          variant_id: 19,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 56,
          variant_id: 19,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 57,
          variant_id: 19,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Future Ultimate - Variant 20 (Size 40, FG, Blue)
        {
          id: 58,
          variant_id: 20,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 59,
          variant_id: 20,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 60,
          variant_id: 20,
          attribute_id: 3,
          attribute_value_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Future Ultimate - Variant 21 (Size 41, FG, Blue)
        {
          id: 61,
          variant_id: 21,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 62,
          variant_id: 21,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 63,
          variant_id: 21,
          attribute_id: 3,
          attribute_value_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Future Ultimate - Variant 22 (Size 42, FG, Blue)
        {
          id: 64,
          variant_id: 22,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 65,
          variant_id: 22,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 66,
          variant_id: 22,
          attribute_id: 3,
          attribute_value_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Ultra Ultimate - Variant 23 (Size 40, FG, Red - using closest to Orange)
        {
          id: 67,
          variant_id: 23,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 68,
          variant_id: 23,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 69,
          variant_id: 23,
          attribute_id: 3,
          attribute_value_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Ultra Ultimate - Variant 24 (Size 41, FG, Red)
        {
          id: 70,
          variant_id: 24,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 71,
          variant_id: 24,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 72,
          variant_id: 24,
          attribute_id: 3,
          attribute_value_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Ultra Ultimate - Variant 25 (Size 42, FG, Red)
        {
          id: 73,
          variant_id: 25,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 74,
          variant_id: 25,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 75,
          variant_id: 25,
          attribute_id: 3,
          attribute_value_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma King Ultimate - Variant 26 (Size 40, FG, White)
        {
          id: 76,
          variant_id: 26,
          attribute_id: 1,
          attribute_value_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 77,
          variant_id: 26,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 78,
          variant_id: 26,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma King Ultimate - Variant 27 (Size 41, FG, White)
        {
          id: 79,
          variant_id: 27,
          attribute_id: 1,
          attribute_value_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 80,
          variant_id: 27,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 81,
          variant_id: 27,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma King Ultimate - Variant 28 (Size 42, FG, White)
        {
          id: 82,
          variant_id: 28,
          attribute_id: 1,
          attribute_value_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 83,
          variant_id: 28,
          attribute_id: 2,
          attribute_value_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 84,
          variant_id: 28,
          attribute_id: 3,
          attribute_value_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("VariantAttributeValues", null, {});
  },
};
