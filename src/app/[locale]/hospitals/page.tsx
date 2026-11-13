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
      ? 'دليل مستشفيات كيرلا الشريكة | التخصصات والاعتمادات'
      : 'Hospitals in Kerala: Partner Directory & Accreditation Status',
    description: isAr
      ? 'تعرّف على المستشفيات ومراكز الأيورفيدا الشريكة في كيرلا حسب المدينة والتخصص، واطّلع على الاعتمادات المدرجة لكل منشأة قبل طلب تقدير للرعاية.'
      : 'Compare partner hospitals and Ayurveda centres across Kerala by city and specialty. Review each facility’s listed accreditation status, then request a care estimate.',
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
