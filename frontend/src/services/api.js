import axios from "axios";

const API_URL = "/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  login: (data) => api.post("/admin/login", data),
  register: (data) => api.post("/admin/register", data),
  getProfile: () => api.get("/admin/profile"),
  updateProfile: (data) => api.put("/admin/profile", data),
};

// Inquiry API
export const inquiryAPI = {
  getAll: () => api.get("/inquiries"),
  create: (data) => api.post("/inquiries", data),
  get: (id) => api.get(`/inquiries/${id}`),
  update: (id, data) => api.put(`/inquiries/${id}`, data),
  delete: (id) => api.delete(`/inquiries/${id}`),
  getStats: () => api.get("/inquiries/stats"),
};

// Member API
export const memberAPI = {
  getAll: (params) => api.get("/members", { params }),
  get: (id) => api.get(`/members/${id}`),
  create: (data) => api.post("/members", data),
  update: (id, data) => api.put(`/members/${id}`, data),
  delete: (id) => api.delete(`/members/${id}`),
  getStats: () => api.get("/members/stats"),
};

// Trainer API
export const trainerAPI = {
  getAll: (params) => api.get("/trainers", { params }),
  get: (id) => api.get(`/trainers/${id}`),
  create: (data) => api.post("/trainers", data),
  update: (id, data) => api.put(`/trainers/${id}`, data),
  delete: (id) => api.delete(`/trainers/${id}`),
  getStats: () => api.get("/trainers/stats"),
};

// Program API
export const programAPI = {
  getAll: (params) => api.get("/programs", { params }),
  get: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post("/programs", data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`),
  getStats: () => api.get("/programs/stats"),
};

// Membership API
export const membershipAPI = {
  getAll: (params) => api.get("/memberships", { params }),
  get: (id) => api.get(`/memberships/${id}`),
  create: (data) => api.post("/memberships", data),
  update: (id, data) => api.put(`/memberships/${id}`, data),
  delete: (id) => api.delete(`/memberships/${id}`),
  getStats: () => api.get("/memberships/stats"),
};

export default api;
