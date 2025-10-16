// Smart Features Service for AI Agent
// Implements spelling correction, fuzzy matching, intent recognition, and response enhancement

export interface IntentResult {
  intent: string;
  confidence: number;
  entities: Record<string, string>;
  suggestedActions: string[];
}

export interface SpellingCorrection {
  original: string;
  corrected: string;
  confidence: number;
  suggestions: string[];
}

export interface ConversationContext {
  sessionId: string;
  userId?: string;
  language: 'en' | 'ar';
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    message: string;
    timestamp: Date;
    intent?: string;
    entities?: Record<string, string>;
  }>;
  userPreferences: {
    preferredLanguage: 'en' | 'ar';
    interests: string[];
    lastInteraction: Date;
  };
  currentTopic?: string;
  conversationFlow: string[];
}

class SmartFeaturesService {
  private conversationContexts: Map<string, ConversationContext> = new Map();
  private intentPatterns: Map<string, RegExp[]> = new Map();
  private productKeywords: Map<string, string[]> = new Map();
  private spellingDictionary: Set<string> = new Set();

  constructor() {
    this.initializeIntentPatterns();
    this.initializeProductKeywords();
    this.initializeSpellingDictionary();
  }

  // Initialize intent recognition patterns
  private initializeIntentPatterns(): void {
    this.intentPatterns.set('greeting', [
      /^(hello|hi|hey|good morning|good afternoon|good evening|مرحبا|السلام عليكم|أهلا|صباح الخير|مساء الخير)$/i,
      /^(how are you|how do you do|كيف حالك|كيفك)$/i
    ]);

    this.intentPatterns.set('product_inquiry', [
      /(tell me about|what is|show me|معلومات عن|ما هو|أخبرني عن)/i,
      /(robot|robots|روبوت|روبوتات)/i,
      /(cleaning|service|logistics|تنظيف|خدمة|لوجستيات)/i,
      /(price|cost|pricing|سعر|تكلفة|أسعار)/i
    ]);

    this.intentPatterns.set('pricing_request', [
      /(how much|price|cost|pricing|quotation|quote|سعر|تكلفة|أسعار|عرض سعر)/i,
      /(budget|affordable|cheap|expensive|ميزانية|رخيص|غالي)/i
    ]);

    this.intentPatterns.set('demo_request', [
      /(demo|demonstration|test|try|عرض|تجربة|اختبار)/i,
      /(schedule|book|arrange|حجز|ترتيب|جدولة)/i
    ]);

    this.intentPatterns.set('contact_request', [
      /(contact|call|phone|email|اتصال|هاتف|بريد إلكتروني)/i,
      /(speak to|talk to|meet|التحدث مع|مقابلة)/i
    ]);

    this.intentPatterns.set('support_request', [
      /(help|support|problem|issue|error|مساعدة|دعم|مشكلة|خطأ)/i,
      /(fix|repair|maintenance|إصلاح|صيانة)/i
    ]);

    this.intentPatterns.set('goodbye', [
      /^(bye|goodbye|see you|farewell|مع السلامة|وداعا|إلى اللقاء)$/i,
      /(thank you|thanks|شكرا|شكراً)/i
    ]);
  }

  // Initialize product keywords for better matching
  private initializeProductKeywords(): void {
    this.productKeywords.set('service_robots', [
      'nova', 'luckibot', 'luckipro', 'mini', 'autodoor',
      'نوفا', 'لوكي', 'لوكي برو', 'ميني', 'أوتودور'
    ]);

    this.productKeywords.set('cleaning_robots', [
      '50 pro', '75', 'phantas', 'vacum 40', 'omnie',
      '50 برو', '75', 'فانتاس', 'فاكيوم 40', 'أومني'
    ]);

    this.productKeywords.set('logistics_robots', [
      'fola', 'emma', 'omni', 'luna', 'carrybot', 'mora',
      'فولا', 'إيما', 'أومني', 'لونا', 'كاري بوت', 'مورا'
    ]);

    this.productKeywords.set('industries', [
      'healthcare', 'hospitality', 'education', 'manufacturing', 'banking',
      'رعاية صحية', 'ضيافة', 'تعليم', 'تصنيع', 'مصرفي'
    ]);
  }

