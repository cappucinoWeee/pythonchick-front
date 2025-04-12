// src/services/courseService.js
import apiClient from './api';
import authService from './authService';

const courseService = {
  // Get all courses
  getAllCourses: async (userId = null) => {
    try {
      // If no userId provided, try to get from current user
      if (!userId) {
        const currentUser = authService.getCurrentUser();
        userId = currentUser?.id;
      }
      
      // Add user_id as a query parameter if available
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get('/courses', { params });
      return response.data;
    } catch (error) {
      console.error('Get all courses error:', error);
      
      // For development/testing when backend is not available
      // Return mock data from mock.json
      // if (process.env.NODE_ENV === 'development') {
      //   console.warn('Using mock course data');
      //   const mockResponse = await import('../../mock.json');
      //   return mockResponse.default.courses;
      // }
      
      throw error;
    }
  },
  
  // Get course by id
  getCourseById: async (courseId, userId = null) => {
    try {
      // If no userId provided, try to get from current user
      if (!userId) {
        const currentUser = authService.getCurrentUser();
        userId = currentUser?.id;
      }
      
      // Add user_id as a query parameter if available
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get(`/courses/${courseId}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Get course ${courseId} error:`, error);
      throw error;
    }
  },
  
  // Get topic by id
  getTopicById: async (topicId, userId = null) => {
    try {
      // If no userId provided, try to get from current user
      if (!userId) {
        const currentUser = authService.getCurrentUser();
        userId = currentUser?.id;
      }
      
      // Add user_id as a query parameter if available
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get(`/topics/${topicId}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Get topic ${topicId} error:`, error);
      throw error;
    }
  },
  
  // Get lesson by id
  getLessonById: async (lessonId, userId = null) => {
    try {
      // If no userId provided, try to get from current user
      if (!userId) {
        const currentUser = authService.getCurrentUser();
        userId = currentUser?.id;
      }
      
      // Add user_id as a query parameter if available
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get(`/lessons/${lessonId}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Get lesson ${lessonId} error:`, error);
      throw error;
    }
  },
  
  // Complete a lesson
  completeLesson: async (lessonId, score = null) => {
    try {
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error('User must be logged in to complete a lesson');
      }
      
      const payload = { score };
      const response = await apiClient.post(`/progress/lessons/${lessonId}/complete`, payload);
      return response.data;
    } catch (error) {
      console.error(`Complete lesson ${lessonId} error:`, error);
      throw error;
    }
  },
  
  // Get user progress
  getUserProgress: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}/progress`);
      return response.data;
    } catch (error) {
      console.error(`Get user progress error:`, error);
      throw error;
    }
  },
  
  // Get next available lesson for a user
  getNextLesson: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}/next-lesson`);
      return response.data;
    } catch (error) {
      console.error('Get next lesson error:', error);
      throw error;
    }
  }
};

export default courseService;