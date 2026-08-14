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
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
            {locale === 'ar' ? 'المدونة الطبية والإرشادية' : 'Guides & Expert Resources'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' ? 'دليل السياحة العلاجية والتعافي في كيرلا' : 'TreatInKerala Travel & Health Guide'}
          </h1>
          <p className="text-lg text-text-muted">
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

