// src/components/profile/NotificationSettings.js
import React from 'react';
import { Card, List, Switch, Divider, Button } from 'antd';

const notificationItems = [
  {
    title: 'Email Notifications',
    description: 'Receive emails about your progress and new courses',
    defaultChecked: true,
  },
  {
    title: 'Push Notifications',
    description: 'Receive push notifications on your device',
    defaultChecked: true,
  },
  {
    title: 'Daily Reminders',
    description: 'Get a daily reminder to continue your learning',
    defaultChecked: false,
  },
  {
    title: 'Achievement Alerts',
    description: 'Get notified when you earn a new achievement',
    defaultChecked: true,
  },
  {
    title: 'Course Updates',
    description: 'Get notified about new courses and content updates',
    defaultChecked: true,
  },
];

const NotificationSettings = () => {
  return (
    <Card className="shadow-sm">
      <List
        itemLayout="horizontal"
        dataSource={notificationItems}
        renderItem={(item) => (
          <List.Item
            actions={[<Switch defaultChecked={item.defaultChecked} className="secondary" />]}
          >
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />

      <Divider />

      <div className="text-right">
        <Button type="primary">Save Preferences</Button>
      </div>
    </Card>
  );
};

export default NotificationSettings;
