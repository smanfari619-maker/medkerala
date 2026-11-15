'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { MessageSquare } from 'lucide-react';

const LiveChatWidget = dynamic(() => import('./LiveChatWidget'), { ssr: false });

export default function DeferredLiveChatWidget() {
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [openOnLoad, setOpenOnLoad] = useState(false);

  useEffect(() => {
    const openChat = () => {
      setOpenOnLoad(true);
      setLoaded(true);
    };

    window.addEventListener('open-ai-chat', openChat);
    return () => window.removeEventListener('open-ai-chat', openChat);
  }, []);

  const open = () => {
    setOpenOnLoad(true);
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <div className={`fixed bottom-[4.25rem] z-[70] hidden md:flex ${locale === 'ar' ? 'left-5' : 'right-5'}`}>
          <button
            type="button"
            onClick={open}
            aria-label={locale === 'ar' ? 'تحدث مع مايا' : 'Live Chat with Maya'}
            className="group flex items-center gap-2.5 rounded-full border border-[#D4A96A]/40 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] px-3.5 py-2.5 text-white shadow-xl transition hover:scale-105"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
            </span>
            <MessageSquare aria-hidden="true" className="h-4 w-4 shrink-0 text-[#BAD7B0]" />
            <span className="whitespace-nowrap text-xs font-semibold tracking-tight">
              {locale === 'ar' ? 'تحدث مع مايا' : 'Chat with Maya'}
            </span>
          </button>
        </div>
      )}
      {loaded && <LiveChatWidget initialOpen={openOnLoad} />}
    </>
  );
}
