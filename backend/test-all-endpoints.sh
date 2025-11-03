#!/bin/bash

# Script test toàn bộ API endpoints
# Usage: ./test-all-endpoints.sh

# Don't exit on error - we want to see all test results
set +e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3000/api/v1"

# Counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Global variables for tokens
ACCESS_TOKEN=""
REFRESH_TOKEN=""
ADMIN_ACCESS_TOKEN=""
CUSTOMER_ID=""
BRAND_ID=""
CATEGORY_ID=""
PRODUCT_ID=""
VARIANT_ID=""
ADDRESS_ID=""
CART_ID=""
ORDER_ID=""

# Function to print colored output
print_test() {
    echo -e "${BLUE}[TEST $TOTAL_TESTS]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓ PASS${NC} - $1"
    ((PASSED_TESTS++))
}

print_fail() {
    echo -e "${RED}✗ FAIL${NC} - $1"
    echo -e "${RED}Response:${NC} $2"
    ((FAILED_TESTS++))
}

print_section() {
    echo ""
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}========================================${NC}"
}

# Function to check if server is running
check_server() {
    print_section "Checking Server Connection"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s "${BASE_URL%/api/v1}/")
    if echo "$RESPONSE" | jq -e '.status == "OK"' > /dev/null 2>&1; then
        print_success "Server is running"
    else
        print_fail "Server is not responding" "$RESPONSE"
        exit 1
    fi
}

# ========================================
# 1. AUTHENTICATION TESTS
# ========================================

test_register_customer() {
    print_section "1. AUTHENTICATION - Register Customer"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "test_customer_'$(date +%s)'@example.com",
            "password": "Password123",
            "first_name": "Test",
            "last_name": "Customer",
            "phone": "0912345678",
            "avatar_url": "https://example.com/avatar.jpg"
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r '.data.accessToken')
        REFRESH_TOKEN=$(echo "$RESPONSE" | jq -r '.data.refreshToken')
        CUSTOMER_ID=$(echo "$RESPONSE" | jq -r '.data.user.id')
        print_success "Register customer (ID: $CUSTOMER_ID)"
    else
        print_fail "Register customer" "$RESPONSE"
    fi
}

test_login() {
    print_section "1. AUTHENTICATION - Login"
    ((TOTAL_TESTS++))
    
    # Use existing customer from seeder
    RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "customer1@example.com",
            "password": "123456"
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r '.data.accessToken')
        REFRESH_TOKEN=$(echo "$RESPONSE" | jq -r '.data.refreshToken')
        print_success "Login customer"
    else
        print_fail "Login customer" "$RESPONSE"
    fi
}

test_refresh_token() {
    print_section "1. AUTHENTICATION - Refresh Token"
    ((TOTAL_TESTS++))
    
    if [ -z "$REFRESH_TOKEN" ]; then
        print_fail "Refresh token" "No refresh token available"
        return
    fi
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/auth/refresh-token" \
        -H "Content-Type: application/json" \
        -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        NEW_ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r '.data.accessToken')
        NEW_REFRESH_TOKEN=$(echo "$RESPONSE" | jq -r '.data.refreshToken')
        print_success "Refresh token (old token should be blacklisted)"
        
        # Update tokens
        ACCESS_TOKEN="$NEW_ACCESS_TOKEN"
        REFRESH_TOKEN="$NEW_REFRESH_TOKEN"
    else
        print_fail "Refresh token" "$RESPONSE"
    fi
}

test_admin_login() {
    print_section "1. AUTHENTICATION - Admin Login"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "admin@example.com",
            "password": "123456"
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        ADMIN_ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r '.data.accessToken')
        print_success "Admin login"
    else
        print_fail "Admin login" "$RESPONSE"
    fi
}

# ========================================
# 2. USER MANAGEMENT TESTS
# ========================================

test_get_profile() {
    print_section "2. USER MANAGEMENT - Get Profile"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Get profile" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/users/profile" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Get user profile"
    else
        print_fail "Get user profile" "$RESPONSE"
    fi
}

test_update_profile() {
    print_section "2. USER MANAGEMENT - Update Profile"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Update profile" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X PUT "$BASE_URL/users/profile" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "first_name": "Updated",
            "last_name": "Name",
            "phone": "0987654321"
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Update user profile"
    else
        print_fail "Update user profile" "$RESPONSE"
    fi
}

