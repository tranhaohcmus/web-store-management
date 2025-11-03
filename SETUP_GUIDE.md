# 🚀 Hướng Dẫn Kết Nối Frontend & Backend

## ✅ Các Bước Setup

### Bước 1: Cài Đặt Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### Bước 2: Cấu Hình Environment Variables

#### Backend (.env)

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
HOST=localhost
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### Bước 3: Setup Database

#### Option 1: Sử dụng SQL Script (Khuyến nghị)

```bash
cd backend
mysql -u root -p < docs/project/script.sql
```

#### Option 2: Sử dụng Migrations

```bash
cd backend
npx sequelize-cli db:migrate
```

### Bước 4: Khởi Động Server

#### Terminal 1 - Backend (Port 3000)

```bash
cd backend
npm start
# hoặc
npm run dev
```

Bạn sẽ thấy:

```
Server is running on http://localhost:3000
Connection has been established successfully.
```

#### Terminal 2 - Frontend (Port 5173)

```bash
cd frontend
npm run dev
```

Bạn sẽ thấy:

```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Bước 5: Mở Trình Duyệt

Truy cập: **http://localhost:5173**

---

## 🔧 Troubleshooting

### Lỗi 1: CORS Policy Error

**Triệu chứng:**

```
Access to XMLHttpRequest at 'http://localhost:3000/api/v1/...' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

**Giải pháp:** ✅ Đã fix! Backend đã được cấu hình CORS

Kiểm tra file `backend/server.js` có đoạn này:

```javascript
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### Lỗi 2: Cannot GET /api/v1/...

**Nguyên nhân:** Backend chưa chạy hoặc route chưa được tạo

**Giải pháp:**

1. Đảm bảo backend đang chạy
2. Kiểm tra route trong `backend/routers/`
3. Test API với Postman/Thunder Client

### Lỗi 3: Database Connection Error

**Nguyên nhân:** Cấu hình database sai hoặc MySQL chưa chạy

**Giải pháp:**

```bash
# Kiểm tra MySQL đang chạy
sudo systemctl status mysql

# Khởi động MySQL nếu chưa chạy
sudo systemctl start mysql

# Tạo database
mysql -u root -p
CREATE DATABASE ecommerce_db;
```

### Lỗi 4: Port Already in Use

**Nguyên nhân:** Port 3000 hoặc 5173 đã được sử dụng

**Giải pháp:**

```bash
# Kill process trên port 3000
sudo lsof -t -i:3000 | xargs kill -9

# Kill process trên port 5173
sudo lsof -t -i:5173 | xargs kill -9
```

### Lỗi 5: Module Not Found

**Nguyên nhân:** Thiếu dependencies

**Giải pháp:**

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📋 Checklist Trước Khi Chạy

- [ ] MySQL đã cài đặt và đang chạy
- [ ] Database `ecommerce_db` đã được tạo
- [ ] File `.env` trong backend đã cấu hình đúng
- [ ] File `.env` trong frontend đã có `VITE_API_URL`
- [ ] Đã chạy `npm install` ở cả backend và frontend
- [ ] Port 3000 và 5173 không bị chiếm dụng

---

## 🧪 Test Kết Nối

### 1. Test Backend API

Mở browser hoặc Postman:

```
GET http://localhost:3000/
```

Response:

```json
{
  "message": "Project Ticket API is running!",
  "status": "OK",
  "timestamp": "2025-11-01T..."
}
```

### 2. Test Frontend

Mở browser:

```
http://localhost:5173
```

Bạn sẽ thấy trang Home với:

- Header có logo "E-Store"
- Hero section "Chào mừng đến E-Store"
- Danh mục sản phẩm
- Sản phẩm mới nhất

### 3. Test Authentication Flow

1. Click "Đăng ký" ở header
2. Điền form đăng ký
3. Submit → Nếu thành công sẽ redirect về trang chủ
4. Kiểm tra browser console không có CORS error

---

## 🗂️ Cấu Trúc Thư Mục

```
store_management/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routers/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── store/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── index.html
    ├── vite.config.js
    └── package.json
```

**LƯU Ý:** Không nên có thư mục `frontend/frontend/` lồng nhau!

---

## 🔐 API Endpoints Chính

### Authentication

- POST `/api/v1/auth/register` - Đăng ký
- POST `/api/v1/auth/login` - Đăng nhập
- POST `/api/v1/auth/logout` - Đăng xuất
- POST `/api/v1/auth/refresh-token` - Refresh token

### Products

- GET `/api/v1/products` - Danh sách sản phẩm
- GET `/api/v1/products/:id` - Chi tiết sản phẩm

### Cart

- GET `/api/v1/cart` - Lấy giỏ hàng
- POST `/api/v1/cart/items` - Thêm vào giỏ
- PUT `/api/v1/cart/items/:id` - Cập nhật
- DELETE `/api/v1/cart/items/:id` - Xóa

### Orders

- GET `/api/v1/orders` - Danh sách đơn hàng
- POST `/api/v1/orders` - Tạo đơn hàng
- GET `/api/v1/orders/:id` - Chi tiết đơn hàng

---

## 📝 Test Flow Hoàn Chỉnh

### 1. Đăng ký tài khoản

- Vào `/register`
- Điền: Email, Password, First Name, Last Name, Phone
- Submit → Redirect về home, đã login

### 2. Browse sản phẩm

- Vào `/products`
- Filter theo category, brand
- Sort theo giá, tên

### 3. Xem chi tiết & thêm vào giỏ

- Click vào 1 sản phẩm
- Chọn variant (nếu có)
- Chọn số lượng
- Click "Thêm vào giỏ hàng"

### 4. Checkout

- Vào `/cart`
- Review giỏ hàng
- Click "Tiến hành thanh toán"
- Thêm địa chỉ giao hàng
- Click "Đặt hàng"

### 5. Xem đơn hàng

- Vào `/orders`
- Click vào 1 đơn hàng để xem chi tiết

---

## 🎯 Lưu Ý Quan Trọng

### 1. Backend PHẢI chạy trước Frontend

Frontend cần gọi API từ backend ngay khi load trang (fetch products, categories, etc.)

### 2. CORS đã được cấu hình

Backend cho phép origin từ:

- `http://localhost:5173` (Frontend dev server)
- `http://localhost:3000` (Backend)

### 3. JWT Token Management

- Access token: Expire sau 1 giờ
- Refresh token: Expire sau 7 ngày
- Auto refresh khi access token hết hạn

### 4. State Persistence

- User info & tokens được lưu trong localStorage
- Tự động restore khi reload page

---

## 🚀 Production Deployment (Future)

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
# Deploy folder dist/ lên hosting
```

**Environment Variables cho Production:**

- Backend: Update `DB_HOST`, `JWT_SECRET`, etc.
- Frontend: Update `VITE_API_URL` to production URL

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra browser console (F12)
2. Kiểm tra backend terminal logs
3. Kiểm tra MySQL connection
4. Verify `.env` files
5. Clear browser cache & localStorage

Happy coding! 🎉
