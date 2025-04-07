// src/pages/GamesPage.js
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Breadcrumb, 
  List, 
  Tag, 
  Button, 
  Modal,
  Tabs,
  Space,
  Badge,
  Collapse,
  Row,
  Col
} from 'antd';
import { Link } from 'react-router-dom';
import { 
  HomeOutlined, 
  AimOutlined, 
  CodeOutlined,
  TrophyOutlined,
  BulbOutlined,
  StarOutlined
} from '@ant-design/icons';
import CodeCompiler from '../components/compiler/CodeCompiler';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const GamesPage = () => {
  const { user, setUser } = useAppContext();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('beginner');
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/games/challenges?difficulty=${activeTabKey}`);
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallenges();
  }, [activeTabKey]);
  
  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setShowHints(false);
  };
  
  const handleCloseChallenge = () => {
    setSelectedChallenge(null);
  };
  
  const handleSuccess = async (code) => {
    // Update user with new XP and coins
    const updatedUser = { ...user };
    updatedUser.experience += selectedChallenge.points;
    updatedUser.coins += selectedChallenge.points / 2;
    setUser(updatedUser);
    
    // In a real app, we would also save this to the backend
  };
  
  return (
    <div className="games-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <AimOutlined /> Games
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <Card className="shadow-md border-0 mb-6">
        <Title level={2}>Coding Challenges</Title>
        <Paragraph className="text-gray-600">
          Test your Python skills with these fun coding challenges and earn XP and coins!
        </Paragraph>
      </Card>
      
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey}>
        <TabPane tab="Beginner" key="beginner">
          <ChallengesList 
            challenges={challenges} 
            loading={loading} 
            onSelect={handleChallengeSelect} 
          />
        </TabPane>
        <TabPane tab="Intermediate" key="intermediate">
          <ChallengesList 
            challenges={challenges} 
            loading={loading} 
            onSelect={handleChallengeSelect} 
          />
        </TabPane>
        <TabPane tab="Advanced" key="advanced">
          <ChallengesList 
            challenges={challenges} 
            loading={loading} 
            onSelect={handleChallengeSelect} 
          />
        </TabPane>
      </Tabs>
      
      <Modal
        title={selectedChallenge?.title || "Coding Challenge"}
        open={!!selectedChallenge}
        onCancel={handleCloseChallenge}
        footer={null}
        width={800}
      >
        {selectedChallenge && (
          <div className="challenge-modal">
            <div className="challenge-description mb-4">
              <Paragraph>{selectedChallenge.description}</Paragraph>
              <div className="flex items-center justify-between">
                <Tag color="blue"><CodeOutlined /> Python</Tag>
                <Space>
                  <Tag color="gold"><StarOutlined /> {selectedChallenge.points} XP</Tag>
                  <Tag color="green"><TrophyOutlined /> {Math.floor(selectedChallenge.points / 2)} Coins</Tag>
                </Space>
              </div>
            </div>
            
            <Collapse className="mb-4" activeKey={showHints ? ['1'] : []}>
              <Panel 
                header="Show Hints" 
                key="1"
                extra={<Button size="small" type="link" onClick={() => setShowHints(!showHints)}>
                  {showHints ? 'Hide' : 'Show'}
                </Button>}
              >
                <List
                  dataSource={selectedChallenge.hints}
                  renderItem={(hint, index) => (
                    <List.Item>
                      <BulbOutlined className="text-yellow-500 mr-2" />
                      <span>{hint}</span>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
            
            <CodeCompiler 
              initialCode={selectedChallenge.starter_code} 
              expectedOutput=""  // We don't want to show the expected output
              onSuccess={handleSuccess}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

// Helper component for challenges list
const ChallengesList = ({ challenges, loading, onSelect }) => {
  return (
    <List
      loading={loading}
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4 }}
      dataSource={challenges}
      renderItem={challenge => (
        <List.Item>
          <Card 
            hoverable
            title={
              <div className="flex items-center justify-between">
                {challenge.title}
                <Tag color="gold">{challenge.points} XP</Tag>
              </div>
            }
            onClick={() => onSelect(challenge)}
          >
            <Paragraph className="h-24 overflow-hidden">
              {challenge.description}
            </Paragraph>
            <div className="text-center mt-4">
              <Button type="primary">
                Start Challenge
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default GamesPage;