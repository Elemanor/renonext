import type { JobStatus } from '@renonext/shared/types';

// ========== Interfaces ==========

export interface ProCertification {
  name: string;
  issuer: string;
  expiryDate: string;
  verified: boolean;
}

export interface ProTraining {
  name: string;
  completedDate: string;
  expiryDate: string;
  provider: string;
}

export interface AssignedPro {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  certifications: ProCertification[];
  trainings: ProTraining[];
  licenseNumber: string;
  insured: boolean;
}

export interface TimelineEvent {
  id: string;
  type:
    | 'posted'
    | 'ai_priced'
    | 'accepted'
    | 'pro_signed_in'
    | 'task_started'
    | 'photo_uploaded'
    | 'task_completed'
    | 'pro_signed_out'
    | 'materials_delivered'
    | 'completed'
    | 'approved';
  title: string;
  description: string;
  timestamp: string;
}

export interface JobTask {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedDate: string;
  completedDate: string | null;
  photos: { url: string; caption: string; timestamp: string }[];
}

export interface WeeklySchedule {
  [day: string]: { start: string; end: string } | null;
}

export interface SignInRecord {
  date: string;
  signIn: string;
  signOut: string | null;
  hoursOnSite: number | null;
}

export interface Material {
  id: string;
  name: string;
  quantity: string;
  status: 'ordered' | 'delivered' | 'installed';
  deliveryDate: string | null;
}

export interface MockBid {
  id: string;
  proName: string;
  proAvatar: string;
  proRating: number;
  proReviewCount: number;
  proCertifications: string[];
  amount: number;
  estimatedHours: number;
  message: string;
  createdAt: string;
}

export interface DetailedJob {
  id: string;
  title: string;
  description: string;
  category: string;
  status: JobStatus;
  city: string;
  address: string;
  postalCode: string;
  createdAt: string;
  budgetMin: number | null;
  budgetMax: number | null;
  isUrgent: boolean;
  photos: string[];
  // AI pricing
  aiPriceMin: number | null;
  aiPriceMax: number | null;
  aiConfidence: 'high' | 'medium' | null;
  aiLaborEstimate: number | null;
  aiMaterialEstimate: number | null;
  aiPlatformFee: number | null;
  // Pro assignment
  assignedPro: AssignedPro | null;
  // Timeline
  timeline: TimelineEvent[];
  // Tasks
  tasks: JobTask[];
  // Schedule
  schedule: WeeklySchedule;
  // Sign-in/out
  signInLog: SignInRecord[];
  // Materials
  materials: Material[];
  // Bids
  bids: MockBid[];
  // Completion
  totalCost: number | null;
  totalHours: number | null;
  isApproved: boolean;
  reviewRating: number | null;
  reviewComment: string | null;
  clientName: string;
}

// ========== Mock Pro ==========

const mockPro: AssignedPro = {
  id: 'pro-1',
  name: 'Marcus Johnson',
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&crop=face',
  rating: 4.9,
  reviewCount: 127,
  yearsExperience: 15,
  certifications: [
    {
      name: 'Licensed Electrician (309A)',
      issuer: 'Ontario College of Trades',
      expiryDate: '2027-03-15',
      verified: true,
    },
    {
      name: 'Master Plumber',
      issuer: 'Ontario College of Trades',
      expiryDate: '2026-11-20',
      verified: true,
    },
    {
      name: 'General Contractor License',
      issuer: 'City of Toronto',
      expiryDate: '2026-06-01',
      verified: true,
    },
  ],
  trainings: [
    {
      name: 'WHMIS',
      completedDate: '2025-01-10',
      expiryDate: '2026-01-10',
      provider: 'SafetyFirst Canada',
    },
    {
      name: 'Confined Spaces',
      completedDate: '2025-02-15',
      expiryDate: '2028-02-15',
      provider: 'Ontario Safety Training',
    },
    {
      name: 'Working at Heights',
      completedDate: '2025-03-01',
      expiryDate: '2028-03-01',
      provider: 'Heights Safety Inc.',
    },
    {
      name: 'Fall Protection',
      completedDate: '2025-03-01',
      expiryDate: '2028-03-01',
      provider: 'Heights Safety Inc.',
    },
    {
      name: 'First Aid & CPR',
      completedDate: '2025-04-20',
      expiryDate: '2028-04-20',
      provider: 'St. John Ambulance',
    },
  ],
  licenseNumber: 'ON-EC-2024-78432',
  insured: true,
};

