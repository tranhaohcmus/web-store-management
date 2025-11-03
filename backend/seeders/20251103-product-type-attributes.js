"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get IDs
    const [productTypes] = await queryInterface.sequelize.query(
      "SELECT id, code FROM ProductTypes"
    );
    const [attributes] = await queryInterface.sequelize.query(
      "SELECT id, code FROM Attributes"
    );

    const soccerCleat = productTypes.find((pt) => pt.code === "soccer_cleat");
    const sizeAttr = attributes.find((a) => a.code === "size");
    const colorAttr = attributes.find((a) => a.code === "color");
    const soleTypeAttr = attributes.find((a) => a.code === "sole_type");

    if (!soccerCleat || !sizeAttr || !colorAttr || !soleTypeAttr) {
      console.log("Missing required data:", {
        soccerCleat,
        sizeAttr,
        colorAttr,
        soleTypeAttr,
      });
      return;
    }

    await queryInterface.bulkInsert(
      "ProductTypeAttributes",
      [
        {
          product_type_id: soccerCleat.id,
          attribute_id: sizeAttr.id,
          is_required: true,
          display_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_type_id: soccerCleat.id,
          attribute_id: colorAttr.id,
          is_required: false,
          display_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_type_id: soccerCleat.id,
          attribute_id: soleTypeAttr.id,
          is_required: true,
          display_order: 3,
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
