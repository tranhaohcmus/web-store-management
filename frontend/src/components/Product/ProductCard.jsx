import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";

function ProductCard({ product }) {
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.promotion_price || defaultVariant?.price || 0;
  const originalPrice = defaultVariant?.price || 0;
  const hasDiscount =
    defaultVariant?.promotion_price &&
    defaultVariant.promotion_price < defaultVariant.price;

  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow duration-200 h-full">
        {/* Image */}
        <div className="relative pb-[100%] bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            src={
              product.default_image_url
                ? product.default_image_url.startsWith("http")
                  ? product.default_image_url
                  : `http://localhost:3000${product.default_image_url}`
                : "/placeholder.png"
            }
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-gray-500 mb-1">{product.brand.name}</p>
          )}

          {/* Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {defaultVariant && (
            <p className="text-xs text-gray-500 mt-2">
              {defaultVariant.available_stock > 0
                ? `Còn ${defaultVariant.available_stock} sản phẩm`
                : "Hết hàng"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