test_change_password() {
    print_section "2. USER MANAGEMENT - Change Password"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Change password" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/users/change-password" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "oldPassword": "123456",
            "newPassword": "123456"
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Change password"
    else
        print_fail "Change password" "$RESPONSE"
    fi
}

# ========================================
# 3. ADDRESS TESTS
# ========================================

test_create_address() {
    print_section "3. ADDRESSES - Create Address"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Create address" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/addresses" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "recipient_name": "Nguyễn Văn A",
            "recipient_phone": "0912345678",
            "street": "123 Lê Lợi",
            "ward": "Bến Nghé",
            "district": "Quận 1",
            "city": "TP. Hồ Chí Minh",
            "address_type": "shipping",
            "is_default": false
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        ADDRESS_ID=$(echo "$RESPONSE" | jq -r '.data.id')
        print_success "Create address (ID: $ADDRESS_ID)"
    else
        print_fail "Create address" "$RESPONSE"
    fi
}

test_get_all_addresses() {
    print_section "3. ADDRESSES - Get All Addresses"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Get addresses" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/addresses" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        COUNT=$(echo "$RESPONSE" | jq '.data | length')
        print_success "Get all addresses (Count: $COUNT)"
    else
        print_fail "Get all addresses" "$RESPONSE"
    fi
}

test_get_address_by_id() {
    print_section "3. ADDRESSES - Get Address by ID"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ] || [ -z "$ADDRESS_ID" ]; then
        print_fail "Get address by ID" "No access token or address ID"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/addresses/$ADDRESS_ID" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Get address by ID"
    else
        print_fail "Get address by ID" "$RESPONSE"
    fi
}

test_update_address() {
    print_section "3. ADDRESSES - Update Address"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ] || [ -z "$ADDRESS_ID" ]; then
        print_fail "Update address" "No access token or address ID"
        return
    fi
    
    RESPONSE=$(curl -s -X PUT "$BASE_URL/addresses/$ADDRESS_ID" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "recipient_name": "Nguyễn Văn B",
            "street": "456 Nguyễn Huệ",
            "is_default": true
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Update address"
    else
        print_fail "Update address" "$RESPONSE"
    fi
}

# ========================================
# 4. BRAND TESTS
# ========================================

test_get_all_brands() {
    print_section "4. BRANDS - Get All Brands"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/brands?page=1&limit=20")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        COUNT=$(echo "$RESPONSE" | jq '.data | length')
        print_success "Get all brands (Count: $COUNT)"
        
        # Get first brand ID if exists
        if [ "$COUNT" -gt 0 ]; then
            BRAND_ID=$(echo "$RESPONSE" | jq -r '.data[0].id')
        fi
    else
        print_fail "Get all brands" "$RESPONSE"
    fi
}

test_get_brand_by_id() {
    print_section "4. BRANDS - Get Brand by ID"
    ((TOTAL_TESTS++))
    
    if [ -z "$BRAND_ID" ]; then
        print_fail "Get brand by ID" "No brand ID available"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/brands/$BRAND_ID")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        BRAND_NAME=$(echo "$RESPONSE" | jq -r '.data.name')
        print_success "Get brand by ID (Name: $BRAND_NAME)"
    else
        print_fail "Get brand by ID" "$RESPONSE"
    fi
}

test_create_brand() {
    print_section "4. BRANDS - Create Brand (Admin)"
    ((TOTAL_TESTS++))
    
    if [ -z "$ADMIN_ACCESS_TOKEN" ]; then
        print_fail "Create brand" "No admin access token"
        return
    fi
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/brands" \
        -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Test Brand '$(date +%s)'",
            "logo_url": "https://example.com/logo.svg",
            "description": "Test brand description"
        }')
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        NEW_BRAND_ID=$(echo "$RESPONSE" | jq -r '.data.id')
        print_success "Create brand (ID: $NEW_BRAND_ID)"
    else
        print_fail "Create brand" "$RESPONSE"
    fi
}

test_search_brands() {
    print_section "4. BRANDS - Search Brands"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/brands?search=puma")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        COUNT=$(echo "$RESPONSE" | jq '.data | length')
        print_success "Search brands (Results: $COUNT)"
    else
        print_fail "Search brands" "$RESPONSE"
    fi
}

# ========================================
# 5. CATEGORY TESTS
# ========================================

