'use client';

export interface WhatsAppClickPayload {
  topic?: string;
  buttonText?: string;
}

let lastDispatchedAt = 0;
let lastDispatchedKey = '';

/**
 * Client-side tracker that notifies /api/whatsapp-click.
 * Sends an email alert to the coordination desk whenever a visitor clicks WhatsApp.
 */
export function trackWhatsAppClick(data?: WhatsAppClickPayload): void {
  if (typeof window === 'undefined') return;

  try {
    const topic = data?.topic || 'General WhatsApp Inquiry';
    const buttonText = data?.buttonText || 'WhatsApp Button';
    const currentKey = `${topic}::${buttonText}`;
    const now = Date.now();

    // Prevent duplicate dispatches within 2.5 seconds for the same button/topic
    if (now - lastDispatchedAt < 2500 && lastDispatchedKey === currentKey) {
      return;
    }
    lastDispatchedAt = now;
    lastDispatchedKey = currentKey;

    const payload = JSON.stringify({
      page: window.location.href,
      topic,
      buttonText,
      referrer: document.referrer || 'Direct Visit',
      timestamp: new Date().toISOString(),
    });

    // 1. Primary method: fetch with keepalive: true
    // Supported in all modern browsers, avoids beacon restrictions & adblocker beacon rules
    if (typeof window.fetch === 'function') {
      fetch('/api/whatsapp-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Fallback to sendBeacon if fetch fails
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          const blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon('/api/whatsapp-click', blob);
        }
      });
    } else if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/whatsapp-click', blob);
    }
  } catch (err) {
    console.error('WhatsApp tracking dispatch failed:', err);
  }
}
