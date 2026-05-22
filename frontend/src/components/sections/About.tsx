"use client";

import { motion } from "framer-motion";

import VideoEmbed from "@/components/ui/VideoEmbed";
import { getMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { SiteSettingsDTO } from "@/types/api";

export default function About({ settings }: { settings: SiteSettingsDTO }) {
  return (
    <>
      <div className="lg:hidden">
        <AboutMobile settings={settings} />
      </div>
      <div className="hidden lg:block">
        <AboutDesktop settings={settings} />
      </div>
    </>
  );
}

/* ─────────────────────────── МОБИЛЬНАЯ ВЕРСИЯ ─────────────────────────── */

function AboutMobile({ settings }: { settings: SiteSettingsDTO }) {
  const photo = getMediaUrl(settings.about_photo);
  const photo2 = getMediaUrl(settings.about_photo_2);
  const photo3 = getMediaUrl(settings.about_photo_3);
  const videoInfo = settings.about_video_url_info;

  const thumbs = [photo2, photo3].filter((x): x is string => !!x);

  const fadeText = useFadeIn();
  const fadeMedia = useFadeIn(0.05);

  return (
    <div className="flex flex-col gap-5">
      {/* Текст: eyebrow + название + подзаголовок */}
      <motion.div {...fadeText}>
        <div className="eyebrow mb-3">Кто такой Аллег Ким</div>
        <h2 className="font-serif text-4xl text-white">{settings.about_title}</h2>
        {settings.about_subtitle && (
          <p className="mt-3 text-base text-gold-200">{settings.about_subtitle}</p>
        )}
      </motion.div>

      {/* Медиа: главное фото + 2 доп. фото в сетке 2×1.
          gap-2 — нижние плитки плотнее прилегают к главному фото. */}
      <motion.div {...fadeMedia} className="flex flex-col gap-2">
        {videoInfo ? (
          <VideoEmbed
            info={videoInfo}
            poster={photo ?? videoInfo.thumbnail}
            rounded="rounded-3xl"
          />
        ) : (
          <div className="relative aspect-[5/6] w-full overflow-hidden rounded-3xl border border-white/10">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={settings.about_title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                <span className="font-serif text-6xl gold-text">A · K</span>
              </div>
            )}
          </div>
        )}

        {/* Доп. фото — сетка 2 колонки, портретные плитки крупнее */}
        {thumbs.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {thumbs.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Текст-биография */}
      <motion.div {...fadeText}>
        <div
          className="prose-invert mt-2 max-w-none text-base leading-relaxed text-white/75 [&_p]:mb-4 [&_strong]:text-gold-200"
          dangerouslySetInnerHTML={{ __html: settings.about_text }}
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── ДЕСКТОПНАЯ ВЕРСИЯ ────────────────────────── */

function AboutDesktop({ settings }: { settings: SiteSettingsDTO }) {
  const photo = getMediaUrl(settings.about_photo);
  const photo2 = getMediaUrl(settings.about_photo_2);
  const photo3 = getMediaUrl(settings.about_photo_3);
  const videoInfo = settings.about_video_url_info;

  const fadeText = useFadeIn();
  const fadeMedia = useFadeIn(0.06);

  const hasGallery = !!(photo2 || photo3);

  return (
    <div className="grid items-stretch gap-14 lg:grid-cols-[1.05fr_1fr]">
      <motion.div {...fadeText} className="order-1 flex flex-col justify-center">
        <div className="eyebrow mb-4">Кто такой Аллег Ким</div>
        <h2 className="font-serif text-5xl text-white">{settings.about_title}</h2>
        {settings.about_subtitle && (
          <p className="mt-4 text-lg text-gold-200">{settings.about_subtitle}</p>
        )}
        <div
          className="prose-invert mt-7 max-w-none text-base leading-relaxed text-white/75 [&_p]:mb-4 [&_strong]:text-gold-200"
          dangerouslySetInnerHTML={{ __html: settings.about_text }}
        />
      </motion.div>

      <motion.div {...fadeMedia} className="order-2 h-full">
        {videoInfo ? (
          <VideoEmbed
            info={videoInfo}
            poster={photo ?? videoInfo.thumbnail}
            rounded="rounded-3xl"
          />
        ) : hasGallery ? (
          <div className="grid h-full grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 min-h-[34rem]">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={settings.about_title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                  <span className="font-serif text-5xl gold-text">A</span>
                </div>
              )}
            </div>
            <div className="grid grid-rows-2 gap-4">
              {photo2 && (
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo2}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}
              {photo3 && (
                <div className="relative overflow-hidden rounded-3xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo3}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}
              {!photo3 && photo2 && (
                <div className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900">
                  <span className="font-serif text-4xl gold-text opacity-50">A · K</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={settings.about_title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                <span className="font-serif text-6xl gold-text">A · K</span>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
