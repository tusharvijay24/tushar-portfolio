"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Site-wide Lenis smooth scrolling.
 *
 * - duration 1.2s, smoothWheel on
 * - exposes the lenis instance on window so other modules (GSAP ScrollTrigger,
 *   command palette scroll-to, etc.) can call `window.__lenis?.scrollTo(...)`
 * - skips entirely on touch / coarse pointers (Lenis hijacking touch on
 *   mobile feels worse than native momentum scrolling)
 * - skips on prefers-reduced-motion
 * - destroys the instance on unmount
 */
declare global {
  // eslint-disable-next-line no-var
  var __lenis: Lenis | undefined;
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarse) return;

    const lenis = new Lenis({
      duration: 0.6,
      // Snappier easing — quartic ease-out (less tail than the default expo)
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.6,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
