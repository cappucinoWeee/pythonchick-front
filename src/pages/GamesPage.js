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
  Spin
} from 'antd';
import { Link } from 'react-router-dom';
import { 
  HomeOutlined, 
  PlayCircleOutlined, 
  RocketOutlined, 
  TrophyOutlined,
  SearchOutlined,
  LockOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import GameCard from '../components/games/GameCard';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample games data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGames([
        {
          id: 1,
          title: 'Python Adventure',
          description: 'Learn basic Python concepts in a fun adventure where you\'ll solve puzzles and complete challenges.',
          image: '/games/python-adventure.png',
          difficulty: 'Beginner',
          category: 'adventure',
          xp: 150,
          unlocked: true
        },
        {
          id: 2,
          title: 'Code Rescue',
          description: 'Save characters by solving coding challenges. Write functions to help characters overcome obstacles.',
          image: '/games/code-rescue.png',
          difficulty: 'Intermediate',
          category: 'puzzle',
          xp: 300,
          unlocked: true
        },
        {
          id: 3,
          title: 'Logic Castle',
          description: 'Build logical structures to solve puzzles in this castle of mysteries. Test your logical thinking.',
          image: '/games/logic-castle.png',
          difficulty: 'Intermediate',
          category: 'puzzle',
          xp: 250,
          unlocked: false
        },
        {
          id: 4,
          title: 'Debug Detective',
          description: 'Find and fix bugs to solve mysteries. Put your debugging skills to the test in this detective story.',
          image: '/games/debug-detective.png',
          difficulty: 'Advanced',
          category: 'mystery',
          xp: 400,
          unlocked: false
        },
        {
          id: 5,
          title: 'Space Coder',
          description: 'Explore the universe while learning Python. Complete missions by writing code to navigate your spaceship.',
          image: '/games/space-coder.png',
          difficulty: 'Beginner',
          category: 'adventure',
          xp: 200,
          unlocked: true
        },
        {
          id: 6,
          title: 'Variable Quest',
          description: 'Master Python variables in this epic quest. Solve puzzles by using different variable types correctly.',
          image: '/games/variable-quest.png',
          difficulty: 'Beginner',
          category: 'quest',
          xp: 180,
          unlocked: true
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);
  
  // Filter games based on tab and search term
  const filteredGames = games.filter(game => {
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'unlocked' && game.unlocked) ||
                       (activeTab === 'locked' && !game.unlocked) ||
                       (activeTab === game.difficulty.toLowerCase()) ||
                       (activeTab === game.category);
                       
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchTerm.toLowerCase());
                          
    return matchesTab && matchesSearch;
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
            />
            
            <Select defaultValue="all" style={{ width: 120 }} onChange={(value) => setActiveTab(value)}>
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
        
        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        ) : filteredGames.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredGames.map(game => (
              <Col xs={24} sm={12} md={8} key={game.id}>
                {/* <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    hoverable
                    cover={
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          alt={game.title}
                          src={game.image}
                          className="w-full h-full object-cover"
                        />
                        
                        {!game.unlocked && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <LockOutlined className="text-3xl text-white" />
                          </div>
                        )}
                        
                        <Badge 
                          count={game.difficulty}
                          style={{ backgroundColor: 
                            game.difficulty === 'Beginner' ? '#52c41a' : 
                            game.difficulty === 'Intermediate' ? '#1890ff' : '#722ed1' 
                          }}
                          className="absolute top-2 right-2"
                        />
                      </div>
                    }
                    actions={[
                      <div className="flex items-center justify-center">
                        <TrophyOutlined className="text-yellow-500 mr-1" />
                        <span>{game.xp} XP</span>
                      </div>,
                      <Link to={game.unlocked ? `/games/${game.id}` : '#'}>
                        <Button 
                          type="primary" 
                          icon={<RocketOutlined />}
                          disabled={!game.unlocked}
                        >
                          {game.unlocked ? 'Play Now' : 'Locked'}
                        </Button>
                      </Link>
                    ]}
                  >
                    <Card.Meta
                      title={game.title}
                      description={
                        <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
                          {game.description}
                        </Paragraph>
                      }
                    />
                  </Card>
                </motion.div> */}
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