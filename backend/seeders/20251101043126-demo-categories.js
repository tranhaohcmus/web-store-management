"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        // Level 1 - Main Categories
        {
          id: 1,
          name: "Giày thể thao",
          slug: "giay-the-thao",
          parent_id: null,
          display_order: 1,
          created_at: new Date(),
        },
        {
          id: 2,
          name: "Quần áo thể thao",
          slug: "quan-ao-the-thao",
          parent_id: null,
          display_order: 2,
          created_at: new Date(),
        },
        {
          id: 3,
          name: "Phụ kiện",
          slug: "phu-kien",
          parent_id: null,
          display_order: 3,
          created_at: new Date(),
        },

        // Level 2 - Giày thể thao subcategories
        {
          id: 4,
          name: "Giày đá bóng",
          slug: "giay-da-bong",
          parent_id: 1,
          display_order: 1,
          created_at: new Date(),
        },
        {
          id: 5,
          name: "Giày chạy bộ",
          slug: "giay-chay-bo",
          parent_id: 1,
          display_order: 2,
          created_at: new Date(),
        },
        {
          id: 6,
          name: "Giày bóng rổ",
          slug: "giay-bong-ro",
          parent_id: 1,
          display_order: 3,
          created_at: new Date(),
        },
        {
          id: 7,
          name: "Giày tennis",
          slug: "giay-tennis",
          parent_id: 1,
          display_order: 4,
          created_at: new Date(),
        },

        // Level 2 - Quần áo thể thao subcategories
        {
          id: 8,
          name: "Áo đấu",
          slug: "ao-dau",
          parent_id: 2,
          display_order: 1,
          created_at: new Date(),
        },
        {
          id: 9,
          name: "Quần đấu",
          slug: "quan-dau",
          parent_id: 2,
          display_order: 2,
          created_at: new Date(),
        },
        {
          id: 10,
          name: "Áo khoác",
          slug: "ao-khoac",
          parent_id: 2,
          display_order: 3,
          created_at: new Date(),
        },

        // Level 2 - Phụ kiện subcategories
        {
          id: 11,
          name: "Găng tay thủ môn",
          slug: "gang-tay-thu-mon",
          parent_id: 3,
          display_order: 1,
          created_at: new Date(),
        },
        {
          id: 12,
          name: "Bóng đá",
          slug: "bong-da",
          parent_id: 3,
          display_order: 2,
          created_at: new Date(),
        },
        {
          id: 13,
          name: "Tất đá bóng",
          slug: "tat-da-bong",
          parent_id: 3,
          display_order: 3,
          created_at: new Date(),
        },
        {
          id: 14,
          name: "Túi đựng giày",
          slug: "tui-dung-giay",
          parent_id: 3,
          display_order: 4,
          created_at: new Date(),
        },

        // Level 3 - Giày đá bóng subcategories (by surface type)
        {
          id: 15,
          name: "Giày FG (Firm Ground)",
          slug: "giay-fg",
          parent_id: 4,
          display_order: 1,
          created_at: new Date(),
        },
        {
          id: 16,
          name: "Giày TF (Turf)",
          slug: "giay-tf",
          parent_id: 4,
          display_order: 2,
          created_at: new Date(),
        },
        {
          id: 17,
          name: "Giày IC (Indoor Court)",
          slug: "giay-ic",
          parent_id: 4,
          display_order: 3,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
