import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import {
  ArrowRight,
  Star,
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
} from 'lucide-react';
import CostComparison from '@/components/home/CostComparison';

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

  const reviews = [
    {
      name: isRtl ? 'أحمد الهادي' : 'Ahmed Al-Hadi',
      origin: isRtl ? 'مسقط، عمان' : 'Muscat, Oman',
      flag: '🇴🇲',
      treatment: isRtl ? 'جراحة قلب' : 'Cardiac Bypass',
      rating: 5,
      youtubeUrl: 'https://www.youtube.com/watch?v=9Beb7Wb_H10',
      quote: isRtl
        ? '"كانت تجربة استثنائية. عملية مجازة القلب تمت بنجاح فائق وتكاليف تقل كثيراً عن العلاج بالخارج. منسق ميدكيرلا رتب كل شيء."'
        : '"The cardiac bypass surgery was handled with extreme professionalism. I saved over 70% compared to London. The coordinators in Calicut took care of everything — visa, hotel, transport."',
    },
    {
      name: 'Sarah Jenkins',
      origin: 'London, UK',
      flag: '🇬🇧',
      treatment: 'Ayurveda Panchakarma',
      rating: 5,
      youtubeUrl: '',
      quote: isRtl
        ? '"سافرت إلى كيرلا لعلاج البانشاكارما لمدة 14 يوماً. أشعر بنشاط لم أشعر به منذ سنوات."'
        : '"I visited Kottakkal for a 14-day Panchakarma retreat. The results were magical. The MedKerala team were incredibly caring from day one."',
    },
    {
      name: 'Khalid Mansoor',
      origin: isRtl ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
      flag: '🇸🇦',
      treatment: isRtl ? 'زراعة الأسنان' : 'Full Arch Dental Implants',
      rating: 5,
      youtubeUrl: 'https://www.youtube.com/watch?v=n81JsnYvIqE',
      quote: isRtl
        ? '"زراعة الأسنان تمت بإتقان عالٍ. التكاليف أقل بـ 80% مما كنت سأدفعه في الرياض."'
        : '"The dental implants were done beautifully. Costs 80% lower than back home. Very happy with the coordinator support."',
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

  const faqKeys = [1, 2, 3, 4, 5];

  const trustStats = [
    { numEn: '1,200+', numAr: '١٢٠٠+', labelEn: 'Patients Treated', labelAr: 'مريض علاجه في كيرلا', icon: Users },
    { numEn: '60–80%', numAr: '٦٠–٨٠٪', labelEn: 'Average Cost Savings', labelAr: 'توفير في التكلفة', icon: TrendingDown },
    { numEn: 'JCI / NABH', numAr: 'JCI / NABH', labelEn: 'Accredited Partners', labelAr: 'مستشفيات شريكة معتمدة', icon: ShieldCheck },
    { numEn: '24/7', numAr: '٢٤/٧', labelEn: 'Coordinator Support', labelAr: 'دعم المنسق الطبي', icon: Clock },
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden animate-fade-in">

      {/* ─── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#FAF7F2] pt-16 pb-20 lg:pt-20 lg:pb-24 overflow-hidden border-b border-[#D4A96A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Copy + CTAs */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left rtl:lg:text-right">
              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-display text-primary-dark leading-tight tracking-tight">
                  {tHero('headline')}
                </h1>
                <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {tHero('subheadline')}
                </p>
              </div>

              {/* Guarantees strip */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-xs font-semibold font-sans">
                {[
                  { emoji: '🔒', enText: 'Zero Hidden Fees', arText: 'لا رسوم خفية' },
                  { emoji: '🏥', enText: 'NABH & JCI Hospitals', arText: 'مستشفيات معتمدة' },
                  { emoji: '📞', enText: '24/7 Arabic Support', arText: 'دعم عربي ٢٤/٧' },
                ].map(({ emoji, enText, arText }) => (
                  <span key={enText} className="flex items-center gap-1.5 bg-white border border-[#D4A96A]/25 text-text-muted px-3 py-1.5 rounded-full shadow-xs">
                    <span>{emoji}</span>
                    <span>{isRtl ? arText : enText}</span>
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[52px] text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5 text-white shrink-0" />
                  <span>{tCommon('whatsAppUs')}</span>
                </a>
                <Link
                  href="/get-estimate"
                  className="w-full sm:w-auto bg-white border-2 border-primary-green hover:bg-emerald-50/30 text-[#2D6A4F] font-bold px-8 py-4 rounded-full text-lg shadow-xs hover:shadow-sm transition-all duration-300 min-h-[52px] text-center flex items-center justify-center cursor-pointer"
                >
                  {tCommon('getEstimate')}
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="lg:col-span-6 relative w-full aspect-[4/3] max-w-[520px] mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-primary-green rounded-[40px] transform rotate-2 scale-95 border-2 border-accent-gold/30 -z-10 shadow-lg" />
              <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border border-accent-gold/25">
                <Image
                  src="/images/caring_doctor_patient_hero.png"
                  alt={isRtl ? 'منسقة ميدكيرلا ترافق مريضاً في كيرلا' : 'MedKerala coordinator supporting a patient in Kerala'}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />

                {/* Floating savings badge */}
                <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#D4A96A]/20 flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-primary-green font-display">60–80%</span>
                  <span className="text-xs text-text-muted font-sans leading-tight max-w-[80px]">
                    {isRtl ? 'توفير مقارنة بالغرب' : 'Lower than UK / GCC costs'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Trust Bar */}
          <div className="mt-16 pt-10 border-t border-[#D4A96A]/20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {trustStats.map(({ numEn, numAr, labelEn, labelAr, icon: Icon }) => (
                <div key={labelEn} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary-green/8 text-primary-green flex items-center justify-center shrink-0 group-hover:bg-primary-green group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-base font-bold text-primary-dark font-display">{isRtl ? numAr : numEn}</p>
                    <p className="text-xs text-text-muted font-sans">{isRtl ? labelAr : labelEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. PATIENT TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-semibold font-display text-primary-dark">
              {isRtl ? 'قصص نجاح حقيقية' : 'Real Patients. Real Results.'}
            </h2>
            <p className="text-text-muted text-lg">
              {isRtl ? 'تجارب موثقة من مرضى سافروا إلى كيرلا من ٣٥+ دولة.' : 'Verified experiences from patients who traveled from 35+ countries.'}
            </p>
            {/* Star aggregate */}
            <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#D4A96A]/20 rounded-full px-5 py-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FFA500] text-[#FFA500]" />
                ))}
              </div>
              <span className="text-sm font-bold text-primary-dark">4.9/5</span>
              <span className="text-xs text-text-muted font-sans">{isRtl ? '٨٠+ تقييم موثق' : '80+ Verified Reviews'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => {
              const youtubeId = getYouTubeId(rev.youtubeUrl);
              const avatarColors = ['bg-primary-green', 'bg-[#D4A96A]', 'bg-primary-dark'];
              const avatarColor = avatarColors[idx % avatarColors.length];

              return (
                <div key={idx} className="bg-white border border-[#D4A96A]/15 hover:border-primary-green/30 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
                  {!youtubeId && <span className="absolute -end-2 -top-6 text-9xl font-serif text-[#D4A96A]/10 select-none pointer-events-none">&ldquo;</span>}
                  <div className="relative z-10 flex-1 flex flex-col space-y-4">
                    {!youtubeId && (
                      <div className="flex gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent-gold text-accent-gold" />
                        ))}
                      </div>
                    )}
                    {youtubeId ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-[#D4A96A]/20 bg-slate-100 group cursor-pointer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                          alt={`${rev.name} Video Testimonial`}
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors group-hover:bg-black/40">
                          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-5 h-5 fill-white text-white translate-x-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md font-sans">
                          {isRtl ? 'مشاهدة على يوتيوب ↗' : 'Watch Story ↗'}
                        </span>
                      </a>
                    ) : (
                      <p className="text-text-muted italic text-base leading-relaxed flex-1">
                        {rev.quote}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3 relative z-10">
                    <div className={`h-11 w-11 rounded-full ${avatarColor} text-white flex items-center justify-center font-bold text-base shrink-0 relative`}>
                      {rev.name[0]}
                      <span className="absolute -bottom-1 -right-1 bg-primary-green text-white rounded-full h-4 w-4 flex items-center justify-center text-[9px] border-2 border-white">✓</span>
                    </div>
                    <div>
                      <p className="font-bold text-text-dark text-sm">{rev.name}</p>
                      <p className="text-xs text-text-muted">
                        {rev.flag} {rev.origin} · {rev.treatment}
                      </p>
                      <span className="text-[10px] font-bold text-primary-green bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full mt-1 inline-block uppercase tracking-wide">
                        ✓ {isRtl ? 'مريض موثق' : 'Verified Patient'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/patient-stories"
              className="inline-flex items-center gap-2 text-primary-green hover:text-primary-dark font-bold transition-colors font-sans"
            >
              {isRtl ? 'عرض جميع قصص المرضى' : 'View all patient stories'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 3. HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAF7F2] border-y border-[#D4A96A]/15">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-[#D4A96A]/25 z-0" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative z-10 bg-white border border-[#D4A96A]/20 rounded-3xl p-8 shadow-xs hover:shadow-xl hover:border-primary-green/30 transition-all duration-300 flex flex-col gap-5 hover:-translate-y-1 group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary-green/10 group-hover:bg-primary-green flex items-center justify-center shrink-0 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-primary-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-5xl font-extrabold font-display text-slate-100 select-none">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark mb-2 font-display">
                      {isRtl ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="text-text-muted leading-relaxed font-sans">
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
                { emoji: '🔒', en: 'Zero Hidden Fees', ar: 'لا رسوم خفية', descEn: 'You pay hospitals directly. Our coordination is 100% complimentary.', descAr: 'تدفع للمستشفى مباشرة. التنسيق مجاني كلياً.' },
                { emoji: '🔄', en: 'Free Rebooking', ar: 'إعادة جدولة مجانية', descEn: 'Any complication? We rearrange everything at zero charge.', descAr: 'أي مضاعفات؟ نعيد الترتيب بدون أي تكلفة إضافية.' },
                { emoji: '🌍', en: '35+ Countries Served', ar: '٣٥+ دولة خدمناها', descEn: '1,200+ international patients treated across Kerala.', descAr: 'أكثر من ١٢٠٠ مريض دولي علاجه في كيرلا.' },
                { emoji: '📞', en: '30-Day Post-Care', ar: '٣٠ يوم رعاية بعد العودة', descEn: 'WhatsApp follow-up for 30 days after you return home.', descAr: 'متابعة واتساب ٣٠ يوماً بعد عودتك لبلدك.' },
              ].map(({ emoji, en, ar, descEn, descAr }) => (
                <div key={en} className="bg-white/8 border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 space-y-2">
                  <div className="text-2xl">{emoji}</div>
                  <h4 className="font-bold text-white font-display">{isRtl ? ar : en}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-sans">{isRtl ? descAr : descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
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
                className="group border border-slate-200/60 rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-300 hover:border-[#D4A96A]/50 hover:shadow-md"
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
      <section className="bg-[#FAF7F2] border-t border-[#D4A96A]/20 py-20">
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
