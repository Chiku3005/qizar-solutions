import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET
export const getProducts = () => API.get("/products");

// CREATE
export const createProduct = (product) =>
  API.post("/products", product);

// UPDATE
export const updateProduct = (id, product) =>
  API.put(`/products/${id}`, product);

// DELETE
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);