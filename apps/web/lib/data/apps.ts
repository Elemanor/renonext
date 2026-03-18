// ---------------------------------------------------------------------------
// RenoNext App Suite — data for /apps presentation pages
// ---------------------------------------------------------------------------

export interface AppFeature {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface AppScreenshot {
  label: string;
  description: string;
}

export interface AppData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroDescription: string;
  audience: string; // "Field" | "Office" | "Client" | "Field + Office"
  audienceLabel: string;
  color: string; // tailwind gradient from
  icon: string; // lucide icon name
  platform: string;
  features: AppFeature[];
  benefits: string[];
  useCases: string[];
  techHighlights: string[];
  screenshots: AppScreenshot[];
  ctaLabel: string;
  ctaHref: string;
}

// ---------------------------------------------------------------------------
// App definitions
// ---------------------------------------------------------------------------

export const apps: AppData[] = [
  {
    slug: 'equipment-fix',
    name: 'EquipmentFix',
    tagline: 'Equipment goes down. Your crew shouldn\'t.',
    description:
      'Real-time equipment maintenance and issue tracking for construction teams. Report problems with photos, assign mechanics, and track resolution — from the field.',
    heroDescription:
      'When a scissor lift dies at 7 AM, every hour matters. EquipmentFix lets field crews report equipment issues with photos and severity levels, dispatchers assign mechanics in seconds, and supervisors track resolution in real-time. No more radio calls, paper forms, or "I thought someone reported that."',
    audience: 'Field + Office',
    audienceLabel: 'For Field Crews & Dispatch',
    color: 'from-orange-600 to-red-600',
    icon: 'Wrench',
    platform: 'iOS & Android (React Native)',
    features: [
      {
        icon: 'AlertTriangle',
        title: 'One-Tap Issue Reporting',
        description:
          'Snap a photo, select severity (low to critical), pick the equipment, and submit. The dispatcher sees it immediately.',
      },
      {
        icon: 'Users',
        title: 'Mechanic Dispatch',
        description:
          'Assign issues to specific mechanics with priority. They get a push notification and can acknowledge from the field.',
      },
      {
        icon: 'BarChart3',
        title: 'Equipment Down Tracking',
        description:
          'See which equipment is down across all sites in real-time. Track downtime hours, repeat failures, and cost impact.',
      },
      {
        icon: 'Bell',
        title: 'Smart Escalation',
        description:
          'Auto-escalate unacknowledged issues. Critical equipment down? The supervisor gets notified automatically after 30 minutes.',
      },
      {
        icon: 'Clock',
        title: 'Resolution Timeline',
        description:
          'Track every issue from new → acknowledged → in progress → waiting for parts → fixed → closed with full history.',
      },
      {
        icon: 'WifiOff',
        title: 'Offline-First',
        description:
          'Works without cell service. Issues queue locally and sync when connection returns. No data lost on remote sites.',
      },
    ],
    benefits: [
      'Reduce equipment downtime by 40% with faster issue response',
      'Eliminate paper-based maintenance logs and radio miscommunication',
      'Track repeat failures to identify equipment that needs replacement',
      'Full audit trail for safety compliance and insurance documentation',
      'Real-time visibility across all sites from one dispatch dashboard',
    ],
    useCases: [
      'Construction companies managing fleets of heavy equipment across multiple job sites',
      'Rental equipment companies tracking maintenance on scissor lifts, forklifts, and cranes',
      'General contractors coordinating mechanic response for subcontractor equipment issues',
      'Safety managers documenting equipment hazards and resolution timelines for WSIB compliance',
    ],
    techHighlights: [
      'Expo / React Native with offline-first SQLite sync',
      'Supabase real-time for instant dispatch updates',
      'Photo capture with severity classification',
      'Push notifications via Expo Notifications',
      'Role-based access: Admin, Supervisor, Mechanic, Reporter',
    ],
    screenshots: [
      { label: 'Dispatch Dashboard', description: 'Real-time view of all active equipment issues across sites' },
      { label: 'Issue Report', description: 'One-tap reporting with photo, severity, and equipment selection' },
      { label: 'Mechanic View', description: 'Assigned work queue with priority and status updates' },
      { label: 'Analytics', description: 'Downtime reports, repeat failures, and resolution time metrics' },
    ],
    ctaLabel: 'Request Early Access',
    ctaHref: '/contact',
  },
  {
    slug: 'drawing-viewer',
    name: 'ConstructView',
    tagline: 'Your drawings. On site. Offline.',
    description:
      'An offline-first construction drawing viewer that replaces paper blueprints with digital collaboration. View, markup, and manage RFIs — with or without cell service.',
    heroDescription:
      'Paper drawings get wet, tear, and fall behind revisions within a week. ConstructView puts the entire drawing set on your iPad — offline. Pinch to zoom into any detail, draw markups with your finger, file RFIs from the field, and sync everything when you\'re back in range. Your team always has the latest revision.',
    audience: 'Field + Office',
    audienceLabel: 'For Field Engineers & PMs',
    color: 'from-blue-600 to-indigo-600',
    icon: 'FileText',
    platform: 'iOS & Android (React Native)',
    features: [
      {
        icon: 'Layers',
        title: '60fps Sheet Viewing',
        description:
          'Butter-smooth pinch-to-zoom and pan on 200+ sheet drawing sets. Split by discipline, filter by revision, search by sheet number.',
      },
      {
        icon: 'PenTool',
        title: 'Vector Markup Tools',
        description:
          'Freehand, arrows, dimensions, clouds, shapes, and text. SVG-based markups with layer management — organized by discipline.',
      },
      {
        icon: 'MessageSquare',
        title: 'RFI / SI Management',
        description:
          'Pin RFIs directly to sheet locations. Attach field photos, track status from draft to closed. Full audit trail.',
      },
      {
        icon: 'WifiOff',
        title: '100% Offline',
        description:
          'Download drawing sets to your device. Works without any internet connection. Delta sync when connectivity returns.',
      },
      {
        icon: 'GitCompare',
        title: 'Revision Comparison',
        description:
          'Side-by-side revision comparison. Automatic sheet matching across revisions. Never miss a design change.',
      },
      {
        icon: 'Link',
        title: 'Smart Hyperlinks',
        description:
          'Auto-detect cross-references like "See Detail 3/S-201." Tap to jump between related sheets instantly.',
      },
    ],
    benefits: [
      'Replace 95% of paper drawings on active job sites',
      'Reduce RFI response time by 40% with field-originated RFIs',
      'Never work from an outdated revision again',
      '100% audit trail for compliance — who viewed what, when',
      'Cut drawing printing costs to near zero',
    ],
    useCases: [
      'Field engineers walking the site with iPad, checking dimensions against drawings',
      'Project managers tracking RFI status across multiple projects from the office',
      'BIM coordinators managing 200+ sheet drawing sets with discipline filtering',
      'Quality inspectors marking up deficiencies directly on the relevant drawing sheet',
    ],
    techHighlights: [
      'React Native with WatermelonDB for offline-first sync',
      'Fastify API with PostgreSQL + Redis + BullMQ workers',
      'Automatic OCR-powered title block extraction',
      'Real-time collaboration via WebSocket (Redis Pub/Sub)',
      'AWS S3 + CloudFront for high-performance sheet delivery',
    ],
    screenshots: [
      { label: 'Sheet Viewer', description: 'High-performance pinch-to-zoom with discipline filtering' },
      { label: 'Markup Tools', description: 'Vector-based annotations with layer management' },
      { label: 'RFI Pinned to Sheet', description: 'File RFIs from the field with photo evidence' },
      { label: 'Revision Comparison', description: 'Side-by-side comparison of drawing revisions' },
    ],
    ctaLabel: 'Request Early Access',
    ctaHref: '/contact',
  },
  {
    slug: 'attendance',
    name: 'SiteSafe',
    tagline: 'Know who\'s on site. Always.',
    description:
      'GPS-verified construction attendance with automated timesheets. Clock in with location proof, log work segments, and export payroll-ready data — all from the field.',
    heroDescription:
      'Construction timesheets are the last paper process on most job sites. SiteSafe replaces clipboards with GPS-verified check-ins. Workers clock in when they arrive (the app confirms they\'re actually on site), log hours by contract and cost code, and submit digital timesheets that flow straight to payroll. Foremen see who\'s on site in real-time.',
    audience: 'Field',
    audienceLabel: 'For Crews & Foremen',
    color: 'from-emerald-600 to-teal-600',
    icon: 'Clock',
    platform: 'iOS & Android (React Native)',
    features: [
      {
        icon: 'MapPin',
        title: 'GPS-Verified Check-In',
        description:
          'Geofenced clock-in confirms the worker is physically at the job site. No more signing in from the parking lot down the street.',
      },
      {
        icon: 'FileSpreadsheet',
        title: 'Digital Timesheets',
        description:
          'Weekly timesheets auto-populated from daily clock-ins. Submit for approval with one tap. Draft → Submitted → Approved.',
      },
      {
        icon: 'Users',
        title: 'Crew Presence Board',
        description:
          'Foremen see who\'s clocked in right now, who\'s missing, and who has unsigned timesheets. Real-time across all sites.',
      },
      {
        icon: 'Calculator',
        title: 'Overtime Automation',
        description:
          'Automatic overtime calculation. Regular, OT, double-time, travel, break, and standby — each with configurable multipliers.',
      },
      {
        icon: 'PenTool',
        title: 'Safety Sign-Off',
        description:
          'Digital signature required at clock-in with safety reminders. Creates a compliance record for every shift.',
      },
      {
        icon: 'Download',
        title: 'Payroll Export',
        description:
          'Export approved timesheets to CSV by contract and cost code. Drops directly into your payroll system.',
      },
    ],
    benefits: [
      'Eliminate timesheet disputes with GPS-verified clock-in/out records',
      'Save 5+ hours/week on manual timesheet processing and data entry',
      'Real-time crew visibility across all active sites',
      'Automatic overtime calculation reduces payroll errors',
      'Digital safety sign-off creates compliance audit trail',
    ],
    useCases: [
      'General contractors tracking crew attendance across 5+ active sites',
      'Subcontractors logging hours by contract and cost code for billing',
      'Foremen monitoring daily crew presence and flagging no-shows',
      'Payroll managers exporting weekly timesheet data for processing',
    ],
    techHighlights: [
      'Expo / React Native with Drizzle ORM + SQLite',
      'Geofencing with Expo Location API',
      'Signature capture for safety compliance',
      'Role-based access: Worker, Foreman, Superintendent, Payroll, Admin',
      'Offline-first with sync queue for unreliable connections',
    ],
    screenshots: [
      { label: 'Clock-In Wizard', description: 'Multi-step check-in with GPS validation and safety sign-off' },
      { label: 'Crew Board', description: 'Real-time view of who is clocked in at each site' },
      { label: 'Timesheet', description: 'Weekly breakdown by site, work type, and hours' },
      { label: 'Reports', description: 'Payroll-ready exports by contract and cost code' },
    ],
    ctaLabel: 'Request Early Access',
    ctaHref: '/contact',
  },
  {
    slug: 'ar-survey',
    name: 'AR Survey',
    tagline: 'See the model. On the real site.',
    description:
      'Augmented reality meets construction surveying. Overlay 3D BIM models onto the physical job site, calibrated to survey control points, for instant visual QA.',
    heroDescription:
      'Walk onto a job site and see the BIM model hovering exactly where it should be — anchored to real survey control points with sub-inch accuracy. AR Survey lets field teams verify as-built conditions against the design model in real-time, capture markup photos with AR overlays, and document discrepancies before they become expensive rework.',
    audience: 'Field',
    audienceLabel: 'For QA Teams & Surveyors',
    color: 'from-purple-600 to-pink-600',
    icon: 'Eye',
    platform: 'iOS & Android (Unity + ARKit/ARCore)',
    features: [
      {
        icon: 'Crosshair',
        title: 'Survey-Grade Calibration',
        description:
          'Register AR to physical control points using SVD-based rigid transformation. RMS error display ensures calibration quality.',
      },
      {
        icon: 'Box',
        title: '3D Model Overlay',
        description:
          'Load GLB, glTF, USDZ, and FBX models. Filter by discipline (structural, MEP, architectural). Adjust opacity and cut planes.',
      },
      {
        icon: 'Camera',
        title: 'AR Screenshot Capture',
        description:
          'Capture photos with the 3D overlay visible. Document what you see — the real site with the model superimposed.',
      },
      {
        icon: 'Ruler',
        title: 'Precision Metrics',
        description:
          'Quality ratings: Excellent (<15mm), Good (<30mm), Acceptable (<50mm). Know exactly how accurate your overlay is.',
      },
      {
        icon: 'Layers',
        title: 'Layer & Discipline Filtering',
        description:
          'Show only structural, only MEP, or all disciplines. Virtual dissection with cut planes to see inside the model.',
      },
      {
        icon: 'WifiOff',
        title: 'Offline Calibration',
        description:
          'Calibrations save locally. Work offline on remote sites. Sync markups and screenshots when back in range.',
      },
    ],
    benefits: [
      'Catch design-to-field discrepancies before concrete is poured',
      'Reduce rework costs by identifying clashes in the field — not after the fact',
      'Visual QA documentation that everyone on the team can understand',
      'Sub-inch accuracy when calibrated to survey control points',
      'Replace "hold the drawing up and squint" with AR overlay',
    ],
    useCases: [
      'QA inspectors verifying rebar placement against structural drawings before a concrete pour',
      'MEP coordinators checking pipe routing in the field against the BIM model',
      'Project managers walking clients through unbuilt spaces using AR visualization',
      'Surveyors validating as-built positions against the design model',
    ],
    techHighlights: [
      'Unity 2022+ with AR Foundation (ARKit + ARCore)',
      'SVD-based Kabsch/Umeyama solver for rigid transformation',
      'PostgreSQL + PostGIS for geospatial queries',
      'Support for GLB, glTF, USDZ, FBX model formats',
      'Coordinate systems: WGS84, ECEF, UTM, State Plane, Local ENU',
    ],
    screenshots: [
      { label: 'AR Model Overlay', description: '3D BIM model anchored to the physical job site' },
      { label: 'Control Point Registration', description: 'Walk calibration points with real-time accuracy feedback' },
      { label: 'Layer Filtering', description: 'Toggle disciplines and adjust opacity for focused inspection' },
      { label: 'AR Screenshot', description: 'Capture and share photos with the model overlay visible' },
    ],
    ctaLabel: 'Request Early Access',
    ctaHref: '/contact',
  },
  {
    slug: 'concrete-pour',
    name: 'PourLog',
    tagline: 'Every pour. Every detail. One tap.',
    description:
      'Field-first concrete pour logging with photo documentation, weather tracking, delay reporting, and instant CSV exports for project records.',
    heroDescription:
      'Concrete doesn\'t wait. When the trucks are rolling, your foreman needs to log the pour fast — not fill out a paper form back at the trailer. PourLog captures everything in under 60 seconds: volume, mix type, supplier, crew size, weather conditions, delays, and photos. At the end of the week, export a clean report by site or contract.',
    audience: 'Field',
    audienceLabel: 'For Foremen & Crews',
    color: 'from-gray-700 to-gray-900',
    icon: 'Droplets',
    platform: 'iOS & Android (React Native)',
    features: [
      {
        icon: 'ClipboardList',
        title: '60-Second Pour Entry',
        description:
          'Multi-step form: site → contract → volume → mix → trucks → weather → photos → done. Designed for gloved hands on a pour deck.',
      },
      {
        icon: 'Camera',
        title: 'Photo Documentation',
        description:
          'Attach up to 5 photos per pour directly from the camera. Visual proof of placement, conditions, and any issues.',
      },
      {
        icon: 'CloudRain',
        title: 'Weather & Delay Tracking',
        description:
          'Log weather conditions at pour time. Flag delays with reason and duration. Build a data-driven picture of what slows your pours.',
      },
      {
        icon: 'BarChart3',
        title: 'Instant Reports',
        description:
          'Real-time dashboards: today\'s pours, weekly volume, monthly stats. Breakdown by site, contract, or time period.',
      },
      {
        icon: 'Download',
        title: 'CSV Export',
        description:
          'Export pour data by date range, site, or contract. Drop directly into project management or accounting systems.',
      },
      {
        icon: 'WifiOff',
        title: 'Offline-First',
        description:
          'SQLite local storage means pours save instantly even with no signal. Sync when connectivity returns.',
      },
    ],
    benefits: [
      'Replace paper pour logs with digital records that never get lost',
      'Photo documentation creates visual proof for quality disputes',
      'Delay tracking identifies patterns to improve pour scheduling',
      'Instant CSV exports eliminate manual data entry for reporting',
      'Volume tracking by site/contract gives accurate cost allocation',
    ],
    useCases: [
      'Concrete contractors logging 5-15 pours per day across multiple sites',
      'General contractors tracking subcontractor concrete volume for billing verification',
      'Project managers monitoring weekly concrete volume against schedule',
      'Quality managers documenting pour conditions for compliance records',
    ],
    techHighlights: [
      'Expo / React Native with Drizzle ORM + SQLite',
      'NativeWind (Tailwind) with dark/light theme',
      'React Hook Form + Zod for validated pour entry',
      'Local-first architecture: works 100% offline',
      'Photo storage with Expo FileSystem',
    ],
    screenshots: [
      { label: 'Dashboard', description: 'Today\'s pours, weekly volume, and recent activity' },
      { label: 'Pour Entry', description: 'Fast multi-step form designed for field conditions' },
      { label: 'Pour List', description: 'Filter by time period or site with volume summaries' },
      { label: 'Reports', description: 'Breakdowns by site, contract, and time period with CSV export' },
    ],
    ctaLabel: 'Request Early Access',
    ctaHref: '/contact',
  },
  {
    slug: 'jsa',
    name: 'JSA',
    tagline: 'Safety docs done before the trucks arrive.',
    description:
      'A full-stack construction management platform: Job Safety Analysis forms, daily field reports, concrete pour tracking, GPS attendance, incident reports, toolbox meetings, and AR visualization — all in one app.',
    heroDescription:
      'JSA is the command center your superintendent wishes they had ten years ago. Two-page safety forms with crew signatures, GPS-verified attendance, concrete pour metrics, real-time weather alerts, material request approval chains, and a georeferenced AR viewer — all wired together so nothing falls through the cracks. Supervisor, foreman, worker, and client dashboards mean everyone sees exactly what they need.',
    audience: 'Field + Office',
    audienceLabel: 'For Supervisors, Foremen & Crews',
    color: 'from-amber-600 to-orange-700',
    icon: 'ClipboardList',
    platform: 'Web + iOS & Android (React Native)',
    features: [
      {
        icon: 'ClipboardList',
        title: 'Two-Page JSA Forms',
        description:
          'Job steps, hazard identification, safety controls, weather tracking, and crew digital signatures — generated as PDF with one tap.',
      },
      {
        icon: 'MapPin',
        title: 'GPS Attendance & Timesheets',
        description:
          'Workers clock in with GPS proof. Foremen see who is on site in real-time. Weekly timesheets flow to supervisor approval.',
      },
      {
        icon: 'Droplets',
        title: 'Concrete Pour Tracking',
        description:
          'Planned vs. actual volume, slump measurements, crew size, pump type, weather conditions, and pour efficiency charts.',
      },
      {
        icon: 'AlertTriangle',
        title: 'Incident & Safety Tickets',
        description:
          'Full incident reports with damage tracking and investigation workflow. Real-time safety violation ticketing.',
      },
      {
        icon: 'Eye',
        title: 'Georeferenced AR Viewer',
        description:
          'Overlay 3D models onto the live camera feed with GPS + accelerometer dead reckoning. Verify as-built against design.',
      },
      {
        icon: 'Camera',
        title: 'Daily Field Reports & Photos',
        description:
          'Categorized photo uploads (safety, progress, issues, quality) with tagging, descriptions, and one-click sharing.',
      },
    ],
    benefits: [
      'One login for safety, attendance, pours, incidents, and field reports — zero duplicate entry',
      'Role-based dashboards: supervisor sees KPIs, foremen manage crews, workers clock in and submit',
      'Automatic PDF generation for JSA forms, toolbox meetings, and incident reports',
      'Real-time weather alerts with wind speed and temperature thresholds',
      'Full audit trail for WSIB, MOL inspections, and insurance compliance',
      'Client dashboard gives owners read-only visibility into project progress',
    ],
    useCases: [
      'Foremen completing JSA forms on their phone before the crew starts work each morning',
      'Supervisors approving material requests, reviewing timesheets, and checking attendance from the office',
      'Safety managers running toolbox meetings with digital attendance and certificate expiry alerts',
      'Concrete supervisors tracking pour volume, slump, and efficiency across multiple active pours',
      'Project managers generating weekly executive summaries and 3-week lookahead schedules',
      'Clients checking the project dashboard for daily progress photos and schedule status',
    ],
    techHighlights: [
      'React 19 + TypeScript 5.8 + Vite 7 (web)',
      'Expo 53 / React Native 0.79 (mobile)',
      'Three.js for 3D building viewer + AR overlay',
      'TanStack React Query + Socket.io real-time',
      'Express 5 + SQLite/PostgreSQL backend',
      'Tesseract.js OCR + Sharp image processing',
      'Recharts + Chart.js data visualization',
      'AWS S3 + Vercel deployment',
    ],
    screenshots: [
      { label: 'Supervisor Dashboard', description: 'Calendar view with JSA forms, daily photos, and project widgets' },
      { label: 'JSA Form', description: 'Two-page safety form with hazards, controls, and crew signatures' },
      { label: 'Concrete Tracker', description: 'Pour metrics, efficiency charts, and crew status in real-time' },
      { label: 'AR Viewer', description: 'Georeferenced 3D model overlay on the live camera feed' },
    ],
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getAppBySlug(slug: string): AppData | undefined {
  return apps.find((a) => a.slug === slug);
}

export function getAllAppSlugs(): string[] {
  return apps.map((a) => a.slug);
}
