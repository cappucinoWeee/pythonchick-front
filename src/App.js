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
import ContactPage from './pages/ContactPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SupportPage from './pages/SupportPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import LogoutPage from './pages/LogoutPage';
import GamesPage from './pages/GamesPage';
import CompilerPage from './pages/CompilerPage';

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
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/verification" element={<EmailVerificationPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />

            
            {/* Protected routes with MainLayout */}
            <Route path="/" element={<MainLayout />}>
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/support" element={<SupportPage />} />

              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="courses/:courseId" element={<CourseDetailPage />} />
              <Route path="courses/:courseId/topics/:topicId" element={<TopicDetailPage />} />
              <Route path="courses/:courseId/topics/:topicId/lessons/:lessonId" element={<LessonPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="games" element={<GamesPage />} />
              <Route path="compiler" element={<CompilerPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;