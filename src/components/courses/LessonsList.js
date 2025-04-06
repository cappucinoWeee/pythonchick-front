// src/components/courses/LessonsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Tag, Tooltip } from 'antd';
import { 
  LockOutlined, 
  CheckCircleOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const LessonsList = ({ course, topic }) => {
  // Find the last completed lesson to determine what's unlocked
  const lastCompletedIndex = topic.lessons.findLastIndex(lesson => lesson.completed);
  
  return (
    <List
      className="mt-6"
      itemLayout="horizontal"
      dataSource={topic.lessons}
      renderItem={(lesson, index) => {
        const isLocked = index > lastCompletedIndex + 1 && !lesson.completed;
        const isCompleted = lesson.completed;
        
        let icon;
        if (isLocked) {
          icon = <LockOutlined className="text-gray-400" />;
        } else if (isCompleted) {
          icon = <CheckCircleOutlined className="text-green-500" />;
        } else if (lesson.type === 'quiz') {
          icon = <QuestionCircleOutlined className="text-purple-500" />;
        } else {
          icon = <FileTextOutlined className="text-blue-500" />;
        }
        
        return (
          <motion.div
            whileHover={{ x: isLocked ? 0 : 5 }}
            transition={{ duration: 0.2 }}
          >
            <List.Item
              className={`border rounded-lg p-4 mb-3 ${
                isLocked 
                  ? 'bg-gray-50 cursor-not-allowed' 
                  : 'hover:shadow-md cursor-pointer'
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isLocked 
                        ? 'bg-gray-200' 
                        : isCompleted 
                          ? 'bg-green-100' 
                          : 'bg-blue-100'
                    }`}>
                      {icon}
                    </div>
                    <div className="ml-3">
                      <h4 className={`font-medium ${isLocked ? 'text-gray-500' : ''}`}>
                        {index + 1}. {lesson.title}
                      </h4>
                      <div className="flex items-center mt-1">
                        <Tag color={lesson.type === 'quiz' ? 'purple' : 'blue'}>
                          {lesson.type === 'quiz' ? 'Quiz' : 'Lesson'}
                        </Tag>
                        <span className="text-xs text-gray-500 ml-2">
                          {lesson.type === 'quiz' ? '10 questions' : '~10 min'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isLocked ? (
                    <Tooltip title="Complete previous lessons to unlock">
                      <button disabled className="btn bg-gray-300 text-gray-600 cursor-not-allowed">
                        Locked
                      </button>
                    </Tooltip>
                  ) : (
                    <Link 
                      to={`/courses/${course.id}/topics/${topic.id}/lessons/${lesson.id}`}
                      className={`flex items-center ${
                        isCompleted ? 'text-green-500' : 'text-primary'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <span className="mr-1">Review</span>
                          <PlayCircleOutlined />
                        </>
                      ) : (
                        <>
                          <span className="mr-1">Start</span>
                          <PlayCircleOutlined />
                        </>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            </List.Item>
          </motion.div>
        );
      }}
    />
  );
};

export default LessonsList;