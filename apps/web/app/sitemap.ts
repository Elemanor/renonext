import type { MetadataRoute } from 'next';
import { mockBlogPosts } from '@/lib/mock-data/blog';
import { getAllAppSlugs } from '@/lib/data/apps';
import { getAllProSlugs, getAllProjectSlugs } from '@/lib/data/pro-content';

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
    { url: `${BASE}/contracts`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/help`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/toolbox-talk`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/daily-report`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/safety-inspection`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/pour-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/jsa`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/renovation-cost-report`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/wbs-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/renovation-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
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

  // Shop pages: 1 hub + 10 category pages = 11 URLs (individual product pages are dynamic)
  const shopCategorySlugs = [
    'power-tools', 'hand-tools', 'safety-equipment', 'concrete-masonry',
    'waterproofing', 'plumbing', 'electrical', 'fasteners-hardware',
    'paint-finishing', 'lumber-framing',
    'bathroom-kitchen', 'home-essentials',
    'no-drill-bathroom', 'no-drill-kitchen', 'no-drill-storage', 'no-drill-decor',
  ];
  const shopPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...shopCategorySlugs.map((slug) => ({
      url: `${BASE}/shop/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  // App pages: 1 hub + individual app pages
  const appSlugs = getAllAppSlugs();
  const appHubPage: MetadataRoute.Sitemap = [
    { url: `${BASE}/apps`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
  const appPages: MetadataRoute.Sitemap = appSlugs.map((slug) => ({
    url: `${BASE}/apps/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Pro profile pages (static content-driven)
  const proSlugs = getAllProSlugs();
  const proPages: MetadataRoute.Sitemap = proSlugs.map((slug) => ({
    url: `${BASE}/pro/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Project detail pages
  const projectSlugs = getAllProjectSlugs();
  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // WHMIS training pages: landing + 7 modules + quiz + certificate = 10 URLs
  const whmisPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/whmis`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...[1, 2, 3, 4, 5, 6, 7].map((id) => ({
      url: `${BASE}/whmis/module/${id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${BASE}/whmis/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/whmis/certificate`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const blogPages: MetadataRoute.Sitemap = mockBlogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Best waterproofing city pages: 15 URLs
  const bestWaterproofingPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE}/best-waterproofing/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Best underpinning city pages: 15 URLs
  const bestUnderpinningPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE}/best-underpinning/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Basement renovation cost city pages: 15 URLs
  const basementRenovationCostPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE}/basement-renovation-cost/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Basement leak repair city pages: 15 URLs
  const basementLeakRepairPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE}/basement-leak-repair/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
    ...costHubPage,
    ...costServicePages,
    ...costCityPages,
    ...shopPages,
    ...appHubPage,
    ...appPages,
    ...whmisPages,
    ...blogPages,
    ...proPages,
    ...projectPages,
    ...bestWaterproofingPages,
    ...bestUnderpinningPages,
    ...basementRenovationCostPages,
    ...basementLeakRepairPages,
  ];
}
