// src/components/profile/ProfileSettings.js
import React from 'react';
import { Card, List, Switch, Divider, Button } from 'antd';

// App settings data
const appSettings = [
  {
    title: 'Dark Mode',
    description: 'Switch between light and dark theme',
    defaultChecked: false
  },
  {
    title: 'Sound Effects',
    description: 'Enable or disable sound effects',
    defaultChecked: true
  },
  {
    title: 'Auto-Play Videos',
    description: 'Automatically play video lessons',
    defaultChecked: true
  },
  {
    title: 'Code Editor Theme',
    description: 'Choose between light and dark code editor',
    defaultChecked: false
  }
];

// Privacy settings data
const privacySettings = [
  {
    title: 'Show Profile',
    description: 'Allow others to see your profile',
    defaultChecked: true
  },
  {
    title: 'Show in Leaderboard',
    description: 'Allow your progress to be shown in leaderboards',
    defaultChecked: true
  },
  {
    title: 'Learning Data',
    description: 'Share anonymous learning data to improve the platform',
    defaultChecked: true
  }
];

const ProfileSettings = () => {
  return (
    <>
      <Card className="shadow-sm mb-4" title="App Settings">
        <List
          itemLayout="horizontal"
          dataSource={appSettings}
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
      </Card>
      
      <Card className="shadow-sm" title="Privacy Settings">
        <List
          itemLayout="horizontal"
          dataSource={privacySettings}
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
          <Button type="primary">Save Settings</Button>
        </div>
      </Card>
    </>
  );
};

export default ProfileSettings;