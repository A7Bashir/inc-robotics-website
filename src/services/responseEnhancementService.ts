// Smart Response Enhancement Service
// Provides context-aware suggestions, personalization, and response optimization

export interface ResponseEnhancement {
  originalResponse: string;
  enhancedResponse: string;
  suggestions: string[];
  personalization: {
    userInterests: string[];
    conversationContext: string;
    recommendedActions: string[];
  };
  confidence: number;
  metadata: {
    enhancementType: string;
    processingTime: number;
    language: 'en' | 'ar';
  };
}

export interface ConversationSuggestion {
  id: string;
  text: string;
  type: 'question' | 'action' | 'information' | 'follow_up';
  priority: number;
  category: string;
  language: 'en' | 'ar';
}

export interface PersonalizationData {
  userId?: string;
  sessionId: string;
  interests: string[];
  previousInteractions: string[];
  preferredLanguage: 'en' | 'ar';
  conversationFlow: string[];
  lastInteraction: Date;
  userType: 'prospect' | 'customer' | 'partner' | 'unknown';
}

class ResponseEnhancementService {
  private personalizationData: Map<string, PersonalizationData> = new Map();
  private suggestionTemplates: Map<string, ConversationSuggestion[]> = new Map();
  private responsePatterns: Map<string, RegExp[]> = new Map();

  constructor() {
    this.initializeSuggestionTemplates();
    this.initializeResponsePatterns();
  }

  // Initialize suggestion templates for different scenarios
  private initializeSuggestionTemplates(): void {
    // English suggestions
    this.suggestionTemplates.set('en', [
      {
        id: 'pricing_inquiry',
        text: 'What are the pricing options for your robots?',
        type: 'question',
        priority: 8,
        category: 'pricing',
        language: 'en'
      },
      {
        id: 'demo_request',
        text: 'Can I schedule a demo to see the robots in action?',
        type: 'action',
        priority: 9,
        category: 'demo',
        language: 'en'
      },
      {
        id: 'product_comparison',
        text: 'How do your service robots compare to competitors?',
        type: 'question',
        priority: 7,
        category: 'comparison',
        language: 'en'
      },
      {
        id: 'technical_specs',
        text: 'What are the technical specifications of your robots?',
        type: 'question',
        priority: 6,
        category: 'technical',
        language: 'en'
      },
      {
        id: 'industry_applications',
        text: 'Which industries can benefit from your robotics solutions?',
        type: 'question',
        priority: 7,
        category: 'industries',
        language: 'en'
      },
      {
        id: 'contact_sales',
        text: 'I would like to speak with a sales representative',
        type: 'action',
        priority: 9,
        category: 'contact',
        language: 'en'
      },
      {
        id: 'support_request',
        text: 'I need technical support for my existing robots',
        type: 'action',
        priority: 8,
        category: 'support',
        language: 'en'
      },
      {
        id: 'customization_options',
        text: 'Can the robots be customized for specific needs?',
        type: 'question',
        priority: 6,
        category: 'customization',
        language: 'en'
      }
    ]);

    // Arabic suggestions
    this.suggestionTemplates.set('ar', [
      {
        id: 'pricing_inquiry_ar',
        text: 'ما هي خيارات التسعير لروبوتاتكم؟',
        type: 'question',
        priority: 8,
        category: 'pricing',
        language: 'ar'
      },
      {
        id: 'demo_request_ar',
        text: 'هل يمكنني جدولة عرض توضيحي لرؤية الروبوتات في العمل؟',
        type: 'action',
        priority: 9,
        category: 'demo',
        language: 'ar'
      },
      {
        id: 'product_comparison_ar',
        text: 'كيف تقارن روبوتات الخدمة الخاصة بكم مع المنافسين؟',
        type: 'question',
        priority: 7,
        category: 'comparison',
        language: 'ar'
      },
      {
        id: 'technical_specs_ar',
        text: 'ما هي المواصفات التقنية لروبوتاتكم؟',
        type: 'question',
        priority: 6,
        category: 'technical',
        language: 'ar'
      },
      {
        id: 'industry_applications_ar',
        text: 'أي صناعات يمكن أن تستفيد من حلولكم الروبوتية؟',
        type: 'question',
        priority: 7,
        category: 'industries',
        language: 'ar'
      },
      {
        id: 'contact_sales_ar',
        text: 'أود التحدث مع ممثل مبيعات',
        type: 'action',
        priority: 9,
        category: 'contact',
        language: 'ar'
      },
      {
        id: 'support_request_ar',
        text: 'أحتاج دعم تقني لروبوتاتي الموجودة',
        type: 'action',
        priority: 8,
        category: 'support',
        language: 'ar'
      },
      {
        id: 'customization_options_ar',
        text: 'هل يمكن تخصيص الروبوتات لاحتياجات محددة؟',
        type: 'question',
        priority: 6,
        category: 'customization',
        language: 'ar'
      }
    ]);
  }

