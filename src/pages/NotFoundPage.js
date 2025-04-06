// src/pages/NotFoundPage.js
import React from 'react';
import { Result, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeFilled, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        <Result
          status="404"
          title={
            <div className="flex flex-col items-center">
              <Title level={2} className="mt-0">Oops! Page Not Found</Title>
            </div>
          }
          subTitle={
            <Paragraph className="text-gray-500 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </Paragraph>
          }
          extra={
            <div className="mt-6 space-y-3">
              <Button 
                type="primary" 
                size="large"
                icon={<HomeFilled />}
                className="mr-4"
                style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
              >
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button 
                type="link" 
                icon={<ArrowLeftOutlined />}
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          }
        />
        
        <div className="mt-8 text-gray-500">
          <Paragraph>
            Looking for something specific? Try navigating through the main menu.
          </Paragraph>
          <div className="mt-4 text-xs">
            Error Code: 404 Page Not Found
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;