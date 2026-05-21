"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import type { PainDTO } from "@/lib/api";

export default function Pains({ items }: { items: PainDTO[] }) {
  const reduce = useReducedMotion();
  if (!items.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((p, i) => (
        <motion.div
          key={p.id}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.4,
            delay: Math.min(i * 0.04, 0.2),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors sm:p-5"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-300/15 text-gold-300">
            <Check size={14} />
          </span>
          <span className="text-sm text-white/80 sm:text-base">{p.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
