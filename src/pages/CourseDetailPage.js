// src/pages/CourseDetailPage.js
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Breadcrumb, Empty, Button } from 'antd';
import { 
  HomeOutlined, 
  BookOutlined, 
  ReadOutlined,
  WarningOutlined 
} from '@ant-design/icons';
import CourseHeader from '../components/courses/CourseHeader';
import TopicsList from '../components/courses/TopicsList';
import { useAppContext } from '../context/AppContext';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { courses } = useAppContext();
  
  const course = courses.find(c => c.id === parseInt(courseId));
  
  if (!course) {
    return (
      <Navigate to="/courses" replace />
    );
  }
  
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
          <ReadOutlined /> {course.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <CourseHeader course={course} />
      
      {course.locked ? (
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