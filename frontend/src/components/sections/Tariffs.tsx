"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import type { SiteSettingsDTO, TariffDTO } from "@/lib/api";

export default function Tariffs({
  items,
  settings,
}: {
  items: TariffDTO[];
  settings: SiteSettingsDTO;
}) {
  const reduce = useReducedMotion();
  const waLink = (name: string) => {
    const text = `Здравствуйте! Хочу записаться на тариф «${name}» бизнес-тура.`;
    return `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
      {items.map((t, i) => (
        <motion.div
          key={t.id}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.5,
            delay: Math.min(i * 0.06, 0.2),
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 sm:p-7 ${
            t.is_highlight
              ? "border-gold-300/50 bg-gradient-to-b from-gold-300/[0.08] to-transparent shadow-gold-strong lg:scale-[1.03]"
              : "border-white/[0.07] bg-white/[0.02]"
          }`}
        >
          {t.is_highlight && (
            <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-ink-950 sm:right-5 sm:top-5 sm:px-3 sm:text-[10px]">
              <Sparkles size={12} /> Хит
            </div>
          )}

          <div className="font-serif text-xl text-white sm:text-2xl">
            {t.name}
          </div>
          {t.description && (
            <div className="mt-1 text-xs text-white/55 sm:text-sm">
              {t.description}
            </div>
          )}

          <div className="mt-5 flex items-end gap-3 sm:mt-6">
            <span
              className={`font-serif text-4xl sm:text-5xl ${
                t.is_highlight ? "gold-text" : "text-white"
              }`}
            >
              {t.price}
            </span>
          </div>
          {t.price_note && (
            <div className="mt-2 text-[10px] uppercase tracking-wider text-gold-200/80 sm:text-xs">
              {t.price_note}
            </div>
          )}

          <ul className="my-6 flex-1 space-y-2.5 sm:my-7 sm:space-y-3">
            {t.features_list.map((f, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-white/80"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-300/15 text-gold-300">
                  <Check size={12} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href={waLink(t.name)}
            target="_blank"
            rel="noreferrer"
            className={t.is_highlight ? "btn-gold w-full" : "btn-ghost w-full"}
          >
            {t.cta_text}
          </a>
        </motion.div>
      ))}
    </div>
  );
}
