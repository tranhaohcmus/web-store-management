"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add more product types
    await queryInterface.bulkInsert(
      "ProductTypes",
      [
        {
          id: 3,
          name: "Quần Short",
          code: "shorts",
          description: "Quần short thể thao",
          created_at: new Date(),
        },
        {
          id: 4,
          name: "Tất Bóng Đá",
          code: "socks",
          description: "Tất chuyên dụng cho bóng đá",
          created_at: new Date(),
        },
        {
          id: 5,
          name: "Phụ Kiện",
          code: "accessories",
          description: "Phụ kiện bóng đá",
          created_at: new Date(),
        },
      ],
      {}
    );

    // Add 21 more products (từ id 10 đến 30)
    await queryInterface.bulkInsert(
      "Products",
      [
        // ============ GIÀY TF (Turf) - 6 sản phẩm ============
        {
          id: 10,
          name: "Nike Mercurial Vapor 15 Academy TF",
          description:
            "Giày sân cỏ nhân tạo với đế cao su chống mài mòn, phù hợp sân 5-7 người",
          product_type_id: 1,
          brand_id: 1, // Nike
          category_id: 6, // Giày TF
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-b3a54734-0409-487f-8f91-8f8caa4c52eb/VAPOR+15+ACADEMY+TF.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          name: "Adidas Predator Accuracy.3 TF",
          description:
            "Giày TF với công nghệ High Definition Grip giúp kiểm soát bóng tốt trên sân cỏ nhân tạo",
          product_type_id: 1,
          brand_id: 2, // Adidas
          category_id: 6,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fb6fd87019b34a1197f2af3d0113c922_9366/Giay_da_banh_san_co_nhan_tao_Predator_Accuracy.3_Turf_DJen_GW4631_01_standard.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          name: "Puma Future 7 Play TF",
          description:
            "Giày TF linh hoạt với đế FUZIONFIT giúp di chuyển nhanh nhẹn",
          product_type_id: 1,
          brand_id: 3, // Puma
          category_id: 6,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107573/02/sv01/fnd/PNA/fmt/png/FUTURE-7-PLAY-TF-Unisex-Football-Boots",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 13,
          name: "Nike Tiempo Legend 9 Academy TF",
          description:
            "Giày da tổng hợp cao cấp cho sân cỏ nhân tạo, êm ái và bền bỉ",
          product_type_id: 1,
          brand_id: 1,
          category_id: 6,
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-6dc5de09-eb7e-46f8-8d0e-e246703d5de8/LEGEND+9+ACADEMY+TF.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 14,
          name: "Adidas X Speedportal.3 TF",
          description:
            "Giày tốc độ với upper Speedskin siêu nhẹ cho sân cỏ nhân tạo",
          product_type_id: 1,
          brand_id: 2,
          category_id: 6,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/88704c78e8694cef8a35aef900f2e40a_9366/Giay_da_banh_san_co_nhan_tao_X_Speedportal.3_Turf_trang_GW8484_01_standard.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 15,
          name: "Mizuno Morelia Neo III Beta Japan TF",
          description:
            "Giày da kangaroo cao cấp từ Nhật Bản, mềm mại và bám bóng tuyệt vời",
          product_type_id: 1,
          brand_id: 6, // Mizuno
          category_id: 6,
          default_image_url:
            "https://cdn.shopify.com/s/files/1/0556/7942/3814/products/P1GD228509_1.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // ============ GIÀY IC (Indoor Court) - 3 sản phẩm ============
        {
          id: 16,
          name: "Nike Phantom GX Academy IC",
          description:
            "Giày futsal chuyên nghiệp với đế IC chống trượt trên sàn gỗ",
          product_type_id: 1,
          brand_id: 1,
          category_id: 7, // Giày IC
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-1e91cc7a-474f-4a8c-ade8-f0ea0dca1b94/PHANTOM+GX+ACADEMY+IC.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 17,
          name: "Adidas Predator Freak.3 IN",
          description: "Giày futsal với đế Adiwear chống mài mòn cao, grip tốt",
          product_type_id: 1,
          brand_id: 2,
          category_id: 7,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0b4f3a67a2454aa382c7ad2d00f34a56_9366/Giay_da_banh_san_trong_nha_Predator_Freak.3_Indoor_DJen_GY4975_01_standard.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 18,
          name: "Puma Ultra Ultimate IT",
          description:
            "Giày futsal siêu nhẹ với công nghệ MATRYXEVO cho độ bền cao",
          product_type_id: 1,
          brand_id: 3,
          category_id: 7,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107495/01/sv01/fnd/PNA/fmt/png/ULTRA-ULTIMATE-IT-Men's-Football-Boots",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // ============ ÁO ĐẤU - 6 sản phẩm ============
        {
          id: 19,
          name: "Nike Dri-FIT Park VII Jersey",
          description:
            "Áo đấu với công nghệ Dri-FIT thấm hút mồ hôi nhanh, thoáng mát",
          product_type_id: 2, // Áo đấu
          brand_id: 1,
          category_id: 8, // Áo đấu
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/p3plbzrvixxy0ydkqjds/M+NK+DF+PARK+VII+JSY+SS.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 20,
          name: "Adidas Squadra 21 Jersey",
          description:
            "Áo đấu Climacool thoáng khí, thiết kế năng động phù hợp thi đấu",
          product_type_id: 2,
          brand_id: 2,
          category_id: 8,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/688249e499cd43f4af35acba0117cf62_9366/Ao_thi_dau_Squadra_21_trang_GN5725_01_laydown.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 21,
          name: "Puma TeamFINAL 21 Jersey",
          description: "Áo đấu dryCELL công nghệ cao, nhẹ và co giãn 4 chiều",
          product_type_id: 2,
          brand_id: 3,
          category_id: 8,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/704365/06/fnd/PNA/fmt/png/teamFINAL-21-Men's-Jersey",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 22,
          name: "Under Armour Challenger III Training Jersey",
          description: "Áo thể thao HeatGear thông thoáng, chống tia UV",
          product_type_id: 2,
          brand_id: 5, // Under Armour
          category_id: 8,
          default_image_url:
            "https://underarmour.scene7.com/is/image/Underarmour/V5-1379387-001_FC",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 23,
          name: "New Balance Elite Tech Training Top",
          description:
            "Áo tập NB DRY công nghệ thấm hút nhanh, phù hợp tập luyện cường độ cao",
          product_type_id: 2,
          brand_id: 4, // New Balance
          category_id: 8,
          default_image_url:
            "https://nb.scene7.com/is/image/NB/mt11048bk_nb_02_i",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 24,
          name: "Mizuno Authentic Rugby Jersey",
          description: "Áo đấu DryLite độ bền cao, chống xù lông",
          product_type_id: 2,
          brand_id: 6,
          category_id: 8,
          default_image_url:
            "https://cdn.shopify.com/s/files/1/0556/7942/3814/products/P2EA7Y1009_1.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // ============ QUẦN SHORT - 3 sản phẩm ============
        {
          id: 25,
          name: "Nike Dri-FIT Park III Shorts",
          description: "Quần short thể thao với công nghệ Dri-FIT, thoáng mát",
          product_type_id: 3, // Quần short
          brand_id: 1,
          category_id: 9, // Quần short
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-e300c151-806a-4f5f-ba23-f9fad2900cf8/M+NK+DF+PARK+III+SHORT+K.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 26,
          name: "Adidas Condivo 22 Training Shorts",
          description:
            "Quần short tập luyện Aeroready thấm hút mồ hôi hiệu quả",
          product_type_id: 3,
          brand_id: 2,
          category_id: 9,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0f5576eaad7e42739a07ae3300e7428d_9366/Quan_short_tap_luyen_Condivo_22_DJen_GN5774_01_laydown.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 27,
          name: "Puma TeamFINAL 21 Knit Shorts",
          description: "Quần short dryCELL co giãn tốt, phù hợp thi đấu",
          product_type_id: 3,
          brand_id: 3,
          category_id: 9,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/704664/06/fnd/PNA/fmt/png/teamFINAL-21-Knit-Men's-Football-Shorts",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // ============ TẤT BÓNG ĐÁ - 3 sản phẩm ============
        {
          id: 28,
          name: "Nike Academy Over-The-Calf Socks",
          description:
            "Tất cao cổ Dri-FIT với đệm chống sốc ở gót và ngón chân",
          product_type_id: 4, // Tất
          brand_id: 1,
          category_id: 11, // Tất bóng đá
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a5d2b61f-a1d6-4e5a-a717-18e1bb8c10ae/U+NK+ACDMY+OTC+SOCK.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 29,
          name: "Adidas Milano 23 Socks",
          description:
            "Tất đá bóng với công nghệ Climalite thoáng khí, ôm chân tốt",
          product_type_id: 4,
          brand_id: 2,
          category_id: 11,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a7e1a9cd24c34dc59ef5af370145d6be_9366/Tat_Milano_23_DJen_IB7945_01_standard.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 30,
          name: "Puma Team Liga Socks",
          description: "Tất thể thao với vùng đệm tăng cường ở gan bàn chân",
          product_type_id: 4,
          brand_id: 3,
          category_id: 11,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/729877/02/fnd/PNA/fmt/png/TEAM-LIGA-Socks",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    // Add Product Variants cho 21 sản phẩm mới (variants 29 - 130+)
    const variants = [];
    let variantId = 29;

    // Giày TF (products 10-15) - 3 sizes mỗi sản phẩm
    const tfProducts = [
      { id: 10, basePrice: 1800000, promoPrice: 1600000, sku: "NIKE-VAP15-TF" },
      { id: 11, basePrice: 2000000, promoPrice: 1800000, sku: "ADS-PRED-TF" },
      { id: 12, basePrice: 1500000, promoPrice: 1350000, sku: "PUMA-FUT7-TF" },
      { id: 13, basePrice: 1900000, promoPrice: 1700000, sku: "NIKE-TIEM9-TF" },
      { id: 14, basePrice: 2100000, promoPrice: 1900000, sku: "ADS-XSPD-TF" },
      { id: 15, basePrice: 3500000, promoPrice: 3200000, sku: "MIZ-MORE-TF" },
    ];

    tfProducts.forEach((product) => {
      [39, 40, 41, 42, 43].forEach((size) => {
        variants.push({
          id: variantId++,
          product_id: product.id,
          sku: `${product.sku}-${size}`,
          price: product.basePrice,
          promotion_price: product.promoPrice,
          physical_stock: Math.floor(Math.random() * 30) + 20, // 20-50
          reserved_stock: 0,
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    });

    // Giày IC (products 16-18) - 3 sizes mỗi sản phẩm
    const icProducts = [
      { id: 16, basePrice: 2200000, promoPrice: 2000000, sku: "NIKE-PHAN-IC" },
      { id: 17, basePrice: 2400000, promoPrice: 2200000, sku: "ADS-PRED-IC" },
      { id: 18, basePrice: 2600000, promoPrice: 2400000, sku: "PUMA-ULTR-IC" },
    ];

    icProducts.forEach((product) => {
      [40, 41, 42, 43].forEach((size) => {
        variants.push({
          id: variantId++,
          product_id: product.id,
          sku: `${product.sku}-${size}`,
          price: product.basePrice,
          promotion_price: product.promoPrice,
          physical_stock: Math.floor(Math.random() * 25) + 15, // 15-40
          reserved_stock: 0,
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    });

    // Áo đấu (products 19-24) - 4 sizes (S, M, L, XL)
    const jerseyProducts = [
      { id: 19, basePrice: 350000, promoPrice: 300000, sku: "NIKE-PARK7-JSY" },
      { id: 20, basePrice: 400000, promoPrice: 350000, sku: "ADS-SQD21-JSY" },
      { id: 21, basePrice: 380000, promoPrice: 330000, sku: "PUMA-TF21-JSY" },
      { id: 22, basePrice: 450000, promoPrice: 400000, sku: "UA-CHAL3-JSY" },
      { id: 23, basePrice: 420000, promoPrice: 380000, sku: "NB-ELITE-JSY" },
      { id: 24, basePrice: 480000, promoPrice: 430000, sku: "MIZ-AUTH-JSY" },
    ];

    const sizes = ["S", "M", "L", "XL"];
    const colors = ["RED", "BLU", "BLK", "WHT"];

    jerseyProducts.forEach((product) => {
      sizes.forEach((size) => {
        colors.forEach((color) => {
          variants.push({
            id: variantId++,
            product_id: product.id,
            sku: `${product.sku}-${size}-${color}`,
            price: product.basePrice,
            promotion_price: product.promoPrice,
            physical_stock: Math.floor(Math.random() * 50) + 30, // 30-80
            reserved_stock: 0,
            status: "active",
            created_at: new Date(),
            updated_at: new Date(),
          });
        });
      });
    });

    // Quần short (products 25-27) - 4 sizes
    const shortsProducts = [
      { id: 25, basePrice: 280000, promoPrice: 250000, sku: "NIKE-PARK3-SHT" },
      { id: 26, basePrice: 320000, promoPrice: 280000, sku: "ADS-CON22-SHT" },
      { id: 27, basePrice: 300000, promoPrice: 260000, sku: "PUMA-TF21-SHT" },
    ];

    shortsProducts.forEach((product) => {
      sizes.forEach((size) => {
        ["BLK", "WHT", "BLU"].forEach((color) => {
          variants.push({
            id: variantId++,
            product_id: product.id,
            sku: `${product.sku}-${size}-${color}`,
            price: product.basePrice,
            promotion_price: product.promoPrice,
            physical_stock: Math.floor(Math.random() * 40) + 25, // 25-65
            reserved_stock: 0,
            status: "active",
            created_at: new Date(),
            updated_at: new Date(),
          });
        });
      });
    });

    // Tất (products 28-30) - One size với màu sắc
    const socksProducts = [
      { id: 28, basePrice: 120000, promoPrice: 100000, sku: "NIKE-ACD-SOCK" },
      { id: 29, basePrice: 150000, promoPrice: 130000, sku: "ADS-MIL23-SOCK" },
      { id: 30, basePrice: 130000, promoPrice: 110000, sku: "PUMA-LIGA-SOCK" },
    ];

    socksProducts.forEach((product) => {
      ["BLK", "WHT", "RED", "BLU", "YEL"].forEach((color) => {
        variants.push({
          id: variantId++,
          product_id: product.id,
          sku: `${product.sku}-OS-${color}`,
          price: product.basePrice,
          promotion_price: product.promoPrice,
          physical_stock: Math.floor(Math.random() * 60) + 40, // 40-100
          reserved_stock: 0,
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("ProductVariants", variants, {});
  },

  async down(queryInterface, Sequelize) {
    // Delete variants first
    await queryInterface.bulkDelete("ProductVariants", {
      id: { [Sequelize.Op.gte]: 29 },
    });

    // Delete products
    await queryInterface.bulkDelete("Products", {
      id: { [Sequelize.Op.between]: [10, 30] },
    });

    // Delete product types
    await queryInterface.bulkDelete("ProductTypes", {
      id: { [Sequelize.Op.between]: [3, 5] },
    });
  },
};
