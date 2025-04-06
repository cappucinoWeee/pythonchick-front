// src/components/lessons/QuizLesson.js
import React, { useState } from 'react';
import { Card, Radio, Button, Progress, Alert, Space, Typography, Divider, Row, Col, Badge } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  ArrowRightOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

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
  const [showCelebration, setShowCelebration] = useState(false);
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
      setShowCelebration(true);
      
      // Hide celebration after a few seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
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
    <div className="quiz-lesson">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={18}>
          {!isQuizCompleted ? (
            <Card className="shadow-md border-0">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    count={`Question ${currentQuestion + 1} of ${sampleQuiz.questions.length}`} 
                    style={{ backgroundColor: '#722ED1' }}
                  />
                  <Text className="text-sm font-medium">
                    {Math.round(((currentQuestion + 1) / sampleQuiz.questions.length) * 100)}% Complete
                  </Text>
                </div>
                <Progress 
                  percent={((currentQuestion + 1) / sampleQuiz.questions.length) * 100} 
                  showInfo={false}
                  strokeColor="#722ED1"
                  size="small"
                />
              </div>
              
              <div className="p-6 bg-purple-50 border border-purple-100 rounded-lg mb-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <QuestionCircleOutlined className="text-purple-500" />
                  </div>
                  <div>
                    <Title level={4} className="mb-1">{getCurrentQuestion().question}</Title>
                    <Text type="secondary">Select the best answer</Text>
                  </div>
                </div>
              </div>
              
              <Radio.Group
                className="w-full"
                onChange={handleAnswerSelect}
                value={selectedAnswers[currentQuestion]}
                disabled={isAnswerSubmitted}
              >
                <Space direction="vertical" className="w-full">
                  {getCurrentQuestion().options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={!isAnswerSubmitted ? { scale: 1.01 } : {}}
                    >
                      <Radio 
                        value={index}
                        className={`
                          p-4 border rounded-lg w-full flex items-start
                          ${isAnswerSubmitted ? (
                            index === getCurrentQuestion().correctAnswer 
                              ? 'bg-green-50 border-green-300' 
                              : selectedAnswers[currentQuestion] === index 
                                ? 'bg-red-50 border-red-300' 
                                : 'opacity-60'
                          ) : 'hover:border-purple-300 cursor-pointer'}
                        `}
                      >
                        <div className="flex items-center">
                          <Text className={`
                            ${isAnswerSubmitted && index === getCurrentQuestion().correctAnswer ? 'text-green-600' : 
                            isAnswerSubmitted && selectedAnswers[currentQuestion] === index ? 'text-red-600' : ''}
                          `}>
                            {option}
                          </Text>
                          
                          {isAnswerSubmitted && index === getCurrentQuestion().correctAnswer && (
                            <CheckCircleOutlined className="text-green-500 ml-2" />
                          )}
                          
                          {isAnswerSubmitted && selectedAnswers[currentQuestion] === index && 
                            index !== getCurrentQuestion().correctAnswer && (
                            <CloseCircleOutlined className="text-red-500 ml-2" />
                          )}
                        </div>
                      </Radio>
                    </motion.div>
                  ))}
                </Space>
              </Radio.Group>
              
              {isAnswerSubmitted && (
                <Alert
                  className="mt-6"
                  message={isCurrentAnswerCorrect() ? "Correct!" : "Incorrect"}
                  description={
                    <div>
                      <Paragraph className="mb-1">{getCurrentQuestion().explanation}</Paragraph>
                      {!isCurrentAnswerCorrect() && (
                        <Text type="secondary">
                          The correct answer is: {getCurrentQuestion().options[getCurrentQuestion().correctAnswer]}
                        </Text>
                      )}
                    </div>
                  }
                  type={isCurrentAnswerCorrect() ? "success" : "error"}
                  showIcon
                />
              )}
              
              <div className="mt-6 flex justify-end">
                {!isAnswerSubmitted ? (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="primary" 
                      onClick={handleAnswerSubmit}
                      disabled={selectedAnswers[currentQuestion] === null}
                      size="large"
                      className="bg-primary hover:bg-primary-dark" // Ensure proper styling
                      style={{ backgroundColor: '#722ED1', borderColor: '#722ED1' }} // Explicit color override for quiz
                    >
                      Submit Answer
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="primary" 
                      icon={<ArrowRightOutlined />}
                      onClick={handleNextQuestion}
                      size="large"
                      className="bg-primary hover:bg-primary-dark" // Ensure proper styling
                      style={{ backgroundColor: '#722ED1', borderColor: '#722ED1' }} // Explicit color override for quiz
                    >
                      {currentQuestion < sampleQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </motion.div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="shadow-md border-0 text-center py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                  <TrophyOutlined className="text-4xl text-purple-500" />
                </div>
                
                <div className="relative inline-block mb-4">
                  <div className="text-6xl font-bold text-purple-600 relative z-10">{getScore()}%</div>
                  <div className="absolute inset-0 bg-purple-50 rounded-full transform scale-150 z-0"></div>
                </div>
                
                <Title level={2} className="mb-4">Quiz Completed!</Title>
                
                {getScore() >= 70 ? (
                  <Alert
                    message="Congratulations!"
                    description={`Great job! You passed the quiz with a score of ${getScore()}%. You've earned 20 XP!`}
                    type="success"
                    showIcon
                    className="mb-6 max-w-md mx-auto"
                  />
                ) : (
                  <Alert
                    message="Keep Learning"
                    description={`You scored ${getScore()}%. Review the material and try again to improve your score!`}
                    type="info"
                    showIcon
                    className="mb-6 max-w-md mx-auto"
                  />
                )}
                
                <div className="mt-8">
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<ArrowRightOutlined />}
                    onClick={onNextLesson}
                    className="bg-primary hover:bg-primary-dark" // Ensure proper styling
                    style={{ backgroundColor: '#722ED1', borderColor: '#722ED1' }} // Explicit color override for quiz
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            </Card>
          )}
        </Col>
        
        <Col xs={24} lg={6}>
          <Card className="shadow-md border-0 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <QuestionCircleOutlined className="text-2xl text-purple-500" />
              </div>
              <Title level={5}>Quiz Progress</Title>
              
              <div className="mt-4">
                <Progress 
                  type="circle" 
                  percent={((currentQuestion + (isAnswerSubmitted ? 1 : 0)) / sampleQuiz.questions.length) * 100} 
                  width={80}
                  strokeColor="#722ED1"
                />
                <Text className="block mt-2">
                  {isQuizCompleted 
                    ? "Quiz completed" 
                    : `${currentQuestion + 1} of ${sampleQuiz.questions.length} questions`
                  }
                </Text>
              </div>
            </div>
          </Card>
          
          <Card className="shadow-md border-0">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <TrophyOutlined className="text-2xl text-yellow-500" />
              </div>
              <Title level={5}>Rewards</Title>
              
              {isQuizCompleted ? (
                <div className="mt-4">
                  <Badge count="+20 XP" style={{ backgroundColor: '#52C41A' }} className="mb-2" />
                  <Text className="block">
                    Quiz completed! Great job!
                  </Text>
                </div>
              ) : (
                <div className="mt-4">
                  <Badge count="+20 XP" style={{ backgroundColor: '#D9D9D9' }} className="mb-2" />
                  <Text type="secondary">
                    Complete the quiz to earn XP points
                  </Text>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Success celebration */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="confetti-container">
            {/* Simple confetti animation */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-200 pointer-events-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <StarOutlined className="text-2xl text-purple-500" />
              </div>
              <Title level={4} className="text-purple-600">Quiz Completed!</Title>
              <Paragraph>
                You've completed this quiz with a score of {getScore()}% and earned 20 XP!
              </Paragraph>
              <Button 
                type="primary" 
                size="large"
                onClick={() => setShowCelebration(false)}
                className="bg-primary hover:bg-primary-dark mt-2" // Ensure proper styling
                style={{ backgroundColor: '#722ED1', borderColor: '#722ED1' }} // Explicit color override for quiz
              >
                Continue Learning
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add CSS for confetti animation */}
      <style jsx>{`
        .confetti-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          opacity: 0;
          transform: translateY(0) rotate(0);
          animation: confetti-fall linear forwards;
        }
        
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(-100vh) rotate(0);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
};

export default QuizLesson;