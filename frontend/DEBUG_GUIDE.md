# 🔧 Debug Guide - Product Creation Form

## Vấn đề hiện tại

1. **❌ Form không hiển thị attributes** (Kích cỡ, Loại đế, Màu sắc) khi chọn "Giày đá bóng"
2. **❌ Lỗi duplicate SKU** khi tạo sản phẩm

## Đã sửa

### 1. SKU Generation - Thêm timestamp để tránh duplicate

```javascript
// TRƯỚC (lỗi duplicate)
return `${namePart}-${attrParts.join("-")}`.toUpperCase();

// SAU (có timestamp unique)
const timestamp = Date.now().toString().slice(-6);
return `${namePart}-${attrParts.join("-")}-${timestamp}`.toUpperCase();
```

**Kết quả:** SKU giờ sẽ là dạng:

- `PUMA-TEAMFINAL-23-JERSEY-167889` (unique mỗi lần)

### 2. Thêm Debug Logs để tìm lỗi attributes

Đã thêm console.log vào:

- useEffect khi load product types
- useEffect khi chọn category
- Debug info box trong UI

## 🧪 Các bước để test

### Bước 1: Mở Browser Console

1. Truy cập: http://localhost:5173/admin/products/new
2. Mở DevTools (F12)
3. Chuyển sang tab **Console**

### Bước 2: Kiểm tra logs khi trang load

Bạn sẽ thấy:

```
🚀 Fetching product types...
📡 API Response: {data: {...}}
📦 Response data: {...}
✅ Product Types loaded: 5
📋 First product type: {id: 1, name: "Giày Đá Bóng", ...}
```

**Nếu KHÔNG thấy logs này:**

- API không được gọi
- Kiểm tra network tab xem có request nào không
- Kiểm tra authentication token

### Bước 3: Chọn Category "Giày đá bóng"

Sau khi chọn, sẽ thấy logs:

```
📦 Category selected: "4"
🔍 Product Type ID: 1
📋 All Product Types: [{...}, {...}, ...]
✅ Selected Product Type: {id: 1, name: "Giày Đá Bóng", productTypeAttributes: [...]}
🏷️ Attributes: [...]
```

**Nếu attributes là undefined hoặc []:**

- Product Type không có dữ liệu attributes
- Cần check database: `ProductTypeAttributes` table

### Bước 4: Kiểm tra UI

Sau khi chọn category, trong form sẽ thấy:

**Nếu attributes KHÔNG load được:**

```
┌─────────────────────────────────────────┐
│ ⚠️ Debug: Đang tải thông tin loại sản  │
│ phẩm...                                 │
│ Category ID: 4                          │
│ Product Types loaded: 5                 │
└─────────────────────────────────────────┘
```

**Nếu attributes load THÀNH CÔNG:**

```
┌─────────────┬─────────────┬─────────────┐
│ Kích cỡ *   │ Màu sắc     │ Loại đế *   │
│ [Select ▼]  │ [Select ▼]  │ [Select ▼]  │
└─────────────┴─────────────┴─────────────┘
```

## 🐛 Các trường hợp lỗi và cách fix

### Case 1: productTypes = [] (mảng rỗng)

**Nguyên nhân:** API không trả về dữ liệu

**Kiểm tra:**

```bash
# Check database
cd backend
node -e "
const { ProductType, ProductTypeAttribute } = require('./models');
(async () => {
  const types = await ProductType.findAll({
    include: ['productTypeAttributes']
  });
  console.log('Product Types:', types.length);
  console.log('First type attributes:', types[0]?.productTypeAttributes.length);
})();
"
```

**Fix:** Chạy lại seeder

```bash
npx sequelize-cli db:seed --seed 20251103-product-type-attributes.js
```

### Case 2: selectedProductType = undefined

**Nguyên nhân:** Category ID không map đúng Product Type ID

**Kiểm tra log:** Xem giá trị `Product Type ID` có khớp với productTypes[].id không

**Fix:** Sửa mapping trong `categoryToProductTypeMap`

### Case 3: productTypeAttributes = []

**Nguyên nhân:** Database thiếu dữ liệu junction table

**Kiểm tra:**

```sql
SELECT * FROM ProductTypeAttributes WHERE product_type_id = 1;
```

**Kỳ vọng:** Phải có 3 records (size, color, sole_type)

### Case 4: Lỗi SKU duplicate

**Đã fix!** SKU giờ có timestamp unique

**Nếu vẫn lỗi:** Xóa variants cũ trong DB

```sql
DELETE FROM ProductVariants WHERE sku LIKE 'PUMA-TEAMFINAL%';
```

## 📊 Expected Database State

```sql
-- ProductTypes
SELECT * FROM ProductTypes WHERE id = 1;
-- Result: {id: 1, name: "Giày Đá Bóng", code: "soccer_cleat"}

-- ProductTypeAttributes
SELECT * FROM ProductTypeAttributes WHERE product_type_id = 1;
-- Result: 3 rows (size, color, sole_type)

-- Attributes
SELECT * FROM Attributes WHERE id IN (1,2,3);
-- Result: Kích cỡ, Loại đế, Màu sắc

-- AttributeValues
SELECT * FROM AttributeValues WHERE attribute_id IN (1,2,3);
-- Result: Size values (39-44), Colors, Sole types (FG,TF,IC)
```

## 🎯 Testing Checklist

- [ ] Refresh page http://localhost:5173/admin/products/new
- [ ] Open Console (F12)
- [ ] Check logs: "✅ Product Types loaded: 5"
- [ ] Select Brand: "New Balance"
- [ ] Select Category: "Giày đá bóng"
- [ ] Check logs: "📦 Category selected: 4"
- [ ] **VERIFY:** See 3 dropdown fields (Kích cỡ*, Màu sắc, Loại đế*)
- [ ] Select attributes: Size=41, Color=Xanh dương, Sole=FG
- [ ] Enter Price: 2000000
- [ ] Click "Thêm"
- [ ] **VERIFY:** Variant added to list
- [ ] **VERIFY:** SKU shows format like "PRODUCT-41-XANHDƯƠNG-FG-167889"
- [ ] Fill product name, upload image
- [ ] Click "Tạo Sản Phẩm"
- [ ] **VERIFY:** Success message, no duplicate SKU error

## 🔍 Network Tab Check

Trong DevTools > Network:

1. **Request:** GET `/api/v1/admin/product-types`

   - Status: 200 OK
   - Response: `{success: true, data: {productTypes: [...]}}`
   - productTypes[0] phải có `productTypeAttributes` array

2. **Request:** POST `/api/v1/admin/products`
   - Payload: FormData with `variants` JSON string
   - variants[0] phải có `attributes` object: `{1: 3, 2: 7, 3: 10}`
   - Response: Success or error

## 📝 Next Steps

Sau khi test:

1. **Nếu attributes vẫn không hiện:**

   - Copy console logs và gửi cho tôi
   - Check Network tab > product-types response

2. **Nếu SKU vẫn duplicate:**

   - Xóa variants cũ trong database
   - Hoặc thêm thêm random string vào SKU

3. **Nếu lỗi khác:**
   - Copy full error stack trace
   - Screenshot form state
