"use client";

import { motion } from "framer-motion";

import Icon from "@/components/ui/Icon";
import { useFadeIn } from "@/lib/useFadeIn";
import type { AchievementDTO } from "@/types/api";

// Bento-раскладка: акцентные плитки крупнее. Паттерн span'ов по индексу,
// чтобы сетка выглядела «живой», а не ровными рядами.
const SPANS = [
  "sm:col-span-2 sm:row-span-2", // 0 — большая
  "sm:col-span-2",               // 1 — широкая
  "",                            // 2
  "",                            // 3
  "sm:col-span-2",               // 4 — широкая
  "",                            // 5
];

export default function AchievementsBento({
  items,
}: {
  items: AchievementDTO[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 lg:grid-cols-4">
      {items.map((a, i) => (
        <BentoTile
          key={a.id}
          item={a}
          delay={i * 0.05}
          span={SPANS[i % SPANS.length]}
        />
      ))}
    </div>
  );
}

function BentoTile({
  item: a,
  delay,
  span,
}: {
  item: AchievementDTO;
  delay: number;
  span: string;
}) {
  const fade = useFadeIn(delay);
  const big = span.includes("row-span-2");

  return (
    <motion.div
      {...fade}
      className={`group relative flex min-h-[150px] flex-col justify-between gap-4 overflow-hidden rounded-[1.75rem] p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 sm:min-h-0 sm:gap-0 sm:p-7 ${span} ${
        a.accent
          ? "bg-gradient-to-br from-gold-500 to-gold-700 text-white shadow-gold-glow"
          : "border border-ink-700 bg-white hover:border-gold-300/50"
      }`}
    >
      {a.icon && (
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl sm:h-11 sm:w-11 ${
            a.accent
              ? "bg-white/15 text-white backdrop-blur"
              : "bg-gold-50 text-gold-500"
          }`}
        >
          <Icon name={a.icon} size={18} />
        </div>
      )}

      <div className="min-w-0">
        <div
          className={`font-serif leading-none tracking-tight ${
            a.accent ? "text-white" : "text-body"
          } text-4xl ${big ? "sm:text-6xl" : "sm:text-4xl"}`}
        >
          {a.title}
        </div>
        {a.subtitle && (
          <div
            className={`mt-2.5 max-w-[28ch] text-[10px] uppercase leading-snug tracking-wider sm:text-[11px] ${
              a.accent ? "text-white/80" : "text-body-muted"
            }`}
          >
            {a.subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );
}
