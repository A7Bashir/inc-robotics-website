// Enhanced AI Service for Ali - INC Robotics Solutions Consultant
// Browser-compatible version with mock AI responses

// Note: This is a browser-compatible version that simulates AI responses
// For production, you would need to implement a backend API that calls Vertex AI

import { API_ENDPOINTS } from '../config/api';

export interface AliResponse {
  message: string;
  language: 'en' | 'ar';
  confidence: number;
  consultationType?: 'facility_analysis' | 'event_planning' | 'roi_calculation' | 'solution_design' | 'company_inquiry' | 'general_inquiry' | 'cleaning_solutions';
  suggestedActions?: string[];
  suggestions?: string[];
  recommendations?: {
    robots: string[];
    reasoning: string;
    implementation: string;
    roi?: string;
  };
  followUpQuestions?: string[];
  spellingCorrection?: {
    confidence: number;
    corrected: string;
  };
  enhancement?: any;
}

export interface ConsultationContext {
  sessionId: string;
  clientType?: 'healthcare' | 'hospitality' | 'manufacturing' | 'education' | 'corporate' | 'events' | 'unknown';
  facilitySize?: 'small' | 'medium' | 'large' | 'enterprise';
  budgetRange?: 'low' | 'medium' | 'high' | 'enterprise';
  timeline?: 'urgent' | 'short' | 'medium' | 'long';
  currentChallenges?: string[];
  goals?: string[];
  previousInteractions?: string[];
}

class AliVertexAIService {
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [];
  private consultationContexts: Map<string, ConsultationContext> = new Map();

  constructor() {
    // Initialize Ali's personality and expertise
  }

