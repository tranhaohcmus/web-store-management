const { Address } = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHelpers");

// Get all addresses of current user
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { user_id: req.user.id },
      order: [
        ["is_default", "DESC"],
        ["created_at", "DESC"],
      ],
    });

    return successResponse(res, "Addresses retrieved successfully", addresses);
  } catch (error) {
    console.error("Error getting addresses:", error);
    return errorResponse(res, "Error retrieving addresses", null, 500);
  }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!address) {
      return errorResponse(res, "Address not found", null, 404);
    }

    return successResponse(res, "Address retrieved successfully", address);
  } catch (error) {
    console.error("Error getting address:", error);
    return errorResponse(res, "Error retrieving address", null, 500);
  }
};

// Create new address
exports.createAddress = async (req, res) => {
  try {
    const {
      recipient_name,
      recipient_phone,
      street,
      ward,
      district,
      city,
      address_type,
      is_default,
    } = req.body;

    // If setting as default, unset other defaults
    if (is_default) {
      await Address.update(
        { is_default: false },
        { where: { user_id: req.user.id } }
      );
    }

    const address = await Address.create({
      user_id: req.user.id,
      recipient_name,
      recipient_phone,
      street,
      ward,
      district,
      city,
      address_type: address_type || "shipping",
      is_default: is_default || false,
    });

    return successResponse(
      res,
      "Address created successfully",
      address,
      null,
      201
    );
  } catch (error) {
    console.error("Error creating address:", error);
    return errorResponse(res, "Error creating address", null, 500);
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!address) {
      return errorResponse(res, "Address not found", null, 404);
    }

    const {
      recipient_name,
      recipient_phone,
      street,
      ward,
      district,
      city,
      address_type,
      is_default,
    } = req.body;

    // If setting as default, unset other defaults
    if (is_default && !address.is_default) {
      await Address.update(
        { is_default: false },
        {
          where: {
            user_id: req.user.id,
            id: { [require("sequelize").Op.ne]: address.id },
          },
        }
      );
    }

    await address.update({
      recipient_name,
      recipient_phone,
      street,
      ward,
      district,
      city,
      address_type,
      is_default,
    });

    return successResponse(res, "Address updated successfully", address);
  } catch (error) {
    console.error("Error updating address:", error);
    return errorResponse(res, "Error updating address", null, 500);
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!address) {
      return errorResponse(res, "Address not found", null, 404);
    }

    await address.destroy();

    return successResponse(res, "Address deleted successfully");
  } catch (error) {
    console.error("Error deleting address:", error);
    return errorResponse(res, "Error deleting address", null, 500);
  }
};

// Set address as default
exports.setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!address) {
      return errorResponse(res, "Address not found", null, 404);
    }

    // Unset all defaults for this user
    await Address.update(
      { is_default: false },
      { where: { user_id: req.user.id } }
    );

    // Set this address as default
    await address.update({ is_default: true });

    return successResponse(res, "Default address updated successfully", {
      id: address.id,
      is_default: true,
    });
  } catch (error) {
    console.error("Error setting default address:", error);
    return errorResponse(res, "Error setting default address", null, 500);
  }
};
