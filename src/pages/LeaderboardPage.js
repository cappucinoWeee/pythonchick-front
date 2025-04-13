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
  Input,
  Row,
  Col,
  Divider,
  Badge,
  Button,
  Typography,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  TrophyOutlined,
  TeamOutlined,
  GlobalOutlined,
  UserOutlined,
  RiseOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useAppContext } from '../context/AppContext';

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

const LeaderboardPage = () => {
  const { user } = useAppContext();
  const [timeRange, setTimeRange] = useState('all');
  const [searchText, setSearchText] = useState('');

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
      streak: 14,
      achievements: 24,
      isFriend: true,
    },
    {
      key: '2',
      rank: 2,
      name: 'Sophia Chen',
      username: 'sophiapy',
      level: 7,
      xp: 756,
      avatar: '/avatar2.png',
      streak: 9,
      achievements: 18,
      isFriend: true,
    },
    {
      key: '3',
      rank: 3,
      name: 'Miguel Rodriguez',
      username: 'migueldev',
      level: 7,
      xp: 720,
      avatar: '/avatar3.png',
      streak: 6,
      achievements: 15,
      isFriend: false,
    },
    {
      key: '4',
      rank: 4,
      name: 'Harper Lee',
      username: 'harpercode',
      level: 6,
      xp: 678,
      avatar: '/avatar4.png',
      streak: 11,
      achievements: 16,
      isFriend: true,
    },
    {
      key: '5',
      rank: 5,
      name: 'pay4ok',
      username: 'pythonchick_user',
      level: 5,
      xp: 530,
      avatar: '/default-avatar.png',
      isCurrentUser: true,
      streak: 3,
      achievements: 12,
      isFriend: false,
    },
    {
      key: '6',
      rank: 6,
      name: 'Noah Chen',
      username: 'noahpy',
      level: 5,
      xp: 512,
      avatar: '/avatar6.png',
      streak: 5,
      achievements: 11,
      isFriend: true,
    },
    {
      key: '7',
      rank: 7,
      name: 'Olivia Johnson',
      username: 'oliviacoder',
      level: 4,
      xp: 489,
      avatar: '/avatar7.png',
      streak: 4,
      achievements: 9,
      isFriend: false,
    },
    {
      key: '8',
      rank: 8,
      name: 'Ethan Smith',
      username: 'pythonsmith',
      level: 4,
      xp: 457,
      avatar: '/avatar8.png',
      streak: 7,
      achievements: 10,
      isFriend: false,
    },
    {
      key: '9',
      rank: 9,
      name: 'Emma Davis',
      username: 'emmacode',
      level: 4,
      xp: 423,
      avatar: '/avatar9.png',
      streak: 3,
      achievements: 8,
      isFriend: false,
    },
    {
      key: '10',
      rank: 10,
      name: 'Liam Brown',
      username: 'liampython',
      level: 3,
      xp: 398,
      avatar: '/avatar10.png',
      streak: 2,
      achievements: 7,
      isFriend: false,
    },
  ];

  // Filter for friends
  const friendsData = leaderboardData.filter((item) => item.isFriend || item.isCurrentUser);

  // Filter by search
  const filteredGlobalData = searchText
    ? leaderboardData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.username.toLowerCase().includes(searchText.toLowerCase()),
      )
    : leaderboardData;

  const filteredFriendsData = searchText
    ? friendsData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.username.toLowerCase().includes(searchText.toLowerCase()),
      )
    : friendsData;

  // Get rank background color
  const getRankBgColor = (rank) => {
    if (rank === 1) return 'rgba(255, 215, 0, 0.2)';
    if (rank === 2) return 'rgba(192, 192, 192, 0.2)';
    if (rank === 3) return 'rgba(205, 127, 50, 0.2)';
    return 'transparent';
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'gold';
      case 2:
        return 'silver';
      case 3:
        return '#CD7F32'; // bronze
      default:
        return null;
    }
  };

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      align: 'center',
      render: (rank) => {
        const color = getRankColor(rank);
        const bgColor = getRankBgColor(rank);

        return (
          <div className="flex justify-center">
            {rank <= 3 ? (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: bgColor }}
              >
                <TrophyOutlined style={{ color }} />
              </div>
            ) : (
              <span className="text-gray-600 font-medium">{rank}</span>
            )}
          </div>
        );
      },
    },
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className="flex items-center">
          <div className="relative">
            <Avatar src={record.avatar} size={40} className="mr-3" icon={<UserOutlined />} />
            {record.isFriend && !record.isCurrentUser && (
              <Badge status="success" className="absolute bottom-0 right-2" />
            )}
          </div>
          <div>
            <div className={`font-medium ${record.isCurrentUser ? 'text-primary font-bold' : ''}`}>
              {name}
              {record.isCurrentUser && (
                <Tag color="blue" className="ml-2">
                  You
                </Tag>
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
      width: 110,
      align: 'center',
      render: (level) => (
        <Tag color="green" className="min-w-[70px] text-center">
          Level {level}
        </Tag>
      ),
    },
    {
      title: 'Streak',
      dataIndex: 'streak',
      key: 'streak',
      width: 100,
      align: 'center',
      render: (streak) => (
        <Tooltip title={`${streak} day streak`}>
          <div className="flex items-center justify-center">
            <Badge count={streak} showZero color="volcano" style={{ backgroundColor: '#ff4d4f' }}>
              <FireOutlined className="text-red-500 text-lg mt-2" />
            </Badge>
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'XP',
      dataIndex: 'xp',
      key: 'xp',
      width: 100,
      align: 'right',
      render: (xp) => <Text strong>{xp.toLocaleString()} XP</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) =>
        !record.isCurrentUser && (
          <Button type={record.isFriend ? 'default' : 'primary'} size="small">
            {record.isFriend ? 'View Profile' : 'Add Friend'}
          </Button>
        ),
    },
  ];

  return (
    <div className="leaderboard-page pb-6">
      <div className="bg-white rounded-xl shadow-card mb-6 p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/leaderboard-pattern.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply',
          }}
        />

        <div className="relative z-10">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <div>
                <Title level={2} className="mb-2">
                  Leaderboard
                </Title>
                <Text className="text-gray-600">
                  Compete with other learners and climb the ranks!
                </Text>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                <Card className="w-[130px] text-center">
                  <Tooltip title="Your current rank">
                    <Title level={3} className="mb-0 text-blue-500">
                      #{user.rank || 5}
                    </Title>
                    <Text type="secondary">Your Rank</Text>
                  </Tooltip>
                </Card>

                <Card className="w-[130px] text-center">
                  <Tooltip title="Total experience points">
                    <Title level={3} className="mb-0 text-green-500">
                      {user.experience}
                    </Title>
                    <Text type="secondary">XP Points</Text>
                  </Tooltip>
                </Card>

                <Card className="w-[130px] text-center">
                  <Tooltip title="Your daily streak">
                    <Title level={3} className="mb-0 text-red-500">
                      {user.streak} 🔥
                    </Title>
                    <Text type="secondary">Day Streak</Text>
                  </Tooltip>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Card className="shadow-card border-0">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex items-center flex-wrap gap-3">
            <Radio.Group
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              <Tooltip title="Show rankings for this week">
                <Radio.Button value="week">
                  <CalendarOutlined className="mr-1" /> This Week
                </Radio.Button>
              </Tooltip>
              <Tooltip title="Show rankings for this month">
                <Radio.Button value="month">
                  <CalendarOutlined className="mr-1" /> This Month
                </Radio.Button>
              </Tooltip>
              <Tooltip title="Show all-time rankings">
                <Radio.Button value="all">
                  <BarChartOutlined className="mr-1" /> All Time
                </Radio.Button>
              </Tooltip>
            </Radio.Group>

            <Select defaultValue="xp" style={{ width: 150 }} className="ml-auto md:ml-0">
              <Option value="xp">Sort by XP</Option>
              <Option value="level">Sort by Level</Option>
              <Option value="streak">Sort by Streak</Option>
              <Option value="achievements">Sort by Achievements</Option>
            </Select>
          </div>

          <Input
            placeholder="Search users"
            prefix={<SearchOutlined />}
            style={{ width: '100%', maxWidth: 250 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </div>

        <Tabs defaultActiveKey="global">
          <TabPane
            tab={
              <span>
                <GlobalOutlined /> Global Rankings
              </span>
            }
            key="global"
          >
            <Table
              dataSource={filteredGlobalData}
              columns={columns}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
              }}
              rowClassName={(record) => (record.isCurrentUser ? 'bg-blue-50' : '')}
              loading={false} // In a real app, set this based on API loading state
              scroll={{ x: 800 }}
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
              dataSource={filteredFriendsData}
              columns={columns}
              pagination={filteredFriendsData.length > 10 ? { pageSize: 10 } : false}
              rowClassName={(record) => (record.isCurrentUser ? 'bg-blue-50' : '')}
              loading={false} // In a real app, set this based on API loading state
              scroll={{ x: 800 }}
            />

            {filteredFriendsData.length <= 1 && (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">👋</div>
                <Title level={4}>Invite your friends</Title>
                <Text className="text-gray-600 block mb-4">
                  Compete with friends to make learning more fun!
                </Text>
                <Button icon={<TeamOutlined />}>Invite Friends</Button>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
