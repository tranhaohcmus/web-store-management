import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/slices/productSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import ProductCard from "../components/Product/ProductCard";
import Loading from "../components/Common/Loading";

function Home() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, sort: "created_at", order: "desc" }));
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Chào mừng đến E-Store
          </h1>
          <p className="mb-8 text-xl">
            Mua sắm trực tuyến dễ dàng, an toàn và tiện lợi
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 font-semibold bg-white rounded-lg text-primary-600 hover:bg-gray-100"
          >
            Khám phá ngay
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <h2 className="mb-8 text-3xl font-bold">Danh mục sản phẩm</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="p-4 text-center transition-shadow bg-white rounded-lg hover:shadow-lg"
                >
                  <h3 className="font-semibold">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Sản phẩm mới nhất</h2>
            <Link to="/products" className="text-primary-600 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Chất lượng đảm bảo</h3>
              <p className="text-gray-600">Sản phẩm chính hãng 100%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Giao hàng nhanh</h3>
              <p className="text-gray-600">
                Giao hàng toàn quốc trong 2-3 ngày
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Đổi trả dễ dàng</h3>
              <p className="text-gray-600">Đổi trả trong vòng 7 ngày</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
