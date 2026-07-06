import React from 'react';
import { FileText, ShieldAlert, Award, PlaneTakeoff, Info, Landmark } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'شروط الخدمة | علاج في كيرلا' : 'Terms of Service | TreatInKerala',
    description: locale === 'ar' 
      ? 'اقرأ شروط وأحكام استخدام موقع علاج في كيرلا ودورنا كمنسقين للخدمات الطبية واللوجستية.'
      : 'Read TreatInKerala\'s terms of service defining our medical coordination, concierge, and patient support parameters.',
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  const content = isRtl ? {
    title: 'شروط الخدمة',
    subtitle: 'آخر تحديث: يونيو ٢٠٢٦',
    intro: 'يرجى قراءة شروط الخدمة هذه بعناية. باستخدامك لموقع علاج في كيرلا وطلب تقدير التكلفة، فإنك توافق على الالتزام بهذه الشروط والأحكام.',
    sections: [
      {
        title: '١. دور علاج في كيرلا كمنسق طبي',
        icon: Award,
        text: 'علاج في كيرلا هي شركة تنسيق وخدمات لوجستية (كونسيرج) لتسهيل السياحة العلاجية في كيرلا، الهند. نحن لسنا جهة طبية ولا نقدم استشارات طبية أو تشخيصات أو علاجات سريرية بأنفسنا. جميع الإجراءات الطبية يتم توفيرها وإدارتها من قبل المستشفيات والجهات المرخصة الشريكة.'
      },
      {
        title: '٢. دقة تقديرات التكلفة والأسعار',
        icon: Info,
        text: 'التقديرات والأسعار المعروضة على الموقع أو المرسلة كتقدير أولي هي تكاليف استرشادية مبنية على الحالات القياسية ومتوسط الأسعار لدى المستشفيات. التكلفة النهائية والبروتوكول العلاجي يتم تحديدهما واعتمادهما من قبل الأطباء المعالجين في المستشفى بعد وصول المريض وإجراء الفحوصات اللازمة.'
      },
      {
        title: '٣. الدفع والتعامل المالي الشفاف',
        icon: Landmark,
        text: 'يلتزم المريض بدفع تكاليف العلاج الطبي وغرفة الإقامة مباشرة إلى المستشفى المعالج وفقاً لسياسات الدفع الخاصة بهم وبدون أي رسوم خفية أو إضافية من علاج في كيرلا. خدمات التنسيق الأساسية التي نقدمها (الاستقبال، المترجم، خطاب التأشيرة) مجانية أو مشمولة في الباقات المحددة صراحة.'
      },
      {
        title: '٤. الخدمات اللوجستية والسفر',
        icon: PlaneTakeoff,
        text: 'تسهل علاج في كيرلا خدمات حجز السكن الخارجي والنقل المحلي بناءً على تفضيلاتك. نحن نختار شركاء ذوي موثوقية عالية، إلا أننا لا نتحمل المسؤولية القانونية عن أي تأخير في الرحلات الجوية أو مشاكل تتعلق بإصدار التأشيرات أو ظروف خارجة عن إرادتنا.'
      },
      {
        title: '٥. المسؤولية القانونية',
        icon: ShieldAlert,
        text: 'القرارات المتعلقة بنوع العلاج واختيار المستشفى والأطباء هي مسؤولية المريض بالكامل. لا تتحمل علاج في كيرلا المسؤولية عن أي مضاعفات طبية أو نتائج علاجية أو خلافات تنشأ بين المريض والمستشفى المعالج.'
      }
    ],
    footer: 'لأي استفسارات قانونية أو توضيحات إضافية حول شروط الخدمة، يرجى التواصل معنا.'
  } : {
    title: 'Terms of Service',
    subtitle: 'Last Updated: June 2026',
    intro: 'Please read these Terms of Service carefully. By using the TreatInKerala website, submitting an estimate request, or engaging our concierge services, you agree to comply with and be bound by the following terms.',
    sections: [
      {
        title: '1. TreatInKerala as a Facilitator',
        icon: Award,
        text: 'TreatInKerala is a medical tourism facilitator and logistics concierge company. We are NOT healthcare providers, and we do not provide clinical diagnoses, treatments, or medical advice. All medical procedures and care are provided independently by our licensed partner hospitals and clinics in Kerala.'
      },
      {
        title: '2. Cost Estimates & Financial Disclaimers',
        icon: Info,
        text: 'All pricing ranges and estimates displayed on the website or shared via preliminary quotes are indicative and standard-use calculations. The exact final pricing is determined exclusively by the treating hospital, specialists, and surgical teams after clinical examination and in-person diagnostics.'
      },
      {
        title: '3. Direct Hospital Payments',
        icon: Landmark,
        text: 'Patients pay all clinical and hospital room bills directly to the treating hospital. TreatInKerala does not charge hidden markups or clinical commission fees to the patient. Basic coordination services (airport transfers, translation, invitation letters) are complimentary unless explicitly stated otherwise.'
      },
      {
        title: '4. Travel, Accommodation, & Visas',
        icon: PlaneTakeoff,
        text: 'TreatInKerala assists patients with local accommodation selection, visa invitation letters, and airport transfers. While we select reliable local hospitality partners, TreatInKerala is not legally responsible for visa delays, flight issues, or guest-house operational disputes.'
      },
      {
        title: '5. Limitation of Clinical Liability',
        icon: ShieldAlert,
        text: 'All decisions regarding medical treatment, surgery choices, and doctor selections are the sole responsibility of the patient. TreatInKerala holds no liability for surgical outcomes, clinical complications, or treatment disputes that may arise between the patient and the hospital.'
      }
    ],
    footer: 'For any legal inquiries or clarifications regarding these terms, please contact our support team.'
  };

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-primary-green/10 flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8 text-primary-green" />
          </div>
          <h1 className="text-4xl font-semibold font-display text-primary-dark tracking-tight">
            {content.title}
          </h1>
          <p className="text-sm font-semibold text-[#D4A96A] tracking-wider uppercase">
            {content.subtitle}
          </p>
          <p className="text-text-muted max-w-2xl mx-auto text-base leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/* Content Cards */}
        <div className="bg-white rounded-3xl border border-[#D4A96A]/35 shadow-xl p-8 sm:p-10 space-y-8">
          {content.sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="flex gap-4 items-start pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-xl bg-primary-green/10 flex items-center justify-center shrink-0 mt-1">
                  <Icon className="h-5 w-5 text-primary-green" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-primary-dark">{sec.title}</h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">{sec.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-text-muted">
          <p>{content.footer} — <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary-green font-semibold hover:underline">{SITE_CONFIG.email}</a></p>
        </div>

      </div>
    </div>
  );
}
