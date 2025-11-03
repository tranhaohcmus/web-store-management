import api from "./api";

const adminAPI = {
  // Dashboard
  getDashboardStats: () => api.get("/admin/dashboard"),

  // Orders Management
  getAllOrders: (params) => api.get("/admin/orders", { params }),

  getOrderById: (id) => api.get(`/admin/orders/${id}`),

  updateOrderStatus: (id, status) =>
    api.patch(`/admin/orders/${id}/status`, { status }),

  // Users Management
  getAllUsers: (params) => api.get("/admin/users", { params }),

  updateUserRole: (id, role) => api.patch(`/admin/users/${id}/role`, { role }),

  // Stock Management
  getStockReservations: (params) =>
    api.get("/admin/stock-reservations", { params }),

  releaseExpiredReservations: () =>
    api.post("/admin/stock-reservations/release-expired"),

  // Product Management
  getProductTypes: () => api.get("/admin/product-types"),

  getAllProducts: (params) => api.get("/admin/products", { params }),

  getProductById: (id) => api.get(`/admin/products/${id}`),

  createProduct: (formData) =>
    api.post("/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateProduct: (id, formData) =>
    api.put(`/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteProduct: (id) => api.delete(`/admin/products/${id}`),

  // Variant Management
  addVariant: (productId, formData) =>
    api.post(`/admin/products/${productId}/variants`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateVariant: (productId, variantId, formData) =>
    api.put(`/admin/products/${productId}/variants/${variantId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteVariant: (productId, variantId) =>
    api.delete(`/admin/products/${productId}/variants/${variantId}`),
};

export default adminAPI;
