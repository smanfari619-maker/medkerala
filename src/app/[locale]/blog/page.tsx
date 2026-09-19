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

  return (
    <div className="pt-36 pb-16 lg:pt-44 lg:pb-24 bg-[#FAF7F2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/8 text-[#1B4332] text-xs font-bold">
            <span>{locale === 'ar' ? 'المدونة الطبية والإرشادية' : 'Guides & Expert Resources'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display text-text-dark tracking-tight leading-tight">
            {locale === 'ar' ? 'دليل السياحة العلاجية والتعافي في كيرلا' : 'TreatInKerala Travel & Health Guide'}
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'مقالات طبية متخصصة، وأدلة المكملات الغذائية للتعافي، وتفاصيل مقارنة الأسعار وإرشادات التأشيرة الطبية للهند.'
              : 'Expert clinical guides, post-surgery recovery supplements, treatment cost comparisons, and travel logistics.'}
          </p>
        </div>

        {/* Interactive Client Listing with Category Filter */}
        <BlogListClient locale={locale} posts={BLOG_POSTS} />
      </div>
    </div>
  );
}

