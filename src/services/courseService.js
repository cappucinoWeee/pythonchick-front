// src/services/courseService.js
import apiClient from './api';

const courseService = {
  // Get all courses
  getAllCourses: async () => {
    const response = await apiClient.get('/courses');
    return response.data;
  },
  
  // Get course by id
  getCourseById: async (courseId) => {
    const response = await apiClient.get(`/courses/${courseId}`);
    return response.data;
  },
  
  // Get topic by id
  getTopicById: async (topicId) => {
    const response = await apiClient.get(`/topics/${topicId}`);
    return response.data;
  },
  
  // Get lesson by id
  getLessonById: async (lessonId) => {
    const response = await apiClient.get(`/lessons/${lessonId}`);
    return response.data;
  },
  
  // Complete a lesson
  completeLesson: async (lessonId, data) => {
    const response = await apiClient.post(`/progress/lessons/${lessonId}/complete`, data);
    return response.data;
  }
};

export default courseService;