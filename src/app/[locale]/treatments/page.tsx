import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TREATMENTS, TREATMENT_PACKAGES } from '@/lib/data';
import { ShieldCheck, Info, ArrowRight } from 'lucide-react';
import TreatmentListClient from '@/components/treatments/TreatmentListClient';
import { getBreadcrumbSchema } from '@/lib/schemas';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr 
      ? 'العلاجات الطبية والتقليدية في كيرلا | علاج في كيرلا' 
      : 'Medical & Traditional Treatments in Kerala | TreatInKerala',
    description: isAr
      ? 'استكشف قائمة العلاجات والعمليات الطبية والتقليدية في كيرلا بالهند. جراحة القلب، استبدال المفاصل، علاج العقم، الأيورفيدا، علاج الأورام وجراحة الأعصاب بأسعار منافسة.'
      : 'Explore medical, surgical, and traditional Ayurvedic treatments in Kerala, India. Low cost cardiac bypass, orthopaedics, dental care, IVF, oncology, neurosurgery, and gastroenterology.',
    alternates: {
      canonical: isAr ? '/ar/treatments' : '/en/treatments',
      languages: {
        en: '/en/treatments',
        ar: '/ar/treatments',
      },
    },
  };
}

export default async function TreatmentsPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const isRtl = locale === 'ar';

  const learnMoreText = tCommon('learnMore');
  const costsFromText = isRtl ? 'المدى التقديري' : 'Est. Range';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRtl ? 'الرئيسية' : 'Home', url: `https://treatinkerala.com/${locale}` },
    { name: isRtl ? 'العلاجات' : 'Treatments', url: `https://treatinkerala.com/${locale}/treatments` }
  ]);

  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#D4A96A]/15 text-xs font-bold text-primary-dark px-3 py-1 rounded-full shadow-sm">
              <span className="text-[#FFA500]">★</span>
              <span>4.9/5</span>
              <span className="text-slate-300">|</span>
              <span className="text-text-muted font-normal font-sans">{locale === 'ar' ? 'أكثر من ٨٠ تقييم مريض موثق' : '80+ Verified Reviews'}</span>
            </span>
          </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                {locale === 'ar' ? 'التخصصات العلاجية' : 'Medical Specialities'}
              </span>
              <span className="h-px w-8 bg-[#D4A96A]" />
            </div>
            <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
            {locale === 'ar' 
              ? 'العلاجات الطبية والتقليدية في كيرلا' 
              : 'Medical & Traditional Treatments in Kerala'}
          </h1>
          <p className="text-lg text-text-muted font-sans">
            {locale === 'ar'
              ? 'اختر من بين التخصصات الطبية الحديثة والجراحة المتقدمة، أو استكشف برامج الاستشفاء وتطهير الجسم باللأيورفيدا الأصيلة.'
              : 'Browse our range of high-quality allopathic surgical treatments and authentic traditional Ayurvedic healing packages coordinated by TreatInKerala.'}
          </p>
        </div>

        {/* Pricing Transparency Explainer Banner */}
        <div className="bg-white border border-[#D4A96A]/15 rounded-[2rem] p-6 mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
          <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 w-1.5 bg-[#D4A96A]"></div>
          <div className="flex gap-3.5 items-start sm:items-center z-10">
            <div className="h-8 w-8 rounded-full bg-white border border-[#D4A96A]/20 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-xs">
              <Info className="h-4 w-4 text-[#D4A96A]" />
            </div>
            <p className="font-sans text-sm text-text-muted leading-relaxed max-w-3xl">
              {locale === 'ar'
                ? 'الأسعار المعروضة هي أسعار استرشادية لعام ٢٠٢٦ من المستشفيات الشريكة المعتمدة. يرجى إرسال تقاريرك للحصول على عرض أسعار طبي دقيق ومؤكد.'
                : 'Prices shown are 2026 reference rates from accredited hospital price lists. Final confirmed cost will be issued after clinical coordinator assessment.'}
            </p>
          </div>
          <Link
            href="/faq"
            className="flex items-center gap-1.5 text-[#2D6A4F] hover:text-[#1B4332] font-bold font-sans text-sm whitespace-nowrap z-10 transition-colors duration-200 group-hover:underline decoration-2 underline-offset-4"
          >
            {locale === 'ar' ? 'اعرف المزيد عن الفوترة' : 'Learn more about billing'}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100 shrink-0" />
          </Link>
        </div>

        {/* Treatments Interactive List Component */}
        <TreatmentListClient
          treatments={TREATMENTS}
          packages={TREATMENT_PACKAGES}
          locale={locale}
          learnMoreText={learnMoreText}
          costsFromText={costsFromText}
        />

        {/* Dynamic CTA Strip */}
        <div className="mt-16 bg-primary-dark text-white rounded-3xl p-8 lg:p-12 border border-accent-gold/20 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-radial-gradient from-[#2D6A4F]/20 to-transparent -z-10 opacity-70"></div>
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-accent-gold uppercase font-sans">
              <ShieldCheck className="h-3.5 w-3.5" />
              {locale === 'ar' ? 'عرض سعر مخصص' : 'Personalised Estimates'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold font-display">
              {locale === 'ar' 
                ? 'لم تجد علاجك ضمن القائمة؟' 
                : 'Need treatment not listed here?'}
            </h3>
            <p className="text-slate-300 text-base leading-relaxed font-sans">
              {locale === 'ar'
                ? 'يقدم شركاؤنا من المستشفيات التخصصية الكبرى جميع العمليات الجراحية والعلاجية. شاركنا حالتك وسنعد لك تقريراً شاملاً بالأسعار.'
                : 'Our accredited hospital network covers all medical procedures, diagnostics, and therapies. Send us your requirements for a free estimate.'}
            </p>
          </div>
          <Link
            href="/get-estimate"
            className="bg-primary-green hover:bg-white text-white hover:text-primary-green font-bold px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] whitespace-nowrap cursor-pointer shrink-0 font-sans"
          >
            {tCommon('getEstimate')}
          </Link>
        </div>
      </div>
    </div>
  );
}
