// src/components/dashboard/LeaderboardPreview.js
import React from 'react';
import { Card, Table, Avatar, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import { TrophyOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons';

// Mock data - would come from an API in a real app
const leaderboardData = [
  {
    key: '1',
    rank: 1,
    name: 'Alex Johnson',
    level: 8,
    xp: 842,
    avatar: '/avatar1.png',
  },
  {
    key: '2',
    rank: 2,
    name: 'Sophia Chen',
    level: 7,
    xp: 756,
    avatar: '/avatar2.png',
  },
  {
    key: '3',
    rank: 3,
    name: 'Miguel Rodriguez',
    level: 7,
    xp: 720,
    avatar: '/avatar3.png',
  },
  {
    key: '4',
    rank: 4,
    name: 'Harper Lee',
    level: 6,
    xp: 678,
    avatar: '/avatar4.png',
  },
  {
    key: '5',
    rank: 5,
    name: 'You',
    level: 5,
    xp: 530,
    avatar: '/default-avatar.png',
    isCurrentUser: true,
  },
];

const LeaderboardPreview = () => {
  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return '#CD7F32'; // bronze
      default: return null;
    }
  };

  // Get rank background color
  const getRankBgColor = (rank) => {
    if (rank === 1) return 'rgba(255, 215, 0, 0.2)';
    if (rank === 2) return 'rgba(192, 192, 192, 0.2)';
    if (rank === 3) return 'rgba(205, 127, 50, 0.2)';
    return 'transparent';
  };

  // Rank column renderer
  const renderRank = (rank) => {
    const color = getRankColor(rank);
    const bgColor = getRankBgColor(rank);
    
    return (
      <div className="flex items-center justify-center">
        {color ? (
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-full" 
            style={{ backgroundColor: bgColor }}
          >
            <TrophyOutlined style={{ color }} />
          </div>
        ) : (
          <span className="text-gray-600 font-medium">{rank}</span>
        )}
      </div>
    );
  };

  // User column renderer
  const renderUser = (name, record) => (
    <div className="flex items-center">
      <Avatar 
        src={record.avatar} 
        className="mr-2" 
        icon={<UserOutlined />}
      />
      <div>
        <div className={record.isCurrentUser ? 'font-bold text-primary' : 'font-medium'}>
          {name}
          {record.isCurrentUser && (
            <Tag color="blue" className="ml-2">You</Tag>
          )}
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 70,
      align: 'center',
      render: renderRank,
    },
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: renderUser,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      align: 'center',
      render: (level) => (
        <Tag color="green" className="min-w-[60px] text-center">
          Level {level}
        </Tag>
      ),
    },
    {
      title: 'XP',
      dataIndex: 'xp',
      key: 'xp',
      width: 100,
      align: 'right',
      render: (xp) => (
        <span className="font-medium">{xp} XP</span>
      ),
    },
  ];

  return (
    <Card 
      className="shadow-md border-0" 
      title={
        <div className="flex items-center">
          <TrophyOutlined className="text-yellow-500 mr-2" />
          <span className="font-medium">Leaderboard</span>
        </div>
      }
      extra={<Link to="/leaderboard" className="text-primary">View Full Ranking</Link>}
    >
      <Table 
        dataSource={leaderboardData}
        columns={columns}
        pagination={false}
        rowClassName={(record) => record.isCurrentUser ? 'bg-blue-50' : ''}
        size="middle"
      />
      
      <div className="mt-4 flex justify-center">
        <Button 
          type="default" 
          icon={<RiseOutlined />}
          className="rounded-lg"
        >
          <Link to="/leaderboard">Compete with Friends</Link>
        </Button>
      </div>
    </Card>
  );
};

export default LeaderboardPreview;