// src/components/layout/MainLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Button, Drawer } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Layout className="min-h-screen">
      <Header 
        collapsed={collapsed} 
        toggleMobileSidebar={toggleMobileSidebar} 
      />
      <Layout>
        {/* Desktop Sidebar */}
        <Sidebar collapsed={collapsed} className="hidden md:block" />
        
        {/* Mobile Sidebar (Drawer) */}
        <Drawer
          placement="left"
          closable={true}
          onClose={toggleMobileSidebar}
          open={mobileOpen}
          width={250}
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar mobile={true} />
        </Drawer>
        
        <Layout>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            className="fixed left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-r-md p-2 md:flex hidden"
          />
          
          <Content className="p-4 md:p-6">
            <div className="container mx-auto max-w-7xl">
              <Outlet />
            </div>
          </Content>
          
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MainLayout;