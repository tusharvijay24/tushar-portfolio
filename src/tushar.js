import React, { useEffect, useRef, useState } from 'react';
import {
  Apple,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Apps', id: 'apps' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const metrics = [
  { value: '10+', label: 'Production apps shipped' },
  { value: '5+', label: 'Years building iOS apps' },
  { value: '8+', label: 'App Store products' },
  { value: '~30%', label: 'Crash reduction delivered' },
];

const appProjects = [
  {
    name: 'Cravingly',
    category: 'Food Ordering',
    summary:
      'Community food ordering platform with nearby home-cook discovery, MapKit flows, Firebase-backed engagement, checkout, and order tracking.',
    stack: ['Objective-C', 'UIKit', 'MVVM', 'StoreKit', 'Deep Links'],
    outcome: 'Led iOS development across discovery, search, privacy-ready release flows, push notifications, and App Store compliance.',
    link: 'https://apps.apple.com/us/app/cravingly/id6633424731',
    accent: 'from-rose-500 to-orange-400',
  },
  {
    name: 'SIPN Bourbon',
    category: 'Social Commerce',
    summary:
      'Social liquor commerce experience with interactive feeds, shoppable collections, brand discovery, and community-led purchase journeys.',
    stack: ['Swift', 'UIKit', 'MVVM', 'Firebase', 'Alamofire'],
    outcome: 'Built interactive feed, Virtual Bar, community modules, cocktail recipes, and shoppable content for in-app purchase journeys.',
    link: 'https://apps.apple.com/in/app/sipn-bourbon/id1597312660',
    accent: 'from-amber-500 to-red-500',
  },
  {
    name: 'Ixkio',
    category: 'NFC Platform',
    summary:
      'NFC tag management app combining CoreNFC, Vision, QR and barcode scanning with secure read, write, lock, and validation workflows.',
    stack: ['Swift', 'CoreNFC', 'Vision', 'QR/Barcode', 'Security'],
    outcome: 'Architected reliable NFC read, write, and lock flows for NTAG and ICODE tags with QR/barcode scanning support.',
    link: 'https://apps.apple.com/us/app/ixkio/id6467871130',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'VECV Evolve',
    category: 'Enterprise HRMS',
    summary:
      'Employee platform for Volvo Eicher covering leave management, cab booking, HR workflows, internal communication, and engagement modules.',
    stack: ['Swift', 'UIKit', 'REST APIs', 'Enterprise', 'MVVM'],
    outcome: 'Shipped enterprise workflows used by employees across core HR operations.',
    link: 'https://apps.apple.com/in/app/vecvevolve-empower-yourself/id1208034545',
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Eicher CRM',
    category: 'CRM Analytics',
    summary:
      'Enterprise CRM app for sales, services, spares, complaints, on-road support, and KPI visibility across operational teams.',
    stack: ['Swift', 'UIKit', 'Analytics', 'REST APIs', 'Dashboards'],
    outcome: 'Delivered KPI visibility across sales, service, spares, complaints, and on-road support for management and dealer teams.',
    link: 'https://apps.apple.com/in/app/eicher-crm/id1467873868',
    accent: 'from-violet-500 to-indigo-500',
  },
  {
    name: 'BC Starter',
    category: 'Retail Commerce',
    summary:
      'White-label retail commerce app with barcode scanning, varietal filters, multi-location ordering, secure payments, and rewards.',
    stack: ['Swift', 'SwiftUI', 'MVVM', 'Stripe', 'WorldPay'],
    outcome: 'Delivered white-label retail flows with barcode scan, filters, secure payments, pickup, delivery, driver tips, and directions.',
    link: 'https://apps.apple.com/in/app/bc-starter/id1062799070',
    accent: 'from-fuchsia-500 to-pink-500',
  },
];

const experience = [
  {
    role: 'Senior iOS Developer',
    company: 'Techmatic Systems India Pvt. Ltd.',
    period: 'Apr 2025 - Jan 2026',
    location: 'Hyderabad, Telangana',
    points: [
      'Leading iOS delivery for 3 large-scale SaaS and commerce products with Swift, UIKit, SwiftUI, Firebase, MapKit, barcode scanning, and payments.',
      'Improving production reliability through crash analysis, Instruments profiling, release monitoring, and tighter QA feedback loops.',
      'Adopting Tuist and mise for modular architecture, faster builds, and consistent development environments across the team.',
    ],
  },
  {
    role: 'iOS Developer',
    company: 'Mindcrew Technologies Pvt. Ltd.',
    period: 'Apr 2023 - Apr 2025',
    location: 'Indore, MP',
    points: [
      'Delivered 6+ iOS applications from scratch to App Store across e-commerce, healthcare, utilities, and service-based domains.',
      'Implemented MVVM architecture, API integration, push notifications, Firebase services, and third-party SDK workflows.',
      'Used Fastlane, Git, and TestFlight for beta testing, release management, and reliable delivery workflows.',
    ],
  },
  {
    role: 'Associate Software Engineer (iOS)',
    company: 'Softude Infotech Pvt. Ltd.',
    period: 'Jun 2021 - Dec 2022',
    location: 'Indore, MP',
    points: [
      'Delivered enterprise iOS modules for VECV, including CRM dashboards, HR workflows, employee services, and support operations.',
      'Modularized networking with URLSession and Codable, moving blocking workflows to background tasks and async patterns.',
      'Used Firebase Performance, Crashlytics, App Store Connect metrics, GitLab, Zoho, and TestFlight inside Agile delivery squads.',
    ],
  },
];

