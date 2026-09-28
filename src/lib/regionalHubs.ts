export interface HubHospital {
  nameEn: string;
  nameAr: string;
  accreditation: string;
  typeEn: string;
  typeAr: string;
  overviewEn: string;
  overviewAr: string;
  specialitiesEn: string[];
  specialitiesAr: string[];
}

export interface RegionalHubData {
  slug: string;
  nameEn: string;
  nameAr: string;
  districtEn: string;
  districtAr: string;
  taglineEn: string;
  taglineAr: string;
  heroHeadlineEn: string;
  heroHeadlineAr: string;
  heroSubEn: string;
  heroSubAr: string;
  airport: {
    nameEn: string;
    nameAr: string;
    code: string;
    driveTimeEn: string;
    driveTimeAr: string;
    directFlightsEn: string;
    directFlightsAr: string;
  };
  localDesk: {
    statusEn: string;
    statusAr: string;
    featuresEn: string[];
    featuresAr: string[];
  };
  keyAdvantages: {
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
  }[];
  topSpecialities: {
    nameEn: string;
    nameAr: string;
    costEn: string;
    costAr: string;
    descEn: string;
    descAr: string;
  }[];
  hospitals: HubHospital[];
  accommodations: {
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
  }[];
  faqs: {
    qEn: string;
    qAr: string;
    aEn: string;
    aAr: string;
  }[];
}

