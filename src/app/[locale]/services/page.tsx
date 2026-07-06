import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  Plane,
  Building,
  FileSpreadsheet,
  Video,
  Hotel,
  FileCheck,
  Clock,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'الخدمات الطبية والتنسيقية | ميدكيرلا' : 'End-to-End Coordination Services | MedKerala',
    description: locale === 'ar' 
      ? 'تعرف على خدماتنا الشاملة للسياحة العلاجية في كيرلا - استشارات الأطباء، التأشيرات، الاستقبال، الإقامة، المترجم الطبي، وجولات التعافي.'
      : 'Explore our complete medical travel services in Kerala. We arrange hospital bookings, medical visas, airport pickup, accommodation, and translator support.',
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const tServices = await getTranslations({ locale, namespace: 'Services' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const isRtl = locale === 'ar';

  const services = [
    { key: 'hospital', icon: Building },
    { key: 'estimate', icon: FileSpreadsheet },
    { 
      key: 'telehealth', 
      icon: Video, 
      titleEn: 'Pre-Travel Telehealth', 
      titleAr: 'الاستشارة المرئية عن بعد', 
      descEn: 'Connect with your specialist surgeon via direct secure video call before booking flights.', 
      descAr: 'تحدث مع الطبيب الجراح المختص بمكالمة مرئية مباشرة وآمنة قبل تأكيد حجز تذاكر الطيران.' 
    },
    { key: 'visa', icon: FileCheck },
    { key: 'pickup', icon: Plane },
    { key: 'emergency', icon: Clock },
    { key: 'hotel', icon: Hotel },
    { 
      key: 'splitcare', 
      icon: ShieldCheck, 
      titleEn: 'Post-Treatment Split Care', 
      titleAr: 'رعاية المتابعة بعد العودة', 
      descEn: 'Coordinated follow-ups and video check-ups with your treating surgeon once you return home.', 
      descAr: 'تنسيق استشارات المتابعة والفحوصات الدورية المرئية مع طبيبك المعالج بعد عودتك إلى وطنك.' 
    }
  ];

  const comparisonData = [
    { service: locale === 'ar' ? 'البحث عن المستشفى وعقد الموعد' : 'Hospital Search & Appointment Scheduling', included: true },
    { service: locale === 'ar' ? 'الاستقبال من مطار كالكوت والترتيب الجمركي' : 'Airport Pickup & Dropoff (Calicut Airport)', included: true },
    { service: locale === 'ar' ? 'منسق طوارئ خاص متاح 24/7' : 'Dedicated Personal Coordinator (24/7)', included: true },
    { service: locale === 'ar' ? 'ترجمة التقارير الطبية باللغة العربية' : 'Arabic Translation of Medical Records', included: true },
    { service: locale === 'ar' ? 'خطاب دعوة التأشيرة الطبية (المستشفى)' : 'Visa Invitation Letter from Treating Hospital', included: true },
    { service: locale === 'ar' ? 'شريحة اتصال هاتفية محلية (SIM)' : 'Local Indian SIM Card on Arrival', included: true },
    { service: locale === 'ar' ? 'ترتيبات حجز الفندق والشقق المفروشة' : 'Hotel Booking & Accommodation Sourcing', included: true },
    { service: locale === 'ar' ? 'سعر تذاكر الطيران وتأشيرة السفر الفعلية' : 'Flight Ticket Cost & Actual Government Visa Fees', included: false },
    { service: locale === 'ar' ? 'تكاليف الوجبات اليومية والمصاريف الشخصية' : 'Daily Food Charges & Personal Expenses', included: false },
    { service: locale === 'ar' ? 'برامج جولات سياحية ومترجمين مرافقين للتسوق' : 'Add-on Kerala Tour Packages & Companionship Sightseeing', included: false },
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
            {locale === 'ar' ? 'مظلة الرعاية الشاملة' : 'End-to-End Care'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' 
              ? 'الخدمات التي تقدمها ميدكيرلا' 
              : 'Our Complete Medical Tourism Services'}
          </h1>
          <p className="text-lg text-text-muted">
            {locale === 'ar'
              ? 'نتولى كل الجوانب اللوجستية والإدارية لزيارتك العلاجية في كيرلا، لتتمكن من التفرغ التام للشفاء والراحة.'
              : 'From hospital selection to airport reception, accommodation and visa assistance — we coordinate every detail.'}
          </p>
        </div>

        {/* Services Grid (Detail view) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((svc) => {
            const Icon = svc.icon;
            const title = 'titleEn' in svc && svc.titleEn ? (isRtl ? svc.titleAr : svc.titleEn) : tServices(`${svc.key}.title`);
            const desc = 'descEn' in svc && svc.descEn ? (isRtl ? svc.descAr : svc.descEn) : tServices(`${svc.key}.desc`);

            return (
              <div
                key={svc.key}
                className="bg-white rounded-3xl p-8 border border-[#D4A96A]/35 hover:border-primary-green/40 shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary-green/10 flex items-center justify-center mb-6 group-hover:bg-primary-green transition-colors duration-300">
                  <Icon className="h-6 w-6 text-primary-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h2 className="text-xl font-bold text-text-dark mb-3">
                  {title}
                </h2>
                <p className="text-text-muted text-base leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Table comparison Included vs Optional */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'الشفافية في الخدمات: ما الذي تتضمنه التكلفة؟' : 'Transparent Pricing: What is Included?'}
            </h2>
            <p className="text-text-muted text-base mt-2">
              {locale === 'ar'
                ? 'نوضح لك بالتفصيل الخدمات المشمولة في باقاتنا والخدمات الاختيارية الإضافية.'
                : 'Clear distinction between MedKerala core coordination features and optional personal expenditures.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#D4A96A]/40">
            <table className="w-full text-left border-collapse" dir={isRtl ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-primary-dark text-white font-medium text-base sm:text-lg border-b border-accent-gold/25">
                  <th className="py-4 px-6 font-display">{locale === 'ar' ? 'الخدمة / المرفق' : 'Service / Benefit'}</th>
                  <th className="py-4 px-6 text-center font-display w-36">{locale === 'ar' ? 'الحالة' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base sm:text-lg text-text-muted">
                {comparisonData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-text-dark font-medium">{item.service}</td>
                    <td className="py-4 px-6 text-center">
                      {item.included ? (
                        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>{locale === 'ar' ? 'مشمول' : 'Included'}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 bg-[#FAF7F2] text-[#D4A96A] px-3 py-1 rounded-full text-xs font-bold border border-[#D4A96A]/30">
                          <HelpCircle className="h-3.5 w-3.5" />
                          <span>{locale === 'ar' ? 'إضافي / اختياري' : 'Optional Add-on'}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compressed Financial Transparency Policy */}
        <div className="max-w-4xl mx-auto mb-20 bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A96A]/35 shadow-lg text-center space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold font-display text-primary-dark">
            {locale === 'ar' ? 'نموذج العمل والشفافية المالية' : '100% Transparent Financial Policy'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {[
              {
                emoji: '✓',
                titleEn: 'Zero Fees for Patients',
                titleAr: 'خدمة مجانية بالكامل',
                descEn: 'MedKerala coordination, translator, and airport pickup are 100% free with no registration costs.',
                descAr: 'تنسيق ميدكيرلا والمترجم والاستقبال من المطار مجانية بالكامل دون أي رسوم تسجيل.'
              },
              {
                emoji: '💡',
                titleEn: 'Direct Hospital Billing',
                titleAr: 'الدفع المباشر للمستشفى',
                descEn: 'You pay official hospital tariffs directly at admission. We add zero markups or intermediary fees.',
                descAr: 'تدفع تسعيرة المستشفى الرسمية مباشرة عند الدخول. لا نضيف أي هوامش ربح أو رسوم وساطة.'
              },
              {
                emoji: '🛡️',
                titleEn: 'Hospital Funded',
                titleAr: 'تمويل مستشفيات مباشر',
                descEn: 'Our support network is funded directly by accredited hospitals out of international marketing budgets.',
                descAr: 'يتم تمويل شبكة دعمنا مباشرة من قبل المستشفيات المعتمدة من ميزانيات التسويق الدولي الخاصة بها.'
              }
            ].map(({ emoji, titleEn, titleAr, descEn, descAr }) => (
              <div key={titleEn} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D4A96A]/30 space-y-2 text-left rtl:text-right">
                <div className="text-lg font-bold text-primary-green flex items-center gap-2">
                  <span>{emoji}</span>
                  <span className="font-display text-base font-bold text-primary-dark">{locale === 'ar' ? titleAr : titleEn}</span>
                </div>
                <p className="text-text-muted text-xs leading-relaxed font-sans">
                  {locale === 'ar' ? descAr : descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-primary-dark text-white rounded-3xl p-8 lg:p-12 border border-accent-gold/20 text-center space-y-6 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-[#2D6A4F]/20 to-transparent -z-10 opacity-70"></div>
          <h3 className="text-2xl sm:text-3xl font-semibold font-display">
            {locale === 'ar' ? 'احصل على باقة خدمات مخصصة لرحلتك' : 'Request Customized Care Package'}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'هل تسافر بمفردك أو بصحبة مرافق؟ دعنا ننسق السكن المناسب وترتيبات العلاج وفق رغبتك.'
              : 'Our coordinators design packages suited for single patients, families, or companions. Get in touch today.'}
          </p>
          <div className="pt-2">
            <Link
              href="/get-estimate"
              className="bg-primary-green hover:bg-white text-white hover:text-primary-green font-bold px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{tCommon('getEstimate')}</span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
