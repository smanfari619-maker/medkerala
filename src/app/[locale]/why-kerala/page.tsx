import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { 
  Award, 
  Compass, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  Building2, 
  Plane, 
  Leaf, 
  HeartPulse, 
  ShieldCheck, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { getBreadcrumbSchema } from '@/lib/schemas';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr 
      ? 'لماذا العلاج في كيرلا؟ تغطية شاملة في كوتشين، كالكوت وكوتاكال | علاج في كيرلا' 
      : 'Why Choose Kerala for Treatment: Kochi, Calicut & Statewide Care | TreatInKerala',
    description: isAr 
      ? 'اكتشف مزايا السياحة العلاجية في كيرلا - تغطية شاملة لكافة أنحاء كيرلا، طواقم متخصصة في كوتشين (إرناكولام) وكالكوت وكوتاكال، وتوفير 60-80% في التكاليف الطبية.'
      : 'Learn why Kerala is a premier global medical destination. Full statewide coverage with dedicated patient coordinators in Kochi (Ernakulam), Calicut, and Kottakkal.',
    alternates: {
      canonical: isAr ? '/ar/why-kerala' : '/en/why-kerala',
      languages: {
        en: '/en/why-kerala',
        ar: '/ar/why-kerala',
      },
    },
  };
}

