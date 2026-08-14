import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get all orders
export const getOrders = () => API.get("/orders");

// Get single order
export const getOrder = (id) => API.get(`/orders/${id}`);

// Create order
export const createOrder = (order) =>
  API.post("/orders", order);

// Update order status
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}`, {
    orderStatus: status,
  });
// Delete order
export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);