'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';

export default function WhatsAppFAB() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Delay FAB appearance by 3s
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t1);
  }, []);

  // Auto-open tooltip briefly after FAB appears
  useEffect(() => {
    if (!visible) return;
    const t2 = setTimeout(() => {
      setTooltipOpen(true);
      const t3 = setTimeout(() => setTooltipOpen(false), 5500);
      return () => clearTimeout(t3);
    }, 700);
    return () => clearTimeout(t2);
  }, [visible]);

  if (!visible) return null;

  const waUrl = `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    isRtl
      ? 'مرحباً ميدكيرلا، أود الاستفسار عن العلاج الطبي في كيرلا.'
      : 'Hello MedKerala, I would like to inquire about medical treatment in Kerala.'
  )}`;

  return (
    <div
      className={`hidden lg:flex fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex-col ${isRtl ? 'items-start' : 'items-end'} gap-3`}
      style={{ animation: 'fadeInUp 0.4s ease-out' }}
    >
      {/* Tooltip chat bubble */}
      {tooltipOpen && (
        <div
          className={`flex items-start gap-2 bg-white rounded-2xl shadow-xl border border-[#D4A96A]/20 p-4 max-w-[240px]`}
          style={{ animation: 'fadeInUp 0.3s ease-out' }}
        >
          <div className="flex-1 min-w-0 text-left rtl:text-right">
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
              </span>
              <span className="text-[11px] font-bold text-[#25D366] uppercase tracking-wide">
                {isRtl ? 'متاح الآن' : 'Available Now'}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-tight font-sans">
              {isRtl ? 'تحدث مع منسقنا الطبي' : 'Chat with our coordinator'}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              {isRtl ? 'نرد خلال دقائق قليلة' : 'Replies within minutes'}
            </p>
          </div>
          <button
            onClick={() => setTooltipOpen(false)}
            className="text-slate-400 hover:text-slate-600 shrink-0 p-0.5 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main FAB */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setTooltipOpen(false)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label={isRtl ? 'تحدث معنا على واتساب' : 'Chat with us on WhatsApp'}
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
