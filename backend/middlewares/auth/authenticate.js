const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../../utils/tokenBlacklist");

const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header (hỗ trợ nhiều format)
    const token =
      req.header("token") || // Custom header: token
      req.header("Authorization")?.replace("Bearer ", "") || // Authorization: Bearer TOKEN
      req.headers.authorization?.split(" ")[1]; // authorization: Bearer TOKEN

    // Kiểm tra token có tồn tại không
    if (!token) {
      return res.status(401).json({
        message: "Access token required. Please provide token in header.",
      });
    }

    // Check if token is blacklisted
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token has been revoked. Please login again.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    // Attach user info vào request
    req.user = decoded;

    console.log("✅ Authenticated user:", decoded);
    next();
  } catch (error) {
    console.error("❌ Authentication error:", error.message);

    // Xử lý các loại lỗi JWT
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
        expiredAt: error.expiredAt,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid token. Authentication failed.",
        error: error.message,
      });
    }

    if (error.name === "NotBeforeError") {
      return res.status(403).json({
        message: "Token not active yet.",
        date: error.date,
      });
    }

    // Generic error
    return res.status(403).json({
      message: "Token verification failed.",
      error: error.message,
    });
  }
};

module.exports = { authenticate };
