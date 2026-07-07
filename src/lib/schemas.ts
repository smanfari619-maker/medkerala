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
      '@type': 'Organization',
      'name': 'TreatInKerala Medical Panel'
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

export function getMedicalProcedureSchema(locale: string, treatment: { name: string; nameAr: string; overview: string; overviewAr: string; slug: string; speciality: string; specialityAr: string }) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    'name': isAr ? treatment.nameAr : treatment.name,
    'description': isAr ? treatment.overviewAr : treatment.overview,
    'procedureType': {
      '@type': 'MedicalProcedureType',
      'name': 'Surgical'
    },
    'category': 'Treatment',
    'status': {
      '@type': 'MedicalStatus',
      'name': 'Active'
    },
    'relevantSpecialty': {
      '@type': 'MedicalSpecialty',
      'name': isAr ? treatment.specialityAr : treatment.speciality
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
