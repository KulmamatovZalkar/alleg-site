"use client";

import { useEffect, useState } from "react";

import { getMediaUrl } from "@/lib/api";
import type { HeroSlideDTO, SiteSettingsDTO } from "@/types/api";

interface Props {
  settings: SiteSettingsDTO;
  slides: HeroSlideDTO[];
}

type Resolved =
  | { kind: "video"; videoId: string; embedUrl: string }
  | { kind: "slides"; images: string[]; intervalSec: number }
  | { kind: "poster"; image: string }
  | { kind: "none" };

function resolve(settings: SiteSettingsDTO, slides: HeroSlideDTO[]): Resolved {
  const mode = settings.hero_mode || "auto";
  const videoInfo = settings.hero_video_url_info;
  const slideImages = slides
    .map((s) => getMediaUrl(s.image))
    .filter((x): x is string => !!x);
  const poster = getMediaUrl(settings.hero_poster);

  const wantVideo =
    (mode === "auto" || mode === "video") && videoInfo;
  if (wantVideo) {
    return {
      kind: "video",
      videoId: videoInfo!.video_id,
      embedUrl: videoInfo!.embed_url,
    };
  }

  const wantSlides =
    (mode === "auto" || mode === "slides") && slideImages.length > 0;
  if (wantSlides) {
    return {
      kind: "slides",
      images: slideImages,
      intervalSec: Math.max(2, settings.hero_slide_interval || 5),
    };
  }

  if ((mode === "auto" || mode === "poster") && poster) {
    return { kind: "poster", image: poster };
  }

  return { kind: "none" };
}

export default function HeroBackground({ settings, slides }: Props) {
  const resolved = resolve(settings, slides);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (resolved.kind !== "slides" || resolved.images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % resolved.images.length);
    }, resolved.intervalSec * 1000);
    return () => window.clearInterval(id);
  }, [
    resolved.kind,
    resolved.kind === "slides" ? resolved.images.length : 0,
    resolved.kind === "slides" ? resolved.intervalSec : 0,
  ]);

  if (resolved.kind === "video") {
    return (
      <iframe
        src={`${resolved.embedUrl}&autoplay=1&mute=1&loop=1&controls=0&playsinline=1&playlist=${resolved.videoId}`}
        title="background"
        className="pointer-events-none absolute inset-0 h-[120%] w-[180%] min-w-full min-h-full -translate-x-[22%] -translate-y-[10%] scale-110"
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden="true"
      />
    );
  }

  if (resolved.kind === "slides") {
    return (
      <>
        {resolved.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}
      </>
    );
  }

  if (resolved.kind === "poster") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return null;
}
