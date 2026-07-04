'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MessageCircle, FileSpreadsheet } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function MobileStickyCTA() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const waUrl = `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    isRtl
      ? 'مرحباً ميدكيرلا، أود الاستفسار عن العلاج الطبي في كيرلا.'
      : 'Hello MedKerala, I would like to inquire about medical treatment in Kerala.'
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#D4A96A]/20 px-4 py-3 flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden justify-between items-center">
      {/* WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-1.5 min-h-[44px] shadow-sm active:scale-95 transition-all"
      >
        <MessageCircle className="h-4.5 w-4.5 text-white" />
        <span>{isRtl ? 'واتساب' : 'WhatsApp'}</span>
      </a>

      {/* Get Estimate Button */}
      <Link
        href="/get-estimate"
        className="flex-1 bg-primary-green hover:bg-primary-dark text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-1.5 min-h-[44px] shadow-sm active:scale-95 transition-all"
      >
        <FileSpreadsheet className="h-4.5 w-4.5 text-white" />
        <span>{isRtl ? 'احصل على تسعيرة' : 'Get Estimate'}</span>
      </Link>
    </div>
  );
}
