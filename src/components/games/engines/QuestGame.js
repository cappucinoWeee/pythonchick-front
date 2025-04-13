// src/components/games/engines/QuestGame.js
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Alert, Progress, Tabs, Avatar, Select, Row, Col } from 'antd';
import { TrophyOutlined, CheckCircleFilled, UserOutlined, RightOutlined, BulbOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import CodeCompiler from '../../compiler/CodeCompiler';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const QuestGame = ({ gameData, onComplete, onScoreUpdate, userProgress }) => {
  const [character, setCharacter] = useState(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(userProgress?.score || 0);
  const [completed, setCompleted] = useState(userProgress?.completed || false);
  const [showHint, setShowHint] = useState(false);
  
  const characters = gameData.characters || [];
  const levels = gameData.levels || [];
  
  useEffect(() => {
    // Initialize from user progress if available
    if (userProgress) {
      setScore(userProgress.score || 0);
      setCurrentLevelIndex(userProgress.currentLevel || 0);
      
      // If user already selected a character
      if (userProgress.data && userProgress.data.character) {
        setCharacter(characters.find(c => c.id === userProgress.data.character));
      }
    }
  }, [userProgress, characters]);
  
  const handleCharacterSelect = (characterId) => {
    const selectedCharacter = characters.find(c => c.id === characterId);
    setCharacter(selectedCharacter);
    
    // Update progress
    onScoreUpdate && onScoreUpdate(score);
  };
  
  const getCurrentLevel = () => {
    return levels[currentLevelIndex] || null;
  };
  
  const getCurrentChallenge = () => {
    const level = getCurrentLevel();
    return level && level.challenges ? level.challenges[currentChallengeIndex] : null;
  };
  
  const handleChallengeComplete = (code) => {
    const pointsEarned = 10;
    const newScore = score + pointsEarned;
    setScore(newScore);
    onScoreUpdate && onScoreUpdate(newScore);
    
    // Move to next challenge or level
    const currentLevel = getCurrentLevel();
    
    if (currentChallengeIndex < currentLevel.challenges.length - 1) {
      // Move to next challenge in current level
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else if (currentLevelIndex < levels.length - 1) {
      // Move to next level
      setCurrentLevelIndex(currentLevelIndex + 1);
      setCurrentChallengeIndex(0);
    } else {
      // Game completed
      setCompleted(true);
      onComplete && onComplete(newScore);
    }
  };
  
  // Render character selection
  if (!character) {
    return (
      <Card className="shadow-md border-0 text-center">
        <Title level={3} className="mb-6">Choose Your Character</Title>
        
        <Row gutter={[24, 24]} justify="center">
          {characters.map(char => (
            <Col xs={24} sm={8} key={char.id}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  hoverable
                  className="character-card text-center"
                  onClick={() => handleCharacterSelect(char.id)}
                >
                  <Avatar 
                    src={char.avatar} 
                    size={100} 
                    icon={<UserOutlined />}
                    className="mb-4"
                  />
                  <Title level={4}>{char.name}</Title>
                  <Text type="secondary">Special Power: {char.specialPower}</Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
  
  // Render game completed
  if (completed) {
    return (
      <Card className="shadow-md border-0 text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrophyOutlined className="text-5xl text-yellow-500" />
          </div>
          
          <Title level={2} className="text-primary mb-4">Quest Completed!</Title>
          
          <Paragraph className="mb-4">
            Congratulations, {character.name}! You've completed all challenges and earned {score} XP!
          </Paragraph>
          
          <div className="mt-6">
            <Button type="primary" onClick={() => window.location.href = '/games'}>
              Back to Games
            </Button>
          </div>
        </motion.div>
      </Card>
    );
  }
  
  // Render active game
  const currentLevel = getCurrentLevel();
  const currentChallenge = getCurrentChallenge();
  
  if (!currentLevel || !currentChallenge) {
    return (
      <Card className="shadow-md border-0 text-center py-8">
        <Alert
          message="Game Error"
          description="Could not load game level or challenge."
          type="error"
          showIcon
        />
      </Card>
    );
  }
  
  return (
    <div className="quest-game">
      <Card className="shadow-md border-0 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar 
              src={character.avatar} 
              size={40} 
              icon={<UserOutlined />}
              className="mr-2"
            />
            <div>
              <Text strong>{character.name}</Text>
              <div className="text-xs text-gray-500">Power: {character.specialPower}</div>
            </div>
          </div>
          
          <Space>
            <div>
              <Text strong>Level: {currentLevelIndex + 1}/{levels.length}</Text>
            </div>
            <div>
              <Text strong>Score: {score} XP</Text>
            </div>
          </Space>
        </div>
        
        <Progress 
          percent={((currentLevelIndex * 100) + 
            (currentChallengeIndex / currentLevel.challenges.length * 100)) / levels.length} 
          status="active"
          showInfo={false}
          className="mt-4"
        />
      </Card>
      
      <Card className="shadow-md border-0 mb-4">
        <Title level={3}>{currentLevel.title}</Title>
        <Paragraph>{currentLevel.description}</Paragraph>
      </Card>
      
      <Card className="shadow-md border-0">
        <div className="flex items-start mb-4">
          <div className="mr-4 flex-shrink-0">
            <Avatar 
              src={character.avatar} 
              size={60} 
              icon={<UserOutlined />} 
            />
          </div>
          <div>
            <Title level={4} className="mb-2">{currentChallenge.title}</Title>
            <Paragraph>{currentChallenge.description}</Paragraph>
          </div>
        </div>
        
        {showHint && (
          <Alert
            message="Hint"
            description={currentChallenge.hint || "Try using the functions and concepts you've learned so far."}
            type="info"
            showIcon
            icon={<BulbOutlined />}
            className="mb-4"
            closable
            onClose={() => setShowHint(false)}
          />
        )}
        
        <CodeCompiler
          initialCode={currentChallenge.starterCode || "# Write your code here\n\n"}
          expectedOutput={currentChallenge.expectedOutput}
          onSuccess={handleChallengeComplete}
        />
        
        <div className="mt-4 flex justify-between">
          <Button onClick={() => setShowHint(!showHint)}>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuestGame;