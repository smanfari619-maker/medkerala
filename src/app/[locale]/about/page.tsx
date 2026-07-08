import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Heart, Compass, ShieldCheck, Award, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import Image from 'next/image';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'من نحن | قصة علاج في كيرلا' : 'About Us | Our Story & Founder | TreatInKerala',
    description: isAr 
      ? 'تعرف على قصة تأسيس علاج في كيرلا على يد سلمان أبو، ورسالتنا لتقديم أفضل رعاية صحية في الهند بدون إرهاق مدخرات المرضى.'
      : 'Read the story of TreatInKerala, founded by Salman Abu to connect patients worldwide with affordable, world-class medical treatments in Kerala.',
    alternates: {
      canonical: isAr ? '/ar/about' : '/en/about',
      languages: {
        en: '/en/about',
        ar: '/ar/about',
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  const values = [
    {
      icon: Heart,
      titleEn: "Patient-First Care",
      titleAr: "المريض أولاً دائماً",
      descEn: "We guide you through the overwhelming parts of medical travel so you can focus entirely on getting better.",
      descAr: "نحمل عنك أعباء السفر والترتيبات الطبية المعقدة لتتفرغ أنت تماماً للشفاء والصحة.",
    },
    {
      icon: ShieldCheck,
      titleEn: "Uncompromised Quality",
      titleAr: "جودة لا مساومة عليها",
      descEn: "We only partner with JCI and NABH accredited hospitals to guarantee the highest safety rates.",
      descAr: "نتعامل حصرياً مع المستشفيات والمنتجعات الطبية المعتمدة دولياً لضمان أعلى معايير السلامة.",
    },
    {
      icon: Compass,
      titleEn: "Absolute Transparency",
      titleAr: "شفافية مطلقة",
      descEn: "No markups, zero hidden fees, and payments are made directly to the hospitals. Coordination is free.",
      descAr: "بدون أي رسوم خفية أو عمولات إضافية. تدفع للمستشفى مباشرة وتنسيقنا مجاني تماماً.",
    },
  ];

  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#D4A96A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
              {isRtl ? 'قصتنا ورسالتنا' : 'Our Story'}
            </span>
            <span className="h-px w-8 bg-[#D4A96A]" />
          </div>
          <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
            {isRtl ? 'الرعاية الصحية حق للجميع بأسعار عادلة' : 'Making World-Class Healthcare Affordable'}
          </h1>
          <p className="text-lg text-text-muted font-sans leading-relaxed">
            {isRtl
              ? 'تأسست علاج في كيرلا لتكون الجسر الموثوق بين المرضى حول العالم وأفضل الرعاية الطبية في الهند.'
              : 'TreatInKerala was built to act as a trustworthy bridge connecting international patients with premium medical institutions.'}
          </p>
        </div>

        {/* Founder Section */}
        <div className="bg-white border border-[#D4A96A]/15 rounded-[2.25rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 mb-20 grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Column: Image / Graphic */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] h-80 lg:h-full min-h-[350px] flex flex-col justify-center items-center p-8 text-center relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-10 bg-radial-gradient from-white to-transparent"></div>
            <Award className="h-20 w-20 text-[#D4A96A] mb-4 relative z-10" />
            <h3 className="text-2xl font-bold font-display relative z-10">Salman Abu</h3>
            <p className="text-[#74B49B] text-xs font-bold uppercase tracking-widest mt-1 relative z-10">
              {isRtl ? 'المؤسس والمدير التنفيذي' : 'Founder & CEO'}
            </p>
          </div>

          {/* Right Column: Founder's Story */}
          <div className="p-8 sm:p-12 lg:col-span-7 space-y-6 text-left rtl:text-right">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                {isRtl ? 'كلمة المؤسس' : 'A Message from the Founder'}
              </span>
            </div>
            
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-3xl sm:text-4xl text-[#1B4332]">
              {isRtl ? 'لماذا أسست علاج في كيرلا؟' : 'Why I Founded TreatInKerala'}
            </h2>
            
            <div className="space-y-4 text-text-muted text-base sm:text-lg font-light leading-relaxed font-sans">
              <p>
                {isRtl
                  ? 'أسس سلمان أبو الشركة بهدف نبيل: مساعدة الجميع وتمكينهم من الحصول على أفضل الخدمات الطبية الممكنة. نؤمن بشدة بأن كل إنسان يستحق الحصول على رعاية صحية وعلاج متفوق دون الحاجة لاستنزاف أو إنفاق مدخرات حياته بالكامل.'
                  : 'Salman Abu founded the company to help and experience everyone to have the best medical services. He strongly believes everyone deserves better treatment without draining their life savings.'}
              </p>
              <p>
                {isRtl
                  ? 'إن السفر لتلقي العلاج في الخارج قد يكون تجربة مرهقة ومقلقة للمرضى وعائلاتهم. لهذا السبب، أنشأنا نظام تنسيق متكامل مجاني يتولى جميع التفاصيل من تأشيرات السفر والإقامة والترجمة والمرافقة الطبية، لنضمن عودتك سالماً معافى.'
                  : 'Traveling abroad for clinical treatments can be a stressful journey for patients and their families. This is why we established a completely complimentary coordination model that handles logistics, accommodations, in-person interpreters, and post-surgery stays—ensuring you focus entirely on healing.'}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-[#2D6A4F] font-bold">
              <span>🤝 {isRtl ? 'ملتزمون بخدمتك بكل أمانة' : 'Committed to your wellness journey'}</span>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A]">
                {isRtl ? 'القيم الأساسية' : 'Core Values'}
              </span>
              <span className="h-px w-8 bg-[#D4A96A]" />
            </div>
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-3xl sm:text-4xl text-[#1B4332]">
              {isRtl ? 'القيم التي توجه عملنا' : 'Values That Drive Us'}
            </h2>
            <p className="text-text-muted text-base">
              {isRtl 
                ? 'ثلاثة مبادئ أساسية نلتزم بها في خدمة كل مريض يثق بنا.' 
                : 'Three fundamental principles we uphold for every patient who trusts us.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white border border-[#D4A96A]/15 rounded-[2.25rem] p-8 shadow-sm hover:border-[#2D6A4F]/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col gap-4 text-left rtl:text-right">
                  <div className="h-12 w-12 rounded-xl bg-[#FAF7F2] text-[#2D6A4F] border border-[#D4A96A]/30 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-text-dark font-display text-lg">
                    {isRtl ? val.titleAr : val.titleEn}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed font-sans font-light">
                    {isRtl ? val.descAr : val.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="mt-20 bg-[#1B4332] text-white border border-[#D4A96A]/15 rounded-[2.25rem] p-8 lg:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-[#2D6A4F]/20 to-transparent -z-10 opacity-70"></div>
          <h3 className="text-2xl sm:text-3xl font-semibold font-display">
            {isRtl ? 'هل تريد التحدث معنا مباشرة؟' : 'Ready to start your path to wellness?'}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
            {isRtl
              ? 'تواصل مع سلمان وفريق المنسقين لدينا للحصول على استشارة ومراجعة تقاريرك الطبية مجاناً وبدون أي التزام.'
              : 'Get in touch with Salman and our coordination desk today. Let us help you organize your treatment safely and affordably.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/get-estimate"
              className="bg-primary-green hover:bg-white hover:text-primary-green text-white font-bold px-8 py-4 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] inline-flex items-center justify-center cursor-pointer font-sans"
            >
              <span>{isRtl ? 'اطلب تقدير تكلفة مجاني' : 'Request Free Clinical Estimate'}</span>
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <MessageCircle className="h-5 w-5 text-white shrink-0" />
              <span>{locale === 'ar' ? 'تواصل معنا مباشرة' : 'Contact Coordinator'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
