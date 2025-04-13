// src/components/profile/AchievementsList.js - Updated with reliable icon display
import React from 'react';
import { Row, Col, Card, Badge, Typography } from 'antd';
import { motion } from 'framer-motion';
import {
  TrophyOutlined,
  StarOutlined,
  FireOutlined,
  CheckCircleOutlined,
  RocketOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Map achievement icons to ensure they display
const getAchievementIcon = (iconCode) => {
  switch (iconCode) {
    case '🔰':
      return <RocketOutlined style={{ fontSize: 36, color: '#1890FF' }} />;
    case '⚡':
      return <FireOutlined style={{ fontSize: 36, color: '#FF4D4F' }} />;
    case '🏆':
      return <TrophyOutlined style={{ fontSize: 36, color: '#52C41A' }} />;
    case '🔥':
      return <FireOutlined style={{ fontSize: 36, color: '#FF4D4F' }} />;
    case '🐍':
      return <StarOutlined style={{ fontSize: 36, color: '#722ED1' }} />;
    case '🐞':
      return <CheckCircleOutlined style={{ fontSize: 36, color: '#FF8C00' }} />;
    case '👥':
      return <TrophyOutlined style={{ fontSize: 36, color: '#1890FF' }} />;
    case '🌅':
      return <RocketOutlined style={{ fontSize: 36, color: '#FF8C00' }} />;
    default:
      return <TrophyOutlined style={{ fontSize: 36, color: '#1890FF' }} />;
  }
};

// Sample achievements data
const sampleAchievements = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🔰',
    earned: true,
    date: '2023-04-01',
  },
  {
    id: 2,
    title: 'Quick Learner',
    description: 'Complete 5 lessons in a single day',
    icon: '⚡',
    earned: true,
    date: '2023-04-02',
  },
  {
    id: 3,
    title: 'Quiz Master',
    description: 'Score 100% on a quiz',
    icon: '🏆',
    earned: false,
  },
  {
    id: 4,
    title: 'Coding Streak',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    earned: false,
  },
  {
    id: 5,
    title: 'Python Beginner',
    description: 'Complete the Python Basics course',
    icon: '🐍',
    earned: true,
    date: '2023-04-10',
  },
  {
    id: 6,
    title: 'Bug Hunter',
    description: 'Fix 10 code errors',
    icon: '🐞',
    earned: false,
  },
  {
    id: 7,
    title: 'Team Player',
    description: 'Add 3 friends to the platform',
    icon: '👥',
    earned: false,
  },
  {
    id: 8,
    title: 'Early Bird',
    description: 'Complete a lesson before 8 AM',
    icon: '🌅',
    earned: true,
    date: '2023-04-15',
  },
];

const AchievementsList = ({ achievements = sampleAchievements }) => {
  const earnedCount = achievements.filter((item) => item.earned).length;

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Title level={4} className="m-0">
          Your Achievements
        </Title>
        <Badge
          count={`${earnedCount}/${achievements.length}`}
          style={{ backgroundColor: '#52c41a' }}
        />
      </div>

      <Row gutter={[16, 16]}>
        {achievements.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className={`text-center h-full ${!item.earned ? 'opacity-60' : ''}`} bordered>
                <div className={`mb-3 ${!item.earned ? 'grayscale' : ''}`}>
                  {getAchievementIcon(item.icon)}
                </div>
                <Title level={5} className="mb-1">
                  {item.title}
                  {item.earned && (
                    <Badge count="Earned" style={{ backgroundColor: '#52c41a' }} className="ml-2" />
                  )}
                </Title>
                <Text type="secondary" className="block mb-3">
                  {item.description}
                </Text>
                {item.earned && (
                  <div className="text-xs text-gray-500 mt-2">Earned on {item.date}</div>
                )}
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AchievementsList;
