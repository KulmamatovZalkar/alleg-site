"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, MapPin } from "lucide-react";

import { getMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { HoldingProjectDTO } from "@/types/api";

export default function Projects({ items }: { items: HoldingProjectDTO[] }) {
  if (!items.length) return null;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <ProjectCard key={p.id} item={p} delay={i * 0.07} />
      ))}
    </div>
  );
}

function ProjectCard({
  item: p,
  delay,
}: {
  item: HoldingProjectDTO;
  delay: number;
}) {
  const cover = getMediaUrl(p.cover);
  const logo = getMediaUrl(p.logo);
  const fade = useFadeIn(delay);
  return (
    <motion.article
      {...fade}
      className="card-surface group relative flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-800">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={p.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
            <span className="font-serif text-5xl gold-text opacity-80">
              {p.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            className="absolute right-4 top-4 h-10 w-auto opacity-90"
          />
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
            <a
              href={p.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition hover:text-gold-200"
            >
              <Instagram size={13} />
              Instagram
            </a>
          )}
        </div>

        {p.site_url && (
          <a
            href={p.site_url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-200 transition hover:text-gold-100"
          >
            Сайт проекта
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
