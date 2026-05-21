"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import type { SiteSettingsDTO } from "@/lib/api";

const NAV = [
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Направления" },
  { href: "#cases", label: "Кейсы" },
  { href: "#tour", label: "Бизнес-тур" },
  { href: "#tariffs", label: "Тарифы" },
  { href: "#faq", label: "FAQ" },
];

export default function Header({ settings }: { settings: SiteSettingsDTO }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-lg tracking-wide text-white sm:text-2xl">
            Alleg <span className="gold-text">Kim</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 transition hover:text-gold-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={settings.whatsapp_link}
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            Связаться
          </a>
        </div>

        <button
          aria-label="menu"
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-5">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-white/80 transition active:bg-white/[0.04]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={settings.whatsapp_link}
              target="_blank"
              rel="noreferrer"
              className="btn-gold mt-3 w-full justify-center"
            >
              Связаться
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
