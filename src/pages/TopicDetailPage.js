// src/pages/TopicDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Breadcrumb, Card, Typography, Button, message } from 'antd';
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
import courseService from '../services/courseService';
import FullScreenSpin from '../components/layout/FullScreenSpin';

const { Title, Paragraph } = Typography;

const TopicDetailPage = () => {
  const { courseId, topicId } = useParams();
  const { courses, user } = useAppContext();
  const [topic, setTopic] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Parse IDs as integers
  const courseIdInt = parseInt(courseId);
  const topicIdInt = parseInt(topicId);
  
  // Find course from the existing courses array
  const courseFromContext = courses.find(c => c.id === courseIdInt);
  
  // Find topic from the context course if available
  const topicFromContext = courseFromContext?.topics?.find(t => t.id === topicIdInt);
  
  // Fetch topic details if needed
  useEffect(() => {
    const fetchTopicDetail = async () => {
      // If we already have complete topic data with lessons, use it
      if (topicFromContext && topicFromContext.lessons && 
          Array.isArray(topicFromContext.lessons) && topicFromContext.lessons.length > 0) {
        setCourse(courseFromContext);
        setTopic(topicFromContext);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Fetch detailed topic with lessons
        const data = await courseService.getTopicById(topicIdInt, user?.id);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Fetched topic detail:', data);
        }
        
        if (data) {
          // Process lessons to ensure they have the right structure
          const processedTopic = {
            ...data,
            id: topicIdInt,
            lessons: Array.isArray(data.lessons) ? data.lessons.map(lesson => ({
              ...lesson,
              id: lesson.id,
              is_completed: lesson.is_completed || false,
              completed: lesson.is_completed || false
            })) : [],
            is_locked: data.is_locked,
            locked: data.is_locked
          };
          
          setTopic(processedTopic);
          
          // Keep using course from context
          setCourse(courseFromContext);
        } else {
          // If API returns no data, use topic from context as fallback
          setTopic(topicFromContext);
          setCourse(courseFromContext);
        }
      } catch (err) {
        console.error('Error fetching topic detail:', err);
        setError('Failed to load topic details. Please try again later.');
        message.error('Failed to load topic details');
        
        // Use context data as fallback
        setTopic(topicFromContext);
        setCourse(courseFromContext);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopicDetail();
  }, [courseIdInt, topicIdInt, courseFromContext, topicFromContext, user?.id]);
  
  // Show loading state
  if (loading) {
    return <FullScreenSpin tip="Loading topic details..." />;
  }
  
  // If course or topic not found, redirect to courses page
  if (!course || !topic) {
    message.error('Topic not found');
    return <Navigate to={`/courses/${courseId}`} replace />;
  }
  
  // Check if topic is locked
  const isLocked = topic.is_locked || topic.locked;
  
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
      
      {isLocked ? (
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
            <TopicProgress topic={topic} course={course} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicDetailPage;