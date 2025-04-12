// src/components/profile/ProfileOverview.js - Updated version with reliable avatar loading
import React, { useState } from 'react';
import { Row, Col, Card, Typography, Badge, Avatar, Progress, Tooltip, Upload, message, Modal } from 'antd';
import { 
  UserOutlined,
  BarChartOutlined,
  TrophyOutlined,
  FireOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const ProfileOverview = ({ user, achievementsCount = 0, onAvatarChange }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  
  // Get a reliable avatar URL
  const getAvatarUrl = () => {
    // If user has an avatar_url and it's not a complex external URL
    if (user.avatar && !user.avatar.includes('oaiusercontent.com')) {
      return user.avatar;
    }
    // Otherwise, use a default avatar
    return null; // This will trigger the fallback icon
  };
  
  const handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    
    if (info.file.status === 'done') {
      // Get this url from response in real world
      getBase64(info.file.originFileObj, imageUrl => {
        setAvatarPreview(imageUrl);
        setIsAvatarModalVisible(true);
      });
    }
  };
  
  const handleAvatarModalOk = () => {
    onAvatarChange(avatarPreview);
    setIsAvatarModalVisible(false);
    message.success('Avatar updated successfully!');
  };
  
  const handleAvatarModalCancel = () => {
    setAvatarPreview(null);
    setIsAvatarModalVisible(false);
  };
  
  // Helper function to convert file to base64
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md mb-6 p-6 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          background: 'linear-gradient(135deg, #FF8C00 0%, transparent 100%)',
        }}
      />
      
      <div className="relative z-10">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={18}>
            <div className="flex items-center">
              <Badge 
                count={`Level ${user.level}`} 
                style={{ backgroundColor: '#FF8C00' }}
                offset={[-5, 65]}
              >
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleAvatarChange}
                >
                  <div className="relative group">
                    <Avatar 
                      size={80} 
                      src={getAvatarUrl()}
                      icon={<UserOutlined />}
                      className="border-2 border-primary"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                      <UploadOutlined className="text-white text-xl" />
                    </div>
                  </div>
                </Upload>
              </Badge>
              <div className="ml-4">
                <Title level={2} className="mb-0">{user.name}</Title>
                <Text className="text-gray-500">Member since April 2023</Text>
                
                <div className="flex items-center mt-2 space-x-4">
                  <Tooltip title="Current experience">
                    <Badge count={`${user.experience} XP`} style={{ backgroundColor: '#1890FF' }} />
                  </Tooltip>
                  
                  <Tooltip title="Daily streak">
                    <span className="flex items-center">
                      <FireOutlined className="text-red-500 mr-1" />
                      <span className="font-medium">{user.streak} day streak</span>
                    </span>
                  </Tooltip>
                  
                  <Tooltip title="Coins earned">
                    <span className="flex items-center">
                      <span className="font-medium">{user.coins} coins</span>
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} sm={8}>
            <Card bordered={false} className="h-full text-center bg-blue-50 shadow-sm">
              <BarChartOutlined className="text-blue-500 text-3xl mb-2" />
              <Title level={3} className="mb-0">{user.experience}</Title>
              <Text type="secondary">Total XP</Text>
            </Card>
          </Col>
          
          <Col xs={24} sm={8}>
            <Card bordered={false} className="h-full text-center bg-green-50 shadow-sm">
              <TrophyOutlined className="text-green-500 text-3xl mb-2" />
              <Title level={3} className="mb-0">{achievementsCount}</Title>
              <Text type="secondary">Achievements</Text>
            </Card>
          </Col>
          
          <Col xs={24} sm={8}>
            <Card bordered={false} className="h-full text-center bg-red-50 shadow-sm">
              <FireOutlined className="text-red-500 text-3xl mb-2" />
              <Title level={3} className="mb-0">{user.streak}</Title>
              <Text type="secondary">Day Streak</Text>
            </Card>
          </Col>
        </Row>
      </div>
      
      {/* Avatar Preview Modal */}
      <Modal
        title="Preview and Confirm"
        open={isAvatarModalVisible}
        onOk={handleAvatarModalOk}
        onCancel={handleAvatarModalCancel}
        okText="Update Avatar"
        cancelText="Cancel"
      >
        <div className="text-center">
          <Avatar 
            size={150} 
            src={avatarPreview} 
            icon={<UserOutlined />} 
            className="mb-4 border-2 border-primary"
          />
          <p>
            This will be your new profile picture. Continue?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileOverview;