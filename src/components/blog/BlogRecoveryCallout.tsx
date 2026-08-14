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
  Pill,
  Award,
  PackageCheck
} from 'lucide-react';

interface Props {
  locale: string;
  products: RecoveryProduct[];
}

export default function BlogRecoveryCallout({ locale, products }: Props) {
  const isAr = locale === 'ar';
  const isRtl = isAr;
  const [copied, setCopied] = useState(false);

  if (!products || products.length === 0) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SITE_CONFIG.iherbRewardsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="my-12 bg-gradient-to-br from-[#FAF7F2] via-white to-[#F4EFE6] rounded-3xl p-6 sm:p-8 border border-[#D4A96A]/40 shadow-sm space-y-6">
      {/* Header & Coupon Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#D4A96A]/25">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#D4A96A]" />
            <span>{isRtl ? 'مستلزمات العافية والتعافي الموصى بها' : 'Curated Recovery Essentials'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1A1A2E]">
            {isRtl ? 'المكملات والأعشاب الموصى بها سريرياً' : 'Doctor-Curated Recovery & Herbal Essentials'}
          </h3>
        </div>

        {/* Coupon Chip */}
        <div className="bg-white border border-[#D4A96A]/40 rounded-2xl px-3.5 py-2 flex items-center gap-3 shrink-0 shadow-2xs">
          <div className="text-xs">
            <span className="text-gray-500 block text-[10px]">
              {isRtl ? 'خصم ٥–١٠٪ برمز:' : '5–10% Off Code:'}
            </span>
            <span className="font-mono font-bold text-[#2D6A4F] text-sm tracking-wider">
              {SITE_CONFIG.iherbRewardsCode}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            aria-label="Copy discount code"
            className="p-1.5 bg-[#2D6A4F]/10 hover:bg-[#2D6A4F] text-[#2D6A4F] hover:text-white rounded-lg transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Product List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.slice(0, 3).map((product) => {
          const productUrl = getProductReferralUrl(product);
          const title = isAr ? product.nameAr : product.name;
          const benefit = isAr ? product.benefitAr : product.benefit;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 border border-gray-200/80 hover:border-[#D4A96A]/60 transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {isRtl ? product.categoryAr : product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-sm text-[#1A1A2E] leading-snug group-hover:text-[#2D6A4F] transition-colors line-clamp-2">
                    {title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">{product.brand}</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-sans bg-[#FAF7F2] p-2.5 rounded-xl line-clamp-3">
                  {benefit}
                </p>
              </div>

              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 text-[11px]">{isRtl ? 'السعر التقديري:' : 'Est. Price:'}</span>
                  <span className="font-mono font-semibold text-gray-800 text-xs">{product.estimatedPrice}</span>
                </div>
                <a
                  href={productUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-semibold transition-all shadow-2xs group/btn cursor-pointer"
                >
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? 'عرض على iHerb' : 'View on iHerb'}</span>
                  <ExternalLink className="w-3 h-3 opacity-80 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="flex items-center gap-2 text-[11px] text-gray-500 font-sans pt-1">
        <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
        <span>
          {isRtl
            ? 'يتم تطبيق رمز الخصم QAO6090 تلقائياً عند الدفع عبر روابطنا مع شحن سريع إلى دول الخليج والمملكة المتحدة.'
            : 'Discount code QAO6090 is automatically applied at checkout with express delivery across GCC and UK.'}
        </span>
      </div>
    </div>
  );
}
