'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Layers, RotateCcw, Eye } from 'lucide-react';
import type { AssemblyDefinition, LayerGeometryShape } from '@/lib/assemblies/types';
import type { SequenceStep } from '@renonext/shared/types';

type ViewMode = '3d' | 'overlay' | 'section';

export interface AssemblyViewerProps {
  steps: SequenceStep[];
  assembly: AssemblyDefinition;
}

function createGeometry(shape: LayerGeometryShape): THREE.BufferGeometry {
  switch (shape.type) {
    case 'box':
      return new THREE.BoxGeometry(...shape.size);
    case 'plane':
      return new THREE.PlaneGeometry(...shape.size);
    case 'cylinder':
      return new THREE.CylinderGeometry(
        shape.radiusTop,
        shape.radiusBottom,
        shape.height,
        shape.radialSegments ?? 16,
      );
  }
}

export function AssemblyViewer({ steps, assembly }: AssemblyViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [currentStep, setCurrentStep] = useState(1);

  // Mutable refs for RAF loop — avoids stale closures
  const viewModeRef = useRef<ViewMode>(viewMode);
  const currentStepRef = useRef(currentStep);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // Max revealedAtStep in assembly — determines scrubber range
  const maxStep = Math.max(...assembly.layers.map((l) => l.revealedAtStep));
  const stepDots = Array.from(
    { length: Math.min(maxStep, 10) },
    (_, i) => i + 1,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ---- renderer ---- */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x0f172a, 1);
    renderer.sortObjects = true;
    container.appendChild(renderer.domElement);

    /* ---- scene + lights ---- */
    const scene = new THREE.Scene();

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dir1.position.set(5, 8, 5);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dir2.position.set(-3, 2, -4);
    scene.add(dir2);

    /* ---- cameras ---- */
    const { perspective: pDef, orthographic: oDef } = assembly.cameraDefaults;

    const perspCam = new THREE.PerspectiveCamera(pDef.fov, 1, 0.1, 100);
    perspCam.position.set(...pDef.position);

    const orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    orthoCam.position.set(...oDef.position);

    /* ---- controls ---- */
    const controls = new OrbitControls(perspCam, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 25;
    controls.autoRotateSpeed = 1.0;
    controls.target.set(...pDef.target);
    controls.update();

    /* ---- build layer meshes ---- */
    const meshMap = new Map<string, THREE.Mesh>();

    for (const layer of assembly.layers) {
      const geom = createGeometry(layer.geometry.shape);
      const side =
        layer.materialProps?.side === 'double'
          ? THREE.DoubleSide
          : THREE.FrontSide;

      const mat = new THREE.MeshStandardMaterial({
        color: layer.color,
        transparent: layer.opacity < 1,
        opacity: layer.opacity,
        side,
        depthWrite: layer.materialProps?.depthWrite ?? true,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(...layer.geometry.position);

      if (layer.geometry.rotation) {
        mesh.rotation.set(...layer.geometry.rotation);
      }
      if (layer.renderOrder !== undefined) {
        mesh.renderOrder = layer.renderOrder;
      }

      meshMap.set(layer.id, mesh);
      scene.add(mesh);
    }

    /* ---- resize ---- */
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      renderer.setSize(w, h);

      perspCam.aspect = w / h;
      perspCam.updateProjectionMatrix();

      const aspect = w / h;
      const fs = oDef.frustumSize;
      orthoCam.left = (-fs * aspect) / 2;
      orthoCam.right = (fs * aspect) / 2;
      orthoCam.top = fs / 2;
      orthoCam.bottom = -fs / 2;
      orthoCam.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    /* ---- offscreen pause ---- */
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(container);

    /* ---- auto-rotate idle tracking ---- */
    let lastInteraction = Date.now();
    const onInteract = () => {
      lastInteraction = Date.now();
    };
    renderer.domElement.addEventListener('pointerdown', onInteract, {
      passive: true,
    });
    renderer.domElement.addEventListener('wheel', onInteract, {
      passive: true,
    });

    /* ---- animation loop ---- */
    let rafId = 0;
    let prevMode: ViewMode = '3d';

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const mode = viewModeRef.current;
      const step = currentStepRef.current;

      // Detect mode change → switch camera / controls config
      if (mode !== prevMode) {
        if (mode === 'section') {
          controls.object = orthoCam;
          orthoCam.position.set(...oDef.position);
          controls.target.set(...oDef.target);
          controls.enableRotate = false;
          controls.autoRotate = false;
        } else {
          controls.object = perspCam;
          controls.enableRotate = true;
          if (prevMode === 'section') {
            perspCam.position.set(...pDef.position);
            controls.target.set(...pDef.target);
          }
        }
        controls.update();
        prevMode = mode;
      }

      // Layer visibility
      for (const [layerId, mesh] of meshMap) {
        const def = assembly.layers.find((l) => l.id === layerId);
        if (!def) continue;

        if (mode === 'overlay') {
          mesh.visible =
            def.revealedAtStep <= step || !!def.alwaysVisibleInOverlay;
        } else {
          mesh.visible = true;
        }
      }

      // Auto-rotate in 3D mode after 3s idle
      if (mode === '3d') {
        controls.autoRotate = Date.now() - lastInteraction > 3000;
      } else {
        controls.autoRotate = false;
      }

      const activeCam = mode === 'section' ? orthoCam : perspCam;
      controls.update();
      renderer.render(scene, activeCam);
    };
    animate();

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(rafId);
      renderer.domElement.removeEventListener('pointerdown', onInteract);
      renderer.domElement.removeEventListener('wheel', onInteract);
      io.disconnect();
      ro.disconnect();
      controls.dispose();

      for (const mesh of meshMap.values()) {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
      meshMap.clear();

      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [assembly]);

  const TABS: { value: ViewMode; label: string; Icon: typeof RotateCcw }[] = [
    { value: '3d', label: '3D View', Icon: RotateCcw },
    { value: 'overlay', label: 'Step Overlay', Icon: Layers },
    { value: 'section', label: 'Section View', Icon: Eye },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-reno-green" />
        <h2 className="text-lg font-bold text-gray-900">{assembly.name}</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* Tab bar */}
        <div className="flex w-full border-b bg-gray-50/80">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setViewMode(tab.value)}
              className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-medium transition-colors ${
                viewMode === tab.value
                  ? 'border-reno-green bg-white text-reno-green-dark'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Canvas — single instance shared by all modes */}
        <div
          ref={containerRef}
          className="relative aspect-video"
          style={{ touchAction: 'none' }}
        />

        {/* Step scrubber (overlay mode only) */}
        {viewMode === 'overlay' && (
          <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 bg-gray-50/50 px-4 py-3">
            <span className="mr-2 text-[10px] font-medium text-gray-400">
              Step
            </span>
            {stepDots.map((n) => (
              <button
                key={n}
                onClick={() => setCurrentStep(n)}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold transition-all ring-1 ${
                  currentStep === n
                    ? 'bg-reno-green text-white ring-reno-green'
                    : 'text-gray-400 ring-gray-200 hover:bg-reno-green-light hover:text-reno-green-dark hover:ring-reno-green'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
