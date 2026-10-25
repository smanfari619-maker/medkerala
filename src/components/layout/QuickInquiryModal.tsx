'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { submitEnquiry } from '@/app/actions/enquiry';
import { trackWhatsAppClick } from '@/lib/whatsappTracking';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRIES = [
  { code: 'OM', dial: '+968', nameEn: 'Oman', nameAr: 'عُمان', flag: '🇴🇲' },
  { code: 'AE', dial: '+971', nameEn: 'UAE', nameAr: 'الإمارات', flag: '🇦🇪' },
  { code: 'SA', dial: '+966', nameEn: 'Saudi Arabia', nameAr: 'السعودية', flag: '🇸🇦' },
  { code: 'KW', dial: '+965', nameEn: 'Kuwait', nameAr: 'الكويت', flag: '🇰🇼' },
  { code: 'QA', dial: '+974', nameEn: 'Qatar', nameAr: 'قطر', flag: '🇶🇦' },
  { code: 'BH', dial: '+973', nameEn: 'Bahrain', nameAr: 'البحرين', flag: '🇧🇭' },
  { code: 'GB', dial: '+44',  nameEn: 'United Kingdom', nameAr: 'بريطانيا', flag: '🇬🇧' },
  { code: 'US', dial: '+1',   nameEn: 'United States', nameAr: 'أمريكا', flag: '🇺🇸' },
  { code: 'CA', dial: '+1',   nameEn: 'Canada', nameAr: 'كندا', flag: '🇨🇦' },
  { code: 'MV', dial: '+960', nameEn: 'Maldives', nameAr: 'المالديف', flag: '🇲🇻' },
  { code: 'NG', dial: '+234', nameEn: 'Nigeria', nameAr: 'نيجيريا', flag: '🇳🇬' },
  { code: 'KE', dial: '+254', nameEn: 'Kenya', nameAr: 'كينيا', flag: '🇰🇪' },
  { code: 'OTHER', dial: '',  nameEn: 'Other Country', nameAr: 'دولة أخرى', flag: '🌍' },
];

