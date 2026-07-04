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
      kerala: 4500,
      uk: 38000,
      usa: 90000,
      uae: 22000
    },
    doctors: [
      {
        name: 'Dr. Madhavan Nair',
        nameAr: 'د. مادهافان ناير',
        title: 'Senior Consultant Cardiac Surgeon',
        titleAr: 'كبير استشاريي جراحة القلب والشرايين',
        hospital: 'Aster MIMS, Calicut',
        hospitalAr: 'أستر ميمس، كالكوت',
        exp: '22 Years',
        expAr: '٢٢ عاماً'
      },
      {
        name: 'Dr. Faisal Rahman',
        nameAr: 'د. فيصل الرحمن',
        title: 'Chief of Cardiothoracic Surgery',
        titleAr: 'رئيس قسم جراحة الصدر والقلب',
        hospital: 'Baby Memorial Hospital, Calicut',
        hospitalAr: 'مستشفى بيبي التذكاري، كالكوت',
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
      kerala: 5000,
      uk: 22000,
      usa: 45000,
      uae: 15000
    },
    doctors: [
      {
        name: 'Dr. Suresh Pillai',
        nameAr: 'د. سوريش بيلاي',
        title: 'Senior Consultant Joint Replacement',
        titleAr: 'استشاري أول استبدال المفاصل والركبة',
        hospital: 'Meitra Hospital, Calicut',
        hospitalAr: 'مستشفى ميترا، كالكوت',
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
      kerala: 400,
      uk: 2500,
      usa: 4500,
      uae: 1800
    },
    doctors: [
      {
        name: 'Dr. Joseph Thomas',
        nameAr: 'د. جوزيف توماس',
        title: 'Chief Prosthodontist & Implantologist',
        titleAr: 'رئيس قسم تركيبات وزراعة الأسنان',
        hospital: 'MedKerala Partner Dental Hub',
        hospitalAr: 'مركز ميدكيرلا الشريك لطب الأسنان',
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
      kerala: 2000,
      uk: 8000,
      usa: 15000,
      uae: 7000
    },
    doctors: [
      {
        name: 'Dr. Mini Kurian',
        nameAr: 'د. ميني كوريان',
        title: 'Director & Chief IVF Specialist',
        titleAr: 'مديرة ورئيسة أطباء علاج العقم وأطفال الأنابيب',
        hospital: 'Aster Fertility Centre, Calicut',
        hospitalAr: 'مركز أستر لعلاج الخصوبة، كالكوت',
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
      kerala: 800,
      uk: 6000,
      usa: 9000,
      uae: 4000
    },
    doctors: [
      {
        name: 'Dr. Hari Prasad',
        nameAr: 'د. هاري براساد',
        title: 'Senior Ayurvedic Physician (BAMS)',
        titleAr: 'طبيب أول الأيورفيدا والطب البديل (BAMS)',
        hospital: 'Kottakkal Arya Vaidya Sala Partner',
        hospitalAr: 'مركز شريك لكوتاكال أريا فايديا سالا',
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
      kerala: 8000,
      uk: 60000,
      usa: 140000,
      uae: 35000
    },
    doctors: [
      {
        name: 'Dr. K. S. Gangadharan',
        nameAr: 'د. ك. س. غانغادهاران',
        title: 'Senior Consultant Surgical Oncologist',
        titleAr: 'استشاري أول جراحة الأورام',
        hospital: 'Aster MIMS, Calicut',
        hospitalAr: 'أستر ميمس، كالكوت',
        exp: '25 Years',
        expAr: '٢٥ عاماً'
      },
      {
        name: 'Dr. Suresh Kumar',
        nameAr: 'د. سوريش كومار',
        title: 'Chief of Medical Oncology',
        titleAr: 'رئيس قسم علاج الأورام الكيميائي والحيوي',
        hospital: 'Baby Memorial Hospital, Calicut',
        hospitalAr: 'مستشفى بيبي التذكاري، كالكوت',
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
        a: 'A typical radiation cycle requires daily treatments for 4 to 6 weeks. MedKerala coordinates accommodation in comfortable service apartments/hotels near the hospital for you and your companion during this period.',
        aAr: 'تتطلب دورة العلاج الإشعاعي المعتادة جلسات يومية لمدة تتراوح بين 4 إلى 6 أسابيع. تنسق ميدكيرلا إقامة مريحة في شقق مفروشة أو فنادق قريبة من المستشفى لك ولمرافقك خلال هذه الفترة.'
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
      kerala: 6500,
      uk: 35000,
      usa: 85000,
      uae: 25000
    },
    doctors: [
      {
        name: 'Dr. Jacob P. Alapatt',
        nameAr: 'د. يعقوب ب. ألابات',
        title: 'Senior Consultant Neurosurgeon',
        titleAr: 'استشاري أول جراحة المخ والأعصاب',
        hospital: 'Baby Memorial Hospital, Calicut',
        hospitalAr: 'مستشفى بيبي التذكاري، كالكوت',
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
      kerala: 28000,
      uk: 120000,
      usa: 280000,
      uae: 95000
    },
    doctors: [
      {
        name: 'Dr. Venugopal Venugopal',
        nameAr: 'د. فينوجوبال فينوجوبال',
        title: 'Chief Liver Transplant Surgeon',
        titleAr: 'رئيس أطباء جراحة زراعة الكبد',
        hospital: 'Aster MIMS, Calicut',
        hospitalAr: 'أستر ميمس، كالكوت',
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
      kerala: 1200,
      uk: 8000,
      usa: 15000,
      uae: 5000
    },
    doctors: [
      {
        name: 'Dr. Sameer Ali',
        nameAr: 'د. سمير علي',
        title: 'Chief Refractive & Cataract Surgeon',
        titleAr: 'رئيس جراحات القرنية والمياه البيضاء وتصحيح النظر',
        hospital: 'MedKerala Partner Eye Hub',
        hospitalAr: 'مركز العيون الشريك لميدكيرلا',
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
    slug: 'bypass-cost-comparison',
    title: 'Cardiac Bypass Cost: Kerala vs UK vs UAE',
    titleAr: 'مقارنة تكلفة جراحة مجازة القلب: كيرلا مقابل بريطانيا والإمارات',
    excerpt: 'Detailed cost breakdown of coronary artery bypass surgery. Learn how patients save over 70% in Kerala while getting NABH/JCI level care.',
    excerptAr: 'تحليل تفصيلي لتكاليف جراحة مجازة الشريان التاجي للقلب. تعرف على كيفية توفير المرضى لأكثر من 70% في كيرلا مع الحصول على رعاية صحية بمستوى عالمي.',
    date: 'June 20, 2026',
    category: 'Costs & Savings',
    categoryAr: 'التكاليف والوفورات',
    readTime: '5 min read',
    content: 'Coronary artery bypass grafting (CABG) is a lifesaver, but in many western and Middle Eastern nations, it represents a catastrophic financial burden. In the United States, a cardiac bypass surgery can average $90,000. In the United Kingdom, private treatment costs around $38,000, and even in private hospitals in the UAE, the cost sits near $22,000. In comparison, accredited super-speciality hospitals in Calicut, Kerala provide the exact same surgical procedure — using US FDA-approved consumables, modular cardiovascular theatres, and highly experienced surgeons — for approximately $4,500. This includes the medical coordination fees, hospital room stay, diagnostic workups, and medical officer charges.',
    contentAr: 'تعتبر عملية مجازة الشريان التاجي منقذة للحياة، ولكنها تشكل عبئاً مالياً هائلاً في الدول الغربية والشرق الأوسط. في الولايات المتحدة يبلغ متوسط تكلفتها 90 ألف دولار. وفي بريطانيا حوالي 38 ألف دولار، بينما تقترب في المستشفيات الخاصة بالإمارات من 22 ألف دولار. في المقابل، تقدم مستشفيات كيرلا المعتمدة الإجراء نفسه تماماً باستخدام مستلزمات طبية معتمدة أمريكياً وأحدث غرف عمليات القلب بتكلفة تقارب 4500 دولار فقط، تشمل التنسيق الطبي والإقامة والفحوصات.'
  },
  {
    slug: 'best-cardiac-hospitals-calicut',
    title: 'Best Cardiac Hospitals in Calicut / Kerala',
    titleAr: 'أفضل مستشفيات جراحة القلب في كالكوت، كيرلا',
    excerpt: 'An objective guide to top JCI and NABH accredited hospitals in Kozhikode offering cardiac bypass and valve surgeries.',
    excerptAr: 'دليل موضوعي لأفضل مستشفيات جراحة وصمامات القلب المعتمدة من الهيئات الوطنية والدولية في كوزيكود.',
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
    date: 'June 10, 2026',
    category: 'Travel & Visa Guide',
    categoryAr: 'السفر والتأشيرات',
    readTime: '6 min read',
    content: 'Traveling to India for medical treatment requires an Indian Medical Visa or e-Medical Visa. Citizens of GCC nations (Saudi Arabia, UAE, Oman, Qatar, Bahrain, Kuwait) can apply online via the official Government of India portal. To apply, you need a valid passport (minimum 6 months validity), a copy of your local medical records, and a formal invitation letter on the hospital letterhead in Kerala. MedKerala coordinates directly with the hospital\'s international desk to generate this visa invitation letter within 24 hours. The e-Medical visa allows triple entry into India and is valid for 60 days, with options for extensions if required for long-term treatments like orthopaedics or oncology.',
    contentAr: 'تتطلب رحلة العلاج في الهند الحصول على تأشيرة طبية أو تأشيرة طبية إلكترونية. يمكن لمواطني دول مجلس التعاون الخليجي التقديم عبر الإنترنت بسهولة. للتقديم تحتاج إلى جواز سفر ساري المفعول لـ6 أشهر على الأقل، ونسخة من تقاريرك الطبية المحلية، ورسالة دعوة رسمية من المستشفى المعالج في كيرلا، وهو ما ستقوم ميدكيرلا بتجهيزه لك في غضون 24 ساعة. تتيح التأشيرة الدخول المتعدد للهند وصلاحية لـ60 يوماً.'
  },
  {
    slug: 'what-to-pack-for-treatment-kerala',
    title: 'What to Pack for Medical Treatment in Kerala',
    titleAr: 'ماذا تحزم في حقيبتك لرحلتك العلاجية في كيرلا؟',
    excerpt: 'Checklist of clothing, medical documents, adapters, currency, and essential items for patients and companions.',
    excerptAr: 'قائمة مراجعة للملابس، التقارير الطبية، المحولات الكهربائية، العملات، والأغراض الأساسية للمرضى والمرافقين.',
    date: 'June 05, 2026',
    category: 'Patient Checklists',
    categoryAr: 'قوائم المرضى',
    readTime: '4 min read',
    content: 'Preparing for a medical trip involves distinct packing needs. First, organize all physical medical reports, recent scans (on CDs/pen drives), prescription bottles, and laboratory reports in a separate waterproof folder. For clothing, pack light, loose-fitting cotton outfits suitable for Kerala\'s warm, tropical climate. If undergoing joint replacement or cardiac surgery, front-open shirts and loose sweatpants are highly recommended. Don\'t forget to pack UK/India standard plug adapters (Type D/G), some local currency (INR) for small transactions, and your regular medication supplies to last the entire trip.',
    contentAr: 'تحضير حقيبة السفر للعلاج يختلف قليلاً. أولاً، رتب جميع التقارير الطبية المطبوعة والأشعة الأخيرة (على أقراص مضغوطة) في ملف مقاوم للماء. بالنسبة للملابس، احزم ملابس قطنية خفيفة وفضفاضة تناسب مناخ كيرلا الاستوائي الدافئ. في حال جراحات المفاصل أو القلب، نوصي بقمصان تفتح من الأمام وبنطلونات فضفاضة. لا تنسَ محولات الكهرباء ونقوداً هندية محلية (روبية) للمعاملات الصغيرة.'
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

