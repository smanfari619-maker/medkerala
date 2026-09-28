import React from 'react';
import { Metadata } from 'next';
import { FAQ_ITEMS } from './faqData';
import FAQClient from './FAQClient';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schemas';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr 
      ? 'الأسئلة الشائعة للسياحة العلاجية في كيرلا: التكاليف، المستشفيات، التأشيرة وكوتاكال | علاج في كيرلا'
      : 'Kerala Medical Tourism FAQ: Surgery Costs, JCI Hospitals, Visas & Kottakkal AVS | TreatInKerala',
    description: isAr 
      ? 'إجابات شاملة ومفصلة حول تكاليف جراحات الركبة والقلب في كيرلا، حجز كوتاكال آريا فايديا شالا، التأشيرة الطبية الإلكترونية، والمترجمين العرب المرافقين.'
      : 'Authoritative answers to patient questions on Kerala medical travel: robotic knee & cardiac surgery costs, hospital accreditations (JCI/NABH), Kottakkal Arya Vaidya Sala admissions, e-medical visas, and Arabic concierge support.',
    alternates: {
      canonical: isAr ? '/ar/faq' : '/en/faq',
      languages: {
        en: '/en/faq',
        ar: '/ar/faq',
      },
    },
    openGraph: {
      title: isAr
        ? 'دليل الأسئلة الشائعة حول العلاج في كيرلا | علاج في كيرلا'
        : 'Frequently Asked Questions — Medical Travel in Kerala | TreatInKerala',
      description: isAr
        ? 'كل ما تحتاج معرفته عن تكاليف الجراحة، اعتمادات المستشفيات، وطب الأيورفيدا في كيرلا.'
        : 'Detailed pricing comparisons, hospital safety benchmarks, and step-by-step travel guidance for international patients.',
      url: `https://www.treatinkerala.com/${locale}/faq`,
      type: 'website',
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  // Build JSON-LD FAQ Schema for Google and AI Answer Engines (AEO)
  const schemaFaqs = FAQ_ITEMS.map((item) => ({
    q: isRtl ? item.qAr : item.qEn,
    a: isRtl ? item.aAr : item.aEn,
  }));

  const faqSchema = getFAQSchema(schemaFaqs);

  // Build Breadcrumb Schema
  const breadcrumbSchema = getBreadcrumbSchema([
    {
      name: isRtl ? 'الرئيسية' : 'Home',
      url: `https://www.treatinkerala.com/${locale}`,
    },
    {
      name: isRtl ? 'الأسئلة الشائعة' : 'FAQ',
      url: `https://www.treatinkerala.com/${locale}/faq`,
    },
  ]);

  return (
    <>
      {/* ── JSON-LD Structured Data for AEO & Featured Snippets ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <FAQClient locale={locale} items={FAQ_ITEMS} />
    </>
  );
}
