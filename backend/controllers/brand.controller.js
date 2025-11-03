const { Brand, Product } = require("../models");
const { Op } = require("sequelize");
const {
  successResponse,
  errorResponse,
  getPaginationMeta,
} = require("../utils/responseHelpers");

/**
 * @route   GET /api/v1/brands
 * @desc    Get all brands
 * @access  Public
 */
exports.getAllBrands = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      sort = "name",
      order = "asc",
    } = req.query;

    const where = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Brand.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[sort, order.toUpperCase()]],
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });

    // Add product count to each brand
    const brandsWithCount = rows.map((brand) => ({
      ...brand.toJSON(),
      product_count: brand.products.length,
      products: undefined, // Remove the products array
    }));

    const meta = getPaginationMeta(page, limit, count);
    return successResponse(
      res,
      "Brands retrieved successfully",
      brandsWithCount,
      meta
    );
  } catch (error) {
    console.error("Error getting brands:", error);
    return errorResponse(res, "Error retrieving brands", null, 500);
  }
};

/**
 * @route   GET /api/v1/brands/:id
 * @desc    Get brand by ID
 * @access  Public
 */
exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id", "name", "default_image_url", "status"],
        },
      ],
    });

    if (!brand) {
      return errorResponse(res, "Brand not found", null, 404);
    }

    return successResponse(res, "Brand retrieved successfully", brand);
  } catch (error) {
    console.error("Error getting brand:", error);
    return errorResponse(res, "Error retrieving brand", null, 500);
  }
};

/**
 * @route   POST /api/v1/brands
 * @desc    Create new brand
 * @access  Private/Admin
 */
exports.createBrand = async (req, res) => {
  try {
    const { name, description, logo_url, website_url } = req.body;

    // Check if brand already exists
    const existingBrand = await Brand.findOne({ where: { name } });
    if (existingBrand) {
      return errorResponse(
        res,
        "Brand with this name already exists",
        null,
        400
      );
    }

    const brand = await Brand.create({
      name,
      description,
      logo_url,
      website_url,
    });

    return successResponse(res, "Brand created successfully", brand, null, 201);
  } catch (error) {
    console.error("Error creating brand:", error);
    return errorResponse(res, "Error creating brand", null, 500);
  }
};

/**
 * @route   PUT /api/v1/brands/:id
 * @desc    Update brand
 * @access  Private/Admin
 */
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, logo_url, website_url } = req.body;

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return errorResponse(res, "Brand not found", null, 404);
    }

    // Check if name is being changed and if it conflicts
    if (name && name !== brand.name) {
      const existingBrand = await Brand.findOne({ where: { name } });
      if (existingBrand) {
        return errorResponse(
          res,
          "Brand with this name already exists",
          null,
          400
        );
      }
    }

    await brand.update({
      name: name || brand.name,
      description: description !== undefined ? description : brand.description,
      logo_url: logo_url !== undefined ? logo_url : brand.logo_url,
      website_url: website_url !== undefined ? website_url : brand.website_url,
    });

    return successResponse(res, "Brand updated successfully", brand);
  } catch (error) {
    console.error("Error updating brand:", error);
    return errorResponse(res, "Error updating brand", null, 500);
  }
};

/**
 * @route   DELETE /api/v1/brands/:id
 * @desc    Delete brand
 * @access  Private/Admin
 */
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });

    if (!brand) {
      return errorResponse(res, "Brand not found", null, 404);
    }

    // Check if brand has products
    if (brand.products.length > 0) {
      return errorResponse(
        res,
        "Cannot delete brand with associated products",
        null,
        400
      );
    }

    await brand.destroy();

    return successResponse(res, "Brand deleted successfully", null);
  } catch (error) {
    console.error("Error deleting brand:", error);
    return errorResponse(res, "Error deleting brand", null, 500);
  }
};
