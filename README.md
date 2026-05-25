# Tushar Vijayvargiya — Portfolio

Personal portfolio of **Tushar Vijayvargiya**, a Senior iOS Developer building production-ready native iOS apps with Swift, UIKit, SwiftUI, Firebase, MapKit, payments, NFC, and App Store release workflows — plus modern web work using Next.js, React, and TypeScript.

🌐 **Live:** [https://tusharvijayvargiya.com](https://tusharvijayvargiya.com)

---

## Overview

This is a fully custom, dark, professional portfolio built with the **Next.js App Router**. It blends polished UI, real-time 3D scenes, scroll-tied animations, and a developer-flavored interaction layer (custom cursor, command palette, terminal). The site is statically rendered on Vercel and served through a Cloudflare-managed custom domain.

The site is designed to communicate native iOS engineering depth and production delivery — not just visual flair.

---

## Highlights

- **Next.js 16 App Router** with React 19 and TypeScript (strict)
- **Real 3D hero scene** powered by `@react-three/fiber` + `drei` (HDRI environment, GLB models, postprocessing)
- **Scroll-driven micro-interactions** with `gsap`, `framer-motion`, and `lenis` smooth scroll
- **Command palette** (`⌘K`) using `cmdk` for keyboard-first navigation
- **Custom cursor + spotlight + reveal-on-scroll** primitives
- **Animated career timeline, skills, services, and AI assistant card**
- **Tech marquee, energy orb, holographic borders, aurora gradient**
- **Programmatic `robots.txt` and `sitemap.xml`** via App Router metadata routes
- **Production iOS app cards** with App Store deep links and modal detail views
- **Downloadable CV** and direct contact actions (email / phone)
- **Fully responsive** (375px → 1440px+) with reduced-motion respected

---

## Tech Stack

**Framework**
- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5.8

**Styling**
- Tailwind CSS 3.4
- Geist font (via `geist/font`)
- Custom CSS effects (holo borders, glass, aurora, spotlights)

**3D / Graphics**
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing`

**Animation / Interaction**
- `framer-motion`
- `gsap`
- `lenis` (smooth scroll)
- `cmdk` (command palette)
- `lucide-react` (icons)

**Hosting / Infra**
- Vercel (auto-deploy from `main`)
- Cloudflare (DNS + custom domain)

---

## Project Structure

```text
.
├── app/
│   ├── components/          # Hero, NeuralScene, CommandPalette, Terminal, AIAssistant,
│   │                        # CareerTimeline, EnergyOrb, Aurora, RevealHeader, etc.
│   ├── globals.css          # Tailwind layers + custom effects
│   ├── layout.tsx           # Root layout, fonts, metadata, smooth scroll
│   ├── page.tsx             # Home — Hero + Apps + Skills + Services + Contact
│   ├── robots.ts            # /robots.txt
│   └── sitemap.ts           # /sitemap.xml
├── public/
│   ├── CV_Tushar_Vijayvargiya.pdf
│   ├── tushar.jpg
│   ├── tushar-profile-icon.png
│   ├── swift-bird.png
│   ├── hdri/                # HDRI environment maps for 3D scenes
│   └── models/              # .glb 3D assets
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+

### Install

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Deployment

The repo is connected to **Vercel** and auto-deploys on every push to `main`.

- Production: [https://tusharvijayvargiya.com](https://tusharvijayvargiya.com) (Cloudflare-managed DNS → Vercel)
- Build command: `npm run build`
- Output: `.next` (Next.js standalone, configured in `vercel.json`)

To deploy manually:

```bash
npm run build
vercel --prod
```

---

## Notable Components

| Component                  | What it does                                                              |
|----------------------------|---------------------------------------------------------------------------|
| `Hero.tsx`                 | Hero section with name, role, CTAs, profile photo, ambient effects        |
| `NeuralScene.tsx`          | Animated neural-network style 3D scene (R3F)                              |
| `HeroScene.tsx`            | GLB model render with HDRI environment lighting                           |
| `CommandPalette.tsx`       | `⌘K` quick-nav using `cmdk`                                               |
| `Terminal.tsx`             | Faux terminal showing `whoami`, stack, commands                           |
| `AIAssistant.tsx`          | Card showing AI-augmented dev workflow capabilities                       |
| `CareerTimeline.tsx`       | Vertical career timeline with reveal animations                           |
| `EnergyOrb.tsx`            | Glowing animated orb decoration (3D)                                      |
| `Aurora.tsx`               | Aurora-like gradient background                                           |
| `Floating3D.tsx`           | Floating animated 3D primitive shapes                                     |
| `TechMarquee.tsx`          | Infinite-scroll marquee of tech logos                                     |
| `LenisProvider.tsx`        | App-wide smooth scroll                                                    |
| `CustomCursor.tsx` / `CursorSpotlight.tsx` | Custom cursor with hover-aware spotlight effect           |
| `RevealHeader.tsx`         | Section header with scroll-reveal animation                               |
| `IntroLoader.tsx`          | First-load intro animation                                                |
| `ProjectModal.tsx`         | App Store project detail modal                                            |

---

## Performance Notes

- Heavy 3D components (`HeroScene`, `EnergyOrb`, `NeuralScene`) are loaded with `next/dynamic` + `ssr: false` and gated behind `loading: () => null` so they only mount client-side and never block initial paint.
- Static metadata, robots, and sitemap are generated at build time.
- All routes are prerendered as static (no API routes / no server runtime).

---

## Contact

- 📧 Email: [tusharvijayvargiya24112000@gmail.com](mailto:tusharvijayvargiya24112000@gmail.com)
- 📱 Phone: +91 7389548853
- 💼 LinkedIn: [linkedin.com/in/tushar-vijayvargiya](https://linkedin.com/in/tushar-vijayvargiya)
- 🐙 GitHub: [github.com/tusharvijay24](https://github.com/tusharvijay24)
- 🌐 Portfolio: [tusharvijayvargiya.com](https://tusharvijayvargiya.com)

---

## License

Personal portfolio — all rights reserved. Code is published openly for reference; please don't copy verbatim for your own portfolio.
