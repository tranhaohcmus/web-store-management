import api from "./api";

const categoryAPI = {
  // Get all categories (flat list by default for easier filtering)
  getAll: (params = {}) =>
    api.get("/categories", {
      params: { ...params, tree: params.tree ?? "false" },
    }),

  // Get categories as tree structure (for hierarchical display)
  getTree: () => api.get("/categories", { params: { tree: "true" } }),

  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),

  getById: (id) => api.get(`/categories/${id}`),
};

export default categoryAPI;
