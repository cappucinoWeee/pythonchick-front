// src/components/dashboard/GamesSection.js
import React from 'react';
import { Card, Typography, Row, Col, Badge, Button } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RocketOutlined, TrophyOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const GamesSection = () => {
  // Sample games data - in a real app, this would come from an API
  const games = [
    {
      id: 1,
      title: 'Python Adventure',
      description: 'Learn basic Python concepts in a fun adventure',
      image: '/games/python-adventure.png',
      difficulty: 'Beginner',
      xp: 150,
      unlocked: true,
    },
    {
      id: 2,
      title: 'Code Rescue',
      description: 'Save characters by solving coding challenges',
      image: '/games/code-rescue.png',
      difficulty: 'Intermediate',
      xp: 300,
      unlocked: true,
    },
    {
      id: 3,
      title: 'Logic Castle',
      description: 'Build logical structures to solve puzzles',
      image: '/games/logic-castle.png',
      difficulty: 'Intermediate',
      xp: 250,
      unlocked: false,
    },
    {
      id: 4,
      title: 'Debug Detective',
      description: 'Find and fix bugs to solve mysteries',
      image: '/games/debug-detective.png',
      difficulty: 'Advanced',
      xp: 400,
      unlocked: false,
    },
  ];

  return (
    <Card className="shadow-md border-0 mb-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="m-0">
          Fun Coding Games
        </Title>
        <Link to="/games" className="text-primary">
          View All
        </Link>
      </div>

      <Row gutter={[16, 16]}>
        {games.slice(0, 3).map((game) => (
          <Col xs={24} sm={12} md={8} key={game.id}>
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card
                hoverable
                cover={
                  <div className="relative h-40 overflow-hidden">
                    <img alt={game.title} src={game.image} className="w-full h-full object-cover" />

                    {!game.unlocked && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <LockOutlined className="text-3xl text-white" />
                      </div>
                    )}

                    <Badge
                      count={game.difficulty}
                      style={{ backgroundColor: game.unlocked ? '#52c41a' : '#8c8c8c' }}
                      className="absolute top-2 right-2"
                    />
                  </div>
                }
                actions={[
                  <Link to={game.unlocked ? `/games/${game.id}` : '#'}>
                    <Button
                      type="primary"
                      icon={<RocketOutlined />}
                      disabled={!game.unlocked}
                      block
                    >
                      {game.unlocked ? 'Play Now' : 'Locked'}
                    </Button>
                  </Link>,
                ]}
              >
                <Card.Meta
                  title={game.title}
                  description={
                    <div>
                      <Text className="block mb-2 text-gray-600 line-clamp-2">
                        {game.description}
                      </Text>
                      <div className="flex items-center">
                        <TrophyOutlined className="text-yellow-500 mr-1" />
                        <Text type="secondary">{game.xp} XP</Text>
                      </div>
                    </div>
                  }
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default GamesSection;
