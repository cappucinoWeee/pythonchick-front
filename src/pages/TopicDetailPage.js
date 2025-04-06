// src/pages/TopicDetailPage.js
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Breadcrumb, Card, Typography, Button } from 'antd';
import { 
  HomeOutlined, 
  BookOutlined, 
  ReadOutlined,
  OrderedListOutlined,
  WarningOutlined 
} from '@ant-design/icons';
import TopicProgress from '../components/courses/TopicProgress';
import LessonsList from '../components/courses/LessonsList';
import { useAppContext } from '../context/AppContext';

const { Title, Paragraph } = Typography;

const TopicDetailPage = () => {
  const { courseId, topicId } = useParams();
  const { courses } = useAppContext();
  
  const course = courses.find(c => c.id === parseInt(courseId));
  
  if (!course) {
    return <Navigate to="/courses" replace />;
  }
  
  const topic = course.topics.find(t => t.id === parseInt(topicId));
  
  if (!topic) {
    return <Navigate to={`/courses/${courseId}`} replace />;
  }
  
  return (
    <div className="topic-detail-page">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/courses">
            <BookOutlined /> Courses
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/courses/${courseId}`}>
            <ReadOutlined /> {course.title}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <OrderedListOutlined /> {topic.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="mb-6 bg-white rounded-xl shadow-card p-6">
        <Title level={2}>{topic.title}</Title>
        <Paragraph className="text-gray-600">{topic.description}</Paragraph>
      </div>
      
      {topic.locked ? (
        <div className="text-center my-12">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-8 max-w-lg mx-auto">
            <WarningOutlined className="text-4xl text-yellow-500 mb-4" />
            <Title level={4} className="text-yellow-800 mb-2">
              Topic Locked
            </Title>
            <Paragraph className="text-yellow-700 mb-4">
              You need to complete previous topics before you can access this one.
            </Paragraph>
            <Button type="primary">
              <Link to={`/courses/${courseId}`}>Go Back to Course</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <Title level={4} className="mb-4">Lessons</Title>
              <LessonsList course={course} topic={topic} />
            </Card>
          </div>
          
          <div>
            <TopicProgress topic={topic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicDetailPage;