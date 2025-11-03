"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Product Types
    await queryInterface.bulkInsert(
      "ProductTypes",
      [
        {
          id: 1,
          name: "Giày Đá Bóng",
          code: "soccer_cleat",
          description: "Giày chuyên dụng cho bóng đá",
          created_at: new Date(),
        },
        {
          id: 2,
          name: "Áo Đấu",
          code: "jersey",
          description: "Áo thi đấu thể thao",
          created_at: new Date(),
        },
      ],
      {}
    );

    // 2. Products
    await queryInterface.bulkInsert(
      "Products",
      [
        // Nike Products
        {
          id: 1,
          name: "Nike Mercurial Superfly 9 Elite",
          description:
            "Giày đá bóng cao cấp với công nghệ Zoom Air, thiết kế aerodynamic giúp tăng tốc độ tối đa",
          product_type_id: 1,
          brand_id: 1, // Nike
          category_id: 4, // Giày đá bóng
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9dda222e-ef9e-4e21-83e8-c99c86ae1bca/NIKE+ZOOM+MERCURIAL+SUPERFLY+9+ELITE+FG.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "Nike Phantom GX Elite",
          description:
            "Giày đá bóng với bề mặt Gripknit giúp kiểm soát bóng hoàn hảo trong mọi điều kiện thời tiết",
          product_type_id: 1,
          brand_id: 1,
          category_id: 4,
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0e255abf-f4fb-4b5f-827f-9330938b407a/PHANTOM+GX+ELITE+FG.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "Nike Tiempo Legend 10 Elite",
          description:
            "Giày da kangaroo cao cấp, mềm mại và bền bỉ cho cảm giác chạm bóng tuyệt vời",
          product_type_id: 1,
          brand_id: 1,
          category_id: 4,
          default_image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-665e7fa2-13b6-4c1d-9e4f-2c551c77ddb4/LEGEND+10+ELITE+FG.png",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Products
        {
          id: 4,
          name: "Adidas Predator Elite",
          description:
            "Giày đá bóng với công nghệ Controlframe giúp kiểm soát bóng chính xác trong mọi tình huống",
          product_type_id: 1,
          brand_id: 2, // Adidas
          category_id: 4,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c0b02c5bdf64773a551afac00f77d80_9366/Giay_da_banh_san_co_tu_nhien_Predator_Elite_Firm_Ground_trang_GY9383_01_standard.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: "Adidas X Crazyfast Elite",
          description:
            "Giày siêu nhẹ chỉ 175g, được thiết kế cho tốc độ và sự bứt phá",
          product_type_id: 1,
          brand_id: 2,
          category_id: 4,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/308b3b83ad2d47c0b23baf3c00bb4da8_9366/Giay_da_banh_san_co_tu_nhien_X_Crazyfast_Elite_Firm_Ground_DJen_GW4387_01_standard.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: "Adidas Copa Pure Elite",
          description:
            "Giày da cao cấp với công nghệ Fusionskin cho độ mềm mại và độ bám bóng tuyệt vời",
          product_type_id: 1,
          brand_id: 2,
          category_id: 4,
          default_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e626c7cdac204dc5b948aebc00db65c5_9366/Giay_da_banh_san_co_tu_nhien_Copa_Pure_Elite_Firm_Ground_trang_GW8781_01_standard.jpg",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Products
        {
          id: 7,
          name: "Puma Future Ultimate",
          description:
            "Giày đá bóng với hệ thống dây buộc FUZIONFIT360 ôm sát bàn chân, tăng khả năng linh hoạt",
          product_type_id: 1,
          brand_id: 3, // Puma
          category_id: 4,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/107519/01/sv01/fnd/PNA/fmt/png/FUTURE-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: "Puma Ultra Ultimate",
          description:
            "Giày siêu nhẹ với đế ngoài ULTRAWEAVE giúp tăng tốc độ và độ bền",
          product_type_id: 1,
          brand_id: 3,
          category_id: 4,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/107488/01/sv01/fnd/PNA/fmt/png/ULTRA-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          name: "Puma King Ultimate",
          description:
            "Giày da kangaroo K-BETTER™ cao cấp với công nghệ thân thiện môi trường",
          product_type_id: 1,
          brand_id: 3,
          category_id: 4,
          default_image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/107518/01/sv01/fnd/PNA/fmt/png/KING-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "published",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    // 3. Product Variants
    await queryInterface.bulkInsert(
      "ProductVariants",
      [
        // Nike Mercurial Superfly 9 Elite variants
        {
          id: 1,
          product_id: 1,
          sku: "NIKE-MERC9-39-FG-BLU",
          price: 5500000,
          promotion_price: 5200000,
          physical_stock: 30,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9dda222e-ef9e-4e21-83e8-c99c86ae1bca/NIKE+ZOOM+MERCURIAL+SUPERFLY+9+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          product_id: 1,
          sku: "NIKE-MERC9-40-FG-BLU",
          price: 5500000,
          promotion_price: 5200000,
          physical_stock: 40,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9dda222e-ef9e-4e21-83e8-c99c86ae1bca/NIKE+ZOOM+MERCURIAL+SUPERFLY+9+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          product_id: 1,
          sku: "NIKE-MERC9-41-FG-BLU",
          price: 5500000,
          promotion_price: 5200000,
          physical_stock: 50,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9dda222e-ef9e-4e21-83e8-c99c86ae1bca/NIKE+ZOOM+MERCURIAL+SUPERFLY+9+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          product_id: 1,
          sku: "NIKE-MERC9-42-FG-BLU",
          price: 5500000,
          promotion_price: 5200000,
          physical_stock: 45,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9dda222e-ef9e-4e21-83e8-c99c86ae1bca/NIKE+ZOOM+MERCURIAL+SUPERFLY+9+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Phantom GX Elite variants
        {
          id: 5,
          product_id: 2,
          sku: "NIKE-PHAN-40-FG-BLK",
          price: 5200000,
          promotion_price: 4900000,
          physical_stock: 35,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0e255abf-f4fb-4b5f-827f-9330938b407a/PHANTOM+GX+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          product_id: 2,
          sku: "NIKE-PHAN-41-FG-BLK",
          price: 5200000,
          promotion_price: 4900000,
          physical_stock: 40,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0e255abf-f4fb-4b5f-827f-9330938b407a/PHANTOM+GX+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          product_id: 2,
          sku: "NIKE-PHAN-42-FG-BLK",
          price: 5200000,
          promotion_price: 4900000,
          physical_stock: 38,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0e255abf-f4fb-4b5f-827f-9330938b407a/PHANTOM+GX+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Nike Tiempo Legend 10 variants
        {
          id: 8,
          product_id: 3,
          sku: "NIKE-TIEM-40-FG-BLK",
          price: 5800000,
          promotion_price: 5500000,
          physical_stock: 25,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-665e7fa2-13b6-4c1d-9e4f-2c551c77ddb4/LEGEND+10+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          product_id: 3,
          sku: "NIKE-TIEM-41-FG-BLK",
          price: 5800000,
          promotion_price: 5500000,
          physical_stock: 30,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-665e7fa2-13b6-4c1d-9e4f-2c551c77ddb4/LEGEND+10+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          product_id: 3,
          sku: "NIKE-TIEM-42-FG-BLK",
          price: 5800000,
          promotion_price: 5500000,
          physical_stock: 28,
          reserved_stock: 0,
          image_url:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-665e7fa2-13b6-4c1d-9e4f-2c551c77ddb4/LEGEND+10+ELITE+FG.png",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Predator Elite variants
        {
          id: 11,
          product_id: 4,
          sku: "ADS-PRED-40-FG-WHT",
          price: 4800000,
          promotion_price: 4500000,
          physical_stock: 45,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c0b02c5bdf64773a551afac00f77d80_9366/Giay_da_banh_san_co_tu_nhien_Predator_Elite_Firm_Ground_trang_GY9383_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          product_id: 4,
          sku: "ADS-PRED-41-FG-WHT",
          price: 4800000,
          promotion_price: 4500000,
          physical_stock: 60,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c0b02c5bdf64773a551afac00f77d80_9366/Giay_da_banh_san_co_tu_nhien_Predator_Elite_Firm_Ground_trang_GY9383_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 13,
          product_id: 4,
          sku: "ADS-PRED-42-FG-WHT",
          price: 4800000,
          promotion_price: 4500000,
          physical_stock: 55,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c0b02c5bdf64773a551afac00f77d80_9366/Giay_da_banh_san_co_tu_nhien_Predator_Elite_Firm_Ground_trang_GY9383_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas X Crazyfast variants
        {
          id: 14,
          product_id: 5,
          sku: "ADS-XCRA-40-FG-BLK",
          price: 5000000,
          promotion_price: 4700000,
          physical_stock: 35,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/308b3b83ad2d47c0b23baf3c00bb4da8_9366/Giay_da_banh_san_co_tu_nhien_X_Crazyfast_Elite_Firm_Ground_DJen_GW4387_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 15,
          product_id: 5,
          sku: "ADS-XCRA-41-FG-BLK",
          price: 5000000,
          promotion_price: 4700000,
          physical_stock: 42,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/308b3b83ad2d47c0b23baf3c00bb4da8_9366/Giay_da_banh_san_co_tu_nhien_X_Crazyfast_Elite_Firm_Ground_DJen_GW4387_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 16,
          product_id: 5,
          sku: "ADS-XCRA-42-FG-BLK",
          price: 5000000,
          promotion_price: 4700000,
          physical_stock: 38,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/308b3b83ad2d47c0b23baf3c00bb4da8_9366/Giay_da_banh_san_co_tu_nhien_X_Crazyfast_Elite_Firm_Ground_DJen_GW4387_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Adidas Copa Pure variants
        {
          id: 17,
          product_id: 6,
          sku: "ADS-COPA-40-FG-WHT",
          price: 5300000,
          promotion_price: 5000000,
          physical_stock: 30,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e626c7cdac204dc5b948aebc00db65c5_9366/Giay_da_banh_san_co_tu_nhien_Copa_Pure_Elite_Firm_Ground_trang_GW8781_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 18,
          product_id: 6,
          sku: "ADS-COPA-41-FG-WHT",
          price: 5300000,
          promotion_price: 5000000,
          physical_stock: 35,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e626c7cdac204dc5b948aebc00db65c5_9366/Giay_da_banh_san_co_tu_nhien_Copa_Pure_Elite_Firm_Ground_trang_GW8781_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 19,
          product_id: 6,
          sku: "ADS-COPA-42-FG-WHT",
          price: 5300000,
          promotion_price: 5000000,
          physical_stock: 32,
          reserved_stock: 0,
          image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e626c7cdac204dc5b948aebc00db65c5_9366/Giay_da_banh_san_co_tu_nhien_Copa_Pure_Elite_Firm_Ground_trang_GW8781_01_standard.jpg",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Future Ultimate variants
        {
          id: 20,
          product_id: 7,
          sku: "PUMA-FUTU-40-FG-BLU",
          price: 4200000,
          promotion_price: 3900000,
          physical_stock: 40,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107519/01/sv01/fnd/PNA/fmt/png/FUTURE-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 21,
          product_id: 7,
          sku: "PUMA-FUTU-41-FG-BLU",
          price: 4200000,
          promotion_price: 3900000,
          physical_stock: 45,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107519/01/sv01/fnd/PNA/fmt/png/FUTURE-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 22,
          product_id: 7,
          sku: "PUMA-FUTU-42-FG-BLU",
          price: 4200000,
          promotion_price: 3900000,
          physical_stock: 35,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107519/01/sv01/fnd/PNA/fmt/png/FUTURE-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma Ultra Ultimate variants
        {
          id: 23,
          product_id: 8,
          sku: "PUMA-ULTR-40-FG-ORG",
          price: 4400000,
          promotion_price: 4100000,
          physical_stock: 32,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107488/01/sv01/fnd/PNA/fmt/png/ULTRA-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 24,
          product_id: 8,
          sku: "PUMA-ULTR-41-FG-ORG",
          price: 4400000,
          promotion_price: 4100000,
          physical_stock: 38,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107488/01/sv01/fnd/PNA/fmt/png/ULTRA-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 25,
          product_id: 8,
          sku: "PUMA-ULTR-42-FG-ORG",
          price: 4400000,
          promotion_price: 4100000,
          physical_stock: 30,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107488/01/sv01/fnd/PNA/fmt/png/ULTRA-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Puma King Ultimate variants
        {
          id: 26,
          product_id: 9,
          sku: "PUMA-KING-40-FG-WHT",
          price: 4600000,
          promotion_price: 4300000,
          physical_stock: 28,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107518/01/sv01/fnd/PNA/fmt/png/KING-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 27,
          product_id: 9,
          sku: "PUMA-KING-41-FG-WHT",
          price: 4600000,
          promotion_price: 4300000,
          physical_stock: 35,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107518/01/sv01/fnd/PNA/fmt/png/KING-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 28,
          product_id: 9,
          sku: "PUMA-KING-42-FG-WHT",
          price: 4600000,
          promotion_price: 4300000,
          physical_stock: 30,
          reserved_stock: 0,
          image_url:
            "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107518/01/sv01/fnd/PNA/fmt/png/KING-ULTIMATE-FG/AG-Men's-Football-Boots",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductVariants", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("ProductTypes", null, {});
  },
};
