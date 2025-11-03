const authorize = (allowedRoles) => (req, res, next) => {
  try {
    // Kiểm tra quyền truy cập
    const user = req.user;
    if (!user) {
      return res.status(403).json({ message: "User not authenticated" });
    }

    // Kiểm tra role (support cả type cũ và role mới)
    const userRole = user.role || user.type;
    const hasPermission = allowedRoles.some((role) => userRole === role);

    if (!hasPermission) {
      return res.status(403).json({
        message:
          "User not authorized. Required roles: " + allowedRoles.join(", "),
      });
    }

    next();
  } catch (error) {
    console.error("❌ Authorization error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authorize };
