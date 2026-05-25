"use client";

/**
 * Site-wide ambient background.
 *  - Animated drifting radial blobs (pure CSS, no JS).
 *  - Subtle SVG noise grain overlay for filmic depth.
 *  - Fixed-position, behind everything (-z-10).
 *  - Cheap: just opacity + transform animations on the GPU compositor.
 */
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#08090b]" />

      {/* Drifting aurora blobs */}
      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* Filmic grain — SVG noise as a CSS background */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.55%22/></svg>')]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
