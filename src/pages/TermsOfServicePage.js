// src/pages/TermsOfServicePage.js
import React from 'react';
import { Card, Typography, Breadcrumb, Button, Divider, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const TermsOfServicePage = () => {
  // Last updated date
  const lastUpdated = 'April 5, 2023';

  // Terms of Service sections
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `
        By accessing and using the Pythonchick platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        
        This Service is intended for educational purposes, specifically designed to teach programming through interactive content. By using this Service, you understand that it is intended for learning purposes.
      `,
    },
    {
      title: '2. Registration and Account Security',
      content: `
        To use certain features of the Service, you may be required to register for an account. You agree to provide accurate, complete, and updated information. You are responsible for maintaining the confidentiality of your account credentials.
        
        You are responsible for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to your account. We cannot be responsible for any losses caused by unauthorized use of your account.
      `,
    },
    {
      title: '3. User Content',
      content: `
        You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, and display such content in connection with the Service.
        
        You agree not to post content that is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, or otherwise objectionable.
      `,
    },
    {
      title: '4. Intellectual Property',
      content: `
        The Service and its original content, features, and functionality are owned by Pythonchick and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        
        All educational content, including but not limited to, lessons, quizzes, illustrations, and code examples, are property of Pythonchick and may not be reproduced, distributed, or used for commercial purposes without explicit permission.
      `,
    },
    {
      title: "5. Children's Privacy",
      content: `
        Our Service is designed for users of all ages, including children under 13. We comply with the Children's Online Privacy Protection Act (COPPA) and similar international regulations. We do not knowingly collect personally identifiable information from anyone under 13 without parental consent.
        
        If you are a parent or guardian and you are aware that your child has provided us with personal information without your consent, please contact us immediately.
      `,
    },
    {
      title: '6. Data Privacy',
      content: `
        Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
        
        We take the protection of your data seriously and implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
      `,
    },
    {
      title: '7. Limitation of Liability',
      content: `
        To the maximum extent permitted by law, Pythonchick shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues.
        
        In no event shall our total liability to you for all claims related to the Service exceed the amount paid by you, if any, to us for the Service during the twelve (12) months immediately preceding the date of the most recent claim.
      `,
    },
    {
      title: '8. Changes to Terms',
      content: `
        We reserve the right to modify these Terms at any time. We will provide notice of significant changes to these Terms by posting the new Terms on the Service and/or sending you an email.
        
        Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new terms, please stop using the Service.
      `,
    },
    {
      title: '9. Termination',
      content: `
        We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        
        Upon termination, your right to use the Service will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive.
      `,
    },
    {
      title: '10. Governing Law',
      content: `
        These Terms shall be governed and construed in accordance with the laws of Kazakhstan, without regard to its conflict of law provisions.
        
        Any disputes arising out of or relating to these Terms or the Service will be subject to the exclusive jurisdiction of the courts located within Kazakhstan.
      `,
    },
  ];

  return (
    <div className="terms-of-service-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FileTextOutlined /> Terms of Service
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-md border-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2}>Terms of Service</Title>
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
          Please read these Terms of Service carefully before using the Pythonchick platform
          operated by Pythonchick Education Ltd. These Terms govern your access to and use of the
          Service.
        </Paragraph>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="terms-section">
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
          <Title level={4}>Contact Us</Title>
          <Paragraph>If you have any questions about these Terms, please contact us at:</Paragraph>
          <Paragraph strong>
            <a href="mailto:support@pythonchick.com">support@pythonchick.com</a>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
