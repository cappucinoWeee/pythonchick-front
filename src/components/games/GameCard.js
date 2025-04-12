// src/components/games/GameCard.js
import React from 'react';
import { Card, Tag, Button, Tooltip, Badge } from 'antd';
import { 
  LockOutlined, 
  TrophyOutlined, 
  RocketOutlined, 
  ClockCircleOutlined  
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameCard = ({ game }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        hoverable
        cover={
          <div className="relative h-48 overflow-hidden">
            <img 
              alt={game.title}
              src={game.image}
              className="w-full h-full object-cover"
            />
            
            {!game.unlocked && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <LockOutlined className="text-3xl text-white" />
              </div>
            )}
            
            <Badge 
              count={game.difficulty}
              style={{ backgroundColor: 
                game.difficulty === 'Beginner' ? '#52c41a' : 
                game.difficulty === 'Intermediate' ? '#1890ff' : '#722ed1' 
              }}
              className="absolute top-2 right-2"
            />
          </div>
        }
        actions={[
          <div className="flex items-center justify-center">
            <TrophyOutlined className="text-yellow-500 mr-1" />
            <span>{game.xp} XP</span>
          </div>,
          <div className="flex items-center justify-center">
            <ClockCircleOutlined  className="text-blue-500 mr-1" />
            <span>{game.estimatedTime}</span>
          </div>,
          <Link to={game.unlocked ? `/games/${game.slug}` : '#'}>
            <Button 
              type="primary" 
              icon={<RocketOutlined />}
              disabled={!game.unlocked}
            >
              {game.unlocked ? 'Play Now' : 'Locked'}
            </Button>
          </Link>
        ]}
      >
        <Card.Meta
          title={game.title}
          description={
            <div>
              <p className="text-gray-600 mb-2">{game.shortDescription}</p>
              <Tag color={
                game.category === 'adventure' ? 'green' : 
                game.category === 'quest' ? 'blue' : 
                game.category === 'puzzle' ? 'purple' :
                game.category === 'simulation' ? 'orange' :
                'default'
              }>
                {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
              </Tag>
            </div>
          }
        />
      </Card>
    </motion.div>
  );
};

export default GameCard;