// Enhanced Knowledge Base Service
// Provides better categorization, search capabilities, and dynamic content management

export interface KnowledgeItem {
  id: string;
  category: string;
  subcategory?: string;
  title: string;
  content: string;
  language: 'en' | 'ar';
  tags: string[];
  priority: number;
  lastUpdated: Date;
  relatedItems: string[];
  searchKeywords: string[];
}

export interface SearchResult {
  item: KnowledgeItem;
  relevanceScore: number;
  matchedKeywords: string[];
  snippet: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon?: string;
  subcategories: string[];
  itemCount: number;
}

class KnowledgeBaseService {
  private knowledgeItems: Map<string, KnowledgeItem> = new Map();
  private categories: Map<string, CategoryInfo> = new Map();
  private searchIndex: Map<string, string[]> = new Map(); // keyword -> itemIds

  constructor() {
    this.initializeKnowledgeBase();
    this.buildSearchIndex();
  }

  // Initialize the knowledge base with comprehensive content
  private initializeKnowledgeBase(): void {
    this.initializeCategories();
    this.initializeServiceRobots();
    this.initializeCleaningRobots();
    this.initializeLogisticsRobots();
    this.initializeCompanyInfo();
    this.initializeUseCases();
    this.initializeTechnicalSpecs();
  }

  // Initialize categories
  private initializeCategories(): void {
    const categories: CategoryInfo[] = [
      {
        id: 'service_robots',
        name: 'Service Robots',
        description: 'AI-powered service robots for hospitality, education, and customer service',
        subcategories: ['hospitality', 'education', 'reception', 'vip_services'],
        itemCount: 0,
        icon: '🤖'
      },
      {
        id: 'cleaning_robots',
        name: 'Cleaning Robots',
        description: 'Automated cleaning solutions for various environments',
        subcategories: ['corporate', 'outdoor', 'specialized', 'multi_surface'],
        itemCount: 0,
        icon: '🧹'
      },
      {
        id: 'logistics_robots',
        name: 'Logistics Robots',
        description: 'Material handling and logistics automation solutions',
        subcategories: ['material_handling', 'warehouse', 'manufacturing', 'heavy_duty'],
        itemCount: 0,
        icon: '📦'
      },
      {
        id: 'company_info',
        name: 'Company Information',
        description: 'About INC Robotics, mission, vision, and values',
        subcategories: ['about', 'mission', 'team', 'location'],
        itemCount: 0,
        icon: '🏢'
      },
      {
        id: 'use_cases',
        name: 'Use Cases & Industries',
        description: 'Industry-specific applications and success stories',
        subcategories: ['healthcare', 'hospitality', 'education', 'manufacturing', 'banking'],
        itemCount: 0,
        icon: '🏭'
      },
      {
        id: 'technical_specs',
        name: 'Technical Specifications',
        description: 'Detailed technical information and specifications',
        subcategories: ['performance', 'compatibility', 'maintenance', 'upgrades'],
        itemCount: 0,
        icon: '⚙️'
      }
    ];

    categories.forEach(category => {
      this.categories.set(category.id, category);
    });
  }

