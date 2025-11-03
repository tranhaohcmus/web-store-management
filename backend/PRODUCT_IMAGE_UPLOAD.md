# Product Image Upload System

## Overview

Hệ thống upload ảnh sản phẩm tự động tạo folder theo tên sản phẩm và generate nhiều size ảnh.

## Folder Structure

```
public/upload/images/products/
├── puma-teamfinal-21-jersey/
│   ├── puma-teamfinal-21-jersey.jpg (original)
│   ├── puma-teamfinal-21-jersey_small.jpg (150x150)
│   ├── puma-teamfinal-21-jersey_medium.jpg (300x300)
│   ├── puma-teamfinal-21-jersey_large.jpg (600x600)
│   └── puma-teamfinal-21-jersey_xlarge.jpg (1200x1200)
├── nike-mercurial-superfly/
│   ├── nike-mercurial-superfly.jpg
│   ├── nike-mercurial-superfly_small.jpg
│   ├── nike-mercurial-superfly_medium.jpg
│   ├── nike-mercurial-superfly_large.jpg
│   └── nike-mercurial-superfly_xlarge.jpg
└── product-{id}/  (fallback for updates without name)
    └── ...
```

## How It Works

### 1. Upload Flow

**Create Product:**

```
1. User uploads image với product name
2. Middleware tạo temp folder: temp-{timestamp}
3. Multer upload ảnh vào temp folder
4. After upload, đọc req.body.name
5. Rename folder: temp-{timestamp} → {product-name}
6. Generate 4 thumbnails (small, medium, large, xlarge)
7. Controller lưu path vào database
```

**Update Product:**

```
1. User uploads image mới
2. Middleware tạo folder: product-{id}
3. Delete old product folder (includes all sizes)
4. Upload ảnh mới
5. Rename folder based on product name (if provided)
6. Generate thumbnails
7. Controller update database path
```

### 2. Middleware Logic

**File:** `middlewares/uploads/index.js`

```javascript
const uploadProductImage = (req, res, next) => {
  // Step 1: Determine folder name
  let folderName = req.params.id
    ? `product-${req.params.id}`
    : `temp-${Date.now()}`;

  // Step 2: Create storage with folder
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const folder = `public/upload/images/products/${folderName}`;
      await fs.mkdir(folder, { recursive: true });
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      // Sanitize filename
      const clean = file.originalname
        .replace(/[^a-z0-9-.]/gi, "-")
        .toLowerCase();
      cb(null, clean);
    },
  });

  // Step 3: Upload with multer
  upload(req, res, async (err) => {
    if (err) return next(err);
    if (!req.file) return next();

    // Step 4: Rename folder based on product name
    if (req.body.name) {
      const newFolderName = sanitize(req.body.name);
      await fs.rename(oldFolder, newFolder);
    }

    // Step 5: Generate thumbnails
    const thumbnails = await ImageProcessor.generateThumbnails(req.file.path, {
      small: { width: 150, height: 150 },
      medium: { width: 300, height: 300 },
      large: { width: 600, height: 600 },
      xlarge: { width: 1200, height: 1200 },
    });

    req.thumbnails = thumbnails;
    next();
  });
};
```

### 3. Image Sizes

| Size         | Dimensions  | Use Case                       |
| ------------ | ----------- | ------------------------------ |
| **Original** | As uploaded | Product detail page hero image |
| **xlarge**   | 1200x1200   | Zoom view, high-res display    |
| **large**    | 600x600     | Product detail main image      |
| **medium**   | 300x300     | Product grid/list view         |
| **small**    | 150x150     | Thumbnails, cart items         |

### 4. Controller Updates

**Create Product:**

```javascript
exports.createProduct = async (req, res) => {
  // ...
  let default_image_url = null;
  if (req.file) {
    // Get relative path from public folder
    // Example: /upload/images/products/puma-teamfinal-21-jersey/image.jpg
    const relativePath = req.file.path.split("public")[1];
    default_image_url = relativePath;

    if (req.thumbnails) {
      console.log("Thumbnails:", Object.keys(req.thumbnails));
      // Future: Store thumbnail paths in separate field
    }
  }

  await Product.create({ ..., default_image_url });
};
```

**Update Product:**

```javascript
exports.updateProduct = async (req, res) => {
  // ...
  if (req.file) {
    // Delete entire old product folder
    if (product.default_image_url) {
      const oldFolder = path.dirname(
        path.join(__dirname, "../public", product.default_image_url)
      );
      await fs.rm(oldFolder, { recursive: true, force: true });
    }

    // Set new path
    const relativePath = req.file.path.split("public")[1];
    default_image_url = relativePath;
  }
};
```

## Frontend Usage

### Display Different Sizes

**Product Grid (Medium):**

```jsx
<img
  src={`http://localhost:3000${product.default_image_url.replace(
    ".jpg",
    "_medium.jpg"
  )}`}
  alt={product.name}
/>
```

**Product Detail (Large):**

```jsx
<img
  src={`http://localhost:3000${product.default_image_url.replace(
    ".jpg",
    "_large.jpg"
  )}`}
  alt={product.name}
/>
```

**Cart Thumbnail (Small):**

```jsx
<img
  src={`http://localhost:3000${product.default_image_url.replace(
    ".jpg",
    "_small.jpg"
  )}`}
  alt={product.name}
/>
```

**Zoom View (XLarge):**

