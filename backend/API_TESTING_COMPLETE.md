# 🧪 API Testing Scripts - Complete Documentation

## 📦 Files được tạo

1. **`test-all-endpoints.sh`** - Script test chính (33 endpoints)
2. **`setup-test-db.sh`** - Reset và seed database
3. **`run-full-test.sh`** - Chạy toàn bộ workflow tự động
4. **`TEST_GUIDE.md`** - Hướng dẫn chi tiết

## 🚀 Quick Start

### Option 1: Chạy test đơn giản (với data hiện tại)

```bash
./test-all-endpoints.sh
```

### Option 2: Reset DB và test đầy đủ (Recommended)

```bash
# Đảm bảo server đang chạy
npm start

# Terminal mới - Chạy full workflow
./run-full-test.sh
```

### Option 3: Manual step-by-step

```bash
# 1. Reset database
./setup-test-db.sh

# 2. Start server
npm start

# 3. Run tests (terminal mới)
./test-all-endpoints.sh
```

## 📊 Test Coverage

### ✅ 33 API Endpoints được test

#### 1. Authentication (4 tests)

- POST `/api/v1/auth/register` - Đăng ký tài khoản mới
- POST `/api/v1/auth/login` - Đăng nhập
- POST `/api/v1/auth/refresh-token` - Làm mới token
- POST `/api/v1/auth/logout` - Đăng xuất

#### 2. User Management (3 tests)

- GET `/api/v1/users/profile` - Lấy thông tin profile
- PUT `/api/v1/users/profile` - Cập nhật profile
- POST `/api/v1/users/change-password` - Đổi mật khẩu

#### 3. Addresses (4 tests)

- POST `/api/v1/addresses` - Tạo địa chỉ mới
- GET `/api/v1/addresses` - Lấy tất cả địa chỉ
- GET `/api/v1/addresses/:id` - Lấy địa chỉ theo ID
- PUT `/api/v1/addresses/:id` - Cập nhật địa chỉ

#### 4. Brands (4 tests)

- GET `/api/v1/brands` - Lấy danh sách brands
- GET `/api/v1/brands/:id` - Lấy brand theo ID
- POST `/api/v1/brands` - Tạo brand mới (Admin)
- GET `/api/v1/brands?search=keyword` - Tìm kiếm brands

#### 5. Categories (2 tests)

- GET `/api/v1/categories` - Lấy danh sách categories
- GET `/api/v1/categories/:id` - Lấy category theo ID

#### 6. Products (5 tests)

- GET `/api/v1/products` - Lấy danh sách sản phẩm
- GET `/api/v1/products/:id` - Lấy sản phẩm theo ID
- GET `/api/v1/products?category=id` - Lọc theo category
- GET `/api/v1/products?brand=id` - Lọc theo brand
- GET `/api/v1/products?sort=price&order=asc` - Sắp xếp theo giá

#### 7. Cart (3 tests)

- GET `/api/v1/cart` - Lấy giỏ hàng
- POST `/api/v1/cart/items` - Thêm sản phẩm vào giỏ
- PUT `/api/v1/cart/items/:id` - Cập nhật số lượng

#### 8. Orders (3 tests)

- GET `/api/v1/orders` - Lấy danh sách đơn hàng
- POST `/api/v1/orders` - Tạo đơn hàng từ giỏ
- GET `/api/v1/orders/:id` - Lấy chi tiết đơn hàng

#### 9. Admin (3 tests)

- GET `/api/v1/admin/dashboard` - Thống kê dashboard
- GET `/api/v1/admin/users` - Quản lý users
- GET `/api/v1/admin/orders` - Quản lý orders

#### 10. Security (2 tests)

- Logout và blacklist tokens
- Verify token không dùng được sau logout

## 🎯 Test Features

### ✨ Tính năng nổi bật

1. **Tự động hóa hoàn toàn** - Không cần input thủ công
2. **Token Management** - Tự động lưu và sử dụng tokens
3. **Data Persistence** - Tái sử dụng dữ liệu giữa các tests
4. **Colored Output** - Dễ đọc, dễ theo dõi
5. **Error Details** - Hiển thị response khi fail
6. **Summary Report** - Thống kê tổng quan cuối cùng

### 🔍 Test Flow

```
1. Check server connection
2. Register new customer → Save ACCESS_TOKEN
3. Login existing customer → Update ACCESS_TOKEN
4. Refresh token → Verify rotation works
5. Login admin → Save ADMIN_ACCESS_TOKEN
6. Test authenticated endpoints với tokens
7. Create resources (address, brand, product...)
8. Test resource operations (get, update, delete)
9. Test cart operations
10. Test order operations
11. Test admin operations
12. Logout → Verify token blacklisted
```

## 📈 Expected Results

### ✅ Khi database có đầy đủ data (sau chạy seeders)