  // Get Ali's master system prompt
  private getAliSystemPrompt(language: 'en' | 'ar'): string {
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
  private getProductKnowledge(language: 'en' | 'ar'): string {
    return language === 'ar' ? `

معرفتك بالمنتجات:

روبوتات الخدمة:
- نوفا: روبوت الضيافة الذكي مع شاشة 36 سم عالية الدقة، دقة التعرف على الكلام 97%
- لوكي بوت: روبوت الخدمة الترحيبي مع ذكاء اصطناعي متقدم
- لوكي برو: خدمات VIP متميزة للبيئات الفاخرة
- ميني: روبوت تعليمي للمدارس ومراكز التدريب
- أوتودور: إدارة الأبواب الآلية ونشر الفعاليات

روبوتات التنظيف:
- 50 برو: تنظيف شركاتي مع ملاحة دقيقة
- 75: تنظيف خارجي ومستودعات مقاوم للطقس
- فانتاس: تنظيف متخصص للسينما والبيئات الحساسة
- فاكيوم 40: مكنسة كهربائية عالية الكفاءة
- أومني: تنظيف متعدد الأسطح مع قدرات تكيفية

روبوتات اللوجستيات:
- سلسلة فولا: معالجة المواد (BN-2001, DN-1416, QN-1416, PN1530, QN2030)
- سلسلة إيما: لوجستيات متعددة السعة (400K, 400L, 600K, 600L, 1000K, 1500K, 1500L)
- سلسلة أومني: صناعي ثقيل (1.5T, 2.5T, 3.5T, 5T)
- سلسلة لونا: حلول عالية السعة (5T, 20T, 30T)
- كاري بوت: حلول نقل المواد
- مورا: معالجة لوجستية متخصصة

` : `

Your Product Knowledge:

Service Robots:
- NOVA: AI-powered hospitality with 36cm HD display, 97% speech recognition
- LuckiBot: Welcoming service with advanced AI and machine learning
- LuckiPro: Premium VIP services for luxury environments
- Mini: Educational robot for schools and training centers
- Autodoor: Automated door management and event publishing

Cleaning Robots:
- 50 Pro: Corporate cleaning with precision navigation
- 75: Outdoor and warehouse cleaning with weather resistance
- Phantas: Cinema and specialized cleaning for sensitive environments
- Vacum 40: High-efficiency vacuum for various spaces
- Omnie: Multi-surface cleaning with adaptive capabilities

Logistics Robots:
- FOLA Series: Material handling (BN-2001, DN-1416, QN-1416, PN1530, QN2030)
- EMMA Series: Multi-capacity logistics (400K, 400L, 600K, 600L, 1000K, 1500K, 1500L)
- OMNI Series: Heavy-duty industrial (1.5T, 2.5T, 3.5T, 5T)
- LUNA Series: High-capacity solutions (5T, 20T, 30T)
- CarryBot: Material transport solutions
- Mora: Specialized logistics handling

`;
  }

  // Get consultation framework
  private getConsultationFramework(language: 'en' | 'ar'): string {
    return language === 'ar' ? `

إطار الاستشارة:

1. تحليل المرافق:
- نوع المرفق والحجم
- التحديات الحالية
- المتطلبات الصناعية
- الميزانية والجدول الزمني

2. تصميم الحلول:
- توصيات محددة للروبوتات
- خطة التنفيذ
- التدريب والدعم
- حساب العائد على الاستثمار

3. استشارات الذكاء الاصطناعي:
- تقييم التكنولوجيا الحالية
- خارطة طريق التحول الرقمي
- استراتيجيات التكامل
- أفضل الممارسات

4. تخطيط الأحداث:
- نوع الفعالية والحجم
- متطلبات الخدمة
- تكامل التكنولوجيا
- مقاييس النجاح

` : `

Consultation Framework:

1. Facility Analysis:
- Facility type and size
- Current challenges
- Industry requirements
- Budget and timeline

2. Solution Design:
- Specific robot recommendations
- Implementation plan
- Training and support
- ROI calculations

3. AI Consultation:
- Current technology assessment
- Digital transformation roadmap
- Integration strategies
- Best practices

4. Event Planning:
- Event type and scale
- Service requirements
- Technology integration
- Success metrics

`;
  }

  // Process message with Ali's enhanced capabilities
  async processMessage(
    userMessage: string,
    language: 'en' | 'ar' = 'en',
    sessionId?: string
  ): Promise<AliResponse> {
    try {
      console.log('🤖 Calling Gemini API with message:', userMessage);
      // Call backend API with Gemini integration
      const response = await fetch(API_ENDPOINTS.CHAT(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          language,
          conversationId: sessionId || `session_${Date.now()}`
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Gemini API response:', data);
      
      if (data.success) {
        console.log('🎉 Using Gemini response');
        return data.data;
      } else {
        throw new Error(data.message || 'Unknown error');
      }
      
    } catch (error) {
      console.error('❌ Error calling Gemini API:', error);
      console.log('🔍 API URL was:', API_ENDPOINTS.CHAT());
      console.log('🔍 Error details:', error instanceof Error ? error.message : String(error));
      // Return error response instead of fallback
      return {
        message: language === 'ar' 
          ? 'عذراً، واجهت مشكلة تقنية. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.'
          : 'Sorry, I encountered a technical issue. Please try again or contact us directly.',
        language,
        confidence: 0.0,
        consultationType: 'general_inquiry',
        suggestedActions: ['contact_support']
      };
    }
  }

  // REMOVED: Local fallback methods - using only Gemini API
  /*
  private getMockResponse(message: string, language: 'en' | 'ar'): AliResponse {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific facility types FIRST (before company inquiry)
    if (lowerMessage.includes('warehouse') || lowerMessage.includes('logistics') || lowerMessage.includes('مستودع') || lowerMessage.includes('لوجستيات') || lowerMessage.includes('storage') || lowerMessage.includes('depot')) {
      return {
        message: "For warehouse and logistics operations, I recommend our EMMA series for multi-capacity logistics and our LUNA series for high-capacity solutions. EMMA handles 400kg-1500kg loads with compact and large platform options, while LUNA manages 5-30 ton operations for massive projects. Our logistics clients see 55% reduction in handling time and 45% improvement in accuracy. The ROI typically pays for itself within 3-5 months. What's your current warehouse capacity and material flow?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'facility_analysis',
        recommendations: {
          robots: ['EMMA Series (Multi-Capacity)', 'LUNA Series (High-Capacity)'],
          reasoning: 'EMMA handles 400kg-1500kg loads with compact and large platform options, while LUNA manages 5-30 ton operations for massive projects',
          implementation: 'Warehouse capacity analysis, material flow optimization, robot deployment strategy, logistics team training',
          roi: '55% reduction in handling time, 45% improvement in accuracy, payback within 3-5 months'
        },
        followUpQuestions: [
          'What is your current warehouse capacity?',
          'What materials do you handle most?',
          'Would you like a logistics efficiency analysis?'
        ]
      };
    }
    
    if (lowerMessage.includes('manufacturing') || lowerMessage.includes('factory') || lowerMessage.includes('مصنع') || lowerMessage.includes('تصنيع')) {
      return {
        message: "For manufacturing facilities, I recommend our FOLA series for material handling and our EMMA series for logistics operations. FOLA handles light to heavy-duty material transport (2-20 tons), while EMMA provides multi-capacity logistics solutions (400kg-1500kg). Our manufacturing clients like Aramco see 60% reduction in material handling time and 50% improvement in operational efficiency. The ROI typically pays for itself within 4-6 months. Which manufacturing operations need automation?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'facility_analysis',
        recommendations: {
          robots: ['FOLA Series (BN-2001)', 'EMMA Series (600K)'],
          reasoning: 'FOLA series handles material transport from 2-20 tons, while EMMA series provides multi-capacity logistics solutions from 400-1500kg',
          implementation: 'Production line analysis, transport robot installation, manufacturing system integration, operator training',
          roi: '60% reduction in material handling time, 50% improvement in operational efficiency, payback within 4-6 months'
        },
        followUpQuestions: [
          'What manufacturing operations do you have?',
          'What is your current material handling capacity?',
          'Would you like a manufacturing efficiency analysis?'
        ]
      };
    }
    
    // Check if it's a company inquiry (ONLY if no specific facility mentioned)
    if (lowerMessage.includes('company') || lowerMessage.includes('owner') || lowerMessage.includes('founder') || lowerMessage.includes('saudi') || lowerMessage.includes('شركة') || lowerMessage.includes('مالك') || lowerMessage.includes('مؤسس') || lowerMessage.includes('سعودي')) {
      if (lowerMessage.includes('owner') || lowerMessage.includes('founder') || lowerMessage.includes('مالك') || lowerMessage.includes('مؤسس') || lowerMessage.includes('علي الحربي')) {
        // Only mention founder when specifically asked
        if (lowerMessage.includes('مرحباً') || lowerMessage.includes('أهلاً') || lowerMessage.includes('السلام عليكم')) {
          return {
            message: "مرحباً! مؤسس شركة معيار الذكاء هو علي الحربي. نحن شركة سعودية بالكامل ومقرنا في الرياض. كيف يمكنني مساعدتك اليوم؟",
            language: 'ar',
            confidence: 0.9,
            consultationType: 'company_inquiry',
            suggestedActions: ['start_consultation']
          };
        } else {
          return {
            message: "The founder of INC Robotics is Ali Alharbi. We are a fully Saudi-owned company headquartered in Riyadh. How can I assist you today?",
            language: 'en',
            confidence: 0.9,
            consultationType: 'company_inquiry',
            suggestedActions: ['start_consultation']
          };
        }
      } else {
        // General company info without mentioning founder
        if (lowerMessage.includes('مرحباً') || lowerMessage.includes('أهلاً') || lowerMessage.includes('السلام عليكم')) {
          return {
            message: "مرحباً! أنا فخور أن أكون جزءاً من معيار الذكاء، الشركة السعودية الرائدة في مجال الروبوتات والذكاء الاصطناعي. مقرنا في الرياض. كيف يمكنني مساعدتك اليوم؟",
            language: 'ar',
            confidence: 0.9,
            consultationType: 'company_inquiry',
            suggestedActions: ['start_consultation']
          };
        } else {
          return {
            message: "I'm proud to be part of INC Robotics, the leading Saudi company in robotics and AI solutions. We are headquartered in Riyadh. How can I assist you today?",
            language: 'en',
            confidence: 0.9,
            consultationType: 'company_inquiry',
            suggestedActions: ['start_consultation']
          };
        }
      }
    }
    
    // Generate contextual responses based on keywords
    if (lowerMessage.includes('hospital') || lowerMessage.includes('healthcare') || lowerMessage.includes('مستشفى') || lowerMessage.includes('صحة')) {
      return {
        message: "For healthcare facilities, I recommend our NOVA service robot for patient assistance and our 50 Pro cleaning robot for facility maintenance. NOVA provides 24/7 patient interaction with 97%+ speech recognition and multi-language support, while 50 Pro ensures sterile environments with precision cleaning. Our healthcare clients like King Saud University see 40% reduction in operational costs and 60% improvement in patient satisfaction. The ROI typically pays for itself within 6-8 months. Would you like a detailed healthcare solution proposal?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'facility_analysis',
        recommendations: {
          robots: ['NOVA Service Robot', '50 Pro Cleaning Robot'],
          reasoning: 'NOVA provides 24/7 patient interaction with 97%+ speech recognition and multi-language support, while 50 Pro ensures sterile environments with precision cleaning specialized for medical facilities',
          implementation: 'NOVA installation in reception and emergency areas, 50 Pro for night cleaning, medical staff training, performance monitoring',
          roi: '40% reduction in operational costs, 60% improvement in patient satisfaction, payback within 6-8 months'
        },
        followUpQuestions: [
          'What is the size of your healthcare facility?',
          'What are your main patient interaction challenges?',
          'Would you like to schedule a healthcare demo?'
        ]
      };
    }
    
    if (lowerMessage.includes('hotel') || lowerMessage.includes('hospitality') || lowerMessage.includes('فندق') || lowerMessage.includes('ضيافة') || lowerMessage.includes('guest') || lowerMessage.includes('accommodation') || lowerMessage.includes('resort')) {
      return {
        message: "For hospitality venues, I recommend our NOVA service robot for guest interaction and our Omnie cleaning robot for facility maintenance. NOVA provides 24/7 guest services with 36cm HD display and 31+ language support, while Omnie handles multi-surface cleaning with adaptive capabilities. Our hospitality clients see 50% reduction in staff workload and 35% improvement in guest satisfaction. The ROI typically pays for itself within 8-12 months with 45% cost savings. Shall I provide a detailed hospitality solution proposal?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'facility_analysis',
        recommendations: {
          robots: ['NOVA Service Robot', 'Omnie Cleaning Robot'],
          reasoning: 'NOVA provides 24/7 guest services with 36cm HD display and 31+ language support, while Omnie handles multi-surface cleaning with adaptive capabilities',
          implementation: 'NOVA installation in lobby and common areas, Omnie for daily cleaning, hospitality staff training, hotel system integration',
          roi: '50% reduction in staff workload, 35% improvement in guest satisfaction, 45% cost savings, payback within 8-12 months'
        },
        followUpQuestions: [
          'How many rooms does your hotel have?',
          'What guest services would you like to automate?',
          'Would you like to see a hospitality cost analysis?'
        ]
      };
    }
    
    if (lowerMessage.includes('event') || lowerMessage.includes('فعالية') || lowerMessage.includes('مناسبة')) {
      return {
        message: "For events and occasions, I suggest our NOVA service robot for guest interaction and our Phantas cleaning robot for venue maintenance. NOVA provides dynamic promotion and intelligent Q&A capabilities, while Phantas ensures quiet operation for sensitive environments. We provide complete event robotics solutions with setup, operation, and breakdown services. Our event clients see 70% reduction in manual labor and 80% improvement in guest engagement. What type of event are you planning?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'event_planning',
        recommendations: {
          robots: ['NOVA Service Robot', 'Phantas Cleaning Robot'],
          reasoning: 'NOVA provides dynamic promotion and intelligent Q&A capabilities, while Phantas ensures quiet operation for sensitive environments',
          implementation: 'Complete event package including setup, operation, and breakdown services with dynamic promotion and quiet maintenance',
          roi: '70% reduction in manual labor, 80% improvement in guest engagement'
        },
        followUpQuestions: [
          'What type of event are you planning?',
          'How many guests are you expecting?',
          'What services do you need for your event?'
        ]
      };
    }
    
    if (lowerMessage.includes('manufacturing') || lowerMessage.includes('factory') || lowerMessage.includes('مصنع') || lowerMessage.includes('تصنيع')) {
      return {
        message: "For manufacturing facilities, I recommend our FOLA series for material handling and our EMMA series for logistics operations. FOLA handles light to heavy-duty material transport (2-20 tons), while EMMA provides multi-capacity logistics solutions (400kg-1500kg). Our manufacturing clients like Aramco see 60% reduction in material handling time and 50% improvement in operational efficiency. The ROI typically pays for itself within 4-6 months. Which manufacturing operations need automation?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'facility_analysis',
        recommendations: {
          robots: ['FOLA Series (BN-2001)', 'EMMA Series (600K)'],
          reasoning: 'FOLA series handles material transport from 2-20 tons, while EMMA series provides multi-capacity logistics solutions from 400-1500kg',
          implementation: 'Production line analysis, transport robot installation, manufacturing system integration, operator training',
          roi: '60% reduction in material handling time, 50% improvement in operational efficiency, payback within 4-6 months'
        },
        followUpQuestions: [
          'What manufacturing operations do you have?',
          'What is your current material handling capacity?',
          'Would you like a manufacturing efficiency analysis?'
        ]
      };
    }
    
    if (lowerMessage.includes('warehouse') || lowerMessage.includes('logistics') || lowerMessage.includes('مستودع') || lowerMessage.includes('لوجستيات')) {
      return {
        message: "For warehouse and logistics operations, I recommend our EMMA series for multi-capacity logistics and our LUNA series for high-capacity solutions. EMMA handles 400kg-1500kg loads with compact and large platform options, while LUNA manages 5-30 ton operations for massive projects. Our logistics clients see 55% reduction in handling time and 45% improvement in accuracy. The ROI typically pays for itself within 3-5 months. What's your current warehouse capacity and material flow?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'facility_analysis',
        recommendations: {
          robots: ['EMMA Series (Multi-Capacity)', 'LUNA Series (High-Capacity)'],
          reasoning: 'EMMA handles 400kg-1500kg loads with compact and large platform options, while LUNA manages 5-30 ton operations for massive projects',
          implementation: 'Warehouse capacity analysis, material flow optimization, robot deployment strategy, logistics team training',
          roi: '55% reduction in handling time, 45% improvement in accuracy, payback within 3-5 months'
        },
        followUpQuestions: [
          'What is your current warehouse capacity?',
          'What materials do you handle most?',
          'Would you like a logistics efficiency analysis?'
        ]
      };
    }
    
    if (lowerMessage.includes('robot') || lowerMessage.includes('روبوت') || lowerMessage.includes('cleaning') || lowerMessage.includes('تنظيف')) {
      return {
        message: "We offer a comprehensive range of robotics solutions: NOVA for AI-powered hospitality, LuckiBot for welcoming services, 50 Pro for corporate cleaning, FOLA series for material handling, and specialized robots for different industries. Each is designed for maximum efficiency with proven ROI. Our clients include Aramco, SAB, SEC, and major universities. Which application interests you most?",
        language: 'en',
        confidence: 0.9,
        consultationType: 'solution_design',
        recommendations: {
          robots: ['NOVA Service Robot', '50 Pro Cleaning Robot', 'FOLA Series'],
          reasoning: 'Comprehensive range of robotics solutions: NOVA for intelligent services, 50 Pro for specialized cleaning, FOLA for transport and logistics',
          implementation: 'Facility needs analysis, custom solution design, phased installation, comprehensive training, ongoing support',
          roi: '45% reduction in operational costs, 55% improvement in efficiency, payback within 6-10 months'
        },
        followUpQuestions: [
          'What industry are you in?',
          'What specific tasks do you want to automate?',
          'Would you like to see our product catalog?'
        ]
      };
    }
    
    // If no specific keywords match, provide a helpful general response
    return {
      message: "I'm Ali, your robotics and AI solutions consultant from INC Robotics. I can help you with facility analysis, robot recommendations, and ROI calculations. What type of facility do you have - hospital, hotel, warehouse, manufacturing, or something else?",
      language: 'en',
      confidence: 0.8,
      consultationType: 'general_inquiry',
      suggestedActions: ['start_consultation', 'schedule_demo', 'contact_sales'],
      recommendations: {
        robots: ['NOVA Service Robot', '50 Pro Cleaning Robot', 'FOLA Series'],
        reasoning: 'Comprehensive range of robotics solutions for different industries',
        implementation: 'Custom solutions tailored to your specific facility needs',
        roi: 'Proven ROI with 40-60% cost savings and 4-12 month payback periods'
      },
      followUpQuestions: [
        'What type of facility do you have?',
        'What are your main operational challenges?',
        'Would you like to see our product catalog?'
      ]
    };
  }

  // Analyze user intent and context
  private analyzeUserIntent(message: string, context: ConsultationContext): any {
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
    } else if (lowerMessage.includes('manufacturing') || lowerMessage.includes('warehouse') || lowerMessage.includes('تصنيع') || lowerMessage.includes('مستودع')) {
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

  // Extract keywords from message
  private extractKeywords(message: string): string[] {
    const keywords: string[] = [];
    const lowerMessage = message.toLowerCase();
    
    // Robot keywords
    const robotKeywords = ['nova', 'luckibot', 'luckipro', 'mini', 'autodoor', '50 pro', '75', 'phantas', 'vacum', 'omnie', 'fola', 'emma', 'omni', 'luna', 'carrybot', 'mora'];
    robotKeywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) keywords.push(keyword);
    });

    // Industry keywords
    const industryKeywords = ['healthcare', 'hospitality', 'manufacturing', 'education', 'corporate', 'events'];
    industryKeywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) keywords.push(keyword);
    });

    return keywords;
  }

  // Analyze client needs
  private analyzeNeeds(message: string): string[] {
    const needs: string[] = [];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('efficiency') || lowerMessage.includes('كفاءة')) needs.push('efficiency');
    if (lowerMessage.includes('cost') || lowerMessage.includes('تكلفة')) needs.push('cost_reduction');
    if (lowerMessage.includes('safety') || lowerMessage.includes('أمان')) needs.push('safety');
    if (lowerMessage.includes('automation') || lowerMessage.includes('أتمتة')) needs.push('automation');
    if (lowerMessage.includes('customer') || lowerMessage.includes('عميل')) needs.push('customer_experience');
    
    return needs;
  }

  // Generate Ali's response using Vertex AI
  private async generateAliResponse(
    userMessage: string,
    context: ConsultationContext,
    language: 'en' | 'ar',
    analysis: any
  ): Promise<AliResponse> {
    // Note: This is a browser-compatible version
    // In production, you would call your backend API here

    try {
      // Create enhanced prompt with context
      const systemPrompt = this.getAliSystemPrompt(language);
      const contextPrompt = this.buildContextPrompt(context, analysis, language);
      const fullPrompt = `${systemPrompt}\n\n${contextPrompt}\n\nUser: ${userMessage}\n\nAli:`;

      // Use Vertex AI to generate response
      const response = await this.callVertexAI(fullPrompt);
      
      // Parse response and add consultation metadata
      return this.parseAliResponse(response, language, analysis, context);

    } catch (error) {
      console.error('Error generating Ali response:', error);
      return this.getFallbackResponse(language);
    }
  }

  // Build context-aware prompt
  private buildContextPrompt(context: ConsultationContext, analysis: any, language: 'en' | 'ar'): string {
    let contextInfo = '';
    
    if (context.clientType && context.clientType !== 'unknown') {
      contextInfo += language === 'ar' 
        ? `\nنوع العميل: ${context.clientType}\n`
        : `\nClient Type: ${context.clientType}\n`;
    }
    
    if (context.facilitySize) {
      contextInfo += language === 'ar' 
        ? `حجم المرفق: ${context.facilitySize}\n`
        : `Facility Size: ${context.facilitySize}\n`;
    }
    
    if (context.budgetRange) {
      contextInfo += language === 'ar' 
        ? `نطاق الميزانية: ${context.budgetRange}\n`
        : `Budget Range: ${context.budgetRange}\n`;
    }

    if (analysis.consultationType !== 'general_inquiry') {
      contextInfo += language === 'ar' 
        ? `نوع الاستشارة: ${analysis.consultationType}\n`
        : `Consultation Type: ${analysis.consultationType}\n`;
    }

    return contextInfo;
  }

  // Mock AI API call (browser-compatible)
  private async callVertexAI(prompt: string): Promise<string> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Check if it's a company inquiry
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
      return "For healthcare facilities, I recommend our NOVA cleaning robot and LUCKI service robot. They provide 24/7 sanitization and patient assistance while maintaining the highest hygiene standards. Would you like me to explain their specific capabilities for your hospital?";
    }
    
    if (prompt.includes('hotel') || prompt.includes('hospitality') || prompt.includes('فندق') || prompt.includes('ضيافة')) {
      return "For hospitality venues, our BEETLE delivery robot and LUCKI service robot are perfect. They can handle room service, guest assistance, and facility maintenance. The ROI typically pays for itself within 8-12 months. Shall I provide a detailed proposal for your hotel?";
    }
    
    if (prompt.includes('event') || prompt.includes('فعالية') || prompt.includes('مناسبة')) {
      return "For events and occasions, I suggest our LUCKI service robot for guest interaction and our cleaning robots for venue maintenance. We can provide complete event robotics solutions with setup, operation, and breakdown services. What type of event are you planning?";
    }
    
    if (prompt.includes('robot') || prompt.includes('روبوت') || prompt.includes('cleaning') || prompt.includes('تنظيف')) {
      return "We offer a comprehensive range of robotics solutions: NOVA for floor cleaning, LUCKI for service and interaction, BEETLE for delivery, and specialized robots for different industries. Each is designed for maximum efficiency and ROI. Which application interests you most?";
    }
    
    return "I understand your needs. Let me provide you with a comprehensive robotics solution analysis tailored to your specific requirements. Could you tell me more about your facility type and main challenges?";
  }

  // Parse Ali's response and add metadata
  private parseAliResponse(
    response: string,
    language: 'en' | 'ar',
    analysis: any,
    context: ConsultationContext
  ): AliResponse {
    // Generate recommendations based on analysis
    const recommendations = this.generateRecommendations(analysis, context, language);
    
    // Generate follow-up questions
    const followUpQuestions = this.generateFollowUpQuestions(analysis, language);
    
    // Generate suggested actions
    const suggestedActions = this.generateSuggestedActions(analysis, language);

    return {
      message: response,
      language,
      confidence: 0.9,
      consultationType: analysis.consultationType,
      suggestedActions,
      recommendations,
      followUpQuestions,
    };
  }

  // Generate robot recommendations
  private generateRecommendations(analysis: any, context: ConsultationContext, language: 'en' | 'ar'): any {
    const recommendations = {
      robots: [] as string[],
      reasoning: '',
      implementation: '',
      roi: ''
    };

    // Based on client type and consultation type
    if (analysis.clientType === 'healthcare') {
      recommendations.robots = ['NOVA', '50 Pro', 'Vacum 40'];
      recommendations.reasoning = language === 'ar' 
        ? 'نوفا للتفاعل مع المرضى، 50 برو للتنظيف المتخصص، فاكيوم 40 للتنظيف عالي الكفاءة'
        : 'NOVA for patient interaction, 50 Pro for specialized cleaning, Vacum 40 for high-efficiency cleaning';
    } else if (analysis.clientType === 'hospitality') {
      recommendations.robots = ['NOVA', 'LuckiBot', 'LuckiPro', 'Omnie'];
      recommendations.reasoning = language === 'ar' 
        ? 'نوفا للضيافة، لوكي بوت للترحيب، لوكي برو للخدمات المتميزة، أومني للتنظيف متعدد الأسطح'
        : 'NOVA for hospitality, LuckiBot for welcoming, LuckiPro for premium services, Omnie for multi-surface cleaning';
    }

    return recommendations;
  }

  // Generate follow-up questions
  private generateFollowUpQuestions(analysis: any, language: 'en' | 'ar'): string[] {
    const questions = [];
    
    if (analysis.consultationType === 'facility_analysis') {
      questions.push(language === 'ar' 
        ? 'ما هو حجم مرفقك التقريبي؟'
        : 'What is the approximate size of your facility?'
      );
      questions.push(language === 'ar' 
        ? 'ما هي التحديات الرئيسية التي تواجهها؟'
        : 'What are the main challenges you are facing?'
      );
    } else if (analysis.consultationType === 'event_planning') {
      questions.push(language === 'ar' 
        ? 'كم عدد الضيوف المتوقعين؟'
        : 'How many guests are you expecting?'
      );
      questions.push(language === 'ar' 
        ? 'ما نوع الفعالية؟'
        : 'What type of event is it?'
      );
    }

    return questions;
  }


  // Generate suggested actions
  private generateSuggestedActions(analysis: any, language: 'en' | 'ar'): string[] {
    const actions = [];
    
    if (analysis.consultationType === 'facility_analysis') {
      actions.push(language === 'ar' ? 'جدولة زيارة ميدانية' : 'Schedule site visit');
      actions.push(language === 'ar' ? 'طلب عرض توضيحي' : 'Request demo');
    }
    
    if (analysis.consultationType === 'event_planning') {
      actions.push(language === 'ar' ? 'تخطيط الفعالية' : 'Plan event');
      actions.push(language === 'ar' ? 'حجز الروبوتات' : 'Book robots');
    }
    
    if (analysis.consultationType === 'company_inquiry') {
      actions.push(language === 'ar' ? 'معرفة المزيد عن الشركة' : 'Learn more about the company');
      actions.push(language === 'ar' ? 'التواصل مع الفريق' : 'Contact our team');
    }
    
    actions.push(language === 'ar' ? 'التواصل مع المبيعات' : 'Contact sales');
    actions.push(language === 'ar' ? 'طلب عرض سعر' : 'Request quote');
    
    return actions;
  }

  // Create consultation context
  private createConsultationContext(sessionId: string, language: 'en' | 'ar'): ConsultationContext {
    const context: ConsultationContext = {
      sessionId,
      previousInteractions: []
    };
    
    this.consultationContexts.set(sessionId, context);
    return context;
  }

  // Update consultation context
  private updateConsultationContext(context: ConsultationContext, message: string, analysis: any): void {
    context.previousInteractions?.push(message);
    
    if (analysis.clientType && analysis.clientType !== 'unknown') {
      context.clientType = analysis.clientType;
    }
    
    // Keep only last 10 interactions
    if (context.previousInteractions && context.previousInteractions.length > 10) {
      context.previousInteractions = context.previousInteractions.slice(-10);
    }
  }

  // Get enhanced fallback response with cleaning robot recommendations
  private getEnhancedFallbackResponse(message: string, language: 'en' | 'ar'): AliResponse {
    const lowerMessage = message.toLowerCase();
    
    // Check if asking about specific facility types
    if (lowerMessage.includes('mosque') || lowerMessage.includes('mousque') || lowerMessage.includes('church') || lowerMessage.includes('temple') || 
        lowerMessage.includes('مسجد') || lowerMessage.includes('كنيسة') || lowerMessage.includes('معبد')) {
      return {
        message: language === 'ar' 
          ? 'مرحباً! أنا علي، مستشارك في حلول الروبوتات والذكاء الاصطناعي من معيار الذكاء. أرى أنك تسأل عن منشأة دينية. بصفتنا خبراء في حلول الروبوتات، يمكننا مساعدتك في تحسين عمليات التنظيف والصيانة في أي منشأة. نقدم مجموعة واسعة من روبوتات التنظيف المتطورة التي تضمن بيئة نظيفة وصحية. كيف يمكنني مساعدتك اليوم؟'
          : 'Hello! I\'m Ali, your robotics and AI solutions consultant from INC Robotics. I see you\'re asking about a religious facility. As robotics experts, we can help improve cleaning and maintenance operations in any facility. We offer a comprehensive range of advanced cleaning robots that ensure clean and healthy environments. How can I assist you today?',
        language,
        confidence: 0.8,
        consultationType: 'cleaning_solutions',
        recommendations: {
          robots: language === 'ar' 
            ? ['روبوت التنظيف 50 برو', 'روبوت التنظيف 75', 'روبوت التنظيف فانتاس', 'روبوت التنظيف فاكيوم 40', 'روبوت التنظيف أومني']
            : ['50 Pro Cleaning Robot', '75 Cleaning Robot', 'Phantas Cleaning Robot', 'Vacum 40 Cleaning Robot', 'Omnie Cleaning Robot'],
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
          : ['What is the size of your facility?', 'What are your main cleaning challenges?', 'Do you need specialized cleaning solutions?']
      };
    }
    
    // Default enhanced fallback
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

  // Get fallback response
  private getFallbackResponse(language: 'en' | 'ar'): AliResponse {
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
  */

  // Get welcome message
  getWelcomeMessage(language: 'en' | 'ar'): string {
    return language === 'ar' 
      ? 'مرحباً! أنا علي، مستشارك المتخصص في حلول الروبوتات والذكاء الاصطناعي من معيار الذكاء. يمكنني مساعدتك في تحليل مرافقك، تصميم الحلول، وتقديم استشارات متخصصة. كيف يمكنني مساعدتك اليوم؟'
      : 'Hello! I\'m Ali, your expert robotics and AI solutions consultant from INC Robotics. I can help you analyze your facilities, design solutions, and provide specialized consultation. How can I assist you today?';
  }

  // Clear conversation history
  clearHistory(): void {
    this.conversationHistory = [];
  }

  // Get conversation history
  getHistory(): Array<{role: 'user' | 'assistant', content: string}> {
    return [...this.conversationHistory];
  }
}

// Export singleton instance
export const aliVertexAIService = new AliVertexAIService();
export default aliVertexAIService;
