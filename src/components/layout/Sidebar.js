// src/components/layout/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Progress, Divider } from 'antd';
import { 
  HomeOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  TeamOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  FireOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';

const { Sider } = Layout;

const Sidebar = ({ collapsed = false, mobile = false, className = '' }) => {
  const location = useLocation();
  const { user } = useAppContext();
  
  const menuItems = [
    { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard', path: '/dashboard' },
    { key: '/courses', icon: <BookOutlined />, label: 'Courses', path: '/courses' },
    { key: '/leaderboard', icon: <TrophyOutlined />, label: 'Leaderboard', path: '/leaderboard' },
    { key: '/friends', icon: <TeamOutlined />, label: 'Friends', path: '/friends' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Settings', path: '/settings' },
    { key: '/help', icon: <QuestionCircleOutlined />, label: 'Help', path: '/help' },
  ];
  
  const selectedKeys = menuItems
    .filter(item => location.pathname.startsWith(item.key))
    .map(item => item.key);
  
  // Render content for both mobile drawer and desktop sidebar
  const sidebarContent = (
    <>
      <div className={`p-4 border-b ${collapsed ? 'text-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <Avatar 
              src={user.avatar || "/default-avatar.png"} 
              alt="Profile" 
              className="h-12 w-12 object-cover border-2 border-primary"
              size={48}
            />
            <div>
              <h3 className="font-medium truncate">{user.name}</h3>
              <div className="flex items-center">
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  Level {user.level}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="flex flex-col items-center justify-center">
            <Avatar 
              src={user.avatar || "/default-avatar.png"} 
              alt="Profile" 
              className="border-2 border-primary mb-2"
              size={40}
            />
            <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
              Lvl {user.level}
            </span>
          </div>
        )}
        
        {!collapsed && (
          <div className="mt-3 bg-gray-100 rounded-lg p-2">
            <div className="text-xs text-gray-600 mb-1">Experience</div>
            <Progress 
              percent={(user.experience % 100)} 
              showInfo={false}
              strokeColor="#FF8C00"
              size="small"
            />
            <div className="text-xs text-right mt-1">{user.experience} XP</div>
          </div>
        )}
      </div>
      
      <Menu
        className="py-2"
        mode="inline"
        theme="light"
        selectedKeys={selectedKeys}
        items={menuItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: <Link to={item.path}>{item.label}</Link>
        }))}
      />
      
      {!collapsed && (
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FireOutlined className="text-red-500 mr-2" />
              <span className="text-sm">Daily Streak</span>
            </div>
            <div className="bg-yellow-100 text-yellow-800 font-medium text-xs px-2 py-1 rounded-full">
              {user.streak} 🔥
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
      className={`shadow-md transition-all duration-300 ${className} mt-6 ml-6 rounded-lg`}
      style={{ height: '100%' }}
    >
      {sidebarContent}
    </Sider>
  );
};

export default Sidebar;