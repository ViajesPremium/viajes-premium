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
    image: "/vision/assets/dest-europa.jpg",
    caption: "Europa",
    rotate: 4,
    href: "/europa-premium",
  },
  {
    id: "polaroid-corea",
    location: [37.57, 126.98],
    image: "/vision/assets/dest-corea.jpg",
    caption: "Corea",
    rotate: -3,
    href: "/corea-premium",
  },
  {
    id: "polaroid-canada",
    location: [45.42, -75.69],
    image: "/vision/assets/dest-canada.jpg",
    caption: "Canada",
    rotate: 6,
    href: "/canada-premium",
  },
  {
    id: "polaroid-peru",
    location: [-13.52, -71.97],
    image: "/vision/assets/dest-peru.jpg",
    caption: "Peru",
    rotate: -4,
    href: "/peru-premium",
  },
  {
    id: "polaroid-mexico",
    location: [19.43, -99.13],
    image: "/vision/assets/dest-yucatan.jpg",
    caption: "Mexico",
    rotate: 3,
    href: "/yucatan-premium",
  },
  {
    id: "polaroid-barrancas",
    location: [28.19, -108.23],
    image: "/vision/assets/dest-barrancas.jpg",
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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
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
    const mapTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    );
    const bumpTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
    );

    mapTexture.colorSpace = THREE.SRGBColorSpace;
    mapTexture.minFilter = THREE.LinearMipmapLinearFilter;
    mapTexture.magFilter = THREE.LinearFilter;
    mapTexture.generateMipmaps = true;
    mapTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    bumpTexture.colorSpace = THREE.NoColorSpace;
    bumpTexture.minFilter = THREE.LinearMipmapLinearFilter;
    bumpTexture.magFilter = THREE.LinearFilter;
    bumpTexture.generateMipmaps = true;
    bumpTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const [r, g, b] = baseColor;
    const detail = Math.max(
      64,
      Math.min(256, Math.floor(Math.sqrt(mapSamples) * 1.5)),
    );

    const globeMat = new THREE.MeshStandardMaterial({
      map: mapTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.025,
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

    const glowGeom = new THREE.SphereGeometry(1.05, 96, 96);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(glowColor[0], glowColor[1], glowColor[2]),
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeom, glowMat);
    globeGroup.add(glow);

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

    let lastScrollY = window.scrollY;
    let lenisCleanup: (() => void) | null = null;

    const pushScrollImpulse = (deltaY: number) => {
      if (!deltaY) return;
      scrollVelocityRef.current += deltaY * Math.max(0.004, rotationSpeed * 0.08);
      scrollVelocityRef.current = Math.max(
        -2.2,
        Math.min(2.2, scrollVelocityRef.current),
      );
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY;
      lastScrollY = currentY;
      pushScrollImpulse(deltaY);
    };

    const onWheel = (event: WheelEvent) => {
      pushScrollImpulse(event.deltaY);
    };

    wrapper.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    const lenis = (
      window as unknown as {
        __lenis?: {
          on?: (event: string, cb: (payload: { velocity?: number }) => void) => void;
          off?: (event: string, cb: (payload: { velocity?: number }) => void) => void;
        };
      }
    ).__lenis;

    if (lenis?.on) {
      const onLenisScroll = (payload: { velocity?: number }) => {
        const velocity = payload?.velocity ?? 0;
        pushScrollImpulse(velocity * 24);
      };
      lenis.on("scroll", onLenisScroll);
      lenisCleanup = () => lenis.off?.("scroll", onLenisScroll);
    }

    const resize = () => {
      const size = wrapper.clientWidth;
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    resize();

    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      const dt = clock.getDelta();
      if (!isDraggingRef.current) {
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

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    wrapper.classList.add(styles.canvasVisible);

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      wrapper.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      lenisCleanup?.();
      renderer.dispose();
      globeMesh.geometry.dispose();
      globeMat.dispose();
      glowGeom.dispose();
      glowMat.dispose();
      markerMat.dispose();
      mapTexture.dispose();
      bumpTexture.dispose();
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
