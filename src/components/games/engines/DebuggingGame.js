// src/components/games/engines/DebuggingGame.js
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Alert, Progress, Badge, Tag, Collapse } from 'antd';
import {
  BugOutlined,
  CheckCircleFilled,
  SearchOutlined,
  BulbOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import CodeCompiler from '../../compiler/CodeCompiler';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const DebuggingGame = ({ gameData, onComplete, onScoreUpdate, userProgress }) => {
  const [currentMission, setCurrentMission] = useState(userProgress?.currentLevel || 0);
  const [score, setScore] = useState(userProgress?.score || 0);
  const [completed, setCompleted] = useState(userProgress?.completed || false);
  const [showHint, setShowHint] = useState(false);
  const [bugsFound, setBugsFound] = useState(0);
  const [code, setCode] = useState('');

  const missions = gameData.missions || [];

  useEffect(() => {
    // Initialize from user progress if available
    if (userProgress) {
      setScore(userProgress.score || 0);
      setCurrentMission(userProgress.currentLevel || 0);
      setBugsFound(userProgress.data?.bugsFound || 0);
    }

    // Set initial buggy code
    if (missions[currentMission]) {
      setCode(missions[currentMission].buggyCode || '');
    }
  }, [userProgress, missions, currentMission]);

  const getCurrentMission = () => {
    return missions[currentMission] || null;
  };

  const handleMissionComplete = (fixedCode) => {
    const mission = getCurrentMission();
    const pointsEarned = 20;
    const newScore = score + pointsEarned;
    const newBugsFound = bugsFound + 1;

    // Update state
    setScore(newScore);
    setBugsFound(newBugsFound);

    // Update progress
    onScoreUpdate && onScoreUpdate(newScore, { bugsFound: newBugsFound });

    // Move to next mission or complete game
    if (currentMission < missions.length - 1) {
      setCurrentMission(currentMission + 1);
      // Set the buggy code for the next mission
      setCode(missions[currentMission + 1].buggyCode || '');
    } else {
      // Game completed
      setCompleted(true);
      onComplete && onComplete(newScore);
    }
  };

  // Render game completed
  if (completed) {
    return (
      <Card className="shadow-md border-0 text-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleFilled className="text-5xl text-green-500" />
          </div>

          <Title level={2} className="text-primary mb-4">
            All Bugs Squashed!
          </Title>

          <Paragraph className="mb-4">
            Congratulations! You've successfully debugged all code and fixed {bugsFound} bugs,
            earning a total of {score} XP!
          </Paragraph>

          <div className="mt-6">
            <Button type="primary" onClick={() => (window.location.href = '/games')}>
              Back to Games
            </Button>
          </div>
        </motion.div>
      </Card>
    );
  }

  // Get current mission
  const mission = getCurrentMission();

  if (!mission) {
    return (
      <Card className="shadow-md border-0 text-center py-8">
        <Alert
          message="Game Error"
          description="Could not load mission data."
          type="error"
          showIcon
        />
      </Card>
    );
  }

  // Calculate progress percentage
  const progressPercentage = Math.round((currentMission / missions.length) * 100);

  return (
    <div className="debugging-game">
      <Card className="shadow-md border-0 mb-4">
        <div className="flex justify-between items-center">
          <Title level={4} className="mb-0">
            Bug Hunter Mission {currentMission + 1}/{missions.length}
          </Title>
          <Space>
            <Badge count={`${bugsFound} Bugs Fixed`} style={{ backgroundColor: '#52c41a' }} />
            <Tag color="blue">{score} XP</Tag>
          </Space>
        </div>
        <Progress percent={progressPercentage} status="active" showInfo={false} className="mt-2" />
      </Card>

      <Card className="shadow-md border-0 mb-4">
        <div className="flex items-start">
          <div className="mr-4 p-3 bg-red-100 rounded-lg">
            <BugOutlined className="text-3xl text-red-500" />
          </div>
          <div>
            <Title level={3}>{mission.title}</Title>
            <Paragraph>
              {mission.description || 'Find and fix all bugs in the code below.'}
            </Paragraph>
          </div>
        </div>
      </Card>

      <Card className="shadow-md border-0">
        <Title level={4}>
          <SearchOutlined className="mr-2" />
          Debug the Code
        </Title>

        {showHint && (
          <Alert
            message="Debug Hint"
            description={
              mission.hint ||
              'Look for syntax errors, indentation issues, or logical errors in the code.'
            }
            type="info"
            showIcon
            icon={<BulbOutlined />}
            className="mb-4"
            closable
            onClose={() => setShowHint(false)}
          />
        )}

        <CodeCompiler initialCode={code} onSuccess={handleMissionComplete} />

        <div className="mt-4 flex justify-between">
          <Button onClick={() => setShowHint(!showHint)}>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>

          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            onClick={() => setCode(mission.fixedCode)}
          >
            Show Solution
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DebuggingGame;
