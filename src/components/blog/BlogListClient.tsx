'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { BlogPost } from '@/lib/data';
import { Calendar, Clock, ArrowRight, User, BookOpen, Search, X, Sparkles } from 'lucide-react';

interface Props {
  locale: string;
  posts: BlogPost[];
}

interface CategoryPillar {
  id: string;
  labelEn: string;
  labelAr: string;
  matches: (post: BlogPost) => boolean;
}

const CATEGORY_PILLARS: CategoryPillar[] = [
  {
    id: 'all',
    labelEn: 'All Guides',
    labelAr: 'جميع المقالات',
    matches: () => true,
  },
  {
    id: 'ayurveda',
    labelEn: '🌿 Ayurveda & Wellness',
    labelAr: '🌿 الأيورفيدا والاستشفاء',
    matches: (p) => {
      const c = `${p.category} ${p.slug}`.toLowerCase();
      return (
        c.includes('ayurveda') ||
        c.includes('wellness') ||
        c.includes('kottakkal') ||
        c.includes('panchakarma') ||
        c.includes('herbs') ||
        c.includes('recovery') ||
        c.includes('alopecia') ||
        c.includes('stroke')
      );
    },
  },
  {
    id: 'surgeries',
    labelEn: '🏥 Surgeries & Clinical Care',
    labelAr: '🏥 الجراحات والعلاجات',
    matches: (p) => {
      const c = `${p.category} ${p.slug}`.toLowerCase();
      return (
        c.includes('ortho') ||
        c.includes('cardiac') ||
        c.includes('bypass') ||
        c.includes('knee') ||
        c.includes('spine') ||
        c.includes('dental') ||
        c.includes('cancer') ||
        c.includes('oncology') ||
        c.includes('fertility') ||
        c.includes('ivf') ||
        c.includes('bariatric') ||
        c.includes('eye') ||
        c.includes('lasik') ||
        c.includes('urology') ||
        c.includes('kidney')
      );
    },
  },
  {
    id: 'international',
    labelEn: '🌍 GCC & Country Guides',
    labelAr: '🌍 أدلة المرضى الدوليين',
    matches: (p) => {
      const c = `${p.category} ${p.slug}`.toLowerCase();
      return (
        c.includes('saudi') ||
        c.includes('uae') ||
        c.includes('dubai') ||
        c.includes('oman') ||
        c.includes('maldives') ||
        c.includes('gcc') ||
        c.includes('uk') ||
        c.includes('usa') ||
        c.includes('countries') ||
        c.includes('international')
      );
    },
  },
  {
    id: 'travel-costs',
    labelEn: '✈️ Travel, Visa & Costs',
    labelAr: '✈️ السفر، التأشيرة والتكاليف',
    matches: (p) => {
      const c = `${p.category} ${p.slug}`.toLowerCase();
      return (
        c.includes('visa') ||
        c.includes('pack') ||
        c.includes('logistics') ||
        c.includes('travel') ||
        c.includes('cost') ||
        c.includes('comparison') ||
        c.includes('turkey') ||
        c.includes('thailand') ||
        c.includes('safe') ||
        c.includes('reviews') ||
        c.includes('checklists')
      );
    },
  },
];

export default function BlogListClient({ locale, posts }: Props) {
  const isRtl = locale === 'ar';
  const [selectedPillarId, setSelectedPillarId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reverse posts so newest/latest guides appear first
  const sortedPosts = useMemo(() => {
    return [...posts].reverse();
  }, [posts]);

  // Filter posts by active pillar + search query
  const filteredPosts = useMemo(() => {
    const activePillar = CATEGORY_PILLARS.find((p) => p.id === selectedPillarId) || CATEGORY_PILLARS[0];
    const query = searchQuery.trim().toLowerCase();

    return sortedPosts.filter((post) => {
      // 1. Pillar match
      const matchesPillar = activePillar.id === 'all' || activePillar.matches(post);
      if (!matchesPillar) return false;

      // 2. Search query match
      if (!query) return true;
      const searchableText = `${post.title} ${post.titleAr} ${post.excerpt} ${post.excerptAr} ${post.category} ${post.slug}`.toLowerCase();
      return searchableText.includes(query);
    });
  }, [sortedPosts, selectedPillarId, searchQuery]);

  // Pillar counts
  const pillarCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORY_PILLARS.forEach((pillar) => {
      if (pillar.id === 'all') {
        counts[pillar.id] = sortedPosts.length;
      } else {
        counts[pillar.id] = sortedPosts.filter((p) => pillar.matches(p)).length;
      }
    });
    return counts;
  }, [sortedPosts]);

  const featuredPost = searchQuery ? null : filteredPosts[0];
  const regularPosts = searchQuery ? filteredPosts : filteredPosts.slice(1);

  return (
    <div className="space-y-10">
      
      {/* ── SEARCH & CLEAN PILLAR BAR ── */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4 max-w-4xl mx-auto">
        
        {/* Instant Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isRtl
                ? 'ابحث في المقالات (مثال: كوتاكال، تغيير مفصل الركبة، التأشيرة الطبية، السعودية)...'
                : 'Search guides (e.g. Kottakkal, Knee replacement, Medical visa, Saudi Arabia)...'
            }
            className="w-full ps-11 pe-10 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] text-sm bg-slate-50/60 hover:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 5 Core Pillars (Clean, Organized, Horizontal Scroll on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none justify-start sm:justify-center">
          {CATEGORY_PILLARS.map((pillar) => {
            const isSelected = selectedPillarId === pillar.id;
            const count = pillarCounts[pillar.id] || 0;

            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 shrink-0 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <span>{isRtl ? pillar.labelAr : pillar.labelEn}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Result Indicator when searching or filtering */}
      {(searchQuery || selectedPillarId !== 'all') && (
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 max-w-4xl mx-auto px-2">
          <span>
            {isRtl
              ? `تم العثور على ${filteredPosts.length} مقال`
              : `Showing ${filteredPosts.length} of ${sortedPosts.length} guides`}
            {searchQuery && (
              <span className="font-semibold text-slate-800 ms-1">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </span>
          <button
            onClick={() => {
              setSelectedPillarId('all');
              setSearchQuery('');
            }}
            className="text-emerald-700 hover:underline font-semibold cursor-pointer"
          >
            {isRtl ? 'إعادة ضبط التصفية' : 'Reset filters'}
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            {isRtl ? 'لم يتم العثور على مقالات مطابقة' : 'No matching articles found'}
          </h3>
          <p className="text-sm text-slate-500">
            {isRtl
              ? 'جرب البحث بكلمة أخرى أو اختر قسماً مختلفاً من الأعلى.'
              : 'Try searching with different keywords or clear your active category filter.'}
          </p>
          <button
            onClick={() => {
              setSelectedPillarId('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-full bg-[#1B4332] text-white text-xs sm:text-sm font-semibold hover:bg-[#2D6A4F] transition-colors cursor-pointer"
          >
            {isRtl ? 'عرض جميع المقالات' : 'View All Guides'}
          </button>
        </div>
      )}

      {/* Featured Post Card (shown when not actively searching) */}
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
