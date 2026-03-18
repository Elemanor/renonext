import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/pro-dashboard/',
          '/pro-network/',
          '/admin/',
          '/login',
          '/signup',
          '/join/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://renonext.com/sitemap.xml',
  };
}
