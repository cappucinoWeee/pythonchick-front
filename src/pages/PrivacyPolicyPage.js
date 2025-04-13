// src/pages/PrivacyPolicyPage.js
import React from 'react';
import { Card, Typography, Breadcrumb, Button, Divider, Space, List } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
  PrinterOutlined,
  DownloadOutlined,
  LockOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicyPage = () => {
  // Last updated date
  const lastUpdated = 'April 5, 2023';

  // Privacy Policy sections
  const sections = [
    {
      title: '1. Introduction',
      content: `
        This Privacy Policy describes how Pythonchick ("we," "our," or "us") collects, uses, and shares your personal information when you use our educational programming platform ("Service").
        
        We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you about how we look after your personal data and tell you about your privacy rights.
      `,
    },
    {
      title: '2. Information We Collect',
      content: `
        We collect several types of information from and about users of our Service, including:
        
        • Personal Data: This includes information such as your name, email address, age, and profile picture that you provide when you register for an account or update your profile.
        
        • Usage Data: We automatically collect information about how you interact with our Service, including your learning progress, completed lessons, earned achievements, and time spent on platform.
        
        • Device Information: We may collect information about your device and internet connection, including the device's IP address, browser type, and operating system.
      `,
    },
    {
      title: '3. How We Use Your Information',
      content: `
        We use the information we collect for various purposes, including:
        
        • To provide and maintain our Service
        • To personalize your learning experience
        • To track your progress and provide appropriate educational content
        • To allow you to participate in interactive features of our Service
        • To provide customer support
        • To gather analysis or valuable information to improve our Service
        • To detect, prevent and address technical issues
        • To send you notifications related to your progress, achievements, or new content
      `,
    },
    {
      title: "4. Children's Privacy",
      content: `
        Our Service is designed for users of all ages, including children under 13. We comply with the Children's Online Privacy Protection Act (COPPA) and similar regulations worldwide.
        
        For users under the age of 13, we require verifiable parental consent before we collect personal information. Parents have the right to review their child's information, have it deleted, and refuse further collection or use of their child's information.
        
        We do not condition a child's participation in an activity on the child providing more personal information than is reasonably necessary for that activity.
      `,
    },
    {
      title: '5. Information Sharing and Disclosure',
      content: `
        We do not sell your personal information to third parties. We may share your information in the following circumstances:
        
        • With service providers who perform services on our behalf
        • To comply with legal obligations
        • To protect and defend our rights and property
        • With your consent or at your direction
        
        For educational institutions using our platform, we may share aggregated or de-identified information about student progress with authorized school personnel.
      `,
    },
    {
      title: '6. Data Security',
      content: `
        We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        
        While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. We encourage users to use strong passwords and to be cautious about what information they share.
      `,
    },
    {
      title: '7. Your Data Protection Rights',
      content: `
        Depending on your location, you may have certain rights regarding your personal information, including:
        
        • Right to access your personal data
        • Right to correct inaccurate or incomplete data
        • Right to erasure (deletion) of your personal data
        • Right to restrict processing of your personal data
        • Right to data portability
        • Right to object to processing of your personal data
        
        To exercise any of these rights, please contact us using the information provided in the "Contact Us" section.
      `,
    },
    {
      title: '8. Cookies and Similar Technologies',
      content: `
        We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
        
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
      `,
    },
    {
      title: '9. Changes to This Privacy Policy',
      content: `
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        
        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
      `,
    },
    {
      title: '10. Contact Us',
      content: `
        If you have any questions about this Privacy Policy or our data practices, please contact us at:
        
        Pythonchick Education Ltd.
        Email: privacy@pythonchick.com
        Address: 123 Learning Lane, Astana, Kazakhstan
      `,
    },
  ];

  return (
    <div className="privacy-policy-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <LockOutlined /> Privacy Policy
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-md border-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2}>Privacy Policy</Title>
            <Text type="secondary">Last Updated: {lastUpdated}</Text>
          </div>

          <Space>
            <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
              Print
            </Button>
            <Button icon={<DownloadOutlined />} type="primary">
              Download PDF
            </Button>
          </Space>
        </div>

        <Paragraph className="mb-8">
          At Pythonchick, we value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains what information we collect, how we use it, and
          the choices you have regarding your data.
        </Paragraph>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="privacy-section">
              <Title level={4}>{section.title}</Title>
              <Paragraph>
                {section.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </Paragraph>
              {index < sections.length - 1 && <Divider />}
            </div>
          ))}
        </div>

        <Divider />

        <div className="text-center mt-8">
          <Title level={4}>Need More Information?</Title>
          <Paragraph>
            If you have specific questions about your data privacy, please don't hesitate to contact
            our Data Protection Officer.
          </Paragraph>
          <Paragraph strong>
            <a href="mailto:privacy@pythonchick.com">privacy@pythonchick.com</a>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
