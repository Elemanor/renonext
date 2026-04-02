'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface DeckModelViewerProps {
  widthFt?: number;
  depthFt?: number;
  deckHeight?: number;
  skpDownloadUrl?: string;
}

interface DeckLayer {
  name: string;
  label: string;
  group: THREE.Group;
}

export function DeckModelViewer({
  widthFt = 8,
  depthFt = 10,
  deckHeight = 2,
  skpDownloadUrl,
}: DeckModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const layersRef = useRef<DeckLayer[]>([]);
  const animationFrameRef = useRef<number>(0);

  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    { id: 1, label: 'Footings' },
    { id: 2, label: 'Posts' },
    { id: 3, label: 'Beams' },
    { id: 4, label: 'Joists' },
    { id: 5, label: 'Deck Boards' },
    { id: 6, label: 'Railing' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(12, 8, 12);
    camera.lookAt(widthFt / 2, deckHeight, depthFt / 2);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xf0f4f8);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.target.set(widthFt / 2, deckHeight, depthFt / 2);
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    scene.add(hemisphereLight);

    // Build deck layers
    const layers: DeckLayer[] = [];

    // Step 1: Ground & Footings
    const footingsGroup = new THREE.Group();
    footingsGroup.name = 'footings';

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a7c59,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    footingsGroup.add(ground);

    // Concrete footings (4 corners, inset 1ft from deck edges)
    const footingRadius = 0.83 / 2; // 10" diameter
    const footingHeight = 1;
    const footingGeometry = new THREE.CylinderGeometry(footingRadius, footingRadius, footingHeight, 16);
    const footingMaterial = new THREE.MeshStandardMaterial({
      color: 0xa0a0a0,
      roughness: 0.7,
    });

    const footingPositions = [
      [1, 1], // front-left
      [widthFt - 1, 1], // front-right
      [1, depthFt - 1], // back-left
      [widthFt - 1, depthFt - 1], // back-right
    ];

    footingPositions.forEach(([x, z]) => {
      const footing = new THREE.Mesh(footingGeometry, footingMaterial);
      footing.position.set(x, footingHeight / 2, z);
      footing.castShadow = true;
      footing.receiveShadow = true;
      footingsGroup.add(footing);
    });

    scene.add(footingsGroup);
    layers.push({ name: 'footings', label: 'Footings', group: footingsGroup });

    // Step 2: Posts
    const postsGroup = new THREE.Group();
    postsGroup.name = 'posts';

    const postSize = 0.292; // 4x4"
    const postHeight = deckHeight - footingHeight - 0.625; // to bottom of beam
    const postGeometry = new THREE.BoxGeometry(postSize, postHeight, postSize);
    const postMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b9044,
      roughness: 0.6,
    });

    footingPositions.forEach(([x, z]) => {
      const post = new THREE.Mesh(postGeometry, postMaterial);
      post.position.set(x, footingHeight + postHeight / 2, z);
      post.castShadow = true;
      postsGroup.add(post);
    });

    postsGroup.visible = false;
    scene.add(postsGroup);
    layers.push({ name: 'posts', label: 'Posts', group: postsGroup });

    // Step 3: Beams
    const beamsGroup = new THREE.Group();
    beamsGroup.name = 'beams';

    const beamWidth = 0.25; // 2x8" doubled
    const beamHeight = 0.625;
    const beamLength = widthFt;
    const beamY = deckHeight - beamHeight / 2;
    const beamGeometry = new THREE.BoxGeometry(beamLength, beamHeight, beamWidth);
    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0x9a8244,
      roughness: 0.65,
    });

    // Front beam
    const frontBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    frontBeam.position.set(widthFt / 2, beamY, 1);
    frontBeam.castShadow = true;
    beamsGroup.add(frontBeam);

    // Back beam
    const backBeam = new THREE.Mesh(beamGeometry, beamMaterial);
    backBeam.position.set(widthFt / 2, beamY, depthFt - 1);
    backBeam.castShadow = true;
    beamsGroup.add(backBeam);

    beamsGroup.visible = false;
    scene.add(beamsGroup);
    layers.push({ name: 'beams', label: 'Beams', group: beamsGroup });

    // Step 4: Joists
    const joistsGroup = new THREE.Group();
    joistsGroup.name = 'joists';

    const joistWidth = 0.125; // 2x8"
    const joistHeight = 0.625;
    const joistLength = depthFt;
    const joistSpacing = 1.333; // 16" on center
    const joistCount = Math.floor(widthFt / joistSpacing) + 1;
    const joistGeometry = new THREE.BoxGeometry(joistWidth, joistHeight, joistLength);
    const joistMaterial = new THREE.MeshStandardMaterial({
      color: 0x9a8244,
      roughness: 0.65,
    });

    for (let i = 0; i < joistCount; i++) {
      const joist = new THREE.Mesh(joistGeometry, joistMaterial);
      joist.position.set(i * joistSpacing, beamY, depthFt / 2);
      joist.castShadow = true;
      joistsGroup.add(joist);
    }

    joistsGroup.visible = false;
    scene.add(joistsGroup);
    layers.push({ name: 'joists', label: 'Joists', group: joistsGroup });

    // Step 5: Deck Boards
    const deckBoardsGroup = new THREE.Group();
    deckBoardsGroup.name = 'deckBoards';

    const boardThickness = 0.083; // 5/4"
    const boardWidth = 0.458; // 6"
    const boardLength = widthFt;
    const boardGap = 0.01;
    const deckSurfaceY = deckHeight + boardThickness / 2;
    const boardCount = Math.floor(depthFt / (boardWidth + boardGap));
    const boardGeometry = new THREE.BoxGeometry(boardLength, boardThickness, boardWidth);
    const boardMaterial = new THREE.MeshStandardMaterial({
      color: 0xb5873a,
      roughness: 0.7,
    });

    for (let i = 0; i < boardCount; i++) {
      const board = new THREE.Mesh(boardGeometry, boardMaterial);
      board.position.set(widthFt / 2, deckSurfaceY, i * (boardWidth + boardGap) + boardWidth / 2);
      board.castShadow = true;
      board.receiveShadow = true;
      deckBoardsGroup.add(board);
    }

    deckBoardsGroup.visible = false;
    scene.add(deckBoardsGroup);
    layers.push({ name: 'deckBoards', label: 'Deck Boards', group: deckBoardsGroup });

    // Step 6: Railing
    const railingGroup = new THREE.Group();
    railingGroup.name = 'railing';

    const railingPostSize = 0.292; // 4x4"
    const railingHeight = 3;
    const railingPostY = deckHeight + boardThickness + railingHeight / 2;
    const railingPostGeometry = new THREE.BoxGeometry(railingPostSize, railingHeight, railingPostSize);
    const railingMaterial = new THREE.MeshStandardMaterial({
      color: 0xc49b4a,
      roughness: 0.6,
    });

    // Corner posts
    const cornerPositions = [
      [0, 0],
      [widthFt, 0],
      [0, depthFt],
      [widthFt, depthFt],
    ];

    cornerPositions.forEach(([x, z]) => {
      const post = new THREE.Mesh(railingPostGeometry, railingMaterial);
      post.position.set(x, railingPostY, z);
      post.castShadow = true;
      railingGroup.add(post);
    });

    // Middle posts on each side
    const middlePostsPositions = [
      [widthFt / 2, 0], // front middle
      [widthFt / 2, depthFt], // back middle
      [0, depthFt / 2], // left middle
      [widthFt, depthFt / 2], // right middle
    ];

    middlePostsPositions.forEach(([x, z]) => {
      const post = new THREE.Mesh(railingPostGeometry, railingMaterial);
      post.position.set(x, railingPostY, z);
      post.castShadow = true;
      railingGroup.add(post);
    });

    // Top rail
    const topRailWidth = 0.125; // 2x6"
    const topRailHeight = 0.458;
    const topRailY = deckHeight + boardThickness + railingHeight - topRailHeight / 2;

    // Front rail
    const frontRailGeometry = new THREE.BoxGeometry(widthFt, topRailHeight, topRailWidth);
    const frontRail = new THREE.Mesh(frontRailGeometry, railingMaterial);
    frontRail.position.set(widthFt / 2, topRailY, 0);
    frontRail.castShadow = true;
    railingGroup.add(frontRail);

    // Back rail
    const backRail = new THREE.Mesh(frontRailGeometry, railingMaterial);
    backRail.position.set(widthFt / 2, topRailY, depthFt);
    backRail.castShadow = true;
    railingGroup.add(backRail);

    // Side rails
    const sideRailGeometry = new THREE.BoxGeometry(topRailWidth, topRailHeight, depthFt);
    const leftRail = new THREE.Mesh(sideRailGeometry, railingMaterial);
    leftRail.position.set(0, topRailY, depthFt / 2);
    leftRail.castShadow = true;
    railingGroup.add(leftRail);

    const rightRail = new THREE.Mesh(sideRailGeometry, railingMaterial);
    rightRail.position.set(widthFt, topRailY, depthFt / 2);
    rightRail.castShadow = true;
    railingGroup.add(rightRail);

    // Balusters
    const balusterSize = 0.125; // 2x2"
    const balusterHeight = 2.5;
    const balusterSpacing = 0.333; // 4"
    const balusterY = deckHeight + boardThickness + balusterHeight / 2;
    const balusterGeometry = new THREE.BoxGeometry(balusterSize, balusterHeight, balusterSize);

    // Front balusters
    const frontBalusterCount = Math.floor(widthFt / balusterSpacing);
    for (let i = 1; i < frontBalusterCount; i++) {
      const baluster = new THREE.Mesh(balusterGeometry, railingMaterial);
      baluster.position.set(i * balusterSpacing, balusterY, 0);
      baluster.castShadow = true;
      railingGroup.add(baluster);
    }

    // Back balusters
    for (let i = 1; i < frontBalusterCount; i++) {
      const baluster = new THREE.Mesh(balusterGeometry, railingMaterial);
      baluster.position.set(i * balusterSpacing, balusterY, depthFt);
      baluster.castShadow = true;
      railingGroup.add(baluster);
    }

    // Left balusters
    const sideBalusterCount = Math.floor(depthFt / balusterSpacing);
    for (let i = 1; i < sideBalusterCount; i++) {
      const baluster = new THREE.Mesh(balusterGeometry, railingMaterial);
      baluster.position.set(0, balusterY, i * balusterSpacing);
      baluster.castShadow = true;
      railingGroup.add(baluster);
    }

    // Right balusters
    for (let i = 1; i < sideBalusterCount; i++) {
      const baluster = new THREE.Mesh(balusterGeometry, railingMaterial);
      baluster.position.set(widthFt, balusterY, i * balusterSpacing);
      baluster.castShadow = true;
      railingGroup.add(baluster);
    }

    railingGroup.visible = false;
    scene.add(railingGroup);
    layers.push({ name: 'railing', label: 'Railing', group: railingGroup });

    layersRef.current = layers;

    // Show only first step initially
    setCurrentStep(1);
    updateVisibility(1);

    // Animation loop
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !camera || !renderer) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();

      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      // Dispose of all geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [widthFt, depthFt, deckHeight]);

  function updateVisibility(step: number) {
    layersRef.current.forEach((layer, index) => {
      const shouldBeVisible = index < step;

      if (shouldBeVisible && !layer.group.visible) {
        // Fade in
        layer.group.visible = true;
        layer.group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.MeshStandardMaterial;
            material.transparent = true;
            material.opacity = 0;

            const startTime = Date.now();
            const fadeDuration = 300;

            function fadeIn() {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / fadeDuration, 1);
              material.opacity = progress;

              if (progress < 1) {
                requestAnimationFrame(fadeIn);
              } else {
                material.transparent = false;
                material.opacity = 1;
              }
            }
            fadeIn();
          }
        });
      } else if (!shouldBeVisible && layer.group.visible) {
        // Fade out
        layer.group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.MeshStandardMaterial;
            material.transparent = true;

            const startTime = Date.now();
            const fadeDuration = 300;

            function fadeOut() {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / fadeDuration, 1);
              material.opacity = 1 - progress;

              if (progress < 1) {
                requestAnimationFrame(fadeOut);
              } else {
                layer.group.visible = false;
              }
            }
            fadeOut();
          }
        });
      }
    });
  }

  function handleStepClick(step: number) {
    setCurrentStep(step);
    updateVisibility(step);
  }

  function handleBuildAll() {
    setCurrentStep(6);
    updateVisibility(6);
  }

  function handleReset() {
    setCurrentStep(1);
    updateVisibility(1);
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full aspect-video min-h-[400px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => handleStepClick(step.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              currentStep >= step.id
                ? 'bg-[#0fbabd] text-white border-[#0fbabd]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-[#0fbabd]'
            }`}
          >
            {step.id}. {step.label}
          </button>
        ))}

        <button
          onClick={handleBuildAll}
          className="px-4 py-2 rounded-lg text-sm font-medium border bg-[#0fbabd] text-white border-[#0fbabd] hover:bg-[#0da8ab] transition-all"
        >
          Build All
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg text-sm font-medium border bg-white text-slate-700 border-slate-200 hover:border-[#0fbabd] transition-all"
        >
          Reset
        </button>

        {skpDownloadUrl && (
          <a
            href={skpDownloadUrl}
            download
            className="px-4 py-2 rounded-lg text-sm font-medium border bg-white text-slate-700 border-slate-200 hover:border-[#0fbabd] transition-all inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Download SketchUp File
          </a>
        )}
      </div>
    </div>
  );
}
