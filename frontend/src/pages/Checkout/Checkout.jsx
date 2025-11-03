import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../store/slices/cartSlice";
import { fetchAddresses, createAddress } from "../../store/slices/addressSlice";
import { createOrder } from "../../store/slices/orderSlice";
import Loading from "../../components/Common/Loading";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import { formatPrice } from "../../utils/helpers";
import { Plus } from "lucide-react";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items,
    summary,
    isLoading: cartLoading,
  } = useSelector((state) => state.cart);
  const { addresses, isLoading: addressLoading } = useSelector(
    (state) => state.addresses
  );
  const { isLoading: orderLoading } = useSelector((state) => state.orders);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [customerNote, setCustomerNote] = useState("");

  const [addressForm, setAddressForm] = useState({
    recipient_name: "",
    recipient_phone: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    address_type: "shipping",
    is_default: false,
  });

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((addr) => addr.is_default);
      setSelectedAddressId(defaultAddr?.id || addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const handleAddressFormChange = (e) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    const result = await dispatch(createAddress(addressForm));
    if (!result.error) {
      setShowAddressForm(false);
      setSelectedAddressId(result.payload.id);
      setAddressForm({
        recipient_name: "",
        recipient_phone: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        address_type: "shipping",
        is_default: false,
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    const result = await dispatch(
      createOrder({
        shipping_address_id: selectedAddressId,
        customer_note: customerNote,
        use_cart: true,
      })
    );

    if (!result.error) {
      navigate(`/orders/${result.payload.id}`);
    }
  };

  if (cartLoading || addressLoading) return <Loading />;

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Địa chỉ giao hàng</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                <Plus size={20} />
                <span>Thêm mới</span>
              </button>
            </div>

            {/* Address Form */}
            {showAddressForm && (
              <form
                onSubmit={handleCreateAddress}
                className="mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Tên người nhận"
                    name="recipient_name"
                    value={addressForm.recipient_name}
                    onChange={handleAddressFormChange}
                    required
                  />
                  <Input
                    label="Số điện thoại"
                    name="recipient_phone"
                    value={addressForm.recipient_phone}
                    onChange={handleAddressFormChange}
                    required
                  />
                </div>
                <Input
                  label="Địa chỉ"
                  name="street"
                  value={addressForm.street}
                  onChange={handleAddressFormChange}
                  required
                />
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Phường/Xã"
                    name="ward"
                    value={addressForm.ward}
                    onChange={handleAddressFormChange}
                    required
                  />
                  <Input
                    label="Quận/Huyện"
                    name="district"
                    value={addressForm.district}
                    onChange={handleAddressFormChange}
                    required
                  />
                  <Input
                    label="Tỉnh/Thành phố"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressFormChange}
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" size="sm">
                    Lưu địa chỉ
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowAddressForm(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            )}

            {/* Address List */}
            <div className="space-y-3">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className={`block p-4 border rounded-lg cursor-pointer transition ${
                    selectedAddressId === address.id
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id)}
                    className="mr-3"
                  />
                  <span className="font-medium">{address.recipient_name}</span>
                  {address.is_default && (
                    <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-1 rounded">
                      Mặc định
                    </span>
                  )}
                  <p className="text-sm text-gray-600 ml-6">
                    {address.recipient_phone}
                  </p>
                  <p className="text-sm text-gray-600 ml-6">
                    {address.street}, {address.ward}, {address.district},{" "}
                    {address.city}
                  </p>
                </label>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">
              Sản phẩm ({summary.item_count})
            </h2>
            <div className="space-y-4">
              {items.map((item) => {
                const variant = item.variant;
                const product = variant?.product;
                const price = variant?.promotion_price || variant?.price || 0;

                return (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={
                        variant?.image_url ||
                        product?.default_image_url ||
                        "/placeholder.png"
                      }
                      alt={product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{product?.name}</h3>
                      <p className="text-sm text-gray-600">
                        SKU: {variant?.sku}
                      </p>
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {formatPrice(price * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Ghi chú đơn hàng</h2>
            <textarea
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder="Ghi chú cho người bán..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              rows={4}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Tổng đơn hàng</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">
                  {formatPrice(summary.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="font-medium">Miễn phí</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="font-bold text-primary-600 text-2xl">
                    {formatPrice(summary.subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              isLoading={orderLoading}
              disabled={!selectedAddressId}
              className="w-full"
            >
              Đặt hàng
            </Button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng
              tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
