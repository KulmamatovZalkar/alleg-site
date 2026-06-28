"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import { useFadeIn } from "@/lib/useFadeIn";
import type { SiteSettingsDTO, TariffDTO } from "@/types/api";

export default function Tariffs({
  items,
  settings,
}: {
  items: TariffDTO[];
  settings: SiteSettingsDTO;
}) {
  const waLink = (name: string) => {
    const text = `Здравствуйте! Хочу записаться на тариф «${name}» бизнес-тура.`;
    return `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
      {items.map((t, i) => (
        <TariffCard
          key={t.id}
          item={t}
          delay={i * 0.06}
          waLink={waLink(t.name)}
        />
      ))}
    </div>
  );
}

function TariffCard({
  item: t,
  delay,
  waLink,
}: {
  item: TariffDTO;
  delay: number;
  waLink: string;
}) {
  const fade = useFadeIn(delay);

  if (t.is_highlight) {
    // Хит — тёмно-сиреневая «выпуклая» карта, выделяется на фоне белых
    return (
      <motion.div
        {...fade}
        className="relative z-10 flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-gold-500 to-gold-700 p-7 text-white shadow-gold-strong sm:rounded-[2.25rem] sm:p-10 lg:scale-[1.06]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
          <Sparkles size={13} /> Хит продаж
        </div>

        <div className="relative mt-6 font-serif text-2xl">{t.name}</div>
        {t.description && (
          <div className="relative mt-1 text-sm text-white/80">
            {t.description}
          </div>
        )}

        <div className="relative mt-6 font-serif text-6xl">{t.price}</div>
        {t.price_note && (
          <div className="relative mt-2 text-xs uppercase tracking-wider text-white/80">
            {t.price_note}
          </div>
        )}

        <ul className="relative my-8 flex-1 space-y-3">
          {t.features_list.map((f, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-white/95">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Check size={12} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold uppercase tracking-wider text-gold-600 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {t.cta_text}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...fade}
      className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink-700 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/50 hover:shadow-gold-glow sm:rounded-[2.25rem] sm:p-10"
    >
      <div className="font-serif text-2xl text-body">{t.name}</div>
      {t.description && (
        <div className="mt-1 text-sm text-body-muted">{t.description}</div>
      )}

      <div className="mt-6 font-serif text-5xl text-body">{t.price}</div>
      {t.price_note && (
        <div className="mt-2 text-xs uppercase tracking-wider text-gold-600">
          {t.price_note}
        </div>
      )}

      <ul className="my-8 flex-1 space-y-3">
        {t.features_list.map((f, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-body">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-500">
              <Check size={12} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="btn-ghost w-full"
      >
        {t.cta_text}
      </a>
    </motion.div>
  );
}
