import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, Progress, Space, message, Statistic } from 'antd';
import {
  HeartOutlined,
  TrophyOutlined,
  StarOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import gameService from '../services/gameService';

const { Title, Text, Paragraph } = Typography;

const GamePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [gameState, setGameState] = useState('character');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hint, setHint] = useState(false);
  const [xp, setXp] = useState(0);
  const [progress, setProgress] = useState(0);

  const gameId = 999; // Unique ID for this custom game

  const characters = [
    { id: 'mouse', name: 'Cool Mouse', image: '/characters/mouse.png' },
    { id: 'fox', name: 'Smart Fox', image: '/characters/fox.png' },
    { id: 'penguin', name: 'Coding Penguin', image: '/characters/penguin.png' },
    { id: 'rabbit', name: 'Clever Rabbit', image: '/characters/rabbit.png' },
  ];

  const environments = [
    { id: 'forest', name: 'Enchanted Forest', image: '/environments/forest.png' },
    { id: 'space', name: 'Outer Space', image: '/environments/space.png' },
    { id: 'underwater', name: 'Ocean World', image: '/environments/underwater.png' },
  ];

  const gameSteps = [
    {
      type: 'print',
      title: 'First Greeting',
      description: 'Write code to say hello to your friend!',
      challenge: `Your friend wants to greet you. Complete the code:`,
      codeTemplate: 'print("Hello, ',
      expectedCompletion: '")',
      expectedOutput: `Hello, ${selectedCharacter?.name || '[character]'}`,
      hint: 'Add your name in quotes and close with ")"',
      background: 'friend_greeting.png',
    },
    {
      type: 'variable',
      title: 'Creating Variables',
      description: 'Help create a variable for your character',
      challenge: "Create a variable called 'name' with your character's name:",
      codeTemplate: 'name = ',
      expectedCompletion: `"${selectedCharacter?.name || '[character]'}"`,
      expectedOutput: null,
      hint: 'Use quotes around the name string',
      background: 'creating_variables.png',
    },
    {
      type: 'selection',
      title: 'Choose the Right Path',
      description: 'Select the correct code to move forward',
      challenge: 'Which code will print "Let\'s start coding"?',
      options: [
        'print("Let\'s start coding")',
        "print(Let's start coding)",
        'Print("Let\'s start coding")',
        'print(\'Let\'s start coding")',
      ],
      correctAnswer: 0,
      hint: 'Look for matching quotes and correct capitalization',
      background: 'path_selection.png',
    },
    {
      type: 'math',
      title: 'Unlock the Gate',
      description: 'Solve the math puzzle to unlock the gate',
      challenge: 'The gate is locked! Calculate 5 * 3 + 2 to unlock it:',
      codeTemplate: 'result = ',
      expectedCompletion: '17',
      expectedOutput: null,
      hint: 'Remember the order of operations: multiplication before addition',
      background: 'locked_gate.png',
    },
    {
      type: 'fill',
      title: 'Complete the Loop',
      description: 'Complete the for loop to repeat 5 times',
      challenge: 'Complete the loop to count from 1 to 5:',
      codeTemplate: 'for i in range(',
      expectedCompletion: '6)',
      expectedOutput: null,
      hint: 'range() needs the ending number, which is one more than the last number you want',
      background: 'code_loop.png',
    },
    {
      type: 'selection',
      title: 'Find the Bug',
      description: 'Find and fix the bug in the code',
      challenge: 'Which of these has a bug?',
      options: [
        'name = "Python"',
        'age = 10',
        'print("I am " + age + " years old")',
        'print("My name is " + name)',
      ],
      correctAnswer: 2,
      hint: "In Python, you can't add a string and a number directly",
      background: 'bug_finding.png',
    },
    {
      type: 'print',
      title: 'Magic Spell',
      description: 'Cast a magic spell using Python!',
      challenge: 'Cast a spell by printing "Abracadabra"!',
      codeTemplate: '',
      expectedCompletion: 'print("Abracadabra")',
      expectedOutput: 'Abracadabra',
      hint: 'Use the print() function with quotes around the spell',
      background: 'magic_spell.png',
    },
    {
      type: 'match',
      title: 'Match the Pairs',
      description: 'Match the Python terms with their meanings',
      pairs: [
        { term: 'print()', meaning: 'Display output' },
        { term: 'input()', meaning: 'Get user input' },
        { term: 'variable', meaning: 'Store data' },
        { term: 'for loop', meaning: 'Repeat code' },
      ],
      background: 'matching_game.png',
    },
    {
      type: 'riddle',
      title: 'Coding Riddle',
      description: 'Solve the Python riddle',
      challenge:
        'I start with a P, help you see things, and am used in every Python program. What am I?',
      options: ['Python', 'Program', 'print()', 'Processor'],
      correctAnswer: 2,
      hint: 'This function shows output on the screen',
      background: 'riddle.png',
    },
    {
      type: 'quiz',
      title: 'Final Challenge',
      description: 'Answer the final question to complete your journey',
      challenge: 'What symbol is used for comments in Python?',
      options: ['//', '<!--', '#', '/*'],
      correctAnswer: 2,
      hint: 'It\'s a symbol also known as the "pound sign" or "hashtag"',
      background: 'final_challenge.png',
    },
  ];

  useEffect(() => {
    setProgress(Math.round((currentStep / gameSteps.length) * 100));
  }, [currentStep]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setGameState('environment');
  };

  const handleEnvironmentSelect = (environment) => {
    setSelectedEnvironment(environment);
    setGameState('game');
    // Initialize progress
    gameService.updateGameProgress(gameId, {
      is_started: true,
      is_completed: false,
      current_level: 0,
      score: 0,
      data: { character: selectedCharacter?.id, environment: environment.id },
    });
  };

  const handleCheckAnswer = async () => {
    const currentChallenge = gameSteps[currentStep];
    let isCorrect = false;

    if (
      currentChallenge.type === 'selection' ||
      currentChallenge.type === 'quiz' ||
      currentChallenge.type === 'riddle'
    ) {
      isCorrect = parseInt(answer) === currentChallenge.correctAnswer;
    } else if (
      currentChallenge.type === 'print' ||
      currentChallenge.type === 'variable' ||
      currentChallenge.type === 'math' ||
      currentChallenge.type === 'fill'
    ) {
      isCorrect = answer.trim() === currentChallenge.expectedCompletion;
    } else if (currentChallenge.type === 'match') {
      isCorrect = true; // Simplified
    }

    if (isCorrect) {
      setFeedback('correct');
      const newXp = xp + 10;
      setXp(newXp);
      await gameService.updateGameProgress(gameId, {
        is_started: true,
        is_completed: false,
        current_level: currentStep + 1,
        score: newXp,
        data: { character: selectedCharacter?.id, environment: selectedEnvironment?.id },
      });

      setTimeout(() => {
        if (currentStep < gameSteps.length - 1) {
          setCurrentStep(currentStep + 1);
          setAnswer('');
          setFeedback(null);
          setHint(false);
        } else {
          setGameState('complete');
          gameService.updateGameProgress(gameId, {
            is_started: true,
            is_completed: true,
            current_level: currentStep + 1,
            score: newXp,
            data: { character: selectedCharacter?.id, environment: selectedEnvironment?.id },
          });
          if (user) {
            const updatedUser = {
              ...user,
              experience: (user.experience || 0) + 100, // Assume 100 XP for completion
              level: Math.floor(((user.experience || 0) + 100) / 100) + 1,
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      const newHearts = hearts - 1;
      setHearts(newHearts);
      await gameService.updateGameProgress(gameId, {
        is_started: true,
        is_completed: false,
        current_level: currentStep,
        score: xp,
        data: { character: selectedCharacter?.id, environment: selectedEnvironment?.id, hearts: newHearts },
      });

      if (newHearts <= 0) {
        message.error('You ran out of hearts! Try again.');
        navigate('/dashboard');
      }

      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  const renderCharacterSelection = () => (
    <Card className="shadow-md border-0 text-center">
      <Title level={2} className="mb-6 text-primary">
        Choose your character
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {characters.map((character) => (
          <Col xs={12} sm={6} key={character.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                hoverable
                className="character-card text-center"
                onClick={() => handleCharacterSelect(character)}
              >
                <div className="h-32 flex items-center justify-center mb-4">
                  <img src={character.image} alt={character.name} className="max-h-full" />
                </div>
                <Text strong>{character.name}</Text>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Card>
  );

  const renderEnvironmentSelection = () => (
    <Card className="shadow-md border-0 text-center">
      <Title level={2} className="mb-6 text-primary">
        Choose your playground
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {environments.map((environment) => (
          <Col xs={12} sm={8} key={environment.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                hoverable
                className="environment-card"
                onClick={() => handleEnvironmentSelect(environment)}
              >
                <div className="h-40 flex items-center justify-center mb-4">
                  <img
                    src={environment.image}
                    alt={environment.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <Text strong>{environment.name}</Text>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Card>
  );

  const renderGame = () => {
    const currentChallenge = gameSteps[currentStep];

    return (
      <div className="game-container">
        <Card className="shadow-md border-0 mb-4">
          <div className="flex justify-between items-center mb-4">
            <Space>
              <div className="flex">
                {[...Array(hearts)].map((_, i) => (
                  <HeartOutlined key={i} className="text-red-500 text-xl mr-1" />
                ))}
              </div>
              <Text strong>
                Step {currentStep + 1} of {gameSteps.length}
              </Text>
            </Space>
            <div>
              <span className="text-yellow-500 font-bold">
                <StarOutlined className="mr-1" />
                {xp} XP
              </span>
            </div>
          </div>
          <Progress percent={progress} status="active" showInfo={false} />
        </Card>

        <Card
          className="shadow-md border-0 game-challenge-card"
          style={{
            backgroundImage: `url(/backgrounds/${currentChallenge.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div className="bg-white bg-opacity-90 p-6 rounded-lg">
            <Title level={3} className="mb-2">
              {currentChallenge.title}
            </Title>
            <Paragraph className="mb-4">{currentChallenge.description}</Paragraph>

            <div className="challenge-container p-4 bg-blue-50 border border-blue-100 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-3">
                  <span className="text-blue-500 text-xl">?</span>
                </div>
                <Text strong>{currentChallenge.challenge}</Text>
              </div>

              {currentChallenge.type === 'selection' ||
              currentChallenge.type === 'quiz' ||
              currentChallenge.type === 'riddle' ? (
                <div className="mt-4">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {currentChallenge.options.map((option, index) => (
                      <Button
                        key={index}
                        className={`text-left ${parseInt(answer) === index ? 'border-blue-500' : ''}`}
                        block
                        onClick={() => setAnswer(index.toString())}
                      >
                        {option}
                      </Button>
                    ))}
                  </Space>
                </div>
              ) : currentChallenge.type === 'match' ? (
                <div className="matching-container mt-4">
                  <Text>Drag and drop to match items</Text>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="code-input-container bg-gray-900 text-white p-3 rounded">
                    <span className="font-mono">{currentChallenge.codeTemplate}</span>
                    <input
                      className="inline-block code-input bg-transparent border-none text-white font-mono"
                      style={{ width: '200px', borderBottom: '1px solid #4299e1' }}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type here..."
                      spellCheck="false"
                    />
                  </div>
                  {currentChallenge.expectedOutput && (
                    <div className="mt-2">
                      <Text type="secondary">Expected output: {currentChallenge.expectedOutput}</Text>
                    </div>
                  )}
                </div>
              )}
            </div>

            {hint && (
              <div className="hint-container mb-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                <Text type="warning">
                  <strong>Hint:</strong> {currentChallenge.hint}
                </Text>
              </div>
            )}

            {feedback === 'correct' && (
              <div className="feedback-container mb-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                <div className="flex items-center">
                  <CheckOutlined className="text-green-500 mr-2" />
                  <Text type="success">Correct! Great job!</Text>
                </div>
              </div>
            )}

            {feedback === 'wrong' && (
              <div className="feedback-container mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center">
                  <CloseOutlined className="text-red-500 mr-2" />
                  <Text type="danger">That's not quite right. Try again!</Text>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button type="default" onClick={() => setHint(!hint)}>
                {hint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              <Button
                type="primary"
                onClick={handleCheckAnswer}
                disabled={!answer && currentChallenge.type !== 'match'}
              >
                Check Answer
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderCompletion = () => (
    <Card className="shadow-md border-0 text-center py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrophyOutlined className="text-5xl text-yellow-500" />
        </div>
        <Title level={2} className="text-primary mb-4">
          Adventure Complete!
        </Title>
        <Paragraph className="mb-4">
          Congratulations! You've completed all challenges and earned {xp} XP!
        </Paragraph>
        <div className="stats-container bg-blue-50 p-4 rounded-lg max-w-md mx-auto mb-6">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Statistic title="XP Earned" value={xp} prefix={<StarOutlined />} />
            </Col>
            <Col span={8}>
              <Statistic title="Steps" value={gameSteps.length} />
            </Col>
            <Col span={8}>
              <Statistic title="Hearts Left" value={hearts} prefix={<HeartOutlined />} />
            </Col>
          </Row>
        </div>
        <Space size="large">
          <Button type="primary" size="large" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => {
              setCurrentStep(0);
              setHearts(5);
              setXp(0);
              setGameState('character');
              gameService.updateGameProgress(gameId, {
                is_started: false,
                is_completed: false,
                current_level: 0,
                score: 0,
                data: {},
              });
            }}
          >
            Play Again
          </Button>
        </Space>
      </motion.div>
    </Card>
  );

  const renderGameState = () => {
    switch (gameState) {
      case 'character':
        return renderCharacterSelection();
      case 'environment':
        return renderEnvironmentSelection();
      case 'game':
        return renderGame();
      case 'complete':
        return renderCompletion();
      default:
        return renderCharacterSelection();
    }
  };

  return (
    <div className="game-page pb-6">
      <div className="container mx-auto">{renderGameState()}</div>
    </div>
  );
};

export default GamePage;