import React from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BLOG_POSTS } from '@/lib/data';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, BookOpen, Zap, HelpCircle, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import { getBreadcrumbSchema, getHowToSchema, getFAQSchema } from '@/lib/schemas';
import BlogRecoveryCallout from '@/components/blog/BlogRecoveryCallout';
import { getRecoveryProductsForBlog } from '@/lib/recoveryProducts';

// ── Inline rich-text renderer ────────────────────────────────
// Converts a plain string with lightweight markdown conventions into
// styled React elements. Supports:
//   ## H2 headings
//   ### H3 headings
//   **bold** inline
//   - bullet list items
//   1. ordered list items
//   | markdown table |
//   blank lines → paragraph breaks
function RichContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let orderedBuffer: string[] = [];
  let tableBuffer: string[] = [];

  const parseInline = (text: string) => {
    // Parse **bold** and [link text](url) markdown
    const withBold = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[#1B4332]">$1</strong>');
    // Internal links styled in brand green; external links open in new tab
    return withBold.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, label, href) => {
        const isExternal = href.startsWith('http');
        const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${href}" class="font-semibold text-[#2D6A4F] underline underline-offset-2 hover:text-[#1B4332] transition-colors"${attrs}>${label}</a>`;
      }
    );
  };
  // Keep alias for backwards compat inside the renderer
  const parseBold = parseInline;

  const flushBullets = (key: string) => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="list-none space-y-2 my-4">
        {bulletBuffer.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-700 text-base leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2D6A4F] shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  const flushOrdered = (key: string) => {
    if (orderedBuffer.length === 0) return;
    elements.push(
      <ol key={key} className="space-y-2.5 my-4 list-decimal list-inside text-slate-700 text-base leading-relaxed pl-1">
        {orderedBuffer.map((item, i) => (
          <li key={i} className="pl-1 text-slate-700 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
          </li>
        ))}
      </ol>
    );
    orderedBuffer = [];
  };

  const flushTable = (key: string) => {
    if (tableBuffer.length < 2) {
      tableBuffer.forEach((tLine, i) => {
        elements.push(
          <p key={`${key}-p-${i}`} className="text-slate-700 text-base leading-[1.85] mb-0"
            dangerouslySetInnerHTML={{ __html: parseBold(tLine) }}
          />
        );
      });
      tableBuffer = [];
      return;
    }

    const parseRow = (line: string) =>
      line
        .split('|')
        .map(cell => cell.trim())
        .filter((cell, idx, arr) => idx > 0 && idx < arr.length - 1);

    const headers = parseRow(tableBuffer[0]);
    const rowLines = tableBuffer.slice(1).filter(l => !l.includes('---'));
    const rows = rowLines.map(parseRow);

    elements.push(
      <div key={key} className="overflow-x-auto my-6 rounded-2xl border border-slate-200/90 shadow-sm bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm sm:text-base">
          <thead className="bg-[#FAF7F2] text-[#1B4332]">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3.5 text-start font-bold text-xs sm:text-sm uppercase tracking-wider font-sans border-b border-slate-200"
                  dangerouslySetInnerHTML={{ __html: parseBold(h) }}
                />
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white hover:bg-emerald-50/20 transition-colors' : 'bg-slate-50/60 hover:bg-emerald-50/30 transition-colors'}>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-4 py-3 whitespace-normal text-slate-700 text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: parseBold(cell) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
  };

  const flushAll = (key: string) => {
    flushBullets(`${key}-b`);
    flushOrdered(`${key}-o`);
    flushTable(`${key}-t`);
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushBullets(`bl-${idx}`);
      flushOrdered(`ol-${idx}`);
      tableBuffer.push(trimmed);
    } else if (trimmed.startsWith('## ')) {
      flushAll(`all-${idx}`);
      elements.push(
        <h2 key={idx} className="text-2xl font-bold text-[#1B4332] mt-10 mb-4 pb-2 border-b border-slate-100 font-sans">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushAll(`all-${idx}`);
      elements.push(
        <h3 key={idx} className="text-lg font-bold text-[#2D6A4F] mt-6 mb-2 font-sans">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushTable(`tbl-${idx}`);
      flushOrdered(`ol-${idx}`);
      bulletBuffer.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushTable(`tbl-${idx}`);
      flushBullets(`bl-${idx}`);
      orderedBuffer.push(trimmed.replace(/^\d+\.\s/, ''));
    } else if (trimmed === '') {
      flushAll(`all-${idx}`);
    } else {
      flushAll(`all-${idx}`);
      elements.push(
        <p key={idx} className="text-slate-700 text-base leading-[1.85] mb-0"
          dangerouslySetInnerHTML={{ __html: parseBold(trimmed) }}
        />
      );
    }
  });

  flushAll('final');

  return <div className="space-y-3">{elements}</div>;
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return {};
  }
  const title = locale === 'ar' ? post.titleAr : post.title;
  const description = locale === 'ar' ? post.excerptAr : post.excerpt;

  return {
    title: `${title} | TreatInKerala Blog`,
    description,
    openGraph: {
      images: post.image ? [{ url: `https://treatinkerala.com${post.image}`, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      images: post.image ? [`https://treatinkerala.com${post.image}`] : undefined,
    },
    alternates: {
      canonical: locale === 'ar' ? `/ar/blog/${slug}` : `/en/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}


export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const isRtl = locale === 'ar';

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const title = isRtl ? post.titleAr : post.title;
  const category = isRtl ? post.categoryAr : post.category;
  const content = isRtl ? post.contentAr : post.content;

  const aeoSummary = isRtl ? post.aeoSummaryAr : post.aeoSummary;

  // Get topically related posts (same category first, then fallback to most recent)
  const relatedPosts = [
    ...BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category),
    ...BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== post.category),
  ].slice(0, 3);

  // Determine if this is an Ayurveda-focused post (exclude country-guide posts)
  const isAyurveda = !slug.includes('-to-kerala-') &&
    (slug.includes('ayurveda') || slug.includes('alopecia') || slug.includes('panchakarma') || slug.includes('herb'));

  // ── Per-post internal link cards (treatments / hospitals / services) ──────
  // Each entry: { href, labelEn, labelAr, descEn, descAr }
  const INTERNAL_LINK_MAP: Record<string, { href: string; labelEn: string; labelAr: string; descEn: string; descAr: string }[]> = {
    'oman-to-kerala-medical-tourism-guide': [
      { href: '/treatments/orthopaedics', labelEn: 'Robotic Joint Replacement', labelAr: 'استبدال المفاصل بالروبوت', descEn: 'Stryker Mako & Cuvis robotic systems. Walk within 24 hours.', descAr: 'أنظمة روبوت ستريكر ماكو وكيوفيس. المشي خلال 24 ساعة.' },
      { href: '/treatments/cardiac', labelEn: 'Cardiac Bypass Surgery (CABG)', labelAr: 'جراحة القلب المفتوح', descEn: 'JCI-accredited coronary bypass. $6,000–$10,000 all-inclusive.', descAr: 'قلب مفتوح معتمد JCI. يشمل الإقامة والغرسات الأمريكية.' },
      { href: '/treatments/ayurveda', labelEn: 'Ayurvedic Post-Op Rehabilitation', labelAr: 'التعافي التأهيلي بالأيورفيدا', descEn: 'Medically supervised Kizhi & Pizhichil therapies post-surgery.', descAr: 'جلسات الكيشي والبيشيشيل الطبية للتعافي بعد الجراحة.' },
      { href: '/hospitals', labelEn: 'Partner JCI Hospitals in Calicut', labelAr: 'مستشفياتنا المعتمدة في كالكوت', descEn: 'Aster MIMS, Meitra & Baby Memorial — fully Arabic-capable.', descAr: 'أستر ميمز، ميترا، بيبي ميموريال — طواقم طبية عربية.' },
      { href: '/patients/oman', labelEn: 'Oman Patient Hub', labelAr: 'مركز المرضى العمانيين', descEn: 'Tailored info: visa, flights, costs and cultural support for Omani patients.', descAr: 'دليل التأشيرة، الرحلات، التكاليف والدعم الثقافي للمرضى العمانيين.' },
    ],
    'maldives-to-kerala-medical-treatment-guide': [
      { href: '/treatments/cardiac', labelEn: 'Pediatric & Adult Cardiology', labelAr: 'قلب الأطفال والبالغين', descEn: 'ASD / VSD closures and coronary bypass. Dedicated Pediatric ICU.', descAr: 'إغلاق ثقوب القلب والقلب المفتوح. عناية مركزة متخصصة للأطفال.' },
      { href: '/treatments/oncology', labelEn: 'Advanced Cancer Treatment', labelAr: 'علاج الأورام المتقدم', descEn: 'TrueBeam radiotherapy, digital PET-CT staging & robotic oncological surgery.', descAr: 'علاج إشعاعي تروبيم وفحص PET-CT الرقمي والجراحة الروبوتية للأورام.' },
      { href: '/treatments/orthopaedics', labelEn: 'Orthopedic Surgery (Knee & Spine)', labelAr: 'جراحة العظام (الركبة والعمود الفقري)', descEn: 'Robotic knee replacement & endoscopic discectomy — walk within 24 hours.', descAr: 'استبدال الركبة بالروبوت وإزالة الانزلاق الغضروفي بالمنظار.' },
      { href: '/hospitals', labelEn: 'Top Hospitals in Trivandrum & Kochi', labelAr: 'أفضل مستشفيات تريفاندروم وكوتشين', descEn: 'KIMSHEALTH, Ananthapuri, Aster Medcity — Aasandha-linked facilities.', descAr: 'كيمز هيلث، أنانثابوري، أستر ميدسيتي — مرتبطة ببرنامج اساندا.' },
      { href: '/patients/maldives', labelEn: 'Maldives Patient Hub', labelAr: 'مركز المرضى المالديفيين', descEn: 'Complete guide: 90-day visa-free entry, Aasandha, flights from Malé.', descAr: 'دليل شامل: دخول بدون تأشيرة 90 يوماً، اساندا، رحلات من مالي.' },
    ],
    'uae-dubai-to-kerala-medical-tourism-guide': [
      { href: '/treatments/dental', labelEn: 'Premium Dental Implants & Smile Makeover', labelAr: 'زراعة الأسنان الفاخرة وابتسامة هوليوود', descEn: 'Swiss Straumann / Nobel Biocare implants. All-on-4 from AED 8,500.', descAr: 'غرسات Straumann و Nobel Biocare. الفك الكامل من 8,500 درهم.' },
      { href: '/treatments/orthopaedics', labelEn: 'Robotic Knee & Hip Replacement', labelAr: 'استبدال الركبة والورك بالروبوت', descEn: 'Stryker Mako robotic precision. Save AED 48,000–62,000 vs. Dubai.', descAr: 'روبوت ستريكر ماكو. وفر 48,000 إلى 62,000 درهم مقارنة بدبي.' },
      { href: '/treatments/ayurveda', labelEn: 'Ayurvedic Recovery Retreats', labelAr: 'منتجعات النقاهة الأيورفيدية', descEn: 'Phase 2 healing in Wayanad & Kumarakom luxury eco-estates.', descAr: 'مرحلة التعافي في منتجعات واياناد وكوماراكوم الطبيعية الفاخرة.' },
      { href: '/hospitals', labelEn: 'JCI Hospitals in Kerala', labelAr: 'المستشفيات المعتمدة JCI في كيرلا', descEn: 'Browse accredited multi-specialty hospitals across Calicut, Kochi & Trivandrum.', descAr: 'تصفح المستشفيات المتخصصة المعتمدة في كوزيكود وكوتشين وتريفاندروم.' },
      { href: '/patients/uae', labelEn: 'UAE Patient Hub', labelAr: 'مركز المرضى الإماراتيين', descEn: 'Emirati & UAE expat guide: visa, flights, services and cost estimates.', descAr: 'دليل المرضى الإماراتيين والمقيمين: التأشيرة والرحلات وتقديرات التكاليف.' },
    ],
  };
  const internalLinks = INTERNAL_LINK_MAP[slug] ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'MedicalWebPage'],
    headline: title,
    description: isRtl ? post.excerptAr : post.excerpt,
    articleSection: category,
    datePublished: post.date,
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: 'Muhsina TP',
      jobTitle: isRtl ? 'كبير المنسقين الطبيين' : 'Chief Medical Coordinator',
      url: 'https://treatinkerala.com',
      worksFor: {
        '@type': 'MedicalOrganization',
        name: 'TreatInKerala',
      },
    },
    reviewedBy: {
      '@type': 'Person',
      name: isAyurveda ? 'Dr. S. Warrier (Chief Ayurvedic Vaidya)' : 'Dr. M. Nair (Senior Consultant Surgeon)',
      jobTitle: isAyurveda ? (isRtl ? 'كبير أطباء الأيورفيدا' : 'Chief Ayurvedic Medical Officer') : (isRtl ? 'كبير استشاريي الجراحة' : 'Senior Consultant Surgeon & Clinical Director'),
    },
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'TreatInKerala',
      url: 'https://treatinkerala.com',
      logo: 'https://treatinkerala.com/images/logo.svg',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://treatinkerala.com/${locale}/blog/${slug}`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'p', 'h2'],
    },
    ...(slug === 'alopecia-areata-ayurvedic-treatment-kerala' ? {
      about: [
        {
          '@type': 'MedicalCondition',
          name: 'Alopecia Areata',
          alternateName: ['Indralupta', 'Autoimmune Hair Loss', 'Kalitya'],
          code: {
            '@type': 'MedicalCode',
            code: 'L63.9',
            codingSystem: 'ICD-10',
          },
        },
      ],
    } : {}),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRtl ? 'الرئيسية' : 'Home', url: `https://treatinkerala.com/${locale}` },
    { name: isRtl ? 'المدونة' : 'Blog', url: `https://treatinkerala.com/${locale}/blog` },
    { name: title, url: `https://treatinkerala.com/${locale}/blog/${slug}` }
  ]);

  let howToSchema: Record<string, unknown> | null = null;
  if (slug === 'medical-visa-india-step-by-step') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيفية الحصول على تأشيرة طبية للهند' : 'How to Obtain an Indian Medical Visa',
      isRtl ? [
        { name: 'الخطوة الأولى: جهز المستندات', text: 'تأكد من صلاحية جواز السفر لـ 6 أشهر على الأقل وجهز تقاريرك الطبية المحلية.' },
        { name: 'الخطوة الثانية: احصل على خطاب دعوة المستشفى', text: 'تقوم خدمة علاج في كيرلا بتنسيق خطاب دعوة رسمي من المستشفى في الهند خلال 24 ساعة.' },
        { name: 'الخطوة الثالثة: قدم الطلب عبر الإنترنت', text: 'املأ نموذج التأشيرة الطبية الإلكترونية على البوابة الحكومية الرسمية.' },
        { name: 'الخطوة الرابعة: ادفع الرسوم', text: 'ادفع رسوم التأشيرة الطبية الإلكترونية باستخدام البطاقة الائتمانية.' },
        { name: 'الخطوة الخامسة: استلم التأشيرة', text: 'تصلك موافقة التأشيرة عبر البريد الإلكتروني خلال 3 إلى 4 أيام.' }
      ] : [
        { name: 'Step 1: Gather your documents', text: 'Ensure your passport is valid for at least 6 months and gather your local medical reports.' },
        { name: 'Step 2: Receive the hospital invitation letter', text: 'TreatInKerala will coordinate with the hospital to issue a formal e-Medical visa invitation letter within 24 hours.' },
        { name: 'Step 3: Complete the online application', text: 'Fill the official Indian e-Medical Visa form on the government portal.' },
        { name: 'Step 4: Pay the fee', text: 'Pay the e-visa processing fee online using your credit or debit card.' },
        { name: 'Step 5: Get your e-visa', text: 'Receive your approved e-visa via email within 3 to 4 days.' }
      ]
    );
  } else if (slug === 'plan-medical-trip-calicut-logistics') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيفية التخطيط لرحلتك العلاجية إلى كالكوت' : 'How to Plan Your Medical Journey to Calicut',
      isRtl ? [
        { name: 'الخطوة الأولى: أرسل التقارير للاستشارة', text: 'شارك تقاريرك الطبية الحالية عبر بوابتنا الإلكترونية أو واتساب للحصول على استشارة مجانية.' },
        { name: 'الخطوة الثانية: استلم تقدير التكلفة', text: 'احصل على عرض أسعار وخطة علاج متكاملة مخصصة لحالتك خلال 48 ساعة.' },
        { name: 'الخطوة الثالثة: اطلب خطاب التأشيرة', text: 'اختر المستشفى المفضل وسنصدر لك خطاب دعوة التأشيرة فوراً.' },
        { name: 'الخطوة الرابعة: قدم على التأشيرة الإلكترونية', text: 'املأ نموذج التأشيرة الطبية للهند عبر الإنترنت بـ 5 دقائق.' },
        { name: 'الخطوة الخامسة: احجز تذكرتك لكالكوت', text: 'احجز طيرانك لمطار كالكوت الدولي (CCJ) وسيكون منسقنا في استقبالك ببطاقة ترحيب وشريحة اتصال.' }
      ] : [
        { name: 'Step 1: Submit your medical reports', text: 'Share your latest medical scans and files via our secure form or WhatsApp.' },
        { name: 'Step 2: Receive treatment plan & estimate', text: 'Get a binding cost proposal and recovery timeline custom-tailored within 48 hours.' },
        { name: 'Step 3: Request official visa invitation', text: 'Select your hospital network and we will generate the medical invitation letter immediately.' },
        { name: 'Step 4: Apply for e-Medical Visa', text: 'Complete the online application forms in 5 minutes with our guide.' },
        { name: 'Step 5: Book your flight to Calicut (CCJ)', text: 'Book travel. A personal coordinator will receive you at Kozhikode Airport with a local SIM card.' }
      ]
    );
  } else if (slug === 'panchakarma-ayurveda-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف تعمل علاجات البانشاكارما' : 'How Panchakarma Detoxification Works',
      isRtl ? [
        { name: 'فامانا (التقيؤ العلاجي)', text: 'إزالة السموم من الجهاز التنفسي العلوي.' },
        { name: 'فيريتشانا (التطهير)', text: 'تنقية الكبد والجهاز الهضمي.' },
        { name: 'باستي (الحقن العشبية)', text: 'إعادة توازن طاقات الجسم الحيوية.' },
        { name: 'ناسيا (علاج الأنف)', text: 'استخدام الزيوت الطبية للجيوب الأنفية وصحة الأعصاب.' },
        { name: 'راكتاموكشانا (تنقية الدم)', text: 'معالجة مشاكل الدورة الدموية والجلد.' }
      ] : [
        { name: 'Vamana (Therapeutic Emesis)', text: 'Clearing toxins from the upper respiratory tract.' },
        { name: 'Virechana (Purgation Therapy)', text: 'Detoxifying the liver and digestive system.' },
        { name: 'Basti (Medicated Enemas)', text: 'Balancing vital bodily humors using herbal formulations.' },
        { name: 'Nasya (Nasal Administration)', text: 'Applying medical oils for sinus and neurological health.' },
        { name: 'Raktamokshana (Blood Purification)', text: 'Guided purification to address skin and circulatory concerns.' }
      ]
    );
  } else if (slug === 'what-to-pack-for-treatment-kerala') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف تحضر حقيبتك لرحلة العلاج' : 'How to Pack for Your Medical Trip',
      isRtl ? [
        { name: 'تجهيز المستندات الطبية', text: 'رتب التقارير والأشعة والوصفات الطبية في ملف مقاوم للماء.' },
        { name: 'اختيار الملابس المناسبة', text: 'احزم ملابس قطنية خفيفة وفضفاضة تناسب المناخ الاستوائي.' },
        { name: 'ملابس ما بعد الجراحة', text: 'تأكد من إحضار قمصان تفتح من الأمام لتسهيل الحركة.' },
        { name: 'تجهيز الإلكترونيات والمحولات', text: 'أحضر محولات كهرباء متوافقة مع النظام الهندي/البريطاني.' },
        { name: 'العملة المحلية', text: 'احصل على مبلغ بسيط من الروبية الهندية للمعاملات اليومية.' }
      ] : [
        { name: 'Organize Medical Documents', text: 'Keep physical reports, CDs, and active prescriptions in a waterproof folder.' },
        { name: 'Choose the Right Clothing', text: 'Pack light, loose-fitting cotton outfits for Kerala\'s warm climate.' },
        { name: 'Prepare Surgical Recovery Wear', text: 'Include front-open shirts and loose sweatpants if undergoing joint or cardiac surgery.' },
        { name: 'Pack Electronics and Adapters', text: 'Bring UK/India standard plug adapters (Type D/G).' },
        { name: 'Organize Local Currency', text: 'Carry a small amount of Indian Rupees (INR) for local transactions.' }
      ]
    );
  } else if (slug === 'joint-replacement-kerala-gcc-guide' || slug === 'robotic-knee-joint-replacement-kerala') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف تخطط لاستبدال مفصل الركبة بالروبوت في كيرلا' : 'How to Plan Robotic Knee Replacement in Kerala',
      isRtl ? [
        { name: 'الاستشارة والتقييم', text: 'أرسل أشعة X-ray أو الرنين للركبة لتقييم الحالة مجاناً وبناء النموذج ثلاثي الأبعاد.' },
        { name: 'اختيار الغرسات الطبية', text: 'يستخدم جراحونا غرسات التيتانيوم والسيراميك المعتمدة من FDA الأمريكية.' },
        { name: 'السفر والإقامة', text: 'رحلات مباشرة قصيرة (3.5 ساعات من الخليج) وإقامات ملائمة للثقافة الخليجية.' },
        { name: 'العملية الجراحية بالروبوت', text: 'تتم الجراحة بدقة 0.5 ملم في مستشفيات كيرلا المعتمدة دولياً JCI.' },
        { name: 'التأهيل والمشي في 24 ساعة', text: 'المشي في اليوم الأول وجلسات علاج طبيعي يومية لاستعادة الحركة قبل السفر.' }
      ] : [
        { name: 'Initial Consultation', text: 'Share your X-rays or MRI scans for free 3D virtual modeling by our orthopedic surgeons.' },
        { name: 'Implant Selection', text: 'We exclusively use US FDA-approved titanium/ceramic implants for long-lasting performance.' },
        { name: 'Travel & Accommodation', text: 'Enjoy short 3.5-hour direct flights from GCC and culturally customized Halal stays.' },
        { name: 'Robotic Surgical Procedure', text: 'Surgery is executed with sub-millimeter precision at a JCI-accredited facility.' },
        { name: 'Post-Op Rehab & 24h Walking', text: 'Walk within 24 hours followed by structured daily physiotherapy.' }
      ]
    );
  } else if (slug === 'ivf-fertility-treatment-kerala-gcc-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'خطوات رحلة علاج أطفال الأنابيب في كيرلا' : 'Step-by-Step IVF Journey in Kerala',
      isRtl ? [
        { name: 'المراجعة الطبية الأولية', text: 'إرسال الفحوصات الهرمونية الحالية للحصول على خطة علاج مجانية مخصصة.' },
        { name: 'إصدار التأشيرة والسفر', text: 'استخراج التأشيرة الطبية الإلكترونية خلال 24 ساعة والوصول في اليوم الثاني من الدورة.' },
        { name: 'تنشيط المبيض ومتابعة السونار', text: 'إعطاء بروتوكول التنشيط ومتابعة نمو البويضات بدقة كل 48 ساعة.' },
        { name: 'سحب البويضات والتلقيح المجهري', text: 'سحب البويضات بدون ألم والتلقيح بتقنية الحقن المجهري ICSI وفحص الأجنة PGT.' },
        { name: 'إرجاع الجنين والعودة للوطن', text: 'نقل الجنين عالي الجودة في اليوم الخامس، والسفر للوطن بعد 24-48 ساعة.' }
      ] : [
        { name: 'Initial Medical Evaluation', text: 'Share current hormonal profiles for a free customized treatment blueprint.' },
        { name: 'E-Visa & Travel', text: 'Receive hospital invitation letter within 24 hours and arrive on Day 2 of menstrual cycle.' },
        { name: 'Ovarian Stimulation & Monitoring', text: 'Targeted gonadotropin injections and ultrasound tracking every 48 hours.' },
        { name: 'Painless Egg Retrieval & ICSI', text: 'Egg collection under mild sedation, ICSI fertilization, and PGT embryo screening.' },
        { name: 'Blastocyst Transfer & Fly Home', text: 'Painless Day 5 embryo transfer and fly home safely after 24 to 48 hours.' }
      ]
    );
  } else if (slug === 'ayurvedic-vs-surgical-spine-care-sciatica-slip-disc') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف يتم علاج الانزلاق الغضروفي وعرق النسا في كيرلا' : 'How Slip Disc & Sciatica are Treated in Kerala',
      isRtl ? [
        { name: 'التقييم المزدوج للرنين المغناطيسي', text: 'مراجعة صورة الرنين المغناطيسي مع جراح أعصاب وطبيب أيورفيدا بالتوازي.' },
        { name: 'تحديد المسار العلاجي', text: 'اختيار علاج الأيورفيدا الطبيعي (80% من الحالات) أو الجراحة المجهرية طفيفة التوغل.' },
        { name: 'العلاج الطبيعي الأيورفيدي المكثف', text: 'جلسات كادي باستي وتكميد الأعشاب والحقن الزيتية لتخفيف ضغط العصب وترطيب الغضاريف.' },
        { name: 'الجراحة المجهرية طفيفة التوغل', text: 'استئصال الغضروف عبر شق 1.5 سم تحت الميكروسكوب في حال وجود عجز عصبي.' },
        { name: 'استعادة الحركة والوقاية', text: 'تمارين تقوية عضلات الجذع والعودة للحياة الطبيعية بدون ألم.' }
      ] : [
        { name: 'Dual MRI Medical Review', text: 'MRI evaluated simultaneously by a Senior Neurosurgeon and an Ayurvedic Vaidya.' },
        { name: 'Treatment Pathway Selection', text: 'Selecting non-surgical Ayurveda (80% of cases) vs. minimally invasive microdiscectomy.' },
        { name: 'Intensive Ayurvedic Therapy', text: 'Kadi Basti, herbal poultices, and medicated oil therapies to decompress nerves.' },
        { name: 'Minimally Invasive Microdiscectomy', text: '1.5 cm microscopic nerve decompression when acute motor weakness is present.' },
        { name: 'Core Strengthening & Pain-Free Return', text: 'Targeted spine strengthening and postural training for lifelong wellness.' }
      ]
    );
  } else if (slug === 'dental-tourism-kerala-implants-smile-makeover') {
    howToSchema = getHowToSchema(
      isRtl ? 'خطوات زراعة الفك الكامل وتجميل الأسنان في 7 أيام' : 'How to Complete 7-Day Full Arch Dental Implants in Kerala',
      isRtl ? [
        { name: 'التشخيص الرقمي والأشعة المقطعية', text: 'إجراء الأشعة المقطعية ثلاثية الأبعاد CBCT وتصميم الابتسامة بالكمبيوتر في اليوم الأول.' },
        { name: 'الزراعة الرقمية الموجهة', text: 'تثبيت غرسات التيتانيوم المعتمدة بدون جراحة مؤلمة في اليوم الثاني.' },
        { name: 'التصنيع الرقمي CAD/CAM', text: 'تصنيع تيجان الزركونيا الفاخرة بدقة متناهية خلال 48 ساعة بينما تستمتع بإجازتك في كيرلا.' },
        { name: 'جلسة القياس والتجربة', text: 'فحص الإطباق وراحة اللثة والشكل الجمالي للابتسامة.' },
        { name: 'التثبيت النهائي واستلام بطاقة الضمان', text: 'تثبيت الابتسامة الدائمة واستلام شهادة الضمان الدولي للغرسات مدى الحياة.' }
      ] : [
        { name: '3D CBCT Digital Diagnostics', text: 'Full mouth 3D scanning and computer-guided smile design on Day 1.' },
        { name: 'Flapless Guided Implant Placement', text: 'Minimally invasive titanium implant placement under local anesthesia on Day 2.' },
        { name: 'In-House CAD/CAM Milling', text: 'Monolithic zirconia bridge milled with precision while you tour Kerala.' },
        { name: 'Trial Fitting & Occlusion Check', text: 'Verifying bite alignment and esthetic smile line in the dental suite.' },
        { name: 'Permanent Cementation & Lifetime Warranty', text: 'Fixing your permanent radiant smile and issuing your international implant passport.' }
      ]
    );
  } else if (slug === 'cancer-treatment-oncology-kerala-costs-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف يتم التخطيط لعلاج السرطان في كيرلا' : 'How Cancer Treatment is Planned in Kerala',
      isRtl ? [
        { name: 'التقييم المجاني من لجنة الأورام', text: 'إرسال تقارير الخزعة والأشعة المقطعية لمراجعتها من قِبل لجنة الأورام المشتركة خلال 48 ساعة.' },
        { name: 'إصدار التأشيرة الطبية الإلكترونية', text: 'استلام خطاب دعوة المستشفى الرسمي لاستخراج التأشيرة الطبية للهند خلال 24 ساعة.' },
        { name: 'فحص PET-CT الرقمي وإعادة التقييم', text: 'إجراء الفحوصات والمسح البوزيتروني في اليوم الأول لتحديد مرحلة الورم بدقة.' },
        { name: 'تنفيذ البروتوكول العلاجي', text: 'بدء الجلسات الإشعاعية الموجهة بتروبيم أو الكيماوي أو الجراحة بالروبوت في بيئة معقمة.' },
        { name: 'الرعاية التأهيلية الداعمة', text: 'برامج التغذية وجلسات الأيورفيدا الطبية لتخفيف الإجهاد واستعادة القوة قبل السفر.' }
      ] : [
        { name: 'Free Tumor Board Evaluation', text: 'Submit biopsy reports and scans for joint review by senior oncologists within 48 hours.' },
        { name: 'E-Medical Visa Invitation', text: 'Receive official hospital visa invitation letter for fast-track processing within 24 hours.' },
        { name: 'Digital PET-CT Restaging', text: 'Complete day-one diagnostic restaging to pinpoint tumor margins with sub-millimeter precision.' },
        { name: 'Therapy Administration', text: 'Commence targeted TrueBeam radiotherapy, chemotherapy cycles, or robotic surgery.' },
        { name: 'Integrative Supportive Recovery', text: 'Targeted nutrition and medically supervised Ayurveda to relieve fatigue and restore vitality.' }
      ]
    );
  } else if (slug === 'bariatric-gastric-sleeve-surgery-kerala-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'خطوات عملية تكميم المعدة بالمنظار في كيرلا' : 'Step-by-Step Laparoscopic Sleeve Gastrectomy in Kerala',
      isRtl ? [
        { name: 'التقييم الأيضي الأولي', text: 'إرسال الوزن والطول والتاريخ المرضي للتقييم المجاني من قِبل جراح السمنة.' },
        { name: 'الوصول والفحوصات الشاملة', text: 'إجراء فحوصات الدم، وتخطيط القلب، ومنظار المعدة التشخيصي في اليوم الأول.' },
        { name: 'العملية بالمنظار والدباسات الأمريكية', text: 'إجراء التكميم خلال 60 دقيقة بدباسات FDA ثلاثية وفحص التسريب المباشر.' },
        { name: 'المشي وبدء مرحلة السوائل', text: 'المشي بعد 4 ساعات وبدء شرب السوائل الشفافة بعد أشعة الصبغة في اليوم الثاني.' },
        { name: 'الخروج وجدول التغذية', text: 'استلام الخطة الغذائية للأشهر القادمة وشهادة اللياقة للسفر والعودة للوطن بأمان.' }
      ] : [
        { name: 'Initial Metabolic Assessment', text: 'Submit your BMI and medical history for free review by our bariatric surgical team.' },
        { name: 'Arrival & Pre-Op Diagnostics', text: 'Complete comprehensive blood panels, cardiology clearance, and endoscopy on Day 1.' },
        { name: 'Laparoscopic Keyhole Surgery', text: '60-minute procedure utilizing US FDA endoscopic tri-staplers with intraoperative leak test.' },
        { name: 'Early Walking & Liquid Diet', text: 'Walk within 4 hours and transition to clear liquids following contrast scan verification.' },
        { name: 'Discharge & Nutritional Roadmap', text: 'Receive your 4-stage dietary plan and fit-to-fly clearance certificate.' }
      ]
    );
  } else if (slug === 'advanced-eye-surgery-lasik-cataract-kerala-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'خطوات تصحيح النظر بالكونتورا ليزك وزراعة العدسات' : 'How Contoura Vision LASIK & Cataract Surgery Work',
      isRtl ? [
        { name: 'فحص البنتاكام وقياس تضاريس القرنية', text: 'مسح 22,000 نقطة على سطح القرنية أو قياس أبعاد العين للعدسة ثلاثية البؤرة.' },
        { name: 'جلسة الليزر بدون ألم (15 دقيقة)', text: 'تطبيق قطرات تخدير موضعي وتصحيح النظر بالليزر خلال دقيقتين لكل عين.' },
        { name: 'الراحة وارتداء النظارة الواقية', text: 'الاسترخاء في الفندق لبضع ساعات مع بدء استقرار الرؤية الواضحة.' },
        { name: 'فحص المصباح الشقي في اليوم التالي', text: 'التأكد من التئام القرنية وتحقيق حدة إبصار 6/6 أو أفضل.' },
        { name: 'استلام قطرات التعافي والسفر', text: 'الحصول على تصريح الطيران وقطرات الترطيب والعودة للوطن برؤية حادة.' }
      ] : [
        { name: 'Pentacam Topography Mapping', text: 'Map 22,000 corneal elevation points or optical biometry for trifocal lens selection.' },
        { name: 'Painless 15-Minute Laser Treatment', text: 'Topical numbing drops applied with high-precision laser correction taking 2 minutes per eye.' },
        { name: 'Short Rest with Protective Glasses', text: 'Rest at your hotel for 3-4 hours as sharp crystal vision begins to set in.' },
        { name: 'Next-Day Slit-Lamp Verification', text: 'Verify corneal healing and achieve 20/20 or sharper uncorrected visual acuity.' },
        { name: 'Eye Drop Kit & Fly Home', text: 'Receive flight clearance and lubricating drop supply for clear glasses-free vision.' }
      ]
    );
  } else if (slug === 'laser-kidney-stone-surgery-rirs-kerala-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'خطوات تفتيت حصوات الكلى بالمنظار المرن والليزر RIRS' : 'How RIRS Flexible Laser Kidney Stone Surgery Works',
      isRtl ? [
        { name: 'التشخيص بالأشعة المقطعية منخفضة الجرعة', text: 'تحديد حجم وموقع وكثافة الحصوة بدقة متناهية فور الوصول.' },
        { name: 'التفتيت بالمنظار المرن والليزر', text: 'إدخال المنظار عبر مجرى البول الطبيعي وتفتيت الحصوة إلى بودرة ناعمة دون جراحة.' },
        { name: 'وضع دعامة الحالب المؤقتة', text: 'تثبيت دعامة سيليكون دقيقة لضمان تصريف البول براحة تامة ومنع الانسداد.' },
        { name: 'المشي والخروج خلال 24 ساعة', text: 'المشي وتناول الطعام الطبيعي بعد ساعات والخروج من المستشفى في اليوم التالي.' },
        { name: 'تحليل الحصوة والوقاية من تكرارها', text: 'فحص عينة الحصوة بالأشعة تحت الحمراء وتقديم بروتوكول غذائي وأيورفيدي لمنع عودتها.' }
      ] : [
        { name: 'Low-Dose CT KUB Scan', text: 'Accurately map stone diameter, density (Hounsfield units), and calyx location on Day 1.' },
        { name: 'Incision-Free Laser Dusting', text: 'Flexible digital scope navigates natural urinary tract to vaporize stone into fine sand.' },
        { name: 'Temporary DJ Stent Placement', text: 'Insert soft double-J silicone stent to ensure unobstructed renal drainage and comfort.' },
        { name: 'Walk & Discharge in 24 Hours', text: 'Mobilize within 3 hours, enjoy light meals, and discharge comfortably the next morning.' },
        { name: 'Metabolic Stone Prevention', text: 'Infrared stone analysis paired with dietary and herbal protocols to prevent future stones.' }
      ]
    );
  } else if (slug === 'alopecia-areata-ayurvedic-treatment-kerala') {
    howToSchema = getHowToSchema(
      isRtl ? 'خطوات علاج الثعلبة البقعية بالأيورفيدا في كيرلا' : 'How Ayurvedic Alopecia Regrowth Works in Kerala',
      isRtl ? [
        { name: 'التقييم الأيورفيدي الشامل', text: 'فحص نمط طاقات الجسم (الدوشا) وتحديد درجة التهاب البيتا وتأثر بصيلات الشعر.' },
        { name: 'التطهير والتنقية الداخلية (فيريتشانا)', text: 'طرد السموم الصفراوية والشوائب من الكبد والدم لوقف الهجوم المناعي على البصيلات.' },
        { name: 'جلسات تاكرادارا المهدئة للأعصاب', text: 'سكب تيار اللبن الرائب العشبي على الرأس لخفض الكورتيزول وإخماد حرارة الجهاز العصبي.' },
        { name: 'لبخات شيروليبا وتنشيط البصيلات', text: 'تطبيق معجون الأعشاب الطبية والعلق الطبي المعقم لإذابة الانسدادات وإعادة تدفق الدم للبصيلات.' },
        { name: 'مرحلة إعادة الإنبات وتثبيت النتائج', text: 'تناول المقويات العشبية (راسايانا) لإنبات الشعر الزغبي وتحويله إلى شعر طبيعي كثيف.' }
      ] : [
        { name: 'Initial Ayurvedic Dosha Assessment', text: 'Evaluate body constitution (Prakriti) and map localized Pitta-Rakta follicular inflammation.' },
        { name: 'Systemic Detoxification (Virechana)', text: 'Flush liver toxins and metabolic waste from the bloodstream to halt autoimmune follicular attack.' },
        { name: 'Neuro-Endocrine Calming (Takradhara)', text: 'Continuous herbal buttermilk drizzle to lower cortisol and soothe central nervous system heat.' },
        { name: 'Shirolepa & Follicular Re-Activation', text: 'Potent botanical scalp pastes paired with sterile leech therapy to restore micro-capillary circulation.' },
        { name: 'Rasayana Regrowth Maintenance', text: 'Targeted oral herbal formulations to convert fine vellus sprouts into thick, pigmented terminal hair.' }
      ]
    );
  } else if (slug === 'uk-europe-nhs-waitlist-medical-tourism-kerala') {
    howToSchema = getHowToSchema(
      isRtl ? 'خطوات تجاوز قوائم انتظار NHS وإجراء الجراحة في كيرلا' : 'How UK & European Patients Schedule Surgery in Kerala',
      isRtl ? [
        { name: 'إرسال التقارير الطبية والأشعة', text: 'مشاركة ملفات وأشعة NHS عبر بوابتنا الآمنة للتقييم المجاني من قِبل كبار الجراحين.' },
        { name: 'استلام خطة الأسعار الثابتة', text: 'الحصول على عرض سعر شفاف شامل كافة تكاليف الجراحة والإقامة والنقاهة خلال 48 ساعة.' },
        { name: 'إصدار التأشيرة الطبية السريعة', text: 'استخراج التأشيرة الطبية الإلكترونية للهند عبر الإنترنت خلال 3 إلى 4 أيام بخطاب دعوة معتمد.' },
        { name: 'الوصول والفحوصات في 24 ساعة', text: 'استقبال خاص من المطار وإتمام فحوصات ما قبل الجراحة في اليوم الأول من الوصول.' },
        { name: 'إجراء العملية والنقاهة التأهيلية', text: 'إجراء الجراحة بأحدث الروبوتات الطبية وبدء التأهيل الطبيعي قبل العودة للوطن بتصريح السفر.' }
      ] : [
        { name: 'Submit NHS Medical Reports & Scans', text: 'Share your diagnostic imaging and clinical records for free review by our senior consultant panel.' },
        { name: 'Receive Fixed-Price Treatment Plan', text: 'Get an all-inclusive binding package estimate covering surgery, private suite, and rehab within 48 hours.' },
        { name: 'Fast-Track e-Medical Visa', text: 'Receive our official hospital invitation letter and obtain your Indian e-visa online within 3 to 4 days.' },
        { name: 'Arrival & Pre-Op Diagnostics', text: 'Direct airport reception, pre-anesthesia health screening, and surgical consultation on Day 1.' },
        { name: 'Surgery & Supervised Recovery', text: 'Undergo precision surgery with FDA-approved implants, complete physiotherapy, and fly home safely.' }
      ]
    );
  } else if (slug === 'usa-canada-medical-tourism-kerala-costs-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف ينسق مرضى أمريكا وكندا رحلتهم العلاجية في كيرلا' : 'How US & Canadian Patients Plan Surgery in Kerala',
      isRtl ? [
        { name: 'الاستشارة الافتراضية مع الجراح', text: 'مراجعة التقارير الطبية وتحديد نوع العملية وموعدها عبر مكالمة فيديو مباشرة.' },
        { name: 'استلام فاتورة الباقة المعتمدة', text: 'الحصول على تفصيل شفاف للتكاليف مع رموز التأمين الدولية (ICD-10) المؤهلة لـ HSA/FSA.' },
        { name: 'حجز الطيران والتأشيرة الإلكترونية', text: 'حجز رحلة طيران مريحة واستخراج التأشيرة الطبية الهندية عبر الإنترنت خلال 72 ساعة.' },
        { name: 'الرعاية الجراحية بجناح خاص 1:1', text: 'إجراء العملية في مستشفى معتمد من JCI مع تمريض خاص مفرغ وغرسات أمريكية أصلية.' },
        { name: 'استلام السجل الرقمي وتصريح الطيران', text: 'الحصول على التقارير الرقمية الكاملة وفواتير الخصم الضريبي والعودة للوطن بأمان.' }
      ] : [
        { name: 'Virtual Specialist Consultation', text: 'Review diagnostic scans directly with a chief surgeon via secure high-definition telemedicine.' },
        { name: 'Itemized Transparent Quote', text: 'Receive an all-inclusive binding quote with international ICD-10 codes suitable for HSA/FSA filing.' },
        { name: 'Flight & 72-Hour e-Medical Visa', text: 'Book comfortable one-stop flights and receive instant hospital invitation documentation for visa approval.' },
        { name: 'JCI Surgery & 1:1 Nursing Suite', text: 'Undergo procedure with US FDA-approved implants supported by round-the-clock dedicated nursing.' },
        { name: 'Digital Post-Op Dossier & Fly Home', text: 'Receive digitized operative summaries, high-resolution scans, and formal fit-to-fly documentation.' }
      ]
    );
  } else if (slug === 'oman-to-kerala-medical-tourism-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف تحجز علاجك الطبي من عمان إلى كيرلا' : 'How Omani Patients Book Medical Treatment in Kerala',
      isRtl ? [
        { name: 'مشاركة التقارير واستلام خطاب الدعوة', text: 'أرسل تقاريرك عبر الواتساب (+91 94005 28836) ليُصدر فريقنا خطاب الدعوة الطبي الرسمي خلال 24 ساعة.' },
        { name: 'التقديم على التأشيرة الطبية الإلكترونية', text: 'قدّم على التأشيرة الطبية الهندية عبر الموقع الرسمي بخطاب الدعوة. تصدر عادة خلال 24 إلى 48 ساعة.' },
        { name: 'احجز رحلتك المباشرة من مسقط', text: 'احجز رحلتك على طيران السلام أو الطيران العماني أو إنديا إكسبريس من مسقط (MCT) أو صلالة (SLL) إلى كوزيكود (CCJ) أو كوتشين (COK).' },
        { name: 'الاستقبال في المطار والإيداع في المستشفى', text: 'يستقبلك منسقنا الذي يتحدث العربية بسيارة خاصة من المطار مباشرة إلى المستشفى.' },
        { name: 'العلاج والتعافي والعودة', text: 'أتمم عمليتك وجلسات التأهيل في كيرلا، وعد إلى عمان بتصريح السفر بعد إتمام العلاج.' }
      ] : [
        { name: 'Share Reports & Receive Visa Invitation', text: 'Send your medical files via WhatsApp. We issue the official hospital visa invitation within 24 hours.' },
        { name: 'Apply for e-Medical Visa Online', text: 'Submit the Indian e-Medical Visa application using our invitation letter. Typically approved in 24-48 hours.' },
        { name: 'Book Direct Flight from Muscat', text: 'Book SalamAir, Oman Air, or Air India Express from Muscat (MCT) or Salalah (SLL) to Calicut (CCJ) or Kochi (COK).' },
        { name: 'Airport Reception & Hospital Admission', text: 'Our Arabic-speaking coordinator greets you at the airport and escorts you directly to the hospital.' },
        { name: 'Complete Treatment & Fly Home', text: 'Undergo your surgery or therapy program, complete rehabilitation, and receive fit-to-fly clearance.' }
      ]
    );
  } else if (slug === 'maldives-to-kerala-medical-treatment-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف يسافر المريض المالديفي للعلاج في كيرلا' : 'How Maldivian Patients Travel to Kerala for Treatment',
      isRtl ? [
        { name: 'إرسال التقارير واستلام خطاب الموعد', text: 'أرسل تقاريرك لفريق علاج في كيرلا للحصول على خطاب الموعد الرسمي لتقديمه عند الوصول.' },
        { name: 'السفر بدون تأشيرة مسبقة (حتى 90 يوماً)', text: 'يُعفى مواطنو المالديف من التأشيرة المسبقة للإقامات حتى 90 يوماً. احمل جوازك وخطاب الموعد.' },
        { name: 'احجز رحلتك المباشرة من مالي (75 دقيقة)', text: 'احجز رحلتك المباشرة مع طيران المالديف أو إنديجو من مطار فيلانا (MLE) إلى تريفاندروم (TRV) أو كوتشين (COK).' },
        { name: 'التنسيق مع برنامج اساندا (إن وجد)', text: 'إذا كانت حالتك مؤهلة لبرنامج اساندا، تأكد من حصولك على نموذج الإحالة الطبية الرسمي من طبيبك في المالديف.' },
        { name: 'الاستقبال وبدء العلاج', text: 'يستقبلك فريقنا في المطار ويرافقك لجميع مواعيد الاستشارة والفحوصات حتى إتمام العلاج.' }
      ] : [
        { name: 'Share Reports & Receive Appointment Letter', text: 'Send your medical records to TreatInKerala. Receive the official hospital appointment letter within 24 hours.' },
        { name: 'Travel Visa-Free (Up to 90 Days)', text: 'Maldivian nationals enter India visa-free for medical stays up to 90 days. Bring your passport and appointment letter.' },
        { name: 'Book 75-Minute Direct Flight from Malé', text: 'Book Maldivian Airlines or IndiGo from Velana (MLE) to Trivandrum (TRV) or Kochi (COK).' },
        { name: 'Coordinate Aasandha Approval (if applicable)', text: 'If using Aasandha insurance, secure your official overseas referral form from your Maldivian specialist.' },
        { name: 'Airport Reception & Full Care', text: 'Our team receives you at the airport and coordinates all consultations, procedures, and follow-up visits.' }
      ]
    );
  } else if (slug === 'uae-dubai-to-kerala-medical-tourism-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف ينظم المريض من الإمارات رحلته العلاجية إلى كيرلا' : 'How UAE Residents Plan Their Medical Trip to Kerala',
      isRtl ? [
        { name: 'مشاركة التقارير واستلام خطاب التأشيرة', text: 'أرسل ملفاتك الطبية لنصدر خطاب الدعوة الرسمي لاستخراج التأشيرة الطبية الإلكترونية خلال 24 ساعة.' },
        { name: 'التقديم على التأشيرة الطبية الإلكترونية', text: 'قدّم على التأشيرة الهندية عبر الإنترنت. تصدر خلال 24 إلى 48 ساعة بموجب خطاب الدعوة.' },
        { name: 'احجز رحلتك المباشرة من دبي أو أبوظبي', text: 'احجز رحلتك على طيران الإمارات أو فلاي دبي أو الاتحاد أو العربية للطيران من DXB أو AUH أو SHJ إلى CCJ أو COK.' },
        { name: 'المرحلة الأولى: الجراحة أو علاج الأسنان (الأيام 1-5)', text: 'أتمم تدخلك الجراحي أو ترميم أسنانك في المستشفى المعتمد بإشراف جراح دولي متخصص.' },
        { name: 'المرحلة الثانية: النقاهة الأيورفيدية (الأيام 6-14) والعودة', text: 'انتقل إلى منتجع الأيورفيدا للتعافي الشامل، ثم عد إلى الإمارات بكامل النشاط والحيوية.' }
      ] : [
        { name: 'Share Reports & Receive Visa Invitation', text: 'Submit your medical files and we issue the official hospital invitation for e-Medical Visa within 24 hours.' },
        { name: 'Apply for Indian e-Medical Visa Online', text: 'Submit the e-Medical Visa application. Approval typically arrives electronically within 24-48 hours.' },
        { name: 'Book Direct Flight from Dubai or Abu Dhabi', text: 'Book Emirates, flydubai, Etihad, or Air Arabia from DXB / AUH / SHJ to Calicut (CCJ) or Kochi (COK).' },
        { name: 'Phase 1: Surgery or Dental Restoration (Days 1–5)', text: 'Complete your procedure in a JCI-accredited facility under the care of internationally trained surgeons.' },
        { name: 'Phase 2: Ayurvedic Recovery & Return (Days 6–14)', text: 'Transition to a medically supervised Ayurvedic retreat, then fly home revitalized to the UAE.' }
      ]
    );
  }

  let faqSchema: Record<string, unknown> | null = null;
  if (post.faqs && post.faqs.length > 0) {
    faqSchema = getFAQSchema(
      post.faqs.map(f => ({
        q: isRtl ? f.qAr : f.q,
        a: isRtl ? f.aAr : f.a
      }))
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="pt-36 pb-16 lg:pt-44 lg:pb-24 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1B4332] font-semibold text-sm min-h-[44px] transition-colors"
          >
            {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            <span>{locale === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs space-y-6">
          <div className="space-y-4">
            <span className="inline-block bg-[#FAF7F2] border border-[#1B4332]/15 text-[#1B4332] px-3.5 py-1 rounded-md text-xs font-semibold">
              {category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-display text-text-dark leading-tight tracking-tight">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-b border-slate-100 pb-6 pt-2">
              <span className="flex items-center gap-1.5 text-text-dark">
                <User className="h-4 w-4 text-[#1B4332]" />
                <span>{locale === 'ar' ? 'بواسطة محسنة تي بي' : 'By Muhsina TP'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#D4A96A]" />
                <span>{post.date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#D4A96A]" />
                <span>{post.readTime}</span>
              </span>
            </div>

            {post.image && (
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden my-6 border border-slate-100 bg-slate-50">
                <img
                  src={post.image}
                  alt={isRtl ? post.titleAr : post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {aeoSummary && (
            <div className="bg-[#F0FDF4] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#1B4332] rounded-2xl p-6 shadow-2xs my-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[#1B4332] font-bold text-sm">
                <Zap className="h-4.5 w-4.5 fill-[#1B4332] text-[#1B4332]" />
                <span>{locale === 'ar' ? 'ملخص سريع (إجابة الذكاء الاصطناعي المباشرة)' : 'AI Quick Answer'}</span>
              </div>
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                {aeoSummary}
              </p>
            </div>
          )}

          {/* Long-form content */}
          <div className="border-b border-slate-100 pb-10">
            <RichContent content={content} />

            <div className="bg-amber-50/70 border border-amber-200/60 p-5 rounded-2xl text-xs sm:text-sm text-amber-900 mt-10 leading-relaxed">
              {locale === 'ar'
                ? 'ملاحظة: المعلومات الواردة في هذه المقالة هي لأغراض إرشادية وتثقيفية فقط، ولا تحل محل الاستشارة الطبية المباشرة من الطبيب المعالج.'
                : 'Note: The medical statistics and estimates presented are for educational purposes. Personal treatment costs are generated based on your diagnostic reports.'}
            </div>

            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100 space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-dark flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#1B4332] shrink-0" />
                  <span>{locale === 'ar' ? 'الأسئلة الشائعة والأجوبة الطبية المباشرة' : 'Frequently Asked Questions (Clinical Answers)'}</span>
                </h3>
                <div className="space-y-4">
                  {post.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2.5">
                      <h4 className="text-base sm:text-lg font-bold text-[#1B4332] leading-snug">
                        {isRtl ? faq.qAr : faq.q}
                      </h4>
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        {isRtl ? faq.aAr : faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Internal Link Cards — Treatments / Hospitals / Country Hubs */}
          {internalLinks.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-bold font-display text-text-dark flex items-center gap-2 mb-5">
                <ExternalLink className="h-5 w-5 text-[#1B4332] shrink-0" />
                <span>{isRtl ? 'صفحات ذات صلة — العلاجات والمستشفيات والخدمات' : 'Related Treatments, Hospitals & Services'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as Parameters<typeof Link>[0]['href']}
                    className="group block bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-[#1B4332]/40 hover:bg-white hover:shadow-2xs transition-all duration-200"
                  >
                    <p className="font-bold text-[#1B4332] text-sm group-hover:text-[#2D6A4F] transition-colors leading-snug">
                      {isRtl ? link.labelAr : link.labelEn}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {isRtl ? link.descAr : link.descEn}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Contextual Product Referral Callout (iHerb Rewards) */}
          <BlogRecoveryCallout
            locale={locale}
            products={getRecoveryProductsForBlog(slug, post.category)}
          />

          {/* Inline CTA */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left rtl:sm:text-right">
              <h4 className="font-bold text-lg text-text-dark">
                {locale === 'ar' ? 'هل ترغب في الحصول على استشارة مخصصة؟' : 'Need details for your condition?'}
              </h4>
              <p className="text-sm text-text-muted leading-relaxed max-w-sm">
                {locale === 'ar'
                  ? 'أرسل لنا تقاريرك الطبية وسنعد لك تقرير الأسعار المناسب لحالتك مجاناً وبدون التزام.'
                  : 'Share your records with our panel doctors and receive a free estimate within 48 hours.'}
              </p>
            </div>
            <Link
              href="/get-estimate"
              className="btn-primary text-base px-6 py-3 whitespace-nowrap shadow-sm hover:shadow-md inline-block shrink-0 cursor-pointer"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-text-dark pb-2 border-b border-slate-200 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#1B4332]" />
              <span>{locale === 'ar' ? 'مقالات ذات صلة' : 'You May Also Find These Useful'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#1B4332]/40 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs text-[#1B4332] font-semibold">
                      {isRtl ? rPost.categoryAr : rPost.category}
                    </span>
                    <h4 className="font-bold text-text-dark text-base hover:text-[#1B4332] transition-colors leading-snug">
                      <Link href={`/blog/${rPost.slug}`}>
                        {isRtl ? rPost.titleAr : rPost.title}
                      </Link>
                    </h4>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-text-muted">
                    <span>{rPost.date}</span>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="text-[#1B4332] hover:text-[#2D6A4F] font-bold min-h-[44px] flex items-center"
                    >
                      {locale === 'ar' ? 'تفاصيل' : 'Details'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
