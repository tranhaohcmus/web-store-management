# Admin Product Management System

## Ngày: 2024-11-03

## Tổng Quan

Hệ thống quản lý sản phẩm cho admin với đầy đủ chức năng CRUD (Create, Read, Update, Delete) và upload ảnh sản phẩm.

## Features Implemented

### ✅ Backend

1. **Admin Product Controller** (`controllers/adminProduct.controller.js`)

   - Get all products với filters
   - Get product by ID (chi tiết đầy đủ)
   - Create new product với image upload
   - Update product với image upload
   - Soft delete product
   - Manage product variants (CRUD)

2. **Routes** (`routers/admin.router.js`)

   ```
   GET    /api/v1/admin/products              - List products
   POST   /api/v1/admin/products              - Create product
   GET    /api/v1/admin/products/:id          - Get product detail
   PUT    /api/v1/admin/products/:id          - Update product
   DELETE /api/v1/admin/products/:id          - Delete product

   POST   /api/v1/admin/products/:id/variants           - Add variant
   PUT    /api/v1/admin/products/:productId/variants/:variantId  - Update variant
   DELETE /api/v1/admin/products/:productId/variants/:variantId  - Delete variant
   ```

3. **Upload Middleware**
   - Uses existing `uploadProductImage` middleware
   - Images saved to: `public/upload/images/products/`
   - Max file size: 5MB
   - Allowed formats: JPEG, JPG, PNG
   - Auto cleanup on image replacement

### ✅ Frontend

1. **Admin Products List** (`pages/Admin/AdminProducts.jsx`)

   - Product table with image thumbnails
   - Filters: Search, Category, Brand, Status
   - Pagination support
   - Quick actions: View, Edit, Delete
   - Product statistics: Variants count, Price range, Stock

2. **Product Form** (`pages/Admin/ProductForm.jsx`)

   - Create new product
   - Edit existing product
   - Image upload with preview
   - Image replacement with old image cleanup
   - Form validation
   - Drag & drop image upload

3. **Redux State Management** (`store/slices/adminProductSlice.js`)

   - Async thunks for all CRUD operations
   - Loading states
   - Error handling with toast notifications
   - Pagination state

4. **Routes** (`App.jsx`)
   ```
   /admin/products           - Products list
   /admin/products/new       - Create product
   /admin/products/:id/edit  - Edit product
   ```

## API Endpoints

### 1. Get All Products (Admin)

**Endpoint**: `GET /api/v1/admin/products`

**Query Parameters**:

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `search` (string): Search by product name
- `category` (number): Filter by category ID
- `brand` (number): Filter by brand ID
- `status` (string): Filter by status (published/draft/inactive)
- `product_type` (number): Filter by product type ID
- `sort` (string): Sort field (default: created_at)
- `order` (string): Sort order (asc/desc, default: desc)

**Response**:

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Nike Mercurial Superfly 9 Elite",
      "description": "...",
      "default_image_url": "/upload/images/products/xxx.jpg",
      "status": "published",
      "brand": { "id": 1, "name": "Nike" },
      "category": { "id": 4, "name": "Giày đá bóng" },
      "productType": { "id": 1, "name": "Giày Đá Bóng" },
      "variants": [
        {
          "id": 1,
          "sku": "NIKE-MERC9-39-FG-BLU",
          "price": "5500000.00",
          "promotion_price": "5200000.00",
          "physical_stock": 30,
          "status": "active"
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 30,
    "totalPages": 2
  }
}
```

### 2. Get Product Detail (Admin)

**Endpoint**: `GET /api/v1/admin/products/:id`

**Response**: Includes full product data with all associations (brand, category, productType, variants with attributes)

### 3. Create Product

**Endpoint**: `POST /api/v1/admin/products`

**Content-Type**: `multipart/form-data`

**Body**:

```javascript
{
  name: "Product Name",              // Required
  description: "Description",        // Optional
  product_type_id: 1,               // Required
  brand_id: 1,                      // Required
  category_id: 4,                   // Required
  status: "draft",                  // Optional (draft/published/inactive)
  image: File,                      // Required - Product image file
  variants: [                       // Optional - Can add later
    {
      sku: "XXX-YYY-ZZZ",
      price: 1000000,
      promotion_price: 900000,
      physical_stock: 50
    }
  ]
}
```

**Response**:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    /* Created product with all associations */
  }
}
```

