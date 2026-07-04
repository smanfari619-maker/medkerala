import React from 'react';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'اتصل بنا | ميدكيرلا' : 'Contact MedKerala | Get in Touch',
    description: locale === 'ar' 
      ? 'تواصل مع فريق التنسيق الطبي لدينا في كيرلا، الهند. نحن هنا للإجابة على استفساراتك وتوفير الدعم الطبي على مدار الساعة.'
      : 'Contact MedKerala\'s patient coordinators. Get support for medical visas, hospital options, and travel logistics in Calicut.',
  };
}

export default function ContactLayout({ children }: Props) {
  return <>{children}</>;
}
