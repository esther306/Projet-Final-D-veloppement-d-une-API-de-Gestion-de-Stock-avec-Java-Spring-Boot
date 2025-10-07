import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://inventory-service-nilo.onrender.com/gestiondestock/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(config => {
  // Add auth token here if needed
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;