  // Initialize service robots knowledge
  private initializeServiceRobots(): void {
    const serviceRobots = [
      {
        id: 'nova_robot',
        category: 'service_robots',
        subcategory: 'hospitality',
        title: 'NOVA - AI-Powered Hospitality Robot',
        titleAr: 'نوفا - روبوت الضيافة الذكي',
        content: `NOVA is our flagship AI-powered hospitality robot designed for hotels, hospitals, shopping malls, and corporate offices.

Key Features:
- 36 cm HD display with ultra-high-definition resolution
- Qualcomm Snapdragon Octa-Core CPU for powerful performance
- 6-microphone array with 97%+ speech recognition accuracy
- HD wide-angle dual cameras (13MP) for clear face-to-face interaction
- AI voice capability with 5-meter effective pickup range
- LiDAR + depth camera navigation with smart-following
- 12-hour battery life with automatic self-charging (4.5 hour charge)
- 24/7 non-stop operation capability
- Supports 31+ languages with easy customization

Use Cases:
- Tour guide services
- Reception and customer service
- Intelligent Q&A
- Dynamic promotion and information display
- VIP guest assistance

Industries: Hotels, hospitals, shopping malls, airports, corporate offices`,
        contentAr: `نوفا هو روبوت الضيافة الذكي الرئيسي مصمم للفنادق والمستشفيات والمراكز التجارية والمكاتب.

المميزات الرئيسية:
- شاشة عالية الدقة 36 سم مع دقة فائقة الوضوح
- معالج كوالكوم سناب دراغون ثماني النواة للأداء القوي
- مجموعة 6 ميكروفونات مع دقة 97%+ في التعرف على الكلام
- كاميرات مزدوجة عالية الدقة (13 ميجابكسل) للتفاعل الواضح
- قدرات صوتية ذكية مع نطاق فعال 5 أمتار
- ملاحة LiDAR + كاميرا العمق مع المتابعة الذكية
- بطارية 12 ساعة مع شحن تلقائي (4.5 ساعة شحن)
- قدرة التشغيل 24/7 بدون توقف
- دعم 31+ لغة مع تخصيص سهل

حالات الاستخدام:
- خدمات دليل سياحي
- الاستقبال وخدمة العملاء
- أسئلة وأجوبة ذكية
- عرض ترويجي ومعلومات ديناميكي
- مساعدة الضيوف VIP

الصناعات: الفنادق، المستشفيات، المراكز التجارية، المطارات، المكاتب`,
        tags: ['hospitality', 'ai', 'reception', 'multilingual', 'navigation'],
        priority: 10,
        searchKeywords: ['nova', 'hospitality', 'ai', 'reception', 'hotel', 'نوفا', 'ضيافة', 'ذكي', 'استقبال', 'فندق']
      },
      {
        id: 'luckibot_robot',
        category: 'service_robots',
        subcategory: 'reception',
        title: 'LuckiBot - Welcoming Service Robot',
        titleAr: 'لوكي بوت - روبوت الخدمة الترحيبي',
        content: `LuckiBot is designed for welcoming and customer service applications with advanced AI and machine learning capabilities.

Key Features:
- Advanced AI and machine learning capabilities
- Human-robot interaction with natural language processing
- Adaptive behavior systems for different environments
- Multi-modal communication (voice, display, gestures)
- Easy integration with existing systems
- Customizable appearance and behavior

Use Cases:
- Reception areas and lobbies
- Customer service desks
- Information kiosks
- VIP lounges and waiting areas
- Event welcoming and guidance

Industries: Hotels, corporate offices, healthcare facilities, educational institutions`,
        contentAr: `لوكي بوت مصمم لتطبيقات الترحيب وخدمة العملاء مع قدرات ذكاء اصطناعي وتعلم آلة متقدمة.

المميزات الرئيسية:
- قدرات ذكاء اصطناعي وتعلم آلة متقدمة
- تفاعل الإنسان مع الروبوت مع معالجة اللغة الطبيعية
- أنظمة سلوك تكيفية للبيئات المختلفة
- تواصل متعدد الوسائط (صوت، عرض، إيماءات)
- تكامل سهل مع الأنظمة الموجودة
- مظهر وسلوك قابل للتخصيص

حالات الاستخدام:
- مناطق الاستقبال واللوبي
- مكاتب خدمة العملاء
- أكشاك المعلومات
- صالات VIP ومناطق الانتظار
- الترحيب بالفعاليات والتوجيه

الصناعات: الفنادق، المكاتب الشركاتية، المرافق الصحية، المؤسسات التعليمية`,
        tags: ['reception', 'welcoming', 'customer_service', 'ai', 'multimodal'],
        priority: 9,
        searchKeywords: ['luckibot', 'welcoming', 'reception', 'customer service', 'لوكي بوت', 'ترحيب', 'استقبال', 'خدمة عملاء']
      }
    ];

    serviceRobots.forEach(robot => {
      const item: KnowledgeItem = {
        id: robot.id,
        category: robot.category,
        subcategory: robot.subcategory,
        title: robot.title,
        content: robot.content,
        language: 'en',
        tags: robot.tags,
        priority: robot.priority,
        lastUpdated: new Date(),
        relatedItems: [],
        searchKeywords: robot.searchKeywords
      };

      this.knowledgeItems.set(robot.id, item);

      // Add Arabic version
      const itemAr: KnowledgeItem = {
        ...item,
        id: robot.id + '_ar',
        title: robot.titleAr,
        content: robot.contentAr,
        language: 'ar'
      };

      this.knowledgeItems.set(itemAr.id, itemAr);
    });
  }

