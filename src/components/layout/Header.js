// src/components/layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Badge } from 'antd';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';

const Header = () => {
  const { user } = useAppContext();

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Pythonchick" className="h-10 mr-3" />
            <span className="text-2xl font-display text-primary">Pythonchick</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
            Dashboard
          </Link>
          <Link to="/courses" className="text-gray-700 hover:text-primary font-medium">
            Courses
          </Link>
          <Link to="/leaderboard" className="text-gray-700 hover:text-primary font-medium">
            Leaderboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <img src="/coin.png" alt="Coins" className="h-5 mr-1" />
            <span className="font-medium">{user.coins}</span>
          </div>
          
          <div className="flex items-center">
            <Badge count={user.streak} offset={[0, 8]}>
              <div className="bg-gray-100 rounded-full p-2">
                <img src="/streak.png" alt="Streak" className="h-5" />
              </div>
            </Badge>
          </div>
          
          <Badge count={3} dot>
            <BellOutlined className="text-xl cursor-pointer text-gray-600 hover:text-primary" />
          </Badge>
          
          <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
            <div className="cursor-pointer flex items-center">
              <img 
                src={user.avatar || "/default-avatar.png"} 
                alt="Profile" 
                className="h-8 w-8 rounded-full object-cover border-2 border-primary"
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;