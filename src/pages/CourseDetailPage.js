// src/pages/CourseDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Breadcrumb, Button, message, Spin } from 'antd';
import { 
  HomeOutlined, 
  BookOutlined, 
  ReadOutlined,
  WarningOutlined 
} from '@ant-design/icons';
import CourseHeader from '../components/courses/CourseHeader';
import TopicsList from '../components/courses/TopicsList';
import { useAppContext } from '../context/AppContext';
import courseService from '../services/courseService';
import FullScreenSpin from '../components/layout/FullScreenSpin';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { courses, user } = useAppContext();
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // First try to find course in the existing courses array
  const courseFromContext = courses.find(c => c.id === parseInt(courseId));
  
  // Fetch detailed course data if needed
  useEffect(() => {
    const fetchCourseDetail = async () => {
      // Only fetch if we don't already have detailed data
      if (courseFromContext && courseFromContext.topics && 
          courseFromContext.topics.length > 0 && 
          courseFromContext.topics[0].lessons) {
        setCourseDetail(courseFromContext);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Fetch detailed course with topics and lessons
        const data = await courseService.getCourseById(parseInt(courseId), user?.id);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Fetched course detail:', data);
        }
        
        if (data) {
          // Process data to ensure it has the right structure
          const processedCourse = {
            ...data,
            id: parseInt(courseId),
            topics: Array.isArray(data.topics) ? data.topics.map(topic => ({
              ...topic,
              id: topic.id,
              is_locked: topic.is_locked === undefined ? (topic.order_index > 0) : topic.is_locked,
              locked: topic.is_locked === undefined ? (topic.order_index > 0) : topic.is_locked,
              lessons: Array.isArray(topic.lessons) ? topic.lessons.map(lesson => ({
                ...lesson,
                is_completed: lesson.is_completed || false,
                completed: lesson.is_completed || false
              })) : []
            })) : [],
            is_locked: data.is_locked === undefined ? (data.id !== 1) : data.is_locked,
            locked: data.is_locked === undefined ? (data.id !== 1) : data.is_locked
          };
          
          setCourseDetail(processedCourse);
        } else {
          // If API returns no data, use course from context as fallback
          setCourseDetail(courseFromContext);
        }
      } catch (err) {
        console.error('Error fetching course detail:', err);
        setError('Failed to load course details. Please try again later.');
        message.error('Failed to load course details');
        
        // Use context data as fallback
        setCourseDetail(courseFromContext);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseDetail();
  }, [courseId, courseFromContext, user?.id]);
  
  // Show loading state
  if (loading) {
    return <FullScreenSpin tip="Loading course details..." />;
  }
  
  // If course not found (not in context and failed to fetch), redirect to courses page
  if (!courseDetail && !loading) {
    message.error('Course not found');
    return <Navigate to="/courses" replace />;
  }
  
  // Use course from API or context
  const course = courseDetail || courseFromContext;
  const isLocked = course?.is_locked || course?.locked;
  
  return (
    <div className="course-detail-page">
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
          <ReadOutlined /> {course?.title || 'Course Details'}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <CourseHeader course={course} />
      
      {isLocked ? (
        <div className="text-center my-12">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-8 max-w-lg mx-auto">
            <WarningOutlined className="text-4xl text-yellow-500 mb-4" />
            <h2 className="text-xl font-medium text-yellow-800 mb-2">
              Course Locked
            </h2>
            <p className="text-yellow-700 mb-4">
              You need to complete previous courses before you can access this one.
            </p>
            <Button type="primary">
              <Link to="/courses">Go to Available Courses</Link>
            </Button>
          </div>
        </div>
      ) : (
        <TopicsList course={course} />
      )}
    </div>
  );
};

export default CourseDetailPage;