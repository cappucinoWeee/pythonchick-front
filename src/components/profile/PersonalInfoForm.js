// src/components/profile/PersonalInfoForm.js
import React from 'react';
import { Form, Input, Button, Card, Row, Col, Avatar, Progress, Typography } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  EditOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const PersonalInfoForm = ({ user, loading, onFinish }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8} lg={6}>
        <Card className="shadow-sm mb-4">
          <div className="text-center">
            <Avatar
              size={100}
              src={user.avatar_url || '/default-avatar.png'}
              icon={<UserOutlined />}
              className="mb-4 border-2 border-primary"
            />
            <Title level={4} className="mb-1">
              {user.username}
            </Title>
            <Text type="secondary">{`@${user.username}`}</Text>

            <div className="mt-4">
              <Progress
                type="circle"
                percent={user.experience % 100}
                format={() => `Level ${user.level}`}
                width={80}
              />
              <div className="mt-2 text-sm text-gray-500">
                {100 - (user.experience % 100)} XP to level {user.level + 1}
              </div>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm" title="Account Status">
          <div className="py-2 flex items-center">
            <SafetyCertificateOutlined className="text-green-500 text-lg mr-3" />
            <div>
              <div className="font-medium">Account Type</div>
              <div className="text-sm text-gray-500">Student</div>
            </div>
          </div>

          <div className="py-2 flex items-center">
            <CheckCircleOutlined className="text-green-500 text-lg mr-3" />
            <div>
              <div className="font-medium">Membership</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
          </div>

          <div className="py-2 flex items-center">
            <UserOutlined className="text-blue-500 text-lg mr-3" />
            <div>
              <div className="font-medium">Joined Date</div>
              <div className="text-sm text-gray-500">{user.created_at}</div>
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={24} md={16} lg={18}>
        <Form
          layout="vertical"
          initialValues={{
            name: user.full_name,
            email: user.email,
            username: user.username,
          }}
          onFinish={onFinish}
        >
          <Card
            className="shadow-sm mb-4"
            title="Personal Information"
            extra={
              <Button type="text" icon={<EditOutlined />}>
                Edit
              </Button>
            }
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                  <Input prefix={<UserOutlined className="text-gray-400" />} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please enter a username!' }]}
                >
                  <Input prefix={<UserOutlined className="text-gray-400" />} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input prefix={<MailOutlined className="text-gray-400" />} />
            </Form.Item>

            <Form.Item name="bio" label="Bio">
              <Input.TextArea rows={4} placeholder="Tell us a bit about yourself..." />
            </Form.Item>
          </Card>

          <Card
            className="shadow-sm mb-4"
            title="Learning Preferences"
            extra={
              <Button type="text" icon={<EditOutlined />}>
                Edit
              </Button>
            }
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="difficulty" label="Preferred Difficulty">
                  <Input defaultValue="Beginner" readOnly />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="learning_speed" label="Learning Pace">
                  <Input defaultValue="Balanced" readOnly />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="interests" label="Learning Interests">
              <Input defaultValue="Python Basics, Game Development" readOnly />
            </Form.Item>
          </Card>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default PersonalInfoForm;
