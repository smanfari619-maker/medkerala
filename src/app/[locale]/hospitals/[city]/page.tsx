import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getRegionalHub,
  getAllRegionalHubSlugs,
  getAllRegionalHubs
} from '@/lib/regionalHubs';
import HubDetailClient from './HubDetailClient';

interface Props {
  params: Promise<{
    locale: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllRegionalHubSlugs();
  return slugs.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const hub = getRegionalHub(city);

  if (!hub) {
    return {
      title: 'Regional Hospital Hub Not Found | TreatInKerala',
    };
  }

  const isAr = locale === 'ar';
  const hubName = isAr ? hub.nameAr : hub.nameEn;
  const districtName = isAr ? hub.districtAr : hub.districtEn;
  const title = isAr
    ? `أفضل مستشفيات ${hubName} | جراحات متقدمة وأيورفيدا مع طاقم استقبال دائم`
    : `Best Hospitals in ${hub.nameEn} | Partner Networks & On-Ground Concierge`;

  const description = isAr
    ? `دليل مستشفيات ومراكز ${hubName}، ${districtName}. رعاية رباعية وجراحات روبوتية وعلاجات أيورفيدا أصلية مع استقبال خاص من مطار ${hub.airport.code} ومترجم عربي مقيم.`
    : `Comprehensive guide to accredited partner hospitals and specialized medical centers in ${hub.nameEn}. Direct ${hub.airport.code} airport reception, dedicated Arabic coordinators, and zero markup.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/hospitals/${hub.slug}`,
      languages: {
        en: `/en/hospitals/${hub.slug}`,
        ar: `/ar/hospitals/${hub.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.treatinkerala.com/${locale}/hospitals/${hub.slug}`,
      siteName: 'TreatInKerala',
      locale: isAr ? 'ar_AR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function RegionalHubPage({ params }: Props) {
  const { locale, city } = await params;
  const hub = getRegionalHub(city);

  if (!hub) {
    notFound();
  }

  const allHubs = getAllRegionalHubs();
  const isAr = locale === 'ar';
  const baseUrl = 'https://www.treatinkerala.com';

  // ── Schema.org Structured Data ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': isAr ? 'الرئيسية' : 'Home',
        'item': `${baseUrl}/${locale}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': isAr ? 'المستشفيات الشريكة' : 'Hospitals',
        'item': `${baseUrl}/${locale}/hospitals`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': isAr ? hub.nameAr : hub.nameEn,
        'item': `${baseUrl}/${locale}/hospitals/${hub.slug}`
      }
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': `TreatInKerala - ${hub.nameEn} Concierge Desk`,
    'alternateName': `علاج في كيرلا - مكتب ${hub.nameAr}`,
    'description': isAr ? hub.heroSubAr : hub.heroSubEn,
    'url': `${baseUrl}/${locale}/hospitals/${hub.slug}`,
    'telephone': '+91-95262-42619',
    'priceRange': '$$',
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': hub.districtEn,
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': hub.nameEn,
      'addressRegion': 'Kerala',
      'addressCountry': 'IN'
    },
    'medicalSpecialty': hub.topSpecialities.map(s => s.nameEn),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': hub.faqs.map(faq => ({
      '@type': 'Question',
      'name': isAr ? faq.qAr : faq.qEn,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': isAr ? faq.aAr : faq.aEn
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HubDetailClient hub={hub} allHubs={allHubs} />
    </>
  );
}
