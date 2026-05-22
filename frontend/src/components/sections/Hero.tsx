"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import HeroBackground from "@/components/sections/HeroBackground";
import type { HeroSlideDTO, SiteSettingsDTO } from "@/types/api";

interface Props {
  settings: SiteSettingsDTO;
  slides: HeroSlideDTO[];
}

export default function Hero({ settings, slides }: Props) {
  const reduce = useReducedMotion();

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-32">
      {/* Фон: HeroBackground сам решит — видео, слайдшоу или постер */}
      <div className="absolute inset-0 z-0">
        <HeroBackground settings={settings} slides={slides} />
        {/* Боковой градиент справа-налево, чтобы текст слева был читаем,
            а правая часть оставалась с видимым фото. И мягкое затемнение снизу. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/50 to-ink-950/20 lg:from-ink-950/85 lg:via-ink-950/30 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="pointer-events-none absolute -left-40 top-20 z-0 h-72 w-72 rounded-full bg-gold-500/15 blur-[100px] sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-40 bottom-20 z-0 h-72 w-72 rounded-full bg-wine-500/15 blur-[100px] sm:h-96 sm:w-96" />

      <div className="container-page relative z-10 flex min-h-[88svh] flex-col justify-center pb-16 sm:pb-24">
        <motion.div
          {...fade}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold-300/30 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-gold-200 backdrop-blur sm:mb-8 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.3em]"
        >
          Консультации · Бизнес-тур · STI Dubai
        </motion.div>

        <motion.h1
          {...fade}
          transition={{ ...(fade.transition || {}), delay: 0.05 }}
          className="max-w-5xl font-serif text-[2rem] leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {settings.hero_title.split(".").map((part, i, arr) => {
            const t = part.trim();
            if (!t) return null;
            const isLast =
              i === arr.length - 1 ||
              (i === arr.length - 2 && !arr[arr.length - 1].trim());
            return (
              <span key={i} className="block">
                {isLast ? <span className="gold-text">{t}.</span> : <>{t}.</>}
              </span>
            );
          })}
        </motion.h1>

        <motion.p
          {...fade}
          transition={{ ...(fade.transition || {}), delay: 0.12 }}
          className="mt-6 max-w-2xl text-sm text-white/70 sm:mt-8 sm:text-lg"
        >
          {settings.hero_subtitle}
          {settings.hero_description && (
            <span className="mt-3 block text-white/55">
              {settings.hero_description}
            </span>
          )}
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...(fade.transition || {}), delay: 0.18 }}
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
        >
          <a
            href={settings.whatsapp_link}
            target="_blank"
            rel="noreferrer"
            className="btn-gold w-full justify-center sm:w-auto"
          >
            {settings.hero_primary_cta}
            <ArrowRight size={16} />
          </a>
          <a href="#tour" className="btn-ghost w-full justify-center sm:w-auto">
            {settings.hero_secondary_cta}
          </a>
        </motion.div>

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-white/35 sm:mt-16 sm:gap-x-10 sm:gap-y-4 sm:text-xs">
          <span>HORECA · 25 лет</span>
          <span className="hidden sm:inline">·</span>
          <span>STI Dubai</span>
          <span className="hidden sm:inline">·</span>
          <span>«Ассорти Проджект»</span>
        </div>
      </div>
    </section>
  );
}