```jsx
<img
  src={`http://localhost:3000${product.default_image_url.replace(
    ".jpg",
    "_xlarge.jpg"
  )}`}
  alt={product.name}
/>
```

### Helper Function

```javascript
// utils/imageHelper.js
export const getProductImage = (imagePath, size = "original") => {
  if (!imagePath) return "/placeholder.jpg";

  if (size === "original") {
    return `http://localhost:3000${imagePath}`;
  }

  const ext = path.extname(imagePath);
  const base = imagePath.replace(ext, "");
  return `http://localhost:3000${base}_${size}${ext}`;
};

// Usage:
<img src={getProductImage(product.default_image_url, "medium")} />;
```

## Testing

### Via Frontend UI

1. **Navigate to:** `http://localhost:5173/admin/products/21/edit`
2. **Upload new image:** Click upload area, select "Puma TeamFINAL 21 Jersey.jpg"
3. **Submit form**
4. **Verify:**
   - Check folder created: `backend/public/upload/images/products/puma-teamfinal-21-jersey/`
   - Should contain 5 files: original + 4 thumbnails
   - Database updated with path: `/upload/images/products/puma-teamfinal-21-jersey/puma-teamfinal-21-jersey.jpg`

### Via API (cURL)

```bash
# Get auth token
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}' \
  | jq -r '.data.accessToken')

# Update product 21 with new image
curl -X PUT "http://localhost:3000/api/v1/admin/products/21" \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Puma TeamFINAL 21 Jersey" \
  -F "product_type_id=2" \
  -F "brand_id=3" \
  -F "category_id=8" \
  -F "image=@./test-image.jpg"

# Check uploaded files
ls -lh backend/public/upload/images/products/puma-teamfinal-21-jersey/
```

**Expected Output:**

```
puma-teamfinal-21-jersey.jpg         (original - 800KB)
puma-teamfinal-21-jersey_small.jpg   (150x150 - 15KB)
puma-teamfinal-21-jersey_medium.jpg  (300x300 - 45KB)
puma-teamfinal-21-jersey_large.jpg   (600x600 - 150KB)
puma-teamfinal-21-jersey_xlarge.jpg  (1200x1200 - 400KB)
```

### Verify Thumbnails

```bash
# Check file sizes
file backend/public/upload/images/products/puma-teamfinal-21-jersey/*

# Check dimensions with identify (ImageMagick)
identify backend/public/upload/images/products/puma-teamfinal-21-jersey/*
```

## Features

✅ **Auto Folder Creation**

- Folder named after product (sanitized)
- Clean URL structure
- Easy to locate files

✅ **Multiple Sizes**

- 4 thumbnail sizes + original
- Optimized for different use cases
- Reduces bandwidth on list views

✅ **Auto Cleanup**

- Delete entire folder on update
- Removes all old images (original + thumbnails)
- No orphaned files

✅ **Image Optimization**

- Uses Sharp library
- JPEG progressive encoding
- Maintains quality while reducing size

✅ **Filename Sanitization**

- Remove special characters
- Lowercase conversion
- URL-friendly names

## Troubleshooting

### Issue: Folder not created

**Solution:**

- Check permissions: `chmod 755 public/upload/images/products`
- Verify folder exists: `mkdir -p public/upload/images/products`

### Issue: Thumbnails not generated

**Solution:**

- Check Sharp installed: `npm list sharp`
- Check logs for errors
- Verify original image is valid

### Issue: Old images not deleted

**Solution:**

- Check path calculation in controller
- Verify folder permissions
- Check logs for deletion errors

### Issue: Image path wrong in database

**Solution:**

- Verify path splitting: `req.file.path.split("public")[1]`
- Check static file serving: `app.use('/upload', express.static('public/upload'))`
- Test URL: `http://localhost:3000/upload/images/products/{folder}/{file}`

## Future Enhancements

### 1. WebP Conversion

Generate WebP versions alongside JPG:

```javascript
await ImageProcessor.convert(req.file.path, "webp", { quality: 85 });
```

### 2. CDN Integration

Upload to AWS S3 / Cloudinary:

```javascript
if (process.env.USE_CDN === "true") {
  const cdnUrl = await uploadToCDN(req.file.path);
  default_image_url = cdnUrl;
}
```

### 3. Lazy Loading

Frontend optimization:

```jsx
<img
  src={getProductImage(product.image, "small")}
  data-src={getProductImage(product.image, "large")}
  loading="lazy"
/>
```

### 4. Image Compression

Add compression step:

```javascript
await ImageProcessor.optimize(req.file.path, null, {
  quality: 80,
  progressive: true,
  stripMetadata: true,
});
```

### 5. Multiple Images Gallery

Support multiple product images:

```javascript
// Upload multiple
uploadProductImages: multer().array('images', 6)

// Generate folder with numbered files
- puma-teamfinal-21-jersey/
  ├── 01-front.jpg (+ thumbnails)
  ├── 02-back.jpg (+ thumbnails)
  ├── 03-side.jpg (+ thumbnails)
  └── ...
```

## Summary

✅ **Implemented:**

- Custom upload middleware with folder structure
- Automatic thumbnail generation (4 sizes)
- Folder naming from product name
- Old image folder cleanup
- Path storage in database

🎯 **Result:**

- Organized file structure
- Optimized images for all use cases
- Easy to manage and maintain
- Bandwidth efficient

📝 **Next Steps:**

1. Test upload via frontend UI
2. Update frontend to use different image sizes
3. Add CDN support (optional)
4. Add multiple images gallery (future)
