import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, setFilters } from "../../store/slices/productSlice";
import { fetchBrands } from "../../store/slices/brandSlice";
import { fetchCategories } from "../../store/slices/categorySlice";
import ProductCard from "../../components/Product/ProductCard";
import Pagination from "../../components/Common/Pagination";
import Loading from "../../components/Common/Loading";
import { Filter } from "lucide-react";

function ProductList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, pagination, filters } = useSelector(
    (state) => state.products
  );
  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      page: searchParams.get("page") || 1,
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      search: searchParams.get("search") || "",
      sort: searchParams.get("sort") || "created_at",
      order: searchParams.get("order") || "desc",
    };
    dispatch(setFilters(params));
    dispatch(fetchProducts(params));
  }, [dispatch, searchParams]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1"); // Reset to first page
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
    window.scrollTo(0, 0);
  };

  if (isLoading && products.length === 0) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Sản phẩm</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden btn-outline flex items-center space-x-2"
        >
          <Filter size={20} />
          <span>Lọc</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="card sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Bộ lọc</h3>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Sắp xếp</label>
              <select
                value={`${filters.sort}-${filters.order}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split("-");
                  handleFilterChange("sort", sort);
                  handleFilterChange("order", order);
                }}
                className="input-field"
              >
                <option value="created_at-desc">Mới nhất</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="name-asc">Tên A-Z</option>
              </select>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Danh mục
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="input-field"
                >
                  <option value="">Tất cả</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Brands */}
            {brands.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Thương hiệu
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                  className="input-field"
                >
                  <option value="">Tất cả</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Clear Filters */}
            {(filters.category || filters.brand || filters.search) && (
              <button
                onClick={() => {
                  setSearchParams({});
                }}
                className="btn-secondary w-full"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {isLoading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Không tìm thấy sản phẩm nào
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
