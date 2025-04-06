// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Alert, Steps } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  SmileOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const steps = [
    {
      title: 'Account',
      icon: <UserOutlined />
    },
    {
      title: 'Profile',
      icon: <SmileOutlined />
    },
    {
      title: 'Complete',
      icon: <SafetyOutlined />
    }
  ];
  
  const onFinishStep1 = (values) => {
    setFormData({ ...formData, ...values });
    setCurrentStep(1);
  };
  
  const onFinishStep2 = (values) => {
    setLoading(true);
    setError('');
    
    // Combine data from both steps
    const completeData = { ...formData, ...values };
    
    // Simulate registration - in a real app, this would call an API
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(2);
    }, 1500);
  };
  
  const goToLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Pythonchick" className="h-16 mx-auto" />
          <h1 className="text-2xl font-display text-primary mt-2">Join Pythonchick</h1>
          <p className="text-gray-600">Create your account and start learning</p>
        </div>
        
        <Steps current={currentStep} className="mb-8">
          {steps.map(step => (
            <Step key={step.title} title={step.title} icon={step.icon} />
          ))}
        </Steps>
        
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        
        {currentStep === 0 && (
          <Form
            name="register-step1"
            initialValues={{ remember: true }}
            onFinish={onFinishStep1}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />} 
                placeholder="Email"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm Password"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="rounded-lg h-12"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        )}
        
        {currentStep === 1 && (
          <Form
            name="register-step2"
            onFinish={onFinishStep2}
            layout="vertical"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Full Name"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
            
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please choose a username!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Username"
                size="large"
                className="rounded-lg"
              />
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
                Create Account
              </Button>
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="link"
                block
                onClick={() => setCurrentStep(0)}
              >
                Back to Previous Step
              </Button>
            </Form.Item>
          </Form>
        )}
        
        {currentStep === 2 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-medium mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your account has been created. You're ready to start your coding adventure!
            </p>
            <Button 
              type="primary"
              size="large"
              block
              onClick={goToLogin}
              className="rounded-lg h-12"
            >
              Log In Now
            </Button>
          </div>
        )}
        
        {currentStep < 2 && (
          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link to="/login" className="text-primary font-medium">
              Log in
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RegisterPage;