const skillGroups = [
  {
    title: 'iOS Engineering',
    items: ['Swift', 'Objective-C', 'UIKit', 'SwiftUI', 'Combine', 'Auto Layout', 'Core Animation', 'CoreData', 'SwiftData'],
  },
  {
    title: 'Apple Frameworks',
    items: ['AVFoundation', 'CoreLocation', 'MapKit', 'CoreNFC', 'Vision', 'ARKit', 'StoreKit', 'HealthKit'],
  },
  {
    title: 'Architecture',
    items: ['MVVM', 'MVC', 'Clean Architecture', 'Modular Design', 'Reusable Components', 'Design Systems'],
  },
  {
    title: 'Product Delivery',
    items: ['REST APIs', 'Firebase', 'Push Notifications', 'Deep Links', 'Fastlane', 'TestFlight', 'Tuist', 'mise'],
  },
];

const services = [
  'Production iOS app development',
  'App modernization and UIKit to SwiftUI migration',
  'Firebase, maps, payments, NFC, and scanning integrations',
  'Crash debugging, profiling, and release support',
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const currentSection = navItems.find(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom >= 160;
      });
      if (currentSection) setActiveSection(currentSection.id);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-white selection:bg-emerald-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.14),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.04)_0,transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
      <nav className={`site-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'site-nav-scrolled shadow-2xl shadow-black/30' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={() => scrollToSection('about')} className="flex items-center gap-3" aria-label="Go to top">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold text-emerald-300 shadow-lg shadow-emerald-950/20 transition group-hover:border-emerald-300/30">TV</span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-5 text-white">Tushar Vijayvargiya</span>
              <span className="block text-xs text-slate-300">Senior iOS Developer</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-slate-950/60 p-1 shadow-lg shadow-black/20 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-4 py-2 text-sm transition duration-300 ${activeSection === item.id ? 'bg-white text-slate-950 shadow-lg shadow-white/10' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/CV_Tushar_Vijayvargiya.pdf"
              download
              className="hidden items-center gap-2 rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] md:hidden"
              aria-label="Toggle menu"
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
                  onClick={() => scrollToSection(item.id)}
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
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
        )}
      </nav>

      <section id="about" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="animate-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200 shadow-lg shadow-emerald-950/20">
            <Sparkles className="h-4 w-4 animate-soft-pulse" />
            Available for iOS roles and freelance builds
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Building polished iOS apps that are stable, scalable, and ready for the App Store.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I am Tushar Vijayvargiya, a Senior iOS Developer with 5+ years of experience shipping Swift, Objective-C, UIKit, and SwiftUI apps across e-commerce, enterprise, NFC, food ordering, utilities, and social commerce products.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToSection('apps')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              View App Work
              <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="mailto:tusharvijayvargiya24112000@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-300/10"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 80}>
              <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[0.07]">
                <div className="text-3xl font-semibold text-white">{metric.value}</div>
                <div className="mt-1 text-sm leading-5 text-slate-400">{metric.label}</div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>

        <aside className="animate-rise-delay relative mx-auto w-full max-w-md lg:ml-auto">
          <div className="card-shine rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/40 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-emerald-300/25">
            <div className="overflow-hidden rounded-[1.5rem] bg-slate-950">
              <img src="/tushar.jpg" alt="Tushar Vijayvargiya" className="h-[30rem] w-full object-cover object-center transition duration-700 hover:scale-[1.03]" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Tushar Vijayvargiya</h2>
                  <p className="mt-1 text-sm text-emerald-200">Senior iOS Developer</p>
                </div>
                <img src="/swift-bird.png" alt="Swift logo" className="h-12 w-12 rounded-2xl border border-white/10 bg-white p-2 shadow-lg shadow-black/25" />
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-300">
                <a href="mailto:tusharvijayvargiya24112000@gmail.com" className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 transition hover:bg-white/10">
                  <Mail className="h-4 w-4 text-emerald-300" />
                  tusharvijayvargiya24112000@gmail.com
                </a>
                <a href="tel:+917389548853" className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 transition hover:bg-white/10">
                  <Phone className="h-4 w-4 text-emerald-300" />
                  +91 7389548853
                </a>
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  Gurgaon / Indore
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <a href="https://github.com/tusharvijay24" target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:bg-white hover:text-slate-950" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/tusharvijayvargiya" target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:bg-white hover:text-slate-950" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.03] px-5 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ['Clean Architecture', 'MVVM, modular components, reusable UI'],
            ['Native Integrations', 'Firebase, Apple Pay, maps, NFC, camera'],
            ['Release Ownership', 'TestFlight, App Store, debugging, support'],
            ['Product Mindset', 'Stable UX, measurable outcomes, team delivery'],
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 70}>
            <div className="flex gap-3 rounded-2xl p-3 transition duration-300 hover:bg-white/[0.04]">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
              <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Resume"
            title="Experience shaped by real production apps"
            text="I work across product planning, architecture, API integration, native iOS features, QA feedback, releases, and production issue resolution."
          />
        </Reveal>
        <div className="mt-12 grid gap-5">
          {experience.map((job, index) => (
            <Reveal key={`${job.company}-${job.period}`} delay={index * 110}>
            <article className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-emerald-950/20 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-200">{job.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{job.role}</h3>
                  <p className="mt-1 text-slate-300">{job.company}</p>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300 transition group-hover:border-emerald-300/25">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  {job.location}
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {job.points.map((point) => (
                  <p key={point} className="flex gap-3 text-sm leading-7 text-slate-300">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.55)]" />
                    {point}
                  </p>
                ))}
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="apps" className="relative bg-[#0d0f12] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Selected Apps"
              title="App Store products, enterprise tools, and native iOS systems"
              text="Instead of showing generic cards, this portfolio focuses on real shipped apps and the engineering responsibilities behind them."
            />
          </Reveal>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
            {appProjects.map((project, index) => (
              <Reveal key={project.name} className="h-full" delay={(index % 2) * 120}>
              <article className="group flex h-full min-h-[34rem] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] transition duration-500 hover:-translate-y-2 hover:border-emerald-300/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-black/40">
                <div className="grid min-h-full w-full gap-0 md:grid-cols-[0.8fr_1.2fr]">
                  <div className={`relative flex min-h-72 items-center bg-gradient-to-br ${project.accent} p-6`}>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.34),transparent_45%)]" />
                    <div className="phone-float relative mx-auto flex h-64 w-36 flex-col rounded-[2rem] border-4 border-slate-950 bg-slate-950 p-2 shadow-2xl shadow-black/40 transition duration-500 group-hover:rotate-0 group-hover:scale-[1.03]">
                      <div className="mx-auto mb-2 h-3 w-14 rounded-full bg-white/20" />
                      <div className="flex flex-1 flex-col justify-between rounded-[1.4rem] bg-white p-3 text-slate-950">
                        <div>
                          <div className={`mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${project.accent} text-lg font-bold text-white`}>
                            {project.name.slice(0, 2).toUpperCase()}
                          </div>
                          <p className="text-xs font-semibold text-slate-500">{project.category}</p>
                          <p className="mt-1 text-lg font-bold leading-5">{project.name}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 rounded-full bg-slate-200" />
                          <div className="h-2 w-2/3 rounded-full bg-slate-200" />
                          <div className={`scan-line h-8 rounded-xl bg-gradient-to-r ${project.accent}`} />
                        </div>
                      </div>
                    </div>
                    <span className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur">0{index + 1}</span>
                  </div>
                  <div className="flex h-full flex-col p-6 md:p-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-200">
                      <Apple className="h-4 w-4" />
                      {project.category}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
                    <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">{project.outcome}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-emerald-200 transition hover:text-white">
                      View on App Store
                      <ArrowUpRight className="h-4 w-4 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Technical Stack"
            title="Skills organized around delivery, not buzzwords"
            text="The focus is native iOS engineering, production architecture, and integrations that directly affect shipped mobile products."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 90}>
            <article className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[0.065]">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-200 transition duration-300 group-hover:bg-emerald-300 group-hover:text-slate-950">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative bg-white text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal className="text-slate-950">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">What I Can Help With</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">iOS engineering support from idea to release.</h2>
          </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service} delay={index * 80}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/70">
                <ShieldCheck className="h-6 w-6 text-emerald-700" />
                <p className="mt-4 font-medium leading-6">{service}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
        <div className="card-shine rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                <Rocket className="h-4 w-4" />
                Let us build something production-ready
              </div>
              <h2 className="text-4xl font-semibold leading-tight md:text-5xl">Need a reliable iOS developer for your app?</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                I am available for full-time iOS roles, freelance app development, app modernization, native integrations, and release support.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:tusharvijayvargiya24112000@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-white">
                  <Mail className="h-4 w-4" />
                  Send Email
                </a>
                <a href="tel:+917389548853" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950">
                  <Phone className="h-4 w-4" />
                  Call Me
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              <InfoCard icon={<BriefcaseBusiness className="h-5 w-5" />} label="Current focus" value="Swift, UIKit, SwiftUI, Firebase, Maps, Payments, NFC" />
              <InfoCard icon={<Award className="h-5 w-5" />} label="Education" value="B.Tech EC, MIT Indore + iOS Bootcamp Certified" />
              <InfoCard icon={<MapPin className="h-5 w-5" />} label="Location" value="Gurgaon / Indore. Open to remote and hybrid roles." />
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
        <p>Copyright © {currentYear} Tushar Vijayvargiya. All rights reserved.</p>
      </footer>
    </main>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-300">{text}</p>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.16 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-black/30">
      <div className="flex items-center gap-3 text-emerald-200">
        {icon}
        <p className="text-sm font-medium">{label}</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}
