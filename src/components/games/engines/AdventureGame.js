// src/components/games/engines/AdventureGame.js
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Alert, Progress, Collapse } from 'antd';
import { BulbOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import CodeCompiler from '../../compiler/CodeCompiler';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const AdventureGame = ({ gameData, onComplete, onScoreUpdate }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  
  const scenes = gameData.scenes || [];
  const progress = Math.round(((currentScene + 1) / scenes.length) * 100);
  
  const handleCodeSuccess = (code) => {
    setFeedback('success');
    setScore(prevScore => prevScore + 10);
    onScoreUpdate && onScoreUpdate(score + 10);
    
    setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
        setFeedback(null);
        setShowHint(false);
      } else {
        setCompleted(true);
        onComplete && onComplete(score + 10);
      }
    }, 1500);
  };
  
  const handleCodeError = () => {
    setFeedback('error');
    setTimeout(() => {
      setFeedback(null);
    }, 1500);
  };
  
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
  
  const scene = scenes[currentScene];
  
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
              src={scene.image} 
              alt={scene.title} 
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}
      </Card>
      
      <Card>
        <Title level={4}>Challenge</Title>
        <Paragraph>{scene.challenge.instructions}</Paragraph>
        
        {showHint && (
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
        
        {feedback === 'error' && (
          <Alert
            message="Not quite right"
            description="Try again! Check the hints if you need help."
            type="error"
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
      </Card>
    </div>
  );
};

export default AdventureGame;