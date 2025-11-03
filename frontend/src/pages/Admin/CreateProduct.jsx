import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBrands } from "../../store/slices/brandSlice";
import { fetchCategories } from "../../store/slices/categorySlice";
import adminAPI from "../../services/adminService";
import Loading from "../../components/Common/Loading";
import { ArrowLeft, Upload, X, Plus, Trash2 } from "lucide-react";

function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const [loading, setLoading] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    brand_id: "",
    category_id: "",
    status: "draft",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [variants, setVariants] = useState([]);
  const [currentVariant, setCurrentVariant] = useState({
    attributes: {},
    price: "",
    promotion_price: "",
    physical_stock: 0,
  });

  const [errors, setErrors] = useState({});

  // Category to Product Type mapping
  const categoryToProductTypeMap = {
    4: 1, // Giày đá bóng -> Giày Đá Bóng (soccer_cleat)
    5: 1, // Giày chạy bộ -> Giày Đá Bóng (can be customized)
    6: 1, // Giày bóng rổ -> Giày Đá Bóng
    7: 1, // Giày tennis -> Giày Đá Bóng
    15: 1, // Giày FG -> Giày Đá Bóng
    16: 1, // Giày TF -> Giày Đá Bóng
    17: 1, // Giày IC -> Giày Đá Bóng
    8: 2, // Áo đấu -> Áo Đấu (jersey)
    9: 3, // Quần đấu -> Quần Short
    13: 4, // Tất đá bóng -> Tất Bóng Đá
    11: 5, // Găng tay thủ môn -> Phụ Kiện
    12: 5, // Bóng đá -> Phụ Kiện
    14: 5, // Túi đựng giày -> Phụ Kiện
  };

  // Load data
  useEffect(() => {
    const loadData = async () => {
      dispatch(fetchBrands());
      dispatch(fetchCategories());

      try {
        console.log("🚀 Fetching product types...");
        const res = await adminAPI.getProductTypes();
        console.log("📡 Full API Response:", res);

        // API interceptor already unwrapped response.data, so res = {success, data, message}
        if (res.success && res.data) {
          const types = res.data.productTypes || [];
          console.log("✅ Product Types loaded:", types.length);
          console.log("📋 Product Types:", types);
          if (types.length > 0) {
            console.log(
              "🔍 First type attributes:",
              types[0].productTypeAttributes
            );
          }
          setProductTypes(types);
        } else {
          console.error("❌ API response not successful:", res);
        }
      } catch (error) {
        console.error("❌ Error loading product types:", error);
        console.error("Error response:", error.response);
      }
    };

    loadData();
  }, [dispatch]);

  // Auto-determine product type based on selected category
  const getProductTypeByCategory = (categoryId) => {
    return categoryToProductTypeMap[categoryId] || 1; // Default to soccer_cleat
  };

  const selectedProductType = productTypes.find(
    (pt) =>
      pt.id === getProductTypeByCategory(parseInt(productData.category_id))
  );

  // Debug logging
  useEffect(() => {
    if (productData.category_id) {
      console.log("📦 Category selected:", productData.category_id);
      console.log(
        "🔍 Product Type ID:",
        getProductTypeByCategory(parseInt(productData.category_id))
      );
      console.log("📋 All Product Types:", productTypes);
      console.log("✅ Selected Product Type:", selectedProductType);
      console.log("🏷️ Attributes:", selectedProductType?.productTypeAttributes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData.category_id, productTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));

    if (name === "category_id") {
      // Reset variants when category changes (which affects product type)
      setVariants([]);
      setCurrentVariant({
        attributes: {},
        price: "",
        promotion_price: "",
        physical_stock: 0,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh phải nhỏ hơn 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAttributeChange = (attributeId, valueId) => {
    setCurrentVariant((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attributeId]: parseInt(valueId),
      },
    }));
  };

  const generateSKU = () => {
    if (!productData.name) return "AUTO";

    const namePart = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
    const attrParts = [];

    if (selectedProductType?.productTypeAttributes) {
      selectedProductType.productTypeAttributes
        .sort((a, b) => a.display_order - b.display_order)
        .forEach((pta) => {
          const valueId = currentVariant.attributes[pta.attribute_id];
          if (valueId) {
            const value = pta.attribute.values?.find((v) => v.id === valueId);
            if (value) {
              attrParts.push(value.value.toLowerCase().replace(/\s+/g, ""));
            }
          }
        });
    }

    // Add timestamp to ensure uniqueness
    const timestamp = Date.now().toString().slice(-6);
    const sku = `${namePart}${
      attrParts.length > 0 ? "-" + attrParts.join("-") : ""
    }-${timestamp}`.toUpperCase();

    return sku;
  };

  const addVariant = () => {
    if (selectedProductType?.productTypeAttributes) {
      const requiredAttrs = selectedProductType.productTypeAttributes.filter(
        (pta) => pta.is_required
      );

      for (const attr of requiredAttrs) {
        if (!currentVariant.attributes[attr.attribute_id]) {
          alert(`Vui lòng chọn ${attr.attribute.name}`);
          return;
        }
      }
    }

    if (!currentVariant.price || parseFloat(currentVariant.price) <= 0) {
      alert("Vui lòng nhập giá hợp lệ");
      return;
    }

    const sku = generateSKU();

    setVariants((prev) => [
      ...prev,
      { ...currentVariant, sku, id: Date.now() },
    ]);

    setCurrentVariant({
      attributes: {},
      price: "",
      promotion_price: "",
      physical_stock: 0,
    });
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!productData.name.trim()) newErrors.name = "Bắt buộc";
    if (!productData.brand_id) newErrors.brand_id = "Bắt buộc";
    if (!productData.category_id) newErrors.category_id = "Bắt buộc";
    if (!imageFile) newErrors.image = "Bắt buộc";
    if (variants.length === 0) newErrors.variants = "Thêm ít nhất 1 biến thể";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      // Auto-determine product_type_id based on category
      formData.append(
        "product_type_id",
        getProductTypeByCategory(parseInt(productData.category_id))
      );
      formData.append("brand_id", productData.brand_id);
      formData.append("category_id", productData.category_id);
      formData.append("status", productData.status);
      formData.append("image", imageFile);
      formData.append(
        "variants",
        JSON.stringify(
          variants.map((v) => ({
            sku: v.sku,
            price: parseFloat(v.price),
            promotion_price: v.promotion_price
              ? parseFloat(v.promotion_price)
              : null,
            physical_stock: parseInt(v.physical_stock) || 0,
            attributes: v.attributes,
          }))
        )
      );

      const response = await adminAPI.createProduct(formData);

      if (response.data.success) {
        alert("Tạo sản phẩm thành công!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Lỗi tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>
        <h1 className="text-3xl font-bold mt-4">Tạo Sản Phẩm Mới</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Thông Tin Sản Phẩm</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Thương hiệu <span className="text-red-500">*</span>
                </label>
                <select
                  name="brand_id"
                  value={productData.brand_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brand_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.brand_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  value={productData.category_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category_id}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Trạng thái
              </label>
              <select
                name="status"
                value={productData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Nháp</option>
                <option value="published">Xuất bản</option>
                <option value="archived">Lưu trữ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Hình ảnh <span className="text-red-500">*</span>
              </label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click để tải ảnh lên</p>
                  <p className="text-xs text-gray-400">PNG, JPG (tối đa 5MB)</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        {productData.category_id && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Biến Thể Sản Phẩm ({variants.length})
            </h2>

            {/* Debug Info */}
            {!selectedProductType && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ Debug: Đang tải thông tin loại sản phẩm...
                  <br />
                  Category ID: {productData.category_id}
                  <br />
                  Product Types loaded: {productTypes.length}
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-3">Thêm biến thể</h3>

              {selectedProductType?.productTypeAttributes?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  {selectedProductType.productTypeAttributes
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((pta) => (
                      <div key={pta.attribute_id}>
                        <label className="block text-sm font-medium mb-1">
                          {pta.attribute.name}
                          {pta.is_required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <select
                          value={
                            currentVariant.attributes[pta.attribute_id] || ""
                          }
                          onChange={(e) =>
                            handleAttributeChange(
                              pta.attribute_id,
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Chọn {pta.attribute.name}</option>
                          {pta.attribute.values?.map((val) => (
                            <option key={val.id} value={val.id}>
                              {val.display_name || val.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Giá (đ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={currentVariant.price}
                    onChange={(e) =>
                      setCurrentVariant((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Giá KM (đ)
                  </label>
                  <input
                    type="number"
                    value={currentVariant.promotion_price}
                    onChange={(e) =>
                      setCurrentVariant((prev) => ({
                        ...prev,
                        promotion_price: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tồn kho
                  </label>
                  <input
                    type="number"
                    value={currentVariant.physical_stock}
                    onChange={(e) =>
                      setCurrentVariant((prev) => ({
                        ...prev,
                        physical_stock: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addVariant}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-1"
                  >
                    <Plus size={16} />
                    <span>Thêm</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                SKU tự động: {generateSKU()}
              </p>
            </div>

            {variants.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium mb-2">Các biến thể đã thêm:</h3>
                {variants.map((variant, index) => {
                  const attrLabels = [];
                  if (selectedProductType?.productTypeAttributes) {
                    selectedProductType.productTypeAttributes.forEach((pta) => {
                      const valueId = variant.attributes[pta.attribute_id];
                      if (valueId) {
                        const value = pta.attribute.values?.find(
                          (v) => v.id === valueId
                        );
                        if (value) {
                          attrLabels.push(
                            `${pta.attribute.name}: ${value.value}`
                          );
                        }
                      }
                    });
                  }

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-600">
                          {attrLabels.join(" | ")}
                        </div>
                        <div className="text-sm text-gray-600">
                          SKU: {variant.sku} | Giá: {variant.price}đ
                          {variant.promotion_price &&
                            ` | KM: ${variant.promotion_price}đ`}{" "}
                          | Tồn: {variant.physical_stock}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {errors.variants && (
              <p className="text-red-500 text-sm mt-2">{errors.variants}</p>
            )}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Đang tạo..." : "Tạo Sản Phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
