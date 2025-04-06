// src/components/dashboard/DashboardStats.js
import React from 'react';
import { Card, Progress, Statistic } from 'antd';
import { 
  TrophyOutlined, 
  FireOutlined, 
  ThunderboltOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';

const DashboardStats = () => {
  const { user, courses } = useAppContext();
  
  // Calculate total completed lessons
  const totalLessons = courses.reduce((total, course) => {
    return total + course.topics.reduce((topicTotal, topic) => {
      return topicTotal + topic.lessons.length;
    }, 0);
  }, 0);
  
  const completedLessons = courses.reduce((total, course) => {
    return total + course.topics.reduce((topicTotal, topic) => {
      return topicTotal + topic.lessons.filter(lesson => lesson.completed).length;
    }, 0);
  }, 0);
  
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-card">
        <Statistic
          title="Level"
          value={user.level}
          prefix={<TrophyOutlined className="text-yellow-500 mr-2" />}
          valueStyle={{ color: '#FF8C00' }}
        />
        <Progress 
          percent={(user.experience % 100)} 
          showInfo={false}
          strokeColor="#FF8C00"
          className="mt-2"
        />
        <div className="text-xs text-gray-500 mt-1">
          {user.experience} XP total ({100 - (user.experience % 100)} XP to level {user.level + 1})
        </div>
      </Card>
      
      <Card className="shadow-card">
        <Statistic
          title="Daily Streak"
          value={user.streak}
          prefix={<FireOutlined className="text-red-500 mr-2" />}
          valueStyle={{ color: '#FF4D4F' }}
          suffix="days"
        />
        <div className="mt-3 text-sm text-gray-600">
          Keep learning daily to maintain your streak!
        </div>
      </Card>
      
      <Card className="shadow-card">
        <Statistic
          title="Progress"
          value={completionPercentage}
          prefix={<ThunderboltOutlined className="text-blue-500 mr-2" />}
          valueStyle={{ color: '#1890FF' }}
          suffix="%"
        />
        <Progress 
          percent={completionPercentage} 
          showInfo={false}
          strokeColor="#1890FF"
          className="mt-2"
        />
        <div className="text-xs text-gray-500 mt-1">
          {completedLessons} out of {totalLessons} lessons completed
        </div>
      </Card>
      
      <Card className="shadow-card">
        <Statistic
          title="Today's Goal"
          value={2}
          prefix={<ClockCircleOutlined className="text-green-500 mr-2" />}
          valueStyle={{ color: '#52C41A' }}
          suffix="/5 lessons"
        />
        <Progress 
          percent={40} 
          showInfo={false}
          strokeColor="#52C41A"
          className="mt-2"
        />
        <div className="text-xs text-gray-500 mt-1">
          Complete 3 more lessons to reach your daily goal
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;