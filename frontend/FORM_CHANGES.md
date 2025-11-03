# Product Creation Form - Change Summary

## What Changed

### ❌ REMOVED: Product Type Field

**Before:**

```
[Loại sản phẩm*] [Thương hiệu*] [Danh mục*]
```

**After:**

```
[Thương hiệu*] [Danh mục*]
```

The Product Type dropdown has been removed from the UI. It is now **automatically selected** based on the category.

---

## Current Form Layout

### Section 1: Product Information

```
┌─────────────────────────────────────────────────────────┐
│ Thông Tin Sản Phẩm                                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Tên sản phẩm *                                          │
│ [________________________________]                      │
│                                                          │
│ Mô tả                                                    │
│ [________________________________]                      │
│ [________________________________]                      │
│ [________________________________]                      │
│ [________________________________]                      │
│                                                          │
│ ┌─────────────────────┬─────────────────────┐         │
│ │ Thương hiệu *       │ Danh mục *          │         │
│ │ [Select Brand ▼]    │ [Select Category ▼] │         │
│ └─────────────────────┴─────────────────────┘         │
│                                                          │
│ Trạng thái                                              │
│ [Nháp ▼]                                                │
│                                                          │
│ Hình ảnh *                                              │
│ ┌─────────────────────┐                                │
│ │  [Upload Icon]      │                                │
│ │  Click to upload    │                                │
│ │  PNG, JPG (max 5MB) │                                │
│ └─────────────────────┘                                │
└─────────────────────────────────────────────────────────┘
```

### Section 2: Product Variants (Appears after selecting Category)

**Example: When "Giày đá bóng" is selected**

```
┌─────────────────────────────────────────────────────────┐
│ Biến Thể Sản Phẩm (0)                                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ┌─ Thêm biến thể ─────────────────────────────────┐    │
│ │                                                  │    │
│ │ ┌──────────┬──────────┬──────────┐             │    │
│ │ │ Kích cỡ *│ Màu sắc  │ Loại đế *│             │    │
│ │ │ [41 ▼]   │ [Color ▼]│ [FG ▼]   │             │    │
│ │ └──────────┴──────────┴──────────┘             │    │
│ │                                                  │    │
│ │ ┌──────────┬──────────┬──────────┬──────────┐  │    │
│ │ │ Giá (đ) *│ Giá KM   │ Tồn kho  │          │  │    │
│ │ │ [2000000]│ [      ] │ [0     ] │ [+ Thêm] │  │    │
│ │ └──────────┴──────────┴──────────┴──────────┘  │    │
│ │                                                  │    │
│ │ SKU tự động: NIKE-MERCURIAL-41-XANHDƯƠNG-FG     │    │
│ └──────────────────────────────────────────────────┘   │
│                                                          │
│ Các biến thể đã thêm:                                   │
│ ┌────────────────────────────────────────────┬────┐    │
│ │ Kích cỡ: 41 | Màu sắc: Xanh dương | Loại đế: FG │ 🗑 │    │
│ │ SKU: NIKE-MERCURIAL-41-XANHDƯƠNG-FG | Giá: 2000000đ  │    │
│ └────────────────────────────────────────────┴────┘    │
└─────────────────────────────────────────────────────────┘

[Hủy]  [Tạo Sản Phẩm]
```

---

## How Attributes Are Determined

### Category → Product Type → Attributes Flow

```
User selects                Auto-selected           Attributes shown
Category                    Product Type            (from database)
─────────────────────────────────────────────────────────────────────
Giày đá bóng (4)      →    Giày Đá Bóng (1)   →    Kích cỡ* ✓
                                                     Màu sắc
                                                     Loại đế* ✓

Áo đấu (8)            →    Áo Đấu (2)         →    (No attributes)

Quần đấu (9)          →    Quần Short (3)     →    (No attributes)
```

### Mapping Logic (in code):

