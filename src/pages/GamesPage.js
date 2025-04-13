// src/pages/GamesPage.js
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Breadcrumb, 
  Row, 
  Col, 
  Button, 
  Tabs,
  Badge,
  Input,
  Select,
  Empty,
  Spin,
  message,
  Alert
} from 'antd';
import { Link } from 'react-router-dom';
import { 
  HomeOutlined, 
  PlayCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import GameCard from '../components/games/GameCard';
import gameService from '../services/gameService';
import { useAuth } from '../context/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [error, setError] = useState(null);
  
  // Fetch games data from the API
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construct filter object for the API call
        const filters = {
          difficulty: difficultyFilter !== 'all' ? difficultyFilter : null,
          category: activeTab !== 'all' && activeTab !== 'unlocked' ? activeTab : null,
          searchTerm: searchTerm || null
        };
        
        const data = await gameService.getAllGames(filters);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Games data:', data);
        }
        
        setGames(data);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again later.');
        message.error('Failed to load games');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, [activeTab, difficultyFilter, searchTerm]);
  
  // Filter games based on active tab (this is for client-side filtering)
  const filteredGames = games.filter(game => {
    // For 'unlocked' tab, filter by unlocked status
    if (activeTab === 'unlocked') {
      return game.unlocked;
    }
    
    return true;  // All other filtering is done by the API
  });
  
  return (
    <div className="games-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <PlayCircleOutlined /> Games
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <Card className="shadow-md border-0 mb-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <Title level={2} className="m-0">Coding Games</Title>
            <Text className="text-gray-600">
              Learn Python through fun interactive games
            </Text>
          </div>
          
          <div className="flex items-center space-x-2">
            <Search
              placeholder="Search games"
              style={{ width: 200 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={value => setSearchTerm(value)}
              allowClear
            />
            
            <Select 
              defaultValue="all" 
              style={{ width: 120 }} 
              onChange={(value) => setDifficultyFilter(value)}
            >
              <Option value="all">All Levels</Option>
              <Option value="beginner">Beginner</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="advanced">Advanced</Option>
            </Select>
          </div>
        </div>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
        >
          <TabPane tab="All Games" key="all" />
          <TabPane tab="Unlocked" key="unlocked" />
          <TabPane tab="Adventure" key="adventure" />
          <TabPane tab="Puzzle" key="puzzle" />
          <TabPane tab="Quest" key="quest" />
        </Tabs>
        
        {error && (
          <div className="mb-4">
            <Alert 
              message="Error Loading Games" 
              description={error}
              type="error"
              showIcon
              closable
            />
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        ) : filteredGames.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredGames.map(game => (
              <Col xs={24} sm={12} md={8} key={game.id}>
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No games found matching your criteria" />
        )}
      </Card>
      
      <Card className="shadow-md border-0">
        <Title level={3}>Why Learn Through Games?</Title>
        <Row gutter={[24, 24]} className="mt-4">
          <Col xs={24} md={8}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full">
                <Title level={4}>Fun & Engaging</Title>
                <Text>
                  Learning through games makes coding enjoyable and keeps you motivated to continue learning.
                </Text>
              </Card>
            </motion.div>
          </Col>
          
          <Col xs={24} md={8}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full">
                <Title level={4}>Practical Application</Title>
                <Text>
                  Games provide real-world context for coding concepts, helping you understand how to apply them.
                </Text>
              </Card>
            </motion.div>
          </Col>
          
          <Col xs={24} md={8}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full">
                <Title level={4}>Track Your Progress</Title>
                <Text>
                  Earn XP, unlock achievements, and see your coding skills improve as you complete more games.
                </Text>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default GamesPage;