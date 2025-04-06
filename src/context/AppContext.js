// src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample data - In a real app, this would come from an API
const initialCourses = [
  {
    id: 1,
    title: "Python Basics",
    description: "Learn the fundamentals of Python programming",
    image: "/python-basics.png",
    topics: [
      {
        id: 101,
        title: "Getting Started",
        description: "Introduction to Python",
        lessons: [
          { id: 1001, title: "What is Python?", type: "lesson", completed: false },
          { id: 1002, title: "Installing Python", type: "lesson", completed: false },
          { id: 1003, title: "Your First Program", type: "lesson", completed: false },
          { id: 1004, title: "Quiz: Python Basics", type: "quiz", completed: false }
        ]
      },
      {
        id: 102,
        title: "Variables & Data Types",
        description: "Learn about variables and basic data types",
        locked: true,
        lessons: [
          { id: 1005, title: "Variables", type: "lesson", completed: false },
          { id: 1006, title: "Numbers", type: "lesson", completed: false },
          { id: 1007, title: "Strings", type: "lesson", completed: false },
          { id: 1008, title: "Lists", type: "lesson", completed: false },
          { id: 1009, title: "Quiz: Variables & Data Types", type: "quiz", completed: false }
        ]
      },
      {
        id: 103,
        title: "Control Flow",
        description: "Master if statements and loops",
        locked: true,
        lessons: [
          { id: 1010, title: "If Statements", type: "lesson", completed: false },
          { id: 1011, title: "For Loops", type: "lesson", completed: false },
          { id: 1012, title: "While Loops", type: "lesson", completed: false },
          { id: 1013, title: "Quiz: Control Flow", type: "quiz", completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Python Functions",
    description: "Learn how to create and use functions",
    image: "/python-functions.png",
    locked: true,
    topics: [
      {
        id: 201,
        title: "Basic Functions",
        description: "Creating and calling functions",
        lessons: [
          { id: 2001, title: "Function Basics", type: "lesson", completed: false },
          { id: 2002, title: "Parameters & Arguments", type: "lesson", completed: false },
          { id: 2003, title: "Return Values", type: "lesson", completed: false },
          { id: 2004, title: "Quiz: Basic Functions", type: "quiz", completed: false }
        ]
      },
      {
        id: 202,
        title: "Advanced Functions",
        description: "Advanced concepts in functions",
        locked: true,
        lessons: [
          { id: 2005, title: "Default Parameters", type: "lesson", completed: false },
          { id: 2006, title: "Variable Scope", type: "lesson", completed: false },
          { id: 2007, title: "Lambda Functions", type: "lesson", completed: false },
          { id: 2008, title: "Quiz: Advanced Functions", type: "quiz", completed: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Python Classes",
    description: "Learn object-oriented programming",
    image: "/python-classes.png",
    locked: true,
    topics: [
      {
        id: 301,
        title: "Classes & Objects",
        description: "Introduction to classes and objects",
        lessons: [
          { id: 3001, title: "Class Basics", type: "lesson", completed: false },
          { id: 3002, title: "Instance Methods", type: "lesson", completed: false },
          { id: 3003, title: "Constructors", type: "lesson", completed: false },
          { id: 3004, title: "Quiz: Classes & Objects", type: "quiz", completed: false }
        ]
      }
    ]
  }
];

// Create context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Pythonchik User",
    level: 1,
    experience: 0,
    coins: 100,
    streak: 3,
    avatar: "/default-avatar.png",
  });
  
  const [courses, setCourses] = useState(() => {
    // Try to get saved courses data from localStorage
    const savedCourses = localStorage.getItem('pythonchik-courses');
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });

  // Save courses to localStorage when they change
  useEffect(() => {
    localStorage.setItem('pythonchik-courses', JSON.stringify(courses));
  }, [courses]);

  // Function to mark a lesson as completed
  const completeLesson = (courseId, topicId, lessonId) => {
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
      newCourses[courseIndex].topics[topicIndex].lessons[lessonIndex].completed = true;
      
      // Check if all lessons in this topic are completed
      const allLessonsCompleted = newCourses[courseIndex].topics[topicIndex].lessons.every(
        lesson => lesson.completed
      );
      
      // If all lessons are completed, unlock the next topic if it exists
      if (allLessonsCompleted && topicIndex < newCourses[courseIndex].topics.length - 1) {
        newCourses[courseIndex].topics[topicIndex + 1].locked = false;
      }
      
      // Check if all topics in this course are completed
      const allTopicsCompleted = newCourses[courseIndex].topics.every(topic => 
        topic.lessons.every(lesson => lesson.completed)
      );
      
      // If all topics are completed, unlock the next course if it exists
      if (allTopicsCompleted && courseIndex < newCourses.length - 1) {
        newCourses[courseIndex + 1].locked = false;
      }
      
      // Increase user experience and level
      setUser(prevUser => {
        const newExperience = prevUser.experience + 10;
        const newLevel = Math.floor(newExperience / 100) + 1;
        
        return {
          ...prevUser,
          experience: newExperience,
          level: newLevel,
          coins: prevUser.coins + 5, // Award coins for completing a lesson
        };
      });
      
      return newCourses;
    });
  };

  // Function to reset progress (for testing)
  const resetProgress = () => {
    setCourses(initialCourses);
    setUser({
      name: "Pythonchik User",
      level: 1,
      experience: 0,
      coins: 100,
      streak: 3,
      avatar: "/default-avatar.png",
    });
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      courses, 
      completeLesson,
      resetProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;