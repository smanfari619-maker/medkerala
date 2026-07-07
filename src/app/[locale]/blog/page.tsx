import React from 'react';
import { Link } from '@/i18n/routing';
import { BLOG_POSTS } from '@/lib/data';
import { Calendar, Clock, BookOpen, ArrowRight, User } from 'lucide-react';


import { Metadata } from 'next';
import { getBreadcrumbSchema } from '@/lib/schemas';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'المدونة الطبية والتعليمية | علاج في كيرلا' : 'Medical Blog & Resources | TreatInKerala',
    description: isAr 
      ? 'نصائح طبية وإرشادات صحية موثوقة من أطباء علاج في كيرلا حول السياحة العلاجية والتعافي في كيرلا.' 
      : 'Explore healthcare guides, medical tourism tips, and wellness articles written by our medical coordinators in Kerala.',
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

  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
            {locale === 'ar' ? 'المدونة الطبية والإرشادية' : 'Guides & Expert Resources'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' ? 'دليل السياحة العلاجية والتعافي في كيرلا' : 'TreatInKerala Travel & Health Guide'}
          </h1>
          <p className="text-lg text-text-muted">
            {locale === 'ar'
              ? 'مقالات طبية متخصصة، ونصائح للتحضير للسفر، وتفاصيل مقارنة الأسعار وإرشادات التأشيرة الطبية للهند.'
              : 'Expert advice, treatment cost comparisons, medical visa guides, and Kerala packing checklists.'}
          </p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="bg-white rounded-3xl border border-[#D4A96A]/35 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-16 grid grid-cols-1 lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-muted">
                  <span className="bg-[#FAF7F2] border border-[#D4A96A]/35 text-[#D4A96A] px-3 py-1 rounded-full uppercase tracking-wider">
                    {isRtl ? featuredPost.categoryAr : featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-[#D4A96A]" />
                    <span>{featuredPost.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[#D4A96A]" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-text-dark hover:text-primary-green transition-colors duration-200">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {isRtl ? featuredPost.titleAr : featuredPost.title}
                  </Link>
                </h2>

                <p className="text-text-muted text-base sm:text-lg leading-relaxed line-clamp-3">
                  {isRtl ? featuredPost.excerptAr : featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <User className="h-4.5 w-4.5 text-primary-green" />
                  <span>{locale === 'ar' ? 'بواسطة علاج في كيرلا' : 'By TreatInKerala'}</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-primary-green hover:text-primary-dark transition-colors duration-200 min-h-[44px]"
                >
                  <span>{locale === 'ar' ? 'اقرأ المقال بالكامل' : 'Read Article'}</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
            {/* Visual placeholder box */}
            <div className="lg:col-span-4 bg-primary-dark border-l border-[#D4A96A]/35 flex items-center justify-center p-8 text-center min-h-[220px]">
              <BookOpen className="h-16 w-16 text-[#D4A96A]" />
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-3xl p-8 border border-[#D4A96A]/35 hover:border-primary-green/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3.5 text-xs text-text-muted font-semibold">
                  <span className="bg-[#FAF7F2] border border-[#D4A96A]/35 text-[#D4A96A] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {isRtl ? post.categoryAr : post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-dark group-hover:text-primary-green transition-colors duration-200">
                  <Link href={`/blog/${post.slug}`}>
                    {isRtl ? post.titleAr : post.title}
                  </Link>
                </h3>

                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                  {isRtl ? post.excerptAr : post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-primary-green hover:text-primary-dark font-bold min-h-[44px]"
                >
                  <span>{locale === 'ar' ? 'تفاصيل' : 'Details'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
