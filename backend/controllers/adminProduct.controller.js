const {
  Product,
  ProductVariant,
  ProductType,
  Brand,
  Category,
  Attribute,
  AttributeValue,
  VariantAttributeValue,
  ProductTypeAttribute,
} = require("../models");
const { Op } = require("sequelize");
const db = require("../models");
const {
  successResponse,
  errorResponse,
  getPaginationMeta,
} = require("../utils/responseHelpers");
const path = require("path");
const fs = require("fs").promises;

/**
 * @route   GET /api/v1/admin/products
 * @desc    Get all products for admin (with filters)
 * @access  Private/Admin
 */
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      brand,
      status,
      product_type,
      sort = "created_at",
      order = "desc",
    } = req.query;

    const where = {};

    // Filters
    if (search) where.name = { [Op.like]: `%${search}%` };
    if (category) where.category_id = category;
    if (brand) where.brand_id = brand;
    if (status) where.status = status;
    if (product_type) where.product_type_id = product_type;

    const offset = (page - 1) * limit;

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
          attributes: [
            "id",
            "sku",
            "price",
            "promotion_price",
            "physical_stock",
            "status",
          ],
        },
      ],
      limit: parseInt(limit),
      offset,
      order: [[sort, order.toUpperCase()]],
      distinct: true,
    });

    return successResponse(
      res,
      "Products retrieved successfully",
      rows,
      getPaginationMeta(count, page, limit)
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return errorResponse(res, "Failed to fetch products", 500);
  }
};

/**
 * @route   GET /api/v1/admin/products/:id
 * @desc    Get single product detail for admin
 * @access  Private/Admin
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name", "logo_url"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug", "parent_id"],
        },
        {
          model: ProductType,
          as: "productType",
          attributes: ["id", "name", "code"],
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
                  model: AttributeValue,
                  as: "attributeValue",
                  include: [
                    {
                      model: Attribute,
                      as: "attribute",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    return successResponse(res, "Product retrieved successfully", product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return errorResponse(res, "Failed to fetch product", 500);
  }
};

/**
 * @route   POST /api/v1/admin/products
 * @desc    Create new product
 * @access  Private/Admin
 */
exports.createProduct = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const {
      name,
      description,
      product_type_id = 1, // Default to first product type
      brand_id,
      category_id,
      status = "draft",
      variants: variantsStr,
    } = req.body;

    // Parse variants from JSON string
    let variants = [];
    if (variantsStr) {
      try {
        variants = JSON.parse(variantsStr);
      } catch (e) {
        console.error("Error parsing variants:", e);
      }
    }

    // Validate required fields
    if (!name || !brand_id || !category_id) {
      await transaction.rollback();
      return errorResponse(res, "Missing required fields", 400);
    }

    // Handle uploaded image
    let default_image_url = null;
    if (req.file) {
      // Get product folder name from file path
      // File path: public/upload/images/products/{product-name}/{image.jpg}
      const relativePath = req.file.path.split("public")[1];
      default_image_url = relativePath;

      // Store thumbnail paths for future use
      if (req.thumbnails) {
        // You can store thumbnail paths in a separate field if needed
        // For now, we'll use the original image as default
        console.log("Thumbnails available:", Object.keys(req.thumbnails));
      }
    }

    // Create product
    const product = await Product.create(
      {
        name,
        description,
        product_type_id,
        brand_id,
        category_id,
        default_image_url,
        status,
      },
      { transaction }
    );

    // Create variants if provided
    if (variants && variants.length > 0) {
      for (const variantData of variants) {
        // Create variant
        const variant = await ProductVariant.create(
          {
            product_id: product.id,
            sku: variantData.sku,
            price: variantData.price,
            promotion_price: variantData.promotion_price || null,
            physical_stock: variantData.physical_stock || 0,
            reserved_stock: 0,
            image_url: variantData.image_url || default_image_url,
            status: variantData.status || "active",
          },
          { transaction }
        );

        // Create variant attribute values if provided
        if (
          variantData.attributes &&
          Object.keys(variantData.attributes).length > 0
        ) {
          const variantAttributeValues = Object.entries(
            variantData.attributes
          ).map(([attributeId, attributeValueId]) => ({
            variant_id: variant.id,
            attribute_id: parseInt(attributeId),
            attribute_value_id: parseInt(attributeValueId),
          }));

          await VariantAttributeValue.bulkCreate(variantAttributeValues, {
            transaction,
          });
        }
      }
    }

    await transaction.commit();

    // Fetch created product with associations
    const createdProduct = await Product.findByPk(product.id, {
      include: [
        { model: Brand, as: "brand" },
        { model: Category, as: "category" },
        { model: ProductType, as: "productType" },
        { model: ProductVariant, as: "variants" },
      ],
    });

    return successResponse(
      res,
      "Product created successfully",
      createdProduct,
      null,
      201
    );
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating product:", error);
    return errorResponse(res, error.message || "Failed to create product", 500);
  }
};

/**
 * @route   PUT /api/v1/admin/products/:id
 * @desc    Update product
 * @access  Private/Admin
 */
