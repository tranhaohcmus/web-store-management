# E-Commerce Frontend

Frontend application built with React + Vite + Redux Toolkit for the E-Commerce system.

## 🚀 Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool & Dev server
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Auth/           # Authentication components
│   ├── Common/         # Common UI components (Button, Input, etc.)
│   ├── Layout/         # Layout components (Header, Footer)
│   └── Product/        # Product-related components
├── pages/              # Page components
│   ├── Auth/           # Login, Register
│   ├── Cart/           # Shopping cart
│   ├── Checkout/       # Checkout flow
│   ├── Orders/         # Order list & detail
│   ├── Products/       # Product list & detail
│   └── User/           # User profile
├── services/           # API services
│   ├── api.js          # Axios instance with interceptors
│   ├── authService.js
│   ├── productService.js
│   ├── cartService.js
│   ├── orderService.js
│   ├── addressService.js
│   ├── brandService.js
│   └── categoryService.js
├── store/              # Redux store
│   ├── store.js        # Store configuration
│   └── slices/         # Redux slices
│       ├── authSlice.js
│       ├── productSlice.js
│       ├── cartSlice.js
│       ├── orderSlice.js
│       ├── addressSlice.js
│       ├── brandSlice.js
│       └── categorySlice.js
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions
├── App.jsx             # Main app component with routes
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 🎯 Features

### Authentication

- ✅ User registration
- ✅ User login
- ✅ JWT token management with auto-refresh
- ✅ Protected routes
- ✅ User profile management

### Products

- ✅ Product listing with filters (category, brand, search, sort)
- ✅ Product detail with variant selection
- ✅ Pagination
- ✅ Product images
- ✅ Price & promotion display

### Shopping Cart

- ✅ Add to cart
- ✅ Update quantity
- ✅ Remove items
- ✅ Cart summary
- ✅ Stock validation

### Checkout

- ✅ Address management (create, edit, delete, set default)
- ✅ Order summary
- ✅ Customer notes
- ✅ Order placement

### Orders

- ✅ Order history
- ✅ Order details
- ✅ Order status tracking
- ✅ Cancel order

### UI/UX

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Clean and modern design with Tailwind CSS

## 🔐 API Integration

The app connects to the backend API running at `http://localhost:3000/api/v1`

### Authentication Flow

1. User logs in → Receives `accessToken` and `refreshToken`
2. `accessToken` stored in localStorage and sent with each request
3. When `accessToken` expires (401 error) → Auto refresh using `refreshToken`
4. If refresh fails → Redirect to login

### API Services

All API calls are centralized in the `services/` directory:

- `authService.js` - Authentication endpoints
- `productService.js` - Product operations
- `cartService.js` - Cart management
- `orderService.js` - Order operations
- `addressService.js` - Address CRUD
- `brandService.js` - Brand data
- `categoryService.js` - Category data

## 🎨 Styling

The app uses **Tailwind CSS** for styling with custom utilities:

### Custom Classes

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-outline` - Outline button style
- `.input-field` - Input field style
- `.card` - Card container style

### Color Scheme

Primary color: Blue (`primary-600`)

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
```

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
