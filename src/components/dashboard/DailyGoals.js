// src/components/dashboard/DailyGoals.js
import React from 'react';
import { Card, Steps } from 'antd';
import { 
  BookOutlined, 
  FormOutlined, 
  CheckSquareOutlined, 
  TrophyOutlined 
} from '@ant-design/icons';

const { Step } = Steps;

const DailyGoals = () => {
  // Mock data - would be dynamic in a real app
  const currentStep = 2; // 0-indexed, so this means 2 steps completed
  
  return (
    <Card className="shadow-card mt-6">
      <h3 className="text-lg font-medium mb-4">Today's Goals</h3>
      <Steps 
        direction="vertical" 
        current={currentStep}
        className="max-w-md mx-auto"
      >
        <Step 
          title="Complete 1 Lesson" 
          description="Learn something new today" 
          icon={<BookOutlined />} 
        />
        <Step 
          title="Practice Coding" 
          description="Solve at least one coding challenge" 
          icon={<FormOutlined />} 
        />
        <Step 
          title="Take a Quiz" 
          description="Test your knowledge" 
          icon={<CheckSquareOutlined />} 
        />
        <Step 
          title="Earn 50 XP" 
          description="Keep growing your skills" 
          icon={<TrophyOutlined />} 
        />
      </Steps>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          {currentStep < 4 
            ? `${currentStep}/4 goals completed. Keep going!` 
            : "All goals completed. Great job!"}
        </p>
        {currentStep < 4 && (
          <button className="btn-primary mt-2">
            Continue Learning
          </button>
        )}
      </div>
    </Card>
  );
};

export default DailyGoals;