'use client';

import { useEffect } from 'react';
import { trackWhatsAppClick } from '@/lib/whatsappTracking';

/**
 * Global click listener that automatically intercepts ANY click on a WhatsApp link
 * across the entire website (header, footer, mobile nav, blog posts, markdown links,
 * hospital cards, treatment packages, contact buttons, etc.) and fires an email alert.
 */
export default function GlobalWhatsAppTracker() {
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      const href = anchor.href;
      // Check if clicked link points to WhatsApp
      if (
        href.includes('wa.me') ||
        href.includes('whatsapp.com/send') ||
        href.includes('api.whatsapp.com')
      ) {
        // 1. Determine button label / context
        const rawText = (
          anchor.getAttribute('data-whatsapp-label') ||
          anchor.getAttribute('aria-label') ||
          anchor.innerText ||
          'WhatsApp Button'
        ).trim().replace(/\s+/g, ' ');
        const buttonText = rawText.slice(0, 80) || 'WhatsApp Button';

        // 2. Extract prefilled text if present
        let prefilledText = '';
        try {
          const parsed = new URL(href);
          prefilledText = parsed.searchParams.get('text') || '';
        } catch {
          // Ignore parsing error for non-standard relative urls
        }

        // 3. Construct a helpful topic name
        let topic = 'WhatsApp Inquiry';
        if (prefilledText) {
          // Clean up multiple spaces/newlines for a readable subject
          const cleanText = prefilledText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
          topic = cleanText.length > 90 ? `${cleanText.slice(0, 87)}...` : cleanText;
        } else if (typeof document !== 'undefined' && document.title) {
          const pageTitle = document.title.split('|')[0].trim();
          topic = `Inquiry from ${pageTitle || 'TreatInKerala'}`;
        }

        trackWhatsAppClick({
          topic,
          buttonText,
        });
      }
    };

    // Use capturing phase so we intercept before navigation or other handlers
    document.addEventListener('click', handleDocumentClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true });
    };
  }, []);

  return null;
}

