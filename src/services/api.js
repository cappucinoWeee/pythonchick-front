// src/services/api.js
import axios from 'axios';
import API_CONFIG from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;