'use client';
import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { navItems } from '@/lib/data';

export default function Nav({ activeSection, scrollToSection }: {
  activeSection: string;
  scrollToSection: (id: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => { scrollToSection(id); setIsMenuOpen(false); };

  return (
    <nav className={`site-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'site-nav-scrolled shadow-2xl shadow-black/30' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <button onClick={() => handleNav('about')} className="flex items-center gap-3" aria-label="Go to top">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold text-emerald-300 shadow-lg shadow-emerald-950/20">TV</span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold leading-5 text-white">Tushar Vijayvargiya</span>
            <span className="block text-xs text-slate-300">Senior iOS & Web Developer</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-slate-950/60 p-1 shadow-lg shadow-black/20 md:flex">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`rounded-full px-4 py-2 text-sm transition duration-300 ${activeSection === item.id ? 'bg-white text-slate-950 shadow-lg shadow-white/10' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/CV_Tushar_Vijayvargiya.pdf" download
            className="hidden items-center gap-2 rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:inline-flex">
            <Download className="h-4 w-4" /> CV
          </a>
          <button onClick={() => setIsMenuOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] md:hidden" aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#08090b]/95 px-5 pb-5 backdrop-blur-xl md:hidden">
          <div className="grid gap-2 pt-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-200">
                {item.label}
              </button>
            ))}
            <a href="/CV_Tushar_Vijayvargiya.pdf" download
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950">
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
