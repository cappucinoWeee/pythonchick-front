// src/components/courses/TopicsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Badge, Progress, Tooltip } from 'antd';
import { 
  LockOutlined, 
  CheckCircleOutlined, 
  BookOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const TopicsList = ({ course }) => {
  return (
    <Card className="shadow-card">
      <h2 className="text-xl font-display mb-4">Course Topics</h2>
      <List
        itemLayout="horizontal"
        dataSource={course.topics}
        renderItem={(topic, index) => {
          // Calculate topic progress
          const totalLessons = topic.lessons.length;
          const completedLessons = topic.lessons.filter(lesson => lesson.completed).length;
          const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
          
          const isCompleted = progressPercentage === 100;
          
          return (
            <motion.div
              whileHover={{ x: topic.locked ? 0 : 5 }}
              transition={{ duration: 0.2 }}
            >
              <List.Item
                className={`border rounded-lg p-4 mb-4 ${
                  topic.locked ? 'bg-gray-50' : 'hover:shadow-md'
                }`}
              >
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        topic.locked 
                          ? 'bg-gray-200 text-gray-500' 
                          : isCompleted 
                            ? 'bg-green-100 text-green-500' 
                            : 'bg-blue-100 text-blue-500'
                      }`}>
                        {topic.locked ? (
                          <LockOutlined />
                        ) : isCompleted ? (
                          <CheckCircleOutlined />
                        ) : (
                          <BookOutlined />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className={`text-lg font-medium ${
                            topic.locked ? 'text-gray-500' : ''
                          }`}>
                            {index + 1}. {topic.title}
                          </h3>
                          {topic.locked && (
                            <Badge
                              count="Locked"
                              style={{ backgroundColor: '#d9d9d9' }}
                              className="ml-2"
                            />
                          )}
                          {isCompleted && (
                            <Badge
                              count="Completed"
                              style={{ backgroundColor: '#52c41a' }}
                              className="ml-2"
                            />
                          )}
                        </div>
                        <p className={`text-sm ${topic.locked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    
                    {topic.locked ? (
                      <Tooltip title="Complete previous topics to unlock">
                        <button disabled className="btn bg-gray-300 text-gray-600 cursor-not-allowed">
                          Locked
                        </button>
                      </Tooltip>
                    ) : (
                      <Link 
                        to={`/courses/${course.id}/topics/${topic.id}`}
                        className={`btn ${
                          isCompleted ? 'btn-secondary' : 'btn-primary'
                        }`}
                      >
                        {completedLessons > 0 && !isCompleted ? 'Continue' : (
                          isCompleted ? 'Review' : 'Start'
                        )}
                      </Link>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <FileTextOutlined className="mr-1" />
                        <span>{topic.lessons.length} lessons</span>
                      </div>
                      <span className="text-sm font-medium">
                        {completedLessons}/{totalLessons}
                      </span>
                    </div>
                    <Progress 
                      percent={progressPercentage} 
                      showInfo={false}
                      strokeColor={isCompleted ? "#52C41A" : "#1890FF"}
                      className={topic.locked ? 'opacity-50' : ''}
                    />
                  </div>
                </div>
              </List.Item>
            </motion.div>
          );
        }}
      />
    </Card>
  );
};

export default TopicsList;