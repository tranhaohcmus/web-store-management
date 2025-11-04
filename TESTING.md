# 📚 TÀI LIỆU CHI TIẾT VỀ CÁC KHÁI NIỆM CƠ BẢN TRONG KIỂM THỬ PHẦN MỀM

---

## 📋 MỤC LỤC

1. [Mục tiêu kiểm thử (Test Objectives)](#1-mục-tiêu-kiểm-thử)
2. [Ca kiểm thử (Test Case)](#2-ca-kiểm-thử)
3. [Mô-đun kiểm thử (Test Module)](#3-mô-đun-kiểm-thử)
4. [Bộ kiểm thử (Test Suite)](#4-bộ-kiểm-thử)
5. [Phạm vi kiểm thử (Test Scope)](#5-phạm-vi-kiểm-thử)
6. [Chiến lược kiểm thử (Test Strategy)](#6-chiến-lược-kiểm-thử)
7. [Kế hoạch kiểm thử (Test Plan)](#7-kế-hoạch-kiểm-thử)
8. [Bảng so sánh tổng hợp](#8-bảng-so-sánh-tổng-hợp)

---

## 1. MỤC TIÊU KIỂM THỬ (Test Objectives)

### 🎯 Định nghĩa

Mục tiêu kiểm thử xác định **mục đích và đích đến** của việc kiểm thử. Chúng mô tả những gì cần đạt được, bao gồm các tính năng hay chức năng nào đang được xác minh và kết quả mong đợi là gì.

### 📌 Đặc điểm của mục tiêu kiểm thử tốt

- **Cụ thể (Specific)**: Rõ ràng về tính năng cần kiểm thử
- **Đo lường được (Measurable)**: Có thể xác định đạt hay không đạt
- **Khả thi (Achievable)**: Có thể thực hiện với tài nguyên hiện có
- **Liên quan (Relevant)**: Phù hợp với yêu cầu dự án
- **Có thời hạn (Time-bound)**: Có thời gian hoàn thành cụ thể

---

### 📖 VÍ DỤ CHI TIẾT 1: Kiểm thử tính năng Đăng nhập

#### Mục tiêu chính:

Đảm bảo chức năng đăng nhập hoạt động chính xác trong mọi điều kiện và đáp ứng các tiêu chuẩn bảo mật, hiệu năng.

#### Mục tiêu cụ thể:

**1. Kiểm thử chức năng (Functional Testing)**

- Xác minh người dùng có thể đăng nhập thành công với thông tin hợp lệ
- Xác minh hệ thống từ chối đăng nhập với thông tin không hợp lệ
- Kiểm tra thông báo lỗi hiển thị đúng cho từng trường hợp sai

**2. Kiểm thử tương thích (Compatibility Testing)**

- Đảm bảo trang đăng nhập hoạt động trên Chrome, Firefox, Safari, Edge
- Xác minh giao diện hiển thị đúng trên desktop, tablet, mobile
- Kiểm tra hoạt động trên iOS và Android

**3. Kiểm thử bảo mật (Security Testing)**

- Xác nhận mật khẩu được mã hóa khi truyền tải
- Kiểm tra cơ chế khóa tài khoản sau 5 lần đăng nhập sai
- Xác minh không hiển thị mật khẩu dạng plain text

**4. Kiểm thử hiệu năng (Performance Testing)**

- Thời gian phản hồi đăng nhập < 2 giây
- Hệ thống xử lý được 1000 đăng nhập đồng thời

**5. Kiểm thử khả năng sử dụng (Usability Testing)**

- Tính năng "Quên mật khẩu" hoạt động đúng
- Tính năng "Ghi nhớ đăng nhập" hoạt động chính xác
- Hỗ trợ đăng nhập bằng mạng xã hội (Google, Facebook)

#### Đặc điểm của trang đăng nhập tốt:

| Đặc điểm               | Mô tả                                                  |
| ---------------------- | ------------------------------------------------------ |
| **Đơn giản & Rõ ràng** | Giao diện tối giản, dễ hiểu, không gây nhầm lẫn        |
| **Khả năng tiếp cận**  | Hỗ trợ screen reader, contrast cao cho người khiếm thị |
| **Bảo mật**            | Mã hóa mật khẩu, hỗ trợ 2FA, CAPTCHA chống bot         |
| **Khả năng mở rộng**   | Xử lý nhiều người dùng cùng lúc không bị chậm          |
| **Thương hiệu**        | Logo, màu sắc nhận diện thương hiệu rõ ràng            |
| **Tùy biến**           | Có thể thêm CAPTCHA, sinh trắc học theo nhu cầu        |

---

### 📖 VÍ DỤ CHI TIẾT 2: Kiểm thử quy trình thanh toán E-commerce

#### Mục tiêu chính:

Đảm bảo người dùng có thể hoàn tất giao dịch mua hàng một cách mượt mà, chính xác và an toàn.

#### Mục tiêu cụ thể:

**1. Chức năng giỏ hàng**

- Xác nhận người dùng có thể thêm/xóa/cập nhật số lượng sản phẩm
- Tính tổng tiền tự động và chính xác
- Giỏ hàng được lưu khi người dùng đăng xuất

**2. Áp dụng khuyến mãi**

- Xác thực mã giảm giá được áp dụng đúng (%, số tiền cố định)
- Kiểm tra điều kiện áp dụng (giá trị đơn tối thiểu, sản phẩm áp dụng)
- Không cho phép dùng nhiều mã cùng lúc nếu quy định không cho phép

**3. Tích hợp thanh toán**

- Thẻ tín dụng/ghi nợ: Visa, Mastercard, AMEX
- Ví điện tử: PayPal, Momo, ZaloPay
- Chuyển khoản ngân hàng
- Thanh toán khi nhận hàng (COD)

**4. Bảo mật giao dịch**

- Thông tin thẻ được mã hóa SSL/TLS
- Tuân thủ chuẩn PCI DSS
- Xác thực 3D Secure cho thẻ quốc tế

**5. Xử lý lỗi**

- Thông báo rõ ràng khi thanh toán thất bại
- Có nút "Thử lại" khi gặp lỗi
- Không trừ tiền khi giao dịch thất bại

#### Kịch bản kiểm thử cụ thể:

```
Kịch bản 1: Mua hàng thành công
- Thêm 3 sản phẩm vào giỏ (tổng 1.500.000đ)
- Áp dụng mã giảm 10% (còn 1.350.000đ)
- Chọn phương thức: Thẻ tín dụng
- Nhập thông tin thẻ hợp lệ
- Kết quả: Đơn hàng được tạo, email xác nhận được gửi

Kịch bản 2: Thanh toán thất bại - Thẻ không đủ số dư
- Tổng đơn: 5.000.000đ
- Thẻ chỉ có 2.000.000đ
- Kết quả: Hiển thị "Thẻ không đủ số dư", không tạo đơn hàng
```

---

### 📖 VÍ DỤ CHI TIẾT 3: Kiểm thử hiệu năng ứng dụng Mobile

#### Mục tiêu chính:

Đảm bảo ứng dụng hoạt động nhanh, mượt, tiết kiệm pin trên mọi thiết bị và điều kiện mạng.

#### Các loại kiểm thử hiệu năng:

| Loại kiểm thử           | Mục đích                             | Ví dụ cụ thể                    |
| ----------------------- | ------------------------------------ | ------------------------------- |
| **Load Testing**        | Kiểm tra hoạt động ở tải bình thường | 1000 users đồng thời truy cập   |
| **Stress Testing**      | Kiểm tra giới hạn chịu tải           | Tăng dần đến 10,000 users       |
| **Spike Testing**       | Kiểm tra tải tăng đột ngột           | Từ 100 lên 5000 users trong 10s |
| **Endurance Testing**   | Kiểm tra hoạt động liên tục          | Chạy 24h liên tục               |
| **Volume Testing**      | Kiểm tra với dữ liệu lớn             | Database 10 triệu records       |
| **Scalability Testing** | Kiểm tra khả năng mở rộng            | Thêm server khi tải tăng        |
| **Capacity Testing**    | Xác định điểm giới hạn               | Tối đa 8000 concurrent users    |

#### Mục tiêu đo lường cụ thể:

**1. Thời gian tải ứng dụng**

```
Điều kiện mạng          | Thời gian tối đa
------------------------|------------------
4G LTE (> 10 Mbps)     | ≤ 1.5 giây
3G (2-5 Mbps)          | ≤ 3 giây
2G (< 1 Mbps)          | ≤ 5 giây
```

**2. Tiêu thụ pin**

- Không được dùng > 5% pin/giờ khi ở chế độ chờ
- Không được dùng > 20% pin/giờ khi sử dụng liên tục
- Không gây nóng máy (nhiệt độ CPU < 40°C)

**3. Thời gian phản hồi**

- Tìm kiếm sản phẩm: < 1 giây
- Load danh sách: < 2 giây
- Xử lý thanh toán: < 3 giây

**4. Sử dụng bộ nhớ**

- RAM: < 150MB khi chạy
- Dung lượng cài đặt: < 50MB
- Cache tự động xóa khi > 100MB

---

### 📖 VÍ DỤ CHI TIẾT 4: Kiểm thử bảo mật dữ liệu

#### Mục tiêu chính:

Bảo vệ dữ liệu người dùng khỏi truy cập trái phép, rò rỉ, và tấn công mạng.

#### Các mục tiêu cụ thể:

**1. Mã hóa dữ liệu**

```
Loại dữ liệu           | Phương thức mã hóa
-----------------------|--------------------
Mật khẩu               | BCrypt/Argon2 (Hash)
Thông tin thẻ          | AES-256
Dữ liệu truyền tải     | TLS 1.3
Dữ liệu lưu trữ        | AES-256 at rest
```

**2. Phân quyền truy cập**

- Guest: Chỉ xem sản phẩm công khai
- User: Xem profile, đặt hàng, lịch sử mua
- Admin: Quản lý sản phẩm, đơn hàng, user
- Super Admin: Toàn bộ quyền hệ thống

**3. Bảo vệ chống tấn công**

| Loại tấn công         | Cơ chế phòng thủ      | Ví dụ kiểm thử                             |
| --------------------- | --------------------- | ------------------------------------------ |
| **Brute Force**       | Khóa sau 5 lần sai    | Nhập sai 5 lần → Khóa 15 phút              |
| **SQL Injection**     | Parameterized queries | Nhập `' OR '1'='1` → Bị chặn               |
| **XSS**               | Sanitize input        | Nhập `<script>alert(1)</script>` → Escaped |
| **CSRF**              | Token validation      | Request không token → Từ chối              |
| **Session Hijacking** | Secure cookie, HTTPS  | Cookie có flag Secure + HttpOnly           |

**4. Kiểm thử phân quyền**

```
Test Case: User thường cố truy cập trang Admin
- URL: /admin/dashboard
- Kết quả mong đợi: 403 Forbidden hoặc redirect về trang chủ
- Kết quả thực tế: [Ghi nhận khi test]

Test Case: Token hết hạn
- Đăng nhập → Đợi 2 giờ (thời gian hết hạn)
- Thực hiện action yêu cầu đăng nhập
- Kết quả mong đợi: Yêu cầu đăng nhập lại
```

---

### 📖 VÍ DỤ CHI TIẾT 5: Kiểm thử tích hợp API

#### Mục tiêu chính:

Đảm bảo API hoạt động đúng, trả về dữ liệu chính xác, xử lý lỗi tốt, và có hiệu năng cao.

#### Mục tiêu cụ thể:

**1. Kiểm thử chức năng API**

**Endpoint: GET /api/products**

```json
Request (Valid):
GET /api/products?category=electronics&page=1&limit=10

Response Expected (200 OK):
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "price": 29990000,
      "stock": 50
    }
  ],
  "pagination": {
    "page": 1,
    "total_pages": 10,
    "total_items": 95
  }
}
```

**Endpoint: POST /api/orders**

```json
Request (Valid):
POST /api/orders
Headers: Authorization: Bearer <token>
Body:
{
  "customer_id": 123,
  "items": [
    {"product_id": 1, "quantity": 2}
  ],
  "payment_method": "credit_card"
}

Response Expected (201 Created):
{
  "status": "success",
  "order_id": "ORD-2024-001",
  "total_amount": 59980000,
  "message": "Order created successfully"
}
```

**2. Kiểm thử xử lý lỗi**

| Trường hợp         | Request                        | Response Code | Message                     |
| ------------------ | ------------------------------ | ------------- | --------------------------- |
| Missing token      | GET /api/orders                | 401           | "Authentication required"   |
| Invalid product ID | GET /api/products/abc          | 400           | "Invalid product ID format" |
| Not found          | GET /api/products/99999        | 404           | "Product not found"         |
| Out of stock       | POST /api/orders (qty > stock) | 400           | "Product out of stock"      |
| Server error       | GET /api/products (DB down)    | 500           | "Internal server error"     |

**3. Kiểm thử hiệu năng API**

```
Yêu cầu hiệu năng:
- Response time: < 200ms (95th percentile)
- Throughput: ≥ 1000 requests/second
- Error rate: < 0.1%

Kịch bản Load Test:
- Ramp up: 0 → 1000 users trong 5 phút
- Duration: Duy trì 1000 users trong 30 phút
- Endpoints: Mix GET (70%) và POST (30%)

Metrics cần thu thập:
- Average response time
- Min/Max response time
- 95th percentile response time
- Requests per second
- Error rate
- CPU/Memory usage
```

**4. Kiểm thử bảo mật API**

```
Test 1: Rate Limiting
- Gửi 1000 requests trong 1 phút
- Kết quả mong đợi: Sau 100 requests → 429 Too Many Requests

Test 2: Input Validation
Request:
POST /api/users
{
  "email": "not-an-email",
  "password": "123",  // Quá ngắn
  "age": -5           // Số âm
}
Response: 400 Bad Request
{
  "errors": [
    "Email format invalid",
    "Password must be at least 8 characters",
    "Age must be positive"
  ]
}

Test 3: Authorization
- User A cố truy cập order của User B
GET /api/orders/12345 (thuộc về User B)
Headers: Authorization: Bearer <token_user_A>
Response: 403 Forbidden
```

---

## 2. CA KIỂM THỬ (Test Case)

### 🧪 Định nghĩa

Ca kiểm thử là một **tập hợp cụ thể** các điều kiện, hành động, hoặc đầu vào được sử dụng để xác minh một tính năng hoặc chức năng cụ thể. Nó bao gồm kết quả mong đợi, làm rõ liệu bài kiểm thử đó **"đạt" (pass)** hay **"trượt" (fail)**.

### 📝 Các thành phần của Test Case

| Thành phần          | Mô tả                           | Ví dụ                                       |
| ------------------- | ------------------------------- | ------------------------------------------- |
| **Test Case ID**    | Mã định danh duy nhất           | TC001, TC_LOGIN_001                         |
| **Title**           | Tiêu đề ngắn gọn                | "Đăng nhập thành công với thông tin hợp lệ" |
| **Pre-conditions**  | Điều kiện cần có trước khi test | Người dùng đã đăng ký, đang ở trang login   |
| **Test Steps**      | Các bước thực hiện              | 1. Mở trang login 2. Nhập username...       |
| **Test Data**       | Dữ liệu sử dụng                 | username: "admin", password: "Pass@123"     |
| **Expected Result** | Kết quả mong đợi                | Chuyển đến dashboard, hiện "Welcome Admin"  |
| **Actual Result**   | Kết quả thực tế                 | (Điền khi thực hiện test)                   |
| **Status**          | Trạng thái                      | Pass / Fail / Blocked / Skipped             |
| **Post-conditions** | Trạng thái sau khi test         | User đã đăng nhập, session active           |
| **Priority**        | Mức độ ưu tiên                  | High / Medium / Low                         |
| **Severity**        | Mức độ nghiêm trọng             | Critical / Major / Minor / Trivial          |

---

### 📖 VÍ DỤ CHI TIẾT 1: Test Case cho chức năng Đăng nhập

#### **TC001: Đăng nhập thành công với thông tin hợp lệ**

```
Test Case ID: TC001
Module: Authentication
Feature: Login
Priority: High
Severity: Critical

Pre-conditions:
1. Người dùng phải ở trang đăng nhập (URL: /login)
2. Người dùng đã đăng ký tài khoản với thông tin:
   - Username: testuser@example.com
   - Password: Test@12345
3. Tài khoản không bị khóa
4. Database đang hoạt động bình thường

Test Steps:
1. Mở trình duyệt Chrome phiên bản mới nhất
2. Truy cập URL: https://example.com/login
3. Nhập username vào ô "Email or Username": testuser@example.com
4. Nhập password vào ô "Password": Test@12345
5. Click vào checkbox "Remember Me" (optional)
6. Click button "Login"

Test Data:
- Username: testuser@example.com
- Password: Test@12345
- Browser: Chrome 120.x
- OS: Windows 11

Expected Result:
1. Hệ thống xác thực thông tin trong < 2 giây
2. Người dùng được chuyển hướng đến trang dashboard (URL: /dashboard)
3. Hiển thị thông báo "Welcome back, Test User!" ở góc trên phải
4. Avatar và tên người dùng hiển thị trên header
5. Session token được lưu trong cookie với flag Secure và HttpOnly
6. Nếu chọn "Remember Me": Cookie tồn tại 30 ngày
7. Nếu không chọn: Cookie tồn tại đến khi đóng browser

Actual Result:
[Để trống - Điền khi thực hiện test]

Post-conditions:
1. Người dùng đã đăng nhập thành công
2. Session đang active
3. Có thể truy cập các trang yêu cầu authentication
4. Log ghi nhận: "User testuser@example.com logged in at [timestamp]"

Status: [Pass / Fail]
Tested By: [Tên tester]
Test Date: [Ngày test]
Environment: Staging / Production
Build Version: v1.2.3

Notes:
- Test này cũng có thể chạy tự động với Selenium
- Cần kiểm tra trên nhiều browser: Firefox, Safari, Edge
```

---

#### **TC002: Đăng nhập thất bại - Mật khẩu sai**

```
Test Case ID: TC002
Module: Authentication
Feature: Login - Negative Testing
Priority: High
Severity: Major

Pre-conditions:
1. Người dùng ở trang login
2. Có tài khoản hợp lệ với password đúng là: Test@12345
3. Tài khoản chưa bị khóa

Test Steps:
1. Mở trang login
2. Nhập username đúng: testuser@example.com
3. Nhập password SAI: WrongPass@123
4. Click "Login"

Expected Result:
1. Hệ thống KHÔNG cho phép đăng nhập
2. Hiển thị thông báo lỗi: "Incorrect username or password"
   (Không được nói cụ thể sai ở đâu vì lý do bảo mật)
3. Ô password được clear
4. Ô username vẫn giữ nguyên giá trị
5. Focus tự động vào ô password
6. Không tạo session token
7. Không chuyển trang
8. Log ghi nhận: "Failed login attempt for testuser@example.com"

Actual Result:
[Để trống]

Status: [Pass / Fail]
```

---

#### **TC003: Khóa tài khoản sau nhiều lần đăng nhập sai**

```
Test Case ID: TC003
Module: Authentication - Security
Feature: Account Lockout
Priority: Critical
Severity: Critical

Pre-conditions:
1. Tài khoản testuser@example.com đang active
2. Chưa có lần đăng nhập sai nào trong 15 phút gần nhất
3. Cấu hình hệ thống: Khóa sau 5 lần sai, thời gian khóa 15 phút

Test Steps:
1-5. Nhập username đúng + password SAI, click Login (lặp lại 5 lần)
6. Lần thứ 6: Nhập username + password ĐÚNG, click Login

Expected Result sau lần thứ 5:
- Hiển thị: "Account has been locked due to multiple failed login attempts.
  Please try again in 15 minutes or reset your password."
- Disable nút "Login"
- Hiển thị countdown timer: "Try again in 14:59"
- Email cảnh báo gửi đến testuser@example.com

Expected Result lần thứ 6:
- Dù password đúng, vẫn KHÔNG cho phép đăng nhập
- Vẫn hiển thị thông báo account bị khóa
- Phải đợi hết 15 phút hoặc reset password

Post-conditions:
- Tài khoản bị khóa tạm thời
- Log ghi: "Account locked: testuser@example.com - 5 failed attempts"
- Email notification đã gửi
```

---

### 📖 VÍ DỤ CHI TIẾT 2: Test Case cho chức năng Giỏ hàng

#### **TC101: Thêm sản phẩm vào giỏ hàng**

```
Test Case ID: TC101
Module: Shopping Cart
Feature: Add to Cart
Priority: High

Pre-conditions:
1. User đã đăng nhập (hoặc guest)
2. Đang xem trang chi tiết sản phẩm: "iPhone 15 Pro 256GB"
3. Sản phẩm còn hàng (stock > 0)
4. Giỏ hàng đang trống

Test Steps:
1. Xác nhận giá hiển thị: 29,990,000đ
2. Xác nhận stock: "Còn 50 sản phẩm"
3. Chọn màu: "Titan Tự Nhiên"
4. Chọn dung lượng: "256GB" (nếu có tùy chọn)
5. Nhập số lượng: 2
6. Click button "Thêm vào giỏ hàng"

Expected Result:
1. Hiển thị thông báo toast: "Đã thêm 2 sản phẩm vào giỏ hàng" (3 giây)
2. Icon giỏ hàng ở header hiển thị badge số "2"
3. Click vào icon giỏ hàng → Hiển thị:
   - Tên sản phẩm: iPhone 15 Pro 256GB - Titan Tự Nhiên
   - Đơn giá: 29,990,000đ
   - Số lượng: 2
   - Thành tiền: 59,980,000đ
   - Tổng giỏ hàng: 59,980,000đ
4. Database: Thêm record vào bảng `cart_items`
5. Local storage lưu cart_id (cho guest)

Test Data:
- Product ID: 12345
- Product Name: iPhone 15 Pro 256GB
- Price: 29,990,000
- Quantity: 2
- Color: Titan Tự Nhiên
```

---

#### **TC102: Không cho thêm sản phẩm quá số lượng tồn kho**

```
Test Case ID: TC102
Feature: Stock Validation
Priority: High

Pre-conditions:
- Sản phẩm "MacBook Pro 14" còn 3 chiếc trong kho
- User đang xem trang sản phẩm này

Test Steps:
1. Nhập số lượng: 5 (lớn hơn stock = 3)
2. Click "Thêm vào giỏ hàng"

Expected Result:
1. KHÔNG cho phép thêm vào giỏ
2. Hiển thị thông báo lỗi: "Chỉ còn 3 sản phẩm trong kho.
   Vui lòng giảm số lượng hoặc liên hệ để đặt hàng trước."
3. Input số lượng tự động reset về: 3
4. Button "Thêm vào giỏ hàng" bị disable hoặc đổi thành "Liên hệ đặt hàng"
5. KHÔNG tạo record trong database
```

---

### 📖 8 LOẠI TEST CASES PHỔ BIẾN

#### 1. **Functional Test Cases** (Kiểm thử chức năng)

```
Ví dụ: TC_FUNC_001
Feature: Search Product
Steps:
1. Nhập từ khóa "iPhone" vào ô tìm kiếm
2. Click icon Search
Expected: Hiển thị danh sách sản phẩm có từ "iPhone" trong tên
```

#### 2. **User Interface Test Cases** (Kiểm thử giao diện)

```
Ví dụ: TC_UI_001
Feature: Responsive Design
Steps:
1. Mở trang chủ trên màn hình 1920x1080 (Desktop)
2. Resize về 768x1024 (Tablet)
3. Resize về 375x667 (Mobile)
Expected:
- Layout tự động điều chỉnh
- Không có text bị cắt
- Không có scroll ngang
- Images scale đúng tỷ lệ
```

#### 3. Performance Test Cases (Kiểm thử hiệu năng)

```
Ví dụ: TC_PERF_001
Feature: Page Load Time
Steps:
1. Clear browser cache
2. Mở trang chủ https://example.com
3. Đo thời gian từ khi request đến khi page fully loaded
Expected:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Total Load Time: < 3 giây trên 4G
Tools: Chrome DevTools, Lighthouse, GTmetrix
```

#### 4. **Integration Test Cases** (Kiểm thử tích hợp)

```
Ví dụ: TC_INT_001
Feature: Payment Gateway Integration
Steps:
1. Tạo đơn hàng với tổng: 1,000,000đ
2. Chọn thanh toán: VNPay
3. Nhập thông tin thẻ test của VNPay
4. Xác nhận thanh toán
Expected:
- Request gửi đến VNPay API thành công
- VNPay trả về transaction_id
- Hệ thống nhận callback từ VNPay
- Cập nhật order status: "Paid"
- Gửi email xác nhận đến khách hàng
- Trừ số lượng tồn kho
```

#### 5. **Usability Test Cases** (Kiểm thử khả năng sử dụng)

```
Ví dụ: TC_USA_001
Feature: First-time User Experience
Scenario: User lần đầu mua hàng
Steps:
1. Vào trang chủ lần đầu (không có account)
2. Tìm sản phẩm
3. Thêm vào giỏ
4. Tiến hành checkout
5. Đăng ký tài khoản (nếu cần)
6. Hoàn tất thanh toán
Expected:
- Mỗi bước có hướng dẫn rõ ràng
- Không cần hỏi thông tin dư thừa
- Có progress indicator (Bước 1/4)
- Có nút "Back" để quay lại
- Tổng thời gian < 5 phút
- Không có bước nào gây bối rối
Metrics:
- Task completion rate > 90%
- Average time < 5 minutes
- Error rate < 10%
```

#### 6. **Database Test Cases** (Kiểm thử cơ sở dữ liệu)

```
Ví dụ: TC_DB_001
Feature: Data Integrity - Order Creation
Steps:
1. Tạo đơn hàng mới qua UI
2. Kiểm tra database sau khi tạo
Expected:
- Bảng `orders`: Có 1 record mới
  + order_id: auto-generated UUID
  + customer_id: match với user hiện tại
  + total_amount: match với giá trên UI
  + status: "pending"
  + created_at: timestamp hiện tại

- Bảng `order_items`: Có n records (n = số sản phẩm)
  + order_id: foreign key đúng
  + product_id: match với sản phẩm đã chọn
  + quantity: match với số lượng
  + price: match với giá tại thời điểm đặt

- Bảng `products`:
  + stock giảm đi đúng số lượng đã đặt

- Bảng `transactions`: Có 1 record payment pending

SQL Queries to verify:
SELECT * FROM orders WHERE order_id = 'ORD-2024-001';
SELECT * FROM order_items WHERE order_id = 'ORD-2024-001';
SELECT stock FROM products WHERE product_id IN (12345, 67890);
```

#### 7. **Security Test Cases** (Kiểm thử bảo mật)

```
Ví dụ: TC_SEC_001
Feature: SQL Injection Prevention
Attack Type: SQL Injection
Steps:
1. Vào trang login
2. Nhập vào ô Username: admin' OR '1'='1' --
3. Nhập vào ô Password: bất kỳ
4. Click Login
Expected:
- KHÔNG cho phép đăng nhập
- Hiển thị: "Invalid credentials"
- Input được sanitize/escape
- Log ghi: "Potential SQL injection attempt detected"
- KHÔNG có error message lộ thông tin database

---

Ví dụ: TC_SEC_002
Feature: XSS Prevention
Attack Type: Cross-Site Scripting
Steps:
1. Vào trang Profile
2. Nhập vào ô "Bio": <script>alert('XSS')</script>
3. Click Save
4. Reload trang Profile
Expected:
- Script KHÔNG được thực thi
- Text hiển thị đã được escape:
  &lt;script&gt;alert('XSS')&lt;/script&gt;
- Hoặc remove hoàn toàn tag <script>
- Không có alert popup xuất hiện

---

Ví dụ: TC_SEC_003
Feature: Session Management
Steps:
1. Đăng nhập user A trên browser Chrome
2. Copy session cookie
3. Mở browser Firefox (chưa login)
4. Paste session cookie vào Firefox
5. Truy cập trang yêu cầu authentication
Expected:
- Session KHÔNG hoạt động trên browser khác (nếu có device fingerprinting)
- Hoặc yêu cầu xác thực lại
- Session có IP binding hoặc user-agent validation
```

#### 8. **User Acceptance Test Cases** (Kiểm thử chấp nhận người dùng)

```
Ví dụ: TC_UAT_001
Feature: End-to-End Purchase Flow
User Story: "Là khách hàng, tôi muốn mua 1 sản phẩm và nhận được
            xác nhận đơn hàng qua email"
Acceptance Criteria:
- Có thể tìm thấy sản phẩm dễ dàng
- Thêm vào giỏ hàng trong < 3 clicks
- Thanh toán mượt mà, không bị gián đoạn
- Nhận email xác nhận trong < 2 phút

Test Steps (Từ góc độ user):
1. "Tôi muốn mua tai nghe AirPods Pro"
2. Tôi tìm kiếm "AirPods" trên thanh search
3. Tôi click vào sản phẩm "AirPods Pro Gen 2"
4. Tôi xem thông tin: giá, mô tả, đánh giá
5. Tôi click "Mua ngay"
6. Tôi nhập địa chỉ giao hàng
7. Tôi chọn hình thức thanh toán: COD
8. Tôi click "Đặt hàng"

Expected (From User Perspective):
- Thấy màn hình "Đặt hàng thành công" với mã đơn hàng
- Nhận SMS xác nhận ngay lập tức
- Nhận email chi tiết đơn hàng trong 2 phút
- Email chứa: mã đơn, sản phẩm, giá, địa chỉ, thời gian giao hàng dự kiến
- Có thể track đơn hàng qua link trong email

Pass Criteria:
- User cảm thấy "dễ dàng" và "an tâm"
- Hoàn thành trong < 3 phút
- Không có bước nào gây khó chịu
```

---

## 3. MÔ-ĐUN KIỂM THỬ (Test Module)

### 📦 Định nghĩa

Mô-đun kiểm thử là một **nhóm logic các ca kiểm thử** liên quan đến nhau, tập trung vào việc kiểm thử một **tính năng cụ thể** hoặc một **phần của phần mềm**.

### 🎯 Mục đích

- Tổ chức test cases theo tính năng để dễ quản lý
- Cho phép test một phần hệ thống độc lập
- Dễ dàng assign cho từng tester
- Theo dõi coverage theo từng module

---

### 📖 VÍ DỤ CHI TIẾT 1: Test Module cho "User Authentication"

```
┌─────────────────────────────────────────────────────────┐
│        TEST MODULE: USER AUTHENTICATION                 │
│        Module ID: TM_AUTH_001                           │
│        Owner: QA Team - Authentication                  │
│        Priority: Critical                               │
└─────────────────────────────────────────────────────────┘

📋 Scope:
Kiểm thử toàn bộ quy trình xác thực người dùng bao gồm:
- Đăng ký tài khoản mới
- Đăng nhập
- Đăng xuất
- Quên mật khẩu
- Đổi mật khẩu
- Bảo mật tài khoản

📊 Test Cases trong Module (12 cases):

┌──────────────────────────────────────────────────────────┐
│ 1. REGISTRATION (Đăng ký) - 3 test cases                │
└──────────────────────────────────────────────────────────┘
TC_AUTH_001: Đăng ký thành công với thông tin hợp lệ
TC_AUTH_002: Đăng ký thất bại - Email đã tồn tại
TC_AUTH_003: Đăng ký thất bại - Password không đủ mạnh

┌──────────────────────────────────────────────────────────┐
│ 2. LOGIN (Đăng nhập) - 4 test cases                     │
└──────────────────────────────────────────────────────────┘
TC_AUTH_004: Đăng nhập thành công với email + password
TC_AUTH_005: Đăng nhập thất bại - Password sai
TC_AUTH_006: Đăng nhập thất bại - Email không tồn tại
TC_AUTH_007: Khóa tài khoản sau 5 lần đăng nhập sai

┌──────────────────────────────────────────────────────────┐
│ 3. LOGOUT (Đăng xuất) - 1 test case                     │
└──────────────────────────────────────────────────────────┘
TC_AUTH_008: Đăng xuất thành công và xóa session

┌──────────────────────────────────────────────────────────┐
│ 4. PASSWORD RECOVERY (Quên mật khẩu) - 2 test cases     │
└──────────────────────────────────────────────────────────┘
TC_AUTH_009: Gửi link reset password thành công
TC_AUTH_010: Reset password thành công qua link email

┌──────────────────────────────────────────────────────────┐
│ 5. CHANGE PASSWORD (Đổi mật khẩu) - 2 test cases        │
└──────────────────────────────────────────────────────────┘
TC_AUTH_011: Đổi password thành công
TC_AUTH_012: Đổi password thất bại - Old password sai

📈 Coverage Metrics:
- Total Test Cases: 12
- Automated: 10 (83%)
- Manual: 2 (17%)
- Estimated Time: 2 hours (manual execution)

🔗 Dependencies:
- Email Service (để gửi email xác thực)
- Database (bảng users, sessions)
- Redis (lưu OTP, rate limiting)

📅 Execution Schedule:
- Regression: Mỗi sprint
- Smoke: Mỗi deployment
- Full: Trước release major version
```

---

### 📖 VÍ DỤ CHI TIẾT 2: Test Module cho "Shopping Cart"

```
┌─────────────────────────────────────────────────────────┐
│        TEST MODULE: SHOPPING CART                       │
│        Module ID: TM_CART_001                           │
│        Related Features: Product, Payment, Inventory    │
└─────────────────────────────────────────────────────────┘

📋 Test Cases (15 cases):

┌──────────────────────────────────────────────────────────┐
│ 1. ADD TO CART (Thêm vào giỏ) - 5 cases                 │
└──────────────────────────────────────────────────────────┘
TC_CART_001: Thêm sản phẩm vào giỏ trống
TC_CART_002: Thêm sản phẩm đã có trong giỏ (tăng quantity)
TC_CART_003: Thêm nhiều sản phẩm khác nhau
TC_CART_004: Không cho thêm quá stock
TC_CART_005: Thêm sản phẩm có variants (size, color)

┌──────────────────────────────────────────────────────────┐
│ 2. UPDATE CART (Cập nhật giỏ) - 4 cases                 │
└──────────────────────────────────────────────────────────┘
TC_CART_006: Tăng số lượng sản phẩm
TC_CART_007: Giảm số lượng sản phẩm
TC_CART_008: Xóa sản phẩm khỏi giỏ
TC_CART_009: Clear toàn bộ giỏ hàng

┌──────────────────────────────────────────────────────────┐
│ 3. CART CALCULATION (Tính toán) - 3 cases               │
└──────────────────────────────────────────────────────────┘
TC_CART_010: Tính tổng tiền chính xác
TC_CART_011: Áp dụng mã giảm giá
TC_CART_012: Tính phí ship theo khu vực

┌──────────────────────────────────────────────────────────┐
│ 4. CART PERSISTENCE (Lưu trữ giỏ) - 3 cases             │
└──────────────────────────────────────────────────────────┘
TC_CART_013: Giỏ hàng được lưu khi user logout
TC_CART_014: Giỏ hàng sync giữa desktop và mobile
TC_CART_015: Giỏ hàng guest được merge khi login

📊 Test Data Required:
- 10 sản phẩm test với giá khác nhau
- 3 mã giảm giá: 10%, 50k, FREESHIP
- 2 user accounts: user_A, user_B
- Stock data: varied (some limited stock)

🔄 Integration Points:
- Product Service: Lấy thông tin sản phẩm, check stock
- User Service: Xác thực user, lưu cart
- Promotion Service: Validate và apply discount
- Inventory Service: Reserve stock

⏱️ Execution Time:
- Full manual run: 3 hours
- Automated suite: 15 minutes
```

---

### 📖 SO SÁNH: Test Module vs Test Scenario

| Tiêu chí                | Test Module                        | Test Scenario                   |
| ----------------------- | ---------------------------------- | ------------------------------- |
| **Định nghĩa**          | Nhóm test cases theo tính năng     | Quy trình nghiệp vụ end-to-end  |
| **Phạm vi**             | Rộng - Toàn bộ tính năng           | Hẹp - Một luồng cụ thể          |
| **Tập trung**           | Component/Feature level            | User journey level              |
| **Ví dụ**               | Module "Payment" gồm 20 test cases | Scenario "User mua hàng online" |
| **Số lượng Test Cases** | 10-50 cases                        | 5-15 steps                      |
| **Người thực hiện**     | Tester theo feature                | Tester hoặc BA                  |
| **Mục đích**            | Verify chức năng hoàn chỉnh        | Verify trải nghiệm người dùng   |

#### Ví dụ minh họa:

**Test Module: "Payment Processing"**

```
Bao gồm tất cả test cases liên quan đến thanh toán:
- TC_PAY_001: Thanh toán bằng thẻ tín dụng
- TC_PAY_002: Thanh toán bằng PayPal
- TC_PAY_003: Thanh toán bằng chuyển khoản
- TC_PAY_004: Thanh toán COD
- TC_PAY_005: Xử lý lỗi khi thẻ không đủ tiền
- TC_PAY_006: Xử lý timeout
- ... (20 test cases)
```

**Test Scenario: "Customer buys a product online"**

```
Một luồng nghiệp vụ cụ thể:
1. User tìm kiếm sản phẩm "iPhone 15"
2. User xem chi tiết sản phẩm
3. User thêm vào giỏ hàng
4. User vào trang giỏ hàng
5. User nhập địa chỉ giao hàng
6. User chọn phương thức: Thẻ tín dụng
7. User nhập thông tin thẻ
8. User xác nhận thanh toán
9. System xử lý payment qua gateway
10. User nhận xác nhận đơn hàng

→ Scenario này "đi qua" nhiều modules: Search, Product, Cart, Payment, Order
→ Nhưng chỉ test 1 luồng cụ thể, không cover hết tất cả cases
```

---

## 4. BỘ KIỂM THỬ (Test Suite)

### 🗂️ Định nghĩa

Bộ kiểm thử là một **tập hợp các test cases hoặc test modules** được nhóm lại để thực thi như một **thể thống nhất** nhằm đạt được một mục tiêu kiểm thử cụ thể.

### 🎯 Mục đích

- Tổ chức và thực thi nhiều tests cùng lúc
- Hỗ trợ automation testing
- Kiểm thử theo mục tiêu (regression, smoke, sanity)
- Tối ưu thời gian test execution

---

### 📖 VÍ DỤ CHI TIẾT 1: Regression Test Suite

```
┌──────────────────────────────────────────────────────────┐
│             REGRESSION TEST SUITE                        │
│             Suite ID: TS_REGRESSION_001                  │
│             Version: 2.5.0                               │
│             Last Updated: 2024-11-01                     │
└──────────────────────────────────────────────────────────┘

📝 Purpose:
Đảm bảo các chức năng cũ vẫn hoạt động đúng sau khi có thay đổi code

🎯 Execution Trigger:
- Sau mỗi sprint (bi-weekly)
- Trước mỗi release
- Sau khi fix critical bugs
- Khi có refactoring lớn

📦 Modules Included (8 modules):

1. ✅ Authentication Module (12 test cases)
   - Login, Logout, Registration, Password Reset

2. ✅ Product Catalog Module (18 test cases)
   - Search, Filter, Sort, Product Details

3. ✅ Shopping Cart Module (15 test cases)
   - Add, Update, Remove, Calculate

4. ✅ Checkout Module (20 test cases)
   - Shipping Info, Payment Methods, Order Confirmation

5. ✅ Order Management Module (16 test cases)
   - View Orders, Cancel, Track, Reorder

6. ✅ User Profile Module (10 test cases)
   - Edit Profile, Change Password, Addresses

7. ✅ Payment Processing Module (14 test cases)
   - Credit Card, PayPal, Bank Transfer

8. ✅ Admin Dashboard Module (22 test cases)
   - Manage Products, Orders, Users, Reports

📊 Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Test Cases:        127
Automated:               105 (83%)
Manual:                  22 (17%)
Critical:                45 (35%)
High Priority:           60 (47%)
Medium Priority:         22 (18%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱️ Execution Time:
- Automated tests: ~2 hours
- Manual tests: ~4 hours
- Total: ~6 hours

🛠️ Tools & Environment:
- Automation: Selenium WebDriver + Python
- CI/CD: Jenkins pipeline
- Environment: Staging server
- Browsers: Chrome, Firefox, Safari
- Test Data: Staging database with 10k records

📈 Pass Criteria:
- Pass rate ≥ 95%
- No critical bugs found
- No regression in core features

📄 Sample Test Execution Report:
┌────────────────────────────────────────────────────────┐
│ Execution Date: 2024-11-04                             │
│ Build: v2.5.0-rc1                                      │
│ Tester: Automated + QA Team                            │
├────────────────────────────────────────────────────────┤
│ Results:                                               │
│   ✅ Passed:  121 (95.3%)                              │
│   ❌ Failed:    4 (3.1%)                               │
│   ⏭️  Skipped:   2 (1.6%)                              │
│                                                        │
│ Failed Cases:                                          │
│   - TC_CART_007: Update quantity bug                  │
│   - TC_PAY_012: PayPal timeout                        │
│   - TC_ORDER_015: Email not sent                      │
│   - TC_ADMIN_020: Report export error                 │
│                                                        │
│ Bugs Filed: JIRA-1234, JIRA-1235, JIRA-1236           │
│ Status: ⚠️  BLOCKED - Need bug fixes before release   │
└────────────────────────────────────────────────────────┘
```

---

### 📖 VÍ DỤ CHI TIẾT 2: Smoke Test Suite

```
┌──────────────────────────────────────────────────────────┐
│             SMOKE TEST SUITE (Build Verification)       │
│             Suite ID: TS_SMOKE_001                       │
│             Type: Quick Sanity Check                     │
└──────────────────────────────────────────────────────────┘

📝 Purpose:
Kiểm tra nhanh các chức năng quan trọng nhất để đảm bảo build có thể test được

🎯 Execution Trigger:
- Sau mỗi deployment lên staging/production
- Sau mỗi build mới từ CI/CD
- Trước khi bắt đầu test chi tiết
- Multiple times per day

⚡ Critical Test Cases (15 cases):

┌──────────────────────────────────────────────────────────┐
│ CORE FUNCTIONALITY - Must Pass 100%                      │
└──────────────────────────────────────────────────────────┘

1. TC_SMOKE_001: Application loads successfully
   ├─ Homepage accessible
   ├─ No 500 errors
   └─ Load time < 5s

2. TC_SMOKE_002: User can login
   ├─ Login form displayed
   ├─ Can submit credentials
   └─ Redirected to dashboard

3. TC_SMOKE_003: Search functionality works
   ├─ Search box accessible
   ├─ Returns results
   └─ Results clickable

4. TC_SMOKE_004: Can view product details
   ├─ Product page loads
   ├─ Images displayed
   └─ Price shown correctly

5. TC_SMOKE_005: Can add product to cart
   ├─ "Add to Cart" button works
   ├─ Cart icon updates
   └─ Item appears in cart

6. TC_SMOKE_006: Can proceed to checkout
   ├─ Checkout page accessible
   ├─ Forms displayed
   └─ Can enter shipping info

7. TC_SMOKE_007: Payment page loads
   ├─ Payment methods shown
   ├─ Total amount correct
   └─ Can select payment method

8. TC_SMOKE_008: Database connection works
   ├─ Can read data
   ├─ Can write data
   └─ Response time < 100ms

9. TC_SMOKE_009: API endpoints respond
   ├─ GET /api/products → 200 OK
   ├─ POST /api/orders → 201 Created
   └─ Response time < 500ms

10. TC_SMOKE_010: Admin panel accessible
    ├─ Admin login works
    ├─ Dashboard loads
    └─ Can navigate menus

11-15. [Additional critical paths...]

⏱️ Execution Time: 15-20 minutes

✅ Pass Criteria:
- ALL tests must pass (100%)
- If ANY test fails → BUILD REJECTED
- Block further testing until fixed

📊 Typical Output:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Smoke Test Execution - Build #342
Started: 2024-11-04 09:15:23
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TC_SMOKE_001: PASS (2.3s)
✅ TC_SMOKE_002: PASS (1.8s)
✅ TC_SMOKE_003: PASS (1.2s)
✅ TC_SMOKE_004: PASS (1.5s)
✅ TC_SMOKE_005: PASS (0.9s)
✅ TC_SMOKE_006: PASS (1.1s)
✅ TC_SMOKE_007: PASS (1.3s)
✅ TC_SMOKE_008: PASS (0.5s)
✅ TC_SMOKE_009: PASS (0.7s)
✅ TC_SMOKE_010: PASS (2.1s)
✅ TC_SMOKE_011: PASS (1.0s)
✅ TC_SMOKE_012: PASS (0.8s)
✅ TC_SMOKE_013: PASS (1.4s)
✅ TC_SMOKE_014: PASS (1.6s)
✅ TC_SMOKE_015: PASS (0.9s)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Result: ✅ ALL PASSED (15/15)
Duration: 19.1 seconds
Status: 🟢 BUILD VERIFIED - Proceed with testing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 📖 VÍ DỤ CHI TIẾT 3: Sanity Test Suite

```
┌──────────────────────────────────────────────────────────┐
│             SANITY TEST SUITE                            │
│             Suite ID: TS_SANITY_001                      │
│             Purpose: Targeted Feature Verification       │
└──────────────────────────────────────────────────────────┘

📝 Context:
Bug fix build #347 - Fixed checkout payment issue (JIRA-1234)

🎯 Scope:
Chỉ test các chức năng liên quan đến payment và checkout
(Không test toàn bộ hệ thống như Regression)

📦 Test Cases (8 cases - Focused):

1. TC_SANITY_001: Payment method selection works
2. TC_SANITY_002: Credit card form validation
3. TC_SANITY_003: PayPal integration functional
4. TC_SANITY_004: Order total calculation correct
5. TC_SANITY_005: Payment confirmation received
6. TC_SANITY_006: Order created in database
7. TC_SANITY_007: Email confirmation sent
8. TC_SANITY_008: Stock updated after purchase

⏱️ Execution Time: 30 minutes

🎯 Purpose vs Other Suites:
┌──────────────────────────────────────────────────────────┐
│ Smoke Test:  "Có ứng dụng chạy được không?"              │
│ Sanity Test: "Bug đã fix được chưa? Có tạo bug mới không?" │
│ Regression:  "Toàn bộ hệ thống còn hoạt động đúng không?" │
└──────────────────────────────────────────────────────────┘
```

---

### 📖 VÍ DỤ CHI TIẾT 4: API Test Suite

```
┌──────────────────────────────────────────────────────────┐
│             API AUTOMATED TEST SUITE                     │
│             Suite ID: TS_API_001                         │
│             Tool: Postman/Newman + Jest                  │
└──────────────────────────────────────────────────────────┘

📦 API Endpoints Covered (25 endpoints):

┌──────────────────────────────────────────────────────────┐
│ 1. AUTHENTICATION APIs (5 endpoints)                     │
└──────────────────────────────────────────────────────────┘

/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh-token
POST /api/v1/auth/forgot-password

┌──────────────────────────────────────────────────────────┐
│ 2. PRODUCTS APIs (6 endpoints) │
└──────────────────────────────────────────────────────────┘
GET /api/v1/products (List all)
GET /api/v1/products/:id (Get by ID)
GET /api/v1/products/search (Search)
POST /api/v1/products (Create - Admin)
PUT /api/v1/products/:id (Update - Admin)
DELETE /api/v1/products/:id (Delete - Admin)

┌──────────────────────────────────────────────────────────┐
│ 3. CART APIs (4 endpoints) │
└──────────────────────────────────────────────────────────┘
GET /api/v1/cart (Get cart)
POST /api/v1/cart/items (Add item)
PUT /api/v1/cart/items/:id (Update quantity)
DELETE /api/v1/cart/items/:id (Remove item)

┌──────────────────────────────────────────────────────────┐
│ 4. ORDERS APIs (5 endpoints) │
└──────────────────────────────────────────────────────────┘
GET /api/v1/orders (List user orders)
GET /api/v1/orders/:id (Get order detail)
POST /api/v1/orders (Create order)
PUT /api/v1/orders/:id/cancel (Cancel order)
GET /api/v1/orders/:id/track (Track order)

┌──────────────────────────────────────────────────────────┐
│ 5. PAYMENT APIs (3 endpoints) │
└──────────────────────────────────────────────────────────┘
POST /api/v1/payments/process (Process payment)
GET /api/v1/payments/:id/status (Check status)
POST /api/v1/payments/webhook (Payment callback)

┌──────────────────────────────────────────────────────────┐
│ 6. ADMIN APIs (2 endpoints) │
└──────────────────────────────────────────────────────────┘
GET /api/v1/admin/dashboard/stats (Dashboard metrics)
GET /api/v1/admin/reports/sales (Sales report)

📊 Test Coverage per Endpoint:

Example: GET /api/v1/products
├─ TC_API_001: Valid request returns 200
├─ TC_API_002: Returns correct JSON structure
├─ TC_API_003: Pagination works (page, limit)
├─ TC_API_004: Filter by category works
├─ TC_API_005: Sort by price works
├─ TC_API_006: Invalid page number returns 400
├─ TC_API_007: Response time < 200ms
├─ TC_API_008: Returns max 100 items per page
└─ TC_API_009: Handles database connection error

📝 Sample Test Case Detail:

Test Case: TC_API_001
Endpoint: POST /api/v1/auth/login
Method: POST
Description: Valid login returns JWT token

Pre-conditions:

- User exists: testuser@example.com / Pass@123
- User account is active

Request:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST https://api.example.com/api/v1/auth/login
Content-Type: application/json

{
"email": "testuser@example.com",
"password": "Pass@123"
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Expected Response:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status Code: 200 OK
Response Time: < 500ms

Headers:
Content-Type: application/json
Set-Cookie: refreshToken=...; HttpOnly; Secure

Body:
{
"status": "success",
"data": {
"user": {
"id": "uuid-123",
"email": "testuser@example.com",
"name": "Test User",
"role": "customer"
},
"accessToken": "eyJhbGciOiJIUzI1NiIs...",
"expiresIn": 3600
}
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Assertions:
✓ Status code is 200
✓ Response time < 500ms
✓ Response has "accessToken" field
✓ Token is valid JWT format
✓ Token contains user id in payload
✓ ExpiresIn is 3600 (1 hour)
✓ RefreshToken cookie is set
✓ Cookie has HttpOnly and Secure flags

⏱️ Execution:

- Tool: Postman/Newman
- Environment: Staging
- Total Tests: 180 assertions across 25 endpoints
- Execution Time: 5 minutes
- Run Frequency: Every commit (CI/CD)

📈 Latest Run Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
API Test Suite Execution Report
Build: #348
Date: 2024-11-04 10:30:15
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Requests: 180
Passed: 178 (98.9%)
Failed: 2 (1.1%)
Avg Response Time: 145ms
Max Response Time: 487ms

Failed Tests:
❌ TC_API_089: POST /api/v1/orders - Timeout (> 500ms)
❌ TC_API_124: GET /api/v1/admin/reports - 500 Error

Status: ⚠️ NEEDS ATTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```

---

## 5. PHẠM VI KIỂM THỬ (Test Scope)

### 🗺️ Định nghĩa

Phạm vi kiểm thử xác định **ranh giới** của các hoạt động kiểm thử. Nó chỉ rõ các tính năng, chức năng và thành phần nào sẽ được **bao gồm (In Scope)** hoặc **loại trừ (Out of Scope)** khỏi quy trình kiểm thử.

### 🎯 Mục đích

- Làm rõ những gì sẽ được test và không được test
- Quản lý kỳ vọng của stakeholders
- Phân bổ tài nguyên hợp lý
- Tránh scope creep
- Căn cứ để từ chối yêu cầu test không hợp lý

---

### 📖 VÍ DỤ CHI TIẾT 1: Test Scope cho E-commerce Website

```

┌──────────────────────────────────────────────────────────┐
│ TEST SCOPE DOCUMENT │
│ Project: E-commerce Platform v2.0 │
│ Release Date: 2024-12-15 │
│ Document Version: 1.3 │
└──────────────────────────────────────────────────────────┘

📅 Testing Period: 2024-11-05 to 2024-12-10 (35 days)

┌──────────────────────────────────────────────────────────┐
│ ✅ IN SCOPE - Sẽ được kiểm thử │
└──────────────────────────────────────────────────────────┘

1️⃣ FUNCTIONAL TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A. User Management
✓ User Registration (email, phone, social login)
✓ Login/Logout functionality
✓ Password reset and change password
✓ Profile management (edit info, upload avatar)
✓ Address book management
✓ Order history viewing

B. Product Catalog
✓ Product listing with pagination
✓ Product search functionality
✓ Advanced filters (price, category, brand, rating)
✓ Product sorting (price, popularity, newest)
✓ Product detail page
✓ Product image gallery and zoom
✓ Product reviews and ratings
✓ Related products recommendation

C. Shopping Cart
✓ Add/Remove/Update products in cart
✓ Cart persistence (logged in users)
✓ Stock availability check
✓ Price calculation
✓ Apply discount codes
✓ Calculate shipping fees

D. Checkout Process
✓ Guest checkout option
✓ Shipping address selection/addition
✓ Delivery method selection
✓ Payment method selection
✓ Order review and confirmation
✓ Order placement

E. Payment Integration
✓ Credit/Debit card payment (Visa, Mastercard)
✓ E-wallet payment (Momo, ZaloPay)
✓ Bank transfer
✓ Cash on Delivery (COD)
✓ Payment confirmation flow
✓ Failed payment handling

F. Order Management
✓ Order tracking
✓ Order cancellation (within 1 hour)
✓ Order return request
✓ Refund process
✓ Email notifications

G. Admin Panel
✓ Product management (CRUD operations)
✓ Order management and status update
✓ User management
✓ Discount code creation
✓ Basic sales reports

2️⃣ NON-FUNCTIONAL TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

H. Compatibility Testing
✓ Browsers: Chrome 120+, Firefox 119+, Safari 17+, Edge 119+
✓ Desktop: Windows 10/11, macOS Sonoma+
✓ Mobile: iOS 16+, Android 12+
✓ Screen resolutions: 1920x1080, 1366x768, 1280x720

I. Responsive Design
✓ Mobile view (320px - 767px)
✓ Tablet view (768px - 1024px)
✓ Desktop view (1025px+)

J. Performance Testing (Basic)
✓ Page load time (< 3 seconds)
✓ Search response time (< 1 second)
✓ Checkout process completion time

K. Security Testing (Basic)
✓ SQL Injection prevention
✓ XSS prevention
✓ CSRF token validation
✓ Password encryption verification
✓ HTTPS enforcement
✓ Session management

L. Usability Testing
✓ Navigation flow
✓ Error messages clarity
✓ Form validation messages
✓ Button and link functionality

┌──────────────────────────────────────────────────────────┐
│ ❌ OUT OF SCOPE - Sẽ KHÔNG được kiểm thử │
└──────────────────────────────────────────────────────────┘

1️⃣ FEATURES NOT IN THIS RELEASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✗ Wishlist functionality (Planned for v2.1)
✗ Live chat support (Planned for v2.2)
✗ Product comparison feature
✗ Gift card functionality
✗ Loyalty points system
✗ Advanced recommendation engine
✗ Multi-language support (Only Vietnamese in v2.0)
✗ Multi-currency support (Only VND in v2.0)

2️⃣ TESTING TYPES NOT INCLUDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✗ Load Testing (> 1000 concurrent users)
✗ Stress Testing
✗ Penetration Testing (Will be done by external security firm)
✗ Advanced Performance Testing (APM monitoring)
✗ Disaster Recovery Testing
✗ Backup and Restore Testing
✗ Advanced Accessibility Testing (WCAG 2.1 AA compliance)

3️⃣ THIRD-PARTY COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✗ Payment Gateway Internal Logic
(Testing only integration points)
✗ Email Service Provider (SendGrid)
(Testing only email delivery, not SendGrid's infrastructure)
✗ CDN Performance (Cloudflare)
✗ SMS Gateway (Twilio)
✗ Google Analytics Tracking Code

4️⃣ PLATFORMS & ENVIRONMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✗ Internet Explorer (No longer supported)
✗ Opera Browser
✗ Old mobile OS: iOS < 16, Android < 12
✗ Tablet-specific apps (Web only)
✗ Smart TV applications
✗ Production environment testing
(Only Staging and UAT environments)

5️⃣ ADMINISTRATIVE FUNCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✗ Server configuration and setup
✗ Database administration functions
✗ Advanced reporting and analytics
✗ Marketing campaign management
✗ SEO optimization tools
✗ A/B testing framework

┌──────────────────────────────────────────────────────────┐
│ 📊 SCOPE SUMMARY │
└──────────────────────────────────────────────────────────┘

Features In Scope: 42 features
Features Out of Scope: 28 features
Test Cases (Estimated): ~850 test cases
Test Coverage Target: 85% of in-scope features

Testing Team: 6 testers
Testing Duration: 35 days
Environments: Staging, UAT

┌──────────────────────────────────────────────────────────┐
│ ⚠️ ASSUMPTIONS & DEPENDENCIES │
└──────────────────────────────────────────────────────────┘

Assumptions:

1. All APIs will be ready by 2024-11-05
2. Test environment will be stable
3. Test data will be provided by dev team
4. Payment gateways have test/sandbox mode
5. No major requirement changes during testing

Dependencies:

1. Development team completes features on time
2. DevOps team maintains test environment
3. Third-party services (payment, SMS) are available
4. Access to staging environment granted
5. Test accounts and test cards provided

┌──────────────────────────────────────────────────────────┐
│ 📝 CHANGE LOG │
└──────────────────────────────────────────────────────────┘

Version 1.3 (2024-11-04)

- Removed: Wishlist feature (moved to v2.1)
- Added: COD payment method to in-scope
- Updated: Browser versions to latest

Version 1.2 (2024-10-28)

- Added: Order return request to in-scope
- Clarified: Mobile OS version requirements

Version 1.1 (2024-10-20)

- Initial scope definition

┌──────────────────────────────────────────────────────────┐
│ ✍️ APPROVALS │
└──────────────────────────────────────────────────────────┘

Project Manager: [Signed] Date: 2024-11-04
QA Lead: [Signed] Date: 2024-11-04
Development Lead: [Signed] Date: 2024-11-04
Product Owner: [Signed] Date: 2024-11-04

```

---

### 📖 VÍ DỤ CHI TIẾT 2: Test Scope cho Mobile Banking App

```

┌──────────────────────────────────────────────────────────┐
│ TEST SCOPE DOCUMENT │
│ Project: Mobile Banking App v3.5 │
│ Sprint: Sprint 23 (Security & Performance Update) │
└──────────────────────────────────────────────────────────┘

Release Type: Incremental Update (Not Full Regression)

┌──────────────────────────────────────────────────────────┐
│ ✅ IN SCOPE - New Features & Changed Areas │
└──────────────────────────────────────────────────────────┘

1️⃣ NEW FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Biometric authentication (Face ID / Fingerprint)
✓ Quick balance check widget
✓ Dark mode support
✓ QR code payment (VietQR)

2️⃣ ENHANCED FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Login security improvements (2FA mandatory)
✓ Transaction notification enhancements
✓ Improved error handling and messages
✓ Performance optimization (app load time)

3️⃣ REGRESSION TESTING - CRITICAL PATHS ONLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Login/Logout flow
✓ Money transfer (internal & external)
✓ Bill payment
✓ Account balance inquiry
✓ Transaction history

4️⃣ SECURITY TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Biometric data encryption
✓ Session timeout (5 minutes idle)
✓ Jailbreak/Root detection
✓ Certificate pinning
✓ Secure data storage

┌──────────────────────────────────────────────────────────┐
│ ❌ OUT OF SCOPE │
└──────────────────────────────────────────────────────────┘

✗ Features not changed in this sprint:

- Loan application module
- Credit card management
- Investment portfolio
- Insurance products
- Forex exchange

✗ Full regression testing
(Only critical path regression)

✗ Older OS versions:

- iOS < 15
- Android < 11

✗ Performance testing beyond:

- App launch time
- Screen transition time
  (No stress testing / load testing)

┌──────────────────────────────────────────────────────────┐
│ 📱 DEVICE COVERAGE │
└──────────────────────────────────────────────────────────┘

In Scope:
✓ iOS: iPhone 12, 13, 14, 15 series
✓ Android: Samsung Galaxy S21/S22/S23, Pixel 6/7/8
✓ OS: iOS 15-17, Android 11-14

Out of Scope:
✗ iPad / Tablets
✗ Android phones < $200 (low-end devices)
✗ Foldable phones (Samsung Z Flip/Fold)

Testing Duration: 10 days
Test Cases: ~200 (focused scope)
Team: 3 mobile testers + 1 security specialist

```

---

## 6. CHIẾN LƯỢC KIỂM THỬ (Test Strategy)

### 🧭 Định nghĩa

Chiến lược kiểm thử là một **tài liệu cấp cao** vạch ra **phương pháp tiếp cận tổng thể** để kiểm thử. Nó xác định các phương pháp, kỹ thuật, loại kiểm thử, và công cụ sẽ được sử dụng.

### 🎯 Đặc điểm

- **High-level**: Tầm nhìn tổng thể, không đi vào chi tiết
- **Long-term**: Áp dụng cho nhiều dự án/releases
- **Methodology-focused**: Tập trung vào "HOW" - Làm thế nào
- **Standardization**: Tạo chuẩn mực chung cho team

---

### 📖 VÍ DỤ CHI TIẾT: Test Strategy Document

```

┌──────────────────────────────────────────────────────────┐
│ TEST STRATEGY DOCUMENT │
│ Organization: TechCorp Vietnam │
│ Department: Quality Assurance │
│ Effective Date: 2024-Q4 │
│ Version: 2.0 │
└──────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. TESTING OBJECTIVES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary Goals:
✓ Ensure product quality meets business requirements
✓ Identify defects early in development cycle
✓ Reduce production incidents by 80%
✓ Achieve 85%+ test automation coverage
✓ Maintain customer satisfaction score > 4.5/5

Quality Metrics:

- Defect Detection Rate: > 90%
- Defect Leakage to Production: < 5%
- Test Coverage: > 85%
- Automation Rate: > 70%
- Mean Time to Detect (MTTD): < 2 hours
- Mean Time to Resolve (MTTR): < 24 hours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2. TEST LEVELS & SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 2.1 Unit Testing (Development Team) │
└──────────────────────────────────────────────────────────┘
Owner: Developers
Coverage: All business logic functions
Tools: JUnit (Java), Jest (JavaScript), PyTest (Python)
Target: 80% code coverage
When: During development, before code commit
Automation: 100%

┌──────────────────────────────────────────────────────────┐
│ 2.2 Integration Testing (QA + Dev) │
└──────────────────────────────────────────────────────────┘
Owner: QA Team with Dev support
Coverage: API endpoints, Service integrations, Database interactions
Tools: Postman, REST Assured, SoapUI
Target: All integration points tested
When: After unit testing, before system testing
Automation: 90%

┌──────────────────────────────────────────────────────────┐
│ 2.3 System Testing (QA Team) │
└──────────────────────────────────────────────────────────┘
Owner: QA Team
Coverage: End-to-end business flows
Tools: Selenium, Appium, Cypress
Target: All critical user journeys
When: After integration testing
Automation: 70%

┌──────────────────────────────────────────────────────────┐
│ 2.4 User Acceptance Testing (Business Users) │
└──────────────────────────────────────────────────────────┘
Owner: Product Owner + Key Users
Coverage: Business scenarios, Real-world use cases
Tools: Manual testing in UAT environment
Target: Business requirements validation
When: Before production release
Automation: 0% (Manual only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3. TESTING TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 3.1 Functional Testing │
└──────────────────────────────────────────────────────────┘
Approach: Black-box testing based on requirements
Coverage: All features in scope
Automation: Use Selenium WebDriver for web, Appium for mobile
Frequency: Every sprint

Test Design Techniques:

- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing
- State Transition Testing
- Use Case Testing

┌──────────────────────────────────────────────────────────┐
│ 3.2 Non-Functional Testing │
└──────────────────────────────────────────────────────────┘

A. Performance Testing
Type: Load Testing, Stress Testing
Tools: JMeter, K6, Gatling
Criteria:

- Response time < 2 seconds (95th percentile)
- Support 10,000 concurrent users
- Error rate < 0.1%
  Frequency: Before major releases

B. Security Testing
Type: Vulnerability scanning, Penetration testing
Tools: OWASP ZAP, Burp Suite, SonarQube
Coverage: OWASP Top 10 vulnerabilities
Frequency: Quarterly + Before major releases

C. Usability Testing
Type: User experience evaluation
Method: User interviews, A/B testing
Tools: Hotjar, Google Analytics
Frequency: After major UI changes

D. Compatibility Testing
Browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)
Mobile: iOS 15+, Android 11+
Frequency: Every release

┌──────────────────────────────────────────────────────────┐
│ 3.3 Regression Testing │
└──────────────────────────────────────────────────────────┘
Approach: Automated test suite covering core functionality
Tool: Selenium Grid for parallel execution
Coverage: All critical paths + Previously defected areas
Frequency:

- Full regression: Before major release
- Partial regression: Every sprint
- Smoke regression: Every deployment

┌──────────────────────────────────────────────────────────┐
│ 3.4 Exploratory Testing │
└──────────────────────────────────────────────────────────┘
Approach: Time-boxed, charter-based exploration
Focus: New features, Complex scenarios, Edge cases
Time Allocation: 20% of testing effort
Documentation: Session-based test management
Frequency: Every sprint for new features

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4. TEST AUTOMATION STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 4.1 Automation Framework │
└──────────────────────────────────────────────────────────┘

Framework Type: Hybrid (Data-Driven + Keyword-Driven)
Architecture: Page Object Model (POM)
Language: Python (Web), Java (Mobile)

Tool Stack:
┌─────────────────┬────────────────────────────────────────┐
│ Layer │ Tools │
├─────────────────┼────────────────────────────────────────┤
│ Web UI │ Selenium WebDriver + Cypress │
│ Mobile │ Appium │
│ API │ REST Assured + Postman/Newman │
│ Unit │ JUnit, Jest, PyTest │
│ CI/CD │ Jenkins, GitHub Actions │
│ Test Management │ TestRail, Jira │
│ Reporting │ Allure, ExtentReports │
│ Performance │ JMeter, K6 │
│ Security │ OWASP ZAP │
└─────────────────┴────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 4.2 Automation Criteria │
└──────────────────────────────────────────────────────────┘

Automate:
✓ Regression test cases
✓ Data-driven tests with multiple inputs
✓ Repetitive tests executed frequently
✓ Smoke/Sanity tests
✓ API tests
✓ Performance tests

Don't Automate:
✗ One-time execution tests
✗ Tests requiring human judgment (usability)
✗ Tests on unstable features (under active development)
✗ Complex visual validation tests
✗ Tests with frequently changing UI

┌──────────────────────────────────────────────────────────┐
│ 4.3 CI/CD Integration
│
└──────────────────────────────────────────────────────────┘

Pipeline Stages:
1. Code Commit → Trigger automated build
2. Build Success → Run Unit Tests
3. Unit Tests Pass → Run API Tests
4. API Tests Pass → Deploy to Staging
5. Staging Deploy → Run Smoke Tests
6. Smoke Pass → Run Full Regression (Nightly)
7. All Pass → Ready for UAT

Execution Schedule:
┌─────────────────┬────────────────────────────────────────┐
│ Test Suite      │ Execution Trigger                      │
├─────────────────┼────────────────────────────────────────┤
│ Unit Tests      │ Every commit                           │
│ API Tests       │ Every commit                           │
│ Smoke Tests     │ Every deployment to staging            │
│ Regression      │ Nightly (2 AM)                         │
│ Performance     │ Weekly (Sunday night)                  │
│ Security Scan   │ Weekly                                 │
└─────────────────┴────────────────────────────────────────┘

Parallel Execution:
- Selenium Grid: 10 parallel browser instances
- Mobile Farm: 5 real devices + 10 emulators
- API Tests: 20 parallel threads

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. DEFECT MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 5.1 Defect Classification                                │
└──────────────────────────────────────────────────────────┘

Priority Levels:
┌──────────┬─────────────────────────────────────────────┐
│ Priority │ Description                                 │
├──────────┼─────────────────────────────────────────────┤
│ P1       │ Critical - System crash, data loss          │
│ Critical │ Resolution: Within 4 hours                  │
│          │ Example: Payment processing fails           │
├──────────┼─────────────────────────────────────────────┤
│ P2       │ High - Major feature broken                 │
│ High     │ Resolution: Within 24 hours                 │
│          │ Example: Unable to login                    │
├──────────┼─────────────────────────────────────────────┤
│ P3       │ Medium - Feature partially broken           │
│ Medium   │ Resolution: Within 1 week                   │
│          │ Example: Filter not working correctly       │
├──────────┼─────────────────────────────────────────────┤
│ P4       │ Low - Minor issues, cosmetic                │
│ Low      │ Resolution: Next sprint                     │
│          │ Example: Typo in text, alignment issue      │
└──────────┴─────────────────────────────────────────────┘

Severity Levels:
- Critical: Cannot proceed with testing, blocks multiple functions
- Major: Significant impact on functionality
- Minor: Minimal impact, workaround available
- Trivial: UI/cosmetic issues, suggestions

┌──────────────────────────────────────────────────────────┐
│ 5.2 Defect Lifecycle                                     │
└──────────────────────────────────────────────────────────┘

States:
New → Assigned → In Progress → Fixed → Retest → Verified → Closed
                                    ↓
                                  Reopened (if not fixed)

SLA (Service Level Agreement):
- P1: Acknowledge within 1 hour, Fix within 4 hours
- P2: Acknowledge within 4 hours, Fix within 24 hours
- P3: Acknowledge within 1 day, Fix within 1 week
- P4: Acknowledge within 2 days, Fix in next sprint

┌──────────────────────────────────────────────────────────┐
│ 5.3 Defect Tracking Tool                                 │
└──────────────────────────────────────────────────────────┘

Tool: Jira

Required Information:
✓ Summary (concise, descriptive)
✓ Description (steps to reproduce)
✓ Environment (browser, OS, version)
✓ Priority & Severity
✓ Attachments (screenshots, logs, videos)
✓ Expected vs Actual result
✓ Test case ID (if applicable)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. RISK MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 6.1 Risk Assessment Matrix                               │
└──────────────────────────────────────────────────────────┘

┌──────────────────┬──────────┬────────────────────────────┐
│ Risk             │ Impact   │ Mitigation Strategy        │
├──────────────────┼──────────┼────────────────────────────┤
│ Tight timeline   │ High     │ - Prioritize critical      │
│                  │          │   features                 │
│                  │          │ - Increase automation      │
│                  │          │ - Parallel testing         │
├──────────────────┼──────────┼────────────────────────────┤
│ Requirement      │ High     │ - Early requirement review │
│ changes          │          │ - Change control process   │
│                  │          │ - Impact analysis          │
├──────────────────┼──────────┼────────────────────────────┤
│ Unstable test    │ Medium   │ - Dedicated DevOps support │
│ environment      │          │ - Environment monitoring   │
│                  │          │ - Backup environment       │
├──────────────────┼──────────┼────────────────────────────┤
│ Insufficient     │ Medium   │ - Cross-training           │
│ resources        │          │ - Contractors if needed    │
│                  │          │ - Tool optimization        │
├──────────────────┼──────────┼────────────────────────────┤
│ Third-party API  │ Medium   │ - Mock services            │
│ unavailability   │          │ - Sandbox environments     │
│                  │          │ - Offline test data        │
├──────────────────┼──────────┼────────────────────────────┤
│ Lack of test     │ Low      │ - Data generation scripts  │
│ data             │          │ - Production data masking  │
└──────────────────┴──────────┴────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 6.2 Risk-Based Testing Approach                          │
└──────────────────────────────────────────────────────────┘

Priority Order:
1. HIGH RISK Areas (Test First, Test Most)
   - Payment processing
   - User authentication
   - Data security
   - Financial calculations

2. MEDIUM RISK Areas
   - Search functionality
   - Checkout flow
   - Order management

3. LOW RISK Areas
   - Static content pages
   - Help documentation
   - Cosmetic UI elements

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. TEST ENVIRONMENT STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 7.1 Environment Setup                                    │
└──────────────────────────────────────────────────────────┘

┌─────────────┬──────────────────────────────────────────┐
│ Environment │ Purpose                                  │
├─────────────┼──────────────────────────────────────────┤
│ DEV         │ Development & Unit testing               │
│             │ Owner: Development team                  │
│             │ Data: Synthetic test data                │
├─────────────┼──────────────────────────────────────────┤
│ QA/Test     │ Integration & System testing             │
│             │ Owner: QA team                           │
│             │ Data: Realistic test data                │
│             │ Refresh: Weekly                          │
├─────────────┼──────────────────────────────────────────┤
│ Staging     │ Pre-production testing                   │
│             │ Configuration: Mirror of production      │
│             │ Data: Masked production data             │
│             │ Refresh: Before major releases           │
├─────────────┼──────────────────────────────────────────┤
│ UAT         │ User Acceptance Testing                  │
│             │ Owner: Business users                    │
│             │ Data: Business-provided test scenarios   │
│             │ Access: Restricted to UAT testers        │
├─────────────┼──────────────────────────────────────────┤
│ Production  │ Live system                              │
│             │ Testing: Smoke tests only (post-deploy)  │
│             │ Access: Read-only for QA                 │
└─────────────┴──────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 7.2 Test Data Strategy                                   │
└──────────────────────────────────────────────────────────┘

Data Sources:
1. Synthetic Data: Generated by scripts
2. Masked Production Data: Real data with PII removed
3. Edge Case Data: Boundary values, negative scenarios
4. Performance Data: Large datasets for load testing

Data Management:
- Version control for test data scripts
- Automated data refresh process
- Data privacy compliance (GDPR, PDPA)
- Separate data for automated vs manual testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. ENTRY & EXIT CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 8.1 Entry Criteria (Ready to Test)                       │
└──────────────────────────────────────────────────────────┘

✓ Requirements documented and approved
✓ Test cases reviewed and approved
✓ Test environment ready and stable
✓ Test data prepared
✓ Build deployed to test environment
✓ Unit testing completed with > 80% pass rate
✓ Code review completed
✓ All P1 bugs from previous testing fixed
✓ Smoke test passed

┌──────────────────────────────────────────────────────────┐
│ 8.2 Exit Criteria (Ready to Release)                     │
└──────────────────────────────────────────────────────────┘

✓ All planned test cases executed
✓ Test coverage ≥ 85%
✓ Pass rate ≥ 95%
✓ No open P1/P2 defects
✓ All P3 defects reviewed and accepted/deferred
✓ Regression testing passed
✓ Performance benchmarks met
✓ Security scan passed
✓ UAT sign-off received
✓ Test summary report approved
✓ Production deployment plan approved

Conditional Release:
- If pass rate 90-95%: Release with known issues documented
- If pass rate < 90%: DO NOT RELEASE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. COMMUNICATION & REPORTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ 9.1 Status Reporting                                     │
└──────────────────────────────────────────────────────────┘

Daily:
- Stand-up meeting (15 min)
- Test execution progress
- Blocker/impediments

Weekly:
- Test status report
- Defect summary (new, fixed, reopened)
- Risk updates

End of Sprint:
- Sprint test summary
- Metrics dashboard
- Lessons learned

End of Release:
- Final test report
- Quality metrics
- Recommendations for next release

┌──────────────────────────────────────────────────────────┐
│ 9.2 Metrics & KPIs                                       │
└──────────────────────────────────────────────────────────┘

Test Execution Metrics:
- Test cases planned vs executed
- Pass/Fail/Blocked percentage
- Test coverage percentage
- Automation coverage percentage

Defect Metrics:
- Defects found by severity/priority
- Defect detection rate (% found in testing)
- Defect leakage (% found in production)
- Defect fix rate
- Defect reopen rate

Quality Metrics:
- Requirements coverage
- Code coverage (from unit tests)
- Customer-reported defects (post-release)
- Mean Time Between Failures (MTBF)
- Customer satisfaction score

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. ROLES & RESPONSIBILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ QA Manager                                               │
└──────────────────────────────────────────────────────────┘
- Define test strategy
- Resource allocation
- Stakeholder communication
- Final sign-off on releases

┌──────────────────────────────────────────────────────────┐
│ Test Lead                                                │
└──────────────────────────────────────────────────────────┘
- Create test plans
- Assign test cases
- Review test execution
- Defect triage
- Report to QA Manager

┌──────────────────────────────────────────────────────────┐
│ Test Engineers (Manual)                                  │
└──────────────────────────────────────────────────────────┘
- Write test cases
- Execute manual tests
- Log defects
- Retest fixed defects
- Exploratory testing

┌──────────────────────────────────────────────────────────┐
│ Automation Engineers                                     │
└──────────────────────────────────────────────────────────┘
- Design automation framework
- Develop automated tests
- Maintain test scripts
- CI/CD integration
- Generate automation reports

┌──────────────────────────────────────────────────────────┐
│ Performance Test Engineer                                │
└──────────────────────────────────────────────────────────┘
- Design performance test scenarios
- Execute load/stress tests
- Analyze performance bottlenecks
- Performance recommendations

┌──────────────────────────────────────────────────────────┐
│ Security Test Engineer                                   │
└──────────────────────────────────────────────────────────┘
- Conduct security assessments
- Vulnerability scanning
- Penetration testing
- Security compliance verification

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. TOOLS & TECHNOLOGIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────────────────────┬──────────────────────────────────┐
│ Category           │ Tools                            │
├────────────────────┼──────────────────────────────────┤
│ Test Management    │ TestRail, Jira, Zephyr           │
│ Automation - Web   │ Selenium, Cypress, Playwright    │
│ Automation - Mobile│ Appium, XCUITest, Espresso       │
│ Automation - API   │ Postman, REST Assured, SoapUI    │
│ Performance        │ JMeter, Gatling, K6              │
│ Security           │ OWASP ZAP, Burp Suite            │
│ CI/CD              │ Jenkins, GitLab CI, GitHub Actions│
│ Version Control    │ Git, GitHub                      │
│ Code Quality       │ SonarQube                        │
│ Reporting          │ Allure, ExtentReports            │
│ Monitoring         │ Grafana, ELK Stack               │
│ Collaboration      │ Slack, Microsoft Teams           │
│ Documentation      │ Confluence, Google Docs          │
└────────────────────┴──────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. CONTINUOUS IMPROVEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Activities:
✓ Quarterly strategy review
✓ Post-release retrospectives
✓ Metrics analysis and trend identification
✓ Tool evaluation and upgrades
✓ Team training and skill development
✓ Process optimization
✓ Best practices sharing

Success Indicators:
- Reduced defect leakage over time
- Increased automation coverage
- Faster test execution
- Higher team productivity
- Improved customer satisfaction

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Document Approvals:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QA Manager:          [Signature]      Date: __________
Engineering Manager: [Signature]      Date: __________
CTO:                 [Signature]      Date: __________
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next Review Date: 2025-Q1
```

---

## 7. KẾ HOẠCH KIỂM THỬ (Test Plan)

### 📜 Định nghĩa

Kế hoạch kiểm thử là một **tài liệu chi tiết** vạch ra phạm vi, mục tiêu, tài nguyên, lịch trình và các hoạt động cần thiết cho việc kiểm thử. Nó là một **lộ trình cụ thể** cho một dự án hoặc một bản phát hành.

### 🎯 Đặc điểm

- **Detailed**: Chi tiết, cụ thể, có thể hành động
- **Project-specific**: Dành cho 1 dự án/release cụ thể
- **Short-term**: Áp dụng cho 1 khoảng thời gian nhất định
- **Action-oriented**: Tập trung vào "WHO, WHEN, WHAT"

---

### 📖 VÍ DỤ CHI TIẾT: Test Plan Document

```
┌──────────────────────────────────────────────────────────┐
│              TEST PLAN DOCUMENT                          │
│                                                          │
│  Project: E-Commerce Platform Release v2.5               │
│  Release Date: December 15, 2024                         │
│  Plan Version: 1.2                                       │
│  Created: November 01, 2024                              │
│  Last Updated: November 04, 2024                         │
└──────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. INTRODUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.1 Purpose
This document outlines the testing approach for Release v2.5 of
the E-Commerce Platform, including new payment gateway integration,
improved checkout flow, and mobile app performance enhancements.

1.2 Scope Summary
This test plan covers functional, integration, performance, and
security testing for features included in Release v2.5.

1.3 Project References
- Product Requirements: PRD-2024-Q4-002
- Design Documents: DESIGN-2024-098
- API Specifications: API-SPEC-v2.5
- Test Strategy: TS-2024-v2.0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. TEST OBJECTIVES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary Objectives:
1. Verify VietQR payment integration works correctly
2. Validate new express checkout flow
3. Ensure mobile app loads within 2 seconds
4. Confirm all existing features still work (regression)
5. Achieve 90%+ test coverage on new features

Quality Goals:
- Zero P1 defects at release
- < 3 P2 defects at release
- Pass rate ≥ 95%
- Customer satisfaction target: 4.5/5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. TEST SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3.1 FEATURES IN SCOPE ✅

NEW FEATURES (Build 2.5.0):
┌──────────────────────────────────────────────────────────┐
│ 1. VietQR Payment Integration                            │
│    - QR code generation                                  │
│    - Payment verification                                │
│    - Transaction callback handling                       │
│    Effort: 40 test cases, 3 days                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 2. Express Checkout Flow                                 │
│    - One-click checkout for returning customers          │
│    - Saved payment methods                               │
│    - Auto-fill shipping address                          │
│    Effort: 35 test cases, 2.5 days                       │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 3. Mobile App Performance Optimization                   │
│    - Reduced app size                                    │
│    - Faster image loading                                │
│    - Improved caching                                    │
│    Effort: 20 test cases, 2 days                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ 4. Product Search Enhancement                            │
│    - Voice search                                        │
│    - Image search                                        │
│    - Better filters                                      │
│    Effort: 30 test cases, 2 days                         │
└──────────────────────────────────────────────────────────┘

REGRESSION TESTING:
- Authentication & User Management (15 critical paths)
- Product Catalog & Search (20 test cases)
- Shopping Cart (18 test cases)
- Standard Checkout (25 test cases)
- Order Management (22 test cases)
- Payment Processing - Existing methods (30 test cases)

Total New Feature Tests: 125
Total Regression Tests: 130
Grand Total: 255 test cases

3.2 FEATURES OUT OF SCOPE ❌
- Loyalty program (deferred to v2.6)
- Wishlist (v2.7)
- Third-party seller integration (v3.0)
- iOS app (Android only in this release)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. TEST APPROACH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4.1 Testing Types & Levels

┌────────────────────┬──────────┬─────────────────────────┐
│ Test Type          │ Coverage │ Automation              │
├────────────────────┼──────────┼─────────────────────────┤
│ Unit Testing       │ 100%     │ 100% (Dev team)         │
│ API Testing        │ 100%     │ 100% (Postman/Newman)   │
│ Integration        │ 100%     │ 80% (Selenium)          │
│ Functional (UI)    │ 100%     │ 70% (Selenium + Manual) │
│ Regression         │ Critical │ 85% (Automated suite)   │
│ Performance        │ Key flows│ 100% (JMeter)           │
│ Security           │ OWASP Top│ 80% (OWASP ZAP)         │
│ Usability          │ New UX   │ 0% (Manual only)        │
│ UAT                │ Business │ 0% (Business users)     │
└────────────────────┴──────────┴─────────────────────────┘

4.2 Test Design Techniques
- Equivalence Partitioning: For input validation
- Boundary Value Analysis: For numeric fields
- Decision Tables: For complex business rules
- State Transition: For checkout flow
- Exploratory Testing: 15% of effort for new features

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. TEST SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────┐
│ PHASE 1: Test Preparation (Nov 01 - Nov 08)              │
└──────────────────────────────────────────────────────────┘
Week 1: Nov 01 - Nov 08
├─ Nov 01-03: Test case design & review
├─ Nov 04-05: Test data preparation
├─ Nov 06-07: Environment setup
└─ Nov 08: Test readiness review

Deliverables:
✓ 255 test cases documented in TestRail
✓ Test data created
✓ QA environment configured

┌──────────────────────────────────────────────────────────┐
│ PHASE 2: Integration Testing (Nov 09 - Nov 15)           │
└──────────────────────────────────────────────────────────┘
Week 2: Nov 09 - Nov 15
├─ Nov 09-10: API testing (Payment gateway integration)
├─ Nov 11-12: Backend integration tests
├─ Nov 13-15: Database integration tests
└─ Daily: Defect logging & retesting

Milestone: API integration tests 100% pass

┌──────────────────────────────────────────────────────────┐
│ PHASE 3: Functional Testing (Nov 16 - Nov 29)            │
└──────────────────────────────────────────────────────────┘
Week 3-4: Nov 16 - Nov 29
├─ Nov 16-19: New feature testing
│   ├─ VietQR Payment
│   ├─ Express Checkout
│   └─ Search Enhancement
├─ Nov 20-23: Regression testing
│   ├─ Automated regression suite
│   └─ Manual exploratory testing
├─ Nov 24-26: Mobile app testing
└─ Nov 27-29: Defect fixing & retesting

Milestone: All P1/P2 defects fixed

┌──────────────────────────────────────────────────────────┐
│ PHASE 4: Non-Functional Testing (Nov 23 - Nov 30)        │
└──────────────────────────────────────────────────────────┘
(Parallel with Functional Testing)
├─ Nov 23-25: Performance testing
│   ├─ Load testing: 5,000 concurrent users
│   ├─ Stress testing: Peak Black Friday scenario
│   └─ Mobile app performance
├─ Nov 26-28: Security testing
│   ├─ OWASP ZAP scan
│   ├─ Payment security audit
│   └─ Penetration testing
└─ Nov 29-30: Compatibility testing
    ├─ Cross-browser (Chrome, Firefox, Safari, Edge)
    └─ Mobile devices (10 Android devices)

┌──────────────────────────────────────────────────────────┐
│ PHASE 5: User Acceptance Testing (Dec 01 - Dec 07)       │
└──────────────────────────────────────────────────────────┘
Week 5: Dec 01 - Dec 07
├─ Dec 01: UAT environment setup
├─ Dec 02
-04: Business users testing
├─ Dec 05-06: UAT defect fixing
└─ Dec 07: UAT sign-off

Participants:
- Product Owner
- 5 Business users
- QA support team

┌──────────────────────────────────────────────────────────┐
│ PHASE 6: Final Verification (Dec 08 - Dec 12)            │
└──────────────────────────────────────────────────────────┘
Week 6: Dec 08 - Dec 12
├─ Dec 08-09: Smoke test on staging
├─ Dec 10: Production deployment (off-hours)
├─ Dec 11: Production smoke test
└─ Dec 12: Post-deployment monitoring

┌──────────────────────────────────────────────────────────┐
│ PHASE 7: Hypercare (Dec 13 - Dec 20)                     │
└──────────────────────────────────────────────────────────┘
Week 7: Dec 13 - Dec 20
├─ 24/7 monitoring
├─ Quick response to production issues
├─ Daily status meetings
└─ Dec 20: Hypercare end / Handover to support

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TIMELINE VISUALIZATION:

Nov 01 ════════════════════════════════════════ Dec 20
       ↓                                            ↓
       Prep   Int   Functional   Non-Func   UAT   Deploy
       [1wk]  [1wk]   [2wks]      [1wk]    [1wk] [1wk]
                               ↑
                          (Parallel)

Total Duration: 7 weeks (49 days)
Buffer: 5 days built-in for unforeseen issues

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. RESOURCES & TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6.1 Team Structure

┌──────────────────────────────────────────────────────────┐
│ QA Manager: Sarah Nguyen                                 │
│ - Overall responsibility                                 │
│ - Stakeholder communication                              │
│ - Resource management                                    │
│ - Final sign-off                                         │
│ Allocation: 20% (oversight)                              │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Test Lead: Minh Tran                                     │
│ - Test planning & coordination                           │
│ - Daily stand-ups                                        │
│ - Defect triage                                          │
│ - Status reporting                                       │
│ Allocation: 100% (full-time)                             │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Senior Test Engineer: Linh Pham                          │
│ Focus: Payment integration & Express checkout            │
│ - Test case design                                       │
│ - Functional testing                                     │
│ - Mentor junior testers                                  │
│ Allocation: 100%                                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Test Engineer: Huy Le                                    │
│ Focus: Search enhancement & Regression                   │
│ - Test execution                                         │
│ - Defect logging                                         │
│ Allocation: 100%                                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Mobile Test Engineer: An Vo                              │
│ Focus: Mobile app testing (Android)                      │
│ - Mobile UI/UX testing                                   │
│ - Performance testing                                    │
│ - Device compatibility                                   │
│ Allocation: 100%                                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Automation Engineer: Quan Nguyen                         │
│ Focus: Test automation                                   │
│ - Automate regression suite                              │
│ - CI/CD integration                                      │
│ - Maintain automation framework                          │
│ Allocation: 100%                                         │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Performance Tester: Thao Hoang (Part-time)               │
│ Focus: Performance & Load testing                        │
│ - JMeter script development                              │
│ - Load test execution                                    │
│ - Performance analysis                                   │
│ Allocation: 50% (Nov 23-30)                              │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Security Tester: External Consultant                     │
│ Focus: Security testing                                  │
│ - Penetration testing                                    │
│ - Vulnerability assessment                               │
│ Allocation: 3 days (Nov 26-28)                           │
└──────────────────────────────────────────────────────────┘

Total Team: 6 full-time + 1 part-time + 1 consultant

6.2 Supporting Roles

Development Team Support:
- 2 developers on-call for defect fixes
- Daily sync at 10 AM

DevOps Support:
- Environment maintenance
- Deployment assistance
- Monitoring setup

Business Analyst:
- Requirement clarification
- UAT coordination

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. TEST ENVIRONMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7.1 Environment Details

┌──────────────────────────────────────────────────────────┐
│ QA Environment                                           │
├──────────────────────────────────────────────────────────┤
│ URL: https://qa.ecommerce-platform.vn                    │
│ Database: MySQL 8.0 (dedicated QA DB)                    │
│ App Server: Node.js v18, Ubuntu 22.04                    │
│ Purpose: Integration & Functional testing                │
│ Refresh: Daily at 2 AM                                   │
│ Access: QA team + Dev team                               │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Staging Environment                                      │
├──────────────────────────────────────────────────────────┤
│ URL: https://staging.ecommerce-platform.vn               │
│ Configuration: Mirror of production                      │
│ Purpose: Final verification before production            │
│ Refresh: Weekly                                          │
│ Access: QA Lead + Senior engineers only                  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ UAT Environment                                          │
├──────────────────────────────────────────────────────────┤
│ URL: https://uat.ecommerce-platform.vn                   │
│ Data: Curated business scenarios                         │
│ Purpose: User Acceptance Testing                         │
│ Access: Business users + QA support                      │
└──────────────────────────────────────────────────────────┘

7.2 Test Data

User Accounts (Pre-created):
- testuser1@example.com to testuser20@example.com
- Password: Test@12345 (all accounts)
- Various user profiles: new users, returning users, VIP

Product Data:
- 500 test products across 10 categories
- Various price points: 10k - 100M VND
- Stock levels: In stock, Low stock, Out of stock

Payment Test Cards:
┌────────────────────┬──────────────────┬──────────────────┐
│ Card Type          │ Card Number      │ Expected Result  │
├────────────────────┼──────────────────┼──────────────────┤
│ Visa Success       │ 4111111111111111 │ Success          │
│ Visa Insufficient  │ 4000000000000002 │ Declined         │
│ Mastercard Success │ 5555555555554444 │ Success          │
│ Mastercard Expired │ 5105105105105100 │ Expired          │
└────────────────────┴──────────────────┴──────────────────┘

VietQR Test Bank Accounts:
- Test account at VCB, TCB, MB for QR testing
- Sandbox mode enabled

7.3 Mobile Device Farm

Physical Devices (10 Android phones):
1. Samsung Galaxy S23 (Android 14)
2. Samsung Galaxy S22 (Android 13)
3. Samsung Galaxy A54 (Android 13)
4. Google Pixel 8 (Android 14)
5. Google Pixel 7 (Android 13)
6. Xiaomi 13 (Android 13)
7. OPPO Reno 10 (Android 13)
8. Vivo V27 (Android 13)
9. Realme 11 Pro (Android 13)
10. OnePlus 11 (Android 14)

Emulators (via BrowserStack):
- Various screen sizes: 5.5", 6.1", 6.7"
- Android versions: 11, 12, 13, 14

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. TOOLS & TECHNOLOGIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────────────────────┬──────────────────────────────────────┐
│ Purpose            │ Tool                                 │
├────────────────────┼──────────────────────────────────────┤
│ Test Management    │ TestRail v7.2                        │
│ Defect Tracking    │ Jira Software                        │
│ Web Automation     │ Selenium WebDriver 4.15 + Python     │
│ Mobile Automation  │ Appium 2.0                           │
│ API Testing        │ Postman + Newman                     │
│ Performance        │ Apache JMeter 5.6                    │
│ Security           │ OWASP ZAP 2.14, Burp Suite           │
│ CI/CD              │ Jenkins 2.420                        │
│ Version Control    │ Git + GitHub                         │
│ Collaboration      │ Slack, Google Meet                   │
│ Documentation      │ Confluence                           │
│ Reporting          │ Allure Reports, Custom Dashboard     │
└────────────────────┴──────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. ENTRY & EXIT CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

9.1 Entry Criteria (Start Testing)

✓ Requirements finalized and signed off (PRD-2024-Q4-002)
✓ Test cases written and reviewed (255 cases in TestRail)
✓ QA environment deployed with build 2.5.0-rc1
✓ Test data loaded in QA database
✓ All test tools configured and accessible
✓ Unit testing completed with 85%+ pass rate
✓ Code review completed for all new features
✓ No P1 blockers from previous testing
✓ Integration testing passed for payment gateway
✓ Team trained on new features

Status Check Date: November 08, 2024

9.2 Exit Criteria (Ready to Release)

Mandatory:
✓ All 255 planned test cases executed
✓ Test coverage ≥ 90% for new features
✓ Test coverage ≥ 85% for regression
✓ Pass rate ≥ 95%
✓ ZERO open P1 defects
✓ ZERO open P2 defects
✓ All P3 defects reviewed and accepted for deferral or fixed
✓ Regression suite passed with 100%
✓ Performance benchmarks met:
  - Page load < 2s
  - Checkout < 3s
  - Mobile app launch < 2s
  - System handles 5,000 concurrent users
✓ Security scan passed (no critical vulnerabilities)
✓ UAT sign-off received from Product Owner
✓ Production deployment plan approved
✓ Rollback plan documented and tested
✓ Production monitoring configured
✓ Support team trained on new features

Optional (Nice to have):
- Automation coverage ≥ 75%
- All P4 defects fixed
- Performance exceeds targets by 20%

Go/No-Go Decision Date: December 09, 2024

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. RISK MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10.1 Identified Risks

┌────┬──────────────────────┬──────┬─────────────────────┐
│ ID │ Risk                 │Impact│ Mitigation          │
├────┼──────────────────────┼──────┼─────────────────────┤
│ R1 │ Payment gateway API  │ HIGH │ - Sandbox available │
│    │ delays from vendor   │      │ - Mock service ready│
│    │                      │      │ - Escalation to PM  │
├────┼──────────────────────┼──────┼─────────────────────┤
│ R2 │ Key tester sick/leave│ MED  │ - Cross-training    │
│    │                      │      │ - Documentation     │
│    │                      │      │ - Backup tester     │
├────┼──────────────────────┼──────┼─────────────────────┤
│ R3 │ QA environment       │ MED  │ - DevOps on-call    │
│    │ instability          │      │ - Backup env ready  │
│    │                      │      │ - Daily health check│
├────┼──────────────────────┼──────┼─────────────────────┤
│ R4 │ Requirement changes  │ HIGH │ - Change control    │
│    │ during testing       │      │ - Impact analysis   │
│    │                      │      │ - Re-plan if needed │
├────┼──────────────────────┼──────┼─────────────────────┤
│ R5 │ Insufficient test    │ LOW  │ - Data scripts ready│
│    │ data                 │      │ - Data refresh daily│
├────┼──────────────────────┼──────┼─────────────────────┤
│ R6 │ Performance issues   │ MED  │ - Early perf testing│
│    │ discovered late      │      │ - Weekly monitoring │
│    │                      │      │ - Dev team ready    │
├────┼──────────────────────┼──────┼─────────────────────┤
│ R7 │ Black Friday traffic │ HIGH │ - Stress testing    │
│    │ spike (Dec 15 near   │      │ - Load scenario 2x  │
│    │ release)             │      │ - Hotfix plan ready │
└────┴──────────────────────┴──────┴─────────────────────┘

10.2 Contingency Plans

If pass rate < 95% by Dec 07:
→ Delay release by 1 week
→ Daily war room meetings
→ Increase testing resources

If P1 defect found in UAT:
→ Immediate fix required
→ Full regression retest
→ Re-evaluate release date

If performance targets not met:
→ Dev team optimization sprint
→ Re-test after fixes
→ Consider feature toggle for problematic areas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. COMMUNICATION PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

11.1 Meetings

Daily Stand-up:
- Time: 9:30 AM
- Duration: 15 minutes
- Attendees: QA team + Dev lead
- Format: Yesterday/Today/Blockers

Weekly Status Meeting:
- Time: Friday 3 PM
- Duration: 1 hour
- Attendees: QA Manager, Test Lead, PM, Dev Lead
- Agenda: Progress, metrics, risks, decisions

Defect Triage:
- Time: Daily 4 PM (if new P1/P2 defects)
- Duration: 30 minutes
- Attendees: Test Lead, Dev Lead, relevant engineers

UAT Kick-off:
- Date: December 01, 2 PM
- Attendees: All stakeholders
- Purpose: UAT process overview, Q&A

Go/No-Go Meeting:
- Date: December 09, 10 AM
- Attendees: Exec team, PM, QA Manager, Dev Manager
- Purpose: Release decision

11.2 Reports

Daily Test Execution Report:
- Sent to: PM, Dev Lead, QA Manager
- Time: 6 PM
- Content:
  + Test cases executed vs planned
  + Pass/Fail/Blocked count
  + New defects
  + Blockers

Weekly Test Status Report:
- Sent to: All stakeholders
- Time: Friday 5 PM
- Content:
  + Overall progress %
  + Test coverage
  + Defect summary
  + Risks and issues
  + Next week plan

Final Test Report:
- Due: December 09
- Comprehensive report covering:
  + Test execution summary
  + Defect analysis
  + Coverage metrics
  + Quality assessment
  + Recommendations
  + Release readiness

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. DELIVERABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test Deliverables:

1. Test Plan (This document) ✓
2. Test Cases (255 in TestRail)
   - Due: November 03
3. Test Data Scripts
   - Due: November 05
4. Automated Test Scripts
   - Due: November 20
5. Test Execution Reports (Daily)
   - Throughout testing phase
6. Defect Reports (As found)
   - Logged in Jira immediately
7. Performance Test Results
   - Due: November 30
8. Security Test Report
   - Due: November 29
9. UAT Sign-off Document
   - Due: December 07
10. Final Test Report
    - Due: December 09
11. Release Notes (QA section)
    - Due: December 10

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. ASSUMPTIONS & DEPENDENCIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Assumptions:
1. VietQR API will be available in sandbox by Nov 09
2. All team members available (no extended leaves)
3. No major requirement changes after Nov 05
4. Dev team will fix P1/P2 defects within SLA
5. UAT users available Dec 02-04
6. Production deployment window: Dec 10, 10 PM - 2 AM

Dependencies:
1. Development completes features by Nov 08
2. DevOps prepares QA environment by Nov 06
3. Business provides UAT test scenarios by Nov 25
4. Security consultant available Nov 26-28
5. Payment gateway vendor provides test credentials
6. Legal approval for new payment method by Nov 20

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
14. APPROVALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This test plan has been reviewed and approved by:

QA Manager:
Name: Sarah Nguyen
Signature: ________________    Date: November 04, 2024

Project Manager:
Name: David Tran
Signature: ________________    Date: November 04, 2024

Development Manager:
Name: John Le
Signature: ________________    Date: November 04, 2024

Product Owner:
Name: Emily Pham
Signature: ________________    Date: November 04, 2024

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15. APPENDICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Appendix A: Test Case List (TestRail link)
Appendix B: Test Environment Setup Guide
Appendix C: Defect Reporting Template
Appendix D: Performance Test Scenarios
Appendix E: UAT Test Scenarios
Appendix F: Contact List
Appendix G: Glossary of Terms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Document Version History:
v1.0 - Oct 25, 2024 - Initial draft
v1.1 - Oct 30, 2024 - Added risk section
v1.2 - Nov 04, 2024 - Updated schedule, added resources
```

---

## 8. BẢNG SO SÁNH TỔNG HỢP

### 📊 So sánh: Scope vs Strategy vs Plan

```
┌─────────────────────────────────────────────────────────────────────┐
│              TEST SCOPE vs STRATEGY vs PLAN                         │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┬────────────────┬────────────────┬──────────────────┐
│ Đặc điểm     │ Test Scope     │ Test Strategy  │ Test Plan        │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Trả lời câu  │ CÁI GÌ?        │ NHƯ THẾ NÀO?   │ AI? KHI NÀO? ĐÂU?│
│ hỏi          │ (WHAT)         │ (HOW)          │ (WHO/WHEN/WHERE) │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Mức độ chi   │ Medium         │ High-level     │ Very detailed    │
│ tiết         │                │                │                  │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Phạm vi áp   │ Project/Release│ Organization/  │ Specific project │
│ dụng         │ specific       │ Multiple       │ or release       │
│              │                │ projects       │                  │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Thời gian    │ 1-3 months     │ 6-12 months    │ 1-3 months       │
│ hiệu lực     │                │ (hoặc lâu hơn) │                  │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Mục đích     │ Xác định ranh  │ Định hướng     │ Hướng dẫn thực   │
│              │ giới testing   │ phương pháp    │ hiện cụ thể      │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Nội dung     │ - Features in  │ - Test levels  │ - Schedule       │
│ chính        │   scope        │ - Test types   │ - Resources      │
│              │ - Features out │ - Tools        │ - Test cases     │
│              │   of scope     │ - Methodology  │ - Assignments    │
│              │ - Platforms    │ - Standards    │ - Deliverables   │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Người tạo    │ QA Lead + PM   │ QA Manager     │ Test Lead        │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Người phê    │ PM, PO, QA Mgr │ CTO, VP Eng    │ QA Mgr, PM, PO   │
│ duyệt        │                │                │                  │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Độ dài tài   │ 3-5 pages      │ 15-25 pages    │ 10-20 pages      │
│ liệu         │                │                │                  │
├──────────────┼────────────────┼────────────────┼──────────────────┤
│ Tần suất cập │ Per release    │ Quarterly/     │ Weekly during    │
│ nhật         │                │ Yearly         │ testing          │
└──────────────┴────────────────┴────────────────┴──────────────────┘
```

### 🔄 Mối quan hệ giữa các khái niệm

```
                    TEST STRATEGY (Tổng quan tổ chức)
                           │
                           │ defines approach for
                           ↓
    ┌──────────────────────────────────────────────────────┐
    │                                                      │
    │         TEST SCOPE                TEST PLAN          │
    │       (Ranh giới dự án)        (Kế hoạch cụ thể)    │
    │                                                      │
    └──────────────────────────────────────────────────────┘
               │                              │
               │ contains                     │ organizes into
               ↓                              ↓
        TEST MODULES                    TEST SUITES
        (Nhóm theo feature)          (Nhóm theo mục đích)
               │                              │
               │ composed of                  │ contains
               ↓                              ↓
        TEST CASES ←─────────────────────────┘
        (Ca kiểm thử cụ thể)
               │
               │ validates
               ↓
        TEST OBJECTIVES
        (Mục tiêu kiểm thử)
```

### 📝 Ví dụ minh họa mối quan hệ

```
TEST STRATEGY (Company-wide):
"Chúng ta sử dụng automation cho regression, manual cho exploratory"
                    ↓
TEST SCOPE (E-commerce v2.5):
"Testing: Payment, Checkout, Search | Not testing: Wishlist, iOS app"
                    ↓
TEST PLAN (Release v2.5):
"6 testers, 7 weeks, 255 test cases, Deploy Dec 15"
                    ↓
TEST SUITE (Regression Suite):
"127 test cases covering 8 modules, run nightly"
                    ↓
TEST MODULE (Shopping Cart Module):
"15 test cases for Add/Update/Remove/Calculate"
                    ↓
TEST CASE (TC_CART_001):
"Add product to empty cart - Expected: Product added successfully"
                    ↓
TEST OBJECTIVE:
"Verify shopping cart functionality works correctly"
```

---

## 🎓 TÓM TẮT VÀ BEST PRACTICES

### ✅ Các nguyên tắc quan trọng

1. **Test Objectives**: Phải SMART (Specific, Measurable, Achievable, Relevant, Time-bound)

2. **Test Cases**: Phải đủ chi tiết để người khác có thể thực hiện mà không cần hỏi thêm

3. **Test Modules**: Nhóm theo tính năng logic, dễ quản lý và assign

4. **Test Suites**: Tổ chức theo mục đích (regression, smoke, performance)

5. **Test Scope**: Làm rõ IN/OUT scope để tránh hiểu nhầm

6. **Test Strategy**: Chuẩn hóa phương pháp testing cho cả tổ chức

7. **Test Plan**: Chi tiết, có thể hành động, có timeline rõ ràng

### 🚀 Lời khuyên thực tế

- **Bắt đầu từ mục tiêu** → Sau đó mới thiết kế test cases
- **Đầu tư thời gian vào planning** → Sẽ tiết kiệm thời gian execution
- **Review test cases với team** → Phát hiện lỗ hổng sớm
- **Automation không phải tất cả** → Chọn test cases phù hợp để automate
- **Đo lường và cải tiến** → Theo dõi metrics để tối ưu quy trình
- **Communication là chìa khóa** → Thông tin rõ ràng, kịp thời

### 📚 Checklist cho người mới bắt đầu

```
□ Hiểu rõ requirements trước khi viết test cases
□ Sử dụng test management tool (TestRail, Jira)
□ Viết test cases rõ ràng, dễ hiểu
□ Cover cả positive và negative scenarios
□ Xác định priority cho test cases
□ Review test cases với team/stakeholders
□ Chuẩn bị test data đầy đủ
□ Setup test environment trước khi test
□ Log defects với thông tin chi tiết
□ Retest sau khi dev fix bugs
□ Tạo test report sau mỗi cycle
□ Học hỏi từ các defects tìm được
```

---

**🎯 KẾT LUẬN**

Kiểm thử phần mềm là một quy trình có hệ thống, yêu cầu:

- **Mục tiêu rõ ràng** (Test Objectives)
- **Kế hoạch chi tiết** (Test Plan)
- **Tổ chức hợp lý** (Test Modules, Suites)
- **Thực thi cẩn thận** (Test Cases)
- **Phạm vi xác định** (Test Scope)
- **Phương pháp chuẩn** (Test Strategy)

Thành công trong testing không chỉ là tìm bugs, mà là đảm bảo sản phẩm đáp ứng yêu cầu và mang lại trải nghiệm tốt cho người dùng.

---

**📖 TÀI LIỆU THAM KHẢO THÊM**

- ISTQB Foundation Level Syllabus
- IEEE 829 Standard for Software Test Documentation
- Agile Testing by Lisa Crispin
- Software Testing Techniques by Boris Beizer
- The Art of Software Testing by Glenford Myers

---

\_Tài liệu này được tạo để hỗ trợ học tập và thực hành. Các ví dụ được đơn giản hóa để dễ hiểu. Trong thực tế, tài liệu có thể phức tạp hơn tùy theo quy mô dự án.
