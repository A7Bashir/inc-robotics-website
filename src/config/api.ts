// No environment detection - only cloud backend

// API Configuration - ONLY CLOUD BACKEND
const API_CONFIG = {
  // Cloud backend URL (ONLY)
  cloud: 'https://ali-ai-backend-718164308283.europe-west1.run.app'
};

// Get the cloud backend URL
export const getBackendUrl = (): string => {
  const url = API_CONFIG.cloud;
  console.log(`🌐 Using ONLY cloud backend:`, url);
  return url;
};

// API endpoints
export const API_ENDPOINTS = {
  CHAT: () => `${getBackendUrl()}/api/chat`,
  HEALTH: () => `${getBackendUrl()}/api/health`,
  CONTACT: () => `${getBackendUrl()}/api/contact`,
  GALLERY_TOUR: () => `${getBackendUrl()}/api/contact/gallery-tour`
};

export default API_CONFIG;