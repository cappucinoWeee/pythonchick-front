// src/config/api.js
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10),
  WITH_CREDENTIALS: process.env.REACT_APP_WITH_CREDENTIALS === 'true',
};

// Log configuration in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('API Configuration:', {
    BASE_URL: API_CONFIG.BASE_URL,
    TIMEOUT: API_CONFIG.TIMEOUT,
    WITH_CREDENTIALS: API_CONFIG.WITH_CREDENTIALS,
  });
}

export default API_CONFIG;
