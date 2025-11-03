# 🔧 Registration Error Fix

**Date:** November 1, 2025  
**Status:** ✅ FIXED

---

## 🐛 Bug Report

**Error:**

```json
{
  "success": false,
  "message": "Registration failed",
  "error": "Unknown column 'password' in 'field list'"
}
```

**Request:**

```json
POST /api/v1/users/register
{
  "email": "customer@example.com",
  "password": "Password123",
  "first_name": "Văn A",
  "last_name": "Nguyễn",
  "phone": "0912345678",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

---

## 🔍 Root Cause Analysis

### Mismatch giữa Model, Migration và Database:

1. **Migration file** (`20251027090112-create-user.js`):
   - Tạo column tên `password` ❌
2. **Database thực tế** (table `users`):
   - Có column tên `hashed_password` ✅
3. **Model** (`models/user.js`):
   - Field `hashed_password` với mapping `field: "password"` ❌
4. **Sequelize behavior:**
   - Khi insert, Sequelize dùng field name thực (không dùng mapping)
   - Model có field `hashed_password` nhưng mapping sang `password`
   - Database không có column `password` → Error!

### Timeline:

- Migration ban đầu tạo column `password`
- Sau đó database được recreate với script SQL (có `hashed_password`)
- Model vẫn giữ mapping cũ → Conflict!

---

## ✅ Solution

### Fixed Files:

#### 1. **models/user.js**

```javascript
// ❌ BEFORE
hashed_password: {
  type: DataTypes.STRING(255),
  allowNull: false,
  field: "password", // ❌ Mapping sai
}

// ✅ AFTER
hashed_password: {
  type: DataTypes.STRING(255),
  allowNull: false,
  // ✅ Không cần mapping, dùng trực tiếp hashed_password
}
```

#### 2. **migrations/20251027090112-create-user.js**

```javascript
// ❌ BEFORE
password: {
  type: Sequelize.STRING(255),
  allowNull: false,
  comment: "Hashed password using bcrypt",
}

// ✅ AFTER
hashed_password: {
  type: Sequelize.STRING(255),
  allowNull: false,
  comment: "Hashed password using bcrypt",
}
```

#### 3. **seeders/20251027091358-demo-users.js**

```javascript
// ❌ BEFORE
await queryInterface.bulkInsert("Users", [
  {
    email: "admin@example.com",
    password: hashedPassword, // ❌ Tên column sai
    ...
  }
])

// ✅ AFTER
await queryInterface.bulkInsert("users", [ // ✅ Lowercase table name
  {
    email: "admin@example.com",
    hashed_password: hashedPassword, // ✅ Đúng column name
    ...
  }
])
```

---

## 🧪 Testing Results

### ✅ Test 1: Register new user

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123",
    "first_name": "Test",
    "last_name": "User",
    "phone": "0987654321"
  }'
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 7,
      "first_name": "Test",
      "last_name": "User",
      "email": "newuser@example.com",
      "phone": "0987654321",
      "role": "customer",
      "created_at": "2025-11-01T03:12:01.511Z",
      "updated_at": "2025-11-01T03:12:01.511Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

✅ **Success!** User created, tokens generated, password sanitized from response

---

### ✅ Test 2: Duplicate email validation

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "Password123",
    "first_name": "Văn A",
    "last_name": "Nguyễn",
    "phone": "0912345678"
  }'
```

**Response (400):**

```json
{
  "error": "Email already in use"
}
```

✅ **Success!** Email uniqueness validation working

---

## 📊 Database Schema Verification

```sql
mysql> DESCRIBE users;
```

| Field               | Type                     | Null   | Key | Default           |
| ------------------- | ------------------------ | ------ | --- | ----------------- |
| id                  | int                      | NO     | PRI | NULL              |
| email               | varchar(255)             | NO     | UNI | NULL              |
| **hashed_password** | **varchar(255)**         | **NO** |     | **NULL**          |
| first_name          | varchar(100)             | NO     |     | NULL              |
| last_name           | varchar(100)             | NO     |     | NULL              |
| phone               | varchar(20)              | YES    |     | NULL              |
| avatar_url          | varchar(500)             | YES    |     | NULL              |
| role                | enum('customer','admin') | YES    | MUL | customer          |
| created_at          | timestamp                | YES    |     | CURRENT_TIMESTAMP |
| updated_at          | timestamp                | YES    |     | CURRENT_TIMESTAMP |

✅ Column `hashed_password` exists in database  
✅ Model now matches database schema  
✅ Migration now matches database schema

---

## 🎯 Key Learnings

1. **Always sync Model ↔ Migration ↔ Database**
   - Model field names must match database column names (or use proper `field` mapping)
   - Migration should create columns with same names as Model expects
2. **Sequelize field mapping:**

   ```javascript
   // Only use field mapping if:
   // - Database column name differs from model attribute
   // - You're working with legacy database

   // Example:
   model_field: {
     type: DataTypes.STRING,
     field: "database_column_name" // Maps model_field → database_column_name
   }
   ```

3. **When Sequelize inserts data:**

   - Uses the field name from model definition
   - NOT the mapped column name during creation
   - This is why removing the mapping fixed the issue

4. **Best practice:**
   - Use snake_case for database columns: `hashed_password`, `first_name`
   - Use camelCase in model: `hashedPassword`, `firstName`
   - Use `field` mapping to connect them
   - OR use `underscored: true` + snake_case everywhere (what we did)

---

## ✅ Checklist

- [x] Fix model field mapping
- [x] Update migration to use `hashed_password`
- [x] Update seeder to use correct column names
- [x] Update seeder table name to lowercase `users`
- [x] Test registration endpoint
- [x] Verify database schema
- [x] Confirm password sanitization in response
- [x] Verify email uniqueness validation
- [x] Document the fix

---

## 📚 Related Files

- `models/user.js` - User model definition
- `migrations/20251027090112-create-user.js` - Create users table
- `seeders/20251027091358-demo-users.js` - Demo user data
- `controllers/user.controller.js` - Registration logic
- `AUTHENTICATION_FLOW_REVIEW.md` - Complete auth flow documentation
- `AUTHENTICATION_FIXES.md` - Auth security fixes

---

**Note:** API endpoint path is `/api/v1/users/register` (not `/api/users/register`)

**Kết luận:** Bug đã được fix hoàn toàn. Registration flow hoạt động chính xác! 🎉
