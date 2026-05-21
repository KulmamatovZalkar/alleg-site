"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

import type { TestimonialDTO } from "@/lib/api";
import { getMediaUrl } from "@/lib/api";

export default function Testimonials({ items }: { items: TestimonialDTO[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => {
        const photo = getMediaUrl(t.photo);
        return (
          <motion.figure
            key={t.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.05, 0.2),
              ease: [0.22, 1, 0.36, 1],
            }}
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt={t.name} className="h-full w-full object-cover" />
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
      })}
    </div>
  );
}
