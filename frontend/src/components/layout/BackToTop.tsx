"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Наверх"
      className={`fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/30 bg-ink-950/80 text-gold-200 backdrop-blur-md transition-all duration-300 active:scale-95 sm:bottom-8 sm:left-8 sm:h-14 sm:w-14 sm:hover:border-gold-300/60 sm:hover:bg-ink-900 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