  // Initialize cleaning robots knowledge
  private initializeCleaningRobots(): void {
    const cleaningRobots = [
      {
        id: '50_pro_robot',
        category: 'cleaning_robots',
        subcategory: 'corporate',
        title: '50 Pro - Corporate Cleaning Robot',
        titleAr: '50 برو - روبوت التنظيف الشركاتي',
        content: `The 50 Pro is specifically designed for corporate and banking facilities, providing high-efficiency cleaning with precision navigation.

Key Features:
- Specialized for corporate and banking facilities
- High-efficiency cleaning with precision navigation
- Multi-surface cleaning capabilities
- Smart scheduling and autonomous operation
- Quiet operation for office environments
- Advanced obstacle detection and avoidance
- Self-charging and maintenance alerts

Use Cases:
- Office buildings and corporate headquarters
- Banking facilities and financial centers
- Professional facilities and business centers
- Conference rooms and meeting areas
- Executive offices and VIP areas

Industries: Corporate, Banking, Professional Services, Financial`,
        contentAr: `50 برو مصمم خصيصاً للمرافق الشركاتية والمصرفية، يوفر تنظيف عالي الكفاءة مع ملاحة دقيقة.

المميزات الرئيسية:
- متخصص لتنظيف المرافق الشركاتية والمصرفية
- تنظيف عالي الكفاءة مع ملاحة دقيقة
- قدرات تنظيف متعددة الأسطح
- جدولة ذكية وتشغيل ذاتي
- تشغيل هادئ لبيئات المكاتب
- كشف وتجنب العقبات المتقدم
- شحن ذاتي وتنبيهات الصيانة

حالات الاستخدام:
- المباني المكتبية والمقرات الرئيسية
- المرافق المصرفية والمراكز المالية
- المرافق المهنية ومراكز الأعمال
- قاعات المؤتمرات ومناطق الاجتماعات
- المكاتب التنفيذية ومناطق VIP

الصناعات: شركاتي، مصرفي، خدمات مهنية، مالي`,
        tags: ['corporate', 'banking', 'office', 'cleaning', 'precision'],
        priority: 9,
        searchKeywords: ['50 pro', 'corporate', 'banking', 'office cleaning', '50 برو', 'شركاتي', 'مصرفي', 'تنظيف مكاتب']
      }
    ];

    cleaningRobots.forEach(robot => {
      const item: KnowledgeItem = {
        id: robot.id,
        category: robot.category,
        subcategory: robot.subcategory,
        title: robot.title,
        content: robot.content,
        language: 'en',
        tags: robot.tags,
        priority: robot.priority,
        lastUpdated: new Date(),
        relatedItems: [],
        searchKeywords: robot.searchKeywords
      };

      this.knowledgeItems.set(robot.id, item);

      // Add Arabic version
      const itemAr: KnowledgeItem = {
        ...item,
        id: robot.id + '_ar',
        title: robot.titleAr,
        content: robot.contentAr,
        language: 'ar'
      };

      this.knowledgeItems.set(itemAr.id, itemAr);
    });
  }

