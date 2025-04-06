// src/components/dashboard/CoursesList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Tooltip, Progress, Tag, Button } from 'antd';
import { 
  LockOutlined, 
  CheckCircleOutlined, 
  RightOutlined,
  FireOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const CoursesList = ({ limit }) => {
  const { courses } = useAppContext();
  
  // Limit the number of courses shown if needed
  const displayedCourses = limit ? courses.slice(0, limit) : courses;
  
  return (
    <Row gutter={[24, 24]}>
      {displayedCourses.map((course) => {
        // Calculate progress
        const totalLessons = course.topics.reduce(
          (sum, topic) => sum + topic.lessons.length, 0
        );
        
        const completedLessons = course.topics.reduce(
          (sum, topic) => sum + topic.lessons.filter(lesson => lesson.completed).length, 0
        );
        
        const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
        
        return (
          <Col key={course.id} xs={24} sm={12} lg={limit ? 8 : 8} xl={limit ? 8 : 6}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Badge.Ribbon 
                text={course.locked ? "Locked" : `${progressPercentage}% Complete`}
                color={course.locked ? "default" : (progressPercentage === 100 ? "green" : "blue")}
              >
                <Card 
                  className={`h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow ${course.locked ? 'opacity-75' : ''}`}
                  cover={
                    <div className="relative h-40 bg-gray-200">
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
                      {!course.locked && progressPercentage > 0 && progressPercentage < 100 && (
                        <Badge 
                          count={<FireOutlined style={{ color: '#FF4D4F' }} />}
                          className="absolute top-2 right-2"
                        />
                      )}
                    </div>
                  }
                  actions={[
                    <div className="flex justify-between items-center px-4">
                      <div className="flex items-center text-xs">
                        <ClockCircleOutlined className="mr-1" />
                        <span>{course.topics.length} topics</span>
                      </div>
                      {course.locked ? (
                        <Tooltip title="Complete previous course to unlock">
                          <Button disabled size="small" icon={<LockOutlined />} className="cursor-not-allowed">
                            Locked
                          </Button>
                        </Tooltip>
                      ) : (
                        <Link to={`/courses/${course.id}`}>
                          <Button 
                            type="primary" 
                            size="small"
                            icon={<RightOutlined />}
                          >
                            {completedLessons > 0 ? "Continue" : "Start"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  ]}
                >
                  <Card.Meta
                    title={
                      <Link 
                        to={course.locked ? "#" : `/courses/${course.id}`}
                        className={`text-lg ${course.locked ? 'cursor-not-allowed text-gray-500' : 'text-primary'}`}
                      >
                        {course.title}
                      </Link>
                    }
                    description={
                      <div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                          {course.description}
                        </p>
                        
                        <div className="mb-1 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {completedLessons}/{totalLessons} lessons
                          </span>
                          {!course.locked && (
                            <Tag color={progressPercentage === 0 ? "default" : "processing"}>
                              {progressPercentage === 0 ? "Not Started" : 
                              progressPercentage === 100 ? "Completed" : "In Progress"}
                            </Tag>
                          )}
                        </div>
                        
                        <Progress 
                          percent={progressPercentage} 
                          showInfo={false}
                          size="small"
                          strokeColor={progressPercentage === 100 ? "#52C41A" : "#1890FF"}
                          className={course.locked ? 'opacity-50' : ''}
                        />
                      </div>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </motion.div>
          </Col>
        );
      })}
    </Row>
  );
};

export default CoursesList;