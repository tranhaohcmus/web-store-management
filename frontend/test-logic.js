// Test CreateProduct component logic
const categoryToProductTypeMap = {
  4: 1, // Giày đá bóng -> Giày Đá Bóng (soccer_cleat)
  5: 1, // Giày chạy bộ -> Giày Đá Bóng
  6: 1, // Giày bóng rổ -> Giày Đá Bóng
  7: 1, // Giày tennis -> Giày Đá Bóng
  15: 1, // Giày FG -> Giày Đá Bóng
  16: 1, // Giày TF -> Giày Đá Bóng
  17: 1, // Giày IC -> Giày Đá Bóng
  8: 2, // Áo đấu -> Áo Đấu (jersey)
  9: 3, // Quần đấu -> Quần Short
  13: 4, // Tất đá bóng -> Tất Bóng Đá
  11: 5, // Găng tay thủ môn -> Phụ Kiện
  12: 5, // Bóng đá -> Phụ Kiện
  14: 5, // Túi đựng giày -> Phụ Kiện
};

const getProductTypeByCategory = (categoryId) => {
  return categoryToProductTypeMap[categoryId] || 1;
};

// Simulate: User selects "Giày đá bóng" (category_id: 4)
const selectedCategoryId = 4;
const expectedProductTypeId = getProductTypeByCategory(selectedCategoryId);

console.log("Selected Category ID:", selectedCategoryId);
console.log("Expected Product Type ID:", expectedProductTypeId);
console.log("Should be: 1 (Giày Đá Bóng)");

// Simulate: Product types from API
const mockProductTypes = [
  {
    id: 1,
    name: "Giày Đá Bóng",
    code: "soccer_cleat",
    productTypeAttributes: [
      {
        attribute_id: 1,
        is_required: true,
        display_order: 1,
        attribute: {
          id: 1,
          name: "Kích cỡ",
          code: "size",
          values: [
            { id: 1, value: "39" },
            { id: 2, value: "40" },
            { id: 3, value: "41" },
          ],
        },
      },
      {
        attribute_id: 3,
        is_required: false,
        display_order: 2,
        attribute: {
          id: 3,
          name: "Màu sắc",
          code: "color",
          values: [
            { id: 10, value: "Xanh dương" },
            { id: 11, value: "Đỏ" },
          ],
        },
      },
      {
        attribute_id: 2,
        is_required: true,
        display_order: 3,
        attribute: {
          id: 2,
          name: "Loại đế",
          code: "sole_type",
          values: [
            { id: 7, value: "FG" },
            { id: 8, value: "TF" },
            { id: 9, value: "IC" },
          ],
        },
      },
    ],
  },
];

const selectedProductType = mockProductTypes.find(
  (pt) => pt.id === expectedProductTypeId
);

console.log("\nSelected Product Type:", selectedProductType);
console.log(
  "\nAttributes Count:",
  selectedProductType?.productTypeAttributes?.length
);

if (selectedProductType?.productTypeAttributes) {
  console.log("\nAttributes that should appear:");
  selectedProductType.productTypeAttributes
    .sort((a, b) => a.display_order - b.display_order)
    .forEach((pta) => {
      console.log(
        `- ${pta.attribute.name} (${pta.is_required ? "required" : "optional"})`
      );
      console.log(
        `  Values: ${pta.attribute.values.map((v) => v.value).join(", ")}`
      );
    });
}
