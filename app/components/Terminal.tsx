"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Self-typing terminal that loops through `whoami`, `skills`, `projects`,
 * `contact` once the section enters the viewport. Output is line-by-line
 * typewriter; commands fire automatically with realistic pauses.
 *
 * No external libraries — just timeouts + setState with cleanup. Tab character
 * widths are stabilized with a monospace font + tabular-nums.
 */

type Step =
  | { kind: "command"; text: string }
  | { kind: "output"; text: string }
  | { kind: "blank" };

const SCRIPT: Step[] = [
  { kind: "command", text: "whoami" },
  { kind: "output", text: "tushar  →  Senior iOS & Full-Stack Web Developer" },
  { kind: "output", text: "based   →  Gurgaon / Indore, India" },
  { kind: "output", text: "since   →  2021 (5+ years shipping production apps)" },
  { kind: "blank" },

  { kind: "command", text: "skills --top" },
  { kind: "output", text: "iOS      →  Swift · Objective-C · UIKit · SwiftUI · Combine" },
  { kind: "output", text: "Apple    →  CoreNFC · MapKit · Vision · ARKit · AVFoundation" },
  { kind: "output", text: "Web      →  React · Next.js · TypeScript · Tailwind · Node.js" },
  { kind: "output", text: "DevOps   →  Fastlane · TestFlight · Tuist · GitHub Actions" },
  { kind: "blank" },

  { kind: "command", text: "projects --shipped" },
  { kind: "output", text: "10+  production apps shipped end-to-end" },
  { kind: "output", text: " 8+  on the App Store across iOS, NFC, social, retail, HR" },
  { kind: "output", text: " 2+  full-stack web products in production" },
  { kind: "blank" },

  { kind: "command", text: "contact --available" },
  { kind: "output", text: "email →  tusharvijayvargiya24112000@gmail.com" },
  { kind: "output", text: "phone →  +91 7389548853" },
  { kind: "output", text: "status →  open to senior iOS / web roles + freelance" },
  { kind: "blank" },

  { kind: "command", text: "_" },
];

const TYPE_SPEED_CMD = 28;
const TYPE_SPEED_OUT = 8;
const PAUSE_AFTER_LINE = 220;
const PAUSE_AFTER_BLANK = 90;

type RenderedLine = { kind: Step["kind"]; text: string; partial?: boolean };

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [cursorOn, setCursorOn] = useState(true);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((s) => !s), 540);
    return () => clearInterval(id);
  }, []);

  // Run script when in view
  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        timeouts.push(id);
      });

    const run = async () => {
      for (const step of SCRIPT) {
        if (cancelled) return;
        if (step.kind === "blank") {
          setLines((prev) => [...prev, { kind: "blank", text: "" }]);
          await sleep(PAUSE_AFTER_BLANK);
          continue;
        }
        const speed = step.kind === "command" ? TYPE_SPEED_CMD : TYPE_SPEED_OUT;
        // Push empty line, then fill it character by character
        setLines((prev) => [...prev, { kind: step.kind, text: "", partial: true }]);
        for (let i = 1; i <= step.text.length; i++) {
          if (cancelled) return;
          await sleep(speed);
          const slice = step.text.slice(0, i);
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = { kind: step.kind, text: slice, partial: i < step.text.length };
            return next;
          });
        }
        await sleep(PAUSE_AFTER_LINE);
      }
    };
    void run();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, [inView]);

  return (
    <section
      aria-label="Developer terminal"
      className="relative isolate mx-auto max-w-7xl px-5 py-24 lg:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="font-mono inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-emerald-300">
            ~/personality
          </span>
          <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
            A quick{" "}
            <span className="bg-gradient-to-r from-emerald-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              shell session
            </span>{" "}
            with the developer.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            Tab over to the terminal — it auto-runs a few commands so you can
            scan the highlights without scrolling another section.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="terminal-card holo-border relative overflow-hidden rounded-2xl border border-white/10 bg-[#06080a]/95 shadow-2xl shadow-black/50"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            <span className="font-mono ml-3 text-xs text-slate-500">
              tushar@portfolio:~ — zsh
            </span>
          </div>
          {/* Body */}
          <div className="font-mono max-h-[28rem] min-h-[24rem] overflow-y-auto px-5 py-5 text-sm leading-7 tabular-nums">
            {lines.length === 0 && (
              <p className="text-slate-500">$ booting session…</p>
            )}
            {lines.map((line, i) => {
              if (line.kind === "blank") return <div key={i} className="h-3" />;
              if (line.kind === "command") {
                return (
                  <p key={i} className="text-slate-200">
                    <span className="mr-2 text-emerald-300">$</span>
                    {line.text}
                    {line.partial && (
                      <span className={cursorOn ? "opacity-100" : "opacity-0"}>
                        ▍
                      </span>
                    )}
                  </p>
                );
              }
              return (
                <p key={i} className="pl-5 text-slate-400">
                  {line.text}
                </p>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
