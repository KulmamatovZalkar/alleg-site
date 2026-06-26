"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { useFadeIn } from "@/lib/useFadeIn";
import type { ModuleDTO } from "@/types/api";

export default function TourModules({ items }: { items: ModuleDTO[] }) {
  const [open, setOpen] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      {items.map((m, i) => (
        <ModuleAccordion
          key={m.id}
          item={m}
          index={i}
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
  index,
  delay,
  isOpen,
  onToggle,
}: {
  item: ModuleDTO;
  index: number;
  delay: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.div
      {...fade}
      className={`overflow-hidden rounded-[1.75rem] shadow-soft transition-all duration-300 ${
        isOpen
          ? "bg-gold-50 ring-1 ring-gold-300/40"
          : "border border-ink-700 bg-white hover:border-gold-300/40"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-7"
      >
        {/* крупный номерной кружок */}
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-serif text-lg transition-colors sm:h-14 sm:w-14 sm:text-xl ${
            isOpen
              ? "bg-gold-gradient text-white shadow-gold-glow"
              : "bg-gold-50 text-gold-500"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-500">
            {m.number}
          </span>
          <span className="font-serif text-lg leading-tight text-body sm:text-xl lg:text-2xl">
            {m.title}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {m.duration && (
            <span className="hidden text-[10px] uppercase tracking-wider text-body-muted sm:inline sm:text-xs">
              {m.duration}
            </span>
          )}
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
              isOpen ? "bg-gold-gradient text-white" : "bg-ink-800 text-body-muted"
            }`}
          >
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
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
            <div className="border-t border-ink-700 p-5 sm:p-6 sm:pt-5">
              {m.description && (
                <p className="text-sm text-body-muted sm:text-base">
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
                        className="flex items-start gap-3 text-sm text-body"
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
