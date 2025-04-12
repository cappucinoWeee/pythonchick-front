// src/components/games/GameChallenge.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Collapse, List, Tag, Space, message, Spin } from 'antd';
import { 
  BulbOutlined, 
  StarOutlined, 
  TrophyOutlined,
  CodeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import CodeCompiler from '../compiler/CodeCompiler';
import gameService from '../../services/gameService';
import { useAuth } from '../../context/AuthContext';

const { Panel } = Collapse;

const GameChallenge = ({ challenge, onCompleted }) => {
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { user, setUser } = useAuth();
  
  // Update user data after completing a challenge
  const updateUserData = (pointsEarned, coinsEarned) => {
    if (user) {
      setUser({
        ...user,
        experience: (user.experience || 0) + pointsEarned,
        coins: (user.coins || 0) + coinsEarned
      });
    }
  };
  
  const handleSubmitChallenge = async (code) => {
    try {
      setLoading(true);
      setSubmitting(true);
      
      // Call API to submit challenge
      const response = await gameService.submitChallenge(challenge.id, code);
      
      setResult(response);
      
      if (response.correct) {
        message.success(`Great job! You earned ${response.points_earned} XP and ${response.coins_earned} coins!`);
        
        // Update user data with earned points and coins
        updateUserData(response.points_earned, response.coins_earned);
        
        // Notify parent component
        onCompleted && onCompleted(challenge.id);
      } else {
        message.error('Your solution is not quite right. Try again!');
      }
    } catch (error) {
      console.error('Error submitting challenge:', error);
      message.error('Error submitting challenge. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  
  return (
    <div className="game-challenge">
      <Card 
        title={challenge.title} 
        className="mb-4"
        loading={submitting}
      >
        <div className="mb-4">
          <p>{challenge.description}</p>
          <Space className="mt-2">
            <Tag color="blue"><CodeOutlined /> Python</Tag>
            <Tag color="gold"><StarOutlined /> {challenge.points} XP</Tag>
            <Tag color="green"><TrophyOutlined /> {Math.floor(challenge.points / 2)} Coins</Tag>
          </Space>
        </div>
        
        <Collapse 
          activeKey={showHints ? ['1'] : []}
          onChange={() => setShowHints(!showHints)}
          className="mb-4"
        >
          <Panel header="Hints" key="1">
            <List
              dataSource={challenge.hints || []}
              renderItem={(hint, index) => (
                <List.Item>
                  <BulbOutlined className="text-yellow-500 mr-2" />
                  <span>{hint}</span>
                </List.Item>
              )}
              locale={{ emptyText: 'No hints available for this challenge' }}
            />
          </Panel>
        </Collapse>
        
        {result && result.correct && (
          <Alert
            message="Challenge Completed!"
            description={`You solved this challenge correctly and earned ${result.points_earned} XP and ${result.coins_earned} coins.`}
            type="success"
            showIcon
            className="mb-4"
            closable
            onClose={() => setResult(null)}
          />
        )}
        
        {submitting ? (
          <div className="text-center py-8">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            <p className="mt-2">Evaluating your code...</p>
          </div>
        ) : (
          <CodeCompiler
            initialCode={challenge.starter_code || "# Write your code here\n\n"}
            onSuccess={handleSubmitChallenge}
            expectedOutput={challenge.expected_output}
            readOnly={loading}
          />
        )}
      </Card>
    </div>
  );
};

export default GameChallenge;