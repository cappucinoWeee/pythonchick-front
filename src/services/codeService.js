// src/services/codeService.js
import apiClient from './api';

const codeService = {
  // Execute code with optional expected output
  executeCode: async (code, expectedOutput = null) => {
    try {
      const payload = {
        code: code
      };
      
      if (expectedOutput !== null) {
        payload.expected_output = expectedOutput;
      }
      
      const response = await apiClient.post('/code/execute', payload);
      return response.data;
    } catch (error) {
      console.error('Code execution error:', error);
      throw error;
    }
  },
  
  // Save code snippet (you may implement this endpoint on your backend)
  saveCodeSnippet: async (title, code, description = '') => {
    try {
      const response = await apiClient.post('/code/save', {
        title,
        code,
        description
      });
      return response.data;
    } catch (error) {
      console.error('Save code snippet error:', error);
      throw error;
    }
  },
  
  // Get saved code snippets (you may implement this endpoint on your backend)
  getSavedCodeSnippets: async () => {
    try {
      const response = await apiClient.get('/code/snippets');
      return response.data;
    } catch (error) {
      console.error('Get saved snippets error:', error);
      throw error;
    }
  },
  
  // Delete code snippet (you may implement this endpoint on your backend)
  deleteCodeSnippet: async (snippetId) => {
    try {
      await apiClient.delete(`/code/snippets/${snippetId}`);
      return true;
    } catch (error) {
      console.error(`Delete snippet ${snippetId} error:`, error);
      throw error;
    }
  }
  
  // Note: Game-related methods are commented out as requested
  /* 
  // Get game challenges
  getChallenges: async (difficulty = 'beginner') => {
    try {
      const response = await apiClient.get(`/games/challenges?difficulty=${difficulty}`);
      return response.data;
    } catch (error) {
      console.error('Get challenges error:', error);
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
      throw error;
    }
  }
  */
};

export default codeService;