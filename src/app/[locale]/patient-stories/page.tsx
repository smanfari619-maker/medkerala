import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'النتائج الطبية وقصص النجاح | علاج في كيرلا' : 'Clinical Outcomes & Network Success Stories | TreatInKerala',
    description: isAr 
      ? 'تصفح النتائج الطبية وسجلات النجاح للمستشفيات الشريكة المعتمدة JCI و NABH في كيرلا، الهند.'
      : 'Browse clinical track records, success rates, and medical outcomes across JCI & NABH accredited partner hospitals in Kerala, India.',
    alternates: {
      canonical: isAr ? '/ar/patient-stories' : '/en/patient-stories',
      languages: {
        en: '/en/patient-stories',
        ar: '/ar/patient-stories',
      },
    },
  };
}

export default async function PatientStoriesPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  const caseStudies = [
    {
      titleEn: "Aster Medcity — Quaternary Organ Transplants",
      titleAr: "أستر ميدسيتي — الرعاية الرباعية وزراعة الأعضاء",
      categoryEn: "Advanced Surgical Outcomes",
      categoryAr: "النتائج الجراحية المتقدمة",
      accreditationEn: "JCI & NABH Certified Center",
      accreditationAr: "معتمد من اللجنة الدولية المشتركة JCI والهيئة الوطنية NABH",
      statsEn: "99.2% Success Rate on 1,500+ Cardiac Bypass Procedures",
      statsAr: "نسبة نجاح ٩٩.٢٪ في أكثر من ١٥٠٠ عملية قلب مفتوح",
      highlightsEn: [
        "State-of-the-art robotic-assisted surgical theatres.",
        "Comprehensive post-operative ICU infrastructure.",
        "Experienced medical board trained at Cleveland Clinic and NHS UK."
      ],
      highlightsAr: [
        "غرف عمليات متطورة مجهزة بأنظمة الجراحة الروبوتية المساعدة.",
        "بنية تحتية متكاملة للعناية المركزة لما بعد الجراحة.",
        "مجلس طبي استشاري ذو خبرة تدرب في كليفلاند كلينك وهيئة الصحة البريطانية (NHS)."
      ],
      initials: "AM",
    },
    {
      titleEn: "Meitra Hospital — Robotic Orthopedic Mobilization",
      titleAr: "مستشفي ميترا — استبدال المفاصل الروبوتي وإعادة التأهيل السريع",
      categoryEn: "Joint & Spine Rehabilitation",
      categoryAr: "تأهيل المفاصل والعمود الفقري",
      accreditationEn: "Paperless Digital Quaternary Care",
      accreditationAr: "مستشفى رقمي بالكامل للرعاية الفائقة معتمد JCI",
      statsEn: "Immediate Post-Op Mobilization: Walking within 24 hours",
      statsAr: "الحركة السريعة بعد الجراحة: المشي في غضون ٢٤ ساعة فقط",
      highlightsEn: [
        "Robotic-assisted precise bone alignment for joint replacements.",
        "High-durability FDA-approved titanium & ceramic implants.",
        "Personalized digital recovery tracking apps for clinical teams."
      ],
      highlightsAr: [
        "محاذاة دقيقة للغاية للمفاصل بمساعدة الذكاء الاصطناعي والروبوت.",
        "غرسات تيتانيوم وسيراميك عالية المتانة ومعتمدة من إدارة الغذاء والدواء الأمريكية.",
        "تطبيق رقمي لمتابعة مراحل التعافي لكل مريض مع الفريق الطبي."
      ],
      initials: "MH",
    },
    {
      titleEn: "Somatheeram & Kottakkal — Ayurvedic Stroke Recovery",
      titleAr: "سوماتيرام وكوتاكال — إعادة التأهيل العصبي والتعافي من الشلل",
      categoryEn: "Alternative Medicine & Wellness",
      categoryAr: "الطب البديل والعلاج الأيورفيدي",
      accreditationEn: "Government Green Leaf Standard",
      accreditationAr: "حاصل على تصنيف الغصن الأخضر من وزارة الصحة والسياحة",
      statsEn: "Clinical Rehabilitation programs of 21–28 Days",
      statsAr: "برامج نقاهة وتأهيل سريري لمدة تتراوح بين ٢١ إلى ٢٨ يوماً",
      highlightsEn: [
        "Traditional Panchakarma detoxification supervised by BAMS doctors.",
        "Custom organic herbal oils prepared fresh at on-site pharmacies.",
        "Tropical beachfront healing environments promoting stress-relief."
      ],
      highlightsAr: [
        "جلسات تطهير البانشاكارما التقليدية تحت إشراف أطباء مؤهلين BAMS.",
        "زيوت عشبية طبيعية وعضوية تُحضر طازجة في الصيدليات الملحقة بالمركز.",
        "بيئة استوائية هادئة على شاطئ البحر تعزز الاسترخاء وتخفيف الضغوط."
      ],
      initials: "SK",
    }
  ];
  const patientStories = [
    {
      nameEn: "Khalid A.",
      nameAr: "خالد ع.",
      age: 58,
      locationEn: "Dubai, United Arab Emirates",
      locationAr: "دبي، الإمارات العربية المتحدة",
      flag: "🇦🇪",
      treatmentEn: "Cardiac Bypass Surgery (CABG)",
      treatmentAr: "جراحة مجازة الشريان التاجي (القلب المفتوح)",
      hospitalEn: "Aster MIMS Hospital, Calicut",
      hospitalAr: "مستشفى أستر ميمس، كالكوت",
      savingsEn: "Saved over $40,000 USD compared to UAE private clinics",
      savingsAr: "وفّر أكثر من 40,000 دولار مقارنة بالعيادات الخاصة في الإمارات",
      storyEn: "I was recommended a bypass surgery by my doctor in Dubai, but the cost was astronomical. A family member suggested looking into medical tourism in Kerala. I reached out to TreatInKerala. From day one, my coordinator was in touch. They translated my records, set up a call with the chief surgeon, and managed all logistics. My stay at Aster MIMS was exceptional. The staff was incredibly caring, and the local translator made sure I never missed a word. I spent three weeks recovering in a serviced apartment nearby. The total bill, including accommodation and travel, was less than a third of what I was quoted at home. I am back to work now and feeling stronger than ever.",
      storyAr: "أوصاني طبيبي في دبي بضرورة إجراء جراحة قلب مفتوح، لكن التكلفة كانت باهظة جداً. اقترح أحد الأقارب فكرة السفر للعلاج في كيرلا. تواصلت مع فريق علاج في كيرلا، وطوال الرحلة كان المنسق معنا خطوة بخطوة. قاموا بترجمة تقاريري الطبية، وترتيب مكالمة مرئية مع رئيس قسم الجراحة، وإدارة كافة التفاصيل اللوجستية. كانت الإقامة في مستشفى أستر ممتازة وفريق التمريض ودوداً للغاية. وفّرنا أكثر من 70% من التكلفة الإجمالية، وأنا الآن أمارس حياتي الطبيعية بكل نشاط.",
    },
    {
      nameEn: "Emmanuel O.",
      nameAr: "إيمانويل أو.",
      age: 62,
      locationEn: "Lagos, Nigeria",
      locationAr: "لاغوس، نيجيريا",
      flag: "🇳🇬",
      treatmentEn: "Bilateral Knee Replacement",
      treatmentAr: "عملية استبدال الركبتين بالكامل",
      hospitalEn: "Meitra Hospital, Calicut",
      hospitalAr: "مستشفى ميترا، كالكوت",
      savingsEn: "Saved 65% compared to private care in Nigeria/Europe",
      savingsAr: "وفّر 65% مقارنة بالعلاج الخاص في نيجيريا وأوروبا",
      storyEn: "Severe osteoarthritis made it impossible for me to walk even short distances. I wanted robotic joint replacement for precision and fast recovery. TreatInKerala guided me to Meitra Hospital. They provided the visa invitation letter within 24 hours, which made my Indian visa application incredibly fast. We were met at Calicut airport by our personal driver. The surgery was highly successful—I was assisted to walk within 24 hours of the operation! The robotic alignment technology is top-notch, and the implants are imported from the US. The price was highly transparent, paid directly to the hospital billing desk with zero markups. Highly recommended.",
      storyAr: "آلام المفاصل جعلت المشي لمسافات قصيرة مستحيلاً بالنسبة لي. أردت إجراء جراحة استبدال المفاصل الروبوتية للحصول على دقة أكبر وتعافٍ أسرع. وجّهني فريق علاج في كيرلا إلى مستشفى ميترا الرقمي. أرسلوا لي خطاب دعوة الفيزا الطبية خلال 24 ساعة فقط. استقبلنا سائق خاص من المطار. أجريت العملية بنجاح وبدأت المشي بمساعدة الأخصائيين خلال 24 ساعة من الجراحة! الغرسات المستخدمة معتمدة أمريكياً والتسعير كان شفافاً وبدون أي عمولات إضافية.",
    },
    {
      nameEn: "Sarah M.",
      nameAr: "سارة م.",
      age: 42,
      locationEn: "Birmingham, United Kingdom",
      locationAr: "برمنغهام، المملكة المتحدة",
      flag: "🇬🇧",
      treatmentEn: "14-Day Ayurvedic Panchakarma & Stress Management",
      treatmentAr: "برنامج علاج الأيورفيدا والبانشاكارما وتخفيف التوتر (١٤ يوماً)",
      hospitalEn: "Kottakkal Arya Vaidya Sala Partner Center",
      hospitalAr: "مركز شريك كوتاكال أريا فايديا سالا",
      savingsEn: "Complete holistic restoration at a fraction of European spa costs",
      savingsAr: "استشفاء وعلاج طبيعي متكامل بجزء بسيط من تكاليف المراكز الأوروبية",
      storyEn: "After years of high-stress corporate work in the UK, I developed chronic back pain and insomnia. I decided to experience authentic Ayurveda in its birthplace. TreatInKerala selected a beautiful green-leaf certified eco-resort for me. The BAMS doctors customized a traditional 14-day Panchakarma detox program, including daily herbal oil massages, organic vegetarian meals, and guided yoga. The coordinator arranged everything, including a relaxing backwater houseboat ride during my recovery. The results were amazing: my back pain has vanished, and my sleep cycle is fully restored. The cost was extremely affordable for the level of luxury and medical care provided.",
      storyAr: "بعد سنوات من العمل الشاق والتوتر المستمر في بريطانيا، عانيت من آلام الظهر المزمنة والأرق. قررت تجربة علاج الأيورفيدا التقليدي في موطنه الأصلي. اختار لي فريق علاج في كيرلا منتجعاً استشفائياً هادئاً. صمم لي الأطباء برنامج تنظيف خماسي (بانشاكارما) شمل جلسات تدليك يومية وأغذية عشبية وجلسات يوغا. كانت النتائج مذهلة: زالت آلام ظهري تماماً وتحسّنت جودة نومي. الخدمة ممتازة والتكلفة كانت مناسبة جداً.",
    }
  ];

  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#D4A96A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
              {isRtl ? 'النتائج والنجاحات السريرية' : 'Clinical Outcomes'}
            </span>
            <span className="h-px w-8 bg-[#D4A96A]" />
          </div>
          <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
            {isRtl ? 'سجل نجاح المستشفيات والنتائج الطبية' : 'Partner Network Success & Clinical Records'}
          </h1>
          <p className="text-lg text-text-muted font-sans">
            {isRtl
              ? 'تصفح قصص النجاح والتقارير المعتمدة للمستشفيات الشريكة في كيرلا، الهند. نضمن لك أعلى نسب نجاح سريرية.'
              : 'Explore verified clinical achievements, success rates, and advanced medical case logs across our partner facilities.'}
          </p>
        </div>

        {/* Stories Listing */}
        <div className="space-y-8 max-w-5xl mx-auto mb-20">
          {caseStudies.map((study, idx) => {
            const title = isRtl ? study.titleAr : study.titleEn;
            const category = isRtl ? study.categoryAr : study.categoryEn;
            const accreditation = isRtl ? study.accreditationAr : study.accreditationEn;
            const stats = isRtl ? study.statsAr : study.statsEn;
            const highlights = isRtl ? study.highlightsAr : study.highlightsEn;

            const bgColors = ['bg-emerald-50 text-primary-green border-emerald-100', 'bg-amber-50 text-amber-700 border-amber-100', 'bg-blue-50 text-blue-700 border-blue-100'];
            const bgColor = bgColors[idx % bgColors.length];

            return (
              <div
                key={idx}
                className="bg-white p-8 sm:p-12 border border-[#D4A96A]/15 rounded-[2.25rem] shadow-sm flex flex-col md:flex-row gap-8 items-start relative group hover:border-[#2D6A4F]/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                
                {/* Hospital Initial Badge */}
                <div className="w-full md:w-48 shrink-0 space-y-3 z-10 text-left rtl:text-right">
                  <div className={`h-16 w-16 rounded-2xl ${bgColor} border flex items-center justify-center font-bold text-xl font-display relative`}>
                    {study.initials}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary-green bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full inline-block uppercase tracking-wide">
                      ✓ {isRtl ? 'سجل طبي معتمد' : 'Verified Clinical Record'}
                    </span>
                    <p className="text-xs text-text-muted font-sans mt-2">
                      {accreditation}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 z-10 flex-1 text-left rtl:text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] font-sans block">
                    {category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-primary-dark">
                    {title}
                  </h2>
                  
                  {/* Highlighted Stats */}
                  <div className="bg-[#FAF7F2] border-l-4 border-primary-green p-4 rounded-r-xl">
                    <p className="font-bold text-[#2D6A4F] text-base font-sans">{stats}</p>
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-2 text-sm text-text-muted font-sans pt-2">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D4A96A] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <div className="pt-4">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار عن تفاصيل العلاج في: ${title}` : `Hello TreatInKerala, I would like to inquire about treatments at: ${title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm hover:shadow-md transition-all font-sans cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{isRtl ? 'استفسر عن هذا المركز' : 'Inquire About This Center'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#D4A96A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
              {isRtl ? 'تجارب المرضى الشخصية' : 'Personal Journeys'}
            </span>
            <span className="h-px w-8 bg-[#D4A96A]" />
          </div>
          <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-3xl sm:text-4xl text-[#1B4332]">
            {isRtl ? 'قصص التعافي من واقع حياة مرضانا' : 'Real Recovery Stories from Our Patients'}
          </h2>
        </div>

        {/* Patient Stories List */}
        <div className="space-y-10 max-w-5xl mx-auto mb-16">
          {patientStories.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-8 sm:p-10 border border-[#D4A96A]/15 rounded-[2.25rem] shadow-sm flex flex-col gap-6 text-left rtl:text-right hover:border-[#2D6A4F]/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.flag}</span>
                  <div>
                    <h3 className="font-bold text-lg text-primary-dark">
                      {isRtl ? p.nameAr : p.nameEn} ({p.age} {isRtl ? 'عاماً' : 'years old'})
                    </h3>
                    <p className="text-xs text-text-muted">{isRtl ? p.locationAr : p.locationEn}</p>
                  </div>
                </div>
                <div className="bg-[#FAF7F2] border border-[#D4A96A]/20 px-4 py-2 rounded-xl">
                  <p className="text-xs font-semibold text-[#D4A96A] uppercase tracking-wide">{isRtl ? 'التوفير المحقق' : 'Financial Impact'}</p>
                  <p className="text-sm font-bold text-[#2D6A4F] mt-0.5">{isRtl ? p.savingsAr : p.savingsEn}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#1B4332] text-base">{isRtl ? p.treatmentAr : p.treatmentEn}</h4>
                <p className="text-xs font-semibold text-text-muted">{isRtl ? p.hospitalAr : p.hospitalEn}</p>
              </div>

              <p className="text-sm text-text-muted font-light leading-relaxed font-sans">
                &ldquo;{isRtl ? p.storyAr : p.storyEn}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Story Submit CTA */}
        <div className="bg-primary-dark text-white rounded-3xl p-8 lg:p-12 border border-accent-gold/20 text-center space-y-6 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-[#2D6A4F]/20 to-transparent -z-10 opacity-70"></div>
          <h3 className="text-2xl sm:text-3xl font-semibold font-display">
            {locale === 'ar' ? 'هل تحتاج إلى استشارة طبية خاصة؟' : 'Need a Personalized Clinical Estimate?'}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto font-sans">
            {locale === 'ar'
              ? 'تواصل مع منسقينا لمراجعة تقاريرك الطبية من قبل اللجان المتخصصة في هذه المراكز مجاناً.'
              : 'Our coordinators can route your files directly to the clinical heads of these hospitals for a free assessment.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/get-estimate"
              className="bg-primary-green hover:bg-white hover:text-primary-green text-white font-bold px-8 py-4 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] inline-flex items-center justify-center cursor-pointer font-sans"
            >
              <span>{isRtl ? 'اطلب تقدير تكلفة مجاني' : 'Request Free Clinical Estimate'}</span>
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <MessageCircle className="h-5 w-5 text-white shrink-0" />
              <span>{locale === 'ar' ? 'تواصل معنا مباشرة' : 'Contact Coordinator'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
