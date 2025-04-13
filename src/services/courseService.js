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
      const response = await apiClient.get('/courses', { params, timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error('Get all courses error:', error);

      // For development/testing when backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using mock course data - getAllCourses');
        // Attempt to load mock.json from the public folder
        try {
          const mockResponse = await fetch('/mock.json');
          const mockData = await mockResponse.json();
          return mockData.courses.map((course) => ({
            ...course,
            is_locked: course.id !== 1, // First course is unlocked
            total_topics: course.topics.length,
            completed_topics: 0,
          }));
        } catch (mockError) {
          console.error('Error loading mock data:', mockError);
          return [];
        }
      }

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
      const response = await apiClient.get(`/courses/${courseId}`, { params, timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error(`Get course ${courseId} error:`, error);

      // For development/testing when backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Using mock course data - getCourseById(${courseId})`);
        try {
          const mockResponse = await fetch('/mock.json');
          const mockData = await mockResponse.json();
          const course = mockData.courses.find((c) => c.id === parseInt(courseId));

          if (course) {
            return {
              ...course,
              is_locked: course.id !== 1,
              topics: course.topics.map((topic) => ({
                ...topic,
                is_locked: topic.id !== course.topics[0].id,
                lessons_count: topic.lessons.length,
                completed_lessons: 0,
              })),
            };
          }
          return null;
        } catch (mockError) {
          console.error('Error loading mock data:', mockError);
          return null;
        }
      }

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
      const response = await apiClient.get(`/topics/${topicId}`, { params, timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error(`Get topic ${topicId} error:`, error);

      // For development/testing when backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Using mock topic data - getTopicById(${topicId})`);
        try {
          const mockResponse = await fetch('/mock.json');
          const mockData = await mockResponse.json();

          // Find the topic in any course
          let foundTopic = null;
          for (const course of mockData.courses) {
            const topic = course.topics.find((t) => t.id === parseInt(topicId));
            if (topic) {
              foundTopic = {
                ...topic,
                is_locked: topic.id !== course.topics[0].id,
                course_id: course.id,
                lessons: topic.lessons.map((lesson) => ({
                  ...lesson,
                  is_completed: false,
                  order_index: topic.lessons.indexOf(lesson),
                })),
              };
              break;
            }
          }

          return foundTopic;
        } catch (mockError) {
          console.error('Error loading mock data:', mockError);
          return null;
        }
      }

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
      const response = await apiClient.get(`/lessons/${lessonId}`, { params, timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error(`Get lesson ${lessonId} error:`, error);

      // For development/testing when backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Using mock lesson data - getLessonById(${lessonId})`);
        try {
          const mockResponse = await fetch('/mock.json');
          const mockData = await mockResponse.json();

          // Find the lesson in any course/topic
          let foundLesson = null;
          outerLoop: for (const course of mockData.courses) {
            for (const topic of course.topics) {
              const lesson = topic.lessons.find((l) => l.id === parseInt(lessonId));
              if (lesson) {
                foundLesson = {
                  ...lesson,
                  topic_id: topic.id,
                  is_completed: false,
                };
                break outerLoop;
              }
            }
          }

          return foundLesson;
        } catch (mockError) {
          console.error('Error loading mock data:', mockError);
          return null;
        }
      }

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

      // For development/testing when backend is not available
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Using mock completion - completeLesson(${lessonId})`);
        return {
          success: true,
          xp_earned: 10,
          coins_earned: 5,
          progress: {
            is_completed: true,
            score: score || 100,
            attempts: 1,
          },
        };
      }

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

      // For development/testing
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Using mock progress data - getUserProgress(${userId})`);
        return {
          completed_lessons: [],
          total_xp: 0,
          level: 1,
        };
      }

      throw error;
    }
  },
};

export default courseService;
