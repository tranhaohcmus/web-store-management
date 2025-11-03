import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../store/slices/cartSlice";
import Loading from "../../components/Common/Loading";
import Button from "../../components/Common/Button";
import { formatPrice } from "../../utils/helpers";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, summary, isLoading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ id: itemId, quantity: newQuantity })).then(() =>
      dispatch(fetchCart())
    );
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId)).then(() => dispatch(fetchCart()));
  };

  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">
          Vui lòng đăng nhập để xem giỏ hàng
        </h2>
        <Link to="/login" className="btn-primary">
          Đăng nhập
        </Link>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-6">
          Hãy thêm sản phẩm vào giỏ hàng của bạn
        </p>
        <Link to="/products" className="btn-primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Sản phẩm ({summary.item_count})
              </h2>
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Xóa tất cả
              </button>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {items.map((item) => {
                const variant = item.variant;
                const product = variant?.product;
                const price = variant?.promotion_price || variant?.price || 0;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    {/* Image */}
                    <Link
                      to={`/products/${product?.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={
                          variant?.image_url ||
                          product?.default_image_url ||
                          "/placeholder.png"
                        }
                        alt={product?.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-grow">
                      <Link to={`/products/${product?.id}`}>
                        <h3 className="font-semibold hover:text-primary-600">
                          {product?.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        SKU: {variant?.sku}
                      </p>
                      <p className="text-lg font-bold text-primary-600 mt-2">
                        {formatPrice(price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= variant?.available_stock}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-auto text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {formatPrice(price * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
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
                  <span className="font-bold text-primary-600">
                    {formatPrice(summary.subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={handleCheckout} className="w-full mb-3">
              Tiến hành thanh toán
            </Button>

            <Link to="/products">
              <Button variant="outline" className="w-full">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
