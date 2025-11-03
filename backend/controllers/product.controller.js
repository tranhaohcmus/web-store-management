const {
  Product,
  ProductVariant,
  Brand,
  Category,
  ProductType,
  VariantAttributeValue,
  Attribute,
  AttributeValue,
} = require("../models");
const { Op } = require("sequelize");
const {
  successResponse,
  errorResponse,
  getPaginationMeta,
} = require("../utils/responseHelpers");

// Get all products with filters and pagination
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      brand,
      status = "published",
      search,
      sort = "created_at",
      order = "desc",
      min_price,
      max_price,
    } = req.query;

    const where = {};

    // Filters
    if (category) where.category_id = category;
    if (brand) where.brand_id = brand;
    if (status) where.status = status;
    if (search) where.name = { [Op.like]: `%${search}%` };

    const offset = (page - 1) * limit;

    // Validate sort field - don't allow 'price' in SQL (it doesn't exist in Products table)
    const validSortFields = ["created_at", "updated_at", "name", "status"];
    const sqlSort = validSortFields.includes(sort) ? sort : "created_at";

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "logo_url"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
        {
          model: ProductType,
          as: "productType",
          attributes: ["id", "name", "code"],
        },
        {
          model: ProductVariant,
          as: "variants",
          attributes: ["id", "sku", "price", "promotion_price", "status"],
          where: { status: "active" },
          required: false,
        },
      ],
      limit: parseInt(limit),
      offset,
      order: [[sqlSort, order.toUpperCase()]],
      distinct: true,
    });

    // Add price range for each product
    let productsWithPriceRange = rows.map((product) => {
      const productJson = product.toJSON();
      if (productJson.variants && productJson.variants.length > 0) {
        const prices = productJson.variants.map(
          (v) => v.promotion_price || v.price
        );
        productJson.price_range = {
          min: Math.min(...prices),
          max: Math.max(...prices),
        };
      } else {
        productJson.price_range = null;
      }
      return productJson;
    });

    // Sort by price if requested (in JavaScript, not SQL)
    if (sort === "price") {
      productsWithPriceRange.sort((a, b) => {
        const priceA = a.price_range?.min || 0;
        const priceB = b.price_range?.min || 0;
        return order === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    const meta = getPaginationMeta(page, limit, count);
    return successResponse(
      res,
      "Products retrieved successfully",
      productsWithPriceRange,
      meta
    );
  } catch (error) {
    console.error("Error getting products:", error);
    return errorResponse(res, "Error retrieving products", null, 500);
  }
};

// Get product by ID with all variants and attributes
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: Category,
          as: "category",
        },
        {
          model: ProductType,
          as: "productType",
        },
        {
          model: ProductVariant,
          as: "variants",
          include: [
            {
              model: VariantAttributeValue,
              as: "variantAttributes",
              include: [
                {
                  model: Attribute,
                  as: "attribute",
                },
                {
                  model: AttributeValue,
                  as: "attributeValue",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!product) {
      return errorResponse(res, "Product not found", null, 404);
    }

    // Format variants with attributes
    const productJson = product.toJSON();
    productJson.variants = productJson.variants.map((variant) => {
      const attributes = variant.variantAttributes.map((va) => ({
        attribute_id: va.attribute.id,
        attribute_name: va.attribute.name,
        attribute_code: va.attribute.code,
        value_id: va.attributeValue.id,
        value: va.attributeValue.value,
        display_name: va.attributeValue.display_name,
      }));
      return {
        ...variant,
        attributes,
        available_stock: variant.physical_stock - (variant.reserved_stock || 0),
        variantAttributes: undefined,
      };
    });

    return successResponse(res, "Product retrieved successfully", productJson);
  } catch (error) {
    console.error("Error getting product:", error);
    return errorResponse(res, "Error retrieving product", null, 500);
  }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      product_type_id,
      brand_id,
      category_id,
      default_image_url,
      status,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      product_type_id,
      brand_id,
      category_id,
      default_image_url,
      status: status || "draft",
    });

    return successResponse(
      res,
      "Product created successfully",
      product,
      null,
      201
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return errorResponse(res, "Error creating product", null, 500);
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return errorResponse(res, "Product not found", null, 404);
    }

    const {
      name,
      description,
      product_type_id,
      brand_id,
      category_id,
      default_image_url,
      status,
    } = req.body;

    await product.update({
      name,
      description,
      product_type_id,
      brand_id,
      category_id,
      default_image_url,
      status,
    });

    return successResponse(res, "Product updated successfully", product);
  } catch (error) {
    console.error("Error updating product:", error);
    return errorResponse(res, "Error updating product", null, 500);
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return errorResponse(res, "Product not found", null, 404);
    }

    await product.destroy();

    return successResponse(res, "Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    return errorResponse(res, "Error deleting product", null, 500);
  }
};
