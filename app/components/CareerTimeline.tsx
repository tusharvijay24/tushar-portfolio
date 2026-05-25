"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Job = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

export default function CareerTimeline({ jobs }: { jobs: Job[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      // Draw the timeline line as user scrolls through the section
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Stagger dots in
      gsap.utils
        .toArray<HTMLElement>(".timeline-dot")
        .forEach((dot) => {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              ease: "back.out(2)",
              scrollTrigger: { trigger: dot, start: "top 78%" },
            }
          );
        });

      // Slide each card in from the right
      gsap.utils
        .toArray<HTMLElement>(".timeline-card")
        .forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 36 },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 82%" },
            }
          );
        });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative mt-12">
      {/* Track (background line) */}
      <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-8" />
      {/* Animated overlay line */}
      <div
        className="timeline-line absolute left-4 top-0 h-full w-px bg-gradient-to-b from-emerald-300 via-emerald-300 to-cyan-300 md:left-8"
        style={{ transform: "scaleY(0)", transformOrigin: "top" }}
      />

      <div className="grid gap-10">
        {jobs.map((job) => (
          <div key={job.company} className="relative pl-12 md:pl-20">
            <div className="timeline-dot absolute left-2 top-7 grid h-5 w-5 place-items-center rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(110,231,183,0.65)] md:left-6">
              <span className="h-2 w-2 rounded-full bg-slate-950" />
            </div>

            <article className="timeline-card group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-emerald-950/20 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-200">{job.period}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-slate-300">{job.company}</p>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300 transition group-hover:border-emerald-300/25">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  {job.location}
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {job.points.map((p) => (
                  <p
                    key={p}
                    className="flex gap-3 text-sm leading-7 text-slate-300"
                  >
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.55)]" />
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
