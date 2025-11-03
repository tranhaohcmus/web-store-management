import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminRoute from "./components/Auth/AdminRoute";
import CustomerRoute from "./components/Auth/CustomerRoute";
import PublicRoute from "./components/Auth/PublicRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";
import ProductList from "./pages/Products/ProductList";
import ProductDetail from "./pages/Products/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import OrderDetail from "./pages/Orders/OrderDetail";
import NotFound from "./pages/NotFound";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminOrderDetail from "./pages/Admin/AdminOrderDetail";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import CreateProduct from "./pages/Admin/CreateProduct";
import ProductFormNew from "./pages/Admin/ProductFormNew";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes - Admin will be redirected to /admin */}
        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="cart" element={<Cart />} />

        {/* Customer Protected Routes - Admin sẽ bị redirect sang /admin */}
        <Route element={<CustomerRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
        </Route>

        {/* Admin Routes - Chỉ admin mới vào được */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<Dashboard />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/orders/:id" element={<AdminOrderDetail />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/products/new" element={<CreateProduct />} />
          <Route path="admin/products/:id" element={<AdminProductDetail />} />
          <Route path="admin/products/:id/edit" element={<ProductFormNew />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
