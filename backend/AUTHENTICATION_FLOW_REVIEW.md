# 🔐 Authentication Flow Review

**Date:** November 1, 2025  
**Status:** ✅ Hoàn chỉnh - Có một số vấn đề cần fix

---

## 📋 Tổng quan

Hệ thống authentication hiện tại sử dụng:

- **JWT** (JSON Web Token) cho access token và refresh token
- **bcrypt** để hash password (salt rounds = 10)
- **Token blacklist** (Redis hoặc in-memory) để xử lý logout
- **express-validator** để validate input

---

## 🔄 Chi tiết từng luồng

### 1. **REGISTER (Đăng ký)**

**Endpoint:** `POST /api/users/register`

**Flow:**

```
1. Client gửi data: { email, password, first_name, last_name, phone? }
2. Validation middleware kiểm tra:
   ✅ first_name: required, 2-50 chars
   ✅ last_name: required, 2-50 chars
   ✅ email: required, valid format
   ✅ password: required, min 6 chars, phải có uppercase + lowercase + số
   ✅ phone: optional, 10-11 digits
3. Controller kiểm tra email đã tồn tại chưa
4. Hash password bằng bcrypt (salt rounds = 10)
5. Tạo user mới với role = "customer"
6. Generate accessToken (1h) và refreshToken (7d)
7. Return: { user, accessToken, refreshToken }
```

