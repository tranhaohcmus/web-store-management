const { Product, sequelize } = require("./models");
const fs = require("fs");
const path = require("path");

(async () => {
  await sequelize.authenticate();

  const products = await Product.findAll();
  let fixCount = 0;
  const missingImages = [];

  for (const product of products) {
    if (product.default_image_url) {
      const fullPath = path.join(
        __dirname,
        "public",
        product.default_image_url
      );

      if (!fs.existsSync(fullPath)) {
        console.log(`❌ ID ${product.id}: ${product.name}`);
        console.log(`   Missing: ${product.default_image_url}`);
        missingImages.push({
          id: product.id,
          name: product.name,
          path: product.default_image_url,
        });
        fixCount++;
      }
    }
  }

  console.log("\n===================");
  console.log(`Total products with missing images: ${fixCount}`);

  if (missingImages.length > 0) {
    console.log("\nProducts need fixing:");
    missingImages.forEach((p) => {
      console.log(`  - ID ${p.id}: ${p.name}`);
    });
  }

  await sequelize.close();
})();
