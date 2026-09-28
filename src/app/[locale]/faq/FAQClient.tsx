'use client';

import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  X, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  DollarSign,
  Award,
  Leaf,
  Plane,
  Home
} from 'lucide-react';
import { FAQCategory, FAQItem, FAQ_CATEGORIES } from './faqData';
import { SITE_CONFIG } from '@/lib/config';
import { Link } from '@/i18n/routing';

interface Props {
  locale: string;
  items: FAQItem[];
}

export default function FAQClient({ locale, items }: Props) {
  const isRtl = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'why-cheaper': true,
    'kottakkal-admission': true,
  });

  // Filter items based on active category & search query
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      // 1. Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search query filter
      if (!query) return true;

      const searchableText = `${item.qEn} ${item.qAr} ${item.aEn} ${item.aAr} ${item.category}`.toLowerCase();
      return searchableText.includes(query);
    });
  }, [items, selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FAQ_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') {
        counts[cat.id] = items.length;
      } else {
        counts[cat.id] = items.filter((it) => it.category === cat.id).length;
      }
    });
    return counts;
  }, [items]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredItems.forEach((it) => {
      allOpen[it.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'DollarSign': return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'Award': return <Award className="w-4 h-4 text-emerald-600" />;
      case 'Leaf': return <Leaf className="w-4 h-4 text-emerald-600" />;
      case 'Plane': return <Plane className="w-4 h-4 text-emerald-600" />;
      case 'Home': return <Home className="w-4 h-4 text-emerald-600" />;
      default: return <HelpCircle className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-[#FAF7F2] min-h-screen text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ── HEADER ── */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#1B4332] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isRtl ? 'قاعدة المعرفة الطبية المعتمدة' : 'Official Medical FAQ & Knowledge Hub'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1B4332] tracking-tight leading-tight">
            {isRtl ? 'الأسئلة الشائعة حول العلاج في كيرلا' : 'Frequently Asked Questions: Kerala Medical Travel'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {isRtl
              ? 'إجابات مباشرة ودقيقة حول تكاليف الجراحات، مستشفيات كوزيكود، حجز كوتاكال آريا فايديا شالا، التأشيرة الطبية، والمترجمين العرب.'
              : 'Direct answers to help you plan your journey: surgery costs, JCI hospital standards, Kottakkal AVS admissions, e-visas, and Arabic coordination.'}
          </p>
        </div>

        {/* ── INTERACTIVE SEARCH & CATEGORY FILTER BAR ── */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
          
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
                  ? 'ابحث في الأسئلة (مثال: كوتاكال، الركبة، التأشيرة، تكلفة القلب، التأمين، سكن العائلة)...'
                  : 'Search questions (e.g., Kottakkal, Knee surgery, Visa, Cardiac cost, Insurance, Stays)...'
              }
              className="w-full ps-11 pe-10 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] text-sm bg-slate-50/60 hover:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Clean 5-Pillar Tabs (Horizontal scroll on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none justify-start sm:justify-center">
            {FAQ_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 shrink-0 cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <span>{isRtl ? cat.titleAr : cat.titleEn}</span>
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

        {/* ── TOOLBAR: RESULT COUNTER & EXPAND / COLLAPSE ── */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
          <div>
            {isRtl
              ? `عرض ${filteredItems.length} من أصل ${items.length} سؤال`
              : `Showing ${filteredItems.length} of ${items.length} questions`}
            {searchQuery && (
              <span className="font-semibold text-slate-800 ms-1">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={expandAll}
              className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
            >
              {isRtl ? 'فتح الكل' : 'Expand All'}
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
            >
              {isRtl ? 'إغلاق الكل' : 'Collapse All'}
            </button>
          </div>
        </div>

        {/* ── QUESTIONS ACCORDION LIST ── */}
        {filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const isOpen = !!openItems[item.id];
              const q = isRtl ? item.qAr : item.qEn;
              const a = isRtl ? item.aAr : item.aEn;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                    isOpen ? 'border-[#1B4332]/40 shadow-sm' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-start p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-800 font-bold text-xs">
                        Q
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {q}
                      </h2>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-emerald-50 border-emerald-200 text-[#1B4332]' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-1">
                      <div className="ps-10 pt-3">
                        {a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              {isRtl ? 'لم يتم العثور على سؤال مطابق' : 'No matching questions found'}
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              {isRtl
                ? 'جرب البحث بكلمة مختلفة أو اسأل فريقنا مباشرة عبر الواتساب للحصول على إجابة فورية.'
                : 'Try searching with different terms or ask our medical desk directly on WhatsApp for an immediate response.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#1B4332] text-white text-xs sm:text-sm font-semibold hover:bg-[#2D6A4F] transition-colors cursor-pointer"
            >
              {isRtl ? 'عرض جميع الأسئلة' : 'View All Questions'}
            </button>
          </div>
        )}

        {/* ── STILL HAVE QUESTIONS? CTA BOX ── */}
        <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isRtl ? 'مستشار طبي متاح ٢٤/٧' : '24/7 Clinical Desk'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              {isRtl ? 'هل لديك سؤال محدد لم تجد إجابته هنا؟' : 'Have a Question Not Listed Here?'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg leading-relaxed">
              {isRtl
                ? 'أرسل لنا تقاريرك الطبية أو استفسارك وسيقوم منسقنا بالرد عليك شخصياً خلال دقائق عبر الواتساب.'
                : 'Send us your medical report or inquiry. Our personal care team in Calicut & Kottakkal replies within 15 minutes.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                isRtl
                  ? 'مرحباً علاج في كيرلا، لدي استفسار طبي أود الاستشارة بشأنه'
                  : 'Hello TreatInKerala, I have a medical question I would like to consult about.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-md transition-colors cursor-pointer min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isRtl ? 'اسأل عبر الواتساب فوراً' : 'Ask on WhatsApp'}</span>
            </a>

            <Link
              href="/get-estimate"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#1B4332] hover:bg-slate-100 font-bold text-sm shadow-xs transition-colors cursor-pointer min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              <span>{isRtl ? 'طلب تقدير تكلفة مجاني' : 'Get Free Estimate'}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
