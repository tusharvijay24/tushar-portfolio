"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// useLayoutEffect runs synchronously before paint; useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HeroScene = dynamic(() => import("./NeuralScene"), {
  ssr: false,
  loading: () => null,
});

type Metric = { value: string; label: string };

type HeroProps = {
  metrics: Metric[];
  onPrimaryClick?: () => void;
};

/**
 * Headline split into lines of word "tokens".
 * Each token is rendered inside its own overflow-hidden mask so words slide
 * up as whole units (no mid-word breaks).
 */
const HEADLINE_LINES: Array<Array<{ text: string; accent?: boolean }>> = [
  [
    { text: "Building" },
    { text: "polished" },
    { text: "iOS", accent: true },
    { text: "&" },
    { text: "web" },
    { text: "apps" },
  ],
  [
    { text: "that" },
    { text: "are" },
    { text: "stable,", accent: true },
    { text: "scalable,", accent: true },
  ],
  [{ text: "and" }, { text: "production-ready.", accent: true }],
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 1.1 + i * 0.08,
      ease: [0.2, 0.8, 0.2, 1],
    },
  }),
};

export default function Hero({ metrics, onPrimaryClick }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const scrollToApps = useCallback(() => {
    if (onPrimaryClick) return onPrimaryClick();
    const el = document.getElementById("apps");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [onPrimaryClick]);

  // GSAP intro for the headline + ScrollTrigger ambient parallax
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const words =
        headlineRef.current?.querySelectorAll<HTMLElement>(".word-inner");

      if (words && words.length) {
        if (!reduceMotion) {
          gsap.set(words, { yPercent: 110, opacity: 0 });
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.25,
          });
        } else {
          gsap.set(words, { yPercent: 0, opacity: 1 });
        }
      }

      if (sectionRef.current && !reduceMotion) {
        gsap.to(".hero-stage", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-photo", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Introduction"
      className="relative isolate mx-auto max-w-7xl overflow-visible px-5 pb-14 pt-24 lg:px-8 lg:pt-28"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — Copy */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200 shadow-lg shadow-emerald-950/20 backdrop-blur"
          >
            <motion.span
              className="grid h-4 w-4 place-items-center"
              animate={reduceMotion ? undefined : { rotate: [0, 14, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            Available for iOS &amp; web roles and freelance builds
          </motion.div>

          <h1
            ref={headlineRef}
            className="cinematic-headline max-w-3xl text-white"
          >
            <SplitHeadline lines={HEADLINE_LINES} />
          </h1>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            I am Tushar Vijayvargiya, a Senior iOS Developer with 5+ years of
            experience shipping Swift, Objective-C, UIKit, and SwiftUI apps
            across e-commerce, enterprise, NFC, food ordering, utilities, and
            social commerce products. I also build full-stack web products
            using React and Next.js.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton onClick={scrollToApps} ariaLabel="View app work">
              <span className="group/btn relative inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition-colors duration-300 hover:bg-emerald-300">
                View App Work
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </span>
            </MagneticButton>
            <MagneticButton
              href="mailto:tusharvijayvargiya24112000@gmail.com"
              ariaLabel="Email Tushar"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-emerald-300/40 hover:bg-emerald-300/10">
                <Mail className="h-4 w-4" /> Contact Me
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.4 } } }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition-colors duration-300 hover:border-emerald-300/25 hover:bg-white/[0.07]"
              >
                <div className="font-display text-3xl font-semibold tracking-tight text-white">
                  <CountUpValue value={m.value} reduceMotion={!!reduceMotion} />
                </div>
                <div className="mt-1 text-sm leading-5 text-slate-400">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — 3D backdrop + Photo card */}
        <div className="relative mx-auto w-full max-w-md lg:ml-auto">
          {/* 3D ambient stage sits behind the card */}
          <div
            className="hero-stage pointer-events-none absolute -inset-16 -z-10 lg:-inset-24"
            aria-hidden
          >
            <div className="absolute inset-0">
              <HeroScene className="h-full w-full" />
            </div>
            {/* Soft inner vignette so the card edge reads cleanly */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,9,11,0.55)_75%,#08090b_100%)]" />
          </div>

          <PhotoCard reduceMotion={!!reduceMotion} />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="pointer-events-none mt-10 hidden lg:flex lg:justify-center"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 bg-white/[0.03] p-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------- helpers -------------------- */

/**
 * Word-level mask reveal. Each word sits inside an overflow-hidden inline-block
 * wrapper, so a `yPercent: 110 -> 0` GSAP tween slides the whole word up.
 * Words never break mid-character because each word is itself a single
 * non-breaking inline-block.
 */
function SplitHeadline({
  lines,
}: {
  lines: Array<Array<{ text: string; accent?: boolean }>>;
}) {
  return (
    <span className="block">
      {lines.map((line, li) => (
        <span key={li} className="block leading-[1.05]">
          {line.map((part, pi) => (
            <span
              key={pi}
              className="word-mask relative mr-[0.25em] inline-block overflow-hidden align-bottom pb-[0.18em]"
            >
              <span
                className={
                  "word-inner inline-block " +
                  (part.accent
                    ? "bg-gradient-to-r from-emerald-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent"
                    : "text-white")
                }
                style={{ willChange: "transform, opacity" }}
              >
                {part.text}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function PhotoCard({ reduceMotion }: { reduceMotion: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1200px) rotateX(${
      py * -8
    }deg) rotateY(${px * 10}deg)`;
  };
  const onLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="hero-photo relative"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={cardRef}
        style={{ transformStyle: "preserve-3d", transition: "transform 220ms ease-out" }}
        className="card-shine relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/40 backdrop-blur"
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-slate-950">
          <motion.img
            src="/tushar.jpg"
            alt="Tushar Vijayvargiya"
            className="h-[22rem] w-full object-cover object-center sm:h-[24rem]"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            draggable={false}
          />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
                Tushar Vijayvargiya
              </h2>
              <p className="mt-1 text-sm text-emerald-200">Senior iOS Developer</p>
            </div>
            <motion.img
              src="/swift-bird.png"
              alt="Swift logo"
              className="h-12 w-12 rounded-2xl border border-white/10 bg-white p-2 shadow-lg shadow-black/25"
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              draggable={false}
            />
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <ContactRow
              href="mailto:tusharvijayvargiya24112000@gmail.com"
              icon={<Mail className="h-4 w-4 text-emerald-300" />}
              label="tusharvijayvargiya24112000@gmail.com"
            />
            <ContactRow
              href="tel:+917389548853"
              icon={<Phone className="h-4 w-4 text-emerald-300" />}
              label="+91 7389548853"
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4 text-emerald-300" />}
              label="Gurgaon / Indore"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <SocialIcon href="https://github.com/tusharvijay24" label="GitHub">
              <Github className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/in/tusharvijayvargiya" label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MagneticButton({
  children,
  href,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  // Spring-physics-driven magnetic offset. Way smoother than setState.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.5 });

  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="inline-flex"
        data-cursor="hover"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-flex"
      type="button"
      data-cursor="hover"
    >
      {inner}
    </button>
  );
}

function ContactRow({
  href,
  icon,
  label,
}: {
  href?: string;
  icon: ReactNode;
  label: string;
}) {
  const className =
    "flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 transition hover:bg-white/10";
  if (href) {
    return (
      <a href={href} className={className}>
        {icon}
        <span className="truncate">{label}</span>
      </a>
    );
  }
  return (
    <div className={className}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white hover:text-slate-950"
    >
      {children}
    </motion.a>
  );
}

function CountUpValue({
  value,
  reduceMotion,
}: {
  value: string;
  reduceMotion: boolean;
}) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const target = match ? Number(match[2]) : NaN;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  // Spring-driven number morph. The spring rests at `count`, but we set it
  // imperatively from 0 → target when the element enters the viewport.
  const count = useMotionValue(reduceMotion || !match ? target : 0);
  const spring = useSpring(count, { stiffness: 70, damping: 18, mass: 0.6 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (!match || reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        count.set(target);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [count, match, reduceMotion, target]);

  if (!match) {
    return <span>{value}</span>;
  }
  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
