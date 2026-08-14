import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add admin JWT token to every request
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


// GET ALL USERS
export const getUsers = () => {
  return API.get("/users");
};


// GET SINGLE USER
export const getUser = (id) => {
  return API.get(`/users/${id}`);
};


// DELETE USER
export const deleteUser = (id) => {
  return API.delete(`/users/${id}`);
};