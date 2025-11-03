import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">E-Store</h3>
            <p className="text-gray-400 mb-4">
              Cửa hàng thương mại điện tử hàng đầu Việt Nam
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>123 Lê Lợi, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>0912 345 678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@estore.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/products" className="hover:text-white">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/faq" className="hover:text-white">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white">
                  Chính sách đổi trả
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Nhận tin khuyến mãi</h4>
            <p className="text-sm text-gray-400 mb-4">
              Đăng ký để nhận thông tin mới nhất
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email của bạn"
                className="px-4 py-2 rounded-l-lg w-full text-gray-900 focus:outline-none"
              />
              <button className="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700">
                Gửi
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 E-Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
