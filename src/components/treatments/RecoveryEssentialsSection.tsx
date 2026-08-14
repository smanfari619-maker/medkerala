'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RecoveryProduct, getProductReferralUrl } from '@/lib/recoveryProducts';
import { SITE_CONFIG } from '@/lib/config';
import { Sparkles, ExternalLink, Star, ShieldCheck, Check, Copy, HeartPulse, Award } from 'lucide-react';

interface Props {
  locale: string;
  treatmentName: string;
  treatmentSlug: string;
  products: RecoveryProduct[];
}

export default function RecoveryEssentialsSection({
  locale,
  treatmentName,
  products
}: Props) {
  const isAr = locale === 'ar';
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SITE_CONFIG.iherbRewardsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 lg:py-20 border-b border-[#D4A96A]/20 bg-gradient-to-b from-[#FAF7F2] to-[#F3EEE5]/60 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4A96A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header with Trust Badge & Rewards Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#2D6A4F]/20">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{isAr ? 'بروتوكول ما بعد العلاج' : 'Post-Treatment Protocol'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1A1A2E] tracking-tight">
              {isAr
                ? `مستلزمات التعافي الموصى بها لـ ${treatmentName}`
                : `Recovery Essentials for ${treatmentName}`}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              {isAr
                ? 'مكملات غذائية معتمدة سريرياً ومستلزمات نقاهة موصى بها لدعم سرعة الالتئام وتجديد حيوية الجسم بعد الإجراء الطبي.'
                : 'Clinical-grade nutritional supplements and restorative essentials recommended to support cellular healing and long-term recovery.'}
            </p>
          </div>

          {/* Coupon Code Chip */}
          <div className="bg-white/90 backdrop-blur-sm border border-[#D4A96A]/40 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4 max-w-sm w-full md:w-auto">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#2D6A4F]">
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? 'خصم حصري للمرضى' : 'Patient Partner Discount'}</span>
              </div>
              <p className="text-xs text-gray-500">
                {isAr ? 'وفر ٥–١٠٪ على iHerb بالرمز:' : 'Save 5–10% on iHerb with code:'}
              </p>
              <span className="font-mono font-bold text-base text-[#1A1A2E] tracking-wider">
                {SITE_CONFIG.iherbRewardsCode}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              aria-label="Copy discount code"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تم النسخ' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isAr ? 'نسخ الرمز' : 'Copy Code'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const productUrl = getProductReferralUrl(product);
            const title = isAr ? product.nameAr : product.name;
            const category = isAr ? product.categoryAr : product.category;
            const benefit = isAr ? product.benefitAr : product.benefit;
            const badge = isAr ? product.badgeAr : product.badge;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200/80 hover:border-[#D4A96A]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Imagery Header */}
                <div className="relative w-full h-44 bg-slate-100 overflow-hidden border-b border-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Badges Over Image */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                    <span className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {category}
                    </span>
                    {badge && (
                      <span className="text-[11px] font-medium text-amber-900 bg-amber-100/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        {badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Product Title & Brand */}
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#1A1A2E] leading-snug group-hover:text-[#2D6A4F] transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-400 font-sans">{product.brand}</p>
                    </div>

                    {/* Clinical Benefit Rationale */}
                    <p className="text-xs text-gray-600 leading-relaxed font-sans bg-[#FAF7F2] p-3 rounded-xl border border-[#D4A96A]/15">
                      {benefit}
                    </p>
                  </div>

                  {/* Rating & Review Counter */}
                  <div className="flex items-center justify-between text-xs pt-3 text-gray-500 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400 font-normal">
                        ({product.reviewCount.toLocaleString()}+ {isAr ? 'تقييم' : 'reviews'})
                      </span>
                    </div>
                    <span className="font-mono text-gray-700 font-medium">
                      {product.estimatedPrice}
                    </span>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-4 bg-gray-50/70 border-t border-gray-100">
                  <a
                    href={productUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-[#2D6A4F] text-[#2D6A4F] hover:text-white border border-[#2D6A4F]/30 hover:border-[#2D6A4F] rounded-xl text-xs font-semibold transition-all duration-200 shadow-xs hover:shadow group/btn"
                  >
                    <span>
                      {isAr
                        ? `عرض على iHerb (تطبيق خصم ${SITE_CONFIG.iherbDiscountPercent})`
                        : `View on iHerb (${SITE_CONFIG.iherbDiscountPercent} Off)`}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Disclaimer & Transparency Notice */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-gray-200/80 flex items-start gap-3 text-xs text-gray-500 font-sans leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
          <p>
            {isAr
              ? 'إخلاء مسؤولية طبية: هذه المنتجات والمكملات الغذائية مخصصة لدعم التعافي والعافية العامة. يُنصح دائماً بمراجعة طبيبك أو جراحك المعالج قبل بدء أي مكملات غذائية بعد الجراحة لضمان عدم تعارضها مع أدويتك الموصوفة. يتم تطبيق رمز الخصم تلقائياً عند الدفع عبر روابطنا.'
              : 'Medical Disclaimer: These supplements and recovery essentials are curated to support general postoperative healing. Always consult your treating surgeon or physician before introducing any dietary supplements to ensure compatibility with your prescribed medications. Patient discount code is automatically attached to referral links.'}
          </p>
        </div>
      </div>
    </section>
  );
}
