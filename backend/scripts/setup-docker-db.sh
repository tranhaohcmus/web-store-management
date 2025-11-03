#!/bin/bash

echo "🔄 Waiting for MySQL to be ready..."
sleep 10

echo "📊 Running migrations..."
npx sequelize-cli db:migrate

echo "🌱 Seeding database with sample data..."
npx sequelize-cli db:seed:all --seeders-path seeders/exported

echo "✅ Database setup complete!"
