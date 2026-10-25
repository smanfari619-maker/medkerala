'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { submitEnquiry } from '@/app/actions/enquiry';
import { trackWhatsAppClick } from '@/lib/whatsappTracking';

export default function WhatsAppFAB() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('estimate');
  const [customNote, setCustomNote] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  useEffect(() => {
    // Show quickly after 1.5s
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const topics = [
    {
      id: 'estimate',
      icon: '🩺',
      labelEn: 'Treatment Cost Estimate',
      labelAr: 'تقدير تكلفة العملية أو العلاج',
      msgEn: 'Hello TreatInKerala, I would like to get a free cost estimate for medical treatment in Kerala.',
      msgAr: 'مرحباً علاج في كيرلا، أود الحصول على تقدير تكلفة مجاني للعلاج في كيرلا.',
    },
    {
      id: 'reports',
      icon: '🩻',
      labelEn: 'Send MRI / Medical Reports',
      labelAr: 'إرسال تقارير طبية أو أشعة MRI',
      msgEn: 'Hello TreatInKerala, I have medical reports/scans and would like a doctor evaluation and hospital quotation.',
      msgAr: 'مرحباً علاج في كيرلا، لدي تقارير طبية وأشعة وأود تقييمها من قِبل الطبيب المختص مع عرض السعر.',
    },
    {
      id: 'arabic',
      icon: '💬',
      labelEn: 'Speak with Arabic Coordinator',
      labelAr: 'التحدث مع منسق طبي باللغة العربية',
      msgEn: 'Hello, I would like to speak with an Arabic-speaking medical coordinator regarding hospital options.',
      msgAr: 'مرحباً، أود التحدث مباشرة مع منسق طبي يتحدث العربية بخصوص خيارات العلاج والمستشفيات.',
    },
    {
      id: 'ayurveda',
      icon: '🌿',
      labelEn: 'Ayurveda & Panchakarma',
      labelAr: 'برامج الأيورفيدا والاستشفاء',
      msgEn: 'Hello TreatInKerala, I am interested in authentic Ayurveda / Panchakarma packages in Kerala.',
      msgAr: 'مرحباً علاج في كيرلا، أود الاستفسار عن باقات الأيورفيدا والبانشاكارما في كيرلا.',
    },
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  const getFinalWhatsAppUrl = () => {
    const baseMsg = isRtl ? currentTopic.msgAr : currentTopic.msgEn;
    const extra = customNote.trim() ? `\n\n${isRtl ? 'ملاحظة إضافية:' : 'Note:'} ${customNote.trim()}` : '';
    const fullText = `${baseMsg}${extra}`;
    return `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(fullText)}`;
  };

  const handleQuickCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;

    setIsSubmittingCallback(true);
    try {
      await submitEnquiry({
        name: isRtl ? 'طلب تواصل سريع عبر واتساب' : 'Quick WhatsApp Request',
        email: 'quick-whatsapp@treatinkerala.com',
        phone: callbackPhone.trim(),
        message: `Quick WhatsApp Lead: Interested in "${isRtl ? currentTopic.labelAr : currentTopic.labelEn}". ${customNote ? `Notes: ${customNote}` : ''}`,
      });
      setCallbackSuccess(true);
      setTimeout(() => {
        setCallbackSuccess(false);
        setCallbackPhone('');
        setIsOpen(false);
      }, 3500);
    } catch (err) {
      console.error('Quick callback error', err);
      // Fallback: Open WhatsApp directly
      window.open(getFinalWhatsAppUrl(), '_blank');
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  return (
    <div
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ─── QUICK WHATSAPP CONCIERGE CARD ──────────────────────────────────── */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-[0_12px_45px_rgba(27,67,50,0.22)] border border-[#1B4332]/10 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <MessageCircle className="h-6 w-6 text-[#25D366]" />
                </div>
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-[#25D366] border-2 border-[#1B4332] animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {isRtl ? 'المكتب الطبي المباشر' : 'Kerala Medical Desk'}
                </h3>
                <p className="text-xs text-emerald-200 flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  {isRtl ? 'متصل الآن • الرد خلال دقائق' : 'Active Now • Fast response'}
                </p>
              </div>
            </div>

            {/* Language / Free guarantee pill */}
            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-white/90">
              <span className="flex items-center gap-1 font-medium">
                <span>🇦🇪 🇴🇲 🇸🇦</span>
                <span>{isRtl ? 'مترجم عربي متاح' : 'Arabic & English'}</span>
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                {isRtl ? 'استشارة مجانية 100%' : '100% Free Service'}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3.5 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                {isRtl ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can our medical team help you?'}
              </label>

              {/* Topic chips */}
              <div className="grid grid-cols-1 gap-1.5">
                {topics.map((t) => {
                  const active = t.id === selectedTopic;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopic(t.id)}
                      className={`w-full text-left rtl:text-right px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                        active
                          ? 'bg-[#1B4332]/10 border border-[#1B4332] text-[#1B4332] shadow-2xs font-semibold'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base shrink-0">{t.icon}</span>
                      <span className="flex-1 leading-snug">{isRtl ? t.labelAr : t.labelEn}</span>
                      {active && <CheckCircle2 className="h-4 w-4 text-[#2D6A4F] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional note */}
            <div>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder={
                  isRtl
                    ? 'اكتب تفاصيل إضافية (اختياري: نوع الجراحة، الأعراض...)'
                    : 'Add detail (optional: surgery type, diagnosis...)'
                }
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            {/* PRIMARY DIRECT WHATSAPP ACTION BUTTON */}
            <a
              href={getFinalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick({
                  topic: isRtl ? currentTopic.labelAr : currentTopic.labelEn,
                  buttonText: isRtl ? 'زر المحادثة بالبطاقة العائمة' : 'FAB Card: Start Chat on WhatsApp Now',
                });
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.45)] transition-all cursor-pointer group"
            >
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>{isRtl ? 'بدء المحادثة على واتساب الآن' : 'Start Chat on WhatsApp Now'}</span>
            </a>

            {/* DIVIDER: OR QUICK CALLBACK */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                <span className="bg-white px-2">
                  {isRtl ? 'أو اطلب منا التواصل معك' : 'Or request a WhatsApp callback'}
                </span>
              </div>
            </div>

            {callbackSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-[#1B4332] p-3 rounded-xl text-center text-xs space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{isRtl ? 'تم استلام طلبك بنجاح!' : 'Request Received!'}</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {isRtl
                    ? 'سيتواصل معك منسقنا الطبي عبر واتساب خلال دقائق.'
                    : 'Our coordinator will message you on WhatsApp shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickCallback} className="flex gap-2">
                <input
                  type="tel"
                  required
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  placeholder={isRtl ? 'رقم الواتساب مع رمز الدولة' : 'WhatsApp number with country code'}
                  className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#2D6A4F]"
                />
                <button
                  type="submit"
                  disabled={isSubmittingCallback || !callbackPhone.trim()}
                  className="bg-[#1B4332] hover:bg-[#2D6A4F] disabled:opacity-50 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isSubmittingCallback ? (
                    <span>...</span>
                  ) : (
                    <>
                      <span>{isRtl ? 'تواصل معي' : 'Request'}</span>
                      <Send className="h-3 w-3 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Direct phone option */}
            <div className="pt-1 text-center">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="text-[11px] text-slate-500 hover:text-[#1B4332] inline-flex items-center gap-1 transition-colors"
              >
                <Phone className="h-3 w-3" />
                <span>{isRtl ? 'أو الاتصال المباشر:' : 'Or call us directly:'}</span>
                <span className="font-semibold text-slate-700" dir="ltr">{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── FLOATING FAB TRIGGER BUTTON ────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Pulsing Pill on Desktop */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-200 text-xs font-bold text-slate-800 hover:text-[#1B4332] hover:border-[#25D366] transition-all cursor-pointer animate-in fade-in slide-in-from-right-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
            </span>
            <span>{isRtl ? 'تحدث مع منسق طبي على واتساب' : 'Chat with Medical Desk'}</span>
          </button>
        )}

        {/* Main Floating Circle Button */}
        <button
          onClick={() => {
            if (!isOpen) {
              trackWhatsAppClick({
                topic: 'Floating WhatsApp Widget Opened',
                buttonText: 'Floating Green FAB Circle',
              });
            }
            setIsOpen(!isOpen);
          }}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_22px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative"
          aria-label={isRtl ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
