"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import styles from "./heroOverlay.module.css";

// ====================================================================
// CONFIGURACIÓN DEL EFECTO (Parámetros ajustables)
// ====================================================================
const TRAIL_LENGTH = 16;         // Cantidad de gotas de agua que forman la "cola" o estela al mover el ratón.
const SPLASH_LENGTH = 16;        // Cantidad de gotitas sueltas (salpicaduras) cuando mueves el ratón muy rápido.
const MAX_PIXEL_RATIO = 2;       // Límite de resolución (2 es ideal). Evita sobrecalentar celulares de gama alta.

const MAX_RADIUS = 0.2;          // Tamaño máximo de la mancha de agua principal bajo el cursor (0.2 = 20% de la pantalla).
const BLOB_COLOR = "#000000";    // Color de la mancha (actualmente negro).
const BLOB_OPACITY = 0.2;        // Nivel de transparencia de la mancha (0 a 1). 0.2 es sutil y elegante.
const TRAIL_SHRINK_SPEED = 0.3;  // Velocidad a la que desaparece la estela. Mayor número = desaparece más rápido.
const TRAIL_DROP_DISTANCE = 0.005; // Distancia que debes mover el cursor para que caiga una nueva gota de estela.
const VELOCITY_MULTIPLIER = 6;   // Multiplicador de tamaño: entre más rápido muevas el cursor, más crece la mancha.
const SPLASH_SHRINK_SPEED = 0.6; // Qué tan rápido se evaporan las salpicaduras pequeñas.
const SPLASH_VELOCITY_DAMPING = 0.94; // Fricción de las salpicaduras (qué tan rápido se frenan tras salir disparadas).
const MOUSE_STIFFNESS = 90;      // Rapidez con la que la mancha persigue al cursor (mayor = más pegado al ratón).
const MOUSE_DAMPING = 0.15;      // Inercia/Suavidad del movimiento del ratón.
const RADIUS_STIFFNESS = 8;      // Rapidez con la que la mancha se agranda/encoje (elasticidad).

const SAMURAI_IMG = "/images/japon/hero/samuraiHero.webp";

