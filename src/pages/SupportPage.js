// src/pages/SupportPage.js
import React, { useState } from 'react';
import {
  Card,
  Typography,
  Breadcrumb,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Row,
  Col,
  List,
  Collapse,
  message,
  Alert,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const SupportPage = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  // Frequently Asked Questions
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page. You will receive an email with instructions on how to reset your password.",
    },
    {
      question: 'Can I use Pythonchick on my mobile device?',
      answer:
        'Yes! Pythonchick works on all modern devices including smartphones and tablets. We have optimized the experience for mobile devices, though some coding exercises may be easier to complete on a larger screen.',
    },
    {
      question: 'Are there any age restrictions for using Pythonchick?',
      answer:
        'Pythonchick is designed for users of all ages. For children under 13, we require parental consent in accordance with COPPA regulations. Our platform is particularly optimized for learners between 8-16 years old, but anyone interested in learning Python can benefit from our courses.',
    },
    {
      question: "How do I track my child's progress?",
      answer:
        "Parents can create a parent account that links to their child's account. This provides access to progress reports, completed lessons, achievements, and time spent on the platform. You can set up a parent account from the 'Family Settings' option in your profile.",
    },
    {
      question: 'Are the courses self-paced?',
      answer:
        "Yes, all Pythonchick courses are self-paced. You can learn at your own speed and come back to lessons whenever it's convenient for you. Your progress is automatically saved so you can pick up right where you left off.",
    },
    {
      question: 'What if I get stuck on a coding exercise?',
      answer:
        "Every coding exercise includes hints that you can access if you're stuck. We also provide sample solutions after several attempts. Additionally, you can post your question in our community forum where other learners and our instructors can help you.",
    },
    {
      question: 'Can I download the course content for offline use?',
      answer:
        'Currently, Pythonchick requires an internet connection to access the interactive elements of our courses. However, lesson notes and reference materials can be downloaded as PDFs for offline viewing.',
    },
    {
      question: 'How do I get a refund?',
      answer:
        "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our support team with your order details, and we'll process your refund according to our refund policy.",
    },
  ];

  // Contact form submission
  const handleSubmit = (values) => {
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      form.resetFields();
      message.success('Your support request has been submitted successfully!');
    }, 1500);
  };

  // Render contact form
  const renderContactForm = () => (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {submitted && (
        <Alert
          message="Thank you for contacting us!"
          description="We've received your message and will get back to you within 24-48 hours."
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
          className="mb-6"
          closable
          onClose={() => setSubmitted(false)}
        />
      )}

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Your name" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Your email" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="subject"
        label="Subject"
        rules={[{ required: true, message: 'Please select a subject' }]}
      >
        <Select placeholder="Select a subject">
          <Option value="account">Account Issues</Option>
          <Option value="billing">Billing & Payments</Option>
          <Option value="technical">Technical Problems</Option>
          <Option value="content">Course Content</Option>
          <Option value="feedback">Feedback & Suggestions</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: 'Please enter your message' }]}
      >
        <TextArea rows={6} placeholder="Please describe your issue or question in detail..." />
      </Form.Item>

      <Form.Item name="attachment" label="Attachment (optional)">
        <Input type="file" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
          loading={submitting}
          size="large"
        >
          Submit Request
        </Button>
      </Form.Item>
    </Form>
  );

  // Render FAQ section
  const renderFAQ = () => (
    <div className="faq-section">
      <Title level={4} className="mb-4">
        Frequently Asked Questions
      </Title>

      <Collapse expandIconPosition="right" className="shadow-sm">
        {faqs.map((faq, index) => (
          <Panel header={<span className="font-medium">{faq.question}</span>} key={index}>
            <Paragraph>{faq.answer}</Paragraph>
          </Panel>
        ))}
      </Collapse>

      <Paragraph className="mt-6 text-center">
        Can't find an answer to your question?{' '}
        <a onClick={() => setActiveTab('contact')} className="cursor-pointer text-primary">
          Contact our support team
        </a>
        .
      </Paragraph>
    </div>
  );

  return (
    <div className="support-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <QuestionCircleOutlined /> Support
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-md border-0 mb-6">
        <Title level={2}>Help & Support</Title>
        <Paragraph className="text-lg text-gray-600">
          We're here to help you with any questions or issues you might have with Pythonchick.
        </Paragraph>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            className="shadow-md border-0"
            tabList={[
              {
                key: 'contact',
                tab: (
                  <span>
                    <MessageOutlined className="mr-2" />
                    Contact Support
                  </span>
                ),
              },
              {
                key: 'faq',
                tab: (
                  <span>
                    <QuestionCircleOutlined className="mr-2" />
                    FAQ
                  </span>
                ),
              },
            ]}
            activeTabKey={activeTab}
            onTabChange={setActiveTab}
          >
            {activeTab === 'contact' ? renderContactForm() : renderFAQ()}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="shadow-md border-0 mb-6">
            <Title level={4}>Contact Information</Title>
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'Email',
                  description: 'support@pythonchick.com',
                  icon: <MailOutlined className="text-xl text-primary" />,
                },
                {
                  title: 'Phone',
                  description: '+1 (555) 123-4567',
                  icon: <PhoneOutlined className="text-xl text-primary" />,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card className="shadow-md border-0">
            <Title level={4}>Support Hours</Title>
            <Paragraph>
              Our support team is available Monday through Friday, 9am to 6pm (GMT+6).
            </Paragraph>
            <Paragraph>Typical response time: 24-48 hours</Paragraph>
            <Divider />
            <Title level={5}>Emergency Support</Title>
            <Paragraph>
              For urgent issues outside normal hours, please email{' '}
              <a href="mailto:urgent@pythonchick.com">urgent@pythonchick.com</a>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// Needed icon
const UserOutlined = () => <span />;

export default SupportPage;
