// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { Card, Tabs, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined,
  BellOutlined,
  TrophyOutlined,
  HistoryOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAppContext } from '../context/AppContext';

// Import profile components
import ProfileOverview from '../components/profile/ProfileOverview';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import PasswordForm from '../components/profile/PasswordForm';
import NotificationSettings from '../components/profile/NotificationSettings';
import AchievementsList from '../components/profile/AchievementsList';
import LearningHistory from '../components/profile/LearningHistory';
import ProfileSettings from '../components/profile/ProfileSettings';

const { TabPane } = Tabs;

// Sample achievements data for the count
const sampleAchievements = [
  { id: 1, title: 'First Steps', earned: true },
  { id: 2, title: 'Quick Learner', earned: true },
  { id: 3, title: 'Quiz Master', earned: false },
  { id: 4, title: 'Coding Streak', earned: false },
  { id: 5, title: 'Python Beginner', earned: true }
];

const ProfilePage = () => {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Calculate achievements count directly
  const earnedAchievementsCount = sampleAchievements.filter(a => a.earned).length;
  
  // Handle form submissions
  const handlePersonalInfoSubmit = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser({
        ...user,
        name: values.name,
        email: values.email
      });
      setLoading(false);
      message.success('Profile updated successfully!');
    }, 1000);
  };
  
  const handlePasswordSubmit = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Password updated successfully!');
    }, 1000);
  };
  
  const handleAvatarChange = (newAvatar) => {
    setUser({
      ...user,
      avatar: newAvatar
    });
  };
  
  return (
    <div className="profile-page pb-6">
      <ProfileOverview 
        user={user} 
        achievementsCount={earnedAchievementsCount}
        onAvatarChange={handleAvatarChange}
      />
      
      <Card className="shadow-md border-0">
        <Tabs 
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane 
            tab={
              <span>
                <UserOutlined /> Personal Info
              </span>
            } 
            key="personal"
          >
            <PersonalInfoForm 
              user={user} 
              loading={loading} 
              onFinish={handlePersonalInfoSubmit} 
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <LockOutlined /> Password
              </span>
            } 
            key="password"
          >
            <PasswordForm 
              loading={loading}
              onFinish={handlePasswordSubmit}
            />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BellOutlined /> Notifications
              </span>
            } 
            key="notifications"
          >
            <NotificationSettings />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <TrophyOutlined /> Achievements
              </span>
            } 
            key="achievements"
          >
            <AchievementsList />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <HistoryOutlined /> Learning History
              </span>
            } 
            key="history"
          >
            <LearningHistory />
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SettingOutlined /> Settings
              </span>
            } 
            key="settings"
          >
            <ProfileSettings />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfilePage;