"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Site-wide custom cursor.
 *
 * - A small <canvas>-rendered emerald dot tracks the mouse 1:1 (zero lag).
 * - A Framer Motion ring lerps with spring physics (useMotionValue + useSpring).
 * - Hovering interactive elements expands the ring + grows the dot.
 * - Pressing (mousedown) compresses both ring + dot.
 * - Disabled on coarse pointers / touch devices.
 * - Honors prefers-reduced-motion (no spring lag, just snap).
 *
 * Detection of interactive targets is delegated through one mouseover
 * listener — no per-element handlers, so it stays cheap on huge pages.
 */
export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dprRef = useRef(1);

  const [enabled, setEnabled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Raw cursor position (used by the canvas dot — no lerp).
  const rawX = useRef(0);
  const rawY = useRef(0);

  // Smoothed cursor position (used by the Framer Motion ring).
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springX = useSpring(ringX, { stiffness: 380, damping: 32, mass: 0.55 });
  const springY = useSpring(ringY, { stiffness: 380, damping: 32, mass: 0.55 });

  // ----- Setup environment flags -----
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(rm);
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  // ----- Canvas: high-DPI sizing -----
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [enabled]);

  // ----- Mouse position + hover/press state -----
  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor='hover'], summary, label[for], input[type='checkbox'], input[type='radio']"
      );
      setHover(!!interactive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, ringX, ringY]);

  // ----- Canvas render loop (dot) -----
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let smoothR = 4;

    const draw = () => {
      const dpr = dprRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetR = pressed ? 2.4 : hover ? 6.5 : 4;
      smoothR += (targetR - smoothR) * (reduceMotion ? 1 : 0.25);

      const x = rawX.current * dpr;
      const y = rawY.current * dpr;
      const r = smoothR * dpr;

      // Soft halo
      const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
      halo.addColorStop(0, "rgba(110, 231, 183, 0.55)");
      halo.addColorStop(1, "rgba(110, 231, 183, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, y, r * 5, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = pressed
        ? "rgba(255, 255, 255, 1)"
        : hover
        ? "rgba(167, 243, 208, 1)"
        : "rgba(110, 231, 183, 1)";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [enabled, hover, pressed, reduceMotion]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="custom-cursor-canvas pointer-events-none fixed inset-0 z-[9998]"
      />
      <motion.div
        aria-hidden
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          x: reduceMotion ? ringX : springX,
          y: reduceMotion ? ringY : springY,
          mixBlendMode: "difference",
        }}
        animate={{
          width: pressed ? 18 : hover ? 56 : 32,
          height: pressed ? 18 : hover ? 56 : 32,
          borderColor: hover
            ? "rgba(110, 231, 183, 0.9)"
            : "rgba(255, 255, 255, 0.55)",
          backgroundColor: hover
            ? "rgba(110, 231, 183, 0.08)"
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.6 }}
      />
    </>
  );
}