export const REGIONAL_HUBS: Record<string, RegionalHubData> = {
  kochi: {
    slug: 'kochi',
    nameEn: 'Kochi (Ernakulam)',
    nameAr: 'كوتشين (إرناكولام)',
    districtEn: 'Ernakulam District, Central Kerala',
    districtAr: 'محافظة إرناكولام، وسط كيرلا',
    taglineEn: 'Metropolitan Medical Capital & Organ Transplant Hub',
    taglineAr: 'العاصمة الطبية الكبرى ومركز زراعة الأعضاء',
    heroHeadlineEn: 'World-Class JCI Hospitals & Dedicated Concierge Team in Kochi',
    heroHeadlineAr: 'مستشفيات معتمدة دولياً وطاقم تنسيق دائم في كوتشين (إرناكولام)',
    heroSubEn: 'Kochi is Kerala’s premier healthcare metropolis, home to massive waterfront quaternary institutions renowned for organ transplants, robotic surgeries, and complex oncology. Our resident team provides seamless Cochin Airport (COK) reception, Arabic interpretation, and five-star backwater recovery.',
    heroSubAr: 'تعتبر مدينة كوتشين (إرناكولام) العاصمة الصحية الأكثر تطوراً في كيرلا، وتضم مستشفيات رعاية رباعية عملاقة تشتهر بزراعة الأعضاء، وجراحات الروبوت، والأورام. يوفر فريقنا المتواجد في كوتشين استقبالاً خاصاً من مطار كوتشين (COK)، وترجمة عربية، ونقاهة راقية.',
    airport: {
      nameEn: 'Cochin International Airport (Kochi)',
      nameAr: 'مطار كوتشين الدولي',
      code: 'COK',
      driveTimeEn: '20 to 35 minutes directly to partner hospitals',
      driveTimeAr: '20 إلى 35 دقيقة بالسيارة الخاصة للمستشفيات الشريكة',
      directFlightsEn: 'Non-stop direct flights daily from Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, Doha, Muscat, Kuwait, London & Singapore.',
      directFlightsAr: 'رحلات مباشرة يومياً بدون توقف من الرياض، جدة، الدمام، دبي، أبوظبي، الدوحة، مسقط، الكويت، ولندن.',
    },
    localDesk: {
      statusEn: 'Dedicated Staff & Concierge Desk Stationed in Ernakulam',
      statusAr: 'طاقم عمل ومنسقون طبيون ومترجمون دائمون في إرناكولام',
      featuresEn: [
        'Direct tarmac & terminal reception at Cochin Airport (COK)',
        'Full-time fluent Arabic & English patient coordinators',
        'Hospital VIP admission lanes at Aster Medcity, Amrita & Lakeshore',
        'Private waterfront serviced apartments and serene backwater suites',
        'Official 24-hour e-Medical Visa invitation letter issuance',
      ],
      featuresAr: [
        'استقبال خاص فور الخروج من صالة مطار كوتشين الدولي (COK)',
        'منسقون طبيون ومترجمون يتحدثون العربية بطلاقة يرافقونك خطوة بخطوة',
        'أولوية الدخول السريع في أستر ميدسيتي، أمريتا، وليك شور',
        'شقق فندقية عائلية فاخرة وأجنحة نقاهة مطلة على الخلجان المائية',
        'إصدار خطاب دعوة التأشيرة الطبية الرسمية المعتمدة خلال 24 ساعة',
      ],
    },
    keyAdvantages: [
      {
        titleEn: 'Quaternary Multi-Organ Transplants',
        titleAr: 'زراعة الأعضاء المعقدة',
        descEn: 'Kochi performs among the highest volumes of successful liver, kidney, heart, and bone marrow transplants in South Asia with post-op survival rates exceeding 95%.',
        descAr: 'تُعد كوتشين من أعلى المراكز الطبية في جنوب آسيا نجاحاً في عمليات زراعة الكبد، والكلى، والقلب، والنخاع العظمي بنسب نجاح تتجاوز 95%.',
      },
      {
        titleEn: 'Robotic Surgery & Advanced Oncology',
        titleAr: 'جراحة الروبوت وعلاج الأورام المتقدم',
        descEn: 'Equipped with the Da Vinci Xi surgical robot, TrueBeam stereotactic radiotherapy, and multidisciplinary international tumor boards.',
        descAr: 'مستشفيات مجهزة بروبوت دافنشي الجراحي الأحدث (Da Vinci Xi)، وجهاز ترو بيم للأشعة التجسيمية، ولجان أورام متعددة التخصصات.',
      },
      {
        titleEn: 'Backwater Convalescence & Halal Comfort',
        titleAr: 'نقاهة البحيرات والراحة الحلال',
        descEn: 'Blend surgical recovery with peaceful stays along Kochi’s world-famous backwaters. 100% Halal dining and multi-lingual Arabic care.',
        descAr: 'استمتع بنقاهة هادئة تجمع بين أرقى رعاية طبية وأجواء طبيعية ساحرة على ضفاف بحيرات كوتشين مع أطعمة حلال 100%.',
      },
    ],
    topSpecialities: [
      {
        nameEn: 'Liver & Kidney Organ Transplants',
        nameAr: 'زراعة الكبد والكلى',
        costEn: '$18,000 – $28,000',
        costAr: '18,000 – 28,000 دولار',
        descEn: 'Comprehensive donor workup, ICMR legal documentation, liver resection, ICU recovery, and 30-day immunosuppression monitoring.',
        descAr: 'تشمل فحوصات المتبرع، التوثيق القانوني، جراحة الاستئصال والزرع، ورعاية العناية المركزة والمتابعة.',
      },
      {
        nameEn: 'Robotic Joint & Spine Surgery',
        nameAr: 'جراحة المفاصل والعمود الفقري بالروبوت',
        costEn: '$4,800 – $6,800',
        costAr: '4,800 – 6,800 دولار',
        descEn: 'Sub-millimeter precision total knee and hip replacements using US FDA Stryker Mako robotic arm and rapid recovery physiotherapy.',
        descAr: 'استبدال الركبة والورك بدقة تحت المليمتر بالروبوت مع المشي خلال 24 ساعة وجلسات العلاج الطبيعي.',
      },
      {
        nameEn: 'Cardiac Bypass & Valve Repair',
        nameAr: 'القلب المفتوح وترميم الصمامات',
        costEn: '$6,200 – $9,200',
        costAr: '6,200 – 9,200 دولار',
        descEn: 'Beating-heart minimally invasive CABG, aortic valve replacements, and pediatric cardiac surgery in hybrid cath suites.',
        descAr: 'جراحة مجازة الشريان التاجي على القلب النابض، وتبديل الصمامات، وجراحات قلب الأطفال المعقدة.',
      },
      {
        nameEn: 'Advanced Oncology & Tumor Resection',
        nameAr: 'علاج الأورام واستئصال السرطان',
        costEn: '$4,000 – $8,500',
        costAr: '4,000 – 8,500 دولار',
        descEn: 'PET-CT diagnostic imaging, stereotactic radio-surgery, targeted immunotherapy, and complete surgical tumor removals.',
        descAr: 'التصوير المقطعي البوزيتروني (PET-CT)، الجراحة الإشعاعية، العلاج المناعي، والاستئصال الجراحي الدقيق.',
      },
    ],
    hospitals: [
      {
        nameEn: 'Aster Medcity (Kochi)',
        nameAr: 'أستر ميدسيتي (كوتشين)',
        accreditation: 'JCI Accredited • NABH Certified',
        typeEn: '670-Bed Waterfront Quaternary Hospital',
        typeAr: 'مستشفى رعاية رباعية 670 سريراً على واجهة بحرية',
        overviewEn: 'One of the most advanced healthcare destinations in South Asia, spread across a 40-acre serene waterfront campus. Features 8 dedicated centers of excellence.',
        overviewAr: 'أحد أرقى الصروح الطبية في جنوب آسيا، يمتد على مساحة 40 فداناً على الواجهة المائية، ويضم 8 مراكز تميز طبي متكاملة.',
        specialitiesEn: ['Organ Transplants', 'Cardiology & Heart Surgery', 'Neurology & Spine', 'Robotic Oncology', 'Joint Replacement'],
        specialitiesAr: ['زراعة الأعضاء', 'أمراض وجراحة القلب', 'المخ والأعصاب والعمود الفقري', 'علاج الأورام بالروبوت', 'استبدال المفاصل'],
      },
      {
        nameEn: 'Amrita Institute of Medical Sciences (AIMS)',
        nameAr: 'معهد أمريتا للعلوم الطبية (كوتشين)',
        accreditation: 'NABH Accredited • NABL Certified',
        typeEn: '1,350-Bed Premier Medical University Hospital',
        typeAr: 'مستشفى جامعي وبحثي ضخم بسعة 1,350 سريراً',
        overviewEn: 'Internationally acclaimed for pediatric heart surgery, bilateral hand transplants, and complex oncological surgeries with 25 modern operating theaters.',
        overviewAr: 'يشتهر عالمياً بجراحات قلب الأطفال النادرة، وزراعة الأيدي الثنائية، وجراحات الأورام المعقدة، ويضم 25 غرفة عمليات رقمية.',
        specialitiesEn: ['Pediatric Cardiac Surgery', 'Hand & Micro-Vascular Surgery', 'Bone Marrow Transplant', 'Advanced Neurology'],
        specialitiesAr: ['جراحة قلب الأطفال', 'جراحة اليد والجراحات المجهرية', 'زراعة النخاع العظمي', 'طب الأعصاب المتقدم'],
      },
      {
        nameEn: 'VPS Lakeshore Hospital (Kochi)',
        nameAr: 'مستشفى في بي إس ليك شور (كوتشين)',
        accreditation: 'NABH Accredited • Joint Commission Compliant',
        typeEn: 'Multi-Super Specialty Quaternary Hospital',
        typeAr: 'مستشفى تخصصي فائق التطور',
        overviewEn: 'Renowned for surgical gastroenterology, comprehensive cancer care, and joint replacement, situated directly on NH-66 near Nettoor, Kochi.',
        overviewAr: 'صرح متميز في جراحة الجهاز الهضمي المتقدمة، وأمراض الكبد، وعلاج السرطان، واستبدال المفاصل، بموقع استراتيجي في كوتشين.',
        specialitiesEn: ['Gastroenterology & Liver Care', 'Orthopedics & Joint Reconstruction', 'Surgical Oncology', 'Renal Sciences'],
        specialitiesAr: ['أمراض وجراحة الكبد والجهاز الهضمي', 'العظام وإعادة بناء المفاصل', 'جراحة الأورام', 'أمراض وزراعة الكلى'],
      },
      {
        nameEn: 'Rajagiri Hospital (Aluva, Kochi)',
        nameAr: 'مستشفى راجاجيري (ألوفا، كوتشين)',
        accreditation: 'JCI Accredited • NABH Certified',
        typeEn: '550-Bed JCI Super Specialty Center',
        typeAr: 'مستشفى تخصصي معتمد دولياً بسعة 550 سريراً',
        overviewEn: 'Located just 15 minutes from Cochin International Airport, Rajagiri offers ultra-modern medical suites, pristine infection control, and rapid hospital admission.',
        overviewAr: 'يبعد 15 دقيقة فقط عن مطار كوتشين الدولي، ويتميز بأحدث الأجنحة الطبية، ومعايير مكافحة العدوى الصارمة، وسرعة إجراءات التنويم.',
        specialitiesEn: ['Cardiology', 'Joint Replacement', 'Gastrointestinal Surgery', 'Neurosurgery', 'Urology'],
        specialitiesAr: ['أمراض القلب', 'استبدال المفاصل', 'جراحة الجهاز الهضمي', 'جراحة المخ والأعصاب', 'المسالك البولية'],
      },
    ],
    accommodations: [
      {
        titleEn: 'Waterfront Serviced Executive Suites (Marine Drive & Cheranallur)',
        titleAr: 'أجنحة وشقق فندقية على الواجهة البحرية (مارين درايف وتشرانالور)',
        descEn: '2- and 3-bedroom furnished luxury apartments with private kitchens, attached modern bathrooms, high-speed Wi-Fi, and 24/7 security near Aster Medcity.',
        descAr: 'شقق مفروشة راقية (غرفتان وثلاث غرف) مع مطبخ مجهز وغسالة وإنترنت فائق السرعة بالقرب من أستر ميدسيتي.',
      },
      {
        titleEn: '4-Star & 5-Star Partner Business Hotels (Edappally & MG Road)',
        titleAr: 'فنادق 4 و 5 نجوم شريكة (إدابالي وإم جي رود)',
        descEn: 'Wheelchair-accessible rooms with elevators, custom Halal room service, and direct concierge shuttle service to Kochi hospitals.',
        descAr: 'غرف مهيأة بالكامل للكراسي المتحركة مع مصاعد، وقوائم طعام حلال، وخدمة توصيل يومية إلى المستشفيات.',
      },
      {
        titleEn: 'Post-Op Backwater Convalescence Villas',
        titleAr: 'فلل نقاهة واستشفاء على ضفاف الخلجان الهادئة',
        descEn: 'Serene standalone villas designed for patient recovery and family privacy, featuring green gardens and private nursing support on call.',
        descAr: 'فلل مستقلة تضمن أقصى درجات الخصوصية للمريض وعائلته بين أحضان الطبيعة مع توفير رعاية تمريضية منزلية عند الطلب.',
      },
    ],
    faqs: [
      {
        qEn: 'How far are partner hospitals from Cochin International Airport (COK)?',
        qAr: 'كم تبعد المستشفيات الشريكة في كوتشين عن مطار كوتشين الدولي (COK)؟',
        aEn: 'Most partner hospitals in Kochi are within 15 to 35 minutes by car. Rajagiri Hospital is just 15 minutes away, while Aster Medcity, Amrita, and Lakeshore are 25 to 35 minutes via the dedicated container road or NH-66. TreatInKerala coordinates private tarmac meet-and-greet and AC ambulance or executive car transfers.',
        aAr: 'تبعد معظم مستشفيات كوتشين ما بين 15 إلى 35 دقيقة بالسيارة عن المطار. فمستشفى راجاجيري يبعد 15 دقيقة فقط، بينما تبعد أستر ميدسيتي وأمريتا وليك شور حوالي 25 إلى 35 دقيقة. ويوفر فريقنا خدمة الاستقبال الخاص بسيارة مكيفة أو سيارة إسعاف مجهزة.',
      },
      {
        qEn: 'Do you have dedicated Arabic translators at Aster Medcity and Amrita Hospital?',
        qAr: 'هل توفرون مترجمين يتحدثون العربية في أستر ميدسيتي ومستشفى أمريتا؟',
        aEn: 'Yes. Our resident Ernakulam coordination team includes fluent Arabic and English medical interpreters who attend every clinical consultation, procedure, and nurse check-in with you, ensuring complete cultural and medical peace of mind.',
        aAr: 'نعم بالتأكيد. يضم فريقنا الدائم في إرناكولام منسقين ومترجمين يتحدثون العربية بطلاقة يرافقونك في كافة الكشوفات والعمليات والفحوصات لشرح أدق التفاصيل الطبية والاطمئنان على راحتك.',
      },
      {
        qEn: 'Can family members stay with the patient in Kochi hospital rooms?',
        qAr: 'هل يمكن للمرافقين وأفراد العائلة الإقامة مع المريض في غرف مستشفيات كوتشين؟',
        aEn: 'Yes. Partner hospitals provide spacious Executive and Presidential private suites equipped with adjacent companion beds, en-suite bathrooms, cable TV with Arabic channels, and kitchenettes. We also arrange serviced family apartments nearby for larger families.',
        aAr: 'نعم. توفر المستشفيات أجنحة تنفيذية ورئاسية خاصة مزودة بأسرة مريحة للمرافقين، وحمام خاص، وقنوات تلفزيونية عربية، ومطبخ صغير. كما نوفر شققاً فندقية مجاورة للمستشفى للعائلات الكبيرة.',
      },
    ],
  },

  calicut: {
    slug: 'calicut',
    nameEn: 'Calicut (Kozhikode)',
    nameAr: 'كوزيكود (كالكوت)',
    districtEn: 'Kozhikode District, Northern Kerala',
    districtAr: 'محافظة كوزيكود، شمال كيرلا',
    taglineEn: 'Super-Specialty Excellence & Peaceful Coastal Healing',
    taglineAr: 'التميز الجراحي التخصصي والنقاهة الساحلية الهادئة',
    heroHeadlineEn: 'Premier Tertiary Care & Robotic Surgery Center in Calicut',
    heroHeadlineAr: 'أرقى المستشفيات التخصصية وجراحة الروبوت في كوزيكود (كالكوت)',
    heroSubEn: 'Calicut is TreatInKerala’s primary headquarters. Known as India’s "City of Hospitality", Calicut combines high-density JCI and NABH accredited hospitals with a serene coastal environment free from metropolitan traffic.',
    heroSubAr: 'تعتبر كوزيكود المقر الرئيسي لخدمة علاج في كيرلا، وتُعرف بعاصمة الضيافة في الهند. تجمع بين نخبة من المستشفيات الحاصلة على اعتمادات JCI وNABH، وأجواء ساحلية هادئة مثالية للتعافي بعد الجراحة بعيداً عن صخب المدن.',
    airport: {
      nameEn: 'Calicut International Airport (Karippur)',
      nameAr: 'مطار كوزيكود الدولي (كاريور)',
      code: 'CCJ',
      driveTimeEn: '20 to 25 minutes to city super-specialty hospitals',
      driveTimeAr: '20 إلى 25 دقيقة فقط بالسيارة لأرقى مستشفيات المدينة',
      directFlightsEn: 'Extensive daily non-stop flights from Riyadh, Jeddah, Dammam, Dubai, Sharjah, Abu Dhabi, Doha, Bahrain & Muscat.',
      directFlightsAr: 'رحلات يومية مباشرة ومكثفة من الرياض، جدة، الدمام، دبي، الشارقة، أبوظبي، الدوحة، البحرين ومسقط.',
    },
    localDesk: {
      statusEn: 'TreatInKerala Headquarters at HiLITE Business Park, Calicut',
      statusAr: 'المقر الرئيسي لعلاج في كيرلا في هيلاند بزنس بارك، كوزيكود',
      featuresEn: [
        'Dedicated senior coordinators and Arabic translators headquartered locally',
        '20-minute airport transfers from Calicut Airport (CCJ)',
        'Direct partnerships with Meitra, Aster MIMS, and Baby Memorial Hospital',
        'Special institutional hospital tariffs (15–20% lower than walk-in international rates)',
        'Free local SIM cards, currency exchange assistance, and companion trips',
      ],
      featuresAr: [
        'طاقم إدارة ومنسقون ومترجمون عرب استشاريون متواجدون محلياً على مدار الساعة',
        'نقل مريح خلال 20 دقيقة فقط من مطار كوزيكود الدولي (CCJ)',
        'شراكات مباشرة وممتازة مع مستشفى ميترا، أستر ميمز، وبيبي ميموريال',
        'أسعار مؤسسية خاصة ومخفضة (أقل بنسبة 15-20% من أسعار المستشفى المباشرة)',
        'شرائح اتصال محلية مجانية، تسهيلات صرف العملات، وجولات ترفيهية للمرافقين',
      ],
    },
    keyAdvantages: [
      {
        titleEn: 'Robotic Joint Replacement Capital',
        titleAr: 'عاصمة استبدال المفاصل بالروبوت',
        descEn: 'Meitra Hospital and Aster MIMS feature cutting-edge Stryker Mako robotic joint systems, delivering sub-millimeter precision and walking within 24 hours.',
        descAr: 'تتميز مستشفيات كوزيكود بأحدث أنظمة الروبوت الجراحي للمفاصل (Stryker Mako) لتحقيق دقة متناهية والمشي في غضون 24 ساعة.',
      },
      {
        titleEn: 'Cost-Efficiency Without Compromise',
        titleAr: 'أسعار اقتصادية وجودة فائقة',
        descEn: 'Operational living and lodging expenses in Calicut are 25% lower than Kochi and 40% lower than Mumbai/Delhi, maximizing your overall savings.',
        descAr: 'تكاليف المعيشة والإقامة الفندقية في كوزيكود أقل بنسبة 25% من كوتشين و40% من دلهي ومومباي، مما يوفر لك أكبر قدر من المال.',
      },
      {
        titleEn: 'Coastal Air & Fresh Organic Food',
        titleAr: 'هواء ساحلي نقي وغذاء عضوي طازج',
        descEn: 'Clean sea breezes, authentic Halal Malabar cuisine, and lush beachside parks ensure accelerated post-operative tissue healing.',
        descAr: 'نقاء الهواء الساحلي والمأكولات الحلال الطازجة الغنية بالمأكولات البحرية والخضروات تساعد على سرعة التئام الجروح والنقاهة.',
      },
    ],
    topSpecialities: [
      {
        nameEn: 'Robotic Total Knee / Hip Replacement',
        nameAr: 'استبدال الركبة والورك بالروبوت',
        costEn: '$4,500 – $6,500',
        costAr: '4,500 – 6,500 دولار',
        descEn: 'Full surgery package with Stryker implants, 4 nights private executive suite, surgeon fees, and inpatient physical therapy.',
        descAr: 'باقة جراحية شاملة مع الغرسات الأمريكية الأصلية، وإقامة 4 ليالٍ في جناح تنفيذي، والعلاج الطبيعي المكثف.',
      },
      {
        nameEn: 'Coronary Artery Bypass (CABG)',
        nameAr: 'جراحة القلب المفتوح ومجازة الشريان',
        costEn: '$5,800 – $8,500',
        costAr: '5,800 – 8,500 دولار',
        descEn: 'Off-pump beating heart bypass surgery conducted by internationally trained senior cardio-thoracic surgical teams.',
        descAr: 'جراحة القلب على القلب النابض بدون توقف بإشراف كبار جراحي القلب الحاصلين على الزمالة البريطانية والأمريكية.',
      },
      {
        nameEn: 'Endoscopic Spine Discectomy',
        nameAr: 'استئصال غضروف الظهر بالمنظار',
        costEn: '$3,600 – $4,900',
        costAr: '3,600 – 4,900 دولار',
        descEn: 'Minimally invasive micro-endoscopic spine surgery for herniated discs and sciatica with minimal tissue disruption.',
        descAr: 'استئصال الانزلاق الغضروفي بالمنظار الدقيق من خلال فتحة لا تتعدى سنتيمتراً واحداً مع الخروج السريع من المستشفى.',
      },
      {
        nameEn: 'Full Arch Digital Dental Implants',
        nameAr: 'زراعة الأسنان الرقمية الكاملة',
        costEn: '$1,800 – $2,800',
        costAr: '1,800 – 2,800 دولار',
        descEn: 'All-on-4 / All-on-6 premium titanium implants with computerized 3D CBCT surgical guides and monolithic zirconia bridges.',
        descAr: 'زراعة الفك الكامل بأحدث تقنيات التوجيه ثلاثي الأبعاد وتيجان الزركونيا الفاخرة خلال 7 أيام فقط.',
      },
    ],
    hospitals: [
      {
        nameEn: 'Meitra Hospital (Calicut)',
        nameAr: 'مستشفى ميترا (كوزيكود)',
        accreditation: 'JCI Accredited • NABH Certified',
        typeEn: 'Digital Smart Quaternary Care Hospital',
        typeAr: 'مستشفى رقمي ذكي للرعاية فائقة التطور',
        overviewEn: 'A pioneering paperless hospital designed with modular Scandinavian architecture. World leader in robotic joint replacements and minimally invasive cardiology.',
        overviewAr: 'مستشفى رقمي رائد صُمم وفق الطراز الإسكندنافي المريح للنفسية، ويعد الرائد في جراحات المفاصل بالروبوت وجراحات القلب.',
        specialitiesEn: ['Robotic Joint Replacement', 'Heart & Vascular Center', 'Neurosciences & Spine', 'Urology & Kidney Care'],
        specialitiesAr: ['استبدال المفاصل بالروبوت', 'مركز القلب والأوعية الدموية', 'جراحة المخ والأعصاب والعمود الفقري', 'المسالك البولية والكلى'],
      },
      {
        nameEn: 'Aster MIMS (Calicut)',
        nameAr: 'أستر ميمز (كوزيكود)',
        accreditation: 'NABH Accredited • NABL Certified',
        typeEn: '600-Bed Tertiary Care Flagship',
        typeAr: 'مستشفى تخصصي رائد بسعة 600 سرير',
        overviewEn: 'The flagship hospital of the Aster DM Healthcare network in Northern Kerala, offering multidisciplinary emergency medicine, organ transplants, and cancer care.',
        overviewAr: 'المستشفى الأبرز لشبكة أستر في شمال كيرلا، ويضم أقساماً متكاملة للطوارئ على مدار الساعة، وزراعة الأعضاء، وعلاج الأورام.',
        specialitiesEn: ['Cardiac Sciences', 'Medical & Surgical Oncology', 'Gastroenterology', 'Pediatrics & Neonatology'],
        specialitiesAr: ['أمراض وجراحة القلب', 'علاج وجراحة الأورام', 'أمراض الجهاز الهضمي والكبد', 'طب وجراحة الأطفال'],
      },
      {
        nameEn: 'Baby Memorial Hospital (BMH, Calicut)',
        nameAr: 'مستشفى بيبي التذكاري (كوزيكود)',
        accreditation: 'NABH Accredited • NABL Certified',
        typeEn: '800-Bed Multi-Specialty Giant',
        typeAr: 'صرح طبي شامل ضخم بسعة 800 سرير',
        overviewEn: 'One of the largest private multi-specialty hospitals in Kerala, featuring 40+ specialized medical departments and 16 modern surgical suites.',
        overviewAr: 'أحد أضخم المستشفيات الخاصة في كيرلا، يضم أكثر من 40 قسماً طبياً متخصصاً و16 غرفة عمليات متطورة.',
        specialitiesEn: ['Orthopedics & Trauma', 'Neuro-Surgery', 'Plastic & Cosmetic Surgery', 'Cardiology', 'Pulmonology'],
        specialitiesAr: ['جراحة العظام والحوادث', 'جراحة الأعصاب', 'جراحة التجميل والترميم', 'القلب والأوعية الدموية', 'أمراض الصدر'],
      },
    ],
    accommodations: [
      {
        titleEn: 'HiLITE Business Park Serviced Apartments',
        titleAr: 'شقق فندقية راقية في مجمع هيلاند كوزيكود',
        descEn: 'Modern apartments directly attached to Kerala’s premier shopping mall, offering Arabic food outlets, hypermarkets, and 24/7 security.',
        descAr: 'شقق فندقية حديثة متصلة بأكبر مجمع تجاري في كوزيكود، تضم مطاعم عربية ومتاجر كبرى وأمن على مدار الساعة.',
      },
      {
        titleEn: 'Calicut Beachfront Recovery Resorts',
        titleAr: 'منتجعات نقاهة شاطئية مطلة على بحر العرب',
        descEn: 'Peaceful coastal suites where patients recover with sea views, fresh ocean air, and customized dietary catering.',
        descAr: 'أجنحة شاطئية هادئة حيث يقضي المريض فترة نقاهته مع إطلالة بحرية رائعة وهواء نقي يساعد على الشفاء السريع.',
      },
      {
        titleEn: 'Executive Companion Rooms Near Hospitals',
        titleAr: 'غرف وأجنحة فاخرة للمرافقين بجوار المستشفيات',
        descEn: 'Comfortable hotel rooms located less than 5 minutes from Meitra and Aster MIMS, ideal for accompanying family members.',
        descAr: 'غرف فندقية مريحة تبعد أقل من 5 دقائق عن مستشفى ميترا وأستر ميمز مخصصة لمرافقي المريض.',
      },
    ],
    faqs: [
      {
        qEn: 'Why choose Calicut over other Indian cities for surgery?',
        qAr: 'لماذا يفضل الكثيرون كوزيكود عن المدن الهندية الأخرى لإجراء الجراحة؟',
        aEn: 'Calicut offers the perfect combination of world-class JCI/NABH technology (such as Stryker Mako robotic joint replacements at Meitra) with zero city pollution or chaotic traffic. Furthermore, living and hotel expenses in Calicut are 30–40% lower than in Mumbai or Delhi, and Calicut Airport (CCJ) offers non-stop flights from across the GCC.',
        aAr: 'تجمع كوزيكود بين أحدث التقنيات الطبية العالمية (مثل جراحة الروبوت للمفاصل في مستشفى ميترا) والهدوء التام بعيداً عن التلوث والازدحام الخانق في دلهي أو مومباي. كما أن تكاليف الإقامة أقل بنسبة 30-40%، وتتوفر رحلات طيران مباشرة من كافة دول الخليج.',
      },
      {
        qEn: 'How does TreatInKerala support patients arriving at Calicut Airport (CCJ)?',
        qAr: 'كيف تستقبل خدمة علاج في كيرلا المرضى في مطار كوزيكود الدولي؟',
        aEn: 'Our coordinator greets you right outside international arrivals with a personalized placard, coordinates wheelchair assistance if needed, provides a local Indian SIM card, and transfers you in a private air-conditioned car straight to your hospital executive room or hotel.',
        aAr: 'يستقبلك منسقنا بلوحة تحمل اسمك فور خروجك من صالة الوصول، ويؤمن كرسياً متحركاً للمريض، ويسلمك شريحة اتصال محلية، وينقلك بسيارة خاصة ومكيفة مباشرة لمقر إقامتك أو جناح المستشفى.',
      },
    ],
  },

  kottakkal: {
    slug: 'kottakkal',
    nameEn: 'Kottakkal (Malappuram)',
    nameAr: 'كوتاكال (مالابورام)',
    districtEn: 'Malappuram District, South-Central Kerala',
    districtAr: 'محافظة مالابورام، كيرلا',
    taglineEn: 'The Undisputed World Capital of Classical Authentic Ayurveda',
    taglineAr: 'العاصمة العالمية الأولى لطب الأيورفيدا الكلاسيكي الأصيل',
    heroHeadlineEn: 'Kottakkal Arya Vaidya Sala Treatment, Accommodations & Concierge Desk',
    heroHeadlineAr: 'العلاج في كوتاكال آريا فايديا شالا: حجز المواعيد، السكن العائلي وشحن الأدوية',
    heroSubEn: 'Home to the legendary Kottakkal Arya Vaidya Sala (founded in 1902 by Vaidyaratnam P.S. Varier). TreatInKerala operates right on the ground in Kottakkal, helping international patients bypass 3-month hospital waiting lists through outpatient coordination, nearby serviced villas, and worldwide medicine shipping.',
    heroSubAr: 'المقر الرئيسي لمؤسسة كوتاكال آريا فايديا شالا الأسطورية (تأسست عام 1902). يتواجد فريقنا في قلب كوتاكال لمساعدة المرضى في حجز المواعيد مع كبار الأطباء، وتنسيق العلاج بالعيادات الخارجية دون انتظار أشهر طويلة، وتوفير الفلل العائلية وشحن الأدوية عالمياً.',
    airport: {
      nameEn: 'Calicut International Airport (Karippur / CCJ)',
      nameAr: 'مطار كوزيكود الدولي (CCJ)',
      code: 'CCJ',
      driveTimeEn: '35 minutes direct private transfer to Kottakkal town',
      driveTimeAr: '35 دقيقة فقط بالسيارة الخاصة مباشرة لبلدة كوتاكال',
      directFlightsEn: 'Non-stop daily flights from Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, Doha, and Muscat directly into CCJ.',
      directFlightsAr: 'رحلات مباشرة يومياً من كافة مدن المملكة والخليج تهبط مباشرة في مطار كوزيكود الأقرب لكوتاكال.',
    },
    localDesk: {
      statusEn: 'Local Coordination Desk Stationed in Kottakkal (Near Arya Vaidya Sala)',
      statusAr: 'مكتب تنسيق ميداني دائم في كوتاكال (بجوار آريا فايديا شالا ومصنع الأدوية)',
      featuresEn: [
        'Priority appointment booking with senior Chief Vaidyas (Ayurvedic Physicians)',
        'Outpatient (OP) daily therapy model to bypass months-long inpatient waitlists',
        'Curated private serviced villas and apartments with customized kitchens near AVS',
        'Dedicated Arabic and English interpreters attending every doctor consultation',
        'Direct procurement and worldwide door-to-door courier of authentic Kottakkal medicines',
        'Immediate medical backup at nearby Aster MIMS Kottakkal (MRI, CT, lab tests)',
      ],
      featuresAr: [
        'حجز مواعيد مسبقة مع كبار أطباء الأيورفيدا الاستشاريين (الفيديا) دون طوابير',
        'ترتيب العلاج بنظام العيادات الخارجية (OP) لتفادي قوائم الانتظار الطويلة لغرف التنويم',
        'توفير فلل وشقق عائلية مفروشة ومجهزة بمطابخ خاصة على بعد دقائق من المستشفى',
        'مترجمون عرب مرافقون في كافة المقابلات الطبية لشرح الأعراض بدقة',
        'شراء وشحن أدوية وزيوت كوتاكال الأصلية مباشرة من صيدلية المصنع حتى باب بيتك عالمياً',
        'دعم طبي حديث مجاور في مستشفى أستر ميمز كوتاكال (أشعة الرنين المغناطيسي وتحاليل الدم)',
      ],
    },
    keyAdvantages: [
      {
        titleEn: '120-Year Ashtavaidya Tradition',
        titleAr: 'تراث علاجي يمتد لأكثر من 120 عاماً',
        descEn: 'Founded in 1902, Arya Vaidya Sala maintains the purest, authentic classical formulations from ancient Ayurvedic texts backed by modern scientific research.',
        descAr: 'تأسست عام 1902 وتحافظ على أنقى التركيبات الكلاسيكية المستخلصة من أمهات كتب الأيورفيدا مدعومة بأحدث مختبرات الأبحاث الدوائية.',
      },
      {
        titleEn: 'Permanent Spine & Joint Relief',
        titleAr: 'علاج جذري لآلام الديسك والمفاصل بدون جراحة',
        descEn: 'Over 85% of patients with lumbar disc bulges, sciatica, and cervical spondylosis achieve long-term recovery through Kativasthi and herbal oil therapies without surgery.',
        descAr: 'يحقق أكثر من 85% من مرضى الانزلاق الغضروفي (الديسك) وعرق النسا والخشونة شفاءً تاماً دون الحاجة لعمليات تثبيت الفقرات الخطرة.',
      },
      {
        titleEn: 'Worldwide Door-to-Door Medicine Courier',
        titleAr: 'شحن الأدوية الأصلية لجميع دول العالم',
        descEn: 'We source genuine oils, Kashayams, and herbal supplements directly from the Kottakkal factory dispensary and ship them to GCC, Europe, and North America.',
        descAr: 'نقوم بشراء الأدوية والزيوت الأصلية مباشرة من صيدلية مصنع كوتاكال الرسمية وشحنها جواً حتى باب بيتك في الخليج وأوروبا وأمريكا.',
      },
    ],
    topSpecialities: [
      {
        nameEn: 'Severe Spine Disc Slip & Sciatica Protocol',
        nameAr: 'بروتوكول علاج الانزلاق الغضروفي والديسك وعرق النسا',
        costEn: '$1,800 – $2,700 (21 Days)',
        costAr: '1,800 – 2,700 دولار (21 يوماً)',
        descEn: 'Kativasthi, Greevavasthi, warm herbal oil Pizhichil baths, medicated enemas (Vasthi), private lodging, and translation.',
        descAr: 'جلسات كاتيفاستي، وبيزيتشيل، وكمادات الأعشاب الطبية، مع السكن العائلي والانتقالات والترجمة.',
      },
      {
        nameEn: 'Post-Stroke Paralysis & Hemiplegia Recovery',
        nameAr: 'تأهيل الشلل النصفي وما بعد الجلطات الدماغية',
        costEn: '$2,500 – $3,900 (28 Days)',
        costAr: '2,500 – 3,900 دولار (28 يوماً)',
        descEn: 'Intensive neuromuscular restoration using Navarakkizhi, Shirodhara, Ksheerabasti, muscle toning oils, and daily physician monitoring.',
        descAr: 'جلسات النافاراكيزي والشيرودارا بالزيوت المقوية للأعصاب، وتنشيط حركة الأطراف المشلولة مع الإشراف الطبي اليومي.',
      },
      {
        nameEn: 'Rheumatoid Arthritis & Joint Osteoarthritis',
        nameAr: 'علاج الروماتيزم والتهاب المفاصل وخشونة الركبة',
        costEn: '$1,700 – $2,600 (21 Days)',
        costAr: '1,700 – 2,600 دولار (21 يوماً)',
        descEn: 'Anti-inflammatory herbal poultices (Podikkizhi, Elakkizhi), joint lubrication oils, and deep systemic detoxification.',
        descAr: 'كمادات الأعشاب الحارة لإزالة التورم والالتهاب، وتغذية غضاريف الركبة، وتنظيف المفاصل من السموم المترسبة.',
      },
      {
        nameEn: 'Classical Panchakarma Detoxification',
        nameAr: 'برنامج البانشاكارما الكامل لتنظيف السموم',
        costEn: '$1,100 – $1,800 (14 Days)',
        costAr: '1,100 – 1,800 دولار (14 يوماً)',
        descEn: 'Complete 5-fold purification cycle: Vamana, Virechana, Vasthi, Nasya, and Rakthamokshana with customized organic sattvic diet.',
        descAr: 'تنظيف كامل وشامل لأجهزة الجسم الحيوية، وإعادة التوازن الهرموني والأيضي، ومكافحة الشيخوخة والإجهاد المزمن.',
      },
    ],
    hospitals: [
      {
        nameEn: 'Kottakkal Arya Vaidya Sala (AVS Headquarters)',
        nameAr: 'مؤسسة كوتاكال آريا فايديا شالا (المقر الرئيسي)',
        accreditation: 'NABH Certified • Established 1902 • Green Leaf Certified',
        typeEn: 'World Benchmark of Authentic Classical Ayurveda',
        typeAr: 'المرجع العالمي الأول لطب الأيورفيدا الكلاسيكي الأصيل',
        overviewEn: 'The 120-year-old historic charitable institution founded by Vaidyaratnam P.S. Varier. Renowned worldwide for treating complex chronic disorders.',
        overviewAr: 'المؤسسة التاريخية العريقة التي أسسها الحكيم بي إس فارير عام 1902، وتعد المرجع الأسمى للشفاء الطبيعي في العالم.',
        specialitiesEn: ['Spine Disc & Sciatica Care', 'Stroke & Paralysis Rehabilitation', 'Arthritis & Rheumatism', 'Panchakarma Detox'],
        specialitiesAr: ['علاج الديسك والانزلاق الغضروفي', 'تأهيل الشلل والجلطات الدماغية', 'الروماتيزم والتهاب المفاصل', 'تنظيف السموم بالبانشاكارما'],
      },
      {
        nameEn: 'AVS Ayurvedic Hospital & Research Centre (AH&RC)',
        nameAr: 'مستشفى وأبحاث الأيورفيدا التابع لآريا فايديا شالا',
        accreditation: 'NABH Accredited Inpatient Facility',
        typeEn: 'Specialized Clinical Ayurvedic Inpatient Hospital',
        typeAr: 'مستشفى سريري متخصص للمرضى المنومين',
        overviewEn: 'Features inpatient executive suites, specialized therapy rooms, organic herbal preparation units, and senior consultant physician rounds.',
        overviewAr: 'يضم أجنحة تنويم للمرضى، وغرف علاج متطورة، ومطابخ للأغذية العشبية، مع جولات يومية لكبار الأطباء الاستشاريين.',
        specialitiesEn: ['Chronic Disease Management', 'Neurological Disorders', 'Autoimmune Conditions', 'Psoriasis & Skin Care'],
        specialitiesAr: ['علاج الأمراض المزمنة المستعصية', 'الاعتلالات العصبية', 'أمراض المناعة الذاتية', 'الصدفية والأمراض الجلدية'],
      },
      {
        nameEn: 'Aster MIMS Kottakkal',
        nameAr: 'مستشفى أستر ميمز كوتاكال (الدعم الطبي الحديث)',
        accreditation: 'NABH Accredited Multi-Specialty Hospital',
        typeEn: 'Modern Tertiary Allopathic Medical Center',
        typeAr: 'مستشفى طب حديث وجراحة تخصصية مجاور',
        overviewEn: 'Located just 5 minutes from Arya Vaidya Sala, Aster MIMS Kottakkal provides immediate modern diagnostics (MRI, CT, lab tests) and emergency multi-specialty care.',
        overviewAr: 'يقع على بعد 5 دقائق فقط من آريا فايديا شالا، ويوفر فحوصات الأشعة المقطعية والرنين المغناطيسي والمختبرات والدعم الطبي الحديث.',
        specialitiesEn: ['Radiology & 1.5T MRI Scans', 'Emergency Medicine & ICU', 'Internal Medicine & Cardiology', 'General Surgery'],
        specialitiesAr: ['الأشعة والرنين المغناطيسي', 'الطوارئ والعناية المركزة', 'الباطنية وأمراض القلب', 'الجراحة العامة'],
      },
    ],
    accommodations: [
      {
        titleEn: 'Private Serviced Family Villas Near AVS',
        titleAr: 'فلل عائلية خاصة ومفروشة بالقرب من آريا فايديا شالا',
        descEn: 'Spacious independent villas with private kitchens, washing machines, green courtyards, and air-conditioned bedrooms tailored for GCC families.',
        descAr: 'فلل مستقلة وواسعة مجهزة بمطابخ خاصة، وحدائق خضراء، ومكيفة بالكامل لتأمين أقصى درجات الخصوصية والراحة للعائلات الخليجية.',
      },
      {
        titleEn: 'Wheelchair-Friendly Serviced Apartments (Changuvetty)',
        titleAr: 'شقق فندقية مجهزة للكراسي المتحركة (شانغوفيتي، كوتاكال)',
        descEn: 'Modern apartments with elevator access, wide bathroom doors, and grab bars, located 5 minutes from the therapy center.',
        descAr: 'شقق حديثة مزودة بمصاعد، وأبواب وممرات مهيأة للكراسي المتحركة لكبار السن ومرضى الجلطات والديسك.',
      },
      {
        titleEn: 'Ayurvedic Eco-Resorts & Convalescence Cottages',
        titleAr: 'منتجعات بيئية وأكواخ استشفائية وسط الطبيعة',
        descEn: 'Surrounded by herbal gardens and organic plantations, providing quiet therapeutic surroundings and prescribed Ayurvedic sattvic dining.',
        descAr: 'أكواخ هادئة محاطة بمزارع الأعشاب الطبيعية توفر وجبات غذائية صحية موصوفة طبياً وبيئة مثالية لتجديد النشاط.',
      },
    ],
    faqs: [
      {
        qEn: 'What if inpatient (IP) rooms at Kottakkal Arya Vaidya Sala are fully booked?',
        qAr: 'ماذا أفعل إذا كانت غرف التنويم في مستشفى كوتاكال محجوزة بالكامل؟',
        aEn: 'This is the most common situation for international visitors. TreatInKerala organizes an Outpatient (OP) daily treatment plan: you consult with chief AVS physicians and complete your prescribed 2-to-3-hour daily treatments at the hospital, while staying comfortably in private serviced accommodation arranged by our team nearby. You receive the exact same authentic therapies and medicines without waiting 3–5 months.',
        aAr: 'هذا هو التحدي الأكبر لمعظم المرضى. يقوم فريقنا بحل هذه المشكلة من خلال ترتيب باقة العيادات الخارجية (OP)؛ حيث تقابل كبار أطباء كوتاكال وتتلقى جلسات العلاج اليومية بالمستشفى، بينما تقيم في فيلا أو شقة فندقية خاصة ومريحة بجوار المركز دون الحاجة لانتظار أشهر طويلة.',
      },
      {
        qEn: 'Can TreatInKerala ship authentic Kottakkal medicines to Saudi Arabia, UAE, or Oman?',
        qAr: 'هل يمكنكم شحن أدوية كوتاكال الأصلية إلى السعودية والإمارات وعمان وباقي الدول؟',
        aEn: 'Yes. We purchase your prescribed herbal oils, Kashayams, and pills directly from the official factory dispensary in Kottakkal, pack them securely for international air shipping, and dispatch them via DHL/FedEx directly to your home address across the GCC, UK, USA, or Europe.',
        aAr: 'نعم بالتأكيد. نشتري أدويتك وزيوتك العلاجية الأصلية مباشرة من صيدلية مصنع كوتاكال الرسمية ونشحنها جواً عبر شركات الشحن السريع المعتمدة حتى باب منزلك في دول الخليج أو أوروبا وأمريكا.',
      },
      {
        qEn: 'Is Halal food available in Kottakkal for Gulf families?',
        qAr: 'هل يتوفر الطعام الحلال في كوتاكال للعائلات الخليجية؟',
        aEn: 'Yes, 100%. Malappuram district has a rich Islamic cultural heritage, and all meat and food in Kottakkal is certified Halal. Furthermore, the private serviced villas arranged by TreatInKerala feature private kitchens where your family can cook personal meals, or we can coordinate custom Halal Arabic catering.',
        aAr: 'نعم 100%. تتميز محافظة مالابورام بطابعها وتراثها الإسلامي العريق، وكافة اللحوم والأطعمة حلال معتمدة تماماً. كما توفر الفلل والشقق التي نرتبها مطابخ خاصة متكاملة تمكنك من طهي وجباتك المفضلة براحة تامة.',
      },
    ],
  },
};

export function getRegionalHub(slug: string): RegionalHubData | undefined {
  return REGIONAL_HUBS[slug.toLowerCase()];
}

export function getAllRegionalHubSlugs(): string[] {
  return Object.keys(REGIONAL_HUBS);
}

export function getAllRegionalHubs(): RegionalHubData[] {
  return Object.values(REGIONAL_HUBS);
}
