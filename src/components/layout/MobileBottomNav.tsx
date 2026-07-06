'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  Home, Stethoscope, FileText, MessageCircle, MoreHorizontal,
  Leaf, Package, Building2, HelpCircle, ShieldAlert, X, PhoneCall
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function MobileBottomNav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = locale === 'ar';
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeLink = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const waUrl = `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
    isRtl
      ? 'مرحباً علاج في كيرلا، أود الاستفسار عن العلاج الطبي في كيرلا.'
      : 'Hello TreatInKerala, I would like to inquire about medical treatment in Kerala.'
  )}`;

  // Secondary items for bottom sheet
  const secondaryItems = [
    { href: '/ayurveda', label: t('ayurveda'), icon: Leaf },
    { href: '/packages', label: t('packages'), icon: Package },
    { href: '/hospitals', label: t('hospitals'), icon: Building2 },
    { href: '/services', label: t('services'), icon: FileText },
    { href: '/why-kerala', label: t('whyKerala'), icon: ShieldAlert },
    { href: '/faq', label: t('faq'), icon: HelpCircle },
    { href: '/contact', label: t('contact'), icon: PhoneCall },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#D4A96A]/35 pb-[env(safe-area-inset-bottom)] md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <nav className="flex justify-around items-center h-16 px-2" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-active ${
              activeLink('/') ? 'text-[#2D6A4F]' : 'text-text-muted'
            }`}
          >
            <Home className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">{t('home')}</span>
          </Link>

          {/* Treatments */}
          <Link
            href="/treatments"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-active ${
              activeLink('/treatments') ? 'text-[#2D6A4F]' : 'text-text-muted'
            }`}
          >
            <Stethoscope className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">{t('treatments')}</span>
          </Link>

          {/* WhatsApp CTA (Middle / Primary Action) */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center flex-1 h-full relative group tap-active"
          >
            <div className="absolute -top-3 bg-[#25D366] text-white p-3 rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.35)] flex items-center justify-center transition-transform">
              <MessageCircle className="h-5.5 w-5.5 fill-white" />
            </div>
            <span className="text-[10px] font-bold text-[#2D6A4F] mt-7 leading-none">
              {isRtl ? 'اتصال' : 'Chat'}
            </span>
          </a>

          {/* Get Estimate */}
          <Link
            href="/get-estimate"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-active ${
              activeLink('/get-estimate') ? 'text-[#2D6A4F]' : 'text-text-muted'
            }`}
          >
            <FileText className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">{isRtl ? 'تسعيرة' : 'Estimate'}</span>
          </Link>

          {/* More menu trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full tap-active text-text-muted cursor-pointer"
          >
            <MoreHorizontal className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">{isRtl ? 'المزيد' : 'More'}</span>
          </button>
        </nav>
      </div>

      {/* Drawer bottom sheet */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[55] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1A1A2E]/50 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Bottom Card */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#FAF7F2] rounded-t-3xl border-t border-[#D4A96A]/35 pb-[calc(2rem+env(safe-area-inset-bottom))] p-6 space-y-6 max-h-[80vh] overflow-y-auto"
            style={{ animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {/* Grabber line */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto" />

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-primary-dark">
                {isRtl ? 'علاج في كيرلا - القائمة' : 'TreatInKerala Directory'}
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-full bg-slate-200/50 text-[#4A4A6A] hover:bg-slate-200/80 active:scale-95 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Grid of menu items */}
            <div className="grid grid-cols-2 gap-3">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeLink(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border text-sm font-medium tap-active ${
                      isActive
                        ? 'bg-primary-green/8 border-primary-green/20 text-primary-green'
                        : 'bg-white border-[#D4A96A]/40 text-[#1A1A2E] hover:bg-slate-50'
                    }`}
                  >
                    <span className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-primary-green/10 text-primary-green' : 'bg-[#D4A96A]/10 text-[#D4A96A]'}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
