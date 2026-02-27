import type { AssemblyDefinition, AssemblyLayer } from './types';

/**
 * Basement Waterproofing Assembly (Ontario)
 *
 * Coordinate system (1 unit ≈ 1 meter):
 *   Origin (0, 0, 0) = ground level, center of exterior wall face
 *   Y-axis: vertical (up = positive)
 *   X-axis: along wall face (left/right)
 *   Z-axis: away from wall (exterior = negative Z)
 *
 * Wall: 6m wide, 3m tall (0.5m above grade, 2.5m below)
 */

const LAYERS: AssemblyLayer[] = [
  // ── Reference ──
  {
    id: 'grade_line',
    label: 'Grade Level',
    description: 'Ground surface — the reference line for all below-grade work.',
    geometry: {
      shape: { type: 'plane', size: [8, 4] },
      position: [0, 0.01, -1.5],
      rotation: [-Math.PI / 2, 0, 0],
    },
    color: '#10b981',
    opacity: 0.25,
    revealedAtStep: 1,
    alwaysVisibleInOverlay: true,
    renderOrder: 10,
    materialProps: { side: 'double', depthWrite: false },
  },

  // ── Structural (revealed by excavation, step 2) ──
  {
    id: 'footing',
    label: 'Concrete Footing',
    description: 'Foundation footing at base of wall — the structural base.',
    geometry: {
      shape: { type: 'box', size: [7, 0.4, 1.0] },
      position: [0, -2.7, -0.1],
    },
    color: '#9ca3af',
    opacity: 1.0,
    revealedAtStep: 2,
  },
  {
    id: 'foundation_wall',
    label: 'Foundation Wall',
    description: 'Concrete foundation wall — 3m tall, 0.25m thick.',
    geometry: {
      shape: { type: 'box', size: [6, 3.0, 0.25] },
      position: [0, -1.0, 0],
    },
    color: '#6b7280',
    opacity: 1.0,
    revealedAtStep: 2,
  },

  // ── Waterproofing layers ──
  {
    id: 'membrane',
    label: 'Rubberized Asphalt Membrane',
    description: 'Main waterproof barrier — 60+ mil thickness, applied footing-to-grade.',
    geometry: {
      shape: { type: 'plane', size: [6, 2.5] },
      position: [0, -1.25, -0.14],
    },
    color: '#1f2937',
    opacity: 0.92,
    revealedAtStep: 4,
    renderOrder: 1,
    materialProps: { side: 'double' },
  },
  {
    id: 'drainage_board',
    label: 'Dimple Drainage Board',
    description: 'Protects membrane and channels water down to weeping tile.',
    geometry: {
      shape: { type: 'plane', size: [6, 2.5] },
      position: [0, -1.25, -0.20],
    },
    color: '#065f46',
    opacity: 0.85,
    revealedAtStep: 5,
    renderOrder: 2,
    materialProps: { side: 'double' },
  },

  // ── Drainage system ──
  {
    id: 'weeping_tile',
    label: 'Weeping Tile (Drain Pipe)',
    description: '4-inch perforated PVC at footing level — carries water to sump or storm.',
    geometry: {
      shape: {
        type: 'cylinder',
        radiusTop: 0.05,
        radiusBottom: 0.05,
        height: 6,
        radialSegments: 16,
      },
      position: [0, -2.55, -0.5],
      rotation: [0, 0, Math.PI / 2],
    },
    color: '#c2410c',
    opacity: 1.0,
    revealedAtStep: 6,
  },
  {
    id: 'gravel_bed',
    label: 'Clear Gravel Bed',
    description: '300mm of clear gravel around weeping tile for drainage.',
    geometry: {
      shape: { type: 'box', size: [6, 0.35, 0.6] },
      position: [0, -2.55, -0.5],
    },
    color: '#a8a29e',
    opacity: 0.6,
    revealedAtStep: 7,
    renderOrder: 3,
    materialProps: { depthWrite: false },
  },
  {
    id: 'filter_fabric',
    label: 'Filter Fabric',
    description: 'Geotextile wrap over gravel — prevents silting of the drain.',
    geometry: {
      shape: { type: 'plane', size: [6, 0.8] },
      position: [0, -2.37, -0.5],
      rotation: [-Math.PI / 2, 0, 0],
    },
    color: '#e5e7eb',
    opacity: 0.5,
    revealedAtStep: 7,
    renderOrder: 4,
    materialProps: { side: 'double', depthWrite: false },
  },

  // ── Backfill (last, semi-transparent so inner layers visible) ──
  {
    id: 'backfill',
    label: 'Compacted Backfill',
    description: 'Soil backfill compacted in 300mm lifts, graded away from foundation.',
    geometry: {
      shape: { type: 'box', size: [6, 2.6, 1.4] },
      position: [0, -1.2, -0.95],
    },
    color: '#78350f',
    opacity: 0.3,
    revealedAtStep: 9,
    renderOrder: 9,
    materialProps: { depthWrite: false },
  },
];

export const WATERPROOFING_ASSEMBLY: AssemblyDefinition = {
  id: 'basement-waterproofing-on',
  tradeType: 'WP',
  name: 'Assembly Viewer',
  layers: LAYERS,
  cameraDefaults: {
    perspective: {
      position: [8, 3, 7],
      target: [0, -1.0, -0.4],
      fov: 45,
    },
    orthographic: {
      position: [0, -0.5, 15],
      target: [0, -0.5, 0],
      frustumSize: 6,
    },
  },
};

/** Layer IDs visible at or before the given step. */
export function getVisibleLayersForStep(stepNumber: number): string[] {
  return LAYERS
    .filter((l) => l.revealedAtStep <= stepNumber || l.alwaysVisibleInOverlay)
    .map((l) => l.id);
}
