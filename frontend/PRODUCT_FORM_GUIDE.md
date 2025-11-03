# Product Creation Form - User Guide

## Overview

The product creation form has been updated to match the ERD diagram structure. The form now:

- **Removes Product Type dropdown** from UI (auto-selected based on Category)
- **Shows dynamic attributes** based on selected category
- **Auto-generates SKU** from product name + attributes

## How It Works

### 1. Category → Product Type Mapping

When you select a category, the system automatically determines which Product Type to use:

| Category                  | Auto-Selected Product Type  | Attributes Shown            |
| ------------------------- | --------------------------- | --------------------------- |
| Giày đá bóng (ID: 4)      | Giày Đá Bóng (soccer_cleat) | Kích cỡ*, Màu sắc, Loại đế* |
| Giày chạy bộ (ID: 5)      | Giày Đá Bóng                | Kích cỡ*, Màu sắc, Loại đế* |
| Giày bóng rổ (ID: 6)      | Giày Đá Bóng                | Kích cỡ*, Màu sắc, Loại đế* |
| Giày tennis (ID: 7)       | Giày Đá Bóng                | Kích cỡ*, Màu sắc, Loại đế* |
| Giày FG (ID: 15)          | Giày Đá Bóng                | Kích cỡ*, Màu sắc, Loại đế* |
| Giày TF (ID: 16)          | Giày Đá Bóng                | Kích cỡ*, Màu sắc, Loại đế* |
| Giày IC (ID: 17)          | Giày Đá Bóng                | Kích cỡ*, Màu sắc, Loại đế* |
| Áo đấu (ID: 8)            | Áo Đấu (jersey)             | (No attributes yet)         |
| Quần đấu (ID: 9)          | Quần Short                  | (No attributes yet)         |
| Tất đá bóng (ID: 13)      | Tất Bóng Đá                 | (No attributes yet)         |
| Găng tay thủ môn (ID: 11) | Phụ Kiện                    | (No attributes yet)         |
| Bóng đá (ID: 12)          | Phụ Kiện                    | (No attributes yet)         |
| Túi đựng giày (ID: 14)    | Phụ Kiện                    | (No attributes yet)         |

_Fields with `_` are required

### 2. Example: Creating Soccer Cleats

**Steps:**

1. Fill in product name: "Nike Mercurial Vapor 15"
2. Select Brand: "Nike"
3. Select Category: **"Giày đá bóng"**
4. Upload product image

**What happens:**

- System auto-selects Product Type = "Giày Đá Bóng" (ID: 1)
- Variant form appears with 3 attribute dropdowns:
  - **Kích cỡ\*** (Size): 39, 40, 41, 42, 43, 44
  - **Màu sắc** (Color): Đen, Trắng, Đỏ, Xanh dương, Vàng
  - **Loại đế\*** (Sole Type): FG, TF, IC

**Adding variants:**

1. Select: Kích cỡ = 41, Màu sắc = Xanh dương, Loại đế = FG
2. Enter: Price = 2,000,000
3. Click "Thêm" button
4. SKU auto-generated: `NIKE-MERCURIAL-VAPOR-15-41-XANHDƯƠNG-FG`

### 3. Data Flow (ERD Compliance)

```
USER INPUT                    DATABASE TABLES
─────────────────────────────────────────────────────────
Category: "Giày đá bóng"  →   PRODUCTS
                                - product_type_id = 1 (auto)
                                - category_id = 4 (user selected)

Variant Attributes:       →   PRODUCT_VARIANTS
  Size: 41                      - sku (auto-generated)
  Color: Xanh dương             - price, stock
  Sole Type: FG
                          →   VARIANT_ATTRIBUTE_VALUES
                                - variant_id, attribute_id=1, value_id=3 (Size: 41)
                                - variant_id, attribute_id=2, value_id=7 (Sole: FG)
                                - variant_id, attribute_id=3, value_id=10 (Color: Xanh)
```

### 4. Form Fields

**Product Information:**

- Tên sản phẩm\* (Name)
- Mô tả (Description)
- Thương hiệu\* (Brand)
- Danh mục\* (Category)
- Trạng thái (Status: Draft/Published/Archived)
- Hình ảnh\* (Image)

**Product Variants:** (shown when category is selected)

- Dynamic attribute dropdowns (based on category)
- Giá (Price)\*
- Giá khuyến mãi (Promotion Price)
- Tồn kho (Stock)
- SKU: Auto-generated display

### 5. Validation Rules

**Product Level:**

- Name is required
- Brand is required
- Category is required
- Image is required
- At least 1 variant must be added

**Variant Level:**

- Required attributes must be selected (marked with \*)
- Price must be greater than 0
- Stock defaults to 0 if not entered

### 6. SKU Generation

Format: `{PRODUCT_NAME}-{ATTR1}-{ATTR2}-{ATTR3}`

Examples:

- `NIKE-MERCURIAL-VAPOR-15-41-XANHDƯƠNG-FG`
- `ADIDAS-PREDATOR-42-ĐEN-TF`
- `PUMA-FUTURE-40-TRẮNG-IC`

## Technical Implementation

### Files Modified:

- `/frontend/src/pages/Admin/CreateProduct.jsx`

### Key Changes:

1. Removed `product_type_id` from productData state
2. Added `categoryToProductTypeMap` object
3. Added `getProductTypeByCategory()` function
4. Changed condition from `productData.product_type_id` to `productData.category_id`
5. Auto-append product_type_id in form submission
6. Changed grid from `md:grid-cols-3` to `md:grid-cols-2` (removed Product Type column)

### Backend Compatibility:

- Backend still receives `product_type_id` in FormData
- Database structure unchanged (full ERD compliance)
- PRODUCT_TYPES → PRODUCT_TYPE_ATTRIBUTES → ATTRIBUTES → ATTRIBUTE_VALUES
- VARIANT_ATTRIBUTE_VALUES junction table stores attribute selections

## Testing Checklist

- [ ] Navigate to http://localhost:5173/admin/products/new
- [ ] Select category "Giày đá bóng"
- [ ] Verify 3 attribute dropdowns appear (Size*, Color, Sole Type*)
- [ ] Verify required fields show red asterisk
- [ ] Select attributes: Size=41, Color=Xanh dương, Sole=FG
- [ ] Enter price: 2000000
- [ ] Click "Thêm" button
- [ ] Verify variant appears in list with correct labels
- [ ] Verify SKU format is correct
- [ ] Fill in product name, brand, image
- [ ] Click "Tạo Sản Phẩm"
- [ ] Verify product created successfully
- [ ] Check database:
  - [ ] Products table has new record
  - [ ] ProductVariants table has variant with auto-generated SKU
  - [ ] VariantAttributeValues has 3 records (size, color, sole type)

## Future Enhancements

To add attributes for other product types:

1. Create attributes in database (e.g., "Shirt Size" for jerseys)
2. Add records to `ProductTypeAttributes` table
3. No code changes needed - form will automatically show new attributes!

Example SQL:

```sql
-- Add Shirt Size attribute to Jersey type
INSERT INTO ProductTypeAttributes (product_type_id, attribute_id, is_required, display_order)
VALUES (2, 4, true, 1);  -- product_type_id=2 (Áo Đấu), attribute_id=4 (Shirt Size)
```
