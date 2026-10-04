'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  FileText,
  Building2,
  HeartHandshake,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function HowItWorksStepper() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const steps = [
    {
      step: '01',
      icon: FileText,
      titleEn: 'Send Your Medical Reports',
      titleAr: 'أرسل تقاريرك الطبية',
      descEn:
        'Share your MRI, scans, or medical summary via WhatsApp. Kerala senior specialists review your case within 24 hours free of charge.',
      descAr:
        'شارك صور الأشعة أو التقارير عبر واتساب. يراجع كبار الأطباء الجراحين حالتك خلال ٢٤ ساعة مجاناً.',
    },
    {
      step: '02',
      icon: Building2,
      titleEn: 'Receive Direct Hospital Plan',
      titleAr: 'احصل على خطة علاجية مباشرة',
      descEn:
        'Receive an itemized quote directly on hospital letterhead. You pay the hospital directly with zero agency markup.',
      descAr:
        'تحصل على عرض سعر رسمي ومفصل مباشرة من المستشفى بدون أي رسوم وساطة أو هوامش إضافية.',
    },
    {
      step: '03',
      icon: HeartHandshake,
      titleEn: 'Arrive with Personal Care',
      titleAr: 'الوصول برعاية مخصصة وشاملة',
      descEn:
        'Your dedicated liaison greets you at the airport, assists with hospital admission and translation, and supports you through recovery.',
      descAr:
        'يستقبلك منسقك الخاص في المطار، ويتولى إجراءات المستشفى والترجمة، ويبقى بجانبك حتى تعافيك التام.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#D4A96A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6D37] block">
            {isRtl ? 'بساطة الإجراءات' : 'How It Works'}
          </span>
          <h2 className="font-display font-normal tracking-[-0.03em] text-2xl sm:text-4xl text-[#1B4332] leading-tight">
            {isRtl ? 'رحلتك العلاجية في ٣ خطوات واضحة' : 'Your Journey in 3 Clear Steps'}
          </h2>
          <p className="text-base text-[#4A5C52] leading-relaxed">
            {isRtl
              ? 'نهتم بكل التفاصيل التنظيمية حتى تتفرغ أنت وعائلتك للشفاء وراحة البال.'
              : 'We coordinate the logistical and medical details so you and your family can focus entirely on healing.'}
          </p>
        </div>

        {/* 3 Step Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#1B4332]/8 flex flex-col justify-between rtl:text-right transition-all duration-300 hover:border-[#D4A96A]/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-3xl font-light text-[#D4A96A]">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#2D6A4F] flex items-center justify-center shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[#1B4332] mb-3 leading-snug">
                    {isRtl ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-sm text-[#4A5C52] leading-relaxed">
                    {isRtl ? item.descAr : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Single Focused Consultation CTA */}
        <div className="text-center pt-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
              isRtl
                ? 'مرحباً، أود استشارة منسق طبي ومشاركة تقاريري.'
                : 'Hello, I have my medical reports and would like a doctor review.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold bg-[#1B4332] hover:bg-[#2D6A4F] text-white transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
          >
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            <span>{isRtl ? 'أرسل تقاريرك لاستشارة مجانية' : 'Send Reports for Free Doctor Review'}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