### 4. Update Product

**Endpoint**: `PUT /api/v1/admin/products/:id`

**Content-Type**: `multipart/form-data`

**Body**: Same as Create, all fields optional except those you want to update

**Note**: If new image is uploaded, old image is automatically deleted

### 5. Delete Product

**Endpoint**: `DELETE /api/v1/admin/products/:id`

**Behavior**: Soft delete (sets status to "inactive")

**Response**:

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Frontend Components

### AdminProducts Component

**Location**: `src/pages/Admin/AdminProducts.jsx`

**Features**:

- Product listing with table view
- Image thumbnails (12x12 grid)
- Real-time filters (search, category, brand, status)
- Pagination
- Price range calculation from variants
- Total stock calculation
- Status badges (color-coded)
- Quick actions: View, Edit, Delete

**State Management**:

```javascript
const { products, isLoading, pagination } = useSelector(
  (state) => state.adminProducts
);
```

**Filters**:

- Search by name
- Filter by category (dropdown)
- Filter by brand (dropdown)
- Filter by status (dropdown)
- Clear all filters button

### ProductForm Component

**Location**: `src/pages/Admin/ProductForm.jsx`

**Modes**:

1. **Create Mode**: `/admin/products/new`
2. **Edit Mode**: `/admin/products/:id/edit`

**Features**:

- Form validation
- Image upload with preview
- Drag & drop image support
- Image size validation (max 5MB)
- Image format validation (JPG, JPEG, PNG)
- Remove uploaded image
- Replace existing image
- Auto-populate form in edit mode
- Toast notifications on success/error

**Form Fields**:

- Product Name\* (required)
- Description (textarea)
- Brand\* (dropdown from brands API)
- Category\* (dropdown from categories API)
- Product Type (dropdown - hardcoded 5 types)
- Status (dropdown: draft/published/inactive)
- Product Image\* (file upload - required for create)

**Validation**:

```javascript
- Product name: Required, not empty
- Brand: Required
- Category: Required
- Image (create mode): Required
- Image size: Max 5MB
- Image format: JPG, JPEG, PNG
```

## Redux State

### adminProductSlice

**Location**: `src/store/slices/adminProductSlice.js`

**State**:

```javascript
{
  products: [],              // Array of products
  currentProduct: null,      // Single product for detail/edit
  isLoading: false,          // Loading state
  error: null,               // Error message
  pagination: {              // Pagination metadata
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  }
}
```

**Async Thunks**:

- `fetchAdminProducts(params)` - Get all products
- `fetchAdminProductById(id)` - Get product detail
- `createAdminProduct(formData)` - Create product
- `updateAdminProduct({ id, formData })` - Update product
- `deleteAdminProduct(id)` - Delete product
- `addProductVariant({ productId, formData })` - Add variant
- `updateProductVariant({ productId, variantId, formData })` - Update variant
- `deleteProductVariant({ productId, variantId })` - Delete variant

**Actions**:

- `clearCurrentProduct()` - Clear current product state
- `clearError()` - Clear error state

## File Structure

```
backend/
├── controllers/
│   └── adminProduct.controller.js    ✅ NEW
├── routers/
│   └── admin.router.js                ✅ UPDATED (added product routes)
├── middlewares/
│   └── uploads/
│       └── index.js                   ✅ EXISTING (uploadProductImage)
└── public/
    └── upload/
        └── images/
            └── products/              ✅ Image storage folder

frontend/
├── src/
│   ├── pages/
│   │   └── Admin/
│   │       ├── AdminProducts.jsx      ✅ NEW
│   │       └── ProductForm.jsx        ✅ NEW
│   ├── services/
│   │   └── adminService.js            ✅ UPDATED
│   ├── store/
│   │   ├── slices/
│   │   │   └── adminProductSlice.js   ✅ NEW
│   │   └── store.js                   ✅ UPDATED
│   └── App.jsx                        ✅ UPDATED (added routes)
```

