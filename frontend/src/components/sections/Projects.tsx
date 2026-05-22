"use client";

import { motion } from "framer-motion";
import { ImagePlus, Instagram, MapPin } from "lucide-react";
import { useState } from "react";

import { getMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { HoldingProjectDTO } from "@/types/api";

import ProjectGalleryModal from "./ProjectGalleryModal";

export default function Projects({ items }: { items: HoldingProjectDTO[] }) {
  const [active, setActive] = useState<HoldingProjectDTO | null>(null);

  if (!items.length) return null;

  const isOdd = items.length % 2 !== 0;

  return (
    <>
      <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-2">
        {items.map((p, i) => {
          const isLastOrphan = isOdd && i === items.length - 1;
          return (
            <ProjectCard
              key={p.id}
              item={p}
              delay={i * 0.07}
              fullWidth={isLastOrphan}
              onOpen={() => setActive(p)}
            />
          );
        })}
      </div>

      <ProjectGalleryModal project={active} onClose={() => setActive(null)} />
    </>
  );
}

function ProjectCard({
  item: p,
  delay,
  onOpen,
  fullWidth = false,
}: {
  item: HoldingProjectDTO;
  delay: number;
  onOpen: () => void;
  fullWidth?: boolean;
}) {
  const cover = getMediaUrl(p.cover);
  const logo = getMediaUrl(p.logo);
  const fade = useFadeIn(delay);
  const galleryCount = (p.gallery?.length ?? 0) + (cover ? 1 : 0);

  return (
    <motion.button
      {...fade}
      type="button"
      onClick={onOpen}
      className={`card-surface group relative flex h-full flex-col overflow-hidden text-left transition hover:border-gold-300/40 ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={p.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
            <span className="font-serif text-6xl gold-text opacity-80">
              {p.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />

        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            className="absolute right-4 top-4 h-10 w-auto opacity-90"
          />
        )}

        {/* Подсказка: галерея */}
        {galleryCount > 1 && (
          <div className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur sm:text-xs">
            <ImagePlus size={12} />
            {galleryCount} фото
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl text-white sm:text-3xl">
            {p.name}
          </h3>
          {p.year_founded && (
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
              {p.year_founded}
            </span>
          )}
        </div>

        {p.tagline && (
          <p className="mt-1 text-sm font-medium text-gold-200/90">
            {p.tagline}
          </p>
        )}

        {p.description && (
          <p className="mt-3 text-sm text-white/65">{p.description}</p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55">
          {p.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-gold-300/80" />
              {p.location}
            </span>
          )}
          {p.instagram_url && (
            <span className="flex items-center gap-1.5">
              <Instagram size={13} />
              Instagram
            </span>
          )}
        </div>

        <span className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-200">
          Открыть галерею →
        </span>
      </div>
    </motion.button>
  );
}
