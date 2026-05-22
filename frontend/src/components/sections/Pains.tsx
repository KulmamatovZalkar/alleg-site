"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { useFadeIn } from "@/lib/useFadeIn";
import type { PainDTO } from "@/types/api";

export default function Pains({ items }: { items: PainDTO[] }) {
  if (!items.length) return null;
  const isOdd = items.length % 2 !== 0;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((p, i) => {
        const isLastOrphan = isOdd && i === items.length - 1;
        return (
          <PainCard
            key={p.id}
            item={p}
            delay={i * 0.04}
            fullWidth={isLastOrphan}
          />
        );
      })}
    </div>
  );
}

function PainCard({
  item: p,
  delay,
  fullWidth = false,
}: {
  item: PainDTO;
  delay: number;
  fullWidth?: boolean;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.div
      {...fade}
      className={`flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors sm:p-5 ${
        fullWidth ? "sm:col-span-2" : ""
      }`}
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-300/15 text-gold-300">
        <Check size={14} />
      </span>
      <span className="text-sm text-white/80 sm:text-base">{p.text}</span>
    </motion.div>
  );
}
