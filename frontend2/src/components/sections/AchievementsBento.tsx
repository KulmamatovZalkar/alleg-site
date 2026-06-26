"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import Icon from "@/components/ui/Icon";
import { getOptimizableMediaUrl } from "@/lib/api";
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
    <div className="grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[180px] lg:grid-cols-4">
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
  const img = getOptimizableMediaUrl(a.image);
  const fade = useFadeIn(delay);
  const big = span.includes("row-span-2");

  return (
    <motion.div
      {...fade}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 sm:p-8 ${span} ${
        a.accent
          ? "bg-gradient-to-br from-gold-500 to-gold-700 text-white shadow-gold-glow"
          : "border border-ink-700 bg-white hover:border-gold-300/50"
      }`}
    >
      {img && (
        <div className="absolute inset-0 -z-10 opacity-20 transition group-hover:opacity-30">
          <Image
            src={img}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 640px) 50vw, 300px"
            className="object-cover"
          />
        </div>
      )}

      {a.icon && (
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${
            a.accent
              ? "bg-white/15 text-white backdrop-blur"
              : "bg-gold-50 text-gold-500"
          }`}
        >
          <Icon name={a.icon} size={20} />
        </div>
      )}

      <div className="min-w-0">
        <div
          className={`font-serif leading-none tracking-tight ${
            a.accent ? "text-white" : "text-body"
          } ${big ? "text-5xl sm:text-7xl" : "text-3xl sm:text-5xl"}`}
        >
          {a.title}
        </div>
        {a.subtitle && (
          <div
            className={`mt-3 max-w-[26ch] text-[11px] uppercase leading-snug tracking-wider sm:text-xs ${
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
