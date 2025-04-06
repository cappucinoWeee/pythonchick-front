// src/pages/LogoutPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Spin, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppContext } from '../context/AppContext';

const { Paragraph } = Typography;

const LogoutPage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const navigate = useNavigate();
  const { resetProgress } = useAppContext();

  useEffect(() => {
    // Simulate logout process
    const logout = async () => {
      try {
        // In a real app, you would make an API call to invalidate the session
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Reset user state
        resetProgress();
        
        // Update UI state
        setIsLoggingOut(false);
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } catch (error) {
        console.error('Logout failed:', error);
        setIsLoggingOut(false);
      }
    };
    
    logout();
  }, [navigate, resetProgress]);

  if (isLoggingOut) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Spin size="large" />
        <Paragraph className="mt-4">Logging you out...</Paragraph>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Result
        icon={<LogoutOutlined />}
        title="You've been logged out"
        subTitle="Thank you for using Pythonchick. You have been successfully logged out."
        extra={
          <Button 
            type="primary" 
            onClick={() => navigate('/login')}
            style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
          >
            Log In Again
          </Button>
        }
      />
    </div>
  );
};

export default LogoutPage;