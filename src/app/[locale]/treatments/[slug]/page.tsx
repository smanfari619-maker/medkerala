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
import { getMedicalProcedureSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schemas';

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
  const desc = locale === 'ar' ? treatment.overviewAr : treatment.overview;
  const description = desc.length > 155 ? desc.slice(0, 155) + '...' : desc;

  return {
    title: `${title} | TreatInKerala Treatments`,
    description,
    alternates: {
      canonical: locale === 'ar' ? `/ar/treatments/${slug}` : `/en/treatments/${slug}`,
      languages: {
        en: `/en/treatments/${slug}`,
        ar: `/ar/treatments/${slug}`,
      },
    },
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

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRtl ? 'الرئيسية' : 'Home', url: `https://treatinkerala.com/${locale}` },
    { name: isRtl ? 'العلاجات' : 'Treatments', url: `https://treatinkerala.com/${locale}/treatments` },
    { name: title, url: `https://treatinkerala.com/${locale}/treatments/${slug}` }
  ]);

  const medicalProcedureSchema = getMedicalProcedureSchema(locale, treatment);
  const faqSchema = getFAQSchema(
    treatment.faqs.map(faq => ({
      q: isRtl ? faq.qAr : faq.q,
      a: isRtl ? faq.aAr : faq.a
    }))
  );

  return (
    <div className="flex flex-col w-full overflow-x-hidden animate-fade-in pt-32 lg:pt-40 bg-[#FAF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* 1. HERO SECTION */}
      <section className="pb-16 lg:pb-24 border-b border-[#D4A96A]/35 relative overflow-hidden">
        {/* Large Background Vector Watermark */}
        <div className="absolute -bottom-24 -right-24 rtl:-left-24 rtl:-right-auto h-96 w-96 opacity-[0.02] text-[#2D6A4F] pointer-events-none transition-all duration-700 ease-out">
          <Icon className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block font-sans">
              {speciality}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight max-w-4xl mx-auto">
            {title}
          </h1>
          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
            {tagline}
          </p>

          {/* Bento Price & Savings Grid */}
          <div className="pt-8">
            <div className="inline-flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto">
              {/* Price Card */}
              <div className="bg-white border border-[#D4A96A]/35 rounded-2xl px-8 py-5 shadow-sm text-center sm:text-left rtl:sm:text-right flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-1">
                  {isRtl ? 'النطاق التقديري في كيرلا:' : 'Kerala Est. Range:'}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2D6A4F] font-display">
                  {formatCost(treatment.costTable.keralaMin)} – {formatCost(treatment.costTable.keralaMax)}
                </span>
              </div>
              
              {/* Savings Card */}
              <div className="bg-[#FAF7F2] border border-[#D4A96A]/35 rounded-2xl px-8 py-5 shadow-sm text-center sm:text-left rtl:sm:text-right flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-1">
                  {isRtl ? 'معدل الوفورات الطبية:' : 'Average Cost Savings:'}
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#D4A96A] font-display">
                  {isRtl 
                    ? `وفر حتى ${calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uk)}%` 
                    : `Save up to ${calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uk)}%`}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار عن تكلفة علاج: ${title}` : `Hello TreatInKerala, I would like to inquire about the cost of: ${title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 font-sans whitespace-nowrap"
            >
              <MessageCircle className="h-5 w-5 text-white shrink-0" />
              <span>{isRtl ? 'استشارة فورية عبر واتساب' : 'WhatsApp Inquiry'}</span>
            </a>
            <Link
              href="/get-estimate"
              className="w-full sm:w-auto bg-white border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-slate-50 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-sm hover:shadow-md min-h-[48px] flex items-center justify-center whitespace-nowrap"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & WHY KERALA */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Overview Left - Bento Card */}
            <div className="lg:col-span-7 bg-white border border-[#D4A96A]/35 p-8 sm:p-10 rounded-[24px] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold font-display text-primary-dark">
                {locale === 'ar' ? 'نظرة عامة على الإجراء' : 'Procedure Overview'}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed font-sans">
                {overview}
              </p>
            </div>

            {/* Why Kerala Right - Bento Card */}
            <div className="lg:col-span-5 bg-white border border-[#D4A96A]/35 p-8 sm:p-10 rounded-[24px] shadow-sm hover:shadow-lg transition-all duration-300 space-y-6 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 rtl:-left-10 rtl:-right-auto h-40 w-40 opacity-[0.03] text-[#2D6A4F] pointer-events-none group-hover:scale-[1.1] group-hover:rotate-6 transition-all duration-700 ease-out origin-top-right">
                <Icon className="w-full h-full" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center border border-[#D4A96A]/35">
                    <Icon className="h-5 w-5 text-[#2D6A4F]" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark font-sans">
                    {locale === 'ar' ? 'التعافي في كيرلا' : 'Recovery in Kerala'}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {whyKeralaList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5.5 w-5.5 text-primary-green shrink-0 mt-0.5" />
                      <span className="text-text-muted text-base leading-relaxed font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COST COMPARISON TABLE */}
      <section className="py-20 bg-white border-y border-[#D4A96A]/35">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block mb-4 font-sans">
              {locale === 'ar' ? 'الشفافية في الأسعار' : 'Transparent Pricing'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'مقارنة تكلفة العلاج التقديرية' : 'Estimated Cost Comparison'}
            </h2>
            <p className="text-text-muted text-lg mt-4 font-sans max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'قارن تكلفة هذا العلاج في كيرلا بالدول الغربية ودول الخليج.'
                : 'Compare treatment estimates across major international medical destinations.'}
            </p>
          </div>

          <div className="bg-white border border-[#D4A96A]/35 rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <table className="w-full text-center border-collapse" dir={isRtl ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-[#FAF7F2] font-semibold text-base sm:text-lg border-b border-[#D4A96A]/35">
                  <th className="py-5 px-5 text-left rtl:text-right sm:px-8 font-display text-primary-dark">{locale === 'ar' ? 'البلد / الوجهة' : 'Country / Destination'}</th>
                  <th className="py-5 px-5 sm:px-8 font-display text-primary-dark">{locale === 'ar' ? 'تقدير التكلفة' : 'Estimated Cost'}</th>
                  <th className="py-5 px-5 sm:px-8 font-display text-primary-dark">{locale === 'ar' ? 'نسبة الوفورات' : 'Savings Percentage'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A96A]/20 text-base sm:text-lg text-text-muted font-sans">
                {/* Kerala */}
                <tr className="bg-emerald-50/30 font-bold text-primary-green">
                  <td className="py-5 px-5 text-left rtl:text-right sm:px-8 font-display flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary-green animate-pulse"></span>
                    {locale === 'ar' ? 'كيرلا، الهند' : 'Kerala, India'}
                  </td>
                  <td className="py-5 px-5 sm:px-8 font-extrabold text-xl">{formatCost(treatment.costTable.keralaMin)} – {formatCost(treatment.costTable.keralaMax)}</td>
                  <td className="py-5 px-5 sm:px-8 text-emerald-600">—</td>
                </tr>
                {/* UK */}
                <tr className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-5 px-5 text-left rtl:text-right sm:px-8">{locale === 'ar' ? 'المملكة المتحدة' : 'United Kingdom'}</td>
                  <td className="py-5 px-5 sm:px-8">{formatCost(treatment.costTable.uk)}</td>
                  <td className="py-5 px-5 sm:px-8 font-semibold text-[#D4A96A]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uk)}%
                  </td>
                </tr>
                {/* USA */}
                <tr className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-5 px-5 text-left rtl:text-right sm:px-8">{locale === 'ar' ? 'الولايات المتحدة' : 'United States'}</td>
                  <td className="py-5 px-5 sm:px-8">{formatCost(treatment.costTable.usa)}</td>
                  <td className="py-5 px-5 sm:px-8 font-semibold text-[#D4A96A]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.usa)}%
                  </td>
                </tr>
                {/* UAE */}
                <tr className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-5 px-5 text-left rtl:text-right sm:px-8">{locale === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</td>
                  <td className="py-5 px-5 sm:px-8">{formatCost(treatment.costTable.uae)}</td>
                  <td className="py-5 px-5 sm:px-8 font-semibold text-[#D4A96A]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uae)}%
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#FAF7F2] py-4 px-6 border-t border-[#D4A96A]/35 text-xs text-text-muted font-sans text-center">
              {locale === 'ar'
                ? '* نطاق الأسعار أعلاه تقديري لعام ٢٠٢٦ وقد يختلف حسب اختيارك للمستشفى وحالتك السريرية الخاصة. تشمل أسعار كيرلا التنسيق اللوجستي الكامل.'
                : '* Price ranges are 2026 estimates and vary depending on hospital choice and clinical requirements. Kerala ranges include full travel coordination and logistics.'}
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
                className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#D4A96A]/35 shadow-xs space-y-4 text-center md:text-left flex flex-col items-center md:items-start"
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
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود استشارة الدكتور ${doc.nameAr.replace('د. ', '')} بخصوص علاج: ${title}` : `Hello TreatInKerala, I would like to consult Dr. ${doc.name} regarding: ${title}`)}`}
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
      <section className="py-20 bg-[#FAF7F2] border-t border-[#D4A96A]/35">
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
                className="group border border-[#D4A96A]/35 rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
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
