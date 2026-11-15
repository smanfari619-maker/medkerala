'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, BookOpen, Calendar, Clock, Search, X } from 'lucide-react';

export interface BlogCardData {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  date: string;
  category: string;
  categoryAr: string;
  readTime: string;
  image?: string;
}

interface Props {
  locale: string;
  posts: BlogCardData[];
}

interface CategoryPillar {
  id: string;
  labelEn: string;
  labelAr: string;
  matches: (post: BlogCardData) => boolean;
}

const CATEGORY_PILLARS: CategoryPillar[] = [
  { id: 'all', labelEn: 'All guides', labelAr: 'جميع الأدلة', matches: () => true },
  {
    id: 'ayurveda',
    labelEn: 'Ayurveda & wellness',
    labelAr: 'الأيورفيدا والعافية',
    matches: (post) => /ayurveda|wellness|kottakkal|panchakarma|herbs|recovery|alopecia|stroke/i.test(`${post.category} ${post.slug}`),
  },
  {
    id: 'surgeries',
    labelEn: 'Treatments & care',
    labelAr: 'العلاجات والرعاية',
    matches: (post) => /ortho|cardiac|bypass|knee|spine|dental|cancer|oncology|fertility|ivf|bariatric|eye|lasik|urology|kidney/i.test(`${post.category} ${post.slug}`),
  },
  {
    id: 'international',
    labelEn: 'Patient destinations',
    labelAr: 'وجهات المرضى',
    matches: (post) => /saudi|uae|dubai|oman|maldives|gcc|uk|usa|countries|international/i.test(`${post.category} ${post.slug}`),
  },
  {
    id: 'travel-costs',
    labelEn: 'Travel & costs',
    labelAr: 'السفر والتكاليف',
    matches: (post) => /visa|pack|logistics|travel|cost|comparison|turkey|thailand|safe|reviews|checklists/i.test(`${post.category} ${post.slug}`),
  },
];

const PAGE_SIZE = 8;

