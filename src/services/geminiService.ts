// Import smart features service
import { smartFeaturesService, IntentResult, ConversationContext } from './smartFeaturesService';
import { knowledgeBaseService } from './knowledgeBaseService';
import { responseEnhancementService, ResponseEnhancement } from './responseEnhancementService';

// Dynamic import for Google Generative AI
let GoogleGenerativeAI: any = null;
let genAI: any = null;

// Initialize Gemini AI dynamically
try {
  const { GoogleGenerativeAI: GAI } = require('@google/generative-ai');
  GoogleGenerativeAI = GAI;
  // API key configuration - use environment variable for localhost, fallback for production
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyB-fbqbZrJVAiQsoyPO1RSq4qn0cUVUfKk';
  genAI = new GoogleGenerativeAI(apiKey);
} catch (error) {
  // Google Generative AI package not available
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: 'en' | 'ar';
}

export interface AIResponse {
  message: string;
  language: 'en' | 'ar';
  confidence: number;
  suggestedActions?: string[];
  intent?: string;
  entities?: Record<string, string>;
  spellingCorrection?: {
    original: string;
    corrected: string;
    confidence: number;
  };
  contextAware?: boolean;
  enhancement?: ResponseEnhancement;
  suggestions?: string[];
}

// Company Knowledge Base - Comprehensive product and use case information
const COMPANY_KNOWLEDGE_BASE = {
  en: `
INC Robotics Company Information:
- Founded in 2021, leading Saudi robotics company
- Mission: Revolutionize industries through cutting-edge robotics and AI solutions
- Vision: Global leader in intelligent automation
- Values: Innovation, Excellence, Collaboration, Sustainability
- Location: 2449 Said ibn Zayd Rd, Qurtubah, 6582, Riyadh 13248, Saudi Arabia
- P.O. Box: 4528 Riyadh 12482-7021

DETAILED PRODUCT SPECIFICATIONS:

1. SERVICE ROBOTS:

NOVA - AI-Powered Hospitality Robot:
- 36 cm HD display with ultra-high-definition resolution
- Qualcomm Snapdragon Octa-Core CPU for powerful performance
- 6-microphone array with 97%+ speech recognition accuracy
- HD wide-angle dual cameras (13MP) for clear face-to-face interaction
- AI voice capability with 5-meter effective pickup range
- LiDAR + depth camera navigation with smart-following
- 12-hour battery life with automatic self-charging (4.5 hour charge)
- 24/7 non-stop operation capability
- Supports 31+ languages with easy customization
- Features: Tour guide, reception service, intelligent Q&A, dynamic promotion
- Use Cases: Hotels, hospitals, shopping malls, airports, corporate offices

LuckiBot - Welcoming Service Robot:
- Advanced AI and machine learning capabilities
- Human-robot interaction with natural language processing
- Adaptive behavior systems for different environments
- Multi-modal communication (voice, display, gestures)
- Use Cases: Reception areas, customer service, information desks, VIP lounges

LuckiPro - Premium VIP Services:
- Enhanced capabilities for high-end hospitality
- Premium customer service features
- VIP lounge management
- Use Cases: Luxury hotels, VIP areas, premium events, executive offices

Mini - Educational Service Robot:
- Compact design perfect for educational facilities
- Project publishing and presentation capabilities
- Student interaction and engagement features
- Use Cases: Schools, universities, training centers, educational exhibitions

Autodoor - Automated Door Management:
- Automated door services and event publishing
- Security integration capabilities
- Event management features
- Use Cases: Corporate buildings, event venues, security checkpoints

2. CLEANING ROBOTS:

50 Pro - Corporate Cleaning Robot:
- Specialized for corporate and banking facilities
- High-efficiency cleaning with precision navigation
- Multi-surface cleaning capabilities
- Use Cases: Office buildings, banks, corporate headquarters, professional facilities

75 - Outdoor & Warehouse Cleaning:
- Designed for outdoor and warehouse environments
- Heavy-duty cleaning capabilities
- Weather-resistant operation
- Use Cases: Warehouses, outdoor spaces, industrial facilities, parking areas

Phantas - Cinema & Specialized Cleaning:
- Quiet operation for sensitive environments
- Specialized cleaning for entertainment venues
- Advanced navigation for complex layouts
- Use Cases: Cinemas, theaters, entertainment venues, cultural centers

Vacum 40 - High-Efficiency Vacuum:
- High-efficiency vacuum cleaning technology
- Compact design for various spaces
- Advanced suction capabilities
- Use Cases: Hotels, offices, residential buildings, commercial spaces

Omnie - Multi-Surface Cleaning:
- Multi-surface cleaning capabilities
- Adaptive cleaning for different floor types
- Smart scheduling and autonomous operation
- Use Cases: Mixed-use facilities, retail spaces, healthcare facilities

3. LOGISTICS ROBOTS:

FOLA Series - Material Handling:
- BN-2001: Light-duty material handling
- DN-1416: Medium-duty operations
- QN-1416: Quad navigation system
- PN1530: Pallet handling capabilities
- QN2030: Heavy-duty material transport
- Use Cases: Manufacturing, warehouses, distribution centers, logistics hubs

EMMA Series - Multi-Capacity Logistics:
- 400K: 400kg capacity, compact design
- 400L: 400kg capacity, large platform
- 600K: 600kg capacity, compact design
- 600L: 600kg capacity, large platform
- 1000K: 1000kg capacity, compact design
- 1500K: 1500kg capacity, compact design
- 1500L: 1500kg capacity, large platform
- Use Cases: Manufacturing lines, warehouse operations, material transport

OMNI Series - Heavy-Duty Industrial:
- 1.5T: 1.5-ton capacity for medium operations
- 2.5T: 2.5-ton capacity for heavy operations
- 3.5T: 3.5-ton capacity for industrial use
- 5T: 5-ton capacity for maximum load handling
- Use Cases: Heavy manufacturing, construction sites, industrial facilities

LUNA Series - High-Capacity Solutions:
- 5T: 5-ton capacity for large operations
- 20T: 20-ton capacity for massive projects
- 30T: 30-ton capacity for industrial giants
- Use Cases: Large-scale manufacturing, mega projects, industrial complexes

CarryBot - Material Transport:
- Specialized material transport solutions
- Flexible cargo handling
- Use Cases: Manufacturing, logistics, material handling

Mora - Specialized Logistics:
- Specialized logistics handling
- Custom solutions for unique requirements
- Use Cases: Specialized industries, custom logistics needs

REAL CLIENT IMPLEMENTATIONS:

Healthcare Sector:
- Hospitals: Welcoming robots for patient assistance, cleaning robots for facility maintenance
- Medical Centers: Educational robots for patient guidance, specialized cleaning robots for sensitive areas
- Clinics: Automated access robots, efficient cleaning solutions

Hospitality Sector:
- Hotels: Welcoming robots for guest services, VIP service robots, cleaning robots for room maintenance
- Resorts: Outdoor cleaning robots, guest assistance robots
- Event Venues: Access control robots, information robots for events

Education Sector:
- Universities: Student service robots, campus guidance robots
- Schools: Reception robots, facility cleaning robots
- Training Centers: Educational information robots, specialized cleaning robots

Manufacturing Sector:
- Factories: Material handling robots, logistics robots for operations
- Warehouses: Heavy-duty logistics robots, transport robots
- Industrial Facilities: Complete logistics solutions with cleaning robots

Banking & Corporate:
- Banks: Customer service robots, facility cleaning robots
- Corporate Offices: Reception robots, security robots
- Financial Centers: Complete service and cleaning solutions

Government & Public Sector:
- Government Buildings: Citizen service robots, maintenance robots
- Public Facilities: Information robots, outdoor cleaning robots
- Cultural Centers: Specialized cleaning robots, visitor service robots

MAJOR CLIENTS & SUCCESS STORIES:
- Aramco: Industrial logistics and cleaning solutions
- SAB (Saudi Arabian Bank): Banking service robots and facility cleaning
- SEC (Saudi Electricity Company): Corporate service and maintenance robots
- King Saud University: Educational robots and campus cleaning
- Aljouf University: University service and cleaning solutions
- EY (Ernst & Young): Corporate service robots
- KAFD (King Abdullah Financial District): Financial district automation
- HRDA (Human Resources Development Authority): Government facility automation

TECHNICAL CAPABILITIES:
- AI and Machine Learning: Advanced artificial intelligence for adaptive behavior
- Multi-language Support: 31+ languages with easy customization
- Integration Capabilities: Seamless integration with existing systems
- 24/7 Operation: Continuous operation with automatic charging
- Real-time Analytics: Comprehensive reporting and analytics
- Remote Monitoring: Centralized monitoring and management
- Scalable Solutions: From single units to enterprise-wide deployments
`,

  ar: `
معلومات شركة إنك روبوتكس:
- تأسست عام 2021، شركة سعودية رائدة في مجال الروبوتات
- المهمة: إحداث ثورة في الصناعات من خلال حلول روبوتية وذكاء اصطناعي متطورة
- الرؤية: أن نكون الرائد العالمي في الأتمتة الذكية
- القيم: الابتكار، التميز، التعاون، الاستدامة
- الموقع: قرطبة، شارع سعيد بن زيد، الرياض 13248، المملكة العربية السعودية
- صندوق البريد: 4528 الرياض 12482-7021

المواصفات التفصيلية للمنتجات:

1. روبوتات الخدمة:

نوفا - روبوت الضيافة الذكي:
- شاشة عالية الدقة 36 سم مع دقة فائقة الوضوح
- معالج كوالكوم سناب دراغون ثماني النواة للأداء القوي
- مجموعة 6 ميكروفونات مع دقة 97%+ في التعرف على الكلام
- كاميرات مزدوجة عالية الدقة (13 ميجابكسل) للتفاعل الواضح
- قدرات صوتية ذكية مع نطاق فعال 5 أمتار
- ملاحة LiDAR + كاميرا العمق مع المتابعة الذكية
- بطارية 12 ساعة مع شحن تلقائي (4.5 ساعة شحن)
- قدرة التشغيل 24/7 بدون توقف
- دعم 31+ لغة مع تخصيص سهل
- المميزات: دليل سياحي، خدمة الاستقبال، أسئلة وأجوبة ذكية، ترويج ديناميكي
- حالات الاستخدام: الفنادق، المستشفيات، المراكز التجارية، المطارات، المكاتب

لوكي - روبوت الخدمة الترحيبي:
- قدرات ذكاء اصطناعي وتعلم آلة متقدمة
- تفاعل الإنسان مع الروبوت مع معالجة اللغة الطبيعية
- أنظمة سلوك تكيفية للبيئات المختلفة
- تواصل متعدد الوسائط (صوت، عرض، إيماءات)
- حالات الاستخدام: مناطق الاستقبال، خدمة العملاء، مكاتب المعلومات، صالات VIP

لوكي برو - خدمات VIP المتميزة:
- قدرات محسنة للضيافة عالية الجودة
- ميزات خدمة عملاء متميزة
- إدارة صالات VIP
- حالات الاستخدام: الفنادق الفاخرة، مناطق VIP، الفعاليات المتميزة، المكاتب التنفيذية

ميني - روبوت الخدمة التعليمي:
- تصميم مدمج مثالي للمرافق التعليمية
- قدرات نشر المشاريع والعروض التقديمية
- ميزات تفاعل الطلاب والانخراط
- حالات الاستخدام: المدارس، الجامعات، مراكز التدريب، المعارض التعليمية

أوتودور - إدارة الأبواب الآلية:
- خدمات أبواب آلية ونشر الفعاليات
- قدرات تكامل الأمان
- ميزات إدارة الفعاليات
- حالات الاستخدام: المباني الشركاتية، أماكن الفعاليات، نقاط التفتيش الأمنية

2. روبوتات التنظيف:

50 برو - روبوت التنظيف الشركاتي:
- متخصص لتنظيف المرافق الشركاتية والمصرفية
- تنظيف عالي الكفاءة مع ملاحة دقيقة
- قدرات تنظيف متعددة الأسطح
- حالات الاستخدام: المباني المكتبية، البنوك، المقرات الرئيسية، المرافق المهنية

75 - تنظيف خارجي ومستودعات:
- مصمم للبيئات الخارجية والمستودعات
- قدرات تنظيف ثقيلة
- تشغيل مقاوم للطقس
- حالات الاستخدام: المستودعات، المساحات الخارجية، المرافق الصناعية، مواقف السيارات

فانتاس - تنظيف السينما والمتخصص:
- تشغيل هادئ للبيئات الحساسة
- تنظيف متخصص لأماكن الترفيه
- ملاحة متقدمة للتخطيطات المعقدة
- حالات الاستخدام: دور السينما، المسارح، أماكن الترفيه، المراكز الثقافية

فاكيوم 40 - مكنسة كهربائية عالية الكفاءة:
- تقنية تنظيف بالمكنسة الكهربائية عالية الكفاءة
- تصميم مدمج للمساحات المختلفة
- قدرات شفط متقدمة
- حالات الاستخدام: الفنادق، المكاتب، المباني السكنية، المساحات التجارية

أومني - تنظيف متعدد الأسطح:
- قدرات تنظيف متعددة الأسطح
- تنظيف تكيفي لأنواع الأرضيات المختلفة
- جدولة ذكية وتشغيل ذاتي
- حالات الاستخدام: المرافق متعددة الاستخدامات، المساحات التجارية، المرافق الصحية

3. روبوتات اللوجستيات:

سلسلة فولا - معالجة المواد:
- BN-2001: معالجة مواد خفيفة
- DN-1416: عمليات متوسطة
- QN-1416: نظام ملاحة رباعي
- PN1530: قدرات معالجة البالتات
- QN2030: نقل مواد ثقيل
- حالات الاستخدام: التصنيع، المستودعات، مراكز التوزيع، محاور اللوجستيات

سلسلة إيما - لوجستيات متعددة السعة:
- 400K: سعة 400 كيلو، تصميم مدمج
- 400L: سعة 400 كيلو، منصة كبيرة
- 600K: سعة 600 كيلو، تصميم مدمج
- 600L: سعة 600 كيلو، منصة كبيرة
- 1000K: سعة 1000 كيلو، تصميم مدمج
- 1500K: سعة 1500 كيلو، تصميم مدمج
- 1500L: سعة 1500 كيلو، منصة كبيرة
- حالات الاستخدام: خطوط التصنيع، عمليات المستودعات، نقل المواد

سلسلة أومني - صناعي ثقيل:
- 1.5T: سعة 1.5 طن للعمليات المتوسطة
- 2.5T: سعة 2.5 طن للعمليات الثقيلة
- 3.5T: سعة 3.5 طن للاستخدام الصناعي
- 5T: سعة 5 أطنان لمعالجة الأحمال القصوى
- حالات الاستخدام: التصنيع الثقيل، مواقع البناء، المرافق الصناعية

سلسلة لونا - حلول عالية السعة:
- 5T: سعة 5 أطنان للعمليات الكبيرة
- 20T: سعة 20 طن للمشاريع الضخمة
- 30T: سعة 30 طن للعملاق الصناعية
- حالات الاستخدام: التصنيع واسع النطاق، المشاريع الضخمة، المجمعات الصناعية

كاري بوت - نقل المواد:
- حلول نقل مواد متخصصة
- معالجة شحن مرنة
- حالات الاستخدام: التصنيع، اللوجستيات، معالجة المواد

مورا - لوجستيات متخصصة:
- معالجة لوجستية متخصصة
- حلول مخصصة للمتطلبات الفريدة
- حالات الاستخدام: الصناعات المتخصصة، احتياجات لوجستية مخصصة

التطبيقات الحقيقية للعملاء:

قطاع الرعاية الصحية:
- المستشفيات: روبوتات الترحيب لمساعدة المرضى، روبوتات التنظيف لصيانة المرافق
- المراكز الطبية: روبوتات تعليمية لتوجيه المرضى، روبوتات تنظيف متخصصة للمناطق الحساسة
- العيادات: روبوتات الوصول الآلي، حلول تنظيف فعالة

قطاع الضيافة:
- الفنادق: روبوتات الترحيب لخدمات الضيوف، روبوتات خدمة VIP، روبوتات التنظيف لصيانة الغرف
- المنتجعات: روبوتات التنظيف الخارجي، روبوتات مساعدة الضيوف
- أماكن الفعاليات: روبوتات مراقبة الوصول، روبوتات المعلومات للفعاليات

قطاع التعليم:
- الجامعات: روبوتات خدمة الطلاب، روبوتات توجيه الحرم الجامعي
- المدارس: روبوتات الاستقبال، روبوتات تنظيف المرافق
- مراكز التدريب: روبوتات المعلومات التعليمية، روبوتات التنظيف المتخصصة

قطاع التصنيع:
- المصانع: روبوتات معالجة المواد، روبوتات اللوجستيات للعمليات
- المستودعات: روبوتات اللوجستيات الثقيلة، روبوتات النقل
- المرافق الصناعية: حلول لوجستية كاملة مع روبوتات التنظيف

البنوك والشركات:
- البنوك: روبوتات خدمة العملاء، روبوتات تنظيف المرافق
- المكاتب الشركاتية: روبوتات الاستقبال، روبوتات الأمان
- المراكز المالية: حلول خدمة وتنظيف كاملة

القطاع الحكومي والعام:
- المباني الحكومية: روبوتات خدمة المواطنين، روبوتات الصيانة
- المرافق العامة: روبوتات المعلومات، روبوتات التنظيف الخارجي
- المراكز الثقافية: روبوتات التنظيف المتخصصة، روبوتات خدمة الزوار

العملاء الكبار وقصص النجاح:
- أرامكو: حلول لوجستية صناعية وتنظيف
- ساب (البنك السعودي): روبوتات خدمة مصرفية وتنظيف مرافق
- الشركة السعودية للكهرباء: روبوتات خدمة وصيانة شركاتية
- جامعة الملك سعود: روبوتات تعليمية وتنظيف الحرم الجامعي
- جامعة الجوف: حلول خدمة وتنظيف جامعية
- إرنست آند يونغ: روبوتات خدمة شركاتية
- صندوق التنمية العقارية: أتمتة المنطقة المالية
- هيئة تنمية الموارد البشرية: أتمتة المرافق الحكومية

القدرات التقنية:
- الذكاء الاصطناعي وتعلم الآلة: ذكاء اصطناعي متقدم للسلوك التكيفي
- دعم متعدد اللغات: 31+ لغة مع تخصيص سهل
- قدرات التكامل: تكامل سلس مع الأنظمة الموجودة
- التشغيل 24/7: تشغيل مستمر مع شحن تلقائي
- التحليلات في الوقت الفعلي: تقارير وتحليلات شاملة
- المراقبة عن بُعد: مراقبة وإدارة مركزية
- حلول قابلة للتوسع: من وحدات فردية إلى نشر على مستوى المؤسسة
`
};

