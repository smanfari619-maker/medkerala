'use client';

import React from 'react';
import { MessageCircle, FileText, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { Link } from '@/i18n/routing';

interface BlogMidArticleCTAProps {
  locale: string;
  postTitle: string;
  category: string;
}

export default function BlogMidArticleCTA({ locale, postTitle, category }: BlogMidArticleCTAProps) {
  const isRtl = locale === 'ar';

  const waText = isRtl
    ? `مرحباً علاج في كيرلا، أقرأ مقالة: "${postTitle}". لدي استفسار وتقارير أود مراجعتها من الطبيب والحصول على عرض سعر.`
    : `Hello TreatInKerala, I am reading: "${postTitle}". I have medical records/questions and would like a doctor review and hospital estimate.`;

  return (
    <div
      className="my-10 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#1B4332] via-[#24543F] to-[#163628] text-white shadow-lg border border-[#D4A96A]/30 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Subtle ambient blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D4A96A]/10 blur-2xl"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D4A96A]/20 border border-[#D4A96A]/40 text-[#FAF7F2] text-xs font-bold tracking-wide">
            <span>🩻</span>
            <span>{isRtl ? 'استشارة وتقييم تقارير مجاناً' : 'Free 24-Hour Scan & Report Review'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-normal text-white leading-tight">
            {isRtl ? (
              <>
                هل لديك تقارير طبية أو أشعة رنين؟ <br />
                <span className="text-[#BAD7B0]">احصل على رأي كبار الجراحين وتكلفة العملية مجاناً.</span>
              </>
            ) : (
              <>
                Comparing Surgery Costs or Have Scans? <br />
                <span className="text-[#BAD7B0]">Get a Senior Surgeon’s Opinion & Quotation.</span>
              </>
            )}
          </h3>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            {isRtl
              ? 'أرسل صور الأشعة أو التقارير الطبية مباشرة عبر واتساب. يراجعها استشاريون متخصصون في كيرلا ويقدمون لك خطة علاجية وعرض سعر رسمي من المستشفى خلال 24 ساعة بدون أي التزام.'
              : 'Send your MRI, CT scans, or doctor summary on WhatsApp. Senior surgical teams at our JCI & NABH accredited hospitals will evaluate your case and prepare an official estimate within 24 hours.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-[#25D366]" />
              <span>{isRtl ? 'خدمة مجانية 100%' : '100% Free Service'}</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-[#25D366]" />
              <span>{isRtl ? 'مستشفيات JCI و NABH' : 'JCI & NABH Hospitals'}</span>
            </span>
            <span className="flex items-center gap-1">
              <HeartHandshake className="h-3 w-3 text-[#25D366]" />
              <span>{isRtl ? 'مترجم عربي مرافق' : 'Arabic Coordinator Included'}</span>
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-2.5 w-full md:w-auto shrink-0">
          <WhatsAppButton
            href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(waText)}`}
            topic={`Blog Mid-Article CTA: ${category}`}
            buttonText="Blog In-Article WhatsApp Button"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md transition-all cursor-pointer text-center"
          >
            <MessageCircle className="h-4.5 w-4.5" />
            <span>{isRtl ? 'إرسال التقارير عبر واتساب' : 'Send Reports on WhatsApp'}</span>
          </WhatsAppButton>

          <Link
            href="/get-estimate"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors text-center cursor-pointer"
          >
            <FileText className="h-4 w-4 text-[#BAD7B0]" />
            <span>{isRtl ? 'طلب تقدير تكلفة إلكتروني' : 'Request Estimate Online'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
