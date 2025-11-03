const { User } = require("../models");
const bcrypt = require("bcryptjs");

// Helper: Sanitize user data (remove password)
const sanitizeUser = (user) => {
  // Convert Sequelize instance to plain object if necessary
  const userData = user.toJSON ? user.toJSON() : user;

  // Remove hashed_password
  const { hashed_password, ...sanitizedUser } = userData;
  return sanitizedUser;
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return sanitized user data
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve profile",
      error: error.message,
    });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, phone, avatar_url } = req.body;

  try {
    // Find user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user profile
    const updateData = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (phone !== undefined) updateData.phone = phone;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

    await user.update(updateData);

    // Return updated user data
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  try {
    // Find user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await user.update({ hashed_password: hashedNewPassword });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
