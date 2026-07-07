'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  src: string;
  altEn: string;
  altAr: string;
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
    }, 6000); // Transition every 6 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
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
              className={`object-cover transition-transform duration-[6500ms] ease-out ${
                active ? 'scale-110 rotate-0.5' : 'scale-100'
              }`}
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        );
      })}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? 'w-5 bg-[#D4A96A]' : 'w-1.5 bg-white/60 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
