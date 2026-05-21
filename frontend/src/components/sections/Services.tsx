"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { ServiceDTO } from "@/lib/api";
import Icon from "@/components/ui/Icon";

export default function Services({ items }: { items: ServiceDTO[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <motion.article
          key={s.id}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.5,
            delay: Math.min(i * 0.05, 0.2),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="card-surface group flex h-full flex-col p-6 sm:p-7"
        >
          <div className="mb-5 flex items-center justify-between sm:mb-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-300/25 bg-gold-300/[0.06] text-gold-200">
              <Icon name={s.icon} size={20} />
            </span>
            <ArrowUpRight
              size={18}
              className="text-white/30 transition group-hover:text-gold-300"
            />
          </div>

          <h3 className="font-serif text-xl text-white sm:text-2xl">
            {s.title}
          </h3>
          <p className="mt-3 text-sm text-white/60">{s.short_description}</p>

          {s.formula && (
            <div className="mt-5 inline-flex w-fit rounded-full border border-gold-300/30 bg-gold-300/[0.08] px-3 py-1.5 text-[10px] uppercase tracking-wider text-gold-200 sm:mt-6 sm:px-4 sm:text-xs">
              {s.formula}
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}
