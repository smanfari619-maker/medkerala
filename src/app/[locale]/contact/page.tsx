import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr 
      ? 'اتصل بنا | ابدأ رحلتك العلاجية والتنسيق الطبي في كيرلا' 
      : 'Contact TreatInKerala | Start Your Medical Coordination Journey',
    description: isAr
      ? 'تواصل مع سلمان أبو وفريق التنسيق الطبي لعلاج في كيرلا. أرسل استفساراتك حول تكاليف الجراحة، خطابات التأشيرة والاستقبال المجاني من المطار.'
      : 'Get in touch with our team of personal care coordinators. Ask any questions about treatment costs, e-Medical visa letters, or Calicut airport arrivals.',
    alternates: {
      canonical: isAr ? '/ar/contact' : '/en/contact',
      languages: {
        en: '/en/contact',
        ar: '/ar/contact',
      },
    },
  };
}

export default async function ContactPage() {
  return <ContactClient />;
}
