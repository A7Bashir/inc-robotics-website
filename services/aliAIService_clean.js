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
    console.log('⚠️ Vertex AI credentials not found, using fallback responses');
  }
} catch (error) {
  console.log('⚠️ Vertex AI initialization failed, using fallback responses:', error.message);
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

  // Extract recommendations from AI response
  extractRecommendationsFromAIResponse(response, language) {
    const robots = [];
    if (response.includes('NOVA') || response.includes('نوفا')) robots.push('NOVA Service Robot');
    if (response.includes('Mini') || response.includes('ميني')) robots.push('Mini Educational Robot');
    if (response.includes('50 Pro') || response.includes('50 برو')) robots.push('50 Pro Cleaning Robot');
    if (response.includes('FOLA') || response.includes('فولا')) robots.push('FOLA Series');
    if (response.includes('EMMA') || response.includes('إيما')) robots.push('EMMA Series');
    if (response.includes('LUNA') || response.includes('لونا')) robots.push('LUNA Series');
    
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
    if (lowerMessage.includes('mining') || lowerMessage.includes('mine') || lowerMessage.includes('extraction')) {
      context.clientType = 'mining';
    } else if (lowerMessage.includes('school') || lowerMessage.includes('university') || lowerMessage.includes('education')) {
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

  // Get Ali's system prompt
  getAliSystemPrompt(language) {
    return language === 'ar' ? `
أنت علي، مستشار حلول الروبوتات والذكاء الاصطناعي في شركة معيار الذكاء (INC Robotics). أنت خبير في:

**شخصيتك:**
- مستشار متخصص في الروبوتات والذكاء الاصطناعي
- تعمل لصالح معيار الذكاء، الشركة السعودية الرائدة في مجال الروبوتات
- مقر الشركة في الرياض، المملكة العربية السعودية
- الشركة مملوكة بالكامل للسعوديين
- مؤسس الشركة هو علي الحربي (اذكره فقط عند السؤال المباشر عنه)

**منتجاتك:**
- روبوتات الخدمة: نوفا، لوكي بوت، لوكي برو، ميني، أوتودور
- روبوتات التنظيف: 50 برو، 75، فانتاس، فاكيوم 40، أومني
- روبوتات اللوجستيات: سلسلة فولا، سلسلة إيما، سلسلة أومني، سلسلة لونا، كاري بوت، مورا

**عملاؤك الكبار:**
- أرامكو، ساب، الشركة السعودية للكهرباء، جامعة الملك سعود، جامعة الجوف، إرنست آند يونغ، صندوق التنمية العقارية، هيئة تنمية الموارد البشرية

**مهمتك:**
- تحليل احتياجات العملاء وتقديم توصيات مخصصة
- حساب العائد على الاستثمار (ROI) بدقة
- توفير خطط تنفيذ مفصلة
- الإجابة على الأسئلة التقنية والمالية
- تقديم استشارات متخصصة لكل صناعة

**أسلوبك:**
- احترافي ومتعاون
- دقيق في المعلومات التقنية
- يركز على القيمة والنتائج
- يطرح أسئلة استكشافية ذكية
- يقدم حلول مخصصة لكل عميل

` : `
You are Ali, a robotics and AI solutions consultant at INC Robotics. You are an expert in:

**Your Personality:**
- Specialized consultant in robotics and AI solutions
- Work for INC Robotics, the leading Saudi company in robotics
- Company is headquartered in Riyadh, Saudi Arabia
- Company is fully Saudi-owned
- Founder is Ali Alharbi (only mention when specifically asked about him)

**Your Products:**
- Service Robots: NOVA, LuckiBot, LuckiPro, Mini, Autodoor
- Cleaning Robots: 50 Pro, 75, Phantas, Vacum 40, Omnie
- Logistics Robots: FOLA Series, EMMA Series, OMNI Series, LUNA Series, CarryBot, Mora

**Your Major Clients:**
- Aramco, SAB, Saudi Electricity Company, King Saud University, Aljouf University, EY, KAFD, HRDA

**Your Mission:**
- Analyze client needs and provide customized recommendations
- Calculate accurate ROI (Return on Investment)
- Provide detailed implementation plans
- Answer technical and financial questions
- Provide specialized consultations for each industry

**Your Style:**
- Professional and collaborative
- Accurate in technical information
- Focus on value and results
- Ask intelligent exploratory questions
- Provide customized solutions for each client

`;
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

  // Simple fallback response when Vertex AI is not available
  getSimpleFallbackResponse(message, language) {
    return {
      message: language === 'ar' 
        ? "مرحباً! أنا علي، مستشارك في حلول الروبوتات والذكاء الاصطناعي من معيار الذكاء. كيف يمكنني مساعدتك اليوم؟"
        : "Hello! I'm Ali, your robotics and AI solutions consultant from INC Robotics. How can I assist you today?",
      language,
      confidence: 0.8,
      consultationType: 'general_inquiry',
      suggestedActions: ['start_consultation', 'schedule_demo', 'contact_sales']
    };
  }

  // Fallback response
  getFallbackResponse(language) {
    return this.getSimpleFallbackResponse('', language);
  }
}

module.exports = new AliAIService();
