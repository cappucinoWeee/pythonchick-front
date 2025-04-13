// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Alert,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  message,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const { Title, Text, Paragraph } = Typography;

const LoginPage = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const [form] = Form.useForm();
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      // Redirect to the page they were trying to access, or dashboard
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onFinish = async (values) => {
    try {
      setLocalError('');

      // Credentials for API
      const credentials = {
        username: values.username || values.email,
        password: values.password,
      };

      await login(credentials);

      message.success('Login successful!');

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);

      // Handle different error types
      if (err.response && err.response.data) {
        setLocalError(err.response.data.detail || 'Login failed. Please check your credentials.');
      } else {
        setLocalError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl">
        <Row gutter={[32, 32]} className="items-center">
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 hidden lg:block"
            >
              <div className="text-center mb-8">
                <img src="/logo.png" alt="Pythonchick" className="h-32 mx-auto" />
                <Title level={2} className="text-primary mt-4">
                  Learn Python Through Fun!
                </Title>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: 'linear-gradient(135deg, #FF8C00 0%, transparent 100%)',
                  }}
                />

                <div className="relative">
                  <Title level={3}>Why Pythonchick?</Title>

                  <Row gutter={[16, 24]} className="mt-6">
                    <Col span={8} className="text-center">
                      <div className="text-4xl mb-2">🎮</div>
                      <Text strong>Game-Based Learning</Text>
                      <Paragraph className="text-gray-500 text-sm">
                        Learn programming concepts through fun, interactive games
                      </Paragraph>
                    </Col>

                    <Col span={8} className="text-center">
                      <div className="text-4xl mb-2">🏆</div>
                      <Text strong>Achievements & Rewards</Text>
                      <Paragraph className="text-gray-500 text-sm">
                        Earn XP, unlock badges, and climb the leaderboard
                      </Paragraph>
                    </Col>

                    <Col span={8} className="text-center">
                      <div className="text-4xl mb-2">🚀</div>
                      <Text strong>Step-by-Step Progress</Text>
                      <Paragraph className="text-gray-500 text-sm">
                        Clear learning path from beginner to advanced
                      </Paragraph>
                    </Col>
                  </Row>
                </div>
              </div>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <div className="text-center mb-6">
                  <img src="/logo.png" alt="Pythonchick" className="h-16 mx-auto lg:hidden" />
                  <Title level={3} className="font-display text-primary">
                    Welcome back!
                  </Title>
                  <Text className="text-gray-600">Log in to continue your coding adventure</Text>
                </div>

                {(localError || error) && (
                  <Alert
                    message={
                      localError || (typeof error === 'string' ? error : 'Authentication error')
                    }
                    type="error"
                    showIcon
                    className="mb-4"
                    closable
                    onClose={() => setLocalError('')}
                  />
                )}

                <Form
                  name="login"
                  form={form}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="Username"
                      size="large"
                      className="rounded-lg"
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </Form.Item>

                  <Form.Item>
                    <div className="flex justify-between items-center">
                      <Checkbox name="remember" disabled={loading}>
                        Remember me
                      </Checkbox>
                      <Link to="/forgot-password" className="text-primary hover:text-primary-dark">
                        Forgot password?
                      </Link>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <motion.div
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        loading={loading}
                        className="rounded-lg h-12"
                        style={{ backgroundColor: '#FF8C00', borderColor: '#FF8C00' }}
                      >
                        Log In
                      </Button>
                    </motion.div>
                  </Form.Item>

                  <Divider>
                    <Text type="secondary">or continue with</Text>
                  </Divider>

                  <div className="flex justify-center space-x-4 mb-6">
                    <Button
                      shape="circle"
                      icon={<GoogleOutlined />}
                      size="large"
                      className="flex items-center justify-center"
                      disabled={loading}
                    />
                    <Button
                      shape="circle"
                      icon={<FacebookOutlined />}
                      size="large"
                      className="flex items-center justify-center"
                      disabled={loading}
                    />
                    <Button
                      shape="circle"
                      icon={<GithubOutlined />}
                      size="large"
                      className="flex items-center justify-center"
                      disabled={loading}
                    />
                  </div>
                </Form>

                <div className="text-center mt-4">
                  <Text className="text-gray-600">Don't have an account?</Text>{' '}
                  <Link to="/register" className="text-primary font-medium">
                    Sign up
                  </Link>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
