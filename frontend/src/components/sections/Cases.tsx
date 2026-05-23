"use client";

import { motion } from "framer-motion";
import { Play, Quote, TrendingUp } from "lucide-react";
import Image from "next/image";

import { getOptimizableMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { CaseDTO } from "@/types/api";

export default function Cases({ items }: { items: CaseDTO[] }) {
  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
      {items.map((c, i) => (
        <CaseCard key={c.id} item={c} delay={i * 0.06} />
      ))}
    </div>
  );
}

function CaseCard({ item: c, delay }: { item: CaseDTO; delay: number }) {
  const img = getOptimizableMediaUrl(c.image);
  const fade = useFadeIn(delay);
  return (
    <motion.article
      {...fade}
      className="card-surface flex h-full flex-col p-6 sm:p-7"
    >
      {img && (
        <div className="relative -mx-6 -mt-6 mb-5 h-36 overflow-hidden rounded-t-3xl sm:-mx-7 sm:-mt-7 sm:mb-6 sm:h-40">
          <Image
            src={img}
            alt={c.client_name}
            fill
            loading="lazy"
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          {c.video_url_info && (
            <a
              href={c.video_url}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-ink-950/30 transition hover:bg-ink-950/10"
              aria-label="Смотреть видео"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-ink-950 shadow-gold-glow">
                <Play size={18} fill="currentColor" />
              </span>
            </a>
          )}
        </div>
      )}

      <div className="text-[10px] uppercase tracking-[0.25em] text-gold-200/70 sm:text-xs">
        {c.industry || "Кейс"}
      </div>
      <h3 className="mt-2 font-serif text-xl text-white sm:text-2xl">
        {c.client_name}
      </h3>

      {(c.metric_before || c.metric_after) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
          {c.metric_before && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/60 sm:text-sm">
              {c.metric_before}
            </div>
          )}
          <TrendingUp size={16} className="text-gold-300" />
          {c.metric_after && (
            <div className="rounded-xl border border-gold-300/30 bg-gold-300/[0.08] px-3 py-2 text-xs font-semibold text-gold-100 sm:text-sm">
              {c.metric_after}
            </div>
          )}
        </div>
      )}

      <div className="mt-5 space-y-3 text-sm text-white/70">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
            Задача
          </div>
          <p className="mt-1">{c.challenge}</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
            Результат
          </div>
          <p className="mt-1 text-white/85">{c.result}</p>
        </div>
      </div>

      {c.quote && (
        <div className="mt-auto pt-5 sm:pt-6">
          <div className="relative rounded-2xl border border-gold-300/15 bg-white/[0.02] p-4 text-sm italic text-white/80">
            <Quote
              size={14}
              className="absolute -top-2 left-3 fill-gold-300 text-gold-300"
            />
            {c.quote}
          </div>
        </div>
      )}
    </motion.article>
  );
}
