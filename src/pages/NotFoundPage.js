// src/pages/NotFoundPage.js
import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;