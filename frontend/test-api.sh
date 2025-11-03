#!/bin/bash

# Get token from browser localStorage (you need to paste it here)
# Open browser console and run: localStorage.getItem("token")
TOKEN="PASTE_YOUR_TOKEN_HERE"

echo "Testing Product Types API..."
echo ""

curl -X GET "http://localhost:3000/api/v1/admin/product-types" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq '.'
