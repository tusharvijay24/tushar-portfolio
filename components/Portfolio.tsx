'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Apple, ArrowUpRight, Award, BriefcaseBusiness, CheckCircle2,
  Code2, GitBranch, Link, Mail, MapPin, Phone, Rocket, ShieldCheck, Sparkles,
} from 'lucide-react';
import { metrics, appProjects, experience, skillGroups, services, highlights, navItems } from '@/lib/data';
import { Reveal, SectionHeader, InfoCard } from '@/components/ui';
import Nav from '@/components/Nav';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => {
      const current = navItems.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom >= 160;
      });
      if (current) setActiveSection(current.id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-white selection:bg-emerald-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.14),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.04)_0,transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <Nav activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* About */}
      <section id="about" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="animate-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200 shadow-lg shadow-emerald-950/20">
            <Sparkles className="h-4 w-4 animate-soft-pulse" />
            Available for iOS & web roles and freelance builds
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Building polished iOS and web apps that are stable, scalable, and ready for production.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I am Tushar Vijayvargiya, a Senior iOS Developer with 5+ years of experience shipping Swift, Objective-C, UIKit, and SwiftUI apps across e-commerce, enterprise, NFC, food ordering, utilities, and social commerce products. I also build full-stack web products using React and Next.js.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scrollToSection('apps')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300">
              View App Work
              <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a href="mailto:tusharvijayvargiya24112000@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-300/10">
              <Mail className="h-4 w-4" /> Contact Me
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
              <Image src="/tushar.jpg" alt="Tushar Vijayvargiya" width={480} height={480} className="h-[30rem] w-full object-cover object-center transition duration-700 hover:scale-[1.03]" priority />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Tushar Vijayvargiya</h2>
                  <p className="mt-1 text-sm text-emerald-200">Senior iOS Developer</p>
                </div>
                <Image src="/swift-bird.png" alt="Swift logo" width={48} height={48} className="h-12 w-12 rounded-2xl border border-white/10 bg-white p-2 shadow-lg shadow-black/25" />
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-300">
                <a href="mailto:tusharvijayvargiya24112000@gmail.com" className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 transition hover:bg-white/10">
                  <Mail className="h-4 w-4 text-emerald-300" /> tusharvijayvargiya24112000@gmail.com
                </a>
                <a href="tel:+917389548853" className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 transition hover:bg-white/10">
                  <Phone className="h-4 w-4 text-emerald-300" /> +91 7389548853
                </a>
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
                  <MapPin className="h-4 w-4 text-emerald-300" /> Gurgaon / Indore
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <a href="https://github.com/btwittstushar" target="_blank" rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:bg-white hover:text-slate-950" aria-label="GitHub">
                  <GitBranch className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/tusharvijayvargiya" target="_blank" rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:bg-white hover:text-slate-950" aria-label="LinkedIn">
                  <Link className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Highlights bar */}
      <section className="relative border-y border-white/10 bg-white/[0.03] px-5 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {highlights.map(([title, text], index) => (
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

      {/* Experience */}
      <section id="experience" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow="Resume" title="Experience shaped by real production apps"
            text="I work across product planning, architecture, API integration, native iOS features, QA feedback, releases, and production issue resolution." />
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
                    <MapPin className="h-4 w-4 text-emerald-300" /> {job.location}
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

      {/* Apps */}
      <section id="apps" className="relative bg-[#0d0f12] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader eyebrow="Selected Apps" title="App Store products, enterprise tools, and native iOS systems"
              text="Instead of showing generic cards, this portfolio focuses on real shipped apps and the engineering responsibilities behind them." />
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
                            <p className="mt-1 text-base font-bold leading-5 break-words">{project.name}</p>
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
                        <Apple className="h-4 w-4" /> {project.category}
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
                      <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">{project.outcome}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">{item}</span>
                        ))}
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-emerald-200 transition hover:text-white">
                        {project.category === 'E-commerce Web' ? 'View Website' : 'View on App Store'}
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

      {/* Skills */}
      <section id="skills" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow="Technical Stack" title="Skills organized around delivery, not buzzwords"
            text="The focus is native iOS engineering, production architecture, and integrations that directly affect shipped mobile products." />
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
                    <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300">{item}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
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

      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <div className="card-shine rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                  <Rocket className="h-4 w-4" /> Let us build something production-ready
                </div>
                <h2 className="text-4xl font-semibold leading-tight md:text-5xl">Need a reliable iOS or web developer for your product?</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  I am available for full-time iOS or web roles, freelance app development, app modernization, native integrations, and release support.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="mailto:tusharvijayvargiya24112000@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-white">
                    <Mail className="h-4 w-4" /> Send Email
                  </a>
                  <a href="tel:+917389548853"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950">
                    <Phone className="h-4 w-4" /> Call Me
                  </a>
                </div>
              </div>
              <div className="grid gap-4">
                <InfoCard icon={<BriefcaseBusiness className="h-5 w-5" />} label="Current focus" value="Swift, UIKit, SwiftUI, React, Next.js, Firebase, Maps, Payments, NFC" />
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
