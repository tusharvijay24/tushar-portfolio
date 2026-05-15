'use client';
import { useEffect, useRef, useState } from 'react';

export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setIsVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.16 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-300">{text}</p>
    </div>
  );
}

export function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
