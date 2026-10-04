'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export interface Slide {
  src: string;
  altEn: string;
  altAr: string;
  tagEn: string;
  tagAr: string;
}

interface HeroSliderProps {
  slides: Slide[];
  isRtl: boolean;
}

export default function HeroSlider({ slides, isRtl }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Slides */}
      {slides.map((slide, idx) => {
        const active = idx === current;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              active ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={isRtl ? slide.altAr : slide.altEn}
              fill
              className={`object-cover transition-transform duration-[6000ms] ease-out ${
                active ? 'scale-105' : 'scale-100'
              }`}
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            {/* Subtle bottom vignette to ensure indicators and contrast stay sharp */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* Dynamic Slide Context Badge */}
      <div 
        key={`tag-${current}`}
        className={`absolute top-3.5 z-20 animate-fade-in ${isRtl ? 'right-3.5' : 'left-3.5'}`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/25 text-white shadow-sm">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide">
            {isRtl ? slides[current]?.tagAr : slides[current]?.tagEn}
          </span>
        </div>
      </div>

      {/* Slide Indicators - positioned at bottom-end corner to avoid card collision */}
      <div className={`absolute bottom-3.5 ${isRtl ? 'left-4' : 'right-4'} z-20 flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20`}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? 'w-4 bg-[#D4A96A]' : 'w-1.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

