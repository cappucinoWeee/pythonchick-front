// src/components/lessons/CodingLesson.js
import React, { useState } from 'react';
import { Card, Button, Alert, Tabs, Space, message, Typography, Tooltip, Row, Col, Badge, Divider } from 'antd';
import { 
  PlayCircleOutlined, 
  CheckOutlined, 
  ArrowRightOutlined,
  ReloadOutlined,
  CodeOutlined,
  FileTextOutlined,
  BulbOutlined,
  QuestionOutlined,
  SaveOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const { TabPane } = Tabs;
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
  const [code, setCode] = useState(sampleCodingLesson.initialCode);
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('instructions');
  const [currentHint, setCurrentHint] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const { completeLesson } = useAppContext();
  
  const runCode = () => {
    // In a real app, this would send the code to a backend for execution
    // For this demo, we'll simulate running the code
    
    try {
      // Simple simulation of Python's behavior
      let result = '';
      let simName = '';
      
      // Extremely simplified parsing to simulate code execution
      const lines = code.split('\n');
      for (const line of lines) {
        if (line.trim().startsWith('name =')) {
          const match = line.match(/name\s*=\s*['"](.*)['"]/);
          if (match && match[1]) {
            simName = match[1];
          }
        } else if (line.includes('print') && line.includes('Hello')) {
          result = `Hello, ${simName || 'World'}!`;
        }
      }
      
      setOutput(result || 'No output');
      const success = result.includes('Hello,') && simName;
      setIsCorrect(success);
      
      if (success) {
        message.success('Your code works correctly!');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsCorrect(false);
    }
  };
  
  const resetCode = () => {
    setCode(sampleCodingLesson.initialCode);
    setOutput('');
    setIsCorrect(false);
    setIsSubmitted(false);
  };
  
  const showSolution = () => {
    setCode(sampleCodingLesson.solution);
    setOutput(sampleCodingLesson.expectedOutput);
    setIsCorrect(true);
  };
  
  const handleSubmit = () => {
    runCode();
    setIsSubmitted(true);
    
    if (isCorrect) {
      completeLesson(course.id, topic.id, lesson.id);
      message.success('Lesson completed! You earned 15 XP!');
    }
  };
  
  const handleMarkAsCompleted = () => {
    completeLesson(course.id, topic.id, lesson.id);
    message.success('Lesson marked as completed! You earned 15 XP!');
  };
  
  const handleNextLesson = () => {
    onNextLesson && onNextLesson();
  };
  
  const getNextHint = () => {
    if (currentHint < sampleCodingLesson.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    } else {
      setCurrentHint(0);
    }
    setShowHint(true);
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
          <Card 
            className="shadow-md border-0 h-full flex flex-col" 
            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            title={
              <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                size="small"
                tabBarStyle={{ marginBottom: 0 }}
              >
                <TabPane 
                  tab={
                    <span>
                      <CodeOutlined /> Code
                    </span>
                  } 
                  key="code"
                />
                <TabPane 
                  tab={
                    <span>
                      <PlayCircleOutlined /> Output
                    </span>
                  } 
                  key="output"
                />
              </Tabs>
            }
            extra={
              <Space>
                <Tooltip title="Reset Code">
                  <Button 
                    icon={<ReloadOutlined />} 
                    onClick={resetCode}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title="Show Solution">
                  <Button 
                    icon={<InfoCircleOutlined />}
                    onClick={showSolution}
                    size="small"
                  />
                </Tooltip>
              </Space>
            }
          >
            {activeTab === 'code' ? (
              <div className="flex-grow flex flex-col">
                <div className="bg-gray-100 px-3 py-1 rounded-t-lg border-b flex justify-between items-center">
                  <Badge color="blue" text="Python" />
                  {isCorrect && <Badge color="green" text="Code Correct" />}
                </div>
                <div className="flex-grow p-0 bg-white">
                  <textarea
                    className="w-full h-full font-mono p-4 border-0 focus:outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{ resize: 'none', minHeight: '300px' }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex-grow">
                <div className="p-4 bg-gray-50 rounded-lg h-full min-h-[300px] font-mono">
                  {output ? (
                    <>
                      <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded-t-lg mb-2">
                        Output:
                      </div>
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Run your code to see the output here.
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-4 flex justify-between">
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />} 
                onClick={runCode}
              >
                Run Code
              </Button>
              
              <Space>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitted && !isCorrect}
                >
                  Submit
                </Button>
                
                {isCorrect && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      type="primary" 
                      icon={<ArrowRightOutlined />}
                      onClick={handleNextLesson}
                    >
                      Next Lesson
                    </Button>
                  </motion.div>
                )}
              </Space>
            </div>
          </Card>
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
    </div>
  );
};

export default CodingLesson;