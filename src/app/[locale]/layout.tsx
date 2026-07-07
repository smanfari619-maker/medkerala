import React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Inter, Tajawal } from 'next/font/google';
import dynamic from 'next/dynamic';
import '../globals.css';

const WhatsAppFAB = dynamic(() => import('@/components/layout/WhatsAppFAB'));

const MobileBottomNav = dynamic(() => import('@/components/layout/MobileBottomNav'));
import { getMedicalOrganizationSchema, getLocalBusinessSchema, getAggregateRatingSchema } from '@/lib/schemas';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
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
  
  const title = locale === 'ar' 
    ? 'السياحة العلاجية في كيرلا | رعاية صحية عالمية التكلفة | TreatInKerala' 
    : 'Kerala Medical Tourism | World-Class Care at a Fraction of the Cost | TreatInKerala';

  const description = locale === 'ar'
    ? 'تربط علاج في كيرلا المرضى الدوليين بأفضل المستشفيات ومراكز الأيورفيدا في كيرلا. خدمات متكاملة للسياحة العلاجية من كالكوت - تأشيرات، سفر، إقامة، وتنسيق العلاج.'
    : 'TreatInKerala connects international patients to Kerala\'s best hospitals and Ayurveda centres. End-to-end medical tourism services from Calicut — visa, travel, accommodation, treatment coordination and more.';

  return {
    title,
    description,
    alternates: {
      canonical: locale === 'en' ? '/en' : '/ar',
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title,
      description,
      url: 'https://treatinkerala.com',
      siteName: 'TreatInKerala',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://treatinkerala.com/images/caring_doctor_patient_hero.png',
          width: 800,
          height: 1000,
          alt: locale === 'ar' ? 'علاج في كيرلا' : 'TreatInKerala',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://treatinkerala.com/images/caring_doctor_patient_hero.png'],
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/icon.png',
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
  const medicalSchema = getMedicalOrganizationSchema(locale);
  const localBusinessSchema = getLocalBusinessSchema(locale);
  const aggregateRatingSchema = getAggregateRatingSchema(locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${tajawal.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
      </head>
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
