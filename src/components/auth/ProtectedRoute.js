// src/components/auth/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;