import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import {
  ArrowRight,
  MessageCircle,
  ChevronDown,
  ClipboardList,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Users,
  Clock,
  TrendingDown,
  Globe,
  CalendarCheck,
  Star,
  Quote,
} from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { getFAQSchema } from '@/lib/schemas';
import CostComparison from '@/components/home/CostComparison';
import HeroSlider from '@/components/home/HeroSlider';


interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const tHero = await getTranslations({ locale, namespace: 'Hero' });
  const tFAQ = await getTranslations({ locale, namespace: 'FAQ' });

  const isRtl = locale === 'ar';

  const testimonials = [
    {
      nameEn: 'Khalid A.',
      nameAr: 'خالد ع.',
      countryEn: 'UAE — Dubai',
      countryAr: 'الإمارات — دبي',
      flagEmoji: '🇦🇪',
      treatmentEn: 'Cardiac Bypass Surgery',
      treatmentAr: 'جراحة القلب المفتوح',
      quoteEn: 'My cardiologist in Dubai quoted me AED 220,000. TreatInKerala arranged the same surgery at Aster MIMS for a fraction of that. The coordinator met me at the airport, stayed with us daily, and handled every single thing. My wife felt completely at ease. We saved over 70% and I\'m fully recovered.',
      quoteAr: 'طلب مني طبيبي في دبي 220,000 درهم. رتّب لي فريق علاج في كيرلا نفس الجراحة في مستشفى أستر بجزء بسيط من تلك التكلفة. استقبلنا المنسق في المطار وكان معنا كل يوم. وفّرنا أكثر من 70% وتعافيت تماماً.',
      saving: '70%+',
    },
    {
      nameEn: 'Emmanuel O.',
      nameAr: 'إيمانويل أو.',
      countryEn: 'Nigeria — Lagos',
      countryAr: 'نيجيريا — لاغوس',
      flagEmoji: '🇳🇬',
      treatmentEn: 'Knee Replacement',
      treatmentAr: 'استبدال الركبة',
      quoteEn: 'I had been living with severe knee pain for two years. A friend told me about TreatInKerala. Within 48 hours of sending my MRI, I had a full cost breakdown. The hospital stay was clean, the surgeons were brilliant, and the team sorted out my visa letter without any hassle. I walked without pain for the first time in years.',
      quoteAr: 'عانيت من آلام الركبة الشديدة لمدة عامين. أخبرني صديق عن علاج في كيرلا. خلال 48 ساعة من إرسال صور الأشعة، تلقيت تفاصيل التكلفة الكاملة. كان المستشفى نظيفاً والجراحون رائعين والفريق رتّب لي التأشيرة بدون أي متاعب.',
      saving: '65%+',
    },
    {
      nameEn: 'Sarah M.',
      nameAr: 'سارة م.',
      countryEn: 'United Kingdom — Birmingham',
      countryAr: 'المملكة المتحدة — برمنغهام',
      flagEmoji: '🇬🇧',
      treatmentEn: 'Ayurveda & Panchakarma',
      treatmentAr: 'الأيورفيدا والبانشاكارما',
      quoteEn: 'I came for a 14-day Panchakarma retreat after burning out completely at work. The coordinator arranged everything — the wellness resort, the Ayurvedic doctors, even a short backwater houseboat trip during my recovery week. I left feeling like a completely different person. I\'m already planning my return.',
      quoteAr: 'جئت لإجراء دورة بانشاكارما لمدة 14 يوماً بعد إرهاق شديد في العمل. رتّب المنسق كل شيء — المنتجع وأطباء الأيورفيدا وحتى رحلة بالقارب خلال أسبوع التعافي. غادرت وأنا شخص مختلف تماماً.',
      saving: 'Transformed',
    },
  ];

  const steps = [
    {
      num: '01',
      icon: ClipboardList,
      titleEn: 'Send Your Requirements',
      titleAr: 'أرسل متطلباتك الطبية',
      descEn: 'Share your medical reports via WhatsApp or our estimate form. We review within 24 hours.',
      descAr: 'شارك تقاريرك الطبية عبر واتساب أو نموذج التقدير. نراجعها خلال ٢٤ ساعة.',
    },
    {
      num: '02',
      icon: Stethoscope,
      titleEn: 'Get a Confirmed Quote',
      titleAr: 'احصل على عرض سعر مؤكد',
      descEn: 'We coordinate with NABH/JCI hospitals and send you a confirmed treatment plan with full cost breakdown.',
      descAr: 'ننسق مع المستشفيات المعتمدة ونرسل لك خطة علاجية مؤكدة مع تفاصيل التكاليف الكاملة.',
    },
    {
      num: '03',
      icon: HeartHandshake,
      titleEn: 'We Handle Everything Else',
      titleAr: 'نتولى كل شيء آخر',
      descEn: 'Visa letter, airport pickup, hotel booking, hospital admission, translator — all at zero extra charge.',
      descAr: 'خطاب التأشيرة، الاستقبال من المطار، حجز الفندق، التنسيق الطبي، المترجم — كل هذا بدون رسوم إضافية.',
    },
  ];

  const faqKeys = [1, 2, 3, 4, 5, 6, 7];

  const trustStats = [
    { numEn: '1,200+', numAr: '١٢٠٠+', labelEn: 'International Patients', labelAr: 'مريض دولي', icon: Users },
    { numEn: '60–80%', numAr: '٦٠–٨٠٪', labelEn: 'Average Cost Savings', labelAr: 'توفير في التكلفة', icon: TrendingDown },
    { numEn: 'JCI / NABH', numAr: 'JCI / NABH', labelEn: 'Accredited Partners', labelAr: 'مستشفيات شريكة معتمدة', icon: ShieldCheck },
    { numEn: '24/7', numAr: '٢٤/٧', labelEn: 'Coordinator Support', labelAr: 'دعم المنسق الطبي', icon: Clock },
  ];

  const partnerHospitals = [
    { name: 'Aster MIMS', badge: 'JCI' },
    { name: 'Baby Memorial', badge: 'NABH' },
    { name: 'Meitra Hospital', badge: 'JCI' },
    { name: 'VPS Lakeshore', badge: 'NABH' },
    { name: 'KIMS Health', badge: 'NABH' },
    { name: 'PVS Memorial', badge: 'NABH' },
  ];

  const faqs = faqKeys.map((key) => ({
    q: tFAQ(`q${key}`),
    a: tFAQ(`a${key}`),
  }));
  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="flex flex-col w-full overflow-x-hidden animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-0 lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#FAF7F2]">

        {/* Abstract morphing blob — right side */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[-8%] w-[55%] flex items-center"
        >
          <div
            className="animate-blob w-full aspect-square"
            style={{
              background: isRtl
                ? 'radial-gradient(ellipse at 70% 40%, rgba(82,183,136,0.38) 0%, rgba(45,106,79,0.22) 45%, rgba(212,169,106,0.12) 70%, transparent 100%)'
                : 'radial-gradient(ellipse at 30% 40%, rgba(82,183,136,0.38) 0%, rgba(45,106,79,0.22) 45%, rgba(212,169,106,0.12) 70%, transparent 100%)',
              filter: 'blur(72px)',
            }}
          />
        </div>

        {/* Main content — vertically centered */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 flex-grow flex items-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
            
            {/* Left Column: Premium Text & CTA (8 cols) */}
            <div className={`lg:col-span-8 flex flex-col justify-center space-y-6 sm:space-y-8 w-full ${isRtl ? 'order-1 lg:order-2 rtl:text-right' : 'order-1 lg:order-1'}`}>
              
              {/* Trust Badge / Live Status */}
              <div className={`flex items-center gap-2 text-sm animate-title-slide ${isRtl ? 'justify-start' : ''}`} style={{ animationDelay: '0ms' }}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
                </span>
                <span className="font-sans text-text-muted">
                  <span className="font-bold text-[#1B4332]">127</span>{' '}
                  {isRtl ? 'مريضاً تم خدمتهم هذا الشهر' : 'patients served this month'}
                </span>
              </div>

              <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.06] text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.75rem] max-w-4xl">
                <span className="block text-[#1B4332] animate-title-slide" style={{ animationDelay: '100ms' }}>
                  {tHero('headlineLine1')}
                </span>
                <span className="block text-[#1B4332] animate-title-slide" style={{ animationDelay: '250ms' }}>
                  {tHero('headlineLine2')}
                </span>
                <span className="block text-[#74B49B] mt-2 animate-title-slide" style={{ animationDelay: '400ms' }}>
                  {tHero('headlineLine3')}
                </span>
              </h1>

              {/* Subheadline — light weight, generous line height */}
              <p className="text-lg sm:text-xl text-text-muted font-light leading-[1.65] max-w-[540px] animate-title-slide" style={{ animationDelay: '550ms' }}>
                {tHero('subheadlineShort')}
              </p>

              {/* CTAs ─── gradient button matches Camber's style */}
              <div className={`flex flex-col sm:flex-row items-center gap-5 pt-2 animate-title-slide w-full ${isRtl ? 'sm:flex-row-reverse sm:justify-end' : ''}`} style={{ animationDelay: '700ms' }}>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-medium px-7 py-3.5 rounded-full text-base transition-all duration-300 cursor-pointer tap-active shadow-sm hover:shadow-md w-full sm:w-auto text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(186,215,176,1) 0%, rgba(154,207,136,1) 100%)',
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)',
                    color: '#2D5A27',
                  }}
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>{tCommon('whatsAppUs')}</span>
                </a>
                <Link
                  href="/get-estimate"
                  className="inline-flex items-center justify-center gap-2 text-[#2D6A4F] font-medium text-base hover:gap-3 transition-all duration-300 group w-full sm:w-auto py-2.5"
                >
                  <span>{tCommon('getEstimate')}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>
              </div>

            </div>

            {/* Right Column: Premium Visual Panel (4 cols) */}
            <div className={`lg:col-span-4 relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0 ${isRtl ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
              
              {/* Blur backdrop behind the frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#74B49B]/10 to-[#D4A96A]/10 rounded-[2.5rem] blur-xl animate-pulse" />
              
              {/* Gold decorative border offset */}
              <div className="absolute inset-0 border border-[#D4A96A]/25 rounded-[2rem] translate-x-3 translate-y-3 pointer-events-none" />

              {/* Main image container */}
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-[#FAF7F2]">
                <HeroSlider
                  isRtl={isRtl}
                  slides={[
                    { src: '/images/caring_doctor_patient_hero.png', altEn: 'Medical coordinator walking beside patient in Kerala', altAr: 'منسق طبي يرافق مريضاً في كيرلا' },
                    { src: '/images/allopathy_treatment_hero.png', altEn: 'Doctor consulting patient in a modern super-specialty hospital', altAr: 'استشارة طبيب في مستشفى تخصصي حديث' },
                    { src: '/images/ayurveda_treatment_hero.png', altEn: 'Traditional Shirodhara Ayurvedic treatment in Kerala', altAr: 'علاج الشيروداهارا الأيورفيدي التقليدي في كيرلا' },
                    { src: '/images/kerala_wellness_resort_hero.png', altEn: 'Luxury Ayurvedic wellness resort by Kerala backwaters', altAr: 'منتجع استشفائي أيورفيدي فاخر على بحيرات كيرلا' },
                  ]}
                />
              </div>

              {/* Floating Card 1: 5.0 Star Rating */}
              <div className={`hidden md:flex absolute -top-4 bg-white/95 backdrop-blur-md shadow-xl border border-emerald-50/50 rounded-2xl p-4 flex-row items-center gap-3 animate-bounce-slow z-20 ${isRtl ? 'left-4 lg:-left-6' : 'right-4 lg:-right-6'}`}>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#1B4332]">5.0</span>
                    <span className="text-xs text-text-muted">/ 5.0</span>
                  </div>
                  <p className="text-[10px] text-text-muted/85 font-medium whitespace-nowrap">
                    {isRtl ? '١٢٠٠+ قصة نجاح للمرضى' : '1,200+ global patient stories'}
                  </p>
                </div>
              </div>

              {/* Floating Card 2: Support Coordinator */}
              <div className={`hidden md:flex absolute -bottom-4 bg-white/95 backdrop-blur-md shadow-xl border border-emerald-50/50 rounded-2xl p-4 flex-row items-center gap-3 z-20 ${isRtl ? 'right-4 lg:-right-6' : 'left-4 lg:-left-6'}`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#2D6A4F] shrink-0">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B4332]">
                    {isRtl ? 'منسق شخصي مخصص' : 'Dedicated Personal Liaison'}
                  </p>
                  <p className="text-[10px] text-text-muted/85 font-medium whitespace-nowrap">
                    {isRtl ? 'مستشفيات معتمدة JCI & NABH' : 'JCI & NABH network hospitals'}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>



        {/* Partner Hospitals Marquee Ticker — also inside Hero 100vh */}
        <div className="relative z-10 py-4 border-t border-[#D4A96A]/20 bg-[#FAF7F2]/80 overflow-hidden select-none w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center gap-4 md:gap-8 justify-start w-full">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-muted/50 whitespace-nowrap shrink-0">
                {tHero('partnerLabel')}:
              </span>
              <div className="relative w-full overflow-hidden flex-1 py-1">
                {/* Fade gradient masks on left/right for smooth cutoffs */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

                {/* Scrolling content */}
                <div className={isRtl ? 'animate-ticker-rtl' : 'animate-ticker-ltr'}>
                  {/* List repeated 3 times to guarantee smooth infinite scroll */}
                  {Array.from({ length: 3 }).map((_, repeatIdx) => (
                    <div key={repeatIdx} className="flex items-center gap-12 pr-12 rtl:pr-0 rtl:pl-12">
                      {[
                        'Aster MIMS',
                        'Baby Memorial',
                        'Meitra Hospital',
                        'VPS Lakeshore',
                        'KIMS Health',
                        'PVS Memorial',
                      ].map((name) => (
                        <span
                          key={`${repeatIdx}-${name}`}
                          className="text-sm font-medium text-[#4A4A6A]/45 hover:text-[#2D6A4F] transition-colors duration-200 cursor-default whitespace-nowrap"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. WHY KERALA ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF7F2] overflow-hidden border-b border-[#D4A96A]/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

          {/* LEFT — Full bleed image with overlay cards */}
          <div className={`relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-full ${isRtl ? 'order-2' : 'order-1'}`}>
            <Image
              src="/images/kerala_hero_bg.png"
              alt={isRtl ? 'مناظر كيرلا الطبيعية الخلابة' : 'Kerala backwaters at golden hour'}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Gradient overlay — darkens toward right for text transition */}
            <div className={`absolute inset-0 ${isRtl
              ? 'bg-gradient-to-l from-[#1B4332]/60 via-[#1B4332]/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#1B4332]/20 to-[#1B4332]/60'
            }`} />

            {/* Bottom gradient for floating cards */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0D2B1F]/70 to-transparent" />

            {/* Floating stat pills — bottom of image */}
            <div className="absolute bottom-6 left-6 right-6 rtl:left-6 rtl:right-6 flex flex-wrap gap-3">
              {[
                { numEn: '60–80%', numAr: '٦٠–٨٠٪', labelEn: 'Cost Savings', labelAr: 'توفير في التكلفة' },
                { numEn: 'JCI & NABH', numAr: 'JCI & NABH', labelEn: 'Accredited', labelAr: 'معتمد دولياً' },
                { numEn: '1,200+', numAr: '١٢٠٠+', labelEn: 'Patients Helped', labelAr: 'مريض خدمناهم' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-4 py-2 shadow-lg"
                >
                  <span className="text-white font-bold text-sm font-display">{isRtl ? s.numAr : s.numEn}</span>
                  <span className="text-white/70 text-[11px] font-medium">{isRtl ? s.labelAr : s.labelEn}</span>
                </div>
              ))}
            </div>

            {/* Top-left location badge */}
            <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D4A96A] shrink-0" />
              <span className="text-white text-xs font-semibold tracking-wide">
                {isRtl ? 'كيرلا، جنوب الهند' : 'Kerala, South India'}
              </span>
            </div>
          </div>

          {/* RIGHT — Premium content panel */}
          <div className={`relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20 bg-[#FAF7F2] ${isRtl ? 'order-1 text-right' : 'order-2'}`}>

            {/* Subtle decorative circle */}
            <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-72 h-72 rounded-full bg-[#2D6A4F]/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 rtl:flex-row-reverse rtl:justify-end">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A]">
                {isRtl ? 'لماذا كيرلا؟' : 'Why Kerala?'}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332] mb-6">
              {isRtl
                ? <>رعاية طبية <span className="text-[#74B49B]">عالمية</span>، بتكلفة أقل بنسبة <span className="text-[#74B49B]">60–80%</span>.</>
                : <>World-class care, at <span className="text-[#74B49B]">60–80%</span> lower cost.</>
              }
            </h2>

            {/* Body */}
            <p className="text-text-muted font-light leading-[1.75] text-base sm:text-[17px] mb-8 max-w-lg">
              {isRtl
                ? 'تجمع كيرلا بين أعلى معايير السلامة في المستشفيات المعتمدة دولياً (JCI / NABH) وتكاليف تقل بنسبة تصل إلى 80% مقارنة بالمملكة المتحدة والولايات المتحدة ودول الخليج — دون أي تنازل على جودة الرعاية.'
                : 'Kerala unites the highest international hospital accreditation standards (JCI & NABH) with treatment costs up to 80% lower than the UK, US, or GCC — without compromising care quality by a single measure.'}
            </p>

            {/* Feature rows */}
            <div className="space-y-4 mb-10">
              {[
                {
                  en: '100% free coordination — you pay hospitals directly, zero markup.',
                  ar: 'تنسيق مجاني 100% — تدفع للمستشفى مباشرة بدون أي رسوم خفية.',
                  icon: '✦',
                },
                {
                  en: 'Personal coordinator from first consultation to safe return home.',
                  ar: 'منسق شخصي من الاستشارة الأولى حتى عودتك سالماً إلى وطنك.',
                  icon: '✦',
                },
                {
                  en: 'Arabic-speaking interpreters. Medical visa assistance included.',
                  ar: 'مترجمون عرب متخصصون. مساعدة تأشيرة علاجية شاملة.',
                  icon: '✦',
                },
              ].map((f, i) => (
                <div key={i} className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[#D4A96A] text-xs mt-1 shrink-0">{f.icon}</span>
                  <p className="text-[#4A5C52] text-sm leading-relaxed">
                    {isRtl ? f.ar : f.en}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
              <Link
                href="/why-kerala"
                className="inline-flex items-center gap-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <span>{isRtl ? 'اكتشف لماذا كيرلا' : 'Discover Why Kerala'}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/get-estimate"
                className="text-[#2D6A4F] text-sm font-medium hover:text-[#1B4332] transition-colors duration-200 underline underline-offset-4 decoration-[#D4A96A]/50 hover:decoration-[#D4A96A]"
              >
                {isRtl ? 'احصل على تقدير مجاني' : 'Get free estimate'}
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ─── 4. HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] border-y border-[#D4A96A]/20 relative overflow-hidden">
        
        {/* Decorative ambient leaf circle */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#2D6A4F]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Section Header */}
          <div className="mb-16 space-y-4 rtl:text-right max-w-3xl">
            <div className="flex items-center gap-3 rtl:flex-row-reverse rtl:justify-end">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A]">
                {isRtl ? 'خطوات التنسيق' : 'Coordination Process'}
              </span>
            </div>
            
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
              {isRtl ? 'كيف نرتب علاجك؟ ثلاث خطوات بسيطة.' : 'How we coordinate your medical journey.'}
            </h2>
            
            <p className="text-text-muted font-light leading-[1.75] text-base sm:text-lg max-w-2xl">
              {isRtl
                ? 'ثلاث خطوات فقط تفصلك عن الحصول على رعاية طبية بمستوى عالمي في كيرلا.'
                : 'Three straightforward stages stand between you and premium accredited healthcare.'}
            </p>
          </div>

          {/* Cards Grid with Connecting Path */}
          <div className="relative">
            
            {/* Connecting Line — Desktop Only */}
            <div className="hidden md:block absolute top-[60px] left-[12%] right-[12%] h-0.5 border-t border-dashed border-[#D4A96A]/30 z-0" />

            <div className="flex overflow-x-auto no-scrollbar scroll-momentum snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-8 sm:gap-12 relative z-10 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0" dir={isRtl ? 'rtl' : 'ltr'}>
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-white border border-[#D4A96A]/15 rounded-[2.25rem] p-8 flex flex-col gap-8 hover:border-[#2D6A4F]/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group snap-start shrink-0 w-[85vw] md:w-auto"
                  >
                    <div className="flex items-center justify-between w-full">
                      {/* Number Indicator Pill */}
                      <span className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#D4A96A] border border-[#D4A96A]/25 flex items-center justify-center text-xs font-semibold font-display shadow-inner">
                        {step.num}
                      </span>
                      {/* Premium Double Circle Icon Holder */}
                      <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] text-[#2D6A4F] border border-[#2D6A4F]/10 flex items-center justify-center shrink-0 shadow-sm relative group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="space-y-3 text-left rtl:text-right">
                      <h3 className="text-xl font-display font-normal text-[#1B4332] tracking-tight">
                        {isRtl ? step.titleAr : step.titleEn}
                      </h3>
                      <p className="text-[#4A5C52] text-sm font-light leading-relaxed">
                        {isRtl ? step.descAr : step.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium CTA Button */}
          <div className="mt-16 text-center relative z-10">
            <Link
              href="/get-estimate"
              className="inline-flex items-center gap-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-medium text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <span>{isRtl ? 'بدء التنسيق الطبي مجاناً' : 'Begin Free Coordination'}</span>
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. OUR COMMITMENTS (BENTO GRID) ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#D4A96A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-3 rtl:text-right">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 rtl:flex-row-reverse rtl:justify-end">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A]">
                {isRtl ? 'التزاماتنا' : 'Our Commitments'}
              </span>
            </div>
            {/* Title */}
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
              {isRtl ? 'نظام دعم متكامل لرحلتك العلاجية' : 'A complete support system for your medical journey'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* CARD 1: Zero Hidden Fees (Top Left - 5 cols) */}
            <div className="col-span-1 md:col-span-5 bg-[#F4F6F5] rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10 space-y-2 mb-20">
                <h3 className="text-[22px] font-medium text-[#2C3E35]">
                  {isRtl ? 'لا رسوم خفية' : 'Zero Hidden Fees'}
                </h3>
                <p className="text-[#5D6B64] text-sm leading-relaxed max-w-[240px]">
                  {isRtl ? 'تدفع للمستشفى مباشرة. التنسيق مجاني كلياً وبدون أي عمولات.' : 'You pay hospitals directly. Our coordination is 100% complimentary.'}
                </p>
              </div>
              
              <div className="flex items-end justify-end mt-8 relative z-10 w-full rtl:flex-row-reverse">
                {/* Large Background Vector */}
                <div className="h-32 w-32 opacity-[0.06] text-[#2D6A4F] pointer-events-none absolute -bottom-6 -left-4 rtl:-right-4 rtl:-left-auto group-hover:scale-[1.2] group-hover:-rotate-12 transition-all duration-700 ease-out origin-bottom-left">
                  <ShieldCheck className="w-full h-full" strokeWidth={1.5} />
                </div>
                
                {/* 100% Text */}
                <div className="flex items-baseline gap-1 text-right rtl:text-left">
                  <span className="text-[#A4B2AA] text-[56px] leading-none font-light tracking-tighter">100</span>
                  <span className="text-[#A4B2AA] text-3xl font-light leading-none">%</span>
                  <span className="text-[#84948B] text-[10px] font-medium tracking-wider uppercase ml-2 mb-2 rtl:ml-0 rtl:mr-2">
                    {isRtl ? 'شفافية' : 'TRANSPARENT'}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2: 35+ Countries Served (Top Right - 7 cols) */}
            <div className="col-span-1 md:col-span-7 bg-[#F4F6F5] rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10 space-y-2 mb-20">
                <h3 className="text-[22px] font-medium text-[#2C3E35]">
                  {isRtl ? '٣٥+ دولة خدمناها' : '35+ Countries Served'}
                </h3>
                <p className="text-[#5D6B64] text-sm leading-relaxed max-w-[280px]">
                  {isRtl ? 'أكثر من ١٢٠٠ مريض دولي وثقوا بنا لتلقي العلاج في كيرلا.' : '1,200+ international patients have trusted us for their treatment.'}
                </p>
              </div>

              <div className="flex items-end justify-end mt-8 relative z-10 w-full rtl:flex-row-reverse">
                {/* Large Background Vector */}
                <div className="h-32 w-32 opacity-[0.06] text-[#2D6A4F] pointer-events-none absolute -bottom-6 -left-4 rtl:-right-4 rtl:-left-auto group-hover:scale-[1.2] group-hover:rotate-[25deg] transition-all duration-700 ease-out origin-bottom-left">
                  <Globe className="w-full h-full" strokeWidth={1.5} />
                </div>

                {/* 1,200+ Text */}
                <div className="flex items-baseline gap-1.5 text-right rtl:text-left">
                  <span className="text-[#A4B2AA] text-[56px] leading-none font-light tracking-tighter">1,200</span>
                  <span className="text-[#A4B2AA] text-3xl font-light leading-none">+</span>
                  <span className="text-[#84948B] text-[10px] font-medium tracking-wider uppercase ml-2 mb-2 rtl:ml-0 rtl:mr-2">
                    {isRtl ? 'مريض دولي' : 'GLOBAL PATIENTS'}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 3: Free Rebooking (Bottom Left - 6 cols) */}
            <div className="col-span-1 md:col-span-6 bg-[#F4F6F5] rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10 space-y-2 mb-20">
                <h3 className="text-[22px] font-medium text-[#2C3E35]">
                  {isRtl ? 'إعادة جدولة مجانية' : 'Free Rebooking'}
                </h3>
                <p className="text-[#5D6B64] text-sm leading-relaxed max-w-[280px]">
                  {isRtl ? 'أي مضاعفات أو تأخير في السفر؟ نعيد الترتيب بدون أي تكلفة إضافية.' : 'Any travel complications? We rearrange everything at zero extra charge.'}
                </p>
              </div>

              <div className="flex items-end justify-end mt-8 relative z-10 w-full rtl:flex-row-reverse">
                {/* Large Background Vector */}
                <div className="h-32 w-32 opacity-[0.06] text-[#2D6A4F] pointer-events-none absolute -bottom-6 -left-4 rtl:-right-4 rtl:-left-auto group-hover:scale-[1.2] group-hover:-rotate-12 transition-all duration-700 ease-out origin-bottom-left">
                  <CalendarCheck className="w-full h-full" strokeWidth={1.5} />
                </div>

                {/* $0 Text */}
                <div className="flex items-baseline gap-1.5 text-right rtl:text-left">
                  <span className="text-[#A4B2AA] text-[56px] leading-none font-light tracking-tighter">$0</span>
                  <span className="text-[#84948B] text-[10px] font-medium tracking-wider uppercase ml-2 mb-2 rtl:ml-0 rtl:mr-2">
                    {isRtl ? 'رسوم التعديل' : 'CHANGE FEES'}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 4: 30-Day Post-Care (Bottom Right - 6 cols) */}
            <div className="col-span-1 md:col-span-6 bg-[#F4F6F5] rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10 space-y-2 mb-20">
                <h3 className="text-[22px] font-medium text-[#2C3E35]">
                  {isRtl ? '٣٠ يوم رعاية' : '30-Day Post-Care'}
                </h3>
                <p className="text-[#5D6B64] text-sm leading-relaxed max-w-[260px]">
                  {isRtl ? 'متابعة طبية دقيقة عبر واتساب لمدة ٣٠ يوماً بعد عودتك سالماً لبلدك.' : 'Dedicated WhatsApp follow-up for 30 days after you return home.'}
                </p>
              </div>

              <div className="flex items-end justify-end mt-8 relative z-10 w-full rtl:flex-row-reverse">
                {/* Large Background Vector */}
                <div className="h-32 w-32 opacity-[0.06] text-[#2D6A4F] pointer-events-none absolute -bottom-6 -left-4 rtl:-right-4 rtl:-left-auto group-hover:scale-[1.2] group-hover:-rotate-12 transition-all duration-700 ease-out origin-bottom-left">
                  <HeartHandshake className="w-full h-full" strokeWidth={1.5} />
                </div>

                <div className="flex items-baseline gap-1.5 text-right rtl:text-left">
                  <span className="text-[#A4B2AA] text-[56px] leading-none font-light tracking-tighter">30</span>
                  <span className="text-[#84948B] text-[10px] font-medium tracking-wider uppercase ml-2 mb-2 rtl:ml-0 rtl:mr-2">
                    {isRtl ? 'يوم متابعة' : 'DAYS SUPPORT'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── 7b. PATIENT TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#D4A96A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-3 rtl:text-right">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 rtl:flex-row-reverse rtl:justify-end">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A]">
                {isRtl ? 'قصص المرضى' : 'Patient Experiences'}
              </span>
            </div>
            {/* Title */}
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
              {isRtl ? 'ماذا يقول مرضانا؟' : 'Heard from our patients'}
            </h2>
            <p className="text-text-muted font-light leading-[1.65] text-base sm:text-lg max-w-2xl">
              {isRtl
                ? 'تجارب حقيقية من مرضى سافروا من جميع أنحاء العالم للعلاج في كيرلا.'
                : 'Real experiences from patients who travelled from across the world for treatment in Kerala.'}
            </p>
          </div>

          <div className="flex overflow-x-auto no-scrollbar scroll-momentum snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0" dir={isRtl ? 'rtl' : 'ltr'}>
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#F5F8F4] rounded-[24px] p-7 flex flex-col gap-5 border border-[#E8EDE6] hover:border-[#2D6A4F]/25 hover:shadow-lg transition-all duration-300 group rtl:text-right snap-start shrink-0 w-[85vw] md:w-auto">
                {/* Stars */}
                <div className="flex gap-1 rtl:flex-row-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#D4A96A] text-[#D4A96A]" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 rtl:-right-1 rtl:left-auto h-8 w-8 text-[#2D6A4F]/10 shrink-0" />
                  <p className="text-[#2C3E35] text-sm leading-relaxed font-light pl-6 rtl:pl-0 rtl:pr-6">
                    {isRtl ? t.quoteAr : t.quoteEn}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-[#E8EDE6] flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#1B4332] text-sm">
                      {t.flagEmoji} {isRtl ? t.nameAr : t.nameEn}
                    </p>
                    <p className="text-[11px] text-text-muted/70 mt-0.5">{isRtl ? t.countryAr : t.countryEn}</p>
                    <p className="text-[11px] font-medium text-[#2D6A4F] mt-0.5">{isRtl ? t.treatmentAr : t.treatmentEn}</p>
                  </div>
                  <div className="text-right rtl:text-left shrink-0">
                    <span className="text-xl font-bold text-[#2D6A4F] font-display">{t.saving}</span>
                    <p className="text-[10px] text-text-muted/60 uppercase tracking-wide">{isRtl ? 'توفير' : 'saved'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium text-base hover:gap-3 transition-all duration-300 group"
            >
              <span>{isRtl ? 'قراءة المزيد من القصص' : 'Read more patient stories'}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#D4A96A]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-3 rtl:text-right">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 rtl:flex-row-reverse rtl:justify-end">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A]">
                {isRtl ? 'الأسئلة الشائعة' : 'Support FAQ'}
              </span>
            </div>
            {/* Title */}
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
              {isRtl ? 'لديك أسئلة؟ لدينا إجابات.' : 'Have questions? We have answers.'}
            </h2>
            {/* Description */}
            <p className="text-text-muted font-light leading-[1.65] text-base sm:text-lg max-w-2xl">
              {tFAQ('subheading')}
            </p>
          </div>

          <div className="divide-y divide-[#E8EDE6]">
            {faqKeys.map((key) => (
              <details
                key={key}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4 focus:outline-hidden min-h-[44px]">
                  <h3 className="text-base sm:text-lg font-medium text-primary-dark transition-colors duration-300 group-hover:text-[#2D6A4F] text-left rtl:text-right">
                    {tFAQ(`q${key}`)}
                  </h3>
                  <ChevronDown className="h-4.5 w-4.5 text-text-muted/60 transition-transform duration-300 group-open:-rotate-180 shrink-0" />
                </summary>
                <p className="mt-2 text-text-muted font-light leading-[1.65] text-sm sm:text-base text-left rtl:text-right">
                  {tFAQ(`a${key}`)}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium text-base hover:gap-3 transition-all duration-300 group"
            >
              <span>{isRtl ? 'عرض جميع الأسئلة' : 'View all FAQs'}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 9. FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#F5F8F4] border-t border-[#D4A96A]/20 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#D4A96A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
              {isRtl ? 'ابدأ اليوم' : 'Get Started'}
            </span>
            <span className="h-px w-8 bg-[#D4A96A]" />
          </div>

          {/* Two-tone Heading */}
          <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
            {isRtl ? 'هل أنت مستعد لبدء رحلتك العلاجية؟' : 'Ready to start your healing journey?'}
          </h2>

          {/* Subtitle */}
          <p className="text-text-muted font-light leading-[1.65] text-base sm:text-lg max-w-xl mx-auto">
            {isRtl
              ? 'تحدث مباشرة مع منسقنا الطبي الآن. نرد خلال دقائق ونساعدك في ترتيب كل التفاصيل.'
              : 'Chat directly with our medical coordinator now. We respond within minutes to help you organize every detail.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-medium px-8 py-4 rounded-full text-base transition-all duration-300 cursor-pointer tap-active shadow-sm hover:shadow-md"
              style={{
                background: 'linear-gradient(135deg, rgba(186,215,176,1) 0%, rgba(154,207,136,1) 100%)',
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)',
                color: '#2D5A27',
              }}
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span>{tCommon('whatsAppUs')}</span>
            </a>
            <Link
              href="/get-estimate"
              className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium text-base hover:gap-3 transition-all duration-300 group"
            >
              <span>{tCommon('getEstimate')}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="pt-4">
            <Link
              href="/faq"
              className="text-[#74B49B] hover:text-[#2D6A4F] font-medium text-sm font-sans underline transition-colors"
            >
              {isRtl ? 'لديك استفسارات أخرى؟ اقرأ الأسئلة الشائعة ←' : 'Still researching? Read our FAQ →'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
