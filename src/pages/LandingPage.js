// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Card, Space } from 'antd';
import {
  CodeOutlined,
  RocketOutlined,
  TrophyOutlined,
  StarOutlined,
  PlayCircleOutlined,
  BookOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/logo.png" alt="Pythonchick Logo" className="mx-auto h-32 mb-6" />
            <Title level={1} className="text-white mb-4">
              Learn Python, Have Fun!
            </Title>
            <Paragraph className="text-white text-lg max-w-2xl mx-auto mb-8">
              Pythonchick makes learning Python an exciting adventure for kids and beginners.
              Transform your coding journey into a game-like experience!
            </Paragraph>

            <Space size="large">
              <Link to="/register">
                <Button
                  //   type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button type="text" size="large" className="text-white hover:bg-white">
                  Log In
                </Button>
              </Link>
            </Space>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <Title level={2} className="text-center mb-12">
          Why Pythonchick?
        </Title>

        <Row gutter={[24, 24]}>
          {[
            {
              icon: <CodeOutlined />,
              title: 'Interactive Learning',
              description: 'Learn Python through engaging, game-like challenges.',
              color: 'blue',
            },
            {
              icon: <TrophyOutlined />,
              title: 'Achievements & Rewards',
              description: 'Earn XP, unlock badges, and track your coding progress.',
              color: 'green',
            },
            {
              icon: <StarOutlined />,
              title: 'Beginner Friendly',
              description: 'Start from zero and build a solid foundation in programming.',
              color: 'purple',
            },
          ].map((feature, index) => (
            <Col key={index} xs={24} md={8}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Card
                  className="text-center h-full hover:shadow-lg transition-shadow"
                  bordered={false}
                >
                  <div className={`text-5xl mb-4 text-${feature.color}-500`}>{feature.icon}</div>
                  <Title level={4} className="mb-3">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            How It Works
          </Title>

          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-6xl mb-4 text-primary">
                  <PlayCircleOutlined />
                </div>
                <Title level={3}>Learn Through Play</Title>
                <Paragraph>
                  Our game-based learning approach turns coding into an exciting adventure. Solve
                  puzzles, complete challenges, and level up your Python skills.
                </Paragraph>
              </motion.div>
            </Col>
            <Col xs={24} md={12}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/dashboard.png"
                  alt="Learning Illustration"
                  className="w-[400px] h-[400px]"
                />
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Courses Preview */}
      <div className="container mx-auto px-4 py-16">
        <Title level={2} className="text-center mb-12">
          Explore Our Courses
        </Title>

        <Row gutter={[24, 24]}>
          {[
            {
              icon: <BookOutlined />,
              title: 'Python Basics',
              description: 'Start your coding journey with fundamental Python concepts.',
              color: 'blue',
            },
            {
              icon: <FireOutlined />,
              title: 'Functions & Logic',
              description: 'Learn advanced programming concepts and problem-solving.',
              color: 'red',
            },
            {
              icon: <CodeOutlined />,
              title: 'Object-Oriented Programming',
              description: 'Master classes, objects, and advanced Python techniques.',
              color: 'green',
            },
          ].map((course, index) => (
            <Col key={index} xs={24} md={8}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Card
                  className="text-center h-full hover:shadow-lg transition-shadow"
                  cover={
                    <div
                      className={`h-32 flex items-center justify-center text-6xl bg-${course.color}-50 text-${course.color}-500`}
                    >
                      <div className="pt-5">{course.icon}</div>
                    </div>
                  }
                >
                  <Title level={4} className="mb-3">
                    {course.title}
                  </Title>
                  <Paragraph className="text-gray-600">{course.description}</Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="text-white mb-6">
            Start Your Coding Adventure Today!
          </Title>
          <Paragraph className="text-white text-lg max-w-2xl mx-auto mb-8">
            Join Pythonchick and transform your coding dreams into reality. No prior experience
            needed – just bring your curiosity and passion!
          </Paragraph>

          <Link to="/register">
            <Button
              //   type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Join Now for Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
