'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  FileText,
  Users,
  DollarSign,
  PhoneCall,
  Calendar,
  Plane,
  Heart,
  Smile
} from 'lucide-react';

interface Step {
  num: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface Phase {
  phaseNum: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  steps: Step[];
}

export default function JourneyTimeline() {
  const t = useTranslations('Journey');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const phases: Phase[] = [
    {
      phaseNum: '01',
      titleEn: 'Preparation & Planning',
      titleAr: 'التحضير والتخطيط',
      descEn: 'Coordinating your treatment details, records, and estimates before you travel.',
      descAr: 'تنسيق تفاصيل العلاج والتقارير والتقديرات الطبية قبل سفرك.',
      steps: [
        { num: 1, icon: FileText },
        { num: 2, icon: Users },
        { num: 3, icon: DollarSign }
      ]
    },
    {
      phaseNum: '02',
      titleEn: 'Consultation & Travel',
      titleAr: 'الاستشارة والوصول',
      descEn: 'Shortlisting specialists, booking travel, and arriving safely in Kerala.',
      descAr: 'اختيار الأطباء، ترتيبات الحجز، والوصول الآمن إلى كيرلا.',
      steps: [
        { num: 4, icon: PhoneCall },
        { num: 5, icon: Calendar }
      ]
    },
    {
      phaseNum: '03',
      titleEn: 'Treatment & Recovery',
      titleAr: 'العلاج والتعافي',
      descEn: 'Receiving world-class medical care and returning home safely.',
      descAr: 'الحصول على رعاية طبية ممتازة والعودة سالماً إلى وطنك.',
      steps: [
        { num: 6, icon: Plane },
        { num: 7, icon: Heart },
        { num: 8, icon: Smile }
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
            {isRtl ? 'خريطة الطريق الطبية' : 'Your Medical Roadmap'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            {isRtl
              ? 'خطوات بسيطة ومدروسة لرحلتك العلاجية من البداية للتعافي الكامل'
              : 'Simple, transparent steps designed to guide you calmly from consultation to recovery.'}
          </p>
        </div>

        {/* 3-Column Phases Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {phases.map((phase) => (
            <div key={phase.phaseNum} className="space-y-10 relative">
              {/* Phase Header */}
              <div className="space-y-3 pb-6 border-b border-[#D4A96A]/35">
                <div className="text-xs font-bold text-accent-gold uppercase tracking-wider flex items-center gap-2">
                  <span>{isRtl ? 'المرحلة' : 'Phase'}</span>
                  <span>{phase.phaseNum}</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-primary-dark">
                  {isRtl ? phase.titleAr : phase.titleEn}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {isRtl ? phase.descAr : phase.descEn}
                </p>
              </div>

              {/* Steps List */}
              <div className="space-y-8">
                {phase.steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.num} className="flex gap-5 items-start group">
                      {/* Minimal clean icon circle */}
                      <div className="w-10 h-10 rounded-full bg-white border border-[#D4A96A]/35 flex items-center justify-center shrink-0 text-primary-green shadow-xs transition-all duration-500 group-hover:bg-primary-green group-hover:text-white group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1 text-left rtl:text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#D4A96A]/60">0{step.num}</span>
                          <h4 className="text-base font-bold text-primary-dark group-hover:text-primary-green transition-colors duration-300">
                            {t(`step${step.num}.title`)}
                          </h4>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed">
                          {t(`step${step.num}.desc`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
