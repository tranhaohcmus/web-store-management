# E-Commerce API Testing Guide

## 📋 Tổng quan

Script test tự động cho toàn bộ API endpoints của hệ thống E-Commerce.

## 🚀 Cách sử dụng

### 1. Chuẩn bị

Đảm bảo đã cài đặt `jq` (JSON processor):

```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq

# Kiểm tra
jq --version
```

### 2. Cấp quyền thực thi

```bash
chmod +x test-all-endpoints.sh
```

### 3. Chạy server

```bash
npm start
```

### 4. Chạy test (terminal mới)

```bash
./test-all-endpoints.sh
```

## 📊 Các test được thực hiện

### 1. Authentication (4 tests)

- ✅ Register Customer
- ✅ Login Customer
- ✅ Refresh Token
- ✅ Admin Login

### 2. User Management (3 tests)

- ✅ Get Profile
- ✅ Update Profile
- ✅ Change Password

### 3. Addresses (4 tests)

- ✅ Create Address
- ✅ Get All Addresses
- ✅ Get Address by ID
- ✅ Update Address

### 4. Brands (4 tests)

- ✅ Get All Brands
- ✅ Get Brand by ID
- ✅ Create Brand (Admin)
- ✅ Search Brands

### 5. Categories (2 tests)

- ✅ Get All Categories
- ✅ Get Category by ID

### 6. Products (5 tests)

- ✅ Get All Products
- ✅ Get Product by ID
- ✅ Filter by Category
- ✅ Filter by Brand
- ✅ Sort by Price

### 7. Cart (3 tests)

- ✅ Get Cart
- ✅ Add to Cart
- ✅ Update Cart Item

### 8. Orders (3 tests)

- ✅ Get All Orders
- ✅ Create Order from Cart
- ✅ Get Order by ID

### 9. Admin (3 tests)

- ✅ Get Dashboard Statistics
- ✅ Get All Users
- ✅ Get All Orders

### 10. Logout (2 tests)

- ✅ Logout
- ✅ Verify Token Blacklisted

**Tổng cộng: 33 tests**

## 📈 Kết quả mẫu

```
========================================
TEST SUMMARY
========================================
Total Tests:  33
Passed:       33
Failed:       0
Duration:     8s

✓ ALL TESTS PASSED!
```

## 🔍 Chi tiết output

Mỗi test sẽ hiển thị:

- 🔵 [TEST X] - Tên test
- ✅ ✓ PASS - Khi thành công
- ❌ ✗ FAIL - Khi thất bại (kèm response)

## 🛠️ Troubleshooting

### Lỗi: "Server is not responding"

```bash
# Kiểm tra server đã chạy chưa
curl http://localhost:3000

# Khởi động server
npm start
```

### Lỗi: "jq: command not found"

```bash
# Cài đặt jq
sudo apt-get install jq  # Ubuntu/Debian
brew install jq          # macOS
```

### Lỗi: "Permission denied"

```bash
# Cấp quyền thực thi
chmod +x test-all-endpoints.sh
```

### Test fail do thiếu data

```bash
# Chạy seeders để tạo dữ liệu mẫu
npx sequelize-cli db:seed:all
```

## 📝 Customize

Bạn có thể chỉnh sửa script để:

### Thay đổi Base URL

```bash
BASE_URL="http://your-domain.com/api/v1"
```

### Thêm test mới

```bash
test_your_endpoint() {
    print_section "YOUR SECTION - Description"
    ((TOTAL_TESTS++))

    RESPONSE=$(curl -s -X GET "$BASE_URL/your-endpoint")

    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Your test description"
    else
        print_fail "Your test" "$RESPONSE"
    fi
}
```

### Chạy một nhóm test cụ thể

Uncomment các test bạn muốn chạy trong hàm `main()`.

## 🎯 Best Practices

1. **Chạy test sau mỗi thay đổi code**
2. **Kiểm tra response kỹ trước khi deploy**
3. **Giữ database clean** (có thể reset trước khi test):
   ```bash
   npx sequelize-cli db:migrate:undo:all
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

## 📚 Tài liệu API

Xem chi tiết API tại: `docs/project/script.json` (Insomnia Collection)

## 🐛 Báo lỗi

Nếu phát hiện test fail hoặc bug, hãy:

1. Chụp screenshot output
2. Ghi lại steps để reproduce
3. Kiểm tra server logs
4. Báo cáo team

## 🔐 Security Notes

- Script này dùng cho **development/testing** only
- Không commit access tokens vào git
- Đổi JWT secrets trước khi production
- Test credentials:
  - Customer: `customer@example.com` / `password123`
  - Admin: `admin@example.com` / `admin123`

## ⚡ Performance

- Script thực hiện tuần tự (không parallel)
- Thời gian chạy: ~5-10 giây
- Tạo dữ liệu mẫu trong quá trình test
- Có thể chạy lặp lại nhiều lần

## 🎉 Happy Testing!
