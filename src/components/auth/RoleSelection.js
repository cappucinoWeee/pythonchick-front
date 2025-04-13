// Step 1: Create a new component for role selection during registration
import React from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const RoleSelection = ({ onRoleSelect }) => {
  return (
    <div className="text-center">
      <Title level={3} className="mb-4">
        I am a...
      </Title>

      <Space size="large" direction="horizontal">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            hoverable
            style={{ width: 200 }}
            className="text-center"
            onClick={() => onRoleSelect('child')}
          >
            <div className="text-5xl mb-4">👶</div>
            <Title level={4}>Child</Title>
            <Text>Fun games and adventures</Text>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            hoverable
            style={{ width: 200 }}
            className="text-center"
            onClick={() => onRoleSelect('adult')}
          >
            <div className="text-5xl mb-4">👨‍💼</div>
            <Title level={4}>Adult</Title>
            <Text>More detailed learning</Text>
          </Card>
        </motion.div>
      </Space>
    </div>
  );
};

export default RoleSelection;
