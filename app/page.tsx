"use client";

import dynamic from "next/dynamic";
import {
  LayoutGroup,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import Aurora from "./components/Aurora";
import CareerTimeline from "./components/CareerTimeline";
import Floating3D from "./components/Floating3D";
import Hero from "./components/Hero";
import ProjectModal, { type ModalProject } from "./components/ProjectModal";
import RevealHeader from "./components/RevealHeader";
import TechMarquee from "./components/TechMarquee";
import Terminal from "./components/Terminal";
import {
  Apple,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Command as CommandIcon,
  Download,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  ShieldCheck,
  X,
} from "lucide-react";

// Heavy 3D components — load only on client and lazy-mount when in viewport.
const EnergyOrb = dynamic(() => import("./components/EnergyOrb"), {
  ssr: false,
  loading: () => null,
});

const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Apps", id: "apps" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const metrics = [
  { value: "10+", label: "Production apps shipped" },
  { value: "5+", label: "Years building iOS apps" },
  { value: "8+", label: "App Store products" },
  { value: "2+", label: "Web products in production" },
];

type AppProject = {
  name: string;
  category: string;
  summary: string;
  stack: string[];
  outcome: string;
  link: string;
  accent: string;
  size?: "lg" | "md";
};

const appProjects: AppProject[] = [
  {
    name: "Cravingly",
    category: "Food Ordering",
    summary:
      "Community food ordering platform with nearby home-cook discovery, MapKit flows, Firebase-backed engagement, checkout, and order tracking.",
    stack: ["Objective-C", "UIKit", "MVVM", "StoreKit", "Deep Links"],
    outcome:
      "Led iOS development across discovery, search, privacy-ready release flows, push notifications, and App Store compliance.",
    link: "https://apps.apple.com/us/app/cravingly/id6633424731",
    accent: "from-rose-500 to-orange-400",
    size: "lg",
  },
  {
    name: "SIPN Bourbon",
    category: "Social Commerce",
    summary:
      "Social liquor commerce experience with interactive feeds, shoppable collections, brand discovery, and community-led purchase journeys.",
    stack: ["Swift", "UIKit", "MVVM", "Firebase", "Alamofire"],
    outcome:
      "Built interactive feed, Virtual Bar, community modules, cocktail recipes, and shoppable content for in-app purchase journeys.",
    link: "https://apps.apple.com/in/app/sipn-bourbon/id1597312660",
    accent: "from-amber-500 to-red-500",
    size: "md",
  },
  {
    name: "Ixkio",
    category: "NFC Platform",
    summary:
      "NFC tag management app combining CoreNFC, Vision, QR and barcode scanning with secure read, write, lock, and validation workflows.",
    stack: ["Swift", "CoreNFC", "Vision", "QR/Barcode", "Security"],
    outcome:
      "Architected reliable NFC read, write, and lock flows for NTAG and ICODE tags with QR/barcode scanning support.",
    link: "https://apps.apple.com/us/app/ixkio/id6467871130",
    accent: "from-cyan-400 to-blue-500",
    size: "md",
  },
  {
    name: "VECV Evolve",
    category: "Enterprise HRMS",
    summary:
      "Employee platform for Volvo Eicher covering leave management, cab booking, HR workflows, internal communication, and engagement modules.",
    stack: ["Swift", "UIKit", "REST APIs", "Enterprise", "MVVM"],
    outcome:
      "Shipped enterprise workflows used by employees across core HR operations.",
    link: "https://apps.apple.com/in/app/vecvevolve-empower-yourself/id1208034545",
    accent: "from-emerald-400 to-teal-500",
    size: "lg",
  },
  {
    name: "Eicher CRM",
    category: "CRM Analytics",
    summary:
      "Enterprise CRM app for sales, services, spares, complaints, on-road support, and KPI visibility across operational teams.",
    stack: ["Swift", "UIKit", "Analytics", "REST APIs", "Dashboards"],
    outcome:
      "Delivered KPI visibility across sales, service, spares, complaints, and on-road support for management and dealer teams.",
    link: "https://apps.apple.com/in/app/eicher-crm/id1467873868",
    accent: "from-violet-500 to-indigo-500",
    size: "md",
  },
  {
    name: "BC Starter",
    category: "Retail Commerce",
    summary:
      "White-label retail commerce app with barcode scanning, varietal filters, multi-location ordering, secure payments, and rewards.",
    stack: ["Swift", "SwiftUI", "MVVM", "Stripe", "WorldPay"],
    outcome:
      "Delivered white-label retail flows with barcode scan, filters, secure payments, pickup, delivery, driver tips, and directions.",
    link: "https://apps.apple.com/in/app/bc-starter/id1062799070",
    accent: "from-fuchsia-500 to-pink-500",
    size: "md",
  },
  {
    name: "PetPlayPartner",
    category: "Social Networking",
    summary:
      "Social platform for pets and owners to create profiles, discover playmates worldwide, and connect through a dedicated pet network.",
    stack: ["Swift", "UIKit", "MVVM", "REST APIs", "Firebase"],
    outcome:
      "Built pet video profiles, global search, connection requests, and owner-to-owner messaging for a niche social platform.",
    link: "https://apps.apple.com/us/app/petplaypartner/id6504684737",
    accent: "from-sky-400 to-indigo-500",
    size: "md",
  },
  {
    name: "3Fam",
    category: "Personal Safety",
    summary:
      "Emergency safety app enabling instant SOS alerts with live location, background audio recording, and quick access to nearby emergency services.",
    stack: ["Swift", "CoreLocation", "MapKit", "AVFoundation", "WidgetKit"],
    outcome:
      "Delivered multi-method SOS activation including widgets, back tap, voice commands, and lock screen access with real-time location sharing.",
    link: "https://apps.apple.com/us/app/3fam/id6504684738",
    accent: "from-red-500 to-rose-600",
    size: "md",
  },
  {
    name: "Latkanwali.in",
    category: "E-commerce Web",
    summary:
      "Full-stack production e-commerce storefront and admin for a live fashion brand, built with Next.js, PocketBase, and Razorpay.",
    stack: ["Next.js", "React", "TypeScript", "PocketBase", "Tailwind CSS"],
    outcome:
      "Shipped complete storefront, admin panel, order management, payments, shipping integration, and WhatsApp OTP auth end-to-end.",
    link: "https://latkanwali.in",
    accent: "from-pink-500 to-purple-500",
    size: "lg",
  },
];

