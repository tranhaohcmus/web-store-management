import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../store/slices/orderSlice";
import Loading from "../../components/Common/Loading";
import { formatPrice, formatDate, getOrderStatus } from "../../utils/helpers";
import { Package } from "lucide-react";

function Orders() {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders({}));
  }, [dispatch]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <Package size={64} className="mx-auto mb-4 text-red-400" />
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Lỗi tải đơn hàng
        </h2>
        <p className="mb-6 text-gray-600">{error}</p>
        <button
          onClick={() => dispatch(fetchOrders({}))}
          className="btn-primary"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <Package size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="mb-4 text-2xl font-bold">Chưa có đơn hàng nào</h2>
        <p className="mb-6 text-gray-600">
          Hãy mua sắm ngay để trải nghiệm dịch vụ tuyệt vời
        </p>
        <Link to="/products" className="btn-primary">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Đơn hàng của tôi</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          if (!order || !order.id) return null;

          const status = getOrderStatus(order.status);

          return (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block transition-shadow card hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Đơn hàng #{order.order_number || order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {order.created_at
                      ? formatDate(order.created_at)
                      : formatDate(order.order_date)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                >
                  {status.text}
                </span>
              </div>

              <div className="flex items-center mb-4 space-x-4">
                {order.items &&
                  Array.isArray(order.items) &&
                  order.items.slice(0, 3).map((item, index) => (
                    <img
                      key={index}
                      src={
                        item?.variant_snapshot?.image_url ||
                        item?.variant?.image_url ||
                        "/placeholder.png"
                      }
                      alt={item?.variant_snapshot?.product_name || "Product"}
                      className="object-cover w-16 h-16 rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/64?text=No+Image";
                      }}
                    />
                  ))}
                {order.items && order.items.length > 3 && (
                  <div className="flex items-center justify-center w-16 h-16 text-sm text-gray-600 bg-gray-100 rounded-lg">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-gray-600">
                  {order.items?.length || 0} sản phẩm
                </span>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tổng tiền:</p>
                  <p className="text-xl font-bold text-primary-600">
                    {formatPrice(order.total_amount)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
