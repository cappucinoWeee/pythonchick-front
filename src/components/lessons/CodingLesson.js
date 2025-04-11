// src/components/lessons/CodingLesson.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Space, Typography, Tooltip, Row, Col, Badge, Spin } from 'antd';
import { 
  CheckOutlined, 
  ArrowRightOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  QuestionOutlined,
  FileTextOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import CodeCompiler from '../compiler/CodeCompiler';

const { Title, Text, Paragraph } = Typography;

const CodingLesson = ({ course, topic, lesson, onComplete, onNextLesson }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(lesson.is_completed || false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initialCode, setInitialCode] = useState('# Type your code here\n');
  const [taskDescription, setTaskDescription] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [hints, setHints] = useState([]);
  
  useEffect(() => {
    // Update completion status when lesson prop changes
    setIsCompleted(lesson.is_completed || false);
    
    // Process the lesson data
    const processLessonData = async () => {
      setLoading(true);
      
      try {
        // Set task description if available
        if (lesson.task) {
          setTaskDescription(lesson.task);
        } else {
          setTaskDescription(`
# Coding Challenge: ${lesson.title}

Write Python code to solve the following challenge:

Write a simple "Hello, World!" program that prints a greeting message.
          `);
        }
        
        // Set expected output if available
        if (lesson.expected_output) {
          setExpectedOutput(lesson.expected_output);
        } else {
          setExpectedOutput("Hello, World!");
        }
        
        // Set initial code if available
        if (lesson.initial_code) {
          setInitialCode(lesson.initial_code);
        } else {
          setInitialCode('# Write your code here\n\n# Print a greeting message\n');
        }
        
        // Set hints if available
        if (lesson.hints && Array.isArray(lesson.hints)) {
          setHints(lesson.hints);
        } else {
          setHints([
            "Remember to use the print() function to display output",
            "Your output should match the expected output exactly",
            "Pay attention to spacing and punctuation"
          ]);
        }
      } catch (error) {
        console.error('Error processing lesson data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    processLessonData();
  }, [lesson]);
  
  const handleSuccess = async (code) => {
    setIsCompleting(true);
    try {
      // Call the onComplete function passed from parent
      await onComplete();
      setIsCompleted(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    } finally {
      setIsCompleting(false);
    }
  };
  
  const handleMarkAsCompleted = async () => {
    setIsCompleting(true);
    try {
      // Call the onComplete function passed from parent
      await onComplete();
      setIsCompleted(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    } finally {
      setIsCompleting(false);
    }
  };
  
  const handleNextLesson = () => {
    onNextLesson && onNextLesson();
  };
  
  const getNextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    } else {
      setCurrentHint(0);
    }
    setShowHint(true);
  };
  
  if (loading) {
    return (
      <Card className="shadow-card">
        <div className="flex justify-center py-8">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      </Card>
    );
  }
  
  return (
    <div className="coding-lesson">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            className="shadow-md border-0 h-full" 
            title={
              <div className="flex items-center">
                <FileTextOutlined className="text-blue-500 mr-2" />
                <span>Instructions</span>
              </div>
            }
          >
            <div className="p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
              <ReactMarkdown>{taskDescription}</ReactMarkdown>
            </div>
            
            {showHint && hints.length > 0 && (
              <Alert
                message="Hint"
                description={hints[currentHint]}
                type="info"
                showIcon
                icon={<BulbOutlined />}
                className="mt-4"
                action={
                  <Button size="small" onClick={() => getNextHint()}>
                    Next Hint
                  </Button>
                }
                closable
                onClose={() => setShowHint(false)}
              />
            )}
            
            {!showHint && hints.length > 0 && (
              <div className="mt-4 text-center">
                <Button 
                  type="dashed" 
                  icon={<BulbOutlined />} 
                  onClick={() => setShowHint(true)}
                >
                  Show Hint
                </Button>
              </div>
            )}
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <CodeCompiler 
            initialCode={initialCode}
            expectedOutput={expectedOutput}
            onSuccess={handleSuccess}
            readOnly={isCompleted}
          />
        </Col>
      </Row>
      
      {isCompleted && (
        <Card className="mt-6 shadow-md border-0">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckOutlined className="text-2xl text-green-500" />
            </div>
            <div>
              <Title level={4} className="text-green-600 mb-1">Great Job!</Title>
              <Text className="text-gray-600 block mb-2">
                Your solution works correctly. You've completed this coding exercise!
              </Text>
              <div className="flex items-center">
                <Badge count="+15 XP" style={{ backgroundColor: '#52c41a' }} className="mr-3" />
                <Text type="secondary">Keep going to earn more experience points!</Text>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {isCompleted && (
        <div className="mt-4 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              type="primary" 
              icon={<ArrowRightOutlined />}
              onClick={handleNextLesson}
              size="large"
            >
              Next Lesson
            </Button>
          </motion.div>
        </div>
      )}
      
      {!isCompleted && (
        <div className="mt-4 text-center">
          <Button 
            type="link" 
            onClick={handleMarkAsCompleted}
            loading={isCompleting}
          >
            Skip & Mark Completed
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodingLesson;