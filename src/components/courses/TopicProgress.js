// src/components/courses/TopicProgress.js
import React from 'react';
import { Card, Steps } from 'antd';
import { 
  BookOutlined, 
  CodeOutlined, 
  CheckSquareOutlined, 
  TrophyOutlined 
} from '@ant-design/icons';

const { Step } = Steps;

const TopicProgress = ({ topic }) => {
  // Calculate where the user is in the topic
  const completedLessons = topic.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = topic.lessons.length;
  const currentStep = completedLessons;
  
  return (
    <Card className="shadow-card">
      <h3 className="text-lg font-medium mb-4">Topic Progress</h3>
      <Steps 
        current={currentStep}
        percent={Math.round((currentStep / totalLessons) * 100)}
      >
        {topic.lessons.map((lesson, index) => (
          <Step 
            key={lesson.id} 
            title={`Lesson ${index + 1}`}
            description={lesson.title.length > 15 ? `${lesson.title.slice(0, 15)}...` : lesson.title}
            icon={
              lesson.type === 'quiz' 
                ? <CheckSquareOutlined /> 
                : <BookOutlined />
            }
          />
        ))}
        <Step 
          title="Complete"
          icon={<TrophyOutlined />}
        />
      </Steps>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          {completedLessons === totalLessons 
            ? "Topic completed! Great job!" 
            : `${completedLessons}/${totalLessons} lessons completed`}
        </p>
      </div>
    </Card>
  );
};

export default TopicProgress;