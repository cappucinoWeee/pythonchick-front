// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const onFinish = (values) => {
    setLoading(true);
    setError('');
    
    // Simulate login - in a real app, this would call an API
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Pythonchick" className="h-16 mx-auto" />
          <h1 className="text-2xl font-display text-primary mt-2">Welcome back to Pythonchick</h1>
          <p className="text-gray-600">Log in to continue your coding adventure</p>
        </div>
        
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="Email"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>
          
          <Form.Item>
            <div className="flex justify-between items-center">
              <Checkbox name="remember">Remember me</Checkbox>
              <Link to="/forgot-password" className="text-primary hover:text-primary-dark">
                Forgot password?
              </Link>
            </div>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="rounded-lg h-12"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
        
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account?</span>{' '}
          <Link to="/register" className="text-primary font-medium">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;