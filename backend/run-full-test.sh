#!/bin/bash

# Complete test workflow
# 1. Setup database with sample data
# 2. Run all API tests
# 3. Show summary

set -e

echo "╔════════════════════════════════════════╗"
echo "║   COMPLETE API TEST WORKFLOW          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Step 1: Setup database
echo "📝 Step 1: Setting up test database..."
./setup-test-db.sh

echo ""
echo "⏱️  Waiting 2 seconds for server to sync..."
sleep 2

# Step 2: Run tests
echo ""
echo "🧪 Step 2: Running API tests..."
./test-all-endpoints.sh

echo ""
echo "✅ Test workflow completed!"
