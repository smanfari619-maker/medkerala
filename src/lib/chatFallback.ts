/**
 * chatFallback.ts
 *
 * Smart rule-based Plan B chatbot for TreatInKerala.
 * Activates automatically when the Groq AI API is unavailable.
 */

import { SITE_CONFIG } from '@/lib/config';

interface FallbackResponse {
  en: string[];
  ar: string[];
}

const intents: Array<{
  keywords: string[];
  responses: FallbackResponse;
}> = [
  // Greeting
  {
    keywords: ['hi', 'hello', 'hey', 'salam', 'salaam', 'مرحبا', 'أهلا', 'السلام'],
    responses: {
      en: [
        "Hi there! 😊 I'm Maya, your personal care coordinator at TreatInKerala. We help international patients access world-class hospitals in Kerala at a fraction of the global cost. What brings you here today?",
        "Hello! Welcome to TreatInKerala. I'm Maya — here to guide you through medical treatment or Ayurveda wellness in Kerala. What treatment or health concern can I help you with?",
      ],
      ar: [
        'أهلاً وسهلاً! أنا مايا، منسقة الرعاية الطبية في TreatInKerala. نساعد المرضى الدوليين للوصول إلى أفضل المستشفيات في كيرلا. كيف يمكنني مساعدتك اليوم؟',
        'مرحباً بك! أنا مايا من فريق TreatInKerala. ما هو العلاج أو الاستفسار الطبي الذي تبحث عنه؟',
      ],
    },
  },
  // Identity
  {
    keywords: ['your name', 'who are you', 'what are you', 'اسمك', 'من أنت'],
    responses: {
      en: [
        "I'm Maya, a patient care coordinator at TreatInKerala! I help patients from across the world access Kerala's best hospitals and Ayurveda centres. What can I help you with today?",
        "My name is Maya 😊 — I work with TreatInKerala to connect patients with top-rated hospitals and specialists in Kerala, India. Is there a treatment or health concern I can assist you with?",
      ],
      ar: [
        'اسمي مايا، منسقة رعاية المرضى في TreatInKerala. أساعد المرضى للوصول إلى أفضل مستشفيات وأطباء كيرلا. كيف يمكنني مساعدتك؟',
        'أنا مايا من فريق TreatInKerala. ما الذي تبحث عنه؟',
      ],
    },
  },
  // Cost / Price
  {
    keywords: ['cost', 'price', 'how much', 'quote', 'fee', 'charges', 'affordable', 'cheap', 'تكلفة', 'سعر', 'كم', 'رسوم', 'تسعيرة'],
    responses: {
      en: [
        `Treatment costs in Kerala are 60–80% lower than the US, UK, or Gulf — with no compromise on quality. Our team prepares a free, itemized custom quotation from top accredited hospitals. Which treatment are you exploring? Share your WhatsApp or email and we'll send your quote within 24 hours.`,
        "Kerala offers some of the most affordable medical care in the world. We'll collect your medical details and send you a free, transparent cost breakdown from our partner JCI/NABH hospitals — no hidden fees. What procedure do you need a quote for?",
      ],
      ar: [
        'تكاليف العلاج في كيرلا أقل بنسبة 60-80% من الدول الغربية ودول الخليج مع نفس مستوى الجودة. فريقنا يُعد لك عرض أسعار مجاني ومفصّل من أفضل المستشفيات المعتمدة. ما هو العلاج الذي تبحث عنه؟',
        'يسعد فريقنا بإرسال عرض أسعار تفصيلي ومجاني خلال 24 ساعة. ما هو الإجراء أو العلاج المطلوب؟',
      ],
    },
  },
  // Orthopedic / Knee / Joint
  {
    keywords: ['knee', 'joint', 'hip', 'orthopedic', 'bone', 'spine', 'replacement', 'ركبة', 'مفصل', 'عظام', 'عمود فقري'],
    responses: {
      en: [
        "Kerala is a top destination for orthopedic surgery — knee & hip replacements, spine surgeries, and joint procedures. Costs typically range from ₹2–5 lakh depending on implant type and hospital. Our team will get you exact quotes from top surgeons. Shall I connect you?",
        "Joint replacement surgeries in Kerala are performed by highly experienced orthopedic surgeons at JCI-accredited hospitals, at a fraction of the cost in Western countries. Share your medical reports and we'll get you a personalized quote. What joint/procedure is involved?",
      ],
      ar: [
        'كيرلا وجهة رائدة لجراحات العظام والمفاصل بأسعار تنافسية وبجودة عالية. تتراوح التكلفة بين 2-5 لakh روبية حسب نوع الغرسة والمستشفى. هل تودّ أن نُرسل لك عروض أسعار من أفضل الجراحين؟',
        'جراحات استبدال المفاصل في كيرلا تُجرى من قِبل جراحين متخصصين في مستشفيات معتمدة بمعايير دولية. ما هو الإجراء المطلوب تحديداً؟',
      ],
    },
  },
  // Cancer / Oncology
  {
    keywords: ['cancer', 'oncology', 'tumor', 'chemotherapy', 'radiation', 'سرطان', 'ورم', 'علاج كيماوي'],
    responses: {
      en: [
        "Kerala has world-class cancer centres with experienced oncologists offering chemotherapy, radiation, immunotherapy, and surgical oncology — at significantly lower costs than Western hospitals. Could you share the cancer type and current stage so we can match you with the right specialist?",
        "Our partner hospitals in Kerala have dedicated cancer institutes with PET-CT, linear accelerators, and robotic surgery. Every case is unique — share your diagnosis reports and we'll get you a tailored treatment plan and quote.",
      ],
      ar: [
        'توفر مستشفيات كيرلا رعاية سرطانية متكاملة تشمل العلاج الكيماوي والإشعاعي والجراحي بمعايير دولية. هل يمكنك مشاركة نوع السرطان ومرحلته لنتمكن من توجيهك للمختص المناسب؟',
        'لدينا شراكات مع مراكز الأورام الرائدة في كيرلا. تواصل معنا بتقرير التشخيص وسنُعدّ لك خطة علاجية مخصصة.',
      ],
    },
  },
  // Ayurveda / Wellness
  {
    keywords: ['ayurveda', 'panchakarma', 'wellness', 'detox', 'massage', 'retreat', 'yoga', 'أيورفيدا', 'تنقية', 'استشفاء', 'يوغا'],
    responses: {
      en: [
        "Kerala is the birthplace of authentic Ayurveda! Panchakarma detox, rejuvenation therapies, and specialized Ayurvedic treatments for chronic conditions are available at Kerala's finest accredited resorts. How long are you planning to stay, and what health goal are you targeting?",
        "Ayurveda packages in Kerala range from 7-day rejuvenation retreats to 28-day deep Panchakarma programs. Our team works with authentic, government-certified Ayurveda centres. Are you looking to treat a specific condition, or a general wellness/detox programme?",
      ],
      ar: [
        'كيرلا هي مسقط رأس الأيورفيدا الأصيلة! تتوفر برامج علاجية متخصصة في أفضل مراكز الأيورفيدا المعتمدة. ما هو الهدف الصحي أو الحالة التي تودّ علاجها؟',
        'تتراوح برامج الأيورفيدا في كيرلا بين جلسات التجديد لمدة 7 أيام وبرامج بانشاكارما لمدة 28 يوماً. ما هي مدة إقامتك المتوقعة؟',
      ],
    },
  },
  // Cardiac / Heart
  {
    keywords: ['heart', 'cardiac', 'bypass', 'angioplasty', 'valve', 'cardiolog', 'قلب', 'قسطرة', 'صمام'],
    responses: {
      en: [
        "Kerala has internationally accredited cardiac centres performing bypass surgeries, valve replacements, and angioplasties at 70–80% less cost than the US or UK, with excellent outcomes. Share your cardiac reports and we'll connect you with a leading cardiologist for a free opinion.",
        "Cardiac procedures in Kerala — bypass, CABG, valve repair, pacemakers — are performed by highly experienced cardiac surgeons. We'll get you a full cost breakdown and surgeon profile from top cardiac hospitals. What procedure or consultation do you need?",
      ],
      ar: [
        'مستشفيات كيرلا تُجري عمليات القلب المفتوح واستبدال الصمامات والقسطرة بتكاليف أقل بـ70% من الدول الغربية مع نتائج ممتازة. هل يمكنك مشاركة التقارير الطبية للحصول على رأي متخصص مجاني؟',
        'لدينا شراكات مع أفضل مراكز القلب في كيرلا. ما هو الإجراء أو الاستشارة القلبية المطلوبة؟',
      ],
    },
  },
  // Fertility / IVF
  {
    keywords: ['ivf', 'fertility', 'infertility', 'baby', 'pregnancy', 'egg', 'sperm', 'حمل', 'إخصاب', 'أطفال الأنابيب', 'عقم'],
    responses: {
      en: [
        "Kerala has some of India's best fertility clinics offering IVF, IUI, ICSI, and egg donation at 40–60% less than the UK or US, with high success rates. Our team can arrange a free consultation with a fertility specialist. How can I help you further?",
        "IVF and fertility treatments in Kerala are affordable and handled by experienced reproductive specialists. Packages typically include all diagnostics, medication, and procedures. Would you like us to send you detailed options from top fertility centres?",
      ],
      ar: [
        'توفر كيرلا أفضل عيادات الخصوبة في الهند لعلاجات IVF وICSI بتكاليف أقل بـ50% مع معدلات نجاح عالية. هل تودّ الحصول على استشارة مجانية مع متخصص في الخصوبة؟',
        'علاجات الخصوبة في كيرلا متاحة بأسعار معقولة جداً. ما هي الحالة تحديداً وكيف يمكنني مساعدتك؟',
      ],
    },
  },
  // Eye / Ophthalmology
  {
    keywords: ['eye', 'lasik', 'cataract', 'retina', 'vision', 'ophthal', 'عيون', 'ليزك', 'ماء أبيض', 'إبصار'],
    responses: {
      en: [
        "Kerala has excellent eye hospitals offering LASIK, cataract surgery, retinal procedures, and cornea transplants at a fraction of international costs. Advanced procedures like bladeless LASIK and micro-incision cataract surgery are available. What eye concern can I help you with?",
        "Eye treatments in Kerala are world-class — LASIK from ₹25,000 per eye, cataract surgery from ₹20,000 per eye. Our partner hospitals use the latest diagnostic and surgical technology. What procedure are you considering?",
      ],
      ar: [
        'مستشفيات العيون في كيرلا تقدم خدمات ليزك، إزالة الماء الأبيض، وجراحات الشبكية بتكاليف منخفضة جداً. ما هو القلق أو الإجراء العيني المطلوب؟',
        'جراحة الليزك في كيرلا تبدأ من 25,000 روبية للعين الواحدة. هل يمكنني مساعدتك في ترتيب استشارة تقييمية مجانية؟',
      ],
    },
  },
  // Hospitals
  {
    keywords: ['hospital', 'clinic', 'which', 'best', 'top', 'accredited', 'jci', 'nabh', 'مستشفى', 'عيادة', 'أفضل', 'معتمد'],
    responses: {
      en: [
        "Kerala has over 30 internationally accredited hospitals including Aster MIMS, Baby Memorial, VPS Lakeshore, KIMS, and Amrita Institute — many holding JCI & NABH accreditation. We match patients to the best hospital for their specific treatment. What procedure are you exploring?",
        "Our partner hospitals are among Kerala's finest in Kozhikode, Kochi, Thiruvananthapuram, and Thrissur — all world-class facilities. We'll recommend the right hospital based on your treatment needs and budget. Which treatment are you looking at?",
      ],
      ar: [
        'تضم كيرلا أكثر من 30 مستشفى معتمداً دولياً مثل Aster MIMS وBaby Memorial وVPS Lakeshore وKIMS. نحن نوجّه المرضى للمستشفى الأنسب لحالتهم. ما هو علاجك المطلوب؟',
        'مستشفياتنا الشريكة تعمل وفق أعلى معايير الجودة الدولية. ما الإجراء الذي تبحث عنه لنقترح عليك المستشفى الأنسب؟',
      ],
    },
  },
  // Visa / Travel
  {
    keywords: ['visa', 'travel', 'flight', 'india', 'medical visa', 'تأشيرة', 'سفر', 'رحلة', 'هند'],
    responses: {
      en: [
        "India offers a Medical Visa (MED Visa) for international patients — valid for up to 1 year with multiple entries. Our team provides the official hospital invitation letter needed for the visa application, and assists with airport pickup and accommodation in Kerala. What country are you travelling from?",
        "Getting a Medical Visa for India is straightforward — we provide the official hospital letter and guide you through the application. We also arrange airport reception, local transport, and patient-friendly accommodation near your hospital. Where are you flying from?",
      ],
      ar: [
        'تمنح الهند تأشيرة طبية (MED Visa) للمرضى الدوليين صالحة لسنة مع دخول متعدد. فريقنا يُعدّ خطاب المستشفى الرسمي المطلوب للتأشيرة ويساعد في ترتيبات الاستقبال والإقامة. من أي دولة ستسافر؟',
        'إجراءات التأشيرة الطبية للهند بسيطة ونحن نُيسّر كل خطوة. ما هي جنسيتك ودولة إقامتك؟',
      ],
    },
  },
  // Duration / How long
  {
    keywords: ['how long', 'duration', 'days', 'weeks', 'stay', 'كم يوم', 'مدة', 'إقامة', 'أسابيع'],
    responses: {
      en: [
        "Treatment duration in Kerala varies: minor day procedures take 1–3 days, knee/hip replacements typically 10–14 days, cardiac bypass 14–21 days, and Ayurveda retreats 7–28 days. We'll give you a precise timeline once we know your procedure. What treatment are you considering?",
        "We always advise patients to factor in a few extra recovery days in Kerala — it's a beautiful, restorative destination! Our team will share a detailed day-by-day treatment timeline. Which procedure are you asking about?",
      ],
      ar: [
        'تتراوح مدة العلاج في كيرلا بين يوم واحد للإجراءات البسيطة، وأسبوعين لعمليات استبدال المفاصل، وشهر لعمليات القلب. ما هو الإجراء المطلوب لنُحدد المدة بدقة؟',
        'فريقنا سيُشاركك جدولاً زمنياً تفصيلياً بمجرد معرفة نوع العلاج. ما الإجراء الذي تستفسر عنه؟',
      ],
    },
  },
  // Contact
  {
    keywords: ['contact', 'whatsapp', 'call', 'phone', 'email', 'reach', 'speak', 'تواصل', 'واتساب', 'هاتف', 'اتصال'],
    responses: {
      en: [
        `You can reach our care team directly on WhatsApp at ${SITE_CONFIG.phone} — available 7 days a week. You can also email us at ${SITE_CONFIG.email}. Or just share your contact details here and we'll reach out within a few hours!`,
        `Our team is reachable on WhatsApp at ${SITE_CONFIG.phone} or by email at ${SITE_CONFIG.email}. Would you like to leave your contact details here so our coordinator can follow up personally?`,
      ],
      ar: [
        `يمكنك التواصل مع فريقنا على واتساب ${SITE_CONFIG.phone} متاح 7 أيام في الأسبوع، أو عبر البريد الإلكتروني ${SITE_CONFIG.email}. هل تودّ ترك بياناتك هنا ليتواصل معك منسقنا مباشرة؟`,
        `فريقنا متاح دائماً على واتساب ${SITE_CONFIG.phone}. هل يمكنني الحصول على رقم تواصلك لترتيب استشارة مجانية؟`,
      ],
    },
  },
  // Second Opinion
  {
    keywords: ['second opinion', 'opinion', 'consult', 'review report', 'رأي ثان', 'استشارة', 'مراجعة تقرير'],
    responses: {
      en: [
        "We can arrange a free online second medical opinion from a senior Kerala specialist — often within 48 hours. Just share your medical reports (scan, lab results, discharge summary) and we'll get a specialist to review them. Would you like to proceed?",
        "Getting a second opinion from Kerala's leading specialists is easy and often free through our network. Upload your reports and our team will have a senior doctor review your case confidentially. What condition or report do you need reviewed?",
      ],
      ar: [
        'يمكننا ترتيب رأي طبي ثانٍ مجاني من أحد المتخصصين البارزين في كيرلا خلال 48 ساعة. فقط شارك تقاريرك الطبية وسنتعامل معها بسرية تامة. هل تودّ المضي قدماً؟',
        'الحصول على رأي طبي ثانٍ من كيرلا سريع ومجاني. ما هي الحالة أو التقرير الذي تحتاج مراجعته؟',
      ],
    },
  },
  // Thank you
  {
    keywords: ['thank', 'thanks', 'شكرا', 'شكراً', 'ممنون'],
    responses: {
      en: [
        "You're very welcome! 😊 It's our privilege to help you on your health journey. Is there anything else you'd like to know about treatment options, costs, or hospitals in Kerala?",
        "Happy to help! That's what we're here for 🌿 Feel free to ask anything else about medical treatment or Ayurveda in Kerala.",
      ],
      ar: [
        'على الرحب والسعة! 😊 يسعدنا مساعدتك في رحلتك الصحية. هل هناك أي شيء آخر تودّ الاستفسار عنه؟',
        'بكل سرور! نحن هنا لمساعدتك دائماً 🌿 هل لديك أي أسئلة أخرى حول العلاج في كيرلا؟',
      ],
    },
  },
];