exports.updateProduct = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    const {
      name,
      description,
      product_type_id,
      brand_id,
      category_id,
      status,
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      await transaction.rollback();
      return errorResponse(res, "Product not found", 404);
    }

    // Handle image upload
    let default_image_url = product.default_image_url;
    if (req.file) {
      // Set new image path (folder structure)
      const relativePath = req.file.path.split("public")[1];
      const newFolder = path.dirname(
        path.join(__dirname, "../public", relativePath)
      );

      // Delete old images folder if exists, is local, and DIFFERENT from new folder
      if (
        product.default_image_url &&
        product.default_image_url.startsWith("/upload")
      ) {
        try {
          const oldImagePath = path.join(
            __dirname,
            "../public",
            product.default_image_url
          );
          const oldFolder = path.dirname(oldImagePath);

          // Only delete if old folder is different from new folder
          if (oldFolder !== newFolder) {
            await fs.rm(oldFolder, { recursive: true, force: true });
            console.log(`Deleted old product folder: ${oldFolder}`);
          } else {
            console.log(`Skipped deleting folder (same as new): ${oldFolder}`);
          }
        } catch (err) {
          console.log(
            "Old image folder not found or already deleted:",
            err.message
          );
        }
      }

      default_image_url = relativePath;

      if (req.thumbnails) {
        console.log("Thumbnails generated:", Object.keys(req.thumbnails));
      }
    } // Update product
    await product.update(
      {
        name: name || product.name,
        description: description || product.description,
        product_type_id: product_type_id || product.product_type_id,
        brand_id: brand_id || product.brand_id,
        category_id: category_id || product.category_id,
        default_image_url,
        status: status || product.status,
      },
      { transaction }
    );

    await transaction.commit();

    // Fetch updated product
    const updatedProduct = await Product.findByPk(id, {
      include: [
        { model: Brand, as: "brand" },
        { model: Category, as: "category" },
        { model: ProductType, as: "productType" },
        { model: ProductVariant, as: "variants" },
      ],
    });

    return successResponse(res, "Product updated successfully", updatedProduct);
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating product:", error);
    return errorResponse(res, error.message || "Failed to update product", 500);
  }
};

/**
 * @route   DELETE /api/admin/products/:id
 * @desc    Delete product (soft delete - set status to archived)
 * @access  Private/Admin
 */
exports.deleteProduct = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      await transaction.rollback();
      return errorResponse(res, "Product not found", 404);
    }

    // Soft delete - set status to archived
    await product.update({ status: "archived" }, { transaction });

    // Set all variants to inactive (ProductVariants only support 'active'/'inactive')
    await ProductVariant.update(
      { status: "inactive" },
      {
        where: { product_id: id },
        transaction,
      }
    );

    await transaction.commit();

    return successResponse(res, "Product deleted successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting product:", error);
    return errorResponse(res, "Failed to delete product", 500);
  }
};

/**
 * @route   POST /api/v1/admin/products/:id/variants
 * @desc    Add variant to product
 * @access  Private/Admin
 */
exports.addVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sku,
      price,
      promotion_price,
      physical_stock = 0,
      status = "active",
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    // Handle variant image
    let image_url = product.default_image_url;
    if (req.file) {
      image_url = `/upload/${req.file.filename}`;
    }

    const variant = await ProductVariant.create({
      product_id: id,
      sku,
      price,
      promotion_price,
      physical_stock,
      reserved_stock: 0,
      image_url,
      status,
    });

    return successResponse(
      res,
      "Variant added successfully",
      variant,
      null,
      201
    );
  } catch (error) {
    console.error("Error adding variant:", error);
    return errorResponse(res, error.message || "Failed to add variant", 500);
  }
};

/**
 * @route   PUT /api/v1/admin/products/:productId/variants/:variantId
 * @desc    Update product variant
 * @access  Private/Admin
 */
exports.updateVariant = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const { sku, price, promotion_price, physical_stock, status } = req.body;

    const variant = await ProductVariant.findOne({
      where: { id: variantId, product_id: productId },
    });

    if (!variant) {
      return errorResponse(res, "Variant not found", 404);
    }

    // Handle image update
    let image_url = variant.image_url;
    if (req.file) {
      // Delete old image if exists
      if (variant.image_url) {
        try {
          const oldImagePath = path.join(
            __dirname,
            "../public",
            variant.image_url
          );
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.log("Old image not found or already deleted");
        }
      }

      image_url = `/upload/${req.file.filename}`;
    }

    await variant.update({
      sku: sku || variant.sku,
      price: price !== undefined ? price : variant.price,
      promotion_price:
        promotion_price !== undefined
          ? promotion_price
          : variant.promotion_price,
      physical_stock:
        physical_stock !== undefined ? physical_stock : variant.physical_stock,
      image_url,
      status: status || variant.status,
    });

    return successResponse(res, "Variant updated successfully", variant);
  } catch (error) {
    console.error("Error updating variant:", error);
    return errorResponse(res, error.message || "Failed to update variant", 500);
  }
};

/**
 * @route   DELETE /api/v1/admin/products/:productId/variants/:variantId
 * @desc    Delete product variant
 * @access  Private/Admin
 */
exports.deleteVariant = async (req, res) => {
  try {
    const { productId, variantId } = req.params;

    const variant = await ProductVariant.findOne({
      where: { id: variantId, product_id: productId },
    });

    if (!variant) {
      return errorResponse(res, "Variant not found", 404);
    }

    // Soft delete
    await variant.update({ status: "inactive" });

    return successResponse(res, "Variant deleted successfully");
  } catch (error) {
    console.error("Error deleting variant:", error);
    return errorResponse(res, "Failed to delete variant", 500);
  }
};

/**
 * @route   GET /api/v1/admin/product-types
 * @desc    Get all product types with attributes
 * @access  Private/Admin
 */
exports.getProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.findAll({
      include: [
        {
          model: ProductTypeAttribute,
          as: "productTypeAttributes",
          include: [
            {
              model: Attribute,
              as: "attribute",
              include: [
                {
                  model: AttributeValue,
                  as: "values",
                },
              ],
            },
          ],
        },
      ],
      order: [["name", "ASC"]],
    });

    return successResponse(res, "Product types fetched successfully", {
      productTypes,
    });
  } catch (error) {
    console.error("Error fetching product types:", error);
    return errorResponse(res, "Failed to fetch product types", 500);
  }
};
