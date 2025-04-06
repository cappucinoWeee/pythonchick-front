// src/components/lessons/CodingLesson.js
import React, { useState } from 'react';
import { Card, Button, Alert, Tabs, Space, message } from 'antd';
import { 
  PlayCircleOutlined, 
  CheckOutlined, 
  ArrowRightOutlined,
  ReloadOutlined,
  CodeOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import ReactMarkdown from 'react-markdown';

const { TabPane } = Tabs;

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
};

const CodingLesson = ({ course, topic, lesson, onComplete, onNextLesson }) => {
  const [code, setCode] = useState(sampleCodingLesson.initialCode);
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('instructions');
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
  
  return (
    <Card className="shadow-card">
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="mb-4"
      >
        <TabPane 
          tab={
            <span>
              <CodeOutlined /> Instructions
            </span>
          } 
          key="instructions"
        >
          <div className="p-4 bg-gray-50 rounded-lg max-h-80 overflow-y-auto">
            <ReactMarkdown>{sampleCodingLesson.instructions}</ReactMarkdown>
          </div>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <PlayCircleOutlined /> Output
            </span>
          } 
          key="output"
        >
          <div className="p-4 bg-gray-50 rounded-lg h-80 font-mono">
            {output ? output : 'Run your code to see the output here.'}
          </div>
        </TabPane>
      </Tabs>
      
      <div className="border rounded-lg mb-4">
        <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b flex justify-between items-center">
          <span className="font-medium">Python Editor</span>
          <div>
            <Button 
              size="small" 
              icon={<ReloadOutlined />} 
              onClick={resetCode}
              className="mr-2"
            >
              Reset
            </Button>
            <Button 
              size="small" 
              onClick={showSolution}
            >
              Show Solution
            </Button>
          </div>
        </div>
        <div className="p-4 h-64 bg-white">
          <textarea
            className="w-full h-full font-mono p-2 border rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
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
            <Button 
              type="primary" 
              icon={<ArrowRightOutlined />}
              onClick={handleNextLesson}
            >
              Next Lesson
            </Button>
          )}
          
          {(!isCorrect && isSubmitted) && (
            <Button 
              type="link"
              onClick={handleMarkAsCompleted}
            >
              Skip & Mark Completed
            </Button>
          )}
        </Space>
      </div>
      
      {isSubmitted && (
        <div className="mt-4">
          {isCorrect ? (
            <Alert
              message="Correct!"
              description="Great job! Your solution works correctly."
              type="success"
              showIcon
            />
          ) : (
            <Alert
              message="Not quite right"
              description="Your code doesn't produce the expected output. Try again!"
              type="error"
              showIcon
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default CodingLesson;