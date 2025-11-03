import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Phone, User, Package, ArrowLeft } from "lucide-react";
import { formatPrice, formatDate, getOrderStatus } from "../../utils/helpers";
import {
  fetchAdminOrderById,
  updateOrderStatus,
} from "../../store/slices/adminSlice";
import Loading from "../../components/Common/Loading";
import Button from "../../components/Common/Button";

function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentOrder: order, isLoading } = useSelector(
    (state) => state.admin
  );

  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    dispatch(fetchAdminOrderById(id));
  }, [dispatch, id]);

  const handleUpdateStatus = async () => {
    if (!newStatus) {
      alert("Vui lòng chọn trạng thái mới");
      return;
    }

    await dispatch(updateOrderStatus({ id, status: newStatus }));
    setNewStatus("");
    // Refresh order data
    dispatch(fetchAdminOrderById(id));
  };

  if (isLoading) return <Loading />;

  if (!order) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <p className="text-gray-600">Không tìm thấy đơn hàng</p>
      </div>
    );
  }

  const status = getOrderStatus(order.status);
  const shippingAddress = [
    order.shipping_street,
    order.shipping_ward,
    order.shipping_district,
    order.shipping_city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center mb-6 space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Quay lại danh sách</span>
        </button>

        {/* Header */}
        <div className="mb-6 card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                Đơn hàng #{order.order_number}
              </h1>
              <p className="mt-1 text-gray-600">
                {formatDate(order.created_at)}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${status.color}`}
            >
              {status.text}
            </span>
          </div>

          {/* Update Status */}
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-3 font-semibold">Cập nhật trạng thái</h3>
            <div className="flex gap-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">-- Chọn trạng thái --</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <Button onClick={handleUpdateStatus} disabled={isLoading}>
                {isLoading ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Customer Info */}
          <div className="card">
            <h2 className="mb-4 text-xl font-semibold">Thông tin khách hàng</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-gray-600" />
                <span>
                  {order.customer.first_name} {order.customer.last_name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-600" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">📧</span>
                <span>{order.customer.email}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card">
            <h2 className="flex items-center mb-4 space-x-2 text-xl font-semibold">
              <MapPin size={24} />
              <span>Địa chỉ giao hàng</span>
            </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-gray-600" />
                <span>{order.shipping_recipient_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-600" />
                <span>{order.shipping_recipient_phone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 text-gray-600" />
                <span>{shippingAddress}</span>
              </div>
            </div>
            {order.customer_note && (
              <div className="p-3 mt-4 rounded-lg bg-yellow-50">
                <p className="text-sm font-medium text-yellow-800">Ghi chú:</p>
                <p className="text-sm text-yellow-700">{order.customer_note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6 card">
          <h2 className="flex items-center mb-4 space-x-2 text-xl font-semibold">
            <Package size={24} />
            <span>Sản phẩm đã đặt</span>
          </h2>
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={item.variant_snapshot?.image_url || "/placeholder.png"}
                  alt={item.variant_snapshot?.product_name || "Product"}
                  className="object-cover w-20 h-20 rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">
                    {item.variant_snapshot?.product_name || "Sản phẩm"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    SKU: {item.variant_snapshot?.sku}
                  </p>
                  <p className="text-sm text-gray-600">x{item.quantity}</p>
                  <p className="mt-1 font-bold text-primary-600">
                    {formatPrice(item.unit_price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 card">
          <h2 className="mb-4 text-xl font-semibold">Tổng đơn hàng</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tạm tính:</span>
              <span className="font-medium">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phí vận chuyển:</span>
              <span className="font-medium">
                {formatPrice(order.shipping_fee)}
              </span>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between text-xl">
                <span className="font-semibold">Tổng cộng:</span>
                <span className="font-bold text-primary-600">
                  {formatPrice(order.total_amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t">
            <p className="text-sm text-gray-600">
              Phương thức thanh toán:{" "}
              <span className="font-medium text-gray-900">
                {order.payment_method === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : "Chuyển khoản"}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Trạng thái thanh toán:{" "}
              <span
                className={`font-medium ${
                  order.payment_status === "paid"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {order.payment_status === "paid"
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetail;
