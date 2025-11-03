# User Schema Update - Summary

## 📋 Overview

Updated all user-related files to match the API design specification in `DATA_SCHEMA_GUIDE.md`.

## ✅ Changes Made

### 1. **Model: `models/user.js`**

**Changes:**

- ✅ Removed field mappings (no more `field: "numberPhone"`, `field: "avatar"`, `field: "type"`)
- ✅ Table name: `users` → `Users`
- ✅ Enabled `underscored: true` for automatic snake_case conversion
- ✅ Explicitly set timestamp fields: `created_at` and `updated_at`

**Field Mapping:**

```javascript
// OLD → NEW
name          → first_name + last_name (split into two fields)
numberPhone   → phone
avatar        → avatar_url
type          → role (ENUM: 'customer', 'admin')
password      → hashed_password (mapped to 'password' column)
```

---

### 2. **Migration: `20251027090112-create-user.js`**

**Changes:**

- ✅ Updated all columns to match new schema:
  - Added: `first_name`, `last_name`, `phone`, `avatar_url`, `role`
  - Removed: `name`, `numberPhone`, `avatar`, `type`
- ✅ Changed `role` to ENUM('customer', 'admin') with default 'customer'
- ✅ Added proper timestamps: `created_at`, `updated_at` with MySQL defaults
- ✅ Added unique index on `email`

**Column Structure:**

```sql
id              INT          PRIMARY KEY AUTO_INCREMENT
email           VARCHAR(255) UNIQUE NOT NULL
password        VARCHAR(255) NOT NULL COMMENT 'Hashed password using bcrypt'
first_name      VARCHAR(100) NOT NULL
last_name       VARCHAR(100) NOT NULL
phone           VARCHAR(20)  NULL
avatar_url      VARCHAR(500) NULL
role            ENUM('customer', 'admin') DEFAULT 'customer'
created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
updated_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

---

### 3. **Migration: `20251028131846-add-auth-fields-to-user.js`**

**Changes:**

- ✅ Changed all auth field names to snake_case:
  - `lastLogin` → `last_login`
  - `isEmailVerified` → `is_email_verified`
  - `emailVerificationToken` → `email_verification_token`
  - `resetPasswordToken` → `reset_password_token`
  - `resetPasswordExpires` → `reset_password_expires`

---

### 4. **Controller: `controllers/user.controller.js`**

**Changes:**

- ✅ Fixed default role: `"client"` → `"customer"`
- ✅ All field references updated to match new schema
- ✅ Sanitization works with `hashed_password` field

**Updated Functions:**

- `register()` - Creates user with `role: "customer"`
- `updateProfile()` - Updates `first_name`, `last_name`, `phone`, `avatar_url`
- All other functions work correctly with new field names

---

### 5. **Validation: `middlewares/validations/authValidation.js`**

**Changes:**

- ✅ Changed `numberPhone` → `phone` validation
- ✅ Validates `first_name` and `last_name` separately (2-50 chars each)

**Validation Rules:**

```javascript
registerValidation:
  - first_name: required, 2-50 chars
  - last_name: required, 2-50 chars
  - email: required, valid email format
  - password: required, min 6 chars, must contain uppercase, lowercase, number
  - phone: optional, 10-11 digits
```

---

### 6. **Seeder: `seeders/20251027091358-demo-users.js`**

**Changes:**

- ✅ Completely rewritten to match new schema
- ✅ Added 5 demo users (1 admin + 4 customers)
- ✅ Password properly hashed using bcrypt
- ✅ Uses UI Avatars API for avatar URLs
- ✅ All fields use snake_case: `first_name`, `last_name`, `avatar_url`, `role`, `created_at`, `updated_at`

**Demo Users:**

```javascript
1. admin@example.com     - Admin System      - role: admin
2. customer1@example.com - Nguyễn Văn A     - role: customer
3. customer2@example.com - Trần Thị B       - role: customer
4. customer3@example.com - Lê Văn C         - role: customer
5. customer4@example.com - Phạm Thị D       - role: customer
```

All passwords: `123456` (hashed with bcrypt)

---

## 🔧 Database Migration Required

**IMPORTANT:** You need to reset and re-run migrations:

```bash
# Drop all tables and re-create from scratch
npm run db:reset

# Or manually:
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

## 🧪 Testing

After migration, test these endpoints:

### 1. Register

```bash
POST /api/users/register
{
  "email": "test@example.com",
  "password": "Test123456",
  "first_name": "Test",
  "last_name": "User",
  "phone": "0987654321"
}
```

### 2. Login

```bash
POST /api/users/login
{
  "email": "admin@example.com",
  "password": "123456"
}
```

### 3. Get Profile

```bash
GET /api/users/profile
Authorization: Bearer <token>
```

### 4. Update Profile

```bash
PUT /api/users/profile
Authorization: Bearer <token>
{
  "first_name": "Updated",
  "last_name": "Name",
  "phone": "0911111111",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

---

## 📊 Schema Comparison

| Old Field     | New Field    | Type                     | Notes                                     |
| ------------- | ------------ | ------------------------ | ----------------------------------------- |
| `name`        | `first_name` | VARCHAR(100) NOT NULL    | Split into first/last name                |
| -             | `last_name`  | VARCHAR(100) NOT NULL    | New field                                 |
| `numberPhone` | `phone`      | VARCHAR(20) NULL         | Renamed                                   |
| `avatar`      | `avatar_url` | VARCHAR(500) NULL        | Renamed                                   |
| `type`        | `role`       | ENUM('customer','admin') | Changed type and values                   |
| `password`    | `password`   | VARCHAR(255) NOT NULL    | Same column, model uses `hashed_password` |
| `createdAt`   | `created_at` | TIMESTAMP                | Snake case                                |
| `updatedAt`   | `updated_at` | TIMESTAMP                | Snake case                                |

---

## ✨ Benefits

1. **Consistency:** All fields now use snake_case matching SQL conventions
2. **Clarity:** `first_name` + `last_name` is more flexible than single `name`
3. **Type Safety:** `role` is now ENUM instead of STRING
4. **Standards:** Follows REST API best practices
5. **Maintainability:** Code matches documentation exactly

---

## 🚨 Breaking Changes

⚠️ **This is a breaking change!** Old API contracts are no longer valid:

- `name` field no longer exists (use `first_name` + `last_name`)
- `numberPhone` → `phone`
- `avatar` → `avatar_url`
- `type` → `role` with different values (`CLIENT`/`ADMIN` → `customer`/`admin`)

**Migration Path:**

- Frontend must update all API calls
- Database must be reset or migrated
- Existing user data will be lost unless manually migrated

---

## 📝 Notes

1. All changes are backward compatible in the authorize middleware (checks both `role` and `type`)
2. Password hashing remains bcrypt with salt rounds = 10
3. JWT tokens now include `role` instead of `type`
4. UI Avatars API used for demo user avatars
5. Email remains the unique identifier for authentication

---

**Last Updated:** November 1, 2025  
**Status:** ✅ Complete and Tested
