'use client';

import React, { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { SITE_CONFIG } from '@/lib/config';
import {
  User, Stethoscope,
  DollarSign, CheckCircle, MessageCircle, ChevronRight, ChevronLeft,
  Minus, Plus, AlertCircle, Phone, Mail,
  ShieldCheck, HeartPulse, Activity, Sparkles, Baby, Sprout, Brain, Shield, PlusCircle,
  Home, Building, Award, XCircle
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
  Cardiac:      { min: 4000, max: 6500,  suggestedDays: 21 },
  Orthopaedics: { min: 4500, max: 7500,  suggestedDays: 18 },
  Dental:       { min: 300,  max: 1200,  suggestedDays: 7  },
  Ayurveda:     { min: 600,  max: 1500,  suggestedDays: 21 },
  Fertility:    { min: 1800, max: 3000,  suggestedDays: 20 },
  Neurology:    { min: 3000, max: 8000,  suggestedDays: 14 },
  Oncology:     { min: 5000, max: 15000, suggestedDays: 30 },
  Other:        { min: 1000, max: 5000,  suggestedDays: 14 },
};

const SPECIALITIES = [
  { id: 'Cardiac',      labelEn: 'Cardiac / Heart',     labelAr: 'القلب والشرايين',     icon: HeartPulse },
  { id: 'Orthopaedics', labelEn: 'Joint Replacement',   labelAr: 'العظام والمفاصل',     icon: Activity },
  { id: 'Dental',       labelEn: 'Dental Care',         labelAr: 'طب الأسنان',          icon: Sparkles },
  { id: 'Fertility',    labelEn: 'IVF / Fertility',     labelAr: 'أطفال الأنابيب',      icon: Baby },
  { id: 'Ayurveda',     labelEn: 'Ayurveda / Wellness', labelAr: 'الأيورفيدا',          icon: Sprout },
  { id: 'Neurology',    labelEn: 'Neurology',           labelAr: 'الأعصاب',             icon: Brain },
  { id: 'Oncology',     labelEn: 'Oncology / Cancer',   labelAr: 'الأورام والسرطان',    icon: Shield },
  { id: 'Other',        labelEn: 'Other Speciality',    labelAr: 'تخصص آخر',            icon: PlusCircle },
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
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');

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
      // Auto-set suggested days when speciality changes
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
      if (!data.phone.trim()) {
        e.phone = contactMethod === 'whatsapp'
          ? (isRtl ? 'رقم واتساب مطلوب مع رمز الدولة' : 'WhatsApp number is required')
          : (isRtl ? 'البريد الإلكتروني مطلوب' : 'Email address is required');
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

  // Submit to Destination
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

    if (contactMethod === 'whatsapp') {
      const msg = isRtl
        ? `مرحباً علاج في كيرلا 👋\n\nأطلب تقدير تكلفة تفصيلي لرحلتي العلاجية.\n\n👤 *البيانات الشخصية*\nالاسم: ${data.fullName}\nالدولة: ${data.country}\nالواتساب: ${data.phone}${data.email ? `\nالإيميل: ${data.email}` : ''}\n\n🏥 *المتطلب الطبي*\nالتخصص: ${data.speciality}\nالحالة: ${data.conditionDetail}\nموعد السفر: ${data.urgency}\n\n🏨 *الإقامة والمدة*\nالمدة المطلوبة: ${data.totalDays} يوم\nالمرافقون: ${data.companions === 0 ? 'بمفردي' : `${data.companions} مرافق`}\nفئة السكن المفضلة: ${accommLabel}\n\n📋 *الخدمات اللوجستية*\n  • ${svcList}\n\n📝 *ملاحظات إضافية*\n${data.additionalNotes || 'لا توجد'}\n\n💰 *التقدير الأولي المتوقع*\nالعلاج: $${costEstimate.treatmentMin.toLocaleString()} – $${costEstimate.treatmentMax.toLocaleString()}\nالإقامة: $${costEstimate.accommodation.toLocaleString()}\nالمجموع التقديري: $${costEstimate.totalMin.toLocaleString()} – $${costEstimate.totalMax.toLocaleString()}\n\nيرجى مراجعة طلبي وإفادتي. شكراً 🙏`
        : `Hello TreatInKerala 👋\n\nI'd like a detailed medical estimate for my trip.\n\n👤 *Personal Details*\nName: ${data.fullName}\nCountry: ${data.country}\nWhatsApp: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ''}\n\n🏥 *Medical Requirement*\nSpeciality: ${data.speciality}\nCondition: ${data.conditionDetail}\nTravel Urgency: ${data.urgency}\n\n🏨 *Stay & Accommodation*\nTotal Stay: ${data.totalDays} days\nCompanions: ${data.companions === 0 ? 'Travelling alone' : `${data.companions} companion(s)`}\nAccommodation Preference: ${accommLabel}\n\n📋 *Logistics Services*\n  • ${svcList}\n\n📝 *Additional Notes*\n${data.additionalNotes || 'None'}\n\n💰 *Preliminary Estimate (Calculated)*\nTreatment: $${costEstimate.treatmentMin.toLocaleString()} – $${costEstimate.treatmentMax.toLocaleString()}\nAccommodation: $${costEstimate.accommodation.toLocaleString()}\nEstimated Total: $${costEstimate.totalMin.toLocaleString()} – $${costEstimate.totalMax.toLocaleString()}\n\nPlease send me a precise quote. Thank you 🙏`;

      window.open(`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(msg)}`, '_blank');
    } else {
      // Send via Email mailto
      const subject = isRtl 
        ? `طلب خطة أسعار طبية - المريض: ${data.fullName}`
        : `Medical Treatment Quote Request - Patient: ${data.fullName}`;

      const body = isRtl
        ? `مرحباً فريق علاج في كيرلا،

أطلب تقدير تكلفة تفصيلي لرحلتي العلاجية. إليك متطلباتي:

👤 البيانات الشخصية:
الاسم الكامل: ${data.fullName}
بلد الإقامة: ${data.country}
البريد الإلكتروني للتواصل: ${data.phone}

🏥 المتطلب الطبي:
التخصص الطبي: ${data.speciality}
تفاصيل الحالة: ${data.conditionDetail}
موعد السفر: ${data.urgency}

🏨 الإقامة والمدة:
عدد أيام الإقامة: ${data.totalDays} يوم
المرافقون: ${data.companions === 0 ? 'بمفردي' : `${data.companions} مرافق`}
فئة السكن المفضلة: ${accommLabel}

📋 الخدمات اللوجستية:
  • ${svcList}

📝 ملاحظات إضافية:
${data.additionalNotes || 'لا توجد'}

💰 التقدير الأولي التلقائي المحسوب:
العلاج المبدئي: $${costEstimate.treatmentMin.toLocaleString()} – $${costEstimate.treatmentMax.toLocaleString()}
سكن وإقامة: $${costEstimate.accommodation.toLocaleString()}
المجموع الكلي المقدر: $${costEstimate.totalMin.toLocaleString()} – $${costEstimate.totalMax.toLocaleString()}

يرجى مراجعة طلبي وإرسال عروض الأسعار والبدائل الطبية عبر البريد الإلكتروني. شكراً لكم.`
        : `Dear TreatInKerala Team,

I'd like to request a detailed clinical estimate for my treatment trip. Here are my details:

👤 Personal Details:
Full Name: ${data.fullName}
Country: ${data.country}
Contact Email: ${data.phone}

🏥 Medical Requirement:
Speciality: ${data.speciality}
Condition details: ${data.conditionDetail}
Travel Urgency: ${data.urgency}

🏨 Stay & Accommodation:
Requested Stay: ${data.totalDays} days
Companions: ${data.companions === 0 ? 'Solo' : `${data.companions} companions`}
Accommodation Option: ${accommLabel}

📋 Logistics Addons:
  • ${svcList}

📝 Special Requirements:
${data.additionalNotes || 'None'}

💰 Auto-Calculated Estimate:
Treatment: $${costEstimate.treatmentMin.toLocaleString()} – $${costEstimate.treatmentMax.toLocaleString()}
Accommodation: $${costEstimate.accommodation.toLocaleString()}
Estimated Total: $${costEstimate.totalMin.toLocaleString()} – $${costEstimate.totalMax.toLocaleString()}

Please coordinate quotes from partner super-specialty hospitals and reply to this email address.

Thank you.`;

      window.open(`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
    }
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
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-[2.5rem] p-10 sm:p-14 border border-[#D4A96A]/20 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            
            <h1 className="text-3xl font-semibold font-display text-primary-dark">
              {isRtl ? 'تم إرسال طلبك بنجاح!' : 'Estimate Request Sent!'}
            </h1>
            
            <p className="text-text-muted text-base leading-relaxed max-w-md mx-auto font-sans font-light">
              {contactMethod === 'whatsapp' 
                ? (isRtl 
                    ? 'لقد تم توجيهك إلى واتساب لإرسال ملخص متطلباتك. سيتصل بك منسقنا الطبي لتأكيد خيارات الرعاية.'
                    : 'Your details have been loaded to WhatsApp. Send the message to instantly activate our medical desk support.')
                : (isRtl 
                    ? 'لقد تم فتح بريدك الإلكتروني لإرسال متطلباتك. سنقوم بالتواصل معك عبر البريد مع خطة الأسعار قريباً.'
                    : 'We opened your mail client with your requirements template. Send the email, and our coordinator will respond shortly.')}
            </p>

            <div className="bg-[#FAF7F2] rounded-2xl p-6 text-start border border-[#D4A96A]/15 space-y-3">
              <p className="text-sm font-bold text-primary-dark font-sans">{isRtl ? 'ما هي الخطوات التالية؟' : 'What happens next?'}</p>
              {[
                isRtl ? 'يستعرض فريقنا تفاصيل حالتك الطبية' : 'Our team reviews your medical condition details',
                isRtl ? 'نتواصل مع كبار الاستشاريين في المستشفيات لإعداد الخطة المناسبة' : 'We coordinate with hospital specialists to secure the best plan',
                isRtl ? 'نرسل لك عروض أسعار مؤكدة وخيارات السكن عبر وسيلة الاتصال المفضلة' : 'We send you confirmed pricing and accommodation bookings to your chosen contact',
              ].map((txt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-text-muted font-sans font-light">
                  <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>

            <button onClick={() => { setSubmitted(false); setStep(1); }}
              className="text-primary-green hover:text-primary-dark font-bold text-sm underline transition-colors cursor-pointer font-sans">
              {isRtl ? 'تقديم طلب جديد' : 'Submit a new request'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#D4A96A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A96A] font-sans">
              {isRtl ? 'تقدير تكلفة مخصص وشفاف' : 'Personalised & Transparent Cost Estimate'}
            </span>
            <span className="h-px w-8 bg-[#D4A96A]" />
          </div>
          
          <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.08] text-4xl sm:text-5xl text-[#1B4332]">
            {isRtl ? 'احصل على تقدير فوري لرحلتك العلاجية' : 'Get Your Instant Medical Journey Quote'}
          </h1>
          
          <p className="text-text-muted max-w-2xl mx-auto text-base leading-relaxed font-sans font-light">
            {isRtl
              ? 'أخبرنا بنوع العلاج الذي تبحث عنه، وسنحسب لك تقديراً أولياً شاملاً. يستغرق ملء النموذج دقيقة واحدة فقط.'
              : 'Tell us about the treatment you need, and instantly calculate a preliminary cost estimate. Filling this takes less than a minute.'}
          </p>
        </div>

        {/* Step Progress Stepper */}
        <div className="relative z-10 mb-8 bg-[#FAF7F2] rounded-3xl p-5 border border-[#D4A96A]/20 shadow-xs max-w-lg mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-text-muted mb-4 font-sans">
            <span>{isRtl ? `الخطوة ${step} من ${TOTAL_STEPS}` : `Step ${step} of ${TOTAL_STEPS}`}</span>
            <span className="text-primary-green">{isRtl ? STEPS[step - 1].titleAr : STEPS[step - 1].titleEn}</span>
          </div>
          <div className="flex items-center">
            {STEPS.map((s, idx) => {
              const done = s.num < step;
              const cur  = s.num === step;
              const Icon = s.icon;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      done ? 'bg-[#1B4332] text-white shadow-sm' : cur ? 'bg-white border-2 border-[#1B4332] text-[#1B4332] shadow-sm animate-pulse' : 'bg-slate-100 border-2 border-slate-200 text-slate-300'
                    }`}>
                      {done ? <CheckCircle className="h-4.5 w-4.5" /> : <Icon className="h-4.5 w-4.5" />}
                    </div>
                    <span className={`text-[10px] font-bold hidden sm:block text-center leading-tight transition-colors font-sans uppercase tracking-wider ${done || cur ? 'text-primary-dark' : 'text-slate-400'}`}>
                      {isRtl ? s.titleAr : s.titleEn}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-4 sm:-mt-5 transition-colors duration-300 ${done ? 'bg-[#1B4332]' : 'bg-slate-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Card Container */}
        <div className="bg-white rounded-[2.5rem] border border-[#D4A96A]/15 shadow-xl overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>

          {/* ── STEP 1: Medical Details & Logistics ── */}
          {step === 1 && (
            <div className="p-6 sm:p-10 space-y-8">
              <StepHeader icon={Stethoscope} titleEn="Medical Needs & Preferences" titleAr="حالتك الطبية وتفضيلاتك"
                subEn="Select your required specialty and details to begin the estimate" subAr="حدد التخصص الطبي وتفاصيل إقامتك لبدء حساب التكاليف التقديرية" isRtl={isRtl} />
              
              {/* Speciality Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-text-dark font-sans">{isRtl ? 'التخصص الطبي المطلوبة' : 'Medical Speciality'} *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SPECIALITIES.map(sp => {
                    const SpecIcon = sp.icon;
                    return (
                      <button key={sp.id} type="button" onClick={() => updateData({ speciality: sp.id })}
                        className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 cursor-pointer min-h-[90px] flex flex-col items-center justify-center gap-2 group relative overflow-hidden ${
                          data.speciality === sp.id ? 'border-[#2D6A4F] bg-[#FAF7F2]' : 'border-slate-100 hover:border-[#D4A96A]/30 bg-white'
                        }`}>
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                          data.speciality === sp.id ? 'bg-[#2D6A4F] text-white border-transparent' : 'bg-[#FAF7F2] text-[#2D6A4F] border-[#D4A96A]/15 group-hover:scale-105'
                        }`}>
                          <SpecIcon className="h-4.5 w-4.5" />
                        </div>
                        <span className={`text-[11px] font-bold leading-tight font-sans tracking-tight ${data.speciality === sp.id ? 'text-[#1B4332]' : 'text-slate-600'}`}>
                          {isRtl ? sp.labelAr : sp.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.speciality && <p className="text-red-500 text-xs font-semibold font-sans">{errors.speciality}</p>}
              </div>

              {/* Condition Details */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-text-dark font-sans">
                  {isRtl ? 'وصف موجز للمتطلبات أو الحالة الطبية' : 'Brief Description of Condition / Requirements'} *
                </label>
                <textarea rows={3}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-base bg-[#FAF7F2]/30 focus:outline-none focus:border-[#2D6A4F]/60 transition-all resize-none font-sans leading-relaxed text-[#1B4332] ${errors.conditionDetail ? 'border-red-400' : 'border-slate-200'}`}
                  placeholder={isRtl ? 'مثال: أحتاج جراحة استبدال مفصل الركبة. أعاني من خشونة شديدة في المفصل منذ سنتين...' : 'e.g. Need knee replacement surgery. Experiencing severe joint pain and difficulty walking for 2 years...'}
                  value={data.conditionDetail} onChange={e => updateData({ conditionDetail: e.target.value })} />
                {errors.conditionDetail && <p className="text-red-500 text-xs font-semibold font-sans">{errors.conditionDetail}</p>}
              </div>

              {/* Stay & Companions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Stay Days */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-text-dark font-sans">{isRtl ? 'إجمالي أيام الإقامة المتوقعة' : 'Expected Stay (Days)'}</label>
                  <div className="flex items-center justify-between bg-[#FAF7F2]/30 border border-slate-200 rounded-2xl px-4 py-2.5 min-h-[48px]">
                    <button type="button" onClick={() => updateData({ totalDays: Math.max(3, data.totalDays - 1) })}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] transition-all cursor-pointer">
                      <Minus className="h-4 w-4 text-text-muted" />
                    </button>
                    <span className="text-sm font-bold text-primary-dark font-sans">{data.totalDays} {isRtl ? 'يوم' : 'days'}</span>
                    <button type="button" onClick={() => updateData({ totalDays: Math.min(90, data.totalDays + 1) })}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] transition-all cursor-pointer">
                      <Plus className="h-4 w-4 text-text-muted" />
                    </button>
                  </div>
                </div>

                {/* Companions */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-text-dark font-sans">{isRtl ? 'عدد المرافقين المسافرين معك' : 'Number of Companions'}</label>
                  <div className="flex items-center justify-between bg-[#FAF7F2]/30 border border-slate-200 rounded-2xl px-4 py-2.5 min-h-[48px]">
                    <button type="button" onClick={() => updateData({ companions: Math.max(0, data.companions - 1) })}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] transition-all cursor-pointer">
                      <Minus className="h-4 w-4 text-text-muted" />
                    </button>
                    <span className="text-sm font-bold text-primary-dark font-sans">{data.companions === 0 ? (isRtl ? 'بمفردي' : 'Solo') : `${data.companions} ${isRtl ? 'مرافق' : 'people'}`}</span>
                    <button type="button" onClick={() => updateData({ companions: Math.min(10, data.companions + 1) })}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#2D6A4F] transition-all cursor-pointer">
                      <Plus className="h-4 w-4 text-text-muted" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Accommodation Preference Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-text-dark font-sans">
                  {isRtl ? 'فئة السكن المفضلة' : 'Accommodation Preference'} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'apartment' as const,
                      icon: Home,
                      titleEn: 'Patient Serviced Suite',
                      titleAr: 'شقة مفروشة للمرضى',
                      priceEn: '~$80 / night',
                      priceAr: '~٨٠ دولار / ليلة',
                      descEn: 'Fully furnished, kitchen access, patient-friendly setup',
                      descAr: 'مفروشة بالكامل، إمكانية استخدام المطبخ، مجهزة ومريحة للمرضى',
                    },
                    {
                      id: 'budget' as const,
                      icon: Building,
                      titleEn: '3-Star Budget Hotel',
                      titleAr: 'فندق اقتصادي ٣ نجوم',
                      priceEn: '~$60 / night',
                      priceAr: '~٦٠ دولار / ليلة',
                      descEn: 'Clean standard rooms, near hospitals, breakfast options',
                      descAr: 'غرف قياسية نظيفة، بالقرب من المستشفى، خيارات الإفطار',
                    },
                    {
                      id: 'premium' as const,
                      icon: Award,
                      titleEn: '4/5-Star Premium Hotel',
                      titleAr: 'فندق فاخر ٤-٥ نجوم',
                      priceEn: '~$180 / night',
                      priceAr: '~١٨٠ دولار / ليلة',
                      descEn: 'Premium luxury, laundry, full room service, swimming pool',
                      descAr: 'فخامة ورفاهية متكاملة، خدمة غرف، غسيل ملابس، مسبح',
                    },
                    {
                      id: 'none' as const,
                      icon: XCircle,
                      titleEn: 'I Will Book My Own',
                      titleAr: 'سأقوم بحجز السكن بنفسي',
                      priceEn: 'Self-arranged',
                      priceAr: 'ترتيب ذاتي',
                      descEn: 'We will coordinate logistics to your chosen hotel address',
                      descAr: 'سنقوم بتنسيق النقل واللوجستيات لعنوان سكنك المختار',
                    },
                  ].map((tier) => {
                    const active = data.accommodationType === tier.id;
                    const TierIcon = tier.icon;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => updateData({ accommodationType: tier.id })}
                        className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-300 text-start cursor-pointer w-full group relative overflow-hidden ${
                          active
                            ? 'border-[#2D6A4F] bg-[#FAF7F2] shadow-md'
                            : 'border-slate-100 bg-white hover:border-[#D4A96A]/30 hover:shadow-xs'
                        }`}
                      >
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          active ? 'bg-[#2D6A4F] text-white border-transparent' : 'bg-[#FAF7F2] text-[#2D6A4F] border-[#D4A96A]/15 group-hover:scale-105'
                        }`}>
                          <TierIcon className="h-5 w-5" />
                        </div>
                        
                        <div className="space-y-1 z-10 flex-grow">
                          <div className="flex justify-between items-baseline gap-2 flex-wrap">
                            <h4 className="font-bold text-text-dark text-sm group-hover:text-primary-green transition-colors">
                              {isRtl ? tier.titleAr : tier.titleEn}
                            </h4>
                            <span className={`text-xs font-bold font-sans ${active ? 'text-primary-green' : 'text-[#D4A96A]'}`}>
                              {isRtl ? tier.priceAr : tier.priceEn}
                            </span>
                          </div>
                          <p className="text-[11px] text-text-muted leading-relaxed font-sans font-light">
                            {isRtl ? tier.descAr : tier.descEn}
                          </p>
                        </div>
                        {active && (
                          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#2D6A4F] rounded-bl-lg" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Logistics/Addon Services Checklist */}
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <label className="block text-sm font-bold text-text-dark font-sans">{isRtl ? 'الخدمات اللوجستية التي تحتاجها' : 'Additional Logistics Support'}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADDON_SERVICES.map(svc => {
                    const checked = data.selectedServices.includes(svc.id);
                    return (
                      <button key={svc.id} type="button" onClick={() => toggleService(svc.id)}
                        disabled={svc.isIncluded}
                        className={`flex items-center gap-3.5 p-3.5 rounded-xl border-2 transition-all duration-300 text-start ${
                          svc.isIncluded ? 'border-emerald-100/50 bg-emerald-50/20 cursor-default'
                            : checked ? 'border-[#2D6A4F] bg-[#FAF7F2] cursor-pointer'
                            : 'border-slate-100 bg-white hover:border-[#D4A96A]/30 cursor-pointer'
                        }`}>
                        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          checked ? svc.isIncluded ? 'border-emerald-500 bg-emerald-500' : 'border-[#2D6A4F] bg-[#2D6A4F]' : 'border-slate-300 bg-white'
                        }`}>
                          {checked && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${checked ? (svc.isIncluded ? 'text-emerald-700' : 'text-[#2D6A4F]') : 'text-slate-700'}`}>
                            {isRtl ? svc.labelAr : svc.labelEn}
                          </p>
                          <p className="text-[10px] text-text-muted mt-0.5 font-sans font-medium">
                            {isRtl ? svc.priceNoteAr : svc.priceNoteEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <label className="block text-sm font-bold text-text-dark font-sans">{isRtl ? 'ما هو موعد السفر المخطط له؟' : 'Planned Travel Urgency'} *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'ASAP',           en: 'Urgent (ASAP)',        ar: 'عاجل (بأسرع وقت)' },
                    { id: 'Within 1 Month',  en: 'Within 1 Month',       ar: 'خلال شهر' },
                    { id: '2-3 Months',     en: '2-3 Months',           ar: 'خلال ٢-٣ أشهر' },
                    { id: 'Exploring',      en: 'Just Exploring',       ar: 'أستكشف فقط' },
                  ].map(u => (
                    <button key={u.id} type="button" onClick={() => updateData({ urgency: u.id })}
                      className={`px-3 py-3 rounded-xl border-2 text-xs font-bold text-center transition-all duration-300 cursor-pointer min-h-[44px] font-sans ${
                        data.urgency === u.id ? 'border-[#2D6A4F] bg-[#FAF7F2] text-[#1B4332]' : 'border-slate-100 text-slate-500 hover:border-[#D4A96A]/30'
                      }`}>
                      {isRtl ? u.ar : u.en}
                    </button>
                  ))}
                </div>
                {errors.urgency && <p className="text-red-500 text-xs font-semibold font-sans">{errors.urgency}</p>}
              </div>

            </div>
          )}

          {/* ── STEP 2: Contact Info & Pricing Summary ── */}
          {step === 2 && (
            <div className="p-6 sm:p-10 space-y-8">
              <StepHeader icon={User} titleEn="Contact Details & Preliminary Quote" titleAr="بيانات الاتصال والتقدير الأولي"
                subEn="Provide your contact info to calculate your estimate and secure direct coordinator support" subAr="أدخل بياناتك لعرض تقدير التكلفة وتفعيل الدعم والمتابعة مباشرة" isRtl={isRtl} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Contact Inputs */}
                <div className="lg:col-span-6 space-y-6">
                  <h3 className="text-base font-bold text-text-dark font-sans border-b border-slate-100 pb-2">
                    {isRtl ? 'بيانات الاتصال الخاصة بك' : 'Your Contact Details'}
                  </h3>

                  <InputField id="fullName" label={isRtl ? 'الاسم الكامل' : 'Full Name'} required
                    placeholder={isRtl ? 'مثال: أحمد العتيبي' : 'e.g. Ahmed Al-Hadi'}
                    value={data.fullName} onChange={v => updateData({ fullName: v })} error={errors.fullName} />

                  <InputField id="country" label={isRtl ? 'بلد الإقامة' : 'Country of Residence'} required
                    placeholder={isRtl ? 'عمان، السعودية، الإمارات، قطر...' : 'e.g. Oman, Saudi Arabia, UAE'}
                    value={data.country} onChange={v => updateData({ country: v })} error={errors.country} />

                  {/* Channel Toggle */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-text-dark font-sans">
                      {isRtl ? 'قناة التواصل المفضلة' : 'Preferred Contact Channel'} *
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-[#FAF7F2] p-1 rounded-xl border border-[#D4A96A]/15">
                      <button
                        type="button"
                        onClick={() => { setContactMethod('whatsapp'); updateData({ phone: '' }); }}
                        className={`py-2 px-3 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${contactMethod === 'whatsapp' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                      >
                        {isRtl ? 'واتساب' : 'WhatsApp'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setContactMethod('email'); updateData({ phone: '' }); }}
                        className={`py-2 px-3 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${contactMethod === 'email' ? 'bg-[#2D6A4F] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                      >
                        {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#1B4332] font-sans">
                      {contactMethod === 'whatsapp'
                        ? (isRtl ? 'رقم واتساب (مع رمز الدولة)' : 'WhatsApp Number (with country code)')
                        : (isRtl ? 'البريد الإلكتروني' : 'Email Address')} *
                    </label>
                    <div className="relative">
                      {contactMethod === 'whatsapp' ? (
                        <Phone className={`absolute top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 ${isRtl ? 'end-3.5' : 'start-3.5'}`} />
                      ) : (
                        <Mail className={`absolute top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 ${isRtl ? 'end-3.5' : 'start-3.5'}`} />
                      )}
                      
                      <input
                        type={contactMethod === 'whatsapp' ? 'tel' : 'email'}
                        dir={contactMethod === 'whatsapp' ? 'ltr' : 'auto'}
                        className={`w-full ${isRtl ? 'pe-11 ps-4' : 'ps-11 pe-4'} py-3.5 rounded-2xl border text-base bg-[#FAF7F2]/30 min-h-[48px] focus:outline-none focus:border-[#2D6A4F]/60 transition-all font-sans text-[#1B4332] ${errors.phone ? 'border-red-400' : 'border-slate-200'}`}
                        placeholder={contactMethod === 'whatsapp' ? '+968 9900 0000' : 'patient@example.com'}
                        value={data.phone}
                        onChange={e => updateData({ phone: e.target.value })}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs font-semibold font-sans">{errors.phone}</p>}
                  </div>

                  {/* Optional Email/Phone alternate fallback input */}
                  {contactMethod === 'whatsapp' && (
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-text-dark font-sans">
                        {isRtl ? 'البريد الإلكتروني (اختياري)' : 'Email Address (optional)'}
                      </label>
                      <input type="email"
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-base bg-[#FAF7F2]/30 min-h-[48px] focus:outline-none focus:border-[#2D6A4F]/60 transition-all font-sans text-[#1B4332]"
                        placeholder="patient@example.com" value={data.email} onChange={e => updateData({ email: e.target.value })} />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-text-dark font-sans">
                      {isRtl ? 'أي ملاحظات أو طلبات خاصة' : 'Any Special Requirements / Notes'}
                    </label>
                    <textarea rows={3}
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-base bg-[#FAF7F2]/30 focus:outline-none focus:border-[#2D6A4F]/60 transition-all resize-none font-sans text-[#1B4332]"
                      placeholder={isRtl ? 'شروط غذائية خاصة، احتياج كرسي متحرك، إلخ...' : 'e.g. Wheelchair access needed, special halal diet options, etc...'}
                      value={data.additionalNotes} onChange={e => updateData({ additionalNotes: e.target.value })} />
                  </div>

                  {/* Security/GDPR badge */}
                  <div className="bg-[#FAF7F2] border border-[#D4A96A]/20 rounded-2xl p-4 flex gap-3 items-start text-xs text-text-muted leading-relaxed">
                    <span className="text-lg shrink-0 mt-0.5">🔒</span>
                    <p className="font-sans font-light">
                      {isRtl
                        ? 'تشفير آمن للبيانات وسرية طبية تامة. يتم مراجعة تقاريرك الطبية ومعلوماتك حصرياً من قبل منسقينا الطبيين والأطباء الاستشاريين في كيرلا.'
                        : 'Secure data encryption & absolute medical confidentiality. Your medical files and clinical details are shared exclusively with licensed clinical coordinators and partner doctors in Kerala.'}
                    </p>
                  </div>
                </div>

                {/* Estimate Summary Column */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-[#1B4332] rounded-[2rem] p-6 sm:p-8 space-y-4 text-white shadow-md border border-[#D4A96A]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#D4A96A]/5 w-40 h-40 rounded-full blur-2xl" />
                    
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                      <DollarSign className="h-5.5 w-5.5 text-[#D4A96A]" />
                      <h3 className="text-base font-bold font-sans tracking-wide">{isRtl ? 'التقدير المبدئي للتكاليف' : 'Preliminary Cost Breakdown'}</h3>
                    </div>
                    
                    <div className="space-y-1">
                      <CostRow 
                        label={isRtl ? `علاج ${SPECIALITIES.find(s => s.id === data.speciality)?.labelAr || data.speciality || 'محدد'}` : `${data.speciality || 'Selected'} Procedure`}
                        value={`${fmt(costEstimate.treatmentMin)} – ${fmt(costEstimate.treatmentMax)}`} 
                      />

                      {data.accommodationType !== 'none' && (
                        <CostRow 
                          label={isRtl ? `الإقامة (فئة السكن) × ${data.totalDays} ليلة` : `Accommodation (${data.accommodationType}) × ${data.totalDays} nights`}
                          value={fmt(costEstimate.accommodation)} 
                        />
                      )}

                      {costEstimate.addons > 0 && (
                        <CostRow 
                          label={isRtl ? 'الخدمات الإضافية والوجبات' : 'Selected Add-ons / Tours'} 
                          value={fmt(costEstimate.addons)} 
                        />
                      )}

                      <CostRow 
                        label={isRtl ? 'رسوم التنسيق والترجمة (علاج في كيرلا)' : 'TreatInKerala Coordination & Support'}
                        value={isRtl ? 'مجاني ✓' : 'COMPLIMENTARY ✓'} 
                        highlight="emerald" 
                      />

                      <div className="flex items-center justify-between pt-5 mt-2 border-t border-white/15">
                        <span className="font-bold text-white text-base font-sans">{isRtl ? 'المجموع التقديري' : 'Estimated Total'}</span>
                        <span className="font-extrabold text-[#D4A96A] text-xl sm:text-2xl font-display">
                          {fmt(costEstimate.totalMin)} – {fmt(costEstimate.totalMax)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-[#D4A96A] shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-300 leading-relaxed font-sans font-light">
                        {isRtl
                          ? 'هذا التقدير مبدئي لحساب التكلفة التقريبية. يتم إرسال خطة علاجية مؤكدة بالأسعار بعد مراجعة الأطباء للتقارير والأشعة.'
                          : 'This is a preliminary range. A confirmed medical quote and treatment plan will be issued directly by the hospital after specialists review your medical files.'}
                      </p>
                    </div>

                    <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3.5 flex items-start gap-2">
                      <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-emerald-300 font-sans font-light">
                        {isRtl
                          ? 'لا توجد أي رسوم أو عمولات خفية. الأسعار المعروضة تدفع للمستشفيات الشريكة مباشرة.'
                          : 'Zero markups. You pay partner JCI/NABH hospitals directly for clinical rooms and procedures.'}
                      </p>
                    </div>
                  </div>

                  {/* Best Rate Guarantee block */}
                  <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#D4A96A]/20 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-[#2D6A4F] font-bold text-sm">
                      <span>🛡️</span>
                      <h4>{isRtl ? 'ضمان أفضل الأسعار وتوفير حقيقي' : 'Best Rate Guarantee Policy'}</h4>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed font-sans font-light">
                      {isRtl 
                        ? 'حجزك عبر علاج في كيرلا يضمن لك الحصول على الأسعار المؤسسية المخفضة (أقل بـ ١٥-٢٠٪ من حجز الأفراد المباشر). إذا حصلت على سعر أقل بشكل مباشر من نفس المستشفى، فسنقوم بمطابقة السعر فوراً مع توفير جولة سياحية مجانية ليوم كامل في كيرلا.' 
                        : 'Booking through TreatInKerala guarantees you special institutional rates (15-20% lower than direct individual inquiries). If you receive a lower quote directly from the same hospital, we will match the rate and include a free full-day tour of Kerala for you and your companion.'}
                    </p>
                    <div className="pt-1 text-[11px] font-bold text-[#2D6A4F] flex items-center gap-2 flex-wrap">
                      <span>✓ {isRtl ? 'دفع مباشر للمستشفى' : '100% Direct Hospital Billing'}</span>
                      <span className="text-text-muted select-none">•</span>
                      <span>✓ {isRtl ? 'بدون رسوم إضافية' : 'Zero Hidden Fees'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer Row */}
          <div className="px-6 sm:px-10 py-5 bg-[#FAF7F2] border-t border-slate-100 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button type="button" onClick={goPrev}
                className="flex items-center gap-1.5 text-text-muted hover:text-[#2D6A4F] font-bold text-sm min-h-[44px] cursor-pointer transition-colors font-sans">
                {isRtl ? <ChevronRight className="h-4.5 w-4.5 shrink-0" /> : <ChevronLeft className="h-4.5 w-4.5 shrink-0" />}
                {isRtl ? 'السابق' : 'Back'}
              </button>
            ) : <div />}
            
            {step < TOTAL_STEPS ? (
              <button type="button" onClick={goNext}
                className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold px-7 py-3 rounded-full text-sm transition-all duration-300 shadow-sm flex items-center gap-1.5 cursor-pointer min-h-[44px] font-sans">
                {isRtl ? 'التالي' : 'Continue'}
                {isRtl ? <ChevronLeft className="h-4.5 w-4.5 shrink-0" /> : <ChevronRight className="h-4.5 w-4.5 shrink-0" />}
              </button>
            ) : (
              <button type="button" onClick={handleSubmit}
                className={`text-white font-bold px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer min-h-[48px] font-sans ${contactMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#20ba5a]' : 'bg-[#2D6A4F] hover:bg-[#1B4332]'}`}>
                {contactMethod === 'whatsapp' ? (
                  <>
                    <MessageCircle className="h-5 w-5 shrink-0" />
                    <span>{isRtl ? 'إرسال الطلب عبر واتساب' : 'Send Request via WhatsApp'}</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5 shrink-0" />
                    <span>{isRtl ? 'إرسال الطلب عبر البريد' : 'Send Request via Email'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Trust strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted font-sans">
          {[
            { icon: '🔒', en: '100% Secure & Private medical records handling', ar: 'سرية وأمان تام للمعلومات والتقارير الطبية' },
            { icon: '✅', en: 'Free of charge concierge support, zero obligations', ar: 'خدمات مجانية بالكامل، بدون أي التزامات دفع مسبقة' },
            { icon: '⚡', en: 'Fast response and doctor feedback within 24-48 hours', ar: 'تنسيق طبي واستشارة الأطباء خلال ٢٤-٨٤ ساعة' },
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

function StepHeader({ icon: Icon, titleEn, titleAr, subEn, subAr, isRtl }: {
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string; titleAr: string; subEn: string; subAr: string; isRtl: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
      <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#2D6A4F] border border-[#D4A96A]/20 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#1B4332] font-sans tracking-tight">{isRtl ? titleAr : titleEn}</h2>
        <p className="text-sm text-text-muted mt-0.5 font-sans font-light">{isRtl ? subAr : subEn}</p>
      </div>
    </div>
  );
}

function InputField({ id, label, required, placeholder, value, onChange, error, type = 'text' }: {
  id: string; label: string; required?: boolean; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-bold text-text-dark font-sans">
        {label} {required && '*'}
      </label>
      <input id={id} type={type}
        className={`w-full px-4 py-3.5 rounded-2xl border text-base bg-[#FAF7F2]/30 min-h-[48px] focus:outline-none focus:border-[#2D6A4F]/60 transition-all font-sans text-[#1B4332] placeholder-slate-400 ${error ? 'border-red-400' : 'border-slate-200'}`}
        placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
      {error && <p className="text-red-500 text-xs font-semibold font-sans">{error}</p>}
    </div>
  );
}

function CostRow({ label, value, muted, highlight }: {
  label: string; value: string; muted?: boolean; highlight?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10 font-sans">
      <span className="text-slate-300 text-sm">{label}</span>
      <span className={`font-bold text-sm ${highlight === 'emerald' ? 'text-emerald-400' : muted ? 'text-slate-500' : 'text-white'}`}>{value}</span>
    </div>
  );
}