class GeminiAIService {
  private model: any;
  private conversationHistory: ChatMessage[] = [];
  private conversationContexts: Map<string, ConversationContext> = new Map();

  constructor() {
    if (genAI) {
      this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    } else {
      this.model = null;
    }
  }

  // Get system prompt based on language
  private getSystemPrompt(language: 'en' | 'ar'): string {
    const knowledgeBase = COMPANY_KNOWLEDGE_BASE[language];
    
    if (language === 'ar') {
      return `
أنت مساعد ذكي لشركة إنك روبوتكس، شركة سعودية رائدة في مجال الروبوتات والذكاء الاصطناعي.

مهمتك:
- الإجابة على أسئلة العملاء حول منتجاتنا وخدماتنا
- تقديم معلومات دقيقة عن روبوتات الخدمة والتنظيف واللوجستيات
- مساعدة العملاء في اختيار الحلول المناسبة لاحتياجاتهم
- تقديم معلومات عن الأسعار والمواصفات التقنية
- مشاركة قصص النجاح ودراسات الحالة
- توجيه العملاء للتواصل مع فريق المبيعات عند الحاجة

قواعد مهمة:
- كن مهنياً ومفيداً دائماً
- استخدم المعلومات الصحيحة من قاعدة المعرفة
- إذا لم تكن متأكداً من شيء، اعترف بذلك ووجه العميل للتواصل معنا
- كن دقيقاً في المعلومات التقنية
- استخدم لغة عربية واضحة ومفهومة

قاعدة المعرفة:
${knowledgeBase}

أجب على استفسار العميل بطريقة مفيدة ومهنية.
`;
    } else {
      return `
You are an intelligent assistant for INC Robotics, a leading Saudi robotics and AI company.

Your role:
- Answer customer questions about our products and services
- Provide accurate information about our Service, Cleaning, and Logistics robots
- Help customers choose the right solutions for their needs
- Provide information about pricing and technical specifications
- Share success stories and case studies
- Direct customers to our sales team when needed

Important rules:
- Always be professional and helpful
- Use accurate information from the knowledge base
- If you're unsure about something, admit it and direct the customer to contact us
- Be precise with technical information
- Use clear and understandable language

Knowledge Base:
${knowledgeBase}

Answer the customer's inquiry in a helpful and professional manner.
`;
    }
  }