// ====================================================================
// SHADERS
// ====================================================================
const vertexShader = `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_radius;
  uniform float u_time;
  
  uniform vec4 u_imageBounds; 
  
  uniform vec3 u_blobColor;
  uniform float u_blobOpacity;
  uniform float u_hoverState;
  
  uniform vec2 u_trailPositions[${TRAIL_LENGTH}];
  uniform float u_trailSizes[${TRAIL_LENGTH}];

  uniform vec2 u_splashPositions[${SPLASH_LENGTH}];
  uniform float u_splashSizes[${SPLASH_LENGTH}];

  varying vec2 v_uv;

  vec3 hash33(vec3 p) {
    p = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p.zxy, p.yxz + 19.27);
    return fract(vec3(p.x * p.y, p.z * p.x, p.y * p.z));
  }

  float simplex_noise(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K2 * 2.0);
    vec3 d3 = d0 - (1.0 - 3.0 * K2);
    vec3 x0 = d0;
    vec3 x1 = d1;
    vec3 x2 = d2;
    vec3 x3 = d3;
    vec4 h = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    vec4 n = h * h * h * h * vec4(
      dot(x0, hash33(i) * 2.0 - 1.0),
      dot(x1, hash33(i + i1) * 2.0 - 1.0),
      dot(x2, hash33(i + i2) * 2.0 - 1.0),
      dot(x3, hash33(i + 1.0) * 2.0 - 1.0)
    );
    return 0.5 + 0.5 * 31.0 * dot(n, vec4(1.0));
  }

  void main() {
    vec2 uv = v_uv;
    float screenAspect = u_resolution.x / u_resolution.y;

    vec2 correctedUV = uv;
    correctedUV.x *= screenAspect;
    vec2 correctedMouse = u_mouse;
    correctedMouse.x *= screenAspect;

    float wave1 = simplex_noise(vec3(correctedUV * 2.0, u_time * 0.4));
    float wave2 = simplex_noise(vec3(correctedUV * 2.5 + 42.0, u_time * 0.5));
    float microNoise = simplex_noise(vec3(correctedUV * 8.0 - vec2(0.0, u_time * 1.5), u_time * 0.7));
    
    vec2 warpOffset = vec2(wave1 - 0.5, wave2 - 0.5) * 0.16;
    warpOffset += vec2(microNoise - 0.5) * 0.02;

    vec2 warpedUV = correctedUV + warpOffset;
    float energy = 0.0;
    
    if (u_radius > 0.001) {
      float mainDist = length(warpedUV - correctedMouse);
      if (mainDist < u_radius) {
        float x = mainDist / u_radius;
        energy += (1.0 - x*x) * (1.0 - x*x); 
      }
    }

    for (int i = 0; i < ${TRAIL_LENGTH}; i++) {
      float dropR = u_trailSizes[i];
      if (dropR > 0.001) {
        vec2 tPos = u_trailPositions[i];
        tPos.x *= screenAspect;
        float dropDist = length(warpedUV - tPos);
        if (dropDist < dropR) {
          float x = dropDist / dropR;
          energy += (1.0 - x*x) * (1.0 - x*x);
        }
      }
    }

    for (int i = 0; i < ${SPLASH_LENGTH}; i++) {
      float dropR = u_splashSizes[i];
      if (dropR > 0.001) {
        vec2 sPos = u_splashPositions[i];
        sPos.x *= screenAspect;
        float dropDist = length(warpedUV - sPos);
        if (dropDist < dropR) {
          float x = dropDist / dropR;
          energy += (1.0 - x*x) * (1.0 - x*x);
        }
      }
    }

    float mask = smoothstep(0.28, 0.32, energy);

    // [MODIFICACIÓN CLAVE] Usamos 'uv' original sin distorsionar para que el Samurai se vea perfecto
    vec2 imgCoord = (uv - u_imageBounds.xy) / u_imageBounds.zw;
    float insideImage = step(0.0, imgCoord.x) * step(imgCoord.x, 1.0) *
                        step(0.0, imgCoord.y) * step(imgCoord.y, 1.0);

    vec4 tex = vec4(0.0);
    if (insideImage > 0.5) {
        tex = texture2D(u_texture, imgCoord);
    }

    float showTexture = u_hoverState * insideImage;
    vec3 finalColor = mix(u_blobColor, tex.rgb, showTexture * tex.a);
    float finalAlpha = mix(u_blobOpacity, 1.0, showTexture * tex.a) * mask;

    finalColor = pow(finalColor, vec3(1.0 / 2.2));

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

type ShaderUniforms = {
  u_texture: { value: THREE.Texture };
  u_mouse: { value: THREE.Vector2 };
  u_resolution: { value: THREE.Vector2 };
  u_radius: { value: number };
  u_time: { value: number };
  u_imageBounds: { value: THREE.Vector4 }; 
  u_blobColor: { value: THREE.Color };
  u_blobOpacity: { value: number };
  u_hoverState: { value: number };
  u_trailPositions: { value: THREE.Vector2[] };
  u_trailSizes: { value: number[] };
  u_splashPositions: { value: THREE.Vector2[] };
  u_splashSizes: { value: number[] };
};

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export default function HeroOverlay() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const samuraiPosRef = useRef<HTMLDivElement | null>(null);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const uniformsRef = useRef<ShaderUniforms | null>(null);
  const animationRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);

  const targetHoverStateRef = useRef(0);
  const currentHoverStateRef = useRef(0);

  const trailPositionsRef = useRef(Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector2(-10, -10)));
  const trailSizesRef = useRef<number[]>(new Array(TRAIL_LENGTH).fill(0));
  const trailIndexRef = useRef(0);
  const lastDropPosRef = useRef(new THREE.Vector2(-10, -10));

  const splashPositionsRef = useRef(Array.from({ length: SPLASH_LENGTH }, () => new THREE.Vector2(-10, -10)));
  const splashVelocitiesRef = useRef(Array.from({ length: SPLASH_LENGTH }, () => new THREE.Vector2(0, 0)));
  const splashSizesRef = useRef<number[]>(new Array(SPLASH_LENGTH).fill(0));
  const splashIndexRef = useRef(0);

  const targetMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const smoothMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseVelocityRef = useRef(new THREE.Vector2(0, 0));
  const smoothVelocityRef = useRef(new THREE.Vector2(0, 0));

  const [shouldBootWebGL, setShouldBootWebGL] = useState(false);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const container = rootRef.current; 
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const rawX = (event.clientX - rect.left) / rect.width;
    const rawY = 1 - (event.clientY - rect.top) / rect.height;
    targetMouseRef.current.set(clamp01(rawX), clamp01(rawY));
    targetHoverStateRef.current = 1;
  }, []);

  const handlePointerEnter = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(event);
  }, [handlePointerMove]);

  const handlePointerLeave = useCallback(() => {
    targetHoverStateRef.current = 0;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShouldBootWebGL(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldBootWebGL) return;

    const fullContainer = canvasContainerRef.current;
    if (!fullContainer) return;

    let disposed = false;
    let resizeObserver: ResizeObserver | null = null;
    const loader = new THREE.TextureLoader();

    loader.load(SAMURAI_IMG, (texture: THREE.Texture) => {
      if (disposed) return;

      texture.colorSpace = THREE.SRGBColorSpace;
      const width = Math.max(fullContainer.clientWidth, 1);
      const height = Math.max(fullContainer.clientHeight, 1);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms: ShaderUniforms = {
        u_texture: { value: texture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_radius: { value: 0 },
        u_time: { value: 0 },
        u_imageBounds: { value: new THREE.Vector4(0, 0, 1, 1) }, 
        u_blobColor: { value: new THREE.Color(BLOB_COLOR) },
        u_blobOpacity: { value: BLOB_OPACITY },
        u_hoverState: { value: 0 },
        u_trailPositions: { value: trailPositionsRef.current },
        u_trailSizes: { value: trailSizesRef.current },
        u_splashPositions: { value: splashPositionsRef.current },
        u_splashSizes: { value: splashSizesRef.current },
      };

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        uniforms, vertexShader, fragmentShader, transparent: true, depthTest: false, depthWrite: false,
      });

      scene.add(new THREE.Mesh(geometry, material));

      const renderer = new THREE.WebGLRenderer({
        antialias: false, alpha: true, powerPreference: "high-performance",
      });

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
      renderer.setSize(width, height);

      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      fullContainer.innerHTML = "";
      fullContainer.appendChild(renderer.domElement);

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      uniformsRef.current = uniforms;

      renderer.compile(scene, camera);
      clockRef.current = new THREE.Clock();

      const updateBounds = () => {
        if (!uniformsRef.current || !rootRef.current || !samuraiPosRef.current) return;
        const containerRect = rootRef.current.getBoundingClientRect();
        const samuraiRect = samuraiPosRef.current.getBoundingClientRect();
        const normX = (samuraiRect.left - containerRect.left) / containerRect.width;
        const normY = (containerRect.bottom - samuraiRect.bottom) / containerRect.height;
        const normW = samuraiRect.width / containerRect.width;
        const normH = samuraiRect.height / containerRect.height;
        uniformsRef.current.u_imageBounds.value.set(normX, normY, normW, normH);
      };

      resizeObserver = new ResizeObserver(() => {
        if (!rendererRef.current || !uniformsRef.current) return;
        const nextWidth = Math.max(fullContainer.clientWidth, 1);
        const nextHeight = Math.max(fullContainer.clientHeight, 1);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
        rendererRef.current.setSize(nextWidth, nextHeight, false);
        uniformsRef.current.u_resolution.value.set(nextWidth, nextHeight);
        updateBounds();
      });

      resizeObserver.observe(fullContainer);
      if (samuraiPosRef.current) resizeObserver.observe(samuraiPosRef.current);
      updateBounds();

      const render = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !uniformsRef.current || !clockRef.current) return;

        const delta = Math.min(clockRef.current.getDelta(), 1 / 30);
        const mouseToTargetX = targetMouseRef.current.x - smoothMouseRef.current.x;
        const mouseToTargetY = targetMouseRef.current.y - smoothMouseRef.current.y;

        mouseVelocityRef.current.x += mouseToTargetX * MOUSE_STIFFNESS * delta;
        mouseVelocityRef.current.y += mouseToTargetY * MOUSE_STIFFNESS * delta;
        mouseVelocityRef.current.multiplyScalar(Math.pow(MOUSE_DAMPING, delta * 60));

        smoothMouseRef.current.x += mouseVelocityRef.current.x * delta * 60;
        smoothMouseRef.current.y += mouseVelocityRef.current.y * delta * 60;

        uniformsRef.current.u_mouse.value.copy(smoothMouseRef.current);
        smoothVelocityRef.current.lerp(mouseVelocityRef.current, 0.2);
        
        const velocityMagnitude = smoothVelocityRef.current.length();
        const targetRadius = Math.min(velocityMagnitude * VELOCITY_MULTIPLIER, MAX_RADIUS);

        uniformsRef.current.u_radius.value += (targetRadius - uniformsRef.current.u_radius.value) * RADIUS_STIFFNESS * delta;

        if (smoothMouseRef.current.distanceTo(lastDropPosRef.current) > TRAIL_DROP_DISTANCE) {
          const idx = trailIndexRef.current;
          trailPositionsRef.current[idx].copy(smoothMouseRef.current);
          trailSizesRef.current[idx] = uniformsRef.current.u_radius.value;
          trailIndexRef.current = (idx + 1) % TRAIL_LENGTH;
          lastDropPosRef.current.copy(smoothMouseRef.current);
        }

        for (let i = 0; i < TRAIL_LENGTH; i++) {
          if (trailSizesRef.current[i] > 0) {
            trailSizesRef.current[i] = Math.max(0, trailSizesRef.current[i] - delta * TRAIL_SHRINK_SPEED);
          }
        }

        if (velocityMagnitude > 0.05 && Math.random() > 0.5) {
          const sIdx = splashIndexRef.current;
          splashPositionsRef.current[sIdx].copy(smoothMouseRef.current);
          const angle = Math.random() * Math.PI * 2;
          const force = velocityMagnitude * (0.8 + Math.random() * 1.5);
          splashVelocitiesRef.current[sIdx].set(
            smoothVelocityRef.current.x * 0.2 + Math.cos(angle) * force,
            smoothVelocityRef.current.y * 0.2 + Math.sin(angle) * force,
          );
          splashSizesRef.current[sIdx] = Math.max(0.015, uniformsRef.current.u_radius.value * (0.15 + Math.random() * 0.3));
          splashIndexRef.current = (sIdx + 1) % SPLASH_LENGTH;
        }

        for (let i = 0; i < SPLASH_LENGTH; i++) {
          if (splashSizesRef.current[i] > 0) {
            splashPositionsRef.current[i].x += splashVelocitiesRef.current[i].x * delta;
            splashPositionsRef.current[i].y += splashVelocitiesRef.current[i].y * delta;
            splashVelocitiesRef.current[i].multiplyScalar(Math.pow(SPLASH_VELOCITY_DAMPING, delta * 60));
            splashSizesRef.current[i] = Math.max(0, splashSizesRef.current[i] - delta * SPLASH_SHRINK_SPEED);
          }
        }

        currentHoverStateRef.current += (targetHoverStateRef.current - currentHoverStateRef.current) * delta * 8;
        uniformsRef.current.u_hoverState.value = currentHoverStateRef.current;
        uniformsRef.current.u_time.value += delta;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        animationRef.current = requestAnimationFrame(render);
      };

      clockRef.current.start();
      animationRef.current = requestAnimationFrame(render);
    });

    return () => {
      disposed = true;
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      resizeObserver?.disconnect();
      rendererRef.current?.dispose();
      if (fullContainer) fullContainer.innerHTML = "";
    };
  }, [shouldBootWebGL]);

  return (
    <div 
      className={styles.heroOverlay}
      ref={rootRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Image 
        src="/images/japon/hero/geishaHero.webp" 
        alt="Hero Base" 
        width={700} 
        height={700} 
        className={styles.geishaHero} 
      />
      
      <div ref={canvasContainerRef} className={styles.canvasContainer} aria-hidden="true" />
      <div ref={samuraiPosRef} className={styles.samuraiHeroPlaceholder} aria-hidden="true" />
    </div>
  );
}