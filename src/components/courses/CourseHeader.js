// src/components/courses/CourseHeader.js
import React from 'react';
import { Typography, Tag, Button, Progress, Space, Row, Col, Card } from 'antd';
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  ClockCircleOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const CourseHeader = ({ course }) => {
  const navigate = useNavigate();
  
  // Calculate course progress
  const totalLessons = course.topics.reduce(
    (sum, topic) => sum + topic.lessons.length, 0
  );
  
  const completedLessons = course.topics.reduce(
    (sum, topic) => sum + topic.lessons.filter(lesson => lesson.completed).length, 0
  );
  
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
  
  return (
    <Card className="shadow-md border-0 mb-6 overflow-hidden">
      <div className="relative">
        {/* Background pattern or course image here */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url(${course.image || `/course-${course.id}.png`})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply'
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Button 
              icon={<ArrowLeftOutlined />} 
              type="text"
              onClick={() => navigate('/courses')}
              className="mr-2"
            />
            <Title level={2} className="m-0">{course.title}</Title>
          </div>
          
          <Row gutter={[24, 24]} align="middle" className="mt-2">
            <Col xs={24} md={16}>
              <Paragraph className="text-gray-600">{course.description}</Paragraph>
              
              <Space className="mt-2 mb-4" size="large" wrap>
                <div className="flex items-center text-gray-600">
                  <BookOutlined className="mr-1" />
                  <Text className="mr-1">{course.topics.length}</Text>
                  <Text>topics</Text>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <ClockCircleOutlined className="mr-1" />
                  <Text className="mr-1">{totalLessons}</Text>
                  <Text>lessons</Text>
                </div>
                
                {progressPercentage === 100 ? (
                  <Tag color="success" icon={<TrophyOutlined />} className="ml-auto">
                    Completed
                  </Tag>
                ) : completedLessons > 0 ? (
                  <Tag color="processing" className="ml-auto">In Progress</Tag>
                ) : (
                  <Tag color="default" className="ml-auto">Not Started</Tag>
                )}
              </Space>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="border shadow-sm">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm font-medium">{progressPercentage}%</span>
                  </div>
                  <Progress 
                    percent={progressPercentage} 
                    showInfo={false}
                    strokeColor={progressPercentage === 100 ? "#52C41A" : "#1890FF"}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {completedLessons}/{totalLessons} lessons completed
                  </div>
                </div>
                
                <Button 
                  type="primary" 
                  block 
                  icon={<RocketOutlined />}
                  size="large"
                >
                  {completedLessons > 0 ? 'Continue Learning' : 'Start Course'}
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default CourseHeader;