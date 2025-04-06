// src/components/layout/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  TeamOutlined,
  SettingOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAppContext();
  
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };
  
  const menuItems = [
    { path: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
    { path: '/courses', icon: <BookOutlined />, label: 'Courses' },
    { path: '/leaderboard', icon: <TrophyOutlined />, label: 'Leaderboard' },
    { path: '/friends', icon: <TeamOutlined />, label: 'Friends' },
    { path: '/settings', icon: <SettingOutlined />, label: 'Settings' },
    { path: '/help', icon: <QuestionCircleOutlined />, label: 'Help' },
  ];
  
  return (
    <aside className="bg-white shadow-md w-64 h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <img 
            src={user.avatar || "/default-avatar.png"} 
            alt="Profile" 
            className="h-12 w-12 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <div className="flex items-center">
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                Level {user.level}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 bg-gray-100 rounded-lg p-2">
          <div className="text-xs text-gray-600 mb-1">Experience</div>
          <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-secondary"
              style={{ width: `${(user.experience % 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-right mt-1">{user.experience} XP</div>
        </div>
      </div>
      
      <nav className="flex-1 py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-6 py-3 text-gray-700 ${
                  isActive(item.path) 
                    ? 'bg-primary-light bg-opacity-20 text-primary border-r-4 border-primary' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className={isActive(item.path) ? 'text-primary' : ''}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/streak.png" alt="Streak" className="h-5 mr-2" />
            <span className="text-sm">Daily Streak: {user.streak} days</span>
          </div>
          <div className="bg-yellow-100 text-yellow-800 font-medium text-xs px-2 py-1 rounded-full">
            {user.streak} 🔥
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;