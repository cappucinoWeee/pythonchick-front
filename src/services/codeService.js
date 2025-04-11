// src/services/codeService.js
import apiClient from './api';

const codeService = {
  // Execute code
  executeCode: async (code, expectedOutput = null) => {
    const response = await apiClient.post('/code/execute', {
      code: code,
      expected_output: expectedOutput
    });
    return response.data;
  },
  
  // Get game challenges
  getChallenges: async (difficulty = 'beginner') => {
    const response = await apiClient.get(`/games/challenges?difficulty=${difficulty}`);
    return response.data;
  },
  
  // Submit challenge solution
  submitChallenge: async (challengeId, code) => {
    const response = await apiClient.post('/games/challenges/submit', {
      challenge_id: challengeId,
      code: code
    });
    return response.data;
  }
};

export default codeService;