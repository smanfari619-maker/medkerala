import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Award, Compass, PhoneCall, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'لماذا العلاج في كيرلا؟ | ميدكيرلا' : 'Why Choose Kerala for Treatment | MedKerala',
    description: locale === 'ar' 
      ? 'اكتشف مزايا السياحة العلاجية في كيرلا - مستشفيات ذات معايير عالمية، أطباء متميزين، وتوفير 60-80% في التكاليف الطبية.'
      : 'Learn why Kerala is a top destination for medical care. World-class hospital facilities, foreign-trained doctors, and massive cost savings.',
  };
}

export default async function WhyKeralaPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const isRtl = locale === 'ar';

  const stats = [
    { label: isRtl ? 'اعتمادات المستشفيات' : 'Accredited Hospitals', value: '100+', desc: isRtl ? 'مستشفيات كبرى حاصلة على اعتمادات NABH و JCI' : 'NABH & JCI approved partner networks' },
    { label: isRtl ? 'أطباء مؤهلين بالخارج' : 'Specialist Doctors', value: '2,500+', desc: isRtl ? 'استشاريين وجراحين تدربوا في بريطانيا وأمريكا' : 'Specialists with foreign clinical experience' },
    { label: isRtl ? 'نسبة الوفورات الطبية' : 'Average Savings', value: '60% - 80%', desc: isRtl ? 'توفير حقيقي مقارنة بتكاليف دبي ولندن وأمريكا' : 'Compared to US, UK, and GCC private hospitals' },
    { label: isRtl ? 'مرضى دوليون سنوياً' : 'Annual Patients', value: '15,000+', desc: isRtl ? 'يسافرون إلى كيرلا للحصول على العلاج الطازج والأيورفيدا' : 'International medical tourists served' },
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
            {locale === 'ar' ? 'الرعاية الصحية الأفضل تكلفة' : 'The Healthcare Capital'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' ? 'لماذا يختار المرضى جنوب الهند (كيرلا وتاميل نادو) للعلاج؟' : 'Why Choose South India (Kerala & Tamil Nadu) for Treatment?'}
          </h1>
          <p className="text-lg text-text-muted">
            {locale === 'ar'
              ? 'يجمع جنوب الهند (كيرلا وتاميل نادو) بين المستشفيات الحاصلة على اعتمادات JCI/NABH، والأطباء والعلماء الطبيين المتميزين، والتعافي الهادئ للأيورفيدا، بأقل من ربع تكاليف العلاج في دول الغرب والخليج.'
              : 'South India (Kerala & Tamil Nadu) combines world-class JCI/NABH accredited hospital facilities, highly qualified specialists, and serene Ayurvedic rejuvenation settings at a fraction of Western costs.'}
          </p>
        </div>

        {/* Stats Listing - Compact Strip */}
        <div className="bg-white border border-[#D4A96A]/20 rounded-3xl p-6 sm:p-8 mb-16 shadow-[0_20px_50px_rgba(212,169,106,0.1)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100 rtl:divide-x-reverse">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1.5 pt-4 first:pt-0 lg:pt-0">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-primary-green block">
                  {stat.value}
                </span>
                <h3 className="text-sm font-bold text-text-dark font-sans">{stat.label}</h3>
                <p className="text-[13px] text-text-muted max-w-[200px] mx-auto leading-relaxed font-sans">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Savings Chart Visual */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D4A96A]/20 shadow-[0_30px_60px_rgba(212,169,106,0.12)] mb-20 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'مقارنة وفورات الجراحة المتوسطة (بالدولار)' : 'Average Surgery Cost Comparison (USD)'}
            </h2>
            <p className="text-text-muted text-base mt-2 font-sans">
              {locale === 'ar'
                ? 'تكلفة نموذجية لعمليات جراحية رئيسية (مثل استبدال المفاصل أو القلب).'
                : 'Representative cost for major cardiovascular or orthopedic surgeries.'}
            </p>
          </div>

          <div className="space-y-6 pt-4 font-sans">
            {/* Kerala Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-sm text-primary-green">
                <span>{locale === 'ar' ? 'كيرلا، الهند (ميدكيرلا)' : 'Kerala, India (MedKerala)'}</span>
                <span className="font-display font-extrabold text-base">$4,700</span>
              </div>
              <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-primary-green to-[#25D366] h-full rounded-full transition-all duration-1000 w-[10%] shadow-[0_0_10px_rgba(37,211,102,0.3)]"></div>
              </div>
            </div>

            {/* UAE Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-sm text-text-dark">
                <span>{locale === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</span>
                <span className="font-display font-extrabold text-base">$18,000</span>
              </div>
              <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] h-full rounded-full transition-all duration-1000 w-[38%]"></div>
              </div>
            </div>

            {/* UK Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-sm text-text-dark">
                <span>{locale === 'ar' ? 'المملكة المتحدة (خاص)' : 'United Kingdom (Private)'}</span>
                <span className="font-display font-extrabold text-base">$26,000</span>
              </div>
              <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] h-full rounded-full transition-all duration-1000 w-[55%]"></div>
              </div>
            </div>

            {/* USA Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-sm text-text-dark">
                <span>{locale === 'ar' ? 'الولايات المتحدة الأمريكية' : 'United States'}</span>
                <span className="font-display font-extrabold text-base">$48,000</span>
              </div>
              <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-[#D4A96A] to-[#E3C293] h-full rounded-full transition-all duration-1000 w-[95%]"></div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-text-muted border-t border-slate-100 pt-6 font-sans">
            {locale === 'ar'
              ? '* تشمل التكاليف التقديرية الإقامة والمتابعة الطبية والتنسيق.'
              : '* Costs represented are averages across orthopedic and cardiac specialties.'}
          </div>
        </div>

        {/* Calicut highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
              {locale === 'ar' ? 'الوجهة المفضلّة: كالكوت' : 'Calicut: Our Primary Base'}
            </span>
            <h2 className="text-3xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'كوزيكود (كالكوت) — عاصمة الرعاية والضيافة كيرلا' : 'Calicut (Kozhikode) — The Gateway to Healing'}
            </h2>
            <p className="text-text-muted text-base leading-relaxed">
              {locale === 'ar'
                ? 'تعتبر مدينة كالكوت الساحلية قاعدة رئيسية لميدكيرلا. وتتميز بمطار دولي حديث، وتعد موطناً لأبرز المستشفيات التخصصية الفائزة بجوائز الرعاية الصحية في الهند. وتتمتع المدينة بأجواء طبيعية هادئة ومأكولات بحرية صحية وشطآن هادئة مثالية للنقاهة والتعافي بعد الجراحة.'
                : 'Calicut (Kozhikode) represents a pristine beachside city in Kerala that avoids the metropolitan noise of larger cities while housing the highest density of accredited hospitals. It features a modern international airport (CCJ) connected directly to major GCC hubs and is famous worldwide for organic spices, delicious local cuisine, and historical hospitality.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2 text-text-dark font-semibold">
                <Compass className="h-5 w-5 text-primary-green shrink-0" />
                <span>{locale === 'ar' ? '20 دقيقة من مطار كالكوت' : '20-min airport drive'}</span>
              </div>
              <div className="flex items-center gap-2 text-text-dark font-semibold">
                <Award className="h-5 w-5 text-primary-green shrink-0" />
                <span>{locale === 'ar' ? '3 مستشفيات كبرى معتمدة' : '3 major super-specialities'}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#112F24] via-[#1B4332] to-[#245842] text-white rounded-3xl p-8 lg:p-12 border border-[#D4A96A]/35 text-center space-y-6 shadow-[0_20px_50px_rgba(45,106,79,0.25)] relative overflow-hidden">
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white">
              {locale === 'ar' ? 'تحدث مع منسق طبي خبير اليوم' : 'Consult our coordinators'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-sm mx-auto font-sans">
              {locale === 'ar'
                ? 'نحن هنا لإجابة جميع استفساراتك وتوفير خطة أسعار دقيقة ومجانية تماماً.'
                : 'Send your reports or outline your conditions. We reply within 24 hours with exact options.'}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3.5 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px] flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <MessageCircle className="h-4.5 w-4.5 text-white" />
                <span>{locale === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Coordinator'}</span>
              </a>
              <Link
                href="/get-estimate"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <span>{tCommon('getEstimate')}</span>
                <PhoneCall className="h-4.5 w-4.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tamil Nadu extension block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white border border-[#D4A96A]/20 p-8 sm:p-12 rounded-3xl shadow-xs">
          <div className="space-y-6 order-last lg:order-first">
            <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
              {locale === 'ar' ? 'التوسع الجغرافي: تاميل نادو' : 'Regional Extension: Tamil Nadu'}
            </span>
            <h2 className="text-3xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'شراكات النخبة في تشيناي وفيلور' : 'Elite Partnerships in Chennai & Vellore'}
            </h2>
            <p className="text-text-muted text-base leading-relaxed">
              {locale === 'ar'
                ? 'لتوفير أوسع خيارات الرعاية الممكنة، قمنا بتوسيع شبكتنا لتشمل كبار عمالقة الطب في تاميل نادو المجاورة، مثل مستشفى كلية الطب المسيحية المرموقة (CMC Vellore) ومستشفيات أبولو الرائدة في تشيناي. هذا يضمن لمرضانا الوصول الفوري لأشهر الجراحين والعلماء في مجالات علاج الدم والأورام والسرطان والعمود الفقري المعقد.'
                : 'To offer the widest scope of specialized care, we have expanded our network to include the medical giants of neighboring Tamil Nadu. Through our partnerships with Christian Medical College (CMC Vellore) and Apollo Hospitals in Chennai, patients can access world-renowned hematology, proton oncology, and complex neurological treatments.'}
            </p>
          </div>
          <div className="bg-[#FAF7F2] p-8 rounded-2xl border border-[#D4A96A]/15 space-y-4">
            <h4 className="font-bold text-text-dark font-display text-lg">
              {locale === 'ar' ? 'الوجهات الطبية المضافة:' : 'Added Medical Hubs:'}
            </h4>
            <ul className="space-y-3.5 text-sm text-text-muted font-sans">
              <li>
                <span className="font-bold text-primary-dark block">{locale === 'ar' ? 'CMC فيلور' : 'CMC Vellore'}</span>
                <span>{locale === 'ar' ? 'أفضل مستشفى في الهند لعلاجات الدم والسرطان المعقدة وزراعة النخاع.' : 'Ranked #1 for complex hematology, bone marrow transplant and pediatrics.'}</span>
              </li>
              <li>
                <span className="font-bold text-primary-dark block">{locale === 'ar' ? 'أبولو تشيناي' : 'Apollo Chennai'}</span>
                <span>{locale === 'ar' ? 'مركز التميز الطبي الشهير عالمياً بجراحات القلب والروبوت وعلاج الأورام بالبروتونات.' : 'World-famous flagship hospital for pioneering cardiac and proton-therapy cancer care.'}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
