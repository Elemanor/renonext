import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/admin/*',
          '/pro-dashboard/*',
          '/pro-network/*',
          '/api/*',
        ],
      },
    ],
    sitemap: 'https://renonext.com/sitemap.xml',
  };
}
