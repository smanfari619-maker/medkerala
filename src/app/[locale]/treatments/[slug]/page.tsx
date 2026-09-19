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
import RecoveryEssentialsSection from '@/components/treatments/RecoveryEssentialsSection';
import { getRecoveryProductsForTreatment } from '@/lib/recoveryProducts';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) {
    return {};
  }
  const isAr = locale === 'ar';
  const minCost = treatment.costTable ? `$${treatment.costTable.keralaMin.toLocaleString()}` : '$1,500';

  const title = isAr
    ? `${treatment.nameAr} في كيرلا — التكلفة تبدأ من ${minCost} | مستشفيات معتمدة JCI`
    : `${treatment.name} in Kerala — Cost from ${minCost} | JCI Accredited Hospitals`;

  const description = isAr
    ? `احصل على ${treatment.nameAr} في أفضل مستشفيات كيرلا الحاصلة على اعتمادات JCI وNABH. وفر 60-80% مقارنة بالإمارات وأمريكا. تنسيق مجاني، مترجم عربي، واستقبال من المطار.`
    : `World-class ${treatment.name.toLowerCase()} in Kerala at JCI & NABH accredited hospitals. Save 60–80% vs UAE, UK, or USA. Includes free medical visa assistance, airport pickup, and dedicated liaison.`;

  return {
    title,
    description,
    keywords: isAr
      ? [treatment.nameAr, 'علاج في كيرلا', 'تكلفة العلاج في الهند', 'مستشفيات كيرلا المعتمدة', 'سياحة علاجية من الإمارات', 'سياحة علاجية من عمان']
      : [treatment.name, 'Kerala medical tourism', 'cost of surgery in India', 'JCI hospitals Kerala', 'medical travel UAE to India', 'Oman to Kerala hospital'],
    alternates: {
      canonical: isAr ? `/ar/treatments/${slug}` : `/en/treatments/${slug}`,
      languages: {
        en: `/en/treatments/${slug}`,
        ar: `/ar/treatments/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://treatinkerala.com/${locale}/treatments/${slug}`,
      siteName: isAr ? 'علاج في كيرلا' : 'TreatInKerala',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'article',
      images: [
        {
          url: 'https://treatinkerala.com/images/caring_doctor_patient_hero.png',
          width: 800,
          height: 1000,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://treatinkerala.com/images/caring_doctor_patient_hero.png'],
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

  const recoveryProducts = getRecoveryProductsForTreatment(slug);

  return (
    <div className="flex flex-col w-full overflow-x-hidden animate-fade-in pt-36 lg:pt-44 bg-[#FAF7F2]">
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
      <section className="pb-16 lg:pb-24 relative overflow-hidden">
        {/* Large Background Vector Watermark */}
        <div className="absolute -bottom-24 -right-24 rtl:-left-24 rtl:-right-auto h-96 w-96 opacity-[0.02] text-[#1B4332] pointer-events-none transition-all duration-700 ease-out">
          <Icon className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold mb-2">
            <span>{speciality}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-text-dark tracking-tight max-w-4xl mx-auto leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-text-muted max-w-2xl mx-auto font-sans leading-relaxed">
            {tagline}
          </p>

          {/* Bento Price & Savings Grid */}
          <div className="pt-8">
            <div className="inline-flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto">
              {/* Price Card */}
              <div className="bg-white border border-slate-200 rounded-2xl px-8 py-5 shadow-xs text-center sm:text-left rtl:sm:text-right flex flex-col justify-center">
                <span className="text-xs font-bold text-text-muted block mb-1">
                  {isRtl ? 'النطاق التقديري في كيرلا:' : 'Kerala Est. Range:'}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] font-display">
                  {formatCost(treatment.costTable.keralaMin)} – {formatCost(treatment.costTable.keralaMax)}
                </span>
              </div>
              
              {/* Savings Card */}
              <div className="bg-white border border-slate-200 rounded-2xl px-8 py-5 shadow-xs text-center sm:text-left rtl:sm:text-right flex flex-col justify-center">
                <span className="text-xs font-bold text-text-muted block mb-1">
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
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3.5 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-200 min-h-[48px] flex items-center justify-center gap-2 font-sans whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="h-5 w-5 text-white shrink-0" />
              <span>{isRtl ? 'استشارة فورية عبر واتساب' : 'WhatsApp Inquiry'}</span>
            </a>
            <Link
              href="/get-estimate"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base whitespace-nowrap cursor-pointer"
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
            <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xs flex flex-col justify-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-dark">
                {locale === 'ar' ? 'نظرة عامة على الإجراء' : 'Procedure Overview'}
              </h2>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed font-sans">
                {overview}
              </p>
            </div>

            {/* Why Kerala Right - Bento Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xs space-y-6 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <Icon className="h-5 w-5 text-[#1B4332]" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark font-sans">
                    {locale === 'ar' ? 'التعافي في كيرلا' : 'Recovery in Kerala'}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {whyKeralaList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1B4332] shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COST COMPARISON TABLE */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold mb-3">
              <span>{locale === 'ar' ? 'الشفافية في الأسعار' : 'Transparent Pricing'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-text-dark">
              {locale === 'ar' ? 'مقارنة تكلفة العلاج التقديرية' : 'Estimated Cost Comparison'}
            </h2>
            <p className="text-text-muted text-base sm:text-lg mt-3 font-sans max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'قارن تكلفة هذا العلاج في كيرلا بالدول الغربية ودول الخليج.'
                : 'Compare treatment estimates across major international medical destinations.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <table className="w-full text-center border-collapse" dir={isRtl ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-[#FAF7F2] font-semibold text-sm sm:text-base border-b border-slate-200">
                  <th className="py-4 px-5 text-left rtl:text-right sm:px-8 font-bold text-text-dark">{locale === 'ar' ? 'البلد / الوجهة' : 'Country / Destination'}</th>
                  <th className="py-4 px-5 sm:px-8 font-bold text-text-dark">{locale === 'ar' ? 'تقدير التكلفة' : 'Estimated Cost'}</th>
                  <th className="py-4 px-5 sm:px-8 font-bold text-text-dark">{locale === 'ar' ? 'نسبة الوفورات' : 'Savings Percentage'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm sm:text-base text-slate-700 font-sans">
                {/* Kerala */}
                <tr className="bg-emerald-50/40 font-bold text-[#1B4332]">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8 font-display flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1B4332]"></span>
                    {locale === 'ar' ? 'كيرلا، الهند' : 'Kerala, India'}
                  </td>
                  <td className="py-4 px-5 sm:px-8 font-extrabold text-lg text-[#1B4332]">{formatCost(treatment.costTable.keralaMin)} – {formatCost(treatment.costTable.keralaMax)}</td>
                  <td className="py-4 px-5 sm:px-8 text-[#1B4332]">—</td>
                </tr>
                {/* UK */}
                <tr className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8">{locale === 'ar' ? 'المملكة المتحدة' : 'United Kingdom'}</td>
                  <td className="py-4 px-5 sm:px-8">{formatCost(treatment.costTable.uk)}</td>
                  <td className="py-4 px-5 sm:px-8 font-bold text-[#D4A96A]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uk)}%
                  </td>
                </tr>
                {/* USA */}
                <tr className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8">{locale === 'ar' ? 'الولايات المتحدة' : 'United States'}</td>
                  <td className="py-4 px-5 sm:px-8">{formatCost(treatment.costTable.usa)}</td>
                  <td className="py-4 px-5 sm:px-8 font-bold text-[#D4A96A]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.usa)}%
                  </td>
                </tr>
                {/* UAE */}
                <tr className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8">{locale === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</td>
                  <td className="py-4 px-5 sm:px-8">{formatCost(treatment.costTable.uae)}</td>
                  <td className="py-4 px-5 sm:px-8 font-bold text-[#D4A96A]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uae)}%
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#FAF7F2] py-4 px-6 border-t border-slate-200 text-xs text-text-muted font-sans text-center">
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
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-dark mb-4">
              {locale === 'ar' ? 'أطباؤنا المشهورون' : 'Our Renowned Specialists'}
            </h2>
            <p className="text-base sm:text-lg text-text-muted">
              {locale === 'ar'
                ? 'استشر نخبة الأطباء وأساتذة الجراحة المؤهلين دولياً في كيرلا.'
                : 'Certified specialist doctors with international clinical records and credentials.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
            {treatment.doctors.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-center md:text-left rtl:md:text-right flex flex-col items-center md:items-start"
              >
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-1 border border-emerald-100">
                  <Stethoscope className="h-7 w-7 text-[#1B4332]" />
                </div>
                <div className="space-y-1 text-center md:text-left rtl:md:text-right">
                  <h3 className="text-xl font-bold text-text-dark">{isRtl ? doc.nameAr : doc.name}</h3>
                  <p className="text-[#D4A96A] text-sm font-semibold">{isRtl ? doc.titleAr : doc.title}</p>
                </div>
                <div className="w-full pt-4 border-t border-slate-100 text-sm text-text-muted space-y-2.5">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-slate-700">
                    <Building className="h-4 w-4 text-[#1B4332] shrink-0" />
                    <span>{isRtl ? doc.hospitalAr : doc.hospital}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-slate-700">
                    <History className="h-4 w-4 text-[#1B4332] shrink-0" />
                    <span>{locale === 'ar' ? 'خبرة سريرية:' : 'Clinical Experience:'} {isRtl ? doc.expAr : doc.exp}</span>
                  </div>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود استشارة الدكتور ${doc.nameAr.replace('د. ', '')} بخصوص علاج: ${title}` : `Hello TreatInKerala, I would like to consult Dr. ${doc.name} regarding: ${title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full btn-secondary text-xs py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 font-sans min-h-[38px] cursor-pointer"
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

      {/* 5. POST-OP RECOVERY ESSENTIALS (iHerb Rewards Referral) */}
      <RecoveryEssentialsSection
        locale={locale}
        treatmentName={title}
        treatmentSlug={slug}
        products={recoveryProducts}
      />

      {/* 6. TREATMENT FAQS */}
      <section className="py-20 bg-[#FAF7F2] border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-dark">
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
                className="group border border-slate-200 rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-2xs"
              >
                <summary className="flex items-center justify-between gap-1.5 focus:outline-hidden min-h-[44px]">
                  <h3 className="text-base sm:text-lg font-bold text-text-dark">
                    {isRtl ? faq.qAr : faq.q}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-300 group-open:-rotate-180 shrink-0" />
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-4">
                  {isRtl ? faq.aAr : faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ESTIMATE REQUEST CTA BAND */}
      <section className="bg-[#111827] text-white py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            {locale === 'ar' 
              ? 'احصل على خطة علاجية مخصصة وعرض أسعار مجاني' 
              : `Get a Free Estimate for ${title}`}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'أرسل لنا تقاريرك الطبية الحالية. سيقوم فريقنا بمراجعتها وعرضها على الأطباء الاستشاريين وتزويدك بتقرير الأسعار المتكامل خلال 48 ساعة.'
              : 'Submit your recent medical reports or condition detail. Our expert team will review it with specialists and send you a fully customized cost report within 48 hours.'}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-estimate"
              className="bg-[#D4A96A] hover:bg-[#c49355] text-[#111827] font-bold px-8 py-3.5 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-200 min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>{tCommon('getEstimate')}</span>
              <ArrowRight className="h-5 w-5 shrink-0 rtl:rotate-180" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3.5 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-200 min-h-[48px] inline-flex items-center justify-center gap-2 w-full sm:w-auto"
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
