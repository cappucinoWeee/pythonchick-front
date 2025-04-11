// src/services/courseService.js
import apiClient from './api';

const courseService = {
  // Get all courses with optional user ID for progress tracking
  getAllCourses: async (userId = null) => {
    try {
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get('/courses', { params });
      return response.data;
    } catch (error) {
      console.error('Get all courses error:', error);
      throw error;
    }
  },
  
  // Get course by id with optional user ID for progress tracking
  getCourseById: async (courseId, userId = null) => {
    try {
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get(`/courses/${courseId}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Get course ${courseId} error:`, error);
      throw error;
    }
  },
  
  // Get topic by id with optional user ID for progress tracking
  getTopicById: async (topicId, userId = null) => {
    try {
      const params = userId ? { user_id: userId } : {};
      const response = await apiClient.get(`/topics/${topicId}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Get topic ${topicId} error:`, error);
      throw error;
    }
  },
  
  // Get lesson by id with optional user ID for progress tracking
  getLessonById: async (lessonId, userId = null) => {
    try {
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
      const response = await apiClient.post(`/progress/lessons/${lessonId}/complete`, 
        score !== null ? { score } : {});
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