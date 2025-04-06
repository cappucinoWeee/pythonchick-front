// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

// Layout components
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import TopicDetailPage from './pages/TopicDetailPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Context Provider
import { AppProvider } from './context/AppContext';

// Custom theme configuration for Ant Design
const theme = {
  token: {
    colorPrimary: '#FF8C00',
    colorSuccess: '#43A047',
    colorInfo: '#1890FF',
    colorWarning: '#FAAD14',
    colorError: '#F5222D',
    borderRadius: 8,
    fontFamily: '"Poppins", sans-serif',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes with MainLayout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="courses/:courseId" element={<CourseDetailPage />} />
              <Route path="courses/:courseId/topics/:topicId" element={<TopicDetailPage />} />
              <Route path="courses/:courseId/topics/:topicId/lessons/:lessonId" element={<LessonPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;