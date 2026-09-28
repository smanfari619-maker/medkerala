'use client';

import React, { useState } from 'react';
import { ShieldCheck, Stethoscope, CheckCircle2, ChevronDown, ChevronUp, Award, ExternalLink } from 'lucide-react';

interface Props {
  locale: string;
  doctorName?: string;
  doctorTitleEn?: string;
  doctorTitleAr?: string;
  credentialsEn?: string;
  credentialsAr?: string;
  reviewedDate?: string;
  specialtyEn?: string;
  specialtyAr?: string;
}

export default function MedicalReviewerBadge({
  locale,
  doctorName = 'Dr. Rajesh K. Varma',
  doctorTitleEn = 'Senior Clinical Consultant & Advisory Board Lead',
  doctorTitleAr = 'استشاري أول ورئيس المجلس الطبي الاستشاري',
  credentialsEn = 'MBBS, MS (Orthopaedics), MCh, Ex-Senior Registrar AIIMS',
  credentialsAr = 'بكالوريوس طب وجراحة، ماجستير جراحة العظام، استشاري معتمد',
  reviewedDate = 'September 2026',
  specialtyEn = 'Evidence-Based Surgery & Clinical Governance',
  specialtyAr = 'الحوكمة الإكلينيكية وجودة العمليات الجراحية',
}: Props) {
  const isRtl = locale === 'ar';
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-emerald-950/10 p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-primary-green/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Reviewer info */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-primary-green flex items-center justify-center shrink-0 border border-emerald-100">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-green bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {isRtl ? 'مراجعة طبية إكلينيكية معتمدة' : 'Medically Reviewed'}
                </span>
                <span className="text-[11px] text-text-muted">
                  {isRtl ? `تاريخ التدقيق: ${reviewedDate}` : `Verified: ${reviewedDate}`}
                </span>
              </div>

              <div className="text-sm font-bold text-[#1B4332]">
                {doctorName}{' '}
                <span className="text-xs font-normal text-text-muted">
                  — {isRtl ? doctorTitleAr : doctorTitleEn}
                </span>
              </div>
            </div>
          </div>

          {/* Toggle Button for Clinical Governance Standards */}
          <button
            type="button"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-green hover:text-emerald-800 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>{isRtl ? 'معايير التدقيق الطبي' : 'Editorial & Safety Standards'}</span>
            {isDetailsOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Expandable Editorial Standards Panel */}
        {isDetailsOpen && (
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-[#3D5245] space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#D4A96A]/20">
                <span className="font-bold text-[#1B4332] block mb-1 flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-[#D4A96A]" />
                  {isRtl ? 'المؤهلات والترخيص' : 'Credentials & Registry'}
                </span>
                <p className="text-[11px] text-[#4A5C52]">
                  {isRtl ? credentialsAr : credentialsEn}
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#D4A96A]/20">
                <span className="font-bold text-[#1B4332] block mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary-green" />
                  {isRtl ? 'معايير الجودة الدولية' : 'JCI & NABH Alignment'}
                </span>
                <p className="text-[11px] text-[#4A5C52]">
                  {isRtl
                    ? 'فحص بروتوكولات مكافحة العدوى، واعتماد الغرسات الطبية، ونسب نجاح الإجراءات الجراحية.'
                    : 'Benchmarked against JCI SSI infection standards (<0.4%) and US FDA implant registries.'}
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#D4A96A]/20">
                <span className="font-bold text-[#1B4332] block mb-1 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary-green" />
                  {isRtl ? 'النزاهة والحيادية' : 'Zero Commercial Bias'}
                </span>
                <p className="text-[11px] text-[#4A5C52]">
                  {isRtl
                    ? 'معلومات إرشادية وتكاليف سريرية واقعية 100% دون أي رسوم وسيط أو رفع في أسعار المستشفيات.'
                    : '100% direct hospital pricing. Fact-checked by physicians to eliminate marketing exaggerations.'}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-text-muted italic pt-1">
              {isRtl
                ? 'إخلاء مسؤولية طبي: المحتوى لأغراض التثقيف والإرشاد الصحي ولا يغني عن الاستشارة والتشخيص الطبي المباشر من الطبيب المعالج.'
                : 'Medical Disclaimer: Content on TreatInKerala is clinically reviewed for educational clarity and does not replace direct diagnostic medical consultation.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
