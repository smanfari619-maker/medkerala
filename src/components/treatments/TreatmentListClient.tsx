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
    return treatments.filter((t) => {
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
  }, [treatments, selectedSpeciality, searchQuery]);

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

    return result;
  }, [packages, searchQuery]);

  const getMaxSavings = (t: Treatment) => {
    const comparePrices = [t.costTable.uk, t.costTable.usa, t.costTable.uae].filter(p => p > 0);
    if (comparePrices.length === 0) return 0;
    const maxCompare = Math.max(...comparePrices);
    return Math.round(((maxCompare - t.costTable.keralaMin) / maxCompare) * 100);
  };

  return (
    <div className="space-y-10">
      {/* Segmented Toggle Control */}
      <div className="flex justify-center mb-6">
        <div className="bg-white border border-[#D4A96A]/15 p-1.5 rounded-2xl inline-flex shadow-sm gap-1.5">
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

      {/* Search, Filter & Sort Controls Panel - Glassmorphic Pill */}
      <div className="bg-white border border-[#D4A96A]/15 rounded-[2rem] md:rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 max-w-5xl mx-auto mb-12 relative z-20">
        {/* Mobile Specialty Scrollable Pills */}
        {activeTab === 'procedures' && (
          <div className="md:hidden overflow-x-auto no-scrollbar scroll-mask-fade flex gap-2 pb-3 pt-1 px-2 scroll-momentum">
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

        <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-[#D4A96A]/20 rtl:divide-x-reverse w-full">
          {/* Search Bar */}
          <div className="relative w-full md:flex-1 py-2 md:py-0 px-2 md:px-4">
            <div className="absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#D4A96A]" />
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
              className="w-full pl-11 md:pl-12 pr-10 py-2.5 bg-transparent border-transparent focus:border-transparent focus:ring-0 text-sm md:text-base text-primary-dark placeholder-text-muted/60 transition-all font-sans font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center px-2 text-text-muted/60 hover:text-primary-green transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Specialty Filter Dropdown (Only for desktop) */}
          {activeTab === 'procedures' && (
            <div className="hidden md:block relative w-full md:w-auto md:min-w-[280px] py-2 md:py-0 px-2 md:px-4">
              <select
                value={selectedSpeciality}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSpeciality(e.target.value)}
                className="w-full bg-transparent border-transparent focus:border-transparent focus:ring-0 py-2.5 px-4 text-sm md:text-base text-primary-dark font-sans font-bold cursor-pointer appearance-none"
              >
                {specialities.map((spec) => (
                  <option key={spec.key} value={spec.key}>
                    {isRtl ? spec.ar : spec.en}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#D4A96A]">
                <ChevronRight className="h-4 w-4 rotate-90" />
              </div>
            </div>
          )}
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
                  className="bg-white border border-[#D4A96A]/15 rounded-[2.25rem] p-8 sm:p-10 hover:border-[#2D6A4F]/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Dynamic Watermark */}
                  <div className="absolute -bottom-6 -right-6 rtl:-left-6 rtl:-right-auto h-40 w-40 opacity-[0.03] text-[#2D6A4F] pointer-events-none group-hover:scale-[1.2] group-hover:-rotate-12 group-hover:opacity-[0.05] transition-all duration-700 ease-out origin-center">
                    <Icon className="w-full h-full" />
                  </div>
                  
                  {/* Subtle Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-emerald-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#D4A96A] font-sans">
                        {speciality}
                      </span>
                      <div className="h-12 w-12 rounded-2xl bg-[#FAF7F2] border border-[#D4A96A]/20 flex items-center justify-center group-hover:bg-primary-green group-hover:border-primary-green transition-all duration-300 shadow-xs">
                        <Icon className="h-6 w-6 text-primary-green group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-primary-dark mb-3 group-hover:text-primary-green transition-colors duration-300">
                      {title}
                    </h2>
                    <p className="text-accent-gold font-serif italic text-lg mb-8 font-medium line-clamp-2">
                      {tagline}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-col gap-5 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-text-muted font-sans mb-1">
                          {costsFromText}
                        </span>
                        <span className="text-primary-dark group-hover:text-primary-green font-display font-extrabold text-2xl sm:text-3xl transition-colors duration-300">
                          ${treatment.costTable.keralaMin.toLocaleString()} – ${treatment.costTable.keralaMax.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-text-muted/70 font-sans mt-0.5">
                          {isRtl ? 'بناءً على التقييم السريري' : 'Confirmed after assessment'}
                        </span>
                      </div>

                      {savings > 0 && (
                        <div className="flex items-center gap-1.5 bg-[#FAF7F2] text-[#D4A96A] px-3.5 py-2 rounded-xl border border-[#D4A96A]/20 text-xs font-bold font-sans shadow-xs">
                          <TrendingDown className="h-4 w-4" />
                          <span>{isRtl ? `وفر حتى ${savings}%` : `Save up to ${savings}%`}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-medium text-text-muted/80 font-sans flex items-center gap-1.5">
                        <Stethoscope className="h-3.5 w-3.5 text-[#D4A96A]" />
                        {isRtl ? 'استشارة مجانية متاحة' : 'Free consult available'}
                      </span>
                      <Link
                        href={`/treatments/${treatment.slug}`}
                        className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#FAF7F2] border border-[#D4A96A]/20 text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white group-hover:border-[#2D6A4F] transition-all duration-300 shadow-sm group-hover:shadow-lg transform group-hover:-translate-y-1"
                      >
                        <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}


          </div>
        ) : (
          /* Treatments Empty State */
          <div className="text-center py-16 bg-white border border-[#D4A96A]/15 rounded-[2.25rem] max-w-2xl mx-auto space-y-6 shadow-sm px-6">
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
                className="bg-[#FAF7F2] border border-[#D4A96A]/40 text-[#4A4A6A] hover:text-primary-green hover:border-primary-green/50 font-semibold px-6 py-3 rounded-full text-sm transition-all font-sans min-h-[44px] flex items-center justify-center cursor-pointer"
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
                  className="bg-white border border-[#D4A96A]/15 rounded-[2.25rem] p-8 hover:border-[#2D6A4F]/30 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group glow-card-green"
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
                          ${pkg.costMin.toLocaleString()} – ${pkg.costMax.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-text-muted/70 font-sans block text-right rtl:text-left mt-0.5">
                          {isRtl ? 'بناءً على التقييم السريري' : 'Confirmed after assessment'}
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
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الاستفسار عن حزمة العلاج الشاملة: ${name}` : `Hello TreatInKerala, I would like to inquire about all-inclusive package: ${name}`)}`}
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
          <div className="text-center py-20 bg-white border border-[#D4A96A]/15 rounded-[2.25rem] max-w-2xl mx-auto space-y-6 shadow-sm px-6">
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
