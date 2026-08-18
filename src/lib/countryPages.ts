export interface CountryPageData {
  slug: string;
  nameEn: string;
  nameAr: string;
  flagEmoji: string;
  nationalityEn: string;
  nationalityAr: string;
  taglineEn: string;
  taglineAr: string;
  heroHeadlineEn: string;
  heroHeadlineAr: string;
  heroSubEn: string;
  heroSubAr: string;
  patientsServedStat: string;
  avgSavings: string;
  flightInfo: {
    directRoutesEn: string;
    directRoutesAr: string;
    flightDurationEn: string;
    flightDurationAr: string;
    airportsInKeralaEn: string;
    airportsInKeralaAr: string;
    airlinesEn: string[];
    airlinesAr: string[];
  };
  visaGuide: {
    typeEn: string;
    typeAr: string;
    processEn: string;
    processAr: string;
    timelineEn: string;
    timelineAr: string;
    documentsEn: string[];
    documentsAr: string[];
  };
  keyAdvantages: {
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
  }[];
  popularTreatments: {
    slug: string;
    nameEn: string;
    nameAr: string;
    whyRelevantEn: string;
    whyRelevantAr: string;
    typicalDurationEn: string;
    typicalDurationAr: string;
    estimatedCostEn: string;
    estimatedCostAr: string;
  }[];
  familySupport: {
    titleEn: string;
    titleAr: string;
    pointsEn: string[];
    pointsAr: string[];
  };
  testimonial: {
    patientNameEn: string;
    patientNameAr: string;
    cityEn: string;
    cityAr: string;
    treatmentEn: string;
    treatmentAr: string;
    hospitalEn: string;
    hospitalAr: string;
    storyEn: string;
    storyAr: string;
    savingsEn: string;
    savingsAr: string;
  };
  faqs: {
    qEn: string;
    qAr: string;
    aEn: string;
    aAr: string;
  }[];
}

