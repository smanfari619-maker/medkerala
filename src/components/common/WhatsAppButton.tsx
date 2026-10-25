'use client';

import React from 'react';
import { trackWhatsAppClick } from '@/lib/whatsappTracking';

interface WhatsAppButtonProps {
  href: string;
  topic?: string;
  buttonText?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

/**
 * Universal client-side WhatsApp link wrapper that silently triggers
 * a background email alert to treatinkerala@gmail.com whenever clicked.
 */
export default function WhatsAppButton({
  href,
  topic = 'General WhatsApp Inquiry',
  buttonText = 'WhatsApp CTA Button',
  className,
  children,
  ariaLabel,
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => {
        trackWhatsAppClick({ topic, buttonText });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
