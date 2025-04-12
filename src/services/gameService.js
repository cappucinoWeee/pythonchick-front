// src/services/gameService.js
import apiClient from './api';

const gameService = {
  // Get coding challenges
  getChallenges: async (difficulty = 'beginner') => {
    try {
      const response = await apiClient.get(`/games/challenges`, {
        params: { difficulty }
      });
      return response.data;
    } catch (error) {
      console.error('Get challenges error:', error);
      
      // Fallback for development if API is not available
      if (process.env.NODE_ENV === 'development') {
        // Provide mock data for testing
        console.warn('Using mock challenge data');
        return [
          {
            id: 'challenge1',
            title: 'Hello World',
            description: 'Write a program that prints "Hello, World!" to the console.',
            starter_code: '# Write your code here\n\n',
            hints: [
              'Use the print() function',
              'Remember to use quotes around text',
              'Check your spelling'
            ],
            points: 10
          },
          {
            id: 'challenge2',
            title: 'Sum of Numbers',
            description: 'Write a program that calculates and prints the sum of 5 and 3.',
            starter_code: '# Write your code here\n\n',
            hints: [
              'Use the + operator for addition',
              'Use the print() function to display the result',
              'The result should be 8'
            ],
            points: 15
          },
          {
            id: 'challenge3',
            title: 'String Concatenation',
            description: 'Create a program that joins "Hello" and "Python" with a space in between.',
            starter_code: '# Write your code here\n\n',
            hints: [
              'Use the + operator to join strings',
              'Don\'t forget to add a space between the words',
              'The result should be "Hello Python"'
            ],
            points: 10
          }
        ];
      }
      
      throw error;
    }
  },
  
  // Submit challenge solution
  submitChallenge: async (challengeId, code) => {
    try {
      const response = await apiClient.post('/games/challenges/submit', {
        challenge_id: challengeId,
        code: code
      });
      return response.data;
    } catch (error) {
      console.error('Submit challenge error:', error);
      
      // Fallback for development if API is not available
      if (process.env.NODE_ENV === 'development') {
        // Simulate API response for testing
        console.warn('Using mock challenge submission response');
        const success = Math.random() > 0.2; // 80% chance of success
        return {
          success: true,
          correct: success,
          points_earned: success ? 10 : 0,
          coins_earned: success ? 5 : 0,
          output: success ? "Hello, World!" : "Hello World", // Missing comma
          error: success ? null : "Output doesn't match expected output",
          execution_time: 0.05
        };
      }
      
      throw error;
    }
  },
  
  // Get user's completed challenges
  getUserChallenges: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}/challenges`);
      return response.data;
    } catch (error) {
      console.error('Get user challenges error:', error);
      throw error;
    }
  },
  
  // Get leaderboard data
  getLeaderboard: async (timeframe = 'all') => {
    try {
      const response = await apiClient.get('/leaderboard', {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Get leaderboard error:', error);
      throw error;
    }
  }
};

export default gameService;