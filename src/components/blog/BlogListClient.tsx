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
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#2D6A4F] text-white shadow-sm'
              : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-[#D4A96A]/40'
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
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-[#D4A96A]/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured Post Card */}
      {featuredPost && (
        <div className="bg-white rounded-3xl border border-[#D4A96A]/35 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
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
                <span>{locale === 'ar' ? 'بواسطة محسنة تي بي' : 'By Muhsina TP'}</span>
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-1.5 font-bold text-primary-green hover:text-primary-dark transition-colors duration-200 min-h-[44px]"
              >
                <span>{locale === 'ar' ? 'اقرأ المقال بالكامل' : 'Read Full Guide'}</span>
                <ArrowRight className="h-4.5 w-4.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Visual Cover image banner */}
          <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-[#D4A96A]/35 bg-slate-100">
            {featuredPost.image ? (
              <img
                src={featuredPost.image}
                alt={isRtl ? featuredPost.titleAr : featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-primary-dark flex items-center justify-center">
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
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A96A]/35 hover:border-primary-green/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {post.image && (
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                    <img
                      src={post.image}
                      alt={isRtl ? post.titleAr : post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

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

                  <h3 className="text-xl font-bold text-text-dark group-hover:text-primary-green transition-colors duration-200 line-clamp-2">
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
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-primary-green hover:text-primary-dark font-bold min-h-[44px]"
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
