// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, Typography, Space } from 'antd';
import { 
  BookOutlined, 
  TrophyOutlined, 
  RiseOutlined,
  BellOutlined,
  RocketOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import DashboardStats from '../components/dashboard/DashboardStats';
import CoursesList from '../components/dashboard/CoursesList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import DailyGoals from '../components/dashboard/DailyGoals';
import LeaderboardPreview from '../components/dashboard/LeaderboardPreview';
import { useAppContext } from '../context/AppContext';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const { user } = useAppContext();
  
  return (
    <div className="dashboard pb-6">
      {/* Welcome Banner */}
      <Card className="mb-6 shadow-md border-0 overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"
            style={{ 
              backgroundImage: 'url(/dashboard-pattern.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'multiply'
            }}
          />
          <Row gutter={[24, 24]} className="relative z-10">
            <Col xs={24} md={16} className="py-4">
              <div>
                <Title level={2} className="font-display mb-2">Welcome back, {user.name}!</Title>
                <Paragraph className="text-gray-600 text-lg mb-4">
                  Continue your Python learning adventure today
                </Paragraph>
                <Space size="middle">
                  <Button size="large" icon={<RocketOutlined />} className="btn-primary">
                    <Link to="/courses">Continue Learning</Link>
                  </Button>
                  <Button icon={<ThunderboltOutlined />} size="large">
                    Daily Challenge
                  </Button>
                </Space>
              </div>
            </Col>
            <Col xs={24} md={8} className="flex justify-center md:justify-end items-center">
              <img 
                src="/dashboard-illustration.png" 
                alt="Learning" 
                className="max-h-40"
              />
            </Col>
          </Row>
        </div>
      </Card>
      
      {/* Dashboard Stats */}
      <DashboardStats />
      
      {/* Main Content Area */}
      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card className="shadow-md border-0 mb-6">
            <div className="flex justify-between items-center mb-4">
              {/* <Title level={4} className="mb-0">Your Courses</Title> */}
              <h2 className="text-2xl font-display mb-4">Your Courses</h2>
              <Link to="/courses" className="text-primary hover:text-primary-dark">
                View All
              </Link>
            </div>
            <CoursesList limit={3} />
          </Card>
          
          <LeaderboardPreview />
        </Col>
        
        <Col xs={24} lg={8}>
          <DailyGoals />
          <ActivityFeed />
        </Col>
      </Row>
      
      {/* Learning Path Section */}
      <Card className="mt-6 shadow-md border-0">
        <Title level={4}>Your Learning Path</Title>
        <div className="flex overflow-x-auto py-4 space-x-4 pb-2">
          {/* Path items would be mapped from API in a real app */}
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className="flex-shrink-0 w-64 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary mr-3">
                  {item}
                </div>
                <h4 className="font-medium">
                  {item === 1 ? 'Python Basics' : 
                   item === 2 ? 'Control Flow' : 
                   item === 3 ? 'Functions' : 'Classes & Objects'}
                </h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                {item === 1 ? 'Learn Python fundamentals and syntax' : 
                 item === 2 ? 'Master conditionals and loops' : 
                 item === 3 ? 'Create reusable code with functions' : 'Object-oriented programming'}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {item === 1 ? 'Completed' : 
                   item === 2 ? 'In Progress' : 
                   item === 3 ? 'Unlocked' : 'Locked'}
                </span>
                <Button 
                  // type={"default"}
                  size="small"
                  disabled={item > 3}
                >
                  {item === 1 ? 'Review' : 
                   item === 2 ? 'Continue' : 
                   item === 3 ? 'Start' : 'Locked'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 