export default async function WhyKeralaPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const isRtl = locale === 'ar';

  const breadcrumbSchema = getBreadcrumbSchema([
    {
      name: isRtl ? 'الرئيسية' : 'Home',
      url: `https://www.treatinkerala.com/${locale}`,
    },
    {
      name: isRtl ? 'لماذا كيرلا' : 'Why Kerala',
      url: `https://www.treatinkerala.com/${locale}/why-kerala`,
    },
  ]);

  const stats = [
    { 
      label: isRtl ? 'اعتمادات المستشفيات' : 'Accredited Hospitals', 
      value: '100+', 
      desc: isRtl ? 'مستشفيات كبرى حاصلة على اعتمادات NABH و JCI' : 'NABH & JCI approved partner networks' 
    },
    { 
      label: isRtl ? 'أطباء مؤهلين دولياً' : 'Specialist Doctors', 
      value: '2,500+', 
      desc: isRtl ? 'استشاريون وجراحون تدربوا في بريطانيا وأمريكا' : 'Specialists with foreign clinical fellowships' 
    },
    { 
      label: isRtl ? 'نسبة الوفورات الطبية' : 'Average Savings', 
      value: '60% - 80%', 
      desc: isRtl ? 'توفير حقيقي مقارنة بتكاليف دبي ولندن وأمريكا' : 'Compared to US, UK, and GCC private hospitals' 
    },
    { 
      label: isRtl ? 'تغطية شاملة لكل كيرلا' : 'Statewide Reach', 
      value: '100%', 
      desc: isRtl ? 'طواقم متخصصة في كوتشين، كالكوت وكوتاكال' : 'Dedicated teams in Kochi, Calicut & Kottakkal' 
    },
  ];

  const regionalHubs = [
    {
      id: 'kochi',
      titleEn: 'Kochi (Ernakulam) — Metropolitan Medical Capital',
      titleAr: 'كوتشين (إرناكولام) — العاصمة الطبية الكبرى',
      tagEn: 'Dedicated Staff & Concierge Team in Kochi',
      tagAr: 'طاقم عمل ومنسقون دائمون في كوتشين',
      descEn: 'Kochi (Ernakulam) is Kerala’s largest healthcare metropolis and a world-class center for organ transplants, robotic oncology, and advanced multi-specialty care. We maintain dedicated full-time patient coordinators and Arabic translators on the ground in Ernakulam, providing seamless tarmac reception from Cochin International Airport (COK), premium backwater recovery resorts, and immediate access to Kerala’s flagship hospitals.',
      descAr: 'تعتبر مدينة كوتشين (إرناكولام) المركز الطبي الأكبر والأكثر حداثة في كيرلا، والرائدة عالمياً في زراعة الأعضاء، وجراحات الأورام بالروبوت، والقلب والأوعية الدموية. يمتلك فريقنا طاقم عمل متخصصاً ومترجمين عرباً متواجدين بصفة دائمة في إرناكولام، لتوفير الاستقبال المباشر من مطار كوتشين الدولي (COK)، وتنسيق الإقامة الفندقية الفاخرة، والمرافقة في كبرى المستشفيات.',
      hospitals: [
        'Aster Medcity (Kochi)',
        'Amrita Institute of Medical Sciences (AIMS)',
        'VPS Lakeshore Hospital',
        'Rajagiri Hospital (Aluva, Kochi)'
      ],
      airportInfoEn: 'Cochin International Airport (COK) — Direct flights from all GCC cities, UK & Singapore. 20–35 mins to partner hospitals.',
      airportInfoAr: 'مطار كوتشين الدولي (COK) — رحلات مباشرة يومياً من كافة مدن الخليج وأوروبا. يبعد 20-35 دقيقة فقط عن المستشفيات.',
      icon: Building2,
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'calicut',
      titleEn: 'Calicut (Kozhikode) — Northern Tertiary Care & Coastal Convalescence',
      titleAr: 'كوزيكود (كالكوت) — عاصمة الرعاية التخصصية والنقاهة الساحلية',
      tagEn: 'Headquarters & Multi-Specialty Base',
      tagAr: 'المقر الرئيسي والمستشفيات التخصصية',
      descEn: 'Calicut combines state-of-the-art super-specialty hospitals with a tranquil seaside atmosphere free of big-city congestion. Calicut International Airport (CCJ) is seamlessly connected to Riyadh, Jeddah, Dammam, Dubai, and Muscat. Renowned for robotic knee and hip replacements, complex coronary bypass grafting, and pediatric care.',
      descAr: 'تجمع كوزيكود بين أحدث المستشفيات الجراحية التخصصية والهدوء الساحلي الخلاب الخالي من صخب وازدحام المدن الكبرى. يستقبل مطار كوزيكود الدولي (CCJ) رحلات مباشرة يومياً من الرياض وجدة والدمام ودبي ومسقط. وتشتهر كوزيكود بجراحات المفاصل بالروبوت والقلب المفتوح والأعصاب.',
      hospitals: [
        'Aster MIMS (Calicut)',
        'Meitra Hospital (Robotic Center)',
        'Baby Memorial Hospital',
        'Iqraa International Hospital'
      ],
      airportInfoEn: 'Calicut International Airport (CCJ) — 20–30 mins private drive directly to hospital executive suites.',
      airportInfoAr: 'مطار كوزيكود الدولي (CCJ) — 20 إلى 30 دقيقة بالسيارة الخاصة مباشرة لأجنحة المستشفى.',
      icon: Compass,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'kottakkal',
      titleEn: 'Kottakkal (Malappuram) — The World Capital of Authentic Ayurveda',
      titleAr: 'كوتاكال (مالابورام) — العاصمة العالمية للأيورفيدا الأصيلة',
      tagEn: 'Ayurvedic Heritage Hub & AVS Desk',
      tagAr: 'مركز التراث الأيورفيدي ومكتب كوتاكال',
      descEn: 'Located just 35 minutes south of Calicut Airport, Kottakkal is home to the world-renowned Kottakkal Arya Vaidya Sala (founded 1902). We provide on-ground concierge services directly in Kottakkal: doctor consultations, outpatient therapy facilitation, furnished family villas and serviced apartments, and doorstep international courier of genuine medicines.',
      descAr: 'تقع كوتاكال على بعد 35 دقيقة فقط جنوب مطار كوزيكود، وتعد المقر التاريخي لمؤسسة كوتاكال آريا فايديا شالا الشهيرة عالمياً (تأسست عام 1902). نوفر في كوتاكال خدمات شاملة: حجز المواعيد مع كبار الأطباء، وباقات العلاج بالعيادات الخارجية، وفللاً وشققاً عائلية مفروشة، وشحن الأدوية عالمياً.',
      hospitals: [
        'Kottakkal Arya Vaidya Sala (AVS)',
        'AVS Ayurvedic Hospital & Research Centre',
        'Aster MIMS Kottakkal (Modern Medical Backup)',
        'Partner Green Leaf Certified Wellness Resorts'
      ],
      airportInfoEn: 'Convenient 35-min drive from Calicut Airport (CCJ). Full wheelchair and stretcher support.',
      airportInfoAr: '35 دقيقة فقط من مطار كوزيكود (CCJ) مع سيارات مجهزة للكراسي المتحركة والنقالات.',
      icon: Leaf,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  return (
    <div className="pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#1B4332] text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{locale === 'ar' ? 'شبكة متكاملة تغطي كافة أنحاء كيرلا' : 'Comprehensive Healthcare Network Across Kerala'}</span>
          </div>

          <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[#1B4332] leading-tight">
            {locale === 'ar' 
              ? 'لماذا يختار المرضى من حول العالم كيرلا للعلاج والاستشفاء؟' 
              : 'Why Patients Worldwide Choose Kerala for Treatment & Recovery'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'لا نقتصر على مدينة واحدة؛ بل تغطي خدماتنا ولاية كيرلا بالكامل، مع طواقم متخصصة ومنسقين ومترجمين دائمين في إرناكولام (كوتشين)، كوزيكود (كالكوت)، وكوتاكال (آريا فايديا شالا).'
              : 'Our care coordination extends across the entire state of Kerala. With dedicated local staff and Arabic coordinators in Ernakulam (Kochi), Calicut (Kozhikode), and Kottakkal, we manage every clinical and travel detail for you.'}
          </p>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-16 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100 rtl:divide-x-reverse">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1.5 pt-4 first:pt-0 lg:pt-0">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-[#1B4332] block">
                  <span className="inline-block" dir="ltr">{stat.value}</span>
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-sans">{stat.label}</h3>
                <p className="text-xs sm:text-[13px] text-slate-500 max-w-[200px] mx-auto leading-relaxed font-sans">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PAN-KERALA COVERAGE BANNER ── */}
        <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white rounded-3xl p-6 sm:p-8 mb-16 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'تغطية شاملة لكافة المحافظات الـ ١٤' : 'All 14 Kerala Districts Covered'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              {locale === 'ar' 
                ? 'خدماتنا وتنسيقنا الطبي يغطي جميع مدن ومستشفيات كيرلا' 
                : 'Wherever Your Treatment Is in Kerala, We Are There With You'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              {locale === 'ar'
                ? 'من كوتشين وإرناكولام جنوباً إلى كوزيكود وكانور شمالاً، ومنتجعات واياناد الجبلية، نوفر سيارات خاصة، ومترجمين عرباً مرافقين، واستقبالاً في جميع مطارات كيرلا الدولية.'
                : 'From Kochi & Ernakulam to Calicut, Kottakkal, and the wellness retreats of Wayanad, TreatInKerala provides direct airport pickups (COK, CCJ, TRV), bilingual Arabic coordinators, and family accommodation across the entire state.'}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#1B4332] hover:bg-slate-100 font-bold text-sm shadow-xs transition-colors cursor-pointer min-h-[44px]"
            >
              <span>{locale === 'ar' ? 'تحدث مع منسق كيرلا' : 'Contact Our Team'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* ── OUR 3 CORE REGIONAL HUBS ── */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold">
              <span>{locale === 'ar' ? 'مراكزنا التنسيقية الرئيسية' : 'Our Regional Hubs & Offices'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900">
              {locale === 'ar' ? 'طواقم متخصصة ومكاتب ميدانية في أبرز مدن كيرلا' : 'Dedicated On-Ground Staff in Kerala’s Premier Hubs'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {locale === 'ar' 
                ? 'نقدم دعماً ميدانياً مباشراً في أكبر المراكز الطبية دون الاعتماد على وسطاء خارجيين.'
                : 'Direct personal coordination by our own resident coordinators, drivers, and translators.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {regionalHubs.map((hub) => {
              const HubIcon = hub.icon;
              return (
                <div
                  key={hub.id}
                  className="bg-white rounded-3xl p-7 border border-slate-200 hover:border-[#1B4332]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <HubIcon className="w-6 h-6 text-[#1B4332]" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${hub.badgeColor}`}>
                        {locale === 'ar' ? hub.tagAr : hub.tagEn}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {locale === 'ar' ? hub.titleAr : hub.titleEn}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {locale === 'ar' ? hub.descAr : hub.descEn}
                    </p>

                    {/* Hospitals List */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {locale === 'ar' ? 'أبرز المستشفيات والمراكز:' : 'Key Partner Facilities:'}
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {hub.hospitals.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Airport Connectivity Footer */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-600 flex items-start gap-2.5">
                    <Plane className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      {locale === 'ar' ? hub.airportInfoAr : hub.airportInfoEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── COST SAVINGS CHART VISUAL ── */}
        <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl relative overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 mb-20">
          <div className="relative z-10 space-y-8">
            <div className="mb-10 space-y-3 rtl:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold mb-2">
                <span>{locale === 'ar' ? 'مقارنة التكاليف' : 'Cost Savings'}</span>
              </div>
              <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl text-slate-900">
                {locale === 'ar' ? 'مقارنة وفورات الجراحة المتوسطة (بالدولار)' : 'Average Surgery Cost Comparison (USD)'}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl">
                {locale === 'ar'
                  ? 'تكلفة نموذجية لعمليات جراحية رئيسية (مثل استبدال المفاصل بالروبوت أو جراحة القلب).'
                  : 'Representative costs for major cardiovascular or orthopedic procedures across medical destinations.'}
              </p>
            </div>

            <div className="space-y-6 pt-2 font-sans">
              {/* Kerala Bar */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-sm text-[#1B4332]">
                  <span>{locale === 'ar' ? 'كيرلا، الهند (علاج في كيرلا)' : 'Kerala, India (TreatInKerala All-Inclusive)'}</span>
                  <span className="font-display font-extrabold text-base">{locale === 'ar' ? '٤,٥٠٠ - ٨,٥٠٠ دولار' : '$4,500 – $8,500'}</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-[#1B4332] h-full rounded-full transition-all duration-1000 w-[12%]"></div>
                </div>
              </div>

              {/* UAE Bar */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-sm text-slate-900">
                  <span>{locale === 'ar' ? 'الإمارات العربية المتحدة (القطاع الخاص)' : 'United Arab Emirates (Private Sector)'}</span>
                  <span className="font-display font-extrabold text-base">$18,000</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-slate-500 h-full rounded-full transition-all duration-1000 w-[38%]"></div>
                </div>
              </div>

              {/* UK Bar */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-sm text-slate-900">
                  <span>{locale === 'ar' ? 'المملكة المتحدة (خاص)' : 'United Kingdom (Private Hospitals)'}</span>
                  <span className="font-display font-extrabold text-base">$26,000</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-slate-600 h-full rounded-full transition-all duration-1000 w-[55%]"></div>
                </div>
              </div>

              {/* USA Bar */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-sm text-slate-900">
                  <span>{locale === 'ar' ? 'الولايات المتحدة الأمريكية' : 'United States (Out-of-Pocket)'}</span>
                  <span className="font-display font-extrabold text-base">$48,000</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-[#D4A96A] h-full rounded-full transition-all duration-1000 w-[95%]"></div>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-6 font-sans">
              {locale === 'ar'
                ? '* تشمل التكاليف التقديرية الإقامة والمتابعة الطبية والتنسيق.'
                : '* Costs represented are averages across orthopedic and cardiac specialties at JCI facilities.'}
            </div>
          </div>
        </div>

        {/* ── CONSULTATION & COORDINATION CTA BOX ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16 bg-[#111827] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="space-y-4 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'منسقون عرب في كوتشين وكالكوت' : 'Arabic Coordinators in Kochi & Calicut'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {locale === 'ar' ? 'تحدث مع منسقنا الطبي في كيرلا اليوم' : 'Speak Directly with a Kerala Medical Coordinator'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              {locale === 'ar'
                ? 'شاركنا تقاريرك الطبية أو تفاصيل حالتك لنحدد لك أفضل مستشفى ومدينة في كيرلا تناسب حالتك وميزانيتك.'
                : 'Send your reports or outline your condition. We guide you to the right specialist hospital in Kochi, Calicut, or Kottakkal within 24 hours.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3.5">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                locale === 'ar'
                  ? 'مرحباً، أود الاستفسار عن العلاج في كيرلا وخيارات المستشفيات في كوتشين وكالكوت'
                  : 'Hello TreatInKerala team, I would like to inquire about hospitals and medical treatment in Kerala.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3.5 rounded-full text-base transition-all duration-200 shadow-md min-h-[48px] flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <MessageCircle className="h-5 w-5 text-white" />
              <span>{locale === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Coordinator'}</span>
            </a>
            <Link
              href="/get-estimate"
              className="w-full sm:w-auto border border-white/30 text-white hover:bg-white hover:text-[#111827] font-bold px-8 py-3.5 rounded-full text-base transition-all duration-200 min-h-[48px] flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>{tCommon('getEstimate')}</span>
              <PhoneCall className="h-4.5 w-4.5 shrink-0" />
            </Link>
          </div>
        </div>

        {/* ── TAMIL NADU SPECIALTY EXTENSION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-xs">
          <div className="space-y-6 order-last lg:order-first">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold mb-1">
              <span>{locale === 'ar' ? 'التوسع الجغرافي: تاميل نادو' : 'Regional Extension: Tamil Nadu'}</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-2xl sm:text-3xl text-slate-900 leading-tight">
              {locale === 'ar' ? 'شراكات النخبة في تشيناي وفيلور' : 'Elite Specialty Partnerships in Chennai & Vellore'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {locale === 'ar'
                ? 'بالإضافة لتغطيتنا الشاملة في كيرلا، قمنا بتوسيع شبكتنا لتشمل كبرى الصروح الطبية في تاميل نادو المجاورة، مثل مستشفى كلية الطب المسيحية المرموقة (CMC Vellore) ومستشفيات أبولو الرائدة في تشيناي للحالات فائقة التعقيد.'
                : 'Alongside our statewide Kerala presence, we provide specialized extensions into neighboring Tamil Nadu for ultra-complex clinical cases, partnering with Christian Medical College (CMC Vellore) and Apollo Hospitals in Chennai.'}
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 font-display text-base sm:text-lg">
              {locale === 'ar' ? 'الوجهات التخصصية الإضافية:' : 'Extended Specialty Centers:'}
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-sans">
              <li>
                <span className="font-bold text-[#1B4332] block">{locale === 'ar' ? 'CMC فيلور' : 'CMC Vellore'}</span>
                <span>{locale === 'ar' ? 'أفضل مستشفى في الهند لعلاجات الدم والسرطان المعقدة وزراعة النخاع.' : 'Ranked #1 for complex hematology, bone marrow transplant and rare disorders.'}</span>
              </li>
              <li>
                <span className="font-bold text-[#1B4332] block">{locale === 'ar' ? 'أبولو تشيناي' : 'Apollo Chennai'}</span>
                <span>{locale === 'ar' ? 'مركز التميز الطبي الشهير عالمياً بجراحات القلب والروبوت وعلاج الأورام بالبروتونات.' : 'Pioneering cardiac center and advanced proton-beam oncology therapy.'}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
