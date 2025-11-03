#!/bin/bash

# Script to reset database and re-seed all data
# WARNING: This will delete all data and start fresh

echo "⚠️  DATABASE RESET SCRIPT"
echo "=========================="
echo "This will:"
echo "1. Undo all migrations (drop all tables)"
echo "2. Run all migrations (create tables)"
echo "3. Seed all demo data"
echo ""

read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Operation cancelled"
  exit 0
fi

cd "$(dirname "$0")"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}Step 1: Undoing all migrations...${NC}"
npx sequelize-cli db:migrate:undo:all

echo ""
echo -e "${YELLOW}Step 2: Running all migrations...${NC}"
npx sequelize-cli db:migrate

echo ""
echo -e "${YELLOW}Step 3: Seeding data...${NC}"
./seed-all.sh

echo ""
echo -e "${GREEN}✅ Database has been reset and seeded successfully!${NC}"
