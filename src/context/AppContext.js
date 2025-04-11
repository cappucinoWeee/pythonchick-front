// src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import courseService from '../services/courseService';
import { message } from 'antd';

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
    if (isAuthenticated && user?.id) {
      fetchCourses();
    }
  }, [isAuthenticated, user]);
  
  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await courseService.getAllCourses(user?.id);
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again later.');
      
      // Use dummy data if the API fails
      setCourses(initialCourses);
    } finally {
      setLoading(false);
    }
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
    setCourses(initialCourses);
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
    fetchCourses
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Sample initial courses data for fallback
const initialCourses = [
  {
    id: 1,
    title: "Python Basics",
    description: "Learn the fundamentals of Python programming",
    image_url: "/python-basics.png",
    is_locked: false,
    topics: [
      {
        id: 101,
        title: "Getting Started",
        description: "Introduction to Python",
        is_locked: false,
        lessons: [
          { id: 1001, title: "What is Python?", type: "lesson", is_completed: false },
          { id: 1002, title: "Installing Python", type: "lesson", is_completed: false },
          { id: 1003, title: "Your First Program", type: "lesson", is_completed: false },
          { id: 1004, title: "Quiz: Python Basics", type: "quiz", is_completed: false }
        ]
      },
      {
        id: 102,
        title: "Variables & Data Types",
        description: "Learn about variables and basic data types",
        is_locked: true,
        lessons: [
          { id: 1005, title: "Variables", type: "lesson", is_completed: false },
          { id: 1006, title: "Numbers", type: "lesson", is_completed: false },
          { id: 1007, title: "Strings", type: "lesson", is_completed: false },
          { id: 1008, title: "Lists", type: "lesson", is_completed: false },
          { id: 1009, title: "Quiz: Variables & Data Types", type: "quiz", is_completed: false }
        ]
      },
      {
        id: 103,
        title: "Control Flow",
        description: "Master if statements and loops",
        is_locked: true,
        lessons: [
          { id: 1010, title: "If Statements", type: "lesson", is_completed: false },
          { id: 1011, title: "For Loops", type: "lesson", is_completed: false },
          { id: 1012, title: "While Loops", type: "lesson", is_completed: false },
          { id: 1013, title: "Quiz: Control Flow", type: "quiz", is_completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Python Functions",
    description: "Learn how to create and use functions",
    image_url: "/python-functions.png",
    is_locked: true,
    topics: [
      {
        id: 201,
        title: "Basic Functions",
        description: "Creating and calling functions",
        is_locked: false,
        lessons: [
          { id: 2001, title: "Function Basics", type: "lesson", is_completed: false },
          { id: 2002, title: "Parameters & Arguments", type: "lesson", is_completed: false },
          { id: 2003, title: "Return Values", type: "lesson", is_completed: false },
          { id: 2004, title: "Quiz: Basic Functions", type: "quiz", is_completed: false }
        ]
      }
    ]
  }
];

export default AppContext;