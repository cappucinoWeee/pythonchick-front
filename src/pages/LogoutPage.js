// src/pages/LogoutPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Spin, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Perform logout and redirect
    const performLogout = async () => {
      try {
        // Call logout method from AuthContext
        logout();
        
        // Redirect to landing page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        console.error('Logout failed:', error);
        // Even if logout fails, navigate to landing page
        navigate('/');
      }
    };
    
    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Result
        icon={<LogoutOutlined />}
        title="You've been logged out"
        subTitle="Thank you for using Pythonchick. We hope to see you again soon!"
        extra={
          <Button 
            type="primary" 
            onClick={() => navigate('/')}
            style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
          >
            Go to Home
          </Button>
        }
      />
    </div>
  );
};

export default LogoutPage;