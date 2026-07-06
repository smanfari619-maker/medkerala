import React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/layout/WhatsAppFAB';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { Lora, Plus_Jakarta_Sans, Tajawal } from 'next/font/google';
import '../globals.css';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800', '900'],
  display: 'swap',
  variable: '--font-tajawal',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' 
      ? 'السياحة العلاجية في كيرلا | رعاية صحية عالمية التكلفة | MedKerala' 
      : 'Kerala Medical Tourism | World-Class Care at a Fraction of the Cost | MedKerala',
    description: locale === 'ar'
      ? 'تربط ميدكيرلا المرضى الدوليين بأفضل المستشفيات ومراكز الأيورفيدا في كيرلا. خدمات متكاملة للسياحة العلاجية من كالكوت - تأشيرات، سفر، إقامة، وتنسيق العلاج.'
      : 'MedKerala connects international patients to Kerala\'s best hospitals and Ayurveda centres. End-to-end medical tourism services from Calicut — visa, travel, accommodation, treatment coordination and more.',
    alternates: {
      canonical: locale === 'en' ? '/en' : '/ar',
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Load messages
  const messages = await getMessages();

  const isRtl = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${lora.variable} ${plusJakartaSans.variable} ${tajawal.variable} scroll-smooth`}
    >
      <head />
      <body className="bg-[#FAF7F2] text-[#1A1A2E] font-sans antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-grow pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
            {children}
          </main>
          <Footer />
          <WhatsAppFAB />
          <MobileBottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
