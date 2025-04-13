import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Alert, Progress, Space } from 'antd';
import { RocketOutlined, CheckCircleFilled, BulbOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import CodeCompiler from '../../compiler/CodeCompiler';

const { Title, Paragraph } = Typography;

const ExplorationGame = ({ gameData, onComplete, onScoreUpdate, userProgress }) => {
  const [currentExpedition, setCurrentExpedition] = useState(userProgress?.currentLevel || 0);
  const [score, setScore] = useState(userProgress?.score || 0);
  const [completed, setCompleted] = useState(userProgress?.completed || false);
  const [showHint, setShowHint] = useState(false);

  const expeditions = gameData.expeditions || [];

  useEffect(() => {
    if (userProgress) {
      setScore(userProgress.score || 0);
      setCurrentExpedition(userProgress.currentLevel || 0);
    }
  }, [userProgress]);

  const getCurrentExpedition = () => {
    return expeditions[currentExpedition] || null;
  };

  const handleChallengeComplete = (code) => {
    const pointsEarned = 20;
    const newScore = score + pointsEarned;
    setScore(newScore);
    onScoreUpdate && onScoreUpdate(newScore);

    if (currentExpedition < expeditions.length - 1) {
      setCurrentExpedition(currentExpedition + 1);
    } else {
      setCompleted(true);
      onComplete && onComplete(newScore);
    }
  };

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
          <Title level={2} className="text-primary mb-4">
            Exploration Complete!
          </Title>
          <Paragraph className="mb-4">
            Congratulations! You've analyzed all datasets and earned {score} XP!
          </Paragraph>
          <Button type="primary" onClick={() => (window.location.href = '/games')}>
            Back to Games
          </Button>
        </motion.div>
      </Card>
    );
  }

  const expedition = getCurrentExpedition();

  if (!expedition) {
    return (
      <Card className="shadow-md border-0 text-center py-8">
        <Alert
          message="Game Error"
          description="Could not load expedition data."
          type="error"
          showIcon
        />
      </Card>
    );
  }

  const progressPercentage = Math.round((currentExpedition / expeditions.length) * 100);

  return (
    <div className="exploration-game">
      <Card className="shadow-md border-0 mb-4">
        <Title level={4} className="mb-0">
          Expedition {currentExpedition + 1}/{expeditions.length}
        </Title>
        <Progress percent={progressPercentage} status="active" className="mt-2" />
        <Space className="mt-2">
          <span>Score: {score} XP</span>
        </Space>
      </Card>

      <Card className="shadow-md border-0 mb-4">
        <Title level={3}>{expedition.title}</Title>
        <Paragraph>{expedition.description}</Paragraph>
      </Card>

      <Card className="shadow-md border-0">
        <Title level={4}>Challenge</Title>
        <Paragraph>{expedition.challenges[0]?.description}</Paragraph>
        {showHint && (
          <Alert
            message="Hint"
            description="Check the dataset structure and use appropriate Python libraries."
            type="info"
            showIcon
            icon={<BulbOutlined />}
            className="mb-4"
            closable
            onClose={() => setShowHint(false)}
          />
        )}
        <CodeCompiler
          initialCode={expedition.challenges[0]?.starterCode || '# Analyze the dataset\n'}
          expectedOutput={expedition.challenges[0]?.expectedOutput}
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

export default ExplorationGame;
