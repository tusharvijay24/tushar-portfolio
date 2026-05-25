"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Shape = "icosa" | "torus" | "octa" | "knot" | "dodeca";

type Props = {
  shape?: Shape;
  color?: string;
  emissive?: string;
  className?: string;
  /** Scale of the central shape (default 1) */
  scale?: number;
  /** Auto-rotate speed (default 0.4) */
  speed?: number;
  /** Wireframe rendering (default false) */
  wireframe?: boolean;
  /** Enable Sparkles atmosphere */
  sparkles?: boolean;
};

function Geometry({ shape, scale }: { shape: Shape; scale: number }) {
  switch (shape) {
    case "torus":
      return <torusGeometry args={[1, 0.32, 24, 64]} />;
    case "octa":
      return <octahedronGeometry args={[1, 0]} />;
    case "knot":
      return <torusKnotGeometry args={[0.8, 0.28, 100, 16]} />;
    case "dodeca":
      return <dodecahedronGeometry args={[1, 0]} />;
    case "icosa":
    default:
      return <icosahedronGeometry args={[1, 2]} />;
  }
}

function Mesh3D({
  shape,
  color,
  emissive,
  scale,
  speed,
  wireframe,
}: Required<Pick<Props, "shape" | "color" | "emissive" | "scale" | "speed" | "wireframe">>) {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      invalidate();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [invalidate]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * (speed * 0.45);
    // Subtle mouse parallax overlay
    const targetTilt = mouse.current.x * 0.3;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetTilt, 0.06);
    invalidate();
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.9}>
      <mesh ref={ref} scale={scale}>
        <Geometry shape={shape} scale={scale} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.2}
          emissive={emissive}
          emissiveIntensity={0.25}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  );
}

export default function Floating3D({
  shape = "icosa",
  color = "#10b981",
  emissive,
  className,
  scale = 1,
  speed = 0.4,
  wireframe = false,
  sparkles = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    // Skip 3D entirely on touch / coarse-pointer devices — a Canvas + R3F
    // mesh per section is the single biggest reason mobile scroll feels
    // janky on this site.
    if (typeof window !== "undefined") {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (coarse || reduceMotion) return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setMount(entry.isIntersecting),
      { rootMargin: "300px 0px 300px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {mount && (
        <Canvas
          frameloop="demand"
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 3.4], fov: 38 }}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 4, 5]} intensity={0.9} color="#ffffff" />
          <pointLight position={[-3, -2, 3]} intensity={0.6} color={color} />
          <Mesh3D
            shape={shape}
            color={color}
            emissive={emissive ?? color}
            scale={scale}
            speed={speed}
            wireframe={wireframe}
          />
          {sparkles && (
            <Sparkles count={20} scale={5} size={1.6} color="#a7f3d0" speed={0.3} />
          )}
        </Canvas>
      )}
    </div>
  );
}
