'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import { submitEnquiry } from '@/app/actions/enquiry';
import {
  User, Stethoscope,
  DollarSign, CheckCircle, MessageCircle, ChevronRight, ChevronLeft,
  Minus, Plus, AlertCircle, Phone, Mail,
  ShieldCheck, HeartPulse, Activity, Sparkles, Baby, Sprout, Brain, Shield, PlusCircle, Eye,
  Home, Building, Award, XCircle, ChevronDown, Search, Globe
} from 'lucide-react';

// ============================================================
// DATA LAYER
// ============================================================

type AccommodationType = 'apartment' | 'budget' | 'premium' | 'none';

interface AddonService {
  id: string;
  labelEn: string;
  labelAr: string;
  priceNoteEn: string;
  priceNoteAr: string;
  costPerDay: number;
  costFixed: number;
  isIncluded: boolean;
}

const TREATMENT_COSTS: Record<string, { min: number; max: number; suggestedDays: number }> = {
  Cardiac:          { min: 6000,  max: 10000, suggestedDays: 21 },
  Orthopaedics:     { min: 4500,  max: 8000,  suggestedDays: 18 },
  Dental:           { min: 500,   max: 4500,  suggestedDays: 7  },
  Ayurveda:         { min: 1500,  max: 3500,  suggestedDays: 21 },
  Fertility:        { min: 2500,  max: 5500,  suggestedDays: 20 },
  Neurology:        { min: 6500,  max: 18000, suggestedDays: 14 },
  Oncology:         { min: 8000,  max: 35000, suggestedDays: 30 },
  Gastroenterology: { min: 25000, max: 55000, suggestedDays: 21 },
  Ophthalmology:    { min: 800,   max: 3500,  suggestedDays: 7  },
  Other:            { min: 1000,  max: 8000,  suggestedDays: 14 },
};

const SPECIALITIES = [
  { id: 'Cardiac',          labelEn: 'Cardiac / Heart',          labelAr: 'القلب والشرايين',     icon: HeartPulse },
  { id: 'Orthopaedics',     labelEn: 'Joint Replacement',        labelAr: 'العظام والمفاصل',     icon: Activity },
  { id: 'Dental',           labelEn: 'Dental Care',              labelAr: 'طب الأسنان',          icon: Sparkles },
  { id: 'Fertility',        labelEn: 'IVF / Fertility',          labelAr: 'أطفال الأنابيب',      icon: Baby },
  { id: 'Ayurveda',         labelEn: 'Ayurveda / Wellness',      labelAr: 'الأيورفيدا',          icon: Sprout },
  { id: 'Neurology',        labelEn: 'Neurology',                labelAr: 'الأعصاب',             icon: Brain },
  { id: 'Oncology',         labelEn: 'Oncology / Cancer',        labelAr: 'الأورام والسرطان',    icon: Shield },
  { id: 'Gastroenterology', labelEn: 'Gastroenterology & Liver', labelAr: 'الجهاز الهضمي والكبد', icon: Stethoscope },
  { id: 'Ophthalmology',    labelEn: 'Ophthalmology / Eye',      labelAr: 'العيون والليزك',       icon: Eye },
  { id: 'Other',            labelEn: 'Other Speciality',         labelAr: 'تخصص آخر',            icon: PlusCircle },
];

const ADDON_SERVICES: AddonService[] = [
  { id: 'pickup',     labelEn: 'Airport Pickup & Dropoff',         labelAr: 'الاستقبال والإرجاع من المطار',     priceNoteEn: 'INCLUDED FREE', priceNoteAr: 'مشمول مجاناً',  costPerDay: 0,  costFixed: 0,   isIncluded: true  },
  { id: 'translator', labelEn: 'Arabic Medical Translator',         labelAr: 'مترجم طبي للغة العربية',          priceNoteEn: 'INCLUDED FREE', priceNoteAr: 'مشمول مجاناً',  costPerDay: 0,  costFixed: 0,   isIncluded: true  },
  { id: 'visa',       labelEn: 'Hospital Visa Invitation Letter',   labelAr: 'خطاب دعوة التأشيرة',             priceNoteEn: 'INCLUDED FREE', priceNoteAr: 'مشمول مجاناً',  costPerDay: 0,  costFixed: 0,   isIncluded: true  },
  { id: 'sim',        labelEn: 'Local Indian SIM Card on Arrival',  labelAr: 'شريحة اتصال هندية عند الوصول',   priceNoteEn: 'INCLUDED FREE', priceNoteAr: 'مشمول مجاناً',  costPerDay: 0,  costFixed: 0,   isIncluded: true  },
  { id: 'meals',      labelEn: 'Daily Meal Arrangement',            labelAr: 'ترتيب الوجبات اليومية',           priceNoteEn: 'from ~$20/day', priceNoteAr: 'من ~٢٠ دولار/يوم', costPerDay: 20, costFixed: 0,   isIncluded: false },
  { id: 'tour',       labelEn: 'Kerala Sightseeing Tour (1 Day)',   labelAr: 'جولة سياحية في كيرلا (يوم كامل)', priceNoteEn: 'from ~$250 base', priceNoteAr: 'من ~٢٠ دولار/يوم', costPerDay: 0,  costFixed: 250, isIncluded: false },
  { id: 'companion',  labelEn: 'Companion Support Program',         labelAr: 'برنامج رعاية المرافق',            priceNoteEn: '~$50/day',      priceNoteAr: '~٥٠ دولار/يوم', costPerDay: 50, costFixed: 0,   isIncluded: false },
];

