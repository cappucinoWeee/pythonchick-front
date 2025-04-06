// src/pages/LessonPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Modal } from 'antd';
import { 
  HomeOutlined, 
  BookOutlined, 
  ReadOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import LessonHeader from '../components/lessons/LessonHeader';
import ContentLesson from '../components/lessons/ContentLesson';
import CodingLesson from '../components/lessons/CodingLesson';
import QuizLesson from '../components/lessons/QuizLesson';
import { useAppContext } from '../context/AppContext';

const LessonPage = () => {
  const { courseId, topicId, lessonId } = useParams();
  const { courses } = useAppContext();
  const navigate = useNavigate();
  
  const [showExitModal, setShowExitModal] = useState(false);
  
  // Parse IDs as integers
  const courseIdInt = parseInt(courseId);
  const topicIdInt = parseInt(topicId);
  const lessonIdInt = parseInt(lessonId);
  
  // Find course, topic, and lesson
  const course = courses.find(c => c.id === courseIdInt);
  if (!course) {
    return <Navigate to="/courses" replace />;
  }
  
  const topic = course.topics.find(t => t.id === topicIdInt);
  if (!topic) {
    return <Navigate to={`/courses/${courseIdInt}`} replace />;
  }
  
  const lessonIndex = topic.lessons.findIndex(l => l.id === lessonIdInt);
  if (lessonIndex === -1) {
    return <Navigate to={`/courses/${courseIdInt}/topics/${topicIdInt}`} replace />;
  }
  
  const lesson = topic.lessons[lessonIndex];
  
  // Check if lesson is locked
  const isLocked = () => {
    // First lesson is always accessible
    if (lessonIndex === 0) return false;
    
    // Otherwise, check if previous lesson is completed
    return !topic.lessons[lessonIndex - 1].completed;
  };
  
  // Navigate to the next or previous lesson
  const goToNextLesson = () => {
    if (lessonIndex < topic.lessons.length - 1) {
      // Navigate to next lesson in same topic
      navigate(`/courses/${courseIdInt}/topics/${topicIdInt}/lessons/${topic.lessons[lessonIndex + 1].id}`);
    } else {
      // Check if there are more topics in this course
      const topicIndex = course.topics.findIndex(t => t.id === topicIdInt);
      if (topicIndex < course.topics.length - 1) {
        // Navigate to first lesson of next topic
        const nextTopic = course.topics[topicIndex + 1];
        if (!nextTopic.locked && nextTopic.lessons.length > 0) {
          navigate(`/courses/${courseIdInt}/topics/${nextTopic.id}/lessons/${nextTopic.lessons[0].id}`);
        } else {
          // Next topic is locked or has no lessons, go back to topic page
          navigate(`/courses/${courseIdInt}/topics/${topicIdInt}`);
        }
      } else {
        // Last topic of the course, go back to course page
        navigate(`/courses/${courseIdInt}`);
      }
    }
  };
  
  const goToPreviousLesson = () => {
    if (lessonIndex > 0) {
      // Navigate to previous lesson in same topic
      navigate(`/courses/${courseIdInt}/topics/${topicIdInt}/lessons/${topic.lessons[lessonIndex - 1].id}`);
    } else {
      // Go back to topic page
      navigate(`/courses/${courseIdInt}/topics/${topicIdInt}`);
    }
  };
  
  // Handle exit to topic page
  const handleExitLesson = () => {
    if (!lesson.completed) {
      setShowExitModal(true);
    } else {
      navigate(`/courses/${courseIdInt}/topics/${topicIdInt}`);
    }
  };
  
  const confirmExit = () => {
    setShowExitModal(false);
    navigate(`/courses/${courseIdInt}/topics/${topicIdInt}`);
  };
  
  const cancelExit = () => {
    setShowExitModal(false);
  };
  
  // Render the appropriate lesson component based on type
  const renderLessonContent = () => {
    if (isLocked()) {
      return (
        <div className="text-center my-12">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-8 max-w-lg mx-auto">
            <QuestionCircleOutlined className="text-4xl text-yellow-500 mb-4" />
            <h2 className="text-xl font-medium text-yellow-800 mb-2">
              Lesson Locked
            </h2>
            <p className="text-yellow-700 mb-4">
              You need to complete previous lessons before you can access this one.
            </p>
            <Button type="primary" onClick={goToPreviousLesson}>
              Go to Previous Lesson
            </Button>
          </div>
        </div>
      );
    }
    
    switch (lesson.type) {
      case 'quiz':
        return <QuizLesson course={course} topic={topic} lesson={lesson} onComplete={goToNextLesson} onNextLesson={goToNextLesson} />;
      case 'coding':
        return <CodingLesson course={course} topic={topic} lesson={lesson} onComplete={goToNextLesson} onNextLesson={goToNextLesson} />;
      case 'lesson':
      default:
        return <ContentLesson course={course} topic={topic} lesson={lesson} onComplete={goToNextLesson} onNextLesson={goToNextLesson} />;
    }
  };
  
  return (
    <div className="lesson-page">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/courses">
            <BookOutlined /> Courses
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/courses/${courseIdInt}`}>
            <ReadOutlined /> {course.title}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/courses/${courseIdInt}/topics/${topicIdInt}`}>
            <OrderedListOutlined /> {topic.title}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FileTextOutlined /> {lesson.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <LessonHeader 
        course={course} 
        topic={topic} 
        lesson={lesson} 
        lessonIndex={lessonIndex}
        topicLessonsCount={topic.lessons.length}
      />
      
      <div className="flex justify-between mb-4">
        <Button 
          icon={<LeftOutlined />} 
          onClick={goToPreviousLesson}
        >
          Previous
        </Button>
        
        <Button type="link" onClick={handleExitLesson}>
          Exit to Topic
        </Button>
        
        {lessonIndex < topic.lessons.length - 1 && (
          <Button 
            type="default" 
            onClick={goToNextLesson}
            disabled={!lesson.completed}
          >
            Next <RightOutlined />
          </Button>
        )}
      </div>
      
      {renderLessonContent()}
      
      <Modal
        title="Exit Lesson"
        open={showExitModal}
        onOk={confirmExit}
        onCancel={cancelExit}
        okText="Yes, Exit"
        cancelText="Continue Lesson"
      >
        <p>You haven't completed this lesson yet. Are you sure you want to exit? Your progress won't be saved.</p>
      </Modal>
    </div>
  );
};

export default LessonPage;
