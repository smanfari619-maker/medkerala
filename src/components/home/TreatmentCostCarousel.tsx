'use client';

import React, { useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Heart,
  Activity,
  Smile,
  Leaf,
  Stethoscope,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

interface TreatmentItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleAr: string;
  keralaPriceUsd: string;
  keralaPriceAed: string;
  savings: string;
  typicalStayEn: string;
  typicalStayAr: string;
  hospitalEn: string;
  hospitalAr: string;
  slug: string;
}

const TREATMENTS: TreatmentItem[] = [
  {
    id: 'cardiac',
    icon: Heart,
    titleEn: 'Cardiac Surgery & Valve Repair',
    titleAr: 'جراحة القلب المفتوح واستبدال الصمامات',
    keralaPriceUsd: '$5,500 – $8,500',
    keralaPriceAed: '20,000 – 31,000 د.إ',
    savings: '75%',
    typicalStayEn: '10–14 days stay',
    typicalStayAr: 'إقامة ١٠–١٤ يوماً',
    hospitalEn: 'Aster MIMS & Meitra',
    hospitalAr: 'أستر ميمز وميترا',
    slug: '/treatments/cardiac-surgery',
  },
  {
    id: 'ortho',
    icon: Activity,
    titleEn: 'Knee & Hip Joint Replacement',
    titleAr: 'استبدال مفصل الركبة والحوض',
    keralaPriceUsd: '$4,200 – $6,500',
    keralaPriceAed: '15,500 – 24,000 د.إ',
    savings: '70%',
    typicalStayEn: '7–12 days stay',
    typicalStayAr: 'إقامة ٧–١٢ يوماً',
    hospitalEn: 'Baby Memorial & Aster',
    hospitalAr: 'بيبي ميموريال وأستر',
    slug: '/treatments/joint-replacement',
  },
  {
    id: 'ayurveda',
    icon: Leaf,
    titleEn: 'Ayurveda Panchakarma & Detox',
    titleAr: 'الأيورفيدا والبانشاكارما والاستشفاء',
    keralaPriceUsd: '$1,200 – $2,800',
    keralaPriceAed: '4,400 – 10,200 د.إ',
    savings: '65%',
    typicalStayEn: '14–21 days retreat',
    typicalStayAr: 'إقامة ١٤–٢١ يوماً',
    hospitalEn: 'Kottakkal Arya Vaidya Partners',
    hospitalAr: 'مراكز كوتاكال الشريكة',
    slug: '/ayurveda',
  },
  {
    id: 'oncology',
    icon: Stethoscope,
    titleEn: 'Oncology & Precision CyberKnife',
    titleAr: 'علاج الأورام وجراحة سايبر نايف',
    keralaPriceUsd: '$5,000 – $9,000',
    keralaPriceAed: '18,500 – 33,000 د.إ',
    savings: '70%',
    typicalStayEn: '14–20 days care',
    typicalStayAr: 'رعاية ١٤–٢٠ يوماً',
    hospitalEn: 'MVR Cancer Centre & Aster',
    hospitalAr: 'مركز MVR وأستر ميمز',
    slug: '/treatments/oncology',
  },
  {
    id: 'dental',
    icon: Smile,
    titleEn: 'Full Mouth Dental Implants',
    titleAr: 'زراعة الأسنان وتجميل الابتسامة',
    keralaPriceUsd: '$600 – $2,500',
    keralaPriceAed: '2,200 – 9,200 د.إ',
    savings: '80%',
    typicalStayEn: '3–7 days stay',
    typicalStayAr: 'إقامة ٣–٧ أيام',
    hospitalEn: 'NABH Dental Centres',
    hospitalAr: 'مراكز الأسنان المعتمدة',
    slug: '/treatments/dental',
  },
];