// ============================================================
// FORM STATE
// ============================================================

interface FormData {
  fullName: string;
  country: string;
  phone: string;
  email: string;
  speciality: string;
  conditionDetail: string;
  urgency: string;
  totalDays: number;
  companions: number;
  accommodationType: AccommodationType;
  selectedServices: string[];
  additionalNotes: string;
}

const TOTAL_STEPS = 2;

// ============================================================
// MAIN PAGE
// ============================================================

export default function GetEstimatePage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [data, setData] = useState<FormData>({
    fullName: '',
    country: '',
    phone: '',
    email: '',
    speciality: '',
    conditionDetail: '',
    urgency: '',
    totalDays: 14,
    companions: 0,
    accommodationType: 'apartment',
    selectedServices: ['pickup', 'translator', 'visa', 'sim'],
    additionalNotes: '',
  });

  const updateData = (updates: Partial<FormData>) => {
    setData(prev => {
      const updated = { ...prev, ...updates };
      if (updates.speciality && updates.speciality !== prev.speciality) {
        const suggest = TREATMENT_COSTS[updates.speciality]?.suggestedDays;
        if (suggest) {
          updated.totalDays = suggest;
        }
      }
      return updated;
    });
    const cleared = { ...errors };
    Object.keys(updates).forEach(k => delete cleared[k]);
    setErrors(cleared);
  };

  // Cost Calculation
  const costEstimate = useMemo(() => {
    const tr = TREATMENT_COSTS[data.speciality] ?? TREATMENT_COSTS['Other'];
    
    const accommodationRates: Record<AccommodationType, number> = {
      apartment: 80,
      budget: 60,
      premium: 180,
      none: 0
    };
    
    const rate = accommodationRates[data.accommodationType];
    const accomm = rate * data.totalDays;
    
    const addons = data.selectedServices.reduce((acc, id) => {
      const svc = ADDON_SERVICES.find(s => s.id === id);
      if (!svc || svc.isIncluded) return acc;
      return acc + (svc.costPerDay > 0 ? svc.costPerDay * data.totalDays : svc.costFixed);
    }, 0);

    return {
      treatmentMin: tr.min,
      treatmentMax: tr.max,
      accommodation: accomm,
      addons,
      totalMin: tr.min + accomm + addons,
      totalMax: tr.max + accomm + addons,
    };
  }, [data.speciality, data.totalDays, data.selectedServices, data.accommodationType]);

  // Step Validation
  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.speciality) {
        e.speciality = isRtl ? 'يرجى اختيار التخصص' : 'Please select a speciality';
      }
      if (data.conditionDetail.trim().length < 10) {
        e.conditionDetail = isRtl ? 'يرجى كتابة وصف موجز لحالتك (١٠ أحرف على الأقل)' : 'Please briefly describe your condition (min 10 chars)';
      }
      if (!data.urgency) {
        e.urgency = isRtl ? 'يرجى تحديد موعد السفر' : 'Please select travel urgency';
      }
    }
    if (s === 2) {
      if (data.fullName.trim().length < 2) {
        e.fullName = isRtl ? 'الاسم الكامل مطلوب' : 'Full name is required';
      }
      if (!data.country.trim()) {
        e.country = isRtl ? 'الدولة مطلوبة' : 'Country is required';
      }
      if (!data.email.trim() || !data.email.includes('@')) {
        e.email = isRtl ? 'البريد الإلكتروني مطلوب' : 'Valid email address is required';
      }
      if (!data.phone.trim()) {
        e.phone = isRtl ? 'رقم الهاتف/الواتساب مطلوب' : 'Phone/WhatsApp number is required';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep(p => Math.min(p + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goPrev = () => {
    setStep(p => Math.max(p - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleService = (id: string) => {
    const svc = ADDON_SERVICES.find(s => s.id === id);
    if (svc?.isIncluded) return;
    updateData({
      selectedServices: data.selectedServices.includes(id)
        ? data.selectedServices.filter(s => s !== id)
        : [...data.selectedServices, id],
    });
  };

  const handleSubmit = () => {
    if (!validateStep(2)) return;

    const accommLabel = {
      apartment: isRtl ? 'شقة مفروشة مخصصة للمرضى (~٨٠$/ليلة)' : 'Patient Serviced Suite (~$80/night)',
      budget: isRtl ? 'فندق اقتصادي ٣ نجوم (~٦٠$/ليلة)' : '3-Star Budget Hotel (~$60/night)',
      premium: isRtl ? 'فندق فاخر ٤-٥ نجوم (~١٨٠$/ليلة)' : '4/5-Star Premium Hotel (~$180/night)',
      none: isRtl ? 'سأقوم بحجز السكن بنفسي' : 'I will book my own stay'
    }[data.accommodationType];

    const svcList = data.selectedServices
      .map(id => ADDON_SERVICES.find(s => s.id === id))
      .filter(Boolean)
      .map(s => (isRtl ? s!.labelAr : s!.labelEn))
      .join('\n  • ');

    submitEnquiry({
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      message: `Calculated Treatment Quote Request:\n- Speciality: ${data.speciality}\n- Condition: ${data.conditionDetail}\n- Travel Urgency: ${data.urgency}\n- Accommodation: ${accommLabel}\n- Companions: ${data.companions}\n- Expected stay: ${data.totalDays} days\n- Preliminary cost estimate: $${costEstimate.totalMin} - $${costEstimate.totalMax}\n- Logistics services: ${svcList || 'None'}\n- Notes: ${data.additionalNotes || 'None'}`
    }).catch(err => console.error('Failed to submit estimate details to backend:', err));

    setSubmitted(true);
  };

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

  const STEPS = [
    { num: 1, titleEn: 'Your Needs', titleAr: 'متطلباتك', icon: Stethoscope },
    { num: 2, titleEn: 'Contact & Quote', titleAr: 'الاتصال والتقدير', icon: User },
  ];

  // ── Success Screen ──
  if (submitted) {
    return (
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #faf7f2 50%, #f0f9ff 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-emerald-100 shadow-2xl text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[#1B4332] font-sans">
                {isRtl ? 'تم إرسال طلبك بنجاح!' : 'Estimate Request Sent!'}
              </h1>
              <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto font-sans font-light">
                {isRtl 
                  ? 'تم تسجيل طلبك الطبي بنجاح. لقد أرسلنا رسالة تأكيد إلى بريدك الإلكتروني، وسيتواصل معك منسقنا الطبي المختص بخطة الأسعار وخيارات الرعاية قريباً.'
                  : 'Your clinical quote request has been securely received! We have sent a confirmation email to your inbox, and our dedicated coordinator will follow up with your detailed treatment options shortly.'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl p-6 text-start border border-emerald-100/50 space-y-4">
              <p className="text-sm font-bold text-[#1B4332] font-sans">{isRtl ? 'ما هي الخطوات التالية؟' : 'What happens next?'}</p>
              {[
                isRtl ? 'يستعرض فريقنا تفاصيل حالتك الطبية' : 'Our team reviews your medical condition details',
                isRtl ? 'نتواصل مع كبار الاستشاريين في المستشفيات لإعداد الخطة المناسبة' : 'We coordinate with hospital specialists to secure the best plan',
                isRtl ? 'نرسل لك عروض أسعار مؤكدة وخيارات السكن عبر وسيلة الاتصال المفضلة' : 'We send you confirmed pricing and accommodation bookings to your chosen contact',
              ].map((txt, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-600 font-sans font-light">
                  <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>

            <button onClick={() => { setSubmitted(false); setStep(1); }}
              className="text-[#2D6A4F] hover:text-[#1B4332] font-bold text-sm underline transition-colors cursor-pointer font-sans">
              {isRtl ? 'تقديم طلب جديد' : 'Submit a new request'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #fafaf8 40%, #fdf8f0 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 rounded-full px-4 py-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 font-sans">
              {isRtl ? 'تقدير تكلفة مخصص وشفاف' : 'Personalised & Transparent Cost Estimate'}
            </span>
          </div>
          
          <h1 className="font-sans font-bold tracking-tight leading-tight text-4xl sm:text-5xl text-[#1B4332]">
            {isRtl ? 'احصل على تقدير فوري لرحلتك العلاجية' : 'Get Your Free Medical Journey Quote'}
          </h1>
          
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed font-sans font-light">
            {isRtl
              ? 'أخبرنا بنوع العلاج الذي تبحث عنه، وسنحسب لك تقديراً أولياً شاملاً. يستغرق ملء النموذج دقيقة واحدة فقط.'
              : 'Tell us about your treatment needs and instantly get a preliminary cost breakdown. Takes less than a minute.'}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="mb-8 max-w-sm mx-auto">
          <div className="flex items-center gap-0">
            {STEPS.map((s, idx) => {
              const done = s.num < step;
              const cur  = s.num === step;
              const Icon = s.icon;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      done
                        ? 'bg-[#1B4332] text-white shadow-lg shadow-emerald-200'
                        : cur
                        ? 'bg-white border-2 border-[#2D6A4F] text-[#2D6A4F] shadow-md shadow-emerald-100'
                        : 'bg-white border-2 border-slate-200 text-slate-300'
                    }`}>
                      {done ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider font-sans transition-colors ${
                      done || cur ? 'text-[#1B4332]' : 'text-slate-400'
                    }`}>
                      {isRtl ? s.titleAr : s.titleEn}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mb-5 transition-all duration-500 ${done ? 'bg-[#1B4332]' : 'bg-slate-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="p-6 sm:p-10 space-y-10">

              {/* Step header */}
              <div className="flex items-center gap-4 pb-7 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1B4332] font-sans">
                    {isRtl ? 'حالتك الطبية وتفضيلاتك' : 'Medical Needs & Preferences'}
                  </h2>
                  <p className="text-sm text-slate-400 mt-0.5 font-sans font-light">
                    {isRtl ? 'حدد التخصص الطبي وتفاصيل إقامتك لبدء حساب التكاليف التقديرية' : 'Select your speciality and preferences to begin your instant estimate'}
                  </p>
                </div>
              </div>

              {/* Speciality Grid */}
              <div className="space-y-4">
                <SectionLabel required>{isRtl ? 'التخصص الطبي المطلوب' : 'Medical Speciality'}</SectionLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {SPECIALITIES.map(sp => {
                    const SpecIcon = sp.icon;
                    const active = data.speciality === sp.id;
                    return (
                      <button key={sp.id} type="button" onClick={() => updateData({ speciality: sp.id })}
                        className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2.5 min-h-[96px] group overflow-hidden ${
                          active
                            ? 'border-[#2D6A4F] bg-gradient-to-b from-[#2D6A4F]/5 to-[#2D6A4F]/10 shadow-md shadow-emerald-100'
                            : 'border-slate-100 hover:border-[#2D6A4F]/30 hover:bg-slate-50/60 bg-white'
                        }`}>
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                          active ? 'bg-[#2D6A4F] text-white shadow-md shadow-emerald-200' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-[#2D6A4F]'
                        }`}>
                          <SpecIcon className="h-5 w-5" />
                        </div>
                        <span className={`text-[11px] font-bold leading-tight font-sans ${active ? 'text-[#1B4332]' : 'text-slate-600 group-hover:text-[#2D6A4F]'}`}>
                          {isRtl ? sp.labelAr : sp.labelEn}
                        </span>
                        {active && (
                          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2D6A4F]" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {errors.speciality && <ErrorMessage>{errors.speciality}</ErrorMessage>}
              </div>

              {/* Condition Details */}
              <div className="space-y-2">
                <SectionLabel required>{isRtl ? 'وصف موجز للمتطلبات أو الحالة الطبية' : 'Brief Description of Condition / Requirements'}</SectionLabel>
                <textarea rows={3}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 text-sm bg-slate-50/50 focus:outline-none focus:bg-white focus:border-[#2D6A4F]/60 transition-all resize-none font-sans leading-relaxed text-slate-800 placeholder-slate-400 ${
                    errors.conditionDetail ? 'border-red-300 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  placeholder={isRtl ? 'مثال: أحتاج جراحة استبدال مفصل الركبة. أعاني من خشونة شديدة في المفصل منذ سنتين...' : 'e.g. Need knee replacement surgery. Severe joint pain and difficulty walking for 2 years...'}
                  value={data.conditionDetail} onChange={e => updateData({ conditionDetail: e.target.value })} />
                {errors.conditionDetail && <ErrorMessage>{errors.conditionDetail}</ErrorMessage>}
              </div>

              {/* Stay & Companions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <SectionLabel>{isRtl ? 'إجمالي أيام الإقامة المتوقعة' : 'Expected Stay (Days)'}</SectionLabel>
                  <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-3 hover:border-slate-300 transition-colors">
                    <button type="button" onClick={() => updateData({ totalDays: Math.max(3, data.totalDays - 1) })}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all cursor-pointer shadow-sm shrink-0">
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-2xl font-bold text-[#1B4332] font-sans">{data.totalDays}</span>
                      <span className="text-sm text-slate-500 ml-1 font-sans">{isRtl ? 'يوم' : 'days'}</span>
                    </div>
                    <button type="button" onClick={() => updateData({ totalDays: Math.min(90, data.totalDays + 1) })}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all cursor-pointer shadow-sm shrink-0">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <SectionLabel>{isRtl ? 'عدد المرافقين المسافرين معك' : 'Number of Companions'}</SectionLabel>
                  <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-3 hover:border-slate-300 transition-colors">
                    <button type="button" onClick={() => updateData({ companions: Math.max(0, data.companions - 1) })}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all cursor-pointer shadow-sm shrink-0">
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-2xl font-bold text-[#1B4332] font-sans">{data.companions}</span>
                      <span className="text-sm text-slate-500 ml-1 font-sans">{data.companions === 0 ? (isRtl ? 'بمفردي' : 'solo') : (isRtl ? 'مرافق' : 'people')}</span>
                    </div>
                    <button type="button" onClick={() => updateData({ companions: Math.min(10, data.companions + 1) })}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-all cursor-pointer shadow-sm shrink-0">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Accommodation */}
              <div className="space-y-4">
                <SectionLabel required>{isRtl ? 'فئة السكن المفضلة' : 'Accommodation Preference'}</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'apartment' as const, icon: Home,     titleEn: 'Patient Serviced Suite', titleAr: 'شقة مفروشة للمرضى',       priceEn: '~$80/night',  priceAr: '~٨٠$/ليلة',   descEn: 'Furnished, kitchen access, patient-friendly', descAr: 'مجهزة بالكامل مع مطبخ' },
                    { id: 'budget' as const,     icon: Building, titleEn: '3-Star Budget Hotel',    titleAr: 'فندق اقتصادي ٣ نجوم',     priceEn: '~$60/night',  priceAr: '~٦٠$/ليلة',   descEn: 'Clean standard rooms, near hospitals',        descAr: 'غرف قياسية، قرب المستشفى' },
                    { id: 'premium' as const,    icon: Award,    titleEn: '4/5-Star Premium Hotel', titleAr: 'فندق فاخر ٤-٥ نجوم',      priceEn: '~$180/night', priceAr: '~١٨٠$/ليلة',  descEn: 'Full luxury, room service & pool',             descAr: 'فخامة متكاملة مع مسبح' },
                    { id: 'none' as const,       icon: XCircle,  titleEn: 'I Will Book My Own',     titleAr: 'سأحجز السكن بنفسي',       priceEn: 'Self-arranged', priceAr: 'ترتيب ذاتي', descEn: 'We coordinate logistics to your address',     descAr: 'نسق النقل لعنوانك المختار' },
                  ].map((tier) => {
                    const active = data.accommodationType === tier.id;
                    const TierIcon = tier.icon;
                    return (
                      <button key={tier.id} type="button" onClick={() => updateData({ accommodationType: tier.id })}
                        className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-start cursor-pointer w-full group ${
                          active ? 'border-[#2D6A4F] bg-gradient-to-br from-emerald-50/70 to-white shadow-md shadow-emerald-100'
                                 : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
                        }`}>
                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          active ? 'bg-[#2D6A4F] text-white shadow-md shadow-emerald-200' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-[#2D6A4F]'
                        }`}>
                          <TierIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-baseline justify-between gap-2 flex-wrap">
                            <span className={`text-sm font-bold font-sans ${active ? 'text-[#1B4332]' : 'text-slate-700'}`}>
                              {isRtl ? tier.titleAr : tier.titleEn}
                            </span>
                            <span className={`text-xs font-bold font-sans shrink-0 ${active ? 'text-[#2D6A4F]' : 'text-[#D4A96A]'}`}>
                              {isRtl ? tier.priceAr : tier.priceEn}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            {isRtl ? tier.descAr : tier.descEn}
                          </p>
                        </div>
                        {active && <div className="w-2 h-2 rounded-full bg-[#2D6A4F] shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Logistics Add-ons */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <SectionLabel>{isRtl ? 'الخدمات اللوجستية التي تحتاجها' : 'Additional Logistics Support'}</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADDON_SERVICES.map(svc => {
                    const checked = data.selectedServices.includes(svc.id);
                    return (
                      <button key={svc.id} type="button" onClick={() => toggleService(svc.id)}
                        disabled={svc.isIncluded}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-start ${
                          svc.isIncluded ? 'border-emerald-100 bg-emerald-50/40 cursor-default'
                            : checked ? 'border-[#2D6A4F] bg-emerald-50/30 cursor-pointer'
                            : 'border-slate-100 bg-white hover:border-slate-200 cursor-pointer'
                        }`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          checked
                            ? svc.isIncluded ? 'border-emerald-500 bg-emerald-500' : 'border-[#2D6A4F] bg-[#2D6A4F]'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {checked && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold font-sans truncate ${checked ? (svc.isIncluded ? 'text-emerald-700' : 'text-[#1B4332]') : 'text-slate-600'}`}>
                            {isRtl ? svc.labelAr : svc.labelEn}
                          </p>
                          <p className={`text-[10px] mt-0.5 font-sans font-medium ${svc.isIncluded ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {isRtl ? svc.priceNoteAr : svc.priceNoteEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <SectionLabel required>{isRtl ? 'ما هو موعد السفر المخطط له؟' : 'Planned Travel Urgency'}</SectionLabel>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'ASAP',            en: 'Urgent (ASAP)',   ar: 'عاجل (بأسرع وقت)', emoji: '🚨' },
                    { id: 'Within 1 Month',  en: 'Within 1 Month',  ar: 'خلال شهر',          emoji: '📅' },
                    { id: '2-3 Months',      en: '2–3 Months',      ar: 'خلال ٢-٣ أشهر',    emoji: '🗓️' },
                    { id: 'Exploring',       en: 'Just Exploring',  ar: 'أستكشف فقط',        emoji: '🔍' },
                  ].map(u => (
                    <button key={u.id} type="button" onClick={() => updateData({ urgency: u.id })}
                      className={`flex flex-col items-center gap-2 px-3 py-3.5 rounded-xl border-2 text-xs font-bold text-center transition-all duration-200 cursor-pointer font-sans ${
                        data.urgency === u.id
                          ? 'border-[#2D6A4F] bg-gradient-to-b from-emerald-50 to-white text-[#1B4332] shadow-sm'
                          : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-white'
                      }`}>
                      <span className="text-lg">{u.emoji}</span>
                      <span>{isRtl ? u.ar : u.en}</span>
                    </button>
                  ))}
                </div>
                {errors.urgency && <ErrorMessage>{errors.urgency}</ErrorMessage>}
              </div>

            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="p-6 sm:p-10">

              {/* Step header */}
              <div className="flex items-center gap-4 pb-7 border-b border-slate-100 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1B4332] font-sans">
                    {isRtl ? 'بيانات الاتصال والتقدير الأولي' : 'Contact Details & Preliminary Quote'}
                  </h2>
                  <p className="text-sm text-slate-400 mt-0.5 font-sans font-light">
                    {isRtl ? 'أدخل بياناتك لعرض تقدير التكلفة وتفعيل الدعم والمتابعة مباشرة' : 'Provide your contact info to view your cost estimate and activate coordinator support'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

                {/* Contact Inputs */}
                <div className="space-y-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-sans">
                    {isRtl ? 'بيانات الاتصال الخاصة بك' : 'Your Contact Details'}
                  </h3>

                  <InputField id="fullName" label={isRtl ? 'الاسم الكامل' : 'Full Name'} required
                    placeholder={isRtl ? 'مثال: أحمد العتيبي' : 'e.g. Ahmed Al-Hadi'}
                    value={data.fullName} onChange={v => updateData({ fullName: v })} error={errors.fullName} />

                  <CountrySelectorField id="country" label={isRtl ? 'بلد الإقامة' : 'Country of Residence'} required
                    placeholder={isRtl ? 'اختر بلد الإقامة...' : 'Select your country...'}
                    value={data.country} onChange={v => updateData({ country: v })} error={errors.country} isRtl={isRtl} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField id="email" label={isRtl ? 'البريد الإلكتروني' : 'Email Address'} required type="email"
                      placeholder="patient@example.com"
                      value={data.email} onChange={v => updateData({ email: v })} error={errors.email} />

                    <InputField id="phone" label={isRtl ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'} required type="tel"
                      placeholder="+968 9900 0000"
                      value={data.phone} onChange={v => updateData({ phone: v })} error={errors.phone} />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 font-sans">
                      {isRtl ? 'أي ملاحظات أو طلبات خاصة' : 'Any Special Requirements / Notes'}
                    </label>
                    <textarea rows={3}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 text-sm bg-slate-50/50 focus:outline-none focus:bg-white focus:border-[#2D6A4F]/60 transition-all resize-none font-sans text-slate-800 placeholder-slate-400 hover:border-slate-300"
                      placeholder={isRtl ? 'شروط غذائية خاصة، احتياج كرسي متحرك، إلخ...' : 'e.g. Wheelchair access needed, special halal diet options, etc...'}
                      value={data.additionalNotes} onChange={e => updateData({ additionalNotes: e.target.value })} />
                  </div>

                  {/* Security badge */}
                  <div className="flex gap-3 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <span className="text-xl shrink-0">🔒</span>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans font-light">
                      {isRtl
                        ? 'تشفير آمن للبيانات وسرية طبية تامة. يتم مراجعة تقاريرك الطبية ومعلوماتك حصرياً من قبل منسقينا الطبيين والأطباء الاستشاريين في كيرلا.'
                        : 'Secure data encryption & absolute medical confidentiality. Your files are shared exclusively with licensed clinical coordinators and partner doctors in Kerala.'}
                    </p>
                  </div>
                </div>

                {/* Cost Breakdown Panel */}
                <div className="space-y-4">

                  {/* Estimate card */}
                  <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #1a3d2e 0%, #0f2419 100%)' }}>
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #D4A96A 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                    <div className="relative p-6 space-y-5">
                      {/* Header */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#D4A96A]/20 flex items-center justify-center">
                          <DollarSign className="h-4.5 w-4.5 text-[#D4A96A]" />
                        </div>
                        <h3 className="text-sm font-bold text-white font-sans tracking-wide">
                          {isRtl ? 'التقدير المبدئي للتكاليف' : 'Preliminary Cost Breakdown'}
                        </h3>
                      </div>

                      {/* Line items */}
                      <div className="space-y-0 divide-y divide-white/[0.06]">
                        <CostRow
                          label={isRtl ? `علاج ${SPECIALITIES.find(s => s.id === data.speciality)?.labelAr || data.speciality || 'محدد'}` : `${data.speciality || 'Selected'} Procedure`}
                          value={`${fmt(costEstimate.treatmentMin)} – ${fmt(costEstimate.treatmentMax)}`}
                        />
                        {data.accommodationType !== 'none' && (
                          <CostRow
                            label={isRtl ? `الإقامة × ${data.totalDays} ليلة` : `Accommodation × ${data.totalDays} nights`}
                            value={fmt(costEstimate.accommodation)}
                          />
                        )}
                        {costEstimate.addons > 0 && (
                          <CostRow
                            label={isRtl ? 'الخدمات الإضافية والوجبات' : 'Selected Add-ons'}
                            value={fmt(costEstimate.addons)}
                          />
                        )}
                        <CostRow
                          label={isRtl ? 'رسوم التنسيق والترجمة' : 'Coordination & Support'}
                          value={isRtl ? 'مجاني ✓' : 'FREE ✓'}
                          highlight="emerald"
                        />
                      </div>

                      {/* Total */}
                      <div className="rounded-2xl p-4 mt-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-sans">
                            {isRtl ? 'المجموع التقديري' : 'Est. Total Range'}
                          </span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-1 flex-wrap">
                          <span className="text-2xl font-extrabold text-[#D4A96A] font-sans leading-none">
                            {fmt(costEstimate.totalMin)}
                          </span>
                          <span className="text-base font-bold text-[#D4A96A]/70 font-sans">–</span>
                          <span className="text-2xl font-extrabold text-[#D4A96A] font-sans leading-none">
                            {fmt(costEstimate.totalMax)}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1.5 font-sans">
                          {isRtl ? 'تقدير أولي — يُؤكد بعد المراجعة الطبية' : 'Preliminary range — confirmed after medical review'}
                        </p>
                      </div>

                      {/* Disclaimer */}
                      <div className="flex gap-2.5 items-start p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <AlertCircle className="h-3.5 w-3.5 text-[#D4A96A] shrink-0 mt-0.5" />
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                          {isRtl
                            ? 'هذا التقدير مبدئي لحساب التكلفة التقريبية. يتم إرسال خطة علاجية مؤكدة بالأسعار بعد مراجعة الأطباء للتقارير والأشعة.'
                            : 'Preliminary range. A confirmed medical quote will be issued by the hospital after specialists review your medical files.'}
                        </p>
                      </div>

                      {/* Zero markup badge */}
                      <div className="flex gap-2.5 items-center p-3 rounded-xl" style={{ background: 'rgba(74, 222, 128, 0.05)', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
                        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                        <p className="text-[10px] text-emerald-400 font-sans font-medium">
                          {isRtl
                            ? 'لا توجد أي رسوم أو عمولات خفية. الأسعار تدفع للمستشفيات الشريكة مباشرة.'
                            : 'Zero markups. You pay partner JCI/NABH hospitals directly.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Best Rate Guarantee */}
                  <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200/40">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🛡️</span>
                      <h4 className="text-sm font-bold text-amber-800 font-sans">{isRtl ? 'ضمان أفضل الأسعار' : 'Best Rate Guarantee'}</h4>
                    </div>
                    <p className="text-xs text-amber-700/80 leading-relaxed font-sans font-light">
                      {isRtl
                        ? 'حجزك عبر علاج في كيرلا يضمن لك الحصول على الأسعار المؤسسية المخفضة (أقل بـ ١٥-٢٠٪ من حجز الأفراد المباشر).'
                        : 'Booking through TreatInKerala guarantees institutional rates 15–20% lower than direct individual inquiries.'}
                    </p>
                    <div className="pt-3 flex items-center gap-3 text-[11px] font-bold text-amber-700 flex-wrap">
                      <span>✓ {isRtl ? 'دفع مباشر للمستشفى' : 'Direct Hospital Billing'}</span>
                      <span className="text-amber-300 select-none">•</span>
                      <span>✓ {isRtl ? 'بدون رسوم إضافية' : 'Zero Hidden Fees'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="px-6 sm:px-10 py-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button type="button" onClick={goPrev}
                className="flex items-center gap-2 text-slate-500 hover:text-[#2D6A4F] font-semibold text-sm min-h-[44px] cursor-pointer transition-colors font-sans px-4 py-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200">
                {isRtl ? <ChevronRight className="h-4 w-4 shrink-0" /> : <ChevronLeft className="h-4 w-4 shrink-0" />}
                {isRtl ? 'السابق' : 'Back'}
              </button>
            ) : <div />}
            
            {step < TOTAL_STEPS ? (
              <button type="button" onClick={goNext}
                className="bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#0f2419] text-white font-bold px-8 py-3 rounded-full text-sm transition-all duration-300 shadow-lg shadow-emerald-200/60 flex items-center gap-2 cursor-pointer min-h-[44px] font-sans hover:shadow-xl hover:shadow-emerald-200/50 hover:-translate-y-0.5">
                {isRtl ? 'التالي' : 'Continue to Quote'}
                {isRtl ? <ChevronLeft className="h-4.5 w-4.5 shrink-0" /> : <ChevronRight className="h-4.5 w-4.5 shrink-0" />}
              </button>
            ) : (
              <button type="button" onClick={handleSubmit}
                className="bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] hover:from-[#1B4332] hover:to-[#0f2419] text-white font-bold px-8 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-emerald-200/60 hover:shadow-xl hover:shadow-emerald-200/50 hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer min-h-[48px] font-sans"
              >
                <Mail className="h-5 w-5 shrink-0" />
                <span>{isRtl ? 'إرسال طلب تقدير التكلفة' : 'Submit for Free Quote'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Trust strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 font-sans">
          {[
            { icon: '🔒', en: '100% Secure & Private', ar: 'سرية وأمان تام' },
            { icon: '✅', en: 'Free concierge, zero obligation', ar: 'خدمات مجانية بالكامل' },
            { icon: '⚡', en: 'Response within 24–48 hours', ar: 'رد خلال ٢٤–٤٨ ساعة' },
          ].map((t, i) => (
            <span key={i} className="flex items-center gap-1.5 font-medium">
              <span>{t.icon}</span>
              {isRtl ? t.ar : t.en}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Helper Components ──────────────────────────────────────────

function SectionLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-slate-700 font-sans">
      {children}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-red-500 text-xs font-semibold font-sans flex items-center gap-1.5 mt-1">
      <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
      {children}
    </p>
  );
}

function InputField({ id, label, required, placeholder, value, onChange, error, type = 'text' }: {
  id: string; label: string; required?: boolean; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 font-sans">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input id={id} type={type}
        className={`w-full px-4 py-3.5 rounded-2xl border-2 text-sm min-h-[48px] focus:outline-none transition-all font-sans text-slate-800 placeholder-slate-400 ${
          error
            ? 'border-red-300 bg-red-50/30 focus:border-red-400'
            : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 focus:border-[#2D6A4F]/60 focus:bg-white'
        }`}
        placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

function CostRow({ label, value, muted, highlight }: {
  label: string; value: string; muted?: boolean; highlight?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 font-sans gap-4">
      <span className="text-slate-400 text-xs leading-snug flex-1">{label}</span>
      <span className={`font-bold text-sm shrink-0 ${
        highlight === 'emerald' ? 'text-emerald-400' : muted ? 'text-slate-500' : 'text-white'
      }`}>{value}</span>
    </div>
  );
}

// ── Country Selector ──────────────────────────────────────────

interface Country {
  code: string;
  nameEn: string;
  nameAr: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: 'OM', nameEn: 'Oman',                   nameAr: 'عُمان',                        flag: '🇴🇲' },
  { code: 'SA', nameEn: 'Saudi Arabia',            nameAr: 'المملكة العربية السعودية',     flag: '🇸🇦' },
  { code: 'AE', nameEn: 'United Arab Emirates',    nameAr: 'الإمارات العربية المتحدة',     flag: '🇦🇪' },
  { code: 'QA', nameEn: 'Qatar',                   nameAr: 'قطر',                          flag: '🇶🇦' },
  { code: 'KW', nameEn: 'Kuwait',                  nameAr: 'الكويت',                       flag: '🇰🇼' },
  { code: 'BH', nameEn: 'Bahrain',                 nameAr: 'البحرين',                      flag: '🇧🇭' },
  { code: 'YE', nameEn: 'Yemen',                   nameAr: 'اليمن',                        flag: '🇾🇪' },
  { code: 'IQ', nameEn: 'Iraq',                    nameAr: 'العراق',                       flag: '🇮🇶' },
  { code: 'JO', nameEn: 'Jordan',                  nameAr: 'الأردن',                       flag: '🇯🇴' },
  { code: 'EG', nameEn: 'Egypt',                   nameAr: 'مصر',                          flag: '🇪🇬' },
  { code: 'SD', nameEn: 'Sudan',                   nameAr: 'السودان',                      flag: '🇸🇩' },
  { code: 'NG', nameEn: 'Nigeria',                 nameAr: 'نيجيريا',                      flag: '🇳🇬' },
  { code: 'KE', nameEn: 'Kenya',                   nameAr: 'كينيا',                        flag: '🇰🇪' },
  { code: 'GB', nameEn: 'United Kingdom',          nameAr: 'المملكة المتحدة',              flag: '🇬🇧' },
  { code: 'DE', nameEn: 'Germany',                 nameAr: 'ألمانيا',                      flag: '🇩🇪' },
  { code: 'FR', nameEn: 'France',                  nameAr: 'فرنسا',                        flag: '🇫🇷' },
  { code: 'OTHER', nameEn: 'Other Country',        nameAr: 'بلد آخر',                      flag: '🌐' },
];

function CountrySelectorField({ id, label, required, placeholder, value, onChange, error, isRtl }: {
  id: string; label: string; required?: boolean; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; isRtl: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredCountries = useMemo(() => {
    if (!search) return COUNTRIES;
    return COUNTRIES.filter(c =>
      c.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      c.nameAr.includes(search)
    );
  }, [search]);

  const selectedCountry = COUNTRIES.find(c =>
    (isRtl ? c.nameAr : c.nameEn) === value || c.nameEn === value || c.nameAr === value
  );

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-700 font-sans">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>

      {/* Trigger */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`w-full px-4 py-3.5 rounded-2xl border-2 text-sm min-h-[48px] transition-all font-sans cursor-pointer flex items-center justify-between gap-3 ${
          error
            ? 'border-red-300 bg-red-50/30'
            : isOpen
            ? 'border-[#2D6A4F]/60 bg-white shadow-sm'
            : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl leading-none shrink-0">
            {selectedCountry ? selectedCountry.flag : '🌐'}
          </span>
          <span className={`truncate font-sans ${value ? 'text-slate-800 font-semibold' : 'text-slate-400 font-normal'}`}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-2xl shadow-slate-300/30 z-50 overflow-hidden" style={{ animation: 'slideDown 0.15s ease-out' }}>
          {/* Search bar */}
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                ref={searchRef}
                type="text"
                placeholder={isRtl ? 'ابحث عن بلد...' : 'Search country...'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]/60 focus:bg-white text-slate-800 font-sans placeholder-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Country list */}
          <div className="overflow-y-auto max-h-52 py-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => {
                const countryVal = isRtl ? country.nameAr : country.nameEn;
                const isSelected = value === countryVal;
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onChange(countryVal);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full px-4 py-2.5 flex items-center justify-between text-left rtl:text-right transition-colors cursor-pointer font-sans ${
                      isSelected
                        ? 'bg-emerald-50 text-[#1B4332]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg leading-none">{country.flag}</span>
                      <span className={`text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}>
                        {isRtl ? country.nameAr : country.nameEn}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircle className="h-4 w-4 text-[#2D6A4F] shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-6 text-sm text-slate-400 font-sans text-center">
                <Globe className="h-6 w-6 mx-auto mb-2 text-slate-300" />
                {isRtl ? 'لم يتم العثور على نتائج' : 'No countries found'}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  );
}
