'use client';

import React, { useState } from 'react';
import { RecoveryProduct, getProductReferralUrl } from '@/lib/recoveryProducts';
import { SITE_CONFIG } from '@/lib/config';
import {
  Sparkles,
  ExternalLink,
  Star,
  ShieldCheck,
  Check,
  Copy,
  HeartPulse,
  Award,
  Pill,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

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
    <section className="py-16 lg:py-20 border-b border-[#D4A96A]/20 bg-gradient-to-b from-[#FAF7F2] to-[#F4EFE6]/70 relative overflow-hidden">
      {/* Background Subtle Ambient Highlights */}
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
                : 'Clinical-grade nutritional supplements and restorative essentials curated to support cellular healing, tissue repair, and long-term vitality.'}
            </p>
          </div>

          {/* Coupon Code Chip */}
          <div className="bg-white border border-[#D4A96A]/40 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4 max-w-sm w-full md:w-auto">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#2D6A4F]">
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? 'خصم حصري لمرضى كيرلا' : 'Patient Partner Discount'}</span>
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
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-semibold rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
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

        {/* Product Cards Grid - Clean Clinical Design */}
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
                className="bg-white rounded-2xl border border-gray-200/90 hover:border-[#D4A96A]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group p-6 space-y-5"
              >
                {/* Card Header: Category & Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
                        <Pill className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
                        {category}
                      </span>
                    </div>

                    {badge ? (
                      <span className="text-[11px] font-semibold text-[#8B6B23] bg-[#D4A96A]/15 border border-[#D4A96A]/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#D4A96A]" />
                        {badge}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        iHerb Verified
                      </span>
                    )}
                  </div>

                  {/* Product Title & Brand */}
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-[#1A1A2E] leading-snug group-hover:text-[#2D6A4F] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {isAr ? 'العلامة التجارية الموصى بها:' : 'Curated Brand:'}{' '}
                      <span className="text-gray-700">{product.brand}</span>
                    </p>
                  </div>

                  {/* Clinical Benefit Box */}
                  <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#D4A96A]/20 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A96A]">
                      {isAr ? 'الهدف السريري والتأهيلي' : 'Clinical Objective'}
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed font-sans">
                      {benefit}
                    </p>
                  </div>

                  {/* Rating & Review Counter */}
                  <div className="flex items-center justify-between text-xs pt-1 text-gray-500">
                    <div className="flex items-center gap-1.5 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400 font-normal">
                        ({product.reviewCount.toLocaleString()}+ {isAr ? 'مراجعة موثقة' : 'verified reviews'})
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">
                      {product.estimatedPrice}
                    </span>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-2">
                  <a
                    href={productUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold transition-all duration-200 shadow-xs hover:shadow group/btn cursor-pointer"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>
                      {isAr
                        ? `طلب عبر iHerb (خصم ${SITE_CONFIG.iherbDiscountPercent})`
                        : `Order on iHerb (${SITE_CONFIG.iherbDiscountPercent} Off)`}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Disclaimer & Transparency Notice */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex items-start gap-3 text-xs text-gray-600 font-sans leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
          <p>
            {isAr
              ? 'إخلاء مسؤولية طبية: هذه المكملات الغذائية مخصصة لدعم التعافي والعافية العامة. استشر دائماً طبيبك أو جراحك المعالج في كيرلا قبل بدء أي مكملات غذائية بعد الجراحة لضمان توافقها الكامل مع أدويتك. يتم تفعيل كود الخصم تلقائياً عند النقر على الروابط.'
              : 'Medical Disclaimer: These clinical recovery essentials are curated to support postoperative recovery and general wellness. Always consult your treating surgeon or physician before introducing any dietary supplements. Patient discount code is automatically attached to links.'}
          </p>
        </div>
      </div>
    </section>
  );
}
