"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import styles from "./cobe-globe-polaroids.module.css";

export interface PolaroidMarker {
  id: string;
  location: [number, number];
  image: string;
  caption: string;
  rotate: number;
  href?: string;
}

type RGBColor = [number, number, number];

export interface GlobePolaroidsProps {
  markers?: PolaroidMarker[];
  className?: string;
  rotationSpeed?: number;
  initialPhi?: number;
  initialTheta?: number;
  dark?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: RGBColor;
  markerColor?: RGBColor;
  glowColor?: RGBColor;
  opacity?: number;
  markerSize?: number;
  markerElevation?: number;
  /** Límite del devicePixelRatio. Reducir en mobile para aliviar la GPU. */
  maxPixelRatio?: number;
  /** Desactivar antialiasing. Recomendado en mobile (ahorra ~2× GPU). */
  antialias?: boolean;
  /** Omitir bump map. Ahorra una texture fetch por fragmento + memoria. */
  disableBumpMap?: boolean;
  /** Segmentos máximos de la esfera. En mobile usar 48. */
  maxGeometryDetail?: number;
  /** Hint al driver WebGL para usar GPU eficiente. */
  powerPreference?: "default" | "high-performance" | "low-power";
}

const defaultMarkers: PolaroidMarker[] = [
  {
    id: "polaroid-japon",
    location: [35.68, 139.65],
    image: "/images/japon/hero/japanHero.jpg",
    caption: "Japon",
    rotate: -5,
    href: "/japon-premium",
  },
  {
    id: "polaroid-europa",
    location: [48.86, 2.35],
    image: "/images/viajes-premium/destinos/europa/europa-premium-1.webp",
    caption: "Europa",
    rotate: 4,
    href: "/europa-premium",
  },
  {
    id: "polaroid-corea",
    location: [37.57, 126.98],
    image: "/images/viajes-premium/destinos/corea/corea-premium-1.webp",
    caption: "Corea",
    rotate: -3,
    href: "/corea-premium",
  },
  {
    id: "polaroid-canada",
    location: [45.42, -75.69],
    image: "/images/viajes-premium/destinos/canada/canada-premium-1.webp",
    caption: "Canada",
    rotate: 6,
    href: "/canada-premium",
  },
  {
    id: "polaroid-peru",
    location: [-13.52, -71.97],
    image: "/images/viajes-premium/destinos/peru/peru-premium-1.webp",
    caption: "Peru",
    rotate: -4,
    href: "/peru-premium",
  },
  {
    id: "polaroid-mexico",
    location: [19.43, -99.13],
    image: "/images/viajes-premium/destinos/yucatan/yucatan-premium-1.webp",
    caption: "Mexico",
    rotate: 3,
    href: "/yucatan-premium",
  },
  {
    id: "polaroid-barrancas",
    location: [28.19, -108.23],
    image: "/images/viajes-premium/destinos/barrancas/barrancas-premium-1.webp",
    caption: "Barrancas",
    rotate: -2,
    href: "/barrancas-premium",
  },
];

