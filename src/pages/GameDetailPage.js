// src/pages/GameDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Breadcrumb, Spin } from 'antd';
import { HomeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import GamePage from './GamePage';

const { Title } = Typography;

const GameDetailPage = () => {
  const { gameId } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  
  // Fetch game data - in a real app, this would be from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGame({
        id: parseInt(gameId),
        title: 'Python Adventure',
        description: 'Learn basic Python concepts in a fun adventure',
      });
      setLoading(false);
    }, 500);
  }, [gameId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <div className="game-detail-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/games">
            <PlayCircleOutlined /> Games
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {game.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <GamePage />
    </div>
  );
};

export default GameDetailPage;