  // Initialize spelling dictionary
  private initializeSpellingDictionary(): void {
    // Common robotics and technical terms
    const terms = [
      'robot', 'robots', 'robotics', 'automation', 'artificial', 'intelligence',
      'cleaning', 'service', 'logistics', 'manufacturing', 'hospitality',
      'healthcare', 'education', 'banking', 'corporate', 'industrial',
      'nova', 'luckibot', 'phantas', 'fola', 'emma', 'omni', 'luna',
      'inc', 'robotics', 'saudi', 'arabia', 'riyadh',
      'روبوت', 'روبوتات', 'أتمتة', 'ذكاء', 'اصطناعي',
      'تنظيف', 'خدمة', 'لوجستيات', 'تصنيع', 'ضيافة',
      'رعاية صحية', 'تعليم', 'مصرفي', 'شركاتي', 'صناعي'
    ];
    
    terms.forEach(term => this.spellingDictionary.add(term.toLowerCase()));
  }

  // Spelling correction using Levenshtein distance
  correctSpelling(input: string): SpellingCorrection {
    const words = input.toLowerCase().split(/\s+/);
    const correctedWords: string[] = [];
    const suggestions: string[] = [];
    let totalConfidence = 0;

    for (const word of words) {
      if (this.spellingDictionary.has(word)) {
        correctedWords.push(word);
        totalConfidence += 1;
      } else {
        const correction = this.findBestMatch(word);
        if (correction) {
          correctedWords.push(correction.word);
          suggestions.push(correction.word);
          totalConfidence += correction.confidence;
        } else {
          correctedWords.push(word);
          totalConfidence += 0.5; // Partial confidence for unknown words
        }
      }
    }

    return {
      original: input,
      corrected: correctedWords.join(' '),
      confidence: totalConfidence / words.length,
      suggestions: Array.from(new Set(suggestions))
    };
  }

  // Find best spelling match using Levenshtein distance
  private findBestMatch(word: string): { word: string; confidence: number } | null {
    let bestMatch = '';
    let bestConfidence = 0;

    for (const dictWord of Array.from(this.spellingDictionary)) {
      const distance = this.levenshteinDistance(word, dictWord);
      const maxLength = Math.max(word.length, dictWord.length);
      const confidence = 1 - (distance / maxLength);

      if (distance <= 2 && confidence > bestConfidence) {
        bestMatch = dictWord;
        bestConfidence = confidence;
      }
    }

    return bestConfidence > 0.6 ? { word: bestMatch, confidence: bestConfidence } : null;
  }

  // Calculate Levenshtein distance between two strings
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  // Intent recognition with context awareness
  recognizeIntent(message: string, context: ConversationContext): IntentResult {
    const normalizedMessage = message.toLowerCase().trim();
    let bestIntent = 'general_inquiry';
    let bestConfidence = 0;
    const entities: Record<string, string> = {};
    const suggestedActions: string[] = [];

    // Check each intent pattern
    for (const [intent, patterns] of Array.from(this.intentPatterns.entries())) {
      for (const pattern of patterns) {
        if (pattern.test(normalizedMessage)) {
          const confidence = this.calculateIntentConfidence(normalizedMessage, pattern, context);
          if (confidence > bestConfidence) {
            bestIntent = intent;
            bestConfidence = confidence;
          }
        }
      }
    }

    // Extract entities based on intent
    entities.product = this.extractProductEntity(normalizedMessage);
    entities.industry = this.extractIndustryEntity(normalizedMessage);
    entities.urgency = this.extractUrgencyEntity(normalizedMessage);

    // Generate suggested actions based on intent
    suggestedActions.push(...this.getSuggestedActionsForIntent(bestIntent, entities));

    return {
      intent: bestIntent,
      confidence: bestConfidence,
      entities,
      suggestedActions
    };
  }

  // Calculate intent confidence based on pattern match and context
  private calculateIntentConfidence(message: string, pattern: RegExp, context: ConversationContext): number {
    let confidence = 0.5; // Base confidence

    // Pattern match strength
    const match = message.match(pattern);
    if (match) {
      confidence += 0.3;
      if (match[0].length === message.length) confidence += 0.2; // Full match bonus
    }

    // Context awareness
    if (context.conversationFlow.length > 0) {
      const lastIntent = context.conversationFlow[context.conversationFlow.length - 1];
      if (this.isRelatedIntent(lastIntent, pattern)) {
        confidence += 0.1; // Context bonus
      }
    }

    // User preference awareness
    if (context.userPreferences.interests.length > 0) {
      const hasRelevantInterest = context.userPreferences.interests.some(interest =>
        message.includes(interest.toLowerCase())
      );
      if (hasRelevantInterest) confidence += 0.1;
    }

    return Math.min(confidence, 1.0);
  }

