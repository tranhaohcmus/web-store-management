"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Attributes for soccer cleats
    await queryInterface.bulkInsert(
      "Attributes",
      [
        {
          id: 1,
          name: "Kích cỡ",
          code: "size",
          type: "select",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Loại đế",
          code: "sole_type",
          type: "select",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "Màu sắc",
          code: "color",
          type: "select",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "Size áo",
          code: "shirt_size",
          type: "select",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    // Attribute Values
    await queryInterface.bulkInsert(
      "AttributeValues",
      [
        // Size values
        {
          id: 1,
          attribute_id: 1,
          value: "39",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          attribute_id: 1,
          value: "40",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          attribute_id: 1,
          value: "41",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          attribute_id: 1,
          value: "42",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          attribute_id: 1,
          value: "43",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          attribute_id: 1,
          value: "44",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Sole type values
        {
          id: 7,
          attribute_id: 2,
          value: "FG",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          attribute_id: 2,
          value: "TF",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          attribute_id: 2,
          value: "IC",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Color values
        {
          id: 10,
          attribute_id: 3,
          value: "Xanh dương",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          attribute_id: 3,
          value: "Đỏ",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          attribute_id: 3,
          value: "Vàng",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 13,
          attribute_id: 3,
          value: "Đen",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 14,
          attribute_id: 3,
          value: "Trắng",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Shirt size values
        {
          id: 15,
          attribute_id: 4,
          value: "S",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 16,
          attribute_id: 4,
          value: "M",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 17,
          attribute_id: 4,
          value: "L",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 18,
          attribute_id: 4,
          value: "XL",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 19,
          attribute_id: 4,
          value: "XXL",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AttributeValues", null, {});
    await queryInterface.bulkDelete("Attributes", null, {});
  },
};
