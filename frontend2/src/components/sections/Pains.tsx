"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { useFadeIn } from "@/lib/useFadeIn";
import type { PainDTO } from "@/types/api";

export default function Pains({ items }: { items: PainDTO[] }) {
  if (!items.length) return null;

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-ink-700 bg-white p-4 shadow-soft sm:p-6">
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {items.map((p, i) => (
          <PainCard key={p.id} item={p} index={i} delay={i * 0.04} />
        ))}
      </div>
    </div>
  );
}

function PainCard({
  item: p,
  index,
  delay,
}: {
  item: PainDTO;
  index: number;
  delay: number;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.div
      {...fade}
      className="group flex items-center gap-4 rounded-3xl p-5 transition-colors duration-300 hover:bg-gold-50 sm:p-6"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold-glow transition-transform duration-300 group-hover:scale-110">
        <Check size={18} strokeWidth={2.6} />
      </span>
      <span className="text-[15px] font-medium leading-snug text-body sm:text-base">
        {p.text}
      </span>
    </motion.div>
  );
}
