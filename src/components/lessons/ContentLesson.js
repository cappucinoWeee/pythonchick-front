// src/components/lessons/ContentLesson.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Divider, Spin, Typography } from 'antd';
import { CheckOutlined, ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const ContentLesson = ({ course, topic, lesson, onComplete, onNextLesson }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(lesson.is_completed || false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update completion status when lesson prop changes
    setIsCompleted(lesson.is_completed || false);

    // Process the lesson content
    if (lesson.content) {
      // If content is an array of objects (from the API)
      if (Array.isArray(lesson.content)) {
        const markdownContent = lesson.content
          .map((item) => {
            return `## ${item.title}\n\n${item.description}\n\n${item.image ? `![${item.title}](${item.image})` : ''}`;
          })
          .join('\n\n---\n\n');

        setContent(markdownContent);
      } else {
        // If content is already markdown or plain text
        setContent(lesson.content);
      }
    } else {
      // Sample content if none is provided
      setContent(`
# ${lesson.title}

This is a placeholder content for this lesson. In a real application, this would be replaced with the actual lesson content from the database.

## Introduction

Welcome to this lesson! Here you'll learn important concepts about Python programming.

## Key Concepts

- Python is a high-level programming language
- It's known for its readability and simplicity
- Python supports multiple programming paradigms

## Example Code

\`\`\`python
# This is a simple Python program
print("Hello, World!")
\`\`\`

## Practice

Try writing your own Python code to print a message.
      `);
    }

    setLoading(false);
  }, [lesson]);

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
    <Card className="shadow-card">
      <div className="lesson-content prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>

        <Divider />

        <div className="mt-6 text-center">
          {!isCompleted ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
            >
              <Button
                type="primary"
                size="large"
                icon={<CheckOutlined />}
                onClick={handleMarkAsCompleted}
                loading={isCompleting}
              >
                Mark as Completed
              </Button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center">
              <Alert
                message="Lesson Completed!"
                description="Great job completing this lesson. You've earned XP!"
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
