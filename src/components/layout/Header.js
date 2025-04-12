// src/components/layout/Header.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Dropdown, Badge, Button, Space, Tooltip, Avatar } from 'antd';
import { 
  BellOutlined, 
  UserOutlined, 
  MenuOutlined,
  LogoutOutlined,
  SettingOutlined,
  FireOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Header: AntHeader } = Layout;

const Header = ({ toggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which menu item is active
  const activeKey = location.pathname.split('/')[1] || 'dashboard';

  // Handle logout
  const handleLogout = () => {
    navigate('/logout');
  };

  // Define menu items for Ant Design 4.20.0+ compatibility
  const menuItems = [
    {
      key: 'dashboard',
      label: <Link to="/dashboard">Dashboard</Link>
    },
    {
      key: 'courses',
      label: <Link to="/courses">Courses</Link>
    },
    {
      key: 'leaderboard',
      label: <Link to="/leaderboard">Leaderboard</Link>
    },
    {
      key: 'compiler',
      label: <Link to="/compiler">Compiler</Link>
    }
  ];

  // Dropdown menu items for user profile
  const dropdownItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>
    }
  ];

  return (
    <AntHeader className="bg-white shadow-md sticky top-0 z-50 h-16 px-4">
      <div className="mx-auto flex items-center justify-between h-full">
        <div className="flex items-center">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleMobileSidebar}
            className="mr-3 md:hidden"
            size="large"
          />
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Pythonchick"
              className="mr-2 w-auto h-8 sm:h-10 md:h-12 transition-all"
            />
            <span className="text-xl font-display text-primary hidden sm:inline">
              Pythonchick
            </span>
          </Link>
        </div>

        <div className="flex-1 mx-4 hidden md:block">
          <Menu 
            mode="horizontal" 
            className="border-0" 
            selectedKeys={[activeKey]}
            items={menuItems}
          />
        </div>

        <Space size="large" className="items-center">
          <Tooltip title="Coins">
            <div className="flex items-center justify-center rounded-full px-3 cursor-pointer hover:bg-gray-200 transition-colors">
              <CrownOutlined className="text-yellow-500 mr-1" />
              <span>{user?.coins || 100}</span>
            </div>
          </Tooltip>

          <Tooltip title="Streak">
            <Badge count={user?.streak || 0} offset={[0, 8]}>
              <div className="rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors">
                <FireOutlined className="text-red-500" />
              </div>
            </Badge>
          </Tooltip>

          <Tooltip title="XP">
            <div className="items-center rounded-full px-3 cursor-pointer hover:bg-gray-200 transition-colors hidden sm:flex">
              <CrownOutlined className="text-yellow-500 mr-1" />
              <span className="font-medium">{user?.experience || 0} XP</span>
            </div>
          </Tooltip>

          <Tooltip title="Notifications">
            <Badge count={3} dot>
              <BellOutlined className="text-xl cursor-pointer text-gray-600 hover:text-primary" />
            </Badge>
          </Tooltip>

          <Dropdown
            menu={{ items: dropdownItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <div className="cursor-pointer flex items-center">
              <Badge dot color="green">
                <Avatar
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  size={32}
                />
              </Badge>
            </div>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;