import React from 'react';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import {
  Leaf,
  Heart,
  Droplets,
  Wind,
  Sun,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Clock,
  Shield,
  Sparkles,
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar'
      ? 'علاج الأيورفيدا في كيرلا | بانشاكارما وشيروداهارا | TreatInKerala'
      : 'Ayurveda Treatment in Kerala | Panchakarma & Shirodhara | TreatInKerala',
    description: locale === 'ar'
      ? 'اكتشف قوة طب الأيورفيدا الأصيل في كيرلا. برامج بانشاكارما، شيروداهارا، وعلاجات التطهير والتجديد في أفضل المراكز الأيورفيدية في كالكوت وكيرلا.'
      : 'Discover authentic Ayurveda healing in Kerala — Panchakarma detox, Shirodhara, herbal therapies and holistic wellness programmes coordinated by TreatInKerala from Calicut.',
  };
}

const treatments = [
  {
    icon: Droplets,
    en: { name: 'Panchakarma', tagline: 'The Ultimate Detox', desc: 'A 7–28 day comprehensive detoxification programme that eliminates deep-rooted toxins, restores dosha balance and rejuvenates the entire system. Ideal for chronic conditions and complete body reset.' },
    ar: { name: 'بانشاكارما', tagline: 'برنامج التطهير الشامل', desc: 'برنامج تطهير شامل لمدة 7 إلى 28 يوماً يزيل السموم العميقة ويستعيد التوازن الكامل للجسم. مثالي للحالات المزمنة وإعادة تنشيط الجسم بالكامل.' },
    duration: '7–28 days',
    cost: 'From $800',
  },
  {
    icon: Wind,
    en: { name: 'Shirodhara', tagline: 'Mind & Stress Therapy', desc: 'A continuous stream of warm medicated oil is gently poured on the forehead in a steady rhythmic flow. Profoundly relaxes the nervous system and treats insomnia, anxiety and migraines.' },
    ar: { name: 'شيروداهارا', tagline: 'علاج التوتر والعقل', desc: 'تدفق مستمر من الزيت الدافئ المُعطّر على الجبهة بإيقاع منتظم. يريح الجهاز العصبي ويعالج الأرق والقلق والصداع النصفي.' },
    duration: '45–60 min/session',
    cost: 'From $40/session',
  },
  {
    icon: Sun,
    en: { name: 'Abhyanga', tagline: 'Full Body Oil Massage', desc: 'A synchronised full-body herbal oil massage performed by two therapists. Nourishes skin, improves blood circulation, calms the nervous system and is traditionally done daily during Panchakarma.' },
    ar: { name: 'أبهيانغا', tagline: 'تدليك الجسم الكامل بالزيوت', desc: 'تدليك متزامن لكامل الجسم بالزيوت العشبية يُنفَّذ من قِبل معالجَين. يغذي البشرة، يحسّن الدورة الدموية، ويهدئ الجهاز العصبي.' },
    duration: '60–90 min',
    cost: 'From $30/session',
  },
  {
    icon: Leaf,
    en: { name: 'Kizhi (Elakizhi)', tagline: 'Herbal Poultice Therapy', desc: 'Medicated herbal leaves or powders are tied in muslin boluses and applied over the body after dipping in warm herbal oil. Highly effective for arthritis, joint pain and musculoskeletal disorders.' },
    ar: { name: 'كيزي (إيلاكيزي)', tagline: 'العلاج بكمادات الأعشاب', desc: 'أوراق وأعشاب طبية مُحكمة في كمادات قماشية تُطبَّق على الجسم بعد تدفئتها بزيت عشبي. فعّالة جداً للمفاصل والتهاب المفاصل والاضطرابات العضلية الهيكلية.' },
    duration: '45–60 min',
    cost: 'From $35/session',
  },
  {
    icon: Heart,
    en: { name: 'Njavarakizhi', tagline: 'Medicated Rice Therapy', desc: 'A unique Kerala treatment using boluses of cooked Njavara rice dipped in medicated milk and herbal decoction. Excellent for neurological conditions, muscular weakness and post-stroke rehabilitation.' },
    ar: { name: 'نجاواراكيزي', tagline: 'علاج الأرز الطبي', desc: 'علاج كيرلي فريد باستخدام كمادات من أرز نجاوارا المطبوخ مغمورة في حليب طبي ومنقوع أعشاب. ممتاز للحالات العصبية وضعف العضلات وإعادة التأهيل بعد السكتة الدماغية.' },
    duration: '60–90 min',
    cost: 'From $45/session',
  },
  {
    icon: Sparkles,
    en: { name: 'Rasayana (Rejuvenation)', tagline: 'Anti-Ageing & Vitality', desc: 'A holistic anti-ageing programme combining diet, herbal supplements, lifestyle changes and specific therapies to revitalise the body, improve immunity and slow cellular ageing.' },
    ar: { name: 'راساياناً (الشباب الدائم)', tagline: 'مكافحة الشيخوخة والحيوية', desc: 'برنامج شامل لمكافحة الشيخوخة يجمع بين النظام الغذائي والمكملات العشبية وتغييرات نمط الحياة والعلاجات المحددة لتنشيط الجسم وتحسين المناعة.' },
    duration: '14–21 days',
    cost: 'From $1,200',
  },
];


