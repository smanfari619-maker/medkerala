'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, HeartHandshake, Mail, Phone, CheckCircle2, User, Globe, Stethoscope } from 'lucide-react';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { submitEnquiry } from '@/app/actions/enquiry';
import { usePathname, useRouter } from '@/i18n/routing';

export default function WhatsAppFAB() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };
  
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  
  // Form Fields
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [treatment, setTreatment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Custom treatment text states
  const [isCustomTreatment, setIsCustomTreatment] = useState(false);
  const [customTreatmentText, setCustomTreatmentText] = useState('');
  
  // Custom draft notification badge
  const [hasDraft, setHasDraft] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const botMessages = {
    en: {
      welcome: "Hello! I am your TreatInKerala care assistant. Let's secure you a free treatment quote in under 24 hours. May I know your name?",
      country: "Nice to meet you, {name}! Which country are you traveling from?",
      treatment: "Thank you! What kind of medical care or wellness treatment are you looking for?",
      emailPrompt: "Thank you! What is your email address?",
      phonePrompt: "Got it. And what is your phone or WhatsApp number (with country code)?",
      complete: "All set, {name}! Click the button below to submit your details securely to our coordination desk.",
      sendBtn: "Submit Inquiry",
      placeholderName: "Type your name...",
      placeholderCountry: "Type your country...",
      placeholderPhone: "Phone/WhatsApp (e.g. +971...)",
      placeholderEmail: "Email address (e.g. name@domain.com)",
      nextBtn: "Continue",
      liveSupport: "Kerala Care Assistant",
      activeNow: "Active Now",
      restoredMsg: "Welcome back! We restored your incomplete request.",
      resetBtn: "Restart",
      stepLabel: "Step {step} of 5",
      successMsg: "Thank you! Your details have been submitted successfully. One of our coordinators will contact you soon via WhatsApp or Email.",
      privacyText: "🔒 We respect your privacy. No spam. Your medical details are kept strictly confidential.",
    },
    ar: {
      welcome: "مرحباً بك! أنا مساعدك الطبي من علاج في كيرلا. دعنا نساعدك في الحصول على خطة علاج مجانية في أقل من ٢٤ ساعة. ما هو اسمك الكريم؟",
      country: "يسعدني التعرف عليك يا {name}! من أي بلد ستسافر للعلاج؟",
      treatment: "شكراً لك! ما هو نوع العلاج الطبي أو الرعاية الصحية التي تبحث عنها؟",
      emailPrompt: "شكراً لك! ما هو بريدك الإلكتروني؟",
      phonePrompt: "مفهوم. وما هو رقم الهاتف أو الواتساب الخاص بك (مع رمز الدولة)؟",
      complete: "لقد اكتملت التفاصيل يا {name}! اضغط على الزر أدناه لإرسال طلبك بأمان إلى منسقينا الطبيين.",
      sendBtn: "إرسال الاستفسار",
      placeholderName: "اكتب اسمك هنا...",
      placeholderCountry: "اكتب بلدك هنا...",
      placeholderPhone: "رقم الهاتف/الواتساب (مثال: +966...)",
      placeholderEmail: "البريد الإلكتروني (مثال: name@domain.com)",
      nextBtn: "متابعة",
      liveSupport: "المساعد الطبي المباشر",
      activeNow: "نشط الآن",
      restoredMsg: "مرحباً بعودتك! تم استعادة بيانات طلبك غير المكتمل.",
      resetBtn: "إعادة البدء",
      stepLabel: "الخطوة {step} من ٥",
      successMsg: "شكراً لك! تم إرسال بياناتك بنجاح. سيتواصل معك أحد منسقينا الطبيين قريباً عبر واتساب أو البريد الإلكتروني.",
      privacyText: "🔒 نحترم خصوصيتك بالكامل. لن نرسل رسائل عشوائية، وستبقى بياناتك الطبية سرية وآمنة.",
    }
  };

  const t = isRtl ? botMessages.ar : botMessages.en;

  const treatmentOptions = [
    { en: 'Orthopedics & Joints', ar: 'علاج العظام والمفاصل' },
    { en: 'Cardiac (Heart) Care', ar: 'جراحة القلب والأوعية' },
    { en: 'Ayurveda & Panchakarma', ar: 'الأيورفيدا والاستشفاء الطبيعي' },
    { en: 'Cancer (Oncology) Care', ar: 'علاج الأورام والسرطان' },
    { en: 'Neurology & Spine', ar: 'المخ والأعصاب والعمود الفقري' },
    { en: 'General Medical Opinion', ar: 'استشارة طبية عامة' }
  ];

  // Auto-delay FAB appearance
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t1);
  }, []);

  // Restore draft from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tik_chatbot_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.country) setCountry(parsed.country);
        if (parsed.treatment) setTreatment(parsed.treatment);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.step && parsed.step > 1 && parsed.step < 6) {
          setStep(parsed.step);
          setHasDraft(true);
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  // Auto-save draft on form state changes
  useEffect(() => {
    if (step > 1 && step < 6) {
      localStorage.setItem('tik_chatbot_draft', JSON.stringify({ name, country, treatment, email, phone, step }));
      setHasDraft(true);
    }
  }, [name, country, treatment, email, phone, step]);

  // Scroll to bottom of chat history when step changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, isTyping, isCustomTreatment]);

  if (!visible) return null;

  const handleAutoSubmit = async (phoneValue: string) => {
    localStorage.removeItem('tik_chatbot_draft');
    setHasDraft(false);
    setIsTyping(true);
    
    try {
      await submitEnquiry({
        name,
        email,
        phone: phoneValue,
        message: `Inquiry via Online Assistant chatbot. Requested Treatment: ${treatment} from ${country}`
      });
    } catch (err) {
      console.error('Failed to submit via server action:', err);
      // Fallback: Open mailto link if submission fails
      const subject = isRtl 
        ? `طلب استشارة طبية - المريض: ${name}`
        : `Medical Treatment Inquiry - Patient: ${name}`;
        
      const body = isRtl
        ? `مرحباً فريق علاج في كيرلا،

أود طلب خطة علاج مجانية وتفاصيل التكلفة. إليك معلوماتي:
- الاسم: ${name}
- بلد الإقامة: ${country}
- التخصص المطلوب: ${treatment}
- البريد الإلكتروني للتواصل: ${email}
- رقم الهاتف/الواتساب: ${phoneValue}

يرجى مراجعة طلبي وإرسال التفاصيل عبر البريد الإلكتروني. شكراً لكم.`
        : `Dear TreatInKerala Coordination Desk,

I would like to request a complimentary treatment evaluation. Here are my details:
- Patient Name: ${name}
- Country of Origin: ${country}
- Requested Specialty: ${treatment}
- Contact Email Address: ${email}
- Contact Phone/WhatsApp: ${phoneValue}

Please review my inquiry and send the available options and price estimates to this email address.

Thank you.`;

      const url = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(url, '_self');
    }
    
    setIsTyping(false);
    setStep(7); // Show success screen
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1 && !name.trim()) return;
    if (step === 2 && !country.trim()) return;
    if (step === 4 && !email.trim()) return;
    if (step === 5 && !phone.trim()) return;

    if (step === 5) {
      handleAutoSubmit(phone);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setStep((prev) => prev + 1);
      }, 600);
    }
  };

  const handleTreatmentSelect = (opt: string) => {
    setTreatment(opt);
    setIsCustomTreatment(false);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setStep(4);
    }, 600);
  };

  const handleOtherClick = () => {
    setIsCustomTreatment(true);
  };

  const handleReset = () => {
    localStorage.removeItem('tik_chatbot_draft');
    setName('');
    setCountry('');
    setTreatment('');
    setEmail('');
    setPhone('');
    setIsCustomTreatment(false);
    setCustomTreatmentText('');
    setStep(1);
    setHasDraft(false);
  };

  return (
    <div className={`hidden md:flex fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex-col ${isRtl ? 'items-start' : 'items-end'} gap-4`}>
      
      {/* ─── CHAT WINDOW ────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="w-[360px] sm:w-[380px] h-[520px] max-h-[80vh] bg-white/95 backdrop-blur-md rounded-[2rem] border border-[#D4A96A]/35 shadow-2xl flex flex-col overflow-hidden animate-fade-in relative z-50"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white p-4 flex items-center justify-between border-b border-[#D4A96A]/20">
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <div className="relative h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-[#D4A96A]/30">
                <HeartHandshake className="h-5 w-5 text-[#D4A96A]" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#25D366] border-2 border-[#1B4332] animate-pulse" />
              </div>
              <div className="text-left rtl:text-right">
                <h4 className="text-sm font-bold tracking-wide">{t.liveSupport}</h4>
                <p className="text-[10px] text-[#25D366] font-semibold flex items-center gap-1">
                  <span>●</span> {t.activeNow}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              {/* Language Switch Button */}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1 bg-white/10 text-white hover:bg-white/20 border border-white/15 px-2 py-1 rounded-lg text-[10px] font-semibold tracking-wide transition-all cursor-pointer"
                title={isRtl ? 'Switch to English' : 'تحويل للعربية'}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{isRtl ? 'EN' : 'AR'}</span>
              </button>

              {step > 1 && (
                <button
                  onClick={handleReset}
                  className="text-xs text-white/70 hover:text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  {t.resetBtn}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          {step < 6 && (
            <div className="bg-[#FAF7F2] border-b border-[#D4A96A]/10 px-4 py-1.5 flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#D4A96A] uppercase tracking-wide">
                {t.stepLabel.replace('{step}', step.toString())}
              </span>
              <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4A96A] to-[#2D6A4F] transition-all duration-500"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Chat History Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2]/45 scroll-momentum"
          >
            {/* System Info Banner */}
            {hasDraft && step < 6 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] px-3 py-2 rounded-xl text-center">
                {t.restoredMsg}
              </div>
            )}

            {/* BOT WELCOME */}
            <div className="flex flex-col items-start space-y-1.5">
              <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-ss-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                {t.welcome}
              </div>
            </div>

            {/* USER NAME */}
            {step > 1 && name && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-se-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {name}
                </div>
              </div>
            )}

            {/* BOT COUNTRY */}
            {step > 1 && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-ss-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                  {t.country.replace('{name}', name)}
                </div>
              </div>
            )}

            {/* USER COUNTRY */}
            {step > 2 && country && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-se-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {country}
                </div>
              </div>
            )}

            {/* BOT TREATMENT */}
            {step > 2 && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-ss-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                  {t.treatment}
                </div>
              </div>
            )}

            {/* USER TREATMENT */}
            {step > 3 && treatment && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-se-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {treatment}
                </div>
              </div>
            )}

            {/* BOT EMAIL */}
            {step > 3 && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-ss-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                  {t.emailPrompt}
                </div>
              </div>
            )}

            {/* USER EMAIL */}
            {step > 4 && email && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-se-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {email}
                </div>
              </div>
            )}

            {/* BOT PHONE */}
            {step > 4 && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-ss-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                  {t.phonePrompt}
                </div>
              </div>
            )}

            {/* USER PHONE */}
            {step > 5 && phone && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-se-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {phone}
                </div>
              </div>
            )}

            {/* BOT COMPLETE (Step 6) */}
            {step === 6 && (
              <div className="flex flex-col items-start space-y-3">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-ss-none p-4 text-xs sm:text-sm shadow-md leading-relaxed max-w-[85%] text-left rtl:text-right flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#2D6A4F] font-bold">
                    <CheckCircle2 className="h-5 w-5 text-[#2D6A4F]" />
                    <span>{isRtl ? 'مراجعة الاستفسار' : 'Confirm Inquiry'}</span>
                  </div>
                  <p>{t.complete.replace('{name}', name)}</p>
                </div>
              </div>
            )}

            {/* SUCCESS SCREEN (Step 7) */}
            {step === 7 && (
              <div className="flex flex-col items-start space-y-3">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-ss-none p-4 text-xs sm:text-sm shadow-md leading-relaxed max-w-[85%] text-left rtl:text-right flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span>{isRtl ? 'تم الإرسال بنجاح' : 'Submitted Successfully'}</span>
                  </div>
                  <p className="text-emerald-700 font-medium">
                    {t.successMsg}
                  </p>
                </div>
              </div>
            )}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-[#D4A96A]/15 rounded-2xl rounded-tl-none px-4 py-3.5 max-w-[80px]">
                <span className="w-1.5 h-1.5 bg-[#D4A96A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#D4A96A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#D4A96A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          {/* Bottom Interactive Inputs */}
          <div className="p-4 bg-white border-t border-[#D4A96A]/20">
            {/* STEP 1: Name Input */}
            {step === 1 && !isTyping && (
              <form onSubmit={handleNext} className="flex gap-2">
                <div className="relative flex-grow">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.placeholderName}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F]/60 rtl:pr-9 rtl:pl-4"
                    autoFocus
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="bg-[#2D6A4F] text-white p-3.5 rounded-xl hover:bg-[#1B4332] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4 rtl:rotate-180" />
                </button>
              </form>
            )}

            {/* STEP 2: Country Input */}
            {step === 2 && !isTyping && (
              <form onSubmit={handleNext} className="flex gap-2">
                <div className="relative flex-grow">
                  <Globe className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={t.placeholderCountry}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F]/60 rtl:pr-9 rtl:pl-4"
                    autoFocus
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!country.trim()}
                  className="bg-[#2D6A4F] text-white p-3.5 rounded-xl hover:bg-[#1B4332] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4 rtl:rotate-180" />
                </button>
              </form>
            )}

            {/* STEP 3: Treatment Options */}
            {step === 3 && !isTyping && (
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto no-scrollbar">
                <span className="text-[10px] font-bold text-slate-400 uppercase text-center mb-1">
                  {isRtl ? 'اختر التخصص المطلوب' : 'Select Treatment Specialty'}
                </span>
                {!isCustomTreatment ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {treatmentOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleTreatmentSelect(isRtl ? opt.ar : opt.en)}
                        className="bg-slate-50 border border-slate-200 hover:border-[#D4A96A]/60 hover:bg-[#FAF7F2] text-left rtl:text-right p-2.5 rounded-xl text-[11px] sm:text-xs font-medium text-slate-700 transition-all cursor-pointer"
                      >
                        {isRtl ? opt.ar : opt.en}
                      </button>
                    ))}
                    <button
                      onClick={handleOtherClick}
                      className="bg-slate-50 border border-slate-200 hover:border-[#D4A96A]/60 hover:bg-[#FAF7F2] text-center p-2.5 rounded-xl text-[11px] sm:text-xs font-medium text-slate-700 transition-all cursor-pointer col-span-2 text-center"
                    >
                      {isRtl ? 'آخر (حدد...) ✏️' : 'Other (Specify...) ✏️'}
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (customTreatmentText.trim()) {
                        handleTreatmentSelect(customTreatmentText);
                      }
                    }} 
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={customTreatmentText}
                      onChange={(e) => setCustomTreatmentText(e.target.value)}
                      placeholder={isRtl ? 'اكتب العلاج المطلوب...' : 'Type treatment...'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F]/60"
                      autoFocus
                      required
                    />
                    <button
                      type="submit"
                      disabled={!customTreatmentText.trim()}
                      className="bg-[#2D6A4F] text-white p-3.5 rounded-xl hover:bg-[#1B4332] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <Send className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* STEP 4: Email Input */}
            {step === 4 && !isTyping && (
              <form onSubmit={handleNext} className="flex gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholderEmail}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F]/60 rtl:pr-9 rtl:pl-4"
                    autoFocus
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!email.trim()}
                  className="bg-[#2D6A4F] text-white p-3.5 rounded-xl hover:bg-[#1B4332] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4 rtl:rotate-180" />
                </button>
              </form>
            )}

            {/* STEP 5: Phone Input */}
            {step === 5 && !isTyping && (
              <div className="space-y-3">
                <form onSubmit={handleNext} className="flex gap-2">
                  <div className="relative flex-grow">
                    <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.placeholderPhone}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F]/60 rtl:pr-9 rtl:pl-4"
                      autoFocus
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!phone.trim()}
                    className="bg-[#2D6A4F] text-white p-3.5 rounded-xl hover:bg-[#1B4332] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <Send className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </form>

                {/* Privacy and Trust Guarantees */}
                <p className="text-[10px] text-slate-400 text-center font-sans tracking-wide leading-normal px-2">
                  {t.privacyText}
                </p>
              </div>
            )}

            {/* STEP 7: Reset / New Inquiry Button */}
            {step === 7 && (
              <button
                onClick={handleReset}
                className="w-full bg-[#FAF7F2] border border-[#D4A96A]/20 text-[#2D6A4F] py-3 rounded-xl text-xs sm:text-sm font-bold shadow-inner hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {isRtl ? 'بدء استفسار جديد' : 'Submit Another Inquiry'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── FLOATING FAB BUTTON ────────────────────────────────────────────── */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasDraft(false); // Read/Hide notice badge once opened
        }}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative"
        aria-label={isRtl ? 'مساعد التنسيق الطبي' : 'Medical Coordination Assistant'}
      >
        {isOpen ? (
          <X className="h-6 w-6 animate-spin-once" />
        ) : (
          <>
            <MessageCircle className="h-7 w-7" />
            {/* Draft notification badge */}
            {hasDraft && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 border-2 border-white text-[9px] font-bold flex items-center justify-center text-white">
                1
              </span>
            )}
          </>
        )}
      </button>
      
    </div>
  );
}
