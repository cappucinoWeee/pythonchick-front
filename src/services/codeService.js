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
      
      // Fallback for development if API is not available
      if (process.env.NODE_ENV === 'development') {
        // Simulate API response for testing
        console.warn('Using mock code execution response');
        const mockSuccess = Math.random() > 0.2; // 80% chance of success
        return {
          execution_id: `mock-${Date.now()}`,
          success: mockSuccess,
          output: mockSuccess ? (expectedOutput || "Hello, World!") : "",
          error: mockSuccess ? "" : "There was an error in your code",
          execution_time: Math.random() * 0.5,
          matches_expected: mockSuccess && expectedOutput ? true : false
        };
      }
      
      throw error;
    }
  },
  
  // Save code snippet
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
  
  // Get saved code snippets
  getSavedCodeSnippets: async () => {
    try {
      const response = await apiClient.get('/code/snippets');
      return response.data;
    } catch (error) {
      console.error('Get saved snippets error:', error);
      throw error;
    }
  },
  
  // Delete code snippet
  deleteCodeSnippet: async (snippetId) => {
    try {
      await apiClient.delete(`/code/snippets/${snippetId}`);
      return true;
    } catch (error) {
      console.error(`Delete snippet ${snippetId} error:`, error);
      throw error;
    }
  }
};

export default codeService;