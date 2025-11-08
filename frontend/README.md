# Frontend - E-Commerce Store Management# E-Commerce Frontend

Ứng dụng React cho hệ thống quản lý cửa hàng thương mại điện tử.Frontend application built with React + Vite + Redux Toolkit for the E-Commerce system.

## 📋 Nội Dung## 🚀 Tech Stack

- [Yêu Cầu](#yêu-cầu)- **React 18** - UI Library

- [Cài Đặt](#cài-đặt)- **Vite** - Build tool & Dev server

- [Cấu Hình](#cấu-hình)- **Redux Toolkit** - State management

- [Chạy Ứng Dụng](#chạy-ứng-dụng)- **React Router** - Routing

- [Build Production](#build-production)- **Axios** - HTTP client

- [Tính Năng](#tính-năng)- **Tailwind CSS** - Styling

- [Cấu Trúc](#cấu-trúc)- **Lucide React** - Icons

- **React Hot Toast** - Notifications

## Yêu Cầu

## 📁 Project Structure

- **Node.js** >= 18.0.0

- **npm** >= 9.0.0```

- Backend API đang chạy tại `http://localhost:3000`src/

├── components/ # Reusable components

## Cài Đặt│ ├── Auth/ # Authentication components

│ ├── Common/ # Common UI components (Button, Input, etc.)

### 1. Cài đặt dependencies│ ├── Layout/ # Layout components (Header, Footer)

│ └── Product/ # Product-related components

```````bash├── pages/              # Page components

npm install│   ├── Auth/           # Login, Register

```│   ├── Cart/           # Shopping cart

│   ├── Checkout/       # Checkout flow

### 2. Tạo file .env│   ├── Orders/         # Order list & detail

│   ├── Products/       # Product list & detail

Sao chép file `.env.example` và đổi tên thành `.env`:│   └── User/           # User profile

├── services/           # API services

```bash│   ├── api.js          # Axios instance with interceptors

cp .env.example .env│   ├── authService.js

```│   ├── productService.js

│   ├── cartService.js

### 3. Chỉnh sửa file .env│   ├── orderService.js

│   ├── addressService.js

```env│   ├── brandService.js

VITE_API_BASE_URL=http://localhost:3000/api/v1│   └── categoryService.js

```├── store/              # Redux store

│   ├── store.js        # Store configuration

**Lưu ý:** Nếu backend chạy ở port khác, hãy thay đổi URL cho phù hợp.│   └── slices/         # Redux slices

│       ├── authSlice.js

## Cấu Hình│       ├── productSlice.js

│       ├── cartSlice.js

### Environment Variables│       ├── orderSlice.js

│       ├── addressSlice.js

File `.env` chứa các biến môi trường:│       ├── brandSlice.js

│       └── categorySlice.js

```env├── utils/              # Utility functions

# Backend API URL│   └── helpers.js      # Helper functions

VITE_API_BASE_URL=http://localhost:3000/api/v1├── App.jsx             # Main app component with routes

```├── main.jsx            # App entry point

└── index.css           # Global styles

## Chạy Ứng Dụng```



### Development Mode## 🔧 Setup Instructions



```bash### 1. Install Dependencies

npm run dev

``````bash

npm install

Ứng dụng sẽ chạy tại: **http://localhost:5173**```



Vite sẽ tự động reload khi có thay đổi code.### 2. Environment Variables



### Build ProductionCreate a `.env` file in the root directory:



Build ứng dụng cho production:```env

VITE_API_URL=http://localhost:3000/api/v1

```bash```

npm run build

```### 3. Run Development Server



Build files sẽ được tạo trong thư mục `dist/````bash

npm run dev

### Preview Production Build```



Xem trước build production:The app will be available at `http://localhost:5173`



```bash### 4. Build for Production

npm run preview

``````bash

npm run build

### Lint Code```



Kiểm tra code với ESLint:### 5. Preview Production Build



```bash```bash

npm run lintnpm run preview

```````

## Tính Năng## 🎯 Features

### Khách Hàng### Authentication

- 🏠 **Trang Chủ:** Hero section, featured products- ✅ User registration

- 🛍️ **Sản Phẩm:** Danh sách, filter, search, chi tiết- ✅ User login

- 🛒 **Giỏ Hàng:** Thêm/xóa/cập nhật, checkout- ✅ JWT token management with auto-refresh

- 📦 **Đơn Hàng:** Lịch sử, tracking, hủy đơn- ✅ Protected routes

- 👤 **Tài Khoản:** Đăng ký/đăng nhập, quản lý profile- ✅ User profile management

### Quản Trị Viên### Products

- 📊 **Dashboard:** Thống kê tổng quan- ✅ Product listing with filters (category, brand, search, sort)

- 📦 **Quản Lý Sản Phẩm:** CRUD, upload ảnh, variants- ✅ Product detail with variant selection

- 📋 **Quản Lý Đơn Hàng:** Xem, cập nhật trạng thái- ✅ Pagination

- 👥 **Quản Lý User:** Danh sách, thay đổi role- ✅ Product images

- ✅ Price & promotion display

## Cấu Trúc

### Shopping Cart

````

frontend/- ✅ Add to cart

├── src/- ✅ Update quantity

│   ├── components/          # React components- ✅ Remove items

│   │   ├── Admin/          # Admin components- ✅ Cart summary

│   │   ├── Auth/           # Auth components- ✅ Stock validation

│   │   ├── Common/         # Shared components

│   │   ├── Layout/         # Layout components### Checkout

│   │   └── Products/       # Product components

│   ├── pages/              # Page components- ✅ Address management (create, edit, delete, set default)

│   │   ├── Admin/          # Admin pages- ✅ Order summary

│   │   ├── Auth/           # Auth pages- ✅ Customer notes

│   │   ├── Cart/           # Cart page- ✅ Order placement

│   │   ├── Home/           # Home page

│   │   ├── Orders/         # Order pages### Orders

│   │   └── Products/       # Product pages

│   ├── redux/              # Redux store- ✅ Order history

│   ├── services/           # API services- ✅ Order details

│   ├── lib/                # React Query config- ✅ Order status tracking

│   ├── App.jsx             # Main App- ✅ Cancel order

│   └── main.jsx            # Entry point

├── .env                    # Environment config### UI/UX

└── package.json

```- ✅ Responsive design (mobile, tablet, desktop)

- ✅ Loading states

## 🎨 Styling- ✅ Error handling

- ✅ Toast notifications

Sử dụng **Tailwind CSS** cho styling.- ✅ Clean and modern design with Tailwind CSS



## 🔄 State Management## 🔐 API Integration



- **Redux Toolkit:** Authentication, CartThe app connects to the backend API running at `http://localhost:3000/api/v1`

- **React Query:** Products, Orders, Categories

### Authentication Flow

## 🛡️ Route Protection

1. User logs in → Receives `accessToken` and `refreshToken`

- **PublicRoute:** Chỉ customer/chưa đăng nhập2. `accessToken` stored in localStorage and sent with each request

- **AdminRoute:** Chỉ admin3. When `accessToken` expires (401 error) → Auto refresh using `refreshToken`

- **CustomerRoute:** Chỉ customer4. If refresh fails → Redirect to login

- **PrivateRoute:** Yêu cầu đăng nhập

### API Services

## 📱 Responsive Design

All API calls are centralized in the `services/` directory:

Responsive cho mobile, tablet, desktop.

- `authService.js` - Authentication endpoints

## 🔧 Troubleshooting- `productService.js` - Product operations

- `cartService.js` - Cart management

### Không kết nối Backend- `orderService.js` - Order operations

- `addressService.js` - Address CRUD

- Kiểm tra backend đang chạy- `brandService.js` - Brand data

- Kiểm tra CORS config trong backend- `categoryService.js` - Category data

- Kiểm tra URL trong `.env`

## 🎨 Styling

### Lỗi 401 Unauthorized

The app uses **Tailwind CSS** for styling with custom utilities:

- Token đã hết hạn, đăng nhập lại

### Custom Classes

## 📝 Tài Khoản Test

- `.btn-primary` - Primary button style

**Admin:**- `.btn-secondary` - Secondary button style

- Email: admin@example.com- `.btn-outline` - Outline button style

- Password: admin123- `.input-field` - Input field style

- `.card` - Card container style

**Customer:**

- Email: customer@example.com### Color Scheme

- Password: customer123

Primary color: Blue (`primary-600`)

Xem `README.md` ở thư mục gốc để biết thêm chi tiết.

- Can be customized in `tailwind.config.js`

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔄 State Management

Redux Toolkit is used for global state management:

### Slices

- **authSlice**: User authentication & profile
- **productSlice**: Products, filtering, pagination
- **cartSlice**: Shopping cart items & summary
- **orderSlice**: Orders & order details
- **addressSlice**: User addresses
- **brandSlice**: Product brands
- **categorySlice**: Product categories

### Usage Example

```javascript
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";

function MyComponent() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 20 }));
  }, [dispatch]);

  // ...
}
````

## 🛣️ Routes

### Public Routes

- `/` - Home page
- `/products` - Product listing
- `/products/:id` - Product detail
- `/cart` - Shopping cart
- `/login` - Login page
- `/register` - Register page

### Protected Routes (require authentication)

- `/profile` - User profile
- `/checkout` - Checkout page
- `/orders` - Order history
- `/orders/:id` - Order detail

## 🚨 Error Handling

- API errors are caught and displayed using toast notifications
- Form validation with inline error messages
- Loading states for async operations
- Fallback UI for missing data

## 🎯 Best Practices

1. **Component Organization**: Components are organized by feature
2. **Reusability**: Common components in `components/Common/`
3. **API Centralization**: All API calls in `services/`
4. **State Management**: Redux for global state, local state for UI
5. **Error Handling**: Comprehensive error handling
6. **Code Splitting**: Lazy loading with React.lazy (future improvement)
7. **Performance**: Memoization with useMemo/useCallback where needed

## 📦 Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 🔮 Future Improvements

- [ ] Add search functionality with debounce
- [ ] Implement lazy loading for images
- [ ] Add product reviews & ratings
- [ ] Wishlist feature
- [ ] Order tracking with timeline
- [ ] Payment gateway integration
- [ ] Social login (Google, Facebook)
- [ ] Dark mode
- [ ] PWA support
- [ ] Admin panel
- [ ] Real-time notifications with WebSocket

## 📄 License

This project is private and confidential.

## 👥 Contributors

- Your Name

---

**Made with ❤️ using React + Vite + Redux**
