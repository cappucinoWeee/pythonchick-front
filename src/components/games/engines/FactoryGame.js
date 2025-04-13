// src/components/games/engines/FactoryGame.js
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Alert, Progress, Tabs, Badge, Row, Col } from 'antd';
import { CodeOutlined, ToolOutlined, CheckCircleFilled, RocketOutlined, BulbOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import CodeCompiler from '../../compiler/CodeCompiler';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const FactoryGame = ({ gameData, onComplete, onScoreUpdate, userProgress }) => {
  const [currentLevel, setCurrentLevel] = useState(userProgress?.currentLevel || 0);
  const [currentTask, setCurrentTask] = useState(0);
  const [score, setScore] = useState(userProgress?.score || 0);
  const [completed, setCompleted] = useState(userProgress?.completed || false);
  const [showHint, setShowHint] = useState(false);
  const [factoryHealth, setFactoryHealth] = useState(100);
  
  const factoryLevels = gameData.factoryLevels || [];
  
  useEffect(() => {
    // Initialize from user progress if available
    if (userProgress) {
      setScore(userProgress.score || 0);
      setCurrentLevel(userProgress.currentLevel || 0);
      setFactoryHealth(userProgress.data?.factoryHealth || 100);
    }
  }, [userProgress]);
  
  const getCurrentLevelData = () => {
    return factoryLevels[currentLevel] || null;
  };
  
  const getCurrentTask = () => {
    const levelData = getCurrentLevelData();
    return levelData?.tasks ? levelData.tasks[currentTask] : null;
  };
  
  const handleTaskComplete = (code) => {
    // Calculate points earned
    const pointsEarned = 15;
    const newScore = score + pointsEarned;
    setScore(newScore);
    onScoreUpdate && onScoreUpdate(newScore);
    
    // Move to next task or level
    const levelData = getCurrentLevelData();
    
    if (currentTask < levelData.tasks.length - 1) {
      // Move to next task in current level
      setCurrentTask(currentTask + 1);
    } else if (currentLevel < factoryLevels.length - 1) {
      // Move to next level
      setCurrentLevel(currentLevel + 1);
      setCurrentTask(0);
      
      // Improve factory health for completing a level
      const newHealth = Math.min(factoryHealth + 10, 100);
      setFactoryHealth(newHealth);
    } else {
      // Game completed
      setCompleted(true);
      onComplete && onComplete(newScore);
    }
  };
  
  // Render game completed state
  if (completed) {
    return (
      <Card className="shadow-md border-0 text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <RocketOutlined className="text-5xl text-blue-500" />
          </div>
          
          <Title level={2} className="text-primary mb-4">Factory Fully Operational!</Title>
          
          <Paragraph className="mb-4">
            Congratulations! You've successfully built a working factory using Python functions
            and earned {score} XP!
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
  
  // Get current level and task
  const levelData = getCurrentLevelData();
  const task = getCurrentTask();
  
  if (!levelData || !task) {
    return (
      <Card className="shadow-md border-0 text-center py-8">
        <Alert
          message="Game Error"
          description="Could not load game level or task."
          type="error"
          showIcon
        />
      </Card>
    );
  }
  
  // Calculate progress percentage
  const totalTasks = factoryLevels.reduce((sum, level) => sum + level.tasks.length, 0);
  const completedTasks = factoryLevels.slice(0, currentLevel).reduce((sum, level) => sum + level.tasks.length, 0) + currentTask;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
  
  return (
    <div className="factory-game">
      <Card className="shadow-md border-0 mb-4">
        <Row gutter={[16, 16]} align="middle">
          <Col span={16}>
            <Title level={4} className="mb-0">Factory Production: Level {currentLevel + 1}</Title>
            <Progress 
              percent={progressPercentage} 
              status="active"
              showInfo={false}
              className="mt-2"
            />
          </Col>
          <Col span={8}>
            <div className="text-right">
              <Text strong>Factory Health:</Text>
              <Progress 
                percent={factoryHealth} 
                status={factoryHealth < 30 ? "exception" : "normal"}
                size="small"
                className="mt-1"
              />
            </div>
          </Col>
        </Row>
      </Card>
      
      <Card className="shadow-md border-0 mb-4">
        <div className="flex items-start">
          <div className="mr-4 p-3 bg-blue-100 rounded-lg">
            <ToolOutlined className="text-3xl text-blue-500" />
          </div>
          <div>
            <Title level={3}>{levelData.title}</Title>
            <Paragraph>{levelData.description}</Paragraph>
          </div>
        </div>
      </Card>
      
      <Card className="shadow-md border-0">
        <Title level={4}>
          {task.title}
          <Badge count={`Task ${currentTask + 1}/${levelData.tasks.length}`} style={{ backgroundColor: '#1890ff' }} className="ml-3" />
        </Title>
        <Paragraph className="mb-4">{task.description}</Paragraph>
        
        {showHint && (
          <Alert
            message="Hint"
            description={task.hint || "Try using function definitions and proper syntax to solve this challenge."}
            type="info"
            showIcon
            icon={<BulbOutlined />}
            className="mb-4"
            closable
            onClose={() => setShowHint(false)}
          />
        )}
        
        <CodeCompiler
          initialCode={task.starterCode || "# Define your function below\n\n"}
          expectedOutput={task.tests && task.tests[0] ? task.tests[0].expectedOutput : null}
          onSuccess={handleTaskComplete}
        />
        
        <div className="mt-4 flex justify-between">
          <Button onClick={() => setShowHint(!showHint)}>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>
          
          <div>
            <Text className="mr-2">Current Score:</Text>
            <Text strong>{score} XP</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FactoryGame;