const experience = [
  {
    role: "Senior iOS Developer",
    company: "Techmatic Systems India Pvt. Ltd.",
    period: "Apr 2025 - Jan 2026",
    location: "Hyderabad, Telangana",
    points: [
      "Leading iOS delivery for 3 large-scale SaaS and commerce products with Swift, UIKit, SwiftUI, Firebase, MapKit, barcode scanning, and payments.",
      "Improving production reliability through crash analysis, Instruments profiling, release monitoring, and tighter QA feedback loops.",
      "Adopting Tuist and mise for modular architecture, faster builds, and consistent development environments across the team.",
    ],
  },
  {
    role: "iOS Developer",
    company: "Mindcrew Technologies Pvt. Ltd.",
    period: "Apr 2023 - Apr 2025",
    location: "Indore, MP",
    points: [
      "Delivered 6+ iOS applications from scratch to App Store across e-commerce, healthcare, utilities, and service-based domains.",
      "Implemented MVVM architecture, API integration, push notifications, Firebase services, and third-party SDK workflows.",
      "Used Fastlane, Git, and TestFlight for beta testing, release management, and reliable delivery workflows.",
    ],
  },
  {
    role: "Associate Software Engineer (iOS)",
    company: "Softude Infotech Pvt. Ltd.",
    period: "Jun 2021 - Dec 2022",
    location: "Indore, MP",
    points: [
      "Delivered enterprise iOS modules for VECV, including CRM dashboards, HR workflows, employee services, and support operations.",
      "Modularized networking with URLSession and Codable, moving blocking workflows to background tasks and async patterns.",
      "Used Firebase Performance, Crashlytics, App Store Connect metrics, GitLab, Zoho, and TestFlight inside Agile delivery squads.",
    ],
  },
];

