"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import type { VideoInfo } from "@/types/api";

interface Props {
  info: VideoInfo | null;
  /** Постер-картинка (если есть). Если не задана — берём из YouTube/Vimeo info. */
  poster?: string | null;
  className?: string;
  /** Если true — играем сразу без клика по плейсхолдеру. */
  autoplay?: boolean;
  rounded?: string;
}

/**
 * Лёгкий плеер — пока не нажали Play, не подгружаем iframe (экономим
 * запросы и Web Vitals). На клик — заменяется iframe с autoplay.
 */
export default function VideoEmbed({
  info,
  poster,
  className,
  autoplay = false,
  rounded = "rounded-3xl",
}: Props) {
  const [playing, setPlaying] = useState(autoplay);

  if (!info) return null;

  const cover = poster || info.thumbnail;
  const embedSrc = `${info.embed_url}${info.embed_url.includes("?") ? "&" : "?"}autoplay=1`;

  if (playing) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className ?? ""}`}>
        <iframe
          src={embedSrc}
          title="video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative aspect-video w-full overflow-hidden ${rounded} ${className ?? ""}`}
      aria-label="Play video"
    >
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-ink-950/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-ink-950 shadow-gold-strong transition group-hover:scale-110 sm:h-20 sm:w-20">
          <Play size={26} fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
