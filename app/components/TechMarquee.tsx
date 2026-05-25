"use client";

import { Sparkles } from "lucide-react";

const TECH = [
  "Swift",
  "SwiftUI",
  "UIKit",
  "Objective-C",
  "Combine",
  "Core Data",
  "MapKit",
  "CoreNFC",
  "Vision",
  "AVFoundation",
  "WidgetKit",
  "ARKit",
  "Firebase",
  "Stripe",
  "Fastlane",
  "Tuist",
  "TestFlight",
  "Xcode",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PocketBase",
  "GitHub Actions",
];

/**
 * Edge-faded, infinite-scrolling tech-stack marquee.
 * - Heading lives ABOVE the marquee row (no overflow cut).
 * - The scrolling row has its own overflow-hidden; the section itself does not.
 * - CSS-only animation; near-zero JS cost.
 */
export default function TechMarquee() {
  const list = [...TECH, ...TECH];
  return (
    <section
      aria-label="Tech stack"
      className="relative border-y border-white/10 bg-white/[0.02] py-12"
    >
      {/* Heading — in flow, never cut */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          Tech Stack
        </span>
      </div>

      {/* Scrolling row — overflow-hidden lives only here */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#08090b] to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#08090b] to-transparent md:w-48" />

        <div className="marquee-track flex w-max whitespace-nowrap will-change-transform">
          {list.map((tech, i) => (
            <span
              key={i}
              className="mx-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 font-display text-sm font-medium text-slate-300 backdrop-blur md:mx-3 md:text-base"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.7)]" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
