import React from 'react';
import { ShieldCheck, Activity, Award, CheckCircle2, FileCheck, HeartPulse } from 'lucide-react';

interface Props {
  locale: string;
}

export default function ClinicalQualityMetrics({ locale }: Props) {
  const isRtl = locale === 'ar';

  const metrics = [
    {
      icon: Activity,
      stat: '< 0.38%',
      labelEn: 'Surgical Site Infection Rate',
      labelAr: 'معدل عدوى الجروح الجراحية (SSI)',
      subEn: 'Strict laminar airflow OT standards benchmarked against JCI global thresholds (<1.0%).',
      subAr: 'غرف عمليات معقمة بنظام تدفق الهواء الرقائقي وفق أعلى معايير مكافحة العدوى الدولية.',
      color: 'text-primary-green',
      bg: 'bg-emerald-50'
    },
    {
      icon: ShieldCheck,
      stat: '100%',
      labelEn: 'US FDA & CE Approved Implants',
      labelAr: 'غرسات ودعامات معتمدة من FDA',
      subEn: 'Direct barcode verification for Stryker, Zimmer Biomet, Medtronic & Abbott prosthetic devices.',
      subAr: 'شهادات تتبع باركود أصلية لكافة مفاصل ودعامات سترايكر وزيمر وميدترونيك العالمية.',
      color: 'text-[#8C6D37]',
      bg: 'bg-[#D4A96A]/15'
    },
    {
      icon: Award,
      stat: '18+ Yrs',
      labelEn: 'Average Surgeon Experience',
      labelAr: 'متوسط خبرة كبار الجراحين',
      subEn: 'Senior faculty holding FRCS / MRCP (UK) or US clinical fellowship certifications.',
      subAr: 'جراحون واستشاريون حاصلون على زمالات الكليات الملكية البريطانية والأمريكية.',
      color: 'text-[#1B4332]',
      bg: 'bg-slate-100'
    },
    {
      icon: FileCheck,
      stat: '0% Surcharge',
      labelEn: 'Direct Hospital Billing Protocol',
      labelAr: 'دفع مباشر للمستشفى بدون زيادة',
      subEn: 'Fully compliant with NABH MVTF guidelines. Patient pays bills directly at hospital cashier.',
      subAr: 'التزام تام بمعايير NABH؛ فواتير رسمية مباشرة في حساب المستشفى بدون أي عمولات خفية.',
      color: 'text-primary-green',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative gold line */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary-green via-[#D4A96A] to-primary-green" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-lg bg-emerald-50 text-primary-green">
                <HeartPulse className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A96A]">
                {isRtl ? 'معايير الأمان والجودة الإكلينيكية' : 'Clinical Quality & Safety Benchmarks'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1B4332]">
              {isRtl
                ? 'مؤشرات الأمان الطبي وفق الاعتمادات الدولية في كيرلا'
                : 'International Healthcare Safety Standards in Kerala'}
            </h3>
          </div>

          <p className="text-xs text-text-muted max-w-md">
            {isRtl
              ? 'تلتزم المستشفيات الشريكة بأعلى بروتوكولات الرعاية السريرية المعترف بها عالمياً لدى JCI و NABH.'
              : 'Our partner institutions adhere to verified clinical protocols audited regularly by international bodies.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-2xl p-5 border border-slate-200/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`p-2.5 rounded-xl ${m.bg} ${m.color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl font-extrabold text-[#1B4332] font-display">
                      {m.stat}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1B4332] mb-1.5 leading-snug">
                    {isRtl ? m.labelAr : m.labelEn}
                  </h4>

                  <p className="text-xs text-[#4A5C52] leading-relaxed font-light">
                    {isRtl ? m.subAr : m.subEn}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/50 flex items-center gap-1 text-[10px] text-text-muted font-medium">
                  <CheckCircle2 className="h-3 w-3 text-primary-green shrink-0" />
                  <span>{isRtl ? 'بروتوكول معتمد ومُراقب' : 'Audited Clinical Protocol'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
