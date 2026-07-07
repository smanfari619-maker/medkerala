import React from 'react';
import { Metadata } from 'next';
import HospitalsClient from './HospitalsClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr 
      ? 'أفضل مستشفيات كيرلا المعتمدة | أستر ميمس وميترا وبيبي التذكاري' 
      : 'Best Hospitals in Kerala | JCI & NABH Accredited Partner Networks',
    description: isAr
      ? 'دليل المستشفيات ومراكز الأيورفيدا الشريكة والمعتمدة في كيرلا، الهند. أستر، ميترا، وبيبي التذكاري مع خدمات التنسيق المجانية من علاج في كيرلا.'
      : 'Explore the directory of top JCI and NABH accredited hospitals in Kozhikode/Calicut and Kochi. Access world-class allopathic care and certified Ayurveda centres.',
    alternates: {
      canonical: isAr ? '/ar/hospitals' : '/en/hospitals',
      languages: {
        en: '/en/hospitals',
        ar: '/ar/hospitals',
      },
    },
  };
}

export default async function HospitalsPage() {
  return <HospitalsClient />;
}
