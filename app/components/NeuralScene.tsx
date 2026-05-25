"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero "AI Neural Universe" scene.
 *
 *  - 32 instanced glowing nodes randomly distributed inside a sphere
 *  - thin curved energy connections between nearest neighbors (Catmull-Rom curves)
 *  - 3 floating distorted glass orbs (drei MeshDistortMaterial → animated GLSL)
 *  - exponential fog for cinematic depth
 *  - postprocessing: Bloom + Vignette + Noise + Chromatic Aberration
 *  - mouse-parallax camera (lerped)
 *  - lazy-mounted via IntersectionObserver
 *  - frameloop="always" while mounted (postprocessing needs every-frame redraw),
 *    but the canvas unmounts when the hero is off screen so total cost is bounded
 */

const NODE_COUNT = 32;
const CONNECTION_DISTANCE = 1.6;

type NodeData = {
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  speed: number;
  phase: number;
};

function generateNodes(): NodeData[] {
  const nodes: NodeData[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    // Even-ish distribution inside a sphere
    const r = Math.cbrt(Math.random()) * 2.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    nodes.push({
      position: pos.clone(),
      basePosition: pos.clone(),
      speed: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return nodes;
}

function NeuralNetwork() {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<NodeData[]>([]);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate nodes once
  if (nodesRef.current.length === 0) {
    nodesRef.current = generateNodes();
  }
  const nodes = nodesRef.current;

  // Pre-compute initial connection pairs (closest neighbors)
  const connections = useMemo(() => {
    const pairs: Array<[number, number]> = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < CONNECTION_DISTANCE) pairs.push([i, j]);
      }
    }
    return pairs;
  }, [nodes]);

  // Build line geometry
  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(connections.length * 6);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [connections.length]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Animate nodes (slight orbiting motion around their base position)
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      n.position.x =
        n.basePosition.x + Math.sin(t * n.speed + n.phase) * 0.18;
      n.position.y =
        n.basePosition.y + Math.cos(t * n.speed * 0.8 + n.phase) * 0.18;
      n.position.z =
        n.basePosition.z + Math.sin(t * n.speed * 0.6 + n.phase) * 0.14;

      dummy.position.copy(n.position);
      const s = 0.06 + Math.sin(t * 1.2 + n.phase) * 0.018;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    }
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;

    // Update connections
    if (linesRef.current) {
      const posAttr = linesRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let k = 0; k < connections.length; k++) {
        const [i, j] = connections[k];
        const a = nodes[i].position;
        const b = nodes[j].position;
        arr[k * 6 + 0] = a.x;
        arr[k * 6 + 1] = a.y;
        arr[k * 6 + 2] = a.z;
        arr[k * 6 + 3] = b.x;
        arr[k * 6 + 4] = b.y;
        arr[k * 6 + 5] = b.z;
      }
      posAttr.needsUpdate = true;
    }

    // Mouse-parallax rotation on the whole network
    if (group.current) {
      const targetY = mouse.current.x * 0.4;
      const targetX = mouse.current.y * -0.2;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetY,
        0.04
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetX,
        0.04
      );
      // Slow auto-drift
      group.current.rotation.y += 0.0006;
    }
  });

  return (
    <group ref={group}>
      {/* Glowing nodes */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, NODE_COUNT]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={3.5}
          metalness={0.4}
          roughness={0.3}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.45}
          toneMapped={false}
        />
      </lineSegments>

      {/* Floating distorted glass orbs */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.0}>
        <mesh position={[-1.6, 0.8, 0.4]}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <MeshDistortMaterial
            color="#0a3a2c"
            emissive="#10b981"
            emissiveIntensity={0.6}
            metalness={0.95}
            roughness={0.12}
            distort={0.45}
            speed={1.4}
          />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[1.7, -0.6, -0.5]}>
          <sphereGeometry args={[0.42, 64, 64]} />
          <MeshDistortMaterial
            color="#0a2a3a"
            emissive="#22d3ee"
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.15}
            distort={0.55}
            speed={2.0}
          />
        </mesh>
      </Float>
      <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.7}>
        <mesh position={[0.3, 1.4, -0.8]}>
          <sphereGeometry args={[0.28, 64, 64]} />
          <MeshDistortMaterial
            color="#1b1b2c"
            emissive="#a7f3d0"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
            distort={0.35}
            speed={1.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

function ParallaxCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.current.x * 0.5,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.current.y * -0.3,
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

type NeuralSceneProps = {
  className?: string;
};

export default function NeuralScene({ className }: NeuralSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

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
          frameloop="always"
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          style={{ background: "transparent" }}
        >
          <fog attach="fog" args={["#08090b", 4.5, 11]} />

          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1.2} color="#10b981" />
          <pointLight position={[-3, -2, 3]} intensity={1.0} color="#22d3ee" />
          <directionalLight position={[0, 4, 6]} intensity={0.5} color="#ffffff" />

          <Suspense fallback={null}>
            <NeuralNetwork />
          </Suspense>

          <Sparkles
            count={60}
            scale={8}
            size={2}
            color="#a7f3d0"
            speed={0.4}
            opacity={0.8}
          />

          <ParallaxCamera />

          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.4}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.7}
              mipmapBlur
            />
            <ChromaticAberration
              offset={[0.0008, 0.0012]}
              radialModulation={false}
              modulationOffset={0}
              blendFunction={BlendFunction.NORMAL}
            />
            <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
            <Vignette
              eskil={false}
              offset={0.15}
              darkness={0.85}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
