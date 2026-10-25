'use client';

import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
}

interface BlogTableOfContentsProps {
  locale: string;
  headings: HeadingItem[];
}

export default function BlogTableOfContents({ locale, headings }: BlogTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isRtl = locale === 'ar';

  if (!headings || headings.length === 0) return null;

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // Header offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="my-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left rtl:text-right cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B4332] min-w-0">
          <List className="h-4 w-4 text-[#2D6A4F] shrink-0" />
          <span>{isRtl ? 'محتويات الدليل الطبي' : 'Table of Contents'}</span>
          <span className="text-[11px] font-normal text-slate-400 hidden sm:inline">
            {isRtl ? '(انقر للانتقال)' : '(Jump to section)'}
          </span>
        </span>
        <span className="text-slate-400 shrink-0">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {isOpen && (
        <nav className="p-4 pt-2">
          <ul className="space-y-1.5 text-xs sm:text-sm">
            {headings.map((h, i) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleScrollTo(h.id, e)}
                  className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg text-slate-700 hover:text-[#1B4332] hover:bg-[#1B4332]/5 transition-colors group"
                >
                  <span className="font-mono text-[11px] text-[#D4A96A] font-bold shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span className="leading-snug group-hover:underline underline-offset-2">
                    {h.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