const skillGroups = [
  {
    title: "iOS Engineering",
    items: [
      "Swift",
      "Objective-C",
      "UIKit",
      "SwiftUI",
      "Combine",
      "Auto Layout",
      "Core Animation",
      "CoreData",
      "SwiftData",
    ],
  },
  {
    title: "Apple Frameworks",
    items: [
      "AVFoundation",
      "CoreLocation",
      "MapKit",
      "CoreNFC",
      "Vision",
      "ARKit",
      "StoreKit",
      "HealthKit",
    ],
  },
  {
    title: "Web Development",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
      "PocketBase",
    ],
  },
  {
    title: "Architecture",
    items: [
      "MVVM",
      "MVC",
      "Clean Architecture",
      "Modular Design",
      "Reusable Components",
      "Design Systems",
    ],
  },
  {
    title: "Product Delivery",
    items: [
      "Firebase",
      "Push Notifications",
      "Deep Links",
      "Fastlane",
      "TestFlight",
      "Tuist",
      "mise",
      "GitHub Actions",
    ],
  },
];

const services = [
  "Production iOS app development",
  "App modernization and UIKit to SwiftUI migration",
  "Firebase, maps, payments, NFC, and scanning integrations",
  "Full-stack web development with React and Next.js",
  "Crash debugging, profiling, and release support",
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openProject, setOpenProject] = useState<ModalProject | null>(null);
  const currentYear = new Date().getFullYear();

  // Framer Motion-driven scroll progress (used by the glowing top bar).
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const current = navItems.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom >= 160;
      });
      if (current) setActiveSection(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll via Lenis when available, otherwise native.
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-[#08090b] text-white selection:bg-emerald-300 selection:text-slate-950">
      <Aurora />

      <nav
        className={`site-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "site-nav-scrolled shadow-2xl shadow-black/30" : ""
        }`}
      >
        {/* Framer Motion-driven scroll progress bar */}
        <motion.div
          aria-hidden
          style={{ scaleX, originX: 0 }}
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-300 via-emerald-300 to-cyan-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]"
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            onClick={() => scrollTo("about")}
            className="flex items-center gap-3"
            aria-label="Go to top"
            data-cursor="hover"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] font-mono text-sm font-bold text-emerald-300 shadow-lg shadow-emerald-950/20">
              TV
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-5 text-white">
                Tushar Vijayvargiya
              </span>
              <span className="block text-xs text-slate-300">
                Senior iOS &amp; Web Developer
              </span>
            </span>
          </button>

          {/* Desktop nav: macOS-dock-style magnification + LayoutGroup pill */}
          <LayoutGroup id="nav">
            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-slate-950/60 p-1 shadow-lg shadow-black/20 md:flex">
              {navItems.map((item) => (
                <DockNavItem
                  key={item.id}
                  label={item.label}
                  active={activeSection === item.id}
                  onClick={() => scrollTo(item.id)}
                />
              ))}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-2 sm:gap-3">
            <kbd
              aria-hidden
              className="font-mono hidden items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[0.7rem] text-slate-300 sm:inline-flex"
            >
              <CommandIcon className="h-3.5 w-3.5" />K
            </kbd>
            <a
              href="/CV_Tushar_Vijayvargiya.pdf"
              download
              className="hidden items-center gap-2 rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
              data-cursor="hover"
            >
              <Download className="h-4 w-4" /> CV
            </a>
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] md:hidden"
              aria-label="Toggle menu"
              data-cursor="hover"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#08090b]/95 px-5 pb-5 backdrop-blur-xl md:hidden">
            <div className="grid gap-2 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-200"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/CV_Tushar_Vijayvargiya.pdf"
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </div>
          </div>
        )}
      </nav>

      <Hero metrics={metrics} onPrimaryClick={() => scrollTo("apps")} />

      <TechMarquee />

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="relative isolate mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <Floating3D
          shape="torus"
          color="#10b981"
          className="pointer-events-none absolute -right-10 top-10 h-72 w-72 opacity-70 lg:h-80 lg:w-80"
          scale={1.0}
          speed={0.35}
        />
        <RevealHeader
          eyebrow="Resume"
          title="Experience shaped by real production apps"
          accent={["production", "apps"]}
          text="I work across product planning, architecture, API integration, native iOS features, QA feedback, releases, and production issue resolution."
        />
        <CareerTimeline jobs={experience} />
      </section>

      {/* APPS — bento grid */}
      <section
        id="apps"
        className="relative isolate bg-[#0d0f12] px-5 py-24 lg:px-8"
      >
        <Floating3D
          shape="knot"
          color="#22d3ee"
          className="pointer-events-none absolute -left-16 top-32 h-[28rem] w-[28rem] opacity-60"
          scale={1.1}
          speed={0.3}
        />
        <Floating3D
          shape="dodeca"
          color="#a7f3d0"
          className="pointer-events-none absolute -right-10 bottom-40 hidden h-72 w-72 opacity-50 lg:block"
          scale={1.0}
          speed={0.4}
          sparkles={false}
        />
        <div className="relative mx-auto max-w-7xl">
          <RevealHeader
            eyebrow="Selected Apps"
            title="App Store products, enterprise tools, and native iOS systems"
            accent={["App", "Store", "products,", "iOS"]}
            text="Click any card to expand a cinematic case detail. Or hit ⌘K and jump straight to a project."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {appProjects.map((project, index) => (
              <Reveal
                key={project.name}
                delay={(index % 2) * 90}
              >
                <AppBentoCard
                  project={project}
                  index={index}
                  onOpen={() => setOpenProject(project)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAL — developer personality */}
      <Terminal />

      {/* SKILLS — categories with EnergyOrb accent */}
      <section
        id="skills"
        className="relative isolate mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <EnergyOrb
          className="pointer-events-none absolute -right-16 top-20 hidden h-80 w-80 opacity-60 lg:block"
          color="#0a3a2c"
          emissive="#10b981"
        />
        <RevealHeader
          eyebrow="Technical Stack"
          title="Skills organized around delivery, not buzzwords"
          accent={["delivery,"]}
          text="The focus is native iOS engineering, production architecture, and integrations that directly affect shipped mobile products."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <article className="holo-border group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[0.065]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-200 transition duration-300 group-hover:bg-emerald-300 group-hover:text-slate-950">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES — white contrast section */}
      <section className="relative bg-white text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal className="text-slate-950">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                What I Can Help With
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                iOS engineering support from idea to release.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s} delay={i * 80}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/70">
                  <ShieldCheck className="h-6 w-6 text-emerald-700" />
                  <p className="mt-4 font-medium leading-6">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative isolate mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <Floating3D
          shape="dodeca"
          color="#10b981"
          className="pointer-events-none absolute -right-12 -top-4 h-80 w-80 opacity-60 lg:h-96 lg:w-96"
          scale={1.05}
          speed={0.35}
        />
        <Reveal>
          <div className="holo-border card-shine relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                  <Rocket className="h-4 w-4" /> Let us build something production-ready
                </div>
                <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
                  Need a reliable iOS or web developer for your product?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  I am available for full-time iOS or web roles, freelance app
                  development, app modernization, native integrations, and
                  release support.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:tusharvijayvargiya24112000@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                    data-cursor="hover"
                  >
                    <Mail className="h-4 w-4" /> Send Email
                  </a>
                  <a
                    href="tel:+917389548853"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
                    data-cursor="hover"
                  >
                    <Phone className="h-4 w-4" /> Call Me
                  </a>
                </div>
              </div>
              <div className="grid gap-4">
                <InfoCard
                  icon={<BriefcaseBusiness className="h-5 w-5" />}
                  label="Current focus"
                  value="Swift, UIKit, SwiftUI, React, Next.js, Firebase, Maps, Payments, NFC"
                />
                <InfoCard
                  icon={<Award className="h-5 w-5" />}
                  label="Education"
                  value="B.Tech EC, MIT Indore + iOS Bootcamp Certified"
                />
                <InfoCard
                  icon={<MapPin className="h-5 w-5" />}
                  label="Location"
                  value="Gurgaon / Indore. Open to remote and hybrid roles."
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        <p>Copyright © {currentYear} Tushar Vijayvargiya. All rights reserved.</p>
        <p className="mt-2 text-xs text-slate-600">
          Press{" "}
          <kbd className="font-mono mx-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[0.7rem]">
            ⌘K
          </kbd>{" "}
          to open the command palette.
        </p>
      </footer>

      {/* Project modal — overlay */}
      <ProjectModal
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </main>
  );
}