  // Initialize logistics robots knowledge
  private initializeLogisticsRobots(): void {
    const logisticsRobots = [
      {
        id: 'fola_series',
        category: 'logistics_robots',
        subcategory: 'material_handling',
        title: 'FOLA Series - Material Handling Robots',
        titleAr: 'سلسلة فولا - روبوتات معالجة المواد',
        content: `The FOLA series provides comprehensive material handling solutions for manufacturing and warehouse operations.

Models:
- BN-2001: Light-duty material handling
- DN-1416: Medium-duty operations
- QN-1416: Quad navigation system
- PN1530: Pallet handling capabilities
- QN2030: Heavy-duty material transport

Key Features:
- Flexible payload capacities
- Advanced navigation systems
- Integration with warehouse management systems
- Real-time tracking and monitoring
- Scalable fleet management
- Safety sensors and collision avoidance

Use Cases:
- Manufacturing lines and production floors
- Warehouse operations and distribution centers
- Logistics hubs and transportation
- Material transport and handling
- Inventory management and tracking

Industries: Manufacturing, Logistics, Warehousing, Distribution`,
        contentAr: `سلسلة فولا توفر حلول شاملة لمعالجة المواد للتصنيع وعمليات المستودعات.

النماذج:
- BN-2001: معالجة مواد خفيفة
- DN-1416: عمليات متوسطة
- QN-1416: نظام ملاحة رباعي
- PN1530: قدرات معالجة البالتات
- QN2030: نقل مواد ثقيل

المميزات الرئيسية:
- قدرات حمولة مرنة
- أنظمة ملاحة متقدمة
- تكامل مع أنظمة إدارة المستودعات
- تتبع ومراقبة في الوقت الفعلي
- إدارة أسطول قابلة للتوسع
- أجهزة استشعار الأمان وتجنب التصادم

حالات الاستخدام:
- خطوط التصنيع وأرضيات الإنتاج
- عمليات المستودعات ومراكز التوزيع
- محاور اللوجستيات والنقل
- نقل ومعالجة المواد
- إدارة وتتبع المخزون

الصناعات: التصنيع، اللوجستيات، المستودعات، التوزيع`,
        tags: ['material_handling', 'manufacturing', 'warehouse', 'logistics', 'fleet'],
        priority: 8,
        searchKeywords: ['fola', 'material handling', 'manufacturing', 'warehouse', 'فولا', 'معالجة مواد', 'تصنيع', 'مستودع']
      }
    ];

    logisticsRobots.forEach(robot => {
      const item: KnowledgeItem = {
        id: robot.id,
        category: robot.category,
        subcategory: robot.subcategory,
        title: robot.title,
        content: robot.content,
        language: 'en',
        tags: robot.tags,
        priority: robot.priority,
        lastUpdated: new Date(),
        relatedItems: [],
        searchKeywords: robot.searchKeywords
      };

      this.knowledgeItems.set(robot.id, item);

      // Add Arabic version
      const itemAr: KnowledgeItem = {
        ...item,
        id: robot.id + '_ar',
        title: robot.titleAr,
        content: robot.contentAr,
        language: 'ar'
      };

      this.knowledgeItems.set(itemAr.id, itemAr);
    });
  }

  // Initialize company information
  private initializeCompanyInfo(): void {
    const companyInfo = [
      {
        id: 'company_overview',
        category: 'company_info',
        subcategory: 'about',
        title: 'INC Robotics - Company Overview',
        titleAr: 'إنك روبوتكس - نظرة عامة على الشركة',
        content: `INC Robotics is a leading Saudi robotics and AI company founded in 2021.

Mission: Revolutionize industries through cutting-edge robotics and AI solutions
Vision: Global leader in intelligent automation
Values: Innovation, Excellence, Collaboration, Sustainability

Location: 2449 Said ibn Zayd Rd, Qurtubah, 6582, Riyadh 13248, Saudi Arabia
P.O. Box: 4528 Riyadh 12482-7021

Key Achievements:
- Leading robotics company in Saudi Arabia
- Serving major clients including Aramco, SAB, SEC, KSU
- Comprehensive product portfolio across service, cleaning, and logistics
- 24/7 support and maintenance services
- Multilingual support in 31+ languages

Technical Capabilities:
- AI and Machine Learning
- Multi-language Support
- Integration Capabilities
- 24/7 Operation
- Real-time Analytics
- Remote Monitoring
- Scalable Solutions`,
        contentAr: `إنك روبوتكس هي شركة سعودية رائدة في مجال الروبوتات والذكاء الاصطناعي تأسست عام 2021.

المهمة: إحداث ثورة في الصناعات من خلال حلول روبوتية وذكاء اصطناعي متطورة
الرؤية: أن نكون الرائد العالمي في الأتمتة الذكية
القيم: الابتكار، التميز، التعاون، الاستدامة

الموقع: قرطبة، شارع سعيد بن زيد، الرياض 13248، المملكة العربية السعودية
صندوق البريد: 4528 الرياض 12482-7021

الإنجازات الرئيسية:
- شركة روبوتات رائدة في المملكة العربية السعودية
- خدمة عملاء كبار بما في ذلك أرامكو، ساب، الشركة السعودية للكهرباء، جامعة الملك سعود
- محفظة منتجات شاملة عبر الخدمة والتنظيف واللوجستيات
- خدمات دعم وصيانة 24/7
- دعم متعدد اللغات في 31+ لغة

القدرات التقنية:
- الذكاء الاصطناعي وتعلم الآلة
- دعم متعدد اللغات
- قدرات التكامل
- التشغيل 24/7
- التحليلات في الوقت الفعلي
- المراقبة عن بُعد
- حلول قابلة للتوسع`,
        tags: ['company', 'about', 'mission', 'vision', 'values'],
        priority: 10,
        searchKeywords: ['inc robotics', 'company', 'about', 'saudi', 'إنك روبوتكس', 'شركة', 'حول', 'سعودي']
      }
    ];

    companyInfo.forEach(info => {
      const item: KnowledgeItem = {
        id: info.id,
        category: info.category,
        subcategory: info.subcategory,
        title: info.title,
        content: info.content,
        language: 'en',
        tags: info.tags,
        priority: info.priority,
        lastUpdated: new Date(),
        relatedItems: [],
        searchKeywords: info.searchKeywords
      };

      this.knowledgeItems.set(info.id, item);

      // Add Arabic version
      const itemAr: KnowledgeItem = {
        ...item,
        id: info.id + '_ar',
        title: info.titleAr,
        content: info.contentAr,
        language: 'ar'
      };

      this.knowledgeItems.set(itemAr.id, itemAr);
    });
  }

