'use client';

import React, { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  useEffect(() => {
    console.error('Runtime page render exception:', error);
  }, [error]);

  return (
    <div className="py-24 bg-[#FAF7F2] min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 text-3xl select-none">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold font-display text-primary-dark">
          {isRtl ? 'حدث خطأ غير متوقع' : 'Something went wrong!'}
        </h1>
        <p className="text-text-muted text-sm leading-relaxed">
          {isRtl
            ? 'نعتذر عن هذا الخلل. واجهت الصفحة مشكلة أثناء التحميل. يرجى محاولة إعادة المحاولة.'
            : 'We apologize for the inconvenience. An unexpected error occurred while loading this page. Please try resetting the view.'}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-primary-green hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-sm cursor-pointer min-h-[44px]"
          >
            {isRtl ? 'إعادة المحاولة' : 'Try Again'}
          </button>
          <a
            href={isRtl ? '/ar' : '/en'}
            className="bg-white border border-[#D4A96A]/30 text-primary-green font-bold px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-xs hover:bg-[#F0EDE8] min-h-[44px] flex items-center justify-center"
          >
            {isRtl ? 'العودة للرئيسية' : 'Go Home'}
          </a>
        </div>
      </div>
    </div>
  );
}
