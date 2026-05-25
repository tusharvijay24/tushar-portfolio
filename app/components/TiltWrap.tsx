"use client";

import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. Default 6. */
  intensity?: number;
};

/**
 * Generic 3D-tilt wrapper. Tracks cursor inside its bounds and applies
 * perspective + rotateX/Y. Disabled for coarse pointers (touch).
 * Children should set their own border/shadow; this wrapper is a transformer.
 */
export default function TiltWrap({ children, className = "", intensity = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${py * -intensity}deg) rotateY(${
      px * intensity
    }deg)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transformStyle: "preserve-3d", transition: "transform 240ms ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}
