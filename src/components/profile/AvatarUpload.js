// src/components/profile/AvatarUpload.js
import React, { useState } from 'react';
import { Upload, Button, Modal, message, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';

const AvatarUpload = ({ user, onAvatarChange }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world
      getBase64(info.file.originFileObj, (imageUrl) => {
        setAvatarPreview(imageUrl);
        setIsModalVisible(true);
      });
    }
  };

  const handleModalOk = () => {
    onAvatarChange(avatarPreview);
    setIsModalVisible(false);
    message.success('Avatar updated successfully!');
  };

  const handleModalCancel = () => {
    setAvatarPreview(null);
    setIsModalVisible(false);
  };

  // Helper function to convert file to base64
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // Custom upload button
  const uploadButton = <Button icon={<UploadOutlined />}>Change Avatar</Button>;

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader hidden"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>

      <Modal
        title="Preview and Confirm"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
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
          <p>This will be your new profile picture. Continue?</p>
        </div>
      </Modal>
    </>
  );
};

export default AvatarUpload;
