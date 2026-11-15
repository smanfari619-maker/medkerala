import React from 'react';
import { BLOG_POSTS } from '@/lib/data';
import { Metadata } from 'next';
import { getBreadcrumbSchema } from '@/lib/schemas';
import BlogListClient from '@/components/blog/BlogListClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'المدونة الطبية ودليل التعافي | علاج في كيرلا' : 'Medical Blog & Recovery Guides | TreatInKerala',
    description: isAr 
      ? 'مقالات طبية متخصصة، وأدلة المكملات الغذائية بعد الجراحة، ومقارنات التكاليف والتعافي في كيرلا.' 
      : 'Explore healthcare guides, post-surgery recovery supplements, medical tourism cost comparisons, and wellness articles written by our medical coordinators in Kerala.',
    alternates: {
      canonical: isAr ? '/ar/blog' : '/en/blog',
      languages: {
        en: '/en/blog',
        ar: '/ar/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRtl ? 'الرئيسية' : 'Home', url: `https://treatinkerala.com/${locale}` },
    { name: isRtl ? 'المدونة' : 'Blog', url: `https://treatinkerala.com/${locale}/blog` }
  ]);

  // Keep the client-side guide finder lean: full article markdown belongs only
  // on the individual article route, not in the listing page's RSC payload.
  const guideCards = BLOG_POSTS.map(({ slug, title, titleAr, excerpt, excerptAr, date, category, categoryAr, readTime, image }) => ({
    slug, title, titleAr, excerpt, excerptAr, date, category, categoryAr, readTime, image,
  }));

  return (
    <div className="min-h-screen bg-[#FAF8F3] pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-5 sm:mb-11 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#527560]">
              <span className="h-px w-6 bg-[#B98745]" aria-hidden="true" />
              <span>{locale === 'ar' ? 'مكتبة المرضى' : 'The patient library'}</span>
            </div>
            <h1 className="font-display text-[2.25rem] font-semibold leading-[1.12] tracking-[-0.045em] text-[#17251d] sm:text-5xl lg:text-[3.65rem]">
              {locale === 'ar' ? 'دليل السياحة العلاجية والتعافي في كيرلا' : 'Clear guidance for your care journey'}
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:pb-1">
            {locale === 'ar'
              ? 'مقالات طبية متخصصة، وأدلة التعافي، ومقارنات التكاليف وإرشادات السفر لمساعدتك على التخطيط بثقة.'
              : 'Practical guides to treatment, recovery, costs and travel—so you and your family can plan with confidence.'}
          </p>
        </div>

        {/* Interactive Client Listing with Category Filter */}
        <BlogListClient locale={locale} posts={guideCards} />
      </div>
    </div>
  );
}