export default function BlogListClient({ locale, posts }: Props) {
  const isRtl = locale === 'ar';
  const [selectedPillarId, setSelectedPillarId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortedPosts = useMemo(() => [...posts].reverse(), [posts]);
  const filteredPosts = useMemo(() => {
    const activePillar = CATEGORY_PILLARS.find((pillar) => pillar.id === selectedPillarId) ?? CATEGORY_PILLARS[0];
    const query = searchQuery.trim().toLocaleLowerCase();

    return sortedPosts.filter((post) => {
      if (activePillar.id !== 'all' && !activePillar.matches(post)) return false;
      if (!query) return true;
      return `${post.title} ${post.titleAr} ${post.excerpt} ${post.excerptAr} ${post.category} ${post.slug}`
        .toLocaleLowerCase()
        .includes(query);
    });
  }, [sortedPosts, selectedPillarId, searchQuery]);

  const pillarCounts = useMemo(() => Object.fromEntries(
    CATEGORY_PILLARS.map((pillar) => [
      pillar.id,
      pillar.id === 'all' ? sortedPosts.length : sortedPosts.filter(pillar.matches).length,
    ]),
  ), [sortedPosts]);

  const showFeatured = selectedPillarId === 'all' && !searchQuery.trim();
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const listPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;
  const visiblePosts = listPosts.slice(0, visibleCount);
  const shownCount = (featuredPost ? 1 : 0) + visiblePosts.length;

  const resetFilters = () => {
    setSelectedPillarId('all');
    setSearchQuery('');
    setVisibleCount(PAGE_SIZE);
  };

  const renderMeta = (post: BlogCardData, compact = false) => (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-medium text-slate-500">
      <span className="rounded-md border border-[#1B4332]/10 bg-[#F5F3EC] px-2 py-1 text-[#285540]">
        {isRtl ? post.categoryAr : post.category}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Calendar aria-hidden="true" className="h-3.5 w-3.5 text-[#B98745]" />
        {post.date}
      </span>
      {!compact && (
        <span className="inline-flex items-center gap-1.5">
          <Clock aria-hidden="true" className="h-3.5 w-3.5 text-[#B98745]" />
          {post.readTime}
        </span>
      )}
    </div>
  );

  return (
    <div className="space-y-9 sm:space-y-12">
      <section aria-label={isRtl ? 'البحث في الأدلة' : 'Find a guide'} className="mx-auto max-w-5xl">
        <div className="rounded-[1.5rem] border border-[#e7e5de] bg-white p-3 shadow-[0_10px_35px_-28px_rgba(25,46,36,0.35)] sm:rounded-[1.75rem] sm:p-4">
          <label className="relative block">
            <Search aria-hidden="true" className="absolute start-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder={isRtl
                ? 'ابحث عن علاج، وجهة أو نصيحة للسفر...'
                : 'Search a treatment, destination or travel question…'}
              aria-label={isRtl ? 'ابحث في الأدلة' : 'Search guides'}
              className="h-12 w-full rounded-xl border border-[#e6e9e5] bg-[#fbfcfa] ps-11 pe-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#6c927b] focus:bg-white focus:ring-4 focus:ring-[#1B4332]/[0.07] sm:h-[54px] sm:rounded-2xl sm:text-[15px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setVisibleCount(PAGE_SIZE); }}
                aria-label={isRtl ? 'مسح البحث' : 'Clear search'}
                className="absolute end-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B4332]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label={isRtl ? 'تصفية حسب الموضوع' : 'Filter by topic'}>
            {CATEGORY_PILLARS.map((pillar) => {
              const selected = selectedPillarId === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => { setSelectedPillarId(pillar.id); setVisibleCount(PAGE_SIZE); }}
                  aria-pressed={selected}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold transition sm:min-h-11 sm:px-4 sm:text-[13px] ${selected
                    ? 'border-[#1B4332] bg-[#1B4332] text-white shadow-sm'
                    : 'border-[#e6e9e5] bg-white text-slate-600 hover:border-[#9ab2a1] hover:bg-[#f7f9f6] hover:text-[#1B4332]'}`}
                >
                  <span>{isRtl ? pillar.labelAr : pillar.labelEn}</span>
                  <span className={`min-w-5 rounded-full px-1.5 py-0.5 text-[10px] leading-none ${selected ? 'bg-white/15 text-white' : 'bg-[#f0f2ee] text-slate-500'}`}>
                    {pillarCounts[pillar.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4e2db] pb-4 text-sm">
        <p aria-live="polite" className="text-slate-500">
          <span className="font-semibold text-slate-800">{filteredPosts.length}</span>{' '}
          {isRtl ? 'دليل للمرضى والعائلات' : filteredPosts.length === 1 ? 'guide for patients and families' : 'guides for patients and families'}
          {searchQuery && <span className="ms-1 text-slate-400">{isRtl ? `عن «${searchQuery}»` : `for “${searchQuery}”`}</span>}
        </p>
        {(searchQuery || selectedPillarId !== 'all') && (
          <button type="button" onClick={resetFilters} className="rounded-md py-1 font-semibold text-[#1B4332] underline decoration-[#b6c9bb] underline-offset-4 hover:decoration-[#1B4332] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B4332]">
            {isRtl ? 'مسح التصفية' : 'Clear filters'}
          </button>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-3xl border border-[#e6e9e5] bg-white px-6 py-16 text-center shadow-sm">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f5f1] text-[#527560]"><BookOpen className="h-6 w-6" /></span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">{isRtl ? 'لم نعثر على أدلة مطابقة' : 'No guides match your search'}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{isRtl ? 'جرّب عبارة أخرى أو امسح التصفية.' : 'Try a broader search or clear the filters to explore all guides.'}</p>
          <button type="button" onClick={resetFilters} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1B4332] px-5 text-sm font-semibold text-white transition hover:bg-[#2D6A4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]">
            {isRtl ? 'عرض جميع الأدلة' : 'Browse all guides'}
          </button>
        </div>
      ) : (
        <>
          {featuredPost && (
            <article className="group overflow-hidden rounded-[1.75rem] border border-[#e5e5de] bg-white shadow-[0_18px_45px_-38px_rgba(27,67,50,0.32)] transition-shadow duration-300 hover:shadow-[0_24px_55px_-36px_rgba(27,67,50,0.38)] lg:grid lg:grid-cols-[1.03fr_0.97fr]">
              <Link href={`/blog/${featuredPost.slug}`} aria-label={isRtl ? `اقرأ ${featuredPost.titleAr}` : `Read ${featuredPost.title}`} className="relative order-2 block min-h-[230px] overflow-hidden bg-[#e7ede7] sm:min-h-[300px] lg:order-1 lg:min-h-[410px]">
                {featuredPost.image ? (
                  <Image src={featuredPost.image} alt={isRtl ? featuredPost.titleAr : featuredPost.title} fill preload sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]" />
                ) : <div className="absolute inset-0 flex items-center justify-center text-[#527560]"><BookOpen className="h-12 w-12" /></div>}
                <span className="absolute start-5 top-5 rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1B4332] shadow-sm backdrop-blur">{isRtl ? 'دليل مختار' : 'Editor’s pick'}</span>
              </Link>
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:order-2 lg:p-11 xl:p-14">
                <div className="space-y-5">
                  {renderMeta(featuredPost)}
                  <h2 className="text-[1.65rem] font-semibold leading-[1.2] tracking-[-0.035em] text-[#17251d] transition-colors group-hover:text-[#1B4332] sm:text-3xl lg:text-[2.65rem]">
                    <Link href={`/blog/${featuredPost.slug}`}>{isRtl ? featuredPost.titleAr : featuredPost.title}</Link>
                  </h2>
                  <p className="line-clamp-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                    {isRtl ? featuredPost.excerptAr : featuredPost.excerpt}
                  </p>
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-[#edeee9] pt-5">
                  <span className="text-xs font-medium text-slate-500">{isRtl ? 'من فريق TreatInKerala' : 'From the TreatInKerala team'}</span>
                  <Link href={`/blog/${featuredPost.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1B4332] px-4 text-xs font-semibold text-white transition hover:bg-[#2D6A4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332] sm:px-5 sm:text-sm">
                    {isRtl ? 'اقرأ الدليل' : 'Read the guide'}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5e5de] bg-white transition duration-300 hover:-translate-y-0.5 hover:border-[#c5d1c7] hover:shadow-[0_16px_35px_-28px_rgba(27,67,50,0.36)]">
                <Link href={`/blog/${post.slug}`} aria-label={isRtl ? `اقرأ ${post.titleAr}` : `Read ${post.title}`} className="relative block aspect-[1.85/1] overflow-hidden bg-[#e7ede7]">
                  {post.image ? <Image src={post.image} alt={isRtl ? post.titleAr : post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]" /> : <div className="absolute inset-0 flex items-center justify-center text-[#527560]"><BookOpen className="h-8 w-8" /></div>}
                </Link>
                <div className="flex flex-1 flex-col p-5 sm:p-5">
                  {renderMeta(post, true)}
                  <h3 className="mt-4 line-clamp-2 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#17251d] transition-colors group-hover:text-[#1B4332]">
                    <Link href={`/blog/${post.slug}`}>{isRtl ? post.titleAr : post.title}</Link>
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-[13px] leading-[1.7] text-slate-600">{isRtl ? post.excerptAr : post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#edeee9] pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500"><Clock aria-hidden="true" className="h-3.5 w-3.5 text-[#B98745]" />{post.readTime}</span>
                    <Link href={`/blog/${post.slug}`} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-[#285540] transition hover:bg-[#f3f6f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B4332]">
                      {isRtl ? 'اقرأ الدليل' : 'Read guide'}
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {listPosts.length > visibleCount && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cfd9d0] bg-white px-6 text-sm font-semibold text-[#1B4332] shadow-sm transition hover:border-[#1B4332] hover:bg-[#f7f9f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]">
                {isRtl ? 'عرض المزيد من الأدلة' : 'Load more guides'}
                <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-90" />
              </button>
              <span className="text-xs text-slate-400">{isRtl ? `عرض ${shownCount} من ${filteredPosts.length}` : `Showing ${shownCount} of ${filteredPosts.length}`}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
