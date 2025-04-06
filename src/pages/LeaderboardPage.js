// src/pages/LeaderboardPage.js
import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Avatar, 
  Tag, 
  Tabs, 
  Select,
  Radio,
  Input
} from 'antd';
import { 
  SearchOutlined, 
  TrophyOutlined, 
  TeamOutlined,
  GlobalOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useAppContext } from '../context/AppContext';

const { TabPane } = Tabs;
const { Option } = Select;

const LeaderboardPage = () => {
  const { user } = useAppContext();
  const [timeRange, setTimeRange] = useState('all');
  
  // Leaderboard data - would come from API in real app
  const leaderboardData = [
    {
      key: '1',
      rank: 1,
      name: 'Alex Johnson',
      username: 'alexcode',
      level: 8,
      xp: 842,
      avatar: '/avatar1.png',
    },
    {
      key: '2',
      rank: 2,
      name: 'Sophia Chen',
      username: 'sophiapy',
      level: 7,
      xp: 756,
      avatar: '/avatar2.png',
    },
    {
      key: '3',
      rank: 3,
      name: 'Miguel Rodriguez',
      username: 'migueldev',
      level: 7,
      xp: 720,
      avatar: '/avatar3.png',
    },
    {
      key: '4',
      rank: 4,
      name: 'Harper Lee',
      username: 'harpercode',
      level: 6,
      xp: 678,
      avatar: '/avatar4.png',
    },
    {
      key: '5',
      rank: 5,
      name: 'User',
      username: 'pythonchick_user',
      level: 5,
      xp: 530,
      avatar: '/default-avatar.png',
      isCurrentUser: true,
    },
    {
      key: '6',
      rank: 6,
      name: 'Noah Chen',
      username: 'noahpy',
      level: 5,
      xp: 512,
      avatar: '/avatar6.png',
    },
    {
      key: '7',
      rank: 7,
      name: 'Olivia Johnson',
      username: 'oliviacoder',
      level: 4,
      xp: 489,
      avatar: '/avatar7.png',
    },
    {
      key: '8',
      rank: 8,
      name: 'Ethan Smith',
      username: 'pythonsmith',
      level: 4,
      xp: 457,
      avatar: '/avatar8.png',
    },
    {
      key: '9',
      rank: 9,
      name: 'Emma Davis',
      username: 'emmacode',
      level: 4,
      xp: 423,
      avatar: '/avatar9.png',
    },
    {
      key: '10',
      rank: 10,
      name: 'Liam Brown',
      username: 'liampython',
      level: 3,
      xp: 398,
      avatar: '/avatar10.png',
    },
  ];
  
  // Friends leaderboard data - in a real app, this would be filtered from API
  const friendsData = [
    {
      key: '1',
      rank: 1,
      name: 'Harper Lee',
      username: 'harpercode',
      level: 6,
      xp: 678,
      avatar: '/avatar4.png',
    },
    {
      key: '2',
      rank: 2,
      name: 'User',
      username: 'pythonchick_user',
      level: 5,
      xp: 530,
      avatar: '/default-avatar.png',
      isCurrentUser: true,
    },
    {
      key: '3',
      rank: 3,
      name: 'Noah Chen',
      username: 'noahpy',
      level: 5,
      xp: 512,
      avatar: '/avatar6.png',
    },
  ];
  
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank) => {
        const colors = {
          1: 'gold',
          2: 'silver',
          3: '#CD7F32', // bronze
        };
        
        return rank <= 3 ? (
          <div className="flex items-center">
            <TrophyOutlined style={{ color: colors[rank], marginRight: '8px' }} />
            <span>{rank}</span>
          </div>
        ) : rank;
      },
    },
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className="flex items-center">
          <Avatar src={record.avatar} className="mr-2" />
          <div>
            <div className={record.isCurrentUser ? 'font-bold text-primary' : ''}>
              {name}
              {record.isCurrentUser && (
                <Tag color="blue" className="ml-2">You</Tag>
              )}
            </div>
            <div className="text-xs text-gray-500">@{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      render: (level) => (
        <Tag color="green">Lvl {level}</Tag>
      ),
    },
    {
      title: 'XP',
      dataIndex: 'xp',
      key: 'xp',
      render: (xp) => (
        <span className="font-medium">{xp} XP</span>
      ),
    },
  ];
  
  return (
    <div className="leaderboard-page">
      <h1 className="text-3xl font-display mb-6">Leaderboard</h1>
      
      <Card className="shadow-card">
        <div className="flex justify-between mb-6">
          <Radio.Group
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="week">This Week</Radio.Button>
            <Radio.Button value="month">This Month</Radio.Button>
            <Radio.Button value="all">All Time</Radio.Button>
          </Radio.Group>
          
          <Input
            placeholder="Search users"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
        </div>
        
        <Tabs defaultActiveKey="global">
          <TabPane 
            tab={
              <span>
                <GlobalOutlined /> Global
              </span>
            } 
            key="global"
          >
            <Table 
              dataSource={leaderboardData}
              columns={columns}
              pagination={{ pageSize: 10 }}
              rowClassName={(record) => record.isCurrentUser ? 'bg-blue-50' : ''}
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <TeamOutlined /> Friends
              </span>
            } 
            key="friends"
          >
            <Table 
              dataSource={friendsData}
              columns={columns}
              pagination={false}
              rowClassName={(record) => record.isCurrentUser ? 'bg-blue-50' : ''}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default LeaderboardPage;