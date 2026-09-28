'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Building2, 
  Calendar, 
  Plane, 
  Check, 
  Copy, 
  ArrowRight,
  User,
  HeartPulse,
  Leaf
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import { submitEnquiry } from '@/app/actions/enquiry';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(8, { message: 'Please enter a valid phone number' }),
  treatmentInterest: z.string().optional(),
  contactPreference: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormData = z.infer<typeof formSchema>;

const TREATMENT_PILLS = [
  { id: 'kottakkal', labelEn: '🌿 Kottakkal Ayurveda & AVS', labelAr: '🌿 كوتاكال والأيورفيدا' },
  { id: 'ortho', labelEn: '🦴 Spine & Joint Replacement', labelAr: '🦴 العمود الفقري والمفاصل' },
  { id: 'cardiac', labelEn: '❤️ Cardiac & Bypass Surgery', labelAr: '❤️ جراحة القلب والشرايين' },
  { id: 'dental', labelEn: '🦷 Dental & Implants', labelAr: '🦷 زراعة وتجميل الأسنان' },
  { id: 'fertility', labelEn: '👶 IVF & Fertility Care', labelAr: '👶 علاج العقم وأطفال الأنابيب' },
  { id: 'other', labelEn: '✨ Other / Second Opinion', labelAr: '✨ استشارة عامة / تخصص آخر' },
];

