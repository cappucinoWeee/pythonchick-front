// src/components/games/engines/AdventureGame.js
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Alert, Progress, Collapse } from 'antd';
import { BulbOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import CodeCompiler from '../../compiler/CodeCompiler';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const AdventureGame = ({ gameData, onComplete, onScoreUpdate, userProgress }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  
  // Make sure gameData.scenes exists before trying to access it
  const scenes = gameData?.scenes || [];
  const progress = scenes.length > 0 ? Math.round(((currentScene + 1) / scenes.length) * 100) : 0;
  
  // Initialize from user progress if available
  useEffect(() => {
    if (userProgress) {
      setScore(userProgress.score || 0);
      if (userProgress.currentLevel !== undefined) {
        setCurrentScene(userProgress.currentLevel);
      }
      setCompleted(userProgress.completed || false);
    }
  }, [userProgress]);
  
  const handleCodeSuccess = (code) => {
    setFeedback('success');
    const newScore = score + 10;
    setScore(newScore);
    onScoreUpdate && onScoreUpdate(newScore);
    
    setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
        setFeedback(null);
        setShowHint(false);
      } else {
        setCompleted(true);
        onComplete && onComplete(newScore);
      }
    }, 1500);
  };
  
  const handleCodeError = () => {
    setFeedback('error');
    setTimeout(() => {
      setFeedback(null);
    }, 1500);
  };
  
  // If game is already completed, show completion screen
  if (completed) {
    return (
      <Card className="text-center py-8">
        <CheckCircleFilled className="text-6xl text-green-500 mb-4" />
        <Title level={2}>Adventure Completed!</Title>
        <Paragraph className="mb-4">
          Congratulations! You've successfully completed this adventure and earned {score} XP.
        </Paragraph>
        <Button type="primary" onClick={() => window.location.href = '/games'}>
          Back to Games
        </Button>
      </Card>
    );
  }
  
  // No scenes available, show loading or empty state
  if (scenes.length === 0) {
    return (
      <Card className="text-center py-8">
        <Title level={3}>No adventure scenes available</Title>
        <Paragraph>
          There appears to be no content for this adventure yet.
        </Paragraph>
        <Button type="primary" onClick={() => window.location.href = '/games'}>
          Back to Games
        </Button>
      </Card>
    );
  }
  
  // Make sure the current scene exists and is valid
  const scene = scenes[currentScene];
  if (!scene) {
    return (
      <Card className="text-center py-8">
        <Title level={3}>Scene not found</Title>
        <Paragraph>
          The requested scene couldn't be loaded.
        </Paragraph>
        <Button type="primary" onClick={() => window.location.href = '/games'}>
          Back to Games
        </Button>
      </Card>
    );
  }
  
  return (
    <div className="adventure-game">
      <Card className="mb-4">
        <Progress percent={progress} status="active" />
        <div className="flex justify-between text-sm mt-1">
          <span>Scene {currentScene + 1} of {scenes.length}</span>
          <span>Score: {score} XP</span>
        </div>
      </Card>
      
      <Card className="mb-4">
        <Title level={3}>{scene.title}</Title>
        <Paragraph>{scene.description}</Paragraph>
        
        {scene.image && (
          <div className="mb-4">
            <img 
              src={scene.image || scene.background} 
              alt={scene.title} 
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}
      </Card>
      
      <Card>
        <Title level={4}>Challenge</Title>
        {scene.challenge && (
          <>
            <Paragraph>{scene.challenge.instructions}</Paragraph>
            
            {showHint && scene.hints && scene.hints.length > 0 && (
              <Collapse className="mb-4">
                <Panel header="Hints" key="1">
                  <ul className="list-disc pl-4">
                    {scene.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </Panel>
              </Collapse>
            )}
            
            {feedback === 'success' && (
              <Alert
                message="Correct!"
                description="Great job! You solved the challenge."
                type="success"
                showIcon
                className="mb-4"
              />
            )}
        
            <CodeCompiler
            initialCode={scene.challenge.starterCode}
            expectedOutput={scene.challenge.expectedOutput}
            onSuccess={handleCodeSuccess}
            onError={handleCodeError}
            />
            
            <div className="mt-4 flex justify-between">
            <Button onClick={() => setShowHint(!showHint)}>
                {showHint ? 'Hide Hints' : 'Show Hints'}
            </Button>
            
            {currentScene > 0 && (
                <Button onClick={() => setCurrentScene(currentScene - 1)}>
                Previous Scene
                </Button>
            )}
            </div>
        </>)}
      </Card>
    </div>
  );
};

export default AdventureGame;