'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D4A96A]/30 text-sm font-medium text-[#4A4A6A] hover:text-[#2D6A4F] hover:border-[#2D6A4F]/50 transition-all duration-300 bg-white shadow-xs cursor-pointer"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4 text-[#2D6A4F]" />
      <span>{locale === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
