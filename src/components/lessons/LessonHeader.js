// src/components/lessons/LessonHeader.js
import React from 'react';
import { Typography, Tag, Progress, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const LessonHeader = ({ course, topic, lesson, lessonIndex = 0, topicLessonsCount = 0 }) => {
  const navigate = useNavigate();

  // Default values in case props are missing
  const courseId = course?.id || 0;
  const topicId = topic?.id || 0;
  const lessonTitle = lesson?.title || 'Lesson';
  const lessonType = lesson?.type || 'lesson';
  const isCompleted = lesson?.is_completed || false;

  // Calculate progress percentage
  const progressPercent = Math.round(
    ((lessonIndex + (isCompleted ? 1 : 0)) / Math.max(topicLessonsCount, 1)) * 100,
  );

  return (
    <div className="bg-white rounded-xl shadow-card mb-6 p-6">
      <div className="flex items-center mb-2">
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate(`/courses/${courseId}/topics/${topicId}`)}
          className="mr-2"
        />
        <Title level={3} className="m-0">
          {lessonTitle}
        </Title>
      </div>

      <div className="flex items-center mb-4">
        <Text className="mr-4">
          Lesson {lessonIndex + 1}/{Math.max(topicLessonsCount, 1)}
        </Text>

        <Tag color={lessonType === 'quiz' ? 'purple' : lessonType === 'coding' ? 'blue' : 'green'}>
          {lessonType === 'quiz' ? 'Quiz' : lessonType === 'coding' ? 'Coding' : 'Lesson'}
        </Tag>
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Topic Progress</span>
          <span className="text-sm font-medium">{isCompleted ? 'Completed' : 'In Progress'}</span>
        </div>
        <Progress percent={progressPercent} showInfo={false} strokeColor="#1890FF" />
      </div>
    </div>
  );
};

export default LessonHeader;
