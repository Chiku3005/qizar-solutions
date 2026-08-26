import axios from "axios";

// =====================================================
// API BASE URL
// =====================================================

const API = axios.create({
  baseURL: "https://api.qizarsolutions.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// ATTACH ADMIN TOKEN AUTOMATICALLY
// =====================================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// GET ALL PRODUCTS - PUBLIC
// =====================================================

export const getProducts = () => {
  return API.get("/products");
};

// =====================================================
// GET SINGLE PRODUCT - PUBLIC
// =====================================================

export const getProduct = (id) => {
  return API.get(`/products/${id}`);
};

// =====================================================
// CREATE PRODUCT - ADMIN ONLY
// =====================================================

export const createProduct = (productData) => {
  return API.post("/products", productData);
};

// =====================================================
// UPDATE PRODUCT - ADMIN ONLY
// =====================================================

export const updateProduct = (id, productData) => {
  return API.put(`/products/${id}`, productData);
};

// =====================================================
// DELETE PRODUCT - ADMIN ONLY
// =====================================================

export const deleteProduct = (id) => {
  return API.delete(`/products/${id}`);
};

// =====================================================
// BULK UPLOAD PRODUCTS USING CSV - ADMIN ONLY
// =====================================================

export const bulkUploadProducts = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return API.post(
    "/products/bulk-upload",
    formData
  );
};

// =====================================================
// OPTIONAL: GET PRODUCTS BY CATEGORY
// =====================================================

export const getProductsByCategory = (category) => {
  return API.get("/products", {
    params: {
      category,
    },
  });
};

// =====================================================
// OPTIONAL: GET PRODUCTS BY BRAND
// =====================================================

export const getProductsByBrand = (brand) => {
  return API.get("/products", {
    params: {
      brand,
    },
  });
};

// =====================================================
// DEFAULT EXPORT
// =====================================================

export default API;