'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { BlogPost } from '@/lib/data';
import { Calendar, Clock, ArrowRight, User, BookOpen, Sparkles, Filter } from 'lucide-react';

interface Props {
  locale: string;
  posts: BlogPost[];
}

export default function BlogListClient({ locale, posts }: Props) {
  const isRtl = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Reverse posts so newest/latest guides appear first
  const sortedPosts = useMemo(() => {
    return [...posts].reverse();
  }, [posts]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (isRtl ? p.categoryAr : p.category) {
        cats.add(isRtl ? p.categoryAr : p.category);
      }
    });
    return Array.from(cats);
  }, [posts, isRtl]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return sortedPosts;
    return sortedPosts.filter((p) => {
      const cat = isRtl ? p.categoryAr : p.category;
      return cat === selectedCategory;
    });
  }, [sortedPosts, selectedCategory, isRtl]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#1B4332] text-white shadow-sm'
              : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          {isRtl ? 'جميع المقالات' : 'All Articles'} ({sortedPosts.length})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured Post Card */}
      {featuredPost && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
          <div className="p-8 sm:p-10 lg:col-span-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3.5 text-xs font-semibold text-text-muted">
                <span className="bg-[#FAF7F2] border border-[#1B4332]/15 text-[#1B4332] px-3 py-1 rounded-md">
                  {isRtl ? featuredPost.categoryAr : featuredPost.category}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-[#D4A96A]" />
                  <span>{featuredPost.date}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-[#D4A96A]" />
                  <span>{featuredPost.readTime}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-text-dark group-hover:text-[#1B4332] transition-colors duration-200 leading-snug">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {isRtl ? featuredPost.titleAr : featuredPost.title}
                </Link>
              </h2>

              <p className="text-text-muted text-base leading-relaxed line-clamp-3">
                {isRtl ? featuredPost.excerptAr : featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <User className="h-4 w-4 text-[#1B4332]" />
                <span>{locale === 'ar' ? 'بواسطة محسنة تي بي' : 'By Muhsina TP'}</span>
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-1.5 font-bold text-[#1B4332] hover:text-[#2D6A4F] transition-colors duration-200 min-h-[44px]"
              >
                <span>{locale === 'ar' ? 'اقرأ المقال بالكامل' : 'Read Full Guide'}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Visual Cover image banner */}
          <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-100">
            {featuredPost.image ? (
              <img
                src={featuredPost.image}
                alt={isRtl ? featuredPost.titleAr : featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-[#1B4332] flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-[#D4A96A]" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-[#1B4332]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {post.image && (
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-100">
                    <img
                      src={post.image}
                      alt={isRtl ? post.titleAr : post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3.5 text-xs text-text-muted font-semibold">
                    <span className="bg-[#FAF7F2] border border-[#1B4332]/15 text-[#1B4332] px-2.5 py-0.5 rounded-md">
                      {isRtl ? post.categoryAr : post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-[#D4A96A]" />
                      <span>{post.date}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-dark group-hover:text-[#1B4332] transition-colors duration-200 line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {isRtl ? post.titleAr : post.title}
                    </Link>
                  </h3>

                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                    {isRtl ? post.excerptAr : post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Clock className="h-3.5 w-3.5 text-[#D4A96A]" />
                  <span>{post.readTime}</span>
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-[#1B4332] hover:text-[#2D6A4F] font-bold min-h-[44px]"
                >
                  <span>{locale === 'ar' ? 'قراءة الدليل' : 'Read Guide'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