**Response thành công (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "test@example.com",
      "first_name": "Test",
      "last_name": "User",
      "phone": "0987654321",
      "role": "customer",
      "created_at": "2025-11-01T10:00:00.000Z",
      "updated_at": "2025-11-01T10:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ VẤN ĐỀ:**

- ❌ **Password không được sanitize (remove hashed_password)** - FIXED bằng `sanitizeUser()`
- ✅ Email validation OK
- ✅ Password hashing OK

---

### 2. **LOGIN (Đăng nhập)**

**Endpoint:** `POST /api/users/login`

**Flow:**

```
1. Client gửi: { email, password }
2. Validation: email format + password required
3. Tìm user theo email
4. Verify password bằng bcrypt.compare()
5. Generate accessToken (1h) và refreshToken (7d)
6. Return: { user, accessToken, refreshToken }
```

**Response thành công (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

**Response lỗi:**

- `404` - User not found
- `401` - Invalid password
- `500` - Server error

**✅ ĐÁNH GIÁ:**

- ✅ Password comparison an toàn (bcrypt)
- ✅ Token generation đúng
- ✅ Response format chuẩn
- ✅ Error handling tốt

---

### 3. **AUTHENTICATION (Xác thực)**

**Middleware:** `authenticate`  
**File:** `middlewares/auth/authenticate.js`

**Flow:**

```
1. Lấy token từ header (hỗ trợ 3 format):
   - header("token")
   - header("Authorization").replace("Bearer ", "")
   - headers.authorization.split(" ")[1]

2. Kiểm tra token có tồn tại không
   ❌ Không → 401 "Access token required"

3. Kiểm tra token có bị blacklist không (logout)
   ❌ Blacklisted → 401 "Token has been revoked"

4. Verify token bằng JWT
   ✅ Valid → Attach decoded user vào req.user
   ❌ Invalid → 403 "Invalid token"
   ❌ Expired → 401 "Token expired"

5. next() - Cho phép truy cập route
```

**Token payload:**

```json
{
  "id": 1,
  "role": "customer",
  "email": "test@example.com",
  "iat": 1730455200,
  "exp": 1730458800
}
```

**⚠️ VẤN ĐỀ NGHIÊM TRỌNG:**

```javascript
// ❌ BUG: isTokenBlacklisted trả về Promise nhưng không await đúng cách
await isTokenBlacklisted(token).then((isBlacklisted) => {
  if (isBlacklisted) {
    return res.status(401).json({...}); // ❌ Return trong .then() không stop middleware!
  }
});

// ✅ PHẢI SỬA THÀNH:
const isBlacklisted = await isTokenBlacklisted(token);
if (isBlacklisted) {
  return res.status(401).json({
    message: "Token has been revoked. Please login again.",
  });
}
```

**✅ ƯU ĐIỂM:**

- Hỗ trợ nhiều format token header
- Error handling chi tiết (TokenExpiredError, JsonWebTokenError, NotBeforeError)
- Logging rõ ràng

---

### 4. **REFRESH TOKEN (Làm mới token)**

**Endpoint:** `POST /api/users/refresh-token`

**Flow:**

```
1. Client gửi: { refreshToken }
2. Validate refresh token required
3. Verify refreshToken bằng JWT_REFRESH_SECRET
4. Tìm user theo email từ decoded token
5. Generate tokens mới (cả access + refresh)
6. Return: { accessToken, refreshToken }
```

**Response (200):**

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

**⚠️ VẤN ĐỀ:**

- ❌ **Không blacklist refreshToken cũ** → Có thể bị reuse
- ❌ **Không kiểm tra refreshToken có bị blacklist không** → Security risk
- ⚠️ **Nên return cả user info** để client update state

**🔧 ĐỀ XUẤT SỬA:**

```javascript
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required",
    });
  }

  try {
    // ✅ THÊM: Kiểm tra refresh token có bị blacklist không
    const isBlacklisted = await isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has been revoked. Please login again.",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find user
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ THÊM: Blacklist refresh token cũ
    const oldTokenExpiry = decoded.exp - Math.floor(Date.now() / 1000);
    if (oldTokenExpiry > 0) {
      await blacklistToken(refreshToken, oldTokenExpiry);
    }

    // Generate new tokens
    const tokens = generateTokens(user);

    // ✅ THÊM: Return user info
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        ...tokens,
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
      error: error.message,
    });
  }
};
```

---

### 5. **LOGOUT (Đăng xuất)**

**Endpoint:** `POST /api/users/logout`  
**Authentication:** Required

**Flow:**

```
1. Client gửi request với accessToken trong header
2. Authenticate middleware verify token
3. Controller lấy token từ header
4. Decode token để lấy expiration time
5. Calculate expiresIn = exp - now
6. Blacklist token với TTL = expiresIn
7. Return success message
```

**Response (200):**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

**⚠️ VẤN ĐỀ:**

- ❌ **Không blacklist refreshToken** → User vẫn có thể dùng refresh token để lấy access token mới
- ⚠️ **Token extraction trùng lặp** với authenticate middleware

**🔧 ĐỀ XUẤT SỬA:**

```javascript
const logout = async (req, res) => {
  try {
    // ✅ Lấy token từ req.user (đã được authenticate middleware verify)
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.headers.authorization?.split(" ")[1] ||
      req.header("token");

    // ✅ THÊM: Nhận refreshToken từ body để blacklist
    const { refreshToken } = req.body;

    if (token) {
      // Blacklist access token
      const decoded = jwt.decode(token);
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      await blacklistToken(token, expiresIn);
    }

    // ✅ THÊM: Blacklist refresh token nếu có
    if (refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );
        const refreshExpiresIn =
          decodedRefresh.exp - Math.floor(Date.now() / 1000);
        if (refreshExpiresIn > 0) {
          await blacklistToken(refreshToken, refreshExpiresIn);
        }
      } catch (error) {
        // Refresh token invalid, không cần blacklist
        console.warn("Invalid refresh token on logout:", error.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logout",
      error: error.message,
    });
  }
};
```

---

### 6. **TOKEN BLACKLIST**

**File:** `utils/tokenBlacklist.js`

**Cơ chế:**

- **Production:** Sử dụng Redis (nếu `USE_REDIS=true`)
- **Development:** Sử dụng in-memory Map

**Functions:**

```javascript
blacklistToken(token, expiresIn); // Thêm token vào blacklist với TTL
isTokenBlacklisted(token); // Kiểm tra token có bị blacklist không
getBlacklistStats(); // Debug info
```

**Auto cleanup:**

- **Redis:** Tự động expire sau TTL
- **In-memory:** setInterval() clean mỗi 60 giây

**✅ ĐÁNH GIÁ:**

- ✅ Fallback mechanism tốt
- ✅ Auto cleanup
- ✅ Error handling
- ⚠️ In-memory không phù hợp với multi-server (cần Redis trong production)

---

## 🎯 Tóm tắt vấn đề cần fix

### ❌ **Critical Issues (Phải fix ngay)**

1. **Authenticate middleware - Blacklist check không đúng**

   ```javascript
   // ❌ SAI
   await isTokenBlacklisted(token).then((isBlacklisted) => {
     if (isBlacklisted) {
       return res.status(401).json({...}); // Không stop được
     }
   });

   // ✅ ĐÚNG
   const isBlacklisted = await isTokenBlacklisted(token);
   if (isBlacklisted) {
     return res.status(401).json({...});
   }
   ```

2. **Refresh token không được blacklist khi:**

   - User logout (cần gửi refreshToken trong body)
   - Refresh token được sử dụng (cần blacklist token cũ)

3. **Refresh token không check blacklist trước khi verify**

---

### ⚠️ **Improvements (Nên cải thiện)**

1. **Add rate limiting** cho login/register endpoints
2. **Add password strength indicator** in validation
3. **Add email verification** workflow (optional)
4. **Add "remember me"** option với longer refresh token
5. **Add device tracking** để logout specific device
6. **Add IP whitelist/blacklist** for admin accounts
7. **Add 2FA** (Two-Factor Authentication) optional

---

## 📊 Bảng so sánh flow hiện tại vs nên có

| Feature                       | Hiện tại       | Nên có         | Priority    |
| ----------------------------- | -------------- | -------------- | ----------- |
| Register validation           | ✅             | ✅             | -           |
| Password hashing              | ✅             | ✅             | -           |
| Access token generation       | ✅             | ✅             | -           |
| Refresh token generation      | ✅             | ✅             | -           |
| Token blacklist on logout     | ⚠️ Only access | ✅ Both tokens | 🔴 High     |
| Blacklist check in auth       | ❌ Bug         | ✅ Fixed       | 🔴 Critical |
| Refresh token rotation        | ❌             | ✅             | 🔴 High     |
| Refresh token blacklist check | ❌             | ✅             | 🔴 High     |
| Email verification            | ❌             | ⚠️ Optional    | 🟡 Medium   |
| Rate limiting                 | ❌             | ✅             | 🟡 Medium   |
| 2FA                           | ❌             | ⚠️ Optional    | 🟢 Low      |

---

## 🔧 Code cần sửa

### File 1: `middlewares/auth/authenticate.js`

```javascript
const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../../utils/tokenBlacklist");

const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const token =
      req.header("token") ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.headers.authorization?.split(" ")[1];

    // Kiểm tra token có tồn tại không
    if (!token) {
      return res.status(401).json({
        message: "Access token required. Please provide token in header.",
      });
    }

    // ✅ FIX: Check if token is blacklisted (ĐÚNG CÁCH)
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token has been revoked. Please login again.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    // Attach user info vào request
    req.user = decoded;

    console.log("✅ Authenticated user:", decoded);
    next();
  } catch (error) {
    console.error("❌ Authentication error:", error.message);

    // Xử lý các loại lỗi JWT
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
        expiredAt: error.expiredAt,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid token. Authentication failed.",
        error: error.message,
      });
    }

    if (error.name === "NotBeforeError") {
      return res.status(403).json({
        message: "Token not active yet.",
        date: error.date,
      });
    }

    // Generic error
    return res.status(403).json({
      message: "Token verification failed.",
      error: error.message,
    });
  }
};

module.exports = { authenticate };
```

### File 2: `controllers/user.controller.js` - refreshToken function

```javascript
// Refresh token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ success: false, message: "Refresh token is required" });
  }

  try {
    // ✅ CHECK: Kiểm tra refresh token có bị blacklist không
    const isBlacklisted = await isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has been revoked. Please login again.",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find user by email from decoded token
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // ✅ BLACKLIST: Blacklist old refresh token (token rotation)
    const oldTokenExpiry = decoded.exp - Math.floor(Date.now() / 1000);
    if (oldTokenExpiry > 0) {
      await blacklistToken(refreshToken, oldTokenExpiry);
    }

    // Generate new tokens
    const tokens = generateTokens(user);

    // Return new tokens with user info
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        ...tokens,
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
      error: error.message,
    });
  }
};
```

### File 3: `controllers/user.controller.js` - logout function

```javascript
const logout = async (req, res) => {
  try {
    // Lấy access token từ header
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.headers.authorization?.split(" ")[1] ||
      req.header("token");

    // ✅ Lấy refresh token từ body
    const { refreshToken } = req.body;

    // Blacklist access token
    if (token) {
      const decoded = jwt.decode(token);
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      if (expiresIn > 0) {
        await blacklistToken(token, expiresIn);
      }
    }

    // ✅ THÊM: Blacklist refresh token
    if (refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );
        const refreshExpiresIn =
          decodedRefresh.exp - Math.floor(Date.now() / 1000);
        if (refreshExpiresIn > 0) {
          await blacklistToken(refreshToken, refreshExpiresIn);
        }
      } catch (error) {
        // Refresh token invalid or expired, skip blacklist
        console.warn("Invalid refresh token on logout:", error.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logout",
      error: error.message,
    });
  }
};
```

---

## 🧪 Testing Flow

### 1. Test Register

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456",
    "first_name": "Test",
    "last_name": "User",
    "phone": "0987654321"
  }'
```

### 2. Test Login

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### 3. Test Get Profile (with token)

```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Test Refresh Token

```bash
curl -X POST http://localhost:3000/api/users/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### 5. Test Logout

```bash
curl -X POST http://localhost:3000/api/users/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### 6. Test Access After Logout (Should fail)

```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
# Expected: 401 "Token has been revoked"
```

---

## ✅ Checklist sửa lỗi

- [ ] Fix authenticate middleware - blacklist check
- [ ] Add blacklist check in refreshToken
- [ ] Add token rotation in refreshToken
- [ ] Blacklist refresh token on logout
- [ ] Add user info in refresh token response
- [ ] Test full authentication flow
- [ ] Update API documentation
- [ ] Add rate limiting (optional)
- [ ] Add email verification (optional)

---

**Kết luận:**

- ✅ Cấu trúc authentication flow tốt
- ❌ Có 3 bugs nghiêm trọng cần fix ngay
- ⚠️ Cần thêm features bảo mật (rate limiting, token rotation)
