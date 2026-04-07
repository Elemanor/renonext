// Pro Content Data — BuilderCore-style content profiles
// Each pro has: profile info, services, projects, videos, guides, social links

export interface ProEquipment {
  name: string;
  icon: string; // Material Symbols icon name
  description: string;
}

export interface ProCertification {
  name: string;
  number?: string; // license/cert number if public
  issuer: string;
  icon: string;
  verified: boolean;
}

export interface ProContent {
  slug: string;
  name: string;
  title: string;
  profileImage?: string; // profile photo path
  bio: string;
  location: string;
  serviceAreas: string[];
  hourlyRate?: { min: number; max: number };
  socials: {
    youtube?: string;
    instagram?: string;
    website?: string;
  };
  certifications: ProCertification[];
  equipment: ProEquipment[];
  whyNoPro: string[]; // reasons you don't need a company
  services: ProService[];
  projects: ProProject[];
  videos: ProVideo[];
  photos: ProPhoto[];
}

export interface ProService {
  name: string;
  category: 'structural' | 'masonry' | 'interior' | 'flooring' | 'exterior' | 'handyman' | 'permits';
  description: string;
  icon: string; // Material Symbols icon name
}

export interface ProjectStats {
  sqft?: number;
  duration?: string; // "2 days", "16 hours", etc.
  cost?: number;
  wasteWeight?: string;
  permits?: string;
  disposal?: string;
}

export interface ProjectReview {
  name: string; // first name + last initial
  role: string; // "Condo Owner", "Homeowner", etc.
  rating: number;
  comment: string;
}

export interface ProProject {
  id: string;
  slug: string; // URL-friendly: "kitchen-demolition-scarborough"
  title: string;
  seoTitle: string; // keyword-rich for <title> tag
  location: string;
  neighbourhood: string;
  city: string;
  description: string;
  services: string[];
  stats?: ProjectStats;
  review?: ProjectReview;
  images?: string[]; // local paths or URLs
  youtubeId?: string;
  instagramUrl?: string;
  lat?: number; // approximate latitude for map
  lng?: number; // approximate longitude for map
  status?: 'completed' | 'in-progress' | 'planned';
  story?: string; // behind-the-scenes story / challenge narrative
}

export interface ProVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  location: string;
  tags: string[];
  seoTitle: string; // keyword-rich title for SEO
}

export interface ProPhoto {
  id: string;
  title: string;
  description: string;
  instagramUrl: string;
  location: string;
  tags: string[];
  seoAlt: string; // keyword-rich alt text for SEO
}

// ─── Pavel Vysotckii — GTA Builder ────────────────────────────────────