  // Initialize response patterns for enhancement
  private initializeResponsePatterns(): void {
    this.responsePatterns.set('greeting', [
      /^(hello|hi|hey|good morning|good afternoon|good evening|مرحبا|السلام عليكم|أهلا|صباح الخير|مساء الخير)$/i
    ]);

    this.responsePatterns.set('pricing', [
      /(price|cost|pricing|quotation|quote|budget|سعر|تكلفة|أسعار|عرض سعر|ميزانية)/i
    ]);

    this.responsePatterns.set('demo', [
      /(demo|demonstration|test|try|schedule|عرض|تجربة|اختبار|جدولة)/i
    ]);

    this.responsePatterns.set('product', [
      /(robot|robots|robotics|روبوت|روبوتات)/i
    ]);

    this.responsePatterns.set('contact', [
      /(contact|call|phone|email|speak|talk|meet|اتصال|هاتف|بريد إلكتروني|التحدث|مقابلة)/i
    ]);
  }

  // Enhance response with smart features
  enhanceResponse(
    originalResponse: string,
    userMessage: string,
    personalizationData: PersonalizationData,
    intent: string,
    entities: Record<string, string>
  ): ResponseEnhancement {
    const startTime = Date.now();
    
    // Generate personalized response
    const enhancedResponse = this.generatePersonalizedResponse(
      originalResponse,
      userMessage,
      personalizationData,
      intent,
      entities
    );

    // Generate contextual suggestions
    const suggestions = this.generateContextualSuggestions(
      userMessage,
      personalizationData,
      intent,
      entities
    );

    // Calculate confidence score
    const confidence = this.calculateEnhancementConfidence(
      originalResponse,
      enhancedResponse,
      personalizationData
    );

    const processingTime = Date.now() - startTime;

    return {
      originalResponse,
      enhancedResponse,
      suggestions,
      personalization: {
        userInterests: personalizationData.interests,
        conversationContext: this.getConversationContext(personalizationData),
        recommendedActions: this.getRecommendedActions(intent, entities)
      },
      confidence,
      metadata: {
        enhancementType: this.getEnhancementType(originalResponse, enhancedResponse),
        processingTime,
        language: personalizationData.preferredLanguage
      }
    };
  }

  // Generate personalized response
  private generatePersonalizedResponse(
    originalResponse: string,
    userMessage: string,
    personalizationData: PersonalizationData,
    intent: string,
    entities: Record<string, string>
  ): string {
    let enhancedResponse = originalResponse;

    // Add personalized greeting for new users
    if (personalizationData.userType === 'unknown' && intent === 'greeting') {
      const greeting = personalizationData.preferredLanguage === 'ar'
        ? 'مرحباً! أهلاً وسهلاً بك في إنك روبوتكس. '
        : 'Hello! Welcome to INC Robotics. ';
      enhancedResponse = greeting + enhancedResponse;
    }

    // Add interest-based recommendations
    if (personalizationData.interests.length > 0) {
      const recommendations = this.generateInterestBasedRecommendations(
        personalizationData.interests,
        personalizationData.preferredLanguage
      );
      if (recommendations) {
        enhancedResponse += '\n\n' + recommendations;
      }
    }

    // Add context-aware follow-up
    const followUp = this.generateContextAwareFollowUp(
      intent,
      entities,
      personalizationData
    );
    if (followUp) {
      enhancedResponse += '\n\n' + followUp;
    }

    // Add urgency-based information
    if (entities.urgency === 'urgent') {
      const urgentInfo = personalizationData.preferredLanguage === 'ar'
        ? '💡 يمكننا توفير استجابة سريعة لاحتياجاتك العاجلة. يرجى التواصل معنا مباشرة.'
        : '💡 We can provide quick response to your urgent needs. Please contact us directly.';
      enhancedResponse += '\n\n' + urgentInfo;
    }

    return enhancedResponse;
  }

