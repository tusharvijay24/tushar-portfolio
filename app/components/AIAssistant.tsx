"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Floating "AI assistant" widget. Fully client-side, no real model calls.
 *
 *  - Pulsing voice-wave dock button (4 animated bars)
 *  - Click to open a Linear-style glass chat panel
 *  - Pre-canned responses keyed off keywords (skills, projects, contact, …)
 *  - Typewriter effect for assistant replies
 *  - Honors prefers-reduced-motion (instant text, no voice-wave animation)
 */

type Msg = { role: "user" | "assistant"; text: string };

const STARTER: Msg = {
  role: "assistant",
  text:
    "Hi — I'm a tiny on-page assistant trained on Tushar's portfolio. Ask me about skills, experience, projects, or how to reach him.",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/(skill|stack|tech|tool)/.test(q))
    return "Tushar's strongest stacks are Swift / SwiftUI / UIKit on iOS, and React / Next.js / TypeScript on web. Apple frameworks include CoreNFC, MapKit, Vision, ARKit, AVFoundation. Delivery toolchain: Fastlane, TestFlight, Tuist, GitHub Actions.";
  if (/(project|app|portfolio|case)/.test(q))
    return "10+ production apps shipped, 8+ on the App Store. Highlights: Cravingly (food ordering), SIPN Bourbon (social commerce), Ixkio (NFC platform), VECV Evolve (enterprise HR), Eicher CRM, BC Starter, PetPlayPartner, 3Fam (safety + WidgetKit). On the web side: Latkanwali.in (Next.js + PocketBase + Razorpay).";
  if (/(experience|work|company|role|year)/.test(q))
    return "5+ years building production iOS apps. Currently Senior iOS Developer at Techmatic Systems (Apr 2025 – Jan 2026). Prior: iOS Developer at Mindcrew (2023–2025) and Associate Software Engineer at Softude (2021–2022).";
  if (/(contact|email|hire|reach|phone|available)/.test(q))
    return "Reach out via email tusharvijayvargiya24112000@gmail.com or phone +91 7389548853. Tushar is open to senior iOS / web roles, freelance app builds, and modernization / release support.";
  if (/(location|where|based|country|city)/.test(q))
    return "Based in Gurgaon / Indore, India — open to remote and hybrid roles globally.";
  if (/(cv|resume)/.test(q))
    return "The PDF resume is in the navbar download icon, or hit ⌘K and pick \"Download CV\" from the command palette.";
  if (/(hello|hi|hey|sup|yo)/.test(q))
    return "Hey there. Ask me about Tushar's skills, projects, experience, or how to get in touch.";
  return "I can answer questions about Tushar's skills, experience, shipped projects, location, and contact details. Try \"projects\", \"skills\", or \"how do I hire\".";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([STARTER]);
  const [pending, setPending] = useState("");
  const [input, setInput] = useState("");
  const reduceMotion = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      reduceMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, pending]);

  const sendMessage = async (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);

    const full = reply(text);
    if (reduceMotion.current) {
      setMessages((m) => [...m, { role: "assistant", text: full }]);
      return;
    }
    // Typewriter
    setPending("");
    let i = 0;
    const speed = 14;
    const tick = () => {
      i += 1;
      setPending(full.slice(0, i));
      if (i < full.length) {
        setTimeout(tick, speed);
      } else {
        setMessages((m) => [...m, { role: "assistant", text: full }]);
        setPending("");
      }
    };
    setTimeout(tick, 220);
  };

  return (
    <>
      {/* Dock button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        data-cursor="hover"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="fixed bottom-6 right-6 z-[150] grid h-14 w-14 place-items-center rounded-full border border-emerald-300/30 bg-[#08090b]/90 text-emerald-300 shadow-2xl shadow-emerald-950/40 backdrop-blur"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/20 blur-md" />
        {open ? (
          <X className="relative h-5 w-5" />
        ) : (
          <span className="relative flex h-6 items-end gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="ai-wave-bar block w-[3px] rounded-full bg-emerald-300"
                style={{ animationDelay: `${i * 110}ms` }}
              />
            ))}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-24 right-6 z-[150] flex w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e12]/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-300/10 text-emerald-300">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    Portfolio Assistant
                  </span>
                  <span className="flex items-center gap-1 text-[0.65rem] text-emerald-300">
                    <Sparkles className="h-3 w-3" />
                    On-page · trained on resume
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/[0.05] hover:text-white"
                aria-label="Close assistant"
                data-cursor="hover"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex max-h-[55vh] min-h-[18rem] flex-col gap-3 overflow-y-auto px-4 py-4 text-sm"
            >
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} text={m.text} />
              ))}
              {pending && <Bubble role="assistant" text={pending} typing />}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, contact…"
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-300/40"
              />
              <button
                type="submit"
                aria-label="Send message"
                data-cursor="hover"
                className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300 text-slate-950 transition hover:bg-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({
  role,
  text,
  typing,
}: {
  role: Msg["role"];
  text: string;
  typing?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <span
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-br-md bg-emerald-300 px-3.5 py-2 text-slate-950"
            : "max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2 text-slate-200"
        }
      >
        {text}
        {typing && <span className="ml-1 animate-pulse">▍</span>}
      </span>
    </div>
  );
}
