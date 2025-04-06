// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Upload, 
  Badge, 
  List,
  Switch,
  Divider,
  message
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined,
  BellOutlined,
  TrophyOutlined,
  HistoryOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useAppContext } from '../context/AppContext';

const { TabPane } = Tabs;

const ProfilePage = () => {
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  
  const onFinishPersonalInfo = (values) => {
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
  
  const onFinishPassword = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Password updated successfully!');
    }, 1000);
  };
  
  // Sample achievements data
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🔰',
      earned: true,
      date: '2023-04-01'
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Complete 5 lessons in a single day',
      icon: '⚡',
      earned: true,
      date: '2023-04-02'
    },
    {
      id: 3,
      title: 'Quiz Master',
      description: 'Score 100% on 3 quizzes in a row',
      icon: '🏆',
      earned: false
    },
    {
      id: 4,
      title: 'Coding Streak',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      earned: false
    }
  ];
  
  return (
    <div className="profile-page">
      <h1 className="text-3xl font-display mb-6">My Profile</h1>
      
      <Card className="shadow-card">
        <Tabs defaultActiveKey="personal">
          <TabPane 
            tab={
              <span>
                <UserOutlined /> Personal Info
              </span>
            } 
            key="personal"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Badge count={`Level ${user.level}`} offset={[0, 88]}>
                  <Avatar 
                    size={120} 
                    src={user.avatar || "/default-avatar.png"}
                    icon={<UserOutlined />}
                    className="mb-4"
                  />
                </Badge>
                <h3 className="text-xl font-medium">{user.name}</h3>
                <p className="text-gray-500">Member since April 2023</p>
                
                <Upload>
                  <Button icon={<UploadOutlined />} className="mt-4">
                    Change Avatar
                  </Button>
                </Upload>
              </div>
              
              <div className="md:col-span-2">
                <Form
                  layout="vertical"
                  initialValues={{
                    name: user.name,
                    email: 'user@example.com',
                    username: 'pythonchick_user'
                  }}
                  onFinish={onFinishPersonalInfo}
                >
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                  >
                    <Input prefix={<UserOutlined className="text-gray-400" />} />
                  </Form.Item>
                  
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined className="text-gray-400" />} />
                  </Form.Item>
                  
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please enter a username!' }]}
                  >
                    <Input prefix={<UserOutlined className="text-gray-400" />} />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                    >
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <LockOutlined /> Password
              </span>
            } 
            key="password"
          >
            <Form
              layout="vertical"
              onFinish={onFinishPassword}
              className="max-w-md mx-auto"
            >
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please enter your current password!' }]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
              </Form.Item>
              
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: 'Please enter your new password!' },
                  { min: 8, message: 'Password must be at least 8 characters!' }
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
              </Form.Item>
              
              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-400" />} />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                >
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BellOutlined /> Notifications
              </span>
            } 
            key="notifications"
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'Email Notifications',
                  description: 'Receive emails about your progress and new courses',
                  defaultChecked: true
                },
                {
                  title: 'Push Notifications',
                  description: 'Receive push notifications on your device',
                  defaultChecked: true
                },
                {
                  title: 'Daily Reminders',
                  description: 'Get a daily reminder to continue your learning',
                  defaultChecked: false
                },
                {
                  title: 'Achievement Alerts',
                  description: 'Get notified when you earn a new achievement',
                  defaultChecked: true
                },
                {
                    title: 'Course Updates',
                    description: 'Get notified about new courses and content updates',
                    defaultChecked: true
                  }
                ]}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Switch defaultChecked={item.defaultChecked} />
                    ]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
              
              <Divider />
              
              <div className="text-right">
                <Button type="primary">Save Preferences</Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <TrophyOutlined /> Achievements
                </span>
              } 
              key="achievements"
            >
              <List
                itemLayout="horizontal"
                dataSource={achievements}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div className={`text-3xl ${!item.earned ? 'opacity-40 grayscale' : ''}`}>
                          {item.icon}
                        </div>
                      }
                      title={
                        <div className="flex items-center">
                          {item.title}
                          {item.earned && (
                            <Badge 
                              count="Earned" 
                              style={{ backgroundColor: '#52c41a' }}
                              className="ml-2"
                            />
                          )}
                        </div>
                      }
                      description={
                        <div>
                          <div>{item.description}</div>
                          {item.earned && (
                            <div className="text-xs text-gray-500 mt-1">Earned on {item.date}</div>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <HistoryOutlined /> Learning History
                </span>
              } 
              key="history"
            >
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    date: 'April 5, 2023',
                    activity: 'Completed "Variables & Data Types" topic',
                    xp: 50
                  },
                  {
                    date: 'April 4, 2023',
                    activity: 'Scored 90% on Python Basics Quiz',
                    xp: 20
                  },
                  {
                    date: 'April 3, 2023',
                    activity: 'Completed "Your First Program" lesson',
                    xp: 10
                  },
                  {
                    date: 'April 3, 2023',
                    activity: 'Completed "Installing Python" lesson',
                    xp: 10
                  },
                  {
                    date: 'April 2, 2023',
                    activity: 'Completed "What is Python?" lesson',
                    xp: 10
                  },
                  {
                    date: 'April 1, 2023',
                    activity: 'Joined Pythonchick',
                    xp: 10
                  }
                ]}
                renderItem={item => (
                  <List.Item
                    extra={
                      <div className="text-sm font-medium text-primary">+{item.xp} XP</div>
                    }
                  >
                    <List.Item.Meta
                      title={item.activity}
                      description={<div className="text-xs text-gray-500">{item.date}</div>}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  };
  
  export default ProfilePage;