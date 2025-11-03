# Quick Test Guide - Category Filter & Images

## Test 1: Home Page Category Links

1. Mở: `http://localhost:5173`
2. Scroll xuống phần "Danh mục sản phẩm"
3. Click vào **"Áo đấu"**
4. **Expected**: URL chuyển thành `/products?category=8`
5. **Expected**: Hiển thị 6 products (áo đấu)
6. **Expected**: Tất cả products đều có hình ảnh

## Test 2: ProductList Category Filter

1. Mở: `http://localhost:5173/products`
2. Chọn dropdown "Danh mục"
3. Chọn **"Giày đá bóng"**
4. **Expected**: URL chuyển thành `/products?category=4&page=1`
5. **Expected**: Hiển thị 18 products (giày)
6. **Expected**: Tất cả products đều có hình ảnh

## Test 3: Direct URL Navigation

Test các URLs sau:

```
http://localhost:5173/products?category=4
→ Expected: 18 giày đá bóng

http://localhost:5173/products?category=8
→ Expected: 6 áo đấu

http://localhost:5173/products?category=9
→ Expected: 3 quần short

http://localhost:5173/products?category=11
→ Expected: 3 tất bóng đá
```

## Test 4: Product Images

1. Mở: `http://localhost:5173/products?category=8`
2. **Expected**: Tất cả 6 áo đấu có hình ảnh
3. Click vào "Nike Dri-FIT Park VII Jersey"
4. **Expected**: Product detail page hiển thị hình ảnh
5. **Expected**: Tất cả 16 variants (4 sizes x 4 colors) có hình ảnh

## Test 5: Brand Filter Combo

1. Mở: `http://localhost:5173/products`
2. Chọn "Danh mục" = "Giày đá bóng"
3. Chọn "Thương hiệu" = "Nike"
4. **Expected**: Hiển thị 6 giày Nike
5. **Expected**: Tất cả có hình ảnh

## Expected Results Summary

| Category         | ID  | Product Count | Images             |
| ---------------- | --- | ------------- | ------------------ |
| Giày đá bóng     | 4   | 18            | ✅ All have images |
| Áo đấu           | 8   | 6             | ✅ All have images |
| Quần đấu         | 9   | 3             | ✅ All have images |
| Găng tay thủ môn | 11  | 3             | ✅ All have images |

## Quick API Tests

```bash
# Test category filter
curl "http://localhost:3000/api/v1/products?category=8&limit=3" | jq '.data | length'
# Expected: 3

# Test product with images
curl "http://localhost:3000/api/v1/products/19" | jq '.data.variants[0].image_url'
# Expected: "https://static.nike.com/..."

# Test all categories
for cat in 4 8 9 11; do
  echo "Category $cat:"
  curl -s "http://localhost:3000/api/v1/products?category=$cat" | jq '.data | length'
done
```

## Troubleshooting

### Issue: Category filter không hoạt động

**Check**:

1. URL có đúng format `?category=8` (số, không phải chữ)?
2. Backend API trả về data không?
   ```bash
   curl "http://localhost:3000/api/v1/products?category=8"
   ```

### Issue: Không hiển thị hình ảnh

**Check**:

1. Database có image_url không?
   ```sql
   SELECT id, sku, image_url FROM ProductVariants WHERE product_id = 19 LIMIT 3;
   ```
2. Console có lỗi load image không?
3. CDN URLs có accessible không?

### Issue: URL dùng slug thay vì ID

**Fix**: Clear browser cache và reload

- Home.jsx đã được update để dùng ID
- Vite dev server tự động reload

## Success Criteria

✅ All tests pass:

- [ ] Home page category links work
- [ ] ProductList filter works
- [ ] Direct URL navigation works
- [ ] All products show images
- [ ] Brand + Category combo filter works
- [ ] Product detail images load
- [ ] Variant images display correctly
