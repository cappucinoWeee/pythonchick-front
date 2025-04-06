// src/components/lessons/LessonHeader.js
import React from 'react';
import { Typography, Tag, Progress, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LessonHeader = ({ course, topic, lesson, lessonIndex, topicLessonsCount }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl shadow-card mb-6 p-6">
      <div className="flex items-center mb-2">
        <Button 
          icon={<ArrowLeftOutlined />} 
          type="text"
          onClick={() => navigate(`/courses/${course.id}/topics/${topic.id}`)}
          className="mr-2"
        />
        <Title level={3} className="m-0">{lesson.title}</Title>
      </div>
      
      <div className="flex items-center mb-4">
        <Text className="mr-4">Lesson {lessonIndex + 1}/{topicLessonsCount}</Text>
        
        <Tag color={lesson.type === 'quiz' ? 'purple' : 'blue'}>
          {lesson.type === 'quiz' ? 'Quiz' : 'Lesson'}
        </Tag>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Topic Progress</span>
          <span className="text-sm font-medium">
            {lesson.completed ? 'Completed' : 'In Progress'}
          </span>
        </div>
        <Progress 
          percent={(((lessonIndex + (lesson.completed ? 1 : 0)) / topicLessonsCount) * 100)} 
          showInfo={false}
          strokeColor="#1890FF"
        />
      </div>
    </div>
  );
};

export default LessonHeader;