// src/components/lessons/QuizLesson.js
import React, { useState } from 'react';
import { Card, Radio, Button, Progress, Alert, Space } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

// Sample quiz data
const sampleQuiz = {
  title: "Python Basics Quiz",
  questions: [
    {
      id: 1,
      question: "What is Python?",
      options: [
        "A snake species",
        "A high-level programming language",
        "A low-level programming language",
        "An operating system"
      ],
      correctAnswer: 1,
      explanation: "Python is a high-level programming language that is interpreted, object-oriented, and has dynamic semantics."
    },
    {
      id: 2,
      question: "Which of the following is used to define a block of code in Python?",
      options: [
        "Curly braces {}",
        "Parentheses ()",
        "Indentation",
        "Square brackets []"
      ],
      correctAnswer: 2,
      explanation: "Python uses indentation to define blocks of code, unlike other programming languages that use curly braces or other symbols."
    },
    {
      id: 3,
      question: "What is the correct way to create a comment in Python?",
      options: [
        "/* This is a comment */",
        "// This is a comment",
        "# This is a comment",
        "<!-- This is a comment -->"
      ],
      correctAnswer: 2,
      explanation: "In Python, comments start with the # character and extend to the end of the line."
    },
    {
      id: 4,
      question: "What is the output of: print(2 ** 3)?",
      options: [
        "6",
        "8",
        "9",
        "5"
      ],
      correctAnswer: 1,
      explanation: "The ** operator in Python is used for exponentiation. So 2 ** 3 means 2 raised to the power of 3, which equals 8."
    },
    {
      id: 5,
      question: "Which of these data types is mutable in Python?",
      options: [
        "String",
        "Tuple",
        "List",
        "Integer"
      ],
      correctAnswer: 2,
      explanation: "Lists are mutable in Python, which means they can be changed after creation. Strings, tuples, and integers are immutable."
    }
  ]
};

const QuizLesson = ({ course, topic, lesson, onComplete, onNextLesson }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(sampleQuiz.questions.length).fill(null));
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const { completeLesson } = useAppContext();
  
  const handleAnswerSelect = (e) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = parseInt(e.target.value);
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleAnswerSubmit = () => {
    setIsAnswerSubmitted(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz completed
      setIsQuizCompleted(true);
      completeLesson(course.id, topic.id, lesson.id);
    }
  };
  
  const getCurrentQuestion = () => {
    return sampleQuiz.questions[currentQuestion];
  };
  
  const isCurrentAnswerCorrect = () => {
    return selectedAnswers[currentQuestion] === getCurrentQuestion().correctAnswer;
  };
  
  const getScore = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === sampleQuiz.questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / sampleQuiz.questions.length) * 100);
  };
  
  return (
    <Card className="shadow-card">
      {!isQuizCompleted ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {sampleQuiz.questions.length}
              </span>
              <span className="text-sm font-medium">
                {Math.round(((currentQuestion + 1) / sampleQuiz.questions.length) * 100)}% Complete
              </span>
            </div>
            <Progress 
              percent={((currentQuestion + 1) / sampleQuiz.questions.length) * 100} 
              showInfo={false}
              strokeColor="#1890FF"
            />
          </div>
          
          <div className="p-4 bg-white border rounded-lg">
            <h2 className="text-xl font-medium mb-4">{getCurrentQuestion().question}</h2>
            
            <Radio.Group
              className="w-full"
              onChange={handleAnswerSelect}
              value={selectedAnswers[currentQuestion]}
              disabled={isAnswerSubmitted}
            >
              <Space direction="vertical" className="w-full">
                {getCurrentQuestion().options.map((option, index) => (
                  <Radio 
                    key={index} 
                    value={index}
                    className={`
                      p-3 border rounded-lg w-full 
                      ${isAnswerSubmitted ? (
                        index === getCurrentQuestion().correctAnswer 
                          ? 'bg-green-50 border-green-300' 
                          : selectedAnswers[currentQuestion] === index 
                            ? 'bg-red-50 border-red-300' 
                            : ''
                      ) : 'hover:border-blue-300'}
                    `}
                  >
                    {option}
                    {isAnswerSubmitted && index === getCurrentQuestion().correctAnswer && (
                      <CheckCircleOutlined className="text-green-500 ml-2" />
                    )}
                    {isAnswerSubmitted && selectedAnswers[currentQuestion] === index && 
                      index !== getCurrentQuestion().correctAnswer && (
                      <CloseCircleOutlined className="text-red-500 ml-2" />
                    )}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
            
            {isAnswerSubmitted && (
              <Alert
                className="mt-4"
                message={isCurrentAnswerCorrect() ? "Correct!" : "Incorrect"}
                description={getCurrentQuestion().explanation}
                type={isCurrentAnswerCorrect() ? "success" : "error"}
                showIcon
              />
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            {!isAnswerSubmitted ? (
              <Button 
                type="primary" 
                onClick={handleAnswerSubmit}
                disabled={selectedAnswers[currentQuestion] === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                type="primary" 
                icon={<ArrowRightOutlined />}
                onClick={handleNextQuestion}
              >
                {currentQuestion < sampleQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl font-bold text-primary mb-4">{getScore()}%</div>
            <h2 className="text-2xl font-medium mb-4">Quiz Completed!</h2>
            
            {getScore() >= 70 ? (
              <Alert
                message="Congratulations!"
                description={`Great job! You passed the quiz with a score of ${getScore()}%. You've earned 20 XP!`}
                type="success"
                showIcon
                className="mb-6"
              />
            ) : (
              <Alert
                message="Keep Learning"
                description={`You scored ${getScore()}%. Review the material and try again to improve your score!`}
                type="info"
                showIcon
                className="mb-6"
              />
            )}
            
            <div className="flex justify-center mt-6">
              <Button 
                type="primary" 
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={onNextLesson}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </Card>
  );
};

export default QuizLesson;