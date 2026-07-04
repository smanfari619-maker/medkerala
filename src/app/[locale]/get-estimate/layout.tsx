import React from 'react';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'احصل على تقدير التكلفة | ميدكيرلا' : 'Get a Cost Estimate | MedKerala',
    description: locale === 'ar' 
      ? 'احسب تقدير التكاليف الأولية لرحلتك العلاجية في كيرلا تشمل تكاليف المستشفى والإقامة والخدمات اللوجستية.'
      : 'Estimate your treatment, accommodation, and travel costs in Kerala. Get a personalized medical package quote in 48 hours.',
  };
}

export default function GetEstimateLayout({ children }: Props) {
  return <>{children}</>;
}
