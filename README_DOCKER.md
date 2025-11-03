# E-Commerce Store - Docker Setup Guide

Hướng dẫn chạy ứng dụng E-Commerce với Docker.

## 📋 Yêu cầu

- Docker Desktop (hoặc Docker Engine + Docker Compose)
- Git

## 🚀 Cài đặt nhanh

### 1. Clone repository

```bash
git clone <repository-url>
cd store_management
```

### 2. Khởi động ứng dụng

```bash
docker-compose up -d
```

Docker sẽ tự động:

- Tạo MySQL database
- Chạy migrations
- Seed dữ liệu mẫu
- Khởi động backend API (port 3000)
- Khởi động frontend (port 80)

### 3. Truy cập ứng dụng

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/v1

### 4. Tài khoản mẫu

#### Admin

- Email: `admin@example.com`
- Password: `admin123`

#### Customer

- Email: `customer@example.com`
- Password: `customer123`

## 🛠️ Các lệnh Docker hữu ích

### Xem logs

```bash
# Xem tất cả logs
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Dừng ứng dụng

```bash
docker-compose down
```

### Dừng và xóa tất cả (bao gồm database)

```bash
docker-compose down -v
```

### Khởi động lại service cụ thể

```bash
docker-compose restart backend
docker-compose restart frontend
```

### Rebuild images

```bash
docker-compose up -d --build
```

### Chạy migrations

```bash
docker-compose exec backend npx sequelize-cli db:migrate
```

### Chạy seeders

```bash
docker-compose exec backend npx sequelize-cli db:seed:all
```

### Reset database

```bash
# Xóa tất cả dữ liệu
docker-compose exec backend npx sequelize-cli db:migrate:undo:all

# Chạy lại migrations
docker-compose exec backend npx sequelize-cli db:migrate

# Seed lại dữ liệu
docker-compose exec backend npx sequelize-cli db:seed:all --seeders-path seeders/exported
```

### Truy cập MySQL database

```bash
docker-compose exec mysql mysql -u ecommerce_user -p ecommerce_db
# Password: ecommerce_password
```

## 📁 Cấu trúc Docker

```
store_management/
├── docker-compose.yml       # Docker Compose configuration
├── backend/
│   ├── Dockerfile          # Backend Docker image
│   ├── .dockerignore
│   ├── init-db.sql         # Database initialization
│   └── seeders/exported/   # Seed data files
├── frontend/
│   ├── Dockerfile          # Frontend Docker image
│   ├── .dockerignore
│   └── nginx.conf          # Nginx configuration
└── README_DOCKER.md        # This file
```

## 🔧 Cấu hình

### Backend Environment Variables

Sửa file `docker-compose.yml` để thay đổi:

- `DB_HOST`: MySQL host (default: mysql)
- `DB_PORT`: MySQL port (default: 3306)
- `DB_NAME`: Database name (default: ecommerce_db)
- `DB_USER`: Database user (default: ecommerce_user)
- `DB_PASSWORD`: Database password (default: ecommerce_password)
- `JWT_SECRET`: JWT secret key (⚠️ **PHẢI đổi trong production!**)

### Ports

Sửa trong `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "8080:80" # Đổi port frontend

  backend:
    ports:
      - "4000:3000" # Đổi port backend

  mysql:
    ports:
      - "3307:3306" # Đổi port MySQL
```

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Kiểm tra port đang dùng
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Mac/Linux

# Đổi port trong docker-compose.yml
```

### MySQL không khởi động

```bash
# Xóa volume và khởi động lại
docker-compose down -v
docker-compose up -d
```

### Backend không kết nối được MySQL

```bash
# Kiểm tra MySQL đã sẵn sàng chưa
docker-compose exec mysql mysqladmin ping -h localhost -u root -p

# Xem logs MySQL
docker-compose logs mysql
```

### Frontend không load được

```bash
# Rebuild frontend
docker-compose up -d --build frontend

# Kiểm tra nginx config
docker-compose exec frontend nginx -t
```

## 📦 Production Deployment

### 1. Thay đổi môi trường variables

```yaml
environment:
  NODE_ENV: production
  JWT_SECRET: <strong-random-secret>
  DB_PASSWORD: <strong-password>
```

### 2. Sử dụng Docker secrets

### 3. Setup reverse proxy (Nginx/Traefik)

### 4. Enable HTTPS

### 5. Backup database

```bash
# Backup
docker-compose exec mysql mysqldump -u ecommerce_user -p ecommerce_db > backup.sql

# Restore
docker-compose exec -T mysql mysql -u ecommerce_user -p ecommerce_db < backup.sql
```

## 📞 Support

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub repository.

## 📝 License

MIT License
