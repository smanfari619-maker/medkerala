import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin, MessageCircle, Heart, ChevronRight } from 'lucide-react';
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
    { href: '/services', label: tNav('services') },
    { href: '/why-kerala', label: tNav('whyKerala') },
    { href: '/faq', label: tNav('faq') },
    { href: '/contact', label: tNav('contact') },
    { href: '/get-estimate', label: tCommon('getEstimate') },
  ];

  return (
    <footer className="bg-[#1A1A2E] text-slate-300 pt-16 pb-8 border-t border-[#D4A96A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                {locale === 'ar' ? (
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
            <p className="text-slate-400 text-base leading-relaxed font-sans max-w-sm">
              {t('tagline')}
            </p>
            <div className="bg-[#FAF7F2]/5 rounded-xl p-4 border border-white/5 space-y-3">
              <span className="text-xs font-semibold text-[#D4A96A] tracking-wider uppercase block">
                {t('emergencyLabel')}
              </span>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-2 text-white hover:text-[#D4A96A] transition-colors text-lg font-bold min-h-[44px]"
              >
                <Phone className="h-5 w-5 text-[#D4A96A]" />
                <span dir="ltr">{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 pb-2 border-b border-white/10 relative">
              <span className="absolute left-0 bottom-0 w-8 h-0.5 bg-[#D4A96A]"></span>
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 hover:text-white hover:translate-x-1 transition-all duration-200 py-1 min-h-[44px]"
                  >
                    <ChevronRight className="h-4 w-4 text-[#D4A96A] shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments Col */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 pb-2 border-b border-white/10 relative">
              <span className="absolute left-0 bottom-0 w-8 h-0.5 bg-[#D4A96A]"></span>
              {tNav('treatments')}
            </h3>
            <ul className="space-y-3">
              {treatmentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 hover:text-white hover:translate-x-1 transition-all duration-200 py-1 min-h-[44px]"
                  >
                    <ChevronRight className="h-4 w-4 text-[#D4A96A] shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 pb-2 border-b border-white/10 relative">
              <span className="absolute left-0 bottom-0 w-8 h-0.5 bg-[#D4A96A]"></span>
              {locale === 'ar' ? 'مكتبنا الرئيسي' : 'Head Office'}
            </h3>
            <ul className="space-y-4 text-base">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D4A96A] shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {locale === 'ar'
                    ? SITE_CONFIG.officeAddressAr
                    : SITE_CONFIG.officeAddressEn}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#D4A96A] shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white text-slate-400 min-h-[44px] flex items-center"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#D4A96A] shrink-0" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                  className="hover:text-white text-slate-400 min-h-[44px] flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Accreditations Strip */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
              <Heart className="h-4 w-4 text-[#D4A96A]" />
              {tCommon('trustMicroText')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 text-emerald-400 font-sans font-bold">
              <span>🔒</span>
              <span>SSL SECURED</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 text-[#D4A96A] font-sans font-bold">
              <span>🏥</span>
              <span>NABH & JCI STANDARDS</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-[10px] font-bold tracking-widest text-[#D4A96A]">
            <span>MEMBER: IMTA (INDIAN MEDICAL TOURISM ASSOCIATION)</span>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MedKerala. {t('rights')}</p>
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
