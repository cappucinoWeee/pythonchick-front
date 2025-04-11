// src/components/dashboard/CoursesList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Tooltip, Progress, Tag, Button, Skeleton } from 'antd';
import { 
  LockOutlined, 
  CheckCircleOutlined, 
  RightOutlined,
  FireOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const CoursesList = ({ limit = 0 }) => {
  const { courses, loading } = useAppContext();
  
  // Limit the number of courses shown if requested
  const displayedCourses = limit > 0 ? courses.slice(0, limit) : courses;
  
  // Loading skeleton
  if (loading) {
    return (
      <Row gutter={[24, 24]}>
        {[1, 2, 3, 4].map((item) => (
          <Col key={item} xs={24} sm={12} lg={limit ? 8 : 8} xl={limit ? 8 : 6}>
            <Card>
              <Skeleton.Image style={{ width: '100%', height: 160 }} active />
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
  
  return (
    <Row gutter={[24, 24]}>
      {displayedCourses.map((course) => {
        // Calculate progress based on completed lessons
        const totalLessons = course.topics.reduce(
          (sum, topic) => sum + topic.lessons.length, 0
        );
        
        const completedLessons = course.topics.reduce(
          (sum, topic) => sum + topic.lessons.filter(lesson => lesson.is_completed).length, 0
        );
        
        const progressPercentage = Math.round((completedLessons / totalLessons) * 100) || 0;
        
        // Next lesson URL to continue where the user left off
        let nextLessonUrl = `/courses/${course.id}`;
        
        // Find the first incomplete lesson
        for (const topic of course.topics) {
          if (topic.is_locked) continue;
          
          const incompleteLesson = topic.lessons.find(lesson => !lesson.is_completed);
          if (incompleteLesson) {
            nextLessonUrl = `/courses/${course.id}/topics/${topic.id}/lessons/${incompleteLesson.id}`;
            break;
          }
        }
        
        return (
          <Col key={course.id} xs={24} sm={12} lg={limit ? 8 : 8} xl={limit ? 8 : 6}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Badge.Ribbon 
                text={course.is_locked ? "Locked" : `${progressPercentage}% Complete`}
                color={course.is_locked ? "default" : (progressPercentage === 100 ? "green" : "blue")}
              >
                <Card 
                  className={`h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow ${course.is_locked ? 'opacity-75' : ''}`}
                  cover={
                    <div className="relative h-40 bg-gray-200">
                      <img 
                        src={course.image_url || `/course-${course.id}.png`} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = '/default-course.png'; // Fallback image
                        }}
                      />
                      {course.is_locked && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <LockOutlined className="text-4xl text-white" />
                        </div>
                      )}
                      {progressPercentage === 100 && (
                        <div className="absolute top-2 right-2">
                          <CheckCircleOutlined className="text-2xl text-green-500" />
                        </div>
                      )}
                      {!course.is_locked && progressPercentage > 0 && progressPercentage < 100 && (
                        <Badge 
                          count={<FireOutlined style={{ color: '#FF4D4F' }} />}
                          className="absolute top-2 right-2"
                        />
                      )}
                    </div>
                  }
                  actions={course.is_locked ? [] : [
                    <div className="flex justify-between items-center px-4">
                      <div className="flex items-center text-xs">
                        <ClockCircleOutlined className="mr-1" />
                        <span>{course.topics.length} topics</span>
                      </div>
                      {course.is_locked ? (
                        <Tooltip title="Complete previous course to unlock">
                          <Button disabled size="small" icon={<LockOutlined />} className="cursor-not-allowed">
                            Locked
                          </Button>
                        </Tooltip>
                      ) : (
                        <Link to={nextLessonUrl}>
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
                        to={course.is_locked ? "#" : `/courses/${course.id}`}
                        className={`text-lg ${course.is_locked ? 'cursor-not-allowed text-gray-500' : 'text-primary'}`}
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
                          {!course.is_locked && (
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
                          className={course.is_locked ? 'opacity-50' : ''}
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