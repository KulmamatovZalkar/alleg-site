"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, MapPin, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getMediaUrl } from "@/lib/api";
import type { HoldingProjectDTO } from "@/types/api";

interface Props {
  project: HoldingProjectDTO | null;
  onClose: () => void;
}

export default function ProjectGalleryModal({ project, onClose }: Props) {
  const [index, setIndex] = useState(0);

  // Собираем все доступные фото: cover + gallery (если есть)
  const images: string[] = project
    ? [
        getMediaUrl(project.cover),
        ...project.gallery.map((g) => getMediaUrl(g.image)),
      ].filter((x): x is string => !!x)
    : [];

  // Сбрасываем индекс при смене проекта
  useEffect(() => {
    setIndex(0);
  }, [project?.id]);

  // ESC закрывает, стрелки переключают
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0));
      if (e.key === "ArrowRight")
        setIndex((i) => (images.length ? (i + 1) % images.length : 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, images.length]);

  // Запрет скролла body при открытом модале
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  const prev = useCallback(
    () =>
      setIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (images.length ? (i + 1) % images.length : 0)),
    [images.length],
  );

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-3 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-gold-300/15 bg-ink-900 sm:mx-6"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink-950/80 text-white backdrop-blur transition hover:border-gold-300/40 hover:text-gold-200 sm:right-5 sm:top-5"
            >
              <X size={18} />
            </button>

            {/* Image area */}
            <div className="relative aspect-[16/10] w-full bg-ink-800">
              {images.length > 0 ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={images[index]}
                    src={images[index]}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Назад"
                        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/80 text-white backdrop-blur transition hover:border-gold-300/40 hover:text-gold-200 sm:left-5"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Вперёд"
                        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink-950/80 text-white backdrop-blur transition hover:border-gold-300/40 hover:text-gold-200 sm:right-5"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-ink-950/80 px-3 py-1 text-xs text-white/70 backdrop-blur sm:bottom-5">
                        {index + 1} / {images.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                  <span className="font-serif text-6xl gold-text">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="border-t border-white/[0.06] p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl text-white sm:text-3xl">
                  {project.name}
                </h3>
                {project.year_founded && (
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                    {project.year_founded}
                  </span>
                )}
              </div>
              {project.tagline && (
                <p className="mt-1 text-sm text-gold-200/90 sm:text-base">
                  {project.tagline}
                </p>
              )}
              {project.description && (
                <p className="mt-3 text-sm text-white/70 sm:text-[15px]">
                  {project.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55 sm:text-sm">
                {project.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gold-300/80" />
                    {project.location}
                  </span>
                )}
                {project.instagram_url && (
                  <a
                    href={project.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 transition hover:text-gold-200"
                  >
                    <Instagram size={14} />
                    Instagram
                  </a>
                )}
                {project.site_url && (
                  <a
                    href={project.site_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold uppercase tracking-wider text-gold-200 transition hover:text-gold-100"
                  >
                    Сайт проекта →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
