// src/components/courses/TopicProgress.js
import React, { useState, useEffect } from 'react';
import { Card, Steps, Progress, Typography, Badge, Row, Col } from 'antd';
import { 
  BookOutlined, 
  CodeOutlined, 
  CheckSquareOutlined, 
  TrophyOutlined,
  CheckCircleFilled,
  LockOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import courseService from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const { Step } = Steps;
const { Title, Text } = Typography;

const TopicProgress = ({ topic, course }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const { user } = useAuth();
  
  // Fetch progress data from API when component mounts
  useEffect(() => {
    const fetchProgress = async () => {
      if (!topic || !topic.id || !user?.id) return;
      
      setLoading(true);
      try {
        // In a real implementation, you'd call an API endpoint
        // that returns progress specifically for this topic
        // Since our API doesn't have this exact endpoint, we'll use
        // the data already available in the topic prop
        
        // Calculate progress based on completed lessons
        const completedLessons = topic.lessons.filter(lesson => 
          lesson.is_completed || lesson.completed
        ).length;
        
        const totalLessons = topic.lessons.length;
        const progressPercent = Math.round((completedLessons / Math.max(totalLessons, 1)) * 100);
        
        setProgress({
          completedLessons,
          totalLessons,
          progressPercent
        });
      } catch (error) {
        console.error('Error fetching topic progress:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgress();
  }, [topic, user]);
  
  // If progress data is not yet loaded
  if (loading) {
    return (
      <Card className="shadow-md border-0">
        <div className="flex justify-center items-center py-8">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
          <span className="ml-2">Loading progress...</span>
        </div>
      </Card>
    );
  }
  
  // If there's no topic data or lessons
  if (!topic || !topic.lessons || !Array.isArray(topic.lessons)) {
    return (
      <Card className="shadow-md border-0">
        <div className="text-center py-8 text-gray-500">
          No lessons available for this topic.
        </div>
      </Card>
    );
  }
  
  // Calculate where the user is in the topic
  const completedLessons = topic.lessons.filter(lesson => 
    lesson.is_completed || lesson.completed
  ).length;
  
  const totalLessons = topic.lessons.length;
  const currentStep = completedLessons;
  const progressPercent = Math.round((completedLessons / Math.max(totalLessons, 1)) * 100);
  
  // Generate steps for the progress indicator
  const getLessonIcon = (lesson) => {
    if (lesson.type === 'quiz') return <CheckSquareOutlined />;
    if (lesson.type === 'coding') return <CodeOutlined />;
    return <BookOutlined />;
  };
  
  const getLessonStatus = (index) => {
    if (topic.lessons[index].is_completed || topic.lessons[index].completed) return 'finish';
    if (index === completedLessons) return 'process';
    if (index <= completedLessons + 1) return 'wait';
    return 'wait';
  };
  
  return (
    <Card 
      className="shadow-md border-0" 
      title={
        <div className="flex items-center justify-between">
          <span className="font-medium">Topic Progress</span>
          <Badge 
            count={`${completedLessons}/${totalLessons}`} 
            style={{ backgroundColor: completedLessons === totalLessons ? '#52c41a' : '#1890ff' }} 
          />
        </div>
      }
      loading={loading}
    >
      <div className="mb-4">
        <Progress 
          percent={progressPercent}
          strokeColor={completedLessons === totalLessons ? "#52C41A" : "#1890FF"}
          size="small"
        />
      </div>
      
      <div className="rounded-lg border border-gray-200 p-4 bg-gray-50 mb-4">
        {completedLessons === totalLessons ? (
          <div className="flex items-center text-green-600">
            <CheckCircleFilled className="text-green-500 mr-2" />
            <Text strong className="text-green-600">
              Topic completed! Great job!
            </Text>
          </div>
        ) : (
          <div className="flex items-center text-blue-600">
            <BookOutlined className="text-blue-500 mr-2" />
            <Text strong className="text-blue-600">
              {totalLessons - completedLessons} lessons remaining
            </Text>
          </div>
        )}
      </div>
      
      <div className="lesson-path-visual">
        <Row gutter={[8, 16]}>
          {topic.lessons.map((lesson, index) => {
            const isCompleted = lesson.is_completed || lesson.completed;
            const isCurrent = index === completedLessons;
            const isLocked = index > completedLessons + 1 && !isCompleted;
            
            return (
              <Col key={lesson.id} span={12}>
                <Link 
                  to={isLocked ? '#' : `/courses/${course?.id}/topics/${topic.id}/lessons/${lesson.id}`}
                  className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div 
                    className={`p-3 rounded-lg border flex items-center ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : isCurrent 
                          ? 'bg-blue-50 border-blue-200' 
                          : isLocked 
                            ? 'bg-gray-100 border-gray-200' 
                            : 'bg-white border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      isCompleted 
                        ? 'bg-green-100 text-green-500' 
                        : isCurrent 
                          ? 'bg-blue-100 text-blue-500' 
                          : isLocked 
                            ? 'bg-gray-200 text-gray-500' 
                            : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleFilled />
                      ) : isLocked ? (
                        <LockOutlined />
                      ) : (
                        getLessonIcon(lesson)
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <Text 
                        ellipsis 
                        className={`block text-sm ${
                          isCompleted 
                            ? 'text-green-600' 
                            : isCurrent 
                              ? 'text-blue-600 font-medium' 
                              : isLocked 
                                ? 'text-gray-400' 
                                : 'text-gray-700'
                        }`}
                      >
                        {index + 1}. {lesson.title}
                      </Text>
                      <Text 
                        className={`text-xs ${
                          isLocked ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {lesson.type === 'quiz' ? 'Quiz' : lesson.type === 'coding' ? 'Coding' : 'Lesson'}
                      </Text>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
      
      {completedLessons === totalLessons && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 mx-auto mb-2">
              <TrophyOutlined className="text-lg" />
            </div>
            <Title level={5} className="mb-0">Topic Completed!</Title>
            <Text type="secondary">Great job completing all lessons</Text>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TopicProgress;