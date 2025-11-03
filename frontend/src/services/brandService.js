import api from "./api";

const brandAPI = {
  getAll: (params) => api.get("/brands", { params }),

  getById: (id) => api.get(`/brands/${id}`),
};

export default brandAPI;
