# 🌱 Seed Data Documentation

## Tổng quan

Backend đã được trang bị đầy đủ seed data cho việc phát triển và testing. Dữ liệu mẫu bao gồm:

- **5 Users**: 1 admin + 4 customers
- **3 Brands**: Nike, Adidas, Puma
- **4 Categories**: Danh mục sản phẩm thể thao
- **4 Attributes**: Size, Sole Type, Color, Shirt Size
- **19 Attribute Values**: Các giá trị cho từng thuộc tính
- **2 Product Types**: Soccer Cleats, Jersey
- **3 Products**: Sản phẩm từ Nike, Adidas, Puma
- **6 Product Variants**: Các biến thể với size, màu sắc khác nhau
- **5 Addresses**: Địa chỉ giao hàng của customers
- **4 Carts**: Giỏ hàng của customers (có items)
- **5 Orders**: Đơn hàng ở các trạng thái khác nhau

## 📋 Chi tiết Seed Data

### 👥 Users (Tài khoản test)

| Email                 | Password | Role     | Tên          |
| --------------------- | -------- | -------- | ------------ |
| admin@example.com     | 123456   | admin    | Admin System |
| customer1@example.com | 123456   | customer | Nguyễn Văn A |
| customer2@example.com | 123456   | customer | Trần Thị B   |
| customer3@example.com | 123456   | customer | Lê Văn C     |
| customer4@example.com | 123456   | customer | Phạm Thị D   |

### 🏷️ Brands

1. **Nike** - Just Do It
2. **Adidas** - Impossible is Nothing
3. **Puma** - Forever Faster

### 👟 Products & Variants

#### 1. Nike Mercurial Superfly 9 Elite

- Giá: 5,500,000 ₫ (khuyến mãi: 5,200,000 ₫)
- Variants:
  - Size 41, FG, Xanh dương (50 sản phẩm)
  - Size 42, FG, Xanh dương (45 sản phẩm)

#### 2. Adidas Predator Edge

- Giá: 4,800,000 ₫ (khuyến mãi: 4,500,000 ₫)
- Variants:
  - Size 41, FG, Đỏ (60 sản phẩm)
  - Size 42, FG, Đỏ (55 sản phẩm)

#### 3. Puma Future Z 1.3

- Giá: 4,200,000 ₫ (khuyến mãi: 3,900,000 ₫)
- Variants:
  - Size 41, FG, Vàng (40 sản phẩm)
  - Size 42, FG, Vàng (35 sản phẩm)

### 📦 Orders (Đơn hàng mẫu)

| Order #      | Customer     | Status     | Total        | Items              |
| ------------ | ------------ | ---------- | ------------ | ------------------ |
| ORD-2024-001 | Nguyễn Văn A | completed  | 5,230,000 ₫  | Nike Mercurial x1  |
| ORD-2024-002 | Trần Thị B   | delivered  | 9,030,000 ₫  | Adidas Predator x2 |
| ORD-2024-003 | Lê Văn C     | shipping   | 3,930,000 ₫  | Puma Future x1     |
| ORD-2024-004 | Phạm Thị D   | processing | 10,430,000 ₫ | Nike + Adidas      |
| ORD-2024-005 | Nguyễn Văn A | pending    | 7,830,000 ₫  | Puma x2            |

### 🛒 Carts (Giỏ hàng hiện tại)

- **Customer 1**: Nike Mercurial x1, Adidas Predator x2
- **Customer 2**: Puma Future x1
- **Customer 3**: Empty
- **Customer 4**: Nike Mercurial Size 42 x1

## 🚀 Cách sử dụng

### Option 1: Seed tất cả (khuyến nghị)

```bash
cd backend
./seed-all.sh
```

Script này sẽ:

- Chạy tất cả seeders theo đúng thứ tự
- Hiển thị progress bar
- Báo lỗi nếu có seeder fail

### Option 2: Reset database và seed lại

⚠️ **CẢNH BÁO**: Lệnh này sẽ xóa toàn bộ dữ liệu!

```bash
cd backend
./reset-db.sh
```

Script này sẽ:

1. Undo all migrations (xóa tất cả tables)
2. Run migrations lại (tạo lại tables)
3. Seed all data

### Option 3: Seed từng file riêng lẻ

```bash
cd backend

# Seed users
npx sequelize-cli db:seed --seed 20251027091358-demo-users.js

# Seed brands
npx sequelize-cli db:seed --seed 20251101043002-demo-brands.js

# Seed products
npx sequelize-cli db:seed --seed 20251101043255-demo-product-types-and-products.js

# Seed orders
npx sequelize-cli db:seed --seed 20251103006000-demo-orders.js
```

### Option 4: Undo seeds