export default function QuickInquiryModal({ isOpen, onClose }: QuickInquiryModalProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [name, setName] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('OM'); // Default to Oman
  const [phone, setPhone] = useState('+968 ');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCountryChange = (code: string) => {
    setSelectedCountryCode(code);
    const countryObj = COUNTRIES.find((c) => c.code === code);
    if (countryObj && countryObj.dial) {
      // If user hasn't typed a full number yet or has previous dial code, replace it cleanly
      setPhone(countryObj.dial + ' ');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage(isRtl ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Please enter your name and phone number');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const countryLabel = isRtl ? currentCountry.nameAr : currentCountry.nameEn;
      const fullMessage = `
--- QUICK INQUIRY ---
Patient: ${name.trim()}
Country: ${countryLabel} (${currentCountry.code})
Phone/WhatsApp: ${phone.trim()}
Condition/Request: ${message.trim() || 'General Consultation'}
      `.trim();

      const res = await submitEnquiry({
        name: name.trim(),
        email: 'quick-lead@treatinkerala.com',
        phone: phone.trim(),
        message: fullMessage,
      });

      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(isRtl ? 'حدث خطأ. يرجى المتابعة عبر واتساب مباشرة.' : 'Submission failed. Please reach out via WhatsApp.');
      }
    } catch (err) {
      console.error('Quick inquiry submission failed', err);
      setErrorMessage(isRtl ? 'حدث خطأ. يرجى المتابعة عبر واتساب مباشرة.' : 'Submission failed. Please reach out via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    trackWhatsAppClick({
      topic: 'Quick Bottom Sheet Direct WhatsApp',
      buttonText: 'Direct WhatsApp Link in Bottom Sheet',
    });
    const countryLabel = isRtl ? currentCountry.nameAr : currentCountry.nameEn;
    const waText = isRtl
      ? `مرحباً علاج في كيرلا، أود استشارة طبية. ${name ? `الاسم: ${name}. ` : ''}البلد: ${countryLabel}. ${message ? `الحالة: ${message}` : ''}`
      : `Hello TreatInKerala, I would like a medical consultation. ${name ? `Name: ${name}. ` : ''}Country: ${countryLabel}. ${message ? `Condition: ${message}` : ''}`;
    
    window.open(`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modern Bottom Sheet (Sticks to bottom on mobile, centered card on desktop) */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200/90 overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-8 duration-300 mb-0 sm:my-auto max-h-[92vh] flex flex-col pb-[env(safe-area-inset-bottom,12px)]">
        
        {/* Subtle Mobile Drag Handle Notch */}
        <div className="pt-2.5 pb-1 block sm:hidden">
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />
        </div>

        {/* Clean Header */}
        <div className="px-5 sm:px-6 pt-3 sm:pt-5 pb-3 flex items-start justify-between border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[#1B4332] leading-tight">
              {isRtl ? 'استشارة طبية سريعة' : 'Free Medical Consultation'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isRtl ? 'تقييم كبار الجراحين وعرض سعر رسمي خلال 24 ساعة' : 'Senior surgeon review & hospital quotation'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#1B4332]">
                  {isRtl ? 'تم استلام استفسارك بنجاح' : 'Inquiry Received'}
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  {isRtl
                    ? `سيتواصل معك منسقنا الطبي عبر واتساب على الرقم (${phone}) قريباً.`
                    : `Our medical coordinator will message you on WhatsApp (${phone}) shortly.`}
                </p>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{isRtl ? 'متابعة المحادثة على واتساب' : 'Continue on WhatsApp'}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Minimal 1-Line WhatsApp Bar */}
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/90 text-[#1B4332] text-xs font-semibold transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" />
                  <span>{isRtl ? 'تفضل واتساب مباشرة؟ تواصل الآن' : 'Prefer WhatsApp? Chat directly'}</span>
                </span>
                <span className="text-emerald-700 text-[11px] font-bold group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                  {isRtl ? 'فتح ←' : 'Open →'}
                </span>
              </button>

              {/* Minimal Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {errorMessage && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {isRtl ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRtl ? 'مثال: عبدالله المنصوري' : 'e.g. John Doe / Sarah Smith'}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]/20 bg-slate-50/50 focus:bg-white"
                  />
                </div>

                {/* 2. Country Dropdown Selector & WhatsApp Number (Responsive Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Native Styled Country Picker */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {isRtl ? 'بلد الإقامة' : 'Country'}
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCountryCode}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]/20 appearance-none cursor-pointer pr-8 rtl:pr-3 rtl:pl-8 font-medium text-slate-800"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {isRtl ? c.nameAr : c.nameEn} {c.dial ? `(${c.dial})` : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none rtl:right-auto rtl:left-3" />
                    </div>
                  </div>

                  {/* WhatsApp Phone */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {isRtl ? 'رقم الواتساب *' : 'WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={currentCountry.dial ? `${currentCountry.dial} ...` : '+968 ...'}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]/20 bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* 3. Condition / Treatment Needed */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {isRtl ? 'نوع العلاج أو الأعراض' : 'Condition or Treatment Needed'}
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      isRtl
                        ? 'مثال: استبدال ركبة، جراحة قلب، علاج أيورفيدا، أطفال أنابيب...'
                        : 'e.g. Knee replacement, cardiac, spine, IVF, Ayurveda...'
                    }
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]/20 bg-slate-50/50 focus:bg-white resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-50 text-white shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  {isSubmitting ? (
                    <span>{isRtl ? 'جاري الإرسال...' : 'Sending...'}</span>
                  ) : (
                    <>
                      <span>{isRtl ? 'إرسال طلب الاستشارة المجانية' : 'Get Free Consultation'}</span>
                      <Send className="h-3.5 w-3.5 rtl:rotate-180" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400 pt-0.5">
                  {isRtl ? 'خدمة مجانية • أسعار رسمية من المستشفى • سرية تامة' : 'Free service • Direct hospital billing • 100% confidential'}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
