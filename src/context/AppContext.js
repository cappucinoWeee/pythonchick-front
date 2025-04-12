// src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import courseService from '../services/courseService';
import { useAuth } from './AuthContext';

// Create the context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch courses from the API when the component mounts
  useEffect(() => {
    // Only fetch courses if user is authenticated
    if (isAuthenticated() && user?.id) {
      fetchCourses();
    } else if (!isAuthenticated()) {
      // If not authenticated, still fetch courses but without user progress
      fetchCourses(null);
    }
  }, [isAuthenticated, user]);
  
  // Fetch all courses
  const fetchCourses = async (userId = user?.id) => {
    setLoading(true);
    try {
      const data = await courseService.getAllCourses(userId);
      
      // Process the data to make it compatible with our frontend components
      const processedCourses = Array.isArray(data) 
        ? data.map(processCourseData)
        : [];
      
      setCourses(processedCourses);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again later.');
      
      // // Try to use mock data if API fails
      // try {
      //   const response = await import('../mock.json');
      //   const mockCourses = response.default.courses.map(processCourseData);
      //   setCourses(mockCourses);
      //   message.warning('Using demo data - could not connect to the server');
      // } catch (mockError) {
      //   console.error('Error loading mock data:', mockError);
      // }
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to process course data from API to match frontend expectations
  const processCourseData = (course) => {
    // Process topics if they exist
    const processedTopics = course.topics ? course.topics.map(topic => {
      // Process lessons if they exist
      const processedLessons = topic.lessons ? topic.lessons.map(lesson => ({
        ...lesson,
        // Ensure these properties exist for UI components
        is_completed: lesson.is_completed || false,
        completed: lesson.is_completed || false
      })) : [];
      
      return {
        ...topic,
        // Ensure these properties exist for UI components
        lessons: processedLessons,
        is_locked: topic.is_locked === undefined ? (topic.order_index > 0) : topic.is_locked,
        locked: topic.is_locked === undefined ? (topic.order_index > 0) : topic.is_locked,
        lessons_count: topic.lessons_count || (topic.lessons ? topic.lessons.length : 0),
        completed_lessons: topic.completed_lessons || 0
      };
    }) : [];
    
    return {
      ...course,
      // Ensure these properties exist for UI components
      topics: processedTopics,
      is_locked: course.is_locked === undefined ? (course.id !== 1) : course.is_locked,
      locked: course.is_locked === undefined ? (course.id !== 1) : course.is_locked,
      image_url: course.image_url || course.image || `/course-${course.id}.png`
    };
  };
  
  // Complete a lesson
  const completeLesson = async (courseId, topicId, lessonId, score = null) => {
    try {
      // Call API to complete the lesson
      const result = await courseService.completeLesson(lessonId, score);
      
      // Update the courses state to reflect the completed lesson
      setCourses(prevCourses => {
        const newCourses = [...prevCourses];
        
        // Find the course
        const courseIndex = newCourses.findIndex(course => course.id === courseId);
        if (courseIndex === -1) return prevCourses;
        
        // Find the topic
        const topicIndex = newCourses[courseIndex].topics.findIndex(topic => topic.id === topicId);
        if (topicIndex === -1) return prevCourses;
        
        // Find the lesson
        const lessonIndex = newCourses[courseIndex].topics[topicIndex].lessons.findIndex(
          lesson => lesson.id === lessonId
        );
        if (lessonIndex === -1) return prevCourses;
        
        // Mark lesson as completed
        newCourses[courseIndex].topics[topicIndex].lessons[lessonIndex].is_completed = true;
        newCourses[courseIndex].topics[topicIndex].lessons[lessonIndex].completed = true;
        
        // Update completed lessons count
        newCourses[courseIndex].topics[topicIndex].completed_lessons = 
          (newCourses[courseIndex].topics[topicIndex].completed_lessons || 0) + 1;
        
        return newCourses;
      });
      
      // Show success message
      message.success(`Lesson completed! You earned ${result.xp_earned} XP`);
      
      return result;
    } catch (err) {
      console.error('Error completing lesson:', err);
      message.error('Failed to mark lesson as complete. Please try again.');
      return null;
    }
  };
  
  // Reset progress (for development/testing)
  const resetProgress = () => {
    // In a real app, you would call an API to reset progress
    setCourses(courses.map(processCourseData));
    message.info('Progress has been reset (for development purposes)');
  };
  
  // Context value to expose
  const value = {
    user,
    courses,
    loading,
    error,
    completeLesson,
    resetProgress,
    fetchCourses,
    userProgress,
    setUserProgress
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

export default AppContext;