const conditions = [
  { en: 'Chronic Back & Joint Pain', ar: 'آلام الظهر والمفاصل المزمنة' },
  { en: 'Arthritis & Spondylitis', ar: 'التهاب المفاصل والفقرات' },
  { en: 'Stress, Anxiety & Insomnia', ar: 'التوتر، القلق والأرق' },
  { en: 'Skin Disorders (Psoriasis, Eczema)', ar: 'أمراض الجلد (الصدفية، الإكزيما)' },
  { en: 'Neurological Conditions', ar: 'الاضطرابات العصبية' },
  { en: 'Obesity & Metabolic Disorders', ar: 'السمنة واضطرابات الأيض' },
];

export default async function AyurvedaPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  return (
    <div className="flex flex-col w-full overflow-x-hidden pt-24 bg-[#FAF7F2]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-[#D4A96A]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                {isRtl ? 'الطب الأيورفيدي الأصيل — كيرلا' : 'Authentic Ayurveda — Kerala'}
              </span>
              <span className="h-px w-8 bg-[#D4A96A]" />
            </div>
            <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
              {isRtl
                ? 'الشفاء العميق بقوة طب الأيورفيدا في كيرلا'
                : 'Heal Deeply with Kerala\'s Ancient Ayurveda Wisdom'}
            </h1>
            <p className="text-lg text-text-muted font-sans">
              {isRtl
                ? 'كيرلا هي مهد طب الأيورفيدا الأصيل. أكثر من 5,000 سنة من الحكمة الطبية مُدمجة في برامج علاج حديثة تحت إشراف أطباء أيورفيديين معتمدين.'
                : 'Kerala is the birthplace of authentic Ayurveda. Over 5,000 years of medical wisdom integrated into modern healing programmes — supervised by certified Ayurvedic physicians.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link
                href="/get-estimate"
                className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>{isRtl ? 'احصل على برنامجك المخصص' : 'Get Your Custom Programme'}</span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="bg-white border border-[#D4A96A]/15 rounded-[2.25rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(212,169,106,0.06)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100 rtl:divide-x-reverse">
              {[
                { val: '5,000+', label: isRtl ? 'سنة من الحكمة الطبية' : 'Years of Medical Wisdom' },
                { val: '200+', label: isRtl ? 'مركز أيورفيدي معتمد' : 'Certified Ayurveda Centres' },
                { val: '60%', label: isRtl ? 'توفير مقارنة بالغرب' : 'Savings vs Western Costs' },
                { val: '24/7', label: isRtl ? 'دعم منسق مرافق' : 'Coordinator Support' },
              ].map((stat) => (
                <div key={stat.val} className="space-y-1.5 pt-4 first:pt-0 lg:pt-0">
                  <span className="text-3xl sm:text-4xl font-extrabold font-display text-primary-green block">
                    {stat.val}
                  </span>
                  <h3 className="text-sm font-bold text-text-dark font-sans">{stat.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── KEY TREATMENTS ───────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#D4A96A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                {isRtl ? 'العلاجات الأيورفيدية الرئيسية' : 'Core Ayurvedic Treatments'}
              </span>
              <span className="h-px w-8 bg-[#D4A96A]" />
            </div>
            <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-3xl sm:text-4xl text-[#1B4332] mb-4">
              {isRtl ? 'علاجات كيرلا الأيورفيدية الأصيلة' : 'Authentic Kerala Ayurveda Therapies'}
            </h2>
            <p className="text-text-muted text-lg">
              {isRtl
                ? 'كل علاج يُصمَّم خصيصاً لحالتك بعد استشارة طبيب أيورفيدي معتمد.'
                : 'Every therapy is personalised after an in-depth consultation with a certified Ayurvedic physician.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((t) => {
              const content = isRtl ? t.ar : t.en;
              return (
                <div
                  key={t.en.name}
                  className="bg-white border border-[#D4A96A]/15 rounded-[2.25rem] p-8 hover:border-[#2D6A4F]/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col"
                >
                  <div className="h-12 w-12 rounded-2xl bg-[#2D6A4F]/10 flex items-center justify-center mb-5 group-hover:bg-[#2D6A4F] transition-colors duration-300">
                    <t.icon className="h-6 w-6 text-[#2D6A4F] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[#D4A96A] font-bold text-xs uppercase tracking-widest mb-1">
                    {content.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-text-dark mb-3">{content.name}</h3>
                  <p className="text-text-muted text-base leading-relaxed flex-grow">{content.desc}</p>
                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-text-muted font-medium">
                      <Clock className="h-4 w-4 text-[#2D6A4F]" />
                      {t.duration}
                    </span>
                    <span className="font-bold text-[#2D6A4F]">{t.cost}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS TREATED ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3 rtl:flex-row-reverse rtl:justify-end">
                <span className="h-px w-8 bg-[#D4A96A]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
                  {isRtl ? 'الحالات التي يعالجها الأيورفيدا' : 'Conditions Treated'}
                </span>
              </div>
              <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-3xl sm:text-4xl text-[#1B4332] mb-6">
                {isRtl ? 'ما الذي يمكن للأيورفيدا علاجه؟' : 'What Can Ayurveda Treat?'}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {isRtl
                  ? 'الأيورفيدا فعّال في علاج مجموعة واسعة من الحالات الصحية المزمنة والمتكررة، وكذلك للوقاية وتحسين جودة الحياة.'
                  : 'Ayurveda is highly effective for a broad range of chronic and recurring health conditions, as well as preventive wellness and quality-of-life enhancement.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conditions.map((c) => (
                  <div key={c.en} className="flex items-center gap-3 bg-white border border-[#D4A96A]/15 rounded-[2rem] px-4 py-3 hover:border-[#2D6A4F]/25 hover:shadow-xs transition-all duration-300">
                    <CheckCircle className="h-4.5 w-4.5 text-[#2D6A4F] shrink-0" />
                    <span className="text-text-dark font-medium text-sm">{isRtl ? c.ar : c.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Kerala box */}
            <div className="bg-[#1B4332] text-white border border-[#D4A96A]/15 rounded-[2.25rem] p-8 sm:p-10 space-y-6 shadow-lg">
              <h3 className="text-2xl font-bold font-display">
                {isRtl ? 'لماذا كيرلا تحديداً للأيورفيدا؟' : 'Why Kerala Specifically for Ayurveda?'}
              </h3>
              {[
                {
                  en: 'Monsoon season (June–Nov) is the ideal time for Ayurveda — the body absorbs oils better in humid conditions.',
                  ar: 'موسم الأمطار (يونيو–نوفمبر) هو الوقت المثالي للأيورفيدا — الجسم يمتص الزيوت بشكل أفضل في الرطوبة العالية.',
                },
                {
                  en: '800+ species of medicinal plants grow wild in Kerala\'s forests — ingredients sourced fresh, not imported.',
                  ar: 'أكثر من 800 نوع من النباتات الطبية تنمو بشكل طبيعي في غابات كيرلا — مكونات طازجة وليست مستوردة.',
                },
                {
                  en: 'Hereditary Vaidya (physician) families have practised classical treatments for generations without interruption.',
                  ar: 'عائلات الفيدية الطبية المتوارثة مارست العلاجات الكلاسيكية لأجيال متتالية دون انقطاع.',
                },
                {
                  en: 'Kerala government certifies Ayurveda centres — quality and authenticity are regulated and verified.',
                  ar: 'حكومة كيرلا تُعتمد مراكز الأيورفيدا — الجودة والأصالة مُنظَّمة ومُتحقَّق منها رسمياً.',
                },
              ].map((pt) => (
                <div key={pt.en} className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#D4A96A] shrink-0 mt-0.5" />
                  <p className="text-white/85 text-base leading-relaxed">{isRtl ? pt.ar : pt.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <section className="bg-[#1B4332] border-t border-[#D4A96A]/20 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#D4A96A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
              {isRtl ? 'ابدأ رحلة شفائك' : 'Start Your Healing Journey'}
            </span>
            <span className="h-px w-8 bg-[#D4A96A]" />
          </div>
          <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-white">
            {isRtl
              ? 'دعنا نُصمم برنامجك الأيورفيدي الشخصي'
              : 'Let Us Design Your Personal Ayurveda Programme'}
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            {isRtl
              ? 'أخبرنا عن حالتك وسيتواصل معك منسقنا الطبي خلال 24 ساعة بخطة علاج مخصصة وتكاليف دقيقة.'
              : 'Tell us about your condition and our medical coordinator will contact you within 24 hours with a personalised treatment plan and accurate cost estimate.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/get-estimate"
              className="bg-[#D4A96A] hover:bg-[#c49355] text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>{isRtl ? 'احصل على تقدير مجاني' : 'Get Free Estimate'}</span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span>{isRtl ? 'واتساب الآن' : 'WhatsApp Now'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
