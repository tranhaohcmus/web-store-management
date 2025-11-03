import api from "./api";

const authAPI = {
  register: (userData) => api.post("/auth/register", userData),

  login: (credentials) => api.post("/auth/login", credentials),

  logout: () => api.post("/auth/logout"),

  refreshToken: (refreshToken) =>
    api.post("/auth/refresh-token", { refreshToken }),

  getProfile: () => api.get("/users/profile"),

  updateProfile: (userData) => api.put("/users/profile", userData),

  changePassword: (passwords) => api.post("/users/change-password", passwords),
};

export default authAPI;
