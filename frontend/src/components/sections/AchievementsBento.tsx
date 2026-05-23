"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import Icon from "@/components/ui/Icon";
import { getOptimizableMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { AchievementDTO } from "@/types/api";

export default function AchievementsBento({
  items,
}: {
  items: AchievementDTO[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {items.map((a, i) => (
        <BentoTile key={a.id} item={a} delay={i * 0.05} />
      ))}
    </div>
  );
}

function BentoTile({ item: a, delay }: { item: AchievementDTO; delay: number }) {
  const img = getOptimizableMediaUrl(a.image);
  const fade = useFadeIn(delay);
  return (
    <motion.div
      {...fade}
      className={`card-surface group relative flex flex-col gap-3 overflow-hidden p-5 sm:aspect-[16/11] sm:justify-between sm:gap-0 sm:p-7 ${
        a.accent ? "border-gold-400/40 shadow-gold-glow" : ""
      }`}
      style={
        a.accent
          ? {
              background:
                "linear-gradient(160deg, rgba(184,134,42,0.20), rgba(184,134,42,0.04))",
            }
          : undefined
      }
    >
      {img && (
        <div className="absolute inset-0 -z-10 opacity-25 transition group-hover:opacity-35">
          <Image
            src={img}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
        </div>
      )}

      {a.icon && (
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl border sm:h-11 sm:w-11 sm:rounded-2xl ${
            a.accent
              ? "border-gold-300/40 bg-gold-300/[0.12] text-gold-100"
              : "border-white/10 bg-white/[0.04] text-gold-200/90"
          }`}
        >
          <Icon name={a.icon} size={18} />
        </div>
      )}

      <div className="min-w-0 sm:mt-auto">
        <div
          className={`font-serif leading-none tracking-tight ${
            a.accent ? "gold-text" : "text-white"
          } break-words text-[1.5rem] sm:text-5xl lg:text-6xl`}
        >
          {a.title}
        </div>
        {a.subtitle && (
          <div className="mt-2 max-w-[28ch] text-[10px] uppercase leading-snug tracking-wider text-white/55 sm:mt-3 sm:text-xs">
            {a.subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );
}
