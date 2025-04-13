// src/components/dashboard/ActivityFeed.js
import React from 'react';
import { Card, Timeline, Tag, Avatar, Button } from 'antd';
import {
  CheckCircleOutlined,
  TrophyOutlined,
  StarOutlined,
  LikeOutlined,
  FireOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Mock data - in a real app, this would come from an API
const activityItems = [
  {
    id: 1,
    type: 'lesson_completed',
    title: 'Completed "Variables" lesson',
    course: 'Python Basics',
    courseId: 1,
    time: '2 hours ago',
    icon: <CheckCircleOutlined style={{ color: '#52C41A' }} />,
    iconColor: 'green',
    xp: 10,
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Earned "Fast Learner" achievement',
    description: 'Complete 3 lessons in a single day',
    time: 'Yesterday',
    icon: <TrophyOutlined style={{ color: '#FAAD14' }} />,
    iconColor: 'gold',
    xp: 25,
  },
  {
    id: 3,
    type: 'level_up',
    title: 'Reached Level 2',
    description: 'Keep going to unlock more content!',
    time: '2 days ago',
    icon: <StarOutlined style={{ color: '#1890FF' }} />,
    iconColor: 'blue',
    xp: 0,
  },
  {
    id: 4,
    type: 'streak',
    title: 'Maintained a 3-day streak',
    description: "You're on fire! 🔥",
    time: '3 days ago',
    icon: <FireOutlined style={{ color: '#FF4D4F' }} />,
    iconColor: 'red',
    xp: 15,
  },
  {
    id: 5,
    type: 'quiz',
    title: 'Scored 90% on "Python Basics" quiz',
    course: 'Python Basics',
    courseId: 1,
    time: '3 days ago',
    icon: <LikeOutlined style={{ color: '#722ED1' }} />,
    iconColor: 'purple',
    xp: 20,
  },
];

const ActivityCard = ({ activity }) => {
  return (
    <div className="flex p-3 border-b last:border-0 hover:bg-gray-50 transition-colors">
      <div
        className={`flex-shrink-0 mr-3 w-10 h-10 rounded-full bg-${activity.iconColor}-100 flex items-center justify-center`}
      >
        {activity.icon}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-sm mb-0.5 truncate">{activity.title}</p>
            {activity.xp > 0 && (
              <Tag color="volcano" className="flex-shrink-0">
                +{activity.xp} XP
              </Tag>
            )}
            {activity.description && (
              <p className="text-gray-600 text-xs mb-1">{activity.description}</p>
            )}
            {activity.course && (
              <Link to={`/courses/${activity.courseId}`}>
                <Tag color="blue" className="mr-0">
                  {activity.course}
                </Tag>
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="text-xs text-gray-500 flex items-center">
            <ClockCircleOutlined className="mr-1" />
            {activity.time}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = () => {
  return (
    <Card
      className="shadow-md border-0"
      title="Recent Activity"
      extra={
        <Link to="/profile" className="text-primary hover:text-primary-dark">
          View All
        </Link>
      }
    >
      <div className="activity-feed">
        {activityItems.map((item) => (
          <ActivityCard key={item.id} activity={item} />
        ))}
      </div>

      <div className="mt-4 text-center">
        <Button type="link">Load More</Button>
      </div>
    </Card>
  );
};

export default ActivityFeed;
