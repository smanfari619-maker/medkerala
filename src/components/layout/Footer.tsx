import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin, MessageCircle, Heart, ChevronRight, ShieldCheck, Award, Activity } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  const treatmentLinks = [
    { href: '/treatments/cardiac', label: 'Cardiac Bypass Surgery' },
    { href: '/treatments/orthopaedics', label: 'Joint & Hip Replacement' },
    { href: '/treatments/dental', label: 'Premium Dental Care' },
    { href: '/ayurveda', label: 'Ayurveda & Panchakarma' },
    { href: '/treatments/fertility', label: 'IVF & Fertility Care' },
  ];

  const quickLinks = [
    { href: '/about', label: tNav('about') },
    { href: '/services', label: tNav('services') },
    { href: '/why-kerala', label: tNav('whyKerala') },
    { href: '/blog', label: tNav('blog') },
    { href: '/faq', label: tNav('faq') },
    { href: '/contact', label: tNav('contact') },
    { href: '/get-estimate', label: tCommon('getEstimate') },
  ];

  return (
    <footer className="bg-[#0A1C15] text-slate-300 pt-16 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-8 border-t border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-6 lg:pr-8">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.svg"
                alt="TreatInKerala Logo"
                className="h-5 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-sans max-w-sm">
              {t('tagline')}
            </p>
            <div className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-5 border border-white/10 space-y-2 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-[#D4A96A] tracking-widest uppercase block">
                {t('emergencyLabel')}
              </span>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-3 text-white hover:text-[#D4A96A] transition-colors text-base sm:text-lg font-display tracking-wide min-h-[44px]"
              >
                <div className="h-8 w-8 rounded-full bg-[#D4A96A]/20 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-[#D4A96A]" />
                </div>
                <span dir="ltr" className="whitespace-nowrap">{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-b border-white/5 md:border-none pb-2 md:pb-0">
            {/* Mobile Accordion */}
            <details className="md:hidden group">
              <summary className="flex items-center justify-between text-white text-base font-semibold py-2.5 list-none cursor-pointer focus:outline-hidden [&::-webkit-details-marker]:hidden">
                <span>{locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}</span>
                <ChevronRight className="h-4 w-4 text-[#D4A96A] transition-transform duration-200 group-open:rotate-90 rtl:rotate-180" />
              </summary>
              <ul className="space-y-1 mt-2 pb-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white py-1.5 min-h-[44px]">
                      <ChevronRight className="h-3.5 w-3.5 text-[#D4A96A] shrink-0 rtl:rotate-180" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            {/* Desktop Flat View */}
            <div className="hidden md:block">
              <h3 className="text-white/90 text-xs uppercase tracking-[0.2em] font-bold mb-6 pb-3 border-b border-white/10 relative">
                <span className="absolute start-0 bottom-0 w-8 h-[1px] bg-[#D4A96A]"></span>
                {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200 py-1 min-h-[32px] inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Treatments Col */}
          <div className="border-b border-white/5 md:border-none pb-2 md:pb-0">
            {/* Mobile Accordion */}
            <details className="md:hidden group">
              <summary className="flex items-center justify-between text-white text-base font-semibold py-2.5 list-none cursor-pointer focus:outline-hidden [&::-webkit-details-marker]:hidden">
                <span>{tNav('treatments')}</span>
                <ChevronRight className="h-4 w-4 text-[#D4A96A] transition-transform duration-200 group-open:rotate-90 rtl:rotate-180" />
              </summary>
              <ul className="space-y-1 mt-2 pb-2">
                {treatmentLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white py-1.5 min-h-[44px]">
                      <ChevronRight className="h-3.5 w-3.5 text-[#D4A96A] shrink-0 rtl:rotate-180" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            {/* Desktop Flat View */}
            <div className="hidden md:block">
              <h3 className="text-white/90 text-xs uppercase tracking-[0.2em] font-bold mb-6 pb-3 border-b border-white/10 relative">
                <span className="absolute start-0 bottom-0 w-8 h-[1px] bg-[#D4A96A]"></span>
                {tNav('treatments')}
              </h3>
              <ul className="space-y-3">
                {treatmentLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200 py-1 min-h-[32px] inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Office Contact Info */}
          <div className="pb-2 md:pb-0">
            {/* Mobile Accordion */}
            <details className="md:hidden group">
              <summary className="flex items-center justify-between text-white text-base font-semibold py-2.5 list-none cursor-pointer focus:outline-hidden [&::-webkit-details-marker]:hidden">
                <span>{locale === 'ar' ? 'مكتبنا الرئيسي' : 'Head Office'}</span>
                <ChevronRight className="h-4 w-4 text-[#D4A96A] transition-transform duration-200 group-open:rotate-90 rtl:rotate-180" />
              </summary>
              <ul className="space-y-3 mt-2 pb-2 text-sm">
                <li className="flex items-start gap-3 py-1.5">
                  <MapPin className="h-5 w-5 text-[#D4A96A] shrink-0 mt-0.5" />
                  <span className="text-slate-400">
                    {locale === 'ar' ? SITE_CONFIG.officeAddressAr : SITE_CONFIG.officeAddressEn}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#D4A96A] shrink-0" />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-slate-400 hover:text-white py-1.5 min-h-[44px] flex items-center">
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#D4A96A] shrink-0" />
                  <a href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`} className="text-slate-400 hover:text-white py-1.5 min-h-[44px] flex items-center" target="_blank" rel="noopener noreferrer">
                    {SITE_CONFIG.phone}
                  </a>
                </li>
              </ul>
            </details>

            {/* Desktop Flat View */}
            <div className="hidden md:block">
              <h3 className="text-white/90 text-xs uppercase tracking-[0.2em] font-bold mb-6 pb-3 border-b border-white/10 relative">
                <span className="absolute start-0 bottom-0 w-8 h-[1px] bg-[#D4A96A]"></span>
                {locale === 'ar' ? 'مكتبنا الرئيسي' : 'Head Office'}
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin className="h-4 w-4 text-[#D4A96A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {locale === 'ar'
                      ? SITE_CONFIG.officeAddressAr
                      : SITE_CONFIG.officeAddressEn}
                  </span>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors min-h-[32px]"
                  >
                    <Mail className="h-4 w-4 text-[#D4A96A] shrink-0" />
                    <span>{SITE_CONFIG.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors min-h-[32px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 text-[#D4A96A] shrink-0" />
                    <span dir="ltr">{SITE_CONFIG.phone}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accreditations Strip */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 opacity-80">
              <Heart className="h-3.5 w-3.5 text-[#D4A96A] shrink-0" />
              <span>{tCommon('trustMicroText')}</span>
            </span>
            <span className="h-3 w-px bg-white/10 hidden sm:block"></span>
            <span className="flex items-center gap-1.5 opacity-80">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4A96A] shrink-0" />
              <span className="font-medium tracking-wide">SSL SECURED</span>
            </span>
            <span className="h-3 w-px bg-white/10 hidden sm:block"></span>
            <span className="flex items-center gap-1.5 opacity-80">
              <Activity className="h-3.5 w-3.5 text-[#D4A96A] shrink-0" />
              <span className="font-medium tracking-wide">NABH & JCI STANDARDS</span>
            </span>
            <span className="h-3 w-px bg-white/10 hidden sm:block"></span>
            <span className="flex items-center gap-1.5 opacity-80">
              <Award className="h-3.5 w-3.5 text-[#D4A96A] shrink-0" />
              <span className="font-medium tracking-wide">{locale === 'ar' ? 'شريك رسمي معتمد' : 'OFFICIAL PARTNER'}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-[10px] font-bold tracking-[0.2em] text-[#D4A96A]/70 uppercase">
            <span>Network: JCI & NABH Accredited</span>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} TreatInKerala. {t('rights')}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 min-h-[44px] flex items-center">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-slate-400 min-h-[44px] flex items-center">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
