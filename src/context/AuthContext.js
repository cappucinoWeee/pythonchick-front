// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { message } from 'antd';

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
              setUser({
                ...storedUser,
                ...userData,
                // Ensure we have these properties for the UI
                level: userData.level || 1,
                experience: userData.experience || 0,
                coins: userData.coins || 0,
                streak: userData.streak || 0,
                rank: userData.rank || 1
              });
            } catch (error) {
              console.warn('Could not get fresh user data, using stored data', error);
              // If cannot get user data, use the stored user info with defaults
              setUser({
                ...storedUser,
                level: storedUser.level || 1,
                experience: storedUser.experience || 0,
                coins: storedUser.coins || 0,
                streak: storedUser.streak || 0,
                rank: storedUser.rank || 1
              });
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
      
      // Get full user profile
      let userData;
      try {
        userData = await authService.getCurrentUserProfile();
      } catch (profileError) {
        console.warn('Could not fetch user profile after login', profileError);
        // Use basic user data from auth response
        userData = {
          id: authData.user_id,
          username: authData.username,
        };
      }
      
      // Set the user data with defaults for UI
      setUser({
        ...userData,
        level: userData.level || 1,
        experience: userData.experience || 0,
        coins: userData.coins || 0,
        streak: userData.streak || 0,
        rank: userData.rank || 1
      });
      
      message.success('Login successful!');
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
      const result = await authService.register(userData);
      message.success('Registration successful! You can now log in.');
      return result;
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
    message.info('You have been logged out.');
  };
  
  // Update user profile
  const updateProfile = async (userId, profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await authService.updateProfile(userId, profileData);
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUser
      }));
      message.success('Profile updated successfully!');
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
    setUser,
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