## Image Upload Flow

### Create Product Flow

1. User selects image file
2. Frontend validates:
   - File size < 5MB
   - Format: JPG, JPEG, PNG
3. Image preview shown
4. On submit:
   - FormData created with product data + image
   - POST to `/api/v1/admin/products`
5. Backend:
   - `uploadProductImage` middleware processes upload
   - Saves to `public/upload/images/products/`
   - Returns relative path: `/upload/images/products/filename.jpg`
6. Controller:
   - Saves product with `default_image_url`
   - Creates variants (if provided)
7. Response:
   - Returns created product
   - Frontend shows success toast
   - Redirects to products list

### Update Product Flow

1. User clicks "Edit" on product
2. Frontend:
   - Fetches product detail
   - Populates form
   - Shows existing image
3. User can:
   - Keep existing image (don't upload new)
   - Replace image (upload new file)
4. On submit with new image:
   - FormData with product data + new image
   - PUT to `/api/v1/admin/products/:id`
5. Backend:
   - New image uploaded
   - **Old image deleted** from filesystem
   - Product updated with new image URL
6. Response:
   - Returns updated product
   - Frontend updates state
   - Shows success toast

### Image Path Handling

**Backend Storage**:

```
/public/upload/images/products/1730627383847-nike-shoe.jpg
```

**Database Storage**:

```
/upload/images/products/1730627383847-nike-shoe.jpg
```

**Frontend Display**:

```jsx
<img src={`http://localhost:3000${product.default_image_url}`} />
// Result: http://localhost:3000/upload/images/products/1730627383847-nike-shoe.jpg
```

**Static File Serving** (backend):

```javascript
app.use("/upload", express.static(path.join(__dirname, "public/upload")));
```

## Usage Examples

### 1. Create Product via Admin Panel

1. Login as admin: `admin@example.com / 123456`
2. Navigate to: `/admin/products`
3. Click "Add Product"
4. Fill form:
   - Name: "Nike Air Max 90"
   - Description: "Classic sneaker..."
   - Brand: Nike
   - Category: Giày đá bóng
   - Upload image
   - Status: Published
5. Click "Create Product"
6. Redirected to products list
7. New product appears in table

### 2. Edit Product

1. In products list, click Edit icon (pencil)
2. Form pre-populated with product data
3. Modify fields:
   - Change name
   - Upload new image (old deleted automatically)
   - Change status
4. Click "Update Product"
5. Product updated in list

### 3. Delete Product

1. Click Delete icon (trash)
2. Confirm dialog appears
3. Click OK
4. Product status set to "inactive"
5. Product removed from list (filtered out)

### 4. Filter Products

1. Use search box: Type "Nike"
2. Select category: "Áo đấu"
3. Select brand: "Adidas"
4. Select status: "Published"
5. Results update in real-time
6. Click "Clear Filters" to reset

## Testing

### Backend Tests

```bash
# Get admin token
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}' \
  | jq -r '.data.accessToken')

# Get all products
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/v1/admin/products?limit=10

# Get product by ID
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/v1/admin/products/1

# Create product (with image)
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Test Product" \
  -F "description=Test description" \
  -F "product_type_id=1" \
  -F "brand_id=1" \
  -F "category_id=4" \
  -F "status=draft" \
  -F "image=@/path/to/image.jpg" \
  http://localhost:3000/api/v1/admin/products

# Update product
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Updated Name" \
  -F "status=published" \
  -F "image=@/path/to/new-image.jpg" \
  http://localhost:3000/api/v1/admin/products/1

