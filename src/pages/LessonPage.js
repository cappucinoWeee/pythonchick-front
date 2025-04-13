// src/pages/LessonPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Modal, Spin, Result, message } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  ReadOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
  QuestionCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import LessonHeader from '../components/lessons/LessonHeader';
import ContentLesson from '../components/lessons/ContentLesson';
import CodingLesson from '../components/lessons/CodingLesson';
import QuizLesson from '../components/lessons/QuizLesson';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';

const LessonPage = () => {
  const { courseId, topicId, lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessonIndex, setLessonIndex] = useState(-1);
  const [showExitModal, setShowExitModal] = useState(false);

  // Parse IDs as integers
  const courseIdInt = parseInt(courseId);
  const topicIdInt = parseInt(topicId);
  const lessonIdInt = parseInt(lessonId);

  // Fetch course, topic, and lesson data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch course details
        const courseData = await courseService.getCourseById(courseIdInt, user?.id);
        setCourse(courseData);

        // Find the topic
        const topicData = await courseService.getTopicById(topicIdInt, user?.id);
        setTopic(topicData);

        // Fetch lesson details
        const lessonData = await courseService.getLessonById(lessonIdInt, user?.id);
        setLesson(lessonData);

        // Find the lesson index in the topic
        if (topicData && topicData.lessons) {
          const index = topicData.lessons.findIndex((l) => l.id === lessonIdInt);
          setLessonIndex(index);
        }
      } catch (err) {
        console.error('Error fetching lesson data:', err);
        setError('Failed to load lesson. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseIdInt, topicIdInt, lessonIdInt, user]);

  // Check if lesson is locked
  const isLocked = () => {
    if (!topic || !topic.lessons || lessonIndex === -1) return true;

    // First lesson is always accessible
    if (lessonIndex === 0) return false;

    // Otherwise, check if previous lesson is completed
    return !topic.lessons[lessonIndex - 1].is_completed;
  };

  // Navigate to the next or previous lesson
  const goToNextLesson = () => {
    if (!topic || !topic.lessons || lessonIndex === -1) return;

    if (lessonIndex < topic.lessons.length - 1) {
      // Navigate to next lesson in same topic
      navigate(
        `/courses/${courseIdInt}/topics/${topicIdInt}/lessons/${topic.lessons[lessonIndex + 1].id}`,
      );
    } else {
      // Check if there are more topics in this course
      const topics = course?.topics || [];
      const topicIndex = topics.findIndex((t) => t.id === topicIdInt);
      if (topicIndex !== -1 && topicIndex < topics.length - 1) {
        // Navigate to first lesson of next topic
        const nextTopic = topics[topicIndex + 1];
        if (!nextTopic.is_locked && nextTopic.lessons && nextTopic.lessons.length > 0) {
          navigate(
            `/courses/${courseIdInt}/topics/${nextTopic.id}/lessons/${nextTopic.lessons[0].id}`,
          );
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
    if (!topic || !topic.lessons || lessonIndex === -1) return;

    if (lessonIndex > 0) {
      // Navigate to previous lesson in same topic
      navigate(
        `/courses/${courseIdInt}/topics/${topicIdInt}/lessons/${topic.lessons[lessonIndex - 1].id}`,
      );
    } else {
      // Go back to topic page
      navigate(`/courses/${courseIdInt}/topics/${topicIdInt}`);
    }
  };

  // Handle exit to topic page
  const handleExitLesson = () => {
    if (lesson && !lesson.is_completed) {
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

  // Handle lesson completion
  const handleLessonComplete = async (score = null) => {
    try {
      const result = await courseService.completeLesson(lessonIdInt, score);

      // Update the lesson state to reflect completion
      setLesson((prev) => ({
        ...prev,
        is_completed: true,
      }));

      message.success(`Lesson completed! You earned ${result.xp_earned} XP`);

      // Return the result for any component that needs it
      return result;
    } catch (err) {
      console.error('Error completing lesson:', err);
      message.error('Failed to mark lesson as complete. Please try again.');
      return null;
    }
  };

  // Render error state
  if (error) {
    return (
      <Result
        status="error"
        title="Failed to load lesson"
        subTitle={error}
        extra={[
          <Button
            key="back"
            onClick={() => navigate(`/courses/${courseIdInt}/topics/${topicIdInt}`)}
          >
            Return to Topic
          </Button>,
        ]}
      />
    );
  }

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
          tip="Loading lesson..."
        />
      </div>
    );
  }

  // Redirect if data not found
  if (!course || !topic || !lesson) {
    return <Navigate to="/courses" replace />;
  }

  // Render the appropriate lesson component based on type
  const renderLessonContent = () => {
    if (isLocked()) {
      return (
        <div className="text-center my-12">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-8 max-w-lg mx-auto">
            <QuestionCircleOutlined className="text-4xl text-yellow-500 mb-4" />
            <h2 className="text-xl font-medium text-yellow-800 mb-2">Lesson Locked</h2>
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
        return (
          <QuizLesson
            course={course}
            topic={topic}
            lesson={lesson}
            onComplete={handleLessonComplete}
            onNextLesson={goToNextLesson}
          />
        );
      case 'coding':
        return (
          <CodingLesson
            course={course}
            topic={topic}
            lesson={lesson}
            onComplete={handleLessonComplete}
            onNextLesson={goToNextLesson}
          />
        );
      case 'lesson':
      default:
        return (
          <ContentLesson
            course={course}
            topic={topic}
            lesson={lesson}
            onComplete={handleLessonComplete}
            onNextLesson={goToNextLesson}
          />
        );
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
        <Button icon={<LeftOutlined />} onClick={goToPreviousLesson}>
          Previous
        </Button>

        <Button type="link" onClick={handleExitLesson}>
          Exit to Topic
        </Button>

        {lessonIndex < topic.lessons.length - 1 && (
          <Button type="default" onClick={goToNextLesson} disabled={!lesson.is_completed}>
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
        <p>
          You haven't completed this lesson yet. Are you sure you want to exit? Your progress won't
          be saved.
        </p>
      </Modal>
    </div>
  );
};

export default LessonPage;