/* -------------------- supporting components -------------------- */

/**
 * Single dock-style nav item. Mounts inside a LayoutGroup so the active
 * white pill animates between tabs as a shared element. Hover triggers a
 * spring scale ("magnification"), recreating the macOS dock vibe without
 * needing per-item width measurement.
 */
function DockNavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  // Spring-driven hover scale.
  const scale = useMotionValue(1);
  const sScale = useSpring(scale, { stiffness: 320, damping: 22 });
  const y = useTransform(sScale, [1, 1.18], [0, -2]);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => scale.set(1.18)}
      onHoverEnd={() => scale.set(1)}
      style={{ scale: sScale, y }}
      className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
        active ? "text-slate-950" : "text-slate-300 hover:text-white"
      }`}
      data-cursor="hover"
    >
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 -z-0 rounded-full bg-white shadow-lg shadow-white/10"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

function AppBentoCard({
  project,
  index,
  onOpen,
}: {
  project: AppProject;
  index: number;
  onOpen: () => void;
}) {
  const featured = project.size === "lg";
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="holo-border group flex h-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] transition-colors duration-500 hover:border-emerald-300/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-black/40"
      data-cursor="hover"
      onClick={onOpen}
    >
      <div className="grid w-full grid-cols-1 sm:grid-cols-[0.85fr_1.15fr]">
        {/* Phone mockup panel */}
        <div
          className={`relative flex items-center bg-gradient-to-br ${project.accent} p-6`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.34),transparent_45%)]" />
          <motion.div
            whileHover={{ scale: 1.04, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="phone-float relative mx-auto flex h-64 w-36 flex-col rounded-[2rem] border-4 border-slate-950 bg-slate-950 p-2 shadow-2xl shadow-black/40"
          >
            <div className="mx-auto mb-2 h-3 w-14 rounded-full bg-white/20" />
            <div className="flex flex-1 flex-col justify-between rounded-[1.4rem] bg-white p-3 text-slate-950">
              <div>
                <div
                  className={`mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${project.accent} text-lg font-bold text-white`}
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
                  className={`scan-line h-8 rounded-xl bg-gradient-to-r ${project.accent}`}
                />
              </div>
            </div>
          </motion.div>
          <span className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
          {featured && (
            <span className="absolute right-5 top-5 rounded-full border border-white/40 bg-black/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              Featured
            </span>
          )}
        </div>

        {/* Content panel */}
        <div className="flex h-full flex-col p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-200">
            <Apple className="h-4 w-4" />
            {project.category}
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {project.summary}
          </p>
          <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">
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
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200"
              aria-hidden
            >
              View case <ArrowUpRight className="h-4 w-4" />
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-slate-400 underline-offset-4 hover:text-white hover:underline"
              data-cursor="hover"
            >
              {project.link.includes("apple.com")
                ? "App Store ↗"
                : "Live site ↗"}
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.72,
        delay: delay / 1000,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors duration-300 hover:border-emerald-300/25 hover:bg-black/30"
    >
      <div className="flex items-center gap-3 text-emerald-200">
        {icon}
        <p className="text-sm font-medium">{label}</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{value}</p>
    </motion.div>
  );
}
