# 📦 E-Commerce Backend - Hướng Dẫn Hoàn Thiện

## ✅ Đã Hoàn Thành

### 1. Models (15 models)

- ✅ User (đã cập nhật)
- ✅ Address
- ✅ Brand
- ✅ Category
- ✅ Attribute
- ✅ AttributeValue
- ✅ ProductType
- ✅ ProductTypeAttribute
- ✅ Product
- ✅ ProductVariant
- ✅ VariantAttributeValue
- ✅ Cart
- ✅ CartItem
- ✅ StockReservation
- ✅ Order
- ✅ OrderItem

### 2. Migrations (14 migrations)

- ✅ 20251101000858-create-addresses
- ✅ 20251101001000-create-brands
- ✅ 20251101001100-create-categories
- ✅ 20251101001200-create-attributes
- ✅ 20251101001300-create-attribute-values
- ✅ 20251101001400-create-product-types
- ✅ 20251101001500-create-product-type-attributes
- ✅ 20251101001600-create-products
- ✅ 20251101001700-create-product-variants
- ✅ 20251101001800-create-variant-attribute-values
- ✅ 20251101001900-create-carts
- ✅ 20251101002000-create-cart-items
- ✅ 20251101002100-create-stock-reservations
- ✅ 20251101002200-create-orders
- ✅ 20251101002300-create-order-items

### 3. Utilities (3 helpers)

- ✅ utils/orderHelpers.js - Tạo order number, tính toán giá
- ✅ utils/stockHelpers.js - Quản lý tồn kho và reservations
- ✅ utils/responseHelpers.js - Format API responses

### 4. Controllers

- ✅ address.controller.js - CRUD addresses

## 🔧 Các Bước Tiếp Theo

### Bước 1: Setup Database

```bash
# Sử dụng script SQL có sẵn để tạo database và seed data
mysql -u root -p < docs/project/script.sql
```

Hoặc chạy migrations:

```bash
# Chạy migrations
npx sequelize-cli db:migrate

# Rollback nếu cần
npx sequelize-cli db:migrate:undo:all
```

### Bước 2: Cấu hình Environment

Tạo file `.env`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
DB_DIALECT=mysql

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=your-refresh-token-secret-change-this-too
JWT_REFRESH_EXPIRE=7d

# Server
PORT=3000
NODE_ENV=development

# Upload (đã có sẵn trong middlewares/uploads)
UPLOAD_PATH=./public/upload
MAX_FILE_SIZE=10485760
```

### Bước 3: Tạo Controllers Còn Thiếu

Dựa theo API Design trong `docs/project/API_DESIGN.md`, bạn cần tạo thêm:

#### 3.1 Product Controller (`controllers/product.controller.js`)

```javascript
// GET /products - List products với filter, pagination
// GET /products/:id - Get product detail với variants
// GET /products/slug/:slug - Get by slug
// POST /products (Admin) - Create product
// PUT /products/:id (Admin) - Update product
// DELETE /products/:id (Admin) - Delete product
```

#### 3.2 Cart Controller (`controllers/cart.controller.js`)

```javascript
// GET /cart - Get cart
// POST /cart/items - Add to cart (cần dùng stockHelpers)
// PUT /cart/items/:id - Update quantity
// DELETE /cart/items/:id - Remove item
// DELETE /cart - Clear cart
```

#### 3.3 Order Controller (`controllers/order.controller.js`)

```javascript
// GET /orders - List user orders
// GET /orders/:id - Get order detail
// POST /orders - Checkout (dùng orderHelpers, stockHelpers)
// POST /orders/:id/cancel - Cancel order
// POST /orders/:id/reorder - Reorder
```

#### 3.4 Brand Controller (`controllers/brand.controller.js`)

```javascript
// GET /brands - List brands
// GET /brands/:id - Get brand detail
// POST /brands (Admin) - Create
// PUT /brands/:id (Admin) - Update
// DELETE /brands/:id (Admin) - Delete
```

#### 3.5 Category Controller (`controllers/category.controller.js`)

```javascript
// GET /categories - List with tree structure
// GET /categories/:slug - Get by slug
// POST /categories (Admin) - Create
// PUT /categories/:id (Admin) - Update
// DELETE /categories/:id (Admin) - Delete
```

#### 3.6 Admin Controller (`controllers/admin.controller.js`)

```javascript
// GET /admin/dashboard - Statistics
// GET /admin/orders - All orders
// PATCH /admin/orders/:id/status - Update order status
// GET /admin/users - List users
// PATCH /admin/users/:id/role - Update user role
// GET /admin/stock-reservations - List reservations
// POST /admin/stock-reservations/release-expired - Release expired
```

### Bước 4: Tạo Routers

Tạo router files trong `routers/`:

#### 4.1 Address Router (`routers/address.router.js`)

```javascript
const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");
const { authenticate } = require("../middlewares/auth/authenticate");

