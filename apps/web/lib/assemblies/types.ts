// =============================================================================
// Assembly type system — discriminated unions for geometry
// =============================================================================

export interface BoxGeom {
  type: 'box';
  size: [width: number, height: number, depth: number];
}

export interface PlaneGeom {
  type: 'plane';
  size: [width: number, height: number];
}

export interface CylinderGeom {
  type: 'cylinder';
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegments?: number;
}

export type LayerGeometryShape = BoxGeom | PlaneGeom | CylinderGeom;

export interface LayerGeometry {
  shape: LayerGeometryShape;
  position: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number];
}

export interface AssemblyLayer {
  id: string;
  label: string;
  description: string;
  geometry: LayerGeometry;
  color: string; // hex #RRGGBB
  opacity: number;
  revealedAtStep: number;
  /** Always show in overlay mode (e.g. grade line for context) */
  alwaysVisibleInOverlay?: boolean;
  /** Explicit renderOrder for transparency sorting (higher = drawn later) */
  renderOrder?: number;
  /** Material overrides */
  materialProps?: {
    side?: 'front' | 'double';
    depthWrite?: boolean;
  };
}

export interface CameraDefaults {
  position: [x: number, y: number, z: number];
  target: [x: number, y: number, z: number];
}

export interface AssemblyDefinition {
  id: string;
  tradeType: string;
  name: string;
  layers: AssemblyLayer[];
  cameraDefaults: {
    perspective: CameraDefaults & { fov: number };
    orthographic: CameraDefaults & { frustumSize: number };
  };
}
