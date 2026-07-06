import React from 'react';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'المستشفيات الشريكة المعتمدة | علاج في كيرلا' : 'Accredited Partner Hospitals | TreatInKerala',
    description: locale === 'ar' 
      ? 'استكشف شبكتنا من المستشفيات المعتمدة من اللجنة المشتركة الدولية (JCI) ومجلس الاعتماد الوطني (NABH) في كيرلا.'
      : 'Explore our network of accredited partner hospitals in Kerala. Standard-setting facilities holding NABH and JCI international certifications.',
  };
}

export default function HospitalsLayout({ children }: Props) {
  return <>{children}</>;
}
