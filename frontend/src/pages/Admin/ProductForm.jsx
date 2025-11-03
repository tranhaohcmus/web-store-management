import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAdminProductById,
  createAdminProduct,
  updateAdminProduct,
  clearCurrentProduct,
  updateProductVariant,
} from "../../store/slices/adminProductSlice";
import { fetchBrands } from "../../store/slices/brandSlice";
import { fetchCategories } from "../../store/slices/categorySlice";
import adminAPI from "../../services/adminService";
import Loading from "../../components/Common/Loading";
import { ArrowLeft, Upload, X, Package, DollarSign, Plus } from "lucide-react";

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = !!id;

  const { currentProduct, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    product_type_id: "",
    brand_id: "",
    category_id: "",
    status: "draft",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [variants, setVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({
    sku: "",
    price: "",
    promotion_price: "",
    physical_stock: 0,
    attributes: {}, // { attributeId: valueId }
  });

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const response = await adminAPI.getProductTypes();
        console.log("Product Types Full Response:", response);

        // Handle different response structures
        let types = [];
        if (response?.data) {
          // Try different paths
          types =
            response.data.data?.productTypes ||
            response.data.productTypes ||
            (Array.isArray(response.data.data) ? response.data.data : []) ||
            [];
        }

        console.log("Extracted Product Types:", types);
        console.log("Types length:", types.length);

        if (types.length > 0) {
          setProductTypes(types);
        } else {
          console.warn("API returned empty, using fallback");
          await loadFallbackProductTypes();
        }
      } catch (error) {
        console.error("Error loading product types:", error);
        await loadFallbackProductTypes();
      }
    };

    const loadFallbackProductTypes = async () => {
      console.log("Loading fallback - trying API one more time...");
      try {
        // Try loading with actual API one more time
        const response = await adminAPI.getProductTypes();
        if (response?.data?.success && response.data.data?.productTypes) {
          const types = response.data.data.productTypes;
          console.log("Fallback API Success! Types:", types);
          setProductTypes(types);
          return;
        }
      } catch (err) {
        console.log("Fallback API also failed, using hardcoded data");
      }

      // Last resort: hardcoded data with attributes for Giày Đá Bóng
      setProductTypes([
        {
          id: 1,
          name: "Giày Đá Bóng",
          code: "soccer_cleat",
          productTypeAttributes: [
            {
              attribute_id: 1,
              is_required: true,
              display_order: 1,
              attribute: {
                id: 1,
                name: "Kích cỡ",
                code: "size",
                values: [
                  { id: 1, value: "39" },
                  { id: 2, value: "40" },
                  { id: 3, value: "41" },
                  { id: 4, value: "42" },
                  { id: 5, value: "43" },
                  { id: 6, value: "44" },
                ],
              },
            },
            {
              attribute_id: 3,
              is_required: false,
              display_order: 2,
              attribute: {
                id: 3,
                name: "Màu sắc",
                code: "color",
                values: [
                  { id: 10, value: "Xanh dương" },
                  { id: 11, value: "Đỏ" },
                  { id: 12, value: "Vàng" },
                  { id: 13, value: "Đen" },
                  { id: 14, value: "Trắng" },
                ],
              },
            },
            {
              attribute_id: 2,
              is_required: true,
              display_order: 3,
              attribute: {
                id: 2,
                name: "Loại đế",
                code: "sole_type",
                values: [
                  { id: 7, value: "FG" },
                  { id: 8, value: "TF" },
                  { id: 9, value: "IC" },
                ],
              },
            },
          ],
        },
        {
          id: 2,
          name: "Áo Đấu",
          code: "jersey",
          productTypeAttributes: [],
        },
        {
          id: 3,
          name: "Quần Short",
          code: "shorts",
          productTypeAttributes: [],
        },
        {
          id: 4,
          name: "Tất Bóng Đá",
          code: "socks",
          productTypeAttributes: [],
        },
        {
          id: 5,
          name: "Phụ Kiện",
          code: "accessories",
          productTypeAttributes: [],
        },
      ]);
    };

    loadProductTypes();
    dispatch(fetchBrands());
    dispatch(fetchCategories());

    if (isEditMode) {
      dispatch(fetchAdminProductById(id));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id, isEditMode]);

  // Update selected product type when product_type_id changes
  useEffect(() => {
    console.log("Product Types:", productTypes);
    console.log("Current product_type_id:", formData.product_type_id);
    if (productTypes.length > 0) {
      const productType = productTypes.find(
        (pt) => pt.id.toString() === formData.product_type_id
      );
      console.log("Selected Product Type:", productType);
      setSelectedProductType(productType || null);
    }
  }, [formData.product_type_id, productTypes]);

  useEffect(() => {
    if (isEditMode && currentProduct) {
      setFormData({
        name: currentProduct.name || "",
        description: currentProduct.description || "",
        product_type_id: currentProduct.product_type_id?.toString() || "1",
        brand_id: currentProduct.brand_id?.toString() || "",
        category_id: currentProduct.category_id?.toString() || "",
        status: currentProduct.status || "draft",
      });

      if (currentProduct.default_image_url) {
        const imageUrl = currentProduct.default_image_url.startsWith("http")
          ? currentProduct.default_image_url
          : `http://localhost:3000${currentProduct.default_image_url}`;
        setImagePreview(imageUrl);
      }

      // Load variants
      if (currentProduct.variants && currentProduct.variants.length > 0) {
        setVariants(
          currentProduct.variants.map((v) => ({
            id: v.id,
            sku: v.sku,
            price: v.price,
            promotion_price: v.promotion_price || "",
            physical_stock: v.physical_stock,
            status: v.status,
          }))
        );
      }
    }
  }, [isEditMode, currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const saveVariant = async (variant) => {
    try {
      const formData = new FormData();
      formData.append("price", variant.price);
      formData.append("promotion_price", variant.promotion_price || "");
      formData.append("physical_stock", variant.physical_stock);
      formData.append("status", variant.status);

      await dispatch(
        updateProductVariant({
          productId: id,
          variantId: variant.id,
          formData,
        })
      ).unwrap();

      // Refresh product data
      dispatch(fetchAdminProductById(id));
    } catch (error) {
      console.error("Error updating variant:", error);
    }
  };

  const addVariantToList = () => {
    if (!newVariant.price) {
      alert("Price is required!");
      return;
    }

    // Validate required attributes
    if (selectedProductType?.productTypeAttributes) {
      for (const pta of selectedProductType.productTypeAttributes) {
        if (pta.is_required && !newVariant.attributes[pta.attribute.id]) {
          alert(`${pta.attribute.name} is required!`);
          return;
        }
      }
    }

    // Auto-generate SKU if not provided
    let finalSKU = newVariant.sku;
    if (!finalSKU && formData.name) {
      const productSlug = formData.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      // Build SKU from attributes
      const attributeParts = [];
      if (selectedProductType?.productTypeAttributes) {
        for (const pta of selectedProductType.productTypeAttributes) {
          const valueId = newVariant.attributes[pta.attribute.id];
          if (valueId) {
            const attrValue = pta.attribute.values?.find(
              (av) => av.id.toString() === valueId.toString()
            );
            if (attrValue) {
              attributeParts.push(
                attrValue.value
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/đ/g, "d")
                  .replace(/[^a-z0-9]+/g, "-")
              );
            }
          }
        }
      }

      finalSKU =
        attributeParts.length > 0
          ? `${productSlug}-${attributeParts.join("-")}`
          : `${productSlug}-${Date.now()}`;
    }

    setVariants([
      ...variants,
      {
        ...newVariant,
        sku: finalSKU || `PRODUCT-${Date.now()}`,
        id: Date.now(),
        status: "active",
      },
    ]);

    // Reset form
    setNewVariant({
      sku: "",
      price: "",
      promotion_price: "",
      physical_stock: 0,
      attributes: {},
    });
  };

  const removeVariantFromList = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.product_type_id) {
      newErrors.product_type_id = "Product type is required";
    }

    if (!formData.brand_id) {
      newErrors.brand_id = "Brand is required";
    }

    if (!formData.category_id) {
      newErrors.category_id = "Category is required";
    }

    if (!isEditMode && !imageFile) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("description", formData.description);
    submitData.append("product_type_id", formData.product_type_id);
    submitData.append("brand_id", formData.brand_id);
    submitData.append("category_id", formData.category_id);
    submitData.append("status", formData.status);

    if (imageFile) {
      submitData.append("image", imageFile);
    }

    // Add variants for create mode
    if (!isEditMode && variants.length > 0) {
      submitData.append("variants", JSON.stringify(variants));
    }

    try {
      if (isEditMode) {
        await dispatch(
          updateAdminProduct({ id, formData: submitData })
        ).unwrap();
      } else {
        await dispatch(createAdminProduct(submitData)).unwrap();
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  if (isLoading && isEditMode && !currentProduct) return <Loading />;

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center mb-6 space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </button>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold">
          {isEditMode ? "Edit Product" : "Create New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="input-field"
              placeholder="Enter product description"
            />
          </div>

          {/* Brand and Category */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Brand <span className="text-red-500">*</span>
              </label>
              <select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                className={`input-field ${
                  errors.brand_id ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brand_id && (
                <p className="mt-1 text-sm text-red-500">{errors.brand_id}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`input-field ${
                  errors.category_id ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category_id}
                </p>
              )}
            </div>
          </div>

          {/* Product Type and Status */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Product Type <span className="text-red-500">*</span>
              </label>
              <select
                name="product_type_id"
                value={formData.product_type_id}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Product Type</option>
                {productTypes.length > 0 ? (
                  productTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                      {type.productTypeAttributes &&
                        type.productTypeAttributes.length > 0 &&
                        ` (${type.productTypeAttributes.length} thuộc tính)`}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="1">Giày Đá Bóng</option>
                    <option value="2">Áo Đấu</option>
                    <option value="3">Quần Short</option>
                    <option value="4">Tất Bóng Đá</option>
                    <option value="5">Phụ Kiện</option>
                  </>
                )}
              </select>
              {selectedProductType?.productTypeAttributes &&
                selectedProductType.productTypeAttributes.length > 0 && (
                  <p className="mt-1 text-xs text-blue-600">
                    ℹ️ Loại sản phẩm này có{" "}
                    {selectedProductType.productTypeAttributes.length} thuộc
                    tính biến thể:{" "}
                    <span className="font-medium">
                      {selectedProductType.productTypeAttributes
                        .map((pta) => pta.attribute.name)
                        .join(", ")}
                    </span>
                  </p>
                )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Product Image */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Image{" "}
              {!isEditMode && <span className="text-red-500">*</span>}
            </label>

            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-48 h-48 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {/* Add Variants Section - Only show in create mode */}
          {!isEditMode && (
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center mb-4 space-x-2">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Product Variants</h2>
                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                  {variants.length} variants
                </span>
              </div>

              {/* Add Variant Form */}
              <div className="p-4 mb-4 bg-white border rounded-lg">
                <h3 className="mb-3 text-sm font-medium text-gray-700">
                  Add New Variant
                </h3>

                {/* Dynamic Attributes based on Product Type */}
                {selectedProductType?.productTypeAttributes &&
                  selectedProductType.productTypeAttributes.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 mb-4 md:grid-cols-3">
                      {selectedProductType.productTypeAttributes.map((pta) => (
                        <div key={pta.attribute.id}>
                          <label className="block mb-1 text-xs font-medium text-gray-600">
                            {pta.attribute.name}{" "}
                            {pta.is_required && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          <select
                            value={
                              newVariant.attributes[pta.attribute.id] || ""
                            }
                            onChange={(e) =>
                              setNewVariant({
                                ...newVariant,
                                attributes: {
                                  ...newVariant.attributes,
                                  [pta.attribute.id]: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">
                              Select {pta.attribute.name}
                            </option>
                            {pta.attribute.values?.map((av) => (
                              <option key={av.id} value={av.id}>
                                {av.display_name || av.value}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}

                {/* SKU, Price, Promo, Stock - Simple form */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                  <div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                      SKU (optional)
                    </label>
                    <input
                      type="text"
                      value={newVariant.sku}
                      onChange={(e) =>
                        setNewVariant({ ...newVariant, sku: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Auto-generated if empty"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                      Price (đ) *
                    </label>
                    <input
                      type="number"
                      value={newVariant.price}
                      onChange={(e) =>
                        setNewVariant({ ...newVariant, price: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                      Promo Price (đ)
                    </label>
                    <input
                      type="number"
                      value={newVariant.promotion_price}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          promotion_price: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={newVariant.physical_stock}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          physical_stock: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addVariantToList}
                      className="flex items-center justify-center w-full px-4 py-2 space-x-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <Plus size={16} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Variants List */}
              {variants.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Added Variants
                  </h3>
                  {variants.map((variant, index) => {
                    // Build attributes display
                    const attributesDisplay = [];
                    if (
                      variant.attributes &&
                      selectedProductType?.productTypeAttributes
                    ) {
                      Object.entries(variant.attributes).forEach(
                        ([attrId, valueId]) => {
                          const pta =
                            selectedProductType.productTypeAttributes.find(
                              (p) => p.attribute.id.toString() === attrId
                            );
                          if (pta) {
                            const attrValue = pta.attribute.values?.find(
                              (av) => av.id.toString() === valueId
                            );
                            if (attrValue) {
                              attributesDisplay.push(
                                `${pta.attribute.name}: ${
                                  attrValue.display_name || attrValue.value
                                }`
                              );
                            }
                          }
                        }
                      );
                    }

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white border rounded-lg"
                      >
                        <div className="flex-1 space-y-1">
                          {/* Attributes */}
                          {attributesDisplay.length > 0 && (
                            <div className="text-sm">
                              <span className="font-medium text-blue-600">
                                {attributesDisplay.join(" | ")}
                              </span>
                            </div>
                          )}

                          {/* SKU, Price, Stock */}
                          <div className="grid grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">SKU:</span>{" "}
                              <span className="font-medium">{variant.sku}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Price:</span>{" "}
                              <span className="font-medium">
                                {parseInt(variant.price).toLocaleString()}đ
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Promo:</span>{" "}
                              <span className="font-medium">
                                {variant.promotion_price
                                  ? `${parseInt(
                                      variant.promotion_price
                                    ).toLocaleString()}đ`
                                  : "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Stock:</span>{" "}
                              <span className="font-medium">
                                {variant.physical_stock}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVariantFromList(index)}
                          className="ml-3 text-red-600 hover:text-red-700"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Variants Section - Only show in edit mode */}
          {isEditMode && variants.length > 0 && (
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center mb-4 space-x-2">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Product Variants</h2>
                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                  {variants.length} variants
                </span>
              </div>

              <div className="space-y-3">
                {variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="p-4 bg-white border rounded-lg"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                      {/* SKU - Read only */}
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-600">
                          SKU
                        </label>
                        <input
                          type="text"
                          value={variant.sku}
                          disabled
                          className="w-full px-3 py-2 text-sm bg-gray-100 border rounded cursor-not-allowed"
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-600">
                          Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            className="w-full py-2 pl-8 pr-3 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div>

                      {/* Promotion Price */}
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-600">
                          Promo Price
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={variant.promotion_price}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "promotion_price",
                                e.target.value
                              )
                            }
                            className="w-full py-2 pl-8 pr-3 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-600">
                          Stock <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={variant.physical_stock}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "physical_stock",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                          min="0"
                        />
                      </div>

                      {/* Status & Save Button */}
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block mb-1 text-xs font-medium text-gray-600">
                            Status
                          </label>
                          <select
                            value={variant.status}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "status",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => saveVariant(variant)}
                          className="px-3 py-2 text-xs font-medium text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end pt-6 space-x-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading
                ? "Saving..."
                : isEditMode
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
