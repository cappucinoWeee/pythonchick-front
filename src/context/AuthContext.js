// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize user state from localStorage on app load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Check if user is already logged in
        if (authService.isAuthenticated()) {
          const storedUser = authService.getCurrentUser();
          
          if (storedUser) {
            // Optionally fetch fresh user data from API
            try {
              const userData = await authService.getCurrentUserProfile();
              setUser(userData);
            } catch (error) {
              // If cannot get user data, use the stored user info
              setUser(storedUser);
            }
          }
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const authData = await authService.login(credentials);
      
      // Set the user data
      const userData = {
        id: authData.user_id,
        username: authData.username,
        // Include any other user data you get from login response
      };
      
      setUser(userData);
      return authData;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      return await authService.register(userData);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  
  // Update user profile
  const updateProfile = async (userId, profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await authService.updateProfile(userId, profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: authService.isAuthenticated,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;