  // Initialize use cases and industries
  private initializeUseCases(): void {
    const useCases = [
      {
        id: 'healthcare_use_cases',
        category: 'use_cases',
        subcategory: 'healthcare',
        title: 'Healthcare Industry Applications',
        titleAr: 'تطبيقات صناعة الرعاية الصحية',
        content: `INC Robotics provides specialized solutions for the healthcare industry.

Service Robots:
- Patient welcoming and guidance
- Information desk assistance
- VIP patient services
- Educational content delivery

Cleaning Robots:
- Hospital facility maintenance
- Sensitive area cleaning
- Infection control compliance
- 24/7 cleaning operations

Success Stories:
- Major hospitals using NOVA for patient assistance
- Medical centers implementing specialized cleaning robots
- Clinics with automated access control
- Healthcare facilities with comprehensive automation

Benefits:
- Improved patient experience
- Enhanced hygiene standards
- Reduced operational costs
- 24/7 reliable service
- Multilingual support for diverse patients`,
        contentAr: `إنك روبوتكس توفر حلول متخصصة لصناعة الرعاية الصحية.

روبوتات الخدمة:
- ترحيب وتوجيه المرضى
- مساعدة مكاتب المعلومات
- خدمات مرضى VIP
- تقديم المحتوى التعليمي

روبوتات التنظيف:
- صيانة مرافق المستشفيات
- تنظيف المناطق الحساسة
- الامتثال لمكافحة العدوى
- عمليات تنظيف 24/7

قصص النجاح:
- مستشفيات كبرى تستخدم نوفا لمساعدة المرضى
- مراكز طبية تطبق روبوتات تنظيف متخصصة
- عيادات مع تحكم وصول آلي
- مرافق صحية مع أتمتة شاملة

الفوائد:
- تحسين تجربة المرضى
- تعزيز معايير النظافة
- تقليل التكاليف التشغيلية
- خدمة موثوقة 24/7
- دعم متعدد اللغات للمرضى المتنوعين`,
        tags: ['healthcare', 'hospital', 'medical', 'patient', 'hygiene'],
        priority: 8,
        searchKeywords: ['healthcare', 'hospital', 'medical', 'patient', 'رعاية صحية', 'مستشفى', 'طبي', 'مريض']
      }
    ];

    useCases.forEach(useCase => {
      const item: KnowledgeItem = {
        id: useCase.id,
        category: useCase.category,
        subcategory: useCase.subcategory,
        title: useCase.title,
        content: useCase.content,
        language: 'en',
        tags: useCase.tags,
        priority: useCase.priority,
        lastUpdated: new Date(),
        relatedItems: [],
        searchKeywords: useCase.searchKeywords
      };

      this.knowledgeItems.set(useCase.id, item);

      // Add Arabic version
      const itemAr: KnowledgeItem = {
        ...item,
        id: useCase.id + '_ar',
        title: useCase.titleAr,
        content: useCase.contentAr,
        language: 'ar'
      };

      this.knowledgeItems.set(itemAr.id, itemAr);
    });
  }

