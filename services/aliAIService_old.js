const aiplatform = require('@google-cloud/aiplatform');

// Initialize Vertex AI
let vertexAI = null;

try {
  // Try to load credentials from JSON file first
  const fs = require('fs');
  const path = require('path');
  
  const credentialsPath = path.join(__dirname, '..', 'website-backend-server-a5effd806a4e.json');
  
  if (fs.existsSync(credentialsPath)) {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    vertexAI = new aiplatform.VertexAI({
      project: credentials.project_id,
      location: 'us-central1',
      credentials: credentials
    });
    console.log('✅ Vertex AI initialized successfully from JSON file');
  } else if (process.env.GOOGLE_CLOUD_PROJECT_ID && process.env.GOOGLE_CLOUD_CREDENTIALS) {
    vertexAI = new aiplatform.VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
      credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS)
    });
    console.log('✅ Vertex AI initialized successfully from environment variables');
  } else {
    console.log('⚠️ Vertex AI credentials not found, using mock responses');
  }
} catch (error) {
  console.log('⚠️ Vertex AI initialization failed, using mock responses:', error.message);
}

class AliAIService {
  constructor() {
    this.conversationHistory = new Map();
    this.userProfiles = new Map();
    this.conversationContexts = new Map();
  }

  // Process user message and return Ali's response
  async processMessage(message, language = 'en', conversationId = 'default') {
    try {
      // Get or create conversation context
      const context = this.getConversationContext(conversationId);
      
      // Update conversation history
      this.updateConversationHistory(conversationId, message, 'user');
      
      // Update user profile based on message
      this.updateUserProfile(conversationId, message);
      
      // Always use Vertex AI - no fallback to keyword matching
      const response = await this.callRealVertexAI(message, context, language, conversationId);
      this.updateConversationHistory(conversationId, response.message, 'assistant');
      return response;
      
    } catch (error) {
      console.error('Error in Ali AI Service:', error);
      return this.getFallbackResponse(language);
    }
  }

  // Call real Vertex AI with conversation context
  async callRealVertexAI(message, context, language, conversationId) {
    try {
      // Build conversation context
      const conversationHistory = this.getConversationHistory(conversationId);
      const contextPrompt = this.buildContextPrompt(context, conversationHistory, language);
      
      // Create the full prompt for Vertex AI
      const fullPrompt = `${this.getAliSystemPrompt(language)}\n\n${contextPrompt}\n\nUser: ${message}\n\nAli:`;
      
      // Call Vertex AI directly
      if (vertexAI) {
        const response = await this.callVertexAI(fullPrompt, language);
        return this.parseAndEnhanceResponse(response, context, language);
      } else {
        // If Vertex AI not available, use a simple fallback
        return this.getSimpleFallbackResponse(message, language);
      }
      
    } catch (error) {
      console.error('Error calling real Vertex AI:', error);
      return this.getSimpleFallbackResponse(message, language);
    }
  }

  // Build context prompt with conversation history
  buildContextPrompt(context, conversationHistory, language) {
    let contextInfo = '';
    
    // Add user profile information
    if (context.userProfile) {
      contextInfo += language === 'ar' 
        ? `معلومات العميل: ${JSON.stringify(context.userProfile, null, 2)}\n`
        : `Client Information: ${JSON.stringify(context.userProfile, null, 2)}\n`;
    }
    
    // Add conversation history
    if (conversationHistory.length > 0) {
      contextInfo += language === 'ar' 
        ? `\nتاريخ المحادثة:\n`
        : `\nConversation History:\n`;
      
      conversationHistory.slice(-6).forEach(entry => {
        contextInfo += `${entry.role === 'user' ? 'User' : 'Ali'}: ${entry.message}\n`;
      });
    }
    
    return contextInfo;
  }

  // Parse and enhance AI response
  parseAndEnhanceResponse(response, context, language) {
    // Extract recommendations, follow-up questions, etc. from AI response
    const recommendations = this.extractRecommendationsFromAIResponse(response, language);
    const followUpQuestions = this.extractFollowUpQuestionsFromAIResponse(response, language);
    const suggestedActions = this.extractSuggestedActionsFromAIResponse(response, language);
    
    return {
      message: response,
      language,
      confidence: 0.95,
      consultationType: this.determineConsultationType(response, context),
      recommendations,
      followUpQuestions,
      suggestedActions
    };
  }

  // Enhanced mock response with conversation context
  async generateEnhancedMockResponse(message, context, language) {
    // Use conversation context to provide better responses
    const conversationHistory = this.getConversationHistory(context.conversationId || 'default');
    const lastMessages = conversationHistory.slice(-3);
    
    // Analyze patterns in conversation
    const hasAskedAboutROI = lastMessages.some(msg => 
      msg.message.toLowerCase().includes('roi') || 
      msg.message.toLowerCase().includes('cost') ||
      msg.message.toLowerCase().includes('price')
    );
    
    const hasAskedAboutImplementation = lastMessages.some(msg => 
      msg.message.toLowerCase().includes('implement') || 
      msg.message.toLowerCase().includes('install') ||
      msg.message.toLowerCase().includes('setup')
    );
    
    // Check if this is a follow-up about ROI
    if (message.toLowerCase().includes('roi') || message.toLowerCase().includes('cost') || message.toLowerCase().includes('price')) {
      return this.generateROIResponse(message, context, language);
    } else if (message.toLowerCase().includes('implement') || message.toLowerCase().includes('install') || message.toLowerCase().includes('setup')) {
      return this.generateImplementationResponse(message, context, language);
    } else {
      // Use the original keyword-based logic but with context awareness
      return this.generateContextAwareResponse(message, context, language);
    }
  }

  // Generate context-aware response using original logic but with conversation memory
  generateContextAwareResponse(message, context, language) {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific facility types FIRST (before company inquiry)
    if (lowerMessage.includes('school') || lowerMessage.includes('university') || lowerMessage.includes('education') || lowerMessage.includes('مدرسة') || lowerMessage.includes('جامعة') || lowerMessage.includes('تعليم')) {
      return {
        message: "For educational facilities, I recommend our Mini educational robot for student interaction and our 50 Pro cleaning robot for campus maintenance. Mini provides project publishing and presentation capabilities, while 50 Pro ensures clean learning environments. Our education clients like King Saud University and Aljouf University see 65% improvement in student engagement and 40% reduction in maintenance costs. The ROI typically pays for itself within 6-10 months. What educational programs need robotic support?",
        language,
        confidence: 0.9,
        consultationType: 'facility_analysis',
        recommendations: {
          robots: ['Mini Educational Robot', '50 Pro Cleaning Robot'],
          reasoning: 'Mini provides project publishing and presentation capabilities, while 50 Pro ensures clean learning environments',
          implementation: 'Mini installation in classrooms and libraries, 50 Pro for campus maintenance, educational staff training, student engagement monitoring',
          roi: '65% improvement in student engagement, 40% reduction in maintenance costs, payback within 6-10 months'
        },
        followUpQuestions: [
          'What educational programs need robotic support?',
          'How many students do you have?',
          'Would you like to see our education solutions catalog?'
        ]
      };
    }
    
    // Continue with other facility types...
    return this.generateInitialResponse(message, context, language);
  }

