"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide smooth cursor.
 * - Hidden on touch / coarse pointers (no-op render).
 * - A small dot tracks the mouse 1:1.
 * - A larger ring lerps with a smoothing factor.
 * - Elements with [data-cursor="hover"] grow the ring and dim the dot.
 * - Disabled when the user prefers reduced motion (just a dot, no lerp ring).
 */
export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return; // do nothing on touch devices

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHover = false;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      // Dot follows immediately
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      if (reduceMotion) {
        ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          isHover ? 1.6 : 1
        })`;
      }
    };

    const tick = () => {
      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${
        isHover ? 1.6 : 1
      })`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      visible = false;
    };
    const onEnter = () => {
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Hover detection via event delegation (no per-element listeners)
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor='hover'], input, textarea, select, summary"
      );
      const next = !!interactive;
      if (next !== isHover) {
        isHover = next;
        ring.classList.toggle("smooth-cursor-ring--hover", isHover);
        dot.classList.toggle("smooth-cursor-dot--hover", isHover);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    if (!reduceMotion) {
      rafRef.current = requestAnimationFrame(tick);
    }

    // Hide native cursor on the body for richer effect (only when this is mounted)
    document.documentElement.classList.add("has-smooth-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("has-smooth-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden className="smooth-cursor-ring" />
      <div ref={dotRef} aria-hidden className="smooth-cursor-dot" />
    </>
  );
}