  // Get enhanced system prompt with context awareness
  private getEnhancedSystemPrompt(
    language: 'en' | 'ar', 
    context: ConversationContext, 
    intentResult: IntentResult
  ): string {
    const basePrompt = this.getSystemPrompt(language);
    
    // Add context awareness
    let contextInfo = '';
    if (context.userPreferences.interests.length > 0) {
      const interests = context.userPreferences.interests.join(', ');
      contextInfo = language === 'ar' 
        ? `\n\nسياق المحادثة: العميل مهتم بـ: ${interests}`
        : `\n\nConversation Context: Customer is interested in: ${interests}`;
    }

    // Add intent-specific guidance
    let intentGuidance = '';
    switch (intentResult.intent) {
      case 'pricing_request':
        intentGuidance = language === 'ar' 
          ? '\n\nتوجيه: العميل يسأل عن الأسعار. قدم معلومات عامة عن التسعير ووجهه للتواصل مع فريق المبيعات للحصول على عرض سعر مفصل.'
          : '\n\nGuidance: Customer is asking about pricing. Provide general pricing information and direct them to contact our sales team for detailed quotes.';
        break;
      case 'demo_request':
        intentGuidance = language === 'ar' 
          ? '\n\nتوجيه: العميل يطلب عرض توضيحي. قدم معلومات عن كيفية جدولة العرض ووجهه للتواصل مع فريق المبيعات.'
          : '\n\nGuidance: Customer is requesting a demo. Provide information on how to schedule a demo and direct them to contact our sales team.';
        break;
      case 'product_inquiry':
        intentGuidance = language === 'ar' 
          ? '\n\nتوجيه: العميل يسأل عن منتج معين. قدم معلومات تفصيلية عن المنتج المطلوب.'
          : '\n\nGuidance: Customer is asking about a specific product. Provide detailed information about the requested product.';
        break;
    }

    // Add entity-specific information from knowledge base
    let entityInfo = '';
    if (intentResult.entities.product) {
      const searchResults = knowledgeBaseService.search(
        intentResult.entities.product, 
        language, 
        intentResult.entities.product
      );
      
      if (searchResults.length > 0) {
        const topResult = searchResults[0];
        entityInfo = language === 'ar' 
          ? `\n\nمعلومات المنتج المحدد من قاعدة المعرفة:\n${topResult.snippet}`
          : `\n\nSpecific Product Information from Knowledge Base:\n${topResult.snippet}`;
      }
    }

    // Add relevant knowledge base content based on conversation context
    let relevantKnowledge = '';
    if (context.conversationHistory.length > 0) {
      const lastMessage = context.conversationHistory[context.conversationHistory.length - 1];
      const searchResults = knowledgeBaseService.search(lastMessage.message, language);
      
      if (searchResults.length > 0) {
        const topResults = searchResults.slice(0, 2);
        relevantKnowledge = language === 'ar' 
          ? `\n\nمعلومات ذات صلة من قاعدة المعرفة:\n${topResults.map(r => r.snippet).join('\n\n')}`
          : `\n\nRelevant Information from Knowledge Base:\n${topResults.map(r => r.snippet).join('\n\n')}`;
      }
    }

    return basePrompt + contextInfo + intentGuidance + entityInfo + relevantKnowledge;
  }

