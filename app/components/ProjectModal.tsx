"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";

export type ModalProject = {
  name: string;
  category: string;
  summary: string;
  outcome: string;
  stack: string[];
  link: string;
  accent: string;
};

type Props = {
  project: ModalProject | null;
  onClose: () => void;
};

/**
 * Full-screen project modal with cinematic open animation.
 *
 *  - AnimatePresence + spring entrance from y:30, scale:0.96
 *  - Blurred dark backdrop (mode="wait" not needed; only one open at a time)
 *  - Locks page scroll while open
 *  - ESC + outside-click to close
 *  - Animated app-icon "screenshot" lockup with shimmer scan-line
 *  - Tech stack pills + clear CTA to live link
 */
export default function ProjectModal({ project, onClose }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    if (!project) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [project]);

  // ESC to close
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={`modal-${project.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-[180] grid place-items-center bg-black/70 px-4 py-10 backdrop-blur-md"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0e12]/95 shadow-2xl shadow-black/60 lg:grid-cols-[1.1fr_1fr]"
          >
            {/* Visual side */}
            <div
              className={`relative isolate flex min-h-[22rem] items-center bg-gradient-to-br ${project.accent} p-10`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.4),transparent_50%)]" />
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="phone-float relative mx-auto flex h-72 w-40 flex-col rounded-[2rem] border-4 border-slate-950 bg-slate-950 p-2 shadow-2xl shadow-black/40"
              >
                <div className="mx-auto mb-2 h-3 w-14 rounded-full bg-white/20" />
                <div className="flex flex-1 flex-col justify-between rounded-[1.4rem] bg-white p-3 text-slate-950">
                  <div>
                    <div
                      className={`mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${project.accent} text-lg font-bold text-white`}
                    >
                      {project.name.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="text-xs font-semibold text-slate-500">
                      {project.category}
                    </p>
                    <p className="mt-1 text-lg font-bold leading-5">
                      {project.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-slate-200" />
                    <div className="h-2 w-2/3 rounded-full bg-slate-200" />
                    <div
                      className={`scan-line h-9 rounded-xl bg-gradient-to-r ${project.accent}`}
                    />
                  </div>
                </div>
              </motion.div>
              <span className="absolute left-6 top-6 rounded-full border border-white/40 bg-black/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                Project
              </span>
            </div>

            {/* Content side */}
            <div className="flex flex-col p-8 md:p-10">
              <button
                onClick={onClose}
                aria-label="Close project"
                data-cursor="hover"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
                {project.category}
              </span>
              <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {project.summary}
              </p>
              <p className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">
                {project.outcome}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                {project.link.includes("apple.com")
                  ? "View on App Store"
                  : "View Live Site"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
