// src/components/courses/CourseHeader.js
import React from 'react';
import { Typography, Tag, Button, Progress, Space } from 'antd';
import { ArrowLeftOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

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
    <div className="bg-white rounded-xl shadow-card mb-6 p-6">
      <div className="flex items-center mb-2">
        <Button 
          icon={<ArrowLeftOutlined />} 
          type="text"
          onClick={() => navigate('/dashboard')}
          className="mr-2"
        />
        <Title level={3} className="m-0">{course.title}</Title>
      </div>
      
      <div className="flex items-center mb-4">
        <BookOutlined className="mr-1" />
        <Text className="mr-4">{course.topics.length} topics</Text>
        <Text>{totalLessons} lessons</Text>
        
        <div className="ml-auto">
          {progressPercentage === 100 ? (
            <Tag color="success" icon={<TrophyOutlined />}>
              Completed
            </Tag>
          ) : (
            <Tag color="processing">In Progress</Tag>
          )}
        </div>
      </div>
      
      <Text className="text-gray-600 block mb-4">{course.description}</Text>
      
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
      
      <div className="flex justify-end">
        <Button type="primary">
          {completedLessons > 0 ? 'Continue Learning' : 'Start Course'}
        </Button>
      </div>
    </div>
  );
};

export default CourseHeader;