test_get_all_categories() {
    print_section "5. CATEGORIES - Get All Categories"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/categories")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        COUNT=$(echo "$RESPONSE" | jq '.data | length')
        print_success "Get all categories (Count: $COUNT)"
        
        # Get first category ID if exists
        if [ "$COUNT" -gt 0 ]; then
            CATEGORY_ID=$(echo "$RESPONSE" | jq -r '.data[0].id')
        fi
    else
        print_fail "Get all categories" "$RESPONSE"
    fi
}

test_get_category_by_id() {
    print_section "5. CATEGORIES - Get Category by ID"
    ((TOTAL_TESTS++))
    
    if [ -z "$CATEGORY_ID" ]; then
        print_fail "Get category by ID" "No category ID available"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/categories/$CATEGORY_ID")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        CATEGORY_NAME=$(echo "$RESPONSE" | jq -r '.data.name')
        print_success "Get category by ID (Name: $CATEGORY_NAME)"
    else
        print_fail "Get category by ID" "$RESPONSE"
    fi
}

# ========================================
# 6. PRODUCT TESTS
# ========================================

test_get_all_products() {
    print_section "6. PRODUCTS - Get All Products"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/products?page=1&limit=20")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        TOTAL=$(echo "$RESPONSE" | jq '.meta.total')
        print_success "Get all products (Total: $TOTAL)"
        
        # Get first product ID if exists
        if [ "$TOTAL" -gt 0 ]; then
            PRODUCT_ID=$(echo "$RESPONSE" | jq -r '.data[0].id')
        fi
    else
        print_fail "Get all products" "$RESPONSE"
    fi
}

test_get_product_by_id() {
    print_section "6. PRODUCTS - Get Product by ID"
    ((TOTAL_TESTS++))
    
    if [ -z "$PRODUCT_ID" ]; then
        print_fail "Get product by ID" "No product ID available"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/products/$PRODUCT_ID")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        PRODUCT_NAME=$(echo "$RESPONSE" | jq -r '.data.name')
        print_success "Get product by ID (Name: $PRODUCT_NAME)"
    else
        print_fail "Get product by ID" "$RESPONSE"
    fi
}

test_filter_products_by_category() {
    print_section "6. PRODUCTS - Filter by Category"
    ((TOTAL_TESTS++))
    
    if [ -z "$CATEGORY_ID" ]; then
        print_fail "Filter products by category" "No category ID"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/products?category=$CATEGORY_ID")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        TOTAL=$(echo "$RESPONSE" | jq '.meta.total')
        print_success "Filter products by category (Results: $TOTAL)"
    else
        print_fail "Filter products by category" "$RESPONSE"
    fi
}

test_filter_products_by_brand() {
    print_section "6. PRODUCTS - Filter by Brand"
    ((TOTAL_TESTS++))
    
    if [ -z "$BRAND_ID" ]; then
        print_fail "Filter products by brand" "No brand ID"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/products?brand=$BRAND_ID")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        TOTAL=$(echo "$RESPONSE" | jq '.meta.total')
        print_success "Filter products by brand (Results: $TOTAL)"
    else
        print_fail "Filter products by brand" "$RESPONSE"
    fi
}

test_sort_products_by_price() {
    print_section "6. PRODUCTS - Sort by Price"
    ((TOTAL_TESTS++))
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/products?sort=price&order=asc&limit=5")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Sort products by price"
    else
        print_fail "Sort products by price" "$RESPONSE"
    fi
}

# ========================================
# 7. CART TESTS
# ========================================

test_get_cart() {
    print_section "7. CART - Get Cart"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Get cart" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/cart" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        CART_ID=$(echo "$RESPONSE" | jq -r '.data.id // empty')
        ITEM_COUNT=$(echo "$RESPONSE" | jq '.data.items | length // 0')
        print_success "Get cart (Items: $ITEM_COUNT)"
    else
        print_fail "Get cart" "$RESPONSE"
    fi
}

