'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import {
  Home, Stethoscope, Calculator, MessageCircle, MoreHorizontal,
  Leaf, Package, Building2, HelpCircle, ShieldAlert, X, PhoneCall, BookOpen,
  Globe, Sparkles, Send, FileText
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function MobileBottomNav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isRtl = locale === 'ar';
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
    setDrawerOpen(false);
  };

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
    { href: '/ayurveda', label: t('ayurveda'), icon: Leaf, highlight: true },
    { href: '/packages', label: t('packages'), icon: Package },
    { href: '/hospitals', label: t('hospitals'), icon: Building2 },
    { href: '/services', label: t('services'), icon: FileText },
    { href: '/why-kerala', label: t('whyKerala'), icon: ShieldAlert },
    { href: '/blog', label: t('blog'), icon: BookOpen },
    { href: '/faq', label: t('faq'), icon: HelpCircle },
    { href: '/contact', label: t('contact'), icon: PhoneCall },
  ];

  return (
    <>
      {/* Floating Glassmorphic Dock */}
      <div className="fixed bottom-3 sm:bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-full max-w-md z-50 md:hidden pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
        <nav
          className="pointer-events-auto bg-[#FAF7F2]/92 backdrop-blur-2xl border border-white/90 shadow-[0_12px_32px_rgba(27,67,50,0.12),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.04] rounded-[14px] p-1 flex items-center justify-between gap-0.5 transition-all duration-300"
          dir={isRtl ? 'rtl' : 'ltr'}
          aria-label="Mobile Navigation"
        >
          {/* Home */}
          <Link
            href="/"
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-[10px] transition-all duration-200 tap-active ${
              activeLink('/')
                ? 'bg-[#1B4332]/10 text-[#1B4332] font-bold shadow-2xs'
                : 'text-[#5D6B64] hover:text-[#1B4332]'
            }`}
          >
            <Home className={`h-4.5 w-4.5 transition-transform ${activeLink('/') ? 'scale-110 text-[#1B4332]' : ''}`} />
            <span className="text-[11px] tracking-tight mt-0.5 leading-tight">{t('home')}</span>
          </Link>

          {/* Treatments */}
          <Link
            href="/treatments"
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-[10px] transition-all duration-200 tap-active ${
              activeLink('/treatments')
                ? 'bg-[#1B4332]/10 text-[#1B4332] font-bold shadow-2xs'
                : 'text-[#5D6B64] hover:text-[#1B4332]'
            }`}
          >
            <Stethoscope className={`h-4.5 w-4.5 transition-transform ${activeLink('/treatments') ? 'scale-110 text-[#1B4332]' : ''}`} />
            <span className="text-[11px] tracking-tight mt-0.5 leading-tight">{t('treatments')}</span>
          </Link>

          {/* Center Compact Luxury Concierge Chat */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
            className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-[10px] bg-gradient-to-tr from-[#1B4332] via-[#2D6A4F] to-[#1E513B] text-white shadow-[0_2px_8px_rgba(27,67,50,0.25)] ring-1 ring-white/60 transition-all duration-200 tap-active group hover:brightness-105 cursor-pointer relative"
            aria-label="Open AI Concierge Chat"
          >
            <div className="relative">
              <Sparkles className="h-4.5 w-4.5 text-[#BAD7B0] group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </span>
            </div>
            <span className="text-[11px] font-bold tracking-tight mt-0.5 leading-tight text-white whitespace-nowrap">
              {isRtl ? 'محادثة' : 'Chat'}
            </span>
          </button>

          {/* Get Estimate */}
          <Link
            href="/get-estimate"
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-[10px] transition-all duration-200 tap-active ${
              activeLink('/get-estimate')
                ? 'bg-[#1B4332]/10 text-[#1B4332] font-bold shadow-2xs'
                : 'text-[#5D6B64] hover:text-[#1B4332]'
            }`}
          >
            <Calculator className={`h-4.5 w-4.5 transition-transform ${activeLink('/get-estimate') ? 'scale-110 text-[#1B4332]' : ''}`} />
            <span className="text-[11px] tracking-tight mt-0.5 leading-tight">{isRtl ? 'تسعيرة' : 'Estimate'}</span>
          </Link>

          {/* More menu trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-[10px] transition-all duration-200 tap-active text-[#5D6B64] hover:text-[#1B4332] cursor-pointer ${
              drawerOpen ? 'bg-[#1B4332]/10 text-[#1B4332] font-bold' : ''
            }`}
            aria-label="More navigation links"
          >
            <MoreHorizontal className="h-4.5 w-4.5" />
            <span className="text-[11px] tracking-tight mt-0.5 leading-tight">{isRtl ? 'المزيد' : 'More'}</span>
          </button>
        </nav>
      </div>

      {/* Luxury Drawer Bottom Sheet */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[65] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1A1A2E]/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Bottom Card */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#FAF7F2] rounded-t-[18px] border-t border-[#D4A96A]/30 pb-[calc(3rem+env(safe-area-inset-bottom,16px))] p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto scroll-momentum animate-sheet-up shadow-[0_-12px_40px_rgba(0,0,0,0.18)]"
          >
            {/* Grabber line */}
            <div className="w-12 h-1 bg-[#D4A96A]/40 rounded-full mx-auto" />

            {/* Header & Quick Language Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                <h3 className="text-base font-bold font-display text-[#1B4332]">
                  {isRtl ? 'دليل علاج في كيرلا' : 'TreatInKerala Directory'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLocale}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-white border border-[#D4A96A]/30 text-xs font-semibold text-[#1B4332] shadow-2xs tap-active cursor-pointer"
                >
                  <Globe className="h-3.5 w-3.5 text-[#D4A96A]" />
                  <span>{isRtl ? 'English' : 'العربية'}</span>
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-[10px] bg-black/5 text-[#4A4A6A] hover:bg-black/10 active:scale-95 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-[14px] bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white shadow-md tap-active ring-1 ring-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="text-left rtl:text-right">
                  <p className="text-xs font-bold">{isRtl ? 'تواصل عبر واتساب مباشرة' : 'Direct WhatsApp Concierge'}</p>
                  <p className="text-[10px] text-[#BAD7B0] font-light">{isRtl ? 'رد فوري واستشارة مجانية' : 'Instant response & free quotes'}</p>
                </div>
              </div>
              <Send className="h-4 w-4 text-[#BAD7B0] rtl:rotate-180" />
            </a>

            {/* Grid of menu items */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeLink(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-2.5 p-3 rounded-[12px] border text-xs font-medium tap-active transition-all ${
                      isActive
                        ? 'bg-[#2D6A4F]/10 border-[#2D6A4F]/30 text-[#1B4332] font-semibold'
                        : 'bg-white border-[#D4A96A]/20 text-[#1A1A2E] hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    <span className={`p-2 rounded-[8px] shrink-0 ${isActive ? 'bg-[#2D6A4F] text-white' : 'bg-[#FAF7F2] text-[#2D6A4F] border border-[#D4A96A]/20'}`}>
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

