import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import adminAPI from "../../services/adminService";
import Loading from "../../components/Common/Loading";
import { formatPrice } from "../../utils/helpers";
import { ArrowLeft, Edit, Package, Tag, DollarSign } from "lucide-react";

// Get backend URL without /api/v1
const getBackendBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
  return apiUrl.replace("/api/v1", "");
};

function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use React Query to fetch product
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: async () => {
      const response = await adminAPI.getProductById(id);
      return response.data.product || response.data;
    },
    enabled: !!id,
  });

  // Helper function to get full image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    if (imageUrl.startsWith("/upload")) {
      return `${getBackendBaseUrl()}${imageUrl}`;
    }
    return imageUrl;
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

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </button>
          <h1 className="text-3xl font-bold">Chi tiết sản phẩm</h1>
        </div>
        <button
          onClick={() => navigate(`/admin/products/${id}/edit`)}
          className="flex items-center space-x-2 btn-primary"
        >
          <Edit size={20} />
          <span>Chỉnh sửa</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <img
            src={getImageUrl(product.default_image_url)}
            alt={product.name}
            className="w-full rounded-lg"
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin cơ bản</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Tên sản phẩm</label>
                <p className="text-lg font-semibold">{product.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Thương hiệu</label>
                  <p className="font-medium">{product.brand?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Danh mục</label>
                  <p className="font-medium">
                    {product.category?.name || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Loại sản phẩm</label>
                <p className="font-medium">
                  {product.productType?.name || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Trạng thái</label>
                <p>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      product.status === "published"
                        ? "bg-green-100 text-green-800"
                        : product.status === "draft"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Mô tả</label>
                <p className="text-gray-700 whitespace-pre-line">
                  {product.description || "Chưa có mô tả"}
                </p>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Package size={20} />
              <span>Biến thể sản phẩm ({product.variants?.length || 0})</span>
            </h2>
            <div className="space-y-4">
              {product.variants?.map((variant) => (
                <div
                  key={variant.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Tag size={16} className="text-gray-500" />
                        <span className="font-mono text-sm font-semibold">
                          {variant.sku}
                        </span>
                      </div>

                      {/* Attributes */}
                      {variant.variantAttributes &&
                        variant.variantAttributes.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {variant.variantAttributes.map((attr, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                              >
                                {attr.attributeValue?.attribute?.name}:{" "}
                                {attr.attributeValue?.display_name}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-lg font-bold text-primary-600">
                        <DollarSign size={18} />
                        <span>
                          {formatPrice(
                            variant.promotion_price || variant.price
                          )}
                        </span>
                      </div>
                      {variant.promotion_price &&
                        variant.promotion_price < variant.price && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(variant.price)}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tồn kho:</span>
                      <span className="ml-2 font-semibold">
                        {variant.physical_stock}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Đã đặt:</span>
                      <span className="ml-2 font-semibold">
                        {variant.reserved_stock || 0}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Trạng thái:</span>
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          variant.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {variant.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetail;
