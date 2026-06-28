"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Icon from "@/components/ui/Icon";
import { useFadeIn } from "@/lib/useFadeIn";
import type { ServiceDTO } from "@/types/api";

export default function Services({ items }: { items: ServiceDTO[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((s, i) => (
        <ServiceCard key={s.id} service={s} index={i} delay={i * 0.05} />
      ))}
    </div>
  );
}

function ServiceCard({
  service: s,
  index,
  delay,
}: {
  service: ServiceDTO;
  index: number;
  delay: number;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.article
      {...fade}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink-700 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/50 hover:shadow-gold-glow sm:rounded-[2rem] sm:p-10"
    >
      {/* большой полупрозрачный номер на фоне */}
      <span className="pointer-events-none absolute right-2 -top-2 select-none font-serif text-[5rem] leading-none text-gold-100/70 sm:-right-2 sm:-top-4 sm:text-[8rem]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-start justify-between">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-white shadow-gold-glow">
          <Icon name={s.icon} size={26} />
        </span>
        <ArrowUpRight
          size={22}
          className="mt-2 text-gold-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold-500"
        />
      </div>

      <h3 className="relative mt-8 font-serif text-2xl leading-tight text-body sm:text-[1.75rem]">
        {s.title}
      </h3>
      <p className="relative mt-4 text-[15px] leading-relaxed text-body-muted sm:text-base">
        {s.short_description}
      </p>

      {s.formula && (
        <div className="relative mt-auto pt-7">
          <div className="inline-flex w-fit rounded-full bg-gold-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gold-600">
            {s.formula}
          </div>
        </div>
      )}
    </motion.article>
  );
}
