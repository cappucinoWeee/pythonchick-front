// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'antd';
import { 
  BookOutlined, 
  TrophyOutlined, 
  RiseOutlined,
  BellOutlined
} from '@ant-design/icons';
import DashboardStats from '../components/dashboard/DashboardStats';
import CoursesList from '../components/dashboard/CoursesList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import DailyGoals from '../components/dashboard/DailyGoals';
import LeaderboardPreview from '../components/dashboard/LeaderboardPreview';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { user } = useAppContext();
  
  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>
        
        <div className="flex space-x-4">
          <Button icon={<TrophyOutlined />}>Achievements</Button>
          <Button type="primary" icon={<BookOutlined />}>
            <Link to="/courses">My Courses</Link>
          </Button>
        </div>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <CoursesList />
        </div>
        
        <div>
          <DailyGoals />
          <ActivityFeed />
        </div>
      </div>
      
      <LeaderboardPreview />
    </div>
  );
};

export default Dashboard;