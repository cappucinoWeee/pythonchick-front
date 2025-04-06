// src/components/dashboard/CoursesList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Tooltip, Progress } from 'antd';
import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const CoursesList = () => {
  const { courses } = useAppContext();
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-display mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          // Calculate progress
          const totalLessons = course.topics.reduce(
            (sum, topic) => sum + topic.lessons.length, 0
          );
          
          const completedLessons = course.topics.reduce(
            (sum, topic) => sum + topic.lessons.filter(lesson => lesson.completed).length, 0
          );
          
          const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
          
          return (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Badge.Ribbon 
                text={course.locked ? "Locked" : `${progressPercentage}% Complete`}
                color={course.locked ? "default" : (progressPercentage === 100 ? "green" : "blue")}
              >
                <Card 
                  className={`shadow-card overflow-hidden ${course.locked ? 'opacity-75' : ''}`}
                  cover={
                    <div className="relative h-48 bg-gray-200">
                      <img 
                        src={course.image || `/course-${course.id}.png`} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      {course.locked && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <LockOutlined className="text-4xl text-white" />
                        </div>
                      )}
                      {progressPercentage === 100 && (
                        <div className="absolute top-2 right-2">
                          <CheckCircleOutlined className="text-2xl text-green-500" />
                        </div>
                      )}
                    </div>
                  }
                >
                  <h3 className="text-lg font-display">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                  
                  <Progress 
                    percent={progressPercentage} 
                    showInfo={false}
                    strokeColor={progressPercentage === 100 ? "#52C41A" : "#1890FF"}
                  />
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {completedLessons}/{totalLessons} lessons
                    </span>
                    
                    {course.locked ? (
                      <Tooltip title="Complete previous course to unlock">
                        <button disabled className="btn bg-gray-300 text-gray-600 cursor-not-allowed">
                          Locked
                        </button>
                      </Tooltip>
                    ) : (
                      <Link 
                        to={`/courses/${course.id}`}
                        className="btn-primary"
                      >
                        {completedLessons > 0 ? "Continue" : "Start"}
                      </Link>
                    )}
                  </div>
                </Card>
              </Badge.Ribbon>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesList;