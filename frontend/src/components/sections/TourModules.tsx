"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { useFadeIn } from "@/lib/useFadeIn";
import type { ModuleDTO } from "@/types/api";

export default function TourModules({ items }: { items: ModuleDTO[] }) {
  const [open, setOpen] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="grid gap-3">
      {items.map((m, i) => (
        <ModuleAccordion
          key={m.id}
          item={m}
          delay={i * 0.04}
          isOpen={open === m.id}
          onToggle={() => setOpen(open === m.id ? null : m.id)}
        />
      ))}
    </div>
  );
}

function ModuleAccordion({
  item: m,
  delay,
  isOpen,
  onToggle,
}: {
  item: ModuleDTO;
  delay: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.div
      {...fade}
      className={`rounded-3xl border transition-colors ${
        isOpen
          ? "border-gold-300/30 bg-white/[0.03]"
          : "border-white/[0.06] bg-white/[0.015]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:gap-6 sm:p-6"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
          <span className="font-serif text-base text-gold-200 sm:text-xl">
            {m.number}
          </span>
          <span className="font-serif text-lg text-white sm:text-xl lg:text-2xl">
            {m.title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {m.duration && (
            <span className="hidden text-[10px] uppercase tracking-wider text-white/40 sm:inline sm:text-xs">
              {m.duration}
            </span>
          )}
          <ChevronDown
            size={18}
            className={`text-white/50 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] p-5 sm:p-6 sm:pt-5">
              {m.description && (
                <p className="text-sm text-white/70 sm:text-base">
                  {m.description}
                </p>
              )}
              {m.outcomes_list?.length > 0 && (
                <div className="mt-4 sm:mt-5">
                  <div className="eyebrow mb-3">Результат</div>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {m.outcomes_list.map((o, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-white/80"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
