import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Trang không tìm thấy</p>
      <Link to="/" className="btn-primary">
        Về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;
