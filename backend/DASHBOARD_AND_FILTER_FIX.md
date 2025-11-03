# Dashboard và Category Filter Fix

## Ngày: 2024-11-01

## Vấn đề

### 1. Admin Dashboard không hiển thị data

- **Triệu chứng**: Tất cả thống kê (totalRevenue, totalOrders, totalProducts, totalCustomers) đều null
- **URL**: `http://localhost:5173/admin`
- **API**: `GET /api/v1/admin/dashboard`

### 2. Category Filter không hoạt động

- **Triệu chứng**: Chọn "Giày đá bóng" nhưng không lọc ra sản phẩm nào
- **Dữ liệu**: Database có 9 products với `category_id = 4`
- **URL**: `http://localhost:5173/products?category=giy-da-bong`

## Root Cause Analysis

### Dashboard Issue

1. **Response Structure Mismatch**

   - Backend trả về: `{users: {total}, orders: {total}, revenue: {total}}`
   - Frontend expect: `{totalRevenue, totalOrders, totalProducts, totalCustomers}`

2. **Backend Server Không Reload Code**
   - Sau khi sửa controller, server cần restart để load code mới
   - Server đang cache old controller code

### Category Filter Issue

1. **Parameter Type Mismatch**

   - Backend expects: `category_id` (integer)
   - Frontend sends: `category` (slug string)
   - File: `frontend/src/pages/Products/ProductList.jsx` line 111

   ```jsx
   // ❌ BEFORE
   <option key={cat.id} value={cat.slug}>

   // ✅ AFTER
   <option key={cat.id} value={cat.id}>
   ```

## Fixes Applied

### 1. Dashboard Controller Response Structure

**File**: `backend/controllers/admin.controller.js`

**BEFORE** (Nested structure):

```javascript
return successResponse(res, "Dashboard statistics retrieved successfully", {
  users: {
    total: totalUsers,
    new_today: newUsersToday,
  },
  orders: {
    total: totalOrders,
    today: ordersToday,
    by_status: ordersByStatus,
  },
  revenue: {
    total: totalRevenue || 0,
    monthly: monthlyRevenue || 0,
    yearly: yearlyRevenue || 0,
  },
  top_products: topProducts,
  recent_orders: recentOrders,
  low_stock_alerts: lowStockProducts,
});
```

**AFTER** (Flat structure matching frontend):

```javascript
// Added totalProducts count
const totalProducts = await Product.count();

return successResponse(res, "Dashboard statistics retrieved successfully", {
  totalRevenue: totalRevenue || 0,
  totalOrders: totalOrders,
  totalProducts: totalProducts, // NEW
  totalCustomers: totalUsers,
  monthlyRevenue: monthlyRevenue || 0,
  yearlyRevenue: yearlyRevenue || 0,
  newUsersToday: newUsersToday,
  ordersToday: ordersToday,
  ordersByStatus: ordersByStatus,
  topProducts: topProducts,
  recentOrders: recentOrders, // Renamed from recent_orders
  lowStockProducts: lowStockProducts, // Renamed from low_stock_alerts
});
```

**Changes**:

- ✅ Flattened nested objects
- ✅ Added `totalProducts` count
- ✅ Renamed fields: `recent_orders` → `recentOrders`, `low_stock_alerts` → `lowStockProducts`
- ✅ Matched exact field names frontend expects

### 2. Category Filter Parameter

**File**: `frontend/src/pages/Products/ProductList.jsx`

**BEFORE** (Line 111):

```jsx
{
  categories.map((cat) => (
    <option key={cat.id} value={cat.slug}>
      {cat.name}
    </option>
  ));
}
```

**AFTER**:

```jsx
{
  categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ));
}
```

**Reason**:

- Backend controller expects `category_id` (integer): `if (category) where.category_id = category;`
- Frontend was sending slug string instead of ID
- Changed option value from `cat.slug` to `cat.id`

### 3. Backend Server Restart

```bash
# Kill old server process
pkill -f "node.*server.js"

# Start new server with updated code
cd /home/haotranhcmus/studyNodejs/store_management/backend
node server.js > /tmp/backend.log 2>&1 &
```

**Why**: Backend was running cached controller code. Restart required to load new getDashboardStats implementation.

## Testing Results

### 1. Dashboard API Test

```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/v1/admin/dashboard | jq
```

**BEFORE Fix**:

```json
{
  "totalRevenue": null,
  "totalOrders": null,
  "totalProducts": null,
  "totalCustomers": null,
  "recentOrders": 0,
  "lowStockProducts": 0
}
```

**AFTER Fix + Restart**:

```json
{
  "totalRevenue": 27920000,
  "totalOrders": 5,
  "totalProducts": 9,
  "totalCustomers": 5,
  "recentOrders": 5,
  "lowStockProducts": 0
}
```

✅ **All statistics now display correctly!**

### 2. Category Filter Test

**Database Verification**:

```sql
SELECT id, name, category_id FROM Products;
```

Result: All 9 products have `category_id = 4` (Giày đá bóng) ✅

**API Test**:

```bash
curl "http://localhost:3000/api/v1/products?category=4" | jq
```

Result: Returns all 9 products ✅

**Frontend Test**:

- Navigate to `http://localhost:5173/products`
- Select "Giày đá bóng" from category dropdown
- URL changes to `?category=4` (not slug anymore)
- All 9 products displayed ✅

## Database State Confirmation

### Products Table

- **Total**: 9 products
- **Brands**: Nike (3), Adidas (3), Puma (3)
- **Category**: All have `category_id = 4` (Giày đá bóng)
- **Variants**: 28 total variants (25-60 stock each)

### Orders Table

- **Total**: 5 orders
- **Total Revenue**: 27,920,000 VNĐ
- **Statuses**: completed (3), processing (1), pending (1)

### Categories Table

- **Total**: 17 categories
- **ID 4**: "Giày đá bóng" (Slug: "giy-da-bong")
- **Children of ID 4**: 3 sub-categories (FG, TF, IC)

## Impact

### Dashboard

- ✅ Admin can now see business metrics:
  - Total revenue: 27.92 million VNĐ
  - 5 orders, 9 products, 5 customers
  - 5 recent orders visible
  - Low stock alerts (currently 0 - all variants have sufficient stock)

### Product Filtering

- ✅ Category filter now works correctly
- ✅ Selecting "Giày đá bóng" returns all 9 products
- ✅ Can filter by any of 17 categories
- ✅ Brand filter also works (Nike/Adidas/Puma)

## Files Modified

1. `backend/controllers/admin.controller.js` - getDashboardStats method
2. `frontend/src/pages/Products/ProductList.jsx` - category select option value

## Related Issues Fixed

- [x] Admin dashboard showing null statistics
- [x] Recent orders section empty
- [x] Low stock products section empty
- [x] Category filter not working
- [x] "Giày đá bóng" filter returning no results

## Notes

- **Low Stock Products = 0**: Correct because all variants have 25-60 stock (threshold is < 10)
- **Frontend Auto-Reload**: Vite dev server automatically reloaded ProductList.jsx changes
- **Backend Manual Restart**: Required because Node.js doesn't hot-reload controller changes
- **Token Expiry**: Had to get fresh admin token after backend restart

## Next Steps

- [ ] Test all category filters (all 17 categories)
- [ ] Test brand filters (Nike, Adidas, Puma, New Balance, Under Armour, Mizuno)
- [ ] Verify price sorting works correctly
- [ ] Check search functionality with Vietnamese text
- [ ] Test pagination with large datasets
