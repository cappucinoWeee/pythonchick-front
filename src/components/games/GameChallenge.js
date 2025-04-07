// src/components/games/GameChallenge.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Collapse, List, Tag, Space, message } from 'antd';
import { 
  BulbOutlined, 
  StarOutlined, 
  TrophyOutlined,
  CodeOutlined
} from '@ant-design/icons';
import CodeCompiler from '../compiler/CodeCompiler';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

const { Panel } = Collapse;

const GameChallenge = ({ challenge, onCompleted }) => {
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { user, setUser } = useAppContext();
  
  const handleSubmitChallenge = async (code) => {
    try {
      setLoading(true);
      
      const response = await axios.post('/api/v1/games/challenges/submit', {
        challenge_id: challenge.id,
        code: code
      });
      
      setResult(response.data);
      
      if (response.data.correct) {
        message.success(`Great job! You earned ${response.data.points_earned} XP and ${response.data.coins_earned} coins!`);
        
        // Update user context
        setUser({
          ...user,
          experience: user.experience + response.data.points_earned,
          coins: user.coins + response.data.coins_earned
        });
        
        // Notify parent component
        onCompleted && onCompleted(challenge.id);
      } else {
        message.error('Your solution is not quite right. Try again!');
      }
    } catch (error) {
      console.error('Error submitting challenge:', error);
      message.error('Error submitting challenge');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="game-challenge">
      <Card title={challenge.title} className="mb-4">
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
              dataSource={challenge.hints}
              renderItem={(hint, index) => (
                <List.Item>
                  <BulbOutlined className="text-yellow-500 mr-2" />
                  <span>{hint}</span>
                </List.Item>
              )}
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
        
        <CodeCompiler
          initialCode={challenge.starter_code}
          onSuccess={handleSubmitChallenge}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default GameChallenge;