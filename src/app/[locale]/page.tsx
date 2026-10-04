import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import {
  ArrowRight,
  MessageCircle,
  ChevronDown,
  ShieldCheck,
  Building2,
  HeartHandshake,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { getFAQSchema } from '@/lib/schemas';
import HeroSlider from '@/components/home/HeroSlider';
import TreatmentCostCarousel from '@/components/home/TreatmentCostCarousel';
import HowItWorksStepper from '@/components/home/HowItWorksStepper';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? 'العلاج في كيرلا والسياحة العلاجية | رعاية صحية عالمية بمستشفيات معتمدة | TreatInKerala'
    : 'Treatment in Kerala | Kerala Medical Tourism & Surgery | TreatInKerala';

  const description = isAr
    ? 'تربطك علاج في كيرلا بأفضل مستشفيات كيرلا المعتمدة دولياً، وكبار الجراحين، ومراكز الأيورفيدا الأصلية. خدمات استقبال وتنسيق طبي وتأشيرات واستشارة مجانية.'
    : 'TreatInKerala connects international patients to Kerala\'s best JCI-accredited hospitals, renowned surgeons, and authentic Ayurveda centres. Complete medical concierge with zero markup.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.treatinkerala.com/${locale}`,
      languages: {
        en: 'https://www.treatinkerala.com/en',
        ar: 'https://www.treatinkerala.com/ar',
        'x-default': 'https://www.treatinkerala.com/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.treatinkerala.com/${locale}`,
      siteName: 'TreatInKerala',
      locale: isAr ? 'ar_AR' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.treatinkerala.com/images/caring_doctor_patient_hero.png',
          width: 800,
          height: 1000,
          alt: title,
        },
      ],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const tHero = await getTranslations({ locale, namespace: 'Hero' });
  const tFAQ = await getTranslations({ locale, namespace: 'FAQ' });

  const isRtl = locale === 'ar';

  const testimonials = [
    {
      nameEn: 'Khalid Al-Mansouri',
      nameAr: 'خالد المنصوري',
      countryEn: 'Dubai, UAE',
      countryAr: 'دبي، الإمارات',
      flagEmoji: '🇦🇪',
      treatmentEn: 'Cardiac Bypass Surgery',
      treatmentAr: 'جراحة القلب المفتوح',
      hospitalEn: 'Aster MIMS Hospital',
      hospitalAr: 'مستشفى أستر ميمز',
      savingsEn: 'Saved 70% vs Dubai private clinic',
      savingsAr: 'وفّر ٧٠٪ مقارنة بتكاليف دبي',
      quoteEn: 'My private quote in Dubai was AED 220,000. TreatInKerala arranged everything at Aster MIMS with senior surgeons at a fraction of that. Coordinator was with us from Calicut airport to discharge.',
      quoteAr: 'كانت التكلفة في دبي تتجاوز 220 ألف درهم. رتّب لي فريق علاج في كيرلا كل شيء في أستر ميمز مع كبار الجراحين بتوفير هائل. رافقنا المنسق من لحظة وصولنا حتى مغادرتنا.',
    },
    {
      nameEn: 'Emmanuel Okafor',
      nameAr: 'إيمانويل أوكافور',
      countryEn: 'Lagos, Nigeria',
      countryAr: 'لاغوس، نيجيريا',
      flagEmoji: '🇳🇬',
      treatmentEn: 'Bilateral Knee Replacement',
      treatmentAr: 'استبدال مفصلي الركبة',
      hospitalEn: 'Baby Memorial Hospital',
      hospitalAr: 'مستشفى بيبي ميموريال',
      savingsEn: 'Walking pain-free within 48 hours',
      savingsAr: 'استعادة الحركة بدون ألم خلال 48 ساعة',
      quoteEn: 'Within 24 hours of sharing my knee scans, I received an official surgical plan. The hospital was spotless, medical visa arrived in 3 days, and I was walking comfortably before flying home.',
      quoteAr: 'خلال 24 ساعة من إرسال الأشعة، استلمت خطة جراحية رسمية. المستشفى راقٍ جداً، والتأشيرة صدرت في 3 أيام، وعدت أمشي بصحة كاملة.',
    },
    {
      nameEn: 'Sarah Mitchell',
      nameAr: 'سارة ميتشل',
      countryEn: 'London, UK',
      countryAr: 'لندن، المملكة المتحدة',
      flagEmoji: '🇬🇧',
      treatmentEn: 'Ayurvedic Panchakarma & Detox',
      treatmentAr: 'علاج الأيورفيدا والبانشاكارما',
      hospitalEn: 'Kottakkal Arya Vaidya Sala Partner',
      hospitalAr: 'مركز كوتاكال الشريك',
      savingsEn: '21-day restorative retreat',
      savingsAr: 'إقامة استشفائية وتجدد كامل لـ ٢١ يوماً',
      quoteEn: 'Suffering from chronic exhaustion, the 14-day residential detox in Kerala was life-changing. Personalized herbal protocols, gentle consultations, and peaceful backwater recovery.',
      quoteAr: 'بعد معاناتي مع الإرهاق المزمن، كانت رحلة العلاج في كيرلا تجربة فارقة. علاجات عشبية مخصصة، رعاية فائقة، وهدوء طبيعي لا مثيل له.',
    },
  ];

  const faqKeys = [1, 2, 3, 4, 5];

  const partnerHospitals = [
    { name: 'Aster MIMS', badge: 'JCI Accredited' },
    { name: 'Baby Memorial Hospital', badge: 'NABH Super Specialty' },
    { name: 'Meitra Hospital', badge: 'JCI Accredited' },
    { name: 'VPS Lakeshore', badge: 'NABH Accredited' },
    { name: 'KIMS Health', badge: 'NABH Accredited' },
  ];

  const faqs = faqKeys.map((key) => ({
    q: tFAQ(`q${key}`),
    a: tFAQ(`a${key}`),
  }));
  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[#FAF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── 1. HERO: SPACIOUS, CONFIDENT, LUXURY CONCIERGE ────────────────── */}
      <section className="relative w-full pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-[#D4A96A]/15">
        {/* Soft atmospheric ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-0 w-[50vw] max-w-[600px] h-[500px] bg-gradient-to-bl from-emerald-100/50 via-[#D4A96A]/10 to-transparent blur-3xl rounded-full"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left rtl:text-right space-y-6 sm:space-y-8">
              
              {/* Refined Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D4A96A]/30 text-[#8C6D37] text-xs font-semibold tracking-wide w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>{isRtl ? 'السياحة العلاجية والاستشفاء في كيرلا' : 'Kerala Medical Concierge & Surgery'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-normal tracking-[-0.03em] text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-[#1B4332] leading-[1.12]">
                {isRtl ? (
                  <>
                    رعاية طبية راقية، <br />
                    تنظيم دقيق، <span className="text-[#2D6A4F]">وراحة بال تامة.</span>
                  </>
                ) : (
                  <>
                    Every step coordinated. <br />
                    Every detail handled. <br />
                    <span className="text-[#2D6A4F]">You focus on healing.</span>
                  </>
                )}
              </h1>

              {/* Concise Subheadline with plenty of breathing room */}
              <p className="text-base sm:text-lg text-[#4A5C52] leading-relaxed max-w-xl">
                {isRtl
                  ? 'نربطك مباشرة بكبار الجراحين والمستشفيات المعتمدة دولياً في كيرلا. أسعار رسمية من المستشفى بدون أي هوامش، ومرافقة شخصية طوال رحلتك.'
                  : 'We connect you directly to Kerala\'s premier JCI & NABH accredited hospitals and renowned surgeons. Direct hospital billing, zero markups, and personal bedside care.'}
              </p>

              {/* Focused Conversion Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                    isRtl
                      ? 'مرحباً، أود استشارة منسق طبي حول العلاج في كيرلا.'
                      : 'Hello, I would like to consult with a medical coordinator regarding treatment in Kerala.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold bg-[#1B4332] hover:bg-[#2D6A4F] text-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
                  </span>
                  <MessageCircle className="h-5 w-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>{tCommon('whatsAppUs')}</span>
                </a>

                <Link
                  href="/get-estimate"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold bg-white border border-[#D4A96A]/40 text-[#1B4332] hover:bg-slate-50 transition-all duration-300 shadow-xs hover:shadow-sm"
                >
                  <span>{tCommon('getEstimate')}</span>
                  <ArrowRight className={`h-4 w-4 text-[#D4A96A] ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* 3 Core Trust Reassurances (Clean, Minimalist, No Clutter) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1B4332]/10 text-xs sm:text-[13px] text-[#4A5C52]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#2D6A4F] shrink-0" />
                  <span className="font-medium">{isRtl ? 'مستشفيات JCI و NABH معتمدة' : 'JCI & NABH Hospitals'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#2D6A4F] shrink-0" />
                  <span className="font-medium">{isRtl ? 'دفع مباشر بدون أي عمولات' : 'Direct Billing (0% Markup)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-[#2D6A4F] shrink-0" />
                  <span className="font-medium">{isRtl ? 'مرافقة ومترجم شخصي مخصص' : 'Personal Care Liaison'}</span>
                </div>
              </div>

            </div>

            {/* Right Visual Panel: Clean and Uncluttered */}
            <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-white">
                <HeroSlider
                  isRtl={isRtl}
                  slides={[
                    {
                      src: '/images/allopathy_treatment_hero.png',
                      altEn: 'Doctor consulting patient in a modern super-specialty hospital',
                      altAr: 'استشارة طبيب في مستشفى تخصصي حديث',
                      tagEn: 'Modern Super-Specialty Surgery',
                      tagAr: 'مستشفيات التخصصات الجراحية الدقيقة',
                    },
                    {
                      src: '/images/caring_doctor_patient_hero.png',
                      altEn: 'Medical coordinator walking beside patient in Kerala',
                      altAr: 'منسق طبي يرافق مريضاً في كيرلا',
                      tagEn: 'Dedicated Personal Liaison',
                      tagAr: 'مرافقة وتنسيق شخصي متكامل',
                    },
                    {
                      src: '/images/ayurveda_treatment_hero.png',
                      altEn: 'Traditional Ayurvedic treatment in Kerala',
                      altAr: 'علاج الأيورفيدا التقليدي في كيرلا',
                      tagEn: 'Authentic NABH Ayurveda',
                      tagAr: 'أيورفيدا أصلية معتمدة',
                    },
                    {
                      src: '/images/kerala_wellness_resort_hero.png',
                      altEn: 'Luxury wellness resort by Kerala backwaters',
                      altAr: 'منتجع استشفائي أيورفيدي فاخر على بحيرات كيرلا',
                      tagEn: 'Serene Healing Environment',
                      tagAr: 'نقاهة هادئة على قنوات كيرلا',
                    },
                  ]}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Discreet Partner Hospitals Trust Strip */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-[#D4A96A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.15em] text-[#8C6D37] font-semibold">
                {isRtl ? 'المستشفيات الشريكة المعتمدة:' : 'Accredited Hospital Network:'}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                {partnerHospitals.map((h) => (
                  <span
                    key={h.name}
                    className="text-xs sm:text-sm font-semibold text-[#1B4332] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A96A]/20 shadow-2xs"
                  >
                    {h.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. TOP PROCEDURES & TRANSPARENT SAVINGS ───────────────────────── */}
      <TreatmentCostCarousel />

      {/* ─── 3. WHY KERALA: SERENE SPLIT WITH BREATHING ROOM ───────────────── */}
      <section className="relative bg-[#FAF7F2] overflow-hidden border-b border-[#D4A96A]/15 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left — High-end serene photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[1] rounded-3xl overflow-hidden shadow-xl border border-white/80">
                <Image
                  src="/images/kerala_hero_bg.png"
                  alt={isRtl ? 'مناظر كيرلا الخلابة' : 'Kerala tranquil backwaters'}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-semibold">
                  <span>{isRtl ? 'كيرلا، جنوب الهند — رعاية صحية في أحضان الطبيعة' : 'Kerala, South India — Healing in Nature'}</span>
                </div>
              </div>
            </div>

            {/* Right — Clear, spacious value proposition */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left rtl:text-right">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6D37] block">
                {isRtl ? 'لماذا يختار المرضى كيرلا؟' : 'Why International Patients Choose Kerala'}
              </span>

              <h2 className="font-display font-normal tracking-[-0.03em] text-2xl sm:text-4xl text-[#1B4332] leading-tight">
                {isRtl ? (
                  <>رعاية طبية تضاهي المعايير الدولية، <br />بتكلفة أقل بنسبة تصل إلى ٨٠٪.</>
                ) : (
                  <>World-class surgery and healing, <br />at 60–80% lower cost.</>
                )}
              </h2>

              <p className="text-base text-[#4A5C52] leading-relaxed">
                {isRtl
                  ? 'تجمع كيرلا بين أعلى معايير الجودة في المستشفيات المعتمدة من JCI و NABH، وأمهر الأطباء الحاصلين على زمالات بريطانية وأمريكية، مع بيئة استشفائية طبيعية هادئة تسرع التعافي.'
                  : 'Kerala unites internationally accredited hospitals (JCI & NABH) and western-trained surgeons with an authentic healing environment — eliminating long waiting lists while reducing procedure costs by up to 80%.'}
              </p>

              {/* 3 Key Value Points (Clean, Spacious) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#D4A96A]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#2D6A4F]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1B4332]">
                      {isRtl ? 'مستشفيات معتمدة دولياً بدون قوائم انتظار' : 'Zero Wait Times at JCI & NABH Hospitals'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A5C52] mt-0.5">
                      {isRtl
                        ? 'مراكز تخصصية رائدة مزودة بأحدث تقنيات الجراحة الروبوتية والقسطرة.'
                        : 'Immediate admission for surgeries and specialized care with advanced robotic infrastructure.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#D4A96A]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#2D6A4F]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1B4332]">
                      {isRtl ? 'دفع مباشر للمستشفى بشفافية تامة' : 'Direct Hospital Rates — Zero Markups'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A5C52] mt-0.5">
                      {isRtl
                        ? 'خدمات التنسيق مجانية تماماً للمرضى؛ تدفع فواتيرك للمستشفى مباشرة.'
                        : 'Our coordination is 100% free to patients. You settle all fees directly with the hospital.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#D4A96A]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#2D6A4F]">
                    <HeartHandshake className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1B4332]">
                      {isRtl ? 'منسق ومترجم شخصي بجانبك دائماً' : 'Personal Arabic & English Liaison'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A5C52] mt-0.5">
                      {isRtl
                        ? 'استقبال المطار، ترتيب السكن والمواصلات، ومرافقة طبية يومية في المستشفى.'
                        : 'Airport pickup, visa assistance, and continuous bedside support throughout your stay.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <Link
                  href="/why-kerala"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] hover:text-[#2D6A4F] transition-colors"
                >
                  <span>{isRtl ? 'تعرف أكثر على منظومة الرعاية في كيرلا' : 'Learn more about healthcare in Kerala'}</span>
                  <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. HOW IT WORKS: STREAMLINED 3-STEP JOURNEY ──────────────────── */}
      <HowItWorksStepper />

      {/* ─── 5. REAL PATIENT EXPERIENCES (ELEGANT & SCANNABLE) ─────────────── */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#D4A96A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6D37] block">
              {isRtl ? 'تجارب المرضى' : 'Patient Stories'}
            </span>
            <h2 className="font-display font-normal tracking-[-0.03em] text-2xl sm:text-4xl text-[#1B4332] leading-tight">
              {isRtl ? 'قصص تعافي حقيقية من حول العالم' : 'Trusted by Patients Across the World'}
            </h2>
            <p className="text-base text-[#4A5C52]">
              {isRtl
                ? 'تجارب حقيقية لمرضى وثقوا في منظومة الرعاية الصحية في كيرلا.'
                : 'Real experiences from patients who traveled to Kerala for life-changing surgery and recovery.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#1B4332]/8 flex flex-col justify-between rtl:text-right"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D4A96A] text-[#D4A96A]" />
                    ))}
                  </div>

                  {/* Patient Quote */}
                  <p className="text-sm sm:text-base text-[#2E3D35] leading-relaxed italic mb-6">
                    &ldquo;{isRtl ? t.quoteAr : t.quoteEn}&rdquo;
                  </p>
                </div>

                {/* Patient Details & Win */}
                <div className="pt-6 border-t border-[#D4A96A]/20">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#1B4332]">
                        {t.flagEmoji} {isRtl ? t.nameAr : t.nameEn}
                      </h3>
                      <p className="text-xs text-[#5D6B64]">{isRtl ? t.countryAr : t.countryEn}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs font-semibold text-[#2D6A4F] bg-white px-3 py-1.5 rounded-lg border border-[#D4A96A]/20 inline-block">
                    {isRtl ? t.savingsAr : t.savingsEn}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D6A4F] hover:text-[#1B4332] transition-colors"
            >
              <span>{isRtl ? 'عرض المزيد من تجارب المرضى' : 'Read more patient recovery stories'}</span>
              <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>
      </section>

      {/* ─── 6. ESSENTIAL FAQ (CALM & SPACIOUS) ─────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#D4A96A]/15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6D37] block">
              {isRtl ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </span>
            <h2 className="font-display font-normal tracking-[-0.03em] text-2xl sm:text-4xl text-[#1B4332]">
              {isRtl ? 'إجابات واضحة لاستفساراتك الطبية' : 'Clear Answers for Your Peace of Mind'}
            </h2>
          </div>

          <div className="divide-y divide-[#E0E7DC] bg-white rounded-3xl p-6 sm:p-8 border border-[#1B4332]/8 shadow-xs">
            {faqKeys.map((key) => (
              <details
                key={key}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4 focus:outline-hidden">
                  <h3 className="text-base font-semibold text-[#1B4332] transition-colors group-hover:text-[#2D6A4F] text-start">
                    {tFAQ(`q${key}`)}
                  </h3>
                  <ChevronDown className="h-4 w-4 text-[#8C6D37] transition-transform duration-300 group-open:-rotate-180 shrink-0" />
                </summary>
                <p className="mt-3 text-sm text-[#4A5C52] leading-relaxed text-start">
                  {tFAQ(`a${key}`)}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 7. FINAL CONVERSION: LUXURY SANCTUARY BANNER ──────────────────── */}
      <section className="bg-[#1B4332] text-white py-18 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A96A] block">
            {isRtl ? 'ابدأ رحلة الشفاء اليوم' : 'Personal Medical Concierge'}
          </span>

          <h2 className="font-display font-normal tracking-[-0.03em] text-3xl sm:text-5xl text-white leading-tight">
            {isRtl ? 'مستعد لبدء خطتك العلاجية؟' : 'Ready for complete peace of mind?'}
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
            {isRtl
              ? 'تحدث مباشرة مع طبيبنا المنسق الآن. نراجع تقاريرك مجاناً ونقدم لك خطة علاجية مفصلة خلال ٢٤ ساعة.'
              : 'Chat directly with our medical coordinator. We review your case for free and provide an official hospital treatment plan within 24 hours.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                isRtl
                  ? 'مرحباً، أود استشارة منسق طبي حول خطة العلاج.'
                  : 'Hello, I would like to consult with a medical coordinator regarding my treatment plan.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold bg-[#25D366] hover:bg-[#22c55e] text-slate-950 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{tCommon('whatsAppUs')}</span>
            </a>

            <Link
              href="/get-estimate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all duration-300 w-full sm:w-auto"
            >
              <span>{tCommon('getEstimate')}</span>
              <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <p className="text-xs text-emerald-200/60 pt-2">
            {isRtl
              ? 'خدمة تنسيق مجانية ١٠٠٪ • فواتير رسمية مباشرة من المستشفى • استشارة بدون التزام'
              : '100% Free Concierge Service • Direct Hospital Billing • Zero Obligation'}
          </p>

        </div>
      </section>

    </div>
  );
}
