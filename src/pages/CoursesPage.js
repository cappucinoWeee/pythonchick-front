// src/pages/CoursesPage.js
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Empty, Button, Spin, Alert, Typography, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BookOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import CoursesList from '../components/dashboard/CoursesList';
import { useAppContext } from '../context/AppContext';

const { Title, Paragraph } = Typography;

const CoursesPage = () => {
  const { courses, loading, error, fetchCourses } = useAppContext();
  const [refreshing, setRefreshing] = useState(false);

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };

  return (
    <div className="courses-page pb-6">
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
        <Title level={2}>My Courses</Title>
        <div className="flex space-x-2">
          <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={refreshing}>
            Refresh
          </Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Discover New Courses
          </Button>
        </div>
      </div>

      {error && (
        <Alert
          message="Error Loading Courses"
          description={error}
          type="error"
          showIcon
          className="mb-6"
          action={
            <Button size="small" onClick={handleRefresh}>
              Retry
            </Button>
          }
        />
      )}

      {loading ? (
        <div className="text-center my-12">
          <Spin size="large" tip="Loading courses..." />
        </div>
      ) : courses.length > 0 ? (
        <CoursesList limit={0} />
      ) : (
        <Card className="text-center my-12 border shadow-md py-8">
          <Empty
            description="You haven't enrolled in any courses yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Paragraph className="text-gray-500 mb-6">
              Start your Python learning journey by enrolling in a course
            </Paragraph>
            <Button type="primary">
              <Link to="/courses/discover">Browse Courses</Link>
            </Button>
          </Empty>
        </Card>
      )}
    </div>
  );
};

export default CoursesPage;
