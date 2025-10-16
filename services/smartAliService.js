class SmartAliService {
  constructor() {
    this.conversationHistory = new Map();
    this.userProfiles = new Map();
    this.conversationContexts = new Map();
    
    // Enhanced product knowledge base
    this.products = {
      'NOVA': {
        name: 'NOVA Service Robot',
        category: 'Hospitality',
        description: 'AI-powered service robot for hotels, restaurants, and hospitality venues',
        features: ['Multi-language support', 'Facial recognition', 'Navigation', 'Customer service'],
        applications: ['Hotels', 'Restaurants', 'Shopping malls', 'Airports'],
        roi: '40-60% cost reduction in customer service operations',
        payback: '6-12 months'
      },
      'LuckiBot': {
        name: 'LuckiBot Welcoming Robot',
        category: 'Reception',
        description: 'Intelligent reception and welcoming robot',
        features: ['Visitor management', 'Appointment scheduling', 'Information kiosk', 'Security integration'],
        applications: ['Offices', 'Hospitals', 'Universities', 'Government buildings'],
        roi: '50-70% reduction in reception costs',
        payback: '4-8 months'
      },
      '50 Pro': {
        name: '50 Pro Cleaning Robot',
        category: 'Cleaning',
        description: 'Professional cleaning robot for large facilities',
        features: ['Autonomous navigation', 'Multiple cleaning modes', 'UV disinfection', 'Real-time monitoring'],
        applications: ['Hospitals', 'Schools', 'Offices', 'Shopping centers'],
        roi: '60-80% reduction in cleaning costs',
        payback: '3-6 months'
      },
      'FOLA Series': {
        name: 'FOLA Material Handling Robots',
        category: 'Logistics',
        description: 'Automated material handling and logistics robots',
        features: ['Load carrying', 'Warehouse navigation', 'Inventory management', 'Fleet coordination'],
        applications: ['Warehouses', 'Manufacturing', 'Distribution centers', 'Retail'],
        roi: '70-90% improvement in logistics efficiency',
        payback: '8-15 months'
      },
      'Lucki Plus': {
        name: 'Lucki Plus Advanced Robot',
        category: 'Multi-purpose',
        description: 'Advanced multi-functional service robot',
        features: ['Modular design', 'Custom applications', 'AI integration', 'Remote monitoring'],
        applications: ['Healthcare', 'Education', 'Retail', 'Corporate'],
        roi: '45-65% operational efficiency improvement',
        payback: '6-10 months'
      }
    };
    
    // Industry-specific knowledge
    this.industries = {
      'education': {
        name: 'Education',
        robots: ['NOVA', 'LuckiBot', '50 Pro', 'Lucki Plus'],
        benefits: ['Student assistance', 'Campus navigation', 'Facility maintenance', 'Security patrol'],
        useCases: ['Student information', 'Campus tours', 'Cleaning services', 'Event management'],
        roi: '30-50% reduction in operational costs',
        clients: ['King Saud University', 'Al Jouf University', 'Major educational institutions']
      },
      'healthcare': {
        name: 'Healthcare',
        robots: ['NOVA', '50 Pro', 'Lucki Plus'],
        benefits: ['Patient assistance', 'Sanitization', 'Medication delivery', 'Visitor guidance'],
        useCases: ['Patient information', 'Disinfection', 'Supply transport', 'Reception services'],
        roi: '40-60% improvement in patient care efficiency',
        clients: ['HA Medical', 'Major hospitals', 'Healthcare facilities']
      },
      'hospitality': {
        name: 'Hospitality',
        robots: ['NOVA', 'LuckiBot', '50 Pro'],
        benefits: ['Guest services', 'Concierge assistance', 'Cleaning automation', 'Event support'],
        useCases: ['Guest check-in', 'Room service', 'Facility cleaning', 'Event management'],
        roi: '50-70% enhancement in guest experience',
        clients: ['Major hotels', 'Resorts', 'Conference centers']
      },
      'warehouse': {
        name: 'Warehouse & Logistics',
        robots: ['FOLA Series', 'Lucki Plus'],
        benefits: ['Inventory management', 'Order fulfillment', 'Material transport', 'Fleet coordination'],
        useCases: ['Picking and packing', 'Inventory tracking', 'Goods transport', 'Quality control'],
        roi: '70-90% improvement in logistics efficiency',
        clients: ['Major distribution centers', 'E-commerce companies']
      },
      'manufacturing': {
        name: 'Manufacturing',
        robots: ['FOLA Series', 'Lucki Plus'],
        benefits: ['Material handling', 'Quality inspection', 'Production support', 'Safety monitoring'],
        useCases: ['Assembly line support', 'Quality control', 'Material transport', 'Safety patrol'],
        roi: '60-80% improvement in production efficiency',
        clients: ['Manufacturing companies', 'Industrial facilities']
      }
    };
  }

  // Process user message and return Ali's smart response
  async processMessage(message, language = 'en', conversationId = 'default') {
    try {
      // Get or create conversation context
      const context = this.getConversationContext(conversationId);
      
      // Update conversation history
      this.updateConversationHistory(conversationId, message, 'user');
      
      // Update user profile based on message
      this.updateUserProfile(conversationId, message);
      
      // Generate intelligent response
      const response = this.generateSmartResponse(message, context, language, conversationId);
      
      // Update conversation history with response
      this.updateConversationHistory(conversationId, response.message, 'assistant');
      
      return response;
      
    } catch (error) {
      console.error('Error in Smart Ali Service:', error);
      return this.getFallbackResponse(language);
    }
  }

  // Generate smart response based on context and user input
  generateSmartResponse(message, context, language, conversationId) {
    const userProfile = this.userProfiles.get(conversationId) || {};
    const conversationHistory = this.getConversationHistory(conversationId);
    
    // Analyze user intent and context
    const intent = this.analyzeIntent(message, userProfile, conversationHistory);
    const industry = this.detectIndustry(message, userProfile);
    const urgency = this.detectUrgency(message);
    
    // Generate contextual response
    let response = this.buildContextualResponse(intent, industry, userProfile, conversationHistory, language);
    
    // Add follow-up questions
    const followUpQuestions = this.generateFollowUpQuestions(intent, industry, userProfile);
    
    // Add recommendations
    const recommendations = this.generateRecommendations(industry, userProfile);
    
    // Add ROI information if relevant
    const roiInfo = this.generateROIInfo(industry, intent);
    
    return {
      message: response,
      language,
      confidence: 0.9,
      consultationType: intent.type,
      recommendations: recommendations,
      followUpQuestions: followUpQuestions,
      roiInfo: roiInfo,
      industry: industry,
      urgency: urgency
    };
  }

  // Analyze user intent
  analyzeIntent(message, userProfile, conversationHistory) {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific intents
    if (lowerMessage.includes('roi') || lowerMessage.includes('return on investment') || lowerMessage.includes('cost')) {
      return { type: 'roi', priority: 'high' };
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return { type: 'pricing', priority: 'high' };
    }
    
    if (lowerMessage.includes('demo') || lowerMessage.includes('demonstration') || lowerMessage.includes('test')) {
      return { type: 'demo', priority: 'high' };
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('university')) {
      return { type: 'industry_specific', priority: 'high', industry: 'education' };
    }
    
    if (lowerMessage.includes('hospital') || lowerMessage.includes('healthcare') || lowerMessage.includes('medical')) {
      return { type: 'industry_specific', priority: 'high', industry: 'healthcare' };
    }
    
    if (lowerMessage.includes('hotel') || lowerMessage.includes('restaurant') || lowerMessage.includes('hospitality')) {
      return { type: 'industry_specific', priority: 'high', industry: 'hospitality' };
    }
    
    if (lowerMessage.includes('warehouse') || lowerMessage.includes('logistics') || lowerMessage.includes('storage')) {
      return { type: 'industry_specific', priority: 'high', industry: 'warehouse' };
    }
    
    if (lowerMessage.includes('manufacturing') || lowerMessage.includes('factory') || lowerMessage.includes('production')) {
      return { type: 'industry_specific', priority: 'high', industry: 'manufacturing' };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
      return { type: 'general_help', priority: 'medium' };
    }
    
    // Default to general consultation
    return { type: 'general_consultation', priority: 'medium' };
  }

  // Detect industry from message
  detectIndustry(message, userProfile) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, industry] of Object.entries(this.industries)) {
      if (lowerMessage.includes(key) || lowerMessage.includes(industry.name.toLowerCase())) {
        return key;
      }
    }
    
    return userProfile.industry || 'general';
  }

  // Detect urgency level
  detectUrgency(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
      return 'high';
    }
    
    if (lowerMessage.includes('soon') || lowerMessage.includes('quickly') || lowerMessage.includes('fast')) {
      return 'medium';
    }
    
    return 'low';
  }

  // Build contextual response
  buildContextualResponse(intent, industry, userProfile, conversationHistory, language) {
    let response = '';
    
    if (intent.type === 'roi') {
      response = this.buildROIResponse(industry, userProfile);
    } else if (intent.type === 'pricing') {
      response = this.buildPricingResponse(industry, userProfile);
    } else if (intent.type === 'demo') {
      response = this.buildDemoResponse(industry, userProfile);
    } else if (intent.type === 'industry_specific') {
      response = this.buildIndustryResponse(intent.industry, userProfile);
    } else if (intent.type === 'general_help') {
      response = this.buildHelpResponse(industry, userProfile);
    } else {
      response = this.buildGeneralResponse(industry, userProfile, conversationHistory);
    }
    
    return response;
  }

  // Build ROI response
  buildROIResponse(industry, userProfile) {
    const industryInfo = this.industries[industry];
    
    if (industryInfo) {
      return `For ${industryInfo.name} applications, our robotics solutions typically deliver ${industryInfo.roi}. The payback period ranges from 3-15 months depending on the specific implementation. For example, our cleaning robots in healthcare facilities have shown 60-80% reduction in cleaning costs, while our service robots in hospitality venues improve guest experience by 50-70%. Would you like me to provide a detailed ROI analysis for your specific facility?`;
    }
    
    return `Our robotics solutions typically deliver 40-90% cost reduction across various industries, with payback periods ranging from 3-15 months. The exact ROI depends on your specific application and facility size. I'd be happy to provide a customized ROI analysis for your needs.`;
  }

  // Build pricing response
  buildPricingResponse(industry, userProfile) {
    return `Our robotics solutions are priced competitively based on your specific requirements and facility size. Pricing typically ranges from $15,000 to $50,000 per robot, depending on the model and customization. We offer flexible financing options and can provide a detailed quote based on your needs. Would you like me to connect you with our sales team for a personalized quote?`;
  }

  // Build demo response
  buildDemoResponse(industry, userProfile) {
    return `I'd be happy to arrange a demonstration of our robotics solutions! We can provide both virtual demos and on-site demonstrations at your facility. Our team can showcase the specific robots that would be most suitable for your ${industry} application. When would be a convenient time for you?`;
  }

  // Build industry-specific response
  buildIndustryResponse(industry, userProfile) {
    const industryInfo = this.industries[industry];
    
    if (industryInfo) {
      return `For ${industryInfo.name} applications, I recommend our ${industryInfo.robots.join(', ')} robots. These solutions provide ${industryInfo.benefits.join(', ')} and are specifically designed for ${industryInfo.useCases.join(', ')}. Our clients in this industry have seen ${industryInfo.roi}. We've successfully implemented solutions for ${industryInfo.clients.join(', ')}. Which specific application interests you most?`;
    }
    
    return `I'd be happy to help you find the right robotics solution for your industry. Could you tell me more about your specific needs and facility type?`;
  }

  // Build help response
  buildHelpResponse(industry, userProfile) {
    return `I'm here to help you find the perfect robotics solution for your needs! I can assist with:
• Product recommendations based on your industry
• ROI analysis and cost-benefit calculations
• Implementation planning and support
• Technical specifications and features
• Client references and case studies

What specific aspect would you like to explore?`;
  }

  // Build general response
  buildGeneralResponse(industry, userProfile, conversationHistory) {
    const industryInfo = this.industries[industry];
    
    if (industryInfo) {
      return `Welcome! I'm Ali, your robotics solutions consultant. For ${industryInfo.name} applications, I can help you explore our ${industryInfo.robots.join(', ')} robots. These solutions are designed to ${industryInfo.benefits.join(', ')} and have proven results with ${industryInfo.roi}. How can I assist you today?`;
    }
    
    return `Hello! I'm Ali, your expert robotics and AI solutions consultant from INC Robotics. I can help you analyze your facilities, design solutions, and provide specialized consultation. What type of facility or application are you working with?`;
  }

  // Generate follow-up questions
  generateFollowUpQuestions(intent, industry, userProfile) {
    const questions = [];
    
    if (intent.type === 'roi') {
      questions.push('What is the size of your facility?');
      questions.push('How many staff members would be affected?');
      questions.push('What is your current operational budget?');
    } else if (intent.type === 'industry_specific') {
      questions.push(`What specific ${industry} applications interest you?`);
      questions.push('What is your facility size?');
      questions.push('Do you have any specific requirements?');
    } else {
      questions.push('What type of facility do you have?');
      questions.push('What are your main operational challenges?');
      questions.push('Would you like to see our product catalog?');
    }
    
    return questions;
  }

  // Generate recommendations
  generateRecommendations(industry, userProfile) {
    const industryInfo = this.industries[industry];
    
    if (industryInfo) {
      return industryInfo.robots.map(robotName => ({
        name: this.products[robotName].name,
        category: this.products[robotName].category,
        description: this.products[robotName].description,
        roi: this.products[robotName].roi
      }));
    }
    
    return Object.values(this.products).slice(0, 3).map(product => ({
      name: product.name,
      category: product.category,
      description: product.description,
      roi: product.roi
    }));
  }

  // Generate ROI information
  generateROIInfo(industry, intent) {
    const industryInfo = this.industries[industry];
    
    if (industryInfo && intent.type === 'roi') {
      return {
        industry: industryInfo.name,
        roi: industryInfo.roi,
        payback: industryInfo.roi,
        clients: industryInfo.clients
      };
    }
    
    return null;
  }

  // Get conversation context
  getConversationContext(conversationId) {
    if (!this.conversationContexts.has(conversationId)) {
      this.conversationContexts.set(conversationId, {
        industry: null,
        interests: [],
        questions: [],
        lastIntent: null
      });
    }
    return this.conversationContexts.get(conversationId);
  }

  // Update conversation history
  updateConversationHistory(conversationId, message, role) {
    if (!this.conversationHistory.has(conversationId)) {
      this.conversationHistory.set(conversationId, []);
    }
    
    const history = this.conversationHistory.get(conversationId);
    history.push({ message, role, timestamp: new Date() });
    
    // Keep only last 10 messages
    if (history.length > 10) {
      history.shift();
    }
  }

  // Get conversation history
  getConversationHistory(conversationId) {
    return this.conversationHistory.get(conversationId) || [];
  }

  // Update user profile
  updateUserProfile(conversationId, message) {
    if (!this.userProfiles.has(conversationId)) {
      this.userProfiles.set(conversationId, {
        industry: null,
        interests: [],
        questions: [],
        lastActivity: new Date()
      });
    }
    
    const profile = this.userProfiles.get(conversationId);
    profile.lastActivity = new Date();
    
    // Detect industry from message
    const industry = this.detectIndustry(message, profile);
    if (industry && industry !== 'general') {
      profile.industry = industry;
    }
    
    // Extract interests
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('cleaning') || lowerMessage.includes('sanitization')) {
      profile.interests.push('cleaning');
    }
    if (lowerMessage.includes('service') || lowerMessage.includes('customer')) {
      profile.interests.push('service');
    }
    if (lowerMessage.includes('logistics') || lowerMessage.includes('transport')) {
      profile.interests.push('logistics');
    }
  }

  // Fallback response
  getFallbackResponse(language) {
    // Default cleaning robot recommendations for unknown facilities
    const cleaningRobots = language === 'ar' 
      ? ['روبوت التنظيف 50 برو', 'روبوت التنظيف 75', 'روبوت التنظيف فانتاس', 'روبوت التنظيف فاكيوم 40', 'روبوت التنظيف أومني']
      : ['50 Pro Cleaning Robot', '75 Cleaning Robot', 'Phantas Cleaning Robot', 'Vacum 40 Cleaning Robot', 'Omnie Cleaning Robot'];

    return {
      message: language === 'ar' 
        ? "مرحباً! أنا علي، مستشارك في حلول الروبوتات والذكاء الاصطناعي من معيار الذكاء. أرى أنك تسأل عن منشأة معينة. بصفتنا خبراء في حلول الروبوتات، يمكننا مساعدتك في تحسين عمليات التنظيف والصيانة في أي منشأة. نقدم مجموعة واسعة من روبوتات التنظيف المتطورة التي تضمن بيئة نظيفة وصحية. كيف يمكنني مساعدتك اليوم؟"
        : "Hello! I'm Ali, your robotics and AI solutions consultant from INC Robotics. I see you're asking about a specific facility. As robotics experts, we can help improve cleaning and maintenance operations in any facility. We offer a comprehensive range of advanced cleaning robots that ensure clean and healthy environments. How can I assist you today?",
      language,
      confidence: 0.8,
      consultationType: 'cleaning_solutions',
      recommendations: {
        robots: cleaningRobots,
        reasoning: language === 'ar' 
          ? 'حلول تنظيف متطورة لجميع أنواع المنشآت'
          : 'Advanced cleaning solutions for all facility types',
        implementation: language === 'ar' 
          ? 'تنفيذ مخصص مع دعم كامل للصيانة'
          : 'Custom implementation with full maintenance support',
        roi: language === 'ar' 
          ? 'توفير 40-60% في تكاليف التنظيف مع عائد استثمار 4-12 شهر'
          : '40-60% cost savings in cleaning with 4-12 month ROI'
      },
      followUpQuestions: language === 'ar' 
        ? ['ما حجم المنشأة التي تعمل بها؟', 'ما هي التحديات الرئيسية في التنظيف؟', 'هل تحتاج حلول تنظيف متخصصة؟']
        : ['What is the size of your facility?', 'What are your main cleaning challenges?', 'Do you need specialized cleaning solutions?'],
      roiInfo: null,
      industry: 'general',
      urgency: 'low'
    };
  }
}

module.exports = SmartAliService;
