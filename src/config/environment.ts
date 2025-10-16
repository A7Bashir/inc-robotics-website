// Environment Configuration
export const ENV = {
  // Check if we're in development mode
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // Check if we're running locally
  isLocal: typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1'),
  
  // Get current environment
  getCurrent: (): 'development' | 'production' => {
    if (ENV.isDevelopment || ENV.isLocal) {
      return 'development';
    }
    return 'production';
  },
  
  // CRM Configuration
  ENABLE_CRM: true,
  ENABLE_AI: true,
  
  // API Configuration
  API_TIMEOUT: 10000,
  
  // Feature flags
  FEATURES: {
    AI_AGENT: true,
    CRM_INTEGRATION: true,
    MULTILINGUAL: true
  },
  
  // Google Cloud Configuration
  GOOGLE_CLOUD_PROJECT_ID: process.env.REACT_APP_GOOGLE_CLOUD_PROJECT_ID || '',
  GOOGLE_CLOUD_LOCATION: process.env.REACT_APP_GOOGLE_CLOUD_LOCATION || 'us-central1',
  
  // API Keys
  GEMINI_API_KEY: process.env.REACT_APP_GEMINI_API_KEY || '',
  
  // Backend Configuration
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || '',
  
  // Debug mode
  DEBUG: process.env.NODE_ENV === 'development'
};

export default ENV;