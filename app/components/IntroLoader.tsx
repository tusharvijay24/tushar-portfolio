"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Site-wide intro loader. Plays once on mount.
 * - "TV" mark + animated progress bar 0→100
 * - Fades out and unmounts after the bar fills, ~1.6s total.
 * - Locks scroll while visible.
 * - Skipped entirely for prefers-reduced-motion users.
 */
export default function IntroLoader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipParam = new URLSearchParams(window.location.search).get("nointro");
    if (reduceMotion || skipParam === "1") {
      setDone(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      // Ease-out cubic for the number readout
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 220);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Restore scroll once the loader is dismissed
  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#08090b]"
          aria-hidden
        >
          {/* Subtle background grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.18),transparent_55%)]" />

          <div className="relative flex flex-col items-center gap-7">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] font-display text-2xl font-bold text-emerald-300 shadow-2xl shadow-emerald-950/40"
            >
              TV
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <p className="font-display text-[0.7rem] uppercase tracking-[0.35em] text-slate-500">
                Loading {progress.toString().padStart(2, "0")}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