const defaultResponses: FallbackResponse = {
  en: [
    'Great question! TreatInKerala helps international patients access top hospitals, Ayurveda centres, and specialists in Kerala — completely free of charge. Our team will coordinate, negotiate, and send you a custom quotation. Could you tell me more about the treatment or health concern you have in mind?',
    "I'd love to help! Kerala is one of the world's leading medical tourism destinations with world-class hospitals and authentic Ayurveda. Could you share what treatment or condition you're exploring so I can give you the most relevant information?",
    'Thanks for reaching out to TreatInKerala! We facilitate everything — from hospital selection and doctor appointments to visa letters and accommodation. What specific treatment or health question can I assist you with?',
  ],
  ar: [
    'شكراً لتواصلك مع TreatInKerala! نُسهّل كل شيء — من اختيار المستشفى وتحديد مواعيد الأطباء إلى تنظيم الإقامة والتأشيرة. ما هو العلاج أو الاستفسار الطبي الذي يمكنني مساعدتك فيه؟',
    'يسعدنا مساعدتك! كيرلا وجهة طبية رائدة عالمياً. ما هو العلاج أو الحالة الصحية التي تستفسر عنها؟',
    'أهلاً! فريق TreatInKerala يساعدك مجاناً في الوصول لأفضل مستشفيات كيرلا. كيف يمكنني مساعدتك؟',
  ],
};

/**
 * Returns a smart, context-aware fallback reply for a given user message.
 * @param userMessage  The raw text the user sent.
 * @param locale       'en' or 'ar'.
 */
export function getSmartFallbackReply(userMessage: string, locale: string = 'en'): string {
  const lower = userMessage.toLowerCase();
  const lang = locale === 'ar' ? 'ar' : 'en';

  for (const intent of intents) {
    if (intent.keywords.some((kw) => lower.includes(kw))) {
      const variants = intent.responses[lang];
      return variants[Math.floor(Math.random() * variants.length)];
    }
  }

  const variants = defaultResponses[lang];
  return variants[Math.floor(Math.random() * variants.length)];
}