  // Get product-specific information
  private getProductSpecificInfo(productCategory: string, language: 'en' | 'ar'): string {
    const productInfo: Record<string, { en: string; ar: string }> = {
      'service_robots': {
        en: 'Service Robots: NOVA (AI-powered hospitality), LuckiBot (welcoming service), LuckiPro (VIP services), Mini (educational), Autodoor (automated doors)',
        ar: 'روبوتات الخدمة: نوفا (ضيافة ذكية)، لوكي بوت (خدمة ترحيبية)، لوكي برو (خدمات VIP)، ميني (تعليمي)، أوتودور (أبواب آلية)'
      },
      'cleaning_robots': {
        en: 'Cleaning Robots: 50 Pro (corporate cleaning), 75 (outdoor/warehouse), Phantas (cinema/specialized), Vacum 40 (high-efficiency), Omnie (multi-surface)',
        ar: 'روبوتات التنظيف: 50 برو (تنظيف شركاتي)، 75 (خارجي/مستودعات)، فانتاس (سينما/متخصص)، فاكيوم 40 (عالي الكفاءة)، أومني (متعدد الأسطح)'
      },
      'logistics_robots': {
        en: 'Logistics Robots: FOLA series (material handling), EMMA series (multi-capacity), OMNI series (heavy-duty), LUNA series (high-capacity), CarryBot, Mora',
        ar: 'روبوتات اللوجستيات: سلسلة فولا (معالجة المواد)، سلسلة إيما (متعددة السعة)، سلسلة أومني (ثقيل)، سلسلة لونا (عالي السعة)، كاري بوت، مورا'
      }
    };

    return productInfo[productCategory]?.[language] || '';
  }

