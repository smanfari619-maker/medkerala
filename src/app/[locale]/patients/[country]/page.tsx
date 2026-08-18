import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { COUNTRY_PAGES_DATA } from '@/lib/countryPages';
import { SITE_CONFIG } from '@/lib/config';
import {
  Plane,
  FileCheck2,
  ShieldCheck,
  MapPin,
  Clock,
  DollarSign,
  HeartHandshake,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Quote,
  Star,
  Award,
  Globe,
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: string; country: string }>;
}

export function generateStaticParams() {
  const countries = Object.keys(COUNTRY_PAGES_DATA);
  const locales = ['en', 'ar'];

  const paramsList: { locale: string; country: string }[] = [];
  locales.forEach((locale) => {
    countries.forEach((country) => {
      paramsList.push({ locale, country });
    });
  });
  return paramsList;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const countryData = COUNTRY_PAGES_DATA[country];

  if (!countryData) {
    return { title: 'Country Not Found' };
  }

  const isAr = locale === 'ar';
  const title = isAr
    ? `${countryData.heroHeadlineAr} | علاج في كيرلا`
    : `${countryData.heroHeadlineEn} | TreatInKerala`;

  const description = isAr
    ? `دليل شامل للمرضى القادمين من ${countryData.nameAr} للعلاج في كيرلا: رحلات الطيران المباشرة، التأشيرة الطبية، أفضل المستشفيات المعتمدة، وتوفير حتى ${countryData.avgSavings}.`
    : `Complete healthcare guide for patients from ${countryData.nameEn} traveling to Kerala: direct flights, medical visa guide, accredited hospitals, and up to ${countryData.avgSavings} savings.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/patients/${country}`,
      languages: {
        en: `/en/patients/${country}`,
        ar: `/ar/patients/${country}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://treatinkerala.com/${locale}/patients/${country}`,
      siteName: 'TreatInKerala',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function CountryPatientPage({ params }: Props) {
  const { locale, country } = await params;
  const countryData = COUNTRY_PAGES_DATA[country];

  if (!countryData) {
    notFound();
  }

  const isRtl = locale === 'ar';

  const waPreFilled = isRtl
    ? `مرحباً علاج في كيرلا، أنا قادم من ${countryData.nameAr}. أود استشارة منسق طبي حول خيارات العلاج والمستشفيات في كيرلا.`
    : `Hello TreatInKerala, I am inquiring from ${countryData.nameEn}. I would like to consult with a coordinator regarding treatment options and hospitals in Kerala.`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#D4A96A]/20" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">

        {/* ─── 1. HERO SECTION ─────────────────────────────────────────────── */}
        <section className="relative bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-[#D4A96A]/20 shadow-xl overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2D6A4F]/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#D4A96A]/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left / Primary Text Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6 text-start">
              {/* Eyebrow Flag & Origin Badge */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl">{countryData.flagEmoji}</span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2] text-[#1B4332] border border-[#D4A96A]/30 text-xs font-bold font-sans">
                  <span>{isRtl ? countryData.nameAr : countryData.nameEn}</span>
                  <span className="text-[#D4A96A]">•</span>
                  <span>{isRtl ? countryData.nationalityAr : countryData.nationalityEn}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-[#2D6A4F] border border-emerald-200 text-xs font-bold">
                  <span>{countryData.patientsServedStat} {isRtl ? 'مريض تم خدمتهم' : 'Patients Coordinated'}</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-[#1B4332] tracking-tight leading-[1.12]">
                {isRtl ? countryData.heroHeadlineAr : countryData.heroHeadlineEn}
              </h1>

              {/* Subtitle */}
              <p className="text-text-muted text-base sm:text-lg leading-relaxed font-sans font-light max-w-2xl">
                {isRtl ? countryData.heroSubAr : countryData.heroSubEn}
              </p>

              {/* Quick Key Metrics Pill Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#FAF7F2] border border-[#D4A96A]/20 rounded-2xl p-4 text-start">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1B4332] font-display block">
                    {countryData.avgSavings}
                  </span>
                  <span className="text-xs text-text-muted font-sans font-light block mt-0.5">
                    {isRtl ? 'متوسط التوفير الطبي' : 'Avg. Treatment Savings'}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] border border-[#D4A96A]/20 rounded-2xl p-4 text-start">
                  <span className="text-2xl sm:text-3xl font-bold text-[#2D6A4F] font-display block">
                    JCI / NABH
                  </span>
                  <span className="text-xs text-text-muted font-sans font-light block mt-0.5">
                    {isRtl ? 'مستشفيات معتمدة دولياً' : 'Accredited Hospitals'}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] border border-[#D4A96A]/20 rounded-2xl p-4 text-start col-span-2 sm:col-span-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#D4A96A] font-display block">
                    100%
                  </span>
                  <span className="text-xs text-text-muted font-sans font-light block mt-0.5">
                    {isRtl ? 'تنسيق مجاني ودفع مباشر' : 'Free Coordination'}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(waPreFilled)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4 rounded-full text-sm shadow-md hover:shadow-lg transition-all font-sans cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{isRtl ? 'استشارة فورية عبر واتساب' : 'Chat with Coordinator'}</span>
                </a>

                <Link
                  href="/get-estimate"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold px-8 py-4 rounded-full text-sm shadow-md transition-all font-sans"
                >
                  <span>{isRtl ? 'طلب خطة علاجية وعرض سعر' : 'Get Free Treatment Plan'}</span>
                  <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>

            {/* Right Flight & Visa Highlights Box (4 cols) */}
            <div className="lg:col-span-4 bg-[#F5F8F4] border border-[#2D6A4F]/20 rounded-3xl p-6 sm:p-8 space-y-6 text-start shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A96A] uppercase tracking-wider">
                <Plane className="h-4 w-4 text-[#D4A96A]" />
                <span>{isRtl ? 'تفاصيل السفر والرحلات' : 'Direct Flight Route'}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-[#1B4332] block mb-1">
                    {isRtl ? 'المسار المباشر:' : 'Route:'}
                  </span>
                  <p className="text-text-muted leading-relaxed font-light">
                    {isRtl ? countryData.flightInfo.directRoutesAr : countryData.flightInfo.directRoutesEn}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#1B4332] block mb-1">
                    {isRtl ? 'مدة الرحلة:' : 'Flight Duration:'}
                  </span>
                  <p className="text-text-muted leading-relaxed font-light">
                    {isRtl ? countryData.flightInfo.flightDurationAr : countryData.flightInfo.flightDurationEn}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#1B4332] block mb-1">
                    {isRtl ? 'خطوط الطيران الشائعة:' : 'Operating Airlines:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(isRtl ? countryData.flightInfo.airlinesAr : countryData.flightInfo.airlinesEn).map((airline, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-[#1B4332] px-2 py-0.5 rounded text-[11px] font-medium">
                        ✈️ {airline}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2D6A4F]/15 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B4332]">
                  <FileCheck2 className="h-4 w-4 text-[#2D6A4F]" />
                  <span>{isRtl ? 'التأشيرة الطبية الهندية:' : 'Medical Visa Support:'}</span>
                </div>
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  {isRtl ? countryData.visaGuide.processAr : countryData.visaGuide.processEn}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ─── 2. WHY KERALA FOR THIS COUNTRY ──────────────────────────────── */}
        <section className="space-y-10">
          <div className="text-start max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                {isRtl ? `لماذا كيرلا لمرضى ${countryData.nameAr}؟` : `Why Kerala for ${countryData.nameEn} Patients?`}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1B4332]">
              {isRtl
                ? `مزايا استثنائية مصممة لراحة المرضى من ${countryData.nameAr}`
                : `Tailored Medical Advantages for Patients from ${countryData.nameEn}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {countryData.keyAdvantages.map((adv, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#D4A96A]/20 rounded-[2rem] p-7 space-y-4 hover:border-[#2D6A4F]/35 hover:shadow-lg transition-all text-start group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#1B4332] border border-[#D4A96A]/25 flex items-center justify-center font-bold text-base font-display group-hover:bg-[#1B4332] group-hover:text-white transition-all shadow-2xs">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold font-display text-[#1B4332]">
                  {isRtl ? adv.titleAr : adv.titleEn}
                </h3>
                <p className="text-sm text-text-muted font-light leading-relaxed font-sans">
                  {isRtl ? adv.descAr : adv.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 3. TOP POPULAR TREATMENTS ──────────────────────────────────── */}
        <section className="space-y-10">
          <div className="text-start max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                {isRtl ? 'أبرز العلاجات المطلوبة' : 'Most Requested Procedures'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1B4332]">
              {isRtl
                ? `التخصصات الأكثر طلباً من قبل المرضى القادمين من ${countryData.nameAr}`
                : `High-Demand Treatments by ${countryData.nameEn} Patients`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {countryData.popularTreatments.map((tr, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#D4A96A]/20 rounded-[2rem] p-7 flex flex-col justify-between space-y-6 shadow-sm hover:border-[#2D6A4F]/30 hover:shadow-xl transition-all text-start"
              >
                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#D4A96A] border border-[#D4A96A]/20">
                    {tr.slug.toUpperCase()}
                  </span>

                  <h3 className="text-xl font-bold font-display text-[#1B4332]">
                    {isRtl ? tr.nameAr : tr.nameEn}
                  </h3>

                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {isRtl ? tr.whyRelevantAr : tr.whyRelevantEn}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-text-muted">
                      <span>{isRtl ? 'مدة الإقامة المتوقعة:' : 'Expected Stay:'}</span>
                      <span className="font-bold text-[#1B4332]">{isRtl ? tr.typicalDurationAr : tr.typicalDurationEn}</span>
                    </div>

                    <div className="flex items-center justify-between text-text-muted">
                      <span>{isRtl ? 'المدى التقديري للتكلفة:' : 'Estimated Range:'}</span>
                      <span className="font-bold text-[#2D6A4F]">{isRtl ? tr.estimatedCostAr : tr.estimatedCostEn}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/get-estimate"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#1B4332] text-[#1B4332] hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-[#D4A96A]/20"
                  >
                    <span>{isRtl ? 'طلب تسعيرة دقيقة للحالة' : 'Request Case Quote'}</span>
                    <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. FAMILY & COMPANION CARE ──────────────────────────────────── */}
        <section className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#D4A96A]/20 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A96A] uppercase tracking-wider">
                <HeartHandshake className="h-4 w-4" />
                <span>{isRtl ? 'رعاية العائلات والمرافقين' : 'Family & Companion Logistics'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#1B4332]">
                {isRtl ? countryData.familySupport.titleAr : countryData.familySupport.titleEn}
              </h3>

              <div className="space-y-3 pt-2">
                {(isRtl ? countryData.familySupport.pointsAr : countryData.familySupport.pointsEn).map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#4A5C52] font-light leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#D4A96A]/30 rounded-3xl p-6 sm:p-8 space-y-4 text-start">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#2D6A4F]" />
                <span className="text-sm font-bold text-[#1B4332]">{isRtl ? 'مترجم ومنسق مخصص' : 'Dedicated Personal Liaison'}</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed font-light">
                {isRtl
                  ? 'منسقنا الطبي المرافق يتحدث العربية بطلاقة ويساعدك في كافة إجراءات المستشفى والمواعيد والتسوق وصرف العملة وحجز الشقق الفندقية.'
                  : 'Your personal medical coordinator speaks fluent Arabic and English, managing every aspect of hospital appointments, translation, and companion needs.'}
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(waPreFilled)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{isRtl ? 'تحدث مع المنسق الآن' : 'Speak with Coordinator'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. PATIENT STORY / TESTIMONIAL ──────────────────────────────── */}
        <section className="space-y-8 text-start">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                {isRtl ? 'تجربة حقيقية' : 'Verified Patient Story'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1B4332]">
              {isRtl
                ? `قصة نجاح مريض سافر من ${countryData.nameAr} لتلقي العلاج في كيرلا`
                : `Patient Experience from ${countryData.nameEn}`}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-white to-[#FAF7F2] border border-[#D4A96A]/25 rounded-[2.5rem] p-8 sm:p-12 shadow-lg relative">
            <Quote className="h-10 w-10 text-[#D4A96A]/20 absolute top-8 right-8 rtl:right-auto rtl:left-8 pointer-events-none" />

            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D4A96A] text-[#D4A96A]" />
                ))}
                <span className="text-xs font-bold text-[#1B4332] ms-2">5.0 Verified Care</span>
              </div>

              <p className="text-base sm:text-lg text-slate-800 font-light leading-relaxed italic font-sans">
                &ldquo;{isRtl ? countryData.testimonial.storyAr : countryData.testimonial.storyEn}&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-bold text-base text-[#1B4332] font-display">
                    {countryData.flagEmoji} {isRtl ? countryData.testimonial.patientNameAr : countryData.testimonial.patientNameEn}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    {isRtl ? countryData.testimonial.cityAr : countryData.testimonial.cityEn} • 🏥 {isRtl ? countryData.testimonial.hospitalAr : countryData.testimonial.hospitalEn}
                  </p>
                  <p className="text-xs font-semibold text-[#2D6A4F] mt-0.5">
                    {isRtl ? countryData.testimonial.treatmentAr : countryData.testimonial.treatmentEn}
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2 text-center">
                  <span className="text-sm font-bold text-[#2D6A4F] block">
                    {isRtl ? countryData.testimonial.savingsAr : countryData.testimonial.savingsEn}
                  </span>
                  <span className="text-[10px] text-text-muted block">{isRtl ? 'نتيجة وتوفير' : 'Outcome'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. VISA & FREQUENTLY ASKED QUESTIONS ────────────────────────── */}
        <section className="space-y-8 text-start max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold font-display text-[#1B4332]">
              {isRtl ? 'الأسئلة الشائعة حول السفر والعلاج' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-sm text-text-muted">
              {isRtl
                ? `كل ما يهمك معرفته حول السفر الطبي من ${countryData.nameAr} إلى كيرلا`
                : `Key answers for patients preparing to travel from ${countryData.nameEn} to Kerala`}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A96A]/20 shadow-sm divide-y divide-slate-100">
            {countryData.faqs.map((faq, i) => (
              <details key={i} className="group py-4 first:pt-0 last:pb-0 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-bold text-[#1B4332] text-sm sm:text-base focus:outline-hidden">
                  <span>{isRtl ? faq.qAr : faq.qEn}</span>
                  <ChevronDown className="h-4 w-4 text-[#D4A96A] transition-transform group-open:-rotate-180 shrink-0" />
                </summary>
                <p className="mt-2 text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {isRtl ? faq.aAr : faq.aEn}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ─── 7. FINAL CONVERSION CTA ─────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white rounded-[2.5rem] p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold text-[#D4A96A] uppercase tracking-wider block font-sans">
              {isRtl ? 'خدمة مخصصة بدون رسوم وساطة' : 'Complimentary Patient Coordination'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              {isRtl
                ? `ابدأ رحلتك العلاجية من ${countryData.nameAr} اليوم`
                : `Ready to Plan Your Treatment from ${countryData.nameEn}?`}
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              {isRtl
                ? 'شارك تقاريرك الطبية لنزودك بعروض أسعار رسمية مباشرة من المستشفيات المعتمدة وخطاب التأشيرة خلال ٢٤ ساعة.'
                : 'Share your medical records to receive confirmed hospital estimates and official visa invitation letters within 24 hours.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(waPreFilled)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-md transition-all font-sans cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{isRtl ? 'تواصل عبر واتساب فوراً' : 'WhatsApp Us Directly'}</span>
              </a>

              <Link
                href="/get-estimate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#1B4332] hover:bg-[#FAF7F2] font-bold px-8 py-3.5 rounded-full text-sm shadow-md transition-all font-sans"
              >
                <span>{isRtl ? 'احصل على تقدير التكلفة' : 'Get Free Quote'}</span>
                <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