  // Extract recommendations from AI response
  extractRecommendationsFromAIResponse(response, language) {
    // Use AI to extract product recommendations from response
    const robots = [];
    if (response.includes('NOVA') || response.includes('نوفا')) robots.push('NOVA Service Robot');
    if (response.includes('Mini') || response.includes('ميني')) robots.push('Mini Educational Robot');
    if (response.includes('50 Pro') || response.includes('50 برو')) robots.push('50 Pro Cleaning Robot');
    if (response.includes('FOLA') || response.includes('فولا')) robots.push('FOLA Series');
    if (response.includes('EMMA') || response.includes('إيما')) robots.push('EMMA Series');
    
    return robots.length > 0 ? {
      robots,
      reasoning: this.extractReasoningFromResponse(response, language),
      implementation: this.extractImplementationFromResponse(response, language),
      roi: this.extractROIFromResponse(response, language)
    } : null;
  }

  // Extract follow-up questions from AI response
  extractFollowUpQuestionsFromAIResponse(response, language) {
    const questions = [];
    const questionPatterns = [
      /What.*\?/gi,
      /How.*\?/gi,
      /Would you like.*\?/gi,
      /Can you tell me.*\?/gi
    ];
    
    questionPatterns.forEach(pattern => {
      const matches = response.match(pattern);
      if (matches) {
        questions.push(...matches.slice(0, 2)); // Limit to 2 questions
      }
    });
    
    return questions.length > 0 ? questions : null;
  }

  // Extract suggested actions from AI response
  extractSuggestedActionsFromAIResponse(response, language) {
    const actions = [];
    if (response.includes('schedule') || response.includes('جدولة')) actions.push('schedule_demo');
    if (response.includes('proposal') || response.includes('اقتراح')) actions.push('request_proposal');
    if (response.includes('contact') || response.includes('اتصال')) actions.push('contact_sales');
    if (response.includes('catalog') || response.includes('كتالوج')) actions.push('view_catalog');
    
    return actions.length > 0 ? actions : null;
  }

  // Determine consultation type from response
  determineConsultationType(response, context) {
    if (response.includes('facility') || response.includes('منشأة')) return 'facility_analysis';
    if (response.includes('ROI') || response.includes('cost') || response.includes('تكلفة')) return 'roi_calculation';
    if (response.includes('implement') || response.includes('تطبيق')) return 'implementation_planning';
    if (response.includes('event') || response.includes('فعالية')) return 'event_planning';
    return 'general_inquiry';
  }

  // Generate ROI-focused response
  generateROIResponse(message, context, language) {
    return {
      message: language === 'ar' 
        ? "بناءً على أسئلتك السابقة حول العائد على الاستثمار، دعني أوضح لك التفاصيل المالية. عادة ما نرى عائداً على الاستثمار خلال 6-12 شهراً مع توفير 40-60% في التكاليف التشغيلية. هل تريد تحليلاً مخصصاً لمرافقك؟"
        : "Based on your previous questions about ROI, let me break down the financial details. We typically see ROI within 6-12 months with 40-60% operational cost savings. Would you like a customized analysis for your facility?",
      language,
      confidence: 0.9,
      consultationType: 'roi_calculation',
      recommendations: {
        robots: ['NOVA Service Robot', '50 Pro Cleaning Robot'],
        reasoning: 'Proven ROI with 40-60% cost savings',
        implementation: 'Phased implementation to minimize upfront costs',
        roi: '6-12 month payback period with ongoing savings'
      },
      followUpQuestions: [
        'What is your current operational budget?',
        'Would you like a detailed cost analysis?'
      ]
    };
  }

  // Generate implementation-focused response
  generateImplementationResponse(message, context, language) {
    return {
      message: language === 'ar'
        ? "ممتاز! الآن دعنا نركز على التطبيق العملي. سأقوم بتصميم خطة تنفيذ مخصصة تشمل التدريب والدعم الفني. ما هو الجدول الزمني المفضل لديك؟"
        : "Excellent! Now let's focus on practical implementation. I'll design a customized implementation plan including training and technical support. What's your preferred timeline?",
      language,
      confidence: 0.9,
      consultationType: 'implementation_planning',
      recommendations: {
        robots: ['NOVA Service Robot', '50 Pro Cleaning Robot'],
        reasoning: 'Based on your facility needs and implementation requirements',
        implementation: 'Custom implementation plan with training and support',
        roi: 'Phased rollout to ensure smooth transition'
      },
      followUpQuestions: [
        'What is your preferred implementation timeline?',
        'Do you have any specific technical requirements?'
      ]
    };
  }

  // Generate initial response
  generateInitialResponse(message, context, language) {
    return {
      message: language === 'ar'
        ? "مرحباً! أنا علي، مستشارك في حلول الروبوتات والذكاء الاصطناعي من معيار الذكاء. كيف يمكنني مساعدتك اليوم؟"
        : "Hello! I'm Ali, your robotics and AI solutions consultant from INC Robotics. How can I assist you today?",
      language,
      confidence: 0.9,
      consultationType: 'general_inquiry',
      suggestedActions: ['start_consultation', 'schedule_demo', 'contact_sales']
    };
  }

  // Extract reasoning from response
  extractReasoningFromResponse(response, language) {
    if (response.includes('97%+ speech recognition')) {
      return language === 'ar' ? 'دقة 97%+ في التعرف على الكلام' : '97%+ speech recognition accuracy';
    }
    if (response.includes('36cm HD display')) {
      return language === 'ar' ? 'شاشة 36 سم عالية الدقة' : '36cm HD display';
    }
    if (response.includes('multi-capacity')) {
      return language === 'ar' ? 'حلول متعددة السعة' : 'Multi-capacity solutions';
    }
    return language === 'ar' ? 'حلول مخصصة لاحتياجاتك' : 'Customized solutions for your needs';
  }

  // Extract implementation details from response
  extractImplementationFromResponse(response, language) {
    if (response.includes('training') || response.includes('تدريب')) {
      return language === 'ar' ? 'تدريب شامل ودعم فني' : 'Comprehensive training and technical support';
    }
    if (response.includes('phased') || response.includes('مرحلي')) {
      return language === 'ar' ? 'تنفيذ مرحلي لضمان الانتقال السلس' : 'Phased implementation for smooth transition';
    }
    return language === 'ar' ? 'تنفيذ مخصص مع الدعم الكامل' : 'Custom implementation with full support';
  }

  // Extract ROI information from response
  extractROIFromResponse(response, language) {
    const roiMatch = response.match(/(\d+)% (reduction|savings|improvement)/i);
    const monthsMatch = response.match(/(\d+)-(\d+) months?/i);
    
    if (roiMatch && monthsMatch) {
      const percentage = roiMatch[1];
      const metric = roiMatch[2];
      const months = monthsMatch[1];
      return language === 'ar' 
        ? `عائد على الاستثمار: ${percentage}% ${metric === 'reduction' ? 'تقليل' : 'توفير'} في التكاليف، استرداد خلال ${months} أشهر`
        : `ROI: ${percentage}% ${metric} in costs, payback within ${months} months`;
    }
    
    return language === 'ar' ? 'عائد على الاستثمار مضمون' : 'Guaranteed ROI';
  }

