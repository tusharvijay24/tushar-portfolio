"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Sparkles,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero 3D scene.
 *
 * External assets (both CC0 1.0 — public domain):
 *   - /models/toycar.glb (Khronos glTF Sample, CC0 1.0)
 *   - /hdri/studio_small.hdr (Poly Haven studio_small_03, CC0 1.0)
 *
 * Performance strategy:
 *   - frameloop="demand" → no idle re-renders. We invalidate() only on mouse move
 *     and on scroll (both throttled by the browser).
 *   - The Canvas is mounted only while the hero is in viewport (IntersectionObserver).
 *   - dpr capped at 1.25 to avoid 4x render cost on retina displays.
 *   - No transmission / distortion materials (those use multi-pass renders).
 */

// Preload so the GLB is ready by the time the user scrolls or interacts.
useGLTF.preload("/models/toycar.glb");

function ToyCar() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/toycar.glb");
  const mouse = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  // Track mouse globally + invalidate render
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      invalidate();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [invalidate]);

  useFrame(() => {
    if (!ref.current) return;
    const targetY = mouse.current.x * 0.6 + 0.4;
    const targetX = mouse.current.y * -0.18 + 0.05;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.08);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.08);
    // Schedule another frame while we're still easing into target
    if (Math.abs(ref.current.rotation.y - targetY) > 0.001) {
      invalidate();
    }
  });

  // The CC0 ToyCar source ships at meters scale ~0.01; bump to fit hero camera.
  return (
    <group ref={ref} scale={26} position={[0, -0.45, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function AmbientSpheres() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[-1.7, 1.0, -0.4]} scale={0.32}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#10b981"
            metalness={0.85}
            roughness={0.15}
            emissive="#10b981"
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh position={[1.9, -1.0, -0.6]} scale={0.26}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.9}
            roughness={0.18}
            emissive="#22d3ee"
            emissiveIntensity={0.22}
          />
        </mesh>
      </Float>
    </>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={0.6} color="#10b981" />

      <Suspense fallback={null}>
        <Environment files="/hdri/studio_small.hdr" environmentIntensity={0.65} />
      </Suspense>

      <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.5}>
        <ToyCar />
      </Float>

      <AmbientSpheres />

      <Sparkles count={28} scale={5} size={2} color="#a7f3d0" speed={0.4} />

      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.45}
        scale={5}
        blur={2.6}
        far={1.5}
        color="#000000"
      />
    </>
  );
}

type HeroSceneProps = {
  className?: string;
};

export default function HeroScene({ className }: HeroSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  // Lazy-mount the Canvas only when the hero is on (or near) screen.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShouldMount(entry.isIntersecting),
      { rootMargin: "200px 0px 200px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={className} aria-hidden>
      {shouldMount && (
        <Canvas
          frameloop="demand"
          dpr={[1, 1.25]}
          camera={{ position: [0, 0.4, 1.6], fov: 38 }}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
          style={{ background: "transparent" }}
        >
          <SceneContents />
        </Canvas>
      )}
    </div>
  );
}
