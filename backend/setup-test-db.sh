#!/bin/bash

# Quick setup script for testing
# This will reset DB and seed sample data

set -e

echo "🔄 Resetting database..."
npx sequelize-cli db:migrate:undo:all

echo "📊 Running migrations..."
npx sequelize-cli db:migrate

echo "🌱 Seeding sample data..."
npx sequelize-cli db:seed:all

echo "✅ Database ready for testing!"
echo ""
echo "You can now run: ./test-all-endpoints.sh"