```
========================================
TEST SUMMARY
========================================
Total Tests:  33
Passed:       30-33
Failed:       0-3
Duration:     5-8s

✓ ALL TESTS PASSED! (hoặc minor failures)
```

### ⚠️ Khi database trống

```
Total Tests:  33
Passed:       15-20
Failed:       13-18

✗ SOME TESTS FAILED
```

**Common failures khi không có data:**

- ❌ Login with non-existent users
- ❌ Get product/category by ID (no data)
- ❌ Create order (cart empty)
- ❌ Admin operations (no admin user)

## 🛠️ Troubleshooting

### Problem: "Server is not responding"

```bash
# Solution 1: Check if server running
curl http://localhost:3000

# Solution 2: Start server
npm start

# Solution 3: Check port
lsof -i :3000
```

### Problem: "jq: command not found"

```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq

# Verify
jq --version
```

### Problem: Many tests fail with "not found"

```bash
# Reset and seed database
./setup-test-db.sh

# Or manual
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Problem: "Permission denied"

```bash
# Grant execute permissions
chmod +x test-all-endpoints.sh
chmod +x setup-test-db.sh
chmod +x run-full-test.sh
```

### Problem: "Invalid password" on login

```bash
# Check password in seeders
cat seeders/20251027091358-demo-users.js

# Default credentials:
# Customer: customer@example.com / password123
# Admin: admin@example.com / admin123
```

## 📝 Customization

### Thay đổi Base URL

```bash
# Edit test-all-endpoints.sh
BASE_URL="http://your-domain.com/api/v1"
```

### Thêm test mới

```bash
# Template for new test
test_your_new_endpoint() {
    print_section "YOUR SECTION - Description"
    ((TOTAL_TESTS++))

    RESPONSE=$(curl -s -X GET "$BASE_URL/your-endpoint" \
        -H "Authorization: Bearer $ACCESS_TOKEN")

    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Your success message"
    else
        print_fail "Your failure message" "$RESPONSE"
    fi
}

# Add to main() function
test_your_new_endpoint
```

### Skip specific tests

```bash
# Comment out in main() function
# test_create_order  # Skip this test
```

## 🎓 Best Practices

### 1. Test trước khi commit

```bash
# Run tests
./test-all-endpoints.sh

# Commit nếu pass
git add .
git commit -m "feat: new feature"
```

### 2. Test sau mỗi merge

```bash
git pull origin main
./run-full-test.sh  # Full reset + test
```

### 3. CI/CD Integration

```yaml
# .github/workflows/test.yml
- name: Run API Tests
  run: |
    npm start &
    sleep 5
    ./test-all-endpoints.sh
```

### 4. Regular cleanup

```bash
# Weekly database reset
./setup-test-db.sh
```

## 📊 Test Data

### Created during test run

- 1 Customer account (dynamic email)
- 1 Address
- Multiple tokens (access + refresh)
- May create: brands, products, cart items, orders

### Required from seeders

- Admin account: `admin@example.com`
- Customer account: `customer@example.com`
- Brands: Nike, Adidas, Puma
- Categories: Giày đá bóng, etc.
- Products with variants
- Stock data

## 🔐 Security Testing

Script tests các security features:

1. ✅ **Token Rotation** - Refresh token tạo token mới, blacklist token cũ
2. ✅ **Token Blacklist** - Logout blacklist cả access + refresh token
3. ✅ **Authentication Required** - Endpoints yêu cầu token
4. ✅ **Authorization** - Admin endpoints chỉ admin access được
5. ✅ **Password Hashing** - Password không lộ trong response
6. ✅ **Input Validation** - Test với invalid data

## 📚 Related Files

- `server.js` - Main server file
- `docs/project/script.json` - Insomnia collection (import để test manual)
- `TEST_GUIDE.md` - Chi tiết hướng dẫn sử dụng
- `test-results.log` - Log file từ lần chạy gần nhất

## 🎯 Next Steps

1. ✅ Chạy `./run-full-test.sh` để kiểm tra
2. 📝 Đọc `TEST_GUIDE.md` để hiểu rõ hơn
3. 🔍 Import `script.json` vào Insomnia/Postman để test manual
4. 🐛 Fix các endpoints fail (nếu có)
5. ✨ Thêm tests cho endpoints mới (nếu cần)

## ⚡ Performance Tips

- Script chạy **sequential** (không parallel) để dễ debug
- Thời gian: ~5-10 giây cho 33 tests
- Có thể skip tests không cần thiết để chạy nhanh hơn
- Database reset mất ~10-15 giây

## 🎉 Conclusion

Bạn giờ có:

- ✅ 33 automated API tests
- ✅ Database setup script
- ✅ Full workflow automation
- ✅ Comprehensive documentation
- ✅ Easy-to-use commands

**Happy Testing! 🚀**

---

**Created:** November 2025  
**Last Updated:** November 2025  
**Version:** 1.0.0
