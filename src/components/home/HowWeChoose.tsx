'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import {
  ShieldCheck,
  Stethoscope,
  DollarSign,
  MapPin,
  Globe2,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function HowWeChoose() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const criteria = [
    {
      num: '01',
      icon: ShieldCheck,
      badgeEn: 'Non-Negotiable',
      badgeAr: 'معيار إلزامي',
      titleEn: 'Strict JCI & NABH Accreditation',
      titleAr: 'اعتماد دولي صارم (JCI و NABH)',
      descEn:
        'Every hospital in our network must hold active national (NABH) or international (JCI) accreditation with verified clinical hygiene protocols and modern surgical theatres.',
      descAr:
        'يجب أن يحمل كل مستشفى في شبكتنا اعتماداً وطنياً (NABH) أو دولياً (JCI) ساري المفعول مع بروتوكولات تعقيم مثبتة وغرف عمليات حديثة.',
    },
    {
      num: '02',
      icon: Stethoscope,
      badgeEn: 'Clinical Excellence',
      badgeAr: 'كفاءة الجراحين',
      titleEn: 'Specialist Seniority & Case Experience',
      titleAr: 'خبرة الأطباء الاستشاريين وسجل العمليات',
      descEn:
        'We match your reports to senior surgeons and department heads with 15+ years of experience and high success rates in your specific condition.',
      descAr:
        'نطابق تقاريرك الطبية مع كبار الجراحين ورؤساء الأقسام ممن يمتلكون أكثر من ١٥ عاماً من الخبرة وسجلات نجاح عالية في حالتك بالذات.',
    },
    {
      num: '03',
      icon: DollarSign,
      badgeEn: 'Zero Hidden Markup',
      badgeAr: 'بدون أي عمولات',
      titleEn: 'Direct Hospital Pricing & Transparency',
      titleAr: 'تسعير مباشر من المستشفى وشفافية مطلقة',
      descEn:
        'You receive official itemized quotations directly on hospital letterhead. You pay the hospital directly — we add zero agency margin to your medical bills.',
      descAr:
        'تتلقى عروض أسعار تفصيلية رسمية صادرة مباشرة من المستشفى. الدفع يتم للمستشفى مباشرة بدون أي زيادة أو هوامش ربحية من طرفنا.',
    },
    {
      num: '04',
      icon: MapPin,
      badgeEn: 'Travel Comfort',
      badgeAr: 'راحة السفر',
      titleEn: 'Airport Distance & Recovery Logistics',
      titleAr: 'قرب المستشفى من المطار وبيئة التعافي',
      descEn:
        'We consider flight connectivity and distance from Calicut (CCJ), Kochi (COK), or Trivandrum (TRV) international airports to ensure minimal transit stress for recovering patients.',
      descAr:
        'نراعي سهولة خطوط الطيران والمسافة من مطارات كالكوت أو كوتشي أو تيروفانانتابورام لضمان أقل جهد بدني ممكن للمريض ومرافقيه.',
    },
    {
      num: '05',
      icon: Globe2,
      badgeEn: 'Cultural Comfort',
      badgeAr: 'رعاية مخصصة',
      titleEn: 'Arabic Translators & International Desks',
      titleAr: 'مترجمون عرب وخدمات المرضى الدوليين',
      descEn:
        'We select hospitals with dedicated international patient desks, complimentary Arabic interpreters, Halal dining options, and visa invitation letter desks.',
      descAr:
        'نختار مستشفيات مجهزة بمكاتب متخصصة للمرضى الدوليين، مترجمين عرب دائمين، خيارات طعام حلال، ومكتب إصدار خطابات التأشيرة العلاجية.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-[#FAF7F2] border-t border-[#D4A96A]/20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 rounded-full bg-[#2D6A4F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#D4A96A]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-4 text-left rtl:text-right">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D4A96A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A]">
              {isRtl ? 'معايير الاختيار والنزاهة الطبية' : 'Our Recommendation Standard'}
            </span>
          </div>

          <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-3xl sm:text-4xl lg:text-5xl text-[#1B4332]">
            {isRtl
              ? 'كيف نختار ونرشح لك المستشفى المناسب؟'
              : 'How we choose and recommend your hospital.'}
          </h2>

          <p className="text-text-muted font-light leading-[1.75] text-base sm:text-lg">
            {isRtl
              ? 'لا نعتمد على الإعلانات أو العمولات المدفوعة. ترشيحاتنا مبنية على ٥ معايير طبية ولوجستية صارمة وموثقة لضمان أفضل نتيجة علاجية.'
              : 'We never accept pay-for-placement. Our hospital recommendations are based on 5 strict, transparent clinical and logistical criteria to protect your health.'}
          </p>
        </div>

        {/* 5 Criteria Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {criteria.map((item, idx) => {
            const Icon = item.icon;
            const isWide = idx === 3 || idx === 4;
            return (
              <div
                key={item.num}
                className={`bg-white border border-[#D4A96A]/15 rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between hover:border-[#2D6A4F]/35 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group text-left rtl:text-right ${
                  isWide ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Number and Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#D4A96A] border border-[#D4A96A]/25 flex items-center justify-center text-xs font-bold font-display">
                      {item.num}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#2D6A4F]/8 text-[#2D6A4F] border border-[#2D6A4F]/15">
                      {isRtl ? item.badgeAr : item.badgeEn}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#2D6A4F] border border-[#2D6A4F]/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#1B4332] group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-display font-medium text-[#1B4332] tracking-tight">
                    {isRtl ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-[#4A5C52] text-sm font-light leading-relaxed">
                    {isRtl ? item.descAr : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Ethics & Direct Billing Callout */}
          <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden text-left rtl:text-right">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4A96A] uppercase tracking-wider">
                <Lock className="h-4 w-4 text-[#D4A96A]" />
                <span>{isRtl ? 'ميثاق الشفافية' : 'Our Transparency Charter'}</span>
              </div>

              <h3 className="text-2xl font-display font-medium text-white tracking-tight">
                {isRtl ? 'أنت تدفع للمستشفى مباشرة، لا لنا' : 'You pay the hospital directly, not us'}
              </h3>

              <ul className="space-y-2.5 text-xs text-white/90 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A96A] shrink-0 mt-0.5" />
                  <span>{isRtl ? 'خدمات التنسيق مجانية ١٠٠٪ للمريض' : '100% complimentary patient coordination'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A96A] shrink-0 mt-0.5" />
                  <span>{isRtl ? 'لا رسوم خفية ولا هوامش على الفواتير الطبية' : 'Zero added margins on hospital tariffs'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A96A] shrink-0 mt-0.5" />
                  <span>{isRtl ? 'حرية كاملة لاختيار أو تغيير المستشفى' : 'Full freedom to choose or change facility'}</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/hospitals"
                className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#1B4332] hover:bg-white text-xs font-bold px-5 py-3 rounded-full transition-all duration-200 group shadow-sm"
              >
                <span>{isRtl ? 'استكشف شبكة المستشفيات المعتمدة' : 'Browse Accredited Hospitals'}</span>
                <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-200 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
