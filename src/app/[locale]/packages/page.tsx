import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Check, ShieldCheck, HelpCircle, ArrowRight, MessageCircle, FileText, Info, Award, Star } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'ar' 
      ? 'باقات التنسيق والرعاية الطبية الممتازة | ميدكيرلا' 
      : 'Premium Medical Concierge & Care Packages | MedKerala',
    description: locale === 'ar'
      ? 'قارن بين باقات التنسيق الطبي الأساسية والراقية للرعاية والترجمة والمرافقة الطبية في كيرلا وجنوب الهند.'
      : 'Compare Essential and Premium VIP concierge packages for medical travel coordination, Arabic translation, transport, and family companion support in Kerala & South India.',
  };
}

export default async function PackagesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Packages' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const isRtl = locale === 'ar';

  const essentialIncludes = [
    isRtl ? 'الاستقبال من المطار والمرافقة لمقر السكن' : 'Airport Meet-and-Greet & transfer to lodging',
    isRtl ? 'حجز المواعيد الطبية وتسهيل الدخول للمستشفى' : 'Hospital doctor shortlist & appointment scheduling',
    isRtl ? 'توفير خيارات السكن المناسبة وحجزها مسبقاً' : 'Pre-departure hotel/apartment shortlisting & booking',
    isRtl ? 'تأمين أسعار مؤسسية مخفضة (توفير ١٥-٢٠٪)' : 'Access to pre-negotiated corporate rates (15-20% off)',
    isRtl ? 'شريحة اتصال هندية محلية مجاناً مع إنترنت' : 'Complimentary Indian SIM card with active data',
    isRtl ? 'منسق حالة طبي شخصي عبر واتساب طوال الإقامة' : 'Dedicated personal care coordinator via WhatsApp',
    isRtl ? 'ترجمة التقارير والتحاليل الطبية للغة الإنجليزية' : 'Pre-arrival translation of medical records'
  ];

  const premiumIncludes = [
    isRtl ? 'كافة مميزات الباقة التنسيقية الأساسية' : 'Everything included in the Essential package',
    isRtl ? 'سيارة خاصة وسائق للتنقلات الطبية واليومية' : 'Private chauffeur & vehicle for all medical transits',
    isRtl ? 'مترجم طبي يرافقك شخصياً في جميع الزيارات الطبية' : 'Personal Arabic-speaking interpreter escort for visits',
    isRtl ? 'معالجة أوراق الفيزا الطبية الطارئة وخطاب الدعوة' : 'Priority Medical Visa assistance & official invitation',
    isRtl ? 'تسهيل فائق السرعة لدخول المشفى وتجاوز الانتظار' : 'VIP fast-track admission (zero wait lines)',
    isRtl ? 'متابعة طبية وتنسيق بعد العودة لمدة ٦٠ يوماً' : 'Extended post-care teleconsultation follow-up (60 days)',
    isRtl ? 'برنامج سياحي وثقافي قصير مجاني للمرافقين' : 'Complimentary cultural sightseeing tour for companions',
    isRtl ? 'المساعدة في صرف وتوصيل الأدوية والوصفات' : 'Medicine home-delivery & pharmacy support'
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1 bg-white border border-[#D4A96A]/35 text-xs font-bold text-primary-green px-3 py-1 rounded-full shadow-xs">
              <Award className="h-3.5 w-3.5 text-[#D4A96A]" />
              <span>{isRtl ? 'إدارة طبية متكاملة' : 'End-to-End Care Management'}</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {t('heading')}
          </h1>
          <p className="text-lg text-text-muted font-sans leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Dynamic Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20 items-stretch">
          
          {/* Card 1: Essential */}
          <div className="bg-white border border-[#D4A96A]/35 rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4A96A] font-sans block">
                  {isRtl ? 'الباقة الأساسية' : 'Standard Service'}
                </span>
                <h3 className="text-2xl font-bold text-text-dark font-display">{t('essentialTitle')}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-sans">{t('essentialDesc')}</p>
              </div>

              {/* Price Indicator */}
              <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                <span className="text-xs text-text-muted font-bold font-sans">{isRtl ? 'تبدأ من:' : 'From:'}</span>
                <span className="text-4xl font-extrabold text-primary-green font-display">${t('essentialPrice')}</span>
                <span className="text-xs text-text-muted font-sans">{isRtl ? 'رسوم تدفع لمرة واحدة' : 'One-time fee'}</span>
              </div>

              {/* Checkbox List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark font-sans">{t('whatsIncluded')}:</h4>
                <ul className="space-y-3.5">
                  {essentialIncludes.map((inc, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-text-muted font-sans leading-snug">
                      <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100 mt-0.5">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً ميدكيرلا، أود الاستفسار وحجز الباقة الأساسية ($299)` : `Hello MedKerala, I would like to inquire about the Essential Concierge package ($299)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FAF7F2] border-2 border-primary-green hover:bg-emerald-50/30 text-primary-green text-center py-4 px-6 rounded-2xl text-base font-bold font-sans flex items-center justify-center gap-2 transition-all duration-300 min-h-[48px] cursor-pointer"
              >
                <MessageCircle className="h-4.5 w-4.5 text-primary-green shrink-0" />
                <span>{t('bookBtn')}</span>
              </a>
            </div>
          </div>

          {/* Card 2: Premium VIP (Best Choice / Highlighted) */}
          <div className="bg-white border-2 border-primary-green rounded-3xl p-8 lg:p-10 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
            {/* VIP Label ribbon */}
            <div className="absolute top-5 right-5 bg-primary-green text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-xs">
              <Star className="h-3 w-3 fill-accent-gold text-accent-gold" />
              <span>{isRtl ? 'الأكثر طلباً' : 'Best Value / VIP'}</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary-green font-sans block">
                  {isRtl ? 'الباقة الفاخرة للخليج' : 'Premium Luxury Experience'}
                </span>
                <h3 className="text-2xl font-bold text-text-dark font-display">{t('premiumTitle')}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-sans">{t('premiumDesc')}</p>
              </div>

              {/* Price Indicator */}
              <div className="py-4 border-y border-slate-100 flex items-baseline gap-2">
                <span className="text-xs text-text-muted font-bold font-sans">{isRtl ? 'تبدأ من:' : 'From:'}</span>
                <span className="text-4xl font-extrabold text-[#D4A96A] font-display">${t('premiumPrice')}</span>
                <span className="text-xs text-text-muted font-sans">{isRtl ? 'رسوم تدفع لمرة واحدة' : 'One-time fee'}</span>
              </div>

              {/* Checkbox List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark font-sans">{t('whatsIncluded')}:</h4>
                <ul className="space-y-3.5">
                  {premiumIncludes.map((inc, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-text-muted font-sans leading-snug">
                      <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100 mt-0.5">✓</span>
                      <span className={index === 0 ? "font-bold text-primary-dark" : ""}>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً ميدكيرلا، أود الاستفسار وحجز باقة الـ VIP الراقية ($999)` : `Hello MedKerala, I would like to inquire about the Premium VIP Concierge package ($999)`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-center py-4 px-6 rounded-2xl text-base font-bold font-sans flex items-center justify-center gap-2 transition-all duration-300 min-h-[48px] cursor-pointer shadow-md"
              >
                <MessageCircle className="h-4.5 w-4.5 text-white shrink-0" />
                <span>{t('bookBtn')}</span>
              </a>
            </div>
          </div>

        </div>

        {/* 2. HYBRID PRICING TRANSPARENCY SECTION */}
        <section className="bg-white border border-[#D4A96A]/35 rounded-3xl p-8 lg:p-12 mb-20 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#D4A96A]/10 w-48 h-48 rounded-full blur-3xl -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-[#D4A96A] border border-amber-100 flex items-center justify-center shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-dark font-display">{t('hybridNoteTitle')}</h3>
              </div>
              
              <div className="space-y-4 text-text-muted text-base leading-relaxed font-sans">
                <p>{t('hybridNoteDesc')}</p>
                <p>
                  {isRtl 
                    ? 'من الناحية العملية، يعتمد السعر النهائي على نوع زراعة المفاصل أو عدد دعامات القسطرة، فئة الغرفة بالمستشفى، وتاريخك المرضي ومضاعفاته إن وجدت. عندما تطلب تقدير التكلفة لدينا، نحصل لك على عروض أسعار رسمية دقيقة من أفضل الاستشاريين حتى لا تواجه أي مفاجآت أو زيادة في الفاتورة عند وصولك.'
                    : 'In practice, procedure rates change based on implant materials, duration of ICU stay, pre-existing conditions, and hospital room category selection. By organizing your treatment directly through our partner channels, you secure special corporate rates while keeping pricing 100% transparent and reliable.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-primary-green hover:text-primary-dark font-bold font-sans transition-colors"
                >
                  <span>{isRtl ? 'اقرأ الأسئلة الشائعة حول الفوترة والأسعار' : 'Read billing FAQs'}</span>
                  <ArrowRight className="h-4 w-4 font-sans" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FAF7F2] p-6 rounded-2xl border border-[#D4A96A]/30 space-y-4">
              <h4 className="font-bold text-text-dark font-display text-lg">
                {isRtl ? 'مزايا التسعير الهجين:' : 'Hybrid Model Advantages:'}
              </h4>
              <ul className="space-y-3 text-sm text-text-muted font-sans">
                {[
                  isRtl ? '✓ لا أسعار وهمية أو مفاجآت مخفية' : '✓ Zero fake prices or hidden traps',
                  isRtl ? '✓ الدفع مباشرة للمستشفيات الشريكة' : '✓ Direct-to-Hospital billing payment',
                  isRtl ? '✓ تأمين أسعار مخفضة للشركاء فقط' : '✓ Fully customized medical opinions',
                  isRtl ? '✓ استشارة الطبيب قبل السفر لتأكيد الخطة' : '✓ Consult specialist before flight'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-primary-green font-bold font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* 3. STEP BY STEP FLOW */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-semibold font-display text-primary-dark">
              {t('howItWorks')}
            </h2>
            <p className="text-text-muted text-base">
              {isRtl 
                ? 'ثلاث خطوات بسيطة ومنظمة تفصلك عن السفر وبدء رحلة استشفائك بوضوح وأمان.' 
                : 'A transparent 3-step timeline from your first inquiry to your safe arrival and recovery.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            {/* Connecting Line on Desktop */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-[#D4A96A]/20 z-0"></div>

            {[
              { title: t('step1Title'), desc: t('step1Desc'), emoji: '📂' },
              { title: t('step2Title'), desc: t('step2Desc'), emoji: '🏥' },
              { title: t('step3Title'), desc: t('step3Desc'), emoji: '✈️' }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 bg-white border border-[#D4A96A]/35 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-3">
                <span className="text-3xl">{step.emoji}</span>
                <h4 className="font-bold text-text-dark font-display text-lg">{step.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
