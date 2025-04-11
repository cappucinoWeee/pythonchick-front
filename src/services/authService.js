// src/services/authService.js
import apiClient from './api';

const authService = {
  // Login user and get token
  login: async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await apiClient.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.user_id,
        username: response.data.username
      }));
    }
    
    return response.data;
  },
  
  // Register new user
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;