router.use(authenticate); // All routes require authentication

router.get("/", addressController.getAllAddresses);
router.get("/:id", addressController.getAddressById);
router.post("/", addressController.createAddress);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);
router.patch("/:id/set-default", addressController.setDefaultAddress);

module.exports = router;
```

Tương tự tạo cho:

- `routers/product.router.js`
- `routers/cart.router.js`
- `routers/order.router.js`
- `routers/brand.router.js`
- `routers/category.router.js`
- `routers/admin.router.js`

### Bước 5: Cập nhật `routers/index.js`

```javascript
const userRouters = require("./user.routers");
const stationRouters = require("./station.routers");
const uploadRouters = require("./upload.router");
const addressRouters = require("./address.router");
const brandRouters = require("./brand.router");
const categoryRouters = require("./category.router");
const productRouters = require("./product.router");
const cartRouters = require("./cart.router");
const orderRouters = require("./order.router");
const adminRouters = require("./admin.router");

function router(app) {
  app.use("/api/v1/users", userRouters);
  app.use("/api/v1/stations", stationRouters);
  app.use("/api/v1/uploads", uploadRouters);
  app.use("/api/v1/addresses", addressRouters);
  app.use("/api/v1/brands", brandRouters);
  app.use("/api/v1/categories", categoryRouters);
  app.use("/api/v1/products", productRouters);
  app.use("/api/v1/cart", cartRouters);
  app.use("/api/v1/orders", orderRouters);
  app.use("/api/v1/admin", adminRouters);
}

module.exports = router;
```

### Bước 6: Cập nhật User Controller

File `controllers/user.controller.js` cần cập nhật để phù hợp với model mới:

- Thay `type` thành `role`
- Thay `password` thành `hashed_password`
- Thêm `first_name`, `last_name`
- Thay `numberPhone` thành `phone`
- Thay `avatar` thành `avatar_url`

### Bước 7: Test API

Dùng Postman hoặc cURL để test:

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "first_name": "Test",
    "last_name": "User",
    "phone": "0912345678"
  }'

# Get addresses
curl -X GET http://localhost:3000/api/v1/addresses \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get products
curl -X GET "http://localhost:3000/api/v1/products?page=1&limit=20"
```

## 📚 Tài Liệu Tham Khảo

- **API Design**: `docs/project/API_DESIGN.md`
- **Data Schema**: `docs/project/DATA_SCHEMA_GUIDE.md`
- **SQL Script**: `docs/project/script.sql`

## 🚀 Template Controllers

### Product Controller Template

```javascript
const {
  Product,
  ProductVariant,
  Brand,
  Category,
  ProductType,
} = require("../models");
const { Op } = require("sequelize");
const {
  successResponse,
  errorResponse,
  getPaginationMeta,
} = require("../utils/responseHelpers");

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      brand,
      status,
      search,
      sort = "created_at",
      order = "desc",
    } = req.query;

    const where = {};
    if (category) where.category_id = category;
    if (brand) where.brand_id = brand;
    if (status) where.status = status;
    if (search) where.name = { [Op.like]: `%${search}%` };

    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        { model: Brand, as: "brand" },
        { model: Category, as: "category" },
        { model: ProductType, as: "productType" },
        { model: ProductVariant, as: "variants" },
      ],
      limit: parseInt(limit),
      offset,
      order: [[sort, order.toUpperCase()]],
    });

    const meta = getPaginationMeta(page, limit, count);
    return successResponse(res, "Products retrieved successfully", rows, meta);
  } catch (error) {
    console.error("Error getting products:", error);
    return errorResponse(res, "Error retrieving products", null, 500);
  }
};

// Thêm các methods khác: getProductById, createProduct, updateProduct, deleteProduct
```

