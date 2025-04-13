// src/components/profile/PasswordForm.js
import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const PasswordForm = ({ loading, onFinish }) => {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card className="shadow-sm">
          <Form layout="vertical" onFinish={onFinish}>
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
                { min: 8, message: 'Password must be at least 8 characters!' },
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default PasswordForm;
