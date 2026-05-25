"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Compass,
  Download,
  Gauge,
  Github,
  Linkedin,
  Mail,
  Phone,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";

type Section = { id: string; label: string; icon: React.ReactNode };

const SECTIONS: Section[] = [
  { id: "about", label: "About", icon: <Compass className="h-4 w-4" /> },
  { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { id: "apps", label: "Apps", icon: <Sparkles className="h-4 w-4" /> },
  { id: "skills", label: "Skills", icon: <Gauge className="h-4 w-4" /> },
  { id: "contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];

type ProjectQuick = { name: string; href: string; category: string };

const QUICK_PROJECTS: ProjectQuick[] = [
  { name: "Cravingly", href: "https://apps.apple.com/us/app/cravingly/id6633424731", category: "Food Ordering" },
  { name: "SIPN Bourbon", href: "https://apps.apple.com/in/app/sipn-bourbon/id1597312660", category: "Social Commerce" },
  { name: "Ixkio", href: "https://apps.apple.com/us/app/ixkio/id6467871130", category: "NFC Platform" },
  { name: "VECV Evolve", href: "https://apps.apple.com/in/app/vecvevolve-empower-yourself/id1208034545", category: "Enterprise HRMS" },
  { name: "Eicher CRM", href: "https://apps.apple.com/in/app/eicher-crm/id1467873868", category: "CRM Analytics" },
  { name: "BC Starter", href: "https://apps.apple.com/in/app/bc-starter/id1062799070", category: "Retail Commerce" },
  { name: "PetPlayPartner", href: "https://apps.apple.com/us/app/petplaypartner/id6504684737", category: "Social Networking" },
  { name: "3Fam", href: "https://apps.apple.com/us/app/3fam/id6504684738", category: "Personal Safety" },
  { name: "Latkanwali.in", href: "https://latkanwali.in", category: "E-commerce Web" },
];

/**
 * Linear / Vercel-style command palette. Open with ⌘K (or Ctrl+K).
 *  - Filtered by `cmdk` (substring match across label/value/keywords)
 *  - Sections + projects + quick contact actions
 *  - Opens external project links in a new tab
 *  - Smooth scrolls in-page using window.__lenis if available
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Pause Lenis while the palette is open so wheel events go straight to the
  // command list's overflow scroll instead of being smoothed-into the page.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = window.__lenis;
    if (!lenis) return;
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [open]);

  const goToSection = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openHref = (href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-md"
          onClick={() => setOpen(false)}
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e12]/95 shadow-2xl shadow-black/50"
          >
            <Command className="bg-transparent" label="Command palette">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <Search className="h-5 w-5 text-emerald-300" />
                <Command.Input
                  autoFocus
                  placeholder="Search sections, projects, quick actions…"
                  className="font-sans flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
                />
                <kbd className="font-mono rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.65rem] text-slate-400">
                  ESC
                </kbd>
              </div>

              <Command.List
                className="max-h-[60vh] overflow-y-auto overscroll-contain px-2 py-3"
                data-lenis-prevent
              >
                <Command.Empty className="px-4 py-8 text-center text-sm text-slate-500">
                  No matches.
                </Command.Empty>

                <Command.Group
                  heading="Sections"
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500"
                >
                  {SECTIONS.map((s) => (
                    <Command.Item
                      key={s.id}
                      value={`${s.label} ${s.id}`}
                      onSelect={() => goToSection(s.id)}
                      className="group/item mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/[0.05] hover:text-white aria-selected:bg-white/[0.08] aria-selected:text-white"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.04] text-emerald-300 group-aria-selected/item:bg-emerald-300/20">
                        {s.icon}
                      </span>
                      <span className="font-medium">{s.label}</span>
                      <span className="ml-auto text-xs text-slate-500">Jump to</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Projects"
                  className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500"
                >
                  {QUICK_PROJECTS.map((p) => (
                    <Command.Item
                      key={p.name}
                      value={`${p.name} ${p.category}`}
                      onSelect={() => openHref(p.href)}
                      className="group/item mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/[0.05] hover:text-white aria-selected:bg-white/[0.08] aria-selected:text-white"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.04] text-cyan-300">
                        <Wrench className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{p.name}</span>
                      <span className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                        {p.category}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Quick actions"
                  className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500"
                >
                  <Command.Item
                    value="Email mailto contact send"
                    onSelect={() =>
                      openHref("mailto:tusharvijayvargiya24112000@gmail.com")
                    }
                    className="group/item mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/[0.05] hover:text-white aria-selected:bg-white/[0.08] aria-selected:text-white"
                  >
                    <Mail className="h-4 w-4 text-emerald-300" />
                    Send email
                  </Command.Item>
                  <Command.Item
                    value="Phone call dial"
                    onSelect={() => openHref("tel:+917389548853")}
                    className="group/item mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/[0.05] hover:text-white aria-selected:bg-white/[0.08] aria-selected:text-white"
                  >
                    <Phone className="h-4 w-4 text-emerald-300" />
                    Call +91 7389548853
                  </Command.Item>
                  <Command.Item
                    value="Resume CV download pdf"
                    onSelect={() => openHref("/CV_Tushar_Vijayvargiya.pdf")}
                    className="group/item mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/[0.05] hover:text-white aria-selected:bg-white/[0.08] aria-selected:text-white"
                  >
                    <Download className="h-4 w-4 text-emerald-300" />
                    Download CV
                  </Command.Item>
                  <Command.Item
                    value="GitHub profile open"
                    onSelect={() => openHref("https://github.com/tusharvijay24")}
                    className="group/item mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/[0.05] hover:text-white aria-selected:bg-white/[0.08] aria-selected:text-white"
                  >
                    <Github className="h-4 w-4 text-emerald-300" />
                    Open GitHub
                  </Command.Item>
                  <Command.Item
                    value="LinkedIn profile open"
                    onSelect={() =>
                      openHref("https://linkedin.com/in/tusharvijayvargiya")
                    }
                    className="group/item mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-white/[0.05] hover:text-white aria-selected:bg-white/[0.08] aria-selected:text-white"
                  >
                    <Linkedin className="h-4 w-4 text-emerald-300" />
                    Open LinkedIn
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-white/10 bg-black/30 px-4 py-2.5 text-[0.7rem] text-slate-500">
                <div className="flex items-center gap-3">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                </div>
                <span className="font-mono">⌘K to toggle</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