### Cart Controller Template

```javascript
const { Cart, CartItem, ProductVariant, Product } = require("../models");
const {
  createReservation,
  updateReservation,
  releaseReservation,
  checkStockAvailability,
} = require("../utils/stockHelpers");
const { successResponse, errorResponse } = require("../utils/responseHelpers");
const db = require("../models");

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { customer_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            {
              model: ProductVariant,
              as: "variant",
              include: [{ model: Product, as: "product" }],
            },
          ],
        },
      ],
    });

    if (!cart) {
      cart = await Cart.create({ customer_id: req.user.id });
    }

    // Calculate summary
    const summary = {
      item_count: cart.items.length,
      total_quantity: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.items.reduce((sum, item) => {
        const price = item.variant.promotion_price || item.variant.price;
        return sum + price * item.quantity;
      }, 0),
    };

    return successResponse(res, "Cart retrieved successfully", {
      ...cart.toJSON(),
      summary,
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    return errorResponse(res, "Error retrieving cart", null, 500);
  }
};

exports.addToCart = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { variant_id, quantity = 1 } = req.body;

    // Check stock
    await checkStockAvailability(variant_id, quantity);

    // Get or create cart
    let cart = await Cart.findOne({ where: { customer_id: req.user.id } });
    if (!cart) {
      cart = await Cart.create({ customer_id: req.user.id }, { transaction });
    }

    // Check if item already in cart
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, variant_id },
      transaction,
    });

    if (cartItem) {
      // Update quantity
      const newQuantity = cartItem.quantity + quantity;
      await checkStockAvailability(variant_id, newQuantity);
      await cartItem.update({ quantity: newQuantity }, { transaction });

      // Update reservation
      const reservation = await StockReservation.findOne({
        where: { cart_id: cart.id, variant_id, status: "active" },
        transaction,
      });
      if (reservation) {
        await updateReservation(reservation, newQuantity, transaction);
      }
    } else {
      // Create new cart item
      cartItem = await CartItem.create(
        {
          cart_id: cart.id,
          variant_id,
          quantity,
        },
        { transaction }
      );

      // Create reservation
      await createReservation(variant_id, cart.id, quantity, transaction);
    }

    await transaction.commit();
    return successResponse(
      res,
      "Item added to cart successfully",
      cartItem,
      null,
      201
    );
  } catch (error) {
    await transaction.rollback();
    console.error("Error adding to cart:", error);
    return errorResponse(
      res,
      error.message || "Error adding to cart",
      null,
      500
    );
  }
};

// Thêm: updateCartItem, removeCartItem, clearCart
```

## ⚠️ Lưu Ý Quan Trọng

1. **Authentication**: Tất cả routes cần authentication phải có middleware `authenticate`
2. **Authorization**: Routes admin cần thêm `authorize(['admin'])`
3. **Validation**: Nên thêm validation middleware cho request body
4. **Error Handling**: Luôn wrap async code trong try-catch
5. **Transaction**: Dùng transaction cho các operation phức tạp (cart, order)
6. **Stock Management**: Luôn check stock trước khi cho phép thao tác

## 🎯 Kết Luận

Backend đã có foundation hoàn chỉnh với:

- ✅ Database schema đầy đủ (models + migrations)
- ✅ Utilities helpers
- ✅ Sample controller (Address)

Bạn chỉ cần:

1. Chạy migrations hoặc SQL script
2. Tạo các controllers còn lại theo template
3. Tạo routers và kết nối
4. Test API

Tham khảo `docs/project/API_DESIGN.md` để biết chi tiết về request/response format!
