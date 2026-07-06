export function getMedicalOrganizationSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    'name': isAr ? 'علاج في كيرلا' : 'TreatInKerala',
    'url': 'https://treatinkerala.com',
    'logo': 'https://treatinkerala.com/images/logo.png',
    'description': isAr 
      ? 'تربط تريت إن كيرلا المرضى الدوليين بأفضل مستشفيات كيرلا الحاصلة على اعتمادات JCI و NABH.' 
      : 'TreatInKerala connects international patients to Kerala\'s premier JCI and NABH accredited hospitals and Ayurveda centres.',
    'email': 'care@treatinkerala.com',
    'telephone': '+919400018008',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Hilite Business Park, Near Bypass Junction',
      'addressLocality': 'Calicut',
      'addressRegion': 'Kerala',
      'addressCountry': 'IN',
      'postalCode': '673014'
    },
    'medicalSpecialty': [
      'Cardiology',
      'Orthopedics',
      'Gynecology',
      'Oncology',
      'Neurology'
    ],
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': 'GCC Countries' },
      { '@type': 'AdministrativeArea', 'name': 'United Kingdom' },
      { '@type': 'AdministrativeArea', 'name': 'Europe' }
    ]
  };
}

export function getFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };
}

export function getBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  locale: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'url': `https://treatinkerala.com/${post.locale}/blog/${post.slug}`,
    'datePublished': post.date,
    'author': {
      '@type': 'Organization',
      'name': 'TreatInKerala Medical Panel'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'TreatInKerala',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://treatinkerala.com/images/logo.png'
      }
    }
  };
}
