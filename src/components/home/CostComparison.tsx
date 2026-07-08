'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Landmark, ArrowRight, CirclePercent, Heart, Activity, Smile, Baby, Leaf, Stethoscope } from 'lucide-react';

type Currency = 'USD' | 'AED' | 'GBP' | 'EUR' | 'OMR';

interface TreatmentCost {
  key: string;
  kerala: number;
  uk: number;
  usa: number;
  uae: number;
}

export default function CostComparison() {
  const t = useTranslations('CostComparison');
  const locale = useLocale();
  const [currency, setCurrency] = useState<Currency>('USD');

  const treatmentIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    bypass: Heart,
    hip: Activity,
    knee: Activity,
    ivf: Baby,
    dental: Smile,
    ayurveda: Leaf,
  };

  // Exchange rates relative to 1 USD
  const exchangeRates: Record<Currency, { rate: number; symbol: string; align: 'left' | 'right' }> = {
    USD: { rate: 1, symbol: '$', align: 'left' },
    AED: { rate: 3.67, symbol: ' AED', align: 'right' },
    GBP: { rate: 0.79, symbol: '£', align: 'left' },
    EUR: { rate: 0.93, symbol: '€', align: 'left' },
    OMR: { rate: 0.38, symbol: ' OMR', align: 'right' },
  };

  const treatments: TreatmentCost[] = [
    { key: 'bypass', kerala: 6000, uk: 40000, usa: 120000, uae: 28000 },
    { key: 'hip', kerala: 5500, uk: 19000, usa: 45000, uae: 20000 },
    { key: 'knee', kerala: 5000, uk: 18000, usa: 40000, uae: 18000 },
    { key: 'ivf', kerala: 2800, uk: 9000, usa: 16500, uae: 9500 },
    { key: 'dental', kerala: 600, uk: 2800, usa: 4500, uae: 2200 },
    { key: 'ayurveda', kerala: 1800, uk: 5500, usa: 8500, uae: 4200 },
  ];

  const formatPrice = (val: number, cur: Currency) => {
    const info = exchangeRates[cur];
    const converted = Math.round(val * info.rate);
    const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(converted);
    return info.align === 'left' ? `${info.symbol}${formatted}` : `${formatted}${info.symbol}`;
  };

  const calculateSavings = (keralaVal: number, compareVal: number) => {
    return Math.round(((compareVal - keralaVal) / compareVal) * 100);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark forest green container card */}
        <div className="bg-[#1B4332] text-white rounded-[24px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-radial-gradient from-primary-green/20 to-transparent opacity-65 -z-10" />

          {/* Section Header */}
          <div className="max-w-3xl mb-12 space-y-4 text-left rtl:text-right">
            {/* Eyebrow */}
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#BAD7B0]">
              {locale === 'ar' ? 'مقارنة التكاليف' : 'Cost Comparison'}
            </span>
            
            {/* Two-tone Heading on dark background */}
            <h2 className="font-display font-normal tracking-[-0.025em] leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
              <span className="block text-white">{t('heading')}</span>
            </h2>
            <p className="text-slate-300 font-light leading-[1.65] text-base sm:text-lg">
              {t('subheading')}
            </p>
          </div>

          {/* Currency Switcher Pill Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <div className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-[#9ACF88] shrink-0" />
              <span className="font-medium text-white text-base">{t('currencyLabel')}:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(exchangeRates) as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer min-h-[40px] min-w-[60px] ${
                    currency === cur
                      ? 'bg-[#BAD7B0] text-[#1B4332] shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white text-text-dark rounded-[20px] overflow-hidden border border-slate-100 shadow-lg">
            <div className="overflow-x-auto no-scrollbar scroll-mask-fade">
              <table className="w-full text-left border-collapse min-w-[700px]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <thead>
                  <tr className="bg-[#F5F8F4] text-[#1B4332] text-xs font-semibold uppercase tracking-[0.08em] border-b border-slate-100">
                    <th className="py-4 px-6 whitespace-nowrap">{t('treatmentName')}</th>
                    <th className="py-4 px-6 text-center bg-emerald-50/50 text-[#1B4332] font-semibold">
                      {t('kerala')}
                    </th>
                    <th className="py-4 px-6 text-center font-normal">{t('uk')}</th>
                    <th className="py-4 px-6 text-center font-normal">{t('usa')}</th>
                    <th className="py-4 px-6 text-center font-normal">{t('uae')}</th>
                    <th className="py-4 px-6 text-center text-emerald-600 font-semibold">{locale === 'ar' ? 'الوفورات' : 'Savings'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                  {treatments.map((tr) => {
                    const ukSavings = calculateSavings(tr.kerala, tr.uk);
                    const Icon = treatmentIcons[tr.key] || Stethoscope;
                    return (
                      <tr key={tr.key} className="hover:bg-slate-50 transition-colors duration-150 group">
                        <td className="py-4 px-6 font-bold text-text-dark whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary-green/8 text-primary-green flex items-center justify-center shrink-0 group-hover:bg-primary-green group-hover:text-white transition-all duration-300">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-[#1B4332]">{t(`treatments.${tr.key}`)}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center font-extrabold text-primary-green bg-primary-light/5">
                          {formatPrice(tr.kerala, currency)}
                        </td>
                        <td className="py-4 px-6 text-center text-text-muted">
                          {formatPrice(tr.uk, currency)}
                        </td>
                        <td className="py-4 px-6 text-center text-text-muted">
                          {formatPrice(tr.usa, currency)}
                        </td>
                        <td className="py-4 px-6 text-center text-text-muted">
                          {formatPrice(tr.uae, currency)}
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-emerald-600">
                          <div className="flex flex-col items-center justify-center gap-1.5 min-w-[100px] sm:min-w-[120px]">
                            <div className="flex items-center gap-1">
                              <CirclePercent className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                              <span className="font-extrabold text-sm sm:text-base">{t('savingsText', { percent: ukSavings })}</span>
                            </div>
                            {/* Progress bar container */}
                            <div className="w-24 h-1.5 bg-emerald-100 rounded-full overflow-hidden shadow-inner hidden sm:block">
                              <div 
                                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                                style={{ width: `${ukSavings}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="py-4 px-6 bg-slate-50 border-t border-slate-100 text-xs text-text-muted flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>{t('note', { currency })}</p>
              <Link
                href="/get-estimate"
                className="inline-flex items-center gap-1.5 text-primary-green hover:text-primary-dark font-medium text-sm transition-all duration-300 group min-h-[44px]"
              >
                <span>{t('cta')}</span>
                <ArrowRight className={`h-4 w-4 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