  // Generate interest-based recommendations
  private generateInterestBasedRecommendations(
    interests: string[],
    language: 'en' | 'ar'
  ): string {
    const recommendations: string[] = [];

    if (interests.includes('service_robots')) {
      const rec = language === 'ar'
        ? '💡 قد تكون مهتماً بروبوتات الخدمة مثل نوفا أو لوكي بوت'
        : '💡 You might be interested in our service robots like NOVA or LuckiBot';
      recommendations.push(rec);
    }

    if (interests.includes('cleaning_robots')) {
      const rec = language === 'ar'
        ? '💡 لدينا مجموعة واسعة من روبوتات التنظيف مثل 50 برو وفانتاس'
        : '💡 We have a wide range of cleaning robots like 50 Pro and Phantas';
      recommendations.push(rec);
    }

    if (interests.includes('logistics_robots')) {
      const rec = language === 'ar'
        ? '💡 حلولنا اللوجستية تشمل سلسلة فولا وإيما للتعامل مع المواد'
        : '💡 Our logistics solutions include FOLA and EMMA series for material handling';
      recommendations.push(rec);
    }

    return recommendations.join('\n');
  }

  // Generate context-aware follow-up
  private generateContextAwareFollowUp(
    intent: string,
    entities: Record<string, string>,
    personalizationData: PersonalizationData
  ): string {
    const language = personalizationData.preferredLanguage;
    const followUps: string[] = [];

    switch (intent) {
      case 'product_inquiry':
        if (language === 'ar') {
          followUps.push('هل تريد معرفة المزيد عن الأسعار أو جدولة عرض توضيحي؟');
        } else {
          followUps.push('Would you like to know more about pricing or schedule a demo?');
        }
        break;

      case 'pricing_request':
        if (language === 'ar') {
          followUps.push('هل تريد التواصل مع فريق المبيعات للحصول على عرض سعر مفصل؟');
        } else {
          followUps.push('Would you like to contact our sales team for a detailed quote?');
        }
        break;

      case 'demo_request':
        if (language === 'ar') {
          followUps.push('يمكننا ترتيب عرض توضيحي في موقعكم أو في مقرنا الرئيسي');
        } else {
          followUps.push('We can arrange a demo at your location or at our main office');
        }
        break;

      case 'contact_request':
        if (language === 'ar') {
          followUps.push('فريقنا متاح 24/7 لمساعدتك. كيف تفضل التواصل معنا؟');
        } else {
          followUps.push('Our team is available 24/7 to help you. How would you prefer to contact us?');
        }
        break;
    }

    return followUps.join('\n');
  }

