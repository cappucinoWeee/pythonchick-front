// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Steps, Typography, Alert, Divider, message } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  KeyOutlined,
  CheckCircleFilled,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import authService from '../services/authService';

const { Step } = Steps;
const { Title, Text, Paragraph } = Typography;

const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Step 1: Request password reset
  const handleRequestReset = async (values) => {
    setLoading(true);
    setEmail(values.email);
    setError('');

    try {
      // Call API to request password reset
      await authService.requestPasswordReset(values.email);
      message.success('Password reset email sent successfully!');
      setCurrentStep(1);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      console.error('Error requesting password reset:', err);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (values) => {
    setLoading(true);
    setError('');

    try {
      // Call API to verify reset token
      await authService.verifyResetToken(email, values.token);
      setToken(values.token);
      setCurrentStep(2);
    } catch (err) {
      setError('Invalid or expired verification code. Please try again.');
      console.error('Error verifying code:', err);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set new password
  const handleSetNewPassword = async (values) => {
    setLoading(true);
    setError('');

    try {
      // Call API to reset password
      await authService.resetPassword(email, token, values.password);
      message.success('Password reset successful!');
      setCurrentStep(3);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      console.error('Error resetting password:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle login navigation after reset
  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0">
          <div className="text-center mb-6">
            <img src="/logo.png" alt="Pythonchick" className="h-16 mx-auto" />
            <Title level={3} className="font-display text-primary mt-2">
              Reset Password
            </Title>
            <Text className="text-gray-600">Follow the steps to reset your password</Text>
          </div>

          <Steps current={currentStep} className="mb-8" size="small">
            <Step title="Request" />
            <Step title="Verify" />
            <Step title="Reset" />
            <Step title="Complete" />
          </Steps>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mb-4"
              closable
              onClose={() => setError('')}
            />
          )}

          {/* Step 1: Request password reset */}
          {currentStep === 0 && (
            <Form name="password-reset-request" onFinish={handleRequestReset} layout="vertical">
              <Paragraph className="mb-4">
                Enter your email address and we'll send you a verification code to reset your
                password.
              </Paragraph>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Email address"
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
                  style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                >
                  Send Verification Code
                </Button>
              </Form.Item>

              <div className="text-center mt-4">
                <Link to="/login" className="text-primary">
                  <ArrowLeftOutlined className="mr-1" />
                  Back to Login
                </Link>
              </div>
            </Form>
          )}

          {/* Step 2: Enter verification code */}
          {currentStep === 1 && (
            <Form name="verify-code" onFinish={handleVerifyCode} layout="vertical">
              <Alert
                message="Verification Code Sent"
                description={`We've sent a 6-digit code to ${email}. Please check your inbox and enter the code below.`}
                type="info"
                showIcon
                className="mb-4"
              />

              <Form.Item
                name="token"
                rules={[
                  { required: true, message: 'Please enter the verification code!' },
                  { min: 6, message: 'Verification code must be at least 6 characters!' },
                ]}
              >
                <Input
                  prefix={<KeyOutlined className="text-gray-400" />}
                  placeholder="6-digit code"
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
                  style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                >
                  Verify Code
                </Button>
              </Form.Item>

              <Divider plain>Didn't receive the code?</Divider>

              <div className="text-center">
                <Button type="link" onClick={() => setCurrentStep(0)} disabled={loading}>
                  Resend Code
                </Button>
              </div>
            </Form>
          )}

          {/* Step 3: Create new password */}
          {currentStep === 2 && (
            <Form name="new-password" onFinish={handleSetNewPassword} layout="vertical" form={form}>
              <Alert
                message="Email Verified"
                description="Your email has been verified. Please create a new password."
                type="success"
                showIcon
                className="mb-4"
              />

              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  { required: true, message: 'Please enter your new password!' },
                  { min: 8, message: 'Password must be at least 8 characters!' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="New Password"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
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
                  loading={loading}
                  className="rounded-lg h-12"
                  style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          )}

          {/* Step 4: Reset complete */}
          {currentStep === 3 && (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircleFilled className="text-4xl text-green-500" />
                </div>

                <Title level={3} className="mb-2">
                  Password Reset Successful!
                </Title>
                <Paragraph className="text-gray-600 mb-6">
                  Your password has been reset successfully. You can now log in with your new
                  password.
                </Paragraph>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleGoToLogin}
                  className="rounded-lg h-12"
                  style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                >
                  Log In Now
                </Button>
              </motion.div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
