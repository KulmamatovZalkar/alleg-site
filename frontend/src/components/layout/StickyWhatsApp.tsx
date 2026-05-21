"use client";

import { MessageCircle } from "lucide-react";

export default function StickyWhatsApp({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-ink-950 shadow-gold-glow transition-transform active:scale-95 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 sm:hover:scale-105"
    >
      <MessageCircle size={22} strokeWidth={2.2} />
    </a>
  );
}
