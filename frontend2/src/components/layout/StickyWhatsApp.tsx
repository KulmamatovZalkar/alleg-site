"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyWhatsApp({ href }: { href: string }) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:bottom-8 sm:right-8 sm:gap-3">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`hidden whitespace-nowrap rounded-full border border-ink-700 bg-white px-4 py-2 text-xs text-gold-600 shadow-soft transition-all duration-500 sm:inline-flex sm:text-sm ${
          showHint
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        } sm:hover:border-gold-300/70`}
      >
        <span className="animate-pulse-soft">
          Напишите, чтобы узнать больше
        </span>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-ink-950 shadow-gold-glow transition-transform active:scale-95 sm:h-14 sm:w-14 sm:hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-gold-300/40" />
        <MessageCircle size={22} strokeWidth={2.2} className="relative" />
      </a>
    </div>
  );
}
