import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, MessageCircle, Info, Star, MapPin, Clock, HeartPulse, ShieldCheck, Leaf, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import Image from 'next/image';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr 
      ? 'باقات التنسيق والرعاية الطبية الممتازة | علاج في كيرلا' 
      : 'Premium Medical Concierge & Care Packages | TreatInKerala',
    description: isAr
      ? 'قارن بين باقات التنسيق الطبي الأساسية والراقية للرعاية والترجمة والمرافقة الطبية في كيرلا وجنوب الهند.'
      : 'Compare Essential and Premium VIP concierge packages for medical travel coordination, Arabic translation, transport, and family companion support in Kerala & South India.',
    alternates: {
      canonical: isAr ? '/ar/packages' : '/en/packages',
      languages: {
        en: '/en/packages',
        ar: '/ar/packages',
      },
    },
  };
}

export default async function PackagesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Packages' });

  const isRtl = locale === 'ar';

  const essentialIncludes = [
    isRtl ? 'الاستقبال من المطار والمرافقة لمقر السكن' : 'Airport Meet-and-Greet & transfer to lodging',
    isRtl ? 'حجز المواعيد الطبية وتسهيل الدخول للمستشفى' : 'Hospital doctor shortlist & appointment scheduling',
    isRtl ? 'توفير خيارات السكن المناسبة وحجزها مسبقاً' : 'Pre-departure hotel/apartment shortlisting & booking',
    isRtl ? 'تأمين أسعار مؤسسية مخفضة (توفير ١٥-٢٠٪)' : 'Access to pre-negotiated corporate rates (15-20% off)',
    isRtl ? 'شريحة اتصال هندية محلية مجاناً مع إنترنت' : 'Complimentary Indian SIM card with active data',
    isRtl ? 'منسق حالة طبي شخصي عبر واتساب طوال الإقامة' : 'Dedicated personal care coordinator via WhatsApp',
    isRtl ? 'ترجمة التقارير والتحاليل الطبية للغة الإنجليزية' : 'Pre-arrival translation of medical records'
  ];

  const premiumIncludes = [
    isRtl ? 'كافة مميزات الباقة التنسيقية الأساسية' : 'Everything included in the Essential package',
    isRtl ? 'سيارة خاصة وسائق للتنقلات الطبية واليومية' : 'Private chauffeur & vehicle for all medical transits',
    isRtl ? 'مترجم طبي يرافقك شخصياً في جميع الزيارات الطبية' : 'Personal Arabic-speaking interpreter escort for visits',
    isRtl ? 'معالجة أوراق الفيزا الطبية الطارئة وخطاب الدعوة' : 'Priority Medical Visa assistance & official invitation',
    isRtl ? 'تسهيل فائق السرعة لدخول المشفى وتجاوز الانتظار' : 'VIP fast-track admission (zero wait lines)',
    isRtl ? 'متابعة طبية وتنسيق بعد العودة لمدة ٦٠ يوماً' : 'Extended post-care teleconsultation follow-up (60 days)',
    isRtl ? 'برنامج سياحي وثقافي قصير مجاني للمرافقين' : 'Complimentary cultural sightseeing tour for companions',
    isRtl ? 'المساعدة في صرف وتوصيل الأدوية والوصفات' : 'Medicine home-delivery & pharmacy support'
  ];

  return (
    <div className="pt-36 pb-16 lg:pt-44 lg:pb-24 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold">
            <span>{isRtl ? 'إدارة طبية متكاملة' : 'End-to-End Care Management'}</span>
          </div>
          <h1 className="font-display font-bold tracking-tight text-3xl sm:text-5xl text-text-dark leading-tight">
            {t('heading')}
          </h1>
          <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed max-w-2xl mx-auto">
            {t('subheading')}
          </p>

          {/* Pricing Clarification Box */}
          <div className="mt-8 max-w-4xl mx-auto bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-6 text-left rtl:text-right flex flex-col md:flex-row items-start md:items-center gap-5 shadow-2xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#1B4332] text-sm">
                {isRtl ? 'هل التنسيق الطبي مجاني حقاً؟' : 'Is medical coordination really free?'}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {isRtl
                  ? 'نعم، التنسيق الطبي والربط بينك وبين المستشفيات والاستشارات عن بعد مجانية بنسبة 100% وممولة بالكامل من المستشفيات الشريكة. هذه الباقات المعروضة أدناه هي خيارات راقية إضافية للتنقلات الخاصة والسائق الشخصي والترجمة الطبية الميدانية الفورية والرحلات الاستجمامية.'
                  : 'Yes! Our core hospital coordination, remote consultations, and medical advice are 100% free and funded by partner hospitals. These optional paid Concierge Packages are add-on premium services for dedicated private drivers, personal in-person interpreters, fast-track visa processing, and leisure wellness tours.'}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-stretch">
          
          {/* Card 1: Essential */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 relative group overflow-hidden">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#D4A96A] font-sans block">
                  {isRtl ? 'الباقة الأساسية' : 'Standard Service'}
                </span>
                <h3 className="text-2xl font-bold text-text-dark font-display">{t('essentialTitle')}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-sans">{t('essentialDesc')}</p>
              </div>

              {/* Price Indicator */}
              <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                <span className="text-xs text-text-muted font-bold font-sans">{isRtl ? 'تبدأ من:' : 'From:'}</span>
                <span className="text-4xl font-extrabold text-[#1B4332] font-display">${t('essentialPrice')}</span>
                <span className="text-xs text-text-muted font-sans">{isRtl ? 'رسوم تدفع لمرة واحدة' : 'One-time fee'}</span>
              </div>

              {/* Checkbox List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-text-dark font-sans">{t('whatsIncluded')}:</h4>
                <ul className="space-y-3.5">
                  {essentialIncludes.map((inc, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700 font-sans leading-snug">
                      <span className="h-5 w-5 rounded-full bg-emerald-50 text-[#1B4332] flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100 mt-0.5">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار وحجز الباقة الأساسية ($299)` : `Hello TreatInKerala, I would like to inquire about the Essential Concierge package ($299)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full text-center py-3.5 px-6 text-base font-bold flex items-center justify-center gap-2 transition-all duration-200 min-h-[48px] cursor-pointer"
              >
                <MessageCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{t('bookBtn')}</span>
              </a>
            </div>
            
            {/* Large Background Vector */}
            <div className="absolute -bottom-6 -left-4 rtl:-right-4 rtl:-left-auto h-48 w-48 opacity-[0.02] text-[#1B4332] pointer-events-none group-hover:scale-[1.05] transition-all duration-500 ease-out origin-bottom-left">
              <ShieldCheck className="w-full h-full" strokeWidth={1.5} />
            </div>
          </div>

          {/* Card 2: Premium VIP (Best Choice / Highlighted) */}
          <div className="bg-white border-2 border-[#1B4332] rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
            {/* VIP Label ribbon */}
            <div className="absolute top-5 right-5 rtl:right-auto rtl:left-5 bg-[#1B4332] text-white px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <Star className="h-3.5 w-3.5 fill-[#D4A96A] text-[#D4A96A]" />
              <span>{isRtl ? 'الأكثر طلباً' : 'Best Value / VIP'}</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1B4332] font-sans block">
                  {isRtl ? 'الباقة الفاخرة للخليج' : 'Premium Luxury Experience'}
                </span>
                <h3 className="text-2xl font-bold text-text-dark font-display">{t('premiumTitle')}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-sans">{t('premiumDesc')}</p>
              </div>

              {/* Price Indicator */}
              <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                <span className="text-xs text-text-muted font-bold font-sans">{isRtl ? 'تبدأ من:' : 'From:'}</span>
                <span className="text-4xl font-extrabold text-[#D4A96A] font-display">${t('premiumPrice')}</span>
                <span className="text-xs text-text-muted font-sans">{isRtl ? 'رسوم تدفع لمرة واحدة' : 'One-time fee'}</span>
              </div>

              {/* Checkbox List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-text-dark font-sans">{t('whatsIncluded')}:</h4>
                <ul className="space-y-3.5">
                  {premiumIncludes.map((inc, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700 font-sans leading-snug">
                      <span className="h-5 w-5 rounded-full bg-emerald-50 text-[#1B4332] flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100 mt-0.5">✓</span>
                      <span className={index === 0 ? "font-bold text-[#1B4332]" : ""}>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار وحجز باقة الـ VIP الراقية ($999)` : `Hello TreatInKerala, I would like to inquire about the Premium VIP Concierge package ($999)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center py-3.5 px-6 text-base font-bold flex items-center justify-center gap-2 transition-all duration-200 min-h-[48px] cursor-pointer shadow-sm hover:shadow-md"
              >
                <MessageCircle className="h-4.5 w-4.5 text-white shrink-0" />
                <span>{t('bookBtn')}</span>
              </a>
            </div>

            {/* Large Background Vector */}
            <div className="absolute -bottom-6 -left-4 rtl:-right-4 rtl:-left-auto h-48 w-48 opacity-[0.02] text-[#1B4332] pointer-events-none group-hover:scale-[1.05] transition-all duration-500 ease-out origin-bottom-left">
              <Star className="w-full h-full" strokeWidth={1.5} />
            </div>
          </div>

        </div>

        {/* HEALING TOURS SECTION */}
        <section className="mb-24 pt-8 border-t border-slate-200">
          <div className="mb-12 space-y-3 rtl:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold mb-2">
              <span>{isRtl ? 'جولات الشفاء الطبيعي' : 'Guided Healing & Wellness Tours'}</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-text-dark">
              {t('tourHeading')}
            </h2>
            <p className="text-text-muted leading-relaxed text-base sm:text-lg max-w-2xl">
              {t('tourSubheading')}
            </p>

            {/* Guide Service Badge */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                { icon: <Globe className="h-3.5 w-3.5 text-[#1B4332]" />, label: isRtl ? 'مرشد يتحدث لغتك' : 'Guide speaks your language' },
                { icon: <Leaf className="h-3.5 w-3.5 text-[#1B4332]" />, label: isRtl ? 'مواصلات وإقامة شاملة' : 'Transport & lodging included' },
                { icon: <Star className="h-3.5 w-3.5 fill-[#D4A96A] text-[#D4A96A]" />, label: isRtl ? 'ترجمة طبية فورية' : 'Real-time medical translation' },
              ].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] bg-emerald-50/80 border border-emerald-200/80 px-3 py-1.5 rounded-full">
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* 3-column grid for 6 individual tours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {(['houseboat', 'munnar', 'kochi', 'thekkady', 'wayanad', 'varkala'] as const).map((key) => (
              <div key={key} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group">
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={`/images/tours_${key}.png`}
                    alt={t(`tours.${key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-text-dark font-sans flex items-center gap-1 shadow-xs">
                    <Clock className="h-3 w-3 text-[#1B4332]" />
                    <span>{t(`tours.${key}.duration`)}</span>
                  </div>
                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3 bg-[#1B4332]/95 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold font-sans shadow-md">
                    {t(`tours.${key}.price`)}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-text-dark font-display leading-snug mb-2 group-hover:text-[#1B4332] transition-colors">
                    {t(`tours.${key}.title`)}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted font-semibold mb-3">
                    <MapPin className="h-3.5 w-3.5 text-[#D4A96A] shrink-0" />
                    <span>{t(`tours.${key}.location`)}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-sans flex-grow mb-4">
                    {t(`tours.${key}.desc`)}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 mb-4">
                    <HeartPulse className="h-3.5 w-3.5 shrink-0 text-[#1B4332]" />
                    <span>{t(`tours.${key}.benefit`)}</span>
                  </div>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً، أود الاستفسار عن جولة: ${t(`tours.${key}.title`)}` : `Hello TreatInKerala, I would like to book or inquire about the "${t(`tours.${key}.title`)}" wellness tour.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {t('tourBookBtn')}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Flagship: Full Kerala Healing Circuit — Full Width Card */}
          <div className="bg-[#1B4332] rounded-3xl overflow-hidden shadow-xl relative group">
            <div className="absolute inset-0 bg-[url('/images/tours_circuit.png')] bg-cover bg-center opacity-15 group-hover:opacity-20 transition-opacity duration-700" />
            <div className="relative z-10 p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                {/* Flagship Label */}
                <div className="flex items-center gap-2">
                  <span className="bg-[#D4A96A] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-white" />
                    {isRtl ? 'الباقة الرائدة' : 'Flagship Package'}
                  </span>
                  <span className="text-xs text-white/80 font-semibold">
                    {t('tours.circuit.duration')}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">
                  {t('tours.circuit.title')}
                </h3>

                <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-[#D4A96A] shrink-0" />
                  <span>{t('tours.circuit.location')}</span>
                </div>

                <p className="text-slate-200 text-sm leading-relaxed font-sans max-w-lg">
                  {t('tours.circuit.desc')}
                </p>

                <div className="flex items-center gap-2 text-[#D4A96A] text-sm font-bold bg-white/10 px-4 py-2 rounded-xl border border-white/15 w-fit">
                  <HeartPulse className="h-4 w-4 shrink-0" />
                  {t('tours.circuit.benefit')}
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-5">
                {/* Price Block */}
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-6 py-5 text-center lg:text-right rtl:lg:text-left">
                  <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">
                    {isRtl ? 'السعر يبدأ من' : 'Starting from'}
                  </p>
                  <p className="text-4xl font-extrabold text-[#D4A96A] font-display">$890</p>
                  <p className="text-white/80 text-xs font-sans mt-1">
                    {isRtl ? 'للشخص، يشمل كل شيء' : 'per person, all-inclusive'}
                  </p>
                </div>

                {/* What is included */}
                <ul className="space-y-2 text-sm text-slate-200 font-sans">
                  {[
                    isRtl ? '✓ مرشد يتكلم لغتك طوال الرحلة' : '✓ Personal bilingual guide (8 days)',
                    isRtl ? '✓ سائق خاص بين جميع المواقع' : '✓ Private chauffeur between all sites',
                    isRtl ? '✓ 7 ليالٍ إقامة في فنادق مختارة' : '✓ 7 nights curated eco-resort stays',
                    isRtl ? '✓ ترجمة طبية فورية عند الحاجة' : '✓ Medical translation on-demand',
                    isRtl ? '✓ جلسات أيورفيدا يومية مشمولة' : '✓ Daily Ayurvedic healing sessions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#D4A96A] font-bold shrink-0">{item.substring(0, 1)}</span>
                      <span>{item.substring(2)}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار عن باقة رحلة كيرلا العلاجية الشاملة (8 أيام - تبدأ من 890$)` : `Hello TreatInKerala, I'm interested in the Full Kerala Healing Circuit package (8 Days, from $890/person). Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto bg-[#D4A96A] hover:bg-[#c49a5e] text-[#111827] font-bold px-8 py-3.5 rounded-full text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-md min-h-[48px] cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" />
                  {isRtl ? 'احجز الرحلة الكاملة' : 'Book the Full Circuit'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. HYBRID PRICING TRANSPARENCY SECTION */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 mb-20 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-[#D4A96A] border border-amber-200 flex items-center justify-center shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-dark font-display">{t('hybridNoteTitle')}</h3>
              </div>
              
              <div className="space-y-4 text-text-muted text-base leading-relaxed font-sans">
                <p>{t('hybridNoteDesc')}</p>
                <p>
                  {isRtl 
                    ? 'من الناحية العملية، يعتمد السعر النهائي على نوع زراعة المفاصل أو عدد دعامات القسطرة، فئة الغرفة بالمستشفى، وتاريخك المرضي ومضاعفاته إن وجدت. عندما تطلب تقدير التكلفة لدينا، نحصل لك على عروض أسعار رسمية دقيقة من أفضل الاستشاريين حتى لا تواجه أي مفاجآت أو زيادة في الفاتورة عند وصولك.'
                    : 'In practice, procedure rates change based on implant materials, duration of ICU stay, pre-existing conditions, and hospital room category selection. By organizing your treatment directly through our partner channels, you secure special corporate rates while keeping pricing 100% transparent and reliable.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-[#1B4332] hover:text-[#2D6A4F] font-bold font-sans transition-colors"
                >
                  <span>{isRtl ? 'اقرأ الأسئلة الشائعة حول الفوترة والأسعار' : 'Read billing FAQs'}</span>
                  <ArrowRight className="h-4 w-4 font-sans rtl:rotate-180" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FAF7F2] p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-text-dark font-display text-lg">
                {isRtl ? 'مزايا التسعير الهجين:' : 'Hybrid Model Advantages:'}
              </h4>
              <ul className="space-y-3 text-sm text-slate-700 font-sans">
                {[
                  isRtl ? '✓ لا أسعار وهمية أو مفاجآت مخفية' : '✓ Zero fake prices or hidden traps',
                  isRtl ? '✓ الدفع مباشرة للمستشفيات الشريكة' : '✓ Direct-to-Hospital billing payment',
                  isRtl ? '✓ تأمين أسعار مخفضة للشركاء فقط' : '✓ Fully customized medical opinions',
                  isRtl ? '✓ استشارة الطبيب قبل السفر لتأكيد الخطة' : '✓ Consult specialist before flight'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#1B4332] font-bold font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* 3. STEP BY STEP FLOW */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold mb-1">
              <span>{isRtl ? 'خطوات الحجز' : 'Booking Timeline'}</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-text-dark">
              {t('howItWorks')}
            </h2>
            <p className="text-text-muted text-base">
              {isRtl 
                ? 'ثلاث خطوات بسيطة ومنظمة تفصلك عن السفر وبدء رحلة استشفائك بوضوح وأمان.' 
                : 'A transparent 3-step timeline from your first inquiry to your safe arrival and recovery.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            {[
              { title: t('step1Title'), desc: t('step1Desc'), emoji: '📂' },
              { title: t('step2Title'), desc: t('step2Desc'), emoji: '🏥' },
              { title: t('step3Title'), desc: t('step3Desc'), emoji: '✈️' }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col gap-3">
                <span className="text-3xl">{step.emoji}</span>
                <h4 className="font-bold text-text-dark font-display text-lg">{step.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