```bash
cd backend

# Undo all seeds
npx sequelize-cli db:seed:undo:all

# Undo seed mới nhất
npx sequelize-cli db:seed:undo

# Undo seed cụ thể
npx sequelize-cli db:seed:undo --seed 20251103006000-demo-orders.js
```

## 📝 Thứ tự Seeders (QUAN TRỌNG)

Seeders phải chạy theo thứ tự này để đảm bảo foreign keys:

1. ✅ Users & Stations
2. ✅ Brands & Categories
3. ✅ Attributes & Attribute Values
4. ✅ Product Types & Products
5. ✅ Product Type Attributes (linking)
6. ✅ Variant Attribute Values (linking)
7. ✅ Addresses
8. ✅ Carts & Cart Items
9. ✅ Orders & Order Items

## 🧪 Testing với Seed Data

### Login Tests

```bash
# Admin login
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "123456"
}

# Customer login
POST /api/auth/login
{
  "email": "customer1@example.com",
  "password": "123456"
}
```

### Product Tests

```bash
# Get all products
GET /api/products

# Get product by ID
GET /api/products/1

# Get product variants
GET /api/products/1/variants
```

### Order Tests

```bash
# Get customer orders (requires auth token)
GET /api/orders
Authorization: Bearer <token>

# Get order detail
GET /api/orders/1
Authorization: Bearer <token>
```

## 🔧 Customization

### Thêm products mới

Edit file: `seeders/20251101043255-demo-product-types-and-products.js`

```javascript
{
  id: 4,
  name: "New Product Name",
  description: "Product description",
  product_type_id: 1,
  brand_id: 1,
  category_id: 4,
  default_image_url: "https://...",
  status: "published",
  created_at: new Date(),
  updated_at: new Date(),
}
```

### Thêm orders mới

Edit file: `seeders/20251103006000-demo-orders.js`

```javascript
{
  id: 6,
  order_number: "ORD-2024-006",
  user_id: 2,
  status: "pending",
  payment_method: "cod",
  // ... rest of order data
}
```

## ⚠️ Lưu ý

1. **Foreign Keys**: Luôn seed theo đúng thứ tự để tránh lỗi foreign key constraint
2. **IDs**: Các IDs trong seeders được hard-code để đảm bảo relationships
3. **Dates**: Sử dụng `new Date()` để tạo timestamps
4. **Passwords**: Tất cả passwords đều là `123456` (đã hash với bcrypt)
5. **JSON Fields**: `variant_snapshot` trong OrderItems là JSON string

## 🐛 Troubleshooting

### Lỗi: "SequelizeForeignKeyConstraintError"

**Nguyên nhân**: Chạy seeders không đúng thứ tự

**Giải pháp**:

```bash
npx sequelize-cli db:seed:undo:all
./seed-all.sh
```

### Lỗi: "Duplicate entry"

**Nguyên nhân**: Seeder đã được chạy trước đó

**Giải pháp**:

```bash
npx sequelize-cli db:seed:undo:all
./seed-all.sh
```

### Lỗi: "Table doesn't exist"

**Nguyên nhân**: Chưa chạy migrations

**Giải pháp**:

```bash
npx sequelize-cli db:migrate
./seed-all.sh
```

## 📚 Files Created

```
backend/seeders/
├── 20251027091358-demo-users.js               ✅ Existing
├── 20251027091418-demo-stations.js            ✅ Existing
├── 20251101043002-demo-brands.js              ✅ Existing
├── 20251101043126-demo-categories.js          ✅ Existing
├── 20251101043255-demo-product-types-and-products.js ✅ Existing
├── 20251103001000-demo-attributes.js          🆕 NEW
├── 20251103002000-demo-product-type-attributes.js 🆕 NEW
├── 20251103003000-demo-variant-attributes.js  🆕 NEW
├── 20251103004000-demo-addresses.js           🆕 NEW
├── 20251103005000-demo-carts.js               🆕 NEW
└── 20251103006000-demo-orders.js              🆕 NEW

backend/
├── seed-all.sh    🆕 Script to seed all data
└── reset-db.sh    🆕 Script to reset & reseed database
```

## ✅ Quick Start

```bash
# 1. Make sure migrations are done
cd backend
npx sequelize-cli db:migrate

# 2. Run all seeders
./seed-all.sh

# 3. Start server
npm start

# 4. Test login
# Admin: admin@example.com / 123456
# Customer: customer1@example.com / 123456
```

## 🎯 Next Steps

Sau khi seed data xong, bạn có thể:

1. ✅ Test tất cả API endpoints với data có sẵn
2. ✅ Login với các tài khoản test
3. ✅ Xem orders, products, carts đã có sẵn
4. ✅ Test frontend với backend đã có data
5. ✅ Phát triển thêm features với dữ liệu thực tế

---

**Tác giả**: GitHub Copilot  
**Ngày tạo**: 3 Nov 2024  
**Version**: 1.0