export default function ContactClient() {
  const tForm = useTranslations('Form');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refId, setRefId] = useState('');
  const [selectedPill, setSelectedPill] = useState('');
  const [contactPref, setContactPref] = useState<'whatsapp' | 'call' | 'email'>('whatsapp');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactPreference: 'whatsapp',
    }
  });

  const handlePillSelect = (pillId: string, label: string) => {
    if (selectedPill === pillId) {
      setSelectedPill('');
      setValue('treatmentInterest', '');
    } else {
      setSelectedPill(pillId);
      setValue('treatmentInterest', label);
    }
  };

  const copyNumber = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const selectedPillObj = TREATMENT_PILLS.find(p => p.id === selectedPill);
      const treatmentTag = selectedPillObj 
        ? (isRtl ? selectedPillObj.labelAr : selectedPillObj.labelEn) 
        : 'Not Specified';

      const enrichedMessage = `[Treatment Interest: ${treatmentTag}]
[Preferred Contact Method: ${contactPref.toUpperCase()}]
---------------------------------
${data.message}`;

      const res = await submitEnquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: enrichedMessage,
      });

      if (res.success && res.referenceId) {
        setRefId(res.referenceId);
        setSubmitted(true);
        reset();
      } else {
        alert(isRtl ? 'حدث خطأ أثناء إرسال استفسارك. يرجى المحاولة لاحقاً أو مراسلتنا عبر الواتساب.' : 'Failed to submit enquiry. Please try again or reach out on WhatsApp.');
      }
    } catch (e) {
      console.error(e);
      alert(isRtl ? 'حدث خطأ أثناء إرسال استفسارك. يرجى المحاولة لاحقاً أو مراسلتنا عبر الواتساب.' : 'Failed to submit enquiry. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-[#FAF7F2] min-h-screen text-slate-800">
      
      {/* ── TOP HERO & LIVE DESK STATUS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Live Online Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#1B4332]">
              {isRtl 
                ? 'مكتب التنسيق الطبي متاح الآن • الرد في أقل من ١٥ دقيقة' 
                : 'Medical Desk Active • Typical Response Under 15 Mins'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#1B4332] tracking-tight leading-tight">
            {isRtl ? 'تواصل مع فريق علاج في كيرلا' : 'Connect with Your Kerala Care Team'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isRtl
              ? 'مكتبنا الرئيسي في كوزيكود ومركزنا في كوتاكال بالقرب من آريا فايديا شالا. نوفر استشارات مجانية، وترجمة عربية، وترتيبات العلاج والإقامة كاملة.'
              : 'Direct access to patient coordinators in Kozhikode & near Kottakkal Arya Vaidya Sala. Free doctor review, bilingual translation, hospital admissions, and full travel concierge.'}
          </p>
        </div>

        {/* ── FAST-ACTION MOBILE/TABLET BAR (TAP TO CONNECT IMMEDIATELY) ── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
          {/* 1. Instant WhatsApp */}
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
              isRtl 
                ? 'مرحباً علاج في كيرلا، أود الاستفسار عن العلاج وتنسيق الرحلة الطبية' 
                : 'Hello TreatInKerala team, I would like to inquire about medical treatment and concierge services.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-start">
                <div className="text-xs text-emerald-100 font-medium">
                  {isRtl ? 'دردشة فورية ٢٤/٧' : 'Instant 24/7 Chat'}
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  WhatsApp Direct
                </div>
              </div>
            </div>
            <ArrowRight className={`w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </a>

          {/* 2. Phone Call Hotline */}
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#1B4332]" />
              </div>
              <div className="text-start">
                <div className="text-xs text-slate-500 font-medium">
                  {isRtl ? 'الخط الطبي المباشر' : 'Direct Phone Hotline'}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#1B4332]" dir="ltr">
                  {SITE_CONFIG.phone}
                </div>
              </div>
            </div>
            <ArrowRight className={`w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </a>

          {/* 3. Patient Email Support */}
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Medical%20Enquiry`}
            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-amber-700" />
              </div>
              <div className="text-start">
                <div className="text-xs text-slate-500 font-medium">
                  {isRtl ? 'البريد الرسمي للمرضى' : 'Official Patient Desk'}
                </div>
                <div className="text-sm font-bold text-slate-800 truncate max-w-[130px] sm:max-w-[140px]">
                  {SITE_CONFIG.email}
                </div>
              </div>
            </div>
            <ArrowRight className={`w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </a>
        </div>
      </div>

      {/* ── MAIN GRID (INTERACTIVE FORM + CONTACT HUBS & TIMELINE) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: REGIONAL HUBS, AIRPORT & PROCESS (5 COLS)
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            
            {/* HUB 1: Calicut Headquarters */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#1B4332]/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-[#1B4332]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {isRtl ? 'المقر الرئيسي (كوزيكود)' : 'Headquarters & Multi-Specialty'}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {isRtl ? 'مكتب كوزيكود للمستشفيات التخصصية' : 'Calicut Medical Coordination Desk'}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {isRtl 
                  ? 'طريق هيلاند، بالقرب من المستشفى التخصصي، كالكوت (كوزيكود)، كيرلا. ننسق مباشرة مع مستشفيات استر ميمز، ميترا، وبيبي ميموريال.'
                  : 'Hilite Business Park, Near Bypass Junction, Calicut (Kozhikode), Kerala. Directly serving partner hospitals including Aster MIMS, Meitra, and Baby Memorial.'}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-emerald-600" />
                  {isRtl ? 'جراحات القلب، المفاصل والأورام' : 'Cardiac, Ortho & Multi-specialty'}
                </span>
                <span className="font-semibold text-emerald-800">NABH / JCI</span>
              </div>
            </div>

            {/* HUB 2: Kottakkal Arya Vaidya Sala Desk */}
            <div className="bg-gradient-to-br from-amber-50/70 via-white to-white rounded-3xl p-6 sm:p-7 border border-amber-200/70 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                    {isRtl ? 'مركز كوتاكال التراثي' : 'Ayurvedic Heritage Hub'}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {isRtl ? 'مكتب كوتاكال (آريا فايديا شالا)' : 'Kottakkal Arya Vaidya Sala Desk'}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {isRtl 
                  ? 'كوتاكال، مالابورام، كيرلا (بالقرب من المستشفى ومصنع أدوية آريا فايديا شالا). نوفر ترتيبات الحجز والتنويم، الفلل والشقق المفروشة للمرضى وعائلاتهم، وشحن الأدوية عالمياً.'
                  : 'Kottakkal, Malappuram (Near Arya Vaidya Sala AH&RC). Full concierge for AVS doctor bookings, OP/IP admissions, patient-friendly serviced villas, and worldwide courier of authentic medicines.'}
              </p>

              <div className="pt-3 border-t border-amber-200/50 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  {isRtl ? 'علاج الديسك، الروماتيزم والبانشاكارما' : 'Disc Slip, Arthritis & Detox'}
                </span>
                <span className="font-semibold text-amber-800">1902 Lineage</span>
              </div>
            </div>

            {/* Airport & Emergency Assistance Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                <Plane className="w-4 h-4 text-[#1B4332]" />
                {isRtl ? 'الاستقبال من المطار والمساعدة الطارئة' : 'Airport Arrivals & Logistics'}
              </h4>
              
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                  <p>
                    <strong className="text-slate-800">{isRtl ? 'مطار كوزيكود الدولي (CCJ):' : 'Calicut Airport (CCJ):'}</strong>{' '}
                    {isRtl ? 'يبعد حوالي 30 دقيقة فقط عن كوتاكال وكوزيكود. استقبال خاص بالسيارة أو الإسعاف.' : 'Just 25–40 mins from both Calicut hospitals and Kottakkal. Free meet & greet with wheelchair options.'}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                  <p>
                    <strong className="text-slate-800">{isRtl ? 'مترجمون عرب مرافقون:' : 'Dedicated Arabic Coordinators:'}</strong>{' '}
                    {isRtl ? 'مترجم خاص يتحدث العربية يرافقك في كافة المقابلات الطبية والفحوصات مجاناً.' : 'Fluent Arabic & English medical interpreters accompany you to all consultations and therapies.'}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                  <p>
                    <strong className="text-slate-800">{isRtl ? 'التأشيرة الطبية الهندية:' : 'e-Medical Visa Support:'}</strong>{' '}
                    {isRtl ? 'إصدار خطاب المستشفى المعتمد خلال 24 ساعة لاستخراج التأشيرة فوراً.' : 'Official hospital invitation letter issued within 24 hours to secure e-Medical Visas for patient and attendants.'}
                  </p>
                </div>
              </div>

              {/* Direct phone line quick copy */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">{isRtl ? 'رقم الهاتف الإضافي:' : 'Secondary Hotline:'}</div>
                  <div className="text-sm font-bold text-slate-800" dir="ltr">{SITE_CONFIG.phoneSecondary}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyNumber(SITE_CONFIG.phoneSecondary)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedPhone ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ' : 'Copy')}
                </button>
              </div>
            </div>

            {/* 3-Step Process Timeline */}
            <div className="bg-[#FAF7F2] border border-[#D4A96A]/30 rounded-3xl p-6 sm:p-7 space-y-4">
              <h4 className="font-bold text-[#1B4332] font-display flex items-center gap-2 text-base">
                <Clock className="w-4 h-4 text-emerald-700" />
                {isRtl ? 'ماذا يحدث بعد إرسال رسالتك؟' : 'What Happens Next? (3-Step Assurance)'}
              </h4>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B4332] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                  <div>
                    <h5 className="font-bold text-slate-900">{isRtl ? 'تأكيد فوري خلال ١٥ دقيقة' : 'Instant Triage in 15 Minutes'}</h5>
                    <p className="text-slate-500 mt-0.5">{isRtl ? 'يتواصل معك منسقك الشخصي عبر الواتساب لتأكيد التفاصيل.' : 'Your designated coordinator confirms receipt and gathers any MRI/doctor records.'}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B4332] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                  <div>
                    <h5 className="font-bold text-slate-900">{isRtl ? 'تقييم طبي مجاني من كبار الاستشاريين' : 'Free Senior Doctor & Vaidya Review'}</h5>
                    <p className="text-slate-500 mt-0.5">{isRtl ? 'دراسة تقاريرك من قبل أطباء المستشفيات وأطباء الأيورفيدا المعتمدين دون أي التزام.' : 'Senior hospital specialists & Ayurvedic doctors assess your suitability at zero charge.'}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B4332] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
                  <div>
                    <h5 className="font-bold text-slate-900">{isRtl ? 'خطة علاجية واضحة وعرض سعر شامل' : 'Itemized Plan, Stays & Visa Letter'}</h5>
                    <p className="text-slate-500 mt-0.5">{isRtl ? 'تستلم خطة الأيام، خيارات السكن، والتكلفة الثابتة خلال ٢٤ ساعة.' : 'You receive expected treatment duration, lodging choices, and fixed quotation within 24 hours.'}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: MODERN INTERACTIVE ENQUIRY FORM (7 COLS)
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative">
              
              {/* Header inside card */}
              <div className="border-b border-slate-100 pb-6 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                    {isRtl ? 'طلب استشارة مجاني وسري' : 'Free & Confidential Consultation'}
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {isRtl ? 'حماية البيانات والسرية الطبية' : 'HIPAA & DPDP Protected'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                  {isRtl ? 'أرسل تفاصيل حالتك الطبية' : 'Submit Your Medical Query'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {isRtl 
                    ? 'شاركنا استفسارك وسيقوم منسقنا الطبي بالرد عليك عبر وسيلة التواصل المفضلة لديك.' 
                    : 'Fill in your details below and our medical team will craft a customized clinical roadmap for you.'}
                </p>
              </div>

              {submitted ? (
                /* Success State */
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {isRtl ? 'تم استلام استفسارك بنجاح!' : 'Your Enquiry Was Received!'}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      {isRtl
                        ? 'شكراً لك. سيقوم منسق الرعاية الطبية بمراجعة استفسارك والتواصل معك خلال وقت قصير.'
                        : 'Thank you. A dedicated care coordinator has been assigned to your file and will contact you shortly.'}
                    </p>
                  </div>

                  {refId && (
                    <div className="bg-white rounded-2xl p-4 border border-emerald-100 max-w-md mx-auto text-start shadow-2xs">
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        {isRtl ? 'الرقم المرجعي للاستفسار' : 'Reference Number'}
                      </div>
                      <div className="text-lg font-mono font-bold text-[#1B4332] mt-0.5 select-all">
                        {refId}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {isRtl 
                          ? 'احتفظ بهذا الرقم لأي متابعة سريعة مع المنسق.' 
                          : 'Save this number for easy reference when chatting with our doctors or coordinators.'}
                      </p>
                    </div>
                  )}

                  {/* Immediate WhatsApp Follow-up button */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                        isRtl 
                          ? `مرحباً، لقد أرسلت استفساراً طبياً عبر الموقع بالرقم المرجعي: ${refId}` 
                          : `Hello TreatInKerala, I just submitted an enquiry with Reference ID: ${refId}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isRtl ? 'متابعة عبر الواتساب فوراً ←' : 'Chat on WhatsApp with this Ref ID →'}
                    </a>

                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setRefId(''); setSelectedPill(''); }}
                      className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
                    >
                      {isRtl ? 'إرسال استفسار آخر' : 'Send Another Query'}
                    </button>
                  </div>
                </div>
              ) : (
                /* The Active Form */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
                  
                  {/* 1. Treatment Interest Pills */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {isRtl ? 'ما هو نوع العلاج أو الخدمة المطلوبة؟' : 'What Treatment or Service Are You Inquiring About?'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TREATMENT_PILLS.map((pill) => {
                        const isSelected = selectedPill === pill.id;
                        return (
                          <button
                            type="button"
                            key={pill.id}
                            onClick={() => handlePillSelect(pill.id, isRtl ? pill.labelAr : pill.labelEn)}
                            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer border ${
                              isSelected
                                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-300" />}
                            <span>{isRtl ? pill.labelAr : pill.labelEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Preferred Contact Channel */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {isRtl ? 'طريقة التواصل المفضلة لديك:' : 'How Should We Reach You?'}
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setContactPref('whatsapp')}
                        className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          contactPref === 'whatsapp'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setContactPref('call')}
                        className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          contactPref === 'call'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>{isRtl ? 'اتصال هاتف' : 'Phone Call'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setContactPref('email')}
                        className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          contactPref === 'email'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span>{isRtl ? 'بريد إلكتروني' : 'Email'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Name & WhatsApp Phone (Responsive 2 Cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        {tForm('fullName')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          className="w-full ps-10 pe-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm bg-slate-50/50 hover:bg-white transition-colors min-h-[48px]"
                          placeholder={isRtl ? 'مثال: سلطان الشمري' : 'e.g. John Miller'}
                          {...register('name')}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-600 text-xs font-semibold">{errors.name.message}</p>
                      )}
                    </div>

                    {/* WhatsApp / Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        {isRtl ? 'رقم الواتساب مع رمز الدولة' : 'WhatsApp Number (with country code)'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                          <MessageCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          className="w-full ps-10 pe-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm bg-slate-50/50 hover:bg-white transition-colors min-h-[48px]"
                          placeholder="+966 50 123 4567 / +44 7..."
                          dir="ltr"
                          {...register('phone')}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-600 text-xs font-semibold">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* 4. Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {tForm('email')} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        className="w-full ps-10 pe-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm bg-slate-50/50 hover:bg-white transition-colors min-h-[48px]"
                        placeholder="patient@example.com"
                        {...register('email')}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-xs font-semibold">{errors.email.message}</p>
                    )}
                  </div>

                  {/* 5. Message details */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        {isRtl ? 'تفاصيل الحالة أو الاستفسار' : 'Condition Details & Questions'} <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {isRtl ? 'العربية أو الإنجليزية' : 'Arabic or English'}
                      </span>
                    </div>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-4 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm bg-slate-50/50 hover:bg-white transition-colors leading-relaxed min-h-[110px]"
                      placeholder={
                        isRtl 
                          ? 'اذكر الأعراض، تاريخ السفر المقترح، أو أي استفسار حول حجز كوتاكال آريا فايديا شالا، الإقامة العائلية، وتكلفة العمليات...' 
                          : 'Describe symptoms, desired travel timeline, questions about Kottakkal Arya Vaidya Sala booking, family lodging, hospital choices, or cost estimates...'
                      }
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-red-600 text-xs font-semibold">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Confidentiality Box */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-slate-600">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-950 block">
                        {isRtl ? 'سرية طبية تامة وضمان عدم الإزعاج' : 'Medical Confidentiality & Privacy Guarantee'}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                        {isRtl 
                          ? 'بياناتك وتقاريرك لا تُشارك إلا مع الأطباء والاستشاريين المرخصين في كيرلا لإعداد خطتك العلاجية مجاناً.'
                          : 'Your records are reviewed strictly by licensed medical coordinators and partner physicians in Kerala. We never spam or sell data.'}
                      </p>
                    </div>
                  </div>

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold py-4 px-6 rounded-2xl text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60 min-h-[52px]"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5 shrink-0" />
                        <span>
                          {isRtl 
                            ? 'إرسال استفساري الطبي — مراجعة مجانية خلال ٢٤ ساعة ←' 
                            : 'Send My Medical Query — Free 24h Assessment →'}
                        </span>
                      </span>
                    )}
                  </button>

                  <div className="text-center text-xs text-slate-400">
                    {isRtl 
                      ? 'لا توجد أي رسوم أو التزامات مالية على الاستشارة الأولية وتقدير التكلفة' 
                      : 'Zero consultation fees or obligations for initial review and cost estimates.'}
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
