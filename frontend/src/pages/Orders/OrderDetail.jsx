import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, cancelOrder } from "../../store/slices/orderSlice";
import Loading from "../../components/Common/Loading";
import Button from "../../components/Common/Button";
import { formatPrice, formatDate, getOrderStatus } from "../../utils/helpers";
import { MapPin, Phone, User, Package } from "lucide-react";

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, isLoading } = useSelector(
    (state) => state.orders
  );
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelForm, setShowCancelForm] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      alert("Vui lòng nhập lý do hủy đơn");
      return;
    }

    const result = await dispatch(
      cancelOrder({ id: order.id, reason: cancelReason })
    );
    if (!result.error) {
      setShowCancelForm(false);
      setCancelReason("");
      dispatch(fetchOrderById(id));
    }
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
  const canCancel = ["pending", "processing"].includes(order.status);

  // Build full shipping address from order fields - with null checks
  const shippingAddress =
    [
      order.shipping_street,
      order.shipping_ward,
      order.shipping_district,
      order.shipping_city,
    ]
      .filter(Boolean)
      .join(", ") || "N/A";

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                Đơn hàng #{order.order_number || order.id}
              </h1>
              <p className="mt-1 text-gray-600">
                {order.created_at
                  ? formatDate(order.created_at)
                  : formatDate(order.order_date)}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${status.color}`}
            >
              {status.text}
            </span>
          </div>

          {canCancel && !showCancelForm && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowCancelForm(true)}
            >
              Hủy đơn hàng
            </Button>
          )}

          {showCancelForm && (
            <div className="p-4 mt-4 rounded-lg bg-red-50">
              <p className="mb-2 font-medium">Lý do hủy đơn:</p>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Nhập lý do hủy đơn hàng..."
              />
              <div className="flex space-x-3">
                <Button size="sm" variant="danger" onClick={handleCancelOrder}>
                  Xác nhận hủy
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setShowCancelForm(false);
                    setCancelReason("");
                  }}
                >
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Address */}
        <div className="mb-6 card">
          <h2 className="flex items-center mb-4 space-x-2 text-xl font-semibold">
            <MapPin size={24} />
            <span>Địa chỉ giao hàng</span>
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User size={16} className="text-gray-600" />
              <span>{order.shipping_recipient_name || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-gray-600" />
              <span>{order.shipping_recipient_phone || "N/A"}</span>
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

        {/* Order Items */}
        <div className="mb-6 card">
          <h2 className="flex items-center mb-4 space-x-2 text-xl font-semibold">
            <Package size={24} />
            <span>Sản phẩm đã đặt</span>
          </h2>
          <div className="space-y-4">
            {order.items &&
              Array.isArray(order.items) &&
              order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={
                      item?.variant_snapshot?.image_url ||
                      item?.variant?.image_url ||
                      "https://via.placeholder.com/80?text=No+Image"
                    }
                    alt={item?.variant_snapshot?.product_name || "Product"}
                    className="object-cover w-20 h-20 rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80?text=No+Image";
                    }}
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">
                      {item?.variant_snapshot?.product_name ||
                        item?.product_name ||
                        "Sản phẩm"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      SKU: {item?.variant_snapshot?.sku || item?.sku || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      x{item?.quantity || 0}
                    </p>
                    <p className="mt-1 font-bold text-primary-600">
                      {formatPrice(item?.unit_price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {formatPrice(item?.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Order Summary */}
        {/* Order Summary */}
        <div className="p-6 bg-gray-50">
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
            {order.tax_amount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Thuế:</span>
                <span className="font-medium">
                  {formatPrice(order.tax_amount)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-3 text-lg font-bold border-t">
              <span>Tổng cộng:</span>
              <span className="text-primary-600">
                {formatPrice(order.total_amount)}
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t">
            <p className="text-sm text-gray-600">
              Phương thức thanh toán:{" "}
              <span className="font-medium text-gray-900">
                {order.payment_method === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : order.payment_method === "online"
                  ? "Thanh toán online"
                  : order.payment_method || "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
