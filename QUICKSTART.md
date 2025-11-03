# 🚀 Quick Start với Docker

## Cài đặt 1 lệnh

```bash
./start-docker.sh
```

## Hoặc thủ công

```bash
# 1. Build và start
docker-compose up -d

# 2. Setup database (chỉ lần đầu)
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run db:seed:exported
```

## Truy cập

- **Website**: http://localhost
- **API**: http://localhost:3000

## Tài khoản

- **Admin**: admin@example.com / admin123
- **User**: customer@example.com / customer123

## Dừng

```bash
docker-compose down
```

## Xem logs

```bash
docker-compose logs -f
```
