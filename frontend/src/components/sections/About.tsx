"use client";

import { motion } from "framer-motion";

import VideoEmbed from "@/components/ui/VideoEmbed";
import { getMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { SiteSettingsDTO } from "@/types/api";

export default function About({ settings }: { settings: SiteSettingsDTO }) {
  const photo = getMediaUrl(settings.about_photo);
  const photo2 = getMediaUrl(settings.about_photo_2);
  const photo3 = getMediaUrl(settings.about_photo_3);
  const videoInfo = settings.about_video_url_info;

  const fadeText = useFadeIn();
  const fadeMedia = useFadeIn(0.06);

  const hasGallery = !!(photo2 || photo3);

  return (
    <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <motion.div {...fadeText} className="order-2 lg:order-1">
        <div className="eyebrow mb-3 sm:mb-4">Кто такой Аллег Ким</div>
        <h2 className="font-serif text-4xl text-white sm:text-5xl">
          {settings.about_title}
        </h2>
        {settings.about_subtitle && (
          <p className="mt-3 text-base text-gold-200 sm:mt-4 sm:text-lg">
            {settings.about_subtitle}
          </p>
        )}

        <div
          className="prose-invert mt-6 max-w-none text-base leading-relaxed text-white/75 sm:mt-7 [&_p]:mb-4 [&_strong]:text-gold-200"
          dangerouslySetInnerHTML={{ __html: settings.about_text }}
        />
      </motion.div>

      <motion.div {...fadeMedia} className="order-1 lg:order-2">
        {videoInfo ? (
          <VideoEmbed
            info={videoInfo}
            poster={photo ?? videoInfo.thumbnail}
            rounded="rounded-3xl"
          />
        ) : hasGallery ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={settings.about_title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                  <span className="font-serif text-5xl gold-text">A</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              {photo2 && (
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo2} alt="" className="h-full w-full object-cover" />
                </div>
              )}
              {photo3 && (
                <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo3} alt="" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 lg:max-w-none">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt={settings.about_title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                <span className="font-serif text-6xl gold-text">A · K</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
