# ✅ HƯỚNG DẪN NHANH - Kết Nối Frontend & Backend

## 🚨 VẤN ĐỀ ĐÃ FIX

### ✅ CORS Error - ĐÃ GIẢI QUYẾT

Backend đã được cấu hình CORS để cho phép frontend gọi API từ `http://localhost:5173`

## 🔥 CÁCH CHẠY (Quick Start)

### 1️⃣ Terminal 1 - Backend

```bash
cd backend
npm start
```

**Bạn sẽ thấy:**

```
Server is running on http://localhost:3000
Connection has been established successfully.
```

### 2️⃣ Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

**Bạn sẽ thấy:**

```
VITE v5.0.8  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 3️⃣ Mở Browser

```
http://localhost:5173
```

## 🧪 TEST KẾT NỐI

### Test 1: Xem trang Home

- Mở http://localhost:5173
- Bạn sẽ thấy trang chủ với hero section
- **KHÔNG CÓI CORS ERROR** trong Console (F12)

### Test 2: Đăng ký tài khoản

1. Click "Đăng ký" ở header
2. Điền form:
   - Email: test@example.com
   - Password: 123456
   - First Name: Test
   - Last Name: User
   - Phone: 0912345678
3. Click "Đăng ký"
4. Nếu thành công → Redirect về trang chủ và đã login

### Test 3: Xem sản phẩm

1. Click "Sản phẩm" trong menu
2. Bạn sẽ thấy danh sách sản phẩm (nếu đã seed data)
3. Filter, search, sort hoạt động

## 🔍 KIỂM TRA CONSOLE

Mở Developer Tools (F12) → Tab Console

**✅ ĐÚNG - Không có lỗi:**

```
(Không có lỗi CORS)
```

**❌ SAI - Có lỗi CORS:**

```
Access to XMLHttpRequest at 'http://localhost:3000/api/v1/...'
has been blocked by CORS policy
```

**Nếu vẫn thấy lỗi CORS:**

1. Restart backend (Ctrl+C rồi `npm start` lại)
2. Hard reload frontend (Ctrl+Shift+R hoặc Cmd+Shift+R)
3. Clear cache & cookies

## 📋 CHECKLIST

- [x] Backend đang chạy tại http://localhost:3000
- [x] CORS đã được cấu hình trong `backend/server.js`
- [x] Frontend đang chạy tại http://localhost:5173
- [x] File `.env` trong frontend có `VITE_API_URL=http://localhost:3000/api/v1`
- [x] MySQL đang chạy
- [x] Database `ecommerce_db` đã được tạo

## 🎯 CÁC API ĐANG HOẠT ĐỘNG

### Test trực tiếp trong browser:

```
http://localhost:3000/
```

Response:

```json
{
  "message": "Project Ticket API is running!",
  "status": "OK",
  "timestamp": "..."
}
```

### Test với Postman/Thunder Client:

- GET http://localhost:3000/api/v1/products
- GET http://localhost:3000/api/v1/brands
- GET http://localhost:3000/api/v1/categories
- POST http://localhost:3000/api/v1/auth/register

## 💡 LƯU Ý QUAN TRỌNG

### 1. Backend PHẢI chạy trước

Frontend cần backend để load dữ liệu (products, categories, etc.)

### 2. Ports

- Backend: **3000**
- Frontend: **5173**
- Không được đổi ports này (hoặc phải update .env và CORS config)

### 3. Reload sau khi thay đổi

- Thay đổi `.env` → Phải restart server
- Thay đổi code backend → Phải restart (hoặc dùng nodemon)
- Thay đổi code frontend → Vite auto reload

## 🐛 Troubleshooting

### Lỗi: "Failed to fetch"

**Nguyên nhân:** Backend chưa chạy
**Giải pháp:** Chạy `cd backend && npm start`

### Lỗi: "CORS policy"

**Nguyên nhân:** Backend chạy nhưng chưa restart sau khi thêm CORS
**Giải pháp:**

1. Stop backend (Ctrl+C)
2. Chạy lại: `npm start`
3. Hard reload frontend (Ctrl+Shift+R)

### Lỗi: "Connection refused"

**Nguyên nhân:** Backend không chạy hoặc chạy sai port
**Giải pháp:** Kiểm tra backend logs, đảm bảo chạy port 3000

### Trang trắng, không có gì

**Nguyên nhân:** Frontend lỗi build hoặc lỗi runtime
**Giải pháp:**

1. Mở Console (F12) xem lỗi
2. Kiểm tra terminal frontend có lỗi không
3. `rm -rf node_modules && npm install` rồi `npm run dev` lại

## 📞 Test Flow Hoàn Chỉnh

### 1. Đăng ký & Đăng nhập ✅

- Register → Auto login → Redirect home
- Logout → Login lại

### 2. Xem sản phẩm ✅

- Browse products
- Filter by category, brand
- Sort by price, name

### 3. Giỏ hàng ✅

- Add to cart
- Update quantity
- Remove items

### 4. Đặt hàng ✅

- Checkout
- Add shipping address
- Place order
- View order history

---

**Tất cả đã sẵn sàng! Chỉ cần chạy backend + frontend là xong! 🎉**
