const { Category, Product } = require("../models");
const { Op } = require("sequelize");
const {
  successResponse,
  errorResponse,
  getPaginationMeta,
} = require("../utils/responseHelpers");

/**
 * Build category tree from flat list
 */
const buildCategoryTree = (categories, parentId = null) => {
  const tree = [];

  categories
    .filter((cat) => cat.parent_id === parentId)
    .forEach((cat) => {
      const children = buildCategoryTree(categories, cat.id);
      const categoryNode = {
        ...cat,
        children: children.length > 0 ? children : undefined,
      };
      tree.push(categoryNode);
    });

  return tree;
};

/**
 * @route   GET /api/v1/categories
 * @desc    Get all categories (tree structure)
 * @access  Public
 */
exports.getAllCategories = async (req, res) => {
  try {
    const { tree = "true", parent_id, search } = req.query;

    const where = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }
    if (parent_id !== undefined) {
      where.parent_id = parent_id === "null" ? null : parent_id;
    }

    const categories = await Category.findAll({
      where,
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
      order: [["name", "ASC"]],
    });

    // Add product count
    const categoriesWithCount = categories.map((cat) => ({
      ...cat.toJSON(),
      product_count: cat.products.length,
      products: undefined,
    }));

    // Build tree structure if requested
    const result =
      tree === "true"
        ? buildCategoryTree(categoriesWithCount)
        : categoriesWithCount;

    return successResponse(res, "Categories retrieved successfully", result);
  } catch (error) {
    console.error("Error getting categories:", error);
    return errorResponse(res, "Error retrieving categories", null, 500);
  }
};

/**
 * @route   GET /api/v1/categories/:id
 * @desc    Get category by ID
 * @access  Public
 */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Category,
          as: "parent",
          attributes: ["id", "name", "slug"],
        },
        {
          model: Category,
          as: "children",
          attributes: ["id", "name", "slug"],
        },
        {
          model: Product,
          as: "products",
          attributes: ["id", "name", "default_image_url", "status"],
        },
      ],
    });

    if (!category) {
      return errorResponse(res, "Category not found", null, 404);
    }

    return successResponse(res, "Category retrieved successfully", category);
  } catch (error) {
    console.error("Error getting category:", error);
    return errorResponse(res, "Error retrieving category", null, 500);
  }
};

/**
 * @route   GET /api/v1/categories/slug/:slug
 * @desc    Get category by slug
 * @access  Public
 */
exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      where: { slug },
      include: [
        {
          model: Category,
          as: "parent",
          attributes: ["id", "name", "slug"],
        },
        {
          model: Category,
          as: "children",
          attributes: ["id", "name", "slug", "description"],
        },
        {
          model: Product,
          as: "products",
          attributes: ["id", "name", "default_image_url", "status"],
        },
      ],
    });

    if (!category) {
      return errorResponse(res, "Category not found", null, 404);
    }

    return successResponse(res, "Category retrieved successfully", category);
  } catch (error) {
    console.error("Error getting category:", error);
    return errorResponse(res, "Error retrieving category", null, 500);
  }
};

/**
 * @route   POST /api/v1/categories
 * @desc    Create new category
 * @access  Private/Admin
 */
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, parent_id, image_url } = req.body;

    // Check if slug already exists
    const existingCategory = await Category.findOne({ where: { slug } });
    if (existingCategory) {
      return errorResponse(
        res,
        "Category with this slug already exists",
        null,
        400
      );
    }

    // If parent_id is provided, check if parent exists
    if (parent_id) {
      const parentCategory = await Category.findByPk(parent_id);
      if (!parentCategory) {
        return errorResponse(res, "Parent category not found", null, 404);
      }
    }

    const category = await Category.create({
      name,
      slug,
      description,
      parent_id: parent_id || null,
      image_url,
    });

    return successResponse(
      res,
      "Category created successfully",
      category,
      null,
      201
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return errorResponse(res, "Error creating category", null, 500);
  }
};

/**
 * @route   PUT /api/v1/categories/:id
 * @desc    Update category
 * @access  Private/Admin
 */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, parent_id, image_url } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return errorResponse(res, "Category not found", null, 404);
    }

    // Check if slug is being changed and if it conflicts
    if (slug && slug !== category.slug) {
      const existingCategory = await Category.findOne({ where: { slug } });
      if (existingCategory) {
        return errorResponse(
          res,
          "Category with this slug already exists",
          null,
          400
        );
      }
    }

    // Prevent category from being its own parent
    if (parent_id && parent_id === id) {
      return errorResponse(res, "Category cannot be its own parent", null, 400);
    }

    // Prevent circular reference
    if (parent_id) {
      const parentCategory = await Category.findByPk(parent_id);
      if (!parentCategory) {
        return errorResponse(res, "Parent category not found", null, 404);
      }

      // Check if the new parent is a descendant of this category
      let currentParent = parentCategory;
      while (currentParent.parent_id) {
        if (currentParent.parent_id === id) {
          return errorResponse(
            res,
            "Cannot create circular category reference",
            null,
            400
          );
        }
        currentParent = await Category.findByPk(currentParent.parent_id);
      }
    }

    await category.update({
      name: name || category.name,
      slug: slug || category.slug,
      description:
        description !== undefined ? description : category.description,
      parent_id: parent_id !== undefined ? parent_id : category.parent_id,
      image_url: image_url !== undefined ? image_url : category.image_url,
    });

    return successResponse(res, "Category updated successfully", category);
  } catch (error) {
    console.error("Error updating category:", error);
    return errorResponse(res, "Error updating category", null, 500);
  }
};

/**
 * @route   DELETE /api/v1/categories/:id
 * @desc    Delete category
 * @access  Private/Admin
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Category,
          as: "children",
          attributes: ["id"],
        },
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });

    if (!category) {
      return errorResponse(res, "Category not found", null, 404);
    }

    // Check if category has children
    if (category.children.length > 0) {
      return errorResponse(
        res,
        "Cannot delete category with subcategories",
        null,
        400
      );
    }

    // Check if category has products
    if (category.products.length > 0) {
      return errorResponse(
        res,
        "Cannot delete category with associated products",
        null,
        400
      );
    }

    await category.destroy();

    return successResponse(res, "Category deleted successfully", null);
  } catch (error) {
    console.error("Error deleting category:", error);
    return errorResponse(res, "Error deleting category", null, 500);
  }
};
