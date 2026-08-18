import { MetadataRoute } from 'next';
import { TREATMENTS, BLOG_POSTS } from '@/lib/data';
import { COUNTRY_PAGES_DATA } from '@/lib/countryPages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://treatinkerala.com';
  const locales = ['en', 'ar'];

  const staticPages = [
    '',
    '/treatments',
    '/ayurveda',
    '/services',
    '/why-kerala',
    '/faq',
    '/contact',
    '/patient-stories',
    '/kerala-experience',
    '/blog',
    '/get-estimate',
    '/hospitals'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized entries for static pages
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            ar: `${baseUrl}/ar${page}`,
          },
        },
      });
    });
  });

  // Generate localized entries for treatment detail pages
  TREATMENTS.forEach((treatment) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/treatments/${treatment.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/treatments/${treatment.slug}`,
            ar: `${baseUrl}/ar/treatments/${treatment.slug}`,
          },
        },
      });
    });
  });

  // Generate localized entries for country landing pages
  Object.keys(COUNTRY_PAGES_DATA).forEach((slug) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/patients/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/en/patients/${slug}`,
            ar: `${baseUrl}/ar/patients/${slug}`,
          },
        },
      });
    });
  });

  // Generate localized entries for blog posts
  BLOG_POSTS.forEach((post) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${post.slug}`,
            ar: `${baseUrl}/ar/blog/${post.slug}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
