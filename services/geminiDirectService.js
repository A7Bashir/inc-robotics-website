const fetch = require('node-fetch');

class GeminiDirectService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    this.conversationHistory = new Map();
    console.log('🔑 Gemini API Key loaded:', this.apiKey ? 'YES' : 'NO');
    console.log('🔑 API Key value:', this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'undefined');
  }

  async processMessage(message, language = 'en', conversationId = 'default') {
    try {
      if (!this.apiKey) {
        console.log('⚠️ Gemini API key not found, using fallback');
        return this.getFallbackResponse(language);
      }

      // Get conversation history
      const history = this.getConversationHistory(conversationId);
      
      // Build context prompt
      const contextPrompt = this.buildContextPrompt(history, language);
      const fullPrompt = `${contextPrompt}\n\nUser: ${message}\n\nAli:`;

      // Call Gemini API directly
      const response = await this.callGeminiAPI(fullPrompt);
      
      // Update conversation history
      this.updateConversationHistory(conversationId, message, 'user');
      this.updateConversationHistory(conversationId, response, 'assistant');

      return this.parseResponse(response, language);

    } catch (error) {
      console.error('Error in Gemini Direct Service:', error);
      return this.getFallbackResponse(language);
    }
  }

  async callGeminiAPI(prompt) {
    try {
      const url = `${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
      
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 2048
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle different response structures
      let text = null;
      
      // Try different response structures
      if (data.candidates && data.candidates[0]) {
        const candidate = data.candidates[0];
        
        // Structure 1: content.parts[0].text
        if (candidate.content && candidate.content.parts && candidate.content.parts[0] && candidate.content.parts[0].text) {
          text = candidate.content.parts[0].text;
        }
        // Structure 2: text directly in candidate
        else if (candidate.text) {
          text = candidate.text;
        }
        // Structure 3: content.text
        else if (candidate.content && candidate.content.text) {
          text = candidate.content.text;
        }
      }
      
      if (text) {
        return text;
      } else {
        console.error('Gemini API response structure:', JSON.stringify(data, null, 2));
        throw new Error('No content in Gemini response');
      }

    } catch (error) {
      console.error('Gemini API call failed:', error);
      throw error;
    }
  }

  buildContextPrompt(history, language) {
    const systemPrompt = language === 'ar' ? `
أنت علي، مستشار حلول الروبوتات والذكاء الاصطناعي في شركة معيار الذكاء (INC Robotics). أنت خبير في:

**شخصيتك:**
- مستشار متخصص في الروبوتات والذكاء الاصطناعي
- تعمل لصالح معيار الذكاء، الشركة السعودية الرائدة في مجال الروبوتات
- مقر الشركة في الرياض، المملكة العربية السعودية
- الشركة مملوكة بالكامل للسعوديين

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

    let contextInfo = systemPrompt;
    
    // Add conversation history
    if (history.length > 0) {
      contextInfo += language === 'ar' ? '\n\nتاريخ المحادثة:\n' : '\n\nConversation History:\n';
      
      history.slice(-6).forEach(entry => {
        contextInfo += `${entry.role === 'user' ? 'User' : 'Ali'}: ${entry.message}\n`;
      });
    }
    
    return contextInfo;
  }

  parseResponse(response, language) {
    // Extract recommendations, follow-up questions, etc. from AI response
    const recommendations = this.extractRecommendations(response, language);
    const followUpQuestions = this.extractFollowUpQuestions(response, language);
    
    return {
      message: response,
      language,
      confidence: 0.95,
      consultationType: this.determineConsultationType(response),
      recommendations,
      followUpQuestions,
      industry: this.detectIndustry(response),
      urgency: this.detectUrgency(response)
    };
  }

  extractRecommendations(response, language) {
    const robots = [];
    if (response.includes('NOVA') || response.includes('نوفا')) {
      robots.push(language === 'ar' ? 'روبوت الخدمة نوفا' : 'NOVA Service Robot');
    }
    if (response.includes('Mini') || response.includes('ميني')) {
      robots.push(language === 'ar' ? 'روبوت التعليم ميني' : 'Mini Educational Robot');
    }
    if (response.includes('50 Pro') || response.includes('50 برو')) {
      robots.push(language === 'ar' ? 'روبوت التنظيف 50 برو' : '50 Pro Cleaning Robot');
    }
    if (response.includes('FOLA') || response.includes('فولا')) {
      robots.push(language === 'ar' ? 'سلسلة فولا' : 'FOLA Series');
    }
    if (response.includes('LuckiBot') || response.includes('لوكي بوت')) {
      robots.push(language === 'ar' ? 'روبوت الترحيب لوكي بوت' : 'LuckiBot Welcoming Robot');
    }
    if (response.includes('75') || response.includes('75')) {
      robots.push(language === 'ar' ? 'روبوت التنظيف 75' : '75 Cleaning Robot');
    }
    if (response.includes('Phantas') || response.includes('فانتاس')) {
      robots.push(language === 'ar' ? 'روبوت التنظيف فانتاس' : 'Phantas Cleaning Robot');
    }
    if (response.includes('Vacum 40') || response.includes('فاكيوم 40')) {
      robots.push(language === 'ar' ? 'روبوت التنظيف فاكيوم 40' : 'Vacum 40 Cleaning Robot');
    }
    if (response.includes('Omnie') || response.includes('أومني')) {
      robots.push(language === 'ar' ? 'روبوت التنظيف أومني' : 'Omnie Cleaning Robot');
    }
    
    return robots.length > 0 ? {
      robots,
      reasoning: language === 'ar' ? 'توصيات مدعومة بالذكاء الاصطناعي بناءً على احتياجاتك' : 'AI-powered recommendations based on your needs',
      implementation: language === 'ar' ? 'تنفيذ مخصص مع دعم كامل' : 'Custom implementation with full support',
      roi: language === 'ar' ? 'عائد استثمار مضمون مع تحليل مفصل' : 'Guaranteed ROI with detailed analysis'
    } : null;
  }

  extractFollowUpQuestions(response, language) {
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
        questions.push(...matches.slice(0, 2));
      }
    });
    
    return questions.length > 0 ? questions : null;
  }

  determineConsultationType(response) {
    if (response.includes('facility') || response.includes('منشأة')) return 'facility_analysis';
    if (response.includes('ROI') || response.includes('cost') || response.includes('تكلفة')) return 'roi_calculation';
    if (response.includes('implement') || response.includes('تطبيق')) return 'implementation_planning';
    return 'general_inquiry';
  }

  detectIndustry(response) {
    if (response.includes('education') || response.includes('تعليم')) return 'education';
    if (response.includes('healthcare') || response.includes('صحة')) return 'healthcare';
    if (response.includes('hospitality') || response.includes('ضيافة')) return 'hospitality';
    if (response.includes('warehouse') || response.includes('مستودع')) return 'warehouse';
    return 'general';
  }

  detectUrgency(response) {
    if (response.includes('urgent') || response.includes('عاجل')) return 'high';
    if (response.includes('soon') || response.includes('قريباً')) return 'medium';
    return 'low';
  }

  getConversationHistory(conversationId) {
    return this.conversationHistory.get(conversationId) || [];
  }

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
      industry: 'general',
      urgency: 'low'
    };
  }
}

module.exports = new GeminiDirectService();
