'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  FileText, ChevronDown, HelpCircle,
  ShieldAlert, Building2, Package, MessageCircle, BookOpen, Info,
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
    { href: '/about',       label: t('about'),      icon: Info },
    { href: '/packages',    label: t('packages'),   icon: Package },
    { href: '/hospitals',   label: t('hospitals'),  icon: Building2 },
    { href: '/services',    label: t('services'),   icon: FileText },
    { href: '/why-kerala',  label: t('whyKerala'),  icon: ShieldAlert },
    { href: '/blog',        label: t('blog'),       icon: BookOpen },
    { href: '/faq',         label: t('faq'),        icon: HelpCircle },
  ];

  const tabletNav = [
    { href: '/treatments', label: t('treatments') },
    { href: '/ayurveda', label: t('ayurveda') },
    { href: '/packages', label: t('packages') },
    { href: '/hospitals', label: t('hospitals') },
    { href: '/services', label: t('services') },
    { href: '/why-kerala', label: t('whyKerala') },
    { href: '/blog', label: t('blog') },
    { href: '/faq', label: t('faq') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];



  const activeLink = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const isMoreActive = secondaryNav.some((item) => activeLink(item.href));

  return (
    <header
      className={`left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'fixed bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5'
          : 'absolute bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <img
              src="/images/logo.svg"
              alt="TreatInKerala Logo"
              className="h-6 w-auto object-contain"
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNav.map((item) => {
              const isActive = activeLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-[#1B4332] bg-[#1B4332]/8 font-semibold'
                      : 'text-[#374151] hover:text-[#1B4332] hover:bg-[#1B4332]/5'
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
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isMoreActive
                    ? 'text-[#1B4332] bg-[#1B4332]/8 font-semibold'
                    : 'text-[#374151] hover:text-[#1B4332] hover:bg-[#1B4332]/5'
                }`}
                aria-expanded={moreOpen}
              >
                {isRtl ? 'المزيد' : 'More'}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {moreOpen && (
                <div className="absolute top-full mt-2 start-0 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fade-in">
                  {secondaryNav.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = activeLink(item.href);
                    return (
                      <React.Fragment key={item.href}>
                        {i === 2 && (
                          <div className="my-1.5 mx-3 border-t border-slate-100" />
                        )}
                        <Link
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                            isActive
                              ? 'text-[#1B4332] bg-[#1B4332]/6 font-semibold'
                              : 'text-[#374151] hover:text-[#1B4332] hover:bg-slate-50'
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
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <LocaleSwitcher />

            <div className="w-px h-5 bg-slate-200 mx-0.5" />

            {/* WhatsApp availability pill */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#25D366]/40 hover:border-[#25D366] bg-emerald-50/50 hover:bg-emerald-50 text-[#1B4332] transition-all duration-200 text-xs font-semibold group shadow-2xs"
              aria-label="Chat on WhatsApp"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#25D366]" />
              </span>
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              <span>{isRtl ? 'متاح الآن' : 'Chat'}</span>
            </a>

            <Link
              href="/get-estimate"
              className="btn-primary text-sm font-semibold px-5 py-2.5 whitespace-nowrap inline-flex items-center justify-center cursor-pointer"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>

          {/* Mobile/Tablet Actions */}
          <div className="flex lg:hidden items-center gap-2.5 flex-shrink-0">
            <LocaleSwitcher />
            <Link
              href="/get-estimate"
              className="hidden md:inline-flex btn-primary text-xs font-semibold px-4 py-2 whitespace-nowrap items-center justify-center cursor-pointer"
            >
              {tCommon('getEstimate')}
            </Link>
          </div>

        </div>

        {/* Tablet Horizontal Scrollable Pill Navigation */}
        <div 
          className="hidden md:flex lg:hidden mt-3 border-t border-[#D4A96A]/15 pt-2.5 overflow-x-auto no-scrollbar scroll-momentum items-center gap-2 px-1 scroll-mask-fade pb-1"
        >
          {tabletNav.map((item) => {
            const isActive = activeLink(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-[#2D6A4F] font-semibold'
                    : 'text-[#4A4A6A] bg-white border border-[#D4A96A]/20 hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

      </div>
    </header>
  );
}