  // Initialize technical specifications
  private initializeTechnicalSpecs(): void {
    const techSpecs = [
      {
        id: 'ai_capabilities',
        category: 'technical_specs',
        subcategory: 'performance',
        title: 'AI and Machine Learning Capabilities',
        titleAr: 'قدرات الذكاء الاصطناعي وتعلم الآلة',
        content: `Our robots are powered by advanced AI and machine learning technologies.

AI Features:
- Natural Language Processing (NLP)
- Computer Vision and Image Recognition
- Predictive Analytics
- Adaptive Learning
- Multi-modal Communication
- Context Awareness

Machine Learning:
- Continuous improvement through data
- Pattern recognition and prediction
- Behavioral adaptation
- Performance optimization
- User preference learning
- Anomaly detection

Technical Specifications:
- Processing Power: Qualcomm Snapdragon Octa-Core
- Memory: 8GB RAM, 128GB Storage
- Connectivity: WiFi 6, Bluetooth 5.0, 4G/5G
- Sensors: LiDAR, RGB-D cameras, microphones
- Operating System: Custom Linux-based
- Update Mechanism: OTA (Over-The-Air)

Performance Metrics:
- Response Time: < 200ms
- Accuracy: 97%+ for speech recognition
- Uptime: 99.9% availability
- Battery Life: 12+ hours continuous operation
- Language Support: 31+ languages
- Concurrent Users: Up to 50 simultaneous interactions`,
        contentAr: `روبوتاتنا مدعومة بتقنيات الذكاء الاصطناعي وتعلم الآلة المتقدمة.

مميزات الذكاء الاصطناعي:
- معالجة اللغة الطبيعية (NLP)
- الرؤية الحاسوبية والتعرف على الصور
- التحليلات التنبؤية
- التعلم التكيفي
- التواصل متعدد الوسائط
- الوعي السياقي

تعلم الآلة:
- التحسين المستمر من خلال البيانات
- التعرف على الأنماط والتنبؤ
- التكيف السلوكي
- تحسين الأداء
- تعلم تفضيلات المستخدم
- كشف الشذوذ

المواصفات التقنية:
- قوة المعالجة: كوالكوم سناب دراغون ثماني النواة
- الذاكرة: 8 جيجابايت رام، 128 جيجابايت تخزين
- الاتصال: WiFi 6، بلوتوث 5.0، 4G/5G
- أجهزة الاستشعار: LiDAR، كاميرات RGB-D، ميكروفونات
- نظام التشغيل: لينكس مخصص
- آلية التحديث: OTA (عبر الهواء)

مقاييس الأداء:
- وقت الاستجابة: < 200 مللي ثانية
- الدقة: 97%+ للتعرف على الكلام
- وقت التشغيل: 99.9% توفر
- عمر البطارية: 12+ ساعة تشغيل مستمر
- دعم اللغات: 31+ لغة
- المستخدمون المتزامنون: حتى 50 تفاعل متزامن`,
        tags: ['ai', 'machine_learning', 'performance', 'technical', 'specifications'],
        priority: 9,
        searchKeywords: ['ai', 'machine learning', 'performance', 'technical', 'ذكاء اصطناعي', 'تعلم آلة', 'أداء', 'تقني']
      }
    ];

    techSpecs.forEach(spec => {
      const item: KnowledgeItem = {
        id: spec.id,
        category: spec.category,
        subcategory: spec.subcategory,
        title: spec.title,
        content: spec.content,
        language: 'en',
        tags: spec.tags,
        priority: spec.priority,
        lastUpdated: new Date(),
        relatedItems: [],
        searchKeywords: spec.searchKeywords
      };

      this.knowledgeItems.set(spec.id, item);

      // Add Arabic version
      const itemAr: KnowledgeItem = {
        ...item,
        id: spec.id + '_ar',
        title: spec.titleAr,
        content: spec.contentAr,
        language: 'ar'
      };

      this.knowledgeItems.set(itemAr.id, itemAr);
    });
  }

