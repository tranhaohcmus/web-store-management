# Admin Order Detail Fix & Data Enhancement

## Vấn Đề Đã Fix

### 1. Admin Order Detail không load được order

**Nguyên nhân:**

- AdminOrderDetail component đang dùng `fetchOrderById` từ `orderSlice` (customer endpoint)
- Customer endpoint `/api/v1/orders/:id` chỉ trả về orders của user hiện tại
- Admin cần endpoint riêng để xem tất cả orders

**Giải pháp:**

- Thêm `getOrderById` method vào `adminAPI` service
- Thêm `fetchAdminOrderById` async thunk vào `adminSlice`
- Thêm `getOrderById` controller method vào `admin.controller.js`
- Thêm route `GET /api/v1/admin/orders/:id` vào `admin.router.js`
- Update `AdminOrderDetail.jsx` để dùng admin endpoint

### 2. Thiếu categories và brands cho bộ lọc

**Giải pháp:**

- Mở rộng categories từ 5 lên 17 categories (3 level hierarchy)
- Thêm 3 brands mới (New Balance, Under Armour, Mizuno)

## File Đã Sửa

### Backend

#### 1. `controllers/admin.controller.js`

**Thêm mới:**

```javascript
/**
 * @route   GET /api/v1/admin/orders/:id
 * @desc    Get order by ID (Admin version - can see any order)
 * @access  Private/Admin
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "email", "first_name", "last_name", "phone"],
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              include: [
                {
                  model: Product,
                  as: "product",
                  attributes: ["id", "name", "default_image_url"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!order) {
      return errorResponse(res, "Order not found", null, 404);
    }

    return successResponse(res, "Order retrieved successfully", order);
  } catch (error) {
    console.error("Error getting order:", error);
    return errorResponse(res, "Error retrieving order", null, 500);
  }
};
```

#### 2. `routers/admin.router.js`

**Thêm route:**

```javascript
/**
 * @route   GET /api/v1/admin/orders/:id
 * @desc    Get order by ID (admin view)
 * @access  Private/Admin
 */
router.get("/orders/:id", adminController.getOrderById);
```

#### 3. `seeders/20251101043126-demo-categories.js`

**Trước:** 5 categories
**Sau:** 17 categories (3-level hierarchy)

**Categories mới:**

```
Level 1 (Main):
1. Giày thể thao
2. Quần áo thể thao
3. Phụ kiện

Level 2 (Subcategories):
Giày thể thao:
  4. Giày đá bóng
  5. Giày chạy bộ
  6. Giày bóng rổ
  7. Giày tennis

Quần áo thể thao:
  8. Áo đấu
  9. Quần đấu
  10. Áo khoác

Phụ kiện:
  11. Găng tay thủ môn
  12. Bóng đá
  13. Tất đá bóng
  14. Túi đựng giày

Level 3 (Sub-subcategories):
Giày đá bóng:
  15. Giày FG (Firm Ground)
  16. Giày TF (Turf)
  17. Giày IC (Indoor Court)
```

#### 4. `seeders/20251101043002-demo-brands.js`

**Trước:** 3 brands (Nike, Adidas, Puma)
**Sau:** 6 brands

**Brands mới:**

```javascript
{
  id: 4,
  name: "New Balance",
  logo_url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg",
  description: "Fearlessly Independent Since 1906 - American footwear brand"
},
{
  id: 5,
  name: "Under Armour",
  logo_url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
  description: "I Will - American sports equipment company"
},
{
  id: 6,
  name: "Mizuno",
  logo_url: "https://upload.wikimedia.org/wikipedia/en/8/8e/Mizuno_logo.svg",
  description: "Reach Beyond - Japanese sports equipment and sportswear company"
}
```

#### 5. `seed-all.sh`

**Cập nhật summary:**

- 6 Brands (was 3)
- 17 Categories (was 4)

### Frontend

#### 1. `services/adminService.js`

**Thêm method:**

```javascript
getOrderById: (id) => api.get(`/admin/orders/${id}`),
```

#### 2. `store/slices/adminSlice.js`

**Thêm async thunk:**

```javascript
export const fetchAdminOrderById = createAsyncThunk(
  "admin/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getOrderById(id);
      return response.data;
    } catch (error) {
      toast.error("Không tìm thấy đơn hàng");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
```

**Thêm reducers:**

```javascript
// Fetch Order By ID (Admin)
.addCase(fetchAdminOrderById.pending, (state) => {
  state.isLoading = true;
  state.error = null;
  state.currentOrder = null;
})
.addCase(fetchAdminOrderById.fulfilled, (state, action) => {
  state.isLoading = false;
  state.currentOrder = action.payload;
})
.addCase(fetchAdminOrderById.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload?.message || "Failed to fetch order";
  state.currentOrder = null;
})
```

#### 3. `pages/Admin/AdminOrderDetail.jsx`

**Thay đổi imports:**

```javascript
// Before:
import { fetchOrderById } from "../../store/slices/orderSlice";
import { updateOrderStatus } from "../../store/slices/adminSlice";

// After:
import {
  fetchAdminOrderById,
  updateOrderStatus,
} from "../../store/slices/adminSlice";
```

**Thay đổi selector:**

```javascript
// Before:
const { currentOrder: order, isLoading } = useSelector((state) => state.orders);
const { isLoading: isUpdating } = useSelector((state) => state.admin);

// After:
const { currentOrder: order, isLoading } = useSelector((state) => state.admin);
```

**Thay đổi dispatch calls:**

```javascript
// Before:
dispatch(fetchOrderById(id));
dispatch(fetchOrderById(id)); // in handleUpdateStatus

// After:
dispatch(fetchAdminOrderById(id));
dispatch(fetchAdminOrderById(id)); // in handleUpdateStatus
```

## Kết Quả

### ✅ Admin Order Detail hoạt động

- Admin có thể xem chi tiết bất kỳ order nào
- Cập nhật trạng thái order thành công
- Tự động refresh sau khi cập nhật

### ✅ Bộ lọc phong phú hơn

- 17 categories (thay vì 5)
- 6 brands (thay vì 3)
- Hỗ trợ hierarchy categories (3 levels)
- Có thể lọc theo surface type (FG, TF, IC)

### ✅ Database được tổ chức tốt hơn

- Categories có cấu trúc parent-child rõ ràng
- Brands đa dạng hơn
- Sẵn sàng cho việc mở rộng sản phẩm

## Testing

### Test Admin Order Detail

```bash
# 1. Login as admin
POST http://localhost:3000/api/v1/auth/login
{
  "email": "admin@example.com",
  "password": "123456"
}

# 2. Get order by ID
GET http://localhost:3000/api/v1/admin/orders/2
Authorization: Bearer <admin_token>

# Expected: Order #2 details with customer info and items

# 3. Update order status
PATCH http://localhost:3000/api/v1/admin/orders/2/status
Authorization: Bearer <admin_token>
{
  "status": "shipping"
}

# Expected: Success response
```

### Test Frontend

```bash
# 1. Start backend
cd backend && node server.js

# 2. Start frontend
cd frontend && npm run dev

# 3. Navigate to:
http://localhost:5173/admin/orders/2

# Expected:
# - Order #2 details displayed
# - Can update order status
# - No "Không tìm thấy đơn hàng" error
```

## Next Steps

1. ✅ Admin can view any order
2. ✅ Categories expanded for better filtering
3. ✅ Brands expanded for better variety
4. ⏳ Add product filters in frontend (by category, brand, price)
5. ⏳ Add category selector in product creation
6. ⏳ Implement advanced search with multiple filters