test_add_to_cart() {
    print_section "7. CART - Add to Cart"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Add to cart" "No access token"
        return
    fi
    
    # Need to get a variant ID first
    VARIANT_RESPONSE=$(curl -s -X GET "$BASE_URL/products?limit=1")
    if echo "$VARIANT_RESPONSE" | jq -e '.data[0].variants[0].id' > /dev/null 2>&1; then
        VARIANT_ID=$(echo "$VARIANT_RESPONSE" | jq -r '.data[0].variants[0].id')
        
        RESPONSE=$(curl -s -X POST "$BASE_URL/cart/items" \
            -H "Authorization: Bearer $ACCESS_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{
                \"variant_id\": $VARIANT_ID,
                \"quantity\": 1
            }")
        
        if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
            print_success "Add to cart (Variant ID: $VARIANT_ID)"
        else
            print_fail "Add to cart" "$RESPONSE"
        fi
    else
        print_fail "Add to cart" "No variant available"
    fi
}

test_update_cart_item() {
    print_section "7. CART - Update Cart Item"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Update cart item" "No access token"
        return
    fi
    
    # Get cart item ID
    CART_RESPONSE=$(curl -s -X GET "$BASE_URL/cart" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    if echo "$CART_RESPONSE" | jq -e '.data.items[0].id' > /dev/null 2>&1; then
        CART_ITEM_ID=$(echo "$CART_RESPONSE" | jq -r '.data.items[0].id')
        
        RESPONSE=$(curl -s -X PUT "$BASE_URL/cart/items/$CART_ITEM_ID" \
            -H "Authorization: Bearer $ACCESS_TOKEN" \
            -H "Content-Type: application/json" \
            -d '{"quantity": 2}')
        
        if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
            print_success "Update cart item quantity to 2"
        else
            print_fail "Update cart item" "$RESPONSE"
        fi
    else
        print_fail "Update cart item" "No cart items available"
    fi
}

# ========================================
# 8. ORDER TESTS
# ========================================

test_get_orders() {
    print_section "8. ORDERS - Get All Orders"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Get orders" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/orders" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        TOTAL=$(echo "$RESPONSE" | jq '.meta.total // 0')
        print_success "Get all orders (Total: $TOTAL)"
        
        # Get first order ID if exists
        if [ "$TOTAL" -gt 0 ]; then
            ORDER_ID=$(echo "$RESPONSE" | jq -r '.data[0].id')
        fi
    else
        print_fail "Get all orders" "$RESPONSE"
    fi
}

test_create_order() {
    print_section "8. ORDERS - Create Order from Cart"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ] || [ -z "$ADDRESS_ID" ]; then
        print_fail "Create order" "No access token or address ID"
        return
    fi
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/orders" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"shipping_address_id\": $ADDRESS_ID,
            \"payment_method\": \"cod\",
            \"customer_note\": \"Test order\",
            \"use_cart\": true
        }")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        ORDER_ID=$(echo "$RESPONSE" | jq -r '.data.id')
        ORDER_NUMBER=$(echo "$RESPONSE" | jq -r '.data.order_number')
        print_success "Create order (Number: $ORDER_NUMBER)"
    else
        print_fail "Create order" "$RESPONSE"
    fi
}

test_get_order_by_id() {
    print_section "8. ORDERS - Get Order by ID"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ] || [ -z "$ORDER_ID" ]; then
        print_fail "Get order by ID" "No access token or order ID"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/orders/$ORDER_ID" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        STATUS=$(echo "$RESPONSE" | jq -r '.data.status')
        print_success "Get order by ID (Status: $STATUS)"
    else
        print_fail "Get order by ID" "$RESPONSE"
    fi
}

# ========================================
# 9. ADMIN TESTS
# ========================================

test_admin_dashboard() {
    print_section "9. ADMIN - Get Dashboard Statistics"
    ((TOTAL_TESTS++))
    
    if [ -z "$ADMIN_ACCESS_TOKEN" ]; then
        print_fail "Admin dashboard" "No admin access token"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/admin/dashboard" \
        -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        TOTAL_USERS=$(echo "$RESPONSE" | jq -r '.data.users.total // 0')
        TOTAL_ORDERS=$(echo "$RESPONSE" | jq -r '.data.orders.total // 0')
        print_success "Admin dashboard (Users: $TOTAL_USERS, Orders: $TOTAL_ORDERS)"
    else
        print_fail "Admin dashboard" "$RESPONSE"
    fi
}

