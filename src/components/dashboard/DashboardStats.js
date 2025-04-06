// src/components/dashboard/DashboardStats.js
import React from 'react';
import { Row, Col, Card, Progress, Statistic, Tooltip } from 'antd';
import { 
  TrophyOutlined, 
  FireOutlined, 
  ThunderboltOutlined,
  ClockCircleOutlined,
  StarOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
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
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="shadow-md h-full border-0 overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 bg-primary rounded-full opacity-10"></div>
            
            <Statistic
              title={
                <div className="flex items-center text-gray-600">
                  <TrophyOutlined className="text-yellow-500 mr-2" />
                  <span>Current Level</span>
                </div>
              }
              value={user.level}
              valueStyle={{ color: '#FF8C00', fontWeight: 600 }}
              prefix={<StarOutlined className="mr-1" />}
              className="mb-2"
            />
            
            <Tooltip title={`${user.experience % 100}/100 XP to Level ${user.level + 1}`}>
              <Progress 
                percent={(user.experience % 100)} 
                showInfo={false}
                strokeColor="#FF8C00"
                className="mt-2"
                size="small"
              />
            </Tooltip>
            
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>Total XP: {user.experience}</span>
              <span>{100 - (user.experience % 100)} XP to go</span>
            </div>
          </Card>
        </motion.div>
      </Col>
      
      <Col xs={24} sm={12} md={6}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="shadow-md h-full border-0 overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 bg-red-500 rounded-full opacity-10"></div>
            
            <Statistic
              title={
                <div className="flex items-center text-gray-600">
                  <FireOutlined className="text-red-500 mr-2" />
                  <span>Streak</span>
                </div>
              }
              value={user.streak}
              valueStyle={{ color: '#FF4D4F', fontWeight: 600 }}
              suffix="days"
              className="mb-2"
            />
            
            <div className="flex mt-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex-1 px-0.5">
                  <div 
                    className={`h-1 rounded-full ${i < user.streak % 7 ? 'bg-red-500' : 'bg-gray-200'}`}
                  />
                  <div 
                    className={`w-full text-center mt-1 text-xs ${i < user.streak % 7 ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    {['M','T','W','T','F','S','S'][i]}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-xs text-gray-500 mt-3">
              Keep learning daily to maintain your streak!
            </div>
          </Card>
        </motion.div>
      </Col>
      
      <Col xs={24} sm={12} md={6}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="shadow-md h-full border-0 overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 bg-blue-500 rounded-full opacity-10"></div>
            
            <Statistic
              title={
                <div className="flex items-center text-gray-600">
                  <ThunderboltOutlined className="text-blue-500 mr-2" />
                  <span>Course Progress</span>
                </div>
              }
              value={completionPercentage}
              valueStyle={{ color: '#1890FF', fontWeight: 600 }}
              suffix="%"
              className="mb-2"
            />
            
            <Progress 
              percent={completionPercentage} 
              showInfo={false}
              strokeColor="#1890FF"
              className="mt-2"
              size="small"
            />
            
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>Completed: {completedLessons}/{totalLessons}</span>
              <span>Lessons remaining: {totalLessons - completedLessons}</span>
            </div>
          </Card>
        </motion.div>
      </Col>
      
      <Col xs={24} sm={12} md={6}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="shadow-md h-full border-0 overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 bg-green-500 rounded-full opacity-10"></div>
            
            <Statistic
              title={
                <div className="flex items-center text-gray-600">
                  <ClockCircleOutlined className="text-green-500 mr-2" />
                  <span>Today's Goal</span>
                </div>
              }
              value={2}
              valueStyle={{ color: '#52C41A', fontWeight: 600 }}
              suffix={<span className="text-base">/5 lessons</span>}
              className="mb-2"
            />
            
            <Progress 
              percent={40} 
              showInfo={false}
              strokeColor="#52C41A"
              className="mt-2"
              size="small"
            />
            
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">
                3 more lessons to reach your goal
              </div>
              <Tooltip title="Start next lesson">
                <button className="text-green-500 hover:text-green-600 transition-colors">
                  <RocketOutlined />
                </button>
              </Tooltip>
            </div>
          </Card>
        </motion.div>
      </Col>
    </Row>
  );
};

export default DashboardStats;