  // Build search index for fast keyword searching
  private buildSearchIndex(): void {
    this.searchIndex.clear();
    
    this.knowledgeItems.forEach((item, itemId) => {
      // Index search keywords
      item.searchKeywords.forEach(keyword => {
        const normalizedKeyword = keyword.toLowerCase();
        if (!this.searchIndex.has(normalizedKeyword)) {
          this.searchIndex.set(normalizedKeyword, []);
        }
        this.searchIndex.get(normalizedKeyword)!.push(itemId);
      });

      // Index tags
      item.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        if (!this.searchIndex.has(normalizedTag)) {
          this.searchIndex.set(normalizedTag, []);
        }
        this.searchIndex.get(normalizedTag)!.push(itemId);
      });
    });

    // Update category item counts
    this.categories.forEach(category => {
      const itemCount = Array.from(this.knowledgeItems.values())
        .filter(item => item.category === category.id)
        .length;
      category.itemCount = itemCount;
    });
  }

  // Search knowledge base
  search(query: string, language: 'en' | 'ar' = 'en', category?: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase().trim();
    const queryWords = normalizedQuery.split(/\s+/);
    const results: Map<string, SearchResult> = new Map();

    // Search through indexed keywords
    queryWords.forEach(word => {
      if (this.searchIndex.has(word)) {
        this.searchIndex.get(word)!.forEach(itemId => {
          const item = this.knowledgeItems.get(itemId);
          if (item && item.language === language && (!category || item.category === category)) {
            if (!results.has(itemId)) {
              results.set(itemId, {
                item,
                relevanceScore: 0,
                matchedKeywords: [],
                snippet: this.generateSnippet(item.content, queryWords)
              });
            }
            
            const result = results.get(itemId)!;
            result.relevanceScore += 1;
            result.matchedKeywords.push(word);
          }
        });
      }
    });

    // Sort by relevance score and priority
    return Array.from(results.values())
      .sort((a, b) => {
        const scoreA = a.relevanceScore + (a.item.priority * 0.1);
        const scoreB = b.relevanceScore + (b.item.priority * 0.1);
        return scoreB - scoreA;
      });
  }

  // Generate snippet from content
  private generateSnippet(content: string, queryWords: string[]): string {
    const sentences = content.split(/[.!?]+/);
    let bestSentence = '';
    let maxMatches = 0;

    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      const matches = queryWords.filter(word => lowerSentence.includes(word)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestSentence = sentence.trim();
      }
    });

    return bestSentence || content.substring(0, 150) + '...';
  }

  // Get knowledge item by ID
  getItem(itemId: string): KnowledgeItem | undefined {
    return this.knowledgeItems.get(itemId);
  }

  // Get items by category
  getItemsByCategory(category: string, language: 'en' | 'ar' = 'en'): KnowledgeItem[] {
    return Array.from(this.knowledgeItems.values())
      .filter(item => item.category === category && item.language === language)
      .sort((a, b) => b.priority - a.priority);
  }

  // Get all categories
  getCategories(): CategoryInfo[] {
    return Array.from(this.categories.values());
  }

  // Get category by ID
  getCategory(categoryId: string): CategoryInfo | undefined {
    return this.categories.get(categoryId);
  }

  // Add new knowledge item
  addItem(item: Omit<KnowledgeItem, 'id' | 'lastUpdated'>): string {
    const itemId = `${item.category}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newItem: KnowledgeItem = {
      ...item,
      id: itemId,
      lastUpdated: new Date()
    };

    this.knowledgeItems.set(itemId, newItem);
    this.buildSearchIndex();
    return itemId;
  }

  // Update knowledge item
  updateItem(itemId: string, updates: Partial<KnowledgeItem>): boolean {
    const item = this.knowledgeItems.get(itemId);
    if (!item) return false;

    const updatedItem: KnowledgeItem = {
      ...item,
      ...updates,
      lastUpdated: new Date()
    };

    this.knowledgeItems.set(itemId, updatedItem);
    this.buildSearchIndex();
    return true;
  }

  // Delete knowledge item
  deleteItem(itemId: string): boolean {
    const deleted = this.knowledgeItems.delete(itemId);
    if (deleted) {
      this.buildSearchIndex();
    }
    return deleted;
  }

  // Get analytics
  getAnalytics(): {
    totalItems: number;
    itemsByCategory: Record<string, number>;
    itemsByLanguage: Record<string, number>;
    topTags: Array<{ tag: string; count: number }>;
  } {
    const items = Array.from(this.knowledgeItems.values());
    
    const analytics = {
      totalItems: items.length,
      itemsByCategory: {} as Record<string, number>,
      itemsByLanguage: {} as Record<string, number>,
      topTags: [] as Array<{ tag: string; count: number }>
    };

    // Count by category
    items.forEach(item => {
      analytics.itemsByCategory[item.category] = (analytics.itemsByCategory[item.category] || 0) + 1;
      analytics.itemsByLanguage[item.language] = (analytics.itemsByLanguage[item.language] || 0) + 1;
    });

    // Count tags
    const tagCounts: Record<string, number> = {};
    items.forEach(item => {
      item.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    analytics.topTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return analytics;
  }
}

// Export singleton instance
export const knowledgeBaseService = new KnowledgeBaseService();
export default knowledgeBaseService;
