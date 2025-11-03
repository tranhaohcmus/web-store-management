import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingCart,
  User,
  LogOut,
  Package,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { logout } from "../../store/slices/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { summary } = useSelector((state) => state.cart);

  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            E-Store
          </Link>

          {/* Search Bar - Hidden on Admin Routes */}
          {!isAdminRoute && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600">
                  <Search size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Right Menu */}
          <div className="flex items-center space-x-6">
            {/* Cart - Hidden on Admin Routes */}
            {!isAdminRoute && (
              <Link to="/cart" className="relative hover:text-primary-600">
                <ShoppingCart size={24} />
                {summary.item_count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {summary.item_count}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-primary-600">
                  <User size={24} />
                  <span className="hidden md:inline">{user?.first_name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-primary-600 font-medium"
                    >
                      <LayoutDashboard size={16} />
                      <span>Quản trị</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User size={16} />
                    <span>Tài khoản</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Package size={16} />
                    <span>Đơn hàng</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-primary-600">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn-primary">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Hidden on Admin Routes */}
        {!isAdminRoute && (
          <nav className="border-t py-3">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="hover:text-primary-600">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-600">
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
