// src/services/authService.js
import apiClient from './api';

const authService = {
  // Login user and get token
  login: async (credentials) => {
    try {
      console.log('Login attempt with:', { ...credentials, password: '***' });
      const response = await apiClient.post('/auth/login', credentials);
      
      console.log('Login response:', response.data);
      
      // Handle different token response formats
      // Some APIs return access_token, others might return token
      const token = response.data.access_token || response.data.token;
      const userId = response.data.user_id || response.data.id;
      const username = response.data.username;
      
      // Store token and user info in localStorage if we have a token
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          id: userId,
          username: username
        }));
        
        console.log('Token stored successfully');
      } else {
        console.error('No token received in login response');
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      
      // For development - simulate successful login
      if (process.env.NODE_ENV === 'development') {
        console.warn('Development mode: Simulating successful login');
        
        // Create a mock token and user
        const mockToken = 'mock_dev_token_' + Math.random().toString(36).substring(2);
        const mockUser = {
          id: 1,
          username: credentials.username || 'demo_user'
        };
        
        // Store in localStorage
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Return mock response
        return {
          access_token: mockToken,
          token_type: 'bearer',
          user_id: mockUser.id,
          username: mockUser.username
        };
      }
      
      throw error;
    }
  },
  
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user profile
  getCurrentUserProfile: async () => {
    try {
      // Log the token being used for debugging
      const token = localStorage.getItem('token');
      console.log('Token used for /auth/me:', token ? `${token.substring(0, 15)}...` : 'No token');
      
      // Only make the API call if we have a token
      if (!token) {
        console.warn('No token available for /auth/me request');
        return null;
      }
      
      const response = await apiClient.get('/auth/me');
      console.log('User profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      
      // For development: return mock data if the API call fails
      if (process.env.NODE_ENV === 'development') {
        console.warn('Returning mock user data for development');
        return {
          id: 1,
          username: 'demo_user',
          email: 'demo@example.com',
          full_name: 'Demo User',
          level: 5,
          experience: 350,
          coins: 120,
          streak: 3,
          avatar_url: null,
          created_at: new Date().toISOString()
        };
      }
      
      throw error;
    }
  },
  
  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Update user profile
  updateProfile: async (userId, profileData) => {
    try {
      const response = await apiClient.put(`/users/${userId}`, profileData);
      
      // Update the stored user data if needed
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
  
  // Change password
  changePassword: async (userId, passwordData) => {
    try {
      const response = await apiClient.patch(`/users/${userId}/password`, passwordData);
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },
  
  // Verify email (if you have this functionality)
  verifyEmail: async (token) => {
    try {
      const response = await apiClient.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },
  
  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  },
  
  // Reset password
  resetPassword: async (resetData) => {
    try {
      const response = await apiClient.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }
};

export default authService;