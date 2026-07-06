'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Landmark, ArrowRight, CirclePercent } from 'lucide-react';

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

  // Exchange rates relative to 1 USD
  const exchangeRates: Record<Currency, { rate: number; symbol: string; align: 'left' | 'right' }> = {
    USD: { rate: 1, symbol: '$', align: 'left' },
    AED: { rate: 3.67, symbol: ' AED', align: 'right' },
    GBP: { rate: 0.79, symbol: '£', align: 'left' },
    EUR: { rate: 0.93, symbol: '€', align: 'left' },
    OMR: { rate: 0.38, symbol: ' OMR', align: 'right' },
  };

  const treatments: TreatmentCost[] = [
    { key: 'bypass', kerala: 4500, uk: 38000, usa: 90000, uae: 22000 },
    { key: 'hip', kerala: 5000, uk: 22000, usa: 45000, uae: 15000 },
    { key: 'knee', kerala: 4500, uk: 20000, usa: 42000, uae: 14000 },
    { key: 'ivf', kerala: 2000, uk: 8000, usa: 15000, uae: 7000 },
    { key: 'dental', kerala: 400, uk: 2500, usa: 4500, uae: 1800 },
    { key: 'ayurveda', kerala: 800, uk: 6000, usa: 9000, uae: 4000 },
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
    <section className="py-20 bg-[#FAF7F2] border-y border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold font-display text-primary-dark mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-text-muted">
            {t('subheading')}
          </p>
        </div>

        {/* Currency Switcher Pill Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#F0EDE8] p-3 rounded-2xl border border-[#D4A96A]/40">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary-green shrink-0" />
            <span className="font-semibold text-text-dark text-base">{t('currencyLabel')}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(exchangeRates) as Currency[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-4 py-2 rounded-xl text-base font-bold transition-all duration-300 cursor-pointer min-h-[44px] min-w-[64px] ${
                  currency === cur
                    ? 'bg-primary-green text-white shadow-md'
                    : 'bg-white hover:bg-slate-50 text-text-muted hover:text-primary-green border border-slate-200'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#D4A96A]/35">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-primary-dark text-white text-base sm:text-lg font-medium border-b border-[#D4A96A]/35">
                  <th className="py-5 px-6 font-display">{t('treatmentName')}</th>
                  <th className="py-5 px-6 text-center font-display bg-primary-green text-white shadow-inner">
                    {t('kerala')}
                  </th>
                  <th className="py-5 px-6 text-center font-display">{t('uk')}</th>
                  <th className="py-5 px-6 text-center font-display">{t('usa')}</th>
                  <th className="py-5 px-6 text-center font-display">{t('uae')}</th>
                  <th className="py-5 px-6 text-center font-display text-accent-gold">{locale === 'ar' ? 'الوفورات' : 'Savings'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base sm:text-lg">
                {treatments.map((tr) => {
                  const ukSavings = calculateSavings(tr.kerala, tr.uk);
                  return (
                    <tr key={tr.key} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="py-5 px-6 font-bold text-text-dark">
                        {t(`treatments.${tr.key}`)}
                      </td>
                      <td className="py-5 px-6 text-center font-extrabold text-primary-green bg-primary-light/10 shadow-xs">
                        {formatPrice(tr.kerala, currency)}
                      </td>
                      <td className="py-5 px-6 text-center text-text-muted">
                        {formatPrice(tr.uk, currency)}
                      </td>
                      <td className="py-5 px-6 text-center text-text-muted">
                        {formatPrice(tr.usa, currency)}
                      </td>
                      <td className="py-5 px-6 text-center text-text-muted">
                        {formatPrice(tr.uae, currency)}
                      </td>
                      <td className="py-5 px-6 text-center font-bold text-emerald-600 bg-emerald-50/50">
                        <div className="flex items-center justify-center gap-1">
                          <CirclePercent className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                          <span>{t('savingsText', { percent: ukSavings })}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="py-5 px-6 bg-slate-50 border-t border-slate-100 text-sm text-text-muted flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>{t('note', { currency })}</p>
            <Link
              href="/get-estimate"
              className="inline-flex items-center gap-2 text-primary-green hover:text-primary-dark font-semibold text-base transition-colors duration-300 group min-h-[44px]"
            >
              <span>{t('cta')}</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
