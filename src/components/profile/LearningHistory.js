// src/components/profile/LearningHistory.js
import React from 'react';
import { Card, Timeline, Typography } from 'antd';
import { 
  BookOutlined, 
  CheckCircleOutlined, 
  FileTextOutlined, 
  UserOutlined, 
  HistoryOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

// Sample learning history data
const sampleLearningHistory = [
  {
    id: 1,
    date: 'April 5, 2023',
    activity: 'Completed "Variables & Data Types" topic',
    xp: 50,
    type: 'topic_completed'
  },
  {
    id: 2,
    date: 'April 4, 2023',
    activity: 'Scored 90% on Python Basics Quiz',
    xp: 20,
    type: 'quiz_completed'
  },
  {
    id: 3,
    date: 'April 3, 2023',
    activity: 'Completed "Your First Program" lesson',
    xp: 10,
    type: 'lesson_completed'
  },
  {
    id: 4,
    date: 'April 3, 2023',
    activity: 'Completed "Installing Python" lesson',
    xp: 10,
    type: 'lesson_completed'
  },
  {
    id: 5,
    date: 'April 2, 2023',
    activity: 'Completed "What is Python?" lesson',
    xp: 10,
    type: 'lesson_completed'
  },
  {
    id: 6,
    date: 'April 1, 2023',
    activity: 'Joined Pythonchick',
    xp: 10,
    type: 'account_created'
  }
];

const LearningHistory = ({ history = sampleLearningHistory }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'topic_completed':
        return <BookOutlined className="text-blue-500" />;
      case 'quiz_completed':
        return <CheckCircleOutlined className="text-purple-500" />;
      case 'lesson_completed':
        return <FileTextOutlined className="text-green-500" />;
      case 'account_created':
        return <UserOutlined className="text-orange-500" />;
      default:
        return <HistoryOutlined className="text-gray-500" />;
    }
  };
  
  // Calculate total XP earned
  const totalXP = history.reduce((sum, item) => sum + item.xp, 0);
  
  return (
    <Card className="shadow-sm">
      <div className="mb-4 flex justify-between items-center">
        <Title level={4} className="m-0">Learning History</Title>
        <div className="text-md font-medium text-primary">Total: {totalXP} XP</div>
      </div>
      
      <Timeline>
        {history.map((item) => (
          <Timeline.Item 
            key={item.id} 
            dot={getActivityIcon(item.type)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{item.activity}</div>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
              <div className="text-sm font-medium text-primary">+{item.xp} XP</div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default LearningHistory;