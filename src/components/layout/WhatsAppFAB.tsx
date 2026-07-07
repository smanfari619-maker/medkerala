'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, HeartHandshake, ArrowRight, ShieldCheck, CheckCircle2, User, Globe, Stethoscope, Phone, Mail } from 'lucide-react';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';

export default function WhatsAppFAB() {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  
  // Form Fields
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [treatment, setTreatment] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  
  // Custom draft notification badge
  const [hasDraft, setHasDraft] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const botMessages = {
    en: {
      welcome: "Hello! I am your TreatInKerala care assistant. Let's secure you a free treatment quote in under 24 hours. May I know your name?",
      country: "Nice to meet you, {name}! Which country are you traveling from?",
      treatment: "Thank you! What kind of medical care or wellness treatment are you looking for?",
      contact: "Understood. How would you prefer our medical coordinators to contact you? Please select WhatsApp or Email below.",
      complete: "All set, {name}! Click the button below to submit your details securely to our coordination desk.",
      sendBtnWa: "Send via WhatsApp",
      sendBtnEmail: "Send via Email",
      placeholderName: "Type your name...",
      placeholderCountry: "Type your country...",
      placeholderPhone: "WhatsApp number (e.g. +971...)",
      placeholderEmail: "Email address (e.g. name@domain.com)",
      nextBtn: "Continue",
      liveSupport: "Kerala Care Assistant",
      activeNow: "Active Now",
      restoredMsg: "Welcome back! We restored your incomplete request.",
      resetBtn: "Restart",
      stepLabel: "Step {step} of 4",
      successMsgWa: "Form opened in WhatsApp! Our team will contact you shortly.",
      successMsgEmail: "Email client opened! Please click send to complete your inquiry.",
      privacyText: "🔒 We respect your privacy. No spam. Your medical details are kept strictly confidential.",
      labelWhatsapp: "WhatsApp",
      labelEmail: "Email Address",
    },
    ar: {
      welcome: "مرحباً بك! أنا مساعدك الطبي من علاج في كيرلا. دعنا نساعدك في الحصول على خطة علاج مجانية في أقل من ٢٤ ساعة. ما هو اسمك الكريم؟",
      country: "يسعدني التعرف عليك يا {name}! من أي بلد ستسافر للعلاج؟",
      treatment: "شكراً لك! ما هو نوع العلاج الطبي أو الرعاية الصحية التي تبحث عنها؟",
      contact: "مفهوم. كيف تفضل أن يتواصل معك منسقونا الطبيون؟ يرجى اختيار واتساب أو البريد الإلكتروني أدناه.",
      complete: "لقد اكتملت التفاصيل يا {name}! اضغط على الزر أدناه لإرسال طلبك بأمان إلى منسقينا الطبيين.",
      sendBtnWa: "إرسال عبر واتساب",
      sendBtnEmail: "إرسال عبر البريد الإلكتروني",
      placeholderName: "اكتب اسمك هنا...",
      placeholderCountry: "اكتب بلدك هنا...",
      placeholderPhone: "رقم الواتساب (مثال: +966...)",
      placeholderEmail: "البريد الإلكتروني (مثال: name@domain.com)",
      nextBtn: "متابعة",
      liveSupport: "المساعد الطبي المباشر",
      activeNow: "نشط الآن",
      restoredMsg: "مرحباً بعودتك! تم استعادة بيانات طلبك غير المكتمل.",
      resetBtn: "إعادة البدء",
      stepLabel: "الخطوة {step} من ٤",
      successMsgWa: "تم فتح النموذج في واتساب! سيتصل بك فريقنا قريباً.",
      successMsgEmail: "تم فتح تطبيق البريد! يرجى إرسال الرسالة لإكمال طلبك.",
      privacyText: "🔒 نحترم خصوصيتك بالكامل. لن نرسل رسائل عشوائية، وستبقى بياناتك الطبية سرية وآمنة.",
      labelWhatsapp: "واتساب",
      labelEmail: "البريد الإلكتروني",
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
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.contactMethod) setContactMethod(parsed.contactMethod);
        if (parsed.step && parsed.step > 1 && parsed.step < 5) {
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
    if (step > 1 && step < 5) {
      localStorage.setItem('tik_chatbot_draft', JSON.stringify({ name, country, treatment, phone, contactMethod, step }));
      setHasDraft(true);
    }
  }, [name, country, treatment, phone, contactMethod, step]);

  // Scroll to bottom of chat history when step changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, isTyping]);

  if (!visible) return null;

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1 && !name.trim()) return;
    if (step === 2 && !country.trim()) return;
    if (step === 4 && !phone.trim()) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setStep((prev) => prev + 1);
    }, 600);
  };

  const handleTreatmentSelect = (opt: string) => {
    setTreatment(opt);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setStep(4);
    }, 600);
  };

  const handleReset = () => {
    localStorage.removeItem('tik_chatbot_draft');
    setName('');
    setCountry('');
    setTreatment('');
    setPhone('');
    setContactMethod('whatsapp');
    setStep(1);
    setHasDraft(false);
  };

  const handleFinalSubmit = () => {
    localStorage.removeItem('tik_chatbot_draft');
    setHasDraft(false);
    
    if (contactMethod === 'whatsapp') {
      const message = `*Inquiry from TreatInKerala Chatbot*
- *Name:* ${name}
- *Country:* ${country}
- *Treatment:* ${treatment}
- *Contact/WhatsApp:* ${phone}
- *Submitted via:* Online Assistant`;
      
      const url = `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else {
      // Send via Email mailto
      const subject = isRtl 
        ? `طلب استشارة طبية - المريض: ${name}`
        : `Medical Treatment Inquiry - Patient: ${name}`;
        
      const body = isRtl
        ? `مرحباً فريق علاج في كيرلا،

أود طلب خطة علاج مجانية وتفاصيل التكلفة. إليك معلوماتي:
- الاسم: ${name}
- بلد الإقامة: ${country}
- التخصص المطلوب: ${treatment}
- البريد الإلكتروني للتواصل: ${phone}

يرجى مراجعة طلبي وإرسال التفاصيل عبر البريد الإلكتروني. شكراً لكم.`
        : `Dear TreatInKerala Coordination Desk,

I would like to request a complimentary treatment evaluation. Here are my details:
- Patient Name: ${name}
- Country of Origin: ${country}
- Requested Specialty: ${treatment}
- Contact Email Address: ${phone}

Please review my inquiry and send the available options and price estimates to this email address.

Thank you.`;

      const url = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(url, '_self');
    }
    setStep(5);
  };

  return (
    <div className={`hidden md:flex fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex-col ${isRtl ? 'items-start' : 'items-end'} gap-4`}>
      
      {/* ─── CHAT WINDOW ────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className={`w-[360px] sm:w-[380px] h-[520px] max-h-[80vh] bg-white/95 backdrop-blur-md rounded-[2rem] border border-[#D4A96A]/35 shadow-2xl flex flex-col overflow-hidden animate-fade-in relative z-50`}
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
            
            <div className="flex items-center gap-2">
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
          {step < 5 && (
            <div className="bg-[#FAF7F2] border-b border-[#D4A96A]/10 px-4 py-1.5 flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#D4A96A] uppercase tracking-wide">
                {t.stepLabel.replace('{step}', step.toString())}
              </span>
              <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4A96A] to-[#2D6A4F] transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
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
            {hasDraft && step < 5 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] px-3 py-2 rounded-xl text-center">
                {t.restoredMsg}
              </div>
            )}

            {/* BOT WELCOME */}
            <div className="flex flex-col items-start space-y-1.5">
              <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                {t.welcome}
              </div>
            </div>

            {/* USER NAME */}
            {step > 1 && name && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-tr-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {name}
                </div>
              </div>
            )}

            {/* BOT COUNTRY */}
            {step > 1 && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                  {t.country.replace('{name}', name)}
                </div>
              </div>
            )}

            {/* USER COUNTRY */}
            {step > 2 && country && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-tr-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {country}
                </div>
              </div>
            )}

            {/* BOT TREATMENT */}
            {step > 2 && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                  {t.treatment}
                </div>
              </div>
            )}

            {/* USER TREATMENT */}
            {step > 3 && treatment && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-tr-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  {treatment}
                </div>
              </div>
            )}

            {/* BOT CONTACT */}
            {step > 3 && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-tl-none p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed max-w-[85%] text-left rtl:text-right">
                  {t.contact}
                </div>
              </div>
            )}

            {/* USER CONTACT */}
            {step > 4 && phone && (
              <div className="flex flex-col items-end space-y-1">
                <div className="bg-[#2D6A4F] text-white rounded-2xl rounded-tr-none p-3.5 text-xs sm:text-sm shadow-sm max-w-[85%] text-left rtl:text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-200 block mb-0.5">
                    {contactMethod === 'whatsapp' ? t.labelWhatsapp : t.labelEmail}
                  </span>
                  {phone}
                </div>
              </div>
            )}

            {/* BOT COMPLETE */}
            {step === 5 && (
              <div className="flex flex-col items-start space-y-3">
                <div className="bg-white border border-[#D4A96A]/15 text-[#1B4332] rounded-2xl rounded-tl-none p-4 text-xs sm:text-sm shadow-md leading-relaxed max-w-[85%] text-left rtl:text-right flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#2D6A4F] font-bold">
                    <CheckCircle2 className="h-5 w-5 text-[#2D6A4F]" />
                    <span>{isRtl ? 'تم الإرسال بنجاح' : 'Details Completed'}</span>
                  </div>
                  <p>{t.complete.replace('{name}', name)}</p>
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
              <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto no-scrollbar">
                <span className="text-[10px] font-bold text-slate-400 uppercase text-center mb-1">
                  {isRtl ? 'اختر التخصص المطلوب' : 'Select Treatment Specialty'}
                </span>
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
                </div>
              </div>
            )}

            {/* STEP 4: Preferred Contact Choice (WhatsApp vs Email) */}
            {step === 4 && !isTyping && (
              <div className="space-y-3">
                {/* Method selector toggle */}
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setContactMethod('whatsapp'); setPhone(''); }}
                    className={`py-2 px-3 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${contactMethod === 'whatsapp' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    {t.labelWhatsapp}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setContactMethod('email'); setPhone(''); }}
                    className={`py-2 px-3 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${contactMethod === 'email' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    {t.labelEmail}
                  </button>
                </div>

                <form onSubmit={handleNext} className="flex gap-2">
                  <div className="relative flex-grow">
                    {contactMethod === 'whatsapp' ? (
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
                    ) : (
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 rtl:right-3 rtl:left-auto" />
                    )}
                    <input
                      type={contactMethod === 'whatsapp' ? 'tel' : 'email'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={contactMethod === 'whatsapp' ? t.placeholderPhone : t.placeholderEmail}
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

            {/* STEP 5: Final Submission via WhatsApp / Email */}
            {(step === 5 || (step === 4 && phone.trim())) && (
              <div className="space-y-2">
                <button
                  onClick={handleFinalSubmit}
                  className={`w-full text-white py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer ${contactMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#20ba5a]' : 'bg-[#2D6A4F] hover:bg-[#1B4332]'}`}
                >
                  {contactMethod === 'whatsapp' ? (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      <span>{t.sendBtnWa}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      <span>{t.sendBtnEmail}</span>
                    </>
                  )}
                </button>
                {step === 5 && (
                  <p className="text-[10px] text-center text-emerald-600 font-medium">
                    {contactMethod === 'whatsapp' ? t.successMsgWa : t.successMsgEmail}
                  </p>
                )}
              </div>
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
