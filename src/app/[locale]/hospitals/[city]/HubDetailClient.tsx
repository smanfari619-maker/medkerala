'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Building2, MapPin, Plane, ShieldCheck, CheckCircle2,
  Clock, ArrowRight, MessageCircle, PhoneCall, Sparkles,
  ChevronDown, ChevronUp, Hotel, FileText, Globe, Stethoscope,
  HeartHandshake, BedDouble, Navigation, CalendarCheck
} from 'lucide-react';
import { RegionalHubData } from '@/lib/regionalHubs';
import { SITE_CONFIG } from '@/lib/config';

interface Props {
  hub: RegionalHubData;
  allHubs: RegionalHubData[];
}

export default function HubDetailClient({ hub, allHubs }: Props) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const hubName = isRtl ? hub.nameAr : hub.nameEn;
  const districtName = isRtl ? hub.districtAr : hub.districtEn;
  const tagline = isRtl ? hub.taglineAr : hub.taglineEn;
  const heroHeadline = isRtl ? hub.heroHeadlineAr : hub.heroHeadlineEn;
  const heroSub = isRtl ? hub.heroSubAr : hub.heroSubEn;
  const deskStatus = isRtl ? hub.localDesk.statusAr : hub.localDesk.statusEn;
  const deskFeatures = isRtl ? hub.localDesk.featuresAr : hub.localDesk.featuresEn;

  return (
    <div className={`min-h-screen bg-[#FDFBF7] text-[#1B4332] ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ── Breadcrumb & Hub Switcher Bar ── */}
      <section className="bg-white border-b border-emerald-950/10 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-primary-green transition-colors">
              {isRtl ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/hospitals" className="hover:text-primary-green transition-colors">
              {isRtl ? 'المستشفيات الشريكة' : 'Hospitals'}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-primary-green">{hubName}</span>
          </nav>

          {/* Hub Switcher Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A96A] block mb-1">
                {isRtl ? 'المراكز الطبية الإقليمية في كيرلا' : 'Kerala Regional Healthcare Hubs'}
              </span>
              <p className="text-xs text-text-muted">
                {isRtl 
                  ? 'اختر المركز الإقليمي للاطلاع على المستشفيات والخدمات واللوجستيات المتاحة'
                  : 'Select a specialized hub to explore regional partner hospitals, travel logistics, and resident desk support:'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-[#F4EFEB] p-1.5 rounded-2xl border border-[#D4A96A]/20">
              {allHubs.map((h) => {
                const isActive = h.slug === hub.slug;
                const hName = isRtl ? h.nameAr : h.nameEn;
                return (
                  <Link
                    key={h.slug}
                    href={`/hospitals/${h.slug}`}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#1B4332] text-white shadow-xs'
                        : 'text-[#1B4332]/70 hover:text-[#1B4332] hover:bg-white/60'
                    }`}
                  >
                    <MapPin className={`h-3 w-3 ${isActive ? 'text-[#D4A96A]' : 'opacity-50'}`} />
                    <span>{hName}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8F5F0] to-[#FDFBF7] py-12 md:py-16 border-b border-emerald-950/10">
        <div className="absolute inset-0 bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left / Main text */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1B4332] text-xs font-bold border border-emerald-200">
                  <MapPin className="h-3.5 w-3.5 text-primary-green" />
                  {districtName}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A96A]/15 text-[#8C6D37] text-xs font-bold border border-[#D4A96A]/30">
                  <Plane className="h-3.5 w-3.5" />
                  {hub.airport.code} ({isRtl ? hub.airport.nameAr : hub.airport.nameEn})
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {isRtl ? 'طاقم دائم على الأرض' : 'Resident Team On-Site'}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <p className="text-sm md:text-base font-semibold text-[#D4A96A] uppercase tracking-wider mb-2">
                  {tagline}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1B4332] tracking-tight leading-tight">
                  {heroHeadline}
                </h1>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-[#3D5245] leading-relaxed max-w-3xl font-normal">
                {heroSub}
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                    isRtl
                      ? `مرحباً فريق علاج في كيرلا، أود استشارة منسقكم الطبي المقيم في ${hubName} ومعرفة خيارات العلاج المتاحة.`
                      : `Hello TreatInKerala team, I would like to consult your resident medical coordinator in ${hub.nameEn} regarding treatment options.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{isRtl ? `تواصل مع منسق ${hubName} عبر واتساب` : `Consult ${hub.nameEn} Desk on WhatsApp`}</span>
                </a>

                <Link
                  href="/get-estimate"
                  className="inline-flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-sm transition-all"
                >
                  <FileText className="h-4 w-4 text-[#D4A96A]" />
                  <span>{isRtl ? 'طلب خطة وتكلفة مجانية' : 'Request Free Medical Estimate'}</span>
                </Link>
              </div>
            </div>

            {/* Right Card: On-Ground Concierge Desk Snapshot */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-950/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary-green via-[#D4A96A] to-primary-green" />
                
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-xl bg-emerald-50 text-primary-green">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#1B4332]">
                      {isRtl ? 'مكتب التنسيق والاستقبال الميداني' : 'TreatInKerala On-Ground Desk'}
                    </h2>
                    <p className="text-[11px] text-text-muted">{districtName}</p>
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#D4A96A]/20 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1B4332]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{deskStatus}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-5 text-xs text-[#2D4537]">
                  {deskFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary-green" />
                    <span>{isRtl ? 'خدمات استشارية مجانية 100%' : '100% Free Concierge Service'}</span>
                  </span>
                  <span className="font-semibold text-primary-green">
                    {isRtl ? 'دفع مباشر للمستشفى' : 'Zero Markup'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Airport & GCC Connectivity Section ── */}
      <section className="py-12 bg-white border-b border-emerald-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-bold text-[#E9C46A] border border-white/10">
                  <Plane className="h-3.5 w-3.5" />
                  <span>{isRtl ? 'الربط الجوي المباشر والوصول' : 'Airport & Flight Logistics'}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {isRtl ? hub.airport.nameAr : hub.airport.nameEn} ({hub.airport.code})
                </h3>

                <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
                  {isRtl ? hub.airport.directFlightsAr : hub.airport.directFlightsEn}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/10">
                    <Clock className="h-4 w-4 text-[#E9C46A]" />
                    <span>{isRtl ? hub.airport.driveTimeAr : hub.airport.driveTimeEn}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/10">
                    <Navigation className="h-4 w-4 text-emerald-300" />
                    <span>{isRtl ? 'استقبال شخصي بالاسم بسيارة خاصة مجهزة' : 'Private chauffeured airport pickup with name board'}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E9C46A] block">
                  {isRtl ? 'بروتوكول الوصول لمطار' : 'Arrival Protocol via'} {hub.airport.code}
                </span>

                <div className="space-y-2 text-xs text-white/90">
                  <div className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <p>{isRtl ? 'مرافقة عند بوابة الخروج والمساعدة بالأمتعة والكراسي المتحركة.' : 'Gate-side greeting, wheelchair assistance & luggage handling.'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <p>{isRtl ? 'شريحة اتصال محلية 5G مجانية مع إنترنت للتواصل مع العائلة.' : 'Complimentary Indian 5G SIM card with active mobile data.'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <p>{isRtl ? 'نقل مباشر إلى المستشفى أو الفيلا/الشقة المحجوزة.' : 'Direct AC transfer to your partner hospital VIP room or private villa.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Regional Advantages ── */}
      <section className="py-12 md:py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] block mb-2">
              {isRtl ? 'لماذا تختار هذا المركز؟' : 'Why Choose This Hub?'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B4332]">
              {isRtl ? `المزايا العلاجية الفريدة في ${hubName}` : `Distinct Healthcare Advantages of ${hub.nameEn}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hub.keyAdvantages.map((adv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-emerald-950/10 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-primary-green flex items-center justify-center font-bold text-sm mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#1B4332] mb-2 leading-snug">
                    {isRtl ? adv.titleAr : adv.titleEn}
                  </h3>
                  <p className="text-xs text-[#4A5C52] leading-relaxed font-light">
                    {isRtl ? adv.descAr : adv.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Hospitals in this City ── */}
      <section className="py-12 md:py-16 bg-white border-y border-emerald-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] block mb-2">
                {isRtl ? 'المستشفيات الشريكة المعتمدة' : 'Accredited Partner Facilities'}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B4332]">
                {isRtl ? `أفضل المستشفيات والمراكز في ${hubName}` : `Premier Hospitals & Centres in ${hub.nameEn}`}
              </h2>
            </div>
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-green hover:underline"
            >
              <span>{isRtl ? 'عرض كافة المستشفيات الشريكة بكيرلا' : 'View All Partner Hospitals in Kerala'}</span>
              <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hub.hospitals.map((hospital, idx) => {
              const hName = isRtl ? hospital.nameAr : hospital.nameEn;
              const hType = isRtl ? hospital.typeAr : hospital.typeEn;
              const hOverview = isRtl ? hospital.overviewAr : hospital.overviewEn;
              const hSpecs = isRtl ? hospital.specialitiesAr : hospital.specialitiesEn;

              return (
                <div
                  key={idx}
                  className="bg-[#FAF7F2] rounded-3xl p-6 border border-emerald-950/10 hover:border-primary-green/30 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100/70 text-[#1B4332] border border-emerald-200/50">
                        {hType}
                      </span>
                      <span className="text-[10px] font-bold text-[#8C6D37] bg-[#D4A96A]/15 px-2 py-0.5 rounded-md border border-[#D4A96A]/25">
                        {hospital.accreditation}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#1B4332] leading-snug">
                        {hName}
                      </h3>
                      <p className="text-xs text-[#4A5C52] mt-2 leading-relaxed font-light">
                        {hOverview}
                      </p>
                    </div>

                    {/* Specialties */}
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1.5">
                        {isRtl ? 'التخصصات البارزة:' : 'Key Specialties:'}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {hSpecs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] bg-white text-[#1B4332] px-2 py-0.5 rounded-md border border-slate-200/60"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-4 border-t border-slate-200/60 space-y-2">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                        isRtl
                          ? `مرحباً، أود الاستفسار عن حجز موعد واستشارة في مستشفى ${hName} (${hubName}).`
                          : `Hello, I want to inquire about booking and treatment at ${hospital.nameEn} (${hub.nameEn}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition-all"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{isRtl ? 'حجز موعد بالمستشفى عبر واتساب' : 'Book Appointment via WhatsApp'}</span>
                    </a>

                    <Link
                      href="/get-estimate"
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-[#1B4332] font-semibold px-4 py-2 rounded-xl text-xs border border-emerald-950/10 transition-all"
                    >
                      <span>{isRtl ? 'طلب خطة علاجية مخصصة' : 'Get Free Treatment Plan'}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Top Specialities & Transparent Indicative Costs ── */}
      <section className="py-12 md:py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] block mb-2">
              {isRtl ? 'تكاليف تقريبية وشفافة' : 'Transparent Pricing Guide'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B4332]">
              {isRtl ? `أبرز العلاجات والأسعار التقريبية في ${hubName}` : `Key Procedures & Indicative Costs in ${hub.nameEn}`}
            </h2>
            <p className="text-xs text-text-muted mt-2">
              {isRtl 
                ? 'الأسعار تشمل الإقامة والفحوصات والجراحة؛ لا توجد أي رسوم إضافية ويكون الدفع للمستشفى مباشرة.'
                : 'Indicative inclusive hospital costs. TreatInKerala charges zero coordination fees — you pay directly to the hospital.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hub.topSpecialities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-primary-green w-fit mb-3">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1B4332] mb-1">
                    {isRtl ? item.nameAr : item.nameEn}
                  </h3>
                  <div className="inline-block bg-[#D4A96A]/15 text-[#8C6D37] font-bold text-xs px-2.5 py-1 rounded-lg border border-[#D4A96A]/30 mb-3">
                    {isRtl ? item.costAr : item.costEn}
                  </div>
                  <p className="text-xs text-[#4A5C52] leading-relaxed font-light">
                    {isRtl ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                      isRtl
                        ? `مرحباً، أود الحصول على تسعيرة دقيقة لعلاج ${item.nameAr} في ${hubName}.`
                        : `Hello, I would like an exact cost quote for ${item.nameEn} in ${hub.nameEn}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-primary-green hover:underline flex items-center justify-between"
                  >
                    <span>{isRtl ? 'طلب تسعيرة دقيقة للحالة' : 'Get Custom Case Estimate'}</span>
                    <ArrowRight className={`h-3 w-3 ${isRtl ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Patient Accommodations & Family Stays ── */}
      <section className="py-12 md:py-16 bg-white border-y border-emerald-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] block mb-2">
              {isRtl ? 'الإقامة والنقاهة العائلية' : 'Accommodations & Family Stays'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B4332]">
              {isRtl ? `خيارات السكن والنقاهة في ${hubName}` : `Recovery Stays & Accommodations in ${hub.nameEn}`}
            </h2>
            <p className="text-xs text-text-muted mt-2">
              {isRtl
                ? 'نرتب شققاً وفللاً فندقية مجهزة للمرضى والمرافقين تناسب الخصوصية التامة للعائلات العربية.'
                : 'Inspected family apartments, private villas, and recovery cottages tailored for patient recovery and Gulf families.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hub.accommodations.map((acc, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-3xl p-6 border border-emerald-950/10 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="p-2.5 rounded-2xl bg-white text-[#D4A96A] w-fit mb-3 border border-slate-200/60">
                    <Hotel className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1B4332] mb-2">
                    {isRtl ? acc.titleAr : acc.titleEn}
                  </h3>
                  <p className="text-xs text-[#4A5C52] leading-relaxed font-light">
                    {isRtl ? acc.descAr : acc.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary-green shrink-0" />
                  <span>{isRtl ? 'يتم التنسيق والحجز عبر فريقنا المحلي' : 'Arranged directly by TreatInKerala concierge'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Localized FAQ Accordion ── */}
      <section className="py-12 md:py-16 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] block mb-2">
              {isRtl ? 'الأسئلة الشائعة والمعلومات العملية' : 'Hub FAQs & Practical Answers'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B4332]">
              {isRtl ? `أسئلة المرضى حول العلاج في ${hubName}` : `Frequently Asked Questions About ${hub.nameEn}`}
            </h2>
          </div>

          <div className="space-y-3">
            {hub.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const question = isRtl ? faq.qAr : faq.qEn;
              const answer = isRtl ? faq.aAr : faq.aEn;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-emerald-950/10 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-[#1B4332] hover:bg-slate-50 transition-colors"
                  >
                    <span className="leading-snug">{question}</span>
                    <span className="p-1 rounded-full bg-slate-100 text-[#1B4332] shrink-0">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#4A5C52] leading-relaxed border-t border-slate-100 bg-[#FCFBF9]">
                      <p>{answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Conversion Banner ── */}
      <section className="py-16 bg-gradient-to-br from-[#1B4332] via-[#245740] to-[#1B4332] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-[#E9C46A] border border-white/10 mx-auto">
            <HeartHandshake className="h-4 w-4" />
            <span>{isRtl ? 'خدمة مرافقة وتنسيق مجانية 100%' : '100% Free Concierge & Direct Hospital Pricing'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {isRtl
              ? `هل تخطط للعلاج في ${hubName}؟ تحدث مع فريقنا الآن`
              : `Planning Your Medical Trip to ${hub.nameEn}?`}
          </h2>

          <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {isRtl
              ? `أرسل تقاريرك الطبية مباشرة لمنسقنا المقيم في ${hubName} لتلقي الرأي الطبي المبدئي، وخطة العلاج، والتكلفة التقديرية خلال 24 ساعة دون أي التزام.`
              : `Share your medical reports with our on-ground ${hub.nameEn} coordination desk. Receive doctor opinions, estimated costs, and visa assistance within 24 hours.`}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                isRtl
                  ? `مرحباً، أود إرسال التقارير الطبية للمنسق المقيم في ${hubName} للحصول على استشارة مجانية.`
                  : `Hello, I would like to send my medical reports to the resident coordinator in ${hub.nameEn}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-7 py-3.5 rounded-2xl text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{isRtl ? 'إرسال التقارير عبر واتساب' : 'Send Reports on WhatsApp'}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl text-sm backdrop-blur-xs border border-white/20 transition-all"
            >
              <PhoneCall className="h-4 w-4 text-[#E9C46A]" />
              <span>{isRtl ? 'حجز مكالمة استشارية' : 'Book a Call'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