  // Get conversation context
  getConversationContext(conversationId) {
    if (!this.conversationHistory.has(conversationId)) {
      this.conversationHistory.set(conversationId, {
        messages: [],
        clientType: 'unknown',
        facilitySize: 'unknown',
        budgetRange: 'unknown',
        timeline: 'unknown',
        conversationId: conversationId,
        userProfile: null
      });
    }
    return this.conversationHistory.get(conversationId);
  }

  // Update conversation history
  updateConversationHistory(conversationId, message, role) {
    const context = this.getConversationContext(conversationId);
    context.messages.push({
      role,
      message,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 20 messages to prevent memory overflow
    if (context.messages.length > 20) {
      context.messages = context.messages.slice(-20);
    }
  }

  // Get conversation history
  getConversationHistory(conversationId) {
    const context = this.getConversationContext(conversationId);
    return context.messages;
  }

  // Update user profile based on conversation
  updateUserProfile(conversationId, userMessage) {
    const context = this.getConversationContext(conversationId);
    const lowerMessage = userMessage.toLowerCase();
    
    // Detect industry/facility type
    if (lowerMessage.includes('school') || lowerMessage.includes('university') || lowerMessage.includes('education')) {
      context.clientType = 'education';
    } else if (lowerMessage.includes('hospital') || lowerMessage.includes('healthcare')) {
      context.clientType = 'healthcare';
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('hospitality')) {
      context.clientType = 'hospitality';
    } else if (lowerMessage.includes('warehouse') || lowerMessage.includes('logistics')) {
      context.clientType = 'logistics';
    } else if (lowerMessage.includes('manufacturing') || lowerMessage.includes('factory')) {
      context.clientType = 'manufacturing';
    }
    
    // Detect facility size
    if (lowerMessage.includes('large') || lowerMessage.includes('big') || lowerMessage.includes('500+')) {
      context.facilitySize = 'large';
    } else if (lowerMessage.includes('medium') || lowerMessage.includes('100-500')) {
      context.facilitySize = 'medium';
    } else if (lowerMessage.includes('small') || lowerMessage.includes('under 100')) {
      context.facilitySize = 'small';
    }
    
    // Detect budget range
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      if (lowerMessage.includes('high') || lowerMessage.includes('unlimited')) {
        context.budgetRange = 'high';
      } else if (lowerMessage.includes('medium') || lowerMessage.includes('moderate')) {
        context.budgetRange = 'medium';
      } else if (lowerMessage.includes('low') || lowerMessage.includes('limited')) {
        context.budgetRange = 'low';
      }
    }
    
    // Detect timeline
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
      context.timeline = 'urgent';
    } else if (lowerMessage.includes('soon') || lowerMessage.includes('next month')) {
      context.timeline = 'soon';
    } else if (lowerMessage.includes('planning') || lowerMessage.includes('future')) {
      context.timeline = 'planning';
    }
  }

  // Analyze user intent
  analyzeUserIntent(message, context) {
    const lowerMessage = message.toLowerCase();
    
    // Detect consultation type
    let consultationType = 'general_inquiry';
    if (lowerMessage.includes('facility') || lowerMessage.includes('مرافق') || lowerMessage.includes('مستشفى') || lowerMessage.includes('فندق')) {
      consultationType = 'facility_analysis';
    } else if (lowerMessage.includes('event') || lowerMessage.includes('فعالية') || lowerMessage.includes('مناسبة')) {
      consultationType = 'event_planning';
    } else if (lowerMessage.includes('roi') || lowerMessage.includes('cost') || lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
      consultationType = 'roi_calculation';
    } else if (lowerMessage.includes('solution') || lowerMessage.includes('حل') || lowerMessage.includes('توصية')) {
      consultationType = 'solution_design';
    } else if (lowerMessage.includes('company') || lowerMessage.includes('owner') || lowerMessage.includes('founder') || lowerMessage.includes('saudi') || lowerMessage.includes('شركة') || lowerMessage.includes('مالك') || lowerMessage.includes('مؤسس') || lowerMessage.includes('سعودي')) {
      consultationType = 'company_inquiry';
    }

    // Detect client type
    let clientType = 'unknown';
    if (lowerMessage.includes('hospital') || lowerMessage.includes('healthcare') || lowerMessage.includes('مستشفى') || lowerMessage.includes('صحة')) {
      clientType = 'healthcare';
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('hospitality') || lowerMessage.includes('فندق') || lowerMessage.includes('ضيافة')) {
      clientType = 'hospitality';
    } else if (lowerMessage.includes('manufacturing') || lowerMessage.includes('factory') || lowerMessage.includes('مصنع') || lowerMessage.includes('تصنيع')) {
      clientType = 'manufacturing';
    } else if (lowerMessage.includes('school') || lowerMessage.includes('university') || lowerMessage.includes('مدرسة') || lowerMessage.includes('جامعة')) {
      clientType = 'education';
    }

    return {
      consultationType,
      clientType,
      keywords: this.extractKeywords(message),
      needsAnalysis: this.analyzeNeeds(message)
    };
  }

  // Extract keywords
  extractKeywords(message) {
    const keywords = [];
    const lowerMessage = message.toLowerCase();
    
    // Robot-related keywords
    if (lowerMessage.includes('robot') || lowerMessage.includes('روبوت')) keywords.push('robots');
    if (lowerMessage.includes('cleaning') || lowerMessage.includes('تنظيف')) keywords.push('cleaning');
    if (lowerMessage.includes('delivery') || lowerMessage.includes('توصيل')) keywords.push('delivery');
    if (lowerMessage.includes('service') || lowerMessage.includes('خدمة')) keywords.push('service');
    
    // Industry keywords
    if (lowerMessage.includes('hospital') || lowerMessage.includes('مستشفى')) keywords.push('healthcare');
    if (lowerMessage.includes('hotel') || lowerMessage.includes('فندق')) keywords.push('hospitality');
    if (lowerMessage.includes('event') || lowerMessage.includes('فعالية')) keywords.push('events');
    
    return keywords;
  }

