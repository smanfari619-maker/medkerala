import React from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TREATMENTS } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/config';
import {
  Heart,
  Bone,
  Smile,
  Baby,
  Leaf,
  CheckCircle,
  ChevronDown,
  Stethoscope,
  Building,
  History,
  ArrowRight,
  MessageCircle,
  Activity,
  Brain,
  Shield,
  Eye
} from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) {
    return {};
  }
  const title = locale === 'ar' ? treatment.nameAr : treatment.name;
  const description = locale === 'ar' ? treatment.taglineAr : treatment.tagline;

  return {
    title: `${title} | MedKerala Treatments`,
    description,
  };
}

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({
    slug: t.slug,
  }));
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const isRtl = locale === 'ar';

  // Find the requested treatment
  const treatment = TREATMENTS.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  // Icons matching map
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    heart: Heart,
    bone: Bone,
    tooth: Smile,
    baby: Baby,
    leaf: Leaf,
    activity: Activity,
    brain: Brain,
    shield: Shield,
    eye: Eye
  };

  const Icon = iconMap[treatment.iconName] || Heart;

  const title = isRtl ? treatment.nameAr : treatment.name;
  const speciality = isRtl ? treatment.specialityAr : treatment.speciality;
  const tagline = isRtl ? treatment.taglineAr : treatment.tagline;
  const overview = isRtl ? treatment.overviewAr : treatment.overview;
  const whyKeralaList = isRtl ? treatment.whyKeralaAr : treatment.whyKerala;

  // Format currency values
  const formatCost = (val: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Calculate savings percentage
  const calculateSavings = (kerala: number, compare: number) => {
    return Math.round(((compare - kerala) / compare) * 100);
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="bg-primary-dark text-white py-16 border-b border-accent-gold/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-primary-green/20 to-transparent -z-10 opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold bg-[#FAF7F2]/10 border border-white/10 text-accent-gold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {speciality}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight max-w-4xl mx-auto">
            {title}
          </h1>
          <p className="text-accent-gold font-serif italic text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            {tagline}
          </p>

          {/* Price & Savings Pill */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 max-w-lg mx-auto backdrop-blur-md">
            <div className="text-center sm:text-left rtl:sm:text-right">
              <span className="text-xs text-slate-300 block leading-tight">{isRtl ? 'تبدأ الأسعار في كيرلا من:' : 'Kerala Price Starts From:'}</span>
              <span className="text-xl sm:text-2xl font-black text-[#25D366] font-display">{formatCost(treatment.costTable.kerala)}</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div className="text-center sm:text-left rtl:sm:text-right">
              <span className="text-xs text-slate-300 block leading-tight">{isRtl ? 'معدل الوفورات الطبية:' : 'Average Cost Savings:'}</span>
              <span className="text-lg sm:text-xl font-bold text-accent-gold font-sans">
                {isRtl 
                  ? `وفر حتى ${calculateSavings(treatment.costTable.kerala, treatment.costTable.uk)}%` 
                  : `Save up to ${calculateSavings(treatment.costTable.kerala, treatment.costTable.uk)}%`}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً ميدكيرلا، أود الاستفسار عن تكلفة علاج: ${title}` : `Hello MedKerala, I would like to inquire about the cost of: ${title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3.5 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px] flex items-center justify-center gap-1.5 cursor-pointer font-sans"
            >
              <MessageCircle className="h-4.5 w-4.5 text-white" />
              <span>{isRtl ? 'استشارة فورية عبر واتساب' : 'WhatsApp Inquiry'}</span>
            </a>
            <Link
              href="/get-estimate"
              className="w-full sm:w-auto bg-white border border-[#2D6A4F] text-[#2D6A4F] hover:bg-slate-50 font-bold px-8 py-3.5 rounded-full text-base transition-all duration-300 shadow-xs hover:shadow-md min-h-[48px] flex items-center justify-center cursor-pointer"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & WHY KERALA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Overview Left */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold font-display text-primary-dark">
                {locale === 'ar' ? 'نظرة عامة على الإجراء' : 'Procedure Overview'}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">
                {overview}
              </p>
            </div>

            {/* Why Kerala Right */}
            <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#D4A96A]/20 p-8 rounded-3xl space-y-6 shadow-xs">
              <div className="flex items-center gap-2">
                <Icon className="h-6 w-6 text-primary-green shrink-0" />
                <h3 className="text-xl font-bold text-text-dark">
                  {locale === 'ar' ? 'التعافي في كيرلا' : 'Recovery in Kerala'}
                </h3>
              </div>
              <ul className="space-y-4">
                {whyKeralaList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5.5 w-5.5 text-primary-green shrink-0 mt-0.5" />
                    <span className="text-text-muted text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COST COMPARISON TABLE */}
      <section className="py-16 bg-[#FAF7F2] border-y border-[#D4A96A]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'مقارنة تكلفة العلاج التقديرية' : 'Estimated Cost Comparison'}
            </h2>
            <p className="text-text-muted text-base mt-2">
              {locale === 'ar'
                ? 'قارن تكلفة هذا العلاج في كيرلا بالدول الغربية ودول الخليج.'
                : 'Compare treatment estimates across major international medical destinations.'}
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-md">
            <table className="w-full text-center border-collapse" dir={isRtl ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-primary-dark text-white font-medium text-base sm:text-lg border-b border-accent-gold/25">
                  <th className="py-4 px-4 text-left sm:px-6 font-display">{locale === 'ar' ? 'البلد / الوجهة' : 'Country / Destination'}</th>
                  <th className="py-4 px-4 sm:px-6 font-display">{locale === 'ar' ? 'تقدير التكلفة' : 'Estimated Cost'}</th>
                  <th className="py-4 px-4 sm:px-6 font-display text-accent-gold">{locale === 'ar' ? 'نسبة الوفورات' : 'Savings Percentage'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base sm:text-lg text-text-muted">
                {/* Kerala */}
                <tr className="bg-emerald-50/20 font-bold text-primary-green">
                  <td className="py-4 px-4 text-left sm:px-6 font-display">{locale === 'ar' ? 'كيرلا، الهند (ميدكيرلا)' : 'Kerala, India (MedKerala)'}</td>
                  <td className="py-4 px-4 sm:px-6 font-extrabold text-lg">{formatCost(treatment.costTable.kerala)}</td>
                  <td className="py-4 px-4 sm:px-6 text-emerald-600">—</td>
                </tr>
                {/* UK */}
                <tr>
                  <td className="py-4 px-4 text-left sm:px-6">{locale === 'ar' ? 'المملكة المتحدة' : 'United Kingdom'}</td>
                  <td className="py-4 px-4 sm:px-6">{formatCost(treatment.costTable.uk)}</td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-emerald-600">
                    {calculateSavings(treatment.costTable.kerala, treatment.costTable.uk)}%
                  </td>
                </tr>
                {/* USA */}
                <tr>
                  <td className="py-4 px-4 text-left sm:px-6">{locale === 'ar' ? 'الولايات المتحدة' : 'United States'}</td>
                  <td className="py-4 px-4 sm:px-6">{formatCost(treatment.costTable.usa)}</td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-emerald-600">
                    {calculateSavings(treatment.costTable.kerala, treatment.costTable.usa)}%
                  </td>
                </tr>
                {/* UAE */}
                <tr>
                  <td className="py-4 px-4 text-left sm:px-6">{locale === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</td>
                  <td className="py-4 px-4 sm:px-6">{formatCost(treatment.costTable.uae)}</td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-emerald-600">
                    {calculateSavings(treatment.costTable.kerala, treatment.costTable.uae)}%
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-slate-50 py-4 px-6 border-t border-slate-100 text-xs text-text-muted text-center">
              {locale === 'ar'
                ? '* تشمل تكاليف كيرلا رسوم تنسيق ميدكيرلا والاستقبال والإقامة.'
                : '* Kerala prices include MedKerala coordination fees, local pickup, and support.'}
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOCTOR PROFILES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display text-primary-dark mb-4">
              {locale === 'ar' ? 'أطباؤنا المشهورون' : 'Our Renowned Specialists'}
            </h2>
            <p className="text-lg text-text-muted">
              {locale === 'ar'
                ? 'استشر نخبة الأطباء وأساتذة الجراحة المؤهلين دولياً في كيرلا.'
                : 'Certified specialist doctors with international clinical records and credentials.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
            {treatment.doctors.map((doc, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#D4A96A]/20 shadow-xs space-y-4 text-center md:text-left flex flex-col items-center md:items-start"
              >
                <div className="h-16 w-16 rounded-full bg-primary-green/10 flex items-center justify-center mb-2">
                  <Stethoscope className="h-8 w-8 text-primary-green" />
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-text-dark">{isRtl ? doc.nameAr : doc.name}</h3>
                  <p className="text-accent-gold font-serif italic text-base font-semibold">{isRtl ? doc.titleAr : doc.title}</p>
                </div>
                <div className="w-full pt-4 border-t border-slate-200 text-sm text-text-muted space-y-3">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Building className="h-4 w-4 text-primary-green shrink-0" />
                    <span>{isRtl ? doc.hospitalAr : doc.hospital}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <History className="h-4 w-4 text-primary-green shrink-0" />
                    <span>{locale === 'ar' ? 'خبرة سريرية:' : 'Clinical Experience:'} {isRtl ? doc.expAr : doc.exp}</span>
                  </div>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً ميدكيرلا، أود استشارة الدكتور ${doc.nameAr.replace('د. ', '')} بخصوص علاج: ${title}` : `Hello MedKerala, I would like to consult Dr. ${doc.name} regarding: ${title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full bg-primary-green hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl text-xs transition-all text-center flex items-center justify-center gap-1.5 font-sans min-h-[38px] shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{isRtl ? `استشارة د. ${doc.nameAr.replace('د. ', '')}` : `Consult ${doc.name}`}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TREATMENT FAQS */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#D4A96A]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'الأسئلة الشائعة حول هذا الإجراء' : 'Treatment FAQ'}
            </h2>
            <p className="text-text-muted text-base mt-2">
              {locale === 'ar'
                ? 'إجابات على الأسئلة الشائعة حول الفحوصات والعمليات الجراحية والاستشفاء.'
                : 'Clear answers on clinical processes, packing, recovery times and safety.'}
            </p>
          </div>

          <div className="space-y-4">
            {treatment.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-[#D4A96A]/20 rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-1.5 focus:outline-hidden min-h-[44px]">
                  <h3 className="text-base sm:text-lg font-bold text-text-dark">
                    {isRtl ? faq.qAr : faq.q}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-[#D4A96A] transition-transform duration-300 group-open:-rotate-180 shrink-0" />
                </summary>
                <p className="mt-4 text-text-muted leading-relaxed text-base border-t border-slate-100 pt-4">
                  {isRtl ? faq.aAr : faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ESTIMATE REQUEST CTA BAND */}
      <section className="bg-primary-dark text-white py-16 border-t border-accent-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-semibold font-display">
            {locale === 'ar' 
              ? 'احصل على خطة علاجية مخصصة وعرض أسعار مجاني' 
              : `Get a Free Estimate for ${title}`}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'أرسل لنا تقاريرك الطبية الحالية. سيقوم فريقنا بمراجعتها وعرضها على الأطباء الاستشاريين وتزويدك بتقرير الأسعار المتكامل خلال 48 ساعة.'
              : 'Submit your recent medical reports or condition detail. Our expert team will review it with specialists and send you a fully customized cost report within 48 hours.'}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-estimate"
              className="bg-primary-green hover:bg-white text-white hover:text-primary-green font-bold px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>{tCommon('getEstimate')}</span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span>{tCommon('whatsAppUs')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
