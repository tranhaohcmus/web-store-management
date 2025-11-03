import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { formatPrice } from "../../utils/helpers";
import { fetchDashboardStats } from "../../store/slices/adminSlice";
import Loading from "../../components/Common/Loading";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dashboardStats, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (isLoading || !dashboardStats) {
    return <Loading />;
  }

  const {
    totalRevenue = 0,
    totalOrders = 0,
    totalProducts = 0,
    totalCustomers = 0,
    recentOrders = [],
    lowStockProducts = [],
  } = dashboardStats;

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-primary-600">
                {formatPrice(totalRevenue)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <DollarSign className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng đơn hàng</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng sản phẩm</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Khách hàng</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Đơn hàng gần đây</h2>
            <button
              onClick={() => navigate("/admin/orders")}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Xem tất cả →
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">#{order.order_number}</p>
                    <p className="text-sm text-gray-600">
                      {order.customer
                        ? `${order.customer.first_name} ${order.customer.last_name}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">
                      {formatPrice(order.total_amount)}
                    </p>
                    <span className="text-xs text-gray-500">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Chưa có đơn hàng nào</p>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center space-x-2 text-xl font-semibold">
              <AlertTriangle className="text-orange-500" size={20} />
              <span>Sản phẩm sắp hết</span>
            </h2>
            <button
              onClick={() => navigate("/admin/products")}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Xem tất cả →
            </button>
          </div>
          <div className="space-y-3">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 text-sm font-medium text-orange-600 bg-orange-100 rounded">
                      {product.stock || product.physical_stock} còn lại
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Tất cả sản phẩm đều còn đủ hàng
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Thao tác nhanh</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="p-4 text-center transition-colors border-2 border-dashed rounded-lg hover:bg-gray-50 hover:border-primary-500"
          >
            <Package className="mx-auto mb-2 text-gray-600" size={24} />
            <span className="text-sm font-medium">Quản lý sản phẩm</span>
          </button>
          <button
            onClick={() => navigate("/admin/orders")}
            className="p-4 text-center transition-colors border-2 border-dashed rounded-lg hover:bg-gray-50 hover:border-primary-500"
          >
            <ShoppingCart className="mx-auto mb-2 text-gray-600" size={24} />
            <span className="text-sm font-medium">Quản lý đơn hàng</span>
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="p-4 text-center transition-colors border-2 border-dashed rounded-lg hover:bg-gray-50 hover:border-primary-500"
          >
            <Users className="mx-auto mb-2 text-gray-600" size={24} />
            <span className="text-sm font-medium">Quản lý user</span>
          </button>
          <button
            onClick={() => navigate("/admin/brands")}
            className="p-4 text-center transition-colors border-2 border-dashed rounded-lg hover:bg-gray-50 hover:border-primary-500"
          >
            <TrendingUp className="mx-auto mb-2 text-gray-600" size={24} />
            <span className="text-sm font-medium">Quản lý thương hiệu</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
