import React from 'react';
import { HelpCircle, ChevronDown, Award, Plane, DollarSign, Leaf } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'الأسئلة الشائعة | علاج في كيرلا' : 'Frequently Asked Questions | TreatInKerala',
    description: locale === 'ar' 
      ? 'إجابات شاملة على كافة الأسئلة المتعلقة بالتكاليف، المستشفيات، تأشيرات السفر الطبية، وخدمات التنسيق في كيرلا.'
      : 'Find detailed answers to common questions about medical treatments, hospital accreditations, visa letters, and travel costs in India.',
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  const categories = [
    {
      title: isRtl ? 'التكاليف والوفورات' : 'Costs & Savings',
      icon: DollarSign,
      items: [
        {
          q: isRtl ? 'كيف يمكن أن تكون التكاليف في كيرلا أقل بنسبة 80٪؟' : 'Why is medical treatment in Kerala so much cheaper?',
          a: isRtl 
            ? 'يرجع انخفاض التكاليف إلى انخفاض تكلفة المعيشة في الهند، وانخفاض سعر صرف الروبية الهندية مقابل الدولار والعملات الخليجية، بالإضافة إلى تنظيم القطاع الصحي الخاص لمنع الاحتكار والتكاليف الإدارية المفرطة الشائعة في الغرب.'
            : 'The lower cost is primarily due to lower operational costs, favorable currency exchange rates (INR vs USD/GBP/AED), and the structured healthcare economy in India. Doctors and hospitals maintain high efficiency without the excessive administrative overhead seen in Western countries.'
        },
        {
          q: isRtl ? 'هل تشمل الأسعار المعلنة رسوم منسقي علاج في كيرلا؟' : 'Are there any hidden coordination fees with TreatInKerala?',
          a: isRtl
            ? 'لا توجد أي رسوم خفية. الأسعار والتقديرات الطبية التي نرسلها لك تشمل كافة رسوم التنسيق الطبي، والاستقبال من المطار، والمرافقة اليومية. ستدفع للمستشفى مباشرة مقابل علاجك الفعلي.'
            : 'No, we believe in 100% transparency. Our estimates include all TreatInKerala services, local pick-up, and translation support. Patients pay the treating hospital directly for clinical procedures and rooms, ensuring no hidden mark-ups.'
        }
      ]
    },
    {
      title: isRtl ? 'تأشيرة السفر والترتيبات اللوجستية' : 'Visas & Logistics',
      icon: Plane,
      items: [
        {
          q: isRtl ? 'كيف يمكنني الحصول على تأشيرة طبية للهند؟' : 'How do I obtain an Indian Medical Visa?',
          a: isRtl
            ? 'يحتاج المرضى إلى تأشيرة طبية إلكترونية (e-Medical Visa). ستقوم علاج في كيرلا بتوفير رسالة دعوة رسمية من المستشفى المعالج في كيرلا لمرفق طلبك. التقديم يتم عبر الإنترنت ويستغرق من 3 إلى 5 أيام عمل فقط.'
            : 'Patients need an e-Medical Visa to enter India. Once you confirm your treatment, TreatInKerala coordinates with the hospital to issue a formal Visa Invitation Letter on their letterhead within 24 hours. You can then apply online via the official government portal, and approvals take 3–5 working days.'
        },
        {
          q: isRtl ? 'هل تقدم علاج في كيرلا خدمات استقبال من مطارات أخرى؟' : 'Which airports do you provide pickups from?',
          a: isRtl
            ? 'نقدم خدمات استقبال وإرجاع مجانية من مطار كالكوت الدولي (CCJ). وإذا كانت رحلتك تهبط في مطار كوشين (COK) أو مطار تريفاندروم (TRV)، يمكننا ترتيب تنقلات برية أو رحلات طيران داخلية إضافية حسب الطلب.'
            : 'We provide free personalized pickups and dropoffs from Calicut International Airport (CCJ). If your flight lands at Cochin (COK) or Trivandrum (TRV), we can coordinate domestic connecting flights or private road transfers on request.'
        }
      ]
    },
    {
      title: isRtl ? 'جودة المستشفيات والأطباء' : 'Clinical Quality & Safety',
      icon: Award,
      items: [
        {
          q: isRtl ? 'ما هي شهادات الاعتماد التي تحملها مستشفياتكم؟' : 'What accreditations do your partner hospitals hold?',
          a: isRtl
            ? 'جميع مستشفياتنا الشريكة حاصلة على اعتماد الهيئة الوطنية لاعتماد المستشفيات (NABH) في الهند، والعديد منها حاصل على اعتماد اللجنة المشتركة الدولية (JCI) وهو المعيار الأعلى عالمياً لسلامة المرضى وجودة الرعاية.'
            : 'All our partner facilities hold National Accreditation Board for Hospitals & Healthcare Providers (NABH) accreditation, ensuring strict national quality compliance. Additionally, our key partner super-specialities hold Joint Commission International (JCI) certifications.'
        },
        {
          q: isRtl ? 'هل يتحدث الأطباء والكوادر الطبية اللغة العربية؟' : 'Do clinical staffs speak Arabic?',
          a: isRtl
            ? 'يتحدث الأطباء والممرضون الإنجليزية بطلاقة تامة. ولضمان تواصل دقيق وخالٍ من سوء الفهم، توفر علاج في كيرلا مترجماً طبياً يرافقك طوال فترة إقامتك واستشاراتك الطبية لمساعدتك باللغة العربية.'
            : 'Clinical specialists and nursing staff speak fluent English. For Arabic-speaking patients, TreatInKerala assigns a dedicated medical translator who accompanies you to all consultations, procedures, and daily check-ins.'
        }
      ]
    },
    {
      title: isRtl ? 'طب الأيورفيدا التقليدي' : 'Ayurveda & Wellness',
      icon: Leaf,
      items: [
        {
          q: isRtl ? 'ما الفرق بين الأيورفيدا والطب الحديث؟' : 'Can I combine Ayurveda and modern Allopathy?',
          a: isRtl
            ? 'الأيورفيدا هو طب وقائي وعلاجي طبيعي يركز على توازن طاقة الجسم، وتطهيره من السموم (البانشاكارما). يمكنك دمجهما؛ حيث يفضل العديد من المرضى إجراء جراحات العظام أو القلب وتلقي تأهيل الأيورفيدا لتسريع الشفاء.'
            : 'Yes, combining them is highly popular. Many orthopedic patients undergo surgery at our super-speciality hospitals and transition to a partner Ayurveda centre for traditional herbal healing and natural muscle rejuvenation during recovery.'
        },
        {
          q: isRtl ? 'هل منتجات وعلاجات الأيورفيدا آمنة؟' : 'Are Ayurvedic herbal treatments safe and certified?',
          a: isRtl
            ? 'نعم، جميع مراكز الأيورفيدا الشريكة معتمدة من هيئة السياحة الحكومية ووزارة الصحة (تصنيف الغصن الأخضر أو الزيتوني). جميع العلاجات والزيوت الطبية طبيعية وعضوية ومحضرة تحت إشراف أطباء حاصلين على مؤهلات معترف بها.'
            : 'Absolutely. We only partner with government-certified Ayurveda hospitals (classified with Olive Leaf or Green Leaf status). All herbal medications are clinically prepared under the supervision of certified BAMS/MD Ayurvedic doctors.'
        }
      ]
    }
  ];

  // Flat list of all questions to build JSON-LD Schema
  const allFaqs = categories.flatMap(cat => cat.items);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': allFaqs.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  return (
    <>
      {/* Inject FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
              {locale === 'ar' ? 'إجابات على استفساراتك' : 'Questions & Answers'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
              {locale === 'ar' ? 'الأسئلة الشائعة حول العلاج والسفر في كيرلا' : 'Medical Tourism FAQ — Kerala'}
            </h1>
            <p className="text-lg text-text-muted">
              {locale === 'ar'
                ? 'ابحث عن إجابات مفصلة حول التكاليف، والتأشيرات، والاعتمادات الطبية، واللوجستيات، والخدمات المرافقة.'
                : 'Browse through our categorized FAQ to learn about travel documents, safety standards, currency setup and Panchakarma details.'}
            </p>
          </div>

          {/* Categorized FAQs */}
          <div className="space-y-12">
            {categories.map((cat, catIdx) => {
              const CatIcon = cat.icon;
              return (
                <div key={catIdx} className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#D4A96A]/35">
                    <CatIcon className="h-6 w-6 text-primary-green shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-primary-dark">
                      {cat.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {cat.items.map((item, itemIdx) => (
                      <details
                        key={itemIdx}
                        className="group border border-[#D4A96A]/35 rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
                      >
                        <summary className="flex items-center justify-between gap-1.5 focus:outline-hidden min-h-[44px]">
                          <h3 className="text-base sm:text-lg font-bold text-text-dark flex items-start gap-2">
                            <HelpCircle className="h-5.5 w-5.5 text-primary-green shrink-0 mt-0.5" />
                            <span>{item.q}</span>
                          </h3>
                          <ChevronDown className="h-5.5 w-5.5 text-[#D4A96A] transition-transform duration-300 group-open:-rotate-180 shrink-0" />
                        </summary>
                        <p className="mt-4 text-text-muted leading-relaxed text-base border-t border-slate-100 pt-4">
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
