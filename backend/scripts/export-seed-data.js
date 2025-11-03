const { sequelize } = require("../models");
const fs = require("fs").promises;
const path = require("path");

async function exportSeedData() {
  try {
    console.log("🔄 Exporting data from database...");

    // Get all table names
    const tables = [
      "Users",
      "Stations",
      "Brands",
      "Categories",
      "Attributes",
      "AttributeValues",
      "ProductTypes",
      "ProductTypeAttributes",
      "Products",
      "ProductVariants",
      "VariantAttributeValues",
      "Addresses",
      "Carts",
      "CartItems",
      "Orders",
      "OrderItems",
    ];

    const seedersDir = path.join(__dirname, "../seeders/exported");
    await fs.mkdir(seedersDir, { recursive: true });

    for (const table of tables) {
      console.log(`📦 Exporting ${table}...`);

      const [results] = await sequelize.query(`SELECT * FROM ${table}`);

      if (results.length === 0) {
        console.log(`  ⚠️  No data in ${table}`);
        continue;
      }

      // Generate seeder file
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/T/, "")
        .split(".")[0];
      const filename = `${timestamp}-seed-${table.toLowerCase()}.js`;
      const filepath = path.join(seedersDir, filename);

      const seederContent = `'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('${table}', ${JSON.stringify(
        results,
        null,
        2
      )}, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('${table}', null, {});
  }
};
`;

      await fs.writeFile(filepath, seederContent);
      console.log(`  ✅ Exported ${results.length} records to ${filename}`);
    }

    console.log("\n✅ All data exported successfully!");
    console.log(`📁 Seed files location: ${seedersDir}`);
  } catch (error) {
    console.error("❌ Error exporting data:", error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

exportSeedData();
