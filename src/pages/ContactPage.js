// src/pages/ContactPage.js
import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Breadcrumb, 
  Form, 
  Input, 
  Button, 
  Select, 
  Row, 
  Col,
  message,
  Alert,
  Space
} from 'antd';
import { Link } from 'react-router-dom';
import { 
  HomeOutlined, 
  SendOutlined, 
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Contact form submission
  const handleSubmit = (values) => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      form.resetFields();
      message.success('Your message has been sent successfully!');
    }, 1500);
  };
  
  return (
    <div className="contact-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <MailOutlined /> Contact Us
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="shadow-md border-0">
            <Title level={2}>Get in Touch</Title>
            <Paragraph className="text-gray-600 mb-6">
              Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </Paragraph>
            
            {submitted && (
              <Alert
                message="Message Sent Successfully!"
                description="Thank you for reaching out. We'll respond to your inquiry shortly."
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                className="mb-6"
                closable
                onClose={() => setSubmitted(false)}
              />
            )}
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
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
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Your email" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input placeholder="What is your message about?" />
              </Form.Item>
              
              <Form.Item
                name="category"
                label="Category"
              >
                <Select placeholder="Select a category (optional)">
                  <Option value="general">General Inquiry</Option>
                  <Option value="feedback">Feedback</Option>
                  <Option value="partnership">Partnership Opportunity</Option>
                  <Option value="careers">Careers</Option>
                  <Option value="press">Press & Media</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  rows={6} 
                  placeholder="How can we help you? Please provide as much detail as possible."
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SendOutlined />}
                  loading={submitting}
                  size="large"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card className="shadow-md border-0 mb-6">
            <Title level={4}>Contact Details</Title>
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex items-start">
                <MailOutlined className="text-xl text-primary mt-1 mr-3" />
                <div>
                  <Text strong className="block">Email</Text>
                  <a href="mailto:info@pythonchick.com" className="text-primary">info@pythonchick.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <PhoneOutlined className="text-xl text-primary mt-1 mr-3" />
                <div>
                  <Text strong className="block">Phone</Text>
                  <Text>+1 (555) 123-4567</Text>
                </div>
              </div>
              
              <div className="flex items-start">
                <EnvironmentOutlined className="text-xl text-primary mt-1 mr-3" />
                <div>
                  <Text strong className="block">Address</Text>
                  <Text>123 Learning Lane</Text>
                  <br />
                  <Text>Astana, Kazakhstan</Text>
                </div>
              </div>
              
              <div className="flex items-start">
                <GlobalOutlined className="text-xl text-primary mt-1 mr-3" />
                <div>
                  <Text strong className="block">Website</Text>
                  <a href="https://www.pythonchick.com" className="text-primary">www.pythonchick.com</a>
                </div>
              </div>
            </Space>
          </Card>
          
          <Card className="shadow-md border-0">
            <Title level={4}>Business Hours</Title>
            <table className="w-full mt-2">
              <tbody>
                <tr>
                  <td className="py-2"><Text strong>Monday - Friday</Text></td>
                  <td className="py-2 text-right">9:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2"><Text strong>Saturday</Text></td>
                  <td className="py-2 text-right">10:00 AM - 4:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2"><Text strong>Sunday</Text></td>
                  <td className="py-2 text-right">Closed</td>
                </tr>
              </tbody>
            </table>
            
            <Paragraph className="mt-4 text-gray-500 text-sm">
              All times are in GMT+6 (Astana, Kazakhstan)
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactPage;