// src/components/layout/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Progress, Typography } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  TrophyOutlined,
  CodeOutlined,
  SettingOutlined,
  UserOutlined,
  FireOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ collapsed = false, mobile = false, className = '' }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Menu items with proper structure for Ant Design 4.20.0+
  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/courses',
      icon: <BookOutlined />,
      label: <Link to="/courses">Courses</Link>,
    },
    {
      key: '/games',
      icon: <PlayCircleOutlined />,
      label: <Link to="/games">Games</Link>,
    },
    {
      key: '/compiler',
      icon: <CodeOutlined />,
      label: <Link to="/compiler">Compiler</Link>,
    },
    {
      key: '/leaderboard',
      icon: <TrophyOutlined />,
      label: <Link to="/leaderboard">Leaderboard</Link>,
    },
  ];

  // Determine which menu items should be selected based on current path
  const selectedKeys = menuItems
    .filter((item) => location.pathname.startsWith(item.key))
    .map((item) => item.key);

  // Render content for both mobile drawer and desktop sidebar
  const sidebarContent = (
    <>
      <div className={`p-4 border-b ${collapsed ? 'text-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <Avatar
              src={user?.avatar_url}
              alt="Profile"
              className="h-12 w-12 object-cover border-2 border-primary"
              icon={<UserOutlined />}
              size={48}
            />
            <div>
              <h3 className="font-medium truncate">{user?.username || 'User'}</h3>
              <div className="flex items-center">
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  Level {user?.level || 1}
                </span>
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="flex flex-col items-center justify-center">
            <Avatar
              src={user?.avatar_url}
              alt="Profile"
              className="border-2 border-primary mb-2"
              icon={<UserOutlined />}
              size={40}
            />
            <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
              Lvl {user?.level || 1}
            </span>
          </div>
        )}

        {!collapsed && (
          <div className="mt-3 bg-gray-100 rounded-lg p-2">
            <div className="text-xs text-gray-600 mb-1">Experience</div>
            <Progress
              percent={user?.experience % 100 || 0}
              showInfo={false}
              strokeColor="#FF8C00"
              size="small"
            />
            <div className="text-xs text-right mt-1">{user?.experience || 0} XP</div>
          </div>
        )}
      </div>

      <Menu
        className="py-2"
        mode="inline"
        theme="light"
        selectedKeys={selectedKeys}
        items={menuItems}
      />

      {!collapsed && (
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FireOutlined className="text-red-500 mr-2" />
              <span className="text-sm">Daily Streak</span>
            </div>
            <div className="bg-yellow-100 text-yellow-800 font-medium text-xs px-2 py-1 rounded-full">
              {user?.streak || 0} 🔥
            </div>
          </div>
        </div>
      )}
    </>
  );

  // For mobile view (drawer)
  if (mobile) {
    return sidebarContent;
  }

  // For desktop view (fixed sidebar)
  return (
    <Sider
      theme="light"
      width={250}
      collapsible
      collapsed={collapsed}
      trigger={null}
      className={`shadow-md transition-all duration-300 ${className}`}
      style={{
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '64px',
        left: 0,
      }}
    >
      {sidebarContent}
    </Sider>
  );
};

export default Sidebar;
