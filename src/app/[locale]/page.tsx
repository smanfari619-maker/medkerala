import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import {
  ArrowRight,
  MessageCircle,
  ChevronDown,
  ClipboardList,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Users,
  Clock,
  Building,
  TrendingDown,
  Lock,
  RefreshCw,
  Globe,
  HeartPulse,
  Award,
  Tag,
  PhoneCall,
  UserRound,
  Percent,
} from 'lucide-react';
import CostComparison from '@/components/home/CostComparison';
import { getFAQSchema } from '@/lib/schemas';

function getYouTubeId(urlOrId: string) {
  if (!urlOrId) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);
  return (match && match[2].length === 11) ? match[2] : urlOrId;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const tHero = await getTranslations({ locale, namespace: 'Hero' });
  const tFAQ = await getTranslations({ locale, namespace: 'FAQ' });

  const isRtl = locale === 'ar';

  const featuredDoctors = [
    {
      name: isRtl ? 'د. م. ناير (كبير جراحي القلب)' : 'Dr. M. Nair (Chief Cardiac Surgeon)',
      title: isRtl ? 'كبير استشاريي جراحة القلب والشرايين' : 'Senior Consultant Cardiac Surgeon',
      hospital: isRtl ? 'مستشفى شريك - مجموعة أستر' : 'Partner Hospital - Aster Group',
      expEn: '22+ Years Experience',
      expAr: 'خبرة أكثر من ٢٢ عاماً',
      educationEn: 'Trained in UK & USA',
      educationAr: 'تلقى تدريبه في بريطانيا وأمريكا',
      accreditationEn: 'NABH Accredited Center',
      accreditationAr: 'مركز معتمد من الهيئة الوطنية (NABH)',
      initials: 'MN',
    },
    {
      name: isRtl ? 'د. س. بيلاي (كبير جراحي العظام)' : 'Dr. S. Pillai (Chief Orthopaedic Surgeon)',
      title: isRtl ? 'استشاري أول استبدال المفاصل والركبة' : 'Senior Consultant Joint Replacement',
      hospital: isRtl ? 'مستشفى شريك - مجموعة ميترا' : 'Partner Hospital - Meitra Group',
      expEn: '20+ Years Experience',
      expAr: 'خبرة أكثر من ٢٠ عاماً',
      educationEn: 'Joint & Spine Expert',
      educationAr: 'خبير جراحة المفاصل والعمود القبلي',
      accreditationEn: 'JCI Accredited Center',
      accreditationAr: 'مستشفى معتمد من اللجنة الدولية (JCI)',
      initials: 'SP',
    },
    {
      name: isRtl ? 'د. هـ. براساد (طبيب أول الأيورفيدا)' : 'Dr. H. Prasad (Senior Ayurvedic Physician)',
      title: isRtl ? 'طبيب أول الأيورفيدا والطب التقليدي' : 'Senior Ayurvedic Physician (BAMS)',
      hospital: isRtl ? 'شريك كوتاكال أريا فايديا سالا كيرلا' : 'Kottakkal Arya Vaidya Sala Partner',
      expEn: '25+ Years Experience',
      expAr: 'خبرة أكثر من ٢٥ عاماً',
      educationEn: 'Classical Panchakarma Expert',
      educationAr: 'أخصائي البانشاكارما والعلاج الكلاسيكي',
      accreditationEn: 'Government Green Leaf Certified',
      accreditationAr: 'معتمد بتصنيف الغصن الأخضر الحكومي',
      initials: 'HP',
    },
  ];

  const steps = [
    {
      num: '01',
      icon: ClipboardList,
      titleEn: 'Send Your Requirements',
      titleAr: 'أرسل متطلباتك الطبية',
      descEn: 'Share your medical reports via WhatsApp or our estimate form. We review within 24 hours.',
      descAr: 'شارك تقاريرك الطبية عبر واتساب أو نموذج التقدير. نراجعها خلال ٢٤ ساعة.',
    },
    {
      num: '02',
      icon: Stethoscope,
      titleEn: 'Get a Confirmed Quote',
      titleAr: 'احصل على عرض سعر مؤكد',
      descEn: 'We coordinate with NABH/JCI hospitals and send you a confirmed treatment plan with full cost breakdown.',
      descAr: 'ننسق مع المستشفيات المعتمدة ونرسل لك خطة علاجية مؤكدة مع تفاصيل التكاليف الكاملة.',
    },
    {
      num: '03',
      icon: HeartHandshake,
      titleEn: 'We Handle Everything Else',
      titleAr: 'نتولى كل شيء آخر',
      descEn: 'Visa letter, airport pickup, hotel booking, hospital admission, translator — all at zero extra charge.',
      descAr: 'خطاب التأشيرة، الاستقبال من المطار، حجز الفندق، التنسيق الطبي، المترجم — كل هذا بدون رسوم إضافية.',
    },
  ];

  const faqKeys = [1, 2, 3, 4, 5, 6, 7];

  const trustStats = [
    { numEn: '15,000+', numAr: '١٥،٠٠٠+', labelEn: 'Annual Network Patients', labelAr: 'مريض شبكة المستشفيات سنوياً', icon: Users },
    { numEn: '60–80%', numAr: '٦٠–٨٠٪', labelEn: 'Average Cost Savings', labelAr: 'توفير في التكلفة', icon: TrendingDown },
    { numEn: 'JCI / NABH', numAr: 'JCI / NABH', labelEn: 'Accredited Partners', labelAr: 'مستشفيات شريكة معتمدة', icon: ShieldCheck },
    { numEn: '24/7', numAr: '٢٤/٧', labelEn: 'Coordinator Support', labelAr: 'دعم المنسق الطبي', icon: Clock },
  ];

  const faqs = faqKeys.map((key) => ({
    q: tFAQ(`q${key}`),
    a: tFAQ(`a${key}`),
  }));
  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="flex flex-col w-full overflow-x-hidden animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF7F2] pt-16 pb-20 lg:pt-20 lg:pb-24 overflow-hidden border-b border-[#D4A96A]/35">
        {/* Organic Background Curves */}
        <div className="absolute inset-0 z-0 opacity-10 select-none pointer-events-none">
          <svg className="absolute right-0 top-0 h-full w-auto text-[#D4A96A]" fill="none" viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M400,0 C300,100 200,300 250,500 C300,700 100,800 0,800 L400,800 Z" fill="currentColor" opacity="0.03" />
            <path d="M400,200 C320,280 250,450 300,600 C350,750 200,800 50,800" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.07" />
          </svg>
          <svg className="absolute left-0 bottom-0 h-[60%] w-auto text-primary-green" fill="none" viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,600 C100,500 150,350 100,200 C50,50 120,0 200,0" stroke="currentColor" strokeWidth="2" opacity="0.04" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Copy + CTAs */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left rtl:lg:text-right">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display text-primary-dark leading-tight tracking-tight">
                  {tHero('headline')}
                </h1>
                <p className="text-base sm:text-xl text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {tHero('subheadline')}
                </p>
              </div>

              {/* Guarantees strip — horizontal scroll on mobile, wrap on desktop */}
              <div className="flex overflow-x-auto no-scrollbar scroll-mask-fade pb-2 lg:pb-0 justify-start lg:justify-start lg:flex-wrap gap-2.5 text-xs font-semibold font-sans -mx-4 px-4 lg:mx-0 lg:px-0">
                {[
                  { icon: Percent, enText: 'Corporate Partner Rates (Save 15-20%)', arText: 'أسعار مؤسسية مخفضة (توفير ١٥-٢٠٪)' },
                  { icon: Lock, enText: 'Direct-to-Hospital Payment', arText: 'الدفع للمستشفى مباشرة' },
                  { icon: Award, enText: 'NABH & JCI Certified', arText: 'مستشفيات معتمدة JCI/NABH' },
                  { icon: PhoneCall, enText: '24/7 Coordinator', arText: 'منسق شخصي ٢٤/٧' },
                ].map(({ icon: Icon, enText, arText }) => (
                  <span key={enText} className="flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-[#D4A96A]/45 hover:border-primary-green/30 text-text-muted hover:text-primary-green px-3.5 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 shrink-0 group">
                    <Icon className="h-3.5 w-3.5 text-[#D4A96A] group-hover:text-primary-green transition-colors duration-300" />
                    <span>{isRtl ? arText : enText}</span>
                  </span>
                ))}
              </div>

              {/* CTAs — hidden on mobile (bottom nav handles these) */}
              <div className="hidden sm:flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-300 min-h-[52px] text-center flex items-center justify-center gap-2 cursor-pointer tap-active"
                >
                  <MessageCircle className="h-5 w-5 text-white shrink-0" />
                  <span>{tCommon('whatsAppUs')}</span>
                </a>
                <Link
                  href="/get-estimate"
                  className="w-full sm:w-auto bg-white border-2 border-primary-green hover:bg-emerald-50/30 text-[#2D6A4F] font-bold px-8 py-4 rounded-full text-base shadow-xs hover:shadow-sm transition-all duration-300 min-h-[52px] text-center flex items-center justify-center cursor-pointer tap-active"
                >
                  {tCommon('getEstimate')}
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="lg:col-span-6 relative w-full aspect-[16/10] sm:aspect-[4/3] max-w-[520px] mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-primary-green rounded-[32px] sm:rounded-[40px] transform rotate-1 scale-95 border-2 border-accent-gold/30 -z-10 shadow-lg" />
              <div className="relative w-full h-full rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-accent-gold/25">
                <Image
                  src="/images/caring_doctor_patient_hero.png"
                  alt={isRtl ? 'منسقة علاج في كيرلا ترافق مريضاً في كيرلا' : 'TreatInKerala coordinator supporting a patient in Kerala'}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />

                {/* Floating savings badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#D4A96A]/35 flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-extrabold text-primary-green font-display">60–80%</span>
                  <span className="text-[10px] sm:text-xs text-text-muted font-sans leading-tight max-w-[80px]">
                    {isRtl ? 'توفير مقارنة بالغرب' : 'Lower than UK / GCC costs'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Trust Bar */}
          <div className="mt-16 pt-10 border-t border-[#D4A96A]/35">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {trustStats.map(({ numEn, numAr, labelEn, labelAr, icon: Icon }) => (
                <div key={labelEn} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#D4A96A]/30 hover:border-primary-green/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-green/8 text-primary-green flex items-center justify-center shrink-0 group-hover:bg-primary-green group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-lg sm:text-xl font-bold text-primary-dark font-display leading-tight">{isRtl ? numAr : numEn}</p>
                    <p className="text-xs text-text-muted font-sans mt-0.5">{isRtl ? labelAr : labelEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CLINICAL EXPERTS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-semibold font-display text-primary-dark">
              {isRtl ? 'أطباء وجراحون بمستوى عالمي' : 'World-Class Clinical Experts'}
            </h2>
            <p className="text-text-muted text-lg font-sans">
              {isRtl 
                ? 'استشر كبار الجراحين وأخصائيي الأيورفيدا ذوي الخبرة والاعتمادات الدولية في أفضل مستشفيات كيرلا.' 
                : 'Consult award-winning specialists and highly experienced traditional physicians at Kerala\'s premier hospitals.'}
            </p>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#D4A96A]/35 rounded-full px-5 py-2">
              <ShieldCheck className="h-4.5 w-4.5 text-primary-green" />
              <span className="text-sm font-bold text-primary-dark font-sans">
                {isRtl ? 'طاقم طبي مرخص معتمد JCI / NABH' : 'JCI & NABH Accredited Partner Panels'}
              </span>
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:mx-0 md:pb-0 scroll-momentum">
            {featuredDoctors.map((doc, idx) => {
              const bgGradients = [
                'from-emerald-500 to-teal-400',
                'from-amber-500 to-orange-400',
                'from-blue-500 to-indigo-400'
              ];
              const bgGradient = bgGradients[idx % bgGradients.length];

              return (
                <div key={idx} className="w-[85vw] sm:w-[45vw] md:w-auto shrink-0 snap-start bg-white border border-[#D4A96A]/35 hover:border-primary-green/40 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                  <div className="relative z-10 flex-1 flex flex-col space-y-5">
                    {/* Top verified badge row */}
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-[9px] font-bold text-primary-green bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        ✓ {isRtl ? 'شريك معتمد' : 'Verified Partner'}
                      </span>
                    </div>

                    {/* Doctor initial & basic details header */}
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-tr ${bgGradient} text-white flex items-center justify-center shrink-0 shadow-md border-2 border-white`}>
                          <UserRound className="h-7 w-7 opacity-85" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 h-5 w-5 bg-white border border-[#D4A96A]/45 rounded-full flex items-center justify-center text-[9px] font-bold text-[#D4A96A] shadow-xs">
                          {doc.initials}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-dark text-base sm:text-lg font-display group-hover:text-primary-green transition-colors duration-200">{doc.name}</h3>
                        <p className="text-xs text-[#D4A96A] font-bold font-sans">{doc.hospital}</p>
                      </div>
                    </div>

                    {/* Specialist Title */}
                    <div className="border-s-4 border-primary-green bg-[#FAF7F2] p-4 rounded-e-xl space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A96A] font-sans block">
                        {isRtl ? 'المسمى الطبي:' : 'Clinical Specialty:'}
                      </span>
                      <p className="text-text-dark font-extrabold text-sm font-sans leading-snug">{doc.title}</p>
                    </div>

                    {/* Qualifications / highlights */}
                    <ul className="space-y-3 text-xs text-text-muted font-sans flex-1 pt-2">
                      <li className="flex items-center gap-3">
                        <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100">✓</span>
                        <span>{isRtl ? doc.expAr : doc.expEn}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100">✓</span>
                        <span>{isRtl ? doc.educationAr : doc.educationEn}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100">✓</span>
                        <span>{isRtl ? doc.accreditationAr : doc.accreditationEn}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Consultation CTA button */}
                  <div className="mt-8 pt-5 border-t border-slate-100 relative z-10">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار عن حجز استشارة مع الدكتور: ${doc.name}` : `Hello TreatInKerala, I would like to request a consultation with: ${doc.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-center py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all duration-300 min-h-[44px] cursor-pointer tap-active"
                    >
                      <MessageCircle className="h-4.5 w-4.5 text-white shrink-0" />
                      <span>{isRtl ? 'حجز استشارة فورية' : 'Book Specialist Consultation'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-2 text-primary-green hover:text-primary-dark font-bold transition-colors font-sans"
            >
              {isRtl ? 'تصفح جميع المستشفيات والعيادات الشريكة' : 'Browse all partner hospitals and clinics'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 3. HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAF7F2] border-y border-[#D4A96A]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block font-sans">
              {isRtl ? 'العملية بسيطة' : 'The Process is Simple'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold font-display text-primary-dark">
              {isRtl ? 'كيف نرتب رحلتك الطبية؟' : 'How We Arrange Your Medical Trip'}
            </h2>
            <p className="text-text-muted text-lg">
              {isRtl
                ? 'ثلاث خطوات فقط تفصلك عن بدء رحلة علاجك في أفضل مستشفيات كيرلا.'
                : 'Three steps stand between you and world-class care at a fraction of what you\'d pay at home.'}
            </p>
          </div>

          <div className="relative flex flex-col md:grid md:grid-cols-3 gap-8">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-[#D4A96A]/25 z-0" />
            {/* Connecting line on mobile (aligned with icons) */}
            <div className="absolute top-8 bottom-8 left-9 rtl:left-auto rtl:right-9 w-0.5 bg-[#D4A96A]/25 md:hidden z-0" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative z-10 bg-white border border-[#D4A96A]/35 rounded-3xl p-5 sm:p-8 shadow-xs hover:shadow-xl hover:border-primary-green/30 transition-all duration-300 flex flex-row md:flex-col gap-4 md:gap-5 hover:-translate-y-1 group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-primary-green/10 group-hover:bg-primary-green flex items-center justify-center shrink-0 transition-colors duration-300">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-xl sm:text-3xl font-extrabold font-display text-slate-200 select-none mt-1.5">{step.num}</span>
                  </div>
                  <div className="space-y-1 md:space-y-2 text-left rtl:text-right">
                    <h3 className="text-base sm:text-xl font-bold text-primary-dark font-display">
                      {isRtl ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="text-text-muted text-xs sm:text-base leading-relaxed font-sans">
                      {isRtl ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/get-estimate"
              className="inline-flex items-center gap-2 bg-primary-green hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[52px]"
            >
              {tCommon('getEstimate')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. COST COMPARISON ─────────────────────────────────────────────── */}
      <CostComparison />

      {/* ─── 5. TRUST SECTION ───────────────────────────────────────────────── */}
      <section className="py-20 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-primary-green/25 to-transparent opacity-60 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left: Copy */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-accent-gold font-bold text-sm uppercase tracking-widest block font-sans">
                  {isRtl ? 'لماذا كيرلا؟' : 'Why Kerala?'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-semibold font-display leading-tight">
                  {isRtl ? 'رعاية طبية عالمية بسعر أقل بكثير' : 'World-Class Care at a Fraction of the Cost'}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {isRtl
                    ? 'كيرلا تجمع بين أعلى معايير السلامة الطبية العالمية وتكاليف تقل بنسبة 60-80% مقارنة بأمريكا وبريطانيا والإمارات.'
                    : 'Kerala combines JCI/NABH hospital safety standards with costs 60–80% below the US, UK and GCC — without compromising on quality.'}
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  { en: 'JCI & NABH certified hospital partners', ar: 'مستشفيات معتمدة JCI و NABH' },
                  { en: 'English & Arabic speaking medical staff', ar: 'طاقم طبي يتحدث العربية والإنجليزية' },
                  { en: 'Zero coordination fees — you pay hospitals directly', ar: 'لا رسوم تنسيق — تدفع للمستشفى مباشرة' },
                  { en: 'AYUSH-approved Ayurveda recovery programs', ar: 'برامج تعافي أيورفيدية معتمدة' },
                ].map(({ en, ar }) => (
                  <li key={en} className="flex items-start gap-3">
                    <span className="mt-1 h-5 w-5 rounded-full bg-primary-green flex items-center justify-center shrink-0 text-white text-[10px] font-bold">✓</span>
                    <span className="text-slate-200 font-sans">{isRtl ? ar : en}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/why-kerala"
                  className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-6 py-3 rounded-full text-sm transition-all hover:bg-accent-gold hover:text-white shadow-sm hover:shadow-md min-h-[44px]"
                >
                  {isRtl ? 'لماذا كيرلا؟' : 'Why Kerala'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/hospitals"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-full text-sm transition-all min-h-[44px]"
                >
                  <Building className="h-4 w-4 shrink-0" />
                  {isRtl ? 'عرض المستشفيات الشريكة' : 'View Partner Hospitals'}
                </Link>
              </div>
            </div>

            {/* Right: Commitment cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Lock, en: 'Zero Hidden Fees', ar: 'لا رسوم خفية', descEn: 'You pay hospitals directly. Our coordination is 100% complimentary.', descAr: 'تدفع للمستشفى مباشرة. التنسيق مجاني كلياً.' },
                { icon: RefreshCw, en: 'Free Rebooking', ar: 'إعادة جدولة مجانية', descEn: 'Any complication? We rearrange everything at zero charge.', descAr: 'أي مضاعفات؟ نعيد الترتيب بدون أي تكلفة إضافية.' },
                { icon: Globe, en: '35+ Countries Served', ar: '٣٥+ دولة خدمناها', descEn: '1,200+ international patients treated across Kerala.', descAr: 'أكثر من ١٢٠٠ مريض دولي علاجه في كيرلا.' },
                { icon: HeartPulse, en: '30-Day Post-Care', ar: '٣٠ يوم رعاية بعد العودة', descEn: 'WhatsApp follow-up for 30 days after you return home.', descAr: 'متابعة واتساب ٣٠ يوماً بعد عودتك لبلدك.' },
              ].map(({ icon: Icon, en, ar, descEn, descAr }) => (
                <div key={en} className="bg-white/8 border border-white/10 rounded-2xl p-5 hover:bg-white/15 hover:border-[#D4A96A]/40 hover:shadow-lg transition-all duration-300 space-y-3 group">
                  <div className="h-10 w-10 rounded-xl bg-primary-green/20 text-[#D4A96A] group-hover:text-white group-hover:bg-primary-green flex items-center justify-center transition-all duration-300 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-white font-display text-base">{isRtl ? ar : en}</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">{isRtl ? descAr : descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#D4A96A]/35">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-semibold font-display text-primary-dark">
              {tFAQ('heading')}
            </h2>
            <p className="text-lg text-text-muted">
              {tFAQ('subheading')}
            </p>
          </div>

          <div className="space-y-3">
            {faqKeys.map((key) => (
              <details
                key={key}
                className="group border border-[#D4A96A]/35 rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-300 hover:border-[#D4A96A]/60 hover:shadow-md"
              >
                <summary className="flex items-center justify-between gap-4 focus:outline-hidden min-h-[44px]">
                  <h3 className="text-lg font-semibold text-primary-dark transition-colors duration-300 group-hover:text-primary-green text-left rtl:text-right">
                    {tFAQ(`q${key}`)}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-[#D4A96A] transition-transform duration-300 group-open:-rotate-180 shrink-0" />
                </summary>
                <p className="mt-4 text-text-muted leading-relaxed text-base border-t border-slate-100 pt-4 text-left rtl:text-right">
                  {tFAQ(`a${key}`)}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#F0EDE8] border border-[#D4A96A]/30 text-primary-green font-bold px-6 py-3 rounded-full text-base transition-colors duration-300 min-h-[44px]"
            >
              <span>{isRtl ? 'عرض جميع الأسئلة' : 'View All FAQ'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] border-t border-[#D4A96A]/35 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-semibold font-display text-primary-dark">
            {isRtl ? 'هل أنت مستعد لبدء رحلتك العلاجية؟' : 'Ready to Start Your Healing Journey?'}
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            {isRtl
              ? 'تحدث مباشرة مع منسقنا الطبي الآن. نرد خلال دقائق.'
              : 'Chat directly with our medical coordinator now. We respond within minutes.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[52px] cursor-pointer"
            >
              <MessageCircle className="h-6 w-6 shrink-0" />
              <span>{tCommon('whatsAppUs')}</span>
            </a>
            <Link
              href="/get-estimate"
              className="inline-flex items-center gap-2 bg-white border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 min-h-[52px]"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/faq"
              className="text-[#D4A96A] hover:text-primary-green font-bold text-sm font-sans underline cursor-pointer"
            >
              {isRtl ? 'لديك استفسارات أخرى؟ اقرأ الأسئلة الشائعة ←' : 'Still researching? Read our FAQ →'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
