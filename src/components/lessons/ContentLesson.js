// src/components/lessons/ContentLesson.js
import React, { useState } from 'react';
import { Card, Button, Alert, Divider } from 'antd';
import { CheckOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

// Sample lesson content - would come from API in real app
const sampleContent = `
# What is Python?

Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.

## Key Features of Python

- **Easy to Learn**: Python has a simple, easy-to-learn syntax that emphasizes readability, reducing the cost of program maintenance.
- **Easy to Read**: Python code is more clearly defined and visible to the eyes.
- **Easy to Maintain**: Python's source code is fairly easy to maintain.
- **Broad Standard Library**: Python's bulk of the library is very portable and cross-platform compatible on UNIX, Windows, and macOS.
- **Interactive Mode**: Python has support for an interactive mode which allows interactive testing and debugging of snippets of code.
- **Portable**: Python can run on a wide variety of hardware platforms and has the same interface on all platforms.
- **Extendable**: You can add low-level modules to the Python interpreter. These modules enable programmers to add to or customize their tools to be more efficient.
- **Databases**: Python provides interfaces to all major commercial databases.
- **GUI Programming**: Python supports GUI applications that can be created and ported to many system calls, libraries, and windows systems.
- **Scalable**: Python provides a better structure and support for large programs than shell scripting.

## A Simple Example

Here's a simple "Hello, World!" program in Python:

\`\`\`python
print("Hello, World!")
\`\`\`

When you run this program, it outputs:

\`\`\`
Hello, World!
\`\`\`

## Python Applications

Python is used in many areas, including:

- Web Development
- Data Science
- Machine Learning
- Artificial Intelligence
- Scientific Computing
- Game Development
- Desktop Applications
`;

const ContentLesson = ({ course, topic, lesson, onComplete, onNextLesson }) => {
  const [isReading, setIsReading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(lesson.completed);
  const { completeLesson } = useAppContext();
  
  const handleMarkAsCompleted = () => {
    completeLesson(course.id, topic.id, lesson.id);
    setIsCompleted(true);
    onComplete && onComplete();
  };
  
  const handleNextLesson = () => {
    onNextLesson && onNextLesson();
  };
  
  return (
    <Card className="shadow-card">
      <div className="lesson-content prose max-w-none">
        <ReactMarkdown>{sampleContent}</ReactMarkdown>
        
        <Divider />
        
        <div className="mt-6 text-center">
          {!isCompleted ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
              <Button 
                type="primary" 
                size="large"
                icon={<CheckOutlined />}
                onClick={handleMarkAsCompleted}
              >
                Mark as Completed
              </Button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center">
              <Alert
                message="Lesson Completed!"
                description="Great job completing this lesson. You've earned 10 XP!"
                type="success"
                showIcon
                className="mb-4"
              />
              
              <Button 
                type="primary" 
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={handleNextLesson}
              >
                Next Lesson
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ContentLesson;