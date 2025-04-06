// src/components/dashboard/ActivityFeed.js
import React from 'react';
import { Timeline, Card } from 'antd';
import { 
  CheckCircleOutlined, 
  TrophyOutlined, 
  StarOutlined,
  LikeOutlined,
  FireOutlined
} from '@ant-design/icons';

// Mock data - in a real app, this would come from an API
const activityItems = [
  {
    id: 1,
    type: 'lesson_completed',
    title: 'Completed "Variables" lesson',
    time: '2 hours ago',
    icon: <CheckCircleOutlined style={{ color: '#52C41A' }} />,
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Earned "Fast Learner" achievement',
    time: 'Yesterday',
    icon: <TrophyOutlined style={{ color: '#FAAD14' }} />,
  },
  {
    id: 3,
    type: 'level_up',
    title: 'Reached Level 2',
    time: '2 days ago',
    icon: <StarOutlined style={{ color: '#1890FF' }} />,
  },
  {
    id: 4,
    type: 'streak',
    title: 'Maintained a 3-day streak',
    time: '3 days ago',
    icon: <FireOutlined style={{ color: '#FF4D4F' }} />,
  },
  {
    id: 5,
    type: 'quiz',
    title: 'Scored 90% on "Python Basics" quiz',
    time: '3 days ago',
    icon: <LikeOutlined style={{ color: '#722ED1' }} />,
  },
];

const ActivityFeed = () => {
  return (
    <Card className="shadow-card mt-6">
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <Timeline>
        {activityItems.map((item) => (
          <Timeline.Item key={item.id} dot={item.icon}>
            <div>
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-gray-500">{item.time}</div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default ActivityFeed;