  // Analyze needs
  analyzeNeeds(message) {
    const needs = [];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('need') || lowerMessage.includes('يحتاج') || lowerMessage.includes('أريد')) {
      needs.push('specific_requirements');
    }
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
      needs.push('pricing_information');
    }
    if (lowerMessage.includes('demo') || lowerMessage.includes('test') || lowerMessage.includes('عرض') || lowerMessage.includes('تجربة')) {
      needs.push('demonstration');
    }
    
    return needs;
  }

  // Generate Ali's response using Vertex AI
  async generateAliResponse(message, context, language, analysis) {
    try {
      // Create enhanced prompt
      const systemPrompt = this.getAliSystemPrompt(language);
      const contextPrompt = this.buildContextPrompt(context, analysis, language);
      const fullPrompt = `${systemPrompt}\n\n${contextPrompt}\n\nUser: ${message}\n\nAli:`;

      // Call Vertex AI
      const response = await this.callVertexAI(fullPrompt);
      
      // Parse response and add metadata
      return this.parseAliResponse(response, language, analysis, context);
      
    } catch (error) {
      console.error('Error generating Ali response:', error);
      return this.getFallbackResponse(language);
    }
  }

  // Get Ali's system prompt
  getAliSystemPrompt(language) {
    const basePrompt = language === 'ar' ? `
أنت علي، المستشار المتخصص في حلول الروبوتات والذكاء الاصطناعي لشركة معيار الذكاء.

هويتك:
- اسمك: علي
- منصبك: مستشار أول في حلول الروبوتات والذكاء الاصطناعي
- خبرتك: 15+ سنة في مجال الروبوتات الصناعية والذكاء الاصطناعي
- تخصصك: تحليل المرافق، تصميم الحلول، استشارات الذكاء الاصطناعي

معلومات الشركة:
- معيار الذكاء شركة سعودية بالكامل
- مملوكة ومدارة من قبل السعوديين
- مقرها: الرياض، المملكة العربية السعودية
- رؤيتنا: أن نكون الرائد في حلول الروبوتات والذكاء الاصطناعي في المملكة

مهمتك:
1. تحليل احتياجات العملاء ومرافقهم
2. تصميم حلول روبوتية مخصصة
3. تقديم استشارات متخصصة في الذكاء الاصطناعي
4. حساب العائد على الاستثمار
5. توجيه العملاء خلال عملية اتخاذ القرار

قدراتك:
- تحليل المرافق وتقديم توصيات محددة
- تصميم حلول للأحداث والفعاليات
- استشارات تقنية متقدمة
- حساب التكلفة والعائد على الاستثمار
- تخطيط التنفيذ والتدريب

شخصيتك:
- مهني ومتخصص
- استباقي ومبادر
- مفيد ومفصل
- واثق من خبرتك
- يركز على النتائج
` : `
You are Ali, the Senior Robotics and AI Solutions Consultant for INC Robotics.

Your Identity:
- Name: Ali
- Position: Senior Robotics and AI Solutions Consultant
- Experience: 15+ years in industrial robotics and AI
- Expertise: Facility analysis, solution design, AI consultation

Company Information:
- INC Robotics is a fully Saudi-owned company
- Founded and managed by Saudis
- Headquarters: Riyadh, Saudi Arabia
- Our Vision: To be the leading robotics and AI solutions provider in the Kingdom

Your Mission:
1. Analyze client needs and facilities
2. Design customized robotics solutions
3. Provide expert AI and robotics consultation
4. Calculate ROI and business value
5. Guide clients through decision-making process

Your Capabilities:
- Facility analysis with specific recommendations
- Event and occasion solution design
- Advanced technical consultation
- Cost and ROI calculations
- Implementation planning and training

Your Personality:
- Professional and expert
- Proactive and initiative-taking
- Helpful and detailed
- Confident in your expertise
- Results-focused
`;
    
    return basePrompt + this.getProductKnowledge(language) + this.getConsultationFramework(language);
  }

  // Get comprehensive product knowledge
  getProductKnowledge(language) {
    return language === 'ar' ? `

معرفتك بالمنتجات:

روبوتات الخدمة:
- نوفا: روبوت الضيافة الذكي مع شاشة 36 سم عالية الدقة، دقة التعرف على الكلام 97%+، معالج كوالكوم ثماني النواة، كاميرات مزدوجة 13 ميجابكسل، بطارية 12 ساعة مع شحن تلقائي، تشغيل 24/7، دعم 31+ لغة
- لوكي بوت: روبوت الخدمة الترحيبي مع ذكاء اصطناعي متقدم وتعلم آلة، تفاعل الإنسان مع الروبوت، أنظمة سلوك تكيفية
- لوكي برو: خدمات VIP متميزة للبيئات الفاخرة، إدارة صالات VIP، خدمة عملاء متميزة
- ميني: روبوت تعليمي للمدارس ومراكز التدريب، تصميم مدمج، قدرات نشر المشاريع والعروض التقديمية
- أوتودور: إدارة الأبواب الآلية ونشر الفعاليات، تكامل الأمان، إدارة الفعاليات

روبوتات التنظيف:
- 50 برو: تنظيف شركاتي متخصص للمرافق الشركاتية والمصرفية، تنظيف عالي الكفاءة مع ملاحة دقيقة، قدرات تنظيف متعددة الأسطح
- 75: تنظيف خارجي ومستودعات مقاوم للطقس، قدرات تنظيف ثقيلة، تشغيل مقاوم للطقس
- فانتاس: تنظيف متخصص للسينما والبيئات الحساسة، تشغيل هادئ، ملاحة متقدمة للتخطيطات المعقدة
- فاكيوم 40: مكنسة كهربائية عالية الكفاءة، تصميم مدمج، قدرات شفط متقدمة
- أومني: تنظيف متعدد الأسطح مع قدرات تكيفية، تنظيف تكيفي لأنواع الأرضيات المختلفة، جدولة ذكية

روبوتات اللوجستيات:
- سلسلة فولا: معالجة المواد (BN-2001, DN-1416, QN-1416, PN1530, QN2030)
- سلسلة إيما: لوجستيات متعددة السعة (400K, 400L, 600K, 600L, 1000K, 1500K, 1500L)
- سلسلة أومني: صناعي ثقيل (1.5T, 2.5T, 3.5T, 5T)
- سلسلة لونا: حلول عالية السعة (5T, 20T, 30T)
- كاري بوت: حلول نقل المواد المتخصصة
- مورا: معالجة لوجستية متخصصة

العملاء الكبار:
- أرامكو: حلول لوجستية صناعية وتنظيف
- ساب (البنك السعودي): روبوتات خدمة مصرفية وتنظيف مرافق
- الشركة السعودية للكهرباء: روبوتات خدمة وصيانة شركاتية
- جامعة الملك سعود: روبوتات تعليمية وتنظيف الحرم الجامعي
- جامعة الجوف: حلول خدمة وتنظيف جامعية
- إرنست آند يونغ: روبوتات خدمة شركاتية
- صندوق التنمية العقارية: أتمتة المنطقة المالية
- هيئة تنمية الموارد البشرية: أتمتة المرافق الحكومية

` : `

Your Product Knowledge:

Service Robots:
- NOVA: AI-powered hospitality with 36cm HD display, 97%+ speech recognition, Qualcomm Octa-Core CPU, dual 13MP cameras, 12-hour battery with auto-charging, 24/7 operation, 31+ languages support
- LuckiBot: Welcoming service with advanced AI and machine learning, human-robot interaction, adaptive behavior systems
- LuckiPro: Premium VIP services for luxury environments, VIP lounge management, premium customer service features
- Mini: Educational robot for schools and training centers, compact design, project publishing and presentation capabilities
- Autodoor: Automated door management and event publishing, security integration, event management features

Cleaning Robots:
- 50 Pro: Corporate cleaning specialized for corporate and banking facilities, high-efficiency cleaning with precision navigation, multi-surface cleaning capabilities
- 75: Outdoor and warehouse cleaning with weather resistance, heavy-duty cleaning capabilities, weather-resistant operation
- Phantas: Cinema and specialized cleaning for sensitive environments, quiet operation, advanced navigation for complex layouts
- Vacum 40: High-efficiency vacuum for various spaces, compact design, advanced suction capabilities
- Omnie: Multi-surface cleaning with adaptive capabilities, adaptive cleaning for different floor types, smart scheduling

Logistics Robots:
- FOLA Series: Material handling (BN-2001, DN-1416, QN-1416, PN1530, QN2030)
- EMMA Series: Multi-capacity logistics (400K, 400L, 600K, 600L, 1000K, 1500K, 1500L)
- OMNI Series: Heavy-duty industrial (1.5T, 2.5T, 3.5T, 5T)
- LUNA Series: High-capacity solutions (5T, 20T, 30T)
- CarryBot: Specialized material transport solutions
- Mora: Specialized logistics handling

Major Clients:
- Aramco: Industrial logistics and cleaning solutions
- SAB (Saudi Arabian Bank): Banking service robots and facility cleaning
- SEC (Saudi Electricity Company): Corporate service and maintenance robots
- King Saud University: Educational robots and campus cleaning
- Aljouf University: University service and cleaning solutions
- EY (Ernst & Young): Corporate service robots
- KAFD (King Abdullah Financial District): Financial district automation
- HRDA (Human Resources Development Authority): Government facility automation

`;
  }

  // Get consultation framework
  getConsultationFramework(language) {
    return language === 'ar' ? `

إطار الاستشارة:
1. تقييم الاحتياجات الحالية
2. تحليل المرافق والتحديات
3. تصميم الحلول المناسبة
4. حساب التكلفة والعائد
5. تخطيط التنفيذ والتدريب

` : `

Consultation Framework:
1. Assess current needs
2. Analyze facilities and challenges
3. Design appropriate solutions
4. Calculate costs and ROI
5. Plan implementation and training

`;
  }

  // Build context prompt
  buildContextPrompt(context, analysis, language) {
    let contextInfo = '';
    
    if (context.clientType !== 'unknown') {
      contextInfo += language === 'ar' 
        ? `نوع العميل: ${context.clientType}\n`
        : `Client Type: ${context.clientType}\n`;
    }
    
    if (analysis.keywords.length > 0) {
      contextInfo += language === 'ar'
        ? `الكلمات المفتاحية: ${analysis.keywords.join(', ')}\n`
        : `Keywords: ${analysis.keywords.join(', ')}\n`;
    }
    
    return contextInfo;
  }

  // Call Vertex AI API
  async callVertexAI(prompt, language) {
    if (vertexAI) {
      try {
        console.log('🤖 Calling real Vertex AI...');
        
        // Use actual Vertex AI API
        const { PredictionServiceClient } = require('@google-cloud/aiplatform');
        const predictionServiceClient = new PredictionServiceClient();
        
        const projectId = 'website-backend-server';
        const location = 'us-central1';
        const modelId = 'text-bison@001';
        const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${modelId}`;
        
        const request = {
          endpoint: endpoint,
          instances: [{
            content: prompt
          }],
          parameters: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.8,
            topK: 40
          }
        };
        
        const [response] = await predictionServiceClient.predict(request);
        const prediction = response.predictions[0];
        
        if (prediction && prediction.content) {
          console.log('✅ Vertex AI response received');
          return prediction.content;
        } else {
          throw new Error('No content in Vertex AI response');
        }
        
      } catch (error) {
        console.log('⚠️ Vertex AI call failed:', error.message);
        throw error;
      }
    } else {
      console.log('⚠️ Vertex AI not initialized');
      throw new Error('Vertex AI not available');
    }
  }
    
    if (prompt.includes('warehouse') || prompt.includes('logistics') || prompt.includes('مستودع') || prompt.includes('لوجستيات')) {
      return "For warehouse and logistics operations, I recommend our EMMA series for multi-capacity logistics and our LUNA series for high-capacity solutions. EMMA handles 400kg-1500kg loads with compact and large platform options, while LUNA manages 5-30 ton operations for massive projects. Our logistics clients see 55% reduction in handling time and 45% improvement in accuracy. The ROI typically pays for itself within 3-5 months. What's your current warehouse capacity and material flow?";
    }
    
    if (prompt.includes('manufacturing') || prompt.includes('factory') || prompt.includes('مصنع') || prompt.includes('تصنيع')) {
      return "For manufacturing facilities, I recommend our FOLA series for material handling and our EMMA series for logistics operations. FOLA handles light to heavy-duty material transport (2-20 tons), while EMMA provides multi-capacity logistics solutions (400kg-1500kg). Our manufacturing clients like Aramco see 60% reduction in material handling time and 50% improvement in operational efficiency. The ROI typically pays for itself within 4-6 months. Which manufacturing operations need automation?";
    }
    
    if (prompt.includes('hospital') || prompt.includes('healthcare') || prompt.includes('مستشفى') || prompt.includes('صحة')) {
      return "For healthcare facilities, I recommend our NOVA service robot for patient assistance and our 50 Pro cleaning robot for facility maintenance. NOVA provides 24/7 patient interaction with 97%+ speech recognition and multi-language support, while 50 Pro ensures sterile environments with precision cleaning. Our healthcare clients like King Saud University see 40% reduction in operational costs and 60% improvement in patient satisfaction. The ROI typically pays for itself within 6-8 months. Would you like a detailed healthcare solution proposal?";
    }
    
    if (prompt.includes('hotel') || prompt.includes('hospitality') || prompt.includes('فندق') || prompt.includes('ضيافة')) {
      return "For hospitality venues, I recommend our NOVA service robot for guest interaction and our Omnie cleaning robot for facility maintenance. NOVA provides 24/7 guest services with 36cm HD display and 31+ language support, while Omnie handles multi-surface cleaning with adaptive capabilities. Our hospitality clients see 50% reduction in staff workload and 35% improvement in guest satisfaction. The ROI typically pays for itself within 8-12 months with 45% cost savings. Shall I provide a detailed hospitality solution proposal?";
    }
    
    if (prompt.includes('event') || prompt.includes('فعالية') || prompt.includes('مناسبة')) {
      return "For events and occasions, I suggest our NOVA service robot for guest interaction and our Phantas cleaning robot for venue maintenance. NOVA provides dynamic promotion and intelligent Q&A capabilities, while Phantas ensures quiet operation for sensitive environments. We provide complete event robotics solutions with setup, operation, and breakdown services. Our event clients see 70% reduction in manual labor and 80% improvement in guest engagement. What type of event are you planning?";
    }
    
    if (prompt.includes('school') || prompt.includes('university') || prompt.includes('education') || prompt.includes('مدرسة') || prompt.includes('جامعة') || prompt.includes('تعليم')) {
      return "For educational facilities, I recommend our Mini educational robot for student interaction and our 50 Pro cleaning robot for campus maintenance. Mini provides project publishing and presentation capabilities, while 50 Pro ensures clean learning environments. Our education clients like King Saud University and Aljouf University see 65% improvement in student engagement and 40% reduction in maintenance costs. The ROI typically pays for itself within 6-10 months. What educational programs need robotic support?";
    }
    
    // Check if it's a company inquiry (ONLY if no specific facility mentioned)
    if (prompt.includes('company') || prompt.includes('owner') || prompt.includes('founder') || prompt.includes('saudi') || prompt.includes('شركة') || prompt.includes('مالك') || prompt.includes('مؤسس') || prompt.includes('سعودي')) {
      if (prompt.includes('owner') || prompt.includes('founder') || prompt.includes('مالك') || prompt.includes('مؤسس') || prompt.includes('علي الحربي')) {
        // Only mention founder when specifically asked
        if (prompt.includes('مرحباً') || prompt.includes('أهلاً') || prompt.includes('السلام عليكم')) {
          return "مرحباً! مؤسس شركة معيار الذكاء هو علي الحربي. نحن شركة سعودية بالكامل ومقرنا في الرياض. كيف يمكنني مساعدتك اليوم؟";
        } else {
          return "The founder of INC Robotics is Ali Alharbi. We are a fully Saudi-owned company headquartered in Riyadh. How can I assist you today?";
        }
      } else {
        // General company info without mentioning founder
        if (prompt.includes('مرحباً') || prompt.includes('أهلاً') || prompt.includes('السلام عليكم')) {
          return "مرحباً! أنا فخور أن أكون جزءاً من معيار الذكاء، الشركة السعودية الرائدة في مجال الروبوتات والذكاء الاصطناعي. مقرنا في الرياض. كيف يمكنني مساعدتك اليوم؟";
        } else {
          return "I'm proud to be part of INC Robotics, the leading Saudi company in robotics and AI solutions. We are headquartered in Riyadh. How can I assist you today?";
        }
      }
    }
    
    // Generate contextual responses based on keywords
    if (prompt.includes('hospital') || prompt.includes('healthcare') || prompt.includes('مستشفى') || prompt.includes('صحة')) {
      return "For healthcare facilities, I recommend our NOVA service robot for patient assistance and our 50 Pro cleaning robot for facility maintenance. NOVA provides 24/7 patient interaction with 97%+ speech recognition and multi-language support, while 50 Pro ensures sterile environments with precision cleaning. Our healthcare clients like King Saud University see 40% reduction in operational costs and 60% improvement in patient satisfaction. The ROI typically pays for itself within 6-8 months. Would you like a detailed healthcare solution proposal?";
    }
    
    if (prompt.includes('hotel') || prompt.includes('hospitality') || prompt.includes('فندق') || prompt.includes('ضيافة')) {
      return "For hospitality venues, I recommend our NOVA service robot for guest interaction and our Omnie cleaning robot for facility maintenance. NOVA provides 24/7 guest services with 36cm HD display and 31+ language support, while Omnie handles multi-surface cleaning with adaptive capabilities. Our hospitality clients see 50% reduction in staff workload and 35% improvement in guest satisfaction. The ROI typically pays for itself within 8-12 months with 45% cost savings. Shall I provide a detailed hospitality solution proposal?";
    }
    
    if (prompt.includes('event') || prompt.includes('فعالية') || prompt.includes('مناسبة')) {
      return "For events and occasions, I suggest our NOVA service robot for guest interaction and our Phantas cleaning robot for venue maintenance. NOVA provides dynamic promotion and intelligent Q&A capabilities, while Phantas ensures quiet operation for sensitive environments. We provide complete event robotics solutions with setup, operation, and breakdown services. Our event clients see 70% reduction in manual labor and 80% improvement in guest engagement. What type of event are you planning?";
    }
    
    if (prompt.includes('school') || prompt.includes('university') || prompt.includes('education') || prompt.includes('مدرسة') || prompt.includes('جامعة') || prompt.includes('تعليم')) {
      return "For educational facilities, I recommend our Mini educational robot for student interaction and our 50 Pro cleaning robot for campus maintenance. Mini provides project publishing and presentation capabilities, while 50 Pro ensures clean learning environments. Our education clients like King Saud University and Aljouf University see 65% improvement in student engagement and 40% reduction in maintenance costs. The ROI typically pays for itself within 6-10 months. What educational programs need robotic support?";
    }
    
    if (prompt.includes('manufacturing') || prompt.includes('factory') || prompt.includes('مصنع') || prompt.includes('تصنيع')) {
      return "For manufacturing facilities, I recommend our FOLA series for material handling and our EMMA series for logistics operations. FOLA handles light to heavy-duty material transport (2-20 tons), while EMMA provides multi-capacity logistics solutions (400kg-1500kg). Our manufacturing clients like Aramco see 60% reduction in material handling time and 50% improvement in operational efficiency. The ROI typically pays for itself within 4-6 months. Which manufacturing operations need automation?";
    }
    
    if (prompt.includes('warehouse') || prompt.includes('logistics') || prompt.includes('مستودع') || prompt.includes('لوجستيات')) {
      return "For warehouse and logistics operations, I recommend our EMMA series for multi-capacity logistics and our LUNA series for high-capacity solutions. EMMA handles 400kg-1500kg loads with compact and large platform options, while LUNA manages 5-30 ton operations for massive projects. Our logistics clients see 55% reduction in handling time and 45% improvement in accuracy. The ROI typically pays for itself within 3-5 months. What's your current warehouse capacity and material flow?";
    }
    
    if (prompt.includes('education') || prompt.includes('school') || prompt.includes('university') || prompt.includes('مدرسة') || prompt.includes('جامعة')) {
      return "For educational facilities, I recommend our Mini educational robot for student interaction and our 50 Pro cleaning robot for campus maintenance. Mini provides project publishing and presentation capabilities, while 50 Pro ensures clean learning environments. Our education clients like King Saud University and Aljouf University see 65% improvement in student engagement and 40% reduction in maintenance costs. The ROI typically pays for itself within 6-10 months. What educational programs need robotic support?";
    }
    
    if (prompt.includes('banking') || prompt.includes('corporate') || prompt.includes('مصرفي') || prompt.includes('شركاتي')) {
      return "For banking and corporate facilities, I recommend our NOVA service robot for customer interaction and our 50 Pro cleaning robot for facility maintenance. NOVA provides 24/7 customer service with multi-language support, while 50 Pro ensures professional cleaning standards. Our banking clients like SAB see 50% reduction in wait times and 40% improvement in customer satisfaction. The ROI typically pays for itself within 7-9 months. What corporate services need automation?";
    }
    
    if (prompt.includes('robot') || prompt.includes('روبوت') || prompt.includes('cleaning') || prompt.includes('تنظيف')) {
      return "We offer a comprehensive range of robotics solutions: NOVA for AI-powered hospitality, LuckiBot for welcoming services, 50 Pro for corporate cleaning, FOLA series for material handling, and specialized robots for different industries. Each is designed for maximum efficiency with proven ROI. Our clients include Aramco, SAB, SEC, and major universities. Which application interests you most?";
    }
    
    return "I understand your needs. Let me provide you with a comprehensive robotics solution analysis tailored to your specific requirements. Could you tell me more about your facility type and main challenges?";
  }

  // Parse Ali's response and add metadata
  parseAliResponse(response, language, analysis, context) {
    // Check if the response already contains specific recommendations (from mock responses)
    let recommendations = null;
    let followUpQuestions = null;
    let suggestedActions = null;

    // If the response contains specific product recommendations, extract them
    if (response.includes('NOVA service robot') || response.includes('50 Pro cleaning robot') || 
        response.includes('FOLA series') || response.includes('EMMA series')) {
      // Extract recommendations from the response content
      recommendations = this.extractRecommendationsFromResponse(response, analysis, language);
      followUpQuestions = this.extractFollowUpQuestionsFromResponse(response, language);
      suggestedActions = this.extractSuggestedActionsFromResponse(response, language);
    } else {
      // Generate recommendations based on analysis for generic responses
      recommendations = this.generateRecommendations(analysis, context, language);
      followUpQuestions = this.generateFollowUpQuestions(analysis, language);
      suggestedActions = this.generateSuggestedActions(analysis, language);
    }

    return {
      message: response,
      language,
      confidence: 0.9,
      consultationType: analysis.consultationType,
      suggestedActions,
      recommendations,
      followUpQuestions
    };
  }

  // Extract recommendations from response content
  extractRecommendationsFromResponse(response, analysis, language) {
    const recommendations = {
      robots: [],
      reasoning: '',
      implementation: '',
      roi: ''
    };

    // Extract robots mentioned in response
    if (response.includes('NOVA service robot') || response.includes('NOVA')) {
      recommendations.robots.push('NOVA Service Robot');
    }
    if (response.includes('50 Pro cleaning robot') || response.includes('50 Pro')) {
      recommendations.robots.push('50 Pro Cleaning Robot');
    }
    if (response.includes('Omnie cleaning robot') || response.includes('Omnie')) {
      recommendations.robots.push('Omnie Cleaning Robot');
    }
    if (response.includes('Phantas cleaning robot') || response.includes('Phantas')) {
      recommendations.robots.push('Phantas Cleaning Robot');
    }
    if (response.includes('FOLA series') || response.includes('FOLA')) {
      recommendations.robots.push('FOLA Series');
    }
    if (response.includes('EMMA series') || response.includes('EMMA')) {
      recommendations.robots.push('EMMA Series');
    }
    if (response.includes('LUNA series') || response.includes('LUNA')) {
      recommendations.robots.push('LUNA Series');
    }

    // Extract reasoning from response
    if (response.includes('97%+ speech recognition')) {
      recommendations.reasoning = language === 'ar' 
        ? 'نوفا يوفر تفاعل 24/7 مع المرضى بدقة 97%+ في التعرف على الكلام'
        : 'NOVA provides 24/7 patient interaction with 97%+ speech recognition and multi-language support';
    } else if (response.includes('36cm HD display')) {
      recommendations.reasoning = language === 'ar'
        ? 'نوفا يوفر خدمات الضيوف 24/7 بشاشة 36 سم عالية الدقة ودعم 31+ لغة'
        : 'NOVA provides 24/7 guest services with 36cm HD display and 31+ language support';
    } else if (response.includes('material transport')) {
      recommendations.reasoning = language === 'ar'
        ? 'سلسلة فولا تتعامل مع نقل المواد من 2-20 طن'
        : 'FOLA series handles material transport from 2-20 tons';
    }

    // Extract implementation details
    if (response.includes('installation') || response.includes('تركيب')) {
      recommendations.implementation = language === 'ar'
        ? 'تركيب متخصص، تدريب الفريق، تكامل مع الأنظمة'
        : 'Specialized installation, team training, system integration';
    }

    // Extract ROI information
    if (response.includes('40% reduction') || response.includes('50% reduction') || response.includes('60% reduction')) {
      const reductionMatch = response.match(/(\d+)% reduction/);
      if (reductionMatch) {
        const percentage = reductionMatch[1];
        recommendations.roi = language === 'ar'
          ? `${percentage}% تقليل في التكاليف التشغيلية، استرداد الاستثمار خلال 6-8 أشهر`
          : `${percentage}% reduction in operational costs, payback within 6-8 months`;
      }
    }

    return recommendations;
  }

  // Extract follow-up questions from response
  extractFollowUpQuestionsFromResponse(response, language) {
    const questions = [];
    
    if (response.includes('What is the size') || response.includes('ما هو حجم')) {
      questions.push(language === 'ar' ? 'ما هو حجم منشأتك؟' : 'What is the size of your facility?');
    }
    if (response.includes('What type of event') || response.includes('أي نوع من الفعاليات')) {
      questions.push(language === 'ar' ? 'أي نوع من الفعاليات تخطط لها؟' : 'What type of event are you planning?');
    }
    if (response.includes('Would you like') || response.includes('هل تريد')) {
      questions.push(language === 'ar' ? 'هل تريد جدولة عرض توضيحي؟' : 'Would you like to schedule a demo?');
    }
    
    return questions.length > 0 ? questions : null;
  }

  // Extract suggested actions from response
  extractSuggestedActionsFromResponse(response, language) {
    const actions = [];
    
    if (response.includes('proposal') || response.includes('اقتراح')) {
      actions.push(language === 'ar' ? 'طلب اقتراح مفصل' : 'Request detailed proposal');
    }
    if (response.includes('demo') || response.includes('عرض')) {
      actions.push(language === 'ar' ? 'جدولة عرض توضيحي' : 'Schedule demo');
    }
    if (response.includes('analysis') || response.includes('تحليل')) {
      actions.push(language === 'ar' ? 'طلب تحليل مفصل' : 'Request detailed analysis');
    }
    
    return actions.length > 0 ? actions : null;
  }

  // Generate robot recommendations
  generateRecommendations(analysis, context, language) {
    const recommendations = {
      robots: [],
      reasoning: '',
      implementation: '',
      roi: ''
    };

    if (analysis.clientType === 'healthcare') {
      recommendations.robots = ['NOVA Service Robot', '50 Pro Cleaning Robot'];
      recommendations.reasoning = language === 'ar' 
        ? 'نوفا يوفر تفاعل 24/7 مع المرضى بدقة 97%+ في التعرف على الكلام، بينما 50 برو يضمن بيئات معقمة مع تنظيف دقيق متخصص للمرافق الطبية'
        : 'NOVA provides 24/7 patient interaction with 97%+ speech recognition and multi-language support, while 50 Pro ensures sterile environments with precision cleaning specialized for medical facilities';
      recommendations.implementation = language === 'ar'
        ? 'التنفيذ: تركيب نوفا في مناطق الاستقبال والطوارئ، 50 برو للتنظيف الليلي، تدريب الفريق الطبي، مراقبة الأداء'
        : 'Implementation: NOVA installation in reception and emergency areas, 50 Pro for night cleaning, medical staff training, performance monitoring';
      recommendations.roi = language === 'ar'
        ? 'العائد على الاستثمار: 40% تقليل في التكاليف التشغيلية، 60% تحسن في رضا المرضى، استرداد الاستثمار خلال 6-8 أشهر'
        : 'ROI: 40% reduction in operational costs, 60% improvement in patient satisfaction, payback within 6-8 months';
    } else if (analysis.clientType === 'hospitality') {
      recommendations.robots = ['NOVA Service Robot', 'Omnie Cleaning Robot'];
      recommendations.reasoning = language === 'ar'
        ? 'نوفا يوفر خدمات الضيوف 24/7 بشاشة 36 سم عالية الدقة ودعم 31+ لغة، بينما أومني يتعامل مع التنظيف متعدد الأسطح مع قدرات تكيفية'
        : 'NOVA provides 24/7 guest services with 36cm HD display and 31+ language support, while Omnie handles multi-surface cleaning with adaptive capabilities';
      recommendations.implementation = language === 'ar'
        ? 'التنفيذ: تركيب نوفا في اللوبي والمناطق العامة، أومني للتنظيف اليومي، تدريب فريق الضيافة، تكامل مع أنظمة الفندق'
        : 'Implementation: NOVA installation in lobby and common areas, Omnie for daily cleaning, hospitality staff training, hotel system integration';
      recommendations.roi = language === 'ar'
        ? 'العائد على الاستثمار: 50% تقليل في عبء العمل، 35% تحسن في رضا الضيوف، 45% توفير في التكاليف، استرداد خلال 8-12 شهر'
        : 'ROI: 50% reduction in staff workload, 35% improvement in guest satisfaction, 45% cost savings, payback within 8-12 months';
    } else if (analysis.clientType === 'manufacturing') {
      recommendations.robots = ['FOLA Series (BN-2001)', 'EMMA Series (600K)'];
      recommendations.reasoning = language === 'ar'
        ? 'سلسلة فولا تتعامل مع نقل المواد من 2-20 طن، بينما سلسلة إيما توفر حلول لوجستية متعددة السعة من 400-1500 كيلو'
        : 'FOLA series handles material transport from 2-20 tons, while EMMA series provides multi-capacity logistics solutions from 400-1500kg';
      recommendations.implementation = language === 'ar'
        ? 'التنفيذ: تحليل خطوط الإنتاج، تركيب روبوتات النقل، تكامل مع أنظمة التصنيع، تدريب المشغلين'
        : 'Implementation: Production line analysis, transport robot installation, manufacturing system integration, operator training';
      recommendations.roi = language === 'ar'
        ? 'العائد على الاستثمار: 60% تقليل في وقت معالجة المواد، 50% تحسن في الكفاءة التشغيلية، استرداد خلال 4-6 أشهر'
        : 'ROI: 60% reduction in material handling time, 50% improvement in operational efficiency, payback within 4-6 months';
    } else {
      recommendations.robots = ['NOVA Service Robot', '50 Pro Cleaning Robot', 'FOLA Series'];
      recommendations.reasoning = language === 'ar'
        ? 'مجموعة شاملة من الحلول الروبوتية: نوفا للخدمات الذكية، 50 برو للتنظيف المتخصص، فولا للنقل واللوجستيات'
        : 'Comprehensive range of robotics solutions: NOVA for intelligent services, 50 Pro for specialized cleaning, FOLA for transport and logistics';
      recommendations.implementation = language === 'ar'
        ? 'التنفيذ: تحليل احتياجات المرافق، تصميم حلول مخصصة، تركيب متدرج، تدريب شامل، دعم مستمر'
        : 'Implementation: Facility needs analysis, custom solution design, phased installation, comprehensive training, ongoing support';
      recommendations.roi = language === 'ar'
        ? 'العائد على الاستثمار: 45% تقليل في التكاليف التشغيلية، 55% تحسن في الكفاءة، استرداد خلال 6-10 أشهر'
        : 'ROI: 45% reduction in operational costs, 55% improvement in efficiency, payback within 6-10 months';
    }

    return recommendations;
  }

  // Generate follow-up questions
  generateFollowUpQuestions(analysis, language) {
    const questions = [];
    
    if (analysis.consultationType === 'facility_analysis') {
      questions.push(
        language === 'ar' ? 'ما هو حجم مرافقك؟' : 'What is the size of your facility?',
        language === 'ar' ? 'ما هي التحديات الرئيسية التي تواجهها؟' : 'What are the main challenges you face?'
      );
    } else if (analysis.consultationType === 'event_planning') {
      questions.push(
        language === 'ar' ? 'ما نوع الفعالية التي تخطط لها؟' : 'What type of event are you planning?',
        language === 'ar' ? 'كم عدد الضيوف المتوقعين؟' : 'How many guests are you expecting?'
      );
    } else {
      questions.push(
        language === 'ar' ? 'هل تريد معرفة المزيد عن التكلفة؟' : 'Would you like to know more about pricing?',
        language === 'ar' ? 'هل تريد جدولة عرض توضيحي؟' : 'Would you like to schedule a demo?'
      );
    }
    
    return questions;
  }

  // Generate suggested actions
  generateSuggestedActions(analysis, language) {
    const actions = [];
    
    if (analysis.consultationType === 'facility_analysis') {
      actions.push(
        language === 'ar' ? 'جدولة زيارة ميدانية' : 'Schedule site visit',
        language === 'ar' ? 'طلب عرض توضيحي' : 'Request demo'
      );
    } else if (analysis.consultationType === 'event_planning') {
      actions.push(
        language === 'ar' ? 'تخطيط الفعالية' : 'Plan event',
        language === 'ar' ? 'حجز الروبوتات' : 'Book robots'
      );
    } else if (analysis.consultationType === 'company_inquiry') {
      actions.push(
        language === 'ar' ? 'معرفة المزيد عن الشركة' : 'Learn more about the company',
        language === 'ar' ? 'التواصل مع الفريق' : 'Contact our team'
      );
    }
    
    actions.push(
      language === 'ar' ? 'التواصل مع المبيعات' : 'Contact sales',
      language === 'ar' ? 'طلب عرض سعر' : 'Request quote'
    );
    
    return actions;
  }

  // Update conversation history
  updateConversationHistory(conversationId, userMessage, aiMessage) {
    const context = this.getConversationContext(conversationId);
    context.messages.push(
      { role: 'user', content: userMessage },
      { role: 'assistant', content: aiMessage }
    );
    
    // Keep only last 20 messages
    if (context.messages.length > 20) {
      context.messages = context.messages.slice(-20);
    }
  }

  // Get fallback response
  getFallbackResponse(language) {
    return {
      message: language === 'ar' 
        ? 'مرحباً! أنا علي، مستشارك في حلول الروبوتات والذكاء الاصطناعي من معيار الذكاء. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m Ali, your robotics and AI solutions consultant from INC Robotics. How can I help you today?',
      language,
      confidence: 0.8,
      consultationType: 'general_inquiry',
      suggestedActions: ['start_consultation']
    };
  }
}

module.exports = new AliAIService();
