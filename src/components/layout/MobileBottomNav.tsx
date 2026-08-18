'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import {
  Home, Stethoscope, FileText, MessageCircle, MoreHorizontal,
  Leaf, Package, Building2, HelpCircle, ShieldAlert, X, PhoneCall, BookOpen,
  Globe, Sparkles, Send
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function MobileBottomNav() {
  const t = useTranslations('Nav');
  const tCommon = useTranslations('Common');
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
      {/* Fixed Luxury Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#D4A96A]/30 pb-[env(safe-area-inset-bottom,8px)] md:hidden shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
        <nav className="flex justify-around items-center h-[68px] px-2 max-w-lg mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-active relative ${
              activeLink('/') ? 'text-[#1B4332] font-bold' : 'text-[#5D6B64]'
            }`}
          >
            <Home className={`h-5 w-5 mb-1 transition-transform ${activeLink('/') ? 'scale-110 text-[#2D6A4F]' : ''}`} />
            <span className="text-[10px] tracking-tight">{t('home')}</span>
            {activeLink('/') && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] absolute bottom-1.5 shadow-xs" />
            )}
          </Link>

          {/* Treatments */}
          <Link
            href="/treatments"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-active relative ${
              activeLink('/treatments') ? 'text-[#1B4332] font-bold' : 'text-[#5D6B64]'
            }`}
          >
            <Stethoscope className={`h-5 w-5 mb-1 transition-transform ${activeLink('/treatments') ? 'scale-110 text-[#2D6A4F]' : ''}`} />
            <span className="text-[10px] tracking-tight">{t('treatments')}</span>
            {activeLink('/treatments') && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] absolute bottom-1.5 shadow-xs" />
            )}
          </Link>

          {/* Center Concierge AI Live Chat */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
            className="flex flex-col items-center justify-center flex-1 h-full relative group tap-active cursor-pointer"
            aria-label="Open AI Live Chat"
          >
            <div className="absolute -top-3.5 bg-gradient-to-tr from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white p-3 rounded-full shadow-[0_6px_20px_rgba(27,67,50,0.45)] border-2 border-[#FAF7F2] flex items-center justify-center transition-all group-active:scale-95">
              <span className="relative flex h-2 w-2 absolute top-1 right-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </span>
              <MessageCircle className="h-5.5 w-5.5 text-[#BAD7B0]" />
            </div>
            <span className="text-[10px] font-bold text-[#1B4332] mt-7 tracking-tight">
              {isRtl ? 'استشارة فورية' : 'Live Chat'}
            </span>
          </button>

          {/* Get Estimate */}
          <Link
            href="/get-estimate"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-active relative ${
              activeLink('/get-estimate') ? 'text-[#1B4332] font-bold' : 'text-[#5D6B64]'
            }`}
          >
            <FileText className={`h-5 w-5 mb-1 transition-transform ${activeLink('/get-estimate') ? 'scale-110 text-[#2D6A4F]' : ''}`} />
            <span className="text-[10px] tracking-tight">{isRtl ? 'تسعيرة' : 'Estimate'}</span>
            {activeLink('/get-estimate') && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] absolute bottom-1.5 shadow-xs" />
            )}
          </Link>

          {/* More menu trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full tap-active text-[#5D6B64] cursor-pointer"
          >
            <MoreHorizontal className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium tracking-tight">{isRtl ? 'المزيد' : 'More'}</span>
          </button>
        </nav>
      </div>

      {/* Drawer bottom sheet */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[65] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1A1A2E]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Bottom Card */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#FAF7F2] rounded-t-[2.25rem] border-t border-[#D4A96A]/35 pb-[calc(2.5rem+env(safe-area-inset-bottom,16px))] p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto scroll-momentum animate-sheet-up shadow-2xl"
          >
            {/* Grabber line */}
            <div className="w-12 h-1.5 bg-[#D4A96A]/40 rounded-full mx-auto" />

            {/* Header & Quick Language Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F]" />
                <h3 className="text-base font-bold font-display text-[#1B4332]">
                  {isRtl ? 'دليل علاج في كيرلا' : 'TreatInKerala Directory'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLocale}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D4A96A]/30 text-xs font-semibold text-[#1B4332] shadow-2xs tap-active cursor-pointer"
                >
                  <Globe className="h-3.5 w-3.5 text-[#D4A96A]" />
                  <span>{isRtl ? 'English' : 'العربية'}</span>
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-full bg-black/5 text-[#4A4A6A] hover:bg-black/10 active:scale-95 cursor-pointer"
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
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white shadow-md tap-active"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
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
            <div className="grid grid-cols-2 gap-2.5">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeLink(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-medium tap-active transition-all ${
                      isActive
                        ? 'bg-[#2D6A4F]/10 border-[#2D6A4F]/30 text-[#1B4332] font-semibold'
                        : 'bg-white border-[#D4A96A]/25 text-[#1A1A2E] hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    <span className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-[#2D6A4F] text-white' : 'bg-[#FAF7F2] text-[#2D6A4F] border border-[#D4A96A]/20'}`}>
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

