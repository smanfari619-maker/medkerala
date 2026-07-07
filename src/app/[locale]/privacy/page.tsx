import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'سياسة الخصوصية | علاج في كيرلا' : 'Privacy Policy | TreatInKerala',
    description: isAr 
      ? 'تعرف على سياسة الخصوصية الخاصة بعلاج في كيرلا وكيفية حماية بياناتك الطبية والشخصية وسريتها.'
      : 'Review TreatInKerala\'s privacy policy to understand how we protect and manage your personal details and medical records.',
    alternates: {
      canonical: isAr ? '/ar/privacy' : '/en/privacy',
      languages: {
        en: '/en/privacy',
        ar: '/ar/privacy',
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  const content = isRtl ? {
    title: 'سياسة الخصوصية',
    subtitle: 'آخر تحديث: يونيو ٢٠٢٦',
    intro: 'في علاج في كيرلا، نلتزم بحماية خصوصيتك وسرية بياناتك الطبية والشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام نموذج التقدير والخدمات التابعة لنا.',
    sections: [
      {
        title: '١. المعلومات التي نجمعها',
        icon: FileText,
        text: 'نقوم بجمع المعلومات الحيوية لتقديم تقدير دقيق لتكلفة العلاج والترتيب لرحلتك، مثل: الاسم الكامل، الدولة، العمر، الجنس، رقم واتساب، البريد الإلكتروني، والتقارير الطبية/الأشعة التي تشاركها معنا.'
      },
      {
        title: '٢. كيف نستخدم معلوماتك',
        icon: Eye,
        text: 'تُستخدم معلوماتك الشخصية والطبية حصراً لتزويدك بتقديرات تكاليف علاج دقيقة، واستشارة أطباء المستشفيات الشريكة، وتسهيل حجز الإقامة والنقل، وخدمات المترجم الطبي.'
      },
      {
        title: '٣. سرية البيانات وأمنها',
        icon: Lock,
        text: 'بياناتك الطبية والشخصية مشفرة وآمنة تماماً. لن نقوم أبداً ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تجارية. تتم مشاركتها فقط مع المستشفيات والجهات الطبية المعتمدة التي تختارها لعلاجك.'
      },
      {
        title: '٤. الامتثال للأنظمة والخصوصية الدولية',
        icon: ShieldCheck,
        text: 'نتخذ الإجراءات اللازمة للامتثال لقوانين حماية البيانات بما فيها قانون حماية البيانات الشخصية الرقمية (DPDP) لعام 2023 في الهند والمبادئ التوجيهية العامة لحماية البيانات (GDPR) للمرضى القادمين من أوروبا والشرق الأوسط.'
      },
      {
        title: '٥. التواصل والتحكم',
        icon: Globe,
        text: `بتقديمك لبياناتك، فإنك توافق على تواصل منسقينا معك عبر واتساب أو البريد الإلكتروني لمناقشة خطتك العلاجية. يمكنك طلب حذف أو تعديل بياناتك في أي وقت بالتواصل معنا على ${SITE_CONFIG.email}.`
      }
    ],
    footer: 'إذا كانت لديك أي استفسارات حول سياسة الخصوصية الخاصة بنا، يرجى التواصل مع فريق الخصوصية لدينا.'
  } : {
    title: 'Privacy Policy',
    subtitle: 'Last Updated: June 2026',
    intro: 'At TreatInKerala, we are committed to protecting your privacy and the confidentiality of your medical and personal details. This policy describes how we collect, use, and safeguard your information when using our estimate forms and concierge services.',
    sections: [
      {
        title: '1. Information We Collect',
        icon: FileText,
        text: 'We collect information crucial for preparing an accurate medical estimate and travel itinerary, including: full name, country/nationality, age, gender, WhatsApp number, email address, and any medical files or prescriptions you share.'
      },
      {
        title: '2. How We Use Your Data',
        icon: Eye,
        text: 'Your medical and personal information is used exclusively to generate customized treatment quotes, consult with doctors at our partner facilities, coordinate local accommodation, and organize transport/translator services.'
      },
      {
        title: '3. Data Confidentiality & Security',
        icon: Lock,
        text: 'Your sensitive health records and details are secure. We do not sell, trade, or share your data with third-party advertisers. It is strictly shared with accredited clinical partners and hospitals you select for your care.'
      },
      {
        title: '4. Legal Framework Compliance',
        icon: ShieldCheck,
        text: 'We structure our processing to respect privacy guidelines, including the Digital Personal Data Protection (DPDP) Act 2023 of India, and GDPR principles for European or Middle-Eastern international travellers.'
      },
      {
        title: '5. Consent & Your Rights',
        icon: Globe,
        text: `By submitting your request, you consent to our medical coordinator reaching out via WhatsApp or email. You hold the right to review, update, or request deletion of your records by contacting us at ${SITE_CONFIG.email}.`
      }
    ],
    footer: 'For any questions or concerns regarding this policy, please reach out to our privacy compliance officer.'
  };

  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-primary-green/10 flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8 text-primary-green" />
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
