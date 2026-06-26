"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

import { getOptimizableMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { TestimonialDTO } from "@/types/api";

export default function Testimonials({ items }: { items: TestimonialDTO[] }) {
  // Masonry-колонки — карты разной высоты складываются как мозаика.
  return (
    <div className="gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
      {items.map((t, i) => (
        <TestimonialCard key={t.id} item={t} delay={i * 0.05} />
      ))}
    </div>
  );
}

function TestimonialCard({
  item: t,
  delay,
}: {
  item: TestimonialDTO;
  delay: number;
}) {
  const photo = getOptimizableMediaUrl(t.photo);
  const fade = useFadeIn(delay);
  return (
    <motion.figure
      {...fade}
      className="relative break-inside-avoid overflow-hidden rounded-[1.75rem] border border-ink-700 bg-white p-7 shadow-soft transition-all duration-300 hover:border-gold-300/50 hover:shadow-gold-glow sm:p-8"
    >
      <Quote
        size={40}
        className="absolute right-6 top-6 fill-gold-100 text-gold-100"
      />

      <div className="relative flex items-center gap-1 text-gold-400">
        {Array.from({ length: t.rating }).map((_, idx) => (
          <Star key={idx} size={15} fill="currentColor" />
        ))}
      </div>

      <blockquote className="relative mt-5 font-serif text-lg leading-relaxed text-body">
        «{t.text}»
      </blockquote>

      <figcaption className="relative mt-7 flex items-center gap-4">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gold-gradient ring-2 ring-gold-100">
          {photo ? (
            <Image
              src={photo}
              alt={t.name}
              width={48}
              height={48}
              loading="lazy"
              sizes="48px"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-lg text-white">
              {t.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-body">{t.name}</div>
          {t.role && <div className="text-xs text-body-muted">{t.role}</div>}
        </div>
      </figcaption>
    </motion.figure>
  );
}
