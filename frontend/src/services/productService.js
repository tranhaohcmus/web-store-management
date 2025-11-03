import api from "./api";

const productAPI = {
  getAll: (params) => api.get("/products", { params }),

  getById: (id) => api.get(`/products/${id}`),

  getBySlug: (slug) => api.get(`/products/slug/${slug}`),

  // Admin routes
  create: (productData) => api.post("/products", productData),

  update: (id, productData) => api.put(`/products/${id}`, productData),

  delete: (id) => api.delete(`/products/${id}`),
};

export default productAPI;