export const pavelProfile: ProContent = {
  slug: 'pavel-vysotckii-builder-toronto',
  name: 'Pavel Vysotckii',
  title: 'General Contractor & Builder',
  profileImage: '/projects/underpinning-mt-pleasant/final-inspection.png',
  bio: `Full-stack builder with hands-on experience across structural, masonry, interior finishing, and exterior work throughout the Greater Toronto Area. From pulling building permits to pouring concrete, framing walls, and laying tile — I handle every phase of residential construction. I document my projects on-site so you can see real work, not stock photos.`,
  location: 'Greater Toronto Area, ON',
  serviceAreas: [
    'Toronto',
    'Scarborough',
    'North York',
    'Etobicoke',
    'Mississauga',
    'Oakville',
    'Brampton',
    'Vaughan',
    'Markham',
    'Richmond Hill',
    'Burlington',
    'Hamilton',
  ],
  hourlyRate: { min: 45, max: 85 },
  socials: {
    youtube: 'https://www.youtube.com/@dryspace_waterproofing',
    instagram: 'https://www.instagram.com/dryspace_waterproofing/',
  },

  certifications: [
    {
      name: 'BCIN — Building Code Identification Number',
      number: '131413',
      issuer: 'Ontario Ministry of Municipal Affairs and Housing',
      icon: 'assured_workload',
      verified: true,
    },
    {
      name: 'WHMIS (Workplace Hazardous Materials Information System)',
      issuer: 'Ontario Ministry of Labour',
      icon: 'science',
      verified: true,
    },
    {
      name: 'Working at Heights',
      issuer: 'Ontario Ministry of Labour — Approved Training Provider',
      icon: 'altitude',
      verified: true,
    },
    {
      name: '5-Step Fall Awareness Training',
      issuer: 'Infrastructure Health & Safety Association (IHSA)',
      icon: 'health_and_safety',
      verified: true,
    },
    {
      name: 'CPR & First Aid',
      issuer: 'Canadian Red Cross / St. John Ambulance',
      icon: 'medical_services',
      verified: true,
    },
  ],

  equipment: [
    {
      name: 'Work Truck',
      icon: 'local_shipping',
      description: 'Fully equipped truck for material transport, debris removal, and tool hauling to any GTA job site.',
    },
    {
      name: 'Concrete & Masonry Tools',
      icon: 'hardware',
      description: 'Concrete mixer, vibrator, forms, trowels, levels, cut-off saw, and all masonry hand tools.',
    },
    {
      name: 'Power Tools',
      icon: 'build',
      description: 'Rotary hammer, circular saw, reciprocating saw, angle grinder, impact driver, and drill set.',
    },
    {
      name: 'Framing & Carpentry',
      icon: 'carpenter',
      description: 'Nail gun, compressor, framing squares, laser level, speed square, and measuring equipment.',
    },
    {
      name: 'Tiling & Flooring',
      icon: 'grid_on',
      description: 'Wet tile saw, tile cutter, trowels, spacers, mixing paddles, and leveling system.',
    },
    {
      name: 'Safety Equipment',
      icon: 'health_and_safety',
      description: 'Hard hats, steel-toe boots, harnesses, dust masks, eye protection, and first aid kit.',
    },
  ],

  whyNoPro: [
    'You hire me — the person who actually does the work — not a company that sends a random subcontractor',
    'I bring my own truck, tools, and equipment to every job — no rental markups',
    'No office overhead, no receptionist, no fleet of branded trucks — that\'s 40-60% savings passed to you',
    'You see my face, my work, my reviews — not a logo hiding behind a call center',
    'Every project I post is from my own hands on a real job site — not stock photos',
    'Direct communication — you text me, I reply, no middleman',
  ],

  services: [
    {
      name: 'Building Permits',
      category: 'permits',
      description: 'Permit applications for residential renovations, additions, and basement conversions in the GTA.',
      icon: 'description',
    },
    {
      name: 'Underpinning',
      category: 'structural',
      description: 'Full and bench underpinning to lower basement floors and increase ceiling height. Engineered drawings coordination.',
      icon: 'foundation',
    },
    {
      name: 'Walkout Basement',
      category: 'structural',
      description: 'Walkout and walk-up basement door cuts through load-bearing and foundation walls with proper lintels and support.',
      icon: 'door_front',
    },
    {
      name: 'Brick Work & Block Laying',
      category: 'masonry',
      description: 'Brick veneer, concrete block walls, parging, and masonry repair for residential foundations and exteriors.',
      icon: 'grid_view',
    },
    {
      name: 'Stud Walls & Drywall',
      category: 'interior',
      description: 'Metal and wood stud framing, drywall hanging, taping, mudding, and sanding to paint-ready finish.',
      icon: 'view_column',
    },
    {
      name: 'Painting',
      category: 'interior',
      description: 'Interior painting for residential projects — walls, ceilings, trim. Clean lines, proper prep.',
      icon: 'format_paint',
    },
    {
      name: 'Flooring & Tiles',
      category: 'flooring',
      description: 'Hardwood, laminate, vinyl plank, and ceramic/porcelain tile installation for basements, kitchens, and bathrooms.',
      icon: 'grid_on',
    },
    {
      name: 'Wood Steps & Decks',
      category: 'exterior',
      description: 'Pressure-treated wood decks, front and back steps, railings, and outdoor structures.',
      icon: 'deck',
    },
    {
      name: 'Handyman Services',
      category: 'handyman',
      description: 'General repairs, fixture installation, door hanging, shelving, and miscellaneous residential work.',
      icon: 'handyman',
    },
  ],

  projects: [
    {
      id: 'mt-pleasant-addition',
      slug: 'house-addition-underpinning-toronto-mt-pleasant',
      title: 'House Addition with Full Underpinning',
      seoTitle: 'House Addition & Underpinning in Mt. Pleasant Toronto | BuilderCore',
      location: 'Mt. Pleasant & St. Clair, Toronto',
      neighbourhood: 'Mt. Pleasant',
      city: 'Toronto',
      description: 'Complete house addition project including excavation, full underpinning on one side, bench underpinning on the other, and a door cut-out through the existing foundation wall. One of the most complex residential structural projects in the neighbourhood.',
      services: ['Underpinning', 'Walkout Basement', 'Excavation'],
      stats: {
        duration: '3 weeks',
        permits: 'Building Permit Required',
      },
      youtubeId: 'VJDwiTOGU5k',
      images: [
        '/projects/underpinning-mt-pleasant/final-inspection.png',
      ],
      lat: 43.7001,
      lng: -79.3897,
      status: 'completed',
      story: 'This project was one of the most complex residential structural jobs in the Mt. Pleasant neighbourhood. The homeowner wanted to add a rear addition while lowering the basement — which meant we had to underpin both sides of the house simultaneously while keeping the existing structure stable. We used a cut-and-break saw to open a new doorway through the original load-bearing brick foundation wall. Every step had to be engineered and inspected.',
    },
    {
      id: 'main-street-underpinning',
      slug: 'basement-underpinning-toronto-main-street',
      title: 'Basement Underpinning',
      seoTitle: 'Basement Underpinning on Main Street Toronto | BuilderCore',
      location: 'Main Street, Toronto',
      neighbourhood: 'Main Street',
      city: 'Toronto',
      description: 'Residential basement underpinning to increase ceiling height. Full bench and pin process documented on-site during active concrete work.',
      services: ['Underpinning'],
      stats: {
        duration: '2 weeks',
        permits: 'Building Permit Required',
      },
      instagramUrl: 'https://www.instagram.com/p/DAlW3QkJCDJ/',
      lat: 43.6890,
      lng: -79.3632,
      status: 'completed',
      story: 'Standard residential underpinning to gain legal ceiling height. The homeowner was converting their basement into a rental unit and needed the floor lowered by 18 inches. The bench-and-pin process was documented throughout for the building inspector.',
    },
    {
      id: 'oakville-waterproofing',
      slug: 'exterior-waterproofing-oakville',
      title: 'Exterior Waterproofing Membrane Application',
      seoTitle: 'Exterior Foundation Waterproofing in Oakville ON | BuilderCore',
      location: 'Oakville, ON',
      neighbourhood: 'Oakville',
      city: 'Oakville',
      description: 'Full exterior waterproofing membrane application on a residential house. Excavation down to the footing, membrane and drainage board installation, and proper backfill.',
      services: ['Waterproofing'],
      stats: {
        duration: '4 days',
        permits: 'Not Required',
      },
      instagramUrl: 'https://www.instagram.com/p/C-pg61rJ5tM/',
      lat: 43.4675,
      lng: -79.6877,
      status: 'completed',
    },
    {
      id: 'wellesley-water-management',
      slug: 'backyard-water-management-cabbagetown-toronto',
      title: 'Backyard Cleaning & Water Management',
      seoTitle: 'Backyard Drainage & Water Management in Cabbagetown Toronto | BuilderCore',
      location: 'Wellesley & Sherbourne, Toronto',
      neighbourhood: 'Cabbagetown',
      city: 'Toronto',
      description: 'Complete backyard cleanup and water management solution. Before and after transformation — drainage regrading, debris removal, and proper water flow away from the foundation.',
      services: ['Water Management', 'Cleanup'],
      stats: {
        duration: '2 days',
        permits: 'Not Required',
      },
      instagramUrl: 'https://www.instagram.com/p/DAnw57vpIlQ/',
      lat: 43.6676,
      lng: -79.3676,
      status: 'completed',
      story: 'The homeowner had years of standing water pooling against the foundation after every rain. We regraded the entire backyard to slope away from the house, installed proper drainage, and removed decades of debris. The before-and-after transformation was dramatic.',
    },
    {
      id: 'brunswick-underpinning-pour',
      slug: 'underpinning-concrete-pour-annex-toronto',
      title: 'Underpinning Wall Concrete Pour & Curing',
      seoTitle: 'Underpinning Concrete Pour in the Annex Toronto | BuilderCore',
      location: 'Brunswick & Spadina, Toronto',
      neighbourhood: 'Annex',
      city: 'Toronto',
      description: 'Fresh concrete placed on a basement underpinning wall section. Proper forming, pouring, and curing process documented during active construction.',
      services: ['Underpinning', 'Concrete'],
      stats: {
        duration: '1 day (pour) + 7 days curing',
        permits: 'Part of Permit',
      },
      images: [
        '/projects/underpinning-block-annex/block.jpg',
      ],
      lat: 43.6723,
      lng: -79.4056,
      status: 'completed',
    },
    {
      id: 'mississauga-slump-test',
      slug: 'concrete-slump-test-mississauga',
      title: 'Concrete Slump Test on Site',
      seoTitle: 'Concrete Slump Test — Quality Control on Site in Mississauga | BuilderCore',
      location: 'Mississauga & Lakeshore E',
      neighbourhood: 'Lakeshore',
      city: 'Mississauga',
      description: 'On-site concrete slump test to verify workability before a foundation pour. Proper testing procedure ensures the right consistency for structural concrete work.',
      services: ['Concrete', 'Quality Control'],
      stats: {
        duration: '15 min test',
        permits: 'N/A',
      },
      youtubeId: 'Bt-W7lseC5k',
      lat: 43.5890,
      lng: -79.6441,
      status: 'completed',
    },
    {
      id: 'rosedale-exterior-waterproofing',
      slug: 'exterior-waterproofing-rosedale-toronto',
      title: 'Exterior Waterproofing — Full Excavation & Membrane',
      seoTitle: 'Exterior Waterproofing in Rosedale Toronto — Membrane & Drainage | BuilderCore',
      location: 'Rosedale, Toronto',
      neighbourhood: 'Rosedale',
      city: 'Toronto',
      description: 'Complete exterior waterproofing on a heritage home in Rosedale. Full excavation to footings, rubber membrane application, dimpled drainage board, rigid insulation, and proper backfill. Multi-stage process documented from trench to finished grade.',
      services: ['Waterproofing', 'Excavation'],
      stats: {
        duration: '5 days',
        cost: 12500,
        permits: 'Not Required',
      },
      images: [
        '/projects/exterior-waterproofing-rosedale/in-process-1.webp',
        '/projects/exterior-waterproofing-rosedale/in-process-2.webp',
        '/projects/exterior-waterproofing-rosedale/membrane.webp',
        '/projects/exterior-waterproofing-rosedale/dimpled-membrane.webp',
        '/projects/exterior-waterproofing-rosedale/insulation.webp',
      ],
      lat: 43.6789,
      lng: -79.3762,
      status: 'completed',
      story: 'A heritage home in Rosedale with chronic basement leaks. The exterior walls had never been waterproofed since the house was built in the 1920s. We excavated to the footings on all sides, applied a rubber membrane with dimpled drainage board, and added rigid insulation before backfilling. The homeowner can now finish the basement without fear of moisture.',
    },
    {
      id: 'kipling-interior-waterproofing',
      slug: 'interior-waterproofing-sump-pump-etobicoke',
      title: 'Interior Waterproofing with Sump Pump Install',
      seoTitle: 'Interior Waterproofing & Sump Pump Installation in Etobicoke Toronto | BuilderCore',
      location: 'Kipling & Bloor, Etobicoke',
      neighbourhood: 'Etobicoke',
      city: 'Toronto',
      description: 'Full interior waterproofing system installed in a finished basement near Kipling & Bloor. Interior perimeter drain tile, sump pit excavation, primary and battery-backup sump pumps, and discharge to grade. Keeps the basement dry without exterior excavation.',
      services: ['Waterproofing', 'Plumbing'],
      stats: {
        duration: '3 days',
        cost: 8500,
        permits: 'Plumbing Permit',
      },
      images: [
        '/projects/interior-waterproofing-kipling/interior-waterproofing.webp',
        '/projects/interior-waterproofing-kipling/sump-pump-install.webp',
        '/projects/interior-waterproofing-kipling/sump-pump-backup.webp',
        '/projects/interior-waterproofing-kipling/drain.webp',
      ],
      lat: 43.6205,
      lng: -79.5132,
      status: 'completed',
      story: 'This basement had been flooding for years every spring. The homeowner didn\'t want exterior excavation because of a newly landscaped backyard. We installed a full interior perimeter drain tile system with a primary sump pump and battery-backup, then discharged to grade. The basement has been dry through two heavy rainstorms since.',
    },
    {
      id: 'mississauga-crack-injection',
      slug: 'crack-injection-lakeshore-mississauga',
      title: 'Foundation Crack Injection Repair',
      seoTitle: 'Foundation Crack Injection Repair in Mississauga — Structural Fix | BuilderCore',
      location: 'Lakeshore E, Mississauga',
      neighbourhood: 'Lakeshore',
      city: 'Mississauga',
      description: 'Epoxy and polyurethane crack injection on a poured concrete foundation wall. Structural crack identified, prepped, and injected under pressure to seal the water entry point permanently. Non-invasive repair — no excavation required.',
      services: ['Waterproofing', 'Foundation Repair'],
      stats: {
        duration: '1 day',
        cost: 1200,
        permits: 'Not Required',
      },
      images: [
        '/projects/crack-injection-mississauga/crack-repair.webp',
        '/projects/crack-injection-mississauga/crack.webp',
        '/projects/crack-injection-mississauga/structural-crack.webp',
      ],
      lat: 43.5890,
      lng: -79.6441,
      status: 'completed',
    },
    {
      id: 'pape-street-walkout',
      slug: 'underpinning-walkout-basement-pape-toronto',
      title: 'Underpinning & Walkout Basement Conversion',
      seoTitle: 'Underpinning & Walkout Basement on Pape Street Toronto | BuilderCore',
      location: 'Pape Street, Toronto',
      neighbourhood: 'East York',
      city: 'Toronto',
      description: 'Full basement underpinning with walkout conversion on Pape Street. Interior dimpled membrane installed on all walls, existing foundation lowered to create legal ceiling height, and a new walkout entrance created. Project documented from excavation through to waterproofing completion.',
      services: ['Underpinning', 'Walkout Basement', 'Waterproofing'],
      stats: {
        duration: '3 weeks',
        permits: 'Building Permit Required',
      },
      images: [
        '/projects/underpinning-walkout-pape/before.jpg',
      ],
      lat: 43.6816,
      lng: -79.3462,
      status: 'completed',
      story: 'This East York bungalow needed a complete basement overhaul. The owner wanted a walkout entrance and legal ceiling height. We lowered the floor through full underpinning, cut a new doorway through the foundation wall, and installed dimpled membrane on all walls for moisture protection. The entire basement went from unusable crawlspace to a bright, dry living area.',
    },
    {
      id: 'foundation-problems-guide',
      slug: 'foundation-problems-visual-guide-toronto',
      title: 'Foundation Problems — Visual Diagnosis Guide',
      seoTitle: 'Foundation Problems Visual Guide — Spalling, Efflorescence, Wet Cove Joint | BuilderCore',
      location: 'Greater Toronto Area',
      neighbourhood: 'GTA',
      city: 'Toronto',
      description: 'A visual guide to the most common foundation problems found in GTA homes. Concrete spalling caused by excessive water exposure, shrinkage cracking from improper curing, white efflorescence salt deposits from moisture migration, and wet cove joints where the floor meets the wall — a sign of missing waterstop in the original pour. Each of these issues tells a story about what is happening behind your foundation walls.',
      services: ['Foundation Repair', 'Waterproofing', 'Quality Control'],
      stats: {
        duration: 'Assessment',
        permits: 'N/A',
      },
      images: [
        '/projects/foundation-problems-guide/spalling-inspection.jpg',
        '/projects/foundation-problems-guide/shrinkage-crack.webp',
        '/projects/foundation-problems-guide/efflorescence.webp',
        '/projects/foundation-problems-guide/wet-cove-joint.webp',
      ],
      lat: 43.6532,
      lng: -79.3832,
      status: 'completed',
    },
  ],

  videos: [
    {
      id: 'slump-test',
      title: 'How to Measure Concrete Slump',
      description: 'On-site demonstration of the concrete slump test — the standard quality control check before any foundation pour. Shot on location in Mississauga.',
      youtubeId: 'Bt-W7lseC5k',
      location: 'Mississauga & Lakeshore E',
      tags: ['concrete', 'slump test', 'quality control', 'foundation'],
      seoTitle: 'How to Measure Concrete Slump Test on Site — GTA Contractor Demo',
    },
    {
      id: 'door-cut',
      title: 'Cut & Break Saw: Opening a Load-Bearing Brick Wall for Door',
      description: 'Safely cutting through a load-bearing brick foundation wall to create a new door opening. Using cut and break saw technique with proper temporary shoring.',
      youtubeId: 'VJDwiTOGU5k',
      location: 'Mt. Pleasant & St. Clair, Toronto',
      tags: ['door cut', 'load-bearing wall', 'brick', 'walkout', 'underpinning'],
      seoTitle: 'How to Cut a Door Opening in a Load-Bearing Brick Wall — Toronto Contractor',
    },
  ],

  photos: [
    {
      id: 'underpinning-action',
      title: 'Basement Underpinning in Progress',
      description: 'On-site during an active basement underpinning project on Main Street, Toronto. Real work, real conditions.',
      instagramUrl: 'https://www.instagram.com/p/DAlW3QkJCDJ/',
      location: 'Main Street, Toronto',
      tags: ['underpinning', 'basement', 'foundation', 'concrete'],
      seoAlt: 'Contractor performing basement underpinning on Main Street Toronto — concrete foundation work in progress',
    },
    {
      id: 'waterproofing-membrane',
      title: 'Exterior Waterproofing Membrane Application',
      description: 'Applying waterproofing membrane to the exterior foundation wall of a residential home in Oakville. Full excavation and proper drainage board installation.',
      instagramUrl: 'https://www.instagram.com/p/C-pg61rJ5tM/',
      location: 'Oakville, ON',
      tags: ['waterproofing', 'membrane', 'foundation', 'exterior'],
      seoAlt: 'Exterior foundation waterproofing membrane being applied to residential house in Oakville Ontario',
    },
    {
      id: 'backyard-water-mgmt',
      title: 'Backyard Cleaning & Water Management — Before/After',
      description: 'Complete backyard transformation at Wellesley and Sherbourne. Drainage correction and debris removal to protect the foundation from water damage.',
      instagramUrl: 'https://www.instagram.com/p/DAnw57vpIlQ/',
      location: 'Wellesley & Sherbourne, Toronto',
      tags: ['water management', 'drainage', 'backyard', 'cleanup'],
      seoAlt: 'Before and after backyard water management and cleanup project in Cabbagetown Toronto',
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────

const allProfiles: ProContent[] = [pavelProfile];

export function getProBySlug(slug: string): ProContent | undefined {
  return allProfiles.find((p) => p.slug === slug);
}

export function getAllProSlugs(): string[] {
  return allProfiles.map((p) => p.slug);
}

export function getServiceCategories(pro: ProContent) {
  const categories = new Map<string, ProService[]>();
  for (const svc of pro.services) {
    const existing = categories.get(svc.category) || [];
    existing.push(svc);
    categories.set(svc.category, existing);
  }
  return categories;
}

const categoryLabels: Record<string, string> = {
  structural: 'Structural',
  masonry: 'Masonry',
  interior: 'Interior Finishing',
  flooring: 'Flooring',
  exterior: 'Exterior',
  handyman: 'Handyman',
  permits: 'Permits & Planning',
};

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category;
}

// ─── Project Helpers ─────────────────────────────────────────────────

export function getProjectBySlug(slug: string): { project: ProProject; pro: ProContent } | undefined {
  for (const pro of allProfiles) {
    const project = pro.projects.find((p) => p.slug === slug);
    if (project) return { project, pro };
  }
  return undefined;
}

export function getAllProjectSlugs(): string[] {
  return allProfiles.flatMap((pro) => pro.projects.map((p) => p.slug));
}
