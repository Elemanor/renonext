// SafetyHub data — construction safety management modules and mock data

export interface SafetyModule {
  name: string;
  icon: string;
  description: string;
  features: string[];
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface JSAFormField {
  step: string;
  hazard: string;
  control: string;
  riskLevel: 'high' | 'medium' | 'low';
}

export interface ToolboxTopic {
  title: string;
  date: string;
  attendees: number;
  presenter: string;
}

export interface CertAlert {
  workerName: string;
  certType: string;
  expiryDate: string;
  daysLeft: number;
  status: 'expired' | 'expiring' | 'valid';
}

export interface IncidentLog {
  id: string;
  title: string;
  date: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'investigating' | 'closed';
  assignee: string;
}

export interface InspectionType {
  name: string;
  icon: string;
  checklistCount: number;
  lastCompleted: string;
}

export const safetyHubModules: SafetyModule[] = [
  {
    name: 'JSA Forms',
    icon: 'assignment',
    description: 'Digital Job Safety Analysis forms with hazard identification and control measures',
    features: [
      'Pre-task hazard assessment',
      'Step-by-step risk breakdown',
      'Photo documentation',
      'Crew sign-off verification'
    ]
  },
  {
    name: 'Toolbox Meetings',
    icon: 'group',
    description: 'Daily safety talks with attendance tracking and topic library',
    features: [
      '500+ pre-written topics',
      'QR code attendance',
      'Photo proof of meetings',
      'Crew acknowledgment'
    ]
  },
  {
    name: 'Incident Reports',
    icon: 'report_problem',
    description: 'Real-time incident logging with root cause analysis and corrective actions',
    features: [
      'Immediate mobile reporting',
      'Photo and witness statements',
      'WSIB integration',
      'Trend analysis dashboard'
    ]
  },
  {
    name: 'Certificate Tracking',
    icon: 'verified',
    description: 'Centralized worker certification management with expiry alerts',
    features: [
      'WHMIS, First Aid, Fall Arrest',
      'Auto-expiry notifications',
      'Document vault storage',
      'Compliance reporting'
    ]
  },
  {
    name: 'Safety Inspections',
    icon: 'fact_check',
    description: 'Site inspections with checklists for equipment, PPE, and site conditions',
    features: [
      'Digital inspection checklists',
      'Pass/fail with photos',
      'Corrective action tracking',
      'Ministry-ready reports'
    ]
  },
  {
    name: 'Crew Sign-Off',
    icon: 'draw',
    description: 'Daily safety acknowledgment with digital signatures',
    features: [
      'Morning hazard review',
      'Digital signature capture',
      'Language support',
      'Audit trail storage'
    ]
  }
];

export const heroStats: HeroStat[] = [
  { label: 'Inspections / Month', value: '1,200+' },
  { label: 'Incidents Prevented', value: '340' },
  { label: 'Cert Compliance', value: '98.5%' },
  { label: 'Sites Covered', value: '85' }
];

export const jsaFormFields: JSAFormField[] = [
  {
    step: 'Excavate foundation trench 8ft deep',
    hazard: 'Trench collapse, buried utilities',
    control: 'Shoring installed, utilities located, spotter assigned',
    riskLevel: 'high'
  },
  {
    step: 'Install formwork and rebar',
    hazard: 'Pinch points, manual handling strain',
    control: 'Gloves worn, team lift for heavy rebar bundles',
    riskLevel: 'medium'
  },
  {
    step: 'Pour concrete foundation',
    hazard: 'Cement burns, truck backup zone',
    control: 'Rubber boots, long sleeves, designated spotter',
    riskLevel: 'medium'
  },
  {
    step: 'Strip forms and backfill',
    hazard: 'Falling forms, soil collapse',
    control: 'Hard hats, gradual backfill, keep edge clear',
    riskLevel: 'low'
  }
];

export const toolboxTopics: ToolboxTopic[] = [
  { title: 'Ladder Safety and Three-Point Contact', date: '2026-03-19', attendees: 12, presenter: 'Mike Torres' },
  { title: 'Heat Stress Recognition and Prevention', date: '2026-03-18', attendees: 15, presenter: 'Sarah Chen' },
  { title: 'Electrical Hazards and Lockout/Tagout', date: '2026-03-17', attendees: 9, presenter: 'James Park' },
  { title: 'Fall Protection for Roof Work', date: '2026-03-16', attendees: 11, presenter: 'Mike Torres' }
];

export const certAlerts: CertAlert[] = [
  { workerName: 'David Kim', certType: 'WHMIS 2015', expiryDate: '2026-03-15', daysLeft: -5, status: 'expired' },
  { workerName: 'Maria Santos', certType: 'Fall Arrest', expiryDate: '2026-03-25', daysLeft: 5, status: 'expiring' },
  { workerName: 'John Ibrahim', certType: 'First Aid Level 2', expiryDate: '2026-04-02', daysLeft: 13, status: 'expiring' },
  { workerName: 'Alex Chen', certType: 'Forklift Operator', expiryDate: '2026-09-14', daysLeft: 178, status: 'valid' },
  { workerName: 'Lisa Wong', certType: 'Confined Space', expiryDate: '2027-01-20', daysLeft: 306, status: 'valid' }
];

export const incidentLog: IncidentLog[] = [
  {
    id: 'INC-2026-047',
    title: 'Minor laceration to hand from sheet metal edge',
    date: '2026-03-18',
    severity: 'minor',
    status: 'closed',
    assignee: 'Sarah Chen'
  },
  {
    id: 'INC-2026-046',
    title: 'Near-miss: unsecured ladder shifted during climb',
    date: '2026-03-17',
    severity: 'major',
    status: 'investigating',
    assignee: 'Mike Torres'
  },
  {
    id: 'INC-2026-045',
    title: 'Electrical shock from damaged extension cord',
    date: '2026-03-15',
    severity: 'critical',
    status: 'investigating',
    assignee: 'James Park'
  }
];

export const inspectionTypes: InspectionType[] = [
  { name: 'Ladder Inspection', icon: 'stairs', checklistCount: 12, lastCompleted: '2026-03-19' },
  { name: 'Scaffold Inspection', icon: 'construction', checklistCount: 18, lastCompleted: '2026-03-18' },
  { name: 'Excavation Safety', icon: 'terrain', checklistCount: 15, lastCompleted: '2026-03-17' },
  { name: 'Electrical Safety', icon: 'electrical_services', checklistCount: 22, lastCompleted: '2026-03-19' },
  { name: 'Fall Protection', icon: 'safety_check', checklistCount: 14, lastCompleted: '2026-03-16' },
  { name: 'PPE Compliance', icon: 'health_and_safety', checklistCount: 8, lastCompleted: '2026-03-19' }
];
