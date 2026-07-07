import React from 'react';
import { Metadata } from 'next';
import GetEstimateClient from './GetEstimateClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr 
      ? 'احصل على تقدير تكلفة طبي مجاني | علاج في كيرلا' 
      : 'Get a Free Medical Treatment Estimate | TreatInKerala',
    description: isAr
      ? 'اطلب تقدير تكلفة مخصص للعلاج الطبي والسفر من أفضل مستشفيات كيرلا المعتمدة. خدمة مجانية بالكامل وبدون أي التزامات.'
      : 'Request a personalized medical treatment and travel cost estimate from top JCI and NABH accredited hospitals in Kerala. 100% free with zero obligation.',
    alternates: {
      canonical: isAr ? '/ar/get-estimate' : '/en/get-estimate',
      languages: {
        en: '/en/get-estimate',
        ar: '/ar/get-estimate',
      },
    },
  };
}

export default async function GetEstimatePage() {
  return <GetEstimateClient />;
}