  // Check if intents are related
  private isRelatedIntent(lastIntent: string, currentPattern: RegExp): boolean {
    const relatedIntents: Record<string, string[]> = {
      'product_inquiry': ['pricing_request', 'demo_request'],
      'pricing_request': ['contact_request', 'demo_request'],
      'demo_request': ['contact_request', 'pricing_request']
    };

    return relatedIntents[lastIntent]?.some(intent => 
      this.intentPatterns.get(intent)?.includes(currentPattern)
    ) || false;
  }

  // Extract product entity from message
  private extractProductEntity(message: string): string {
    for (const [category, keywords] of Array.from(this.productKeywords.entries())) {
      for (const keyword of keywords) {
        if (message.includes(keyword.toLowerCase())) {
          return category;
        }
      }
    }
    return '';
  }

  // Extract industry entity from message
  private extractIndustryEntity(message: string): string {
    const industryKeywords = this.productKeywords.get('industries') || [];
    for (const keyword of industryKeywords) {
      if (message.includes(keyword.toLowerCase())) {
        return keyword;
      }
    }
    return '';
  }

  // Extract urgency entity from message
  private extractUrgencyEntity(message: string): string {
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'fast', 'عاجل', 'فوري', 'سريع'];
    const normalKeywords = ['when', 'schedule', 'available', 'متى', 'جدولة', 'متاح'];
    
