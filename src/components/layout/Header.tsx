'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  FileText, ChevronDown, HelpCircle,
  ShieldAlert, Building2, Package, MessageCircle,
} from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { SITE_CONFIG } from '@/lib/config';

export default function Header() {
  const t = useTranslations('Nav');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = locale === 'ar';


  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Only 3 core primary links — keeps the bar clean
  const primaryNav = [
    { href: '/treatments', label: t('treatments') },
    { href: '/ayurveda', label: t('ayurveda') },
    { href: '/contact', label: t('contact') },
  ];

  // Everything else lives under "More"
  const secondaryNav = [
    { href: '/packages',    label: t('packages'),   icon: Package },
    { href: '/hospitals',   label: t('hospitals'),  icon: Building2 },
    { href: '/services',    label: t('services'),   icon: FileText },
    { href: '/why-kerala',  label: t('whyKerala'),  icon: ShieldAlert },
    { href: '/faq',         label: t('faq'),        icon: HelpCircle },
  ];



  const activeLink = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const isMoreActive = secondaryNav.some((item) => activeLink(item.href));

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/96 backdrop-blur-md shadow-sm border-b border-[#D4A96A]/35 py-2'
          : 'bg-[#FAF7F2] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-xl font-semibold font-display text-[#2D6A4F] tracking-tight group-hover:text-[#1B4332] transition-colors duration-300">
              {isRtl ? (
                <>علاج في <span className="text-[#D4A96A]">كيرلا</span></>
              ) : (
                <>TreatIn<span className="text-[#D4A96A]">Kerala</span></>
              )}
            </span>
            {/* Slim trust badge — icon only on smaller widths */}
            <span className="hidden sm:inline-flex items-center gap-1 bg-[#2D6A4F]/8 border border-[#2D6A4F]/15 text-[#2D6A4F] rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-tight select-none leading-tight">
              🛡️ {isRtl ? 'شريك معتمد' : 'Partner'}
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-0.5" dir={isRtl ? 'rtl' : 'ltr'}>
            {primaryNav.map((item) => {
              const isActive = activeLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-[#2D6A4F] bg-[#2D6A4F]/8 font-semibold'
                      : 'text-[#4A4A6A] hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* ── More dropdown ── */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isMoreActive
                    ? 'text-[#2D6A4F] bg-[#2D6A4F]/8 font-semibold'
                    : 'text-[#4A4A6A] hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5'
                }`}
                aria-expanded={moreOpen}
              >
                {isRtl ? 'المزيد' : 'More'}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {moreOpen && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-2xl shadow-xl border border-[#D4A96A]/30 py-2 z-50 animate-fade-in">
                  {/* subtle divider between sections */}
                  {secondaryNav.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = activeLink(item.href);
                    return (
                      <React.Fragment key={item.href}>
                        {i === 2 && (
                          <div className="my-1.5 mx-3 border-t border-[#D4A96A]/30" />
                        )}
                        <Link
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                            isActive
                              ? 'text-[#2D6A4F] bg-[#2D6A4F]/6'
                              : 'text-[#4A4A6A] hover:text-[#2D6A4F] hover:bg-[#FAF7F2]'
                          }`}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0 text-[#D4A96A]" />
                          {item.label}
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <LocaleSwitcher />

            <div className="w-px h-5 bg-[#D4A96A]/25 mx-0.5" />

            {/* WhatsApp availability pill */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#25D366]/30 hover:border-[#25D366]/60 hover:bg-emerald-50/60 text-[#1B4332] transition-all duration-300 text-xs font-semibold group"
              aria-label="Chat on WhatsApp"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#25D366]" />
              </span>
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              <span>{isRtl ? 'متاح' : 'Chat'}</span>
            </a>

            <Link
              href="/get-estimate"
              className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>

          {/* Mobile Actions: Only LocaleSwitcher */}
          <div className="flex lg:hidden items-center gap-2">
            <LocaleSwitcher />
          </div>

        </div>
      </div>
    </header>
  );
}
