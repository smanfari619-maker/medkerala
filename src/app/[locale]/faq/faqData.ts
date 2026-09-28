export interface FAQItem {
  id: string;
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
  category: 'costs' | 'hospitals' | 'ayurveda' | 'visas' | 'stay';
}

export interface FAQCategory {
  id: 'all' | 'costs' | 'hospitals' | 'ayurveda' | 'visas' | 'stay';
  titleEn: string;
  titleAr: string;
  iconName: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  { id: 'all', titleEn: 'All Questions', titleAr: 'جميع الأسئلة', iconName: 'HelpCircle' },
  { id: 'costs', titleEn: '💰 Costs & Pricing', titleAr: '💰 التكاليف والأسعار', iconName: 'DollarSign' },
  { id: 'hospitals', titleEn: '🏥 Hospitals & Quality', titleAr: '🏥 المستشفيات والجودة', iconName: 'Award' },
  { id: 'ayurveda', titleEn: '🌿 Kottakkal & Ayurveda', titleAr: '🌿 كوتاكال والأيورفيدا', iconName: 'Leaf' },
  { id: 'visas', titleEn: '✈️ Visas & Flights', titleAr: '✈️ التأشيرة والسفر', iconName: 'Plane' },
  { id: 'stay', titleEn: '🌙 Arabic & Halal Stays', titleAr: '🌙 الرعاية العربية والسكن', iconName: 'Home' },
];

