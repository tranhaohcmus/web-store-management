# Backend API - E-Commerce Store Management# 🚀 E-Commerce Backend API

Backend API cho hệ thống quản lý cửa hàng thương mại điện tử.A complete E-Commerce RESTful API server built with Node.js, Express, and Sequelize MySQL.

## 📋 Nội Dung## ✨ Features

- [Yêu Cầu](#yêu-cầu)- �️ **Complete E-Commerce System**

- [Cài Đặt](#cài-đặt)

- [Cấu Hình](#cấu-hình) - Product catalog with variants and dynamic attributes

- [Chạy Server](#chạy-server) - Shopping cart with automatic stock reservations

- [Database](#database) - Order management with status tracking

- [API Endpoints](#api-endpoints) - Category tree structure

- [Scripts](#scripts) - Brand management

## Yêu Cầu- �🔐 **Authentication & Authorization**

- **Node.js** >= 18.0.0 - JWT-based authentication

- **MySQL** >= 8.0 - Refresh token support

- **npm** >= 9.0.0 - Token blacklisting

  - Role-based access control (client, admin)

## Cài Đặt

- 👤 **User Management**

### 1. Cài đặt dependencies

- User registration & login

````bash - Profile management

npm install  - Password change

```  - Address management



### 2. Tạo file .env- 📦 **Product Management**



Sao chép file `.env.example` và đổi tên thành `.env`:  - Dynamic attribute system (color, size, etc.)

  - Product variants with independent pricing

```bash  - Stock management with reservations

cp .env.example .env  - Full-text search and filtering

```  - Admin CRUD operations



### 3. Chỉnh sửa file .env- 🛒 **Shopping Cart**



```env  - Automatic stock reservation (24h expiry)

# Server Configuration  - Real-time stock availability check

NODE_ENV=development  - Transaction-safe operations

PORT=3000  - Cart summary calculation



# Database Configuration- 📋 **Order System**

DB_HOST=localhost

DB_PORT=3306  - Complete checkout flow

DB_NAME=ecommerce_db  - Order tracking with status updates

DB_USER=ecommerce_user  - Cancel and reorder functionality

DB_PASSWORD=your_password_here  - Variant snapshot for price preservation



# JWT Configuration- 👨‍💼 **Admin Dashboard**

JWT_SECRET=your_secret_key_change_this_in_production

JWT_EXPIRES_IN=7d  - Revenue statistics

JWT_REFRESH_EXPIRES_IN=30d  - Order management

  - User role management

# CORS Configuration  - Stock reservation monitoring

CORS_ORIGIN=http://localhost:5173  - Low stock alerts



# Upload Configuration- 🚉 **Station Management** (Legacy)

MAX_FILE_SIZE=5242880

ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/webp  - CRUD operations

```  - Search and filtering

  - Admin-only modifications

**⚠️ Quan trọng:** Hãy thay đổi các giá trị sau:

- `DB_PASSWORD`: Mật khẩu MySQL của bạn- 📤 **File Upload System**

- `JWT_SECRET`: Chuỗi bí mật ngẫu nhiên (ít nhất 32 ký tự)

  - Image optimization & compression

## Cấu Hình  - Automatic thumbnail generation

  - Virus scanning (optional)

### Cấu hình Database  - Multiple file formats support

  - Rate limiting

Chỉnh sửa file `config/config.json`:

- 🔒 **Security**

```json  - Bcrypt password hashing

{  - Input validation with express-validator

  "development": {  - Magic number file validation

    "username": "ecommerce_user",  - EXIF metadata stripping

    "password": "your_password_here",  - SQL injection prevention

    "database": "ecommerce_db",

    "host": "localhost",## 📦 Tech Stack

    "port": 3306,

    "dialect": "mysql",- **Runtime:** Node.js v20+

    "logging": false- **Framework:** Express 5.1.0

  },- **Database:** MySQL with Sequelize ORM

  "production": {- **Authentication:** JWT (jsonwebtoken)

    "username": "ecommerce_user",- **File Upload:** Multer

    "password": "your_password_here",- **Image Processing:** Sharp

    "database": "ecommerce_db_prod",- **Validation:** Express-validator

    "host": "localhost",- **Password:** Bcrypt

    "port": 3306,- **Cache/Session:** Redis (optional)

    "dialect": "mysql",

    "logging": false## 🚀 Quick Start

  }

}### Prerequisites

````

- Node.js v20 or higher

## Database- MySQL 8.0+

- Redis (optional, for production)

### 1. Tạo Database và User

### Installation

Đăng nhập vào MySQL:

1. **Clone the repository:**

````bash

mysql -u root -p```bash

```git clone <repository-url>

cd backend

Chạy các lệnh SQL sau:```



```sql2. **Install dependencies:**

-- Tạo database

CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;```bash

npm install

-- Tạo user```

CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'your_password_here';

3. **Setup environment variables:**

-- Cấp quyền

GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'localhost';```bash

FLUSH PRIVILEGES;cp .env.example .env

# Edit .env with your configuration

-- Kiểm tra```

SHOW DATABASES;

EXIT;4. **Setup database:**

````

**Option 1: Using SQL Script (Recommended - includes sample data)**

### 2. Chạy Migrations

```bash

Tạo các bảng trong database:mysql -u root -p < docs/project/script.sql

```

```bash

npx sequelize-cli db:migrate**Option 2: Using Migrations (Empty database)**

```

````bash

### 3. Chạy Seeders# Create database

mysql -u root -p

Thêm dữ liệu mẫu vào database:CREATE DATABASE ecommerce_db;



```bash# Run migrations

npx sequelize-cli db:seed:allnpx sequelize-cli db:migrate

````

Dữ liệu mẫu bao gồm:5. **Start the server:**

- **Users:** 5 tài khoản (1 admin, 4 customers)

- **Brands:** 6 thương hiệu (Nike, Adidas, Puma, Under Armour, New Balance, Reebok)```bash

- **Categories:** 17 danh mục sản phẩm# Development

- **Products:** 31 sản phẩmnpm run dev

- **Product Variants:** 203 biến thể (size, màu sắc)

- **Attributes:** 4 loại (Size, Color, Material, Style)# Production

- **Sample Orders, Carts, Addresses**npm start

````

### 4. Reset Database (Tùy chọn)

**Or use the quick start script:**

Nếu muốn xóa toàn bộ và tạo lại database:

```bash

```bashchmod +x quick-start.sh

# Undo tất cả seeders./quick-start.sh

npx sequelize-cli db:seed:undo:all```



# Undo tất cả migrationsServer will be running at: `http://localhost:3000`

npx sequelize-cli db:migrate:undo:all

## 📚 API Documentation

# Chạy lại migrations

npx sequelize-cli db:migrateComplete API documentation is available in the `docs/` folder:



# Chạy lại seeders- **[API Documentation](./docs/API_DOCUMENTATION.md)** - Complete API reference

npx sequelize-cli db:seed:all- **[Quick Start Guide](./docs/API_QUICK_START.md)** - Examples and code snippets

```- **[Postman Collection](./docs/Postman_Collection.json)** - Import into Postman



## Chạy Server### Quick Test



### Development Mode (với nodemon)```bash

# Register a user

```bashcurl -X POST http://localhost:3000/api/v1/users/register \

npm run dev  -H "Content-Type: application/json" \

```  -d '{

    "name": "John Doe",

Server sẽ tự động restart khi có thay đổi code.    "email": "john@example.com",

    "password": "Password123",

### Production Mode    "numberPhone": "0123456789"

  }'

```bash

npm start# Login

```curl -X POST http://localhost:3000/api/v1/users/login \

  -H "Content-Type: application/json" \

Server sẽ chạy tại: **http://localhost:3000**  -d '{

    "email": "john@example.com",

Bạn sẽ thấy:    "password": "Password123"

```  }'

✓ Database connection established```

✓ Server is running on http://localhost:3000

```## 📁 Project Structure



## API Endpoints```

recreate-server/

### Base URL├── config/                 # Configuration files

│   └── config.json        # Database config

```├── controllers/           # Route controllers

http://localhost:3000/api/v1│   ├── user.controller.js

```│   ├── station.controller.js

│   └── upload.controller.js

### Authentication├── middlewares/           # Express middlewares

│   ├── auth/             # Authentication & authorization

| Method | Endpoint | Description | Auth |│   ├── uploads/          # File upload system

|--------|----------|-------------|------|│   └── validations/      # Input validation

| POST | `/auth/register` | Đăng ký tài khoản | - |├── models/               # Sequelize models

| POST | `/auth/login` | Đăng nhập | - |│   ├── user.js

| POST | `/auth/logout` | Đăng xuất | ✓ |│   └── station.js

| POST | `/auth/refresh-token` | Refresh token | ✓ |├── routers/              # Route definitions

│   ├── user.routers.js

### Products (Public)│   ├── station.routers.js

│   └── upload.router.js

| Method | Endpoint | Description | Auth |├── migrations/           # Database migrations

|--------|----------|-------------|------|├── seeders/             # Database seeders

| GET | `/products` | Lấy danh sách sản phẩm | - |├── public/              # Static files

| GET | `/products/:id` | Lấy chi tiết sản phẩm | - |│   └── upload/         # Uploaded files

├── docs/                # Documentation

**Query Parameters cho `/products`:**└── server.js           # Entry point

- `page`: Số trang (default: 1)```

- `limit`: Số sản phẩm/trang (default: 12)

- `category`: ID danh mục## 🔧 Configuration

- `brand`: ID thương hiệu

- `search`: Từ khóa tìm kiếm### Environment Variables

- `minPrice`: Giá tối thiểu

- `maxPrice`: Giá tối đaCreate a `.env` file in the root directory:



### Brands & Categories```env

# Database

| Method | Endpoint | Description | Auth |DB_USERNAME=root

|--------|----------|-------------|------|DB_PASSWORD=your_password

| GET | `/brands` | Lấy danh sách thương hiệu | - |DB_HOST=127.0.0.1

| GET | `/categories` | Lấy danh sách danh mục | - |DB_PORT=3307

DB_NAME=recreate_server

### Cart (Customer)

# JWT Secrets

| Method | Endpoint | Description | Auth |JWT_SECRET=your_jwt_secret_key_change_in_production

|--------|----------|-------------|------|JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_change_in_production

| GET | `/carts` | Lấy giỏ hàng | ✓ |

| POST | `/carts/items` | Thêm vào giỏ | ✓ |# Server

| PUT | `/carts/items/:id` | Cập nhật số lượng | ✓ |PORT=3000

| DELETE | `/carts/items/:id` | Xóa khỏi giỏ | ✓ |HOST=localhost

| DELETE | `/carts/clear` | Xóa toàn bộ giỏ | ✓ |

# Redis (optional)

### Orders (Customer)USE_REDIS=false

REDIS_URL=redis://localhost:6379

| Method | Endpoint | Description | Auth |

|--------|----------|-------------|------|# Storage

| GET | `/orders` | Lấy danh sách đơn hàng | ✓ |STORAGE_TYPE=local

| GET | `/orders/:id` | Lấy chi tiết đơn hàng | ✓ |UPLOAD_BASE_PATH=public/upload

| POST | `/orders` | Tạo đơn hàng mới | ✓ |

| PATCH | `/orders/:id/cancel` | Hủy đơn hàng | ✓ |# Security

ENABLE_VIRUS_SCAN=false

### Admin - ProductsSTRICT_VIRUS_SCAN=false

CLAMAV_HOST=localhost

| Method | Endpoint | Description | Auth |CLAMAV_PORT=3310

|--------|----------|-------------|------|```

| GET | `/admin/products` | Lấy danh sách (admin) | Admin |

| GET | `/admin/products/:id` | Lấy chi tiết (admin) | Admin |## 📋 API Endpoints

| POST | `/admin/products` | Tạo sản phẩm mới | Admin |

| PUT | `/admin/products/:id` | Cập nhật sản phẩm | Admin |### Authentication

| DELETE | `/admin/products/:id` | Xóa sản phẩm | Admin |

- `POST /api/v1/users/register` - Register new user

### Admin - Orders- `POST /api/v1/users/login` - Login

- `POST /api/v1/users/logout` - Logout

| Method | Endpoint | Description | Auth |- `POST /api/v1/users/refresh-token` - Refresh access token

|--------|----------|-------------|------|

| GET | `/admin/orders` | Lấy tất cả đơn hàng | Admin |### User Profile

| GET | `/admin/orders/:id` | Chi tiết đơn hàng | Admin |

| PATCH | `/admin/orders/:id/status` | Cập nhật trạng thái | Admin |- `GET /api/v1/users/profile` - Get profile

- `PUT /api/v1/users/profile` - Update profile

### Admin - Users- `POST /api/v1/users/change-password` - Change password



| Method | Endpoint | Description | Auth |### Stations

|--------|----------|-------------|------|

| GET | `/admin/users` | Lấy danh sách users | Admin |- `GET /api/v1/stations` - Get all stations

| PATCH | `/admin/users/:id/role` | Thay đổi role | Admin |- `GET /api/v1/stations/:id` - Get station by ID

- `POST /api/v1/stations` - Create station (Admin)

### Upload- `PUT /api/v1/stations/:id` - Update station (Admin)

- `DELETE /api/v1/stations/:id` - Delete station (Admin)

| Method | Endpoint | Description | Auth |

|--------|----------|-------------|------|### File Upload

| POST | `/uploads/product-image` | Upload ảnh sản phẩm | Admin |

- `POST /api/v1/uploads/avatar` - Upload avatar

## Scripts- `POST /api/v1/uploads/images` - Upload multiple images

- `POST /api/v1/uploads/document` - Upload document

### Database Scripts- `POST /api/v1/uploads/audio` - Upload audio

- `GET /api/v1/uploads/:fileName/metadata` - Get file metadata

```bash- `DELETE /api/v1/uploads/:fileName` - Delete file

# Tạo migration mới

npx sequelize-cli migration:generate --name migration-nameSee [complete documentation](./docs/API_DOCUMENTATION.md) for details.



# Chạy migrations## 🧪 Testing

npx sequelize-cli db:migrate

### Using Postman

# Undo migration cuối cùng

npx sequelize-cli db:migrate:undo1. Import `docs/Postman_Collection.json`

2. Create environment with `base_url` = `http://localhost:3000/api/v1`

# Undo tất cả migrations3. Run requests

npx sequelize-cli db:migrate:undo:all

### Using cURL

# Tạo seeder mới

npx sequelize-cli seed:generate --name seeder-nameSee [Quick Start Guide](./docs/API_QUICK_START.md) for examples.



# Chạy tất cả seeders## 🔐 Security Features

npx sequelize-cli db:seed:all

- **Password Security:** Bcrypt hashing with salt (cost factor 10)

# Undo seeder cuối cùng- **JWT Tokens:** Signed with secret, 1h expiration

npx sequelize-cli db:seed:undo- **Token Blacklist:** Logout invalidates tokens

- **Input Validation:** All inputs validated and sanitized

# Undo tất cả seeders- **File Validation:** 3-layer validation (extension, MIME, magic number)

npx sequelize-cli db:seed:undo:all- **EXIF Stripping:** Privacy protection for images

```- **Rate Limiting:** Prevent abuse on upload endpoints

- **SQL Injection:** Protected by Sequelize ORM

### Export Seed Data

## 📊 Database Schema

Export dữ liệu hiện tại từ database thành seed files:

### Users Table

```bash

node scripts/export-seed-data.js```sql

```- id (PK)

- name

Seed files sẽ được tạo trong thư mục `seeders/exported/`- email (unique)

- password (hashed)

## 🔧 Troubleshooting- numberPhone

- type (CLIENT/ADMIN)

### Lỗi kết nối MySQL- avatar

- createdAt

```- updatedAt

SequelizeConnectionError: Access denied for user```

````

### Stations Table

**Giải pháp:**

- Kiểm tra username/password trong `.env` và `config/config.json````sql

- Đảm bảo MySQL đang chạy- id (PK)

- Kiểm tra user đã được tạo và có quyền- stationName

- address

### Lỗi port đã sử dụng- province

- createdAt

````- updatedAt

Error: listen EADDRINUSE: address already in use :::3000```

````

## 🚀 Deployment

**Giải pháp:**

- Thay đổi PORT trong file `.env`### Production Checklist

- Hoặc kill process đang dùng port 3000

- [ ] Change JWT secrets in `.env`

```bash- [ ] Enable Redis (`USE_REDIS=true`)

# macOS/Linux- [ ] Setup proper database credentials

lsof -ti:3000 | xargs kill -9- [ ] Configure CORS allowed origins

- [ ] Enable virus scanning if needed

# Windows- [ ] Setup CDN for file serving

netstat -ano | findstr :3000- [ ] Configure environment-specific logging

taskkill /PID <PID> /F- [ ] Setup process manager (PM2)

````- [ ] Configure reverse proxy (Nginx)

- [ ] Enable HTTPS

### Lỗi upload ảnh

### PM2 Deployment

**Giải pháp:**

- Kiểm tra thư mục `public/upload` đã tồn tại```bash

- Cấp quyền ghi# Install PM2

npm install -g pm2

```bash

mkdir -p public/upload/images/products# Start server

chmod -R 755 public/uploadpm2 start server.js --name recreate-server

````

# Monitor

## 📁 Cấu Trúcpm2 monit

````# View logs

backend/pm2 logs recreate-server

├── config/                   # Cấu hình```

│   └── config.json          # Database config

├── controllers/             # Controllers## 🛠️ Development

│   ├── auth.controller.js

│   ├── product.controller.js### Database Commands

│   ├── cart.controller.js

│   ├── order.controller.js```bash

│   └── admin*.controller.js# Create migration

├── middlewares/             # Middlewaresnpx sequelize-cli migration:generate --name migration-name

│   ├── auth/               # Authentication

│   ├── uploads/            # Upload system# Run migrations

│   └── validations/        # Validationnpx sequelize-cli db:migrate

├── migrations/             # Database migrations

├── models/                 # Sequelize models# Undo last migration

├── routers/                # Route definitionsnpx sequelize-cli db:migrate:undo

├── seeders/                # Database seeders

│   └── exported/          # Exported seed data# Create seeder

├── scripts/                # Utility scriptsnpx sequelize-cli seed:generate --name seeder-name

├── utils/                  # Helper functions

├── public/upload/          # Uploaded files# Run all seeders

├── server.js              # Entry pointnpx sequelize-cli db:seed:all

├── package.json

└── .env                   # Environment config# Undo all seeders

```npx sequelize-cli db:seed:undo:all

````

## 📝 Notes

### Scripts

### Tài Khoản Mẫu

````bash

**Admin:**# Development with auto-reload

- Email: admin@example.comnpm run dev

- Password: admin123

# Production

**Customer:**npm start

- Email: customer@example.com

- Password: customer123# Run migrations

npm run migrate

### Upload Images

# Run seeders

Hệ thống tự động tạo 5 kích thước ảnh:npm run seed

- Original: Ảnh gốc```

- Small: 150x150px

- Medium: 300x300px## 📖 Additional Documentation

- Large: 600x600px

- XLarge: 1200x1200px- [Upload System Documentation](./docs/fileUpload/)

- [Authentication Review](./docs/AUTHENTICATION_REVIEW.md)

Ảnh được lưu theo cấu trúc:- [Express Validator Guide](./docs/EXPRESS_VALIDATOR_GUIDE.md)

```- [API Design](./docs/project/API_DESIGN.md)

public/upload/images/products/- [Database Schema Guide](./docs/project/DATA_SCHEMA_GUIDE.md)

  └── product-name/

      ├── product-name.jpg## 🤝 Contributing

      ├── product-name_small.jpg

      ├── product-name_medium.jpg1. Fork the repository

      ├── product-name_large.jpg2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

      └── product-name_xlarge.jpg3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

```4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## 🔐 Security

## 📝 License

- **Password:** Mã hóa với Bcrypt (cost factor 10)

- **JWT:** Signed tokens với secret keyThis project is licensed under the MIT License.

- **Input Validation:** Express-validator

- **File Upload:** Magic number validation## 👥 Authors

- **SQL Injection:** Protected by Sequelize ORM

- Your Name - Initial work

## 📚 Tài Liệu Thêm

## 🙏 Acknowledgments

Xem file `README.md` ở thư mục gốc để biết thêm chi tiết về:

- Cài đặt toàn bộ project- Express.js team

- Cấu hình frontend- Sequelize team

- Hướng dẫn deploy- All contributors

- API documentation đầy đủ

---

**Made with ❤️ using Node.js and Express**
````
