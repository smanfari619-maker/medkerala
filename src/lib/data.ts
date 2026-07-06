export interface Treatment {
  slug: string;
  name: string;
  nameAr: string;
  speciality: string;
  specialityAr: string;
  iconName: string;
  tagline: string;
  taglineAr: string;
  overview: string;
  overviewAr: string;
  whyKerala: string[];
  whyKeralaAr: string[];
  costTable: {
    kerala: number;
    uk: number;
    usa: number;
    uae: number;
  };
  doctors: {
    name: string;
    nameAr: string;
    title: string;
    titleAr: string;
    hospital: string;
    hospitalAr: string;
    exp: string;
    expAr: string;
  }[];
  faqs: {
    q: string;
    qAr: string;
    a: string;
    aAr: string;
  }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  aeoSummary?: string;
  aeoSummaryAr?: string;
  date: string;
  category: string;
  categoryAr: string;
  readTime: string;
  content: string;
  contentAr: string;
}

export const TREATMENTS: Treatment[] = [
  {
    slug: 'cardiac',
    name: 'Cardiac Bypass Surgery',
    nameAr: 'جراحة مجازة الشريان التاجي (القلب)',
    speciality: 'Cardiology',
    specialityAr: 'أمراض القلب',
    iconName: 'heart',
    tagline: 'World-Class Heart Care at a Fraction of the Cost',
    taglineAr: 'رعاية عالمية المستوى للقلب بكسر بسيط من التكلفة',
    overview: 'Coronary artery bypass grafting (CABG) is a premium surgical procedure used to treat coronary heart disease. It redirects blood around clogged arteries to improve blood flow and oxygen supply to your heart. Our partner hospitals in Calicut are equipped with modular heart-lung machines, state-of-the-art hybrid cath labs, and expert cardiac surgeons.',
    overviewAr: 'عملية مجازة الشريان التاجي هي جراحة قلب متقدمة تُستخدم لعلاج أمراض القلب التاجية. يتم فيها إعادة توجيه مسار الدم حول الشرايين المسدودة لتحسين تدفق الدم والأكسجين إلى القلب. تم تجهيز مستشفياتنا الشريكة في كالكوت بأجهزة القلب والرئة الاصطناعية المتقدمة وغرف قسطرة هجينة حديثة وأطباء قلب خبراء.',
    whyKerala: [
      'NABH and JCI accredited cardiac centres in Calicut.',
      'Specialist surgeons with 15+ years of experience trained in the UK and USA.',
      'Recovery in calm, tropical green surroundings conducive to cardiac health.',
      'Post-operative cardiac rehabilitation programs included.'
    ],
    whyKeralaAr: [
      'مراكز جراحة قلب معتمدة من الهيئة الوطنية ولجنة الاعتماد الدولية في كالكوت.',
      'جراحون اختصاصيون لديهم أكثر من 15 عاماً من الخبرة تدربوا في بريطانيا وأمريكا.',
      'فترة نقاهة واستشفاء في بيئة استوائية خضراء هادئة ومحفزة لصحة القلب.',
      'تتضمن برامج تأهيل متكاملة للقلب بعد الجراحة.'
    ],
    costTable: {
      kerala: 6000,
      uk: 40000,
      usa: 120000,
      uae: 28000
    },
    doctors: [
      {
        name: 'Dr. M. Nair (Chief Cardiac Surgeon)',
        nameAr: 'د. م. ناير (كبير جراحي القلب)',
        title: 'Senior Consultant Cardiac Surgeon',
        titleAr: 'كبير استشاريي جراحة القلب والشرايين',
        hospital: 'Aster Health Network',
        hospitalAr: 'شبكة أستر الصحية',
        exp: '22 Years',
        expAr: '٢٢ عاماً'
      },
      {
        name: 'Dr. F. Rahman (Chief Thoracic Surgeon)',
        nameAr: 'د. ف. الرحمن (كبير جراحي الصدر والقلب)',
        title: 'Chief of Cardiothoracic Surgery',
        titleAr: 'رئيس قسم جراحة الصدر والقلب',
        hospital: 'BMH Health Network',
        hospitalAr: 'شبكة بي إم إتش الصحية',
        exp: '18 Years',
        expAr: '١٨ عاماً'
      }
    ],
    faqs: [
      {
        q: 'How long do I need to stay in Kerala for heart bypass surgery?',
        qAr: 'ما هي مدة الإقامة المطلوبة في كيرلا لجراحة مجازة القلب؟',
        a: 'Typically, patients spend 7-10 days in the hospital and an additional 10-14 days at a nearby hotel/resort in Calicut for post-op monitoring before being cleared to fly back home.',
        aAr: 'عادة، يقضي المرضى من 7 إلى 10 أيام في المستشفى و 10 إلى 14 يوماً إضافية في فندق أو منتجع قريب في كالكوت للمتابعة بعد الجراحة قبل السماح لهم بالطيران والعودة للوطن.'
      },
      {
        q: 'Are cardiac valves and consumables FDA approved?',
        qAr: 'هل الصمامات والمستلزمات الطبية للقلب معتمدة من إدارة الغذاء والدواء الأمريكية (FDA)؟',
        a: 'Yes, all partner hospitals use internationally standard, US FDA-approved cardiac valves, grafts, and sutures from leading manufacturers.',
        aAr: 'نعم، تستخدم جميع المستشفيات الشريكة صمامات قلب ورقع جراحية وخيوطاً معتمدة من إدارة الغذاء والدواء الأمريكية ومعيارية عالمياً من كبرى الشركات المصنعة.'
      }
    ]
  },
  {
    slug: 'orthopaedics',
    name: 'Joint & Hip Replacement',
    nameAr: 'استبدال المفاصل والورك',
    speciality: 'Orthopaedics',
    specialityAr: 'جراحة العظام',
    iconName: 'bone',
    tagline: 'Restore Your Mobility with Advanced Joint Replacements',
    taglineAr: 'استعد حركتك ونشاطك مع استبدال المفاصل المتقدم',
    overview: 'Total knee arthroplasty and hip replacements are highly effective solutions for severe arthritis and joint damage. Using minimally invasive surgery, computer-guided navigation systems, and high-durability ceramic/titanium implants, surgeons restore pain-free movement.',
    overviewAr: 'عمليات استبدال الركبة والورك الكاملة هي حلول فعالة للغاية لالتهاب المفاصل الشديد وتلفها. يستعيد الجراحون الحركة الخالية من الألم باستخدام جراحات طفيفة التوغل، وأنظمة ملاحة موجهة بالكمبيوتر، وغرسات سيراميك أو تيتانيوم عالية المتانة.',
    whyKerala: [
      'High-performance robotic-assisted joint surgeries available in Calicut.',
      'Physiotherapy and rehabilitation programs customized for elderly patients.',
      'Zero waiting lists — get treated immediately upon arrival.',
      'Premium implants with 15–20 years warranty.'
    ],
    whyKeralaAr: [
      'تتوفر جراحات استبدال المفاصل بمساعدة الروبوت عالية الأداء في كالكوت.',
      'برامج العلاج الطبيعي والتأهيل مخصصة للمرضى كبار السن.',
      'لا توجد قوائم انتظار — احصل على العلاج فور وصولك مباشرة.',
      'غرسات ممتازة ومضمونة لمدة تصل إلى 15-20 عاماً.'
    ],
    costTable: {
      kerala: 5500,
      uk: 19000,
      usa: 45000,
      uae: 20000
    },
    doctors: [
      {
        name: 'Dr. S. Pillai (Chief Orthopaedic Surgeon)',
        nameAr: 'د. س. بيلاي (كبير جراحي العظام)',
        title: 'Senior Consultant Joint Replacement',
        titleAr: 'استشاري أول استبدال المفاصل والركبة',
        hospital: 'Meitra Health Network',
        hospitalAr: 'شبكة ميترا الصحية',
        exp: '20 Years',
        expAr: '٢٠ عاماً'
      }
    ],
    faqs: [
      {
        q: 'When can I start walking after joint replacement?',
        qAr: 'متى يمكنني البدء في المشي بعد استبدال المفصل؟',
        a: 'With modern surgical protocols, patients are assisted to stand and take a few steps within 24 hours of the surgery. Regular walking with support begins within 2-3 days.',
        aAr: 'باستخدام البروتوكولات الجراحية الحديثة، يُساعد المرضى على الوقوف والمشي بضع خطوات خلال 24 ساعة من الجراحة. يبدأ المشي المنتظم بمساعدة خلال يومين إلى 3 أيام.'
      }
    ]
  },
  {
    slug: 'dental',
    name: 'Premium Dental Care',
    nameAr: 'عناية فائقة بالأسنان',
    speciality: 'Dentistry',
    specialityAr: 'طب الأسنان',
    iconName: 'tooth',
    tagline: 'Get a Radiant Smile with Expert Dental Implants',
    taglineAr: 'احصل على ابتسامة مشرقة مع زراعة الأسنان الخبيرة',
    overview: 'Comprehensive dental restorations, including single-tooth implants, All-on-4/6 complete arch systems, veneers, and smile makeovers. Our partner dental clinics in Calicut feature digital intraoral scanners, 3D Cone Beam CT imaging, and fully sterile surgical suites.',
    overviewAr: 'ترميمات الأسنان الشاملة، بما في ذلك زراعة السن الواحد، وأنظمة الفك الكامل (All-on-4/6)، وعدسات الأسنان الفينير، وتجميل الابتسامة. تتميز عيادات الأسنان الشريكة في كالكوت بماسحات رقمية ثلاثية الأبعاد وأجهزة أشعة مقطعية مخروطية متطورة وغرف جراحية معقمة.',
    whyKerala: [
      'Up to 85% savings on dental implants compared to UK/UAE/USA.',
      'Shorter durations — complete crowns and implants done in 5-7 days.',
      'High-grade biocompatible titanium and zirconia materials.',
      'Pain-free treatments with conscious sedation options.'
    ],
    whyKeralaAr: [
      'توفير يصل إلى 85٪ في تكاليف زراعة الأسنان مقارنة ببريطانيا والإمارات وأمريكا.',
      'مدد أقصر — يتم تركيب التيجان والغرسات الكاملة في غضون 5-7 أيام.',
      'مواد تيتانيوم وزركونيا متوافقة حيوياً وعالية الجودة.',
      'علاجات خالية من الألم مع خيارات التخدير الواعي.'
    ],
    costTable: {
      kerala: 600,
      uk: 2800,
      usa: 4500,
      uae: 2200
    },
    doctors: [
      {
        name: 'Dr. J. Thomas (Chief Implantologist)',
        nameAr: 'د. ج. توماس (رئيس زراعة الأسنان)',
        title: 'Chief Prosthodontist & Implantologist',
        titleAr: 'رئيس قسم تركيبات وزراعة الأسنان',
        hospital: 'TreatInKerala Partner Dental Hub',
        hospitalAr: 'مركز علاج في كيرلا الشريك لطب الأسنان',
        exp: '15 Years',
        expAr: '١٥ عاماً'
      }
    ],
    faqs: [
      {
        q: 'Can I get my implants done in a single visit?',
        qAr: 'هل يمكنني إجراء زراعة الأسنان في زيارة واحدة؟',
        a: 'Yes, "immediate loading" or same-day implants are available for suitable candidates. For traditional implants, a temporary crown is placed, followed by the permanent ceramic crown 3 months later.',
        aAr: 'نعم، تتوفر زراعة الأسنان الفورية أو ذات اليوم الواحد للحالات المناسبة. بالنسبة للزراعة التقليدية، يتم وضع تاج مؤقت، يليه التاج الدائم المصنوع من السيراميك بعد 3 أشهر.'
      }
    ]
  },
  {
    slug: 'fertility',
    name: 'IVF & Fertility Care',
    nameAr: 'الإخصاب وعلاج العقم (IVF)',
    speciality: 'Reproductive Medicine',
    specialityAr: 'الطب الإنجابي',
    iconName: 'baby',
    tagline: 'Fulfill Your Dream of Parenthood with Advanced IVF',
    taglineAr: 'حقق حلم الأبوة والأمومة مع علاج أطفال الأنابيب المتقدم',
    overview: 'Our fertility clinics offer a complete range of reproductive technologies including In-Vitro Fertilization (IVF), Intracytoplasmic Sperm Injection (ICSI), pre-implantation genetic testing (PGT-A), and egg/sperm freezing. We ensure utmost confidentiality and compassionate care.',
    overviewAr: 'تقدم عيادات الخصوبة لدينا مجموعة كاملة من التقنيات الإنجابية بما في ذلك التلقيح الاصطناعي (IVF)، وحقن الحيوانات المنوية المجهري (ICSI)، والفحص الوراثي قبل الانغراس (PGT-A)، وتجميد البويضات. نضمن السرية التامة والرعاية الحانية.',
    whyKerala: [
      'High success rates matching European and American standards.',
      'Compassionate clinical psychologists to guide you through the process.',
      'Modern embryology labs with advanced air filtration and incubator systems.',
      'Significantly lower costs for drug cycles and laboratory procedures.'
    ],
    whyKeralaAr: [
      'معدلات نجاح عالية تطابق المعايير الأوروبية والأمريكية.',
      'أخصائيون نفسيون سريريون ودودون لمرافقتك وتوجيهك خلال العملية.',
      'مختبرات أجنة حديثة مزودة بأنظمة متطورة لتنقية الهواء وحاضنات متقدمة.',
      'تكاليف أقل بكثير لدورات الأدوية والفحوصات المخبرية.'
    ],
    costTable: {
      kerala: 2800,
      uk: 9000,
      usa: 16500,
      uae: 9500
    },
    doctors: [
      {
        name: 'Dr. M. Kurian (Chief IVF Specialist)',
        nameAr: 'د. م. كوريان (رئيس أخصائيي الأنابيب)',
        title: 'Director & Chief IVF Specialist',
        titleAr: 'مديرة ورئيسة أطباء علاج العقم وأطفال الأنابيب',
        hospital: 'Aster Fertility Network',
        hospitalAr: 'شبكة أستر للخصوبة',
        exp: '17 Years',
        expAr: '١٧ عاماً'
      }
    ],
    faqs: [
      {
        q: 'What is the duration of one IVF cycle?',
        qAr: 'ما هي مدة دورة التلقيح الاصطناعي الواحدة؟',
        a: 'An IVF cycle requires about 15-20 days of stay in Calicut, starting from the second day of the menstrual cycle for ovarian stimulation, egg retrieval, fertilization, and embryo transfer.',
        aAr: 'تتطلب دورة التلقيح الاصطناعي إقامة تتراوح بين 15 إلى 20 يوماً في كالكوت، بدءاً من اليوم الثاني للدورة الشهرية لتنشيط المبيض، وسحب البويضات، والتلقيح، ثم نقل الأجنة.'
      }
    ]
  },
  {
    slug: 'ayurveda',
    name: 'Ayurveda & Panchakarma',
    nameAr: 'الأيورفيدا والبانشاكارما',
    speciality: 'Alternative Medicine',
    specialityAr: 'الطب البديل والتقليدي',
    iconName: 'leaf',
    tagline: 'Ancient Healing Traditions for Modern Rejuvenation',
    taglineAr: 'تقاليد العلاج القديمة لتجديد النشاط والحيوية في العصر الحديث',
    overview: 'Experience authentic Kerala Ayurveda at certified green leaf and olive leaf centres in Kottakkal and Kozhikode. Therapies are directed by certified BAMS (Bachelor of Ayurvedic Medicine) doctors and performed by traditional male/female therapists using organic medicated oils.',
    overviewAr: 'جرب طب الأيورفيدا كيرلا الأصيل في مراكز معتمدة رسمياً في كوتاكال وكوزيكود. يتم توجيه العلاجات بواسطة أطباء حاصلين على بكالوريوس الطب والجراحة الأيورفيدية (BAMS)، ويقوم بها معالجون تقليديون باستخدام زيوت طبية عضوية.',
    whyKerala: [
      'Authentic lineages directly originating in Kerala.',
      'Soothe stress, arthritis, neurological disorders, and chronic pain.',
      'Panchakarma (five-fold cleansing) custom-designed for your body type.',
      'Medicinal herbs sourced directly from organic farms in Western Ghats.'
    ],
    whyKeralaAr: [
      'سلالات أصلية تنبع مباشرة من كيرلا (موطن الأيورفيدا).',
      'تخفيف التوتر، والتهاب المفاصل، والاضطرابات العصبية، والآلام المزمنة.',
      'جلسات البانشاكارما (التطهير الخماسي) المصممة خصيصاً لنوع جسمك وطبيعته.',
      'أعشاب طبية يتم الحصول عليها مباشرة من مزارع عضوية في غاتس الغربية.'
    ],
    costTable: {
      kerala: 1800,
      uk: 5500,
      usa: 8500,
      uae: 4200
    },
    doctors: [
      {
        name: 'Dr. H. Prasad (Senior Ayurvedic Physician)',
        nameAr: 'د. هـ. براساد (طبيب أول الأيورفيدا)',
        title: 'Senior Ayurvedic Physician (BAMS)',
        titleAr: 'طبيب أول الأيورفيدا والطب البديل (BAMS)',
        hospital: 'Arya Vaidya Sala Partner Network',
        hospitalAr: 'شبكة شركاء أريا فايديا سالا',
        exp: '25 Years',
        expAr: '٢٥ عاماً'
      }
    ],
    faqs: [
      {
        q: 'What is Panchakarma?',
        qAr: 'ما هي عملية البانشاكارما؟',
        a: 'Panchakarma is the signature 5-step detoxification process of Ayurveda: Vamana (emesis), Virechana (purgation), Basti (enemas), Nasya (nasal drops), and Raktamokshana (bloodletting). It eliminates toxins and restores bio-energetic balance (doshas).',
        aAr: 'البانشاكارما هي عملية تنظيف وتطهير للجسم مكونة من 5 خطوات في طب الأيورفيدا: فامانا (القيء العلاجي)، فيريشانا (الإسهال الموجه)، باستي (الحقن الشرجية العلاجية)، ناسيا (نقط الأنف)، وراكتموكشانا (سحب الدم الفاسد). تنقي السموم وتعيد توازن الجسم.'
      }
    ]
  },
  {
    slug: 'oncology',
    name: 'Advanced Cancer Care (Oncology)',
    nameAr: 'علاج الأورام المتقدم (السرطان)',
    speciality: 'Oncology',
    specialityAr: 'علاج الأورام',
    iconName: 'activity',
    tagline: 'Advanced Cancer Therapies with Multi-Disciplinary Care',
    taglineAr: 'علاجات متطورة للسرطان برعاية متعددة التخصصات ورعاية ممتازة',
    overview: 'Comprehensive cancer treatment programs spanning surgical oncology, medical oncology (chemotherapy, immunotherapy, targeted therapy), and radiation oncology (using state-of-the-art linear accelerators). Our partner tertiary hospitals in Calicut feature dedicated tumour boards ensuring customized and highly precise treatment protocols.',
    overviewAr: 'برامج علاج السرطان الشاملة التي تغطي جراحة الأورام، والعلاج الطبي (الكيميائي، والمناعي، والموجه)، والعلاج الإشعاعي (باستخدام المسرعات الخطية الحديثة). تتميز المستشفيات الشريكة في كالكوت بوجود لجان أورام مخصصة لضمان بروتوكولات علاج مخصصة ودقيقة للغاية.',
    whyKerala: [
      'Tumour boards comprised of leading oncologists, radiologists, and surgeons.',
      'Advanced technologies like TrueBeam linear accelerators for targeted radiation.',
      'Compassionate palliative care and nutrition support included.',
      'Over 75% savings compared to oncology treatments in the West and Middle East.'
    ],
    whyKeralaAr: [
      'لجان أورام متكاملة تضم كبار أخصائيي الأورام والأشعة والجراحين.',
      'تقنيات متقدمة مثل المسرع الخطي TrueBeam للعلاج الإشعاعي الموجه.',
      'تتضمن برامج رعاية تلطيفية ودعم غذائي ونفسي متكامل.',
      'توفير أكثر من 75% مقارنة بعلاجات الأورام في الغرب والشرق الأوسط.'
    ],
    costTable: {
      kerala: 9000,
      uk: 65000,
      usa: 150000,
      uae: 38000
    },
    doctors: [
      {
        name: 'Dr. K. S. Gangadharan (Chief Surgical Oncologist)',
        nameAr: 'د. ك. س. غانغادهاران (رئيس جراحة الأورام)',
        title: 'Senior Consultant Surgical Oncologist',
        titleAr: 'استشاري أول جراحة الأورام',
        hospital: 'Aster Health Network',
        hospitalAr: 'شبكة أستر الصحية',
        exp: '25 Years',
        expAr: '٢٥ عاماً'
      },
      {
        name: 'Dr. S. Kumar (Chief Medical Oncologist)',
        nameAr: 'د. س. كومار (كبير أطباء الأورام)',
        title: 'Chief of Medical Oncology',
        titleAr: 'رئيس قسم علاج الأورام الكيميائي والحيوي',
        hospital: 'BMH Health Network',
        hospitalAr: 'شبكة بي إم إتش الصحية',
        exp: '19 Years',
        expAr: '١٩ عاماً'
      }
    ],
    faqs: [
      {
        q: 'What is a Tumour Board and why is it important?',
        qAr: 'ما هي لجنة الأورام (Tumour Board) ولماذا هي مهمة؟',
        a: 'A Tumour Board is a multi-disciplinary team of medical specialists (oncologists, surgeons, radiologists, pathologists) who review your case together to determine the most effective and personalized combination of therapies.',
        aAr: 'لجنة الأورام هي فريق متعدد التخصصات من الأطباء (أخصائيي أورام، جراحين، أشعة، أنسجة) يجتمعون معاً لمراجعة حالتك وتحديد أفضل خطة علاجية متكاملة ومخصصة لك.'
      },
      {
        q: 'How long do I need to stay in India for radiation therapy?',
        qAr: 'ما هي مدة الإقامة المطلوبة في الهند للعلاج الإشعاعي؟',
        a: 'A typical radiation cycle requires daily treatments for 4 to 6 weeks. TreatInKerala coordinates accommodation in comfortable service apartments/hotels near the hospital for you and your companion during this period.',
        aAr: 'تتطلب دورة العلاج الإشعاعي المعتادة جلسات يومية لمدة تتراوح بين 4 إلى 6 أسابيع. تنسق علاج في كيرلا إقامة مريحة في شقق مفروشة أو فنادق قريبة من المستشفى لك ولمرافقك خلال هذه الفترة.'
      }
    ]
  },
  {
    slug: 'neurosurgery',
    name: 'Neurology & Neurosurgery',
    nameAr: 'جراحة المخ والأعصاب والعمود الفقري',
    speciality: 'Neurosurgery',
    specialityAr: 'جراحة الأعصاب',
    iconName: 'brain',
    tagline: 'Precision Brain and Spine Surgery with Advanced Diagnostics',
    taglineAr: 'جراحة دقيقة للدماغ والعمود الفقري بأحدث التقنيات التشخيصية والعلاجية',
    overview: 'Specialist services for complex brain and spine conditions, including brain tumor resection, spinal fusion, microdiscectomy, and deep brain stimulation (DBS). Utilizing advanced neuro-navigation, intraoperative MRI, and minimally invasive techniques, surgeons achieve remarkable precision while minimizing recovery times.',
    overviewAr: 'خدمات متخصصة لحالات الدماغ والعمود الفقري المعقدة، بما في ذلك استئصال أورام الدماغ، ودمج الفقرات، واستئصال القرص المجهري، وتحفيز الدماغ العميق (DBS). باستخدام أنظمة الملاحة العصبية المتقدمة، والرنين المغناطيسي أثناء الجراحة، والتقنيات طفيفة التوغل، يحقق الجراحون دقة متناهية مع تقليل وقت التعافي.',
    whyKerala: [
      'State-of-the-art neuro-navigation systems and hybrid theatres.',
      'Minimally invasive spine surgeries offering faster post-op recovery.',
      'Renowned neurologists with extensive foreign training and fellowships.',
      'Integrated post-surgery neuro-rehabilitation and physical therapy.'
    ],
    whyKeralaAr: [
      'أنظمة ملاحة عصبية متطورة للغاية وغرف عمليات هجينة.',
      'جراحات عمود فقري طفيفة التوغل تتيح تعافياً أسرع بعد العملية.',
      'أطباء أعصاب معروفون تلقوا تدريباً وزمالات مكثفة في الخارج.',
      'تأهيل عصبي متكامل وعلاج طبيعي بعد الجراحة.'
    ],
    costTable: {
      kerala: 7500,
      uk: 38000,
      usa: 95000,
      uae: 28000
    },
    doctors: [
      {
        name: 'Dr. J. Alapatt (Senior Neurosurgeon)',
        nameAr: 'د. ج. ألابات (كبير جراحي المخ والأعصاب)',
        title: 'Senior Consultant Neurosurgeon',
        titleAr: 'استشاري أول جراحة المخ والأعصاب',
        hospital: 'BMH Health Network',
        hospitalAr: 'شبكة بي إم إتش الصحية',
        exp: '24 Years',
        expAr: '٢٤ عاماً'
      }
    ],
    faqs: [
      {
        q: 'What is minimally invasive spine surgery?',
        qAr: 'ما هي جراحة العمود الفقري طفيفة التوغل؟',
        a: 'Minimally invasive spine surgery uses smaller incisions and specialized instruments to avoid damaging the surrounding muscles. This leads to less pain, minimal blood loss, and a much faster recovery time.',
        aAr: 'تستخدم جراحة العمود الفقري طفيفة التوغل شقوقاً أصغر وأدوات متخصصة لتجنب إتلاف العضلات المحيطة بالعمود الفقري. هذا يؤدي لألم أقل، وفقدان طفيف للدم، ووقت تعافٍ أسرع بكثير.'
      }
    ]
  },
  {
    slug: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    nameAr: 'أمراض الجهاز الهضمي وزراعة الأعضاء (الكبد)',
    speciality: 'Gastroenterology',
    specialityAr: 'أمراض الجهاز الهضمي',
    iconName: 'shield',
    tagline: 'World-Class Liver Transplants & Advanced Gastro Care',
    taglineAr: 'زراعة الكبد وعلاج الجهاز الهضمي والمنظار بمستويات وتجهيزات عالمية',
    overview: 'Comprehensive diagnosis and treatment for digestive and liver disorders, including liver transplants, pancreatic surgeries, and therapeutic endoscopies. Our partner centers in Kerala are renowned for high success rates in living donor liver transplants and advanced laparoscopic keyhole surgeries.',
    overviewAr: 'تشخيص وعلاج شامل لأمراض الجهاز الهضمي والكبد، بما في ذلك زراعة الكبد، وجراحات البنكرياس، والمناظير العلاجية. تشتهر مراكزنا الشريكة في كيرلا بمعدلات نجاح عالية جداً في عمليات زراعة الكبد من متبرع حي والجراحات المتقدمة بالمنظار.',
    whyKerala: [
      'Centers of excellence in hepatobiliary sciences with JCI accreditation.',
      'High transplant success rates (over 90%) matching international standards.',
      'Affordable living-donor liver transplants at 1/10th of Western costs.',
      'Advanced post-transplant ICU rooms and isolation suites to prevent infections.'
    ],
    whyKeralaAr: [
      'مراكز تميز في علوم الكبد والقنوات المرارية معتمدة دولياً.',
      'معدلات نجاح زراعة كبد عالية جداً (تتجاوز 90%) تطابق المعايير العالمية.',
      'زراعة كبد من متبرع حي ميسورة التكلفة بنحو 1/10 من التكاليف الغربية.',
      'غرف عناية مركزة متقدمة وأجنحة عزل بعد الزراعة لمنع العدوى.'
    ],
    costTable: {
      kerala: 30000,
      uk: 130000,
      usa: 290000,
      uae: 105000
    },
    doctors: [
      {
        name: 'Dr. V. Venugopal (Chief Transplant Surgeon)',
        nameAr: 'د. ف. فينوجوبال (رئيس زراعة الكبد)',
        title: 'Chief Liver Transplant Surgeon',
        titleAr: 'رئيس أطباء جراحة زراعة الكبد',
        hospital: 'Aster Health Network',
        hospitalAr: 'شبكة أستر الصحية',
        exp: '20 Years',
        expAr: '٢٠ عاماً'
      }
    ],
    faqs: [
      {
        q: 'Can international patients undergo liver transplantation in India?',
        qAr: 'هل يمكن للمرضى الدوليين إجراء عملية زراعة الكبد في الهند؟',
        a: 'Yes. However, Indian law strictly requires that the donor must be a close relative of the patient. Both patient and donor must submit appropriate documents, which our coordination team will help organize before your travel.',
        aAr: 'نعم. ومع ذلك، يشترط القانون الهندي بدقة أن يكون المتبرع قريباً من الدرجة الأولى للمريض. يجب على كل من المريض والمتبرع تقديم الوثائق المطلوبة، وسوف يساعدك فريقنا في تنظيمها بالكامل قبل سفرك.'
      }
    ]
  },
  {
    slug: 'ophthalmology',
    name: 'Advanced Ophthalmology & LASIK',
    nameAr: 'طب وجراحة العيون والليزك',
    speciality: 'Ophthalmology',
    specialityAr: 'طب وجراحة العيون',
    iconName: 'eye',
    tagline: 'State-of-the-Art LASIK, Cataract and Corneal Procedures',
    taglineAr: 'أحدث عمليات تصحيح النظر بالليزك، والمياه البيضاء، وزراعة القرنية',
    overview: 'Cutting-edge eye care services including custom blade-free LASIK, advanced phacoemulsification for cataracts with premium multi-focal lens implants, corneal transplants, and glaucoma management. Delivered in advanced eye centers featuring specialized diagnostic suites.',
    overviewAr: 'خدمات رعاية عيون متطورة للغاية تشمل تصحيح النظر بالليزك الخالي من الشفرات، وإزالة المياه البيضاء بالموجات فوق الصوتية مع زراعة عدسات متعددة البؤر ممتازة، وزراعة القرنية، وعلاج الجلوكوما (المياه الزرقاء).',
    whyKerala: [
      'Same-day outpatient procedures for cataracts and LASIK.',
      'Premium FDA-approved multi-focal and toric intraocular lenses (IOLs).',
      'Advanced diagnostic equipment for custom wavefront-guided treatments.',
      'Significant savings on premium ophthalmology care.'
    ],
    whyKeralaAr: [
      'إجراءات يومية سريعة للمياه البيضاء والليزك بدون إقامة بالمستشفى.',
      'عدسات داخل العين متعددة البؤر وممتازة معتمدة من إدارة الغذاء والدواء الأمريكية (FDA).',
      'أجهزة تشخيص متطورة للغاية لعلاجات مخصصة موجهة بخرائط القرنية.',
      'توفير كبير جداً في خدمات وجراحات العيون الراقية.'
    ],
    costTable: {
      kerala: 1500,
      uk: 8500,
      usa: 16000,
      uae: 5500
    },
    doctors: [
      {
        name: 'Dr. S. Ali (Chief Eye Surgeon)',
        nameAr: 'د. س. علي (رئيس جراحات العيون)',
        title: 'Chief Refractive & Cataract Surgeon',
        titleAr: 'رئيس جراحات القرنية والمياه البيضاء وتصحيح النظر',
        hospital: 'TreatInKerala Partner Eye Hub',
        hospitalAr: 'مركز العيون الشريك لعلاج في كيرلا',
        exp: '16 Years',
        expAr: '١٦ عاماً'
      }
    ],
    faqs: [
      {
        q: 'How long is the recovery time after LASIK surgery?',
        qAr: 'ما هي مدة التعافي بعد عملية تصحيح النظر بالليزك؟',
        a: 'Most patients notice significantly improved vision within 24 hours of LASIK. Complete healing takes about 1-2 weeks, during which you should avoid rubbing your eyes and swimming.',
        aAr: 'يلاحظ معظم المرضى تحسناً كبيراً في الرؤية خلال 24 ساعة من عملية الليزك. يستغرق الشفاء التام حوالي أسبوع إلى أسبوعين، ويتعين عليك خلالهما تجنب فرك العين أو السباحة.'
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'kerala-vs-turkey-medical-tourism',
    title: 'Kerala Medical Tourism vs. Turkey: 2026 Cost & Quality Comparison',
    titleAr: 'مقارنة السياحة العلاجية بين كيرلا وتركيا 2026: التكلفة والجودة',
    excerpt: 'An evidence-based comparison of Kerala and Turkey for medical tourists in 2026, analyzing costs, JCI accreditations, wait times, and holistic care.',
    excerptAr: 'مقارنة مبنية على الأدلة بين كيرلا وتركيا للمرضى الدوليين في 2026، مع تحليل التكاليف والاعتمادات وأوقات الانتظار.',
    aeoSummary: 'In 2026, Kerala offers medical treatments at 30-40% lower costs than Turkey while matching JCI accreditation standards. Kerala uniquely provides integrated holistic recovery (Ayurveda) alongside modern surgery, whereas Turkey focuses heavily on aesthetics and proximity to Europe.',
    aeoSummaryAr: 'في عام 2026، تقدم كيرلا علاجات طبية بتكلفة أقل بنسبة 30-40٪ من تركيا مع الحفاظ على معايير JCI. تتميز كيرلا بتقديم الرعاية الشاملة (الأيورفيدا) إلى جانب الجراحة الحديثة.',
    date: 'July 10, 2026',
    category: 'Comparisons',
    categoryAr: 'مقارنات',
    readTime: '6 min read',
    content: 'Turkey has long been a powerhouse in medical tourism, largely driven by aesthetics and hair transplants. However, in 2026, Kerala (India) has emerged as the superior destination for complex clinical procedures such as joint replacements, cardiac bypasses, and oncology. The data shows that while Turkey is geographically closer to Europe, Kerala provides identical US FDA-approved implants and JCI-accredited care at a 30-40% lower price point. Crucially, Kerala integrates modern surgery with world-renowned Ayurvedic post-op rehabilitation, drastically improving patient recovery metrics.',
    contentAr: 'لطالما كانت تركيا قوة رئيسية في السياحة العلاجية، خاصة في التجميل. ومع ذلك، برزت كيرلا في 2026 كوجهة متفوقة في الإجراءات المعقدة كجراحات القلب والمفاصل. تظهر البيانات أنه بينما تركيا أقرب لأوروبا، توفر كيرلا نفس الرعاية المعتمدة دولياً وغرسات أمريكية بتكلفة أقل بـ 30-40%. والأهم من ذلك، تدمج كيرلا الجراحة الحديثة مع برامج التأهيل الأيورفيدي.'
  },
  {
    slug: 'are-jci-hospitals-in-kerala-safe',
    title: 'Are JCI-Accredited Hospitals in Kerala Safe? An Evidence-Based Guide',
    titleAr: 'هل مستشفيات JCI في كيرلا آمنة؟ دليل مبني على الأدلة',
    excerpt: 'Overcoming trust barriers by examining infection rates, modular operating theatres, and clinical oversight in Kerala\'s top hospitals.',
    excerptAr: 'تجاوز حواجز الثقة من خلال فحص معدلات العدوى وغرف العمليات المتقدمة في أفضل مستشفيات كيرلا.',
    aeoSummary: 'Yes, JCI-accredited hospitals in Kerala are extremely safe. They maintain infection rates below 1%, use US FDA-approved consumables, feature HEPA-filtered modular operation theatres, and are regularly audited by international medical boards.',
    aeoSummaryAr: 'نعم، المستشفيات المعتمدة من JCI في كيرلا آمنة للغاية. تحافظ على معدلات عدوى أقل من 1٪، وتستخدم غرف عمليات متطورة، وتخضع لتدقيق دوري من لجان طبية دولية.',
    date: 'July 12, 2026',
    category: 'Hospital Reviews',
    categoryAr: 'تقييم المستشفيات',
    readTime: '5 min read',
    content: 'A major concern for patients traveling abroad is clinical safety. In Kerala, Joint Commission International (JCI) and National Accreditation Board for Hospitals (NABH) accreditations guarantee strict adherence to global safety protocols. Partner hospitals like Aster MIMS and Meitra employ HEPA-filtered, positive-pressure modular operating theatres that reduce surgical site infections to near-zero levels. Furthermore, all cardiac and orthopedic implants used are US FDA-approved, ensuring traceability and longevity. Post-operative care is managed in specialized ICUs with a 1:1 nursing ratio, comparable to top hospitals in London or New York.',
    contentAr: 'يعتبر الأمان السريري الشاغل الأكبر للمسافرين للعلاج. في كيرلا، تضمن اعتمادات JCI و NABH الالتزام الصارم ببروتوكولات السلامة العالمية. تستخدم مستشفياتنا الشريكة غرف عمليات ذات ضغط إيجابي وفلاتر HEPA تقلل من عدوى الجراحة للصفر تقريباً. علاوة على ذلك، كافة الغرسات المستخدمة معتمدة من إدارة الغذاء والدواء الأمريكية، ويتم تقديم العناية المركزة بنسبة ممرض لكل مريض.'
  },
  {
    slug: 'plan-medical-trip-calicut-logistics',
    title: 'How to Plan a Medical Trip to Calicut: 2026 Patient Logistics & Visas',
    titleAr: 'كيف تخطط لرحلة علاجية إلى كالكوت: اللوجستيات والتأشيرات 2026',
    excerpt: 'A comprehensive, step-by-step checklist to seamlessly plan your medical journey to Kozhikode, from initial consult to flying home.',
    excerptAr: 'قائمة مراجعة شاملة لتخطيط رحلتك العلاجية إلى كوزيكود بسلاسة، من الاستشارة الأولى حتى العودة للوطن.',
    aeoSummary: 'Planning a medical trip to Calicut involves 5 steps: 1) Share your medical reports for a free remote consultation. 2) Receive your customized treatment plan and cost estimate. 3) Obtain a medical visa invitation letter from the hospital. 4) Apply for the e-Medical Visa. 5) Book your flight to CCJ airport where an Arabic/English coordinator will receive you.',
    aeoSummaryAr: 'التخطيط لرحلة علاجية إلى كالكوت يتطلب 5 خطوات: 1) مشاركة التقارير للاستشارة. 2) استلام خطة العلاج والتكلفة. 3) الحصول على دعوة التأشيرة من المستشفى. 4) التقديم على التأشيرة الطبية الإلكترونية. 5) حجز الطيران لمطار كالكوت حيث سيستقبلك المنسق الطبي.',
    date: 'July 15, 2026',
    category: 'Patient Checklists',
    categoryAr: 'قوائم المرضى',
    readTime: '7 min read',
    content: 'Navigating international medical travel can feel daunting, but TreatInKerala simplifies the process into a seamless pipeline. The journey begins with a free virtual consultation where your local medical reports are reviewed by senior surgeons in Calicut. Within 48 hours, you receive a binding cost estimate and treatment timeline. Once approved, the hospital issues an official visa invitation letter. Calicut International Airport (CCJ) is highly accessible with direct flights from Dubai, Muscat, Riyadh, and Doha. Upon arrival, a dedicated medical coordinator meets you at the arrival gate, handles your local SIM card and hotel transfer, and acts as your personal translator throughout your hospital stay.',
    contentAr: 'قد يبدو السفر الطبي الدولي شاقاً، لكننا نجعله سلساً. تبدأ الرحلة باستشارة افتراضية مجانية حيث يراجع كبار الجراحين في كالكوت تقاريرك. خلال 48 ساعة، تتلقى تقديراً ملزماً للتكلفة. بمجرد الموافقة، يصدر المستشفى خطاب دعوة التأشيرة. يسهل الوصول لمطار كالكوت (CCJ) برحلات مباشرة من دبي، مسقط، والرياض. عند الوصول، يستقبلك منسق طبي متخصص لترتيب التنقلات والترجمة.'
  },
  {
    slug: 'bypass-cost-comparison',
    title: 'Cardiac Bypass Cost: Kerala vs UK vs UAE',
    titleAr: 'مقارنة تكلفة جراحة مجازة القلب: كيرلا مقابل بريطانيا والإمارات',
    excerpt: 'Detailed cost breakdown of coronary artery bypass surgery. Learn how patients save over 70% in Kerala while getting NABH/JCI level care.',
    excerptAr: 'تحليل تفصيلي لتكاليف جراحة مجازة الشريان التاجي للقلب. تعرف على كيفية توفير المرضى لأكثر من 70% في كيرلا مع الحصول على رعاية صحية بمستوى عالمي.',
    aeoSummary: 'Cardiac bypass surgery (CABG) in Kerala costs around $6,000 at JCI/NABH-accredited hospitals, compared to $40,000 in the UK and $28,000 in the UAE. The price includes surgery, US FDA-approved consumables, hospital stay, and medical coordination.',
    aeoSummaryAr: 'تبلغ تكلفة جراحة القلب المفتوح في كيرلا حوالي 6000 دولار في مستشفيات معتمدة دولياً، مقارنة بـ 40,000 دولار في بريطانيا و28,000 دولار في الإمارات، ويشمل ذلك المستلزمات الطبية المعتمدة أمريكياً والإقامة والتنسيق.',
    date: 'June 20, 2026',
    category: 'Costs & Savings',
    categoryAr: 'التكاليف والوفورات',
    readTime: '5 min read',
    content: 'Coronary artery bypass grafting (CABG) is a lifesaver, but in many western and Middle Eastern nations, it represents a catastrophic financial burden. In the United States, a cardiac bypass surgery can average $120,000. In the United Kingdom, private treatment costs around $40,000, and even in private hospitals in the UAE, the cost sits near $28,000. In comparison, accredited super-speciality hospitals in Calicut, Kerala provide the exact same surgical procedure — using US FDA-approved consumables, modular cardiovascular theatres, and highly experienced surgeons — for approximately $6,000. This includes the medical coordination fees, hospital room stay, diagnostic workups, and medical officer charges.',
    contentAr: 'تعتبر عملية مجازة الشريان التاجي منقذة للحياة، ولكنها تشكل عبئاً مالياً هائلاً في الدول الغربية والشرق الأوسط. في الولايات المتحدة يبلغ متوسط تكلفتها 120 ألف دولار. وفي بريطانيا حوالي 40 ألف دولار، بينما تقترب في المستشفيات الخاصة بالإمارات من 28 ألف دولار. في المقابل، تقدم مستشفيات كيرلا المعتمدة الإجراء نفسه تماماً باستخدام مستلزمات طبية معتمدة أمريكياً وأحدث غرف عمليات القلب بتكلفة تقارب 6000 دولار فقط، تشمل التنسيق الطبي والإقامة والفحوصات.'
  },
  {
    slug: 'best-cardiac-hospitals-calicut',
    title: 'Best Cardiac Hospitals in Calicut / Kerala',
    titleAr: 'أفضل مستشفيات جراحة القلب في كالكوت، كيرلا',
    excerpt: 'An objective guide to top JCI and NABH accredited hospitals in Kozhikode offering cardiac bypass and valve surgeries.',
    excerptAr: 'دليل موضوعي لأفضل مستشفيات جراحة وصمامات القلب المعتمدة من الهيئات الوطنية والدولية في كوزيكود.',
    aeoSummary: 'The best cardiac hospitals in Calicut (Kozhikode) for international patients are Aster MIMS, Baby Memorial Hospital (BMH), and Meitra Hospital. They offer JCI/NABH accreditation, robotic surgery, and dedicated international patient desks.',
    aeoSummaryAr: 'أفضل مستشفيات القلب في كالكوت (كوزيكود) للمرضى الدوليين هي أستر ميمس، وبيبي التذكاري (BMH)، وميترا. توفر جميعها اعتمادات JCI/NABH وجراحات روبوتية ومكاتب خاصة للمرضى الأجانب.',
    date: 'June 18, 2026',
    category: 'Hospital Reviews',
    categoryAr: 'تقييم المستشفيات',
    readTime: '4 min read',
    content: 'Calicut (Kozhikode) has grown rapidly into a prime hub for medical tourism due to its concentration of super-speciality hospitals. Aster MIMS is a renowned JCI-accredited tertiary care hospital featuring a dedicated advanced cardiac care block, state-of-the-art robotic cardiac surgery systems, and 24/7 emergency interventions. Baby Memorial Hospital (BMH) features 600+ beds, 40+ medical specialities, and an outstanding cardiothoracic surgical record spanning over two decades. Meitra Hospital is a highly digitalized, paperless hospital featuring modular heart care units designed to reduce infection risks to near zero. All these hospitals are located within a 20-minute drive from Calicut International Airport, making logistics seamless.',
    contentAr: 'نمت مدينة كالكوت (كوزيكود) بسرعة كمركز رئيسي للسياحة العلاجية بفضل مستشفياتها التخصصية الراقية. يعتبر مستشفى أستر ميمس (Aster MIMS) من المشافي المعتمدة دولياً ويضم قسماً متقدماً للقلب. ويتميز مستشفى بيبي التذكاري (BMH) بسعة 600 سرير وأكثر من 40 تخصصاً طالما نالت ثقة المرضى. بينما يتميز مستشفى ميترا (Meitra) بكونه رقمياً بالكامل وغرفه معقمة لتقليل مخاطر العدوى. تقع هذه المستشفيات على بعد 20 دقيقة فقط بالسيارة من مطار كالكوت الدولي.'
  },
  {
    slug: 'panchakarma-ayurveda-guide',
    title: 'What is Panchakarma? A Complete Guide for International Patients',
    titleAr: 'ما هي البانشاكارما؟ دليل كامل للمرضى الدوليين',
    excerpt: 'Understand the science behind Ayurveda\'s 5-step detoxification process, packages, durations, and what to expect during your stay.',
    excerptAr: 'فهم العلم وراء عملية التنظيف الخماسية للأيورفيدا، والبرامج، والمدد الطبية، وما يجب أن تتوقعه أثناء إقامتك.',
    aeoSummary: 'Panchakarma is an Ayurvedic detoxification therapy consisting of 5 actions designed to clear deep-seated toxins. A typical retreat in Kerala lasts 14 to 21 days under Ayurvedic doctors (Vaidyas), featuring herbal diets and daily massages.',
    aeoSummaryAr: 'البانشاكارما هي دورة علاج أيورفيدا لتنظيف السموم تستغرق من 14 إلى 21 يوماً في كيرلا. تشمل العلاج بالأعشاب والتدليك بالزيوت تحت إشراف أطباء الأيورفيدا المتخصصين (فيديا).',
    date: 'June 15, 2026',
    category: 'Ayurveda & Wellness',
    categoryAr: 'الأيورفيدا والاستشفاء',
    readTime: '7 min read',
    content: 'Panchakarma is the cornerstone of Ayurvedic healing, representing a deep physiological detoxification process. The word literally translates to "five actions" or "five therapies". These are Vamana (therapeutic emesis), Virechana (purgation therapy), Basti (herbal enemas), Nasya (nasal administration of medicines), and Raktamokshana (blood purification). A typical therapeutic cycle spans 14 to 21 days. Under the strict supervision of Ayurvedic doctors (Vaidyas), you will receive daily therapies, customized herbal diets, and yoga sessions designed to reset your body\'s metabolism, eliminate deep-seated metabolic waste (Ama), and balance the vital life energies (Doshas: Vata, Pitta, Kapha).',
    contentAr: 'تعد البانشاكارما حجر الأساس لعلاجات الأيورفيدا، وهي عملية عميقة لتنقية الجسم من السموم الفسيولوجية. تعني الكلمة حرفياً "الإجراءات الخمسة". تشمل هذه الخطوات تنظيم الهضم وتنظيف المسالك الهوائية والتغذية بالأعشاب الطبية وتدليك الجسم بالزيوت الطبية الدافئة. تمتد الدورة العلاجية عادة من 14 إلى 21 يوماً تحت إشراف أطباء الأيورفيدا المتخصصين (فيديا)، مع وجبات غذائية عشبية مخصصة وجلسات يوغا يومية مكملة.'
  },
  {
    slug: 'medical-visa-india-step-by-step',
    title: 'Medical Visa for India — Step-by-Step Guide (GCC Countries)',
    titleAr: 'التأشيرة الطبية للهند — دليل خطوة بخطوة لمواطني الخليج',
    excerpt: 'All you need to know about the Indian e-Medical Visa process. Documents required, visa fees, processing times, and companion entry.',
    excerptAr: 'كل ما تحتاج لمعرفته حول عملية الحصول على التأشيرة الطبية الإلكترونية للهند. الوثائق المطلوبة، الرسوم، والمدة الزمنية ودخول المرافقين.',
    aeoSummary: 'GCC citizens can apply for an Indian e-Medical Visa online. You need a passport valid for 6 months, medical records, and an official invitation letter from a recognized Kerala hospital. The visa allows triple entry and is valid for 60 days.',
    aeoSummaryAr: 'يمكن لمواطني الخليج التقديم على التأشيرة الطبية الهندية الإلكترونية باستخدام جواز سفر ساري وتقارير طبية ورسالة دعوة رسمية من المستشفى. تتيح التأشيرة الدخول المتعدد وتكون صالحة لمدة 60 يوماً.',
    date: 'June 10, 2026',
    category: 'Travel & Visa Guide',
    categoryAr: 'السفر والتأشيرات',
    readTime: '6 min read',
    content: 'Traveling to India for medical treatment requires an Indian Medical Visa or e-Medical Visa. Citizens of GCC nations (Saudi Arabia, UAE, Oman, Qatar, Bahrain, Kuwait) can apply online via the official Government of India portal. To apply, you need a valid passport (minimum 6 months validity), a copy of your local medical records, and a formal invitation letter on the hospital letterhead in Kerala. TreatInKerala coordinates directly with the hospital\'s international desk to generate this visa invitation letter within 24 hours. The e-Medical visa allows triple entry into India and is valid for 60 days, with options for extensions if required for long-term treatments like orthopaedics or oncology.',
    contentAr: 'تتطلب رحلة العلاج في الهند الحصول على تأشيرة طبية أو تأشيرة طبية إلكترونية. يمكن لمواطني دول مجلس التعاون الخليجي التقديم عبر الإنترنت بسهولة. للتقديم تحتاج إلى جواز سفر ساري المفعول لـ6 أشهر على الأقل، ونسخة من تقاريرك الطبية المحلية، ورسالة دعوة رسمية من المستشفى المعالج في كيرلا، وهو ما ستقوم علاج في كيرلا بتجهيزه لك في غضون 24 ساعة. تتيح التأشيرة الدخول المتعدد للهند وصلاحية لـ60 يوماً.'
  },
  {
    slug: 'what-to-pack-for-treatment-kerala',
    title: 'What to Pack for Medical Treatment in Kerala',
    titleAr: 'ماذا تحزم في حقيبتك لرحلتك العلاجية في كيرلا؟',
    excerpt: 'Checklist of clothing, medical documents, adapters, currency, and essential items for patients and companions.',
    excerptAr: 'قائمة مراجعة للملابس، التقارير الطبية، المحولات الكهربائية، العملات، والأغراض الأساسية للمرضى والمرافقين.',
    aeoSummary: 'When packing for medical treatment in Kerala, include all physical medical reports on CDs/drives, light cotton clothing, front-open shirts for post-surgery, UK/India Type D/G plug adapters, and necessary local currency (INR).',
    aeoSummaryAr: 'عند التحضير للسفر العلاجي لكيرلا، احزم كافة التقارير والأشعة، وملابس قطنية فضفاضة (وقمصان تفتح من الأمام بعد الجراحة)، ومحولات كهرباء هندية، وكمية من الروبية الهندية.',
    date: 'June 05, 2026',
    category: 'Patient Checklists',
    categoryAr: 'قوائم المرضى',
    readTime: '4 min read',
    content: 'Preparing for a medical trip involves distinct packing needs. First, organize all physical medical reports, recent scans (on CDs/pen drives), prescription bottles, and laboratory reports in a separate waterproof folder. For clothing, pack light, loose-fitting cotton outfits suitable for Kerala\'s warm, tropical climate. If undergoing joint replacement or cardiac surgery, front-open shirts and loose sweatpants are highly recommended. Don\'t forget to pack UK/India standard plug adapters (Type D/G), some local currency (INR) for small transactions, and your regular medication supplies to last the entire trip.',
    contentAr: 'تحضير حقيبة السفر للعلاج يختلف قليلاً. أولاً، رتب جميع التقارير الطبية المطبوعة والأشعة الأخيرة (على أقراص مضغوطة) في ملف مقاوم للماء. بالنسبة للملابس، احزم ملابس قطنية خفيفة وفضفاضة تناسب مناخ كيرلا الاستوائي الدافئ. في حال جراحات المفاصل أو القلب، نوصي بقمصان تفتح من الأمام وبنطلونات فضفاضة. لا تنسَ محولات الكهرباء ونقوداً هندية محلية (روبية) للمعاملات الصغيرة.'
  },
  {
    slug: 'joint-replacement-kerala-gcc-guide',
    title: 'Joint Replacement in Kerala: A Guide for Omani & GCC Patients',
    titleAr: 'استبدال المفاصل في كيرلا: دليل شامل لمرضى عمان والخليج العربي',
    excerpt: 'Why GCC patients travel to Kozhikode (Calicut) for JCI-accredited knee and hip replacements. Connective flights, halal compliance, and recovery timelines.',
    excerptAr: 'لماذا يسافر مرضى الخليج إلى كوزيكود لإجراء جراحات استبدال الركبة والورك مع اعتمادات JCI. الرحلات المباشرة، الأطعمة الحلال وفترات النقاهة.',
    aeoSummary: 'Kerala is a top destination for GCC patients seeking knee or hip replacements due to short 3.5-hour direct flights, Halal food, Arabic translators, and JCI-accredited hospitals using FDA-approved titanium implants.',
    aeoSummaryAr: 'تعتبر كيرلا وجهة مفضلة للمرضى الخليجيين لاستبدال المفاصل بفضل الرحلات المباشرة القصيرة (3.5 ساعات)، وتوفر الطعام الحلال والمترجمين، واستخدام غرسات أمريكية معتمدة في مستشفيات حاصلة على الـ JCI.',
    date: 'June 28, 2026',
    category: 'GCC Patient Guides',
    categoryAr: 'أدلة المرضى الخليجيين',
    readTime: '6 min read',
    content: 'Joint replacement surgery (knee and hip arthroplasty) in Kerala has become a premier destination for patients from Oman, UAE, and Qatar. Key private hospitals in Calicut like Aster MIMS and Meitra hold Joint Commission International (JCI) accreditation, using US-made FDA-approved titanium implants. The primary attraction for Omani patients is direct flight connectivity (Calicut is just 3.5 hours from Muscat and Salalah via Oman Air and Air India Express). Furthermore, Calicut is fully hospitable to GCC cultures: hotels and hospital suites serve Halal food, and TreatInKerala provides dedicated Arabic medical translators free of charge. A typical knee replacement stay requires 10 to 14 days, including customized physiotherapy to restore complete, pain-free mobility before you fly back.',
    contentAr: 'أصبحت جراحات استبدال المفاصل (الركبة والورك) في كيرلا خياراً مفضلاً لمرضى سلطنة عمان والإمارات وقطر. تضم كوزيكود (كالكوت) مشافي رائدة معتمدة دولياً من اللجنة الدولية (JCI) مثل أستر ميمس وميترا، وتستخدم الغرسات الطبية المصنوعة من التيتانيوم والمعتمدة من إدارة الغذاء والدواء الأمريكية. يتمثل عامل الجذب الأساسي للمرضى العمانيين في رحلات الطيران المباشرة والقصيرة (حوالي ٣ ساعات ونصف من مسقط وصلالة). بالإضافة إلى ذلك، كيرلا مهيأة بالكامل للثقافة العربية: حيث تتوفر الأطعمة الحلال في الفنادق وأجنحة المشافي، وتقدم خدمة تريت إن كيرلا مترجمين طبيين يتحدثون العربية بطلاقة مجاناً. تتطلب الرحلة عادةً إقامة لمدة ١٠ إلى ١٤ يوماً تشمل جلسات العلاج الطبيعي والتأهيل الطبي المكثف لضمان الحركة السهلة قبل السفر للوطن.'
  },
  {
    slug: 'ayurveda-wellness-kerala-uk-europe-guide',
    title: 'Ayurveda Rejuvenation & Executive Checkups: A Guide for UK & European Patients',
    titleAr: 'الأيورفيدا والفحوصات الشاملة: دليل المرضى والسياح من بريطانيا وأوروبا',
    excerpt: 'How UK and European visitors combine authentic Panchakarma detoxification retreats with advanced medical health checkups in Kerala.',
    excerptAr: 'كيف يدمج السياح من بريطانيا وأوروبا بين علاجات تنقية الجسم بالبانشاكارما والفحوصات الطبية التنفيذية الشاملة في كيرلا.',
    aeoSummary: 'UK and European visitors to Kerala frequently combine a 14-day traditional Panchakarma Ayurveda retreat with affordable, world-class executive health screenings at accredited modern hospitals, saving significant private GP costs.',
    aeoSummaryAr: 'يجمع الزوار من بريطانيا وأوروبا بين برامج الأيورفيدا للتنظيف العميق (14 يوماً) والفحوصات الطبية التنفيذية الشاملة في المستشفيات الحديثة المعتمدة في كيرلا، لتوفير التكاليف والحصول على رعاية متكاملة.',
    date: 'June 25, 2026',
    category: 'International Wellness',
    categoryAr: 'الاستشفاء الدولي',
    readTime: '5 min read',
    content: 'For visitors from the United Kingdom and Europe, Kerala offers a unique combination of traditional Ayurvedic healing and world-class preventive modern medicine. Many patients travel to Kozhikode for a 14-day Panchakarma detoxification cycle to treat stress, chronic pain, and digestive issues at premium, government-certified green leaf wellness retreats. During the same trip, patients undergo comprehensive executive health screenings at accredited hospitals for a fraction of private GP costs in London or Munich. Under the supervision of qualified Ayurvedic doctors (Vaidyas) and modern clinical experts, this dual approach ensures complete mental and physical restoration. Flights to Calicut are convenient via major hubs in the GCC, and English is widely spoken by all clinical personnel.',
    contentAr: 'بالنسبة للزوار والسياح من المملكة المتحدة وأوروبا، توفر كيرلا مزيجاً فريداً يجمع بين علاجات الأيورفيدا التقليدية والطب الحديث الوقائي بمستويات عالمية. يسافر العديد من المرضى إلى كوزيكود لقضاء دورة تنقية السموم بالبانشاكارما (١٤ يوماً) لعلاج التوتر والآلام المزمنة والتهابات المفاصل في منتجعات استشفائية بيئية معتمدة بتصنيف الغصن الأخضر الحكومي. وفي الوقت نفسه، يستغل السياح الفرصة لإجراء فحوصات طبية وتنفيذية شاملة في المستشفيات الحديثة المعتمدة بتكلفة رمزية مقارنة بالعيادات الخاصة في لندن أو ميونخ. وتحت إشراف أطباء الأيورفيدا الاستشاريين والأطباء الاختصاصيين، يضمن هذا النهج المزدوج تجديداً كاملاً للنشاط الجسدي والنفسي، مع انتشار واسع للغة الإنجليزية لدى كافة الطواقم الطبية.'
  }
];

export interface TreatmentPackage {
  id: string;
  name: string;
  nameAr: string;
  treatmentSlug: string;
  cost: number;
  durationDays: number;
  hotelTier: 'budget' | 'premium' | 'apartment';
  hotelTierEn: string;
  hotelTierAr: string;
  includesEn: string[];
  includesAr: string[];
  descEn: string;
  descAr: string;
}

export const TREATMENT_PACKAGES: TreatmentPackage[] = [
  {
    id: 'pkg-cardiac-bypass',
    name: 'All-Inclusive Cardiac Bypass Package',
    nameAr: 'حزمة جراحة القلب المفتوح المتكاملة',
    treatmentSlug: 'cardiac',
    cost: 5500,
    durationDays: 21,
    hotelTier: 'apartment',
    hotelTierEn: '21 Nights Serviced Recovery Apartment',
    hotelTierAr: 'إقامة ٢١ ليلة في شقة نقاهة مجهزة بالخدمات',
    descEn: 'Full cardiac surgery, ICU recovery room, specialist surgery panel fees, and standard companion stay.',
    descAr: 'تشمل الجراحة الكاملة وتكلفة غرفة العناية المركزة وأتعاب كبار الجراحين ومرافقة كاملة في السفر والإقامة.',
    includesEn: [
      'NABH/JCI Hospital Admission (Standard Room)',
      'Pre-surgery Blood Tests & Diagnostics',
      'All Surgeon & Anesthetist Fees',
      '21 Nights Serviced Recovery Apartment for Patient & Companion',
      'Complimentary Airport Pick-up & Local Travels',
      'Dedicated Arabic / English Medical Translator',
      'Free e-Medical Visa Invitation Letter support',
      'Local Indian SIM Card on Arrival'
    ],
    includesAr: [
      'الدخول لمستشفى معتمد من NABH/JCI (غرفة قياسية)',
      'فحوصات الدم والتحاليل الطبية والتشخيص قبل الجراحة',
      'كافة أتعاب الجراح وطاقم التخدير المساعد',
      'إقامة ٢١ ليلة في شقة نقاهة مخصصة للمريض ومرافقه',
      'استقبال مجاني من المطار وتنقلات محلية شاملة',
      'مترجم طبي مرافق يتحدث العربية بطلاقة',
      'خطاب دعوة التأشيرة الطبية الإلكترونية مجاناً',
      'شريحة اتصال محلية عند الوصول'
    ]
  },
  {
    id: 'pkg-dental-implants',
    name: 'Full Arch Dental Implants Bundle',
    nameAr: 'حزمة زراعة الأسنان الكاملة المتكاملة',
    treatmentSlug: 'dental',
    cost: 1800,
    durationDays: 7,
    hotelTier: 'budget',
    hotelTierEn: '7 Nights Comfortable 3-Star Hotel Stays',
    hotelTierAr: 'إقامة ٧ ليالٍ في فندق مريح فئة ٣ نجوم',
    descEn: 'Full jaw premium titanium implants, customized zirconia crowns, and quick-turnaround laboratory fees.',
    descAr: 'تشمل زراعة الأسنان الكاملة للفك وتيجان الزركونيا الفاخرة المخصصة ورسوم المختبر الطبي والتنقلات.',
    includesEn: [
      'Full Jaw Titanium Implants & Zirconia Crown',
      '3D CBCT Scan & Clinical Diagnostics',
      'All Implantologist Specialist Fees',
      '7 Nights in a Comfortable 3-Star Hotel (Calicut City)',
      'Complimentary Airport Pick-up & Dropoff',
      'Dedicated Arabic / English speaking Coordinator',
      'Local SIM Card & Medical Consultation support'
    ],
    includesAr: [
      'زراعة الأسنان للفك بالكامل من التيتانيوم وتيجان الزركونيا',
      'الأشعة المقطعية ثلاثية الأبعاد والتشخيص السريري المتقدم',
      'كافة أتعاب طبيب زراعة الأسنان الاستشاري',
      'إقامة ٧ ليالٍ في فندق ٣ نجوم مريح وسط كالكوت',
      'استقبال مجاني من المطار وإرجاع للمطار',
      'منسق طبي مرافق يتحدث العربية بطلاقة',
      'شريحة اتصال هندية وتسهيل استشارات المتابعة'
    ]
  },
  {
    id: 'pkg-ayurveda-panchakarma',
    name: '14-Day Panchakarma Rejuvenation Package',
    nameAr: 'حزمة تجديد النشاط والبانشاكارما ١٤ يوماً',
    treatmentSlug: 'ayurveda',
    cost: 1100,
    durationDays: 14,
    hotelTier: 'premium',
    hotelTierEn: '14 Nights Traditional Ayurveda Wellness Eco-Resort Stays',
    hotelTierAr: 'إقامة ١٤ ليلة في منتجع أيورفيدا بيئي تقليدي راقٍ',
    descEn: 'Full body detox, Ayurvedic doctor consulting, traditional therapies, organic diet, and yoga lessons.',
    descAr: 'تشمل تنظيف السموم والسمات العلاجية للأيورفيدا وجلسات التدليك بالزيوت وإشراف طبيب الأيورفيدا.',
    includesEn: [
      'Daily Consultations with Ayurvedic Vaidyas (Doctors)',
      'Customized Daily Therapies & Herbal Massages (2 therapists)',
      'All Prescribed Ayurvedic Medicines during treatment',
      '14 Nights Wellness Eco-Resort Lodging (Vegetarian organic meals)',
      'Daily Guided Yoga & Meditation classes',
      'Airport Pick-up & local tourism transfers',
      'Companion accommodation & support'
    ],
    includesAr: [
      'جلسات استشارة يومية مع أطباء الأيورفيدا المتخصصين (فيديا)',
      'علاجات وتدليك بالزيوت الطبية يومياً (مع معالجَين اثنين)',
      'كافة الأدوية والزيوت الطبية الموصوفة طوال فترة العلاج',
      'إقامة ١٤ ليلة في منتجع أيورفيدا بيئي مع وجبات نباتية صحية',
      'جلسات يوغا وتأمل يومية بإشراف مدربين متخصصين',
      'تنسيق الاستقبال من المطار وجولة سياحية محلية مرافقة',
      'توفير السكن للمرافق والدعم اللوجستي'
    ]
  }
];

