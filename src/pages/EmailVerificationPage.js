// src/pages/EmailVerificationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Result, Button, Typography, Card, Input, Form, Alert, Spin, Space, Statistic } from 'antd';
import {
  MailOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  RedoOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;
const { Countdown } = Statistic;

// Helper function to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const EmailVerificationPage = () => {
  const [verificationState, setVerificationState] = useState('pending'); // pending, verifying, success, error
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60 * 5); // 5 minutes in seconds
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const query = useQuery();

  // Get email and token from query params
  const email = query.get('email') || 'your email';
  const token = query.get('token');

  // Check if this is an automatic verification (with token in URL)
  useEffect(() => {
    if (token) {
      setVerificationState('verifying');

      // Simulate API verification call
      setTimeout(() => {
        // Random success/failure for demo purposes
        const success = Math.random() > 0.2; // 80% success rate

        if (success) {
          setVerificationState('success');
        } else {
          setVerificationState('error');
          setError('Invalid or expired verification token. Please request a new one.');
        }
      }, 2000);
    }
  }, [token]);

  // Handle manual verification code submission
  const handleVerify = (values) => {
    setLoading(true);
    setError('');

    // Simulate API verification call
    setTimeout(() => {
      setLoading(false);

      // For demo purposes, assume verification is successful
      setVerificationState('success');
    }, 1500);
  };

  // Handle resend verification code
  const handleResend = () => {
    setLoading(true);

    // Simulate API call to resend verification
    setTimeout(() => {
      setLoading(false);
      setCountdown(60 * 5); // Reset countdown to 5 minutes
      // Show success message
    }, 1500);
  };

  // Render different states
  const renderContent = () => {
    switch (verificationState) {
      case 'verifying':
        return (
          <div className="text-center py-8">
            <Spin size="large" />
            <Title level={4} className="mt-4">
              Verifying your email
            </Title>
            <Paragraph>Please wait while we verify your email address...</Paragraph>
          </div>
        );

      case 'success':
        return (
          <Result
            status="success"
            title="Email Verified Successfully!"
            subTitle="Your email has been verified. You can now access all features of Pythonchick."
            extra={[
              <Button
                type="primary"
                key="login"
                onClick={() => navigate('/login')}
                style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
              >
                Go to Login
              </Button>,
              <Button key="dashboard" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>,
            ]}
          />
        );

      case 'error':
        return (
          <Result
            status="error"
            title="Verification Failed"
            subTitle={error || "We couldn't verify your email. Please try again."}
            extra={[
              <Button
                type="primary"
                key="retry"
                onClick={handleResend}
                loading={loading}
                style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
              >
                Resend Verification
              </Button>,
              <Button key="support" onClick={() => navigate('/support')}>
                Contact Support
              </Button>,
            ]}
          />
        );

      case 'pending':
      default:
        return (
          <>
            <div className="text-center mb-6">
              <div className="bg-blue-50 inline-block p-4 rounded-full mb-4">
                <MailOutlined className="text-3xl text-blue-500" />
              </div>
              <Title level={3}>Verify Your Email</Title>
              <Paragraph>
                We've sent a verification code to <Text strong>{email}</Text>. Please check your
                inbox and enter the code below.
              </Paragraph>
            </div>

            {error && <Alert message={error} type="error" showIcon className="mb-4" />}

            <Form name="verification" onFinish={handleVerify} layout="vertical">
              <Form.Item
                name="verificationCode"
                rules={[
                  { required: true, message: 'Please enter the verification code!' },
                  { len: 6, message: 'Verification code must be 6 digits!' },
                ]}
              >
                <Input
                  prefix={<KeyOutlined className="text-gray-400" />}
                  placeholder="Enter 6-digit code"
                  size="large"
                  className="rounded-lg text-center tracking-widest"
                  maxLength={6}
                  autoComplete="off"
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
                  Verify Email
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-6">
              <Space direction="vertical" size="small">
                <div>
                  <Text type="secondary">Didn't receive the code? </Text>
                  <Button
                    type="link"
                    onClick={handleResend}
                    loading={loading}
                    icon={<RedoOutlined />}
                  >
                    Resend Code
                  </Button>
                </div>

                <div>
                  <Text type="secondary">Code expires in: </Text>
                  <Countdown
                    value={Date.now() + countdown * 1000}
                    format="mm:ss"
                    className="text-red-500"
                  />
                </div>
              </Space>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0">{renderContent()}</Card>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
