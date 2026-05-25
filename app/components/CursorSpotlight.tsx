"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Soft-light radial spotlight that follows the cursor.
 *
 *  - 700px circular emerald/cyan radial gradient
 *  - mix-blend-mode: soft-light makes it tint whatever is underneath rather
 *    than wash it out. Effect is cinematic without becoming distracting.
 *  - Spring-tracked via useMotionValue + useSpring so it lags slightly behind
 *    the cursor, giving that filmic light-rig feel.
 *  - Disabled on coarse pointers + prefers-reduced-motion.
 */
export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 220, damping: 30, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 220, damping: 30, mass: 0.8 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="cursor-spotlight pointer-events-none fixed left-0 top-0 z-[40] -translate-x-1/2 -translate-y-1/2"
      style={{
        x: sx,
        y: sy,
        width: 700,
        height: 700,
        mixBlendMode: "soft-light",
        background:
          "radial-gradient(circle at center, rgba(110, 231, 183, 0.55) 0%, rgba(34, 211, 238, 0.25) 30%, rgba(0,0,0,0) 65%)",
        filter: "blur(20px)",
      }}
    />
  );
}
