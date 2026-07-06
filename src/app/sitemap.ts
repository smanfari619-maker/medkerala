import { MetadataRoute } from 'next';
import { TREATMENTS, BLOG_POSTS } from '@/lib/data';

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
    '/get-estimate'
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
      });
    });
  });

  return sitemapEntries;
}
