# 🚀 E-Commerce Backend API

A complete E-Commerce RESTful API server built with Node.js, Express, and Sequelize MySQL.

## ✨ Features

- �️ **Complete E-Commerce System**

  - Product catalog with variants and dynamic attributes
  - Shopping cart with automatic stock reservations
  - Order management with status tracking
  - Category tree structure
  - Brand management

- �🔐 **Authentication & Authorization**

  - JWT-based authentication
  - Refresh token support
  - Token blacklisting
  - Role-based access control (client, admin)

- 👤 **User Management**

  - User registration & login
  - Profile management
  - Password change
  - Address management

- 📦 **Product Management**

  - Dynamic attribute system (color, size, etc.)
  - Product variants with independent pricing
  - Stock management with reservations
  - Full-text search and filtering
  - Admin CRUD operations

- 🛒 **Shopping Cart**

  - Automatic stock reservation (24h expiry)
  - Real-time stock availability check
  - Transaction-safe operations
  - Cart summary calculation

- 📋 **Order System**

  - Complete checkout flow
  - Order tracking with status updates
  - Cancel and reorder functionality
  - Variant snapshot for price preservation

- 👨‍💼 **Admin Dashboard**

  - Revenue statistics
  - Order management
  - User role management
  - Stock reservation monitoring
  - Low stock alerts

- 🚉 **Station Management** (Legacy)

  - CRUD operations
  - Search and filtering
  - Admin-only modifications

- 📤 **File Upload System**

  - Image optimization & compression
  - Automatic thumbnail generation
  - Virus scanning (optional)
  - Multiple file formats support
  - Rate limiting

- 🔒 **Security**
  - Bcrypt password hashing
  - Input validation with express-validator
  - Magic number file validation
  - EXIF metadata stripping
  - SQL injection prevention

## 📦 Tech Stack

- **Runtime:** Node.js v20+
- **Framework:** Express 5.1.0
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT (jsonwebtoken)
- **File Upload:** Multer
- **Image Processing:** Sharp
- **Validation:** Express-validator
- **Password:** Bcrypt
- **Cache/Session:** Redis (optional)

## 🚀 Quick Start

### Prerequisites

- Node.js v20 or higher
- MySQL 8.0+
- Redis (optional, for production)

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment variables:**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Setup database:**

**Option 1: Using SQL Script (Recommended - includes sample data)**

```bash
mysql -u root -p < docs/project/script.sql
```

**Option 2: Using Migrations (Empty database)**

```bash
# Create database
mysql -u root -p
CREATE DATABASE ecommerce_db;

# Run migrations
npx sequelize-cli db:migrate
```

5. **Start the server:**

```bash
# Development
npm run dev

# Production
npm start
```

**Or use the quick start script:**

```bash
chmod +x quick-start.sh
./quick-start.sh
```

Server will be running at: `http://localhost:3000`

## 📚 API Documentation

Complete API documentation is available in the `docs/` folder:

- **[API Documentation](./docs/API_DOCUMENTATION.md)** - Complete API reference
- **[Quick Start Guide](./docs/API_QUICK_START.md)** - Examples and code snippets
- **[Postman Collection](./docs/Postman_Collection.json)** - Import into Postman

### Quick Test

```bash
# Register a user
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "numberPhone": "0123456789"
  }'

# Login
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## 📁 Project Structure

```
recreate-server/
├── config/                 # Configuration files
│   └── config.json        # Database config
├── controllers/           # Route controllers
│   ├── user.controller.js
│   ├── station.controller.js
│   └── upload.controller.js
├── middlewares/           # Express middlewares
│   ├── auth/             # Authentication & authorization
│   ├── uploads/          # File upload system
│   └── validations/      # Input validation
├── models/               # Sequelize models
│   ├── user.js
│   └── station.js
├── routers/              # Route definitions
│   ├── user.routers.js
│   ├── station.routers.js
│   └── upload.router.js
├── migrations/           # Database migrations
├── seeders/             # Database seeders
├── public/              # Static files
│   └── upload/         # Uploaded files
├── docs/                # Documentation
└── server.js           # Entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DB_USERNAME=root
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=3307
DB_NAME=recreate_server

