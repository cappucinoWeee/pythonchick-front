// src/pages/CoursesPage.js
import React from 'react';
import { Breadcrumb, Empty, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';
import CoursesList from '../components/dashboard/CoursesList';
import { useAppContext } from '../context/AppContext';

const CoursesPage = () => {
  const { courses } = useAppContext();
  
  return (
    <div className="courses-page">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <BookOutlined /> Courses
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display">My Courses</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Discover New Courses
        </Button>
      </div>
      
      {courses.length > 0 ? (
        <CoursesList />
      ) : (
        <Empty
          description="You haven't enrolled in any courses yet"
          className="my-12"
        >
          <Button type="primary">
            <Link to="/courses/discover">Browse Courses</Link>
          </Button>
        </Empty>
      )}
    </div>
  );
};

export default CoursesPage;