  // Process user message and get AI response with smart features
  async processMessage(
    userMessage: string, 
    language: 'en' | 'ar' = 'en',
    sessionId?: string
  ): Promise<AIResponse> {
    try {
      // Get or create conversation context
      const context = sessionId 
        ? this.conversationContexts.get(sessionId) || smartFeaturesService.createConversationContext(sessionId, language)
        : smartFeaturesService.createConversationContext(`session_${Date.now()}`, language);

      // Spelling correction
      const spellingCorrection = smartFeaturesService.correctSpelling(userMessage);
      const correctedMessage = spellingCorrection.confidence > 0.7 ? spellingCorrection.corrected : userMessage;

      // Intent recognition
      const intentResult = smartFeaturesService.recognizeIntent(correctedMessage, context);

      // Add user message to conversation history
      const userChatMessage: ChatMessage = {
        id: Date.now().toString(),
        text: userMessage,
        isUser: true,
        timestamp: new Date(),
        language
      };
      this.conversationHistory.push(userChatMessage);

      // Update conversation context
      smartFeaturesService.updateConversationContext(
        context.sessionId,
        'user',
        userMessage,
        intentResult.intent,
        intentResult.entities
      );

      // Check if we have a valid model (which means API key is working)
      
      if (!this.model) {
        // Return error if no model (which means API key failed)
        const errorMessage = language === 'ar' 
          ? 'عذراً، مفتاح API غير متوفر. يرجى التحقق من الإعدادات.'
          : 'Sorry, API key is not available. Please check the configuration.';
        
        return {
          message: errorMessage,
          language,
          confidence: 0.1,
          suggestedActions: ['contact_support'],
          intent: intentResult.intent,
          entities: intentResult.entities,
          spellingCorrection: spellingCorrection.confidence > 0.7 ? {
            original: spellingCorrection.original,
            corrected: spellingCorrection.corrected,
            confidence: spellingCorrection.confidence
          } : undefined,
          contextAware: true
        };
      }

      // Enhanced system prompt with context awareness
      const systemPrompt = this.getEnhancedSystemPrompt(language, context, intentResult);

      // Use real Gemini API with enhanced context
      const chat = this.model.startChat({
        history: this.conversationHistory.map(msg => ({
          role: msg.isUser ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }))
      });

      const result = await chat.sendMessage(systemPrompt + '\n\nUser: ' + correctedMessage);
      let aiResponse = result.response.text();

      // Enhance response with smart features
      aiResponse = smartFeaturesService.enhanceResponse(aiResponse, context, intentResult);

      // Get or create personalization data
      let personalizationData = responseEnhancementService.getPersonalizationData(context.sessionId);
      if (!personalizationData) {
        personalizationData = responseEnhancementService.createPersonalizationData(context.sessionId, language);
      }

      // Update personalization data with current interaction
      responseEnhancementService.updatePersonalizationData(context.sessionId, {
        interests: context.userPreferences.interests,
        previousInteractions: [...personalizationData.previousInteractions, userMessage],
        conversationFlow: [...personalizationData.conversationFlow, intentResult.intent],
        userType: intentResult.entities.urgency === 'urgent' ? 'prospect' : personalizationData.userType
      });

      // Apply response enhancement
      const enhancement = responseEnhancementService.enhanceResponse(
        aiResponse,
        userMessage,
        personalizationData,
        intentResult.intent,
        intentResult.entities
      );

      // Use enhanced response if available
      const finalResponse = enhancement.enhancedResponse || aiResponse;

      // Add AI response to conversation history
      const aiChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: finalResponse,
        isUser: false,
        timestamp: new Date(),
        language
      };
      this.conversationHistory.push(aiChatMessage);

      // Update conversation context with AI response
      smartFeaturesService.updateConversationContext(
        context.sessionId,
        'assistant',
        finalResponse,
        intentResult.intent
      );

      return {
        message: finalResponse,
        language,
        confidence: 0.8 + (intentResult.confidence * 0.2) + (enhancement.confidence * 0.1), // Boost confidence based on enhancements
        suggestedActions: intentResult.suggestedActions,
        intent: intentResult.intent,
        entities: intentResult.entities,
        spellingCorrection: spellingCorrection.confidence > 0.7 ? {
          original: spellingCorrection.original,
          corrected: spellingCorrection.corrected,
          confidence: spellingCorrection.confidence
        } : undefined,
        contextAware: true,
        enhancement: enhancement,
        suggestions: enhancement.suggestions
      };

    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback response
      const fallbackResponse = this.getFallbackResponse(language);
      
      return {
        message: fallbackResponse,
        language,
        confidence: 0.1,
        suggestedActions: ['contact_support'],
        contextAware: false
      };
    }
  }

  // Get welcome message based on language
  getWelcomeMessage(language: 'en' | 'ar'): string {
    if (language === 'ar') {
      return 'مرحباً! أنا علي، المساعد الذكي لمعيار الذكاء . كيف يمكنني مساعدتك اليوم؟';
    } else {
      return 'Hey! I\'m Ali, the INC Robotics smart agent. How can I help you today?';
    }
  }

  // Get fallback response when AI fails
  private getFallbackResponse(language: 'en' | 'ar'): string {
    if (language === 'ar') {
      return 'عذراً، حدث خطأ في النظام. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.';
    } else {
      return 'Sorry, there was an error with the system. Please try again or contact us directly.';
    }
  }

  // Get suggested actions based on AI response
  private getSuggestedActions(response: string, language: 'en' | 'ar'): string[] {
    const actions: string[] = [];
    
    if (response.toLowerCase().includes('price') || response.includes('سعر')) {
      actions.push('request_pricing');
    }
    
    if (response.toLowerCase().includes('demo') || response.includes('عرض')) {
      actions.push('schedule_demo');
    }
    
    if (response.toLowerCase().includes('contact') || response.includes('اتصال')) {
      actions.push('contact_sales');
    }
    
    if (response.toLowerCase().includes('support') || response.includes('دعم')) {
      actions.push('contact_support');
    }
    
    return actions;
  }

  // Clear conversation history
  clearHistory(): void {
    this.conversationHistory = [];
  }

  // Get conversation history
  getHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }
}

// Export singleton instance
export const geminiAIService = new GeminiAIService();
export default geminiAIService;