function latLonToVector3(
  lat: number,
  lon: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function GlobePolaroids({
  markers = defaultMarkers,
  className = "",
  rotationSpeed = 0.16,
  initialPhi = 0,
  initialTheta = 0.2,
  dark = 0,
  diffuse = 0.05,
  mapSamples = 32000,
  mapBrightness = 0.7,
  baseColor = [1, 1, 1],
  markerColor = [0.75, 0.75, 0.75],
  glowColor = [0.88, 0.88, 0.88],
  opacity = 0.96,
  markerSize = 0.016,
  markerElevation = 0,
  maxPixelRatio = 2,
  antialias = true,
  disableBumpMap = false,
  maxGeometryDetail = 256,
  powerPreference = "default",
}: GlobePolaroidsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const dragVelocityRef = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);

  const markerVectors = useMemo(
    () =>
      markers.map((m) => ({
        id: m.id,
        pos: latLonToVector3(m.location[0], m.location[1], 1 + markerElevation),
      })),
    [markers, markerElevation],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias, alpha: true, powerPreference });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrapper.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(
      0xffffff,
      Math.max(0.15, 0.7 - dark),
    );
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 1.15 + diffuse);
    dir.position.set(2.6, 1.8, 3.2);
    scene.add(dir);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = initialTheta;
    globeGroup.rotation.y = initialPhi;
    scene.add(globeGroup);

    const textureLoader = new THREE.TextureLoader();
    const mapTexture = textureLoader.load("/images/globe/globe-texture.png");

    mapTexture.colorSpace = THREE.SRGBColorSpace;
    mapTexture.minFilter = THREE.LinearFilter;
    mapTexture.magFilter = THREE.LinearFilter;
    mapTexture.generateMipmaps = false;
    // En mobile limitamos anisotropía a 1 para ahorrar GPU; en desktop máxima calidad
    mapTexture.anisotropy = disableBumpMap ? 1 : renderer.capabilities.getMaxAnisotropy();

    const [r, g, b] = baseColor;
    const detail = Math.max(
      32,
      Math.min(maxGeometryDetail, Math.floor(Math.sqrt(mapSamples) * 1.5)),
    );

    let bumpTexture: THREE.Texture | null = null;
    if (!disableBumpMap) {
      bumpTexture = textureLoader.load("/images/globe/earth-texture.png");
      bumpTexture.colorSpace = THREE.NoColorSpace;
      bumpTexture.minFilter = THREE.LinearMipmapLinearFilter;
      bumpTexture.magFilter = THREE.LinearFilter;
      bumpTexture.generateMipmaps = true;
      bumpTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }

    const globeMat = new THREE.MeshStandardMaterial({
      map: mapTexture,
      ...(bumpTexture ? { bumpMap: bumpTexture, bumpScale: 0.025 } : {}),
      color: new THREE.Color(r, g, b),
      roughness: 0.9 - Math.min(0.55, mapBrightness * 0.35),
      metalness: 0.02,
      transparent: true,
      opacity,
    });

    const globeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, detail, detail),
      globeMat,
    );
    globeGroup.add(globeMesh);

    const markerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(markerColor[0], markerColor[1], markerColor[2]),
      transparent: true,
      opacity: 0.95,
    });

    markerVectors.forEach((m) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(Math.max(0.008, markerSize * 0.55), 18, 18),
        markerMat,
      );
      dot.position.copy(m.pos);
      globeGroup.add(dot);
    });

    const onPointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      dragVelocityRef.current = { x: 0, y: 0 };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = event.clientX - lastPointerRef.current.x;
      const dy = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };

      const vx = dx * 0.0048;
      const vy = dy * 0.0032;
      dragVelocityRef.current = { x: vx, y: vy };
      globeGroup.rotation.y += vx;
      globeGroup.rotation.x += vy;
      globeGroup.rotation.x = Math.max(
        -0.95,
        Math.min(0.95, globeGroup.rotation.x),
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    wrapper.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const resize = () => {
      const size = wrapper.clientWidth;
      // true → Three.js también actualiza canvas.style.width/height al tamaño
      // lógico (size px), mientras el buffer interno usa size × dpr para nitidez.
      // Con false el canvas se mostraba a size×dpr px y se desbordaba del contenedor.
      renderer.setSize(size, size, true);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;

    // Pausar render cuando el globo sale de la viewport (ahorra batería en mobile)
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(wrapper);

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!visible) return;
      const dt = clock.getDelta();
      if (!isDraggingRef.current) {
        // Rotacion autonoma muy sutil, constante.
        globeGroup.rotation.y += rotationSpeed * dt * 0.12;
        globeGroup.rotation.y +=
          scrollVelocityRef.current * dt + dragVelocityRef.current.x * dt * 8;
        globeGroup.rotation.x += dragVelocityRef.current.y * dt * 6;
        globeGroup.rotation.x = Math.max(
          -0.95,
          Math.min(0.95, globeGroup.rotation.x),
        );
        scrollVelocityRef.current *= 0.94;
        dragVelocityRef.current.x *= 0.92;
        dragVelocityRef.current.y *= 0.9;
      }

      renderer.render(scene, camera);
      markerVectors.forEach((m) => {
        const el = overlayRefs.current[m.id];
        if (!el) return;

        const worldPos = m.pos.clone().applyEuler(globeGroup.rotation);
        const projected = worldPos.clone().project(camera);

        const isVisible = projected.z < 1 && worldPos.z > -0.1;
        if (!isVisible) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          return;
        }

        const x = (projected.x * 0.5 + 0.5) * wrapper.clientWidth;
        const y = (-projected.y * 0.5 + 0.5) * wrapper.clientHeight;

        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      });

    };

    frame = requestAnimationFrame(animate);
    wrapper.classList.add(styles.canvasVisible);

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      wrapper.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      globeMesh.geometry.dispose();
      globeMat.dispose();
      markerMat.dispose();
      mapTexture.dispose();
      bumpTexture?.dispose();
      wrapper.removeChild(renderer.domElement);
    };
  }, [
    markerVectors,
    rotationSpeed,
    initialPhi,
    initialTheta,
    dark,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
    opacity,
    markerSize,
  ]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div ref={wrapperRef} className={styles.canvas} />
      {markers.map((m) => (
        <a
          key={m.id}
          href={m.href ?? "#"}
          aria-label={`Ir a ${m.caption}`}
          className={styles.polaroid}
          style={
            {
              transform: `translate(-50%, -100%) rotate(${m.rotate}deg)`,
            } as CSSProperties
          }
          ref={(el) => {
            overlayRefs.current[m.id] = el;
          }}
        >
          <img src={m.image} alt={m.caption} className={styles.polaroidImage} />
          <span className={styles.polaroidCaption}>{m.caption}</span>
        </a>
      ))}
    </div>
  );
}
