"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Brands",
      [
        {
          id: 1,
          name: "Nike",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
          description: "Just Do It - American multinational corporation",
          created_at: new Date(),
        },
        {
          id: 2,
          name: "Adidas",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
          description:
            "Impossible is Nothing - German multinational corporation",
          created_at: new Date(),
        },
        {
          id: 3,
          name: "Puma",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg",
          description: "Forever Faster - German multinational corporation",
          created_at: new Date(),
        },
        {
          id: 4,
          name: "New Balance",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg",
          description:
            "Fearlessly Independent Since 1906 - American footwear brand",
          created_at: new Date(),
        },
        {
          id: 5,
          name: "Under Armour",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
          description: "I Will - American sports equipment company",
          created_at: new Date(),
        },
        {
          id: 6,
          name: "Mizuno",
          logo_url:
            "https://upload.wikimedia.org/wikipedia/commons/8/8e/Mizuno_logo.svg",
          description:
            "Reach Beyond - Japanese sports equipment and sportswear company",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
  },
};
