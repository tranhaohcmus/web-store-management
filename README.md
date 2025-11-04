# E-Commerce Store Management System

Hệ thống quản lý cửa hàng thương mại điện tử với đầy đủ tính năng cho khách hàng và quản trị viên.

## 📋 Mục Lục

- [Tính Năng](#-tính-năng)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Hướng Dẫn Cài Đặt](#-hướng-dẫn-cài-đặt)
- [Cấu Hình](#-cấu-hình)
- [Chạy Ứng Dụng](#-chạy-ứng-dụng)
- [Tài Khoản Mẫu](#-tài-khoản-mẫu)
- [Cấu Trúc Project](#-cấu-trúc-project)
- [API Documentation](#-api-documentation)

## ✨ Tính Năng

### Khách Hàng

- 🔐 Đăng ký, đăng nhập tài khoản
- 🛍️ Xem danh sách sản phẩm với phân trang
- 🔍 Tìm kiếm và lọc sản phẩm theo danh mục, thương hiệu
- 📦 Xem chi tiết sản phẩm với các biến thể (size, màu sắc)
- 🛒 Thêm sản phẩm vào giỏ hàng
- 💳 Đặt hàng và theo dõi đơn hàng
- 👤 Quản lý thông tin cá nhân và địa chỉ

### Quản Trị Viên

- 📊 Dashboard thống kê tổng quan
- 📦 Quản lý sản phẩm (CRUD)
- 🏷️ Quản lý danh mục và thương hiệu
- 📋 Quản lý đơn hàng
- 👥 Quản lý người dùng
- 📸 Upload và quản lý hình ảnh sản phẩm

## 🛠 Công Nghệ Sử Dụng

### Backend

- **Node.js** v18+ với Express.js
- **MySQL** 8.0 - Database
- **Sequelize ORM** - Quản lý database
- **JWT** - Authentication
- **Multer + Sharp** - Upload và xử lý hình ảnh
- **bcrypt** - Mã hóa mật khẩu

### Frontend

- **React** 18.2
- **Redux Toolkit** - State management
- **React Query** - Data fetching và caching
- **React Router** v6 - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 💻 Yêu Cầu Hệ Thống

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (đi kèm với Node.js)
- **MySQL** >= 8.0 ([Download](https://dev.mysql.com/downloads/mysql/))
- **Git** ([Download](https://git-scm.com/downloads))

### Kiểm tra phiên bản đã cài

```bash
node --version   # v18.0.0 hoặc cao hơn
npm --version    # 9.0.0 hoặc cao hơn
mysql --version  # 8.0 hoặc cao hơn
git --version
```

## 📥 Hướng Dẫn Cài Đặt

### Bước 1: Clone Repository

```bash
git clone https://github.com/tranhaohcmus/web-store-management.git
cd web-store-management
```

### Bước 2: Cài Đặt MySQL và Tạo Database

#### 2.1. Khởi động MySQL

**Trên Windows:**

```bash
# MySQL thường tự động chạy sau khi cài đặt
# Kiểm tra trong Services hoặc khởi động thủ công:
net start MySQL80
```

**Trên macOS:**

```bash
# Nếu cài bằng Homebrew
brew services start mysql

# Hoặc
mysql.server start
```

**Trên Linux (Ubuntu/Debian):**

```bash
sudo systemctl start mysql
sudo systemctl enable mysql  # Tự động khởi động khi boot
```

#### 2.2. Đăng nhập MySQL và tạo database

```bash
# Đăng nhập MySQL với quyền root
mysql -u root -p
# Nhập mật khẩu root của MySQL
```

Sau khi đăng nhập thành công, chạy các lệnh SQL sau:

```sql
-- Tạo database
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tạo user mới (khuyến nghị)
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'your_strong_password';

-- Cấp quyền cho user
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;

-- Kiểm tra
SHOW DATABASES;

-- Thoát
EXIT;
```

**Lưu ý:** Thay `your_strong_password` bằng mật khẩu mạnh của bạn.

### Bước 3: Cấu Hình Backend

#### 3.1. Di chuyển vào thư mục backend

```bash
cd backend
```

#### 3.2. Cài đặt dependencies

```bash
npm install
```

Quá trình này sẽ cài đặt tất cả các package cần thiết được liệt kê trong `package.json`.

#### 3.3. Tạo file cấu hình môi trường

```bash
# Sao chép file mẫu
cp .env.example .env
```

#### 3.4. Chỉnh sửa file `.env`

Mở file `.env` và cập nhật thông tin:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecommerce_db
DB_USER=ecommerce_user
DB_PASSWORD=your_strong_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,image/webp
```

**Quan trọng:**

- Thay `your_strong_password` bằng mật khẩu MySQL đã tạo ở Bước 2.2
- Thay `your_jwt_secret_key_here_change_this_in_production` bằng chuỗi bí mật của bạn (ít nhất 32 ký tự ngẫu nhiên)

#### 3.5. Cập nhật file `config/config.json`

Mở file `backend/config/config.json` và cập nhật:

```json
{
  "development": {
    "username": "ecommerce_user",
    "password": "your_strong_password",
    "database": "ecommerce_db",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": "ecommerce_user",
    "password": "your_strong_password",
    "database": "ecommerce_db_test",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "ecommerce_user",
    "password": "your_strong_password",
    "database": "ecommerce_db_prod",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql",
    "logging": false
  }
}
```

### Bước 4: Chạy Database Migrations và Seeds

#### 4.1. Chạy migrations để tạo các bảng

```bash
npx sequelize-cli db:migrate
```

Lệnh này sẽ tạo tất cả các bảng cần thiết trong database.

#### 4.2. Chạy seeders để thêm dữ liệu mẫu

```bash
npx sequelize-cli db:seed:all
```

Lệnh này sẽ thêm:

- 5 users (1 admin, 4 customers)
- 2 stations
- 6 brands (Nike, Adidas, Puma, Under Armour, New Balance, Reebok)
- 17 categories
- 31 products với 203 variants
- 4 attributes (Size, Color, Material, Style)
- Sample orders, carts, addresses

### Bước 5: Cấu Hình Frontend

#### 5.1. Mở terminal mới và di chuyển vào thư mục frontend

```bash
# Từ thư mục gốc của project
cd frontend
```

#### 5.2. Cài đặt dependencies

```bash
npm install
```

#### 5.3. Tạo file cấu hình môi trường

```bash
cp .env.example .env
```

#### 5.4. Chỉnh sửa file `.env` (nếu cần)

Mở file `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

**Lưu ý:** Nếu bạn thay đổi port của backend, hãy cập nhật URL này cho phù hợp.

## 🚀 Chạy Ứng Dụng

### Chạy Backend API

Trong terminal của thư mục `backend`:

```bash
npm start
```

Hoặc chạy ở chế độ development với nodemon (tự động restart khi có thay đổi):

```bash
npm run dev
```

Backend sẽ chạy tại: **http://localhost:3000**

Bạn sẽ thấy thông báo:

```
✓ Database connection established
✓ Server is running on http://localhost:3000
```

### Chạy Frontend

Mở terminal mới, trong thư mục `frontend`:

```bash
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

Bạn sẽ thấy:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Truy cập ứng dụng

Mở trình duyệt và truy cập:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/v1

## 👤 Tài Khoản Mẫu

### Admin

- **Email:** admin@example.com
- **Password:** admin123

### Customer

- **Email:** customer@example.com
- **Password:** customer123

## 📁 Cấu Trúc Project

```
web-store-management/
├── backend/                      # Backend API
│   ├── config/                   # Cấu hình database
│   ├── controllers/              # Controllers xử lý logic
│   ├── middlewares/              # Middlewares (auth, upload, validation)
│   ├── migrations/               # Database migrations
│   ├── models/                   # Sequelize models
│   ├── routers/                  # API routes
│   ├── seeders/                  # Database seeders
│   │   └── exported/             # Exported seed data (387 records)
│   ├── scripts/                  # Utility scripts
│   ├── utils/                    # Helper functions
│   ├── public/upload/            # Uploaded files
│   ├── server.js                 # Entry point
│   ├── package.json
│   └── .env                      # Environment variables
│
└── frontend/                     # Frontend React App
    ├── public/                   # Static files
    ├── src/
    │   ├── components/           # React components
    │   │   ├── Admin/            # Admin components
    │   │   ├── Auth/             # Authentication components
    │   │   ├── Common/           # Shared components
    │   │   ├── Layout/           # Layout components
    │   │   └── Products/         # Product components
    │   ├── pages/                # Page components
    │   │   ├── Admin/            # Admin pages
    │   │   ├── Auth/             # Auth pages
    │   │   ├── Cart/             # Cart page
    │   │   ├── Home/             # Home page
    │   │   ├── Orders/           # Order pages
    │   │   └── Products/         # Product pages
    │   ├── redux/                # Redux store, slices
    │   ├── services/             # API services
    │   ├── lib/                  # Libraries (React Query)
    │   ├── App.jsx               # Main App component
    │   └── main.jsx              # Entry point
    ├── package.json
    └── .env                      # Environment variables
```

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "full_name": "Nguyen Van A",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0123456789"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get All Products (Public)

```http
GET /products?page=1&limit=12&category=1&brand=2&search=nike
```

#### Get Product Detail

```http
GET /products/:id
```

### Cart Endpoints (Requires Authentication)

#### Get Cart

```http
GET /carts
Authorization: Bearer <token>
```

#### Add to Cart

```http
POST /carts/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "variant_id": 1,
  "quantity": 2
}
```

### Order Endpoints (Requires Authentication)

#### Create Order

```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "address_id": 1,
  "payment_method": "COD",
  "note": "Giao hàng giờ hành chính"
}
```

#### Get User Orders

```http
GET /orders
Authorization: Bearer <token>
```

### Admin Endpoints (Requires Admin Role)

#### Get All Products (Admin)

```http
GET /admin/products
Authorization: Bearer <admin_token>
```

#### Create Product

```http
POST /admin/products
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "description": "Product Description",
  "category_id": 1,
  "brand_id": 2,
  "product_type_id": 1,
  "image": <file>,
  "variants": [
    {
      "sku": "SKU-001",
      "price": 100000,
      "stock": 50,
      "attributes": {
        "Size": "M",
        "Color": "Red"
      }
    }
  ]
}
```

#### Update Order Status

```http
PATCH /admin/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "processing"
}
```

## 🔧 Các Lệnh Hữu Ích

### Backend

```bash
# Chạy server ở chế độ development
npm run dev

# Chạy server ở chế độ production
npm start

# Reset database (xóa và tạo lại)
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Tạo migration mới
npx sequelize-cli migration:generate --name migration-name

# Tạo seeder mới
npx sequelize-cli seed:generate --name seeder-name

# Xuất dữ liệu hiện tại thành seed files
node scripts/export-seed-data.js
```

### Frontend

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Xử Lý Lỗi Thường Gặp

### 1. Lỗi kết nối MySQL

**Lỗi:** `SequelizeConnectionError: Access denied for user`

**Giải pháp:**

- Kiểm tra thông tin đăng nhập trong `.env` và `config/config.json`
- Đảm bảo MySQL đang chạy
- Kiểm tra user và password đã tạo đúng chưa

```bash
# Kiểm tra MySQL đang chạy
# Windows
net start | findstr MySQL

# macOS/Linux
ps aux | grep mysql
```

### 2. Lỗi port đã được sử dụng

**Lỗi:** `Error: listen EADDRINUSE: address already in use :::3000`

**Giải pháp:**

- Thay đổi PORT trong file `.env` của backend
- Hoặc tắt process đang sử dụng port đó

```bash
# Windows - Tìm process sử dụng port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### 3. Lỗi CORS

**Lỗi:** `Access to fetch at 'http://localhost:3000' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Giải pháp:**

- Kiểm tra `CORS_ORIGIN` trong file `.env` của backend
- Đảm bảo giá trị là `http://localhost:5173` (hoặc URL frontend của bạn)

### 4. Lỗi upload ảnh

**Lỗi:** Không upload được ảnh hoặc không hiển thị ảnh

**Giải pháp:**

- Kiểm tra thư mục `backend/public/upload` đã được tạo chưa
- Đảm bảo có quyền ghi vào thư mục

```bash
# Tạo thư mục nếu chưa có
mkdir -p backend/public/upload/images/products

# Cấp quyền (macOS/Linux)
chmod -R 755 backend/public/upload
```

### 5. Module not found

**Lỗi:** `Error: Cannot find module 'xxx'`

**Giải pháp:**

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes

### Thông Tin Database Seeded

Sau khi chạy seeders, database sẽ có:

- **Users:** 5 tài khoản (1 admin, 4 customers)
- **Stations:** 2 chi nhánh
- **Brands:** 6 thương hiệu thể thao
- **Categories:** 17 danh mục sản phẩm
- **Products:** 31 sản phẩm
- **Product Variants:** 203 biến thể (size, màu sắc khác nhau)
- **Attributes:** 4 loại thuộc tính (Size, Color, Material, Style)
- **Attribute Values:** 19 giá trị thuộc tính
- **Sample Data:** Addresses, Carts, Orders để test

### Upload Images

Hệ thống tự động tạo 5 kích thước ảnh:

- **Original:** Ảnh gốc
- **Small:** 150x150px
- **Medium:** 300x300px
- **Large:** 600x600px
- **XLarge:** 1200x1200px

Ảnh được lưu theo cấu trúc:

```
backend/public/upload/images/products/
  └── product-name/
      ├── product-name.jpg
      ├── product-name_small.jpg
      ├── product-name_medium.jpg
      ├── product-name_large.jpg
      └── product-name_xlarge.jpg
```

## 🤝 Contributing

Nếu bạn muốn đóng góp cho project:

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Tạo Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Tran Hao**

- GitHub: [@tranhaohcmus](https://github.com/tranhaohcmus)

## 🙏 Acknowledgments

- Express.js team
- React team
- Sequelize team
- All open-source contributors

---

**Chúc bạn code vui vẻ! 🚀**
