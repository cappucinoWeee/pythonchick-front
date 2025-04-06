// src/components/courses/TopicsList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Badge, Progress, Tooltip, Button, Typography, Tag } from 'antd';
import { 
  LockOutlined, 
  CheckCircleOutlined, 
  BookOutlined,
  FileTextOutlined,
  RightOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const TopicsList = ({ course }) => {
  return (
    <Card className="shadow-md border-0">
      <Title level={4} className="mb-4">Course Topics</Title>
      <List
        itemLayout="vertical"
        dataSource={course.topics}
        renderItem={(topic, index) => {
          // Calculate topic progress
          const totalLessons = topic.lessons.length;
          const completedLessons = topic.lessons.filter(lesson => lesson.completed).length;
          const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
          
          const isCompleted = progressPercentage === 100;
          
          return (
            <motion.div
              whileHover={{ y: topic.locked ? 0 : -5 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <Card 
                className={`border hover:shadow-md transition-shadow ${
                  topic.locked ? 'bg-gray-50' : ''
                }`}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center flex-shrink-0">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      topic.locked 
                        ? 'bg-gray-200 text-gray-500' 
                        : isCompleted 
                          ? 'bg-green-100 text-green-500' 
                          : 'bg-blue-100 text-blue-500'
                    }`}>
                      {topic.locked ? (
                        <LockOutlined className="text-lg" />
                      ) : isCompleted ? (
                        <CheckCircleOutlined className="text-lg" />
                      ) : (
                        <BookOutlined className="text-lg" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <Title level={5} className="m-0">
                        {index + 1}. {topic.title}
                      </Title>
                      
                      {topic.locked && (
                        <Badge
                          count="Locked"
                          style={{ backgroundColor: '#d9d9d9' }}
                        />
                      )}
                      
                      {isCompleted && (
                        <Badge
                          count="Completed"
                          style={{ backgroundColor: '#52c41a' }}
                        />
                      )}
                    </div>
                    
                    <Text className={`text-sm block mb-3 ${topic.locked ? 'text-gray-400' : 'text-gray-600'}`}>
                      {topic.description}
                    </Text>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <FileTextOutlined className="mr-1" />
                      <span className="mr-2">{topic.lessons.length} lessons</span>
                      
                      {!topic.locked && (
                        <Tag color={isCompleted ? "success" : "processing"} className="ml-auto mr-2">
                          {progressPercentage}%
                        </Tag>
                      )}
                      
                      <Text className="text-xs">
                        {completedLessons}/{totalLessons}
                      </Text>
                    </div>
                    
                    <Progress 
                      percent={progressPercentage} 
                      showInfo={false}
                      size="small"
                      strokeColor={isCompleted ? "#52C41A" : "#1890FF"}
                      className={topic.locked ? 'opacity-50' : ''}
                    />
                  </div>
                  
                  <div className="flex-shrink-0 mt-3 md:mt-0">
                    {topic.locked ? (
                      <Tooltip title="Complete previous topics to unlock">
                        <Button 
                          disabled 
                          className="w-28 flex items-center justify-center"
                          icon={<LockOutlined />}
                        >
                          <span>Locked</span>
                        </Button>
                      </Tooltip>
                    ) : (
                      <Link to={`/courses/${course.id}/topics/${topic.id}`}>
                        <Button 
                          // type={isCompleted ? "default" : "primary"}
                          className="w-28 flex items-center justify-center"
                          icon={<CaretRightOutlined />}
                        >
                          {completedLessons > 0 && !isCompleted ? 'Continue' : (
                            isCompleted ? 'Review' : 'Start'
                          )}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Preview of lessons (optional) */}
                {!topic.locked && topic.lessons.length > 0 && (
                  <div className="mt-4 pt-3 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-xs font-medium">LESSONS</Text>
                      <Link 
                        to={`/courses/${course.id}/topics/${topic.id}`}
                        className="text-primary text-xs hover:underline"
                      >
                        View all <RightOutlined className="text-xs" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topic.lessons.slice(0, 2).map((lesson, idx) => (
                        <div key={lesson.id} className="flex items-center p-2 bg-gray-50 rounded">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                            lesson.completed ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircleOutlined className="text-green-500 text-xs" />
                            ) : (
                              <Text className="text-xs">{index + 1}.{idx + 1}</Text>
                            )}
                          </div>
                          <Text className="text-xs truncate">{lesson.title}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        }}
      />
    </Card>
  );
};

export default TopicsList;