# Delete product
curl -X DELETE \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/v1/admin/products/1
```

### Frontend Tests

1. **Products List**: `http://localhost:5173/admin/products`

   - ✅ Table displays all products
   - ✅ Images load correctly
   - ✅ Filters work
   - ✅ Pagination works
   - ✅ Actions (view/edit/delete) work

2. **Create Product**: `http://localhost:5173/admin/products/new`

   - ✅ Form renders
   - ✅ Image upload works
   - ✅ Image preview shows
   - ✅ Validation works
   - ✅ Submit creates product
   - ✅ Redirect after success

3. **Edit Product**: `http://localhost:5173/admin/products/1/edit`
   - ✅ Form pre-populated
   - ✅ Existing image shows
   - ✅ Can replace image
   - ✅ Update works
   - ✅ Redirect after success

## Security Features

1. **Authentication**: All routes require admin JWT token
2. **Authorization**: Only admin role can access
3. **File Validation**:
   - File size limit: 5MB
   - Allowed formats: JPEG, JPG, PNG
   - MIME type validation
4. **Path Traversal Protection**: Filenames sanitized
5. **XSS Protection**: Input sanitization
6. **CSRF Protection**: Token-based auth

## Future Enhancements

### Planned Features

- [ ] **Bulk Upload**: Upload multiple products via CSV/Excel
- [ ] **Multiple Images**: Add gallery for product (4-6 images)
- [ ] **Variant Images**: Different image per variant (color-specific)
- [ ] **Image Cropping**: Built-in image editor
- [ ] **SEO Fields**: Meta title, description, keywords
- [ ] **Product Duplication**: Clone existing product
- [ ] **Batch Actions**: Bulk status update, delete
- [ ] **Product History**: Track all changes
- [ ] **Advanced Filters**: Price range, stock level, date range
- [ ] **Export**: Export products to CSV/PDF
- [ ] **Product Analytics**: Views, conversion rate

### Technical Improvements

- [ ] **Image Optimization**: Auto-resize/compress on upload
- [ ] **CDN Integration**: Upload to cloud storage (AWS S3, Cloudinary)
- [ ] **Caching**: Redis cache for product lists
- [ ] **Search**: Elasticsearch integration
- [ ] **Validation**: More robust backend validation (Joi/Yup)
- [ ] **Tests**: Unit & integration tests
- [ ] **Documentation**: Swagger/OpenAPI spec

## Troubleshooting

### Image not displaying

**Problem**: Image shows broken icon

**Solutions**:

1. Check image path in database matches file location
2. Verify static file middleware configured: `app.use('/upload', express.static('public/upload'))`
3. Check image URL: `http://localhost:3000/upload/images/products/filename.jpg`
4. Verify file exists: `ls public/upload/images/products/`

### Upload fails

**Problem**: Error uploading image

**Solutions**:

1. Check folder exists: `mkdir -p public/upload/images/products`
2. Check folder permissions: `chmod 755 public/upload/images/products`
3. Check file size < 5MB
4. Check file format (JPG, JPEG, PNG)

### Old image not deleted

**Problem**: Disk fills with old images

**Solution**: Image cleanup is automatic in controller. Check:

```javascript
if (product.default_image_url) {
  const oldImagePath = path.join(
    __dirname,
    "../public",
    product.default_image_url
  );
  await fs.unlink(oldImagePath);
}
```

## Summary

✅ **Complete admin product management system implemented**:

- CRUD operations for products
- Image upload & management
- Product variants support
- Filters & pagination
- Form validation
- Error handling
- Toast notifications
- Responsive design

🎯 **Ready for production use with**:

- 30 existing products seeded
- Full authentication & authorization
- Image storage configured
- Frontend & backend integrated
- User-friendly interface

📊 **Statistics**:

- Backend files: 2 (controller + routes)
- Frontend files: 4 (pages + service + slice + routes)
- API endpoints: 8
- Features: 10+
