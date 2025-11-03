import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "../../store/slices/cartSlice";
import productAPI from "../../services/productService";
import Loading from "../../components/Common/Loading";
import Button from "../../components/Common/Button";
import { formatPrice } from "../../utils/helpers";
import { ShoppingCart, Minus, Plus } from "lucide-react";

// Get backend URL without /api/v1
const getBackendBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
  return apiUrl.replace("/api/v1", "");
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading: cartLoading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Use React Query for product data
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await productAPI.getById(id);
      return response.data;
    },
    enabled: !!id,
  });

  // Set default variant when product loads
  useEffect(() => {
    if (product?.variants?.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    const variant = selectedVariant || product?.variants?.[0];
    if (newQuantity >= 1 && newQuantity <= (variant?.available_stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    const variant = selectedVariant || product?.variants?.[0];
    if (!variant) return;

    const result = await dispatch(
      addToCart({
        variant_id: variant.id,
        quantity,
      })
    );

    if (!result.error && isAuthenticated) {
      dispatch(fetchCart());
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const variant = selectedVariant || product?.variants?.[0];
    if (!variant) return;

    // Add to cart first
    const result = await dispatch(
      addToCart({
        variant_id: variant.id,
        quantity,
      })
    );

    if (!result.error) {
      // Fetch cart to update state
      await dispatch(fetchCart());
      // Navigate to checkout
      navigate("/checkout");
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <p className="text-red-600">Có lỗi xảy ra khi tải sản phẩm</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <p className="text-gray-600">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  // Use selected variant or fallback to first variant
  const currentVariant = selectedVariant || product.variants?.[0];

  const price = currentVariant?.promotion_price || currentVariant?.price || 0;
  const originalPrice = currentVariant?.price || 0;
  const hasDiscount =
    currentVariant?.promotion_price &&
    currentVariant.promotion_price < currentVariant.price;
  const inStock = (currentVariant?.available_stock || 0) > 0;

  // Helper function to get full image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    if (imageUrl.startsWith("/upload")) {
      return `${getBackendBaseUrl()}${imageUrl}`;
    }
    return imageUrl;
  };

  // Always use product default image (local uploaded image)
  // Variant images are usually external URLs, we prioritize local uploads
  const currentImageUrl = getImageUrl(product.default_image_url);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Image */}
        <div>
          <div className="sticky top-24">
            <img
              src={currentImageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = "/placeholder.png";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Brand */}
          {product.brand && (
            <p className="mb-2 text-sm text-gray-500">{product.brand.name}</p>
          )}

          {/* Name */}
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary-600">
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="px-2 py-1 text-sm text-white bg-red-500 rounded">
                    -
                    {Math.round(
                      ((originalPrice - price) / originalPrice) * 100
                    )}
                    %
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {inStock ? (
              <p className="text-green-600">
                Còn {currentVariant.available_stock} sản phẩm
              </p>
            ) : (
              <p className="text-red-600">Hết hàng</p>
            )}
          </div>

          {/* Variant Selection */}
          {product.variants?.length > 1 && (
            <div className="mb-6">
              <h3 className="mb-3 font-semibold">Chọn phiên bản:</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 border rounded-lg text-sm ${
                      (selectedVariant?.id || product.variants[0].id) ===
                      variant.id
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-300 hover:border-gray-400"
                    } ${
                      variant.available_stock === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={variant.available_stock === 0}
                  >
                    <div className="font-medium">{variant.sku}</div>
                    <div className="text-xs text-gray-500">
                      {formatPrice(variant.promotion_price || variant.price)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Số lượng:</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus size={20} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-20 py-2 text-center border rounded-lg"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (currentVariant?.available_stock || 0)}
                className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex mb-8 space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={!inStock || cartLoading}
              isLoading={cartLoading}
              className="flex items-center justify-center flex-1 space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Thêm vào giỏ hàng</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleBuyNow}
              disabled={!inStock}
            >
              Mua ngay
            </Button>
          </div>

          {/* Description */}
          <div className="pt-6 border-t">
            <h3 className="mb-3 text-lg font-semibold">Mô tả sản phẩm</h3>
            <div className="text-gray-700 whitespace-pre-line">
              {product.description || "Chưa có mô tả"}
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-6 mt-6 border-t">
            <h3 className="mb-3 text-lg font-semibold">Thông tin sản phẩm</h3>
            <div className="space-y-2 text-sm">
              {product.brand && (
                <div className="flex">
                  <span className="w-32 text-gray-600">Thương hiệu:</span>
                  <span className="font-medium">{product.brand.name}</span>
                </div>
              )}
              {product.category && (
                <div className="flex">
                  <span className="w-32 text-gray-600">Danh mục:</span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
              )}
              {currentVariant && (
                <div className="flex">
                  <span className="w-32 text-gray-600">SKU:</span>
                  <span className="font-medium">{currentVariant.sku}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
