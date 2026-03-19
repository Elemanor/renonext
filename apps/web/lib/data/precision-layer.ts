/**
 * Precision Layer — Drawing Reader & Markup Platform
 * Pure data file for the product showcase page at /apps/precision-layer
 */

// ============================================================================
// Module Definitions
// ============================================================================

export const precisionLayerModules = [
  {
    id: 'viewer',
    name: 'Blueprint Viewer',
    icon: 'architecture',
    tagline: 'Pixel-perfect drawing at any zoom',
    description:
      'Full-viewport blueprint renderer with pinch-to-zoom, sheet-by-sheet navigation, and RFI overlay pins. Markups live on top of the drawing — never baked into the file.',
    features: [
      'Zoom to 400% with sub-pixel rendering',
      'Sheet navigator (01/24) with thumbnails',
      'RFI callout pins with inline detail cards',
      'Live session indicator for team collaboration',
    ],
  },
  {
    id: 'markup',
    name: 'Markup Engine',
    icon: 'edit_note',
    tagline: 'Annotate, measure, communicate',
    description:
      'Five precision tools — freehand annotate, cloud callout, text labels, measurement ruler, and layer toggle — all accessible from a floating sidebar toolbar.',
    features: [
      'Freehand sketch with pressure sensitivity',
      'Cloud callout bubbles for RFIs',
      'Text labels with auto-snap to grid',
      'Measurement ruler with imperial/metric toggle',
    ],
  },
  {
    id: 'layers',
    name: 'Layer Control',
    icon: 'layers',
    tagline: 'Toggle disciplines, isolate trades',
    description:
      'Structural, HVAC, plumbing, electrical — toggle any discipline on or off with one tap. Layer state persists per session and syncs across devices.',
    features: [
      'Per-discipline visibility toggles',
      'Active layer highlighting with color coding',
      'Layer state synced across team members',
      'Opacity slider for overlay comparison',
    ],
  },
  {
    id: 'projects',
    name: 'Project Hub',
    icon: 'apartment',
    tagline: 'Every blueprint, every revision',
    description:
      'Bento-grid project dashboard with completion tracking, sheet counts, phase labels, and status badges. Archive completed projects for permanent reference.',
    features: [
      'Completion percentage with visual progress bars',
      'Phase-based organization (Foundation, Steel, MEP)',
      'Status badges: Approved, In Progress, Drafting, Archive',
      'Sheet count and revision history per project',
    ],
  },
  {
    id: 'dashboard',
    name: 'Drawing Dashboard',
    icon: 'home',
    tagline: 'Your drawings at a glance',
    description:
      'Recent drawings with thumbnail previews, sheet counts, and markup activity. Active projects with progress bars and quick-access project cards.',
    features: [
      'Recent drawings with thumbnail and metadata',
      'Active project list with completion bars',
      'Full-text search across drawings and markups',
      'Team activity feed with notifications',
    ],
  },
];

// ============================================================================
// Stats
// ============================================================================

export const heroStats = [
  { value: '5', label: 'Modules' },
  { value: '400%', label: 'Max Zoom' },
  { value: '24', label: 'Sheets/Set' },
  { value: 'Real-Time', label: 'Collaboration' },
];

// ============================================================================
// Mock Data — Projects
// ============================================================================

export const mockProjects = [
  {
    name: 'Skyline Residence',
    icon: 'apartment',
    phase: 'Phase 1: Foundation',
    completion: 75,
    sheets: 124,
    status: 'Approved',
  },
  {
    name: 'The Nexus Hub',
    icon: 'hub',
    phase: 'Phase 3: Structural Steel',
    completion: 42,
    sheets: 318,
    status: 'In Progress',
  },
  {
    name: 'Zenith Gallery',
    icon: 'home_work',
    phase: 'Phase 2: Interior MEP',
    completion: 89,
    sheets: 82,
    status: 'In Progress',
  },
  {
    name: 'Vertical Gardens',
    icon: 'park',
    phase: 'Completed Maintenance',
    completion: 100,
    sheets: 942,
    status: 'Archive',
  },
];

// ============================================================================
// Mock Data — Recent Drawings
// ============================================================================

export const recentDrawings = [
  {
    code: 'A-101',
    title: 'Floor Plan',
    updatedBy: 'Mike R.',
    updatedAgo: '2h ago',
    sheets: 12,
    markups: 8,
  },
  {
    code: 'S-202',
    title: 'Foundation Details',
    updatedBy: 'Pending Approval',
    updatedAgo: '',
    sheets: 4,
    flags: 1,
  },
];

// ============================================================================
// Mock Data — Layers
// ============================================================================

export const drawingLayers = [
  { name: 'Structural', visible: true, active: true },
  { name: 'HVAC', visible: true, active: false },
  { name: 'Plumbing', visible: false, active: false },
  { name: 'Electrical', visible: true, active: false },
];

// ============================================================================
// Mock Data — Markup Tools
// ============================================================================

export const markupTools = [
  { icon: 'edit_note', label: 'Annotate', active: true },
  { icon: 'cloud', label: 'Callout', active: false },
  { icon: 'text_fields', label: 'Text', active: false },
  { icon: 'straighten', label: 'Measure', active: false },
  { icon: 'layers', label: 'Layers', active: false },
];