# JWT Secrets
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_change_in_production

# Server
PORT=3000
HOST=localhost

# Redis (optional)
USE_REDIS=false
REDIS_URL=redis://localhost:6379

# Storage
STORAGE_TYPE=local
UPLOAD_BASE_PATH=public/upload

# Security
ENABLE_VIRUS_SCAN=false
STRICT_VIRUS_SCAN=false
CLAMAV_HOST=localhost
CLAMAV_PORT=3310
```

## 📋 API Endpoints

### Authentication

- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login
- `POST /api/v1/users/logout` - Logout
- `POST /api/v1/users/refresh-token` - Refresh access token

### User Profile

- `GET /api/v1/users/profile` - Get profile
- `PUT /api/v1/users/profile` - Update profile
- `POST /api/v1/users/change-password` - Change password

### Stations

- `GET /api/v1/stations` - Get all stations
- `GET /api/v1/stations/:id` - Get station by ID
- `POST /api/v1/stations` - Create station (Admin)
- `PUT /api/v1/stations/:id` - Update station (Admin)
- `DELETE /api/v1/stations/:id` - Delete station (Admin)

### File Upload

- `POST /api/v1/uploads/avatar` - Upload avatar
- `POST /api/v1/uploads/images` - Upload multiple images
- `POST /api/v1/uploads/document` - Upload document
- `POST /api/v1/uploads/audio` - Upload audio
- `GET /api/v1/uploads/:fileName/metadata` - Get file metadata
- `DELETE /api/v1/uploads/:fileName` - Delete file

See [complete documentation](./docs/API_DOCUMENTATION.md) for details.

## 🧪 Testing

### Using Postman

1. Import `docs/Postman_Collection.json`
2. Create environment with `base_url` = `http://localhost:3000/api/v1`
3. Run requests

### Using cURL

See [Quick Start Guide](./docs/API_QUICK_START.md) for examples.

## 🔐 Security Features

- **Password Security:** Bcrypt hashing with salt (cost factor 10)
- **JWT Tokens:** Signed with secret, 1h expiration
- **Token Blacklist:** Logout invalidates tokens
- **Input Validation:** All inputs validated and sanitized
- **File Validation:** 3-layer validation (extension, MIME, magic number)
- **EXIF Stripping:** Privacy protection for images
- **Rate Limiting:** Prevent abuse on upload endpoints
- **SQL Injection:** Protected by Sequelize ORM

## 📊 Database Schema

### Users Table

```sql
- id (PK)
- name
- email (unique)
- password (hashed)
- numberPhone
- type (CLIENT/ADMIN)
- avatar
- createdAt
- updatedAt
```

### Stations Table

```sql
- id (PK)
- stationName
- address
- province
- createdAt
- updatedAt
```

## 🚀 Deployment

### Production Checklist

- [ ] Change JWT secrets in `.env`
- [ ] Enable Redis (`USE_REDIS=true`)
- [ ] Setup proper database credentials
- [ ] Configure CORS allowed origins
- [ ] Enable virus scanning if needed
- [ ] Setup CDN for file serving
- [ ] Configure environment-specific logging
- [ ] Setup process manager (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Enable HTTPS

### PM2 Deployment

```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start server.js --name recreate-server

# Monitor
pm2 monit

# View logs
pm2 logs recreate-server
```

## 🛠️ Development

### Database Commands

```bash
# Create migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Create seeder
npx sequelize-cli seed:generate --name seeder-name

# Run all seeders
npx sequelize-cli db:seed:all

# Undo all seeders
npx sequelize-cli db:seed:undo:all
```

### Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Run migrations
npm run migrate

# Run seeders
npm run seed
```

## 📖 Additional Documentation

- [Upload System Documentation](./docs/fileUpload/)
- [Authentication Review](./docs/AUTHENTICATION_REVIEW.md)
- [Express Validator Guide](./docs/EXPRESS_VALIDATOR_GUIDE.md)
- [API Design](./docs/project/API_DESIGN.md)
- [Database Schema Guide](./docs/project/DATA_SCHEMA_GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js team
- Sequelize team
- All contributors

---

**Made with ❤️ using Node.js and Express**
