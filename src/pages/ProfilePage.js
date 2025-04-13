// src/pages/ProfilePage.js - Updated version with better error handling
import React, { useState, useEffect } from 'react';
import { Card, Tabs, message, Spin } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  TrophyOutlined,
  HistoryOutlined,
  SettingOutlined,
  LoadingOutlined,
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

const ProfilePage = () => {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [achievementsLoaded, setAchievementsLoaded] = useState(false);
  const [achievements, setAchievements] = useState([]);

  // Sample achievements data for the count
  const sampleAchievements = [
    { id: 1, title: 'First Steps', earned: true },
    { id: 2, title: 'Quick Learner', earned: true },
    { id: 3, title: 'Quiz Master', earned: false },
    { id: 4, title: 'Coding Streak', earned: false },
    { id: 5, title: 'Python Beginner', earned: true },
  ];

  // Load achievements
  useEffect(() => {
    const loadAchievements = async () => {
      try {
        // In a real app, you'd fetch from an API
        // For now, we'll use sample data
        setAchievements(sampleAchievements);
        setAchievementsLoaded(true);
      } catch (error) {
        console.error('Failed to load achievements:', error);
        message.error('Failed to load achievements');
      }
    };

    if (!achievementsLoaded) {
      loadAchievements();
    }
  }, [achievementsLoaded]);

  // Calculate achievements count
  const earnedAchievementsCount = achievements.filter((a) => a.earned).length;

  // Check if user data is available
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <span className="ml-2">Loading user profile...</span>
      </div>
    );
  }

  // Handle form submissions
  const handlePersonalInfoSubmit = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setUser({
        ...user,
        name: values.name,
        email: values.email,
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
      avatar: newAvatar,
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
        <Tabs activeKey={activeTab} onChange={setActiveTab} tabBarStyle={{ marginBottom: 24 }}>
          <TabPane
            tab={
              <span>
                <UserOutlined /> Personal Info
              </span>
            }
            key="personal"
          >
            <PersonalInfoForm user={user} loading={loading} onFinish={handlePersonalInfoSubmit} />
          </TabPane>

          <TabPane
            tab={
              <span>
                <LockOutlined /> Password
              </span>
            }
            key="password"
          >
            <PasswordForm loading={loading} onFinish={handlePasswordSubmit} />
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
