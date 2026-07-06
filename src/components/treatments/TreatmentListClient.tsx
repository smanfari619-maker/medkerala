'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { Treatment, TreatmentPackage } from '@/lib/data';
import { 
  Heart, 
  Bone, 
  Smile, 
  Baby, 
  Leaf, 
  Activity, 
  Brain, 
  Shield, 
  Eye, 
  ArrowRight, 
  Search, 
  X, 
  TrendingDown,
  Stethoscope,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

interface Props {
  treatments: Treatment[];
  packages: TreatmentPackage[];
  locale: string;
  learnMoreText: string;
  costsFromText: string;
}

export default function TreatmentListClient({ treatments, packages, locale, learnMoreText, costsFromText }: Props) {
  const [activeTab, setActiveTab] = useState<'procedures' | 'packages'>('procedures');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const isRtl = locale === 'ar';

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    heart: Heart,
    bone: Bone,
    tooth: Smile,
    baby: Baby,
    leaf: Leaf,
    activity: Activity,
    brain: Brain,
    eye: Eye
  };

  // Speciality Categories (Only for procedures)
  const specialities = useMemo(() => {
    const specsSet = new Set(treatments.map((t) => t.speciality));
    const list = Array.from(specsSet).map((specName) => {
      const match = treatments.find((t) => t.speciality === specName);
      return {
        key: specName,
        en: specName,
        ar: match ? match.specialityAr : specName
      };
    });
    return [
      { key: 'All', en: 'All Specialities', ar: 'جميع التخصصات' },
      ...list
    ];
  }, [treatments]);

  // Handle Treatments Search, Filter & Sort
  const filteredTreatments = useMemo(() => {
    const result = treatments.filter((t) => {
      // 1. Speciality filter
      if (selectedSpeciality !== 'All' && t.speciality !== selectedSpeciality) return false;

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = t.name.toLowerCase().includes(query) || t.nameAr.includes(query);
        const taglineMatch = t.tagline.toLowerCase().includes(query) || t.taglineAr.includes(query);
        const specMatch = t.speciality.toLowerCase().includes(query) || t.specialityAr.includes(query);
        return nameMatch || taglineMatch || specMatch;
      }

      return true;
    });

    // 3. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.costTable.kerala - b.costTable.kerala);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.costTable.kerala - a.costTable.kerala);
    }

    return result;
  }, [treatments, selectedSpeciality, searchQuery, sortBy]);

  // Handle Packages Search & Sort
  const filteredPackages = useMemo(() => {
    let result = [...packages];

    // 1. Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = (pkg: TreatmentPackage) => pkg.name.toLowerCase().includes(query) || pkg.nameAr.includes(query);
      const descMatch = (pkg: TreatmentPackage) => pkg.descEn.toLowerCase().includes(query) || pkg.descAr.includes(query);
      result = result.filter(pkg => nameMatch(pkg) || descMatch(pkg));
    }

    // 2. Sorting by cost
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.cost - b.cost);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.cost - a.cost);
    }

    return result;
  }, [packages, searchQuery, sortBy]);

  const getMaxSavings = (t: Treatment) => {
    const comparePrices = [t.costTable.uk, t.costTable.usa, t.costTable.uae].filter(p => p > 0);
    if (comparePrices.length === 0) return 0;
    const maxCompare = Math.max(...comparePrices);
    return Math.round(((maxCompare - t.costTable.kerala) / maxCompare) * 100);
  };

  return (
    <div className="space-y-10">
      {/* Segmented Toggle Control */}
      <div className="flex justify-center mb-6">
        <div className="bg-white border border-[#D4A96A]/20 p-1.5 rounded-2xl inline-flex shadow-xs gap-1.5">
          <button
            onClick={() => {
              setActiveTab('procedures');
              setSearchQuery('');
            }}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[42px] ${
              activeTab === 'procedures'
                ? 'bg-primary-green text-white shadow-sm'
                : 'text-text-muted hover:text-primary-green'
            }`}
          >
            {isRtl ? 'الإجراءات الطبية الفردية' : 'Individual Procedures'}
          </button>
          <button
            onClick={() => {
              setActiveTab('packages');
              setSearchQuery('');
            }}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[42px] ${
              activeTab === 'packages'
                ? 'bg-primary-green text-white shadow-sm'
                : 'text-text-muted hover:text-primary-green'
            }`}
          >
            {isRtl ? 'حزم العلاج الشاملة (الأوفر)' : 'All-Inclusive Packages'}
          </button>
        </div>
      </div>

      {/* Search, Filter & Sort Controls Panel */}
      <div className="bg-white border border-[#D4A96A]/20 rounded-3xl p-5 shadow-xs space-y-4">
        {/* Mobile Specialty Scrollable Pills */}
        {activeTab === 'procedures' && (
          <div className="md:hidden overflow-x-auto no-scrollbar scroll-mask-fade flex gap-2 pb-1.5 -mx-5 px-5 scroll-momentum">
            {specialities.map((spec) => {
              const isSelected = selectedSpeciality === spec.key;
              return (
                <button
                  key={spec.key}
                  onClick={() => setSelectedSpeciality(spec.key)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 tap-active border ${
                    isSelected
                      ? 'bg-primary-green border-primary-green text-white shadow-xs'
                      : 'bg-[#FAF7F2] border-[#D4A96A]/20 text-text-muted'
                  }`}
                >
                  {isRtl ? spec.ar : spec.en}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Bar */}
          <div className={activeTab === 'procedures' ? "relative md:col-span-6" : "relative md:col-span-8"}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted/60" />
            </div>
            <input
              type="text"
              placeholder={
                activeTab === 'procedures'
                  ? (isRtl ? 'ابحث عن علاج أو تخصص...' : 'Search for a treatment or specialty...')
                  : (isRtl ? 'ابحث في حزم العلاج المتكاملة...' : 'Search in all-inclusive packages...')
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-[#FAF7F2] border border-[#D4A96A]/25 rounded-2xl focus:outline-hidden focus:border-primary-green focus:ring-1 focus:ring-primary-green text-sm text-text-dark placeholder-text-muted/50 transition-all font-sans animate-fade-in"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center px-2 text-text-muted/60 hover:text-primary-green transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Specialty Filter Dropdown (Only for desktop) */}
          {activeTab === 'procedures' && (
            <div className="hidden md:block md:col-span-3">
              <select
                value={selectedSpeciality}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSpeciality(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D4A96A]/25 rounded-2xl py-3 px-4 focus:outline-hidden focus:border-primary-green text-sm text-text-dark font-sans font-medium cursor-pointer"
              >
                {specialities.map((spec) => (
                  <option key={spec.key} value={spec.key}>
                    {isRtl ? spec.ar : spec.en}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className={activeTab === 'procedures' ? "md:col-span-3" : "md:col-span-4"}>
            <select
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')}
              className="w-full bg-[#FAF7F2] border border-[#D4A96A]/25 rounded-2xl py-3 px-4 focus:outline-hidden focus:border-primary-green text-sm text-text-dark font-sans font-medium cursor-pointer"
            >
              <option value="default">{isRtl ? 'الترتيب: الموصى به' : 'Sort: Recommended'}</option>
              <option value="price-asc">{isRtl ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{isRtl ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Display block */}
      {activeTab === 'procedures' ? (
        filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((treatment) => {
              const Icon = iconMap[treatment.iconName] || Heart;
              const title = isRtl ? treatment.nameAr : treatment.name;
              const speciality = isRtl ? treatment.specialityAr : treatment.speciality;
              const tagline = isRtl ? treatment.taglineAr : treatment.tagline;
              const overview = isRtl ? treatment.overviewAr : treatment.overview;
              const savings = getMaxSavings(treatment);

              return (
                <div
                  key={treatment.slug}
                  className="bg-white rounded-3xl p-8 border border-[#D4A96A]/20 hover:border-primary-green/40 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group glow-card-green"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A] bg-[#FAF7F2] border border-[#D4A96A]/20 px-3 py-1 rounded-full font-sans">
                        {speciality}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-primary-green/10 flex items-center justify-center group-hover:bg-primary-green transition-colors duration-300">
                        <Icon className="h-5 w-5 text-primary-green group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-text-dark mb-2 group-hover:text-primary-green transition-colors duration-200">
                      {title}
                    </h2>
                    <p className="text-accent-gold font-serif italic text-base mb-4 font-medium min-h-[48px] line-clamp-2">
                      {tagline}
                    </p>
                    <p className="text-text-muted text-base leading-relaxed mb-6 line-clamp-3 font-sans">
                      {overview}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted font-sans">
                          {costsFromText}
                        </span>
                        <span className="text-primary-green font-extrabold text-2xl">
                          ${treatment.costTable.kerala.toLocaleString()}
                        </span>
                      </div>

                      {savings > 0 && (
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-2xl border border-emerald-100 text-xs font-bold font-sans">
                          <TrendingDown className="h-3.5 w-3.5" />
                          <span>{isRtl ? `وفر حتى ${savings}%` : `Save up to ${savings}%`}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-text-muted/80 font-sans">
                        {isRtl ? 'يشمل الاستقبال والإقامة' : 'Includes pickup & stay'}
                      </span>
                      <Link
                        href={`/treatments/${treatment.slug}`}
                        className="inline-flex items-center gap-1.5 font-bold text-primary-green group-hover:text-primary-dark transition-colors duration-200 min-h-[44px] font-sans"
                      >
                        <span>{learnMoreText}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Custom request card */}
            <div
              className="bg-primary-dark text-white rounded-3xl p-8 border border-accent-gold/25 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-gradient from-primary-green/20 to-transparent -z-10 opacity-70"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-gold bg-white/10 px-3 py-1 rounded-full font-sans">
                    {isRtl ? 'طلب خاص' : 'Custom Request'}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-accent-gold/25 flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-accent-gold" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {isRtl ? 'علاج غير مدرج؟' : 'Other Treatments?'}
                </h2>
                <p className="text-accent-gold font-serif italic text-base mb-4 font-medium min-h-[48px] line-clamp-2">
                  {isRtl ? 'يمكننا مساعدتك في أي حالة' : 'We can help you with any clinical need'}
                </p>
                <p className="text-slate-300 text-base leading-relaxed mb-6 font-sans line-clamp-4">
                  {isRtl
                    ? 'يقدم شركاؤنا من المستشفيات التخصصية الكبرى جميع العمليات الجراحية والعلاجية. أخبرنا بمتطلباتك وسنرتب لك كل شيء.'
                    : 'Our accredited hospital network covers all medical procedures, diagnostics, and therapies. Share your requirement with us for a free estimate.'}
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-sans">
                  {isRtl ? 'تقدير مجاني 100%' : '100% Free Estimate'}
                </span>
                <Link
                  href="/get-estimate"
                  className="inline-flex items-center gap-1.5 font-bold text-accent-gold hover:text-white transition-colors duration-200 min-h-[44px] font-sans"
                >
                  <span>{isRtl ? 'أرسل متطلباتك' : 'Ask/Send Requirements'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Treatments Empty State */
          <div className="text-center py-16 bg-white border border-[#D4A96A]/20 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-xs px-6">
            <div className="h-16 w-16 bg-[#FAF7F2] border border-[#D4A96A]/20 text-[#D4A96A] rounded-full flex items-center justify-center mx-auto">
              <svg className="h-8 w-8 animate-pulse" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-dark font-sans">
                {isRtl ? 'لا تجد علاجك؟ يمكننا مساعدتك في أي شيء!' : "Can't find your treatment? We can help you with anything!"}
              </h3>
              <p className="text-text-muted text-base font-sans max-w-md mx-auto leading-relaxed">
                {isRtl 
                  ? 'تغطي شبكة مستشفياتنا المعتمدة جميع التخصصات والإجراءات الطبية والجراحية. أخبرنا بمتطلباتك وسنعد لك تقريراً شاملاً.' 
                  : 'Our accredited hospital network covers all procedures. Share your specific requirement with us for a customized medical estimate.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/get-estimate"
                className="bg-primary-green hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-sm font-sans min-h-[44px] flex items-center justify-center"
              >
                {isRtl ? 'أرسل متطلباتك الطبية' : 'Submit Your Requirements'}
              </Link>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpeciality('All');
                  setSortBy('default');
                }}
                className="bg-[#FAF7F2] border border-[#D4A96A]/25 text-[#4A4A6A] hover:text-primary-green hover:border-primary-green/50 font-semibold px-6 py-3 rounded-full text-sm transition-all font-sans min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                <span>{isRtl ? 'إعادة تعيين البحث' : 'Reset Search'}</span>
              </button>
            </div>
          </div>
        )
      ) : (
        /* Packages Grid Rendering */
        filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const treatment = treatments.find(t => t.slug === pkg.treatmentSlug);
              const Icon = treatment ? (iconMap[treatment.iconName] || Heart) : Heart;
              const name = isRtl ? pkg.nameAr : pkg.name;
              const desc = isRtl ? pkg.descAr : pkg.descEn;
              const includes = isRtl ? pkg.includesAr : pkg.includesEn;
              const hotelInfo = isRtl ? pkg.hotelTierAr : pkg.hotelTierEn;

              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl p-8 border border-[#D4A96A]/20 hover:border-primary-green/40 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group glow-card-green"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-6 flex-wrap">
                      <div className="h-12 w-12 rounded-2xl bg-primary-green/10 text-primary-green flex items-center justify-center shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-right rtl:text-left">
                        <span className="text-[10px] font-bold text-accent-gold uppercase tracking-wider block font-sans">
                          {isRtl ? 'الحزمة الشاملة' : 'All-Inclusive Bundle'}
                        </span>
                        <span className="text-2xl font-extrabold text-primary-green font-display">
                          ${pkg.cost.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-text-dark group-hover:text-primary-green transition-colors duration-200 mb-2 font-display">
                      {name}
                    </h3>
                    <div className="space-y-1 mb-4">
                      <p className="text-xs text-[#D4A96A] font-bold font-sans">
                        ⏱️ {pkg.durationDays} {isRtl ? 'يوم للبرنامج الكامل' : 'Days Total Program'}
                      </p>
                      <p className="text-xs text-text-muted font-sans font-semibold">
                        🏨 {hotelInfo}
                      </p>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-6 font-sans">
                      {desc}
                    </p>

                    {/* Inclusions checklist */}
                    <div className="space-y-3 mb-8 pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-text-dark font-sans block">
                        {isRtl ? 'ما تشمله الحزمة الطبية واللوجستية:' : 'Package Inclusions:'}
                      </span>
                      <ul className="space-y-2">
                        {includes.map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-text-muted font-sans leading-relaxed">
                            <span className="text-primary-green shrink-0 mt-0.5 font-bold">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً ميدكيرلا، أود الاستفسار عن حزمة العلاج الشاملة: ${name}` : `Hello MedKerala, I would like to inquire about all-inclusive package: ${name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-[#25D366] transition-colors min-h-[40px] font-sans"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{isRtl ? 'استفسار سريع' : 'Quick Inquiry'}</span>
                    </a>

                    <Link
                      href="/get-estimate"
                      className="inline-flex items-center gap-1 bg-primary-green hover:bg-primary-dark text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm hover:shadow-md transition-all font-sans min-h-[40px]"
                    >
                      <span>{isRtl ? 'احجز الحزمة' : 'Book Package'}</span>
                      <ChevronRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Packages Empty state */
          <div className="text-center py-20 bg-white border border-[#D4A96A]/20 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-xs px-6">
            <Shield className="h-12 w-12 text-[#D4A96A]/60 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-dark font-sans">
                {isRtl ? 'لم نعثر على حزم مطابقة' : 'No packages match your search'}
              </h3>
              <p className="text-text-muted text-sm font-sans max-w-sm mx-auto">
                {isRtl 
                  ? 'جرب البحث باستخدام كلمة مفتاحية أخرى.' 
                  : 'Try searching for another keyword.'}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
              }}
              className="bg-primary-green hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-sm font-sans cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{isRtl ? 'إعادة تعيين البحث' : 'Reset Search'}</span>
            </button>
          </div>
        )
      )}
    </div>
  );
}