export const FAQ_ITEMS: FAQItem[] = [
  // ── 1. COSTS & PRICING ──
  {
    id: 'why-cheaper',
    category: 'costs',
    qEn: 'Why is medical treatment in Kerala 70% to 85% cheaper than in the US, UK, and GCC?',
    qAr: 'لماذا تقل تكلفة العلاج الطبي في كيرلا بنسبة 70% إلى 85% عن أمريكا وبريطانيا والخليج؟',
    aEn: 'The lower cost in Kerala is driven by low domestic operational overheads, favorable foreign currency exchange rates (INR vs USD/SAR/AED/GBP), and strict pharmaceutical regulation that caps procedural expenses. Crucially, surgical standards are not compromised: partner hospitals use identical US FDA-approved implants (Stryker, Zimmer, Medtronic) and internationally certified clinical protocols matching Western private healthcare.',
    aAr: 'يرجع انخفاض التكلفة في كيرلا إلى انخفاض التكاليف التشغيلية المحلية، وسعر صرف الروبية الهندية المناسب مقابل العملات الخليجية والدولار، والتنظيم الحكومي الصارم لأسعار الأدوية والإجراءات. ولا يعني ذلك أي تنازل عن الجودة: فمستشفيات كيرلا المعتمدة تستخدم نفس الغرسات الجراحية الأمريكية المعتمدة من US FDA (مثل Stryker وZimmer وMedtronic) وتتبع نفس البروتوكولات السريرية المعمول بها في كبرى مستشفيات الغرب.',
  },
  {
    id: 'procedure-costs',
    category: 'costs',
    qEn: 'What are typical package costs for major surgeries (Knee, Bypass, Spine) in Kerala?',
    qAr: 'ما هي التكاليف التقديرية للعمليات الجراحية الكبرى (الركبة، القلب المفتوح، العمود الفقري) في كيرلا؟',
    aEn: 'Typical all-inclusive packages at JCI/NABH hospitals in Kerala include: Robotic Total Knee Replacement ($4,500 – $6,500 / SAR 17,000 – 24,000), Coronary Artery Bypass ($6,000 – $9,000 / SAR 24,000 – 36,000), Endoscopic Spine Discectomy ($3,800 – $5,200), Full Arch Dental Implants ($1,800 – $2,500), and 14-day Inpatient Panchakarma Detox ($1,100 – $1,800). Packages include surgeon fees, executive room stay, standard lab work, and companion lodging.',
    aAr: 'تشمل باقات العلاج النموذجية في مستشفيات كيرلا المعتمدة دولياً: استبدال الركبة بالروبوت (4,500 إلى 6,500 دولار / 17,000 إلى 24,000 ريال)، جراحة القلب المفتوح ومجازة الشريان التاجي (6,000 إلى 9,000 دولار / 24,000 إلى 36,000 ريال)، استئصال غضروف الظهر بالمنظار (3,800 إلى 5,200 دولار)، وزراعة الأسنان الكاملة (1,800 إلى 2,500 دولار)، وباقة البانشاكارما 14 يوماً (1,100 إلى 1,800 دولار). وتشمل الباقات أتعاب الجراح والإقامة والتحاليل وسكن المرافق.',
  },
  {
    id: 'hidden-fees',
    category: 'costs',
    qEn: 'Are there any hidden coordination fees or markups when using TreatInKerala?',
    qAr: 'هل توجد أي رسوم خفية أو زيادات في الأسعار عند التعامل مع خدمة علاج في كيرلا؟',
    aEn: 'No. TreatInKerala guarantees 100% financial transparency. Our coordination, Arabic translator support, airport pick-up, and medical estimate reviews are completely complimentary to the patient. You pay partner hospitals directly at their official institutional rates with zero agent commissions or hidden markups.',
    aAr: 'لا، نضمن لك الشفافية المالية التامة بنسبة 100%. فخدمات التنسيق الطبي، والمترجم العربي المرافق، والاستقبال من المطار، ومراجعة التقارير الطبية الأولية مجانية بالكامل للمريض. ويدفع المريض تكاليف العلاج للمستشفى مباشرة وفق الفواتير الرسمية المعتمدة دون أي عمولات إضافية أو رسوم خفية.',
  },
  {
    id: 'payment-insurance',
    category: 'costs',
    qEn: 'How do I pay the hospital, and can I use international private health insurance?',
    qAr: 'كيف يتم سداد الفواتير للمستشفى، وهل يمكنني استخدام التأمين الصحي الدولي الخاص بي؟',
    aEn: 'Partner hospitals accept major international credit/debit cards (Visa, MasterCard, Amex), direct international SWIFT bank wire transfers, and currency exchange on-site. For patients with global private health insurance (such as Cigna, Bupa International, Allianz, MetLife, or Aetna), hospitals provide direct cashless settlement or detailed itemized medical discharge files for smooth reimbursement in your home country.',
    aAr: 'تقبل المستشفيات الشريكة البطاقات الائتمانية الدولية (فيزا، ماستركارد)، والتحويلات البنكية الدولية (سويفت)، وصرف العملات داخل المستشفى. وبالنسبة للمرضى الذين يحملون تأميناً صحياً دولياً (مثل سيبا، بوبا إنترناشيونال، أليانز، أو ميتلايف)، توفر المستشفيات السداد المباشر غير النقدي (Cashless) أو تزودك بفواتير وتقارير طبية مفصلة باللغة الإنجليزية لاسترداد المبلغ من شركة تأمينك بكل سهولة.',
  },

  // ── 2. HOSPITALS & QUALITY ──
  {
    id: 'accreditations',
    category: 'hospitals',
    qEn: 'What international quality certifications and accreditations do Kerala partner hospitals hold?',
    qAr: 'ما هي شهادات الاعتماد والجودة الدولية التي تحملها مستشفيات كيرلا الشريكة؟',
    aEn: 'Partner hospitals hold Joint Commission International (JCI, USA) and National Accreditation Board for Hospitals & Healthcare Providers (NABH, India) accreditations. These certifications guarantee strict international compliance regarding surgical infection rates (kept below 1%, rivaling top European centers), patient privacy, medication safety, and biomedical sterilization standards.',
    aAr: 'تحمل المستشفيات الشريكة أعلى الاعتمادات الدولية وفي مقدمتها اعتماد اللجنة المشتركة الدولية الأمريكية (JCI) والاعتماد الوطني الهندي لجودة المستشفيات (NABH). وتضمن هذه الاعتمادات الالتزام بأعلى معايير سلامة المرضى، وانخفاض معدل العدوى الجراحية لأقل من 1% (بما يضاهي أرقى مستشفيات أوروبا)، ودقة التعقيم وسلامة الأدوية.',
  },
  {
    id: 'partner-hospitals',
    category: 'hospitals',
    qEn: 'Which major hospitals in Calicut (Kozhikode) and Kerala does TreatInKerala partner with?',
    qAr: 'ما هي أبرز المستشفيات التي تتعاون معها خدمة علاج في كيرلا في كوزيكود وباقي الولاية؟',
    aEn: 'We partner directly with leading tertiary and quaternary medical institutions, including Aster MIMS (Calicut & Kottakkal), Meitra Hospital (renowned for robotic joint replacements and heart surgery), Baby Memorial Hospital (one of the largest multi-specialty centers in Kerala), and specialized Ayurveda institutions like Kottakkal Arya Vaidya Sala.',
    aAr: 'نتعاون مباشرة مع أكبر الصروح الطبية التخصصية في كيرلا، ومنها: مستشفى أستر ميمز (في كوزيكود وكوتاكال)، ومستشفى ميترا (الرائد في جراحات المفاصل بالروبوت والقلب المفتوح)، ومستشفى بيبي ميموريال (أحد أكبر المجمعات الطبية الشاملة)، بالإضافة إلى المؤسسات الأيورفيدية العريقة مثل كوتاكال آريا فايديا شالا.',
  },
  {
    id: 'surgeon-qualifications',
    category: 'hospitals',
    qEn: 'What are the qualifications and clinical experience of Kerala chief doctors and surgeons?',
    qAr: 'ما هي مؤهلات وخبرات كبار الأطباء والجراحين الاستشاريين في كيرلا؟',
    aEn: 'Chief surgeons and department directors at our partner facilities have typically completed advanced fellowships and clinical training in the UK (FRCS, MRCP), the United States, or Germany. Many have performed over 5,000+ complex cardiac, orthopedic, or neurosurgical procedures over careers spanning 15 to 30 years.',
    aAr: 'تلقى معظم رؤساء الأقسام وكبار الجراحين في مستشفياتنا الشريكة تدريبهم التخصصي وزمالاتهم العليا في بريطانيا (FRCS وMRCP) أو الولايات المتحدة وألمانيا. ويمتلك معظمهم خبرة سريرية تمتد من 15 إلى 30 عاماً، مع إجراء أكثر من 5,000 عملية جراحية معقدة في جراحات القلب والمفاصل والأعصاب.',
  },
  {
    id: 'complications-care',
    category: 'hospitals',
    qEn: 'How are clinical complications or emergencies handled during treatment in Kerala?',
    qAr: 'كيف يتم التعامل مع أي مضاعفات صحية أو حالات طارئة أثناء فترة العلاج في كيرلا؟',
    aEn: 'Partner facilities are comprehensive multi-specialty hospitals equipped with 24/7 Level-1 Intensive Care Units (ICUs), dedicated cardiac catheterization labs, on-site blood banks, and 24/7 on-call emergency response teams. Additionally, your TreatInKerala coordinator is available 24/7 on phone and WhatsApp to resolve any non-clinical urgent requests.',
    aAr: 'المستشفيات الشريكة مجهزة بأحدث وحدات العناية المركزة (ICU) من المستوى الأول التي تعمل على مدار الساعة، ومعامل قسطرة القلب، وبنوك الدم، وطواقم طوارئ متخصصة. كما يظل منسق علاج في كيرلا الشخصي متاحاً على مدار 24 ساعة عبر الهاتف والواتساب لتلبية أي احتياجات طارئة.',
  },

  // ── 3. KOTTAKKAL & AYURVEDA ──
  {
    id: 'kottakkal-admission',
    category: 'ayurveda',
    qEn: 'How do I book an appointment or secure hospital admission at Kottakkal Arya Vaidya Sala?',
    qAr: 'كيف يمكنني حجز موعد استشارة أو الحصول على تنويم في كوتاكال آريا فايديا شالا؟',
    aEn: 'Because inpatient admissions at Kottakkal Arya Vaidya Sala (AH&RC) typically have wait times of 2 to 5 months, TreatInKerala facilitates expedited doctor appointments with senior chief Vaidyas. If hospital beds are fully booked, we arrange an Outpatient (OP) daily treatment plan: you complete your prescribed daily therapies at the hospital while enjoying comfortable private lodging nearby.',
    aAr: 'نظراً لأن غرف التنويم في مستشفى أبحاث كوتاكال آريا فايديا شالا (AH&RC) تشهد قوائم انتظار تمتد لشهرين إلى 5 أشهر، فإن فريقنا في كوتاكال يسهل لك حجز مواعيد مسبقة مع كبار أطباء الأيورفيدا (الفيديا). وإذا كانت غرف المستشفى ممتلئة، نرتب لك باقة العيادات الخارجية (OP)، حيث تتلقى جلسات العلاج اليومية بالمستشفى وتقيم في شقق أو فلل مفروشة فاخرة بجوار المركز.',
  },
  {
    id: 'ayurveda-conditions',
    category: 'ayurveda',
    qEn: 'Which chronic conditions respond most effectively to classical Kottakkal Ayurvedic treatments?',
    qAr: 'ما هي الأمراض والحالات المزمنة الأكثر استجابة لعلاجات كوتاكال والأيورفيدا التقليدية؟',
    aEn: 'Classical Kerala Ayurveda excels in conditions where modern medicine relies primarily on painkillers or risky surgeries: Lumbar & Cervical Disc Slip, Sciatica, Osteoarthritis, Rheumatoid Arthritis, Ankylosing Spondylitis, Post-Stroke Hemiplegia & Paralysis, Parkinson\'s Disease, Psoriasis, Chronic Migraines, and metabolic reset via complete Panchakarma detox.',
    aAr: 'تتميز الأيورفيدا الأصيلة في كيرلا بعلاج الحالات المزمنة التي تعجز العقاقير الحديثة عن علاجها جذرياً: الانزلاق الغضروفي (الديسك) وعرق النسا، خشونة المفاصل والركبة، الروماتيزم، التهاب الفقار اللاصق، الشلل وتأهيل ما بعد الجلطات، مرض باركنسون، الصدفية والإكزيما، والصداع النصفي، وتطهير الجسم الشامل بالبانشاكارما.',
  },
  {
    id: 'combine-allopathy',
    category: 'ayurveda',
    qEn: 'Can I combine modern surgery with traditional Ayurvedic recovery in Kerala?',
    qAr: 'هل يمكنني الدمج بين الجراحة الحديثة والاستشفاء بالأيورفيدا في رحلة علاجية واحدة؟',
    aEn: 'Yes, this "Dual-Phase Protocol" is one of Kerala\'s most sought-after medical tourism offerings. For example, a patient undergoes robotic joint replacement or spine surgery at a JCI hospital (Phase 1, 4–5 days), and then transfers to an accredited Ayurveda healing center for natural anti-inflammatory therapies (Abhyanga, Kizhi) and muscle rejuvenation during convalescence (Phase 2, 7–10 days).',
    aAr: 'نعم بالتأكيد، ويُعد "بروتوكول العلاج المزدوج" هذا من أكثر البرامج طلباً في كيرلا. على سبيل المثال: يخضع المريض لجراحة استبدال مفصل الركبة بالروبوت أو جراحة العمود الفقري في مستشفى معتمد دولياً (المرحلة الأولى: 4 إلى 5 أيام)، ثم ينتقل إلى منتجع أيورفيدا صحي ونقي لتلقي جلسات المساج الطبي العشبي (المرحلة الثانية: 7 إلى 10 أيام) لتسريع الشفاء وتنشيط العضلات.',
  },
  {
    id: 'medicine-shipping',
    category: 'ayurveda',
    qEn: 'Can TreatInKerala ship authentic Kottakkal Arya Vaidya Sala medicines to my home country?',
    qAr: 'هل تستطيع خدمة علاج في كيرلا شحن أدوية كوتاكال الأصلية إلى بلدي بعد عودتي؟',
    aEn: 'Yes. We purchase your prescribed herbal medicines, decoctions (Kashayams), and therapeutic oils directly from the official Kottakkal Arya Vaidya Sala factory dispensary. We pack them to international pharmaceutical cargo standards and dispatch them via DHL/FedEx air courier directly to your address in Saudi Arabia, UAE, Oman, Kuwait, Qatar, the UK, USA, or Europe.',
    aAr: 'نعم بكل تأكيد. نقوم بشراء أدويتك وزيوتك العلاجية الأصلية الموصوفة مباشرة من صيدلية مصنع كوتاكال آريا فايديا شالا الرسمية، ونقوم بتغليفها وفق معايير الشحن الجوي الدولي وشحنها عبر DHL أو FedEx حتى باب منزلك في السعودية، الإمارات، عمان، قطر، الكويت، أو أوروبا وأمريكا.',
  },

  // ── 4. VISAS & FLIGHTS ──
  {
    id: 'visa-process',
    category: 'visas',
    qEn: 'How do I apply for an Indian e-Medical Visa, and how quickly is the invitation letter issued?',
    qAr: 'كيف أقدم على التأشيرة الطبية الإلكترونية للهند، وخلال كم يصدر خطاب الدعوة؟',
    aEn: 'Applying is simple: 1) Send us your medical reports; 2) We review your case and issue an official government-recognized Hospital Visa Invitation Letter within 24 hours; 3) You complete the online application at indianvisaonline.gov.in uploading your passport and our letter; 4) The e-Medical Visa is approved electronically within 24 to 48 hours. It is valid for 60 days with triple entry.',
    aAr: 'التقديم سهل للغاية: 1) أرسل تقاريرك الطبية؛ 2) نقوم بمراجعتها وإصدار خطاب دعوة رسمي معتمد من المستشفى خلال 24 ساعة؛ 3) تقوم بتعبئة طلبك عبر بوابة التأشيرات الهندية الرسمية (indianvisaonline.gov.in) وإرفاق صورة الجواز وخطاب الدعوة؛ 4) تصدر التأشيرة إلكترونياً عبر بريدك خلال 24 إلى 48 ساعة فقط. وتكون صالحة لمدة 60 يوماً مع ميزة الدخول المتعدد.',
  },
  {
    id: 'visa-attendants',
    category: 'visas',
    qEn: 'Can family members or caregivers travel with the patient on a medical visa?',
    qAr: 'هل يحق للمرافقين أو أفراد الأسرة السفر مع المريض بنفس التأشيرة الطبية؟',
    aEn: 'Yes. Up to two family members, caregivers, or companions can obtain Medical Attendant e-Visas (e-MEDX) linked directly to the primary patient\'s visa. TreatInKerala includes all accompanying attendants on the official hospital invitation letter so their visas are approved simultaneously.',
    aAr: 'نعم بالتأكيد. يحق لمرافقَين اثنين من أفراد الأسرة الحصول على تأشيرة مرافق طبي إلكترونية (Medical Attendant Visa) مقترنة مباشرة بتأشيرة المريض. وتدرج خدمة علاج في كيرلا أسماء المرافقين في خطاب الدعوة الطبي لضمان صدور تأشيراتهم معاً دون أي تأخير.',
  },
  {
    id: 'airport-pickups',
    category: 'visas',
    qEn: 'Which airport should I fly into, and how do transfers to Calicut or Kottakkal work?',
    qAr: 'ما هو المطار الأفضل للوصول، وكيف يتم التوصيل إلى المستشفى في كوزيكود أو كوتاكال؟',
    aEn: 'The most convenient airport is Calicut International Airport (Karippur / CCJ), which operates direct flights daily from Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, Doha, and Muscat. CCJ is only 25–40 minutes from partner hospitals in Calicut and Kottakkal. We provide private air-conditioned transport (with wheelchair or stretcher assistance if needed) straight to your hospital or accommodation.',
    aAr: 'المطار الأقرب والأفضل هو مطار كوزيكود الدولي (كاريور / CCJ)، والذي يستقبل يومياً رحلات مباشرة من الرياض، جدة، الدمام، دبي، أبوظبي، الدوحة، ومسقط. ويبعد المطار ما بين 25 إلى 40 دقيقة فقط بالسيارة عن مستشفيات كوزيكود ومركز كوتاكال. ويوفر فريقنا خدمة الاستقبال بسيارات مجهزة ومكيفة (مع دعم كامل للكراسي المتحركة أو سيارات الإسعاف) مباشرة لمقر إقامتك.',
  },
  {
    id: 'stay-duration',
    category: 'visas',
    qEn: 'How many days should I plan to stay in Kerala for surgery or Ayurvedic therapies?',
    qAr: 'كم يوماً يُنصح بالتخطيط للبقاء في كيرلا لإجراء الجراحة أو العلاج الطبيعي؟',
    aEn: 'Stay duration depends on the medical procedure: 1) Minor / Laparoscopic Surgeries & Dental: 7 to 10 days; 2) Joint Replacement (Knee/Hip) & Cardiac Bypass: 14 to 21 days (including hospital admission + recovery); 3) Spinal Disc & Sciatica Ayurvedic Therapy: 14 to 21 days; 4) Stroke Rehabilitation & Chronic Arthritis: 21 to 28 days. Your doctor verifies your "Fit-to-Fly" clearance before departure.',
    aAr: 'تعتمد مدة الإقامة على نوع الإجراء: 1) الجراحات البسيطة وجراحات المناظير والأسنان: 7 إلى 10 أيام؛ 2) استبدال المفاصل (الركبة/الورك) والقلب المفتوح: 14 إلى 21 يوماً (تشمل التنويم والنقاهة)؛ 3) علاجات ديسك العمود الفقري بالأيورفيدا: 14 إلى 21 يوماً؛ 4) تأهيل الجلطات وأمراض المفاصل المزمنة: 21 إلى 28 يوماً. ويمنحك الطبيب شهادة اللياقة للسفر (Fit-to-Fly) قبل موعد رحلة عودتك.',
  },

  // ── 5. ARABIC & HALAL STAYS ──
  {
    id: 'arabic-support',
    category: 'stay',
    qEn: 'Do you provide full-time Arabic-speaking translators and patient care coordinators?',
    qAr: 'هل توفرون مترجمين ومنسقين طبيين يتحدثون العربية بطلاقة طوال فترة الرحلة؟',
    aEn: 'Yes. TreatInKerala assigns a dedicated, fluent Arabic-speaking medical coordinator to your journey. Your coordinator greets you at the airport, attends all clinical consultations, translates lab tests and medical instructions, helps with local SIM cards, and remains on-call 24/7 throughout your entire stay in Kerala.',
    aAr: 'نعم بكل تأكيد. تعين خدمة علاج في كيرلا منسقاً طبياً يتحدث العربية بطلاقة ليكون مرافقاً شخصياً لك. يستقبلك المنسق في المطار، ويحضر معك كافة المقابلات الطبية والفحوصات، ويترجم تعليمات الأطباء، ويساعدك في استخراج شرائح الاتصال والتنقل، ويبقى في خدمتك على مدار الساعة.',
  },
  {
    id: 'halal-food',
    category: 'stay',
    qEn: 'Is Halal dining readily available, and are prayer facilities provided in hospitals?',
    qAr: 'هل الأطعمة المقدمة حلال 100%، وهل تتوفر مصليات داخل المستشفيات؟',
    aEn: 'Yes, completely. Kerala has a deep Islamic cultural heritage, and 100% certified Halal food is the standard across our partner hospitals and cities like Calicut and Kottakkal. Hospitals provide dedicated prayer rooms (Musallas), Arabic TV channels, and customized Arabic or continental menu choices.',
    aAr: 'نعم 100%. تتمتع كيرلا بروابط تاريخية وثقافية إسلامية عميقة، وجميع الأطعمة المقدمة في المستشفيات الشريكة والمطاعم في كوزيكود وكوتاكال حلال معتمدة تماماً. كما توفر المستشفيات مصليات مجهزة للرجال والنساء، وقنوات تلفزيونية عربية، وقوائم طعام عربية تناسب أذواق المرضى.',
  },
  {
    id: 'companion-accommodations',
    category: 'stay',
    qEn: 'What accommodation options are available for family members and companions in Calicut and Kottakkal?',
    qAr: 'ما هي خيارات السكن المتاحة للمرافقين وأفراد العائلة في كوزيكود وكوتاكال؟',
    aEn: 'We arrange curated lodging tailored to your budget and privacy requirements: 1) Executive hospital suites with companion sofa-beds and attached bathrooms; 2) Fully furnished 1- to 3-bedroom serviced apartments equipped with private kitchens and washing machines; 3) Private luxury villas near Kottakkal Arya Vaidya Sala; 4) 4-star and 5-star partner hotels in Calicut city with elevators and wheelchair access.',
    aAr: 'نوفر خيارات إقامة متعددة تناسب خصوصية العائلات وميزانياتهم: 1) أجنحة تنويم تنفيذية بالمستشفى مجهزة بأسرة مريحة للمرافق ومطبخ صغير؛ 2) شقق فندقية مجهزة بالكامل (غرفة إلى 3 غرف) مع مطبخ خاص وغسالة؛ 3) فلل مستقلة خاصة بالقرب من كوتاكال آريا فايديا شالا؛ 4) فنادق 4 و 5 نجوم راقية في قلب كوزيكود مزودة بمصاعد ومداخل مهيأة للكراسي المتحركة.',
  },
  {
    id: 'female-privacy',
    category: 'stay',
    qEn: 'Can female patients request female doctors, therapists, and private nursing care?',
    qAr: 'هل يمكن للمريضات طلب طبيبات وممرضات وأخصائيات علاج طبيعي لتأمين الخصوصية؟',
    aEn: 'Yes. We strictly respect privacy and cultural comfort. For female patients requiring consultations, gynecology, wellness therapies, or Panchakarma massages, female Ayurvedic therapists (for Abhyanga/Kizhi) and female nursing staff are exclusively assigned.',
    aAr: 'نعم بكل تأكيد. نحن نلتزم بالخصوصية والضوابط الثقافية. فبالنسبة للمريضات، يتم توفير طبيبات استشاريات، وتُسند جلسات التدليك الأيورفيدي والبانشاكارما حصرياً لأخصائيات علاج طبيعي إناث، مع توفير ممرضات للمتابعة اليومية.',
  },
];