// ========== Mock Jobs ==========

const mockJobs: DetailedJob[] = [
  // 1. Draft - just posted, no AI price yet
  {
    id: '1',
    title: 'Fix leaking kitchen faucet',
    description:
      'The kitchen faucet has been dripping constantly for the past week. It seems to be coming from the base of the faucet when the water is turned on. The faucet is a Moen single-handle model, about 5 years old.',
    category: 'Plumbing',
    status: 'draft',
    city: 'Toronto',
    address: '123 Queen St W',
    postalCode: 'M5H 2N2',
    createdAt: '2026-02-08T09:00:00Z',
    budgetMin: null,
    budgetMax: null,
    isUrgent: false,
    photos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&fit=crop',
    ],
    aiPriceMin: null,
    aiPriceMax: null,
    aiConfidence: null,
    aiLaborEstimate: null,
    aiMaterialEstimate: null,
    aiPlatformFee: null,
    assignedPro: null,
    timeline: [
      {
        id: 'tl-1',
        type: 'posted',
        title: 'Job Posted',
        description: 'You posted this job',
        timestamp: '2026-02-08T09:00:00Z',
      },
    ],
    tasks: [],
    schedule: {
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
    },
    signInLog: [],
    materials: [],
    bids: [],
    totalCost: null,
    totalHours: null,
    isApproved: false,
    reviewRating: null,
    reviewComment: null,
    clientName: 'Alex Thompson',
  },

  // 2. Bidding - AI priced, waiting for pro
  {
    id: '2',
    title: 'Install new light fixtures in living room',
    description:
      'Need to replace 3 existing ceiling light fixtures with new pendant lights. The wiring is already in place. Fixtures are purchased and ready. Living room has 9-foot ceilings.',
    category: 'Electrical',
    status: 'bidding',
    city: 'Toronto',
    address: '456 King St E',
    postalCode: 'M5A 1L6',
    createdAt: '2026-02-06T14:30:00Z',
    budgetMin: 200,
    budgetMax: 500,
    isUrgent: false,
    photos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&fit=crop',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&fit=crop',
    ],
    aiPriceMin: 280,
    aiPriceMax: 420,
    aiConfidence: 'high',
    aiLaborEstimate: 240,
    aiMaterialEstimate: 60,
    aiPlatformFee: 35,
    assignedPro: null,
    timeline: [
      {
        id: 'tl-2a',
        type: 'posted',
        title: 'Job Posted',
        description: 'You posted this job',
        timestamp: '2026-02-06T14:30:00Z',
      },
      {
        id: 'tl-2b',
        type: 'ai_priced',
        title: 'AI Price Estimate',
        description: 'Estimated range: $280 – $420',
        timestamp: '2026-02-06T14:30:05Z',
      },
    ],
    tasks: [],
    schedule: {
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
    },
    signInLog: [],
    materials: [],
    bids: [
      {
        id: 'bid-1',
        proName: 'Marcus Johnson',
        proAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&crop=face',
        proRating: 4.9,
        proReviewCount: 127,
        proCertifications: [
          'Licensed Electrician',
          'WHMIS',
          'Working at Heights',
        ],
        amount: 350,
        estimatedHours: 3,
        message:
          "I've done hundreds of fixture installations. I can have this done in one visit. Price includes all labor and cleanup.",
        createdAt: '2026-02-06T16:00:00Z',
      },
      {
        id: 'bid-2',
        proName: 'Sarah Chen',
        proAvatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop&crop=face',
        proRating: 5.0,
        proReviewCount: 89,
        proCertifications: ['Licensed Electrician', 'WHMIS'],
        amount: 310,
        estimatedHours: 4,
        message:
          "Happy to help with this project. I'll ensure all fixtures are properly secured and wired to code.",
        createdAt: '2026-02-06T17:30:00Z',
      },
      {
        id: 'bid-3',
        proName: 'David Park',
        proAvatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop&crop=face',
        proRating: 4.8,
        proReviewCount: 203,
        proCertifications: [
          'Licensed Electrician',
          'WHMIS',
          'Confined Spaces',
        ],
        amount: 395,
        estimatedHours: 2.5,
        message:
          'I specialize in lighting installations. Quick turnaround with premium workmanship guaranteed.',
        createdAt: '2026-02-07T08:00:00Z',
      },
    ],
    totalCost: null,
    totalHours: null,
    isApproved: false,
    reviewRating: null,
    reviewComment: null,
    clientName: 'Alex Thompson',
  },

  // 3. Accepted - pro accepted, scheduling
  {
    id: '3',
    title: 'Paint master bedroom and hallway',
    description:
      'Looking to repaint the master bedroom (14x12 ft) and upstairs hallway. Walls need minor patching before painting. Color TBD but leaning towards warm neutral tones. Ceiling height is 8 ft.',
    category: 'Painting',
    status: 'accepted',
    city: 'Mississauga',
    address: '789 Dundas St W',
    postalCode: 'L5B 1T6',
    createdAt: '2026-02-03T10:00:00Z',
    budgetMin: 400,
    budgetMax: 800,
    isUrgent: false,
    photos: [
      'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&fit=crop',
    ],
    aiPriceMin: 520,
    aiPriceMax: 750,
    aiConfidence: 'medium',
    aiLaborEstimate: 480,
    aiMaterialEstimate: 120,
    aiPlatformFee: 55,
    assignedPro: { ...mockPro, name: 'Sarah Chen', id: 'pro-2', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop&crop=face', rating: 5.0, reviewCount: 89, yearsExperience: 8 },
    timeline: [
      {
        id: 'tl-3a',
        type: 'posted',
        title: 'Job Posted',
        description: 'You posted this job',
        timestamp: '2026-02-03T10:00:00Z',
      },
      {
        id: 'tl-3b',
        type: 'ai_priced',
        title: 'AI Price Estimate',
        description: 'Estimated range: $520 – $750',
        timestamp: '2026-02-03T10:00:05Z',
      },
      {
        id: 'tl-3c',
        type: 'accepted',
        title: 'Pro Accepted',
        description: 'Sarah Chen accepted the job',
        timestamp: '2026-02-04T11:00:00Z',
      },
    ],
    tasks: [],
    schedule: {
      Monday: { start: '9:00 AM', end: '4:00 PM' },
      Tuesday: { start: '9:00 AM', end: '4:00 PM' },
      Wednesday: null,
      Thursday: null,
      Friday: null,
    },
    signInLog: [],
    materials: [
      {
        id: 'mat-1',
        name: 'Benjamin Moore Regal Select Paint (2 gal)',
        quantity: '2 gallons',
        status: 'ordered',
        deliveryDate: '2026-02-10',
      },
      {
        id: 'mat-2',
        name: 'Painter\'s Tape & Drop Cloths',
        quantity: '1 kit',
        status: 'ordered',
        deliveryDate: '2026-02-10',
      },
      {
        id: 'mat-3',
        name: 'Drywall Patch Compound',
        quantity: '1 tub',
        status: 'ordered',
        deliveryDate: '2026-02-10',
      },
    ],
    bids: [],
    totalCost: null,
    totalHours: null,
    isApproved: false,
    reviewRating: null,
    reviewComment: null,
    clientName: 'Alex Thompson',
  },

  // 4. In Progress - active job with tasks, photos, sign-in logs
  {
    id: '4',
    title: 'Emergency pipe burst repair',
    description:
      'A pipe burst in the basement utility room overnight. There is standing water about 2 inches deep. The burst appears to be on a copper pipe running along the ceiling. Need immediate repair and water cleanup.',
    category: 'Plumbing',
    status: 'in_progress',
    city: 'Toronto',
    address: '321 Yonge St',
    postalCode: 'M5B 1R8',
    createdAt: '2026-02-01T07:00:00Z',
    budgetMin: null,
    budgetMax: null,
    isUrgent: true,
    photos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&fit=crop',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&fit=crop',
    ],
    aiPriceMin: 850,
    aiPriceMax: 1200,
    aiConfidence: 'medium',
    aiLaborEstimate: 680,
    aiMaterialEstimate: 220,
    aiPlatformFee: 95,
    assignedPro: mockPro,
    timeline: [
      {
        id: 'tl-4a',
        type: 'posted',
        title: 'Job Posted',
        description: 'You posted this job',
        timestamp: '2026-02-01T07:00:00Z',
      },
      {
        id: 'tl-4b',
        type: 'ai_priced',
        title: 'AI Price Estimate',
        description: 'Estimated range: $850 – $1,200',
        timestamp: '2026-02-01T07:00:05Z',
      },
      {
        id: 'tl-4c',
        type: 'accepted',
        title: 'Pro Matched',
        description: 'Marcus Johnson accepted the emergency job',
        timestamp: '2026-02-01T07:45:00Z',
      },
      {
        id: 'tl-4d',
        type: 'materials_delivered',
        title: 'Materials Ready',
        description: 'All required materials confirmed on-hand',
        timestamp: '2026-02-02T07:30:00Z',
      },
      {
        id: 'tl-4e',
        type: 'pro_signed_in',
        title: 'Pro On Site',
        description: 'Marcus signed in at the job site',
        timestamp: '2026-02-02T08:02:00Z',
      },
      {
        id: 'tl-4f',
        type: 'task_started',
        title: 'Work Started',
        description: 'Water extraction and pipe assessment began',
        timestamp: '2026-02-02T08:15:00Z',
      },
      {
        id: 'tl-4g',
        type: 'photo_uploaded',
        title: 'Progress Photo',
        description: 'Photo of damaged pipe section uploaded',
        timestamp: '2026-02-02T09:30:00Z',
      },
      {
        id: 'tl-4h',
        type: 'task_completed',
        title: 'Task Completed',
        description: 'Water extraction completed',
        timestamp: '2026-02-02T10:00:00Z',
      },
    ],
    tasks: [
      {
        id: 'task-1',
        name: 'Water extraction & site assessment',
        status: 'completed',
        assignedDate: '2026-02-02',
        completedDate: '2026-02-02',
        photos: [
          {
            url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&fit=crop',
            caption: 'Before — standing water in utility room',
            timestamp: '2026-02-02T08:15:00Z',
          },
          {
            url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&fit=crop',
            caption: 'After extraction — floor drying',
            timestamp: '2026-02-02T10:00:00Z',
          },
        ],
      },
      {
        id: 'task-2',
        name: 'Replace burst pipe section',
        status: 'in_progress',
        assignedDate: '2026-02-02',
        completedDate: null,
        photos: [
          {
            url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&fit=crop',
            caption: 'Damaged pipe section identified',
            timestamp: '2026-02-02T10:30:00Z',
          },
        ],
      },
      {
        id: 'task-3',
        name: 'Pressure test & leak check',
        status: 'pending',
        assignedDate: '2026-02-02',
        completedDate: null,
        photos: [],
      },
      {
        id: 'task-4',
        name: 'Cleanup & final inspection',
        status: 'pending',
        assignedDate: '2026-02-02',
        completedDate: null,
        photos: [],
      },
    ],
    schedule: {
      Monday: { start: '8:00 AM', end: '4:00 PM' },
      Tuesday: { start: '8:00 AM', end: '4:00 PM' },
      Wednesday: { start: '8:00 AM', end: '12:00 PM' },
      Thursday: null,
      Friday: null,
    },
    signInLog: [
      {
        date: '2026-02-02',
        signIn: '8:02 AM',
        signOut: '4:15 PM',
        hoursOnSite: 8.2,
      },
      {
        date: '2026-02-03',
        signIn: '8:10 AM',
        signOut: '3:45 PM',
        hoursOnSite: 7.6,
      },
      {
        date: '2026-02-04',
        signIn: '8:05 AM',
        signOut: null,
        hoursOnSite: null,
      },
    ],
    materials: [
      {
        id: 'mat-4',
        name: '3/4" Copper Pipe (6 ft)',
        quantity: '2 sections',
        status: 'installed',
        deliveryDate: '2026-02-02',
      },
      {
        id: 'mat-5',
        name: 'Copper Fittings & Solder Kit',
        quantity: '1 kit',
        status: 'installed',
        deliveryDate: '2026-02-02',
      },
      {
        id: 'mat-6',
        name: 'Industrial Dehumidifier Rental',
        quantity: '1 unit',
        status: 'delivered',
        deliveryDate: '2026-02-02',
      },
      {
        id: 'mat-7',
        name: 'Pipe Insulation Wrap',
        quantity: '10 ft',
        status: 'ordered',
        deliveryDate: '2026-02-05',
      },
    ],
    bids: [],
    totalCost: null,
    totalHours: null,
    isApproved: false,
    reviewRating: null,
    reviewComment: null,
    clientName: 'Alex Thompson',
  },

  // 5. Completed - done, pending approval
  {
    id: '5',
    title: 'Bathroom exhaust fan replacement',
    description:
      'The bathroom exhaust fan stopped working and needs to be replaced. Current fan is a standard ceiling-mount unit. Would like a quieter model with a humidity sensor.',
    category: 'Electrical',
    status: 'completed',
    city: 'Toronto',
    address: '555 Bloor St W',
    postalCode: 'M5S 1Y5',
    createdAt: '2026-01-20T12:00:00Z',
    budgetMin: 150,
    budgetMax: 350,
    isUrgent: false,
    photos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&fit=crop',
    ],
    aiPriceMin: 220,
    aiPriceMax: 320,
    aiConfidence: 'high',
    aiLaborEstimate: 180,
    aiMaterialEstimate: 85,
    aiPlatformFee: 28,
    assignedPro: mockPro,
    timeline: [
      {
        id: 'tl-5a',
        type: 'posted',
        title: 'Job Posted',
        description: 'You posted this job',
        timestamp: '2026-01-20T12:00:00Z',
      },
      {
        id: 'tl-5b',
        type: 'ai_priced',
        title: 'AI Price Estimate',
        description: 'Estimated range: $220 – $320',
        timestamp: '2026-01-20T12:00:05Z',
      },
      {
        id: 'tl-5c',
        type: 'accepted',
        title: 'Pro Matched',
        description: 'Marcus Johnson accepted the job',
        timestamp: '2026-01-21T09:00:00Z',
      },
      {
        id: 'tl-5d',
        type: 'materials_delivered',
        title: 'Materials Delivered',
        description: 'Panasonic WhisperCeiling fan delivered',
        timestamp: '2026-01-24T10:00:00Z',
      },
      {
        id: 'tl-5e',
        type: 'pro_signed_in',
        title: 'Pro On Site',
        description: 'Marcus signed in',
        timestamp: '2026-01-25T09:00:00Z',
      },
      {
        id: 'tl-5f',
        type: 'task_completed',
        title: 'Installation Complete',
        description: 'New exhaust fan installed and tested',
        timestamp: '2026-01-25T12:30:00Z',
      },
      {
        id: 'tl-5g',
        type: 'pro_signed_out',
        title: 'Pro Left Site',
        description: 'Marcus signed out after cleanup',
        timestamp: '2026-01-25T13:00:00Z',
      },
      {
        id: 'tl-5h',
        type: 'completed',
        title: 'Job Completed',
        description: 'All tasks finished, awaiting approval',
        timestamp: '2026-01-25T13:05:00Z',
      },
    ],
    tasks: [
      {
        id: 'task-5',
        name: 'Remove old exhaust fan',
        status: 'completed',
        assignedDate: '2026-01-25',
        completedDate: '2026-01-25',
        photos: [
          {
            url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&fit=crop',
            caption: 'Before — old fan unit',
            timestamp: '2026-01-25T09:15:00Z',
          },
        ],
      },
      {
        id: 'task-6',
        name: 'Install new Panasonic WhisperCeiling fan',
        status: 'completed',
        assignedDate: '2026-01-25',
        completedDate: '2026-01-25',
        photos: [
          {
            url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&fit=crop',
            caption: 'After — new fan installed and running',
            timestamp: '2026-01-25T12:00:00Z',
          },
        ],
      },
      {
        id: 'task-7',
        name: 'Test humidity sensor & airflow',
        status: 'completed',
        assignedDate: '2026-01-25',
        completedDate: '2026-01-25',
        photos: [],
      },
    ],
    schedule: {
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
    },
    signInLog: [
      {
        date: '2026-01-25',
        signIn: '9:00 AM',
        signOut: '1:00 PM',
        hoursOnSite: 4.0,
      },
    ],
    materials: [
      {
        id: 'mat-8',
        name: 'Panasonic WhisperCeiling DC Fan',
        quantity: '1 unit',
        status: 'installed',
        deliveryDate: '2026-01-24',
      },
      {
        id: 'mat-9',
        name: 'Flexible Duct (4")',
        quantity: '6 ft',
        status: 'installed',
        deliveryDate: '2026-01-24',
      },
      {
        id: 'mat-10',
        name: 'Wire Connectors & Mounting Kit',
        quantity: '1 kit',
        status: 'installed',
        deliveryDate: '2026-01-24',
      },
    ],
    bids: [],
    totalCost: 285,
    totalHours: 4.0,
    isApproved: false,
    reviewRating: null,
    reviewComment: null,
    clientName: 'Alex Thompson',
  },

  // 6. Completed + Approved - with review
  {
    id: '6',
    title: 'Spring yard cleanup & landscaping',
    description:
      'Full spring cleanup: rake leaves, trim hedges, edge lawn, mulch garden beds. Front and back yard, approximately 3000 sq ft total.',
    category: 'Landscaping',
    status: 'completed',
    city: 'Toronto',
    address: '100 Spadina Ave',
    postalCode: 'M5V 2K1',
    createdAt: '2026-01-05T08:00:00Z',
    budgetMin: 200,
    budgetMax: 400,
    isUrgent: false,
    photos: [
      'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&fit=crop',
    ],
    aiPriceMin: 250,
    aiPriceMax: 380,
    aiConfidence: 'high',
    aiLaborEstimate: 240,
    aiMaterialEstimate: 60,
    aiPlatformFee: 30,
    assignedPro: {
      ...mockPro,
      id: 'pro-3',
      name: 'David Park',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 203,
      yearsExperience: 12,
    },
    timeline: [
      {
        id: 'tl-6a',
        type: 'posted',
        title: 'Job Posted',
        description: 'You posted this job',
        timestamp: '2026-01-05T08:00:00Z',
      },
      {
        id: 'tl-6b',
        type: 'ai_priced',
        title: 'AI Price Estimate',
        description: 'Estimated range: $250 – $380',
        timestamp: '2026-01-05T08:00:05Z',
      },
      {
        id: 'tl-6c',
        type: 'accepted',
        title: 'Pro Matched',
        description: 'David Park accepted the job',
        timestamp: '2026-01-06T10:00:00Z',
      },
      {
        id: 'tl-6d',
        type: 'pro_signed_in',
        title: 'Pro On Site',
        description: 'David signed in',
        timestamp: '2026-01-10T08:30:00Z',
      },
      {
        id: 'tl-6e',
        type: 'completed',
        title: 'Job Completed',
        description: 'All tasks finished',
        timestamp: '2026-01-10T16:00:00Z',
      },
      {
        id: 'tl-6f',
        type: 'approved',
        title: 'Job Approved',
        description: 'Client approved and released payment',
        timestamp: '2026-01-11T09:00:00Z',
      },
    ],
    tasks: [
      {
        id: 'task-8',
        name: 'Rake leaves & debris cleanup',
        status: 'completed',
        assignedDate: '2026-01-10',
        completedDate: '2026-01-10',
        photos: [
          {
            url: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&fit=crop',
            caption: 'Before — leaf-covered yard',
            timestamp: '2026-01-10T08:45:00Z',
          },
          {
            url: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600&fit=crop',
            caption: 'After — clean yard',
            timestamp: '2026-01-10T12:00:00Z',
          },
        ],
      },
      {
        id: 'task-9',
        name: 'Trim hedges & edge lawn',
        status: 'completed',
        assignedDate: '2026-01-10',
        completedDate: '2026-01-10',
        photos: [],
      },
      {
        id: 'task-10',
        name: 'Mulch garden beds',
        status: 'completed',
        assignedDate: '2026-01-10',
        completedDate: '2026-01-10',
        photos: [],
      },
    ],
    schedule: {
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
    },
    signInLog: [
      {
        date: '2026-01-10',
        signIn: '8:30 AM',
        signOut: '4:00 PM',
        hoursOnSite: 7.5,
      },
    ],
    materials: [
      {
        id: 'mat-11',
        name: 'Cedar Mulch',
        quantity: '10 bags',
        status: 'installed',
        deliveryDate: '2026-01-10',
      },
      {
        id: 'mat-12',
        name: 'Lawn Edging Stakes',
        quantity: '20 pcs',
        status: 'installed',
        deliveryDate: '2026-01-10',
      },
    ],
    bids: [],
    totalCost: 330,
    totalHours: 7.5,
    isApproved: true,
    reviewRating: 5,
    reviewComment:
      'David did an amazing job! The yard looks completely transformed. He was punctual, professional, and thorough. Highly recommend.',
    clientName: 'Alex Thompson',
  },
];

// ========== Helper Functions ==========

export function getJobById(id: string): DetailedJob | undefined {
  return mockJobs.find((job) => job.id === id);
}

export function getJobsByClient(): DetailedJob[] {
  return mockJobs;
}

export function getJobsByPro(proId: string): DetailedJob[] {
  return mockJobs.filter(
    (job) => job.assignedPro?.id === proId && ['accepted', 'in_progress', 'completed'].includes(job.status)
  );
}

export function getJobTimeline(id: string): TimelineEvent[] {
  const job = getJobById(id);
  return job?.timeline ?? [];
}

export function getAvailableJobsForPro(): DetailedJob[] {
  return mockJobs.filter((job) =>
    ['posted', 'bidding'].includes(job.status)
  );
}

export { mockJobs };
