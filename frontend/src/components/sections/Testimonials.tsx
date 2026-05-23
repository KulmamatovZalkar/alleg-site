"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

import { getOptimizableMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { TestimonialDTO } from "@/types/api";

export default function Testimonials({ items }: { items: TestimonialDTO[] }) {
  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      className="card-surface flex h-full flex-col p-6 sm:p-7"
    >
      <div className="flex items-center gap-1 text-gold-300">
        {Array.from({ length: t.rating }).map((_, idx) => (
          <Star key={idx} size={14} fill="currentColor" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 font-serif text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
        «{t.text}»
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-4 border-t border-white/[0.07] pt-4 sm:mt-6 sm:pt-5">
        <div className="h-11 w-11 overflow-hidden rounded-full border border-gold-300/30 bg-ink-800 sm:h-12 sm:w-12">
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
            <div className="flex h-full w-full items-center justify-center font-serif text-gold-200">
              {t.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{t.name}</div>
          {t.role && (
            <div className="text-xs text-white/50">{t.role}</div>
          )}
        </div>
      </figcaption>
    </motion.figure>
  );
}
