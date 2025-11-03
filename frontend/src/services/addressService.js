import api from "./api";

const addressAPI = {
  getAll: () => api.get("/addresses"),

  getById: (id) => api.get(`/addresses/${id}`),

  create: (addressData) => api.post("/addresses", addressData),

  update: (id, addressData) => api.put(`/addresses/${id}`, addressData),

  delete: (id) => api.delete(`/addresses/${id}`),

  setDefault: (id) => api.patch(`/addresses/${id}/set-default`),
};

export default addressAPI;
