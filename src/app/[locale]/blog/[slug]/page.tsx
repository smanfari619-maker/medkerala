import React from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BLOG_POSTS } from '@/lib/data';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, BookOpen, Zap } from 'lucide-react';
import { Metadata } from 'next';
import { getBreadcrumbSchema, getHowToSchema } from '@/lib/schemas';

// ── Inline rich-text renderer ────────────────────────────────
// Converts a plain string with lightweight markdown conventions into
// styled React elements. Supports:
//   ## H2 headings
//   ### H3 headings
//   **bold** inline
//   - bullet list items
//   blank lines → paragraph breaks
function RichContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

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

  const parseBold = (text: string) =>
    text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[#1B4332]">$1</strong>');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ')) {
      flushBullets(`bl-${idx}`);
      elements.push(
        <h2 key={idx} className="text-2xl font-bold text-[#1B4332] mt-10 mb-4 pb-2 border-b border-slate-100 font-sans">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushBullets(`bl-${idx}`);
      elements.push(
        <h3 key={idx} className="text-lg font-bold text-[#2D6A4F] mt-6 mb-2 font-sans">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      bulletBuffer.push(trimmed.slice(2));
    } else if (trimmed === '') {
      flushBullets(`bl-${idx}`);
    } else {
      flushBullets(`bl-${idx}`);
      elements.push(
        <p key={idx} className="text-slate-700 text-base leading-[1.85] mb-0"
          dangerouslySetInnerHTML={{ __html: parseBold(trimmed) }}
        />
      );
    }
  });

  flushBullets('final');

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

  // Get related posts (excluding current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: isRtl ? post.excerptAr : post.excerpt,
    articleSection: category,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Muhsina TP',
      jobTitle: 'Chief Medical Coordinator',
      url: 'https://treatinkerala.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TreatInKerala',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://treatinkerala.com/${locale}/blog/${slug}`,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRtl ? 'الرئيسية' : 'Home', url: `https://treatinkerala.com/${locale}` },
    { name: isRtl ? 'المدونة' : 'Blog', url: `https://treatinkerala.com/${locale}/blog` },
    { name: title, url: `https://treatinkerala.com/${locale}/blog/${slug}` }
  ]);

  let howToSchema: any = null;
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
  } else if (slug === 'joint-replacement-kerala-gcc-guide') {
    howToSchema = getHowToSchema(
      isRtl ? 'كيف تخطط لاستبدال المفاصل في كيرلا' : 'How to Plan Joint Replacement in Kerala',
      isRtl ? [
        { name: 'الاستشارة والتقييم', text: 'أرسل أشعة X-ray للركبة أو الورك لتقييم الحالة مجاناً.' },
        { name: 'اختيار الغرسات الطبية', text: 'يستخدم جراحونا غرسات التيتانيوم المعتمدة من FDA الأمريكية.' },
        { name: 'السفر والإقامة', text: 'رحلات مباشرة قصيرة (3.5 ساعات من مسقط) وإقامات ملائمة للثقافة الخليجية.' },
        { name: 'العملية الجراحية', text: 'تتم الجراحة في مستشفيات حاصلة على اعتماد JCI.' },
        { name: 'التأهيل ما بعد الجراحة', text: 'جلسات علاج طبيعي يومية لاستعادة الحركة قبل العودة للوطن.' }
      ] : [
        { name: 'Initial Consultation', text: 'Share your X-rays for a free preliminary evaluation by our orthopedic surgeons.' },
        { name: 'Implant Selection', text: 'We exclusively use US FDA-approved titanium implants for long-lasting results.' },
        { name: 'Travel & Accommodation', text: 'Enjoy short 3.5-hour direct flights from GCC and culturally customized Halal stays.' },
        { name: 'The Surgical Procedure', text: 'Surgery is performed at a JCI-accredited facility with advanced modular operating theatres.' },
        { name: 'Post-Surgery Rehabilitation', text: 'Undergo customized daily physiotherapy for 10-14 days to restore pain-free mobility.' }
      ]
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
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-primary-green font-bold text-base min-h-[44px]"
          >
            {isRtl ? <ArrowRight className="h-4.5 w-4.5" /> : <ArrowLeft className="h-4.5 w-4.5" />}
            <span>{locale === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D4A96A]/35 shadow-xl space-y-6">
          <div className="space-y-4">
            <span className="inline-block bg-[#FAF7F2] border border-[#D4A96A]/35 text-[#D4A96A] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-display text-primary-dark leading-tight tracking-tight">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-muted border-b border-slate-100 pb-6 pt-2">
              <span className="flex items-center gap-1">
                <User className="h-4.5 w-4.5 text-primary-green" />
                <span>{locale === 'ar' ? 'بواسطة محسنة تي بي' : 'By Muhsina TP'}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
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
            <div className="bg-slate-50 border border-primary-green/20 rounded-2xl p-6 shadow-sm my-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <Zap className="h-5 w-5 fill-primary-green" />
                <span>{locale === 'ar' ? 'ملخص سريع (إجابة الذكاء الاصطناعي)' : 'AI Quick Answer'}</span>
              </div>
              <p className="text-text-dark text-lg leading-relaxed font-medium">
                {aeoSummary}
              </p>
            </div>
          )}

          {/* Long-form content */}
          <div className="border-b border-slate-100 pb-10">
            <RichContent content={content} />

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border-l-4 border-[#2D6A4F] text-sm text-slate-500 mt-10 leading-relaxed">
              {locale === 'ar'
                ? 'ملاحظة: المعلومات الواردة في هذه المقالة هي لأغراض إرشادية وتثقيفية فقط، ولا تحل محل الاستشارة الطبية المباشرة من الطبيب المعالج.'
                : 'Note: The medical statistics and estimates presented are for educational purposes. Personal treatment costs are generated based on your diagnostic reports.'}
            </div>
          </div>

          {/* Inline CTA */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#D4A96A]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
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
              className="bg-primary-green hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full text-base whitespace-nowrap shadow-sm hover:shadow-md transition-all duration-300 min-h-[44px] inline-block shrink-0 cursor-pointer"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-primary-dark pb-2 border-b border-[#D4A96A]/35 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary-green" />
              <span>{locale === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:border-[#D4A96A]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs text-accent-gold font-semibold uppercase">
                      {isRtl ? rPost.categoryAr : rPost.category}
                    </span>
                    <h4 className="font-bold text-text-dark text-base hover:text-primary-green transition-colors">
                      <Link href={`/blog/${rPost.slug}`}>
                        {isRtl ? rPost.titleAr : rPost.title}
                      </Link>
                    </h4>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-text-muted">
                    <span>{rPost.date}</span>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="text-primary-green hover:text-primary-dark font-bold min-h-[44px] flex items-center"
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
