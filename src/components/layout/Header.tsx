'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, Heart, Leaf, HelpCircle, PhoneCall, ShieldAlert, Award, FileText, ChevronDown, Building2 } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import { SITE_CONFIG } from '@/lib/config';

export default function Header() {
  const t = useTranslations('Nav');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const pathname = usePathname();
  const isRtl = locale === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Primary nav links — visible as flat text links on desktop
  const primaryNav = [
    { href: '/treatments', label: t('treatments') },
    { href: '/ayurveda', label: t('ayurveda') },
    { href: '/services', label: t('services') },
    { href: '/contact', label: t('contact') },
  ];

  // Secondary links grouped under "More" dropdown
  const secondaryNav = [
    { href: '/hospitals', label: t('hospitals'), icon: Building2 },
    { href: '/why-kerala', label: t('whyKerala'), icon: ShieldAlert },
    { href: '/faq', label: t('faq'), icon: HelpCircle },
  ];

  // All items for mobile drawer
  const allNavItems = [
    { href: '/', label: t('home'), icon: Heart },
    { href: '/treatments', label: t('treatments'), icon: Award },
    { href: '/ayurveda', label: t('ayurveda'), icon: Leaf },
    { href: '/hospitals', label: t('hospitals'), icon: Building2 },
    { href: '/services', label: t('services'), icon: FileText },
    { href: '/why-kerala', label: t('whyKerala'), icon: ShieldAlert },
    { href: '/faq', label: t('faq'), icon: HelpCircle },
    { href: '/contact', label: t('contact'), icon: PhoneCall },
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
          ? 'bg-[#FAF7F2]/96 backdrop-blur-md shadow-sm border-b border-[#D4A96A]/20 py-2.5'
          : 'bg-[#FAF7F2] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1.5 group flex-shrink-0">
            <span className="text-xl font-semibold font-display text-[#2D6A4F] tracking-tight group-hover:text-[#1B4332] transition-colors duration-300">
              {isRtl ? (
                <>
                  ميد<span className="text-[#D4A96A]">كيرلا</span>
                </>
              ) : (
                <>
                  Med<span className="text-[#D4A96A]">Kerala</span>
                </>
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" dir={isRtl ? 'rtl' : 'ltr'}>
            {primaryNav.map((item) => {
              const isActive = activeLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-[#2D6A4F] bg-[#2D6A4F]/8 font-semibold'
                      : 'text-[#4A4A6A] hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* "More" dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isMoreActive
                    ? 'text-[#2D6A4F] bg-[#2D6A4F]/8 font-semibold'
                    : 'text-[#4A4A6A] hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5'
                }`}
                aria-expanded={moreOpen}
              >
                More
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {moreOpen && (
                <div className="absolute top-full mt-1.5 left-0 w-44 bg-white rounded-xl shadow-lg border border-[#D4A96A]/15 py-1.5 animate-fade-in z-50">
                  {secondaryNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeLink(item.href);
                    return (
                      <Link
                        key={item.href}
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
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <LocaleSwitcher />
            <div className="w-px h-5 bg-[#D4A96A]/25 mx-1" />

            {/* WhatsApp with live availability signal */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#25D366]/30 hover:border-[#25D366]/70 hover:bg-emerald-50/50 text-[#2D6A4F] transition-all duration-300 text-sm font-semibold group"
              aria-label="Chat on WhatsApp"
            >
              {/* Live pulse dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
              </span>
              <span className="text-xs">{isRtl ? 'متاح الآن' : 'Available Now'}</span>
            </a>

            <Link
              href="/get-estimate"
              className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LocaleSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center p-2 rounded-lg text-[#2D6A4F] hover:bg-[#B7E4C7]/20 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-30 bg-[#1A1A2E]/40" onClick={() => setIsOpen(false)} />
          <nav
            className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} bottom-0 z-40 w-4/5 max-w-sm bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-${isRtl ? 'r' : 'l'} border-[#D4A96A]/20`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4A96A]/20">
                <span className="text-xl font-bold font-display text-[#2D6A4F]">
                  {isRtl ? (
                    <>
                      ميد<span className="text-[#D4A96A]">كيرلا</span>
                    </>
                  ) : (
                    <>
                      Med<span className="text-[#D4A96A]">Kerala</span>
                    </>
                  )}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-[#2D6A4F] hover:bg-[#B7E4C7]/20 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeLink(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 min-h-[48px] ${
                        isActive
                          ? 'text-[#2D6A4F] bg-[#B7E4C7]/25 font-bold'
                          : 'text-[#4A4A6A] hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5'
                      }`}
                    >
                      <span className={`flex-shrink-0 p-1.5 rounded-lg ${isActive ? 'bg-[#2D6A4F]/10' : 'bg-[#D4A96A]/10'}`}>
                        <Icon className={`h-4 w-4 ${isActive ? 'text-[#2D6A4F]' : 'text-[#D4A96A]'}`} />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D4A96A]/20 flex flex-col gap-3">
              <Link
                href="/get-estimate"
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold py-3.5 px-4 rounded-full text-center text-base transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center"
              >
                {tCommon('getEstimate')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
