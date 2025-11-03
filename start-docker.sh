#!/bin/bash

echo "🐳 Building and starting E-Commerce application with Docker..."
echo ""

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build images
echo "🔨 Building Docker images..."
docker-compose build

# Start containers
echo "🚀 Starting containers..."
docker-compose up -d

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
sleep 15

# Run migrations and seeders
echo "📊 Running database migrations..."
docker-compose exec -T backend npx sequelize-cli db:migrate

echo "🌱 Seeding database..."
docker-compose exec -T backend npx sequelize-cli db:seed:all --seeders-path seeders/exported

echo ""
echo "✅ Application is ready!"
echo ""
echo "📱 Access the application:"
echo "   Frontend: http://localhost"
echo "   Backend:  http://localhost:3000"
echo ""
echo "👤 Login credentials:"
echo "   Admin:    admin@example.com / admin123"
echo "   Customer: customer@example.com / customer123"
echo ""
echo "📋 Useful commands:"
echo "   View logs:     docker-compose logs -f"
echo "   Stop:          docker-compose down"
echo "   Restart:       docker-compose restart"
echo ""
