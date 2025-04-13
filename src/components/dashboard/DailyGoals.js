// src/components/dashboard/DailyGoals.js
import React from 'react';
import { Card, Steps, Button, Progress, Badge } from 'antd';
import {
  BookOutlined,
  FormOutlined,
  CheckSquareOutlined,
  TrophyOutlined,
  RocketOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const { Step } = Steps;

const DailyGoals = () => {
  // Mock data - would be dynamic in a real app
  const currentStep = 2; // 0-indexed, so this means 2 steps completed
  const dailyStreak = 3; // Number of consecutive days
  const dailyXPGoal = 50;
  const currentXP = 30;

  return (
    <Card
      className="shadow-md border-0 mb-6"
      title={
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Today's Goals</span>
          <Badge count={`${currentStep}/4`} style={{ backgroundColor: '#FF8C00' }} />
        </div>
      }
      // extra={
      //   <Link to="/dashboard" className="text-primary hover:text-primary-dark">
      //     View All
      //   </Link>
      // }
    >
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ClockCircleOutlined className="text-blue-500 mr-2" />
            <span className="text-sm font-medium">Daily XP Goal</span>
          </div>
          <span className="text-blue-500 font-medium">
            {currentXP}/{dailyXPGoal} XP
          </span>
        </div>
        <Progress
          percent={(currentXP / dailyXPGoal) * 100}
          showInfo={false}
          strokeColor="#1890FF"
          size="small"
          className="mt-2"
        />
      </div>

      <Steps direction="vertical" current={currentStep} progressDot className="custom-steps">
        <Step
          title={<span className="font-medium">Complete 1 Lesson</span>}
          description={
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Learn something new</span>
              <Badge status="success" text="Completed" />
            </div>
          }
          icon={<BookOutlined />}
        />
        <Step
          title={<span className="font-medium">Practice Coding</span>}
          description={
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Solve a coding challenge</span>
              <Badge status="success" text="Completed" />
            </div>
          }
          icon={<FormOutlined />}
        />
        <Step
          title={<span className="font-medium">Take a Quiz</span>}
          description={
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Test your knowledge</span>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Badge status="processing" text="In Progress" />
              </motion.div>
            </div>
          }
          icon={<CheckSquareOutlined />}
        />
        <Step
          title={<span className="font-medium">Earn 50 XP</span>}
          description={
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Keep growing your skills</span>
              <Badge status="default" text="Pending" />
            </div>
          }
          icon={<TrophyOutlined />}
        />
      </Steps>

      <div className="mt-4 flex flex-col items-center">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="w-full">
          <Button
            icon={<RocketOutlined />}
            block
            size="large"
            className="rounded-lg shadow-sm btn-primary"
          >
            Continue Learning
          </Button>
        </motion.div>

        <div className="bg-orange-50 w-full mt-4 p-3 rounded-lg border border-orange-100">
          <div className="flex items-center">
            <div className="mr-3 bg-orange-100 rounded-full p-2">
              <TrophyOutlined className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium mb-0">Complete all goals to earn bonus XP!</p>
              <p className="text-xs text-gray-600 mb-0">Current streak: {dailyStreak} days 🔥</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DailyGoals;
