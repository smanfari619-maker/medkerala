export function getMedicalOrganizationSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    'name': isAr ? 'علاج في كيرلا' : 'TreatInKerala',
    'url': 'https://treatinkerala.com',
    'logo': 'https://treatinkerala.com/images/logo.svg',
    'description': isAr 
      ? 'تربط تريت إن كيرلا المرضى الدوليين بأفضل مستشفيات كيرلا الحاصلة على اعتمادات JCI و NABH.' 
      : 'TreatInKerala connects international patients to Kerala\'s premier JCI and NABH accredited hospitals and Ayurveda centres.',
    'email': 'treatinkerala@gmail.com',
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
      { '@type': 'Country', 'name': 'United Arab Emirates', 'identifier': 'AE' },
      { '@type': 'Country', 'name': 'Saudi Arabia', 'identifier': 'SA' },
      { '@type': 'Country', 'name': 'Oman', 'identifier': 'OM' },
      { '@type': 'Country', 'name': 'Kuwait', 'identifier': 'KW' },
      { '@type': 'Country', 'name': 'Qatar', 'identifier': 'QA' },
      { '@type': 'Country', 'name': 'Bahrain', 'identifier': 'BH' },
      { '@type': 'Country', 'name': 'United Kingdom', 'identifier': 'GB' },
      { '@type': 'Country', 'name': 'Germany', 'identifier': 'DE' },
      { '@type': 'Country', 'name': 'France', 'identifier': 'FR' },
      { '@type': 'Country', 'name': 'Nigeria', 'identifier': 'NG' },
      { '@type': 'Country', 'name': 'Kenya', 'identifier': 'KE' }
    ],
    'sameAs': [
      'https://www.wikidata.org/wiki/Q1186',
      'https://en.wikipedia.org/wiki/Ayurveda',
      'https://en.wikipedia.org/wiki/National_Accreditation_Board_for_Hospitals_%26_Healthcare_Providers'
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
      '@type': 'Person',
      'name': 'Muhsina TP',
      'jobTitle': 'Chief Medical Coordinator'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'TreatInKerala',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://treatinkerala.com/images/logo.svg'
      }
    }
  };
}

export function getBreadcrumbSchema(paths: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': paths.map((p, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': p.name,
      'item': p.url
    }))
  };
}

export function getMedicalProcedureSchema(locale: string, treatment: {
  name: string;
  nameAr: string;
  overview: string;
  overviewAr: string;
  slug: string;
  speciality: string;
  specialityAr: string;
  costTable?: {
    keralaMin: number;
    keralaMax: number;
    uk: number;
    usa: number;
    uae: number;
  };
}) {
  const isAr = locale === 'ar';
  const minCost = treatment.costTable ? treatment.costTable.keralaMin : 1500;
  const maxCost = treatment.costTable ? treatment.costTable.keralaMax : 8000;

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    'name': isAr ? treatment.nameAr : treatment.name,
    'description': isAr ? treatment.overviewAr : treatment.overview,
    'url': `https://treatinkerala.com/${locale}/treatments/${treatment.slug}`,
    'procedureType': {
      '@type': 'MedicalProcedureType',
      'name': 'TherapeuticProcedure'
    },
    'category': 'MedicalTourismProcedure',
    'status': {
      '@type': 'MedicalStatus',
      'name': 'Active'
    },
    'relevantSpecialty': {
      '@type': 'MedicalSpecialty',
      'name': isAr ? treatment.specialityAr : treatment.speciality
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'USD',
      'lowPrice': minCost,
      'highPrice': maxCost,
      'offerCount': '1',
      'priceValidUntil': '2027-12-31',
      'description': isAr 
        ? `تكلفة شاملة للرعاية الطبية في كيرلا تشمل الاستقبال من المطار والتنسيق الطبي، وتوفير 60-80% مقارنة بالإمارات وأمريكا.`
        : `All-inclusive medical coordination and procedure in Kerala with 60–80% savings vs UAE, UK, or USA. Includes airport pickup and dedicated liaison.`
    },
    'provider': {
      '@type': 'MedicalOrganization',
      'name': isAr ? 'مستشفيات كيرلا المعتمدة JCI و NABH' : 'JCI & NABH Accredited Partner Hospitals in Kerala',
      'url': 'https://treatinkerala.com'
    },
    'audience': {
      '@type': 'Audience',
      'geographicArea': [
        { '@type': 'Country', 'name': 'United Arab Emirates' },
        { '@type': 'Country', 'name': 'Saudi Arabia' },
        { '@type': 'Country', 'name': 'Oman' },
        { '@type': 'Country', 'name': 'Qatar' },
        { '@type': 'Country', 'name': 'Kuwait' },
        { '@type': 'Country', 'name': 'Nigeria' },
        { '@type': 'Country', 'name': 'United Kingdom' }
      ]
    },
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['h1', '.treatment-overview', '.cost-summary']
    }
  };
}

export function getMedicalWebPageSchema(locale: string, pageData: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    'name': pageData.title,
    'description': pageData.description,
    'url': `https://treatinkerala.com/${locale}/${pageData.slug}`,
    'inLanguage': isAr ? 'ar' : 'en',
    'datePublished': pageData.datePublished || '2026-01-15',
    'dateModified': pageData.dateModified || '2026-07-20',
    'lastReviewed': '2026-07-15',
    'author': {
      '@type': 'Person',
      'name': 'Muhsina TP',
      'jobTitle': isAr ? 'كبير المنسقين الطبيين' : 'Chief Medical Coordinator',
      'worksFor': {
        '@type': 'MedicalOrganization',
        'name': 'TreatInKerala'
      }
    },
    'reviewedBy': {
      '@type': 'Person',
      'name': 'Dr. M. Nair (Senior Medical Consultant)',
      'jobTitle': 'Senior Consultant & Clinical Advisor'
    },
    'publisher': {
      '@type': 'MedicalOrganization',
      'name': 'TreatInKerala',
      'url': 'https://treatinkerala.com',
      'logo': 'https://treatinkerala.com/images/logo.svg'
    }
  };
}

export function getLocalBusinessSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': isAr ? 'علاج في كيرلا' : 'TreatInKerala',
    'image': 'https://treatinkerala.com/images/logo.svg',
    'url': 'https://treatinkerala.com',
    'telephone': '+919400018008',
    'email': 'treatinkerala@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Hilite Business Park, Near Bypass Junction',
      'addressLocality': 'Calicut',
      'addressRegion': 'Kerala',
      'addressCountry': 'IN',
      'postalCode': '673014'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 11.2588,
      'longitude': 75.7804
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    }
  };
}

export function getHowToSchema(title: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': title,
    'step': steps.map((s, idx) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'name': s.name,
      'itemListElement': [
        {
          '@type': 'HowToDirection',
          'text': s.text
        }
      ]
    }))
  };
}

export function getAggregateRatingSchema(locale: string) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    'itemReviewed': {
      '@type': 'MedicalOrganization',
      'name': isAr ? 'علاج في كيرلا' : 'TreatInKerala',
      'url': 'https://treatinkerala.com'
    },
    'ratingValue': '4.9',
    'bestRating': '5',
    'ratingCount': '85'
  };
}
