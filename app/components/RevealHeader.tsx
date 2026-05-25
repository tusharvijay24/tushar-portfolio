"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  /** Optional gradient accent words inside the title (highlighted) */
  accent?: string[];
  className?: string;
};

/**
 * Section header with strong, scroll-triggered animations.
 *  - Eyebrow rises in
 *  - Title splits to words; each word slides up with stagger
 *  - Underline gradient strokes from left to right
 *  - Body paragraph fades up after the title settles
 */
export default function RevealHeader({
  eyebrow,
  title,
  text,
  accent = [],
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const words = root.current?.querySelectorAll<HTMLElement>(".rh-word");
      const eyebrowEl = root.current?.querySelector(".rh-eyebrow");
      const underline = root.current?.querySelector(".rh-underline");
      const body = root.current?.querySelector(".rh-body");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
        },
      });

      if (eyebrowEl) {
        tl.from(
          eyebrowEl,
          { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" },
          0
        );
      }
      if (words && words.length) {
        gsap.set(words, { yPercent: 110, opacity: 0 });
        tl.to(
          words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.06,
          },
          0.05
        );
      }
      if (underline) {
        tl.from(
          underline,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "power3.out",
          },
          0.4
        );
      }
      if (body) {
        tl.from(
          body,
          { y: 18, opacity: 0, duration: 0.7, ease: "power3.out" },
          0.55
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  // Tokenize title into words; mark accent words
  const accentSet = new Set(accent.map((a) => a.toLowerCase()));
  const tokens = title.split(/(\s+)/); // preserve whitespace

  return (
    <div ref={root} className={`max-w-3xl ${className}`}>
      <span className="rh-eyebrow inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-emerald-300">
        {eyebrow}
      </span>

      <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.06] tracking-tight text-white md:text-5xl">
        <span className="block" style={{ perspective: 800 }}>
          {tokens.map((t, i) => {
            if (/^\s+$/.test(t)) return <span key={i}>{t}</span>;
            const cleaned = t.replace(/[.,;:!?'"]/g, "").toLowerCase();
            const isAccent = accentSet.has(cleaned);
            return (
              <span
                key={i}
                className="rh-word-mask relative inline-block overflow-hidden align-bottom pb-[0.06em]"
              >
                <span
                  className={
                    "rh-word inline-block " +
                    (isAccent
                      ? "bg-gradient-to-r from-emerald-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent"
                      : "text-white")
                  }
                >
                  {t}
                </span>
              </span>
            );
          })}
        </span>
      </h2>

      <span
        aria-hidden
        className="rh-underline mt-5 block h-[3px] w-24 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-300 to-cyan-300 shadow-[0_0_18px_rgba(110,231,183,0.5)]"
      />

      <p className="rh-body mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
        {text}
      </p>
    </div>
  );
}
