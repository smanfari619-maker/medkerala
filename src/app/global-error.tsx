/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#FAF7F2',
        color: '#1A1A2E',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        margin: 0
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h1 style={{ fontSize: '24px', margin: '0 0 12px 0', color: '#1B4332' }}>Critical System Error</h1>
          <p style={{ fontSize: '15px', color: '#4A4A6A', lineHeight: '1.6', margin: '0 0 24px 0' }}>
            A critical error occurred while loading the application shell. Please reload the application or try again.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#2D6A4F',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Reload System
            </button>
            <a
              href="/"
              style={{
                backgroundColor: '#ffffff',
                color: '#2D6A4F',
                border: '1px solid rgba(212, 169, 106, 0.4)',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
