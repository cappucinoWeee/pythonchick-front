// src/components/layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
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
import { useAppContext } from '../../context/AppContext';

const { Header: AntHeader } = Layout;

const Header = ({ toggleMobileSidebar }) => {
  const { user } = useAppContext();

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="bg-white shadow-md  sticky top-0 z-50 h-16">
      <div className='container mx-auto px-4 flex items-center justify-between'>
      <div className="flex items-center">
        <Button 
          type="text" 
          icon={<MenuOutlined />} 
          onClick={toggleMobileSidebar}
          className="mr-3 md:hidden"
          size="large"
        />
        
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Pythonchick" className="h-10 mr-2" />
          <span className="text-xl font-display text-primary hidden sm:inline">Pythonchick</span>
        </Link>
      </div>
      
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <Menu mode="horizontal" className="border-0" selectedKeys={[]}>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="courses">
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="leaderboard">
            <Link to="/leaderboard">Leaderboard</Link>
          </Menu.Item>
        </Menu>
      </div>
      
      <Space size="large" className="items-center">
        <Tooltip title="Coins">
          <div className="flex items-center justify-center rounded-full px-3 cursor-pointer hover:bg-gray-200 transition-colors">
            <CrownOutlined className="text-yellow-500 mr-1" />
            <span>{user.coins}</span>
          </div>
        </Tooltip>
        
        <Tooltip title="Streak">
          <Badge count={user.streak} offset={[0, 8]}>
            <div className="rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors">
              <FireOutlined className="text-red-500" />
            </div>
          </Badge>
        </Tooltip>

        <Tooltip title="XP">
          <div className="items-center rounded-full px-3 cursor-pointer hover:bg-gray-200 transition-colors hidden sm:flex">
            <CrownOutlined className="text-yellow-500 mr-1" />
            <span className="font-medium">{user.experience} XP</span>
          </div>
        </Tooltip>
        
        <Tooltip title="Notifications">
          <Badge count={3} dot>
            <BellOutlined className="text-xl cursor-pointer text-gray-600 hover:text-primary" />
          </Badge>
        </Tooltip>
        
        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <div className="cursor-pointer flex items-center">
            <Badge dot color="green">
              <Avatar 
                icon={<UserOutlined />} 
                className="border-2 border-primary object-cover"
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