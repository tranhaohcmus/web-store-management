import api from "./api";

const cartAPI = {
  getCart: () => api.get("/cart"),

  addItem: (itemData) => api.post("/cart/items", itemData),

  updateItem: (id, itemData) => api.put(`/cart/items/${id}`, itemData),

  removeItem: (id) => api.delete(`/cart/items/${id}`),

  clearCart: () => api.delete("/cart"),
};

export default cartAPI;
