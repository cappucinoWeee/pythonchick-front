import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Breadcrumb, Spin, Tabs, message } from 'antd';
import { HomeOutlined, PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import gameService from '../services/gameService';

// Import game engines
import AdventureGame from '../components/games/engines/AdventureGame';
import QuestGame from '../components/games/engines/QuestGame';
import FactoryGame from '../components/games/engines/FactoryGame';
import DebuggingGame from '../components/games/engines/DebuggingGame';
import ExplorationGame from '../components/games/engines/ExplorationGame';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const GameDetailPage = () => {
  const { slug } = useParams();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        const gameData = await gameService.getGameBySlug(slug, user?.id);
        console.log(gameData);
        setGame({
          id: gameData.id,
          title: gameData.title,
          slug: gameData.slug,
          description: gameData.description,
          shortDescription: gameData.short_description,
          image: gameData.image_url,
          difficulty: gameData.difficulty,
          category: gameData.category,
          xp: gameData.xp_reward,
          estimatedTime: gameData.estimated_time,
          unlocked: gameData.unlocked,
          gameType: gameData.category, // Map category to gameType
          gameData: gameData.gameData || {}, // Assume gameData is included
        });
        setUserProgress({
          gameId: gameData.id,
          started: gameData.is_started,
          completed: gameData.is_completed,
          currentLevel: gameData.current_level,
          score: gameData.score,
          lastPlayed: gameData.last_played_at,
          data: gameData.saved_data || {},
        });
      } catch (error) {
        message.error('Failed to load game');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [slug, user]);

  const handleGameComplete = async (finalScore) => {
    try {
      const updatedProgress = {
        is_started: true,
        is_completed: true,
        current_level: userProgress.currentLevel,
        score: finalScore,
        data: userProgress.data || {},
      };
      await gameService.updateGameProgress(game.id, updatedProgress);
      setUserProgress({ ...userProgress, ...updatedProgress });

      if (user) {
        const updatedUser = {
          ...user,
          experience: (user.experience || 0) + game.xp,
          level: Math.floor(((user.experience || 0) + game.xp) / 100) + 1,
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist user data
      }

      message.success(`Congratulations! You've earned ${game.xp} XP!`);
    } catch (error) {
      message.error('Failed to save game progress');
    }
  };

  const handleScoreUpdate = async (newScore, additionalData = {}) => {
    try {
      const updatedProgress = {
        is_started: true,
        is_completed: false,
        current_level: userProgress.currentLevel,
        score: newScore,
        data: { ...userProgress.data, ...additionalData },
      };
      await gameService.updateGameProgress(game.id, updatedProgress);
      setUserProgress({ ...userProgress, ...updatedProgress });
    } catch (error) {
      message.error('Failed to update score');
    }
  };

  const renderGameComponent = () => {
    if (!game || !game.gameData) return <p>Game data not available.</p>;

    switch (game.gameType) {
      case 'adventure':
        return (
          <AdventureGame
            gameData={game.gameData}
            onComplete={handleGameComplete}
            onScoreUpdate={handleScoreUpdate}
            userProgress={userProgress}
          />
        );
      case 'quest':
        return (
          <QuestGame
            gameData={game.gameData}
            onComplete={handleGameComplete}
            onScoreUpdate={handleScoreUpdate}
            userProgress={userProgress}
          />
        );
      case 'simulation':
        return (
          <FactoryGame
            gameData={game.gameData}
            onComplete={handleGameComplete}
            onScoreUpdate={handleScoreUpdate}
            userProgress={userProgress}
          />
        );
      case 'puzzle':
        return (
          <DebuggingGame
            gameData={game.gameData}
            onComplete={handleGameComplete}
            onScoreUpdate={handleScoreUpdate}
            userProgress={userProgress}
          />
        );
      case 'data-science':
        return (
          <ExplorationGame
            gameData={game.gameData}
            onComplete={handleGameComplete}
            onScoreUpdate={handleScoreUpdate}
            userProgress={userProgress}
          />
        );
      default:
        return <p>Game type not supported.</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center py-8">
        <p>Game not found.</p>
        <Link to="/games">Back to Games</Link>
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
        <Breadcrumb.Item>{game.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-md border-0 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img src={game.image} alt={game.title} className="w-full h-auto rounded-lg shadow-sm" />
          </div>
          <div className="md:w-2/3">
            <div className="flex justify-between items-start">
              <Title level={2}>{game.title}</Title>
              <div className="flex items-center">
                <TrophyOutlined className="text-yellow-500 mr-1" />
                <span className="font-medium">{game.xp} XP</span>
              </div>
            </div>
            <Paragraph className="text-lg">{game.description}</Paragraph>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Difficulty:</strong>
                <span className="ml-2">{game.difficulty}</span>
              </div>
              <div>
                <strong>Category:</strong>
                <span className="ml-2">
                  {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
                </span>
              </div>
              <div>
                <strong>Estimated Time:</strong>
                <span className="ml-2">{game.estimatedTime}</span>
              </div>
              <div>
                <strong>Status:</strong>
                <span className="ml-2">
                  {userProgress?.completed
                    ? 'Completed'
                    : userProgress?.started
                      ? 'In Progress'
                      : 'Not Started'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultActiveKey="play">
        <TabPane tab="Play Game" key="play">
          {renderGameComponent()}
        </TabPane>
        <TabPane tab="Instructions" key="instructions">
          <Card className="shadow-md border-0">
            <Title level={3}>How to Play</Title>
            <Paragraph>
              In this game, you'll use your Python coding skills to solve various challenges. Each
              challenge presents a problem to solve using Python code.
            </Paragraph>
            <ul className="list-disc pl-6 mb-4">
              <li>Read the challenge description carefully</li>
              <li>Write your Python code in the editor</li>
              <li>Click "Run Code" to test your solution</li>
              <li>If you get stuck, use the hints</li>
              <li>Complete all challenges to finish the game and earn XP</li>
            </ul>
            <Title level={4}>Tips</Title>
            <ul className="list-disc pl-6">
              <li>Pay attention to capitalization and spacing in your code</li>
              <li>Check your output against what's expected</li>
              <li>Use print() statements to debug your code</li>
              <li>Take your time and have fun!</li>
            </ul>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default GameDetailPage;
