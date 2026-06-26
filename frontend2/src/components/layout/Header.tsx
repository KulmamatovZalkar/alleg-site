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
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ScrollSpy: следим за тем, какая секция сейчас в зоне видимости.
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    // Активной считаем последнюю секцию, чья верхняя граница уже прошла
    // якорь у верха окна (~30% от высоты экрана). Это устойчивее, чем
    // выбор по intersectionRatio, который путается на стыках секций.
    const compute = () => {
      const anchor = window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const s of sections) {
        const top = s.getBoundingClientRect().top;
        if (top - anchor <= 0) {
          current = s.id;
        }
      }
      setActiveId(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
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
          ? "border-b border-ink-700 bg-ink-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label="Наверх"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <span className="font-serif text-lg tracking-wide text-body sm:text-2xl">
            Alleg <span className="gold-text">Kim</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group relative text-sm transition ${
                  isActive
                    ? "text-gold-600"
                    : "text-body-muted hover:text-gold-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold-300 transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
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
          className="rounded-full border border-ink-700 p-2 text-body lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-700 bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-5">
            {NAV.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-3 text-base transition active:bg-ink-800 ${
                    isActive
                      ? "bg-gold-300/[0.06] text-gold-600"
                      : "text-body"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
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
