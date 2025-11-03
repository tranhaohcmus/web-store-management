"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create sample orders
    await queryInterface.bulkInsert(
      "Orders",
      [
        // Order 1 - Completed order for customer 1
        {
          id: 1,
          order_number: "ORD-2024-001",
          customer_id: 2,
          status: "completed",
          payment_method: "cod",
          payment_status: "paid",

          // Shipping info
          shipping_recipient_name: "Nguyễn Văn A",
          shipping_recipient_phone: "0912345678",
          shipping_street: "123 Nguyễn Huệ",
          shipping_ward: "Phường Bến Nghé",
          shipping_district: "Quận 1",
          shipping_city: "Hồ Chí Minh",

          // Pricing
          subtotal: 5200000, // Nike Mercurial promotion price
          shipping_fee: 30000,
          total_amount: 5230000,

          customer_note: "Giao hàng giờ hành chính",
          order_date: new Date("2024-10-15"),

          created_at: new Date("2024-10-15"),
          updated_at: new Date("2024-10-20"),
        },

        // Order 2 - Completed order for customer 2
        {
          id: 2,
          order_number: "ORD-2024-002",
          customer_id: 3,
          status: "completed",
          payment_method: "bank_transfer",
          payment_status: "paid",

          shipping_recipient_name: "Trần Thị B",
          shipping_recipient_phone: "0923456789",
          shipping_street: "789 Võ Văn Tần",
          shipping_ward: "Phường 6",
          shipping_district: "Quận 3",
          shipping_city: "Hồ Chí Minh",

          subtotal: 9000000, // 2x Adidas Predator
          shipping_fee: 30000,
          total_amount: 9030000,

          customer_note: null,
          order_date: new Date("2024-10-25"),

          created_at: new Date("2024-10-25"),
          updated_at: new Date("2024-10-30"),
        },

        // Order 3 - Shipping order for customer 3
        {
          id: 3,
          order_number: "ORD-2024-003",
          customer_id: 4,
          status: "shipping",
          payment_method: "cod",
          payment_status: "unpaid",

          shipping_recipient_name: "Lê Văn C",
          shipping_recipient_phone: "0934567890",
          shipping_street: "321 Trần Hưng Đạo",
          shipping_ward: "Phường Cầu Kho",
          shipping_district: "Quận 1",
          shipping_city: "Hồ Chí Minh",

          subtotal: 3900000, // Puma Future
          shipping_fee: 30000,
          total_amount: 3930000,

          customer_note: "Gọi trước khi giao",
          order_date: new Date("2024-11-01"),

          created_at: new Date("2024-11-01"),
          updated_at: new Date("2024-11-02"),
        },

        // Order 4 - Processing order for customer 4
        {
          id: 4,
          order_number: "ORD-2024-004",
          customer_id: 5,
          status: "processing",
          payment_method: "bank_transfer",
          payment_status: "paid",

          shipping_recipient_name: "Phạm Thị D",
          shipping_recipient_phone: "0945678901",
          shipping_street: "567 Pasteur",
          shipping_ward: "Phường 8",
          shipping_district: "Quận 3",
          shipping_city: "Hồ Chí Minh",

          subtotal: 9700000, // Nike + Adidas
          shipping_fee: 30000,
          total_amount: 9730000,

          customer_note: null,
          order_date: new Date("2024-11-02"),

          created_at: new Date("2024-11-02"),
          updated_at: new Date("2024-11-02"),
        },

        // Order 5 - Pending order for customer 1
        {
          id: 5,
          order_number: "ORD-2024-005",
          customer_id: 2,
          status: "pending",
          payment_method: "cod",
          payment_status: "unpaid",

          shipping_recipient_name: "Nguyễn Văn A",
          shipping_recipient_phone: "0912345678",
          shipping_street: "456 Lê Lợi",
          shipping_ward: "Phường Bến Thành",
          shipping_district: "Quận 1",
          shipping_city: "Hồ Chí Minh",

          subtotal: 7800000, // Puma x2
          shipping_fee: 30000,
          total_amount: 7830000,

          customer_note: "Kiểm tra hàng trước khi thanh toán",
          order_date: new Date("2024-11-03"),

          created_at: new Date("2024-11-03"),
          updated_at: new Date("2024-11-03"),
        },
      ],
      {}
    );

    // Order Items
    await queryInterface.bulkInsert(
      "OrderItems",
      [
        // Order 1 items
        {
          id: 1,
          order_id: 1,
          variant_id: 1,
          variant_snapshot: JSON.stringify({
            sku: "NIKE-MERC9-41-FG-BLU",
            product_name: "Nike Mercurial Superfly 9 Elite",
            image_url: "https://static.nike.com/a/images/mercurial-blue.jpg",
            attributes: "Size 41, FG, Xanh dương",
          }),
          quantity: 1,
          unit_price: 5200000,
          subtotal: 5200000,
          created_at: new Date("2024-10-15"),
        },

        // Order 2 items
        {
          id: 2,
          order_id: 2,
          variant_id: 3,
          variant_snapshot: JSON.stringify({
            sku: "ADS-PRED-41-FG-RED",
            product_name: "Adidas Predator Edge",
            image_url: "https://assets.adidas.com/predator-red.jpg",
            attributes: "Size 41, FG, Đỏ",
          }),
          quantity: 2,
          unit_price: 4500000,
          subtotal: 9000000,
          created_at: new Date("2024-10-25"),
        },

        // Order 3 items
        {
          id: 3,
          order_id: 3,
          variant_id: 5,
          variant_snapshot: JSON.stringify({
            sku: "PUMA-FUTZ-41-FG-YEL",
            product_name: "Puma Future Z 1.3",
            image_url: "https://images.puma.com/future-yellow.jpg",
            attributes: "Size 41, FG, Vàng",
          }),
          quantity: 1,
          unit_price: 3900000,
          subtotal: 3900000,
          created_at: new Date("2024-11-01"),
        },

        // Order 4 items (2 items)
        {
          id: 4,
          order_id: 4,
          variant_id: 2,
          variant_snapshot: JSON.stringify({
            sku: "NIKE-MERC9-42-FG-BLU",
            product_name: "Nike Mercurial Superfly 9 Elite",
            image_url: "https://static.nike.com/a/images/mercurial-blue.jpg",
            attributes: "Size 42, FG, Xanh dương",
          }),
          quantity: 1,
          unit_price: 5200000,
          subtotal: 5200000,
          created_at: new Date("2024-11-02"),
        },
        {
          id: 5,
          order_id: 4,
          variant_id: 4,
          variant_snapshot: JSON.stringify({
            sku: "ADS-PRED-42-FG-RED",
            product_name: "Adidas Predator Edge",
            image_url: "https://assets.adidas.com/predator-red.jpg",
            attributes: "Size 42, FG, Đỏ",
          }),
          quantity: 1,
          unit_price: 4500000,
          subtotal: 4500000,
          created_at: new Date("2024-11-02"),
        },

        // Order 5 items (2 items)
        {
          id: 6,
          order_id: 5,
          variant_id: 6,
          variant_snapshot: JSON.stringify({
            sku: "PUMA-FUTZ-42-FG-YEL",
            product_name: "Puma Future Z 1.3",
            image_url: "https://images.puma.com/future-yellow.jpg",
            attributes: "Size 42, FG, Vàng",
          }),
          quantity: 2,
          unit_price: 3900000,
          subtotal: 7800000,
          created_at: new Date("2024-11-03"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderItems", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