  // Generate contextual suggestions
  private generateContextualSuggestions(
    userMessage: string,
    personalizationData: PersonalizationData,
    intent: string,
    entities: Record<string, string>
  ): string[] {
    const language = personalizationData.preferredLanguage;
    const templates = this.suggestionTemplates.get(language) || [];

    // Filter suggestions based on intent and context
    const relevantSuggestions = templates.filter(suggestion => {
      // High priority for matching intent
      if (this.suggestionMatchesIntent(suggestion, intent)) {
        return true;
      }

      // Medium priority for related categories
      if (this.suggestionMatchesEntities(suggestion, entities)) {
        return true;
      }

      // Low priority for general suggestions
      return suggestion.priority >= 6;
    });

    // Sort by priority and return top 3
    return relevantSuggestions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 3)
      .map(s => s.text);
  }

  // Check if suggestion matches intent
  private suggestionMatchesIntent(suggestion: ConversationSuggestion, intent: string): boolean {
    const intentMappings: Record<string, string[]> = {
      'pricing_request': ['pricing', 'contact'],
      'demo_request': ['demo', 'contact'],
      'product_inquiry': ['technical', 'comparison', 'customization'],
      'contact_request': ['contact', 'support'],
      'support_request': ['support', 'contact']
    };

    const relevantCategories = intentMappings[intent] || [];
    return relevantCategories.includes(suggestion.category);
  }

  // Check if suggestion matches entities
  private suggestionMatchesEntities(suggestion: ConversationSuggestion, entities: Record<string, string>): boolean {
    if (entities.product && suggestion.category === 'technical') return true;
    if (entities.industry && suggestion.category === 'industries') return true;
    return false;
  }

  // Get conversation context summary
  private getConversationContext(personalizationData: PersonalizationData): string {
    const recentInteractions = personalizationData.previousInteractions.slice(-3);
    return recentInteractions.join(' → ');
  }

  // Get recommended actions based on intent and entities
  private getRecommendedActions(intent: string, entities: Record<string, string>): string[] {
    const actions: string[] = [];

    switch (intent) {
      case 'pricing_request':
        actions.push('provide_pricing_info', 'schedule_demo', 'contact_sales');
        break;
      case 'demo_request':
        actions.push('schedule_demo', 'contact_sales', 'provide_product_info');
        break;
      case 'product_inquiry':
        actions.push('provide_product_info', 'schedule_demo', 'provide_technical_specs');
        break;
      case 'contact_request':
        actions.push('provide_contact_info', 'connect_to_sales', 'schedule_callback');
        break;
      case 'support_request':
        actions.push('provide_support', 'escalate_to_technical', 'schedule_maintenance');
        break;
    }

    return actions;
  }

  // Calculate enhancement confidence
  private calculateEnhancementConfidence(
    originalResponse: string,
    enhancedResponse: string,
    personalizationData: PersonalizationData
  ): number {
    let confidence = 0.5; // Base confidence

    // Length increase indicates enhancement
    const lengthIncrease = enhancedResponse.length - originalResponse.length;
    if (lengthIncrease > 0) {
      confidence += Math.min(lengthIncrease / 1000, 0.3); // Max 0.3 for length
    }

    // Personalization data availability
    if (personalizationData.interests.length > 0) {
      confidence += 0.1;
    }

    if (personalizationData.conversationFlow.length > 0) {
      confidence += 0.1;
    }

    // User type confidence
    if (personalizationData.userType !== 'unknown') {
      confidence += 0.1;
    }

    return Math.min(confidence, 1.0);
  }

  // Get enhancement type
  private getEnhancementType(originalResponse: string, enhancedResponse: string): string {
    if (enhancedResponse.length > originalResponse.length * 1.5) {
      return 'comprehensive_enhancement';
    } else if (enhancedResponse.includes('💡') || enhancedResponse.includes('💡')) {
      return 'recommendation_enhancement';
    } else if (enhancedResponse !== originalResponse) {
      return 'contextual_enhancement';
    } else {
      return 'no_enhancement';
    }
  }

  // Update personalization data
  updatePersonalizationData(sessionId: string, updates: Partial<PersonalizationData>): void {
    const existing = this.personalizationData.get(sessionId) || {
      sessionId,
      interests: [],
      previousInteractions: [],
      preferredLanguage: 'en',
      conversationFlow: [],
      lastInteraction: new Date(),
      userType: 'unknown'
    };

    const updated = { ...existing, ...updates, lastInteraction: new Date() };
    this.personalizationData.set(sessionId, updated);
  }

  // Get personalization data
  getPersonalizationData(sessionId: string): PersonalizationData | undefined {
    return this.personalizationData.get(sessionId);
  }

  // Create new personalization data
  createPersonalizationData(sessionId: string, language: 'en' | 'ar' = 'en'): PersonalizationData {
    const data: PersonalizationData = {
      sessionId,
      interests: [],
      previousInteractions: [],
      preferredLanguage: language,
      conversationFlow: [],
      lastInteraction: new Date(),
      userType: 'unknown'
    };

    this.personalizationData.set(sessionId, data);
    return data;
  }

  // Get analytics
  getAnalytics(): {
    totalSessions: number;
    averageConfidence: number;
    enhancementTypes: Record<string, number>;
    topInterests: Array<{ interest: string; count: number }>;
  } {
    const sessions = Array.from(this.personalizationData.values());
    
    const analytics = {
      totalSessions: sessions.length,
      averageConfidence: 0,
      enhancementTypes: {} as Record<string, number>,
      topInterests: [] as Array<{ interest: string; count: number }>
    };

    // Count interests
    const interestCounts: Record<string, number> = {};
    sessions.forEach(session => {
      session.interests.forEach(interest => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1;
      });
    });

    analytics.topInterests = Object.entries(interestCounts)
      .map(([interest, count]) => ({ interest, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return analytics;
  }
}

// Export singleton instance
export const responseEnhancementService = new ResponseEnhancementService();
export default responseEnhancementService;
