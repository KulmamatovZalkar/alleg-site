"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Quote, TrendingUp } from "lucide-react";
import Image from "next/image";

import { getOptimizableMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { CaseDTO } from "@/types/api";

export default function Cases({ items }: { items: CaseDTO[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
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
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink-700 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/50 hover:shadow-gold-glow sm:flex-row"
    >
      {img && (
        <div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-44 lg:w-48">
          <Image
            src={img}
            alt={c.client_name}
            fill
            loading="lazy"
            quality={85}
            sizes="(max-width: 640px) 100vw, 200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {c.video_url_info && (
            <a
              href={c.video_url}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-ink-950/30 transition hover:bg-ink-950/10"
              aria-label="Смотреть видео"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold-glow">
                <Play size={18} fill="currentColor" />
              </span>
            </a>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500 sm:text-xs">
          {c.industry || "Кейс"}
        </div>
        <h3 className="mt-2 font-serif text-2xl text-body">{c.client_name}</h3>

        {(c.metric_before || c.metric_after) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {c.metric_before && (
              <div className="rounded-full bg-ink-800 px-3 py-1.5 text-xs font-medium text-body-muted">
                {c.metric_before}
              </div>
            )}
            <TrendingUp size={16} className="text-gold-400" />
            {c.metric_after && (
              <div className="rounded-full bg-gold-gradient px-3 py-1.5 text-xs font-semibold text-white">
                {c.metric_after}
              </div>
            )}
          </div>
        )}

        <div className="mt-5 space-y-4">
          <div className="flex gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-800 text-[10px] font-bold text-body-muted">
              А
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-body-muted">
                Задача
              </div>
              <p className="mt-0.5 text-sm leading-relaxed text-body-muted">
                {c.challenge}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold-glow">
              <ArrowRight size={13} strokeWidth={2.6} />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gold-500">
                Результат
              </div>
              <p className="mt-0.5 text-sm font-medium leading-relaxed text-body">
                {c.result}
              </p>
            </div>
          </div>
        </div>

        {c.quote && (
          <div className="mt-auto pt-6">
            <div className="relative rounded-2xl bg-gold-50 p-5 text-sm italic leading-relaxed text-body">
              <Quote
                size={16}
                className="absolute -top-2 left-4 fill-gold-400 text-gold-400"
              />
              {c.quote}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
