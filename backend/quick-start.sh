#!/bin/bash

# 🚀 E-Commerce Backend Quick Start Script
# This script will help you setup and run the backend

echo "🎉 E-Commerce Backend Quick Start"
echo "=================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo "⚠️  IMPORTANT: Please edit .env and update:"
    echo "   - DB_PASSWORD"
    echo "   - JWT_SECRET"
    echo "   - JWT_REFRESH_SECRET"
    echo ""
    read -p "Press Enter after you've updated .env file..."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Database Setup"
echo "=================="
echo "Choose database setup option:"
echo "1) Run SQL script (includes sample data) - RECOMMENDED"
echo "2) Run Sequelize migrations (empty database)"
echo "3) Skip database setup"
read -p "Enter your choice (1-3): " db_choice

if [ "$db_choice" = "1" ]; then
    echo ""
    read -p "Enter MySQL username (default: root): " db_user
    db_user=${db_user:-root}
    
    echo "Running SQL script..."
    mysql -u $db_user -p < docs/project/script.sql
    
    if [ $? -eq 0 ]; then
        echo "✅ Database setup completed with sample data!"
    else
        echo "❌ Database setup failed. Please check your MySQL credentials."
        exit 1
    fi
elif [ "$db_choice" = "2" ]; then
    echo "Running migrations..."
    npx sequelize-cli db:migrate
    
    if [ $? -eq 0 ]; then
        echo "✅ Migrations completed!"
    else
        echo "❌ Migration failed. Please check your database configuration."
        exit 1
    fi
else
    echo "⏭️  Skipping database setup"
fi

echo ""
echo "🚀 Starting server..."
echo "===================="
echo "Server will run on http://localhost:3000"
echo ""
echo "📚 Quick API Test Commands:"
echo "  - Get Products: curl http://localhost:3000/api/v1/products"
echo "  - Get Categories: curl http://localhost:3000/api/v1/categories"
echo "  - Get Brands: curl http://localhost:3000/api/v1/brands"
echo ""
echo "📖 For complete documentation, see:"
echo "  - FINAL_GUIDE.md - Complete guide with all endpoints"
echo "  - CHECKLIST.md - Testing checklist"
echo "  - SETUP_GUIDE.md - Detailed setup instructions"
echo ""

npm start
