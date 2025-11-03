#!/bin/bash

# Script to seed all demo data for the store management system
# Run this after migrations are complete

echo "🌱 Starting database seeding..."
echo "================================"

# Navigate to backend directory
cd "$(dirname "$0")"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run seeder
run_seeder() {
  local seeder=$1
  echo -e "${YELLOW}Running: $seeder${NC}"
  npx sequelize-cli db:seed --seed "$seeder"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $seeder completed${NC}\n"
  else
    echo -e "${RED}✗ $seeder failed${NC}\n"
    exit 1
  fi
}

echo "Step 1: Seeding Users and Stations..."
run_seeder "20251027091358-demo-users.js"
run_seeder "20251027091418-demo-stations.js"

echo "Step 2: Seeding Brands and Categories..."
run_seeder "20251101043002-demo-brands.js"
run_seeder "20251101043126-demo-categories.js"

echo "Step 3: Seeding Attributes..."
run_seeder "20251103001000-demo-attributes.js"

echo "Step 4: Seeding Product Types and Products..."
run_seeder "20251101043255-demo-product-types-and-products.js"

echo "Step 5: Linking Product Type Attributes..."
run_seeder "20251103002000-demo-product-type-attributes.js"

echo "Step 6: Linking Variant Attributes..."
run_seeder "20251103003000-demo-variant-attributes.js"

echo "Step 7: Seeding Addresses..."
run_seeder "20251103004000-demo-addresses.js"

echo "Step 8: Seeding Carts..."
run_seeder "20251103005000-demo-carts.js"

echo "Step 9: Seeding Orders..."
run_seeder "20251103006000-demo-orders.js"

echo "================================"
echo "🎉 All seeders completed successfully!"
echo ""
echo "📊 Database is now populated with:"
echo "  - 5 Users (1 admin, 4 customers)"
echo "  - 6 Brands (Nike, Adidas, Puma, New Balance, Under Armour, Mizuno)"
echo "  - 17 Categories (3 main + 14 subcategories)"
echo "  - 4 Attributes with 19 values"
echo "  - 2 Product Types"
echo "  - 9 Products with 28 variants"
echo "  - 5 Addresses"
echo "  - 4 Carts with items"
echo "  - 5 Orders with 6 order items"
echo ""
echo "👤 Test accounts:"
echo "  Admin: admin@example.com / 123456"
echo "  Customer: customer1@example.com / 123456"
echo "  Customer: customer2@example.com / 123456"
echo "  Customer: customer3@example.com / 123456"
echo "  Customer: customer4@example.com / 123456"
