const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  blacklistToken,
  isTokenBlacklisted,
} = require("../utils/tokenBlacklist");

// Helper: Generate tokens
const generateTokens = (user) => {
  // Create JWT access token
  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Create refresh token
  const refreshToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// Helper: Sanitize user data (remove password)
const sanitizeUser = (user) => {
  // Convert Sequelize instance to plain object if necessary
  const userData = user.toJSON ? user.toJSON() : user;

  // Remove hashed_password
  const { hashed_password, ...sanitizedUser } = userData;
  return sanitizedUser;
};

// Register account
const register = async (req, res) => {
  const { first_name, last_name, password, email, phone } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      hashed_password: hashedPassword,
      phone,
      role: "customer", // Default role
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(newUser);

    // Return sanitized user data with tokens
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user: sanitizeUser(newUser), accessToken, refreshToken },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Successful login, create JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Return sanitized user data with tokens
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user: sanitizeUser(user), accessToken, refreshToken },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required",
    });
  }

  try {
    // Check if refresh token is blacklisted
    const isBlacklisted = await isTokenBlacklisted(refreshToken);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has been revoked. Please login again.",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find user by email from decoded token
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Blacklist old refresh token (token rotation for security)
    const oldTokenExpiry = decoded.exp - Math.floor(Date.now() / 1000);
    if (oldTokenExpiry > 0) {
      await blacklistToken(refreshToken, oldTokenExpiry);
    }

    // Generate new tokens
    const tokens = generateTokens(user);

    // Return new tokens with user info
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        ...tokens,
        user: sanitizeUser(user),
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
      error: error.message,
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    // Get access token from header
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.headers.authorization?.split(" ")[1] ||
      req.header("token");

    // Get refresh token from body
    const { refreshToken } = req.body;

    // Blacklist access token
    if (token) {
      const decoded = jwt.decode(token);
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      if (expiresIn > 0) {
        await blacklistToken(token, expiresIn);
      }
    }

    // Blacklist refresh token
    if (refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );
        const refreshExpiresIn =
          decodedRefresh.exp - Math.floor(Date.now() / 1000);
        if (refreshExpiresIn > 0) {
          await blacklistToken(refreshToken, refreshExpiresIn);
        }
      } catch (error) {
        // Refresh token invalid or expired, skip blacklist
        console.warn("Invalid refresh token on logout:", error.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to logout",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
