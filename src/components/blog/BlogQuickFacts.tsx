import React from 'react';
import { DollarSign, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

interface BlogQuickFactsProps {
  locale: string;
  category: string;
}

export default function BlogQuickFacts({ locale, category }: BlogQuickFactsProps) {
  const isRtl = locale === 'ar';

  const facts = [
    {
      icon: DollarSign,
      titleEn: 'Average Savings',
      titleAr: 'نسبة التوفير المتوقعة',
      descEn: '60% – 75% lower than GCC & UK',
      descAr: 'توفير ٦٠٪ – ٧٥٪ مقارنة بدول الخليج وبريطانيا',
      highlight: true,
    },
    {
      icon: Clock,
      titleEn: 'Recommended Stay',
      titleAr: 'مدة الإقامة المقترحة',
      descEn: '7 to 18 Days (procedure + post-op)',
      descAr: '٧ إلى ١٨ يوماً (العملية وفترة التعافي)',
      highlight: false,
    },
    {
      icon: ShieldCheck,
      titleEn: 'Hospital Tier',
      titleAr: 'مستوى المستشفيات',
      descEn: 'JCI & NABH Accredited Facilities',
      descAr: 'مستشفيات معتمدة دولياً (JCI و NABH)',
      highlight: false,
    },
    {
      icon: HeartHandshake,
      titleEn: 'Coordination Fee',
      titleAr: 'رسوم التنسيق والترجمة',
      descEn: '100% Free • Arabic Liaison Included',
      descAr: 'مجاناً ١٠٠٪ • مترجم عربي واستقبال بالمطار',
      highlight: true,
    },
  ];

  return (
    <div
      className="my-6 rounded-2xl bg-[#FAF7F2] border border-[#D4A96A]/30 p-4 sm:p-5 shadow-2xs"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#D4A96A]/20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs shrink-0">
            ⚡
          </span>
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B4332] leading-snug">
            {isRtl ? 'أبرز الحقائق السريرية باختصار' : 'At-a-Glance Highlights'}
          </h3>
        </div>
        {category && (
          <span className="text-[11px] font-semibold text-[#8C6D37] bg-white px-2.5 py-0.5 rounded-md border border-[#D4A96A]/25 whitespace-nowrap shrink-0">
            {category}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {facts.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className={`p-3 rounded-xl border transition-all ${
                f.highlight
                  ? 'bg-white border-[#2D6A4F]/25 shadow-2xs'
                  : 'bg-white/80 border-slate-200/80'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-[#1B4332]/8 text-[#1B4332]">
                  <Icon className="h-3.5 w-3.5 text-[#2D6A4F]" />
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {isRtl ? f.titleAr : f.titleEn}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#1B4332] mt-1 leading-snug">
                {isRtl ? f.descAr : f.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