    if (urgentKeywords.some(keyword => message.includes(keyword))) return 'urgent';
    if (normalKeywords.some(keyword => message.includes(keyword))) return 'normal';
    return 'normal';
  }

  // Get suggested actions for intent
  private getSuggestedActionsForIntent(intent: string, entities: Record<string, string>): string[] {
    const actions: string[] = [];

    switch (intent) {
      case 'product_inquiry':
        actions.push('provide_product_info');
        if (entities.product) actions.push('show_specific_product');
        break;
      case 'pricing_request':
        actions.push('provide_pricing_info');
        actions.push('schedule_demo');
        break;
      case 'demo_request':
        actions.push('schedule_demo');
        actions.push('contact_sales');
        break;
      case 'contact_request':
        actions.push('provide_contact_info');
        actions.push('connect_to_sales');
        break;
      case 'support_request':
        actions.push('provide_support');
        actions.push('escalate_to_technical');
        break;
      case 'greeting':
        actions.push('welcome_user');
        actions.push('offer_assistance');
        break;
      case 'goodbye':
        actions.push('thank_user');
        actions.push('offer_future_help');
        break;
    }

    return actions;
  }

  // Enhanced conversation memory management
  createConversationContext(sessionId: string, language: 'en' | 'ar'): ConversationContext {
    const context: ConversationContext = {
      sessionId,
      language,
      conversationHistory: [],
      userPreferences: {
        preferredLanguage: language,
        interests: [],
        lastInteraction: new Date()
      },
      conversationFlow: []
    };

    this.conversationContexts.set(sessionId, context);
    return context;
  }

  // Update conversation context
  updateConversationContext(
    sessionId: string, 
    role: 'user' | 'assistant', 
    message: string, 
    intent?: string,
    entities?: Record<string, string>
  ): void {
    const context = this.conversationContexts.get(sessionId);
    if (!context) return;

    context.conversationHistory.push({
      role,
      message,
      timestamp: new Date(),
      intent,
      entities
    });

    if (intent) {
      context.conversationFlow.push(intent);
    }

    context.userPreferences.lastInteraction = new Date();

    // Update user interests based on entities
    if (entities?.product && !context.userPreferences.interests.includes(entities.product)) {
      context.userPreferences.interests.push(entities.product);
    }
    if (entities?.industry && !context.userPreferences.interests.includes(entities.industry)) {
      context.userPreferences.interests.push(entities.industry);
    }

    // Keep only last 20 interactions for memory efficiency
    if (context.conversationHistory.length > 20) {
      context.conversationHistory = context.conversationHistory.slice(-20);
    }
    if (context.conversationFlow.length > 10) {
      context.conversationFlow = context.conversationFlow.slice(-10);
    }
  }

  // Get conversation context
  getConversationContext(sessionId: string): ConversationContext | undefined {
    return this.conversationContexts.get(sessionId);
  }

  // Enhanced response generation with context
  enhanceResponse(
    baseResponse: string, 
    context: ConversationContext, 
    intent: IntentResult
  ): string {
    let enhancedResponse = baseResponse;

    // Add context-aware greetings
    if (intent.intent === 'greeting' && context.conversationHistory.length === 0) {
      const greeting = context.language === 'ar' 
        ? 'مرحباً! أهلاً وسهلاً بك في إنك روبوتكس. '
        : 'Hello! Welcome to INC Robotics. ';
      enhancedResponse = greeting + enhancedResponse;
    }

    // Add personalized recommendations
    if (context.userPreferences.interests.length > 0) {
      const recommendations = this.generatePersonalizedRecommendations(context);
      if (recommendations) {
        enhancedResponse += '\n\n' + recommendations;
      }
    }

    // Add follow-up suggestions based on intent
    const followUp = this.generateFollowUpSuggestions(intent, context);
    if (followUp) {
      enhancedResponse += '\n\n' + followUp;
    }

    return enhancedResponse;
  }

  // Generate personalized recommendations
  private generatePersonalizedRecommendations(context: ConversationContext): string {
    const interests = context.userPreferences.interests;
    if (interests.length === 0) return '';

    const recommendations: string[] = [];
    
    if (interests.includes('service_robots')) {
      const rec = context.language === 'ar' 
        ? '💡 قد تكون مهتماً بروبوتات الخدمة مثل نوفا أو لوكي بوت'
        : '💡 You might be interested in our service robots like NOVA or LuckiBot';
      recommendations.push(rec);
    }

    if (interests.includes('cleaning_robots')) {
      const rec = context.language === 'ar' 
        ? '💡 لدينا مجموعة واسعة من روبوتات التنظيف مثل 50 برو وفانتاس'
        : '💡 We have a wide range of cleaning robots like 50 Pro and Phantas';
      recommendations.push(rec);
    }

    return recommendations.join('\n');
  }

  // Generate follow-up suggestions
  private generateFollowUpSuggestions(intent: IntentResult, context: ConversationContext): string {
    const suggestions: string[] = [];

    switch (intent.intent) {
      case 'product_inquiry':
        if (context.language === 'ar') {
          suggestions.push('هل تريد معرفة المزيد عن الأسعار أو جدولة عرض توضيحي؟');
        } else {
          suggestions.push('Would you like to know more about pricing or schedule a demo?');
        }
        break;
      case 'pricing_request':
        if (context.language === 'ar') {
          suggestions.push('هل تريد التواصل مع فريق المبيعات للحصول على عرض سعر مفصل؟');
        } else {
          suggestions.push('Would you like to contact our sales team for a detailed quote?');
        }
        break;
    }

    return suggestions.join('\n');
  }

  // Clear conversation context
  clearConversationContext(sessionId: string): void {
    this.conversationContexts.delete(sessionId);
  }

  // Get conversation analytics
  getConversationAnalytics(sessionId: string): {
    messageCount: number;
    averageResponseTime: number;
    topIntents: string[];
    userEngagement: number;
  } {
    const context = this.conversationContexts.get(sessionId);
    if (!context) {
      return {
        messageCount: 0,
        averageResponseTime: 0,
        topIntents: [],
        userEngagement: 0
      };
    }

    const messageCount = context.conversationHistory.length;
    const userMessages = context.conversationHistory.filter(msg => msg.role === 'user').length;
    const userEngagement = messageCount > 0 ? userMessages / messageCount : 0;

    // Count intent frequency
    const intentCounts: Record<string, number> = {};
    context.conversationFlow.forEach(intent => {
      intentCounts[intent] = (intentCounts[intent] || 0) + 1;
    });

    const topIntents = Object.entries(intentCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([intent]) => intent);

    return {
      messageCount,
      averageResponseTime: 0, // Would need timing data
      topIntents,
      userEngagement
    };
  }
}

// Export singleton instance
export const smartFeaturesService = new SmartFeaturesService();
export default smartFeaturesService;
