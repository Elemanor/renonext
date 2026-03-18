import type { MetadataRoute } from 'next';

const BASE = 'https://renonext.com';

const serviceSlugs = [
  'underpinning', 'foundation-repair', 'waterproofing', 'concrete-works', 'masonry', 'framing',
  'electrical', 'plumbing', 'handyman', 'hvac', 'insulation', 'drains', 'painting', 'cleaning',
  'additions', 'basement-second-unit', 'roofing', 'demolition', 'decks',
  'general-contractor', 'project-management', 'building-permit', 'drafting', 'estimating', 'equipment-rental',
];

const citySlugs = [
  'toronto', 'mississauga', 'brampton', 'vaughan', 'markham', 'richmond-hill', 'aurora',
  'oakville', 'burlington', 'milton', 'ajax', 'pickering', 'oshawa', 'whitby', 'hamilton',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/homeowners`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contractors`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pros`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/price-check`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/house-fax`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/house-fax/sample`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/savings`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/why-renonext`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/help`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE}/savings/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const cityServicePages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE}/services/basement-second-unit/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Cost guides: 1 hub + 25 service pages + 375 city pages = 401 URLs
  const costHubPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/costs`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const costServicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE}/costs/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const costCityPages: MetadataRoute.Sitemap = serviceSlugs.flatMap((svc) =>
    citySlugs.map((city) => ({
      url: `${BASE}/costs/${svc}/${city}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  );

  // App pages: 1 hub + 5 individual app pages = 6 URLs
  const appSlugs = ['equipment-fix', 'drawing-viewer', 'attendance', 'ar-survey', 'concrete-pour'];
  const appHubPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/apps`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
  const appPages: MetadataRoute.Sitemap = appSlugs.map((slug) => ({
    url: `${BASE}/apps/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
    ...costHubPage,
    ...costServicePages,
    ...costCityPages,
    ...appHubPage,
    ...appPages,
  ];
}
