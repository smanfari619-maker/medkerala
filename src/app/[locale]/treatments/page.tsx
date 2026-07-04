import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TREATMENTS, TREATMENT_PACKAGES } from '@/lib/data';
import { ShieldCheck } from 'lucide-react';
import TreatmentListClient from '@/components/treatments/TreatmentListClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'ar' 
      ? 'العلاجات الطبية والتقليدية في كيرلا | ميدكيرلا' 
      : 'Medical & Traditional Treatments in Kerala | MedKerala',
    description: locale === 'ar'
      ? 'استكشف قائمة العلاجات والعمليات الطبية والتقليدية في كيرلا بالهند. جراحة القلب، استبدال المفاصل، علاج العقم، الأيورفيدا، علاج الأورام وجراحة الأعصاب بأسعار منافسة.'
      : 'Explore medical, surgical, and traditional Ayurvedic treatments in Kerala, India. Low cost cardiac bypass, orthopaedics, dental care, IVF, oncology, neurosurgery, and gastroenterology.',
  };
}

export default async function TreatmentsPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const isRtl = locale === 'ar';

  const learnMoreText = tCommon('learnMore');
  const costsFromText = isRtl ? 'أسعار تبدأ من' : 'Costs from';

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#D4A96A]/20 text-xs font-bold text-primary-dark px-3 py-1 rounded-full shadow-xs">
              <span className="text-[#FFA500]">★</span>
              <span>4.9/5</span>
              <span className="text-slate-300">|</span>
              <span className="text-text-muted font-normal font-sans">{locale === 'ar' ? 'أكثر من ٨٠ تقييم مريض موثق' : '80+ Verified Reviews'}</span>
            </span>
          </div>
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block font-sans">
            {locale === 'ar' ? 'التخصصات العلاجية' : 'Medical Specialities'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' 
              ? 'العلاجات الطبية والتقليدية في كيرلا' 
              : 'Medical & Traditional Treatments in Kerala'}
          </h1>
          <p className="text-lg text-text-muted font-sans">
            {locale === 'ar'
              ? 'اختر من بين التخصصات الطبية الحديثة والجراحة المتقدمة، أو استكشف برامج الاستشفاء وتطهير الجسم باللأيورفيدا الأصيلة.'
              : 'Browse our range of high-quality allopathic surgical treatments and authentic traditional Ayurvedic healing packages coordinated by MedKerala.'}
          </p>
        </div>

        {/* Pricing Transparency Explainer Banner */}
        <div className="bg-white border border-[#D4A96A]/20 rounded-2xl p-4 mb-8 flex gap-3 items-center text-xs text-text-muted justify-between flex-wrap shadow-xs">
          <div className="flex gap-2.5 items-center">
            <span className="text-base">ℹ️</span>
            <p className="font-sans">
              {locale === 'ar'
                ? 'الأسعار المعروضة هي أسعار استرشادية لعام ٢٠٢٦ من المستشفيات الشريكة المعتمدة. يرجى إرسال تقاريرك للحصول على عرض أسعار طبي دقيق ومؤكد.'
                : 'Prices shown are 2026 reference rates from accredited hospital price lists. Final confirmed cost will be issued after clinical coordinator assessment.'}
            </p>
          </div>
          <Link
            href="/faq"
            className="text-primary-green hover:text-primary-dark font-bold font-sans underline cursor-pointer"
          >
            {locale === 'ar' ? 'اعرف المزيد عن الأسعار والفوترة' : 'Learn more about billing'}
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
