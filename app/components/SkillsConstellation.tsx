"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * 3D skill orb with floating skill chips.
 *
 *  - Center: a wireframe icosahedron + a ghost-solid inner sphere with metallic
 *    PBR material. Slow auto-rotate + mouse parallax.
 *  - Floating chips orbit on a sphere using drei's <Html occlude transform>.
 *  - Lazy-mounted via IntersectionObserver so the canvas only spins up
 *    when the section is on screen.
 *  - frameloop="demand", dpr capped to 1.25, alpha:true.
 */

type Props = {
  className?: string;
  skills?: string[];
};

const DEFAULT_SKILLS = [
  "Swift",
  "SwiftUI",
  "UIKit",
  "Combine",
  "CoreNFC",
  "MapKit",
  "Vision",
  "ARKit",
  "Firebase",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "GSAP",
  "Three.js",
];

/**
 * Distribute N points on the surface of a unit sphere using the
 * Fibonacci lattice. Gives an even, organic-looking spread.
 */
function fibonacciSphere(samples: number, radius: number) {
  const points: Array<[number, number, number]> = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

function Orb({ skills }: { skills: string[] }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  const positions = useMemo(() => fibonacciSphere(skills.length, 1.85), [skills.length]);

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
    if (!group.current) return;
    // Auto rotate
    group.current.rotation.y += delta * 0.18;

    // Mouse parallax (lerp)
    const targetX = mouse.current.y * 0.25;
    const targetY = group.current.rotation.y + mouse.current.x * 0.04;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);

    // Inner core breathing
    if (inner.current) {
      const s = 1 + Math.sin(performance.now() * 0.001) * 0.02;
      inner.current.scale.setScalar(s);
    }
    if (wire.current) {
      wire.current.rotation.x -= delta * 0.06;
      wire.current.rotation.z += delta * 0.04;
    }

    invalidate();
  });

  return (
    <group ref={group}>
      {/* Inner solid orb */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 4]} />
        <meshStandardMaterial
          color="#0c1a16"
          metalness={0.95}
          roughness={0.18}
          emissive="#10b981"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.42} />
      </mesh>

      {/* Faint outer guide */}
      <mesh>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Floating skill chips */}
      {positions.map((p, i) => (
        <Float
          key={skills[i]}
          speed={1.1 + (i % 3) * 0.2}
          rotationIntensity={0.15}
          floatIntensity={0.55}
        >
          <group position={p}>
            <Html
              center
              distanceFactor={6}
              transform
              sprite
              zIndexRange={[10, 0]}
            >
              <span className="skill-chip select-none whitespace-nowrap rounded-full border border-emerald-300/30 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 shadow-lg shadow-emerald-950/40 backdrop-blur">
                {skills[i]}
              </span>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}

export default function SkillsConstellation({
  className,
  skills = DEFAULT_SKILLS,
}: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setMount(entry.isIntersecting),
      { rootMargin: "200px 0px 200px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapper} className={className} aria-hidden>
      {mount && (
        <Canvas
          frameloop="demand"
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 5.6], fov: 42 }}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={0.9} color="#ffffff" />
          <pointLight position={[-3, -2, 3]} intensity={0.7} color="#10b981" />
          <pointLight position={[3, 2, -3]} intensity={0.5} color="#22d3ee" />

          <Orb skills={skills} />

          <Sparkles count={32} scale={6} size={2} color="#a7f3d0" speed={0.35} />
        </Canvas>
      )}
    </div>
  );
}
