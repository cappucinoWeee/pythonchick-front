// src/components/lessons/CodingLesson.js - Update this file
import React, { useState } from 'react';
import { Card, Button, Alert, Space, Typography, Tooltip, Row, Col, Badge } from 'antd';
import { 
  CheckOutlined, 
  ArrowRightOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  QuestionOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import CodeCompiler from '../compiler/CodeCompiler';

const { Title, Text, Paragraph } = Typography;

// Sample coding lesson data
const sampleCodingLesson = {
  instructions: `
    # Your First Python Program
    
    Let's write a simple Python program that prints a greeting.
    
    ## Task:
    
    1. Create a variable called \`name\` and assign your name to it
    2. Use the \`print()\` function to output: "Hello, [your name]!"
    
    ## Example:
    
    \`\`\`python
    name = "Alex"
    print("Hello, " + name + "!")
    \`\`\`
    
    Output:
    \`\`\`
    Hello, Alex!
    \`\`\`
  `,
  initialCode: `# Type your code here
name = ""
# Print your greeting
`,
  solution: `name = "Pythonchick"
print("Hello, " + name + "!")`,
  expectedOutput: "Hello, Pythonchick!",
  hints: [
    "Make sure to put your name in quotes as it's a string",
    "You can combine strings using the + operator",
    "Don't forget the exclamation mark at the end"
  ]
};

const CodingLesson = ({ course, topic, lesson, onComplete, onNextLesson }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const { completeLesson } = useAppContext();
  
  const getNextHint = () => {
    if (currentHint < sampleCodingLesson.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    } else {
      setCurrentHint(0);
    }
    setShowHint(true);
  };
  
  const handleSuccess = (code) => {
    setIsCorrect(true);
    setIsSubmitted(true);
    completeLesson(course.id, topic.id, lesson.id);
  };
  
  const handleMarkAsCompleted = () => {
    completeLesson(course.id, topic.id, lesson.id);
    setIsCorrect(true);
    setIsSubmitted(true);
  };
  
  const handleNextLesson = () => {
    onNextLesson && onNextLesson();
  };
  
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
              <ReactMarkdown>{sampleCodingLesson.instructions}</ReactMarkdown>
            </div>
            
            {showHint && (
              <Alert
                message="Hint"
                description={sampleCodingLesson.hints[currentHint]}
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
            
            {!showHint && (
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
            initialCode={sampleCodingLesson.initialCode}
            expectedOutput={sampleCodingLesson.expectedOutput}
            onSuccess={handleSuccess}
          />
        </Col>
      </Row>
      
      {isSubmitted && (
        <Card className="mt-6 shadow-md border-0">
          {isCorrect ? (
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
          ) : (
            <div className="flex items-start">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <QuestionOutlined className="text-2xl text-red-500" />
              </div>
              <div>
                <Title level={4} className="text-red-600 mb-1">Not quite right</Title>
                <Text className="text-gray-600 block mb-2">
                  Your code doesn't produce the expected output. Check the hints and try again!
                </Text>
                <Space>
                  <Button 
                    type="primary" 
                    onClick={() => setShowHint(true)}
                    icon={<BulbOutlined />}
                  >
                    Show Hint
                  </Button>
                  <Button 
                    type="link"
                    onClick={handleMarkAsCompleted}
                  >
                    Skip & Mark Completed
                  </Button>
                </Space>
              </div>
            </div>
          )}
        </Card>
      )}
      
      {isCorrect && (
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
    </div>
  );
};

export default CodingLesson;