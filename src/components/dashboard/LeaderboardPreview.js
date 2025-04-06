// src/components/dashboard/LeaderboardPreview.js
import React from 'react';
import { Card, Table, Avatar, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { TrophyOutlined } from '@ant-design/icons';

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
        <span className={record.isCurrentUser ? 'font-bold text-primary' : ''}>
          {name}
          {record.isCurrentUser && (
            <Tag color="blue" className="ml-2">You</Tag>
          )}
        </span>
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

const LeaderboardPreview = () => {
  return (
    <Card 
      className="shadow-card mt-6" 
      title="Leaderboard"
      extra={<Link to="/leaderboard" className="text-primary">View All</Link>}
    >
      <Table 
        dataSource={leaderboardData}
        columns={columns}
        pagination={false}
        rowClassName={(record) => record.isCurrentUser ? 'bg-blue-50' : ''}
      />
    </Card>
  );
};

export default LeaderboardPreview;