export const COUNTRY_PAGES_DATA: Record<string, CountryPageData> = {
  oman: {
    slug: 'oman',
    nameEn: 'Oman',
    nameAr: 'سلطنة عُمان',
    flagEmoji: '🇴🇲',
    nationalityEn: 'Omani Patients',
    nationalityAr: 'المرضى العُمانيون',
    taglineEn: 'Direct Flights from Muscat to Calicut & Kochi • Arabic Medical Coordination',
    taglineAr: 'رحلات مباشرة من مسقط إلى كالكوت وكوتشي • تنسيق طبي عربي كامل',
    heroHeadlineEn: 'Medical Treatment in Kerala for Patients from Oman',
    heroHeadlineAr: 'العلاج الطبي في كيرلا للمرضى القادمين من سلطنة عُمان',
    heroSubEn: 'Hundreds of Omani families trust Kerala every year for complex surgeries, orthopaedics, and authentic Ayurveda. Enjoy 3-hour direct flights, native Arabic coordinators, and 60-80% cost savings at JCI/NABH accredited hospitals.',
    heroSubAr: 'تثق مئات العائلات العُمانية سنوياً بمستشفيات كيرلا لإجراء العمليات الدقيقة، جراحة العظام، وعلاجات الأيورفيدا الأصيلة. رحلات مباشرة خلال ٣ ساعات، منسقون يتحدثون العربية، وتوفير ٦٠-٨٠٪ في أفضل المستشفيات المعتمدة.',
    patientsServedStat: '450+',
    avgSavings: '70%',
    flightInfo: {
      directRoutesEn: 'Muscat (MCT) & Salalah (SLL) → Calicut (CCJ) & Kochi (COK)',
      directRoutesAr: 'مسقط (MCT) وصلالة (SLL) ← كالكوت (CCJ) وكوتشي (COK)',
      flightDurationEn: 'Approx. 3 hours 15 mins (Non-stop)',
      flightDurationAr: 'حوالي ٣ ساعات و١٥ دقيقة (طيران مباشر)',
      airportsInKeralaEn: 'Calicut International (CCJ) & Cochin International (COK)',
      airportsInKeralaAr: 'مطار كالكوت الدولي ومطار كوتشي الدولي',
      airlinesEn: ['Oman Air', 'SalamAir', 'Air India Express', 'IndiGo'],
      airlinesAr: ['الطيران العُماني', 'طيران السلام', 'طيران الهند إكسبريس', 'إنديجو'],
    },
    visaGuide: {
      typeEn: 'India e-Medical Visa (60-day triple entry)',
      typeAr: 'التأشيرة الطبية الهندية الإلكترونية (صالحة ٦٠ يوماً متعددة الدخول)',
      processEn: 'We provide an official Hospital Visa Invitation Letter within 24 hours of receiving your medical reports, allowing fast online e-Visa approval.',
      processAr: 'نصدر خطاب دعوة علاجية رسمياً من المستشفى خلال ٢٤ ساعة من استلام تقاريرك، مما يتيح لك إصدار التأشيرة الإلكترونية بسرعة وسهولة.',
      timelineEn: 'Typically approved within 24–48 hours online',
      timelineAr: 'تصدر إلكترونياً خلال ٢٤ إلى ٤٨ ساعة',
      documentsEn: ['Passport copy (min 6 months validity)', 'Hospital invitation letter (provided by us)', 'Recent photograph'],
      documentsAr: ['صورة جواز السفر (صلاحية ٦ أشهر)', 'خطاب دعوة المستشفى (نوفره لك)', 'صورة شخصية حديثة'],
    },
    keyAdvantages: [
      {
        titleEn: 'Decades of Kerala-Oman Cultural Bond',
        titleAr: 'علاقات تاريخية وروابط ثقافية وثيقة',
        descEn: 'Omani patients are deeply familiar with Kerala. Our hospital staff and Arabic coordinators provide culturally attuned, respectful care that makes families feel right at home.',
        descAr: 'تربط عُمان وكيرلا علاقات تاريخية ممتدة. طواقمنا الطبية ومترجمونا يوفرون رعاية تراعي الخصوصية وتجعل العائلة تشعر كأنها في وطنها.',
      },
      {
        titleEn: 'Direct Hospital Pricing — Zero Middleman Markups',
        titleAr: 'دفع مباشر للمستشفى بدون عمولات وسيط',
        descEn: 'All clinical bills are paid directly to JCI/NABH hospitals in Kerala. Our dedicated coordination and Arabic translation services are 100% complimentary for you.',
        descAr: 'تدفع الفواتير الطبية للمستشفى مباشرة. خدمات الاستقبال والترجمة والتنسيق مجانية تماماً للمريض العُماني.',
      },
      {
        titleEn: 'Short Flight & Effortless Airport Pickup',
        titleAr: 'قصر مسافة الطيران واستقبال VIP من المطار',
        descEn: 'With over 10 direct flights weekly from Muscat to Calicut, travel is smooth and painless even for elderly patients or individuals with mobility issues.',
        descAr: 'أكثر من ١٠ رحلات أسبوعية مباشرة من مسقط إلى كالكوت وكوتشي، مما يسهل السفر على كبار السن وحالات العظام دون إجهاد ترانزيت.',
      },
    ],
    popularTreatments: [
      {
        slug: 'orthopaedics',
        nameEn: 'Total Knee & Hip Replacement',
        nameAr: 'استبدال مفصل الركبة والحوض',
        whyRelevantEn: 'High demand among Omani seniors seeking robotic-assisted joint surgeries with fast post-op rehabilitation.',
        whyRelevantAr: 'إقبال كبير من كبار السن في عُمان لجراحات الروبوت المتطورة وبرامج التأهيل الحركي السريعة.',
        typicalDurationEn: '14–18 Days Stay',
        typicalDurationAr: 'إقامة ١٤-١٨ يوماً',
        estimatedCostEn: '$4,500 – $6,800 (vs $18,000+ in GCC)',
        estimatedCostAr: '٤,٥٠٠ - ٦,٨٠٠ دولار (مقابل +١٨,٠٠٠ في الخليج)',
      },
      {
        slug: 'cardiac',
        nameEn: 'Cardiac Bypass (CABG) & Valve Repair',
        nameAr: 'جراحة القلب المفتوح وصمامات القلب',
        whyRelevantEn: 'Performed in quaternary hybrid cath-labs by surgeons with 20+ years experience in the UK & India.',
        whyRelevantAr: 'تجرى في مراكز قسطرة هجينة على يد جراحين حاصلين على زمالات بريطانية وأمريكية.',
        typicalDurationEn: '14–21 Days Stay',
        typicalDurationAr: 'إقامة ١٤-٢١ يوماً',
        estimatedCostEn: '$5,800 – $8,500',
        estimatedCostAr: '٥,٨٠٠ - ٨,٥٠٠ دولار',
      },
      {
        slug: 'ayurveda',
        nameEn: 'Authentic Panchakarma & Stroke Rehab',
        nameAr: 'علاج الأيورفيدا الأصيل وإعادة تأهيل الجلطات',
        whyRelevantEn: 'Traditional herbal healing at Kottakkal Arya Vaidya Sala partners for chronic back disc, arthritis, and paralysis.',
        whyRelevantAr: 'علاجات عشبية طبية أصيلة في مراكز كوتاكال المعتمدة لعلاج الانزلاق الغضروفي والشلل والديسك.',
        typicalDurationEn: '14–28 Days Retreat',
        typicalDurationAr: 'إقامة ١٤-٢٨ يوماً',
        estimatedCostEn: '$1,500 – $3,500 (All-inclusive stay & food)',
        estimatedCostAr: '١,٥٠٠ - ٣,٥٠٠ دولار (شامل السكن والعلاج)',
      },
    ],
    familySupport: {
      titleEn: 'Dedicated Family & Companion Care in Calicut',
      titleAr: 'رعاية متكاملة للمرافقين والعائلات العُمانية',
      pointsEn: [
        'Furnished 2/3-bedroom serviced apartments within 5 minutes of partner hospitals',
        'Complimentary dedicated Arabic-speaking guide for daily consultations and shopping',
        'Halal dining arrangements and home-style Arabic kitchen options',
        'Optional post-recovery backwater day trips to Wayanad and Bekal for family relaxation',
      ],
      pointsAr: [
        'شقق فندقية مفروشة ومجهزة على بعد ٥ دقائق من المستشفى تتسع للعائلات',
        'مترجم ومرافق عماني/عربي دائم لجميع الجلسات الطبية وجولات التسوق',
        'ترتيبات طعام حلال وتوفير مطابخ مجهزة للطبخ المنزلي',
        'رحلات نقاهة واستجمام اختيارية للعائلة في منتجعات واياناد والبحيرات بعد التعافي',
      ],
    },
    testimonial: {
      patientNameEn: 'Salim Al-Harthy',
      patientNameAr: 'سالم الحارثي',
      cityEn: 'Muscat, Oman',
      cityAr: 'مسقط، سلطنة عُمان',
      treatmentEn: 'Robotic Knee Replacement & Physio',
      treatmentAr: 'استبدال الركبة بالروبوت والتأهيل',
      hospitalEn: 'Aster MIMS Hospital, Calicut',
      hospitalAr: 'مستشفى أستر ميمز، كالكوت',
      storyEn: 'I traveled from Muscat with my brother for bilateral knee surgery. The TreatInKerala coordinator was waiting at Calicut airport with a wheelchair and escorted us directly to our suite. The surgery was completely painless, the nursing team was outstanding, and we saved over 70% compared to private quotes in Muscat.',
      storyAr: 'سافرت من مسقط برفقة أخي لإجراء عملية استبدال الركبتين. كان منسق علاج في كيرلا ينتظرنا في مطار كالكوت ونقلنا مباشرة للجناح. الجراحة نجحت بامتياز وتعافيت بسرعة ووفرنا أكثر من ٧٠٪ مقارنة بالأسعار الخاصة في مسقط.',
      savingsEn: 'Saved $14,000+',
      savingsAr: 'وفر أكثر من ١٤,٠٠٠ دولار',
    },
    faqs: [
      {
        qEn: 'Are there direct flights from Muscat to Calicut for medical travel?',
        qAr: 'هل توجد رحلات طيران مباشرة من مسقط إلى كالكوت للسياحة العلاجية؟',
        aEn: 'Yes! Oman Air, SalamAir, and Air India Express operate daily non-stop flights from Muscat to Calicut (CCJ) and Kochi (COK), with a flight time of around 3 hours 15 minutes.',
        aAr: 'نعم! يسير الطيران العُماني وطيران السلام وطيران الهند رحلات يومية مباشرة من مسقط إلى مطار كالكوت ومطار كوتشي في مدة ٣ ساعات وربع فقط.',
      },
      {
        qEn: 'How do I obtain an Indian medical visa from Oman?',
        qAr: 'كيف أحصل على التأشيرة الطبية الهندية من سلطنة عُمان؟',
        aEn: 'Simply send us your latest medical reports. We will obtain an official Visa Invitation Letter from the accredited hospital within 24 hours. You can then apply online via the Indian e-Visa portal, and the approval typically arrives in 24-48 hours.',
        aAr: 'أرسل لنا تقاريرك الطبية فقط، وسنستخرج لك خطاب دعوة رسمياً من المستشفى خلال ٢٤ ساعة لتقديمه عبر بوابة التأشيرة الإلكترونية الهندية التي تصدر خلال يومين.',
      },
    ],
  },

  'saudi-arabia': {
    slug: 'saudi-arabia',
    nameEn: 'Saudi Arabia',
    nameAr: 'المملكة العربية السعودية',
    flagEmoji: '🇸🇦',
    nationalityEn: 'Saudi Patients',
    nationalityAr: 'المرضى من السعودية',
    taglineEn: 'Direct Flights from Riyadh & Jeddah • Specialized Quaternary Care & Direct Billing',
    taglineAr: 'رحلات مباشرة من الرياض وجدة • رعاية تخصصية متقدمة ودفع مباشر',
    heroHeadlineEn: 'World-Class Medical Care in Kerala for Patients from Saudi Arabia',
    heroHeadlineAr: 'رعاية طبية عالمية في كيرلا للمرضى القادمين من المملكة العربية السعودية',
    heroSubEn: 'Access India’s top surgical specialists and quaternary JCI hospitals in Kerala. We provide Arabic medical coordination, companion suites, and end-to-end logistics with zero agency commissions.',
    heroSubAr: 'احصل على أرقى الخدمات الجراحية التخصصية في مستشفيات كيرلا المعتمدة دولياً (JCI/NABH). نوفر منسقين عرب، أجنحة عائلية فاخرة، وخدمات لوجستية كاملة بدون أي عمولات وسيط.',
    patientsServedStat: '520+',
    avgSavings: '75%',
    flightInfo: {
      directRoutesEn: 'Riyadh (RUH), Jeddah (JED), Dammam (DMM) → Calicut (CCJ) & Kochi (COK)',
      directRoutesAr: 'الرياض (RUH)، جدة (JED)، الدمام (DMM) ← كالكوت (CCJ) وكوتشي (COK)',
      flightDurationEn: 'Approx. 4 hours 30 mins (Direct non-stop)',
      flightDurationAr: 'حوالي ٤ ساعات ونصف (رحلات مباشرة بدون توقف)',
      airportsInKeralaEn: 'Calicut (CCJ), Cochin (COK), Trivandrum (TRV)',
      airportsInKeralaAr: 'مطار كالكوت ومطار كوتشي ومطار تيروفانانتابورام',
      airlinesEn: ['Saudia', 'Air India Express', 'Flynas', 'IndiGo'],
      airlinesAr: ['الخطوط السعودية', 'طيران ناس', 'طيران الهند إكسبريس', 'إنديجو'],
    },
    visaGuide: {
      typeEn: 'India e-Medical Visa (Triple Entry, 60 Days with extension support)',
      typeAr: 'تأشيرة علاج إلكترونية (صالحة للدخول المتعدد وقابلة للتمديد الطبي)',
      processEn: 'Fast-track hospital invitation letters provided with hospital stamp and FRRO registration support in Kerala.',
      processAr: 'إصدار خطابات الدعوة الطبية الرسمية المعتمدة مع تسهيل إجراءات التسجيل الأمني الطبي (FRRO) عند الوصول.',
      timelineEn: '24–48 hours online via Indian e-Visa system',
      timelineAr: 'خلال ٢٤-٤٨ ساعة عبر البوابة الإلكترونية',
      documentsEn: ['Passport scan', 'Hospital letter provided by TreatInKerala', 'Patient photo'],
      documentsAr: ['صورة جواز السفر', 'خطاب المستشفى الصادر عبرنا', 'صورة شخصية'],
    },
    keyAdvantages: [
      {
        titleEn: 'Quaternary Specialties & Complex Oncology',
        titleAr: 'تخصصات جراحية دقيقة وعلاج أورام متطور',
        descEn: 'From robotic cancer resections and proton therapy to complex organ transplants, Kerala hosts India’s most technologically advanced surgical centres.',
        descAr: 'مستشفيات رعاية رباعية مجهزة بجراحة الروبوت، علاج الأورام المتقدم، زراعة الأعضاء وجراحة المخ والأعصاب المعقدة.',
      },
      {
        titleEn: 'VIP Arabic Liaison & Private Companion Wings',
        titleAr: 'مترجمون عرب معتمدون وأجنحة تنويم خاصة',
        descEn: 'We assign a dedicated Arabic-speaking medical coordinator to assist you during all surgeon consultations, translation, and hospital paperwork.',
        descAr: 'منسق طبي يتحدث العربية يرافقك طوال فترة إقامتك وخلال جلسات كبار الجراحين لضمان دقة التواصل وراحة البال.',
      },
      {
        titleEn: 'Transparent Pricing with Direct Hospital Checkout',
        titleAr: 'أسعار واضحة ودفع مباشر في كاونتر المستشفى',
        descEn: 'You pay 100% of treatment bills directly to the hospital. TreatInKerala adds zero markups to your hospital invoice.',
        descAr: 'تسديد كافة الرسوم الطبية يتم في المستشفى مباشرة بأسعارنا المؤسسية المخفضة مع مجانية خدمات التنسيق.',
      },
    ],
    popularTreatments: [
      {
        slug: 'cardiac',
        nameEn: 'Minimally Invasive Cardiac Surgery (MICS CABG)',
        nameAr: 'جراحة القلب بالتدخل المحدود وزراعة الشرايين',
        whyRelevantEn: 'Keyhole bypass surgery allowing patients to recover in half the standard time with minimal scarring.',
        whyRelevantAr: 'جراحات القلب بالمنظار عبر شق جانبي صغير تتيح سرعة التعافي والعودة للمملكة في وقت قياسي.',
        typicalDurationEn: '14–18 Days Stay',
        typicalDurationAr: 'إقامة ١٤-١٨ يوماً',
        estimatedCostEn: '$6,200 – $9,000',
        estimatedCostAr: '٦,٢٠٠ - ٩,٠٠٠ دولار',
      },
      {
        slug: 'neurology',
        nameEn: 'Spine Decompression & Neuro-Rehab',
        nameAr: 'جراحة العمود الفقري الدقيقة وإعادة التأهيل العصبي',
        whyRelevantEn: 'Microdiscectomy and robotic spinal fixation for severe disc herniation and sciatica relief.',
        whyRelevantAr: 'استئصال الانزلاق الغضروفي بالميكروسكوب وتثبيت الفقرات بالروبوت مع علاج عرق النسا.',
        typicalDurationEn: '12–16 Days Stay',
        typicalDurationAr: 'إقامة ١٢-١٦ يوماً',
        estimatedCostEn: '$5,000 – $7,800',
        estimatedCostAr: '٥,٠٠٠ - ٧,٨٠٠ دولار',
      },
      {
        slug: 'ayurveda',
        nameEn: 'Comprehensive Panchakarma Detox Retreat',
        nameAr: 'برامج الأيورفيدا الطبية وتطهير الجسم (بانشاكارما)',
        whyRelevantEn: 'Authentic 14-21 day clinical retreats for obesity, diabetes reversal, and chronic inflammation.',
        whyRelevantAr: 'منتجعات علاجية متخصصة لعلاج السمنة والسكري والتهاب المفاصل في بيئة طبيعية نقية.',
        typicalDurationEn: '14–21 Days Stay',
        typicalDurationAr: 'إقامة ١٤-٢١ يوماً',
        estimatedCostEn: '$1,800 – $3,800 (All-inclusive)',
        estimatedCostAr: '١,٨٠٠ - ٣,٨٠٠ دولار (شامل الإقامة والعلاج)',
      },
    ],
    familySupport: {
      titleEn: 'Private Family Accommodation & Halal Stays',
      titleAr: 'أجنحة عائلية خاصة ومطاعم حلال',
      pointsEn: [
        'Spacious private suites with separate living quarters for family companions',
        'Direct flights from Riyadh, Jeddah, and Dammam with zero layovers',
        'Dedicated airport chauffeur service and 24/7 coordinator on call',
        'Custom dietary options and Halal Arabic meals prepared daily',
      ],
      pointsAr: [
        'أجنحة خاصة واسعة تتسع للمريض ومرافقيه مع كامل الخصوصية',
        'رحلات مباشرة بدون توقف من مطارات الرياض وجدة والدمام',
        'استقبال بسيارة خاصة وسائق ومترجم طبي ٢٤/٧',
        'وجبات حلال يومية ومطابخ مجهزة لتناسب الذوق الخليجي',
      ],
    },
    testimonial: {
      patientNameEn: 'Abu Fahad Al-Otaibi',
      patientNameAr: 'أبو فهد العتيبي',
      cityEn: 'Riyadh, Saudi Arabia',
      cityAr: 'الرياض، المملكة العربية السعودية',
      treatmentEn: 'Complex Spine Surgery & Rehab',
      treatmentAr: 'جراحة العمود الفقري وإعادة التأهيل',
      hospitalEn: 'Meitra Hospital, Calicut',
      hospitalAr: 'مستشفى ميترا، كالكوت',
      storyEn: 'I suffered from debilitating spinal disc compression for 3 years. After comparing clinics in Germany and the UAE, I chose Meitra Hospital in Calicut through TreatInKerala. The technology in their paperless robotic OT is world-class, and I walked pain-free 48 hours post-op. The Arabic coordination made the whole trip seamless.',
      storyAr: 'عانيت من آلام الديسك الشديدة لثلاث سنوات. بعد مقارنة الخيارات في ألمانيا والإمارات، اخترت مستشفى ميترا في كيرلا عبر فريق علاج في كيرلا. غرف العمليات الرقمية لديهم تضاهي أكبر مستشفيات أوروبا، ومشيت بعد ٤٨ ساعة بدون ألم.',
      savingsEn: 'Saved $22,000+',
      savingsAr: 'وفر أكثر من ٢٢,٠٠٠ دولار',
    },
    faqs: [
      {
        qEn: 'Are there Arabic coordinators available at Kerala hospitals?',
        qAr: 'هل يتوفر منسقون ومترجمون عرب في مستشفيات كيرلا؟',
        aEn: 'Yes. TreatInKerala assigns a full-time bilingual Arabic/English coordinator who will accompany you to consultations, translate medical terms, and manage all ground logistics.',
        aAr: 'نعم بالتأكيد. نوفر لك منسقاً ومترجماً عربياً متخصصاً يرافقك في جميع جلسات الأطباء ويشرح التقارير بدقة ويدير كافة ترتيبات السكن والتنقل.',
      },
    ],
  },

  uae: {
    slug: 'uae',
    nameEn: 'United Arab Emirates',
    nameAr: 'الإمارات العربية المتحدة',
    flagEmoji: '🇦🇪',
    nationalityEn: 'UAE Patients & Residents',
    nationalityAr: 'المرضى والمقيمون في الإمارات',
    taglineEn: 'Short 3.5h Flight from Dubai, Abu Dhabi & Sharjah • 70% Cost Savings vs Private UAE Care',
    taglineAr: 'رحلة قصيرة ٣.٥ ساعات من دبي وأبوظبي • توفير ٧٠٪ مقارنة بالمستشفيات الخاصة',
    heroHeadlineEn: 'Premier Healthcare in Kerala for Patients from the UAE',
    heroHeadlineAr: 'رعاية صحية متميزة في كيرلا للمرضى القادمين من دولة الإمارات',
    heroSubEn: 'Skip high private insurance copays and steep hospital tariffs in Dubai and Abu Dhabi. Kerala is just 3.5 hours away, offering JCI-accredited surgical excellence and rapid scheduling.',
    heroSubAr: 'تجنب تكاليف التأمين المرتفعة وفترات الانتظار في المستشفيات الخاصة بدبي وأبوظبي. كيرلا على بُعد ٣ ساعات ونصف فقط وتوفر أعلى اعتمادات الجودة العالمية (JCI) بأسعار أقل بـ ٧٠٪.',
    patientsServedStat: '680+',
    avgSavings: '70%',
    flightInfo: {
      directRoutesEn: 'Dubai (DXB), Abu Dhabi (AUH), Sharjah (SHJ) → Calicut (CCJ) & Kochi (COK)',
      directRoutesAr: 'دبي (DXB)، أبوظبي (AUH)، الشارقة (SHJ) ← كالكوت (CCJ) وكوتشي (COK)',
      flightDurationEn: 'Approx. 3 hours 30 mins (Non-stop direct flights hourly)',
      flightDurationAr: 'حوالي ٣ ساعات و٣٠ دقيقة (رحلات مباشرة على مدار الساعة)',
      airportsInKeralaEn: 'Calicut (CCJ), Cochin (COK), Kannur (CNN), Trivandrum (TRV)',
      airportsInKeralaAr: 'مطار كالكوت ومطار كوتشي ومطار كانور ومطار تيروفانانتابورام',
      airlinesEn: ['Emirates', 'Etihad Airways', 'Air Arabia', 'Flydubai', 'Air India Express'],
      airlinesAr: ['طيران الإمارات', 'الاتحاد للطيران', 'العربية للطيران', 'فلاي دبي', 'طيران الهند إكسبريس'],
    },
    visaGuide: {
      typeEn: 'India e-Medical Visa (Instant e-Visa processing)',
      typeAr: 'التأشيرة الطبية الإلكترونية السريعة للمواطنين والمقيمين',
      processEn: 'We provide expedited hospital visa invitation letters within 12 hours for patients and accompanying relatives.',
      processAr: 'إصدار خطابات الدعوة الطبية العاجلة خلال ١٢ ساعة فقط للمرضى والمرافقين.',
      timelineEn: '24 hours online approval',
      timelineAr: 'الموافقة تصدر خلال ٢٤ ساعة إلكترونياً',
      documentsEn: ['Valid UAE residency or passport copy', 'Hospital visa invite', 'Photo'],
      documentsAr: ['صورة جواز السفر أو الإقامة الإماراتية', 'خطاب المستشفى الصادر منا', 'صورة شخصية'],
    },
    keyAdvantages: [
      {
        titleEn: '70% Lower Cost Than Private UAE Clinics',
        titleAr: 'توفير يصل إلى ٧٠٪ مقارنة بالعيادات الخاصة بالإمارات',
        descEn: 'Major procedures like cardiac bypass (AED 220,000 in UAE) are performed for under AED 30,000 at top quaternary hospitals in Kerala with zero compromise on clinical quality.',
        descAr: 'العمليات الكبرى مثل جراحة القلب (التي تكلف أكثر من ٢٠٠ ألف درهم في الإمارات) تجرى بأقل من ٣٠ ألف درهم في أفضل مستشفيات كيرلا المعتمدة.',
      },
      {
        titleEn: 'Ultra-Fast Flight Connectivity (3.5 Hours)',
        titleAr: 'رحلات طيران فائقة السرعة والتكرار (٣.٥ ساعات)',
        descEn: 'Dozens of flights take off daily from DXB, AUH, and SHJ. You can consult senior specialists within 24 hours of landing.',
        descAr: 'عشرات الرحلات اليومية المباشرة من دبي والشارقة وأبوظبي تتيح لك مقابلة كبار الاستشاريين في اليوم التالي لوصولك.',
      },
      {
        titleEn: 'Executive Care & Family Wellness Retreats',
        titleAr: 'باقات الرعاية التنفيذية وبرامج النقاهة العائلية',
        descEn: 'Combine surgical or dental treatments with world-renowned backwater Ayurveda wellness in peaceful coastal Kerala.',
        descAr: 'فرصة للجمع بين العمليات الجراحية أو تجميل الأسنان وبرامج الاستجمام والأيورفيدا وسط طبيعة كيرلا الخلابة.',
      },
    ],
    popularTreatments: [
      {
        slug: 'orthopaedics',
        nameEn: 'Robotic Knee & Joint Replacement',
        nameAr: 'استبدال المفاصل بالروبوت والتأهيل الفيزيائي',
        whyRelevantEn: 'Performed with Stryker Mako robotic systems at a fraction of Dubai private hospital costs.',
        whyRelevantAr: 'تجرى بأحدث أنظمة الروبوت العالمية بجزء بسيط من تكلفة المستشفيات الخاصة بدبي.',
        typicalDurationEn: '14–18 Days Stay',
        typicalDurationAr: 'إقامة ١٤-١٨ يوماً',
        estimatedCostEn: '$4,800 – $7,200',
        estimatedCostAr: '٤,٨٠٠ - ٧,٢٠٠ دولار (١٧,٠٠٠ - ٢٦,٠٠٠ درهم)',
      },
      {
        slug: 'ayurveda',
        nameEn: 'Executive Stress & Weight Loss Panchakarma',
        nameAr: 'باقات التخلص من الإجهاد وإنقاص الوزن والديسك',
        whyRelevantEn: 'Luxury wellness resorts and clinical hospitals specializing in lifestyle disorders and disc issues.',
        whyRelevantAr: 'منتجعات ومراكز طبية لعلاج ضغوط العمل، السمنة، وآلام أسفل الظهر بأساليب طبيعية معتمدة.',
        typicalDurationEn: '7–21 Days Stay',
        typicalDurationAr: 'إقامة ٧-٢١ يوماً',
        estimatedCostEn: '$1,200 – $3,200 (All-inclusive)',
        estimatedCostAr: '١,٢٠٠ - ٣,٢٠٠ دولار (شامل الإقامة والوجبات)',
      },
      {
        slug: 'dental',
        nameEn: 'Full Mouth Dental Implants & Veneers',
        nameAr: 'زراعة الأسنان الفورية وتجميل الابتسامة',
        whyRelevantEn: 'All-on-4 / All-on-6 digital dental implants with German ceramic crowns completed in 5-7 days.',
        whyRelevantAr: 'زراعة الأسنان الرقمية لكامل الفك بتيجان زيركون ألمانية خلال ٥ إلى ٧ أيام فقط.',
        typicalDurationEn: '5–7 Days Stay',
        typicalDurationAr: 'إقامة ٥-٧ أيام',
        estimatedCostEn: '$1,500 – $4,000 (vs $15,000+ in UAE)',
        estimatedCostAr: '١,٥٠٠ - ٤,٠٠٠ دولار (مقابل +٥٠,٠٠٠ درهم في الإمارات)',
      },
    ],
    familySupport: {
      titleEn: 'Seamless Travel Logistics from the UAE',
      titleAr: 'تنسيق لوجستي سلس للمرضى من الإمارات',
      pointsEn: [
        'Dedicated VIP airport greeting at CCJ and COK airports with private transportation',
        'Direct hospital admissions and private luxury inpatient rooms',
        'Arabic coordination desk and medical document translation for insurance reimbursement',
      ],
      pointsAr: [
        'استقبال خاص في صالة المطار بكالكوت أو كوتشي بسيارة وسائق خاص',
        'تسهيل إجراءات الدخول للمستشفى وتوفير غرف تنويم خاصة وراقية',
        'ترجمة كافة التقارير الطبية والفواتير باللغة الإنجليزية والعربية لتقديمها لشركات التأمين',
      ],
    },
    testimonial: {
      patientNameEn: 'Khalid Al-Nuaimi',
      patientNameAr: 'خالد النعيمي',
      cityEn: 'Dubai, UAE',
      cityAr: 'دبي، الإمارات العربية المتحدة',
      treatmentEn: 'Cardiac Bypass Surgery (CABG)',
      treatmentAr: 'جراحة القلب المفتوح (تغيير الشرايين)',
      hospitalEn: 'Aster MIMS Hospital, Calicut',
      hospitalAr: 'مستشفى أستر ميمز، كالكوت',
      storyEn: 'In Dubai, the private hospital quoted me AED 220,000 for bypass surgery. TreatInKerala coordinated the exact procedure at Aster MIMS for a fraction of that cost. The coordinator met me at Calicut airport and stayed with us daily. I saved over 70% and returned home to Dubai fully recovered.',
      storyAr: 'في دبي طُلِب مني ٢٢٠ ألف درهم لعملية القلب. فريق علاج في كيرلا رتب لي نفس العملية في مستشفى أستر بجزء بسيط من التكلفة. استقبلنا المنسق في المطار ورافقنا يومياً. وفرنا أكثر من ٧٠٪ وتعافيت تماماً ولله الحمد.',
      savingsEn: 'Saved AED 160,000+',
      savingsAr: 'وفر أكثر من ١٦٠,٠٠٠ درهم',
    },
    faqs: [
      {
        qEn: 'Can I get my medical bills in English for UAE health insurance claim submission?',
        qAr: 'هل يمكنني الحصول على الفواتير والتقارير باللغة الإنجليزية لتقديمها للتأمين في الإمارات؟',
        aEn: 'Yes. All partner hospitals provide complete itemized invoices, discharge summaries, and clinical reports in standardized international English suitable for overseas reimbursement claims.',
        aAr: 'نعم بالتأكيد. تصدر المستشفيات الشريكة تقارير وفواتير تفصيلية رسمية باللغة الإنجليزية المعتمدة دولياً لتقديمها لشركات التأمين الصحي.',
      },
    ],
  },

  maldives: {
    slug: 'maldives',
    nameEn: 'Maldives',
    nameAr: 'جزر المالديف',
    flagEmoji: '🇲🇻',
    nationalityEn: 'Maldivian Patients',
    nationalityAr: 'المرضى من جزر المالديف',
    taglineEn: 'Fast 1.5h Flights from Malé to Kochi & Trivandrum • Specialized Quaternary Care',
    taglineAr: 'رحلات طيران مباشرة ١.٥ ساعة من ماليه إلى كوتشي وتريفاندروم • رعاية تخصصية فورية',
    heroHeadlineEn: 'Immediate Specialized Medical Care in Kerala for Patients from Maldives',
    heroHeadlineAr: 'رعاية طبية تخصصية عاجلة في كيرلا للمرضى القادمين من جزر المالديف',
    heroSubEn: 'Kerala is the closest, most trusted healthcare destination for Maldivian citizens. Access advanced tertiary surgeries, oncology, cardiology, and pediatrics with direct 1.5-hour flights from Malé.',
    heroSubAr: 'تعد كيرلا الوجهة الطبية الأقرب والأكثر موثوقية لمواطني المالديف. احصل على تخصصات الجراحة المتقدمة، الأورام، القلب، وطب الأطفال عبر رحلات طيران مباشرة تستغرق ٩٠ دقيقة فقط من ماليه.',
    patientsServedStat: '380+',
    avgSavings: '65%',
    flightInfo: {
      directRoutesEn: 'Malé (MLE) → Cochin (COK) & Trivandrum (TRV)',
      directRoutesAr: 'ماليه (MLE) ← كوتشي (COK) وتيروفانانتابورام (TRV)',
      flightDurationEn: 'Approx. 1 hour 25 mins (Non-stop direct)',
      flightDurationAr: 'حوالي ساعة و٢٥ دقيقة (طيران مباشر سريع)',
      airportsInKeralaEn: 'Cochin International (COK) & Trivandrum International (TRV)',
      airportsInKeralaAr: 'مطار كوتشي الدولي ومطار تيروفانانتابورام الدولي',
      airlinesEn: ['Maldivian Airlines', 'IndiGo', 'Air India'],
      airlinesAr: ['طيران المالديفية', 'إنديجو', 'طيران الهند'],
    },
    visaGuide: {
      typeEn: 'Visa on Arrival / Medical e-Visa for Maldivian Nationals',
      typeAr: 'تأشيرة عند الوصول / تأشيرة طبية إلكترونية سريعة لمواطني المالديف',
      processEn: 'Maldivian citizens enjoy simplified entry and 90-day visa-free/easy medical visa access to India with hospital documentation support.',
      processAr: 'يتمتع مواطنو المالديف بتسهيلات دخول خاصة وسريعة مع خطابات الدعوة الطبية المعتمدة من مستشفياتنا.',
      timelineEn: 'Immediate / 24 hours',
      timelineAr: 'فوري / خلال ٢٤ ساعة',
      documentsEn: ['Maldivian Passport (min 6 months validity)', 'Hospital invitation letter', 'Medical records'],
      documentsAr: ['جواز سفر مالديفي صالح', 'خطاب المستشفى', 'التقارير الطبية'],
    },
    keyAdvantages: [
      {
        titleEn: '1.5-Hour Flight Proximity from Malé',
        titleAr: 'قرب جغرافي استثنائي (ساعة ونصف من ماليه)',
        descEn: 'Kochi and Trivandrum are geographically closer to Malé than almost any other major international medical hub, making emergency and scheduled travel effortless.',
        descAr: 'كوتشي وتريفاندروم هما أقرب العواصم الطبية المتقدمة لماليه، مما يسهل السفر للحالات الطارئة والمجدولة دون أي إجهاد.',
      },
      {
        titleEn: 'Specialties Not Readily Available in Malé',
        titleAr: 'تخصصات دقيقة غير متوفرة محلياً في ماليه',
        descEn: 'From pediatric cardiac surgery and organ transplants to advanced neurosurgery, our partner super-specialty hospitals bridge the local healthcare gap.',
        descAr: 'سد النقص في العمليات الجراحية المعقدة مثل جراحة قلب الأطفال، زراعة الأعضاء، الأورام المتقدمة وجراحة المخ والأعصاب.',
      },
      {
        titleEn: 'Short-Notice Emergency Admissions & Fast Quoting',
        titleAr: 'استقبال فوري للحالات العاجلة وتنسيق سريع',
        descEn: 'We provide immediate surgeon consults within hours of receiving medical records, with priority hospital bed reservations.',
        descAr: 'مراجعة فورية للتقارير وحجز أسرّة العناية والمستشفيات قبل إقلاع الطائرة من مطار فيلانا الدولي.',
      },
    ],
    popularTreatments: [
      {
        slug: 'cardiac',
        nameEn: 'Adult & Pediatric Heart Surgery',
        nameAr: 'جراحة القلب للبالغين والأطفال (تشوهات القلب)',
        whyRelevantEn: 'Congenital heart defect repairs (ASD/VSD) and bypass surgeries performed at top quaternary centers.',
        whyRelevantAr: 'إصلاح عيوب القلب الخلقية للأطفال وعمليات الشرايين التاجية في أحدث المراكز المتخصصة.',
        typicalDurationEn: '12–16 Days Stay',
        typicalDurationAr: 'إقامة ١٢-١٦ يوماً',
        estimatedCostEn: '$4,200 – $7,500',
        estimatedCostAr: '٤,٢٠٠ - ٧,٥٠٠ دولار',
      },
      {
        slug: 'oncology',
        nameEn: 'Cancer Diagnostics & Surgical Oncology',
        nameAr: 'علاج وجراحة الأورام والسرطان المتقدم',
        whyRelevantEn: 'PET-CT scans, robotic tumor resections, and medical chemotherapy protocols.',
        whyRelevantAr: 'فحوصات المسح الذري (PET-CT) والاستئصال الجراحي بالروبوت وبروتوكولات العلاج الكيماوي.',
        typicalDurationEn: '14–21 Days Stay',
        typicalDurationAr: 'إقامة ١٤-٢١ يوماً',
        estimatedCostEn: '$5,000 – $12,000',
        estimatedCostAr: '٥,٠٠٠ - ١٢,٠٠٠ دولار',
      },
      {
        slug: 'orthopaedics',
        nameEn: 'Joint Replacement & Arthroscopic Surgery',
        nameAr: 'جراحة المفاصل وتنظير الركبة والكتف',
        whyRelevantEn: 'Fast recovery knee and hip replacements with full physiotherapy support.',
        whyRelevantAr: 'عمليات استبدال المفاصل وبرامج التأهيل الطبيعي المتكامل قبل العودة للوطن.',
        typicalDurationEn: '10–14 Days Stay',
        typicalDurationAr: 'إقامة ١٠-١٤ يوماً',
        estimatedCostEn: '$4,200 – $6,000',
        estimatedCostAr: '٤,٢٠٠ - ٦,٠٠٠ دولار',
      },
    ],
    familySupport: {
      titleEn: 'Comprehensive Island-to-Hospital Coordination',
      titleAr: 'تنسيق متكامل من الجزر إلى المستشفى',
      pointsEn: [
        'Direct ambulance or private vehicle pickup right from Cochin (COK) or Trivandrum (TRV) runway',
        'Budget-friendly and premium guest houses near hospital campuses for family companions',
        'Local SIM card, currency exchange assistance, and multi-lingual coordinator',
      ],
      pointsAr: [
        'استقبال بسيارة خاصة أو إسعاف مجهز من مطار كوتشي أو تريفاندروم مباشرة',
        'خيارات سكن مريحة واقتصادية وقريبة جداً من المستشفيات للمرافقين',
        'توفير شريحة اتصال هندية ومساعدة في تصريف العملة وإدارة كل متطلبات الإقامة',
      ],
    },
    testimonial: {
      patientNameEn: 'Ibrahim Naseer',
      patientNameAr: 'إبراهيم نصير',
      cityEn: 'Malé, Maldives',
      cityAr: 'ماليه، جزر المالديف',
      treatmentEn: 'Cardiac Valve Replacement',
      treatmentAr: 'استبدال صمام القلب',
      hospitalEn: 'Amrita Hospital, Kochi',
      hospitalAr: 'مستشفى أمريتا، كوتشي',
      storyEn: 'My father required urgent heart valve replacement which could not be performed in Malé. TreatInKerala reviewed our echo reports in 4 hours, booked surgeon Dr. Rajesh at Amrita Hospital, and met us at Cochin airport. The surgery was successful and we were back in Malé in under 2 weeks.',
      storyAr: 'احتاج والدي إلى جراحة استبدال صمام طارئة لم تكن متوفرة في ماليه. راجع فريق علاج في كيرلا التقارير خلال ٤ ساعات ورتب الموعد مع كبار جراحي مستشفى أمريتا واستقبلنا في المطار. نجحت العملية وعدنا للمالديف خلال أسبوعين.',
      savingsEn: 'Fast 4-Hour Triage',
      savingsAr: 'تنسيق سريع خلال ٤ ساعات',
    },
    faqs: [
      {
        qEn: 'How fast can I get treated in Kerala for urgent cases from Maldives?',
        qAr: 'ما هي سرعة التنسيق للحالات العاجلة القادمة من المالديف؟',
        aEn: 'For urgent medical cases, we can review medical scans within 2-4 hours, arrange immediate hospital admission letters, and have a medical team waiting at Kochi/Trivandrum airport upon your flight arrival.',
        aAr: 'بالنسبة للحالات الطبية العاجلة، يمكننا مراجعة التقارير خلال ساعتين إلى ٤ ساعات، وتجهيز سرير المستشفى وفريق الاستقبال في المطار فور هبوط الطائرة.',
      },
    ],
  },

  kuwait: {
    slug: 'kuwait',
    nameEn: 'Kuwait',
    nameAr: 'دولة الكويت',
    flagEmoji: '🇰🇼',
    nationalityEn: 'Kuwaiti Patients',
    nationalityAr: 'المرضى من دولة الكويت',
    taglineEn: 'Direct Flights from Kuwait City • Quaternary Excellence & Ayurvedic Healing',
    taglineAr: 'رحلات مباشرة من مدينة الكويت • جراحات تخصصية متقدمة واستشفاء أيورفيدي أصيل',
    heroHeadlineEn: 'World-Class Medical Care in Kerala for Patients from Kuwait',
    heroHeadlineAr: 'رعاية طبية تخصصية عالمية في كيرلا للمرضى القادمين من دولة الكويت',
    heroSubEn: 'Kuwaiti citizens and residents choose Kerala for its unmatched combination of accredited quaternary hospitals, expert surgeons, and serene Ayurvedic recovery retreats. 100% transparent pricing and Arabic coordination.',
    heroSubAr: 'يختار المرضى من الكويت مستشفيات كيرلا لما تتميز به من مستشفيات معتمدة دولياً (JCI/NABH)، كبار الجراحين، وبيئة استشفاء طبيعية فريدة. تسعير مباشر وشفاف مع منسقين عرب مرافقين.',
    patientsServedStat: '410+',
    avgSavings: '70%',
    flightInfo: {
      directRoutesEn: 'Kuwait City (KWI) → Calicut (CCJ) & Kochi (COK)',
      directRoutesAr: 'مدينة الكويت (KWI) ← كالكوت (CCJ) وكوتشي (COK)',
      flightDurationEn: 'Approx. 4 hours 15 mins (Non-stop direct)',
      flightDurationAr: 'حوالي ٤ ساعات و١٥ دقيقة (طيران مباشر بدون توقف)',
      airportsInKeralaEn: 'Calicut (CCJ) & Cochin (COK)',
      airportsInKeralaAr: 'مطار كالكوت ومطار كوتشي الدولي',
      airlinesEn: ['Kuwait Airways', 'Jazeera Airways', 'Air India Express', 'IndiGo'],
      airlinesAr: ['الخطوط الجوية الكويتية', 'طيران الجزيرة', 'طيران الهند إكسبريس', 'إنديجو'],
    },
    visaGuide: {
      typeEn: 'India e-Medical Visa (Triple Entry, 60 Days)',
      typeAr: 'تأشيرة علاج إلكترونية سريعة (دخول متعدد)',
      processEn: 'We deliver your official hospital visa invitation letter within 24 hours of report submission.',
      processAr: 'نرسل لك خطاب الدعوة الطبية المعتمد من المستشفى خلال ٢٤ ساعة لتقديم التأشيرة الإلكترونية فوراً.',
      timelineEn: '24–48 hours online',
      timelineAr: 'خلال ٢٤ إلى ٤٨ ساعة إلكترونياً',
      documentsEn: ['Kuwaiti Passport copy', 'Hospital invitation letter', 'Recent photograph'],
      documentsAr: ['صورة جواز السفر الكويتي', 'خطاب المستشفى', 'صورة شخصية حديثة'],
    },
    keyAdvantages: [
      {
        titleEn: 'Quaternary Orthopaedics & Spine Specialists',
        titleAr: 'جراحة العظام واستبدال المفاصل بالروبوت',
        descEn: 'Kerala’s senior orthopaedic surgeons perform thousands of joint replacements annually with advanced navigation technology and dedicated post-op physiotherapy.',
        descAr: 'يجري جراحو العظام في كيرلا آلاف العمليات سنوياً بتقنيات الملاحة الجراحية والروبوت وبرامج العلاج الطبيعي المكثف.',
      },
      {
        titleEn: 'Authentic Classical Ayurveda for Chronic Ailments',
        titleAr: 'علاجات الأيورفيدا الطبية الكلاسيكية الأصيلة',
        descEn: 'World-famous centers like Kottakkal Arya Vaidya Sala provide trusted clinical treatment for rheumatoid arthritis, slip discs, and stroke rehab.',
        descAr: 'مراكز عريقة مثل كوتاكال أريا فايديا سالا تقدم علاجات موثوقة للروماتيزم، الانزلاق الغضروفي، والجلطات.',
      },
      {
        titleEn: 'Dedicated Family Suites & Arabic Liaison',
        titleAr: 'أجنحة عائلية فاخرة ومترجم عربي مرافق',
        descEn: 'From airport chauffeur greeting to daily consultation translation, we ensure maximum comfort for Kuwaiti patients and traveling companions.',
        descAr: 'نضمن أعلى درجات الراحة والخصوصية للعائلات الكويتية من استقبال المطار وحتى المغادرة بسلامة الله.',
      },
    ],
    popularTreatments: [
      {
        slug: 'orthopaedics',
        nameEn: 'Total Knee & Hip Replacement',
        nameAr: 'استبدال مفاصل الركبة والحوض بالروبوت',
        whyRelevantEn: 'Minimally invasive joint surgery with fast rehabilitation and zero waitlists.',
        whyRelevantAr: 'جراحات المفاصل بالتدخل المحدود والتأهيل الحركي الفوري بدون أي فترات انتظار.',
        typicalDurationEn: '14–18 Days Stay',
        typicalDurationAr: 'إقامة ١٤-١٨ يوماً',
        estimatedCostEn: '$4,500 – $7,000',
        estimatedCostAr: '٤,٥٠٠ - ٧,٠٠٠ دولار',
      },
      {
        slug: 'ayurveda',
        nameEn: 'Panchakarma & Spine Disc Rehabilitation',
        nameAr: 'علاج الديسك وتأهيل العمود الفقري بالأيورفيدا',
        whyRelevantEn: 'Natural non-surgical herbal therapies for sciatica, cervical spondylosis, and disc pain.',
        whyRelevantAr: 'علاجات طبيعية عشبية متقدمة لعلاج آلام الرقبة وأسفل الظهر وعرق النسا بدون جراحة.',
        typicalDurationEn: '14–21 Days Stay',
        typicalDurationAr: 'إقامة ١٤-٢١ يوماً',
        estimatedCostEn: '$1,600 – $3,500 (All-inclusive)',
        estimatedCostAr: '١,٦٠٠ - ٣,٥٠٠ دولار (شامل السكن والعلاج)',
      },
      {
        slug: 'cardiac',
        nameEn: 'CABG Bypass & Cardiac Angioplasty',
        nameAr: 'جراحة القلب المفتوح والقسطرة العلاجية',
        whyRelevantEn: 'Experienced senior cardiac surgeons with international fellowships.',
        whyRelevantAr: 'نخبة من كبار استشاريي جراحة القلب في مستشفيات حاصلة على اعتمادات JCI.',
        typicalDurationEn: '14–21 Days Stay',
        typicalDurationAr: 'إقامة ١٤-٢١ يوماً',
        estimatedCostEn: '$5,800 – $8,500',
        estimatedCostAr: '٥,٨٠٠ - ٨,٥٠٠ دولار',
      },
    ],
    familySupport: {
      titleEn: 'Family Comfort & Accompaniment in Kerala',
      titleAr: 'رعاية العائلات والمرافقين القادمين من الكويت',
      pointsEn: [
        'Direct non-stop flights from Kuwait City on Kuwait Airways and Jazeera Airways',
        '24/7 dedicated Arabic-speaking coordinator on ground in Calicut and Kochi',
        'Private chauffeur vehicles for hospital visits and family shopping tours',
      ],
      pointsAr: [
        'رحلات مباشرة من مدينة الكويت عبر الخطوط الكويتية وطيران الجزيرة',
        'منسق ومترجم عربي مخصص على مدار الساعة في كالكوت وكوتشي',
        'سيارات خاصة وسائق لمرافقة العائلة خلال المواعيد وجولات التسوق والاستجمام',
      ],
    },
    testimonial: {
      patientNameEn: 'Bader Al-Mutawa',
      patientNameAr: 'بدر المطوع',
      cityEn: 'Kuwait City, Kuwait',
      cityAr: 'مدينة الكويت، دولة الكويت',
      treatmentEn: 'Knee Arthroscopy & Ayurvedic Rehab',
      treatmentAr: 'منظار الركبة والتأهيل الأيورفيدي',
      hospitalEn: 'Baby Memorial Hospital & Kottakkal Partner',
      hospitalAr: 'مستشفى بيبي ميموريال وشريك كوتاكال',
      storyEn: 'I combined a minor orthopaedic procedure at Baby Memorial Hospital with a 14-day Ayurvedic Panchakarma treatment. The TreatInKerala team arranged everything from the airport pickup in Calicut to our resort booking. The doctors were brilliant and the care was exceptionally warm.',
      storyAr: 'جمعت بين علاج منظار الركبة في مستشفى بيبي ميموريال ودورة علاج أيورفيدا لمدة ١٤ يوماً. رتب فريق علاج في كيرلا كل شيء من استقبال المطار إلى حجز المنتجع. كفاءة الأطباء ممتازة والاهتمام الإنساني يفوق الوصف.',
      savingsEn: 'Saved $16,000+',
      savingsAr: 'وفر أكثر من ١٦,٠٠٠ دولار',
    },
    faqs: [
      {
        qEn: 'How do I reach Calicut or Kochi from Kuwait?',
        qAr: 'كيف أسافر من الكويت إلى كالكوت أو كوتشي؟',
        aEn: 'Kuwait Airways, Jazeera Airways, and Air India Express operate direct, non-stop flights from Kuwait International Airport (KWI) to Calicut (CCJ) and Cochin (COK) in just over 4 hours.',
        aAr: 'تسير الخطوط الجوية الكويتية وطيران الجزيرة وطيران الهند رحلات مباشرة بدون توقف من مطار الكويت إلى كالكوت وكوتشي في ٤ ساعات فقط.',
      },
    ],
  },

  qatar: {
    slug: 'qatar',
    nameEn: 'Qatar',
    nameAr: 'دولة قطر',
    flagEmoji: '🇶🇦',
    nationalityEn: 'Qatari Patients',
    nationalityAr: 'المرضى من دولة قطر',
    taglineEn: 'Direct Flights from Doha on Qatar Airways • Premium Executive Concierge Healthcare',
    taglineAr: 'رحلات مباشرة من الدوحة على القطرية • رعاية صحية تنفيذية وتنسيق كونسيرج فاخر',
    heroHeadlineEn: 'Executive Healthcare & Surgical Excellence in Kerala for Patients from Qatar',
    heroHeadlineAr: 'رعاية صحية تنفيذية وجراحة تخصصية في كيرلا للمرضى القادمين من دولة قطر',
    heroSubEn: 'Experience premier medical travel combining quaternary JCI hospital treatment with executive VIP concierge service in Kerala. Non-stop flights from Doha to Calicut and Kochi.',
    heroSubAr: 'استمتع بأرقى خدمات السياحة العلاجية التي تجمع بين أحدث مستشفيات كيرلا المعتمدة دولياً وخدمات الكونسيرج الخاصة للمرضى وعائلاتهم. رحلات مباشرة من الدوحة إلى كالكوت وكوتشي.',
    patientsServedStat: '340+',
    avgSavings: '70%',
    flightInfo: {
      directRoutesEn: 'Doha (DOH) → Calicut (CCJ) & Kochi (COK)',
      directRoutesAr: 'الدوحة (DOH) ← كالكوت (CCJ) وكوتشي (COK)',
      flightDurationEn: 'Approx. 3 hours 45 mins (Non-stop)',
      flightDurationAr: 'حوالي ٣ ساعات و٤٥ دقيقة (طيران مباشر)',
      airportsInKeralaEn: 'Calicut (CCJ) & Cochin (COK)',
      airportsInKeralaAr: 'مطار كالكوت ومطار كوتشي الدولي',
      airlinesEn: ['Qatar Airways', 'Air India Express', 'IndiGo'],
      airlinesAr: ['الخطوط الجوية القطرية', 'طيران الهند إكسبريس', 'إنديجو'],
    },
    visaGuide: {
      typeEn: 'India e-Medical Visa (60-Day Triple Entry with Concierge Assistance)',
      typeAr: 'تأشيرة طبية إلكترونية سريعة مع مساعدة كونسيرج متكاملة',
      processEn: 'Expedited hospital invitation letters and priority visa documentation handled within 12-24 hours.',
      processAr: 'إصدار خطابات المستشفى الرسمية وتجهيز طلبات التأشيرة الإلكترونية خلال ١٢-٢٤ ساعة.',
      timelineEn: '24–48 hours online',
      timelineAr: 'خلال ٢٤ إلى ٤٨ ساعة إلكترونياً',
      documentsEn: ['Qatari Passport copy', 'Hospital visa invitation letter', 'Photograph'],
      documentsAr: ['صورة جواز السفر القطري', 'خطاب المستشفى', 'صورة شخصية'],
    },
    keyAdvantages: [
      {
        titleEn: 'VIP Executive Concierge & Private Rooms',
        titleAr: 'خدمة كونسيرج VIP وأجنحة تنويم خاصة فاخرة',
        descEn: 'From private airport tarmac assistance to 5-star companion suites, our premium concierge model ensures unmatched discretion, comfort, and care.',
        descAr: 'خدمة استقبال خاصة وسيارات فاخرة وأجنحة تنويم متميزة لضمان أعلى مستويات الراحة والخصوصية للمريض ومرافقيه.',
      },
      {
        titleEn: 'Advanced Robotic Surgery & Quaternary Infrastructure',
        titleAr: 'جراحة الروبوت المتقدمة وبنية تحتية رقمية فائقة',
        descEn: 'Partner hospitals feature hybrid operating theatres, da Vinci robotic surgery, and advanced cardiac catheterization suites.',
        descAr: 'غرف عمليات هجينة وجراحة الروبوت (da Vinci) ومراكز قسطرة متطورة بإشراف نخبة من كبار الجراحين.',
      },
      {
        titleEn: 'Holistic Post-Operative Ayurvedic Rejuvenation',
        titleAr: 'استشفاء ونقاهة أيورفيدية بعد الجراحة',
        descEn: 'Transition seamlessly from acute hospital care into private luxury backwater retreats for guided physiotherapy and rejuvenation.',
        descAr: 'إمكانية قضاء فترة النقاهة بعد الجراحة في منتجعات استشفائية هادئة على بحيرات كيرلا بإشراف طبي.',
      },
    ],
    popularTreatments: [
      {
        slug: 'cardiac',
        nameEn: 'Complex Cardiac Surgery & Valve Repair',
        nameAr: 'جراحة القلب المعقدة واستبدال الصمامات',
        whyRelevantEn: 'Renowned cardiac centers with high surgical volumes and international success rates.',
        whyRelevantAr: 'مراكز جراحة قلب متقدمة تحقق أعلى نسب النجاح العالمية في عمليات الشرايين والصمامات.',
        typicalDurationEn: '14–21 Days Stay',
        typicalDurationAr: 'إقامة ١٤-٢١ يوماً',
        estimatedCostEn: '$6,000 – $9,000',
        estimatedCostAr: '٦,٠٠٠ - ٩,٠٠٠ دولار',
      },
      {
        slug: 'orthopaedics',
        nameEn: 'Robotic Joint & Sports Injury Surgery',
        nameAr: 'جراحة المفاصل بالروبوت وإصابات الملاعب',
        whyRelevantEn: 'ACL/meniscus reconstruction and robotic joint replacements with specialized sports physio.',
        whyRelevantAr: 'ترميم الرباط الصليبي والغضاريف واستبدال المفاصل مع برامج تأهيل رياضي متقدمة.',
        typicalDurationEn: '12–16 Days Stay',
        typicalDurationAr: 'إقامة ١٢-١٦ يوماً',
        estimatedCostEn: '$4,800 – $7,500',
        estimatedCostAr: '٤,٨٠٠ - ٧,٥٠٠ دولار',
      },
      {
        slug: 'ayurveda',
        nameEn: 'Executive Wellness & Anti-Aging Panchakarma',
        nameAr: 'باقات الأيورفيدا التنفيذية وتجديد الحيوية ومكافحة الإجهاد',
        whyRelevantEn: 'Exclusive bespoke wellness retreats customized by senior Ayurvedic physicians.',
        whyRelevantAr: 'برامج استجمام وتطهير للجسم مصممة خصيصاً للتخلص من الإرهاق واستعادة النشاط.',
        typicalDurationEn: '14–21 Days Stay',
        typicalDurationAr: 'إقامة ١٤-٢١ يوماً',
        estimatedCostEn: '$2,000 – $4,500 (All-inclusive Luxury Retreat)',
        estimatedCostAr: '٢,٠٠٠ - ٤,٥٠٠ دولار (شامل الإقامة الفاخرة والعلاج)',
      },
    ],
    familySupport: {
      titleEn: 'Executive Travel & Companion Amenities',
      titleAr: 'خدمات استثنائية للمرافقين والعائلات القطرية',
      pointsEn: [
        'Direct daily flights on Qatar Airways from Hamad International Airport (DOH) to Calicut and Kochi',
        'Dedicated Arabic-speaking executive coordinator assigned exclusively to your family',
        'Direct hospital billing with 100% complimentary concierge and logistics coordination',
      ],
      pointsAr: [
        'رحلات يومية مباشرة عبر الخطوط القطرية من مطار حمد الدولي (DOH) إلى كيرلا',
        'منسق ومترجم عربي مخصص لمرافقة العائلة طوال الرحلة العلاجية',
        'دفع مباشر للمستشفى بدون أي رسوم وساطة أو عمولات إضافية',
      ],
    },
    testimonial: {
      patientNameEn: 'Mohammed Al-Kuwari',
      patientNameAr: 'محمد الكواري',
      cityEn: 'Doha, Qatar',
      cityAr: 'الدوحة، دولة قطر',
      treatmentEn: 'Robotic Spine Surgery & Recovery',
      treatmentAr: 'جراحة العمود الفقري بالروبوت والنقاهة',
      hospitalEn: 'Aster Medcity, Kochi',
      hospitalAr: 'مستشفى أستر ميدسيتي، كوتشي',
      storyEn: 'I booked my spine surgery at Aster Medcity through TreatInKerala. From our pickup at Cochin airport to our private waterfront hospital room, the attention to detail was incredible. The surgeon was exceptional and my coordinator Aisha took care of every single requirement. Highly recommended for patients from Qatar.',
      storyAr: 'أجريت عملية العمود الفقري في مستشفى أستر ميدسيتي عبر فريق علاج في كيرلا. من الاستقبال في مطار كوتشي إلى الجناح الخاص المطل على الماء، كان الاهتمام فائقاً. الجراح كان رائعاً والمنسقة رتبت كل التفاصيل بدقة.',
      savingsEn: 'Saved $20,000+',
      savingsAr: 'وفر أكثر من ٢٠,٠٠٠ دولار',
    },
    faqs: [
      {
        qEn: 'Are there direct Qatar Airways flights to Kerala for medical travelers?',
        qAr: 'هل توجد رحلات مباشرة على الخطوط القطرية إلى كيرلا للسياحة العلاجية؟',
        aEn: 'Yes! Qatar Airways flies non-stop daily from Hamad International Airport (DOH) to both Cochin (COK) and Calicut (CCJ), with flight times around 3 hours 45 minutes.',
        aAr: 'نعم! تسير الخطوط الجوية القطرية رحلات يومية مباشرة بدون توقف من مطار حمد الدولي إلى مطاري كوتشي وكالكوت في ٣ ساعات و٤٥ دقيقة فقط.',
      },
    ],
  },
};
