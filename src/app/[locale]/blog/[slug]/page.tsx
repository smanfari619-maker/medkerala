import React from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BLOG_POSTS } from '@/lib/data';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

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
    title: `${title} | MedKerala Blog`,
    description,
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

  // Get related posts (excluding current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
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
                <span>{locale === 'ar' ? 'فريق ميدكيرلا الطبي' : 'MedKerala Medical Panel'}</span>
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
          </div>

          {/* Long-form content */}
          <div className="text-text-dark text-lg leading-relaxed font-sans space-y-6 border-b border-slate-100 pb-10">
            <p>{content}</p>
            
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border-l-4 border-primary-green text-base text-text-muted mt-8 leading-relaxed">
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
  );
}
