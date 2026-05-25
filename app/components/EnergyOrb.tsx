"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Shader-distorted "energy orb".
 *
 *  - drei's MeshDistortMaterial (under the hood: simplex-noise vertex displacement
 *    GLSL shader). High `distort` + medium `speed` gives a liquid-metal feel.
 *  - A second outer wireframe sphere for depth.
 *  - Sparkles atmosphere.
 *  - Lazy-mounted; frameloop="always" while in viewport so the shader
 *    animation keeps running.
 *  - dpr capped at 1.25.
 */
type Props = {
  className?: string;
  color?: string;
  emissive?: string;
};

function Orb({ color, emissive }: Required<Pick<Props, "color" | "emissive">>) {
  const ref = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x += delta * 0.12;
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.18;
      wire.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.7}>
      <group>
        <mesh ref={ref}>
          <sphereGeometry args={[1.05, 96, 96]} />
          <MeshDistortMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.7}
            metalness={0.95}
            roughness={0.16}
            distort={0.5}
            speed={1.6}
          />
        </mesh>
        <mesh ref={wire} scale={1.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={emissive} wireframe transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

export default function EnergyOrb({
  className,
  color = "#0a3a2c",
  emissive = "#10b981",
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
          frameloop="always"
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 3.6], fov: 38 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.45} />
          <pointLight position={[3, 3, 3]} intensity={0.9} color={emissive} />
          <pointLight position={[-3, -2, 3]} intensity={0.6} color="#22d3ee" />
          <directionalLight position={[2, 4, 5]} intensity={0.6} color="#ffffff" />

          <Orb color={color} emissive={emissive} />

          <Sparkles count={28} scale={4.5} size={1.6} color="#a7f3d0" speed={0.35} />
        </Canvas>
      )}
    </div>
  );
}
