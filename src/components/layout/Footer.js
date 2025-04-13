// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { GithubOutlined, TwitterOutlined, InstagramOutlined, HeartFilled } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-white p-0 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <Row gutter={[24, 24]} className="mb-6">
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="mb-4">
              <Link to="/" className="flex items-center">
                <img src="/logo.png" alt="Pythonchick" className="h-8 mr-2" />
                <span className="font-display text-primary text-xl">Pythonchick</span>
              </Link>
            </div>
            <p className="text-gray-600">
              Making Python programming fun and accessible for kids through interactive, game-based
              learning.
            </p>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-primary transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-600 hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <Divider className="my-4" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} Pythonchick. All rights reserved.
            </p>
          </div>

          <Space size="large">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary text-xl"
            >
              <GithubOutlined />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary text-xl"
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary text-xl"
            >
              <InstagramOutlined />
            </a>
          </Space>
        </div>

        <div className="text-center text-xs text-gray-400 mt-4">
          Made with <HeartFilled className="text-red-500 mx-1" /> in Kazakhstan
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
