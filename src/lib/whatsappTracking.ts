'use client';

export interface WhatsAppClickPayload {
  topic?: string;
  buttonText?: string;
}

/**
 * Non-blocking client-side tracker that fires a background beacon to /api/whatsapp-click.
 * Sends an email notification to treatinkerala@gmail.com whenever a visitor clicks WhatsApp.
 */
export function trackWhatsAppClick(data?: WhatsAppClickPayload): void {
  if (typeof window === 'undefined') return;

  try {
    const payload = JSON.stringify({
      page: window.location.href,
      topic: data?.topic || 'General WhatsApp Inquiry',
      buttonText: data?.buttonText || 'WhatsApp Button',
      referrer: document.referrer || 'Direct Visit',
      timestamp: new Date().toISOString(),
    });

    // Use sendBeacon for guaranteed delivery even during tab navigation or app switching
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/whatsapp-click', blob);
    } else {
      fetch('/api/whatsapp-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch (err) {
    console.error('WhatsApp tracking beacon failed:', err);
  }
}