test_admin_get_all_users() {
    print_section "9. ADMIN - Get All Users"
    ((TOTAL_TESTS++))
    
    if [ -z "$ADMIN_ACCESS_TOKEN" ]; then
        print_fail "Admin get all users" "No admin access token"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/admin/users?page=1&limit=20" \
        -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        TOTAL=$(echo "$RESPONSE" | jq '.meta.total // 0')
        print_success "Admin get all users (Total: $TOTAL)"
    else
        print_fail "Admin get all users" "$RESPONSE"
    fi
}

test_admin_get_all_orders() {
    print_section "9. ADMIN - Get All Orders"
    ((TOTAL_TESTS++))
    
    if [ -z "$ADMIN_ACCESS_TOKEN" ]; then
        print_fail "Admin get all orders" "No admin access token"
        return
    fi
    
    RESPONSE=$(curl -s -X GET "$BASE_URL/admin/orders?page=1&limit=20" \
        -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        TOTAL=$(echo "$RESPONSE" | jq '.meta.total // 0')
        print_success "Admin get all orders (Total: $TOTAL)"
    else
        print_fail "Admin get all orders" "$RESPONSE"
    fi
}

# ========================================
# 10. LOGOUT TEST
# ========================================

test_logout() {
    print_section "10. LOGOUT - Logout"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Logout" "No access token"
        return
    fi
    
    RESPONSE=$(curl -s -X POST "$BASE_URL/auth/logout" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}")
    
    if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
        print_success "Logout (tokens blacklisted)"
    else
        print_fail "Logout" "$RESPONSE"
    fi
}

test_verify_token_blacklisted() {
    print_section "10. LOGOUT - Verify Token Blacklisted"
    ((TOTAL_TESTS++))
    
    if [ -z "$ACCESS_TOKEN" ]; then
        print_fail "Verify token blacklisted" "No access token"
        return
    fi
    
    # Try to use blacklisted token
    RESPONSE=$(curl -s -X GET "$BASE_URL/users/profile" \
        -H "Authorization: Bearer $ACCESS_TOKEN")
    
    # Should receive error message about revoked token
    if echo "$RESPONSE" | jq -e '.message' | grep -q "revoked"; then
        print_success "Token correctly blacklisted (access denied)"
    else
        print_fail "Token blacklisted verification" "$RESPONSE"
    fi
}

# ========================================
# MAIN EXECUTION
# ========================================

main() {
    clear
    echo -e "${YELLOW}╔════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  E-COMMERCE API COMPREHENSIVE TEST    ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════╝${NC}"
    echo ""
    
    # Check if jq is installed
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}Error: jq is not installed. Please install jq first.${NC}"
        echo "Ubuntu/Debian: sudo apt-get install jq"
        echo "Mac: brew install jq"
        exit 1
    fi
    
    START_TIME=$(date +%s)
    
    # Run all tests
    check_server
    
    # 1. Authentication
    test_register_customer
    test_login
    test_refresh_token
    test_admin_login
    
    # 2. User Management
    test_get_profile
    test_update_profile
    test_change_password
    
    # 3. Addresses
    test_create_address
    test_get_all_addresses
    test_get_address_by_id
    test_update_address
    
    # 4. Brands
    test_get_all_brands
    test_get_brand_by_id
    test_create_brand
    test_search_brands
    
    # 5. Categories
    test_get_all_categories
    test_get_category_by_id
    
    # 6. Products
    test_get_all_products
    test_get_product_by_id
    test_filter_products_by_category
    test_filter_products_by_brand
    test_sort_products_by_price
    
    # 7. Cart
    test_get_cart
    test_add_to_cart
    test_update_cart_item
    
    # 8. Orders
    test_get_orders
    test_create_order
    test_get_order_by_id
    
    # 9. Admin
    test_admin_dashboard
    test_admin_get_all_users
    test_admin_get_all_orders
    
    # 10. Logout
    test_logout
    test_verify_token_blacklisted
    
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    
    # Print summary
    print_section "TEST SUMMARY"
    echo -e "Total Tests:  ${BLUE}$TOTAL_TESTS${NC}"
    echo -e "Passed:       ${GREEN}$PASSED_TESTS${NC}"
    echo -e "Failed:       ${RED}$FAILED_TESTS${NC}"
    echo -e "Duration:     ${YELLOW}${DURATION}s${NC}"
    echo ""
    
    if [ $FAILED_TESTS -eq 0 ]; then
        echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
        exit 0
    else
        echo -e "${RED}✗ SOME TESTS FAILED${NC}"
        exit 1
    fi
}

# Run main function
main
