import api from "./api";

const orderAPI = {
  getAll: (params) => api.get("/orders", { params }),

  getById: (id) => api.get(`/orders/${id}`),

  create: (orderData) => api.post("/orders", orderData),

  cancel: (id, data) => api.post(`/orders/${id}/cancel`, data),

  reorder: (id) => api.post(`/orders/${id}/reorder`),
};

export default orderAPI;
