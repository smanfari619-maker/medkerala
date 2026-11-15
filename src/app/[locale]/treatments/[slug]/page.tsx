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
  Eye,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Metadata } from 'next';
import { getMedicalProcedureSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schemas';
import MedicalReviewerBadge from '@/components/trust/MedicalReviewerBadge';
import ClinicalQualityMetrics from '@/components/trust/ClinicalQualityMetrics';

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

  const isAyurveda =
    treatment.speciality === 'Ayurvedic Medicine' ||
    treatment.slug.includes('ayurveda') ||
    ['panchakarma-detox', 'shirodhara-mental-wellness', 'rasayana-anti-aging', 'spine-joint-ayurveda', 'alopecia-scalp-ayurveda'].includes(treatment.slug);

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

  const clinicalSnapshots: Record<string, { stayEn: string; stayAr: string; recoverEn: string; recoverAr: string }> = {
    cardiac: { stayEn: '5 – 7 Days Inpatient', stayAr: '٥ – ٧ أيام تنويم بالمستشفى', recoverEn: '16 – 21 Days', recoverAr: '١٦ – ٢١ يوماً' },
    orthopaedics: { stayEn: '3 – 4 Days Inpatient', stayAr: '٣ – ٤ أيام تنويم بالمستشفى', recoverEn: '12 – 14 Days', recoverAr: '١٢ – ١٤ يوماً' },
    dental: { stayEn: 'Day-Care (Outpatient)', stayAr: 'عيادات خارجية (يومي)', recoverEn: '5 – 7 Days', recoverAr: '٥ – ٧ أيام' },
    ivf: { stayEn: 'Day-Care (Outpatient)', stayAr: 'عيادات خارجية (يومي)', recoverEn: '14 – 18 Days', recoverAr: '١٤ – ١٨ يوماً' },
    ayurveda: { stayEn: '14 – 28 Days Inpatient', stayAr: '١٤ – ٢٨ يوماً إقامة علاجية', recoverEn: 'Immediate Restorative', recoverAr: 'تعافي فوري وتجديد' },
    'panchakarma-detox': { stayEn: '14 – 28 Days Inpatient Retreat', stayAr: '١٤ – ٢٨ يوماً إقامة علاجية متكاملة', recoverEn: 'Immediate Cellular Reset', recoverAr: 'تجديد حيوي فوري ونشاط مستمر' },
    'shirodhara-mental-wellness': { stayEn: '7 – 14 Days Inpatient Retreat', stayAr: '٧ – ١٤ يوماً إقامة علاجية مريحة', recoverEn: 'Immediate Calm & Sleep Reset', recoverAr: 'تهدئة عصبية فورية وتحسن النوم' },
    'spine-joint-ayurveda': { stayEn: '14 – 21 Days Inpatient Care', stayAr: '١٤ – ٢١ يوماً علاج مكثف', recoverEn: 'Progressive Mobility Restoration', recoverAr: 'مرونة مفصلية وتحسن حركي دائم' },
    'rasayana-anti-aging': { stayEn: '14 – 21 Days Inpatient Care', stayAr: '١٤ – ٢١ يوماً إقامة وتجديد', recoverEn: 'Sustained Vitality & Immunity', recoverAr: 'حيوية خلوية ومناعة معززة' },
    'alopecia-scalp-ayurveda': { stayEn: '14 – 21 Days Inpatient Care', stayAr: '١٤ – ٢١ يوماً علاج سريري متخصص', recoverEn: 'Follicle Reactivation 4–8 Wks', recoverAr: 'نمو بصيلات جديدة خلال ٤ - ٨ أسابيع' },
    oncology: { stayEn: '3 – 7 Days Inpatient', stayAr: '٣ – ٧ أيام / رعاية نهارية', recoverEn: 'Per Clinical Regimen', recoverAr: 'حسب البروتوكول الطبي' },
    spine: { stayEn: '2 – 4 Days Inpatient', stayAr: '٢ – ٤ أيام تنويم بالمستشفى', recoverEn: '10 – 14 Days', recoverAr: '١٠ – ١٤ يوماً' },
    gastroenterology: { stayEn: '2 – 3 Days Inpatient', stayAr: '٢ – ٣ أيام تنويم بالمستشفى', recoverEn: '7 – 10 Days', recoverAr: '٧ – ١٠ أيام' },
    ophthalmology: { stayEn: 'Day-Care (1 – 2 Hours)', stayAr: 'جراحة اليوم الواحد (ساعتان)', recoverEn: '24 – 48 Hours', recoverAr: '٢٤ – ٤٨ ساعة' },
    urology: { stayEn: '1 – 2 Days Inpatient', stayAr: '١ – ٢ يوم تنويم بالمستشفى', recoverEn: '3 – 5 Days', recoverAr: '٣ – ٥ أيام' }
  };

  const snapshot = clinicalSnapshots[slug] || {
    stayEn: '3 – 5 Days Inpatient',
    stayAr: '٣ – ٥ أيام تنويم بالمستشفى',
    recoverEn: '10 – 14 Days',
    recoverAr: '١٠ – ١٤ يوماً'
  };

  // Dedicated Medical Reviewer metadata per specialty
  const reviewerDoctorName = isAyurveda
    ? (isRtl ? 'د. هـ. براساد' : 'Dr. H. Prasad')
    : (isRtl ? 'د. راجيش ك. فارما' : 'Dr. Rajesh K. Varma');

  const reviewerDoctorTitleEn = isAyurveda
    ? 'Senior Ayurvedic Physician & Clinical Advisory Lead'
    : 'Senior Clinical Consultant & Advisory Board Lead';

  const reviewerDoctorTitleAr = isAyurveda
    ? 'كبير أطباء الأيورفيدا ومستشار الحوكمة السريرية'
    : 'استشاري أول ورئيس المجلس الطبي الاستشاري';

  const reviewerCredentialsEn = isAyurveda
    ? 'BAMS, MD (Ayurveda) • 26+ Years Classical Clinical Practice'
    : 'MBBS, MS (Orthopaedics), MCh, Ex-Senior Registrar AIIMS';

  const reviewerCredentialsAr = isAyurveda
    ? 'بكالوريوس وماجستير طب الأيورفيدا (BAMS, MD) • خبرة ٢٦ عاماً'
    : 'بكالوريوس طب وجراحة، ماجستير جراحة العظام، استشاري معتمد';

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
    <div className="flex flex-col w-full overflow-x-hidden animate-fade-in pt-32 lg:pt-36 bg-[#FAF8F5]">
      {/* Schema microdata */}
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

      {/* ── 1. EDITORIAL HEADER & HERO ─────────────────────────────── */}
      <section className="border-b border-stone-200/70 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-8 font-sans">
            <Link href="/" className="hover:text-[#1B4332] transition-colors">
              {isRtl ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/treatments" className="hover:text-[#1B4332] transition-colors">
              {isRtl ? 'العلاجات' : 'Treatments'}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#1B4332] font-semibold truncate max-w-xs">{title}</span>
          </nav>

          {/* Main 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Authoritative Medical Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold font-sans">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{speciality}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium font-sans border border-stone-200">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                  <span>{isAyurveda ? (isRtl ? 'اعتماد الورقة الخضراء وNABH' : 'NABH & Green Leaf Certified') : 'JCI & NABH Accredited'}</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1B4332] tracking-tight leading-tight mb-3">
                  {title}
                </h1>
                <p className="text-lg sm:text-xl text-slate-700 font-sans leading-relaxed">
                  {tagline}
                </p>
              </div>

              {/* Seamless Medical Reviewer Byline */}
              <div>
                <MedicalReviewerBadge
                  locale={locale}
                  doctorName={reviewerDoctorName}
                  doctorTitleEn={reviewerDoctorTitleEn}
                  doctorTitleAr={reviewerDoctorTitleAr}
                  credentialsEn={reviewerCredentialsEn}
                  credentialsAr={reviewerCredentialsAr}
                  specialtyEn={isAyurveda ? 'Classical Panchakarma & Regenerative Herbology' : undefined}
                  specialtyAr={isAyurveda ? 'طب البانشاكارما الكلاسيكي والعلاجات التجديدية' : undefined}
                  reviewedDate="2026/2027 Clinical Audit"
                />
              </div>

              {/* Procedure Overview */}
              <div className="pt-2 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-text-dark">
                  {isRtl ? 'البروتوكول السريري ونظرة عامة على الإجراء' : 'Clinical Protocol & Procedure Overview'}
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans treatment-overview">
                  {overview}
                </p>
              </div>

              {/* Why Kerala Clinical Care Pillars */}
              <div className="pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C6D37] mb-4">
                  {isRtl ? 'المزايا السريرية للعلاج في كيرلا' : 'Clinical Advantages of Treatment in Kerala'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {whyKeralaList.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 border border-stone-200/80 shadow-2xs flex items-start gap-3"
                    >
                      <span className="flex items-center justify-center h-6 w-6 rounded-md bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold font-mono shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-sm text-slate-700 leading-relaxed font-sans">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Structured Advisory Card (5 cols - Sticky) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6 cost-summary">
                
                {/* Cost Header */}
                <div className="border-b border-stone-100 pb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-1">
                    {isRtl ? 'تقدير البرنامج الشامل في كيرلا' : 'Kerala All-Inclusive Estimate'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] font-display">
                      {formatCost(treatment.costTable.keralaMin)} – {formatCost(treatment.costTable.keralaMax)}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 bg-emerald-50/90 px-3 py-1.5 rounded-lg border border-emerald-100/90 mt-3 font-medium flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                    <span>
                      {isRtl
                        ? `وفر حتى ${calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uk)}% مقارنة ببريطانيا وأمريكا`
                        : `Up to ${calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uk)}% lower than UK/US private care`}
                    </span>
                  </p>
                </div>

                {/* Clinical Key Indicators */}
                <div className="space-y-3.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-xs">{isRtl ? 'مدة الإقامة / التنويم' : 'Hospital / Stay Duration'}</span>
                    <span className="font-semibold text-text-dark text-xs sm:text-sm">{isRtl ? snapshot.stayAr : snapshot.stayEn}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-text-muted text-xs">{isRtl ? 'اللياقة للسفر بالطائرة' : 'Fit-to-Fly Timeline'}</span>
                    <span className="font-semibold text-text-dark text-xs sm:text-sm">{isRtl ? snapshot.recoverAr : snapshot.recoverEn}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-text-muted text-xs">{isRtl ? 'الاعتماد السريري' : 'Hospital Accreditation'}</span>
                    <span className="font-semibold text-[#1B4332] text-xs sm:text-sm">
                      {isAyurveda ? (isRtl ? 'الورقة الخضراء وNABH' : 'Green Leaf & NABH') : 'JCI & NABH Certified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-text-muted text-xs">{isRtl ? 'المساعدة اللوجستية' : 'Patient Logistics'}</span>
                    <span className="font-semibold text-text-dark text-xs sm:text-sm">
                      {isRtl ? 'استقبال مطار + مترجم مجاناً' : 'Free Airport Pickup & Liaison'}
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Link
                    href="/get-estimate"
                    className="w-full btn-primary text-center justify-center py-3.5 rounded-xl font-bold text-sm min-h-[48px] shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>{tCommon('getEstimate')}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار عن تفاصيل وتكلفة: ${title}` : `Hello TreatInKerala, I would like to inquire about details and cost for: ${title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 rounded-xl text-sm shadow-xs transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>{isRtl ? 'استشارة فورية عبر واتساب' : 'WhatsApp Clinical Inquiry'}</span>
                  </a>
                </div>

                {/* Trust Guarantee Reassurance */}
                <div className="pt-3 border-t border-slate-100 text-center text-[11px] text-text-muted space-y-1">
                  <p>{isRtl ? '✓ فواتير رسمية مباشرة للمستشفى بدون عمولات وساطة' : '✓ Official direct hospital billing with 0% markup'}</p>
                  <p>{isRtl ? '✓ حماية تامة لسرية البيانات الطبية والتقارير' : '✓ 100% confidential clinical advisory & review'}</p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. CLINICAL QUALITY & SAFETY BENCHMARKS STRIP ───────────── */}
      <ClinicalQualityMetrics locale={locale} isAyurveda={isAyurveda} />

      {/* ── 3. TRANSPARENT COST COMPARISON TABLE ─────────────────────── */}
      <section className="py-16 bg-white border-y border-stone-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D37] block mb-2">
              {locale === 'ar' ? 'الشفافية في الأسعار' : 'Transparent Pricing'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-dark">
              {locale === 'ar' ? 'مقارنة تكلفة العلاج التقديرية دولياً' : 'International Cost Comparison'}
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-2 font-sans max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'مقارنة تقديرية لتكلفة هذا الإجراء بين كيرلا والدول الغربية والخليجية لعام ٢٠٢٦ / ٢٠٢٧.'
                : 'Comparative benchmark of estimated treatment costs across leading international medical destinations.'}
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-center border-collapse" dir={isRtl ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-[#FAF8F5] font-semibold text-xs sm:text-sm border-b border-stone-200">
                  <th className="py-4 px-5 text-left rtl:text-right sm:px-8 font-bold text-text-dark">
                    {locale === 'ar' ? 'البلد / الوجهة' : 'Country / Destination'}
                  </th>
                  <th className="py-4 px-5 sm:px-8 font-bold text-text-dark">
                    {locale === 'ar' ? 'تقدير التكلفة' : 'Estimated Cost'}
                  </th>
                  <th className="py-4 px-5 sm:px-8 font-bold text-text-dark">
                    {locale === 'ar' ? 'نسبة الوفورات' : 'Savings Advantage'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm sm:text-base text-slate-700 font-sans">
                {/* Kerala */}
                <tr className="bg-emerald-50/50 font-bold text-[#1B4332]">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8 font-display flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1B4332]"></span>
                    <span>{locale === 'ar' ? 'كيرلا، الهند (برنامج متكامل)' : 'Kerala, India (All-Inclusive)'}</span>
                  </td>
                  <td className="py-4 px-5 sm:px-8 font-extrabold text-lg text-[#1B4332]">
                    {formatCost(treatment.costTable.keralaMin)} – {formatCost(treatment.costTable.keralaMax)}
                  </td>
                  <td className="py-4 px-5 sm:px-8 text-[#1B4332] text-xs sm:text-sm font-semibold">
                    {isRtl ? 'الوجهة المرجعية' : 'Baseline Reference'}
                  </td>
                </tr>
                {/* UK */}
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8">
                    {locale === 'ar' ? 'المملكة المتحدة (خاص)' : 'United Kingdom (Private)'}
                  </td>
                  <td className="py-4 px-5 sm:px-8">{formatCost(treatment.costTable.uk)}</td>
                  <td className="py-4 px-5 sm:px-8 font-bold text-[#8C6D37]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uk)}% {isRtl ? 'توفير' : 'Savings'}
                  </td>
                </tr>
                {/* USA */}
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8">
                    {locale === 'ar' ? 'الولايات المتحدة (بدون تأمين)' : 'United States (Self-Pay)'}
                  </td>
                  <td className="py-4 px-5 sm:px-8">{formatCost(treatment.costTable.usa)}</td>
                  <td className="py-4 px-5 sm:px-8 font-bold text-[#8C6D37]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.usa)}% {isRtl ? 'توفير' : 'Savings'}
                  </td>
                </tr>
                {/* UAE */}
                <tr className="hover:bg-stone-50/50 transition-colors">
                  <td className="py-4 px-5 text-left rtl:text-right sm:px-8">
                    {locale === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}
                  </td>
                  <td className="py-4 px-5 sm:px-8">{formatCost(treatment.costTable.uae)}</td>
                  <td className="py-4 px-5 sm:px-8 font-bold text-[#8C6D37]">
                    {calculateSavings(treatment.costTable.keralaMin, treatment.costTable.uae)}% {isRtl ? 'توفير' : 'Savings'}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Inclusions checklist */}
            <div className="bg-[#FAF8F5] p-5 sm:p-6 border-t border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block mb-3">
                {isRtl ? 'ما يشمله برنامج العلاج في كيرلا:' : 'What is included in the Kerala Treatment Package:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#1B4332] shrink-0" />
                  <span>{isRtl ? 'استشارات يومية لكبار الأطباء' : 'Daily Senior Doctor Consultations'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#1B4332] shrink-0" />
                  <span>{isRtl ? 'الأدوية والزيوت الموصوفة' : 'All Prescribed Medicines & Oils'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#1B4332] shrink-0" />
                  <span>{isRtl ? 'الإقامة والغذاء الصحي العلاجي' : 'Room Stay & Prescribed Clinical Diet'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#1B4332] shrink-0" />
                  <span>{isRtl ? 'استقبال وتوديع المطار مجاناً' : 'Free Airport Transfers & Liaison'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. SENIOR CONSULTING SPECIALISTS / VAIDYAS ────────────── */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D37] block mb-2">
              {locale === 'ar' ? 'القيادة الإكلينيكية' : 'Clinical Leadership'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-dark">
              {locale === 'ar' ? 'كبار الأطباء والاستشاريين المعتمدين' : 'Renowned Consulting Specialists'}
            </h2>
            <p className="text-sm sm:text-base text-text-muted mt-2">
              {locale === 'ar'
                ? 'استشر نخبة الأطباء وأساتذة الطب الأيورفيدي والجراحة المؤهلين دولياً في كيرلا.'
                : 'Accredited specialists and senior consultants with extensive clinical track records.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto justify-center">
            {treatment.doctors.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 text-[#1B4332] flex items-center justify-center shrink-0 border border-emerald-100">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark">{isRtl ? doc.nameAr : doc.name}</h3>
                    <p className="text-[#8C6D37] text-xs font-semibold">{isRtl ? doc.titleAr : doc.title}</p>
                    <p className="text-text-muted text-xs mt-1">{isRtl ? doc.hospitalAr : doc.hospital}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <History className="h-3.5 w-3.5 text-[#1B4332]" />
                    <span>{locale === 'ar' ? 'الخبرة:' : 'Experience:'} {isRtl ? doc.expAr : doc.exp}</span>
                  </span>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود استشارة الدكتور ${doc.nameAr.replace('د. ', '')} بخصوص علاج: ${title}` : `Hello TreatInKerala, I would like to consult Dr. ${doc.name} regarding: ${title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1B4332] hover:text-[#143225] font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>{isRtl ? 'استشارة الطبيب' : 'Inquire Directly'}</span>
                    <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. TREATMENT FREQUENTLY ASKED QUESTIONS ─────────────────── */}
      <section className="py-16 bg-white border-t border-stone-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D37] block mb-2">
              {locale === 'ar' ? 'إجابات مباشرة' : 'Direct Answers'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-dark">
              {locale === 'ar' ? 'الأسئلة الشائعة حول هذا الإجراء' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-text-muted text-sm sm:text-base mt-2">
              {locale === 'ar'
                ? 'إجابات طبية واضحة حول الفحوصات، مدة الإقامة، والتعافي السريري.'
                : 'Clear clinical answers regarding preparation, stay duration, and recovery outcomes.'}
            </p>
          </div>

          <div className="divide-y divide-stone-200">
            {treatment.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-3 text-left rtl:text-right font-medium focus:outline-hidden">
                  <h3 className="text-base sm:text-lg font-bold text-text-dark group-open:text-[#1B4332] transition-colors">
                    {isRtl ? faq.qAr : faq.q}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-200 group-open:-rotate-180 shrink-0" />
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base pr-6 rtl:pr-0 rtl:pl-6 font-sans">
                  {isRtl ? faq.aAr : faq.a}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. ESTIMATE REQUEST / REASSURANCE CTA ──────────────────── */}
      <section className="bg-[#111827] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] block">
            {locale === 'ar' ? 'استشارة مجانية وسرية' : 'Free & Confidential Evaluation'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white max-w-2xl mx-auto leading-tight">
            {locale === 'ar' 
              ? `احصل على خطة علاجية مخصصة وعرض أسعار لـ ${title}` 
              : `Receive a Clinically Validated Treatment Plan for ${title}`}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'شاركنا تقاريرك الطبية أو أهدافك الصحية. سيقوم أطباؤنا الاستشاريون بمراجعتها وإعداد خطة علاجية مخصصة وعرض تكلفة شامل خلال 48 ساعة.'
              : 'Share your condition details or medical reports. Our clinical advisory team will coordinate directly with senior specialists to deliver an itemized quotation within 48 hours.'}
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/get-estimate"
              className="bg-[#D4A96A] hover:bg-[#c49355] text-[#111827] font-bold px-7 py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>{tCommon('getEstimate')}</span>
              <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all min-h-[48px] inline-flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span>{tCommon('whatsAppUs')}</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-400 pt-2">
            {locale === 'ar'
              ? 'ملتزمون بأعلى معايير حماية البيانات الطبية والسرية التامة للمرضى.'
              : 'Strict adherence to international patient confidentiality and data privacy standards.'}
          </p>
        </div>
      </section>

    </div>
  );
}
