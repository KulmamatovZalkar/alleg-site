"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import HeroBackground from "@/components/sections/HeroBackground";
import { getMediaUrl } from "@/lib/api";
import type { HeroSlideDTO, SiteSettingsDTO } from "@/types/api";

interface Props {
  settings: SiteSettingsDTO;
  slides: HeroSlideDTO[];
}

export default function Hero({ settings, slides }: Props) {
  return (
    <>
      {/* МОБИЛКА: фото-карточка сверху, текст и кнопки ниже */}
      <section className="relative overflow-hidden pt-20 lg:hidden">
        <HeroMobile settings={settings} slides={slides} />
      </section>

      {/* ДЕСКТОП: текст на фоне с боковым градиентом */}
      <section className="relative hidden min-h-[100svh] overflow-hidden pt-32 lg:block">
        <HeroDesktop settings={settings} slides={slides} />
      </section>
    </>
  );
}

/* ─────────────────────────── МОБИЛЬНАЯ ВЕРСИЯ ─────────────────────────── */

function HeroMobile({ settings, slides }: Props) {
  const reduce = useReducedMotion();
  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  // Приоритет для мобильного фото:
  // 1) hero_mobile_image (отдельное мобильное фото из админки)
  // 2) hero_poster (общий постер)
  // 3) первый слайд из карусели
  const mobileSpecific = getMediaUrl(settings.hero_mobile_image);
  const poster = getMediaUrl(settings.hero_poster);
  const slideImg = slides[0] ? getMediaUrl(slides[0].image) : null;
  const mobileImage = mobileSpecific || poster || slideImg;

  return (
    <div className="container-page flex flex-col gap-6 pb-12">
      {/* Фото-карточка */}
      <motion.div
        {...fade}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10"
      >
        {mobileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mobileImage}
            alt={settings.hero_title}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
            <span className="font-serif text-7xl gold-text">A · K</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.25em] text-white/75">
          <span>HORECA · 25 лет</span>
          <span>·</span>
          <span>STI Dubai</span>
        </div>
      </motion.div>

      <motion.div
        {...fade}
        transition={{ ...(fade.transition || {}), delay: 0.05 }}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-300/30 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-gold-200"
      >
        Консультации · Бизнес-тур · STI Dubai
      </motion.div>

      <motion.h1
        {...fade}
        transition={{ ...(fade.transition || {}), delay: 0.1 }}
        className="font-serif text-[2rem] leading-[1.08] text-white"
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
        transition={{ ...(fade.transition || {}), delay: 0.15 }}
        className="text-sm text-white/70"
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
        transition={{ ...(fade.transition || {}), delay: 0.2 }}
        className="flex flex-col gap-3"
      >
        <a
          href={settings.whatsapp_link}
          target="_blank"
          rel="noreferrer"
          className="btn-gold w-full justify-center"
        >
          {settings.hero_primary_cta}
          <ArrowRight size={16} />
        </a>
        <a href="#tour" className="btn-ghost w-full justify-center">
          {settings.hero_secondary_cta}
        </a>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── ДЕСКТОПНАЯ ВЕРСИЯ ────────────────────────── */

function HeroDesktop({ settings, slides }: Props) {
  const reduce = useReducedMotion();
  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <>
      {/* Фон: видео / слайды / постер */}
      <div className="absolute inset-0 z-0">
        <HeroBackground settings={settings} slides={slides} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="pointer-events-none absolute -left-40 top-20 z-0 h-96 w-96 rounded-full bg-gold-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 z-0 h-96 w-96 rounded-full bg-wine-500/15 blur-[100px]" />

      <div className="container-page relative z-10 flex min-h-[88svh] max-w-7xl flex-col justify-center pb-24">
        <motion.div
          {...fade}
          className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-gold-300/30 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold-200 backdrop-blur"
        >
          Консультации · Бизнес-тур · STI Dubai
        </motion.div>

        <motion.h1
          {...fade}
          transition={{ ...(fade.transition || {}), delay: 0.05 }}
          className="max-w-4xl font-serif text-5xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
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
          className="mt-8 max-w-2xl text-lg text-white/75"
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
          className="mt-10 flex flex-row items-center gap-3"
        >
          <a
            href={settings.whatsapp_link}
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            {settings.hero_primary_cta}
            <ArrowRight size={16} />
          </a>
          <a href="#tour" className="btn-ghost">
            {settings.hero_secondary_cta}
          </a>
        </motion.div>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-xs uppercase tracking-[0.25em] text-white/35">
          <span>HORECA · 25 лет</span>
          <span>·</span>
          <span>STI Dubai</span>
          <span>·</span>
          <span>«Ассорти Проджект»</span>
        </div>
      </div>
    </>
  );
}