export default function TreatmentCostCarousel() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -360 : 360;
    scrollRef.current.scrollBy({ left: isRtl ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#D4A96A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 rtl:text-right">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6D37] block">
              {isRtl ? 'شفافية التكاليف' : 'Transparent Pricing'}
            </span>
            <h2 className="font-display font-normal tracking-[-0.03em] text-2xl sm:text-4xl text-[#1B4332] leading-tight">
              {isRtl ? 'رعاية صحية بمعايير عالمية بتكلفة مباشرة' : 'World-Class Care at Transparent Rates'}
            </h2>
            <p className="text-base text-[#4A5C52] leading-relaxed">
              {isRtl
                ? 'فواتير رسمية مباشرة من المستشفى بدون أي عمولات وساطة. أسعار استرشادية تشمل التنسيق والإقامة.'
                : 'Direct hospital billing with zero intermediary markups. Indicative estimates including personal concierge and stay.'}
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll(isRtl ? 'right' : 'left')}
              className="w-11 h-11 rounded-full border border-[#D4A96A]/30 bg-white hover:bg-slate-50 text-[#1B4332] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => scroll(isRtl ? 'left' : 'right')}
              className="w-11 h-11 rounded-full border border-[#D4A96A]/30 bg-white hover:bg-slate-50 text-[#1B4332] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Treatment Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-momentum snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {TREATMENTS.map((item) => {
            const Icon = item.icon;
            const waQuery = isRtl
              ? `مرحباً، أود الحصول على تقدير تكلفة ${item.titleAr} في كيرلا.`
              : `Hello, I would like an official treatment estimate for ${item.titleEn} in Kerala.`;

            return (
              <div
                key={item.id}
                className="snap-start shrink-0 w-[85vw] sm:w-[340px] lg:w-[370px] bg-white rounded-3xl p-7 sm:p-8 border border-[#1B4332]/8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Category Icon + Savings Pill */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#2D6A4F] flex items-center justify-center border border-[#D4A96A]/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-[#1B4332] border border-emerald-100">
                      {isRtl ? `توفير ~${item.savings}` : `Save ~${item.savings} vs GCC/UK`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#1B4332] mb-2 leading-snug">
                    {isRtl ? item.titleAr : item.titleEn}
                  </h3>

                  {/* Hospital & Stay Context */}
                  <div className="flex items-center gap-2 text-xs text-[#5D6B64] mb-6">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#2D6A4F] shrink-0" />
                    <span>{isRtl ? item.hospitalAr : item.hospitalEn}</span>
                    <span>•</span>
                    <span>{isRtl ? item.typicalStayAr : item.typicalStayEn}</span>
                  </div>

                  {/* Price Block */}
                  <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#D4A96A]/15 mb-6">
                    <span className="text-[11px] font-medium text-[#7A8A80] uppercase tracking-wider block mb-1">
                      {isRtl ? 'التكلفة التقديرية في كيرلا' : 'Indicative Kerala Cost'}
                    </span>
                    <div className="text-2xl font-bold text-[#1B4332] font-display">
                      {isRtl ? item.keralaPriceAed : item.keralaPriceUsd}
                    </div>
                    <div className="text-xs text-[#7A8A80] mt-1">
                      {isRtl ? item.keralaPriceUsd : item.keralaPriceAed}
                    </div>
                  </div>
                </div>

                {/* Single High-Converting WhatsApp CTA */}
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(waQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full text-sm font-semibold bg-[#1B4332] hover:bg-[#2D6A4F] text-white transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>{isRtl ? 'استشر طبيباً عبر واتساب' : 'Inquire on WhatsApp'}</span>
                  <ArrowRight className={`h-4 w-4 text-white/70 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Clean reassuring footer */}
        <div className="mt-8 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D6A4F] hover:text-[#1B4332] transition-colors"
          >
            <span>{isRtl ? 'عرض جميع التخصصات والإجراءات الطبية' : 'View all surgical specialties & treatments'}</span>
            <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>

      </div>
    </section>
  );
}