```javascript
const categoryToProductTypeMap = {
  4: 1, // Giày đá bóng → Giày Đá Bóng
  5: 1, // Giày chạy bộ → Giày Đá Bóng
  6: 1, // Giày bóng rổ → Giày Đá Bóng
  7: 1, // Giày tennis → Giày Đá Bóng
  15: 1, // Giày FG → Giày Đá Bóng
  16: 1, // Giày TF → Giày Đá Bóng
  17: 1, // Giày IC → Giày Đá Bóng
  8: 2, // Áo đấu → Áo Đấu
  9: 3, // Quần đấu → Quần Short
  13: 4, // Tất đá bóng → Tất Bóng Đá
  11: 5, // Găng tay thủ môn → Phụ Kiện
  12: 5, // Bóng đá → Phụ Kiện
  14: 5, // Túi đựng giày → Phụ Kiện
};
```

---

## Database Structure (ERD Compliance)

### Tables Involved:

```
CATEGORIES
├── id: 4
├── name: "Giày đá bóng"
└── slug: "giay-da-bong"

        ↓ (mapped in frontend code)

PRODUCT_TYPES
├── id: 1
├── name: "Giày Đá Bóng"
└── code: "soccer_cleat"

        ↓ (junction table)

PRODUCT_TYPE_ATTRIBUTES
├── product_type_id: 1
├── attribute_id: 1 (Kích cỡ)
├── is_required: true
└── display_order: 1

        ↓ (defines)

ATTRIBUTES                    ATTRIBUTE_VALUES
├── id: 1                    ├── id: 1, value: "39"
├── name: "Kích cỡ"          ├── id: 2, value: "40"
├── code: "size"             ├── id: 3, value: "41"
└── type: "select"           ├── id: 4, value: "42"
                             ├── id: 5, value: "43"
                             └── id: 6, value: "44"
```

### When Product is Created:

```
PRODUCTS
├── id: [auto]
├── name: "Nike Mercurial"
├── product_type_id: 1 ← Auto-set from category
├── category_id: 4     ← User selected
├── brand_id: 2        ← User selected
└── default_image_url: "/upload/..."

        ↓

PRODUCT_VARIANTS
├── id: [auto]
├── product_id: [from above]
├── sku: "NIKE-MERCURIAL-41-XANHDƯƠNG-FG" ← Auto-generated
├── price: 2000000
└── physical_stock: 0

        ↓ (junction table)

VARIANT_ATTRIBUTE_VALUES
├── variant_id: [from above]
├── attribute_id: 1, attribute_value_id: 3  (Kích cỡ: 41)
├── attribute_id: 2, attribute_value_id: 7  (Loại đế: FG)
└── attribute_id: 3, attribute_value_id: 10 (Màu sắc: Xanh dương)
```

---

## Key Features

✅ **Removed SKU input field** - Now auto-generated from product name + attributes  
✅ **Removed Product Type dropdown** - Auto-selected based on category  
✅ **Dynamic attributes** - Show/hide based on selected category  
✅ **Required validation** - Kích cỡ and Loại đế are required for soccer cleats  
✅ **ERD compliance** - Follows exact database structure  
✅ **Multiple variants** - Can add as many as needed before submission

---

## Testing the Form

1. **Go to**: http://localhost:5173/admin/products/new
2. **Fill in**:
   - Name: "Nike Mercurial Vapor 15"
   - Brand: "Nike"
   - Category: **"Giày đá bóng"** ← This triggers attributes!
3. **Observe**: 3 dropdowns appear (Kích cỡ*, Màu sắc, Loại đế*)
4. **Select attributes**: Size=41, Color=Xanh dương, Sole=FG
5. **Enter price**: 2000000
6. **Click "Thêm"**: Variant added to list
7. **Upload image**
8. **Click "Tạo Sản Phẩm"**: Product + variant + attributes saved to DB

Expected Result:

- Product created in `Products` table
- Variant created in `ProductVariants` table with auto-generated SKU
- 3 records in `VariantAttributeValues` table (size, color, sole type)
